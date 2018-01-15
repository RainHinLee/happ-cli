/*--vuex 使用的store数据对象--*/


export default {
	state:{
		name : "libai",
	},
	
	mutations:{
		updateName(state,name){
			state.name = name
		}
	},
}
