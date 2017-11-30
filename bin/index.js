#!/usr/bin/env node

const cmder = require('commander');
const config = require('../package.json');
const exec = require('../index.js');
const fs = require('fs-extra');

cmder.version(config.version)
	 .option("-m,--mobile","创建移动端app")
	 .option('-d,--desktop','创建pc端app')
	 .option('-a,--all','创建移动端和pc端app')
	 .command('<projectName> ', '创建双端app')
	 .action((cmd,options)=>{
		let app = `${process.cwd()}/${cmd}`;

		fs.ensureDirSync(app);
		
		if(cmder.mobile){
			exec.mobile(app);		
		};
			
		if(cmder.desktop){
			exec.desktop(app);
		};
		
		if(cmder.all || (!cmder.mobile && !cmder.desktop)){
			exec.mobile(app);
			exec.desktop(app);
		};

		exec.server(app);
		exec.notify(app);
			
	 })
	 .parse(process.argv);
	 