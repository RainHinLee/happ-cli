

module.exports.get = function (ctx){
	return Promise.resolve({
		name : "libai",
		age : 100
	})
}

module.exports.post = function (ctx){
	return Promise.resolve({
		name : "post",
		author: "杜甫"
	})
}
