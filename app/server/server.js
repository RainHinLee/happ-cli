/*--node 服务器程序--*/

const fs = require("fs-extra");
const path = require('path');
const Koa = require('Koa');
const KoaBody = require('koa-body'); // 文档：https://github.com/dlau/koa-body；
const Router = require('koa-router');  //--router中间件  文档：https://github.com/alexmingoia/koa-router
const favicon = require('koa-favicon');
const serve = require('koa-static');
const userAgent = require('koa-useragent'); //https://github.com/rvboris/koa-useragent
const _ = require('./utils/index.js');
const store = require('./store/index.js');

const port = '18080';
const app = new Koa();
const router = new Router();

app.use(userAgent); //--ctx.userAgent;
app.use(KoaBody());  //-- ctx.request.body;

app.use(serve(path.resolve(__dirname,'./platform/')));
app.use(favicon(__dirname+'/favicon.ico'));

app.use(router.routes());
app.use(router.allowedMethods());

const mobileRouterJson = path.resolve(__dirname,'./platform/mobile/router.json');
const desktopRouterJson = path.resolve(__dirname,'./platform/desktop/router.json');

//--确定router.json文件存在
fs.ensureFileSync(mobileRouterJson);
fs.ensureFileSync(desktopRouterJson);

//--合并router
const clientRouters = {
		mobile : {}, //fs.readJsonSync(mobileRouterJson),
		desktop : {},
};

//---防止json文件为空，报错
try{
	let json1 = fs.readJsonSync(mobileRouterJson);
	clientRouters.mobile = json1;
}catch(e){
	console.log(e.message);
};

try{
	let json2 = fs.readJsonSync(desktopRouterJson);
	clientRouters.desktop = json2;
}catch(e){
	console.log(e.message);
}

const serverRouters = require('./routers/index.js');
const keys =Object.keys(clientRouters.mobile).concat(Object.keys(clientRouters.desktop));

//---get 路由配置；
_.unique(keys).forEach(item =>{
	router.get(`/${item}`,async ctx=>{
		let platform = ctx.userAgent.isDesktop ? "desktop" : "mobile"; 	
		let src = clientRouters[platform][item];
		let htmlFile = path.resolve(__dirname,`./platform/${platform}/views/${src}`);
		let action = serverRouters.gets[item];  //--
		
		if(src){
			let user = await store.user.getSession();
			let data = action ? await action(ctx) : {};  //--action获取该页面所需数据
			//---注入数据
			let injectHtml = `<script>
									window.user = ${JSON.stringify(user)};
									window.device = ${JSON.stringify(ctx.userAgent)};
									window.serverData = ${JSON.stringify(data)};
							  </script>`
			
			let textArr = fs.readFileSync(htmlFile,{encoding:"utf8"}).split('<head>')
			
			ctx.type = "html";
			ctx.body = [].concat(textArr[0],"<head>",injectHtml,textArr[1]).join('')
		}else{
			ctx.status = 404;
		};
	})
});

//---post 路由配置

Object.keys(serverRouters.posts).forEach(item=>{
	router.post(`/${item}`,async ctx=>{
		let action = serverRouters.posts[item];
		ctx.type = "application/json";
		ctx.body = await action(ctx);
	});
});


app.listen(port);

