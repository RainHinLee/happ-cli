//--工具函数
module.exports = {
	unique(arr){ //--数组去重
		let result = [];
		arr.forEach(item=>{
			if(result.includes(item)){
				return
			}
			result.push(item)
		})
		return result
	}
}

