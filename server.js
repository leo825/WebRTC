var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require("path");


//全局变量
global.SkyRTC = require('skyrtc').listen(server);
global.log4js = require("log4js");

//初始化日志模块
log4js.configure("log4js.json");

var routes = require("./routes");
var route_log = require("./routes/log");
var route_api = require("./routes/api");
var route_rtc = require("./routes/rtc");

var port = process.env.PORT || 3000;
server.listen(port);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'test')));

app.get("/", routes.index);

//日志文件相关路由
app.get("/log", route_log.logs);
app.get("/log/getloglist", route_log.getLogList);
app.get("/log/uploadlog", route_log.uploadLog);
app.get("/log/downloadlog", route_log.downloadLog);

//MCU操作相关路由
app.get("/api/splitscreen", route_api.splitScreen);
app.get('/api/closeroom', route_api.closeRoom);
app.get('/api/closeuser', route_api.closeUser);
app.get('/api/getuserstate', route_api.getUserState);
app.get('/api/sendapi', route_api.sendApi);
