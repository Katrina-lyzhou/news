//控制器c_user.js中数据库操作的部分

//导入数据库配置的模块
const db = require('../tools/db_config')

//1.验证邮箱
//req.body
const checkEmail = function(email,callback) {
    const sqlstr = 'SELECT * FROM `users`WHERE email=?';
    db.query(sqlstr,email,(err,data) => {
        if (err) {
            return callback(err);
        }
        callback (null,data);
    });
};
//验证昵称
exports.checkNickname = (nickname,callback) => {
    const sqlstr = 'SELECT * FROM `users` WHERE nickname=?';
    db.query(sqlstr,nickname,(err,data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    });
}
// 添加新用户
exports.addUser = (body, callback) => {
    const sqlstr = 'INSERT INTO `users` SET ?';
    db.query(sqlstr, body, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
}

exports.checkEmail = checkEmail;