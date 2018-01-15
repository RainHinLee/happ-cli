
<template>
	<div>
		<p @click='click'>vuex：{{$store.state.name}}</p>
		<p @click='login'>api：{{$store.state.name}}</p>
		<p>用户类别：{{user.userType}}  <br /></p>
		<p v-for='item of labels'>{{item.title}}</p>	
	</div>
</template>

<script>
	import {Message} from 'element-ui';
	import api from 'api';
	
	export default {
		data(){
			return {
				labels: window.user.getMenuLabels(),
				user: window.user
			}
			
		},
		
		methods:{
			click(){
				Message.success('click');
				this.$store.commit('updateName','dufu');
			},
			
			login(){
				api.login().then(result=>{
					this.$store.commit('updateName',result)
				})
			}
		},
	}
</script>


<style lang="stylus">
	@import '../../../theme/layout.styl';
</style>

<style scoped lang="stylus">

</style>

