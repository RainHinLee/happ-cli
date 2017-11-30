<template>
	<div>
		<h-header></h-header>
		<div>	
			<img width="100px" src="../../../statics/images/lauch.png" alt="" />
			<i class='name' @click='click'>{{name}}</i>
			<a href="/user">user</a>
		</div>
		
	</div>
</template>

<script>
	import Header from '../public/Header.vue';
	
	export default {
		data(){
			return {
				name : window.user.username
			}
		},
		
		components:{
			"h-header": Header
		},
		
		methods:{
			click(){
				alert(this.name)
			}
		}
		
	
	};
	
	
</script>
	
<style scoped lang="stylus">
	.name
		color $color
</style>

