//路由模块
//目的:监听请求并且找到每个请求的方法名
//1.导包
const express = require('express');
//导入控制器文件
const c_user = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');

//2.获取router对象
const router = express.Router();
//渲染登录页面的请求
router.get('/signin',c_user.showSignin);
router.post('/signin',c_user.handleSignin);


//渲染话题页面
router.get('/',c_topic.showTopic);

module.exports = router;