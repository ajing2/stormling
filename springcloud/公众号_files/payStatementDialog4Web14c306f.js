define("pages/modules/media/templatemsg/templatemsg.tpl.js",[],function(t,e,s){return'<span><svg xmlns="http://www.w3.org/2000/svg" style="width:0;height:0;visibility:hidden;position:absolute;z-index:-1"><symbol id="common-edit" viewBox="0 0 16 17"><path d="M8 1H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8h-2v7H2V3h6V1z"></path><path d="M15.185 2.714l.448-.448c.3-.3.31-.81 0-1.118l-.296-.296a.787.787 0 0 0-1.118 0l-.448.448 1.414 1.414zm-.707.707L8.414 9.485 7 8.071l6.064-6.064 1.414 1.414zm-8.15 6.21L7 8.071l1.414 1.414-1.56.673c-.515.222-.747-.016-.526-.527z"></path></symbol><symbol id="common-del" viewBox="0 0 16 18"><path d="M1 5c-.556 0-1-.448-1-1 0-.556.448-1 1-1h14c.555 0 1 .448 1 1 0 .556-.448 1-1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5zm12 0H3v11h10V5zM5.99 0h4.02A1 1 0 0 1 11 1v1H5V1c0-.556.444-1 .99-1zM10 7c.556 0 1 .446 1 .997v6.006c0 .544-.448.997-1 .997-.556 0-1-.446-1-.997V7.997C9 7.453 9.448 7 10 7zM6 7c.556 0 1 .446 1 .997v6.006c0 .544-.448.997-1 .997-.556 0-1-.446-1-.997V7.997C5 7.453 5.448 7 6 7z"></path></symbol></svg><div class="js_appmsg weui-desktop-card weui-desktop-appmsg" :data-id="item.appmsgid" @click="choose">  <div class="weui-desktop-card__inner">    <div class="weui-desktop-card__bd">        <div class="weui-desktop-appmsg__cover-item weui-desktop-appmsg__cover_thumb">            <h4 class="weui-desktop-appmsg__cover__title__wrp js_title">                <span class="weui-desktop-appmsg__cover__title">{{item.titleEncode}}</span>            </h4>            <div class="weui-desktop-appmsg__cover__thumb" v-html="item.iframeHtml"></div>            <div v-show="!item.canPreview && !item.canSelect" class="weui-desktop-mask weui-desktop-mask_transparent weui-desktop-mask_status"></div>        </div>    </div>    <div class="weui-desktop-card__ft">      <div v-show="item.showEdit" class="weui-desktop-appmsg__opr weui-desktop-link-group">        <mp-tooltip class="weui-desktop-link" content="编辑" position="down-center" :delay="300">          <a slot="target" class="weui-desktop-icon-btn" href="/cgi-bin/appmsgtemplate?action=edit&lang=zh_CN&token={token}&appmsgid={appmsgid}">              <svg width="16" height="17" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#common-edit"/></svg>          </a>        </mp-tooltip>        <mp-popover class="weui-desktop-link">          <mp-tooltip slot="target" content="删除" position="down-center" :delay="300">            <a slot="target" class="js_del weui-desktop-icon-btn" data-id="{appmsgid}" href="javascript:;">              <svg width="16" height="18" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#common-del"/></svg>            </a>          </mp-tooltip>          <div slot="content">删除后不会影响已群发的图文消息，确定删除该模版？</div>          <div slot="bar">            <mp-button type="primary">删除</mp-button>            <mp-button type="default">取消</mp-button>          </div>        </mp-popover>      </div>      <div v-show="item.showUpdateTime" class="weui-desktop-appmsg__tips weui-desktop-tips">更新于 {{item.update_time_str}}</div>    </div>  </div>  <div class="js_mask weui-desktop-mask weui-desktop-mask_status" v-show="item.canSelect" v-bind:style="isSelected">    <i class="icon_card_selected">已选择</i>  </div></div></span>'})
define("pages/modules/media_dialog/template_dialog/template_dialog.css.js", [], function (require, exports, module){module.exports = ".weui-desktop-appmsg {  position: relative;}.weui-desktop-appmsg .weui-desktop-mask {  display: none;  color: #FFFFFF;}.weui-desktop-appmsg .weui-desktop-mask_msg {  display: block;}.weui-desktop-appmsg .weui-desktop-card__inner {  padding: 0;}.weui-desktop-appmsg .weui-desktop-card__ft {  padding-left: 15px;  padding-right: 15px;  padding-top: 10px;}.weui-desktop-appmsg:hover .weui-desktop-appmsg__opr {  opacity: 1;  visibility: visible;}.weui-desktop-appmsg__cover-item {  word-wrap: break-word;  -webkit-hyphens: auto;  -ms-hyphens: auto;  hyphens: auto;  position: relative;  padding: 20px 15px 15px;}.weui-desktop-appmsg__cover-item:not(:last-child) {  padding: 12px 15px;}.weui-desktop-appmsg__cover-item:not(:last-child).weui-desktop-appmsg__cover_thumb {  position: relative;}.weui-desktop-appmsg__cover-item:not(:last-child).weui-desktop-appmsg__cover_thumb .weui-desktop-appmsg__cover__title__wrp {  position: absolute;  left: 15px;  right: 15px;  bottom: 12px;  padding: 8px 12px;  background-color: rgba(0, 0, 0, 0.55);}.weui-desktop-appmsg__cover-item:not(:last-child).weui-desktop-appmsg__cover_thumb .weui-desktop-appmsg__cover__title {  color: #FFFFFF;}.weui-desktop-appmsg__cover-item:not(:last-child).weui-desktop-appmsg__cover_thumb .weui-desktop-appmsg__cover__thumb {  margin-top: 0;}.weui-desktop-appmsg__cover-item:hover .weui-desktop-mask_preview {  display: block;}.weui-desktop-appmsg__cover__title {  font-size: 16px;  font-weight: 400;  display: block;  line-height: 1.2;  color: #353535;  overflow: hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-box-orient: vertical;  -webkit-line-clamp: 2;}.weui-desktop-appmsg__cover__thumb {  width: 100%;  height: auto;  -webkit-background-size: cover;  background-size: cover;  background-position: 50% 50%;  background-repeat: no-repeat;  background-color: #F6F8F9;  padding-bottom: 47.07792208%;  display: block;  margin-top: 20px;}.weui-desktop-appmsg__cover__desc {  padding-top: 12px;  color: #9A9A9A;}.weui-desktop-appmsg__item:after {  content: \"\\200B\";  display: block;  height: 0;  clear: both;}.weui-desktop-appmsg__item:hover .weui-desktop-mask_preview {  display: block;}.weui-desktop-appmsg__item {  padding: 12px 15px;  position: relative;}.weui-desktop-appmsg__item:before {  content: \" \";  position: absolute;  top: 0;  left: 15px;  right: 15px;  border-top: 1px solid #E4E8EB;}.weui-desktop-appmsg__thumb {  float: right;  margin-left: 12px;  width: 60px;  height: 60px;  -webkit-background-size: cover;  background-size: cover;  background-position: 50% 50%;  background-repeat: no-repeat;  background-color: #F6F8F9;}.weui-desktop-appmsg__title {  font-weight: 400;  word-wrap: break-word;  -webkit-hyphens: auto;  -ms-hyphens: auto;  hyphens: auto;  color: #353535;  overflow: hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-box-orient: vertical;  -webkit-line-clamp: 2;}.weui-desktop-appmsg__opr {  float: right;  opacity: 0;  visibility: hidden;  -webkit-transition: opacity .3s;  transition: opacity .3s;}.weui-desktop-appmsg__tips {  color: #9A9A9A;}.weui-desktop-dialog .weui-desktop-appmsg .weui-desktop-mask_preview {  display: none;}.weui-desktop-dialog .weui-desktop-appmsg.selected .weui-desktop-mask_status,.weui-desktop-dialog .weui-desktop-appmsg:hover .weui-desktop-mask_status {  display: block;}.weui-desktop-appmsg__cover__title em,.weui-desktop-appmsg__title em {  color: #07C160;  font-style: normal;}/*How to usefont-family: 'wechatnum';*/.template_dialog .weui-desktop-dialog {  width: 726px;}.template_dialog .weui-desktop-media-global-bar {  padding-top: 0;  padding-bottom: 15px;  border: 0;}.template_dialog .weui-desktop-media__list {  padding: 0 32px;}.template_dialog .weui-desktop-pagination {  padding: 6px 32px 0;}.template_dialog .weui-desktop-appmsg__cover-item {  padding: 15px 15px 0;}.template_dialog .weui-desktop-card__ft {  padding: 10px 15px 15px;}.template_dialog .template_card_wrp:nth-child(2n) .weui-desktop-card {  margin-right: 0;}.template_dialog .weui-desktop-card {  width: 324px;  text-align: left;  display: inline-block;  vertical-align: top;  margin: 0 14px 14px 0;}.template_dialog .weui-desktop-appmsg__cover__thumb {  position: relative;  padding-bottom: 47.07792208%;  margin-top: 5px;  background: transparent;}.template_dialog iframe {  position: absolute;  top: 0;  left: 0;  width: 100%;  height: 100%;  border: 0;}.weui-desktop-media__list-col:first-child:last-child {  width: 100%;}";});define("pages/modules/media_dialog/template_dialog/template_dialog.tpl.js",[],function(e,t,a){return'<mp-dialog ref="templateDialog" weui="true" v-model="dialogShow" :title="dialogTitle" @close="closeDialog" wrap-class="weui-desktop-appmsg-dialog template_dialog">  <template>    <div class="weui-desktop-global-mod weui-desktop-media-global-bar">      <div class="weui-desktop-global__extra">        <a class="js_gomanage btn btn_default" @click="reportManageClick" target="_blank" href=\'/cgi-bin/appmsgtemplate?action=list&begin=0&count=6&lang=zh_CN\'>管理模版</a>      </div>    </div>    <div class="weui-desktop-media-list-wrp">      <p v-show="loading" class="weui-desktop-media-tips weui-desktop-media-tips_loading" :style="{height: height}">加载中</p>      <p class="weui-desktop-media-tips" v-show="!!msg && !loading" :style="{height: height}">{{msg}}</p>      <div class="weui-desktop-media__list" v-show="!loading && !msg && list && list.length > 0" :style="{height: height}">          <mp-template-msg class="weui-desktop-card_inside template_card_wrp" v-for="(item, index) in list" :key="index"           :item="item" @click="selectTemplate" :selected-template="selectedTemplate"></mp-template-msg>      </div>    </div>    <mp-pagination       :per-page="pageConf.pageLen"      :total-num="pageConf.totalNum"      :current="pageConf.currentPage"      @page-change="pageChange"      v-show="list && list.length > 0">    </mp-pagination>  </template>  <template slot="footer">      <mp-button :disabled="!selectedTemplate" type="primary" @click="submit">添加到正文</mp-button>      <mp-button type="default" @click="closeDialog">取消</mp-button>  </template></mp-dialog>'})
define("pages/modules/media_dialog/template_dialog/template_common.js",["pages/modules/utils/time.js","js/common/wx/mpEditor/pluginsList.js","js/common/wx/mpEditor/utils.js"],function(e,t,o){"use strict"
var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]
for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},c=e("pages/modules/utils/time.js"),w=e("js/common/wx/mpEditor/pluginsList.js"),p=e("js/common/wx/mpEditor/utils.js")
o.exports={formatTemplateData:function(e,t){var o=!!t.canSelect,i=!!t.canPreview,n=!!t.showUpdateTime,a=!!t.showEdit,m=!!t.highLine,r=t.token||""
!r&&window.wx&&window.wx.data&&window.wx.data.t&&(r=window.wx.data.t)
for(var s=0;s<e.length;s++){var d=e[s]
l(d,{token:r,canSelect:o,canPreview:i,showUpdateTime:n,showEdit:a,highLine:m}),d.update_time&&(d.update_time_str=c.timeFormat(d.update_time)),d.titleEncode=d.title,d.titleEncode=m?d.titleEncode.replace(/<em>/g,"__em_start__").replace(/<\/em>/g,"__em_end__").html(!0).replace(/__em_end__/g,"<em>").replace(/__em_start/g,"</em>"):d.titleEncode.html(!0),d.content=w.formatTemplateContent({content:d.content,appmsgTmplVideoWidth:400}),d.iframeHtml=function(t,o){return p.createLocalIframe({onIframeReadyFunc:function(e){e.doc.body.innerHTML=t[o].content,window.wx&&window.wx.EditorRes&&window.wx.EditorRes.template_iframe&&(e.doc.head.innerHTML='<link rel="stylesheet" type="text/css" href="'+window.wx.EditorRes.template_iframe+'">')}})}(e,s)}}}})
define("common/wx/mpEditor/pluginsList.js",["common/wx/mpEditor/plugin/vote.js","common/wx/mpEditor/plugin/card.js","common/wx/mpEditor/plugin/emotion.js","common/wx/mpEditor/plugin/link.js","common/wx/mpEditor/plugin/unlink.js","common/wx/mpEditor/plugin/audio_music.js","common/wx/mpEditor/plugin/weapp.js","common/wx/mpEditor/plugin/img.js","common/wx/mpEditor/plugin/adv.js","common/wx/mpEditor/plugin/video.js","common/wx/mpEditor/plugin/insert_product.js","common/wx/mpEditor/plugin/cps.js","common/wx/mpEditor/plugin/insertcode.js","common/wx/mpEditor/plugin/blockquote.js","common/wx/mpEditor/plugin/insertquestion.js","common/wx/mpEditor/plugin/redPacketCover.js","3rd/editor/common/no_editable.js"],function(e){
"use strict";
function n(){
return{
Vote:r,
Card:a,
Emotion:c,
MyLink:s,
Unlink:_,
AudioMusicPlugin:d,
WeappPlugin:u,
Img:m,
Ad:p,
Video:w,
InsertProduct:l,
InsertCps:g,
InsertCode:h,
Blockquote:j,
InsertQuestion:x,
RedPacketCover:v
};
}
function o(e){
var n=[];
return n.push(new m({
container:"#js_editor_insertimage",
redbit:1,
can_show_reddot:1&e.red_dot_flag
})),n.push(new w({
container:"#js_editor_insertvideo",
can_use_txvideo:e.can_use_txvideo,
show_share_dialog:e.show_share_dialog,
redbit:2,
can_show_reddot:2&e.red_dot_flag
})),n.push(new r({
container:e.can_use_vote?"#js_editor_insertvote":"",
can_use_vote:e.can_use_vote,
redbit:8,
can_show_reddot:8&e.red_dot_flag
})),n.push(new a({
container:e.can_use_card?"#js_editor_insertcard":"",
biz_uin:e.biz_uin,
can_use_card:e.can_use_card,
redbit:16,
can_show_reddot:16&e.red_dot_flag
})),n.push(new p({
container:e.can_see_ad?"#js_editor_insertad":"",
has_ad:e.has_ad,
can_see_ad:e.can_see_ad,
redbit:32,
can_show_reddot:32&e.red_dot_flag
})),n.push(new d({
container:e.can_use_voice||e.qqmusic_flag?"#audio_music_plugin_btn":"",
allowAudio:e.can_use_voice,
allowMusic:e.qqmusic_flag,
redbit:4,
can_show_reddot:4&e.red_dot_flag
})),n.push(new u({
container:e.can_use_weapp_card?"#js_editor_insertweapp":"",
can_use_weapp_card:e.can_use_weapp_card,
redbit:64,
can_show_reddot:64&e.red_dot_flag
})),n.push(new s({
container:"#js_editor_insertlink",
can_use_hyperlink:e.can_use_hyperlink,
can_use_appmsg_outer_url:e.can_use_appmsg_outer_url
})),n.push(new _),n.push(new c),n.push(new g({
container:"#editor_insertcpsmoviebook",
can_use_cps:e.can_use_cps,
tipStatus:e.cpsTipStatus,
redbit:256,
can_show_reddot:256&e.red_dot_flag
})),n.push(new j({})),n.push(new x({
container:"#js_editor_insertquestion",
can_use_qa:window.wx&&window.wx.commonData&&window.wx.commonData.acl?window.wx.commonData.acl.msg_acl.can_use_qa||0:0
})),n.push(new v({
container:"#editor_redpacketcover",
redbit:512,
can_show_reddot:512&e.red_dot_flag,
can_use_redpacketcover:e.can_use_redpacketcover
})),n;
}
function t(e){
return[new m({
container:e.hasContainer?"#js_editor_insertimage":""
}),new w({
container:e.hasContainer?"#js_editor_insertvideo":"",
can_use_txvideo:e.can_use_txvideo,
show_share_dialog:!1
}),new r({
container:e.can_use_vote&&e.hasContainer?"#js_editor_insertvote":"",
can_use_vote:e.can_use_vote
}),new a({
container:e.can_use_card&&e.hasContainer?"#js_editor_insertcard":"",
biz_uin:e.biz_uin,
can_use_card:e.can_use_card
}),new p({
can_see_ad:!1,
has_ad:0
}),new d({
container:(e.can_use_voice||e.qqmusic_flag)&&e.hasContainer?"#audio_music_plugin_btn":"",
allowAudio:e.can_use_voice,
allowMusic:e.qqmusic_flag
}),new u({
container:e.can_use_weapp_card&&e.hasContainer?"#js_editor_insertweapp":"",
can_use_weapp_card:e.can_use_weapp_card
}),new s({
container:"#js_editor_insertlink",
can_use_hyperlink:e.can_use_hyperlink,
can_use_appmsg_outer_url:e.can_use_appmsg_outer_url
}),new _,new c,new g({
clearProduct:!0
}),new j({}),new x({
container:e.hasContainer?"#js_editor_insertquestion":"",
can_use_qa:window.wx&&window.wx.commonData&&window.wx.commonData.acl?window.wx.commonData.acl.msg_acl.can_use_qa||0:0
}),new v({
container:"",
can_use_redpacketcover:!1,
remove:!0
})];
}
function i(e){
var o=n();
for(var t in o)if(o.hasOwnProperty(t))switch(name){
case"Video":
e.content=o[t].beforeSetContent({
isPreview:!1,
html:e.content,
width:e.appmsgTmplVideoWidth
});
break;

case"Ad":
e.content=o[t].beforeSetContent({
html:e.content,
can_see_ad:!1
});
break;

case"InsertProduct":
e.content=o[t].beforeSetContent({
html:e.content,
clearProduct:!0,
isPreview:!1
});
break;

case"InsertCps":
e.content=o[t].beforeSetContent({
html:e.content,
clearProduct:!0,
isPreview:!1
});
break;

default:
"function"==typeof o[t].beforeSetContent&&(e.content=o[t].beforeSetContent({
html:e.content
}));
}
var i=$("<div></div>").html(e.content);
return E.formatUneditablePluginHtml({
$container:i
}),e.content=i.html(),e.content;
}
var r=e("common/wx/mpEditor/plugin/vote.js"),a=e("common/wx/mpEditor/plugin/card.js"),c=e("common/wx/mpEditor/plugin/emotion.js"),s=e("common/wx/mpEditor/plugin/link.js"),_=e("common/wx/mpEditor/plugin/unlink.js"),d=e("common/wx/mpEditor/plugin/audio_music.js"),u=e("common/wx/mpEditor/plugin/weapp.js"),m=e("common/wx/mpEditor/plugin/img.js"),p=e("common/wx/mpEditor/plugin/adv.js"),w=e("common/wx/mpEditor/plugin/video.js"),l=e("common/wx/mpEditor/plugin/insert_product.js"),g=e("common/wx/mpEditor/plugin/cps.js"),h=e("common/wx/mpEditor/plugin/insertcode.js"),j=e("common/wx/mpEditor/plugin/blockquote.js"),x=e("common/wx/mpEditor/plugin/insertquestion.js"),v=e("common/wx/mpEditor/plugin/redPacketCover.js"),E=e("3rd/editor/common/no_editable.js");
return{
getList:n,
getEditorPluginsObject:o,
getTemplateEditorPluginsObject:t,
formatTemplateContent:i
};
});define("common/wx/mpEditor/utils.js",[],function(){
"use strict";
function e(){
return l.uid++;
}
function t(e,t){
return(l.ie&&l.version<9?"":"<!DOCTYPE html>")+"<html xmlns='http://www.w3.org/1999/xhtml' style='overflow:hidden;'><head></head><body></body><script type='text/javascript'  id='_initialScript'>setTimeout(function(){window.parent.parent.window.__templateCardIframeReady(document,'"+e+"','"+(t||"")+"');var _tmpScript = document.getElementById('_initialScript');if(_tmpScript&&_tmpScript.parentNode){_tmpScript.parentNode.removeChild(_tmpScript);}},0)</script></html>";
}
function n(t){
var n=e();
i(t,n);
var a="";
if(t.attr)for(var c in t.attr)t.attr.hasOwnProperty(c)&&(a+=" "+c+'="'+t.attr[c]+'"');
var o="<iframe "+a+' data-uid="'+n+'" src="#src#"></iframe>';
return t.noSrc===!0?o.replace("#src#","about:blank"):o.replace("#src#",r(n,t.uid));
}
function r(e,t){
return"javascript:void(function(){window.parent.parent.window.__templateCardIframeWrite(document,'"+e+"','"+(t||"")+"');}())";
}
function a(e){
try{
delete l.iframeReadyFunc[e];
}catch(t){}
}
function i(e,t){
function n(e){
return function(t){
var n,r=t.uid,a=e.$dom;
return a||(a=$(t.win.parent.document.body)),a&&a.length>0&&(n=a.find("iframe[data-uid="+r+"]"),
n=n&&n.length>0?n[0]:null),n||(n=$(document.body).find("iframe[data-uid="+r+"]"),
n=n&&n.length>0?n[0]:null),n&&("function"==typeof e.onIframeReadyFunc&&e.onIframeReadyFunc({
doc:t.doc,
win:t.win,
iframe:n
}),e.iframeSelect===!0&&window.__editorIframeSelect&&$(t.doc.body).on("click",function(){
var e=this.ownerDocument,t=e?e.defaultView||e.parentWindow:null;
t&&window.__editorIframeSelect(t);
})),e;
};
}
e&&(e.uid?l.iframeReadyFunc[e.uid]&&e.force!==!0||(l.iframeReadyFunc[e.uid]=n(e)):t&&(l.iframeReadyFunc[t]=n(e)));
}
function c(e){
e.prototype.bindEventInterface=function(e){
return this.domUtils&&this.editor?("domUtils"==e.type?this.domUtils.on(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.addListener(e.eventName,e.fun),
this.__EventInterfaceCache||(this.__EventInterfaceCache=[]),void this.__EventInterfaceCache.push(e)):!1;
},e.prototype.unbindEventInterface=function(){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache)for(;this.__EventInterfaceCache.length>0;){
var e=this.__EventInterfaceCache[0];
"domUtils"==e.type?this.domUtils.un(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.removeListener(e.eventName,e.fun),
this.__EventInterfaceCache.shift();
}
this.__EventInterfaceCache=[];
},e.prototype.unbindSpecifyEvent=function(e){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache&&e)for(var t=0,n=this.__EventInterfaceCache.length;n>t;t++){
var r=this.__EventInterfaceCache[t];
if(r.type===e.type&&r.eventName===e.eventName&&r.fun===e.fun&&(!e.dom||e.dom&&r.dom===e.dom)){
"domUtils"==r.type?this.domUtils.un(r.dom,r.eventName,r.fun):"editor"==r.type&&this.editor.removeListener(r.eventName,r.fun),
this.__EventInterfaceCache.splice(t,1);
break;
}
}
};
}
function o(e){
if(e&&0!=e.length){
var t=l.asynRenderIframeKey++;
l.asynRenderIframeId[t]=null,f(e,t,function(e){
e.replaceTagName("iframe");
});
}
}
function d(e){
if(e&&0!=e.length){
var t=l.asynRenderIframeKey++;
l.asynRenderIframeId[t]=null,f(e,t,function(e){
e.attr("src",e.attr("src"));
});
}
}
function f(e,t,n){
if(e&&0!=e.length){
var r=function(){
var r=+new Date;
if(e&&e.length>0)if(l.asynRenderIframeId[t]){
var a=r-l.asynRenderIframeId[t];
if(l.asynRenderIframeId[t]=r,120>a){
var i=e.shift(),c=i.parent();
c&&c.length>0?n(i):e=[];
}
}else l.asynRenderIframeId[t]=r;
f(e,t,n);
};
window.requestAnimationFrame(r);
}else try{
delete l.asynRenderIframeId[t];
}catch(a){}
}
function m(e){
for(var t,n=[/^http(s)?:\/\/vpic\.video\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/shp\.qpic\.cn([\/?].*)*$/i],r=0;t=n[r++];)if(t.test(e))return!0;
return!1;
}
function u(e){
e=e||"";
var t="";
return 0==e.length?"":(t=e.replace(/&lt;/g,"<"),t=t.replace(/&gt;/g,">"),t=t.replace(/&nbsp;/g,"    "),
t=t.replace(/&#039;|&#39;/g,"'"),t=t.replace(/&#047;|&#47;/g,"/"),t=t.replace(/&#092;|&#92;/g,"\\"),
t=t.replace(/&quot;/g,'"'),t=t.replace(/&amp;/g,"&"),t=t.replace(/<br>/g,"\n"),t=t.replace(/<br\/>/g,"\n"),
t=t.replace(/<br \/>/g,"\n"));
}
var s=navigator.userAgent.toLowerCase(),l={
uid:+new Date,
iframeReadyFunc:{},
ie:/(msie\s|trident.*rv:)([\w.]+)/.test(s),
version:0,
edge:/edge\/([\w.]+)/i.test(s),
asynRenderIframeKey:+new Date,
asynRenderIframeId:{}
};
return function(e,t){
if(e.ie){
var n=t.match(/(?:msie\s([\w.]+))/),r=t.match(/(?:trident.*rv:([\w.]+))/);
e.version=n&&r&&n[1]&&r[1]?Math.max(1*n[1],1*r[1]):n&&n[1]?1*n[1]:r&&r[1]?1*r[1]:0;
}
}(l,s,window),function(e,t){
"function"!=typeof e.__templateCardIframeWrite&&(e.__templateCardIframeWrite=function(e,n,r){
e.open(),e.write(t(n,r)),e.close();
});
}(window,t),function(e,t){
"function"!=typeof e.__templateCardIframeReady&&(e.__templateCardIframeReady=function(e,n,r){
var a,i;
if(i=r?t[r]:t[n],"function"==typeof i&&e){
var c=e.defaultView||e.parentWindow;
c&&(a=i({
uid:n,
customerUid:r,
doc:e,
win:c
}));
}
if(!a||a.notClear!==!0)try{
delete t[n];
}catch(o){}
});
}(window,l.iframeReadyFunc),{
getuid:e,
getIframeSrc:r,
createIframeReadyFunc:i,
createLocalIframe:n,
clearIframeReadyFunc:a,
initEventInterface:c,
createAsynRenderIframe:o,
createAsynIframeReload:d,
isOuterWhiteDomain:m,
htmlDecode:u
};
});define("pages/modules/media_dialog/music_check_dialog/musicCheckDialog4Web1.js",["pages/modules/media_dialog/music_check_dialog/music_check_dialog.js"],function(i,e,a){"use strict"
function s(){return{isShow:!1,appmsgid:"",musicdata:[],focustype:"opentab"}}i("pages/modules/media_dialog/music_check_dialog/music_check_dialog.js"),a.exports={getParams:s,bindEvent:function(c){c.eventBus.$on("showMusicCheckDialog",function(){var i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=s()
for(var a in i)void 0!==e[a]&&(e[a]=i[a])
for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(c.params[o]=e[o])
c.params.isShow=!0})},close:function(i){i.eventBus.$emit("showMusicCheckDialog_callback",i.data)}}})
define("pages/modules/media_dialog/music_check_dialog/music_check_dialog.js",["pages/modules/media_dialog/music_check_dialog/music_check_dialog.css.js","pages/modules/media_dialog/music_check_dialog/music_check_dialog.tpl.js","pages/modules/dbCache/dbCache.js"],function(a,i,t){"use strict"
a("pages/modules/media_dialog/music_check_dialog/music_check_dialog.css.js")
var e=a("pages/modules/media_dialog/music_check_dialog/music_check_dialog.tpl.js"),o=a("pages/modules/dbCache/dbCache.js"),c="masssendMusicCheck",d=3e5
Vue.component("mp-music-check-dialog",{template:e,props:{value:{type:Boolean,default:!1},appmsgid:{type:String,default:""},focustype:{type:String,default:"opentab"},musicdata:{type:Array,default:[]}},data:function(){for(var a=[],i=0,t=this.musicdata.length;i<t;i++){var e=this.musicdata[i]
a.push({song_type:e.song_type,song_mid:e.song_mid,song_title:e.song_title,appmsg_title:e.appmsg_title,appmsg_idx:e.appmsg_idx,appmsg_id:this.appmsgid})}return{title:"校验提醒",dialogShow:!1,data:a,cacheWin:{}}},watch:{value:function(a){!0===a?this.show():this.hide()},dialogShow:function(a){this.$emit("input",a)}},mounted:function(){!0===this.value&&this.show()},methods:{show:function(){!0!==this.dialogShow&&(this.dialogShow=!0)},hide:function(){!1!==this.dialogShow&&(this.dialogShow=!1)},dialogClose:function(a){var i=0<arguments.length&&void 0!==a?a:{}
this.hide()
var t=null
i.errorData&&0<i.errorData.length&&i.focusData&&(t={errorData:i.errorData,focusData:i.focusData}),this.$emit("cancel",t)},musicTitleClick:function(a){var i=0<arguments.length&&void 0!==a?a:{}
this.focusMusic({focusData:i.item,errorData:this.data})},modifyBtnClick:function(){this.focusMusic({focusData:this.data[0],errorData:this.data})},focusMusic:function(a){var i=0<arguments.length&&void 0!==a?a:{}
"opentab"===this.focustype?this.openNewTab({errorData:i.errorData,focusData:i.focusData}):this.dialogClose({errorData:i.errorData,focusData:i.focusData})},openNewTab:function(a){var i=0<arguments.length&&void 0!==a?a:{}
if(wx&&wx.commonData&&wx.commonData.data&&wx.commonData.data.param){o.set({data:{cacheKey:c,cacheValue:{type:"music",appmsgid:this.appmsgid,focusData:i.focusData,errorData:i.errorData},expireTime:+new Date+d}})
var t="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid="+this.appmsgid+wx.commonData.data.param,e="appmsg_"+this.appmsgid,s=this.cacheWin[e]||null
!s||s.location&&s.location.href||(s=null,delete this.cacheWin[e]),s&&0<s.location.href.indexOf("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit")&&0<s.location.href.indexOf("&appmsgid="+this.appmsgid)?window.open("",e):(s=window.open(t,e),this.cacheWin[e]=s),s&&"function"==typeof s.musicCheckResultFocus&&s.musicCheckResultFocus()}}}})})
define("pages/modules/media_dialog/music_check_dialog/music_check_dialog.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.weui-desktop-table_show-head .weui-desktop-table__bd {  display: none;}.weui-desktop-table_show-body .weui-desktop-table__hd {  display: none;}.weui-desktop-music-check-dialog .weui-desktop-dialog {  width: 726px;}.weui-desktop-music-check-dialog .weui-desktop-table_show-body {  height: 215px;  overflow: auto;  -webkit-overflow-scrolling: touch;}.music_check_context {  padding: 0 30px 15px;}.music_check_title {  font-size: 18px;  font-weight: 400;  text-align: center;  color: rgba(0, 0, 0, 0.9);  padding: 30px 0;}.music_check_list th:nth-last-child(n+2),.music_check_list th:nth-last-child(n+2) ~ th,.music_check_list td:nth-last-child(n+2),.music_check_list td:nth-last-child(n+2) ~ td {  width: 50%;  padding-left: 20px;  padding-right: 20px;  box-sizing: border-box;}.music_check_list .weui-desktop-table td {  padding-top: 15px;  padding-bottom: 15px;}.music_check_list .weui-desktop-table th:last-child,.music_check_list .weui-desktop-table td:last-child {  text-align: left;}.music_check_item,.music_check_article {  overflow: hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-box-orient: vertical;  -webkit-line-clamp: 1;}.music_check_item a {  color: rgba(0, 0, 0, 0.9);}.music_check_article {  color: rgba(0, 0, 0, 0.5);  font-weight: 400;}.weui-desktop-loading_transparent {  width: 40px;  height: 40px;  animation: none;  background-image: url(\"data:image/gif;base64,R0lGODlhKAAoANU+APr6+/v7/Pz8/efo7f39/v39/evs8Pn5+vX19+nq7urr7/Dx9Pf3+fb2+Ozt8e/w8+7v8ujp7ubn7Ojp7fPz9vLz9fLy9fz8/Pj4+u7u8vP09vT19/j4+fX2+P7+//b3+PHx9PT09u3u8ff4+e3t8fHy9PDw8/T09/n5+/v8/O3u8u/v8/Hy9fj5+vn6++zs8Pz9/erq7+nq7/r7/Ovr8Ozt8Ofo7Pb3+fr7++/v8unp7uvr7/7+/v///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InV1aWQ6NTk3ODkzNjAyNjc1REYxMTkzNTE5OTE4NTI1NTdEREMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTYwNEI2OTQxQzY1MTFFNDk3OURCQ0I4QkE5Mzc4NEQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTYwNEI2OTMxQzY1MTFFNDk3OURCQ0I4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\");}";});define("pages/modules/media_dialog/music_check_dialog/music_check_dialog.tpl.js",[],function(t,e,i){return'<mp-dialog weui="true" v-model="dialogShow" :title="title" wrap-class="weui-desktop-music-check-dialog" @close="dialogClose">  <div class="music_check_context">    <h4 class="music_check_title">以下音乐因版权失效无法播放，请更换音乐</h4>    <div class="music_check_list">     <div class="weui-desktop-table__wrp weui-desktop-table_show-head">      <table class="weui-desktop-table">        <thead class="weui-desktop-table__hd">          <tr>            <th>失效音乐</th>            <th>所属文章</th>          </tr>        </thead>        <tbody class="weui-desktop-table__bd">          <tr v-for="(item, i) in data" :key="item.song_mid+i">            <td>              <p class="music_check_item">                <a href="javascript:;" @click.stop.prevent="musicTitleClick({index: i, item: item})">{{item.song_title}}</a>              </p>            </td>            <td>              <strong class="music_check_article">{{item.appmsg_title}}</strong>            </td>          </tr>        </tbody>      </table>     </div>          <div class="weui-desktop-table__wrp weui-desktop-table_show-body">      <table class="weui-desktop-table">        <thead class="weui-desktop-table__hd">          <tr>            <th>失效音乐</th>            <th>所属文章</th>          </tr>        </thead>        <tbody class="weui-desktop-table__bd">          <tr v-for="(item, i) in data" :key="item.song_mid+i">            <td>              <p class="music_check_item">                <a href="javascript:;" @click.stop.prevent="musicTitleClick({index: i, item: item})">{{item.song_title}}</a>              </p>            </td>            <td>              <strong class="music_check_article">{{item.appmsg_title}}</strong>            </td>          </tr>        </tbody>      </table>     </div>    </div>  </div>  <template slot="footer">    <mp-button type="primary" @click="modifyBtnClick">去修改</mp-button>    <mp-button @click="dialogClose">取消</mp-button>  </template></mp-dialog>'})
define("pages/modules/media_dialog/pay_statement_dialog/payStatementDialog4Web1.js",["pages/modules/media_dialog/pay_statement_dialog/pay_statement_dialog.js"],function(a,e,t){"use strict"
a("pages/modules/media_dialog/pay_statement_dialog/pay_statement_dialog.js"),t.exports={getParams:function(){return{isShow:!1,canReward:0,writer:{hasAuthor:!1,writerid:"",username:"",nickname:"",authorStatus:0,canReward:0,headimg:""},authorName:"",payNumber:null,readProportion:50,description:"",step:1,priceOptionList:[]}},bindEvent:function(e){e.eventBus.$on("showPayStatementDialog",function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
e.params.isShow=a.isShow||!1,e.params.canReward=a.canReward||0,e.params.writer=a.writer||{hasAuthor:!1,writerid:"",username:"",nickname:"",authorStatus:0,canReward:0,headimg:""},e.params.authorName=a.authorName||"",e.params.payNumber=a.payNumber||null,e.params.readProportion=void 0!==a.readProportion?a.readProportion:50,e.params.priceOptionList=a.priceOptionList,e.params.description=a.description||"",e.params.step=a.step||1})},close:function(a){a.eventBus.$emit("showPayStatementDialog_callback",a.data)}}})
