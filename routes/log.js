/**
 * Created by wchi on 2015/11/23.
 */
var fs = require('fs');
var logPath =  process.cwd() + "/logs";

exports.logs = function(req,res){
    res.sendfile(process.cwd() + '/views/logmanager.html');
};

//用于获取日志文件列表
exports.getLogList = function(req,res){
    var fileList = [];
    fs.readdirSync(logPath).forEach(function(file){
        fileList.push(file);
    });
    res.send(fileList);
};

//用于日志文件上传，根据用户id保存到不同的日志文件中
exports.uploadLog = function(req,res){
    //console.log(req.query.userId + ":" + req.query.logData);
    fs.appendFile(logPath + "/" + req.query.userId + ".log", req.query.logData + "\n");
    res.send("ok");
};

exports.downloadLog = function(req,res){
    var fileName = req.query.fileName;
    if(fileName!=null && fileName.length>0){
        var file = logPath + "/" + fileName;
        fs.stat(file, function(err, stat){
            if(err == null){
                res.download(file);
            }else{
                res.send("下载日志失败，因文件" + fileName + "不存在");
            }
        })
    }else {
        res.send("下载日志失败，因文件名为空");
    }
};