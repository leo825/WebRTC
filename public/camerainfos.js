/**
 * Created by LX on 2015-10-9.
 */
var CAMERA_ID_LIST = [];//存放本机摄像头id的数组
var CAMERA_ID_NAME_MAP = {};//记录本机中存在的摄像头的id和名称的对应关系

/**
 * 返回摄像头信息，前提条件是之前已经调用过initAndgetCameraInfos()方法
 * @returns {{}}
 */
function getCameraInfos(){
    if(Object.keys(CAMERA_ID_NAME_MAP).length == 0){
        initAndGetCameraInfos(function(infos){
            console.log("重新获取的摄像头信息为：", infos);
        });
        console.log("无摄像头信息，需要重新获取");
        return null;
    }

    return CAMERA_ID_NAME_MAP;
}

/**
 * 获取一个可用的摄像头id
 * @returns {*}
 */
function getFreeCamId(){
    var camId;
    var camInfos = getCameraInfos();
    for(var cid in camInfos){
        if(camInfos[cid]!="Virtual Cam"){
            console.log("由于未指定摄像头，自动获取的摄像头为" + camInfos[cid]);
            camId = cid;
            break;
        }
    }
    return camId;
}

/**
 * 根据摄像头名称获取摄像头id，前提条件是之前已经调用过initAndgetCameraInfos()方法
 * @param name  摄像头名称
 * @return 摄像头id
 */
function getCameraIdByName(name){
    if(Object.keys(CAMERA_ID_NAME_MAP).length == 0){
        initAndGetCameraInfos(function(infos){
            console.log("重新获取的摄像头信息为：", infos);
        });
        console.log("无摄像头信息，需要重新获取");
        return null;
    }

    var id = null;
    for(var key in CAMERA_ID_NAME_MAP){
        if(CAMERA_ID_NAME_MAP[key] === name){
           id =  key;
        }
    }
    return id;
}

/**
 * 初始化，并获取所有的摄像头信息，包括id和名称。
 * @param callBack  获取到信息之后的回调函数，参数为摄像头列表
 * 用法如下：
 * 			getCameraInfos(function(cameInfos){
 *				alert(JSON.stringify(cameInfos));
 *			});
 * @return
 */
function initAndGetCameraInfos(callBack) {
    if (!MediaStreamTrack) {
        console.log("获取摄像头信息失败，因MediaStreamTrack为空");
        return;
    }

    CAMERA_ID_LIST = [];
    CAMERA_ID_NAME_MAP = {};
    MediaStreamTrack.getSources(function (media_sources) {
        var source;
        for (var i = 0; i < media_sources.length; i++) {
            source = media_sources[i];
            if (source.kind === 'video') {
                if (!source) {
                    console.log("遍历摄像头出现异常，media_source为空，跳过");
                    return;
                }

                CAMERA_ID_LIST.push(source.id);
            }
        }

        CAMERA_ID_LIST.forEach(function(id){
            setCameraName(id, callBack);//给摄像头赋名称
        });
    });
}

/**
 * 获取摄像头名称
 * @param id    摄像头id
 * @param callBack  设置名称完成后的回调函数
 */
function setCameraName(id, callBack) {
    //给摄像头赋名称
    var constraints = {};
    constraints.video = {
        mandatory: {"maxWidth": "1920", "maxHeight": "1080"},
        optional: [{sourceId: id}, {aspectRatio: 16 / 9}]
    };
    navigator.webkitGetUserMedia(constraints, function (stream) {
        var track = stream.getVideoTracks()[0];
        console.log("camera's name: " + track.label + ", camera's id is " + id);
        CAMERA_ID_NAME_MAP[id] = track.label;

        if (!!stream) {
            console.log("the camera : " + track.label + " stream is stop.");
            //stream._stop();
        }

        if(Object.keys(CAMERA_ID_NAME_MAP).length == CAMERA_ID_LIST.length){
            callBack(CAMERA_ID_NAME_MAP);
        }
    }, function (e) {
        console.log("获取摄像头名称出现异常", e);
    });
}
