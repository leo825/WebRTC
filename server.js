var express = require('express');
var app = express();
var server = require('http').createServer(app);
var SkyRTC = require('skyrtc').listen(server);
var path = require("path");

var port = process.env.PORT || 3000;
server.listen(port);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/mcu/removeRoom.do', function(req, res){  /* http://192.168.4.102:3000/mcu/removeRoom.do?roomNum=1 */
    console.log('需要关闭的roomNum='+req.query.roomNum);
	var roomNum = req.query.roomNum;
	SkyRTC.rtc.emit('__remove_room',roomNum);
	res.send("已经将房间 "+roomNum+" 移除了");

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