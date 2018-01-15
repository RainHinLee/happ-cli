/*--node 服务器程序--*/

const fs = require("fs-extra");
const path = require('path');
const Koa = require('Koa');
const KoaBody = require('koa-body'); // 文档：https://github.com/dlau/koa-body；
const Router = require('koa-router');  //--router中间件  文档：https://github.com/alexmingoia/koa-router
const favicon = require('koa-favicon');
const serve = require('koa-static');
const userAgent = require('koa-useragent'); //https://github.com/rvboris/koa-useragent
const _proxy = require('koa-proxy'); // https://github.com/popomore/koa-proxy
const routes = require('./routes/index.js');   //--路由配置

const port = '18080';
const app = new Koa();
const router = new Router();

app.use(userAgent); //--ctx.userAgent;
app.use(KoaBody());  //-- ctx.request.body;

app.use(serve(path.resolve(__dirname,'./platform/public/statics')));
app.use(serve(path.resolve(__dirname,'./platform/desktop/statics')));
app.use(serve(path.resolve(__dirname,'./platform/mobile/statics')));
app.use(favicon(__dirname+'/favicon.ico'));

app.use(router.routes());
app.use(router.allowedMethods());

/*--具体路由器--
	
	1、代理路由器，
	2、微信验证，
	3、session
	4、rest 路由
	
 * */


app.listen(port);

