
import { Message } from 'element-ui';

export const routes = [
	{
		path: "/timeSchedule",
		name : "timeSchedule",
		title : "时间管理",
	},

	{
		path: '/classroom',
		name : "classroom",
		title : "进入教室",			
	},
	
	{
		path: '/myCourse',
		name : "myCourse",
		title : "我的课程",
	},

	{
		path: '/myStudent',
		name : "myStudent",
		title : "我的学生",
	},

	{
		path: '/users',
		name : "users",
		title : "用户管理",
	},

	{
		path: '/teachers',
		name : "teachers",
		title : "老师管理",
	},
	
	{
		path: '/courses',
		name : "courses",
		title : "课程管理",
		children:[
			{
				path : "/schedule",
				title : "排课"
			},
			
			{
				path : "/lookup",
				title : "查看"
			},	
		]
	},
	
	{
		path: '/package',
		name : "package",
		title : "定制学习包",
	},
];

/*--用户角色--老师，教学主管，公司人事，客服，管理员，销售*/
const userTypes = ['teacher','teacherManager','hr','service','admin','seller'];

export const userTypeLabels = {
	'teacher':['时间管理','进入教室','我的课程',"我的学生"],
	'teacherManager': ['时间管理','进入教室',"我的学生","课程管理","老师管理"],
	'service':['时间管理','进入教室','我的课程',"我的学生","用户管理","课程管理"],
	'seller': ['时间管理','进入教室','我的课程',"我的学生","用户管理"],
	'admin' : ['时间管理','进入教室','我的课程',"我的学生","用户管理","课程管理","定制学习包"],
	"hr" : ['时间管理']
	
};

window.user.getMenuLabels = function (){ //---获取用户菜单标签
	let arr = userTypeLabels[window.user.userType] || [];
	return arr.map(item =>{
		return routes.find(item1=> item == item1.title);
	})
};

/*---禁止用户访问未授权和错误的链接，规定用户只能访问route中定制的---*/
export function routerJack(to,from,next){  
	let path = to.path;
	let menuLabels = []
	
	window.user.getMenuLabels().forEach((item)=>{
		walkRoutes(item.path,item,menuLabels)
	});
	
	if(path=='/' || path.length==0){
		return next(menuLabels[0]);
	}

	let isVerified = menuLabels.find(item =>{
			return item == path;
	});
	
	if(isVerified){ //--允许访问
		next();
	}else{
		Message.warning({
			message: "链接错误",
			showClose:true
		})
		next(false);
	}	
}

export 	function walkRoutes(src,target,arr){  //--爬行routes树，并将
			arr.push(src);
			if(target.children && target.children.length){
				target.children.forEach(item=>{
					if(item.path.length){
						let target = `${src}${item.path}`;
						walkRoutes(target,item,arr)
					}
				})
			}
}

