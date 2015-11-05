var express = require('express');
var app = express();
var server = require('http').createServer(app);
var SkyRTC = require('skyrtc').listen(server);
var path = require("path");

var queryString = require('querystring');
var fs = require('fs');

var logPath =  __dirname + "/logs";

var port = process.env.PORT || 3000;
server.listen(port);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'test')));

app.get('/mcu/removeRoom.do', function(req, res){  /* http://192.168.4.102:3000/mcu/removeRoom.do?roomNum=1 */
    console.log('需要关闭的roomNum='+req.query.roomNum);
	var roomNum = req.query.roomNum;
	SkyRTC.rtc.emit('__remove_room',roomNum);
	res.send("已经将房间 "+roomNum+" 移除了");
});

app.get('/logs',function(req,res){
    res.sendfile(__dirname + '/logmanager.html');
});

//用于获取日志文件列表
app.get('/getloglist',function(req,res){
    var fileList = [];
    fs.readdirSync(logPath).forEach(function(file){
        fileList.push(file);
    });
    res.send(fileList);
});

//用于日志文件上传，根据用户id保存到不同的日志文件中
app.post('/uploadlog',function(req,res){
	console.log("接收到日志上传请求");
    var postData = "";
	req.on('data',function(postdt){
        postData += postdt;
    })
    req.on('end', function () {
        var pd = queryString.parse(postData);
        fs.writeFile(logPath + "/" + pd.userId + ".log", pd.logData);
    })
});

app.get('/downloadlog',function(req,res){
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
});


SkyRTC.rtc.on('remove_room',function(roomNum){
	console.log("已经将房间 "+roomNum+" 移除了");
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

SkyRTC.rtc.on('new_connect', function(socket) {
	console.log('创建新连接');
});

SkyRTC.rtc.on('remove_peer', function(socket) {
	console.log("用户[" + socket.userId + "," + socket.userName + "]离开");
});

SkyRTC.rtc.on('new_peer', function(socket, room) {
	console.log("新用户" + socket.id + "加入房间" + room);
});

SkyRTC.rtc.on('socket_message', function(socket, msg) {
	console.log("接收到来自" + socket.id + "的新消息：" + msg);
});

SkyRTC.rtc.on('ice_candidate', function(socket, ice_candidate) {
	console.log("接收到来自" + socket.id + "的ICE Candidate");
});

SkyRTC.rtc.on('offer', function(socket, offer) {
	console.log("接收到来自" + socket.id + "的Offer");
});

SkyRTC.rtc.on('answer', function(socket, answer) {
	console.log("接收到来自" + socket.id + "的Answer");
});

SkyRTC.rtc.on('error', function(error) {
	console.log("发生错误：" + error.message);
});
