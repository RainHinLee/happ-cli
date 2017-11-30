<template>
	<div>
		<h-header></h-header>
		<a href="/" :class='$style.red'>首页</a>
		
	</div>
</template>

<script>
	
	import Header from '../public/Header.vue';
	export default {
		data(){
			return {
				waring : true 
			}
		},
		
		components:{
			"h-header": Header
		},		
		
		mounted(){
			
		}
	}
</script>

<style lang="stylus" module>
	.red
		color $color
</style>