define("common/wx/media/factory.js",["common/wx/media/img.js","common/wx/media/img9.js","common/wx/media/audio.js","common/wx/media/video.js","common/wx/media/appmsg.js","tpl/media/videocard.html.js","tpl/media/appmsg_edit/video_article_content.html.js","common/wx/richEditor/emotionEditor.js","tpl/media/appmsg_edit/text_editor.html.js","tpl/media/appmsg_edit/text_editor_word_tips.html.js","biz_common/utils/load3rdimg.js","common/wx/media/videoUtils.js","common/qq/emoji.js","widget/text_editor.css","common/wx/popover.js","biz_web/lib/store.js","tpl/media/video_title.html.js","common/wx/inputCounter.js","common/wx/Tips.js","common/wx/dialog.js","tpl/media/cardmsg.html.js","common/wx/const.js"],function(e,i,o){
"use strict";
var t=e("common/wx/media/img.js"),d=e("common/wx/media/img9.js"),m=e("common/wx/media/audio.js"),n=e("common/wx/media/video.js"),r=e("common/wx/media/appmsg.js"),s=(e("tpl/media/videocard.html.js"),
e("tpl/media/appmsg_edit/video_article_content.html.js")),l=e("common/wx/richEditor/emotionEditor.js"),a=e("tpl/media/appmsg_edit/text_editor.html.js"),c=e("tpl/media/appmsg_edit/text_editor_word_tips.html.js"),p=e("biz_common/utils/load3rdimg.js"),h=e("common/wx/media/videoUtils.js");
e("common/qq/emoji.js"),e("widget/text_editor.css");
var w=(e("common/wx/popover.js"),e("biz_web/lib/store.js")),u=e("tpl/media/video_title.html.js"),_=e("common/wx/inputCounter.js"),j=(e("common/wx/Tips.js"),
e("common/wx/dialog.js")),v=e("tpl/media/cardmsg.html.js"),f=e("common/wx/const.js"),g={
1:function(e,i){
return $(e).html(i.content.emoji());
},
2:function(e,i){
return i.container=$(e),i.append=!0,i.hasRecommend&&(i.recommendEditor=new l(i.container,{
wordlimit:140,
linebreak:!0,
hideEmotion:!0,
hideUpload:!0,
hideOprTips:!0,
editorTpl:a,
editorTipsTpl:c,
placeHolder:"从这里输入推荐语，可以不填"
})),new t(i);
},
3:function(e,i){
return i.selector=$(e),i.source="file",i.shareTpl=!0,i.hasRecommend&&(i.recommendEditor=new l(i.selector,{
wordlimit:140,
linebreak:!0,
hideEmotion:!0,
hideUpload:!0,
hideOprTips:!0,
editorTpl:a,
editorTipsTpl:c,
placeHolder:"从这里输入推荐语，可以不填"
})),console.log(i),new m(i);
},
4:function(e,i){
return i.selector=$(e),i.id=i.file_id,i.source="file",new n(i);
},
10:function(e,i){
return i.container=$(e),i.showMask=!1,new r(i);
},
11:function(e,i){
return i.container=$(e),i.showMask=!1,new r(i);
},
15:function(e,i){
if(i.multi_item&&i.multi_item[0]){
i.title=i.multi_item[0].title,i.digest=i.multi_item[0].digest;
for(var o=0;o<i.multi_item.length;o++)if(i.multi_item[o].cover){
i.cover=i.multi_item[o].cover;
break;
}
}
i.selector=$(e),i.id=1e6*Math.random()|0,i.tpl="videomsg",i.for_selection=!1,i.for_operation=!1;
var t=i.isMyMpVideo?f.videoDigestPlaceholder:"";
if(i.hasRecommend){
i.recommendEditor=new l(i.selector,{
wordlimit:f.videoMsgMaxGuideWord,
linebreak:!0,
hideEmotion:!1,
showLinkAndWeapp:!0,
hideUpload:!0,
hideOprTips:!0,
editorTpl:a,
editorTipsTpl:c,
inlineToolBar:!0,
placeHolder:t,
autoFocus:!1,
onFocus:function(){
this.selector$.find(".js_editorTip").show();
},
onBlur:function(){
!this.hasOverflowed()&&this.selector$.find(".js_editorTip").hide();
}
}),i.recommendEditor.setContent(i.video_desc);
var d=f.hasShowVideoModifyDialogKey+location.pathname;
!w.get(d)&&i.isMyMpVideo&&(w.set(d,1),j.show({
width:600,
type:"info",
className:"media_attr_edit_dialog dialog_weui_desktop",
msg:"群发时可直接修改标题和介绍语，群发成功后会覆盖素材库原有标题或介绍语。",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}));
}
i.selector.prepend($(u));
var m=i.selector.find(".js_counter");
m.val(i.title);
var n=new _(m[0],{
maxLength:f.videoTitleMaxLen,
showCounter:!1
});
m.on("focus",function(){
n.show();
}),m.on("blur",function(){
!n.hasOverflowed()&&n.hide();
}),m.removeAttr("readonly"),i.share_videoinfo=[{
cover:i.cover,
title:i.title,
duration:i.duration
}];
var r=$(e).append('<div data-type="15" class="js_previe_media_box">'+wx.T(s,i)+"</div>");
return $(".js_preview_hd").unbind("click"),$(".js_preview_hd").click(function(){
h.showVideoPreviewDialog({
vid:i.vid,
is_mp_video:1*i.is_mp_video,
onClose:function(){}
});
}),{
dom:r,
file_id:i.file_id,
id:i.id,
source:"file",
tpl:"videomsg",
type:"",
video_url:""
};
},
16:function(e,i){
$(e).html(template.compile(v)(i));
var o=$(e).find(".js_logourl");
o.length&&p({
img:o[0]
});
}
};
g[21]=g[15];
var x={
render:function(e,i){
g[i.type]&&$(e).length>0&&g[i.type]($(e).html(""),i);
},
creatImg9:function(e,i){
return i.container=$(e),i.append=!0,i.hasRecommend&&(i.recommendEditor=new l(i.container,{
wordlimit:140,
linebreak:!0,
hideEmotion:!0,
hideUpload:!0,
hideOprTips:!0,
editorTpl:a,
editorTipsTpl:c,
placeHolder:"从这里输入推荐语，可以不填"
})),new d(i);
},
itemRender:g
};
o.exports=x;
});define("tpl/mass/sendqueue_popup.html.js",[],function(){
return'<div>\n    <div class="page_msg large simple default">\n        <div class="inner group">\n            <span class="msg_icon_wrapper"><i class="icon_msg info"></i></span>\n            <div class="msg_content ">\n                <h4>\n                    当前有{count}条消息正在等待管理员{wx_alias}\n                    {if type=="polo"}\n                    审批通过后发送，发送后将占用群发消息条数。                    {else if type=="timer"}\n                    审批通过后设置定时发送，成功设置后占用群发消息条数。                    {/if}\n                </h4>\n                <p>申请被管理员拒绝（或过期未处理）将不会发送，也不会占用群发条数。</p>\n            </div>\n        </div>\n    </div>\n    <div class="sendqueue_area">\n        <div class="js_masslist sendqueue_info">\n            <ul class="send_author_list">\n            {each list as o index}\n                {if index == 0}\n            <li class="send_author_item js_massitem selected" data-index="{index}">\n                {else}\n            <li class="send_author_item js_massitem" data-index="{index}">\n                {/if}\n                <div class="send_author">\n                    <img class="author_avatar" src="{o.applyer_headimg}">\n                    <div class="author_info">\n                        <span>{o.applyer_name}</span>\n                        <span class="tips_global">({o.applyer_wxid})</span>\n                    </div>\n                </div>\n                <p class="send_author_tips">于{o.apply_time_desc}申请群发消息，将于申请后半小时过期</p>\n                <span class="send_selected_arrow_wrp">\n                    <i class="send_selected_arrow out"></i>\n                    <i class="send_selected_arrow in"></i>\n                </span>\n            </li>\n            {/each}\n            </ul>\n        </div>\n        <div class="js_masscontent sendqueue_content">\n            {each list as o index}\n            {if index == 0}\n            <div class="js_media{index} js_mediaitem sendqueue_media"></div>\n            {else}\n            <div class="js_media{index} js_mediaitem sendqueue_media" style="display:none;"></div>\n            {/if}\n            {/each}\n        </div>\n    </div>\n</div>\n';
});define("pages/reward/modules/auto_apply_list/auto_apply_list.js",["pages/reward/modules/auto_apply_list/auto_apply_list.tpl.js","pages/reward/modules/auto_apply_list/auto_apply_list.css.js","pages/modules/common/emoji/emoji.js","pages/modules/common/emoji/emoji_data.js"],function(e,t,s){"use strict"
var i=e("pages/reward/modules/auto_apply_list/auto_apply_list.tpl.js")
e("pages/reward/modules/auto_apply_list/auto_apply_list.css.js")
for(var a=e("pages/modules/common/emoji/emoji.js"),n=e("pages/modules/common/emoji/emoji_data.js"),r={},l=0;l<n.length;l++)r[n[l].style]=n[l].emoji||n[l].cn
Vue.component("mp-auto-apply-list",{template:i,props:{status:{type:String,default:"choose"},dataList:{type:Array,default:function(){return[]}}},data:function(){return{selectedIdx:-1,replyList:[],textClamp:[],clamp:3,loading:!1}},watch:{dataList:{immediate:!0,handler:function(e){var i=this
e&&0<e.length&&(this.replyList=e.map(function(e){switch(e.type){case 1:e.text=i._setContent(e.text)
break
case 2:e.text=i._setContent(e.text)||"图片："+e.title
break
default:e.text=i._setContent(e.text)}return e})),this.$nextTick(function(){var e,t,s
i.$refs.itemTextArea&&(i.listenHeightChange(i.$refs.itemTextArea),window.addEventListener("resize",(e=function(){i.listenHeightChange(i.$refs.itemTextArea)},t=300,s=null,function(){s&&(clearTimeout(s),s=null),s=setTimeout(function(){e()},t)})))})}}},methods:{listenHeightChange:function(a){var n=this,l=0
this.replyList.forEach(function(e,t){var s=a[l++]
if(s)if(e.text){var i=s.dataset.id
s.scrollHeight>s.clientHeight?n.textClamp.splice(i,1,!0):n.textClamp.splice(i,1,!1)}else n.textClamp.splice(t,1,!1)})},selectItem:function(e){"edit"!==this.status&&(this.selectedIdx!==e?(this.selectedIdx=e,this.$emit("select",this.dataList[e])):(this.selectedIdx=-1,this.$emit("select",null)))},removeItem:function(e,t){this.$emit("remove-reply",e),this.$refs.removePop[t].show(!1)},cancelRemove:function(e){this.$refs.removePop[e].show(!1)},_setContent:function(e){var t=""
return this.bakContent=e,e=this.linebreak?e.replace(/\n/g,"<br>"):e,t=this._textFilter(e).replace(/<br\s*\/*>/g,"\n"),this.notEncodeHtml||(t=function(e,t){var s=void 0
s=t?["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"]:["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"]
for(var i=0;i<s.length;i+=2)e=e.replace(new RegExp(s[i],"g"),s[i+1])
return e}(t.replace(/<br\s*\/*>/g,"\n"),!0)),t=a(t).replace(/\n/g,"<br>")},_textFilter:function(e){var t=document.createElement("div"),s="",i=[],a=""
t.innerHTML=e
for(var n=t.childNodes.length-1;0<=n;n--){var l=t.childNodes[n]
switch(l.nodeType){case 1:if("IMG"===l.nodeName.toUpperCase()&&(s=l.getAttribute("class"))&&1<(i=s.split(" ")).length&&"icon_emotion_single"===i[0]){a=r[i[1]]
var o=document.createTextNode(a)
t.replaceChild(o,l)}}}return e=t.innerHTML,t=null,e}}})})
define("pages/reward/modules/auto_apply_list/auto_apply_list.tpl.js",[],function(t,e,i){return'<span><svg xmlns="http://www.w3.org/2000/svg" style="width:0;height:0;visibility:hidden;position:absolute;z-index:-1"><symbol id="common-del" viewBox="0 0 16 18"><path d="M1 5c-.556 0-1-.448-1-1 0-.556.448-1 1-1h14c.555 0 1 .448 1 1 0 .556-.448 1-1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5zm12 0H3v11h10V5zM5.99 0h4.02A1 1 0 0 1 11 1v1H5V1c0-.556.444-1 .99-1zM10 7c.556 0 1 .446 1 .997v6.006c0 .544-.448.997-1 .997-.556 0-1-.446-1-.997V7.997C9 7.453 9.448 7 10 7zM6 7c.556 0 1 .446 1 .997v6.006c0 .544-.448.997-1 .997-.556 0-1-.446-1-.997V7.997C5 7.453 5.448 7 6 7z"></path></symbol></svg><div class="auto-reply__list-wrp">  <p class="list-loading" v-if="loading">    <span class="weui-desktop-loading"></span>  </p>  <ul :class="[\'auto-reply__list\',status]" v-if="!loading">    <li class="auto-reply__item" :class="{\'selected\': selectedIdx === idx, \'disabled\': false}" v-for="(item, idx) in replyList" @click="selectItem(idx)">      <div class="auto-reply__inner" :class="{\'without_image\': !item.cdn_url}">        <div class="auto-reply__hd">          <template v-if="item.text && !textClamp[idx]">            <p class="auto-reply__text" :data-id="idx" ref="itemTextArea" v-html="item.text"></p>          </template>          <template v-else-if="textClamp[idx]">            <mp-popover content="hover内容" trigger="hover" :delay="500" position="up-left">              <p class="auto-reply__text" :data-id="idx" ref="itemTextArea" slot="target" v-html="item.text"></p>              <p slot="content" v-html="item.text"></p>            </mp-popover>          </template>        </div>        <div class="auto-reply__bd" v-if="!!item.cdn_url">          <span class="auto-reply__cover" :style="\'background-image: url(\' + item.cdn_url + \');\'"></span>        </div>        <div class="auto-reply__ft" v-if="status == \'edit\'">          <mp-popover content="hover内容" trigger="click" ref="removePop">            <mp-tooltip content="删除" position="down-center" :delay="300" slot="target">              <button class="weui-desktop-icon-btn weui-desktop-opr-btn weui-desktop-opr-btn_primary" slot="target">                <svg width="16" height="18" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#common-del"/></svg>              </button>            </mp-tooltip>            <p slot="content">确认删除本条赞赏自动回复内容？</p>            <template slot="bar">              <mp-button type="primary" @click="removeItem(item.reply_id, idx)">确定</mp-button>              <mp-button type="default" @click="cancelRemove(idx)">取消</mp-button>            </template>          </mp-popover>        </div>      </div>    </li>  </ul></div></span>'})
define("pages/reward/modules/auto_apply_list/auto_apply_list.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.auto-reply__list {  font-size: 0;  margin-right: -20px;  margin-bottom: -20px;}.auto-reply__item {  width: 50%;  display: inline-block;  vertical-align: top;  box-sizing: border-box;  padding-right: 20px;  padding-bottom: 20px;}.auto-reply__inner {  border: 1px solid #E4E8EB;  margin: -1px;  padding: 15px;  padding-right: 110px;  border-radius: 4px;  position: relative;  min-height: 110px;  box-sizing: border-box;}.auto-reply__inner.without_image {  padding-right: 15px;}.auto-reply__inner.without_image .auto-reply__ft {  right: 15px;}.auto-reply__inner:hover .auto-reply__ft {  display: block;}.auto-reply__cover {  display: inline-block;  width: 80px;  height: 80px;  background-color: #ededed;  background-size: cover;  position: absolute;  right: 15px;  top: 15px;}.auto-reply__text {  text-overflow: ellipsis;  display: -webkit-box;  -webkit-box-orient: vertical;  -webkit-line-clamp: 3;  font-size: 14px;  line-height: 1.6;  height: 4.8em;  overflow: hidden;  margin-top: 4px;  word-break: break-word;}.auto-reply__ft {  position: absolute;  top: 15px;  right: 110px;  display: none;}.choose .auto-reply__item.selected .auto-reply__inner {  border: 2px solid #07C160;  margin: -2px;  background-color: #ebf5e9;}.choose .auto-reply__item.disabled .auto-reply__inner {  opacity: 0.5;  cursor: not-allowed;}.choose .auto-reply__item.disabled .auto-reply__inner:hover {  border: 1px solid #E4E8EB;  margin: -1px;}.choose .auto-reply__inner {  cursor: pointer;}.choose .auto-reply__inner.hover {  border: 2px solid rgba(26, 173, 25, 0.5);  margin: -2px;}.list-loading {  padding: 70px 0;  text-align: center;}";});