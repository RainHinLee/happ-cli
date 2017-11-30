const fs = require('fs-extra');
const path = require('path');


module.exports = {
	copyAppFiles(app,type){  //--copy app 需要文件
		let src = path.resolve(__dirname,'./app/client');
		let target = `${app}/client/${type}`;

		//--判断当前mobile app是否存在，存在不覆盖，防止替换已有程序
		if(fs.existsSync(target)){
			return console.log(`${type} app创建失败： 已存在${type}文件，为防止替换已有程序,请确定后删除${type}重试`)
		}
		
		fs.ensureDirSync(target);
		fs.copySync(`${src}/resource`,target);		
		console.log(`copy file success : ${target}`);
	},
	
	copyPublicFiles(app){ //--复制公用文件
		let src = `${app}/client`;
		let files = ['.babelrc','favicon.ico','package.json','webpack.config.js','说明文件'];
		
		fs.ensureDirSync(src);
		
		files.forEach(item=>{
			let target =path.resolve(__dirname,`./app/client/${item}`);
			let src1 = `${src}/${item}`;
			console.log(`copy file success : ${src1}`);
			if(!fs.existsSync(src1)){  //---文件已存在，则不copy
				fs.copySync(target,src1);
			}
		})
	},
	
	notify(app){
		let text = `1. 进入client目录,执行npm install 安装依赖包  \r\n2. 执行webpack --env.desktop -m  发布app到server目录  \r\n3. 进入server目录,执行 npm install 安装依赖包  \r\n4. 执行node server.js 开启服务器  \r\n5. 打开浏览器输入: loaclhost:18080;`
		console.log(text);
	},
	
	
	mobile(app){  //--创建移动端app
		module.exports.copyAppFiles(app,'mobile')
		module.exports.copyPublicFiles(app);
	},
	
	desktop(app){  //--创建移动端app
		module.exports.copyAppFiles(app,'desktop')
		module.exports.copyPublicFiles(app);
	},	
	
	server(app){
		let src = path.resolve(__dirname,'./app/server');
		let target = `${app}/server/`;
		
		if(fs.existsSync(target)){
			console.log('服务器创建失败： 已存在server文件，为防止替换已有程序,请确定后删除server重试')
		}else{
			fs.ensureDirSync(target);
			fs.copySync(src,target);
		}
	}
}

	 