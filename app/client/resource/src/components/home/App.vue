<template>
	<div>
		<el-container>
			<el-header>
				<p>Header</p>
			</el-header>
			<el-container>
				<el-aside width='130px'>
					<el-menu >
						<div v-for="(item,index) of menuLabels" :key='item.name'>
							<el-menu-item-group v-if='item.children'>
								<template slot='title'><span>{{item.title}}</span></template>
								 <el-menu-item v-for="(value,i) of item.children" :index="'index-i'" :key='value.path'>
								 	<router-link :to="item.path+value.path">{{value.title}}</router-link>
								 </el-menu-item>
							</el-menu-item-group>
							
							<el-menu-item v-else :index="'index'">
								<router-link :to="item.path">{{item.title}}</router-link>
							</el-menu-item>
							
						</div>
					</el-menu>					
				</el-aside>
				<el-main>
					<p>body</p>
				</el-main>
			</el-container>	
		</el-container>
	</div>
</template>

<script>
	export default {
		data(){
			let menuLabels =window.user.getMenuLabels();
			
			return {
				menuLabels
			}
		}
	}
</script>

<style lang="stylus">
	@import '../../../theme/layout.styl';
</style>
	
<style scoped lang="stylus">
	.name
		color $color
</style>

