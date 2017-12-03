/*--路由器--*/;



module.exports.gets = {
	'' : require('./home/index.js').get,
};


module.exports.posts = {
	'/user/login': require('./home/index.js').post
}



