
const m_topic = require('../modules/m_topic');
const moment = require ('moment');
exports.showTopic = (req,res) => {

    //需要展示话题页面 ,跟控制器要数据,->让模型去给我拿数据->调用模型.方法
    m_topic.findAllTopic((err,data) => {
        if (err) {
            // console.log(err)
            return res.send ({
                code:500,
                message:'服务器错啦,好开心'
            });
        }

        console.log(data);
        // 如果用户登陆成功,吧用户信息进行传递,在header.html里进行使用
        res.render('index.html',{
            topics:data,
            user:req.session.user
        });
    });
};

//发布新话题
exports.createTopic = (req,res) => {
    res.render('topic/create.html');
};
//处理发布新话题的表单
exports.handleCreateTopic = (req,res) => {
    //获取表单的数据
    const body = req.body;
    // 给body设置createdAt时间
    body.createdAt = moment().format();
    //给每个话题添加userId,目的是区分当前要添加的话题是由哪个用户创建的
    //要找用户的id ->先找到用户 ->reqsession.user.id
    body.userId = req.session.user.id;

    //吧body添加到数据库中
    //找模型文件中的某个方法
    m_topic.addTopic(body,(err,data) => {
        if (err) {
            return res.send({
                code:500,
                message:'服务器错啦'
            });
        }
        //m_topic.xxx
        //添加成功  返回响应code==200
        res.send({
            code:200,
            message:'发布新话题成功'
        });
    });
};


//渲染话题i详情页面
exports.showDetail = (req,res) => {
    //html中,a标签发送了$value.id
    //router中,监听topicID
    //在控制器中,获取topicID
    const topicID = req.params.topicID;
    //根据当前话题的id值,topicID去数据库中找到话题数据
    //让模型操作数据库,   返回结果
    m_topic.findTopicByID(topicID,(err,data) => {
        if (err) {
            return res.send({
                code:500,
                message:'服务器又错了'
            })
        }
        // console.log(data);s
        res.render('topic/show.html',{
            topic:data[0]
        });
    });
}