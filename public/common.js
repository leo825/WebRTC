//---------------------------------------------------
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
// 2015-6-11 12：12：12：123   yyyy-MM-dd hh:mm:ss
//---------------------------------------------------
Date.prototype.Format = function(formatStr)
{
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];

    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());
    str=str.replace(/M/g,this.getMonth());

    str=str.replace(/w|W/g,Week[this.getDay()]);

    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());

    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());

    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());

    return str;
}

/**
 * 日志管理器，如果接管console的日志内容的话，会将客户端日志发送到服务器，按用户保存到各自的日志文件中
 * @param userId        用户id
 * @param serverUrl     日志服务器地址
 * @constructor
 */
function LogManager(userId, serverUrl){
    var logUserId = userId;
    var logServerUrl = serverUrl || "uploadlog";  //日志服务器地址
    this.originLog = console.log;
    this.originWarn = console.warn;
    this.originError = console.error;
    this.isOriginnalConsole = true;  //判断是否为原生的日志接口

    /**
     * 将日志信息实时发送到服务器
     */
    function logToServer(arguments) {
        var myDate = new Date();
        var message = Array.prototype.slice.apply(arguments).join(' ');
        message = myDate.Format("yyyy-MM-dd hh:mm:ss") + " " + message;
        $.get(logServerUrl+"?userId="+logUserId + "&logData=" + message,
            function (response, status) {
                //this.originError("日志上传失败");
            }
        );
    }

    /**
     * 替代系统默认的日志输出功能
     */
    this.takeOverConsole = function (){
        this.isOriginnalConsole = false;
        var console = window.console;
        if (!console) return;
        function intercept(method){
            var original = console[method];
            console[method] = function(){
                logToServer(arguments);
                if (original.apply){
                    // Do this for normal browsers
                    original.apply(console, arguments);
                }else{
                    // Do this for IE
                    var message = Array.prototype.slice.apply(arguments).join(' ');
                    original(message);
                }
            }
        }
        var methods = ['log', 'warn', 'error']
        for (var i = 0; i < methods.length; i++)
            intercept(methods[i])
    }

    /**
     * 恢复系统默认的日志输出功能
     */
    this.recoverConsole = function(){
        this.isOriginnalConsole = true;
        console.log = this.originLog;
        console.warn = this.originWarn;
        console.error = this.originError;
    }
}

//判断字符串是否为空
function IsStringEmpty(str)
{
    if(str && str!='')
        return false;
    else
        return true;
}

//获取页面的参数
function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("#") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

//判断参数
function getParams(paras) {
    if (paras == "" || paras == undefined || paras == null) {
        paras = false;
    } else if (paras == 'false') {
        paras = false;
    } else if (paras == 'true') {
        paras = true;
    } else {
        paras = false;
    }
    return paras;
}

function Map() {

    var struct = function (key, value) {
        this.key = key;
        this.value = value;
    };

    var put = function (key, value) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                this.arr[i].value = value;
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key, value);
    };


    var get = function (key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                return this.arr[i].value;
            }
        }
        return null;
    };

    var remove = function (key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if (v.key === key) {
                continue;
            }
            this.arr.unshift(v);
        }
    };

    var size = function () {
        return this.arr.length;
    };

    var isEmpty = function () {
        return this.arr.length <= 0;
    };

    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.isEmpty = isEmpty;
}