/**
 * Created by wchi on 2015/11/23.
 */

/**
 * 用于获取用户状态
 * 请求：userId=xinJ
 * 返回：{"userid": "xinJ","isbusy": false}
 */
exports.getUserState = function(req, res){
    var userId =  req.query.userId;
    console.log("接收到获取用户状态请求，用户为" + userId);
    var isBusy = false;
    var result = {};
    result.userid = userId;
    outerloop:
        for(var key in SkyRTC.rtc.rooms){
            var room = SkyRTC.rtc.rooms[key];
            for(var soc in room){
                if(room[soc].userId === userId){
                    isBusy = true;
                    break outerloop;
                }
            }
        }
    result.isbusy = isBusy;
    console.log("获取用户状态，返回结果为", result);
    res.send(result);
};

/**
 * 全局分屏函数
 */
exports.splitScreen = function(req, res){
    console.log("开始进行全局分屏" + req + res);
};

/**
 * 关闭会议室
 */
exports.closeRoom = function(req, res){
    console.log("开始关闭会议室" + req.query.roomNum + res);
    /*
    console.log('需要关闭的roomNum='+req.query.roomNum);
    var roomNum = req.query.roomNum;
    SkyRTC.rtc.emit('__remove_room',roomNum);
    res.send("已经将房间 "+roomNum+" 移除了");
    */
};

/**
 * 关闭用户
 */
exports.closeUser = function(req, res){
    console.log("开始关闭用户" + req + res);
};

/**
 * 用于向会议室发送api命令
 * 请求：roomId=1000&apiName=xxx&apiData=yyy
 * 返回：true/false
 */
exports.sendApi = function(req, res){
    var result = false;
    var apiName = req.query.apiName;
    var apiData = req.query.apiData;
    var roomId = req.query.roomId;
    console.log("收到向客户端发送命令请求,roomId[" + roomId + "], apiName[" + apiName + "], apiData[" + apiData + "]");
    if(apiName && apiData){
        SkyRTC.rtc.sendApiToRoom(roomId, apiName, apiData);
        result = true;
    }else{
        console.log("参数不全，发送命令失败")
    }

    res.send(result);
};