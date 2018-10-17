//程序入口文件

//1.导包
const express = require ('express');
const bodyParser = require('body-parser');
const router = require('./router');
const session = require ('express-session')

const MySQLStore = 
    require('express-mysql-session')(session);
const options = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'news'
}
var sessionStore = new MySQLStore(options);
//2.app对象
const app = express();
//3.配置包
app.engine('html',require('express-art-template'));
//处理静态资源
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

//注意这行代码的位置需要在绑定端口的上面,把router进行使用
app.use(router);
//4.绑定端口,
app.listen(12348,() => {
    console.log('run it');
})

//思路总结

//一.渲染页面
//1.导入UI的素材
//2./router.js配置请求,在控制器中res.render(V,M)
//M 查询数据库  返回data
//吧data在V中通过模版引擎语法使用

//二.登陆和注册按钮的显示与隐藏
// express-session包
//1.保存用户信息  req.session.user = data[0]
//2.显示当前用户名:req.session.user.title

//三详情页面
//在页面中  发送动态的请求   /topic/{{$value.id}}
//在路由中  配置了动态路由 router.get('/topic/:参数名topiID)
// 在控制器中 通过 req.params.topicID获取当前话题的id值
//          让模型按照topicID查找当前话题数据res.render(V,M)
// 在页面中 使用话题数据