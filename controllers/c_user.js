//导入m_user.js
const m_user = require('../modules/m_user');

//渲染登陆页面
const showSignin=(req,res) => {
    res.render('signin.html');
};

//处理登陆的请求
const handleSignin = (req,res) => {
    const body= req.body;
    console.log(body);

    //调用Modules中的验证邮箱的方法
    //目的:获取数据库操作返回的结果err,data
    m_user.checkEmail(body.email,(err,data) => {
        if (err) {
            return res.send({
                code:500,
                message:'服务器错误'
            })
        }
        if(!data[0]) {
            console.log('邮箱不存在');
            return res.send ({
                code:1,
                message:'邮箱不存在'
            })
        }
        if (body.password !=data[0].password) {
            return res.send({
                code:2,
                message:'密码错误'
            })
        }
        //吧正确的用户信息data[0]保存起来
        //express-session
        req.session.user = data[0];
        res.send ({
            code:200,
            message:'可以跳转了'
        })
    });
};
//处理用户退出的请求
const handleSignout = (req,res) => {
    //清除session中保存的用户信息
    delete req.session.user;
     //跳转到用户登陆页面
     res.redirect('/signin');
}


//渲染注册页面

exports.showSignup = (req,res) => {
    res.render('signup.html');
}
//处理注册页面的表单
exports.handleSignup = (req,res) => {
    //1.获取body
    const body = req.body;
    //2.校验
    //先验证邮箱是否已经存在(咋登陆页面的控制器写过一次验证邮箱,在模型中再次调用即可)
    m_user.checkEmail(body.email,(err,data) => {
        //这里是验证服务器是否是错误的,走在err这里
        if (err) {
            return res.send ({
                code:500,
                message:err.message
            })
        }
        //如果走到data这里  data[0]是验证邮箱是否存在,如果存在,数组的第一项肯定存在,是true,或者通过验证数组的length也可以
        //如果邮箱存在
        if(data[0]) {
            return res.send ({
                code:1,
                message:'邮箱存在   换一个'
            })
        }
        //如果邮箱不存在,在验证昵称
        m_user.checkNickname(body.nickname,(err,data) => {
            if (err) {
                return res.send ({
                    code:500,
                    message:err.message
                })
            }
            if (data[0]) {
                return res.send({
                    code:2,
                    message:'昵称存在,再想一个'
                })
            }
            //如果邮箱和昵称都不存在,则添加新数据
            m_user.addUser(body,(err,data) => {
                if (err) {
                    return res.send ({
                        code:500,
                        message:err.message
                    })
                }
                res.send ({
                    code:200,
                    message:'注册成功'
                })
            });
        }) ;
    });
};
exports.showSignin = showSignin;
exports.handleSignin = handleSignin;
exports.handleSignout = handleSignout;