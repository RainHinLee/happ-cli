/*
   	微信相关接口
 * */

const config = require('./config.js');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

module.exports = {
	verify(ctx){ //--微信平台
		let src = path.resolve(__dirname,'../MP_verify_yTqTJw124MiyGrv5.txt');
		ctx.type='text/txt';
		ctx.body = fs.readFileSync(src);	
	},
	
	isWechat(ctx,next){ //--是否为微信平台
		let useragent = ctx.useragent.source.toLowerCase();  
		let isWechat = false
		if(useragent.match(/MicroMessenger/i)=="micromessenger") {  
	       	isWechat = true 
	    } 
	    ctx.useragent['isWechat'] = isWechat;
		next();	
	},

}
