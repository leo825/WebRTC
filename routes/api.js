/**
 * Created by wchi on 2015/11/23.
 */

/**
 * 用于获取用户状态
 * 请求：userId=xinjiang
 * 返回：{"userid": "xinjiang","isbusy": false}
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
    console.log("开始进行全局分屏")
};

/**
 * 关闭会议室
 */
exports.closeRoom = function(req, res){
    console.log("开始关闭会议室" + req.query.roomNum);
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
    console.log("开始关闭用户");
}