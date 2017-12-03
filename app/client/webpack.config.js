/*--webpack 配置文件--*/

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const stylus = require('stylus');
const nib = require('nib');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

/*--webpack命令 ，
 * 	watch --env.m --watch   打包mobile文件夹代码，
 * 	watch --env.d --watch   发布desktop文件夹代码 --*/

let platform = 'none';

if(process.argv.includes('--env.m')){
	platform = 'mobile';
}

if(process.argv.includes('--env.d')){
	platform = 'desktop';
}

//--- entry 入口文件，分mobile,desktop
function getEntryFiles(){
	let result ={};
	let src = path.resolve(__dirname,`./${platform}/src/components/`);
	
	fs.readdirSync(src).forEach(item=>{
		if(item !=="public"){
			result[item] = `./${platform}/src/components/${item}/main.js`;
		};
	});
	
	return result;
};

//---提示，

if(!['mobile','desktop'].includes(platform)){
	let message =  `不支持watch ${platform} -w 命令; \n 移动端请使用: 	watch --env.m --watch \n pc端请使用: watch --env.d --watch \n`
	console.warn(message);
	module.exports ={
		output:{filename : "[name].bundle.js"}
	};
	return ;
}


 //--配置
module.exports = {
	entry:Object.assign({ //--入口文件
		"vendor":['vue','vuex','vue-router','element-ui']
	},getEntryFiles()),
	
	output:{ //---文件输出
		filename:'[name].js',
		path: path.resolve(__dirname,`../server/platform/${platform}/dist/`)
	},
	
	plugins:[ //--插件
		new webpack.optimize.CommonsChunkPlugin({ //--提取公用代码；
	    	name: "vendor",
	    	minChunks: Infinity,
		}),
		
		new ExtractTextPlugin({  //--提取css到单独文件
				filename(getPath){
					return getPath("[name].css");
				},
				allChunks:true
		}),
		
		new webpack.LoaderOptionsPlugin({ //--配置stylus全局变量
		    test: /\.vue/,
		    stylus: {
		      default: {
		        use: [nib()],
		        import:[
		        	'~nib/lib/nib/index.styl',
		        	path.resolve(__dirname,`./${platform}/theme/vars.styl`),
		        ]
		      },
		    },
		 }),
		 
		new webpack.LoaderOptionsPlugin({ //--配置babel全局变量
		    test: /\.vue$/,
		    babel: {
		      default: {
		        presets:["es2015","stage-3"]
		      },
		    },
		 }),
		 
		new CopyWebpackPlugin([ //--拷贝静态文件
				{
					from : path.resolve(__dirname,`./${platform}/statics`),
					to: path.resolve(__dirname,`../server/platform/${platform}/statics`)
				},
				{
					from : path.resolve(__dirname,`./${platform}/views`),
					to: path.resolve(__dirname,`../server/platform/${platform}/views`)
				},	
				{
					from : path.resolve(__dirname,`./favicon.ico`),
					to: path.resolve(__dirname,`../server/`)
				},
				{
					from : path.resolve(__dirname,`./${platform}/router.json`),
					to: path.resolve(__dirname,`../server/platform/${platform}/`)
				},				
		]),
	],
	
	module:{ //--解析规则
		rules:[
			{
				test: /\.vue$/,
				loader:'vue-loader',
				options:{
					extractCSS: true,
				}
			},
			
			{
				test: /\.css/,
				use:[
					{loader : "style-loader"},
					{loader : "css-loader"},
				]
			},	
			
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            
            {
                test: /\.styl/,
                exclude: /node_modules/,
                loader: "stylus-loader",
            }, 

			{
				test: /\.(png|jpg|gif|eot|ttf|woff|svg)$/,
				loader:'url-loader',
				options: {
              		limit: 8192000,
              		name : "/[path][name].[ext]",
              		
            	}
			},
		]	
	},
	
	resolve: { //--处理报错： [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
		alias: {
			'vue': 'vue/dist/vue.js',
			'api' : path.resolve(__dirname,`./${platform}/src/api/index.js`),
		}
	}
}