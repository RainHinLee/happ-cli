/*--路由器--*/;



module.exports.gets = {
	'' : require('./home/index.js').get,
};


module.exports.posts = {
	'': require('./home/index.js').post
	
	
}



