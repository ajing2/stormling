define("media/share_article.js",["media/common.js","common/wx/media/shareCopyrightDialog.js","tpl/media/appmsg_edit/share_article_content.html.js","media/base_article.js","biz_common/jquery.validate.js"],function(e){
"use strict";
var i=(e("media/common.js"),e("common/wx/media/shareCopyrightDialog.js")),t=e("tpl/media/appmsg_edit/share_article_content.html.js"),r=e("media/base_article.js"),a=e("biz_common/jquery.validate.js"),s=(a.rules,
r.inherit({
init:function(){
this.initTextEditorEnv();
},
initData:function(){
var e=r.prototype.initData.call(this);
e.set("guide_words",e.get("guide_words")||"分享一篇文章。"),e.set("author",""),e.set("file_id",""),
e.set("is_share_copyright",1),e.set("share_page_type",9);
var i=e.get("content").html(!1).replace(/<img[^>]*>/g,"<p>[图片]</p>").replace(/<iframe [^>]*?class=\"res_iframe card_iframe js_editor_card\"[^>]*?data-cardid=\"\"[^>]*?><\/iframe>/gi,"<p>[卡券]</p>").replace(/<mpvoice([^>]*?)js_editor_audio([^>]*?)><\/mpvoice>/g,"<p>[音频]</p>").replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<p>[音乐]</p>").replace(/<mpgongyi([^>]*?)js_editor_gy([^>]*?)><\/mpgongyi>/g,"<p>[公益]</p>").replace(/<mpshop([^>]*?)js_editor_shop([^>]*?)><\/mpshop>/g,"<p>[小店]</p>").replace(/<iframe([^>]*?)class=[\'\"][^\'\"]*video_iframe([^>]*?)><\/iframe>/g,"<p>[视频]</p>").replace(/(<iframe[^>]*?js_editor_vote_card[^<]*?<\/iframe>)/gi,"<p>[投票]</p>").replace(/<mp-weapp([^>]*?)weapp_element([^>]*?)><\/mp-weapp>/g,"<p>[小程序]</p>"),t=document.createElement("div");
return t.innerHTML=i,i=t.innerText.trim().substr(0,140),i=i.split("\n").map(function(e){
return"<p>"+e+"</p>";
}),e.set("content",i.join("")),e;
},
getDigestFromContent:function(){
var e=this.data;
return $.trim(e.get("guide_words").substr(0,120));
},
flush:function(){
{
var e=this.data;
this._o.$infoContainer;
}
return this.flushField(),this.flushGuidWords(),this.setDigest(),e.set("guide_words",e.get("guide_words")||"分享一篇文章。"),
e.set("file_id",""),e.set("author",""),this.flushCommon(),this;
},
validate:function(e){
var i={
isValid:!0,
viewClass:"",
item:e,
$dom:this._o.$infoContainer,
strict:!1
};
return i=this.validateGuideWords(i),this.handleValidateResult(i);
},
validateStrictly:function(e){
var i={
isValid:!0,
viewClass:"",
item:e,
$dom:this._o.$infoContainer,
strict:!0
};
return i=this.validateGuideWords(i),this.handleValidateResult(i);
},
render:function(){
var e=this._o.ueditor;
r.prototype.render.call(this);
this._o.$infoContainer;
this.renderGuidWords(),this.renderSharePreview({
tpl:t
}),e.fireEvent("renderEditorByType",2,function(){
e.fireEvent("setCoverStatus",{
status:!0,
readonly:!0,
tips:"分享图文不可设置封面"
});
});
}
}));
return s.hideDialog=function(e){
e?this.dialog.hide():this.dialog.show();
},s.showDialog=function(e){
this.dialog=new i({
onOK:function(i){
e.onOk({
data:{
title:i.title,
author:i.author,
cover:i.cover_url,
cdn_url:i.cover_url,
content:i.content,
copyright_headimg:i.head_img_url,
copyright_nickname:i.nickname,
profile_description:i.profile_description,
share_page_type:0===i.pubType?11:9,
share_copyright_url:i.url,
source_reprint_status:i.source_reprint_status,
source_article_type:i.article_type,
source_url:i.source_url
}
});
},
onCancel:function(){
e.onCancel();
}
});
},s;
});define("media/appmsg_article.js",["media/common.js","media/base_article.js","media/get_article_structure.js"],function(t){
"use strict";
var e=t("media/common.js"),i=t("media/base_article.js"),r=t("media/get_article_structure.js"),n=r.getArticleStructureNoAd,a='<p class="js_pay_preview_filter"><mp-pay-preview-filter></mp-pay-preview-filter></p>',o='<p class="js_pay_preview_filter" style="height: 0; overflow: hidden;"><mp-pay-preview-filter></mp-pay-preview-filter></p>',s=/<p[^>]*><mp-pay-preview-filter><\/mp-pay-preview-filter><\/p>/g,d=i.inherit({
init:function(){},
getDigestFromContent:function(){
var t=this.data;
return $.trim(t.get("content").text().html(!1).substr(0,54));
},
setEditorContent:function(){
var t=this;
t._o.ueditor.ready(function(){
var e=t.data.getData();
e.is_pay_subscribe&&(e.content=e.content.replace(s,o));
var i=t._o.ueditor;
i.setContent({
content:"",
data:e
});
try{
i.setContent({
content:e.content,
data:e
});
}catch(r){
e.content&&""==i.getUeditor().getContent()&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=editor_setcontent_error;errmsg:%s,uin:%s".sprintf(28308,0,r.message,wx.data.uin),
window.BJ_REPORT&&"function"==typeof window.BJ_REPORT.report&&r&&r.stack&&(r.stack="editor_setcontent_error|"+r.stack,
window.BJ_REPORT.report(r)),r.stack&&console&&console.error&&console.error("[BJ-REPORT]",r.stack));
}
i.setHistory(t.getHistory());
});
},
flush:function(){
{
var t=this.data,e=this._o.$infoContainer;
this._o.cgiData;
}
this.flushField();
var i=this._o.ueditor.getEditorData(t.getData());
return i.is_pay_subscribe&&!function(){
i.content=i.content.replace(s,"");
var t=e.find("#js_pay_preview_popup").data("offset");
void 0!==t&&!function(){
t*=1;
var e=document.createElement("div");
e.innerHTML=i.content;
var r=n(e,{
getNestedStructure:!0,
ignoreFlexChildren:!0,
ignoreNotWriteableChildren:!0,
needEl:!0,
getSpan:!0
}),o=0;
r.some(function(i){
var r=i.el,n=i.isWrapper;
if(!n&&(o++,o===t)){
for(var s=r.parentNode;s!==e&&s.children[0]===r;)r=s,s=s.parentNode;
return r.insertAdjacentHTML("beforebegin",a),!0;
}
}),i.content=e.innerHTML;
}();
}(),t.setData(i),this.setDigest(),this.flushCommon(),this;
},
getAllImgData:function(){
var t=this._o.ueditor,e=t.fireEvent("getRemoteList"),i=[];
for(var r in e){
var n=e[r];
i.push(n.uid);
}
i=0==i.length?"":","+i.join(",")+",";
for(var a=t.getDocument(),o=a.getElementsByTagName("*"),s=",",d=[],r=0,c=o.length;c>r;r++){
var n=o[r],l=$(n);
if(/img/i.test(n.nodeName)){
var u=n.getAttribute("_src")||n.src||"",h=n.getAttribute("data-remoteid")||"";
if(l.hasClass("js_catchremoteimageerror")||1*l.attr("data-notusecover")===1)continue;
if(!u)continue;
if(s.indexOf(","+u+",")>=0)continue;
var m=!1;
i&&h&&i.indexOf(","+h+",")>=0&&(m=!0),s+=u+",",d.push({
url:u,
uid:h,
isRemote:m
});
}else{
var f=n.getAttribute("style")||n.style.cssText||"";
if(f=f.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),f&&f[2]){
var u=f[2].replace(/^['"]|['"]$/g,""),h=n.getAttribute("data-remoteid")||"";
if($(n).hasClass("js_catchremoteimageerror")||1*l.attr("data-notusecover")===1)continue;
if(!u)continue;
if(s.indexOf(","+u+",")>=0)continue;
var m=!1;
i&&h&&i.indexOf(","+h+",")>=0&&(m=!0),s+=u+",",d.push({
url:u,
uid:h,
isRemote:m
});
}
}
}
return d;
},
gif2Img:function(t){
return/\/0\?(.*&)?wx_fmt=gif/.test(t)?t.replace(/\/0\?/,"/s640?"):t;
},
validateCatchRemoteImage:function(t){
var e=$("<div>").html(t.content),i=this._o.ueditor.fireEvent("handleCatchTips",{
$dom:e,
needPost:!1
});
return i.errNum?!1:!0;
},
validateTitle:function(t){
var i=t.item,r=t.$dom,n=e.validate({
key:"title",
content:i.title,
strict:t.strict
});
return n&&n.msg&&(this.showErrMsg(r.find(".js_title_error"),n.msg),t.viewClass=t.viewClass||".js_title_error",
t.isValid=!1,2==n.type&&((new Image).src="https://mp.weixin.qq.com/misc/jslog?id=115&content=badjs&level=error")),
t;
},
validateAuthor:function(t){
var e=t.item,i=t.$dom;
return!this.data.get("writerid")&&e.author.len()>16&&(this.showErrMsg(i.find(".js_author_error"),"作者不能超过8个字"),
t.viewClass=t.viewClass||".js_author_error",t.isValid=!1),t;
},
validateEditor:function(t,i){
var r=t.item,n=t.$dom,a=e.validate({
key:"content",
content:r.content,
editor:i,
strict:t.strict,
articleData:r
});
return a&&a.msg&&(a.noTips!==!0&&(this.showErrMsg(n.find(".js_content_error"),a.msg),
t.viewClass=t.viewClass||".js_content_error"),t.isValid=!1),t;
},
validate:function(t){
if(this.validateCatchRemoteImage(t)===!1)return null;
var e=this._o.$infoContainer,i=this._o.ueditor,r={
isValid:!0,
viewClass:"",
item:t,
$dom:e,
strict:!1
},n=t.content?t.content.text():"";
return t.title||n||t.fileid||(this.showErrMsg(e.find(".js_content_error"),"请先输入一段正文（或者标题），再点击保存按钮。"),
i.getUeditor().focus(),r.viewClass=r.viewClass||".js_content_error",r.isValid=!1),
r=this.validateTitle(r),this.data.get("writerid")||(r=this.validateAuthor(r)),r=this.validateEditor(r,i),
r=this.validateCommon(r),this.handleValidateResult(r);
},
checkSourceUrl:function(){},
validateStrictly:function(t){
if(this.validateCatchRemoteImage(t)===!1)return null;
var e=this._o.ueditor,i={
isValid:!0,
viewClass:"",
item:t,
$dom:this._o.$infoContainer,
strict:!0
};
return i=this.validateTitle(i),this.data.get("writerid")||(i=this.validateAuthor(i)),
i=this.validateEditor(i,e),i=this.validateStrictlyCommon(i),this.handleValidateResult(i);
},
modifyCurrentEditData:function(t){
i.prototype.modifyCurrentEditData.call(this,t),"undefined"!=typeof t.content&&(this.data.set("content",t.content),
this._o.ueditor.setContent({
content:t.content,
data:this.data.getData(),
isModify:!0
}));
},
render:function(){
var t=this._o.ueditor;
t.fireEvent("renderEditorByType",1),i.prototype.render.call(this),this.setEditorContent(),
i.prototype.renderPayRead.call(this),t.getUeditor().focus({
toFirstText:!0
}),$("#js_pay_setting_area").show();
}
});
return d.showDialog=function(t){
t.onOk();
},d;
});define("resp_types/file_cnt.rt.js",[],function(){
"use strict";
return{
file_cnt_R:{
total:"number",
img_cnt:"number",
voice_cnt:"number",
video_cnt:"number",
app_msg_cnt:"number",
commondity_msg_cnt:"number",
video_msg_cnt:"number",
short_video_cnt:"number",
app_msg_sent_cnt:"number"
}
};
});define("resp_types/base_resp.rt.js",[],function(){
"use strict";
return{
base_resp_R:{
ret_R:"number",
err_msg:"string"
}
};
});define("common/wx/mpEditor/plugin/checkTextUtils.js",["biz_web/lib/store.js","common/wx/Cgi.js"],function(e){
"use strict";
function t(){
for(var e=[],t=0,a=v.splitChar.length;a>t;t++)e.push(v.splitChar[t].value);
v.splitcharStr=e.join("");
}
function a(){
var e=v.uid++;
return e+"_"+Math.random();
}
function i(e){
var e=e||a();
return"<"+v.splitTagName+' id="'+e+'"></'+v.splitTagName+">";
}
function n(e){
var e=e||{};
return c({
tagName:v.splitTagName,
needGlobal:e.needGlobal
});
}
function c(e){
return e.needGlobal?new RegExp("<"+e.tagName+"[^<>]*></"+e.tagName+">","g"):new RegExp("<"+e.tagName+"[^<>]*></"+e.tagName+">");
}
function o(e){
return e?e.replace(n({
needGlobal:!0
}),"").replace(c({
needGlobal:!0,
tagName:v.tmpTagName
}),""):"";
}
function r(e){
v.checkQueue.push(e),s();
}
function s(){
if(v.checktexting!==!0&&0!=v.checkQueue.length){
var e=v.checkQueue.shift();
e.data&&("1"==e.data.status?l(e):s());
}
}
function u(e){
if(!(e&&e.data&&e.data.origin&&e.instance))return!1;
var t=encodeURIComponent(e.data.origin||"");
if(v.checkResult[t]){
var a=v.checkResult[t];
if(a.position&&a.position.length>0){
var i=e.instance.getCheckTextInfo();
i&&i[e.data.id]===e.data&&e.instance.getTextByEndSplit(e.data.id)===e.data.origin?(e.data.status=3,
e.data.position=a.position,e.instance.updateErrCount()):e.instance.clearSplitElement(e.data.id);
}else e.data.status=4,e.data.position=[],e.instance.updateErrCount();
return!0;
}
return!1;
}
function p(e){
if(e&&e.origin&&e.position){
var t=encodeURIComponent(e.origin||"");
v.checkResult[t]={
origin:e.origin,
position:e.position
};
}
}
function l(e){
return e&&e.data&&e.data.origin&&e.instance?u(e)===!0?void s():void(v.checktexting||(v.checktexting=!0,
e.data.status=2,k.post({
url:"/cgi-bin/spellingcheck?",
dataType:"json",
data:{
action:"check",
content:e.data.origin
}
},{
done:function(t){
if(t&&t.base_resp&&0==t.base_resp.ret){
var a=[];
t.check_result&&t.check_result.check_item&&t.check_result.check_item.position&&t.check_result.check_item.position.length>0&&(a=t.check_result.check_item.position),
p({
origin:e.data.origin,
position:a
}),u(e);
}else e.data.status=5;
v.checktexting=!1,s();
},
fail:function(){
v.checktexting=!1,e.data.status=5,s();
}
}))):void 0;
}
function g(){
v.checkQueue=[];
}
function h(e){
e.appmsgId&&f.set(m(e.appmsgId,e.seq),{
content:e.content,
checkTextInfo:e.checkTextInfo
});
}
function d(e,t){
var a=f.get(m(e,t));
if(a&&a.checkTextInfo){
var i={};
try{
i=JSON.parse(a.checkTextInfo);
}catch(n){
i={};
}
for(var c in i){
var o=i[c];
o&&o.origin&&"[object Array]"===Object.prototype.toString.call(o.position)&&("3"==o.status||"4"==o.status)&&p({
origin:o.origin,
position:o.position
});
}
}
return a;
}
function m(e,t){
return v.cacheKey+"_"+wx.data.uin+"_"+e+"_"+t;
}
var f=e("biz_web/lib/store.js"),k=e("common/wx/Cgi.js"),v={
checkResult:{},
cacheKey:"mpchecktextinfo",
checkQueue:[],
checktexting:!1,
splitChar:[{
value:"？",
escape:!1
},{
value:"！",
escape:!1
},{
value:"。",
escape:!1
},{
value:"：",
escape:!1
},{
value:"；",
escape:!1
},{
value:"?",
escape:!0
},{
value:"!",
escape:!0
},{
value:":",
escape:!0
}],
blockTag:{
p:1,
section:1,
br:1,
iframe:1,
h1:1,
h2:1,
h3:1,
h4:1,
h5:1,
h6:1,
hr:1,
table:1,
ul:1,
div:1,
dl:1,
ol:1,
pre:1,
form:1,
figure:1,
output:1,
hgroup:1,
video:1,
footer:1,
header:1,
canvas:1,
audio:1,
aside:1,
figcaption:1,
address:1,
blockquote:1,
center:1,
dir:1,
fieldset:1,
isindex:1,
menu:1,
noframes:1
},
splitTagName:"mpchecktext",
splitTagText:"mpchecktext@#%mpchecktext",
tmpTagName:"mptmpchecktext",
uid:+new Date
};
return t(),{
splitcharStr:v.splitcharStr,
splitChar:v.splitChar,
splitTagName:v.splitTagName,
getSplitTag:i,
getSplitTagReg:n,
tmpTagName:v.tmpTagName,
getUid:a,
splitTagText:v.splitTagText,
blockTag:v.blockTag,
clearSplitTag:o,
addCheckInfoQueue:r,
clearQueue:g,
setCacheData:h,
getCacheData:d
};
});define("tpl/media/keyword_dialog.html.js",[],function(){
return'<div class="keywords_dialog">\n    <div class="msg_area">\n        <div class="icon_area">\n            <i class="icon_msg info"></i>\n        </div>\n        <div class="text_area">\n            <h4 class="keyword_tips_title">{=title}</h4>\n            <p class="keyword_tips_desc">{=desc}</p>\n        </div>\n    </div>\n    <div class="keyword_list">\n        {each words as w}\n        <span class="match_keyword">{w}</span>\n        {/each}\n    </div>\n    <div class="keyword_choose">\n        <div class="weui-desktop-form__control-group weui-desktop-form__control-group_offset">\n            <div class="weui-desktop-form__controls">\n                <label class="weui-desktop-form__check-label">\n                <input type="radio" class="weui-desktop-form__radio js_checkbox" value="1">\n                <i class="weui-desktop-icon-radio"></i>\n                <span class="weui-desktop-form__check-content">\n                    关键词打码<br>\n                    <span class="keyword_choose_desc">图文消息中命中内容将被替换为"*****"。你可以继续保存或修改此内容。</span>\n                </span>\n                </label>\n            </div>\n        </div>\n        <div class="weui-desktop-form__control-group weui-desktop-form__control-group_offset">\n            <div class="weui-desktop-form__controls">\n                <label class="weui-desktop-form__check-label">\n                <input type="radio" class="weui-desktop-form__radio js_checkbox" value="0">\n                <i class="weui-desktop-icon-radio"></i>\n                <span class="weui-desktop-form__check-content">\n                    继续保存或发布该图文消息<br>\n                    <span class="keyword_choose_desc">将不会替换图文消息中的命中内容，发出后将可能因此被屏蔽、删除。</span>\n                </span>\n                </label>\n            </div>\n        </div>\n    </div>\n</div>';
});define("media/article_data_key.js",[],function(){
"use strict";
function e(e){
var i={
is_new_video:{
value:0,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
ad_video_transition:{
value:"",
isSubmit:!0
},
advert_info:{
value:{
back_transition:""
},
isSubmit:!0,
compare:!0,
isLocalKey:!0
},
is_new_create:{
value:!1,
isLocalKey:!1,
isSubmit:!1,
compare:!0
},
tags:{
value:[],
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
can_reward:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
can_open_reward:{
value:0,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
reward_reply_id:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
related_video:{
value:[],
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
is_video_recommend:{
value:-1,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
title:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
title_tips:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
author:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
authority:{
value:1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
writerid:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
author_username:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
author_status:{
value:1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
file_id:{
value:"",
isLocalKey:!0,
isSubmit:!0,
submitName:"fileid",
compare:!1
},
digest:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
auto_gen_digest:{
value:1,
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
content:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
source_url:{
value:"",
isLocalKey:!0,
isSubmit:!0,
submitName:"sourceurl",
compare:!0
},
cover:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
releasetime:{
value:0,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
need_open_comment:{
value:1,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
only_fans_can_comment:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
only_fans_days_can_comment:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
isFirst:{
value:0==e,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
cdn_url:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
cdn_235_1_url:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
cdn_1_1_url:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
cdn_url_back:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
crop_list:{
value:{
crop_list:[]
},
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
music_id:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
video_id:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
voteid:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
voteismlt:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
supervoteid:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
cardid:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
cardquantity:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
isbn:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
cardlimit:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
vid_type:{
value:"",
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
seq:{
value:e,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
msg_index:{
value:e,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
source_url_checked:{
value:0,
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
show_cover_pic:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
shortvideofileid:{
value:0,
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
link_count:{
value:0,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
copyright_type:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
releasefirst:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
platform:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
reprint_permit_type:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
allow_reprint:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
allow_reprint_modify:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
original_article_type:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
ori_white_list:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
video_ori_status:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
hit_nickname:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
free_content:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
fee:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
ad_info:{
value:{
ad_id:"",
ad_img:"",
img:"",
nick_name:"",
pt:"",
trade_mode:""
},
isLocalKey:!0,
isSubmit:!0,
compare:["ad_info","ad_id","ad_img","img","nick_name","pt","trade_mode"]
},
copyright_headimg:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
copyright_nickname:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
profile_description:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
guide_words:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
is_share_copyright:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
share_copyright_url:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
source_article_type:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
reprint_recommend_title:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
reprint_recommend_content:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
share_page_type:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
share_imageid:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
share_imageinfo:{
value:[],
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
share_video_id:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
share_videoinfo:{
value:[],
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
dot:{
value:{},
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
isMyMpVideo:{
value:!1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
is_my_mp_video:{
value:!1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
share_voice_id:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
share_voiceinfo:{
value:[],
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
insert_ad_mode:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
categories_list:{
value:[],
isLocalKey:!0,
isSubmit:!0,
compare:!1
},
sections:{
value:[],
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
compose_info:{
value:{},
isLocalKey:!1,
isSubmit:!0,
compare:!1
},
content_checktext:{
value:"",
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
check_text_info:{
value:{},
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
secondAutoAdAvailable:{
value:!1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
autoAdAvailable:{
value:!1,
isLocalKey:!0,
isSubmit:!1,
compare:!1
},
is_pay_subscribe:{
value:0,
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
pay_fee:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
pay_preview_percent:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
pay_desc:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
},
appmsg_album_info:{
value:{},
isLocalKey:!0,
isSubmit:!1,
compare:!0
},
appmsg_album:{
value:"",
isLocalKey:!0,
isSubmit:!0,
compare:!0
}
};
return i;
}
function i(){
var i=e(0),a=[];
for(var o in i)i.hasOwnProperty(o)&&i[o].isSubmit&&a.push(i[o].submitName?i[o].submitName:o);
return a;
}
function a(i){
var a=e(i),o={};
for(var c in a)a.hasOwnProperty(c)&&a[c].isLocalKey&&(o[c]=a[c].value);
return o;
}
function o(){
var i=e(0),a={};
for(var o in i)if(i.hasOwnProperty(o)&&i[o].compare)if(i[o].compare===!0)a[o]=!0;else if("[object Array]"===Object.prototype.toString.call(i[o].compare))for(var c=i[o].compare,s=0;s<c.length;s++)a[c[s]]=!0;
return a;
}
function c(){
return",content,cover,cdn_url,cdn_235_1_url,cdn_1_1_url,title,author,";
}
return{
getSubmitKey:i,
getLocalKey:a,
getCompareWhiteKey:o,
getShareArticleIgnoreKey:c
};
});define("tpl/media/templateListContent.html.js",[],function(){
return'{if !!msg}\n<p class="weui-desktop-media-tips">{msg}</p>\n{else}\n<div class="weui-desktop-media__list tj">\n  <div class="weui-desktop-media__list-col tj_item">\n  {each list as item index}\n  {if index%2==0} \n  {=item.contentHtml}\n  {/if}\n  {/each}\n  </div>&nbsp;\n  <div class="weui-desktop-media__list-col tj_item">\n  {each list as item index}\n  {if index%2==1} \n  {=item.contentHtml}\n  {/if}\n  {/each}\n  </div>\n</div>\n{/if}';
});define("tpl/media/templateListDialog.html.js",[],function(){
return'<div class="dialog_media_container">\n  <div class="weui-desktop-global-mod weui-desktop-media-global-bar">\n    <div class="weui-desktop-global__extra">\n      <a class="js_gomanage btn btn_default" target="_blank" href=\'/cgi-bin/appmsgtemplate?action=edit&lang=zh_CN&token={token}\'>新建模版</a>\n    </div>\n  </div>\n  <div class="weui-desktop-media-list-wrp">\n    <p class="js_loading icon_loading_small white">加载中</p>\n    <div class="js_content" style="display: none;"></div>\n  </div>\n  <div class="js_pagebar pagination_wrp"></div>\n</div>';
});define("tpl/mpEditor/plugin/red_package_cover.html.js",[],function(){
return'<!--异常加className disabled-->\n<section class="red_package_cover_wrp{if errorType * 1 > 0} disabled{/if}">\n    <section class="red_package_cover__inner">\n        <section class="red_package_cover__inner__main">\n            <section class="red_package_cover__body">\n                <span class="red_package_cover_img" data-notusecover="1" style="background-image: url(\'{img}\')"></span>\n            </section>\n            <section class="red_package_cover__foot">\n                {if errorType * 1 > 0}\n                <span class="red_package_cover__access-link disabled">红包封面不可用</span>\n                {else}\n                <!--品牌在这里加最多6个字-->\n                <span class="red_package_cover__access-link">领取{name}红包封面</span>\n                {/if}\n            </section>\n        </section>\n        <section class="red_package_cover__extend">\n            <span class="red_package_cover__extend_icon"></span>\n            <span class="red_package_cover__extend_info">微信红包封面</span>\n        </section>\n        {if errorType * 1 > 0}\n        <section class="red_package_cover_disable_wording">红包封面不可用</section>\n        {/if}\n    </section>\n</section>';
});define("common/wx/mpEditor/plugin/questionUtils.js",["common/wx/Cgi.js","biz_common/utils/emoji_data.js"],function(e){
"use strict";
var t=e("common/wx/Cgi.js"),n=e("biz_common/utils/emoji_data.js"),i={
biz:window.wx&&window.wx.data?window.wx.data.uin_base64:"",
emojiImg:'<img src="https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single #style#" alt="#name#">',
emojiDataMap:{}
};
!function(){
i.listpageUrl="https://mp.weixin.qq.com/mp/qa?action=list_question_page&__biz="+i.biz+"&count=10&offset=0#wechat_redirect",
i.questionpageUrl="https://mp.weixin.qq.com/mp/qa?action=question_page&__biz="+i.biz+"#wechat_redirect";
for(var e=0,t=n.length;t>e;e++){
var a=n[e];
a.cn&&!i.emojiDataMap[a.cn]&&(i.emojiDataMap[a.cn]={
index:e
}),a.hk&&!i.emojiDataMap[a.hk]&&(i.emojiDataMap[a.hk]={
index:e
}),a.us&&!i.emojiDataMap[a.us]&&(i.emojiDataMap[a.us]={
index:e
});
}
}();
var a=function(e){
return/\[[^\[\]]+\]/.test(e)?e.replace(/\[[^\[\]]+\]/g,function(e){
if(i.emojiDataMap[e]&&n[i.emojiDataMap[e].index]){
var t=n[i.emojiDataMap[e].index];
return i.emojiImg.replace("#name#",e).replace("#style#",t.style);
}
return e;
}):e;
},o=function(e,t){
var n=new Date(1e3*e),i=e-t,a=n.getFullYear(),o=1*t,s=new Date(1e3*o);
n.setHours(0),n.setMinutes(0),n.setSeconds(0);
var r=n.getTime()/1e3;
return o>=r?3600>i?Math.ceil(i/60)+"分钟前":"今天":o>=r-86400?"昨天":o>=r-172800?"前天":s.getFullYear()===a?s.getMonth()+1+"月"+s.getDate()+"日":s.getFullYear()+"年"+(s.getMonth()+1)+"月"+s.getDate()+"日";
},s=function(e){
return e.replace("#rd","#wechat_redirect").replace(/^http:\/\//,"https://");
},r=function(e,t){
t=t||Math.ceil((new Date).getTime()/1e3),1*e.is_anoymous&&(e.questioner_nickname="匿名",
e.questioner_headimg="",e.question_content.questioner_useruin=""),e.questioner_headimg||(e.questioner_headimg="https://mmbiz.qpic.cn/mmbiz_png/cVgP5bCElFjtIK2EeF0OjuGhbZVFRYyGRfbFeZ9GibWsibibIWP7XRSKews1ibWFZD5biaSXb7HfMF6dMricUib4naAFw/0");
var n=e.question_content;
e.question_page_url=s(e.question_page_url.html(!1)),e.questioner_useruin=n.questioner_useruin,
e.qa_id=e.question_content.qa_id,n.answer&&(n.answer.answer_time_str=o(t,n.answer.answer_timestamp)),
n.question&&(n.question.ask_time_str=o(t,n.question.ask_timestamp),n.question.title_html=n.question.title.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
n.question.title_html=a(n.question.title_html));
for(var i=[],r=[n.question?n.question.desc:[],n.answer?n.answer.answer:[]],u=function(e,t){
r[e]=r[e].map(function(e){
return"TEXT"===e.type&&e.content?(e.hasContentBefore=t,e.content_html=e.content.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
e.content_html=a(e.content_html),t=!0):"PIC_CDN_URL"===e.type&&(e.hasContentBefore=t,
i.push(e.content),t=!0),e;
}),l=t;
},c=0,l=!1,m=r.length;m>c;c++)u(c,l,m);
return e.allImg=i,e;
},u=function(e){
var n=e.onError||function(){},i=e.onSuccess||function(){};
t.get({
url:"/cgi-bin/qa?action=list_question",
dataType:"json",
data:{
status_filter:2,
time_filter:0,
content_filter:0,
offset:e.offset,
count:e.count
},
mask:!1
},{
done:function(e){
var t=void 0;
try{
t=JSON.parse(e.question_list).question_list;
}catch(a){
t=null;
}
e&&e.base_resp&&0===e.base_resp.ret&&"[object Array]"===Object.prototype.toString.call(t)?(t.forEach(function(t){
r(t,e.svr_time);
}),i({
list:t,
totalCount:e.total_count
})):n({
errMsg:"获取问题列表失败，请稍候再试"
});
},
fail:function(){
n({
errMsg:"系统繁忙，请稍候再试"
});
}
});
};
return{
formatQuestionInfo:r,
loadList:u,
listpageUrl:i.listpageUrl,
questionpageUrl:i.questionpageUrl
};
});define("tpl/mpEditor/plugin/blockquote_popup.html.js",[],function(){
return'{if needBreak}\n  <div style="height:5px;display:none"></div>\n{/if}\n<div class="edui_mask_edit_blockquote js_link_popup edui_mask_edit_group with_line">\n  <div class="edui_mask_edit_meta first_child edui-clickable" onclick="$$._execCommandAndHide(\'blockquote\', undefined)">\n    <div class="edui_mask_edit_meta_inner">清除引用格式</div>\n  </div>\n  <div class="edui_mask_edit_meta edui-clickable no_extra" onclick="$$._execCommandAndHide(\'blockquote\', \'{text}\')">\n    <div class="edui_mask_edit_meta_inner">修改引用来源</div>\n  </div>\n</div>\n';
});