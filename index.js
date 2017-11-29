const fs = require('fs-extra');
const path = require('path');


module.exports = {
	mobile(app){  //--创建移动端app
		let src = path.resolve(__dirname,'./app/client');
		let target = `${app}/client/mobile`;

			//--判断当前mobile app是否存在，存在不覆盖，防止替换已有程序
			if(fs.existsSync(target)){
				console.log('移动app创建失败： 已存在mobile文件，为防止替换已有程序,请确定后删除mobile重试')
			}else{
				fs.ensureDirSync(target);
				fs.copySync(src,target);
			}	

	},
	
	desktop(app){  //--创建移动端app
		let src = path.resolve(__dirname,'./app/client');
		let target = `${app}/client/desktop`;
		
		if(fs.existsSync(target)){
			console.log('桌面app创建失败： 已存在desktop文件，为防止替换已有程序,请确定后删除desktop重试')
		}else{
			fs.ensureDirSync(target);
			fs.copySync(src,target);
		}
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

	 