//模型文件:操作话题数据库并且返回操作数据库的结果

//导入db.config方法
const db = require ('../tools/db_config')
exports.findAllTopic = (callback) => {
    const sqlstr = 'SELECT * FROM `topics` ORDER BY `createdAt` DESC';
    db.query(sqlstr,(err,data) => {
        if (err) {
            return callback(err,null);
        }
        callback (null,data);
    });
}

//向数据库中添加新话题body
exports.addTopic = (body,callback) => {
    const sqlstr = 'INSERT INTO `topics` SET ?';
    db.query(sqlstr,body,(err,data) => {
        if (err) {
            return callback(err);
        }
        callback(null,data);
    });
}

exports.findTopicByID = (topicID,callback) => {
    const sqlstr = 'SELECT * FROM `topics` WHERE id = ?';
    db.query(sqlstr,topicID,(err,data) => {
        if (err) {
            return callback (err);
        }
        callback(null,data);
    });
}
//修改话题
exports.updateTopicByID = (topicID,body,callback) => {
    const sqlstr = 'UPDATE `topics` SET `title`=?,`content`=? WHERE `id`=?';
    db.query(sqlstr,
    [body.title,
    body.content,
    topicID],(err,data) => {
        if (err) {
            return callback (err);
        }
        callback (null,data);
    });
}

//删除话题
exports.deleteTopicByID = (topicID,callback) => {
    const sqlstr = 'DELETE FROM `topics` WHERE `id`=?';
    db.query(sqlstr,topicID,(err,data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}