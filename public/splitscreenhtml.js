﻿//下面的方法用于字符串格式化
if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

var VideoMCU = function () {
    //用于保存分屏结构的table名称
    var VIDEO_TABLE_NAME = "VideoTable";

    //用于让video标签规矩显示，不会把父容器给撑开
    var VIDEO_DIV_FORMAT = "<div id='{0}' style='border:0 black solid;width:100%;height:100%;position:relative'>\
				<div id='{1}' style='text-align:center;border:0 black solid;width:100%;height:100%;position:absolute;overflow: hidden;'>\
				{2}\
				</div>\
			</div>";

    //该标签用于显示无视频时的默认图片
    var DEFAULT_IMG_DIV_FORMAT = "<div style='border:0 black solid;width:100%;height:100%;position:relative'>\
				<div style='border:0 black solid;width:100%;height:100%;position:absolute;overflow: hidden;'>\
				<img style='display:block;width:100%;' src='{0}'/>\
				</div>\
			</div>";

    //该标签用于定义在视频上面显示的文字样式
    var VIDEO_TEXT_DIV_FORMAT = "<div style='font-family:黑体;color:#FFF;position:absolute;top:5px;left:5px'>{0}</div>";

    /******************************************************************************************************/
    /*表格布局样式，用于视频分屏*/
    /******************************************************************************************************/
    var VIDEO_SPLIT_LAYOUT1 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
	<tbody>\
	<tr><td align='center'></td></tr>\
	</tbody>\
	</table>";

    var VIDEO_SPLIT_LAYOUT2 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
	<tbody>\
		<tr>\
			<td align='center' style='display:none;'></td>\
			<td align='center'></td>\
		</tr>\
	</tbody>\
</table>";

    var VIDEO_SPLIT_LAYOUT3 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
	<tbody>\
		<tr>\
			<td colspan='2' align='center' heigth='60%'></td>\
		</tr>\
		<tr>\
			<td align='center' width='50%' height='40%'></td>\
			<td align='center' width='50%' height='40%'></td>\
		</tr>\
	</tbody>\
</table>";

    var VIDEO_SPLIT_LAYOUT4 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
	<tbody>\
		<tr>\
			<td align='center' width='50%' height='50%'></td>\
			<td align='center' width='50%' height='50%'></td>\
		</tr>\
		<tr>\
			<td align='center' width='50%' height='50%'></td>\
			<td align='center' width='50%' height='50%'></td>\
		</tr>\
	</tbody>\
</table>";

    var VIDEO_SPLIT_LAYOUT5 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
	<tbody>\
		<tr>\
			<td colspan='4' align='center' width='100%' height='70%'></td>\
		</tr>\
		<tr>\
			<td align='center' width='25%' height='30%'></td>\
			<td align='center' width='25%' height='30%'></td>\
			<td align='center' width='25%' height='30%'></td>\
			<td align='center' width='25%' height='30%'></td>\
		</tr>\
	</tbody>\
</table>";

    var VIDEO_SPLIT_LAYOUT6 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
	<tbody>\
		<tr>\
			<td colspan='2' rowspan='2' align='center' width='66.7%' height='66.7%'></td>\
			<td align='center' width='33.3%' height='33.3%'></td>\
		</tr>\
		<tr>\
			<td align='center' width='33.3%' height='33.3%'></td>\
		</tr>\
		<tr>\
			<td align='center' width='33.3%' height='33.3%'></td>\
			<td align='center' width='33.3%' height='33.3%'></td>\
			<td align='center' width='33.3%' height='33.3%'></td>\
		</tr>\
	</tbody>\
</table>";

    var VIDEO_SPLIT_LAYOUT7 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
    <tbody>\
        <tr>\
            <td colspan='2' width='50%' height='50%' align='center'></td>\
            <td colspan='2' width='50%' height='50%' align='center'></td>\
        </tr>\
        <tr>\
            <td width='50%' colspan='2' rowspan='2' width='50%' height='50%' align='center'></td>\
            <td width='25%' height='20%' align='center'></td>\
            <td width='25%' height='20%' align='center'></td>\
        </tr>\
        <tr>\
            <td width='25%' height='20%' align='center'></td>\
            <td width='25%' height='20%' align='center'></td>\
        </tr>\
    </tbody>\
</table>";

    var VIDEO_SPLIT_LAYOUT8 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
    <tbody>\
        <tr>\
            <td colspan='3' rowspan='3' width='75%' height='75%' align='center'></td>\
            <td align='center' width='25%' height='25%'></td>\
        </tr>\
        <tr>\
            <td align='center' width='25%' height='25%'></td>\
        </tr>\
        <tr>\
            <td align='center' width='25%' height='25%'></td>\
        </tr>\
        <tr>\
            <td align='center' width='25%' height='25%'></td>\
            <td align='center' width='25%' height='25%'></td>\
            <td align='center' width='25%' height='25%'></td>\
            <td align='center' width='25%' height='25%'></td>\
        </tr>\
    </tbody>\
</table>";

    var VIDEO_SPLIT_LAYOUT9 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
    <tbody>\
        <tr>\
            <td align='center' width='33.3%' height='33.3%'></td>\
            <td align='center' width='33.3%' height='33.3%'></td>\
            <td align='center' width='33.3%' height='33.3%'></td>\
        </tr>\
        <tr>\
            <td align='center' width='33.3%' height='33.3%'></td>\
            <td align='center' width='33.3%' height='33.3%'></td>\
            <td align='center' width='33.3%' height='33.3%'></td>\
        </tr>\
        <tr>\
            <td align='center' width='33.3%' height='33.3%'></td>\
            <td align='center' width='33.3%' height='33.3%'></td>\
            <td align='center' width='33.3%' height='33.3%'></td>\
        </tr>\
    </tbody>\
</table>";

    var VIDEO_SPLIT_LAYOUT10 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
    <tbody>\
        <tr>\
            <td colspan='2' width='50%' height='50%'  align='center'></td>\
            <td colspan='2' width='50%' height='50%'  align='center'></td>\
        </tr>\
        <tr>\
            <td width='25%' height='25%' align='center'></td>\
            <td width='25%' height='25%' align='center'></td>\
            <td width='25%' height='25%' align='center'></td>\
            <td width='25%' height='25%' align='center'></td>\
        </tr>\
        <tr>\
            <td width='25%' height='25%' align='center'></td>\
            <td width='25%' height='25%' align='center'></td>\
            <td width='25%' height='25%' align='center'></td>\
            <td width='25%' height='25%' align='center'></td>\
        </tr>\
    </tbody>\
</table>";

    var VIDEO_SPLIT_LAYOUT13 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
    <tbody>\
        <tr>\
            <td height='50%' width='50%' colspan='2' rowspan='2' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
        </tr>\
        <tr>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
        </tr>\
        <tr>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
        </tr>\
        <tr>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
        </tr>\
    </tbody>\
</table>";

    var VIDEO_SPLIT_LAYOUT16 = "<table id='VideoTable' style='margin:0;border-spacing:0;' width='100%' height='100%' align='center'>\
    <tbody>\
        <tr>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
        </tr>\
        <tr>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
        </tr>\
        <tr>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
        </tr>\
        <tr>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
            <td height='25%' width='25%' align='center'></td>\
        </tr>\
    </tbody>\
</table>";

    function videomcu() {
        //无视频时显示的默认图片全路径
        this.defaultImgPath = "defaultConf.bmp";

        //页面中用于存放视频的容器id，如某一个div的id
        this.videoContainerId = "";

        //该列表用于保存视频用户信息，包括id、姓名、视频URL等
        this.currVideoUsers = [];
        //当前分屏数量
        this.currScreenSplitNum = 0;

        //用于存储双击放大时原有的分屏信息
        this.oldVideoUsers = [];
        //用于存储双击放大时原有的分屏数量
        this.oldScreenSplitNum = 0;

        /**
         * 获取分屏布局的html
         * @param screenCount   分屏的数量
         * @returns {Object}
         */
        this.getSplitHTML = function (screenCount) {
            var id = 'VIDEO_SPLIT_LAYOUT' + screenCount;
            return eval(id);
        }

        /**
         * 将视频附加到页面表格中
         * @param videoTagList  包含所有视频标签
         * @param tableName     需要附加视频的表格名称
         */
        this.attachVideoToTable = function (videoTagList, tableName) {
            //用于填充空白视频的图片
            var defaultImgTag = String.format(DEFAULT_IMG_DIV_FORMAT, this.defaultImgPath);
            var tds = document.getElementById(tableName).getElementsByTagName("TD");

            var videoTag;
            for (i = 0; i < tds.length; i++) {
                videoTag = videoTagList[i + 1];
                if (videoTag != null) {
                    tds[i].innerHTML = videoTagList[i + 1];
                } else {
                    tds[i].innerHTML = defaultImgTag;
                }
            }
        }

        /**
         * 根据用户信息，构建video标签，并在外面套上一层div，以便控制
         * @param userInfo  用户基本分屏信息
         */
        this.buildVideoTag = function (userInfo) {
            var videoStyle = "position: relative; width:100%;height:auto;";
            var videoId = "video-" + userInfo.userId;
            var videoTag = String.format("<video id='{0}' autoplay='true' muted='muted' src='{1}' style='{2}'></video>",
                videoId, userInfo.videoURL, videoStyle);

            videoTag = this.addVideoText(videoTag, userInfo.userName);

            var wholeTag = String.format(VIDEO_DIV_FORMAT, "div1_" + userInfo.userId, "div2_" + userInfo.userId, videoTag);
            return wholeTag;
        }

        /**
         * 在视频上面增加文字显示
         * @param videoTag  绑定好用户视频的video标签
         * @param userName  在视频上面显示的用户名称
         */
        this.addVideoText = function (videoTag, userName) {
            var txtDiv = String.format(VIDEO_TEXT_DIV_FORMAT, userName);
            return videoTag + txtDiv;
        }

        /**
         * 将video tag根据videoPostion保存到数组的相应位置。便于后面直接根据数组位置展现视频
         * 如果videoPostion为空，则从数组起始位置开始放置
         *  @param videoTagList 视频标签列表
         * @param videoTag  视频标签
         * @param videoPosition 视频分屏位置
         */
        this.addVideoTag = function (videoTagList, videoTag, videoPosition) {
            //如果指定videoPosition，则保存到指定位置
            if (videoPosition > 0) {
                videoTagList[videoPosition] = videoTag;
            } else {
                //未指定视频位置，则从1开始放
                for (var i = 1; i < videoTagList.length; i++) {
                    //找到一个空的位置，存入videotag
                    if (videoTagList[i] == null) {
                        videoTagList[i] = videoTag;
                        break;
                    }
                }
            }
        }
    }

    /**
     * 初始化视频双击事件，用于视频的最大化显示和还原
     * @param videoContainerId  用于存储所有视频的父容器id
     */
    videomcu.prototype.initEnlargeVideo = function (videoContainerId) {
        var that = this;
        //绑定视频双击放大事件，即使视频被动态的增减，双击都有效
        $("#" + videoContainerId).on("dblclick","video",function() {
            //如果是两分屏的双击事件，则忽略掉，因为2分屏实际显示时只显示一个用户视频
            if(that.currScreenSplitNum == 2){
                console.log("当前为2分屏，没有必要双击放大");
                return;
            }

            //如果当前分屏为多分屏，则进行放大
            if (that.currScreenSplitNum > 1) {
                //保存当前分屏信息
                that.oldScreenSplitNum = that.currScreenSplitNum;
                that.oldVideoUsers = that.currVideoUsers;

                //获取需要放大的用户
                //获取当前选中用户id
                var userid = $(this).attr("id").substr(6);
                var fullScreenUser;
                for(var i=0;i<that.currVideoUsers.length;i++){
                    if(that.currVideoUsers[i].userId === userid){
                        //复制选中的用户json信息
                        fullScreenUser = jQuery.extend({},that.currVideoUsers[i]);
                        break;
                    }
                }

                //将选择用户视频最大化
                if(fullScreenUser!=null){
                    //将需放大的用户视频位置放到第一个
                    fullScreenUser.videoPosition = 1;
                    that.currVideoUsers = [fullScreenUser];
                    that.currScreenSplitNum = 1;
                    that.SplitVideoScreen(1);
                }else{
                    console.log("未获取到最大化用户，放大失败");
                }
            } else if(that.currScreenSplitNum == 1){     //如果当前已经为1分屏，则还原到原先的分屏状态
                if(that.oldScreenSplitNum == 1){
                    console.log("原始分屏即为1分屏，不需要处理");
                    return;
                }else{
                    that.currScreenSplitNum = that.oldScreenSplitNum;
                    that.currVideoUsers = that.oldVideoUsers;
                    that.oldScreenSplitNum = 0;
                    that.oldVideoUsers = [];
                    that.SplitVideoScreen(that.currScreenSplitNum);
                }
            }
        });
    }

    /**
     * 用于初始化分屏设置，比如设置默认图片等
     * @param infos 用于初始化的相关属性，包含以下信息：
     *               defaultImgPath:  无视频显示的默认图片地址
     *               videoContainerId: 用于放MCU视频的容器id，容器一般为idv
     */
    videomcu.prototype.init = function (infos) {
        if (infos.defaultImgPath != null && infos.defaultImgPath.length > 0) {
            this.defaultImgPath = infos.defaultImgPath;
        }

        if (infos.videoContainerId != null && infos.videoContainerId.length > 0) {
            this.videoContainerId = infos.videoContainerId;
        }

        //初始化视频最大时的相关操作
        this.initEnlargeVideo(infos.videoContainerId);
    }

    /**
     * 增加新的视频用户
     * @param userId    用户id
     * @param userInfo  用户视频相关信息，如userId、userName、videoURL、videoPostion、videoParam等
     */
    videomcu.prototype.addUserVideo = function(userId, userInfo){

    }

    /**
     * 删除指定的视频用户
     * @param userId    用户id
     */
    videomcu.prototype.removeUserVideo = function(userId){}

    /**
     * 对用户视频进行分屏，并附加到指定的容器中
     * @param screenNum 分屏数，现有的分屏数有1、2、3、4、5、6、7、8、9、10、13、16
     * @param userInfos 用户视频信息，该参数可以为空，如果之前调用过分屏方法的话。
     *                   含有以下属性:
     *                          userId：用户id
     *                          userName： 用户名称
     *                          videoURL： 用户视频URL
     *                          videoParam： video标签中用到的视频参数
     *                          videoPosition：用户视频显示位置
     */
    videomcu.prototype.SplitVideoScreen = function (screenNum, userInfos) {
        console.log("开始分屏，参数为screenNum:" + screenNum + ", userInfos:" , userInfos);
        var screenTypes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 16];
        if (screenTypes.indexOf(screenNum) < 0) {
            console.log("分屏失败，因分屏数不合法，分屏数为" + screenNum);
            return;
        }

        //如果之前存储过视频用户，并且没有指定新用户的话，则使用原先的用户进行分屏
        if(userInfos == null || userInfos.length==0){
            if(this.currVideoUsers.length ==0){
                console.log("分屏失败，需指定视频用户");
                return;
            }else{
                console.log("因参数中userInfo为空，使用原有的视频用户进行分屏");
                userInfos = this.currVideoUsers;
            }
        }else{
            this.currVideoUsers = userInfos;
        }

        this.currScreenSplitNum = screenNum;

        //生成用于分屏布局的table，并加载到页面中
        var tableHtml = this.getSplitHTML(screenNum);
        document.getElementById(this.videoContainerId).innerHTML = tableHtml;

        //用户存放视频video标签
        var videoTagList = [];
        //遍历用户，并生成video标签
        if (userInfos.length > 0) {
            var videoTag;
            for (var i = 0; i < userInfos.length; i++) {
                videoTag = this.buildVideoTag(userInfos[i]);
                this.addVideoTag(videoTagList, videoTag, userInfos[i].videoPosition);
            }

            //将视频附加到页面表格中
            this.attachVideoToTable(videoTagList, VIDEO_TABLE_NAME);
        }
    }

    return new videomcu();
}