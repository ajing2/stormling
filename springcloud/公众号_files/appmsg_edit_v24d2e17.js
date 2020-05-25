define("biz_web/ui/jquery.scrollbar.js",["biz_web/widget/jquery.scrollbar.css"],function(l){
"use strict";
function e(l){
if(t.webkit&&!l)return{
height:0,
width:0
};
if(!t.data.outer){
var e={
border:"none",
"box-sizing":"content-box",
height:"200px",
margin:"0",
padding:"0",
width:"200px"
};
t.data.inner=$("<div>").css($.extend({},e)),t.data.outer=$("<div>").css($.extend({
left:"-1000px",
overflow:"scroll",
position:"absolute",
top:"-1000px"
},e)).append(t.data.inner).appendTo("body");
}
return t.data.outer.scrollLeft(1e3).scrollTop(1e3),{
height:Math.ceil(t.data.outer.offset().top-t.data.inner.offset().top||0),
width:Math.ceil(t.data.outer.offset().left-t.data.inner.offset().left||0)
};
}
function s(){
var l=e(!0);
return!(l.height||l.width);
}
function o(l){
var e=l.originalEvent;
return e.axis&&e.axis===e.HORIZONTAL_AXIS?!1:e.wheelDeltaX?!1:!0;
}
l("biz_web/widget/jquery.scrollbar.css");
var r=!1,t={
data:{
index:0,
name:"scrollbar"
},
macosx:/mac/i.test(navigator.platform),
mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
overlay:null,
scroll:null,
scrolls:[],
webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)
};
t.scrolls.add=function(l){
this.remove(l).push(l);
},t.scrolls.remove=function(l){
for(;$.inArray(l,this)>=0;)this.splice($.inArray(l,this),1);
return this;
};
var i={
autoScrollSize:!0,
autoUpdate:!0,
debug:!1,
disableBodyScroll:!1,
duration:200,
ignoreMobile:!1,
ignoreOverlay:!1,
scrollStep:30,
showArrows:!1,
stepScrolling:!0,
scrollx:null,
scrolly:null,
onDestroy:null,
onInit:null,
onScroll:null,
onUpdate:null
},n=function(l){
t.scroll||(t.overlay=s(),t.scroll=e(),a(),$(window).resize(function(){
var l=!1;
if(t.scroll&&(t.scroll.height||t.scroll.width)){
var s=e();
(s.height!==t.scroll.height||s.width!==t.scroll.width)&&(t.scroll=s,l=!0);
}
a(l);
})),this.container=l,this.namespace=".scrollbar_"+t.data.index++,this.options=$.extend({},i,window.jQueryScrollbarOptions||{}),
this.scrollTo=null,this.scrollx={},this.scrolly={},l.data(t.data.name,this),t.scrolls.add(this);
};
n.prototype={
destroy:function(){
if(this.wrapper){
this.container.removeData(t.data.name),t.scrolls.remove(this);
var l=this.container.scrollLeft(),e=this.container.scrollTop();
this.container.insertBefore(this.wrapper).css({
height:"",
margin:"",
"max-height":""
}).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(l).scrollTop(e),
this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace),
this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace),
this.wrapper.remove(),$(document).add("body").off(this.namespace),$.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container]);
}
},
init:function(l){
var e=this,s=this.container,r=this.containerWrapper||s,i=this.namespace,n=$.extend(this.options,l||{}),c={
x:this.scrollx,
y:this.scrolly
},a=this.wrapper,d={
scrollLeft:s.scrollLeft(),
scrollTop:s.scrollTop()
};
if(t.mobile&&n.ignoreMobile||t.overlay&&n.ignoreOverlay||t.macosx&&!t.webkit)return!1;
if(a)r.css({
height:"auto",
"margin-bottom":-1*t.scroll.height+"px",
"margin-right":-1*t.scroll.width+"px",
"max-height":""
});else{
if(this.wrapper=a=$("<div>").addClass("scroll-wrapper").addClass(s.attr("class")).css("position","absolute"==s.css("position")?"absolute":"relative").insertBefore(s).append(s),
s.is("textarea")&&(this.containerWrapper=r=$("<div>").insertBefore(s).append(s),
a.addClass("scroll-textarea")),r.addClass("scroll-content").css({
height:"auto",
"margin-bottom":-1*t.scroll.height+"px",
"margin-right":-1*t.scroll.width+"px",
"max-height":""
}),s.on("scroll"+i,function(){
$.isFunction(n.onScroll)&&n.onScroll.call(e,{
maxScroll:c.y.maxScrollOffset,
scroll:s.scrollTop(),
size:c.y.size,
visible:c.y.visible
},{
maxScroll:c.x.maxScrollOffset,
scroll:s.scrollLeft(),
size:c.x.size,
visible:c.x.visible
}),c.x.isVisible&&c.x.scroll.bar.css("left",s.scrollLeft()*c.x.kx+"px"),c.y.isVisible&&c.y.scroll.bar.css("top",s.scrollTop()*c.y.kx+"px");
}),a.on("scroll"+i,function(){
a.scrollTop(0).scrollLeft(0);
}),n.disableBodyScroll){
var h=function(l){
o(l)?c.y.isVisible&&c.y.mousewheel(l):c.x.isVisible&&c.x.mousewheel(l);
};
a.on("MozMousePixelScroll"+i,h),a.on("mousewheel"+i,h),t.mobile&&a.on("touchstart"+i,function(l){
var e=l.originalEvent.touches&&l.originalEvent.touches[0]||l,o={
pageX:e.pageX,
pageY:e.pageY
},r={
left:s.scrollLeft(),
top:s.scrollTop()
};
$(document).on("touchmove"+i,function(l){
var e=l.originalEvent.targetTouches&&l.originalEvent.targetTouches[0]||l;
s.scrollLeft(r.left+o.pageX-e.pageX),s.scrollTop(r.top+o.pageY-e.pageY),l.preventDefault();
}),$(document).on("touchend"+i,function(){
$(document).off(i);
});
});
}
$.isFunction(n.onInit)&&n.onInit.apply(this,[s]);
}
$.each(c,function(l,r){
var t=null,a=1,d="x"===l?"scrollLeft":"scrollTop",h=n.scrollStep,p=function(){
var l=s[d]();
s[d](l+h),1==a&&l+h>=u&&(l=s[d]()),-1==a&&u>=l+h&&(l=s[d]()),s[d]()==l&&t&&t();
},u=0;
r.scroll||(r.scroll=e._getScroll(n["scroll"+l]).addClass("scroll-"+l),n.showArrows&&r.scroll.addClass("scroll-element_arrows_visible"),
r.mousewheel=function(t){
if(!r.isVisible||"x"===l&&o(t))return!0;
if("y"===l&&!o(t))return c.x.mousewheel(t),!0;
var i=-1*t.originalEvent.wheelDelta||t.originalEvent.detail,n=r.size-r.visible-r.offset;
return(i>0&&n>u||0>i&&u>0)&&(u+=i,0>u&&(u=0),u>n&&(u=n),e.scrollTo=e.scrollTo||{},
e.scrollTo[d]=u,setTimeout(function(){
e.scrollTo&&(s.stop().animate(e.scrollTo,240,"linear",function(){
u=s[d]();
}),e.scrollTo=null);
},1)),t.preventDefault(),!1;
},r.scroll.on("MozMousePixelScroll"+i,r.mousewheel).on("mousewheel"+i,r.mousewheel).on("mouseenter"+i,function(){
u=s[d]();
}),r.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown"+i,function(o){
if(1!=o.which)return!0;
a=1;
var i={
eventOffset:o["x"===l?"pageX":"pageY"],
maxScrollValue:r.size-r.visible-r.offset,
scrollbarOffset:r.scroll.bar.offset()["x"===l?"left":"top"],
scrollbarSize:r.scroll.bar["x"===l?"outerWidth":"outerHeight"]()
},c=0,f=0;
return $(this).hasClass("scroll-arrow")?(a=$(this).hasClass("scroll-arrow_more")?1:-1,
h=n.scrollStep*a,u=a>0?i.maxScrollValue:0):(a=i.eventOffset>i.scrollbarOffset+i.scrollbarSize?1:i.eventOffset<i.scrollbarOffset?-1:0,
h=Math.round(.75*r.visible)*a,u=i.eventOffset-i.scrollbarOffset-(n.stepScrolling?1==a?i.scrollbarSize:0:Math.round(i.scrollbarSize/2)),
u=s[d]()+u/r.kx),e.scrollTo=e.scrollTo||{},e.scrollTo[d]=n.stepScrolling?s[d]()+h:u,
n.stepScrolling&&(t=function(){
u=s[d](),clearInterval(f),clearTimeout(c),c=0,f=0;
},c=setTimeout(function(){
f=setInterval(p,40);
},n.duration+100)),setTimeout(function(){
e.scrollTo&&(s.animate(e.scrollTo,n.duration),e.scrollTo=null);
},1),e._handleMouseDown(t,o);
}),r.scroll.bar.on("mousedown"+i,function(o){
if(1!=o.which)return!0;
var t=o["x"===l?"pageX":"pageY"],n=s[d]();
return r.scroll.addClass("scroll-draggable"),$(document).on("mousemove"+i,function(e){
var o=parseInt((e["x"===l?"pageX":"pageY"]-t)/r.kx,10);
s[d](n+o);
}),e._handleMouseDown(function(){
r.scroll.removeClass("scroll-draggable"),u=s[d]();
},o);
}));
}),$.each(c,function(l,e){
var s="scroll-scroll"+l+"_visible",o="x"==l?c.y:c.x;
e.scroll.removeClass(s),o.scroll.removeClass(s),r.removeClass(s);
}),$.each(c,function(l,e){
$.extend(e,"x"==l?{
offset:parseInt(s.css("left"),10)||0,
size:s.prop("scrollWidth"),
visible:a.width()
}:{
offset:parseInt(s.css("top"),10)||0,
size:s.prop("scrollHeight"),
visible:a.height()
});
}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),$.isFunction(n.onUpdate)&&n.onUpdate.apply(this,[s]),
$.each(c,function(l,e){
var o="x"===l?"left":"top",r="x"===l?"outerWidth":"outerHeight",t="x"===l?"width":"height",i=parseInt(s.css(o),10)||0,c=e.size,a=e.visible+i,d=e.scroll.size[r]()+(parseInt(e.scroll.size.css(o),10)||0);
n.autoScrollSize&&(e.scrollbarSize=parseInt(d*a/c,10),e.scroll.bar.css(t,e.scrollbarSize+"px")),
e.scrollbarSize=e.scroll.bar[r](),e.kx=(d-e.scrollbarSize)/(c-a)||1,e.maxScrollOffset=c-a;
}),s.scrollLeft(d.scrollLeft).scrollTop(d.scrollTop);
},
_getScroll:function(l){
var e={
advanced:['<div class="scroll-element">','<div class="scroll-element_corner"></div>','<div class="scroll-arrow scroll-arrow_less"></div>','<div class="scroll-arrow scroll-arrow_more"></div>','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_inner-wrapper">','<div class="scroll-element_inner scroll-element_track">','<div class="scroll-element_inner-bottom"></div>',"</div>","</div>",'<div class="scroll-bar">','<div class="scroll-bar_body">','<div class="scroll-bar_body-inner"></div>',"</div>",'<div class="scroll-bar_bottom"></div>','<div class="scroll-bar_center"></div>',"</div>","</div>","</div>"].join(""),
simple:['<div class="scroll-element">','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_track"></div>','<div class="scroll-bar"></div>',"</div>","</div>"].join("")
};
return e[l]&&(l=e[l]),l||(l=e.simple),l="string"==typeof l?$(l).appendTo(this.wrapper):$(l),
$.extend(l,{
bar:l.find(".scroll-bar"),
size:l.find(".scroll-element_size"),
track:l.find(".scroll-element_track")
}),l;
},
_handleMouseDown:function(l,e){
var s=this.namespace;
return $(document).on("blur"+s,function(){
$(document).add("body").off(s),l&&l();
}),$(document).on("dragstart"+s,function(l){
return l.preventDefault(),!1;
}),$(document).on("mouseup"+s,function(){
$(document).add("body").off(s),l&&l();
}),$("body").on("selectstart"+s,function(l){
return l.preventDefault(),!1;
}),e&&e.preventDefault(),!1;
},
_updateScroll:function(l,e){
var s=this.container,o=this.containerWrapper||s,r="scroll-scroll"+l+"_visible",i="x"===l?this.scrolly:this.scrollx,n=parseInt(this.container.css("x"===l?"left":"top"),10)||0,c=this.wrapper,a=e.size,d=e.visible+n;
e.isVisible=a-d>1,e.isVisible?(e.scroll.addClass(r),i.scroll.addClass(r),o.addClass(r)):(e.scroll.removeClass(r),
i.scroll.removeClass(r),o.removeClass(r)),"y"===l&&o.css(s.is("textarea")||d>a?{
height:d+t.scroll.height+"px",
"max-height":"none"
}:{
"max-height":d+t.scroll.height+"px"
}),(e.size!=s.prop("scrollWidth")||i.size!=s.prop("scrollHeight")||e.visible!=c.width()||i.visible!=c.height()||e.offset!=(parseInt(s.css("left"),10)||0)||i.offset!=(parseInt(s.css("top"),10)||0))&&($.extend(this.scrollx,{
offset:parseInt(s.css("left"),10)||0,
size:s.prop("scrollWidth"),
visible:c.width()
}),$.extend(this.scrolly,{
offset:parseInt(s.css("top"),10)||0,
size:this.container.prop("scrollHeight"),
visible:c.height()
}),this._updateScroll("x"===l?"y":"x",i));
}
};
var c=n;
$.fn.scrollbar=function(l,e){
return"string"!=typeof l&&(e=l,l="init"),"undefined"==typeof e&&(e=[]),$.isArray(e)||(e=[e]),
this.not("body, .scroll-wrapper").each(function(){
var s=$(this),o=s.data(t.data.name);
(o||"init"===l)&&(o||(o=new c(s)),o[l]&&o[l].apply(o,e));
}),this;
},$.fn.scrollbar.options=i;
var a=$.fn.scrollbar.updateScrollbars=function(){
var l=0,e=0;
return function(s){
var o,i,n,c,d,h,p;
for(o=0;o<t.scrolls.length;o++)c=t.scrolls[o],i=c.container,n=c.options,d=c.wrapper,
h=c.scrollx,p=c.scrolly,(s||n.autoUpdate&&d&&d.is(":visible")&&(i.prop("scrollWidth")!=h.size||i.prop("scrollHeight")!=p.size||d.width()!=h.visible||d.height()!=p.visible))&&(c.init(),
r&&(window.console&&console.log({
scrollHeight:i.prop("scrollHeight")+":"+c.scrolly.size,
scrollWidth:i.prop("scrollWidth")+":"+c.scrollx.size,
visibleHeight:d.height()+":"+c.scrolly.visible,
visibleWidth:d.width()+":"+c.scrollx.visible
},!0),e++));
r&&e>10?(window.console&&console.log("Scroll updates exceed 10"),a=function(){}):(clearTimeout(l),
l=setTimeout(a,300));
};
}();
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("media/appmsg_edit_v2.js",["biz_web/ui/jquery.scrollbar.js","biz_common/utils/string/html.js","common/qq/emoji.js","pages/editor/editor_for_web1.js","media/send.js","author/author_popover.js","author/author_info_list.js","author/author_recent.js","tpl/media/reward_swtich_tips.html.js","author/author_utils.js","common/qq/Class.js","common/wx/mpEditor/common/eventbus.js","common/wx/inputCounter.js","common/wx/Step.js","common/wx/dropdownClassify.js","common/wx/tooltips.js","biz_common/jquery.validate.js","common/wx/Tips.js","biz_common/moment.js","common/wx/preview.js","common/wx/dialog.js","common/wx/popover.js","common/wx/ban.js","common/wx/Cgi.js","common/wx/mpEditor/common/cropImgCgi.js","common/wx/mpEditor/pluginsList.js","common/wx/mpEditor/plugin/templateList.js","common/wx/mpEditor/plugin/more.js","biz_web/lib/store.js","tpl/media/appmsg_edit/article.html.js","media/article_list.js","media/media_static_data.js","pages/editor/eventBus4Web1.js","common/wx/const.js","common/wx/utils.js","common/wx/speedPerformance.js","common/wx/pagebar.js","tpl/media/audit_fail_tip.html.js","media/get_article_structure.js","common/wx/media/previewDialog.js"],function(e){
"use strict";
function t(e,t,i){
(t||1)>Z&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:e,
val:1,
level:i||"error",
content:"[file=media/appmsg_edit]"
});
}
function i(){
H.initSpeeds({
type:"appmsg",
pid:34
});
}
function a(e,t){
var i=$(e);
return i.find(".vote_area").length>0?"投票":i.find(".card_iframe").length>0?"卡券":i.find(".weapp_text_link").length>0?"小程序链接":i.find(".weapp_image_link").length>0?"小程序链接":i.find(".miniprogram_element").length>0?"小程序卡片":i.find(".js_editor_product").length>0?"商品":i.find(".js_editor_cps").length>0?"广告卡片":t&&t.ad_info&&t.ad_info.ad_id?"广告卡片":"";
}
window._points&&(window._points[8]=+new Date),e("biz_web/ui/jquery.scrollbar.js"),
e("biz_common/utils/string/html.js"),e("common/qq/emoji.js"),window._points&&(window._points[9]=+new Date);
var r=e("pages/editor/editor_for_web1.js");
window._points&&(window._points[10]=+new Date);
var n,o=e("media/send.js"),s=e("author/author_popover.js"),d=e("author/author_info_list.js"),c=e("author/author_recent.js"),l=e("tpl/media/reward_swtich_tips.html.js"),_=e("author/author_utils.js"),u=e("common/qq/Class.js"),p=e("common/wx/mpEditor/common/eventbus.js"),h=e("common/wx/inputCounter.js"),m=e("common/wx/Step.js"),f=e("common/wx/dropdownClassify.js"),g=e("common/wx/tooltips.js"),w=e("biz_common/jquery.validate.js").rules,v=e("common/wx/Tips.js"),j=e("biz_common/moment.js"),y=e("common/wx/preview.js"),b=e("common/wx/dialog.js"),k=e("common/wx/popover.js"),x=e("common/wx/ban.js"),C=e("common/wx/Cgi.js"),T=e("common/wx/mpEditor/common/cropImgCgi.js"),L=e("common/wx/mpEditor/pluginsList.js"),S=e("common/wx/mpEditor/plugin/templateList.js"),A=e("common/wx/mpEditor/plugin/more.js"),D=e("biz_web/lib/store.js"),I=e("tpl/media/appmsg_edit/article.html.js"),E=e("media/article_list.js"),O=e("media/media_static_data.js"),R=e("pages/editor/eventBus4Web1.js"),P=e("common/wx/const.js"),N=P.insertAdModeMap,M=P.DEFAULT_AD_TEXT,B=(P.moreReadModeMap,
P.NO_AD_TEXT),q=P.videoPasterMinPlayLength,U=P.videoPasterMinShowTime,z=P.modifyVideoTitleTips,F=e("common/wx/utils.js"),W=F.formatVideoTime,V=(O.URL_PLATFORM_MAP,
O.article_type),H=e("common/wx/speedPerformance.js"),Y=wx.cgiData,J=document.referrer,K=e("common/wx/pagebar.js"),X=(e("tpl/media/audit_fail_tip.html.js"),
e("media/get_article_structure.js")),G=X.getArticleStructure,Q={
masssendCacheKey:"masssendMusicCheck",
originalProtoKey:"mpeditor_original_reward_proto_"+wx.data.uin,
scrollIntoViewid:null,
scrollIntoViewCount:0,
curRenderType:1,
$articlePanel:null,
hideArticlePanelId:null,
canShowArticlePanel:!0,
isReadOnly:!1,
isRewardSwitched:!1,
articleReplaceType:0,
recentList:[]
};
!function(e){
var t=function(e,t){
var i=e.siblings(".tips_global"),a=e[0];
t&&""===a.value||!t&&""===a.innerText.replace(/\n|\r/g,"")?i.show():i.hide();
};
e.fn.placeholder2=function(){
var e=this,i="INPUT"===this[0].nodeName;
i&&"placeholder"in document.createElement("input")||this.on("input propertychange blur",function(){
t(e,i);
}).trigger("blur");
},e.fn.checkPlaceholder2=function(){
t(this,"INPUT"===this[0].nodeName);
},e.extend(e.easing,{
easeOutCubic:function(e,t,i,a,r){
return a*((t=t/r-1)*t*t+1)+i;
}
});
}(jQuery);
{
var Z=Math.random(),et=!1,tt={},it=!1,at=null,rt=u.declare({
init:function(e){
var t=this;
t.opt=e,i(),$.extend(!0,t,e),t.$editor=$(t.editor_selector).html(wx.T(I,{
can_use_copyright:Y.can_use_copyright,
can_use_reward:Y.can_use_reward,
can_use_payforread:Y.can_use_payforread,
can_use_comment:Y.can_use_comment,
can_use_album:Y.can_use_album,
can_use_appmsg_source_url:Y.can_use_appmsg_source_url,
can_see_ad:Y.can_see_ad&&""!==Y.insert_ad_mode,
is_ios_reward_open:Y.is_ios_reward_open,
has_invited_original:Y.has_invited_original,
orginal_apply_stat:Y.orginal_apply_stat,
can_use_original_reprint:Y.can_use_original_reprint,
token:wx.data.t,
is_illegal:1*t.appmsg_data.is_illegal||0,
can_use_related_video:Y.can_use_related_video,
can_use_video_recommend:Y.can_use_video_recommend,
can_use_watch_more:Y.can_use_watch_more,
can_use_pay_subscribe:Y.can_use_pay_subscribe,
is_pay_subscribe_block:Y.is_pay_subscribe_block
})),t._initUEditor({
callback:function(){
$("#media_item_list_scrollbar").scrollbar({
autoUpdate:!1
});
}
});
},
_initFormItemsOpt:function(){
this.formItemsOpt={
title:{
readonly:!1,
readonlyTips:""
},
author:{
counter:null,
readonly:!1,
readonlyTips:""
},
content:{
readonly:!1,
readonlyTips:""
},
guideWords:{
readonly:!1,
readonlyTips:""
},
description:{
readonly:!1,
readonlyTips:""
}
};
},
_renderReadOnly:function(e){
var t=e.type,i=e.time,a=e.name,r=e.ua,n=$("#read_only_container"),o=n.find(".js_close");
if(5==t){
var s=location.href+"&conflict=1",d="你有未保存的草稿，%s点击查看%s".sprintf("<a href='javascript:;'>","</a>");
return n.find("p").html(d),n.find("a").click(function(){
n.hide(),window.open(s);
}),e.showTips===!0&&b.show({
type:"warn",
msg:"你有未保存的草稿",
buttons:[{
text:"查看草稿",
click:function(){
n.hide(),window.open(s),e.callback&&_typeof(e.callback)&&e.callback(),this.remove();
}
},{
text:"编辑当前内容",
type:"normal",
click:function(){
e.callback&&_typeof(e.callback)&&e.callback(),this.remove();
}
}]
}),n.show(),void o.show();
}
if(1==t||2==t)n.find("p").text("此素材有文章存在违规，无法编辑"),n.show(),o.hide();else if(4==t){
var d="当前素材并非最新内容，你可以%s打开最新素材%s".sprintf("<a target='_blank' href='"+location.href+"'>","</a>");
n.find("p").html(d);
var c="当前素材非最新内容，是否打开重新编辑？";
i&&(c+="<br />最新素材更新时间：%s".sprintf(i)),a&&(c+="<br />操作人：%s".sprintf(a.html(!0))),
r&&(c+="<br />保存于：%s".sprintf((r+"浏览器").html(!0))),b.show({
type:"warn",
msg:c,
buttons:[{
text:"编辑新内容",
click:function(){
window.open(location.href),this.remove();
}
},{
text:"查看当前内容",
type:"normal",
click:function(){
this.remove();
}
}]
}),n.show(),o.hide();
}else(3==t||6==t)&&(n.hide(),o.hide());
Q.isReadOnly=!0;
var l=$(this.editor_selector);
if(l.find(".js_title_main").addClass("without_margin"),l.find(".js_readonly").hide(),
$(this.appmsg_selector).find(".js_readonly").hide(),$("#editor_pannel").addClass("appmsg_input_area_pull_right"),
$("#js_add_appmsg").hide(),$("#bottom_main").hide(),$("#right_pannel").hide(),this.articleList){
var _=this.articleList.getCurrentArticle();
if(_){
var u=_.data("article");
u&&"function"==typeof u.setGuideWordsReadOnly&&u.setGuideWordsReadOnly();
}
}
this.ueditor&&(this.ueditor.fireEvent("scrollIntoView",$("#read_only_container"),150),
this.ueditor.fireEvent("setToolBarStatus",{
status:!1
}));
},
_renderEditorByType:function(e,t,i){
switch(1*e){
case 1:
this._setCurRenderType(1),this._setAuthorStatus({
status:!0
}),this._switchContentType({
type:1
}),Q.isReadOnly?(this._setToolBarStatus({
status:!1
}),this._setTitleStatus({
readonly:!0
})):(this._setToolBarStatus({
status:!0
}),this._setTitleStatus({
readonly:!1
})),this._setArticleUrlStatus(!0),this._setAdInsertStatus(!0),this._setMoreReadStatus(!0),
this._setCommentStatus(!0),this._setOriginalStatus({
status:!0
}),this._setCoverStatus({
status:!0
}),this._setDescriptionStatus({
status:!0
}),this._setCoverDescriptionStatus({
status:!0
}),this._setFoldStatus(!0);
break;

case 2:
var a="分享图文标题不可编辑";
"object"===("undefined"==typeof i?"undefined":_typeof(i))&&"isMyMpVideo"in i&&(a=z),
this._setCurRenderType(2),this._setTitleStatus({
readonly:!1,
readonlyTips:a,
isMyMpVideo:i.isMyMpVideo
}),this._setAuthorStatus({
status:!1
}),this._switchContentType({
type:2
}),this._setToolBarStatus({
status:!1,
disabledTips:"分享图文中不能插入多媒体素材"
}),this._setArticleUrlStatus(!1),this._setAdInsertStatus(!1),this._setMoreReadStatus(!1),
this._setCommentStatus(!0),this._setOriginalStatus({
status:!1
}),this._setCoverStatus({
status:!1
}),this._setDescriptionStatus({
status:!1
}),this._setCoverDescriptionStatus({
status:!1
}),this._setFoldStatus(!1);
break;

case 4:
this._setCurRenderType(4),this._setTitleStatus({
display:"none"
}),this._setAuthorStatus({
status:!1
}),this._switchContentType({
type:2
}),this._setToolBarStatus({
status:!1,
disabledTips:"分享文本中不能插入多媒体素材"
}),this._setArticleUrlStatus(!1),this._setAdInsertStatus(!1),this._setMoreReadStatus(!1),
this._setCommentStatus(!0),this._setOriginalStatus({
status:!1
}),this._setCoverStatus({
status:!1
}),this._setDescriptionStatus({
status:!1
}),this._setCoverDescriptionStatus({
status:!1
}),this._setFoldStatus(!1);
}
"function"==typeof t&&t();
},
_setTitleStatus:function(e){
e.readonly?($("#title").attr("readonly","true"),this.formItemsOpt.title.readonlyTips=e.readonlyTips||"",
$("#js_title_main").addClass("appmsg_edit_not_appmsg")):($("#title").removeAttr("readonly"),
e.isMyMpVideo?$("#js_title_main").addClass("appmsg_edit_not_appmsg"):$("#js_title_main").removeClass("appmsg_edit_not_appmsg")),
"none"===e.display?$("#js_title_main").hide():$("#js_title_main").show(),this.formItemsOpt.title.readonly=!!e.readonly;
},
_setAuthorStatus:function(e){
e.status?($("#js_author_area").show(),e.readonly?($("#author").attr("readonly","true"),
this.formItemsOpt.author.readonlyTips=e.readonlyTips||""):$("#author").removeAttr("readonly")):$("#js_author_area").hide(),
this.formItemsOpt.author.readonly=!!e.readonly,this.formItemsOpt.author.counter[e.hideCounter?"hideWithAppend":"show"]();
},
_switchContentType:function(e){
switch(1*e.type){
case 1:
$($("#edui1_iframeholder").show().find("iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).attr("contenteditable",!e.readonly),
$("#guide_words_main").hide(),this.formItemsOpt.content.readonly=!!e.readonly,this.formItemsOpt.content.readonlyTips=e.readonlyTips||"";
break;

case 2:
$("#edui1_iframeholder").hide(),$("#guide_words_main").show().find(".js_editorArea").attr("contenteditable",!e.readonly).attr("placeholder",e.placeholder||"可以输入140字以内的推荐语(选填)"),
this.formItemsOpt.guideWords.readonly=!!e.readonly,this.formItemsOpt.guideWords.readonlyTips=e.readonlyTips||"";
break;

case 3:
$($("#edui1_iframeholder").show().find("iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).attr("contenteditable",!e.content.readonly),
this.formItemsOpt.content.readonly=!!e.content.readonly,this.formItemsOpt.content.readonlyTips=e.content.readonlyTips||"",
$("#guide_words_main").hide(),this.formItemsOpt.guideWords.readonly=!!e.guideWords.readonly,
this.formItemsOpt.guideWords.readonlyTips=e.guideWords.readonlyTips||"";
}
},
_setToolBarStatus:function(e){
e.status?(this.ueditor.fireEvent("star_toolbar_float"),$(this.editor_selector).find(".js_title_main").removeClass("without_margin"),
$("#edui1_toolbarbox").show(),$("#js_media_list_box").show(),$("#js_media_extra_list").show()):($(this.editor_selector).find(".js_title_main").addClass("without_margin"),
$("#edui1_toolbarbox").hide(),$("#js_media_list_box").hide(),$("#js_media_extra_list").hide());
},
_setArticleUrlStatus:function(e){
e?$("#js_article_url_area").show():$("#js_article_url_area").hide();
},
_setAdInsertStatus:function(e){
e?$("#js_insert_ad_area").show():$("#js_insert_ad_area").hide();
},
_setMoreReadStatus:function(e){
e?$("#js_article_recommend_area").show():$("#js_article_recommend_area").hide();
},
_setCommentStatus:function(e){
var t=$("#js_comment_area");
t&&(e?t.show():t.hide());
},
_setOriginalStatus:function(e){
var t=$("#js_original");
if(t)if(e.status){
var i=t.find("#js_original_open"),a=t.find(".js_original_content");
switch(e.type){
case"reprint":
i.find(".js_original_title").text("转载文章：原文已声明原创"),i.find(".js_original_btn").hide(),
a.find(".js_original_item").hide().filter(".js_reprint").show();
break;

case"article":
default:
i.find(".js_original_title").text("原创：已声明"),i.find(".js_original_btn").show(),a.find(".js_original_item").hide().filter(".js_article").show();
}
t.show();
}else t.hide();
},
_setCoverStatus:function(e){
var t=$("#js_cover_area");
e.status?(t.show(),e.readonly?t.find(".js_cover_btn_area").hide():t.find(".js_cover_btn_area").show()):t.hide();
},
_setCoverDescriptionStatus:function(e){
e.status?$("#js_cover_description_area").show():$("#js_cover_description_area").hide();
},
_setDescriptionStatus:function(e){
e.status?($("#js_description_area").show(),e.readonly?($("#js_description").attr("readonly","true"),
this.formItemsOpt.description.readonlyTips=e.readonlyTips||""):$("#js_description").removeAttr("readonly")):$("#js_description_area").hide(),
this.formItemsOpt.description.readonly=!!e.readonly;
},
_setFoldStatus:function(e){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=$("#bot_bar_left_container");
i.find(".js_fold").remove(),1*t.type!==1&&1*t.type!==2&&(t.type=-1),e&&i.append(template.render("tpl_bot_left_fold",t));
},
_setSaveBtnStatus:function(e){
e.disabled?($("#js_send").addClass("btn_disabled"),$("#js_preview").addClass("btn_disabled"),
$("#js_submit").addClass("btn_disabled")):($("#js_send").removeClass("btn_disabled"),
$("#js_preview").removeClass("btn_disabled"),$("#js_submit").removeClass("btn_disabled"));
},
_setCurRenderType:function(e){
Q.curRenderType=1*e;
},
_initEditArea:function(){
function e(){
var e=l.articleList&&l.articleList.getCurrentArticleObject(),t=e.data.getData();
p.fireEvent("showAlbumChooseDialog",{
selectedId:t.appmsg_album||""
},function(i){
if(i){
var a={
id:i.albumId,
title:i.albumTitle
};
e.data.set("appmsg_album_info",a),e.data.set("appmsg_album",a.id),H.checkbox("checked",!0),
V.find(".js_album_allow_click").addClass("open"),V.find(".album_setting").html(i.albumTitle||"").show();
}else t.appmsg_album||(H.checkbox("checked",!1),V.find(".js_album_allow_click").removeClass("open"));
});
}
function t(t){
var i=l.articleList&&l.articleList.getCurrentArticleObject(),a=i.data.get("copyright_type");
1*a===1?(e(),"function"==typeof t&&t(!1)):(v.err("请在声明原创后使用专辑功能"),"function"==typeof t&&t(!0));
}
function i(e){
return e.isMyMpVideo||e.is_my_mp_video;
}
function a(){
var e=l.articleList.getCurrentArticleObject().data.getData(),t=e.share_videoinfo;
t[0].play_length>=q&&i(e)&&(_.find(".video_dot_text").show(),p.fireEvent("showWeappDialog",{
isvideodot:!0,
videoinfo:t,
pasterInfo:e.dot
},function(t){
if(t){
var i=t.begin_time,a=(t.main_page,t.nickname),r=t.path,n=t.dot,o=t.end_time,s={
begin_time:i,
end_time:o,
dot:JSON.stringify({
title:n.title,
desc:n.desc,
relativeURL:r,
originalId:n.originalId,
weAppName:a,
appId:n.appId,
avatar:n.avatar
}),
type:1,
id:1,
min_show_time:U,
position:JSON.stringify({
right:0,
bottom:20,
gravity:"right|bottom"
})
},d=[];
d.push(s),e.dot={
list:d
};
var c="在%s开始出现贴片".replace("%s",W(i));
J.find(".js_paster_setting_text").html(c);
}else e.dot&&Object.keys(e.dot).length||Y.checkbox("checked",!1);
}));
}
function r(){
var e="undefined"!=typeof localStorage.getItem("adTransitionText")?localStorage.getItem("adTransitionText"):null;
e===B&&(e=null);
var t=l.articleList&&l.articleList.getCurrentArticleObject().data.getData(),i=t.advert_info&&t.advert_info.back_transition&&t.advert_info.back_transition.ad_video_transition||"",a=t.ad_video_transition&&t.ad_video_transition.ad_video_transition;
p.fireEvent("showVideoAdTransitionDialog",{
scene:"ueditor",
selectedValue:a||i||e||M
},function(e){
return e?(localStorage.setItem("finalAdText",e),t.ad_video_transition={
ad_video_transition:e
},void _.find(".ad_text").html(e)):void($(".ad_transition_area .ad_text_setting").html()||(_.find(".js_ad_back").checkbox("checked",!1),
_.find(".ad_transition_area .ad_text_setting").html(""),_.find(".ad_transition_area .ad_text_setting").hide()));
});
}
function o(){
p.fireEvent("showRelatedVideoDialog",{
isShow:!0,
scene:"morevideo",
canuselink:!1,
allowChooseLength:3,
videoList:JSON.parse($(".js_related_video_desc").data("related_video")||"[]")
},function(e){
if(console.log(e),"undefined"!=typeof e){
$(".js_related_video_desc").data("related_video",JSON.stringify(e)).html("已选%s条视频".sprintf(e.length)).show(),
$(".js_related_list").empty();
for(var t=0;t<e.length;t++)e[t].title=e[t].title.html(!0),$(".js_related_list").append("<li>"+e[t].title+"</li>");
$(".js_related_video_checkbox").checkbox("checked",!0),$(".js_related_video_radio_custom").addClass("selected"),
$(".js_related_video_radio_suggestion").removeClass("selected"),$(".js_relate_video_modify").show(),
$(".js_recommend_wording").hide();
}
var i=$(".js_related_video_desc").data("related_video")||"";
(0===i.length||0===JSON.parse(i).length)&&($(".js_related_video_radio_suggestion").hasClass("selected")||($(".js_related_video_checkbox").checkbox("checked",!1),
$(".js_related_video_radio_custom").removeClass("selected")));
});
}
function s(e,t){
return"none"!=$(".js_more_video_area").css("display")?!1:void(0===wx.cgiData.can_use_video_recommend?o():0===$(t.target).closest(".js_related_video_select").length&&($(".js_related_video_select").toggle(),
"checked"!=$(".js_related_video_checkbox").attr("checked")&&d(!0),e&&d(!0)));
}
function d(e){
$(".js_related_video_radio_custom").removeClass("selected"),$(".js_related_video_radio_suggestion").addClass("selected"),
$(".js_relate_video_modify").hide(),$(".js_related_video_desc").data("related_video",JSON.stringify([])).html("智能推荐本公众号已群发视频").show(),
$(".js_recommend_wording").show(),$(".js_related_list").empty(),$(".js_related_video_checkbox").checkbox("checked",!0),
e||setTimeout(function(){
$(".js_related_video_select").hide();
});
}
function c(e){
var t=X.$pop.find(".jsPopoverBt").eq(0);
if(!t.hasClass("btn_disabled")&&!t.hasClass("btn_loading")){
t.addClass("btn_loading");
var i=$.trim(e);
return/^https?:\/\//.test(i)||(i="http://"+i),w.url(i)?void C.get({
url:"/cgi-bin/operate_appmsg?sub=check_sourceurl",
data:{
sourceurl:i
}
},function(e){
if(t.removeClass("btn_loading"),"none"!=X.$pop.css("display")){
var a=e&&e.base_resp&&e.base_resp.ret;
X.$pop.find(".js_err_msg").hide(),0==a?(l.articleList&&l.articleList.getCurrentArticleObject().data.set("source_url",i),
$("#js_article_url_area").find(".article_url_setting").html(i),$(".js_url").val(i),
X.hide()):1530503==a?(t.addClass("btn_disabled"),$(".js_url_tempkey").hide(),$(".js_warn.frm_msg").show()):64552==a?(t.addClass("btn_disabled"),
$(".js_url_tempkey").hide(),$(".js_url_error").show()):64508==a?(t.addClass("btn_disabled"),
X.$pop.find(".js_common_err").text("该链接非法，微信已经禁止访问").show()):(t.addClass("btn_disabled"),
$(".js_url_tempkey").hide(),v.err("系统繁忙，请稍后再试")),X.resetPosition();
}
}):($(".js_url_error").show(),X.resetPosition());
}
}
var l=this,_=l.$editor,u=(l.articleList&&l.articleList.getCurrentArticleObject().data.getData(),
l.ueditor.getBrowser());
if(u.ipad||u.iphone||u.android){
var m=$(l.ueditor.getUeditor().body);
$(document.body).on("click touchstart",function(){
m.blur();
});
}
var f=l.ueditor.ueditor.body;
f.addEventListener("load",function(e){
"IMG"===e.target.nodeName&&l.ueditor.fireEvent("adjustheight");
},!0);
var g=0,j=parseInt(window.getComputedStyle(f).paddingLeft);
f.addEventListener("mousemove",function(e){
at&&(window.clearTimeout(at),at=null);
var t=1*new Date;
if(t-g>100){
g=t;
var i=l.articleList&&l.articleList.getCurrentArticleObject();
i&&i.data.get("is_pay_subscribe")&&i.setTempPayPopup(e.clientX<=j?{
mode:"y",
y:e.clientY
}:{
mode:"hide"
});
}
},!1),l.ueditor.ueditor.iframe.parentNode.addEventListener("mouseout",function(e){
"IFRAME"===e.target.nodeName&&!function(){
var e=l.articleList&&l.articleList.getCurrentArticleObject();
e&&e.data.get("is_pay_subscribe")&&(at=window.setTimeout(function(){
e.setTempPayPopup({
mode:"hide"
}),at=null;
},100));
}();
},!1),_.find(".js_field").each(function(){
{
var e=$(this).attr("name");
$(this).attr("keyup");
}
$(this).on("keyup",function(){
_.find(".js_%s_error".sprintf(e)).hide();
});
}),_.find(".js_title").on("keyup",function(){
if(l.articleList){
var e=$.trim($(this).val()).html(!0),t=l.articleList&&l.articleList.getCurrentArticle();
t&&t.find(".js_appmsg_title").html(e||"标题"),_.find(".js_title_error").hide(),$("#js_draft_tips").hide();
}
}).on("focus",function(){
l.ueditor.fireEvent("title_focus"),l.ueditor.disableToolbar(),l.ueditor.teditor&&l.ueditor.teditor.disableToolbar(),
l.formItemsOpt.title.readonly||$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).on("click",function(){
l.formItemsOpt.title.readonly&&l.formItemsOpt.title.readonlyTips&&v.err(l.formItemsOpt.title.readonlyTips);
}).placeholder2();
{
var y=_.find("input.js_author");
_.find("input.js_writerid");
}
y.on("focus",function(){
l.ueditor.fireEvent("author_focus"),l.ueditor.disableToolbar(),$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).on("keyup",function(){
$("#js_draft_tips").hide();
}).on("click",function(){
var e;
if(l.articleList){
var t=l.articleList.getCurrentArticleObject();
t&&t.data&&(e=t.data.get("copyright_type"));
}
l.formItemsOpt.author.readonly&&(1===t.data.get("is_pay_subscribe")?l._showPayStatementDialog(!0):1==e?$("#js_original").find(".js_original_apply").eq(0).trigger("click"):l.formItemsOpt.author.readonlyTips&&v.err(l.formItemsOpt.author.readonlyTips));
}).placeholder2();
var b=0,x=_.find("#js_author_area"),T=parseInt(window.getComputedStyle(x[0]).paddingLeft);
x.on("mousemove",function(e){
at&&(window.clearTimeout(at),at=null);
var t=1*new Date;
if(t-b>100){
b=t;
var i=l.articleList&&l.articleList.getCurrentArticleObject();
i&&i.data.get("is_pay_subscribe")&&i.setTempPayPopup(e.target===e.currentTarget&&e.offsetX<=T?{
mode:"top"
}:{
mode:"hide"
});
}
}).on("mouseout",function(e){
e.target===e.currentTarget&&!function(){
var e=l.articleList&&l.articleList.getCurrentArticleObject();
e&&e.data.get("is_pay_subscribe")&&(at=window.setTimeout(function(){
e.setTempPayPopup({
mode:"hide"
}),at=null;
},100));
}();
});
var L=_.find(".js_reprint_recommend_title_len");
_.find(".js_reprint_recommend_title").on("focus",function(){
l.ueditor.disableToolbar();
}).on("input propertychange",function(){
var e=this.value.length;
L.html(e),e>10?L.parent().addClass("original_primary_tips_counter_warn"):L.parent().removeClass("original_primary_tips_counter_warn");
}).placeholder2();
var S=_.find(".js_reprint_recommend_content_len"),A=_.find(".js_reprint_recommend_content"),D=function(e){
return e.replace(/\s/g,"").length;
},I=null,E=function(e){
null!==I&&(clearTimeout(I),I=null),I=setTimeout(function(){
var t=D(e);
S.html(t),t>120?S.parent().addClass("original_primary_tips_counter_warn"):S.parent().removeClass("original_primary_tips_counter_warn");
},500);
};
A.on("focus",function(){
l.ueditor.disableToolbar();
}).on("input propertychange",function(){
E(this.innerText);
}).placeholder2();
var O=function(e){
return e.replace(/\r\n/g,"\n").replace(/\n\n/g,"<div><br></div>").replace(/\n([^\n]+)\n/g,"<div>$1</div>\n").replace(/\n([^\n]+)$/,"<div>$1</div>");
},R=function(e,t,i,a){
var r=function d(e,t){
if(!(e.childNodes.length>1))return 1===e.nodeType?{
target:e.childNodes[0],
pos:t
}:{
target:e,
pos:t
};
for(var i=0,a=e.childNodes,r=a.length;r>i;i++){
var n=a[i];
if(3===n.nodeType){
if(n.textContent.length>=t)return{
target:n,
pos:t
};
t-=n.textContent.length;
}else{
if(n.innerText.length>=t)return d(n,t);
t-=n.innerText.length;
}
}
},n=r(t,i+a.replace(/\r\n/g,"\n").replace(/\n\n/g,"a").replace(/\n/g,"").length),o=n.target,s=n.pos;
e.setBaseAndExtent(o,s,o,s);
};
A[0].addEventListener("paste",function(e){
e.preventDefault();
var t=window.getSelection(),i=t.getRangeAt(0).startOffset;
t.deleteFromDocument();
var a=t.anchorNode,r=null;
if(1===a.nodeType)r=a.childNodes[0];else if(r=a,a=r.parentNode,a.classList.contains("js_reprint_recommend_content")){
var n=document.createElement("div");
a.replaceChild(n,r),n.appendChild(r),a=n;
}
var o=(e.clipboardData||window.clipboardData).getData("text");
a.innerHTML=a.innerHTML.slice(0,i)+O(o)+a.innerHTML.slice(i),A.checkPlaceholder2(),
R(t,a,i,o),E(this.innerText);
}),A[0].addEventListener("drop",function(e){
e.preventDefault();
var t=null,i=null,a=null;
if(document.caretRangeFromPoint?(t=document.caretRangeFromPoint(e.x,e.y),i=t.startContainer,
a=t.startOffset):document.caretPositionFromPoint&&(t=document.caretPositionFromPoint(e.x,e.y),
i=t.offsetNode,a=t.offset),null!==t){
var r=window.getSelection();
r.deleteFromDocument();
var n=null;
if(1===i.nodeType)n=i.childNodes[0];else if(n=i,i=n.parentNode,i.classList.contains("js_reprint_recommend_content")){
var o=document.createElement("div");
i.replaceChild(o,n),o.appendChild(n),i=o;
}
var s=e.dataTransfer.getData("text");
i.innerHTML=i.innerHTML.slice(0,a)+O(s)+i.innerHTML.slice(a),A.checkPlaceholder2(),
R(r,i,a,s),E(this.innerText);
}
}),$(_.find("#edui1_iframeholder iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).on("click",function(){
l.formItemsOpt.content.readonly&&l.formItemsOpt.content.readonlyTips&&v.err(l.formItemsOpt.content.readonlyTips);
}),_.find(".js_desc").on("keyup",function(){
if(l.articleList){
var e=$.trim($(this).val()).html(!0),t=l.articleList.getCurrentArticle(),i=t.data("article");
i.data.set("auto_gen_digest",0),t&&t.find(".appmsg_desc").html(e),_.find(".js_desc_error").hide();
}
}),_.find("textarea.js_desc[name='digest']").on("change",function(){
if(l.articleList){
var e,t=l.articleList.getCurrentArticle();
t&&(e=t.data("article"))&&e.setAutoDigest(!1);
}
});
var P=_.find(".js_auto_insert_ad");
P&&P.length>0&&P.checkbox({
multi:!0,
onChanged:function(e){
if(l.articleList){
var t=e.checkbox("value")?N.auto:N.none;
l.articleList.getCurrentArticleObject().data.getData().insert_ad_mode=t,$(".js_appmsg_item.current").data("insertadmode",t),
e.checkbox("value")?($("#js_insert_ad_area").find(".js_insert_ad_allow_click").addClass("open"),
n.fireEvent("openCpcSetting")):$("#js_insert_ad_area").find(".js_insert_ad_allow_click").removeClass("open");
}
}
});
var z=$("#js_comment_area");
if(z&&z.length>0){
var F=new k({
dom:z.find(".js_comment_allow_click"),
content:$("#js_comment_setting_popover_tpl").html(),
place:"top",
hideIfBlur:!0,
onShow:function(){
this.resetPosition();
}
});
F.hide(),$(".js_comment_setting").checkbox({
multi:!1,
onChanged:function(e){
localStorage.setItem("commentStatus_"+wx.data.user_name,JSON.stringify({
need_open_comment:_.find(".js_comment").checkbox("value")?1:0,
only_fans_can_comment:1*e.checkbox("value")===1?1:0,
only_fans_days_can_comment:1*e.checkbox("value")===2?1:0
})),z.find(".comment_setting").html(e.data("label"));
}
}),z.on("click",".js_comment_allow_click.open",function(e){
e.preventDefault(),F.show();
});
}
var V=$("#js_album_area"),H=_.find(".js_album");
V&&V.length>0&&(H.checkbox({
multi:!0,
onChanged:function(e){
if(l.articleList)if(e.checkbox("value"))t(function(e){
e?(H.checkbox("checked",!1),V.find(".js_album_allow_click").removeClass("open")):V.find(".js_album_allow_click").addClass("open");
});else{
var i=l.articleList&&l.articleList.getCurrentArticleObject();
i.data.set("appmsg_album_info",{}),i.data.set("appmsg_album",""),V.find(".js_album_allow_click").removeClass("open"),
V.find(".album_setting").hide();
}
}
}),V.on("click",".js_album_allow_click.open",function(e){
e.preventDefault(),t();
})),_.find("#js_ad_back").checkbox({
multi:!0,
onChanged:function(e){
if(l.articleList){
var t=l.articleList.getCurrentArticleObject().data.getData(),i=e.checkbox("value");
i?(_.find(".ad_text").show(),r()):(_.find(".ad_text").html(""),t.ad_video_transition="",
t.advert_info.back_transition="",localStorage.removeItem("finalAdText"));
}
}
});
var Y=_.find("#video_dot_checkbox"),J=_.find("#video_dot_area");
Y.checkbox({
multi:!0,
onChanged:function(e){
if(l.articleList){
var t=e.checkbox("value");
if(t)a();else{
var i=l.articleList.getCurrentArticleObject().data.getData();
i.dot={},J.find(".js_paster_setting_text").html("");
}
}
}
}),J.on("click",".allow_click_opr",function(e){
"checked"===Y.attr("checked")&&(e.preventDefault(),a());
});
var K=new k({
dom:J.find(".allow_click_opr"),
content:$("#js_video_paster_popover_tpl").html(),
className:"popover_paster_tips",
place:"top",
hideIfBlur:!0,
onShow:function(){
var e="",t=l.articleList.getCurrentArticleObject().data.getData(),a=t.share_videoinfo[0].play_length;
q>a&&!i(t)?e="从公众平台上传的1分钟以上视频可设置自定义贴片":q>a&&i(t)?e="1分钟以上的视频才能设置自定义贴片":a>=q&&!i(t)&&(e="从公众平台上传的视频才能设置自定义贴片"),
this.$pop.find(".popover-video-paster__content").text(e),this.resetPosition();
}
});
K.hide(),K.$pop.find(".popover_bar").hide(),J.find(".allow_click_opr").on("mouseover",function(){
var e=l.articleList.getCurrentArticleObject().data.getData();
(!i(e)||e.share_videoinfo[0].play_length<q)&&K.show();
}),J.find(".allow_click_opr").on("mouseleave",function(){
K.hide();
}),_.find(".ad_transition").on("click",function(e){
"checked"===_.find("#js_ad_back").attr("checked")&&(e.preventDefault(),r());
}),_.find(".js_comment").checkbox({
multi:!0,
onChanged:function(e){
var t=e.checkbox("value");
localStorage.setItem("commentStatus_"+wx.data.user_name,JSON.stringify({
need_open_comment:t?1:0,
only_fans_can_comment:1*$(".js_comment_setting:checked").val()===1?1:0,
only_fans_days_can_comment:1*$(".js_comment_setting:checked").val()===2?1:0
})),t?(_.find(".comment_setting").show(),_.find(".js_comment_allow_click").addClass("open"),
setTimeout(F.show.bind(F))):(_.find(".comment_setting").hide(),_.find(".js_comment_allow_click").removeClass("open"));
}
}),_.find(".js_related_video_checkbox").checkbox({
multi:!0,
onChanged:function(e){
var t=e.checkbox("value");
t?s(!0):($(".js_related_list").empty(),$(".js_related_video_checkbox").checkbox("checked",!1),
$(".js_related_video_radio_suggestion").removeClass("selected"),$(".js_related_video_radio_custom").removeClass("selected"),
$(".js_related_video_desc").data("related_video",JSON.stringify([])).html("").hide(),
$(".js_related_video_select").hide());
}
}),_.find(".js_related_video_custom").on("click",function(){
o();
}),_.find(".js_related_video_suggestion").on("click",function(){
d();
}),$(document).on("click",function(e){
var t=$(e.target);
0!=t.closest(".js_related_video_allow_click").length||0!=t.closest(".js_related_video_select").length||t.hasClass("js_related_video_checkbox_icon")||t.hasClass("js_related_video_checkbox")||$(".js_related_video_select").hide();
}),$(".js_more_video_qa").mouseenter(function(){
"none"==$(".js_related_video_select").css("display")&&$(".js_more_video_area").show();
}).mouseleave(function(){
$(".js_more_video_area").hide();
}),_.find(".js_related_video_allow_click").on("click",function(e){
e.preventDefault(),s(!1,e);
});
var X=new k({
dom:$("#js_article_url_area").find(".js_article_url_allow_click"),
content:$("#js_article_setting_popover_tpl").html(),
place:"top",
width:500,
className:"popover_article_setting_large",
hideIfBlur:!0,
buttons:[{
text:"确定",
type:"primary",
click:function(){
c(this.$pop.find(".js_url").val());
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}],
onShow:function(){
this.resetPosition();
var e="";
l.articleList&&(e=l.articleList.getCurrentArticleObject().data.get("source_url")),
$(".js_url").val(e);
var t=this.$pop.find(".jsPopoverBt").eq(0);
e?t.removeClass("btn_disabled"):t.addClass("btn_disabled");
},
onHide:function(e){
if(l.articleList&&l.articleList.getCurrentArticleObject&&(!e||e.target!=$(".js_url_checkbox")[0]&&e.target!=$(".js_url_checkbox_icon")[0]&&e.target!=$(".js_url_checkbox_icon").parent()[0])){
var t=l.articleList.getCurrentArticleObject();
if(t&&t.data){
var i=t.data.get("source_url");
_.find(".js_url_checkbox").checkbox("value")&&!i&&(_.find(".js_url_checkbox").checkbox("checked",!1),
_.find(".article_url_setting").hide(),_.find(".js_article_url_allow_click").removeClass("open"),
l.ueditor.funcPvUvReport("hidelink"),$(".js_url_error").hide(),$(".frm_msg.js_warn").hide());
}
}
}
});
X.hide(),$(".js_url").on("keyup",function(e){
13==e.keyCode&&c($(this).val());
}),$(".js_url").on("input change",function(){
var e=X.$pop.find(".jsPopoverBt").eq(0);
e.removeClass("btn_loading"),$(".js_warn.frm_msg").hide(),$(".js_url_error").hide();
var t=$.trim($(this).val());
t?e.removeClass("btn_disabled"):e.addClass("btn_disabled"),/\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/.test(t)?"none"==$(".js_url_tempkey").css("display")&&$(".js_url_tempkey").show():"none"!=$(".js_url_tempkey").css("display")&&$(".js_url_tempkey").hide(),
X.resetPosition();
}),$("#js_article_url_area").on("click",".js_article_url_allow_click.open",function(e){
e.preventDefault(),X.show();
}),_.find(".js_url_checkbox").checkbox({
multi:!0,
onChanged:function(e){
e.checkbox("value")?(_.find(".article_url_setting").show(),_.find(".js_article_url_allow_click").addClass("open"),
l.ueditor.funcPvUvReport("showlink"),setTimeout(X.show.bind(X))):(_.find(".article_url_setting").hide(),
_.find(".js_article_url_allow_click").removeClass("open"),l.ueditor.funcPvUvReport("hidelink")),
$(".js_url_error").hide(),$(".frm_msg.js_warn").hide();
}
}),l._initUploadCover(),_.find(".page_msg_link").on("click",function(){
p.fireEvent("showVideoAdBackDialog",{
scene:"ueditor"
},function(e){
var t=this;
e&&C.post({
url:"/merchant/ad_seller_manager?action=quick_open_adseller"
},function(e){
var i=e.base_resp,a=void 0===i?{}:i;
0===a.ret?(t.$tipsSuc("视频后贴广告开通成功"),$("#ad_transition_area").show(),$(".js_ad_back").checkbox("checked",!0),
$(".ad_transition_area .ad_text_setting").html(M),localStorage.setItem("adTransitionText",M),
$(".ad_transition_area .ad_text_setting").show(),$(".advert_tips").hide()):t.$tipsErr("系统错误，请稍候重试"+a.ret);
});
});
}),_.find(".ad_closed").on("click",function(){
$(".advert_tips").hide(),localStorage.setItem("hasCloseAdTips-"+wx.commonData.data.uin,!0);
}),_.find("#js_description").on("click",function(){
l.formItemsOpt.description.readonly&&l.formItemsOpt.description.readonlyTips&&v.err(l.formItemsOpt.description.readonlyTips);
}),_.find(".js_counter").each(function(){
$(this).hasClass("js_author")?l.formItemsOpt.author.counter=new h(this,{
maxLength:$(this).attr("max-length"),
useGBKLength:!0,
GBKBased:!0
}):$(this).hasClass("js_title")?l.formItemsOpt.title.counter=new h(this):new h(this,{
maxLength:$(this).attr("max-length")
});
}),l._initOriginal(),l._initDarkmodeNotice(),l._initPay(),l.freeUEditor=_.find(".js_fp_editor_empty_none"),
l._initBan(),l._initAd();
},
_initUploadCover:function(){
var e=this,t=e.$editor;
$("#js_selectCoverFromContent").on("click",function(){
if(e.articleList){
var t=e.articleList._getCurrentIndex(),i=e.ueditor.fireEvent("get_current_article_all_img")||[];
document.body.style.overflow="hidden";
var a=1*t===0?[{
title:"图文封面",
desc:"你的星标、常读用户将在订阅号消息列表里，看到此封面。",
ratio:2.35
},{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}]:[{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}];
p.fireEvent("showImageDialog",{
maxselect:1,
uploadscene:2,
uploadgroup:3,
desc:"大小不超过10M",
fromcontent:!0,
contentimgUrls:i,
crop:!0,
ratio:a
},function(t){
if(t){
var i=t.img,a=t.info,r="content";
e._setCropImg(i,a,r),setTimeout(function(){
$("#js_description").focus();
},1e3);
}
});
}
}),$("#js_imagedialog").on("click",function(){
if(e.articleList){
document.body.style.overflow="hidden";
var t=e.articleList._getCurrentIndex(),i=1*t===0?[{
title:"图文封面",
desc:"你的星标、常读用户将在订阅号消息列表里，看到此封面。",
ratio:2.35
},{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}]:[{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}];
p.fireEvent("showImageDialog",{
maxselect:1,
uploadscene:2,
uploadgroup:3,
desc:"大小不超过10M",
crop:!0,
ratio:i
},function(t){
if(t){
var i=t.img,a=t.info,r="lib";
e._setCropImg(i,a,r),setTimeout(function(){
$("#js_description").focus();
},1e3);
}
});
}
}),t.on("click",".js_modifyCover",function(){
if(e.articleList){
var i=e.articleList._getCurrentIndex(),a=e.articleList.getCurrentArticleObject().data,r=a.get("crop_list"),n=t.find("#js_cover_area"),o=n.find("input.js_cdn_url").val(),s=n.find("input.js_cdn_url_back").val();
s||(s=o);
var d=1*i===0?[{
title:"图文封面",
desc:"你的星标、常读用户将在订阅号消息列表里，看到此封面。",
ratio:2.35
},{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}]:[{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}],c=[];
if(r&&r.crop_list&&r.crop_list.length>0)for(var l=0,_=r.crop_list.length;_>l;l++){
var u=r.crop_list[l];
c.push({
x:u.x1,
y:u.y1,
x2:u.x2,
y2:u.y2
});
}
p.fireEvent("showImageDialog",{
src:s,
crop:!0,
step:2,
ratio:d,
cropInfo:c
},function(t){
if(t){
var i=t.img,a=t.info,r="modify";
e._setCropImg(i,a,r),setTimeout(function(){
$("#js_description").focus();
},1e3);
}
});
}
});
},
_resizeUploadCover:function(){
if(this.articleList){
var e=this.articleList._getCurrentIndex();
0===e?(this.$editor.find(".setting-group__cover").addClass("setting-group__cover_primary"),
this.$editor.find(".setting-group__cover").removeClass("setting-group__cover_minor")):(this.$editor.find(".setting-group__cover").removeClass("setting-group__cover_primary"),
this.$editor.find(".setting-group__cover").addClass("setting-group__cover_minor"));
}
},
_setCropImg:function(e,i,a){
var r=this,n=r.articleList._getCurrentIndex(),o=[],s=1*n===0?["2.35_1","1_1"]:["1_1"],d=$.map(i,function(e){
return e.info;
});
$.each(d,function(e,t){
t&&o.push({
key:s[e],
absX1:t.x,
absY1:t.y,
absX2:t.x2,
absY2:t.y2
});
}),T.getUrlMulti({
imgurl:e.url,
size:$.map(i,function(e){
return delete e.info,e;
}),
onerror:function(e){
v.err(-1==e.retcode?"请选择裁剪区域":"系统繁忙，请稍后再试"),document.body.style.overflow="visible";
},
onsuccess:function(i){
for(var s={
oriUrl:i.oriUrl,
multiSize:{}
},d=0,c=o.length;c>d;d++){
var l=o[d],_=i.result[d];
s.multiSize[l.key]={
url:_.cdnurl,
file_id:_.file_id,
absX1:l.absX1,
absY1:l.absY1,
absX2:l.absX2,
absY2:l.absY2
};
}
1*n===0?(s.url=s.multiSize["2.35_1"].url,s.file_id=s.multiSize["2.35_1"].file_id):(s.url=s.multiSize["1_1"].url,
s.file_id=s.multiSize["1_1"].file_id),r._coverChange({
file_id:e.fileId||"",
oriUrl:s.oriUrl,
url:s.url,
multiSize:s.multiSize
}),r.ueditor.fireEvent("reportAddNum",65080,0,1),"upload"===e.source&&r.ueditor.fireEvent("reportAddNum",65080,113,1),
"lib"===a?(r.ueditor.fireEvent("reportAddNum",65080,2,100),t(38,1,"trace")):"content"===a&&r.ueditor.fireEvent("reportAddNum",65080,1,100),
document.body.style.overflow="visible";
}
});
},
_getCropImgRatio:function(e){
return 0==e?16/9:1;
},
_coverChange:function(e){
var t=this.articleList.getCurrentArticleObject();
t&&t.coverChange(e);
},
_getCropImgTips:function(e){
return 0==e?"首篇图文封面图片长宽比只能为16：9，拖拽裁剪框调整展示区域":"次篇图文封面图片长宽比只能为1：1，拖拽裁剪框调整展示区域";
},
_getFrameHeight:function(){
this.ueditor&&this.ueditor.fireEvent("adjustheight");
},
handleAutoInsertCountTips:function(e,t,i){
var a=this.$editor.find(".auto_insert_count_tips");
if(e===N.auto){
var r=t?2:i?1:0;
a.html("本文最多可插入"+r+"条广告"),a.show();
}else a.hide();
},
handleAutoInsertCountTipsTask:function(){
var e=this,t=void 0,i=Date.now(),a=500,r=500,o=3e3;
n.addListener("keyup editAd",function(){
var n=Date.now();
a>n-i&&t?clearTimeout(t):i=n,t=setTimeout(function(){
if(e.articleList){
var t=e.articleList.getCurrentArticleObject();
if(t){
var i=t.data.getData().insert_ad_mode;
if(i===N.auto){
var n=Date.now(),s=G(e.ueditor.getUeditor().body),d=Date.now()-n;
a=Math.min(Math.max(10*d,r),o),e.handleAutoInsertCountTips(i,s.secondAutoAdAvailable,s.autoAdAvailable);
}
}
}
},a);
});
},
handleCheckMusicResult:function(){
var e=this,t=function(){
e.ueditor.fireEvent("dbcache_get",{
cacheKey:Q.masssendCacheKey,
callback:function(t){
if(t&&t.cacheValue){
e.ueditor.fireEvent("dbcache_remove",{
cacheKey:Q.masssendCacheKey
});
var i=t.cacheValue;
if(i.errorData&&i.errorData.length>0){
var a=i.appmsgid;
if(!a||wx.cgiData.app_id+""!=a+"")return;
var r=i.type||"music";
e.ueditor.fireEvent(r+"CheckResultFocus",{
focusData:i.focusData,
errorData:i.errorData
});
}
}
}
});
};
window.musicCheckResultFocus=function(){
t();
},t();
},
_reportAppmsg:function(){
H.saveSpeeds("appmsg",[{
sid:21,
time:window._points[11]-window._points[5]||0
},{
sid:32,
time:window._points[8]-window._points[7]||0
},{
sid:33,
time:window._points[10]-window._points[9]||0
},{
sid:34,
time:window._points[7]-window._points[6]||0
}])&&H.send();
var e=[{
id:"122325",
key:"0",
len:"1"
},{
id:"122325",
key:"1",
len:"1"
}];
(wx.cgiData.can_use_voice||wx.cgiData.qqmusic_flag)&&e.push({
id:"122325",
key:"3",
len:"1"
}),wx.cgiData.can_use_vote&&e.push({
id:"122325",
key:"5",
len:"1"
}),wx.commonData&&wx.commonData.acl&&wx.commonData.acl.msg_acl.can_use_qa&&e.push({
id:"122325",
key:"7",
len:"1"
}),wx.cgiData.can_use_card&&e.push({
id:"122325",
key:"9",
len:"1"
}),wx.cgiData.can_see_ad&&e.push({
id:"122325",
key:"11",
len:"1"
}),wx.cgiData.can_use_weapp_card&&e.push({
id:"122325",
key:"13",
len:"1"
}),wx.cgiData.can_use_cps&&e.push({
id:"122325",
key:"15",
len:"1"
}),e.push({
id:"122325",
key:"17",
len:"1"
}),wx.cgiData.can_see_ad&&wx.cgiData.can_use_cps&&wx.cgiData.can_use_card&&e.push({
id:"122443",
key:"14",
len:"1"
}),(wx.cgiData.can_see_ad&&wx.cgiData.can_use_cps||wx.cgiData.can_see_ad&&wx.cgiData.can_use_card||wx.cgiData.can_use_cps&&wx.cgiData.can_use_card)&&e.push({
id:"122443",
key:"15",
len:"1"
}),this.ueditor.fireEvent("reportAddNum",e);
var t=this.ueditor.getBrowser(),i=document.documentElement.clientWidth;
768>=i?this.ueditor.fireEvent("reportAddNum",127648,0,1):1168>=i?this.ueditor.fireEvent("reportAddNum",127648,1,1):1350>=i?this.ueditor.fireEvent("reportAddNum",127648,2,1):1678>=i?this.ueditor.fireEvent("reportAddNum",127648,3,1):1920>=i?this.ueditor.fireEvent("reportAddNum",127648,4,1):this.ueditor.fireEvent("reportAddNum",127648,5,1),
t.ipad&&this.ueditor.fireEvent("reportAddNum",127648,6,1);
},
_initUEditor:function(e){
var t=this;
if("function"!=typeof window.__MpEditor)return void setTimeout(function(){
t._initUEditor(e);
},100);
t._initFormItemsOpt();
var i=L.getEditorPluginsObject({
can_use_txvideo:wx.cgiData.can_use_txvideo,
show_share_dialog:wx.cgiData.can_pub_video,
can_use_vote:wx.cgiData.can_use_vote,
can_use_card:wx.cgiData.can_use_card,
biz_uin:Y.biz_uin,
can_see_ad:wx.cgiData.can_see_ad,
has_ad:wx.cgiData.has_ad,
can_use_voice:wx.cgiData.can_use_voice,
qqmusic_flag:wx.cgiData.qqmusic_flag,
can_use_weapp_card:wx.cgiData.can_use_weapp_card,
can_use_hyperlink:wx.cgiData.can_use_hyperlink,
can_use_appmsg_outer_url:wx.cgiData.can_use_appmsg_outer_url,
token:wx.data.t,
appmsg_template_cnt:wx.cgiData.appmsg_template_cnt,
can_see_product:1===wx.cgiData.can_see_product?!0:!1,
can_use_smart:1===wx.cgiData.can_use_smart?!0:!1,
can_use_product:1===wx.cgiData.can_use_product?!0:!1,
can_use_wxopen_link:1===wx.cgiData.can_use_wxopen_link?!0:!1,
can_use_cps:1===wx.cgiData.can_use_cps?!0:!1,
cpsTipStatus:{
choiceNoCommissionNeedTip:!0
},
red_dot_flag:wx.cgiData.red_dot_flag,
can_use_redpacketcover:1===wx.cgiData.can_use_red_packet_cover?!0:!1
}),a=["undo","redo","|","removeformat","formatmatch","|","fontsize","bold","italic","underline","strikethrough","forecolor","backcolor","|","justify","indent","justifyindent","rowspacingtop","rowspacingbottom","lineheight","letterspacing","insertlist","imagefloat","|","inserttable","blockquote","horizontal","insertcode","mpemotion","more"];
i.push(new S({
container:"#js_editor_inserttemplate",
token:wx.data.t
})),i.push(new A),H.mark("appmsg","initEditor","start"),n=t.ueditor=new window.__MpEditor({
maxArticleNum:8,
app_id:(wx.cgiData.app_id||Math.random())+"",
needCheckText:!0,
wordCount:!0,
multipleTab:!0,
plugins:i,
initialFrameWidth:2e3,
autoHeightEnabled:!0,
topOffset:0,
is_illegal:1*t.appmsg_data.is_illegal||0,
toolbars:[a],
onReady:function(){
H.mark("appmsg","initEditor","end"),H.saveSpeeds("appmsg","initEditor",35)&&H.send(),
H.mark("appmsg","initEditArea","start"),t._initEditArea(),H.mark("appmsg","initEditArea","end"),
H.saveSpeeds("appmsg","initEditArea",45)&&H.send(),H.mark("appmsg","initArticleList","start"),
t.articleList=new E($.extend({
createType:wx.cgiData.createType,
maxNum:8,
ueditor:t.ueditor,
freeUEditor:t.freeUEditor,
is_illegal:1*t.appmsg_data.is_illegal||0,
is_rumor:1*t.appmsg_data.is_rumor||0,
formItemsOpt:t.formItemsOpt,
is_malicious:1*t.appmsg_data.is_malicious||0
},t.opt)),$("#editor_pannel").show(),$(t.ueditor.getDom("_iframeholder")).show(),
$("#article_setting_area").show(),$("#history_bt").show(),$("#bottom_main").show(),
t._getSendData(),$(".edui-combox.js_toolbar_more").find(".edui-arrow").css("cssText","display:none!important"),
$(".edui-combox.js_toolbar_more").css("cssText","display:none!important"),$("#editor_pannel").css("minHeight",$(window).height()-$("#header").height()),
t._bindEvent(),t._initRecentList(),window._points&&(window._points[11]=+new Date),
H.mark("appmsg","initArticleList","end"),H.saveSpeeds("appmsg","initArticleList",27)&&H.send(),
t._reportAppmsg(),t.handleCheckMusicResult();
}
}),n.render("js_editor"),n.addListener("is_use_editor",function(){
return!$("#edui1_iframeholder").is(":hidden");
}),n.addListener("begincatchimage",function(){
v.suc("内容已上传完成");
}),n.addListener("after_change_article",function(e,i){
Q.canShowArticlePanel=!1,Q.$articlePanel&&Q.$articlePanel.hide(),"replace"===i?t.ueditor.fireEvent("reportAddNum",65080,121,1):"add"===i&&t.ueditor.fireEvent("reportAddNum",65080,122,1),
setTimeout(function(){
Q.canShowArticlePanel=!0;
},500);
}),n.addListener("showEditorMsgTips",function(e,i){
$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text(i.msg);
}),n.addListener("catchremotesuccess",function(e,i,a,r){
n.fireEvent("update_remote_img",{
article:i.article,
remoteType:"success",
uid:i.uid,
format:r,
img_url:a
});
var o=$(n.getDocument()).find(".js_catchremoteimageerror").length;
0==o?$(".js_catch_tips",t.$editor).hide():$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text("有%s张图片上传失败".sprintf(o));
}),n.addListener("catchremoteerror",function(e,i,a){
if(i&&n.fireEvent("update_remote_img",{
article:i.article,
remoteType:"error",
uid:i.uid,
img_url:i.defaultRemoteImg
}),a)$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text(a);else{
var r=$(n.getDocument()).find(".js_catchremoteimageerror").length;
0==r?$(".js_catch_tips",t.$editor).hide():$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text("有%s张图片上传失败".sprintf(r));
}
}),n.addListener("scrollIntoView",function(e,t,i){
var a=this;
Q.scrollIntoViewid&&clearTimeout(Q.scrollIntoViewid),Q.scrollIntoViewid=setTimeout(function(){
var e=n.getDomUtils();
if(t=$(t)[0],0==Q.scrollIntoViewCount&&t&&e.inDoc(t,t.ownerDocument)){
var r=null;
if(3===t.nodeType){
var o=a.selection.getRange(),s=o.createBookmark(),d=t.ownerDocument.createElement("span");
t.parentNode.insertBefore(d,t),d.appendChild(t),r=$(d).offset().top,d.parentNode.insertBefore(t,d),
d.parentNode.removeChild(d),o.moveToBookmark(s).select(!0);
}else r=$(t).offset().top;
Q.scrollIntoViewCount=2,$("html, body").animate({
scrollTop:r-(i||50)
},null,null,function(){
Q.scrollIntoViewCount--;
});
}
},100);
}),n.addListener("showErrMsg",function(e,t,i){
$(t).show().find(".js_msg_content").text(i);
}),n.addListener("hideAllErrMsg",function(){
t.$editor.find(".js_error_msg,.js_tip_mask_msg").hide(),t.$editor.find(".js_tip_mask").removeClass("error_mask"),
$("#js_labels_error").hide();
}),n.addListener("keyup",function(){
$(".js_content_error",t.$editor).hide(),$(".page_msg.js_warn").hide(),$("#js_draft_tips").hide();
}),n.addListener("aftersetcontent",function(){
var e=t.articleList&&t.articleList.getCurrentArticleObject();
e&&e.data.get("is_pay_subscribe")&&e.setPayPopup({
mode:"init"
});
}),n.addListener("afterAdjustHeightFnExcute",function(){
$(window).trigger("scroll",!1);
var e=t.articleList&&t.articleList.getCurrentArticleObject();
e&&e.data.get("is_pay_subscribe")&&e.setPayPopup({
mode:"update"
});
}),n.addListener("focus",function(){
$(".page_msg.js_warn").hide(),n.enableToolbar();
}),n.addListener("renderReadOnly",function(e,i){
0==it?t._renderReadOnly(i):(et=!0,tt=i);
}),n.addListener("isReadOnly",function(){
return Q.isReadOnly;
}),n.addListener("renderEditorByType",function(e,i,a){
var r=i,n="number"==typeof i?i:r.type;
t._renderEditorByType(n,a,r);
}),n.addListener("setTitleStatus",function(e,i){
t._setTitleStatus(i);
}),n.addListener("setAuthorStatus",function(e,i){
t._setAuthorStatus(i);
}),n.addListener("switchContentType",function(e,i){
t._switchContentType(i);
}),n.addListener("setToolBarStatus",function(e,i){
t._setToolBarStatus(i);
}),n.addListener("setArticleUrlStatus",function(e,i){
t._setArticleUrlStatus(i);
}),n.addListener("setAdInsertStatus",function(e,i){
t._setAdInsertStatus(i);
}),n.addListener("setMoreReadStatus",function(e,i){
t._setMoreReadStatus(i);
}),n.addListener("setCommentStatus",function(e,i){
t._setCommentStatus(i);
}),n.addListener("setOriginalStatus",function(e,i){
t._setOriginalStatus(i);
}),n.addListener("setCoverStatus",function(e,i){
t._setCoverStatus(i);
}),n.addListener("setDescriptionStatus",function(e,i){
t._setDescriptionStatus(i);
}),n.addListener("setFoldStatus",function(e,i,a){
t._setFoldStatus(i,a);
}),n.addListener("setSaveBtnStatus",function(e,i){
t._setSaveBtnStatus(i);
}),n.addListener("setCurRenderType",function(e,i){
t._setCurRenderType(i);
}),n.addListener("afterArticleSelect",function(){
$(window).trigger("scroll",!1),t._resizeUploadCover();
}),n.addListener("showVideoModifyDialog",function(){
b.show({
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
});
}),n.addListener("setArticleAdMode",function(e,i){
i=1===Q.curRenderType?i:N.none,setTimeout(function(){
if(t.articleList){
var e=t.articleList.getCurrentArticleObject().data.getData();
e.insert_ad_mode=i,$(".js_appmsg_item.current").data("insertadmode",i);
var a=t.$editor.find(".js_auto_insert_ad");
i==N.op?(a.checkbox().checked(!1),a.checkbox().disabled(!0),a.parent().find(".js_insert_ad_allow_click").removeClass("open"),
a.parent().find(".insert_ad_tips").show()):(a.checkbox().checked(i!=N.none),a.checkbox().disabled(!1),
a.parent().find(".js_insert_ad_allow_click").addClass("open"),a.parent().find(".insert_ad_tips").hide()),
t.handleAutoInsertCountTips(i,e.secondAutoAdAvailable,e.autoAdAvailable);
}
},50);
}),t.handleAutoInsertCountTipsTask(),document.addEventListener("EditorCpcDel",function(){
var e=t.$editor.find(".js_auto_insert_ad");
e.checkbox().checked(!1),e.checkbox().disabled(!1),e.parent().find(".js_insert_ad_allow_click").removeClass("open"),
e.parent().find(".insert_ad_tips").hide();
}),n.addListener("setArticleAdCategoriesList",function(e,i){
if("string"==typeof i)try{
i=JSON.parse(i);
}catch(a){}
t.articleList&&setTimeout(function(){
t.articleList.getCurrentArticleObject().data.getData().categories_list=i,$(".js_appmsg_item.current").data("categorieslist",i.join("|"));
},50);
}),n.addListener("updateTitleInputCounter",function(e,i){
t.formItemsOpt.title.counter.updateMaxLength(i);
}),"function"==typeof e.callback&&e.callback();
},
renderRewardSwtich:function(e){
var t=0,i=!1,a=!1;
e.authorTotalCount?e.writerid?1*e.can_open_reward?(1*e.can_reward?(i=!0,t=3):(i=!1,
t=4),a=!1):(a=!0,i=!1,t=2):(a=!1,i=!1,t=1):(a=!0,i=!1,t=wx.cgiData.totalInviteAuthorCnt>0&&wx.cgiData.inviteAuthorCnt>0?5:6),
e.$tipsDom.html(wx.T(l,{
inviteAuthorLink:e.inviteAuthorLink,
type:t,
author_username:e.author_username,
author:e.author,
author_encode:encodeURIComponent(e.author)
})).show(),e.$inputDom&&e.$inputDom.length&&(e.$inputDom.prop("disabled",a).prop("checked",i),
e.$rewardTips2020[i?"show":"hide"](),e.updateReprint&&this.updateReprintSwitchByReward({
multiMediaText:e.multiMediaText,
rewardChecked:i,
$reprintSwitchDom:e.$reprintSwitchDom,
$reprintTipDom:e.$reprintTipDom,
reprintOptions:e.reprintOptions
}),e.$rewardReplyContainer&&this.updateReplyByReward({
$rewardReplyContainer:e.$rewardReplyContainer,
author:e.author,
rewardChecked:i,
reward_reply_id:e.reward_reply_id||"",
$dom:$(".original_dialog")
})),e.$authorityContainer&&e.$customerauthorContainer&&this.showOriginInputDom(t>=2&&4>=t?{
$authorityLabel:e.$authorityLabel,
$customerauthorLabel:e.$customerauthorLabel,
$authorityContainer:e.$authorityContainer,
$customerauthorContainer:e.$customerauthorContainer,
$authorityTips:e.$authorityTips,
showAuthority:!0,
author:e.author,
writerid:e.writerid
}:{
$authorityLabel:e.$authorityLabel,
$customerauthorLabel:e.$customerauthorLabel,
$authorityContainer:e.$authorityContainer,
$customerauthorContainer:e.$customerauthorContainer,
$authorityTips:e.$authorityTips,
showAuthority:!1,
author:e.author,
writerid:e.writerid,
trigger:!0
}),s.init({
$container:e.$tipsDom
});
},
updateReprintSwitchByReward:function(e){
e.multiMediaText||(e.rewardChecked?(e.$reprintSwitchDom.prop("disabled",!1),e.$reprintTipDom.text("开启后，所有公众号都可以转载此文章。")):(e.$reprintSwitchDom.prop("disabled",!0).prop("checked",!1),
e.$reprintTipDom.text("开启赞赏之后才能开启开放转载。")));
},
updateReplyByReward:function(e){
if(e.rewardChecked&&e.author){
e.$rewardReplyContainer.show();
var t=this,i=e.$rewardReplyContainer.find(".js_reply_list_container");
t.getRewardReplyList({
$dom:e.$rewardReplyContainer,
replyId:e.reward_reply_id
},function(a){
function r(e){
return e=e||"",e.emoji();
}
var n=e.$rewardReplyContainer.find(".js_not_reply_tips"),o=e.$rewardReplyContainer.find(".js_has_reply_tips"),s=e.$rewardReplyContainer.find(".js_choose_reply_tips");
if(!a||0===a.length)return n.show(),o.hide(),void s.hide();
e.reward_reply_id?(n.hide(),o.show(),s.hide()):(n.hide(),o.hide(),s.show());
var d=!1,c=e.$dom;
a&&a.forEach(function(t){
t.extrClass="",t.reply_id==e.reward_reply_id&&(t.extrClass="selected",d=!0),2!==t.type||t.text||(t.text="图片："+t.title),
t.text=t.text.replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\'/g,""),t.text=r(t.text).replace(/\n/g,"<br>");
});
var l=c.data("author_info");
e.reward_reply_id||d||!Q.isRewardSwitched||(a[0].extrClass="selected",l.reward_reply_id=a[0].reply_id,
t.ueditor.fireEvent("changeAuthorInfo",l,!0),n.hide(),o.show(),s.hide()),i.html(template.render("tpl_reward_reply_list",{
list:a
})),i.show();
});
}else e.$rewardReplyContainer.hide();
},
getRewardReplyList:function(e,t){
var i=e.$dom,a=e.replyId,r=i.find(".js_reply_list_loading"),n=i.find(".js_reply_list_container");
r.show(),n.hide(),n.html(""),C.get({
url:"/merchant/reward?action=getautoreply&ignore_del_reply_id="+a,
data:{}
},function(e){
e.base_resp&&0===e.base_resp.ret?(t(e.reply_infos),r.hide()):(C.handleRet(e,{
msg:"赞赏回复拉取失败，请稍后重试",
ret:e.base_resp.ret
}),t(null),r.hide());
},function(e){
C.handleRet(e,{
msg:"赞赏回复拉取失败，请稍后重试"
});
});
},
showOriginInputDom:function(e){
if(e.showAuthority){
e.$authorityContainer.show(),e.$customerauthorContainer.hide(),e.$authorityLabel.show(),
e.$customerauthorLabel.hide(),e.writerid?(d.highlineAuthor({
$highline:e.$authorityContainer,
highlineClass:"author_active"
}),e.$authorityTips.show()):(d.resetHighlineAuthor({
$highline:e.$authorityContainer,
highlineClass:"author_active"
}),e.$authorityTips.hide());
var t=e.$authorityContainer.find("input.js_author");
t.val(e.author),e.trigger&&t.trigger("keyup",{
keyCode:13
});
}else{
e.$authorityTips.hide(),e.$authorityContainer.hide(),e.$customerauthorContainer.show(),
e.$authorityLabel.hide(),e.$customerauthorLabel.show(),d.resetHighlineAuthor({
$highline:e.$authorityContainer,
highlineClass:"author_active"
});
var i=e.$customerauthorContainer.find("input.js_author");
i.val(e.author),e.trigger&&i.trigger("keyup");
}
},
_initOriginal:function(){
var e,t=this,i=t.$editor,r=0,n=!1;
t.rencentArticleType=[{
name:"全部类别",
data:V
}],C.get({
url:"/cgi-bin/operate_appmsg?t=ajax-response&sub=get_recently_article_type",
data:{}
},function(e){
if(e&&e.items&&e.items.length){
var i={
name:"最近使用",
data:[]
};
$.each(e.items,function(e,t){
i.data.push({
name:t.article_type,
value:t.article_type,
disabled:!1
});
}),t.rencentArticleType.unshift(i);
}
}),$(".js_original_apply").on("click",function(o){
function s(){
2==l&&(n=!1,c(o));
}
function c(i){
function n(e){
q=e,rt.html(template.render("js_recently_article_whitelist_tpl",{
list:"recent"===e?F:z,
type:e
})).show();
}
function o(){
rt.hide();
}
function s(t){
if(t){
var i=Number(x.prop("checked"));
$.each(U,function(e,t){
t.can_reward=i,t.title=y(t);
});
}
$("#js_article_whitelist_added").html(template.render("js_article_whitelist_added_tpl",{
list:U
})).show(),U.length?(ot.parent().show(),ot.prop("checked")?e.find(".js_btn_p:eq(2)").enable():e.find(".js_btn_p:eq(2)").disable()):(ot.parent().hide(),
e.find(".js_btn_p:eq(2)").enable());
}
function c(e){
return U.length>0&&$.each(e.list,function(t,i){
$.each(U,function(e,t){
l(i,t.openid);
}),"function"==typeof e.cb&&e.cb(i);
}),e.list;
}
function l(e,t){
e.openid===t&&(e.isSelect=!0);
}
function w(e){
X||(X=!0,C.post({
url:"/cgi-bin/appmsgcopyright?action=searchacct",
data:{
username:e
},
complete:function(){
X=!1;
}
},function(e){
e.base_resp&&0==e.base_resp.ret&&e.search_list?(z=c({
list:e.search_list,
cb:function(e){
e.pic_url&&(e.pic_url=e.pic_url.endsWith("/0")?e.pic_url:e.pic_url+"/0");
}
}),n("search")):v.err(e.base_resp&&200013==e.base_resp.ret?"操作频繁，请稍后重试":"系统繁忙，请稍后重试("+e.base_resp.ret+")");
}));
}
function j(e){
e.direction=e.direction||"bottom",e.offset=e.offset||0;
var t=e.target.getBoundingClientRect()[e.direction],i=e.container.getBoundingClientRect()[e.direction];
switch(e.direction){
case"top":
case"left":
if(!e.isForce&&t>i)return;
break;

case"bottom":
case"right":
if(!e.isForce&&i>t)return;
}
e.container[["top","bottom"].indexOf(e.direction)>-1?"scrollTop":"scrollLeft"]+=t-i+e.offset;
}
function y(e){
var t=[];
return e.can_modify&&t.push("可修改文章"),e.can_hide_source&&t.push("不显示转载来源"),t.join("，");
}
var b,x,T,L,S,A,I,E,O,R,P,N,M=$("#js_original"),B=wx.cgiData.inviteAuthorCnt>0?wx.url("/cgi-bin/safecenterstatus?action=inviteauthor"):"",q="",U=[],z=[],F=[],W="",V=t.articleList&&t.articleList.getCurrentArticle().data("article").flush().getData(),H=V&&V.content?V.content:"";
W=a(H,V),C.get({
url:"/cgi-bin/appmsgcopyright?action=get_recently_add"
},function(e){
e.base_resp&&0==e.base_resp.ret&&e.white_list&&(F=e.white_list,F=c({
list:F
}));
}),M.find(".js_whitelist .js_whitelist_item").each(function(e,t){
var i=$(t);
U.push({
nickname:i.data("nickname"),
title:i.attr("title"),
openid:i.data("openid"),
wx_name:i.data("wx_name"),
username:i.data("username"),
avatar:i.data("avatar"),
can_modify:1*i.data("can_modify"),
can_hide_source:1*i.data("can_hide_source"),
can_reward:1*i.data("can_reward")
});
});
var J=JSON.parse(localStorage.getItem("reprintOptions")),K="none"!==$("#js_original .js_original_type")[0].style.display;
null===J&&(J={
canReprint:!0,
canModify:!1
},localStorage.setItem("reprintOptions",JSON.stringify(J)));
var X=!1,G=$("#tpl_original").popup({
title:"声明原创",
width:960,
className:"simple align_edge original_dialog",
data:{
author:g||"",
frm:M.find(".js_reprint_frm").val()||1,
can_use_appmsg_source_url:Y.can_use_appmsg_source_url,
biz_can_use_reward:1*Y.can_use_reward,
canReprint:K?J.canReprint:"开启"===M.find(".js_can_reprint").text(),
canModify:K?J.canModify:"开启"===M.find(".js_can_modify").text(),
canUseOriginalReprint:Y.can_use_original_reprint,
multiMediaText:W,
whitelist:U
},
buttons:[{
text:"下一步",
type:"primary",
click:function(){
Q.isRewardSwitched=!1,e.find(".js_step_panel").hide().eq(1).show();
var i=new f({
container:"#js_original_article_type",
label:"请选择",
data:t.rencentArticleType,
show:function(e){
j({
target:e.find(".jsDropdownList > div")[0],
container:nt,
offset:10
});
},
callback:function(t){
t&&e.find(".js_article_type_error").hide();
}
});
i.selected(M.find(".js_classify").text()),U.length&&s(),e.find(".js_btn_p").eq(0).hide(),
e.find(".js_btn_p").eq(1).show(),e.find(".js_btn_p").eq(2).show(),ot.parent()[$("#js_article_whitelist_added").children().length?"show":"hide"](),
dt.setStep(2);
}
},{
text:"上一步",
click:function(){
e.find(".js_step_panel").hide().eq(0).show(),e.find(".js_btn_p").eq(0).show(),e.find(".js_btn_p").eq(1).hide(),
e.find(".js_btn_p").eq(2).hide(),ot.parent().hide(),dt.setStep(1);
}
},{
text:"确定",
type:"primary",
click:function(){
if(t._checkOriginal(e)){
$(".js_original_type").hide().eq(1).show(),$(".js_original_content").show(),$.each(U,function(e,t){
t.title=y(t);
}),$("#js_original").find(".js_whitelist").html(template.render("tpl_whitelist",{
list:U
})),U&&U.length?$("#js_original").find(".js_original_item").show():$("#js_original").find(".js_original_item").hide();
var i=e.data("author_info");
x.prop("checked")?$("#js_original").find(".js_reward_tips").text("已开启"):($("#js_original").find(".js_reward_tips").text("未开启"),
i.writerid="",i.author_username="",i.author_status=1,i.can_open_reward=0,i.can_reward=0,
i.reward_reply_id=""),u.setAuthorInfo({
copyright_type:1,
writerid:i.writerid||"",
author_username:i.author_username||"",
author:i.author,
author_status:1*i.author_status,
can_open_reward:1*i.can_open_reward,
can_reward:1*i.can_open_reward&&x.prop("checked")?1:0,
reward_reply_id:i.reward_reply_id||""
}),D.set(Q.originalProtoKey,"1"),Q.isRewardSwitched=!1,this.remove();
}
}
}],
onHide:function(){
this.remove();
}
});
e=G.popup("get");
var Z=G.popup("mask"),et=e.find(".js_add_whitelist_btn"),tt=e.find(".js_search_wrap"),it=$("#js_article_whitelist_setting_row"),at=$("#js_article_whitelist_search"),rt=$("#js_article_whitelist_search_result"),nt=document.getElementById("js_original_edit_box"),ot=e.find(".js_agree");
e.find(".js_btn_p").eq(1).hide(),e.find(".js_btn_p").eq(2).hide(),b=e.find(".js_reward_tips"),
x=e.find("input.js_reward_switch"),T=e.find(".js_authority_label"),L=e.find(".js_customerauthor_label"),
I=e.find(".js_authority_container"),S=e.find(".js_search_del_btn"),A=e.find(".js_search_btn"),
E=I.find("input"),O=e.find(".js_customerauthor_container"),R=O.find("input"),P=e.find(".js_authority_tips"),
N=e.find(".js_reward_reply_box");
var st=function(i,a){
if(i.author=$.trim(i.author||""),e.data("author_info",i),a!==!0){
var n={
$authorityLabel:T,
$customerauthorLabel:L,
$authorityContainer:I,
$customerauthorContainer:O,
$authorityTips:P,
$tipsDom:b,
$inputDom:x,
authorTotalCount:r,
author:i.author,
writerid:i.writerid,
author_username:i.author_username,
can_open_reward:i.can_open_reward,
can_reward:i.can_reward,
reward_reply_id:i.reward_reply_id,
inviteAuthorLink:B,
multiMediaText:W,
$reprintSwitchDom:$("#js_enable_reprint"),
$reprintTipDom:e.find(".js_reprint_tip"),
reprintOptions:J,
updateReprint:i.updateReprint,
$rewardReplyContainer:N,
$rewardTips2020:e.find(".js_reward_tips_2020")
};
t.renderRewardSwtich(n);
}
};
st({
author:g,
writerid:p.writerid,
author_username:p.author_username,
can_open_reward:p.can_open_reward,
author_status:p.author_status,
can_reward:p.copyright_type?p.can_reward:1,
reward_reply_id:p.reward_reply_id,
updateReprint:!0
}),t.ueditor.addListener("changeAuthorInfo",function(e,t,i){
st(t,i);
});
var dt=new m({
container:e.find(".js_step"),
selected:1,
names:["1 须知","2 原创声明信息"]
});
e.find(".js_btn_p").eq(0).disable(),e.find("#js_copyright_agree").checkbox({
onChanged:function(){
e.find("#js_copyright_agree").prop("checked")?e.find(".js_btn_p").enable():e.find(".js_btn_p").disable();
}
}),e.find(".js_reprint_frm").checkbox({
multi:!1
}),d.initAuthorSearchList({
$inputContainer:E,
$listContainer:e.find(".js_author_list"),
$highline:I,
highlineClass:"author_active",
inviteAuthorLink:B,
stateChange:function(t){
x.prop("checked")&&(E.val()?S.show():S.hide(),t?(st({
author:t.nickname,
writerid:t.writerid,
author_username:t.username,
can_open_reward:1*t.can_reward,
author_status:1*t.author_status,
can_reward:1*t.can_reward?1:0
}),e.find(".js_authority_tips").show(),_.setHistory({
author:[{
writerid:t.writerid
}]
})):(st({
author:"",
writerid:"",
author_username:"",
can_open_reward:0,
author_status:1,
can_reward:0,
reward_reply_id:""
},!0),e.find(".js_reward_reply_box").hide(),e.find(".js_authority_tips").hide()),
e.find(".js_author_error").hide());
}
}),x.on("change",function(){
var i,a,r=$(this).prop("checked");
r?(i=R.val(),a=!0,Q.isRewardSwitched=!0,e.find(".js_reward_tips_2020").show()):(i=E.val(),
a=!1,Q.isRewardSwitched=!1,e.find(".js_reward_tips_2020").hide()),t.updateReprintSwitchByReward({
multiMediaText:W,
rewardChecked:r,
$reprintSwitchDom:$("#js_enable_reprint"),
$reprintTipDom:e.find(".js_reprint_tip"),
reprintOptions:J
}),t.updateReplyByReward({
$rewardReplyContainer:N,
rewardChecked:r,
author:i,
reward_reply_id:p.reward_reply_id||"",
$dom:e
}),t.showOriginInputDom({
$authorityContainer:I,
$customerauthorContainer:O,
$authorityTips:P,
showAuthority:a,
$authorityLabel:T,
$customerauthorLabel:L,
author:i,
trigger:!0
});
var n={
author:i,
writerid:"",
author_username:"",
can_open_reward:0,
can_reward:0,
author_status:1,
updateReprint:!0
};
st(n,!0),e.find(".js_author_error").hide(),e.find(".js_authority_tips").hide(),s(!0);
});
var ct=D.get(Q.originalProtoKey,"1");
"1"==ct&&(e.find("#js_copyright_agree").trigger("click"),e.find(".js_btn").eq(0).trigger("click")),
new h(R,{
maxLength:R.attr("max-length"),
useGBKLength:!0,
GBKBased:!0
}),R.on("keyup",function(){
var t={
author:$(this).val()||"",
writerid:"",
author_username:"",
can_open_reward:0,
can_reward:0,
author_status:1
};
st(t,!0),e.find(".js_author_error").hide();
}),S.on("click",function(){
d.removeAuthorListDom(),E.val("").trigger("keyup"),S.hide();
}),A.on("click",function(){
E.trigger("keyup",{
keyCode:13
});
});
var lt,_t=function(){
var e=$(this);
if(e){
e.find(".js_reply_item_inner").addClass("hover");
var t=e.find(".js_reply_text");
t[0]&&t[0].scrollHeight>t[0].clientHeight&&(lt=new k({
dom:t,
content:t.html(),
place:"top",
hideIfBlur:!0,
onShow:function(){
this.resetPosition();
},
onHide:function(){}
}),lt.hide(),setTimeout(function(){
lt.show();
},500));
}
},ut=function(){
var e=$(this);
e&&(e.find(".js_reply_item_inner").removeClass("hover"),lt&&lt.remove());
},pt=N.find(".js_reply_list_container"),ht=N.find(".js_has_reply_tips"),mt=N.find(".js_choose_reply_tips");
pt.on("mouseenter",".js_reply_item",_t),pt.on("mouseleave",".js_reply_item",ut),
pt.on("click",".js_reply_item",function(){
var t=$(this),i=e.data("author_info");
if(t.hasClass("selected"))t.removeClass("selected"),t.find(".js_reply_item_inner").removeClass("hover"),
i.reward_reply_id="",st(i,!0),mt.show(),ht.hide();else{
$(".js_reply_item").removeClass("selected"),t.addClass("selected");
var a=t.data("replyid");
i.reward_reply_id=a,st(i,!0),mt.hide(),ht.show();
}
}),e.find(".js_article_whitelist").hover(function(){
new k({
dom:this,
content:"通过添加白名单，授权某些公众帐号可以转载文章，并允许修改或不显示转载来源，在文章群发后生效。如果文章开启了赞赏，转载文也会支持赞赏作者。",
isToggle:!0
});
});
var ft=$(i.target);
if(ft.hasClass("js_edit_whitelist")||ft.hasClass("js_edit_whitelist_btn")){
et.remove(),tt.show();
var gt=it[0].getBoundingClientRect().top-30,wt=nt.getBoundingClientRect().top;
nt.scrollTop+=gt-wt;
}
et.on("click",function(){
et.remove(),tt.show();
}),at.on("focus",function(){
""===$.trim(at.val())&&n("recent"),j({
target:rt[0],
container:nt,
offset:10
});
}),at.on("keyup",function(e){
var t=$.trim(e.target.value);
""===t?($("#js_article_whitelist_clear").hide(),n("recent")):($("#js_article_whitelist_clear").show(),
o(),13===e.keyCode&&w(t)),j({
target:rt[0],
container:nt,
offset:10
});
}),$("#js_article_whitelist_clear").click(function(){
at.val(""),$("#js_article_whitelist_clear").hide();
}),e.find(".js_search").click(function(){
var e=$.trim(at.val());
""!==e&&w(e);
}),rt.click(function(e){
for(var t=$(e.target);"js_article_whitelist_search_result"!==t.attr("id")&&!t.hasClass("js_add");)t=t.parent();
if(t.hasClass("js_add")){
var i={
nickname:t.data("nickname"),
openid:t.data("openid"),
wx_name:t.data("wx_name"),
username:t.data("username"),
avatar:t.data("avatar"),
can_modify:1,
can_reward:Number(x.prop("checked")),
can_hide_source:0
};
return i.title=y(i),U.push(i),("recent"===q?F:z).forEach(function(e){
l(e,t.data("openid"));
}),n(q),s(),!1;
}
}),$("#js_article_whitelist_added").click(function(e){
var t=$(e.target);
if(t.hasClass("js_remove"))U.splice(Number(t.data("index")),1),s(),F.forEach(function(e){
e.openid==t.data("openid")&&delete e.isSelect;
}),n("recent");else if(t.hasClass("js_edit_right")){
var i=t.siblings(".js_title_wrap"),a=i.find(".js_title"),r=new k({
dom:i,
container:i,
content:template.render("js_article_whitelist_edit_right_tpl",{
canReward:1==t.data("can_reward"),
canHideSource:1==t.data("can_hide_source")
}),
hideIfBlur:!0,
onShow:function(){
this.resetPosition();
},
onHide:function(){
this.remove();
}
}),o=r.getDom();
o.find(".js_can_hide_source").on("change",function(e){
var i=$(e.target),n=i.prop("checked");
n?i.parent().addClass("selected"):i.parent().removeClass("selected");
var o=Number(t.data("index")),s=U[o];
s.can_hide_source=Number(n),s.title=y(s),a.html(s.title),t.data("can_hide_source",s.can_hide_source),
r.remove();
}),j({
target:o[0],
container:nt
});
}
}),ot.on("change",function(t){
var i=$(t.target),a=i.prop("checked");
a?(i.parent().addClass("selected"),e.find(".js_btn_p:eq(2)").enable()):(i.parent().removeClass("selected"),
e.find(".js_btn_p:eq(2)").disable());
}),e.click(function(e){
$(e.target).parents(".js_search_wrap").length||o();
}),$(Z.find("iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).click(o),
e.find(".js_reward_popup_tips_2020").hover(function(){
new k({
dom:this,
content:"募捐，或类似资金筹集为目的的作品中使用涉及资金的相关功能的，包括但不限于公益筹款、众筹、乞讨，或者带有宗教信仰色彩的募集、募捐等。",
isToggle:!0
});
});
}
if(!n){
var l=0,u=t.articleList&&t.articleList.getCurrentArticleObject(),p=u.getAuthorInfo(),g=i.find("input.js_author").val();
n=!0,0==r?_.getAuthorList({
onError:function(){
l++,s();
},
onSuccess:function(e){
l++,r=e.totalCnt,s();
}
}):(l++,s()),1==p.copyright_type?(l++,s()):_.searchAuthorList({
nickname:g,
onError:function(){
l++,s();
},
onSuccess:function(e){
var t=e.writerlist[0]||null;
t&&1==t.can_reward&&0==t.author_status&&(p.writerid=t.writerid,p.author_username=t.username,
p.author=g,p.can_open_reward=t.can_reward,p.author_status=t.author_status,p.can_reward=1,
p.authority=1),l++,s();
}
});
}
}),$(".js_original_cancel").on("click",function(){
var e=$("#js_original");
e.find(".js_author").text(""),t.formItemsOpt.author.counter.setCount(0),i.find(".js_original_type").hide().eq(0).show(),
i.find(".js_original_content").hide(),i.find(".js_whitelist").empty();
var a=t.articleList&&t.articleList.getCurrentArticleObject();
a.setAuthorInfo({
copyright_type:0,
writerid:"",
author_username:"",
author:"",
author_status:0,
can_open_reward:0,
can_reward:0
});
var r=$("#js_album_area"),n=i.find(".js_album");
if(r&&r.length>0){
n.checkbox("checked",!1),r.find(".js_album_allow_click").removeClass("open");
var o={
id:"",
title:""
};
a.data.set("appmsg_album_info",o),a.data.set("appmsg_album",""),r.find(".album_setting").html("").hide();
}
}),$("#js_original").find(".js_whitelist_tips").length&&new k({
dom:$("#js_original").find(".js_whitelist_tips"),
content:"<p>通过添加白名单，授权某些公众帐号可以转载文章，并允许修改或不显示转载来源，在文章群发后生效。如果文章开启了赞赏，转载文也会支持赞赏作者。</p>",
isToggle:!0,
onShow:function(){
this.resetPosition();
}
}).hide(),$(".js_reward_ios_tips").length&&new k({
dom:$(".js_reward_ios_tips"),
content:"<p>赞赏功能在iOS上将改为转账，iOS用户可以向你转账任意金额或你设置的固定金额，固定金额只对此篇图文生效。仍保持T+7结算到原收款人的微信零钱包，仍可在赞赏功能里查看流水。</p>",
isToggle:!0,
onShow:function(){
this.resetPosition();
}
}).hide(),$("#js_original").on("click",".js_del_whitelist",function(){
$(this).parent().remove();
}),$("#js_original_detail").on("click",function(){
$(this).parent().toggleClass("open"),$(this).siblings("ul").toggle();
});
var o=!0,s=Y.orginal_apply_stat,c=1==Y.has_invited_original?"/acct/copyrightapply?action=apply":"/acct/selfapply?action=apply";
c=wx.url(c);
var l=$("#js_original_func_open").closest(".js_original_type"),u=function p(){
C.post({
url:"/cgi-bin/appmsg?action=get_original_stat"
},function(e){
if(e.base_resp&&0==e.base_resp.ret){
var t="";
switch(+e.orginal_apply_stat){
case 0:
t="原创声明：未开通";
break;

case 1:
t="原创声明：审核中",l.find(".opt").hide();
break;

case 2:
t="原创声明：申请失败",l.find(".opt").hide();
break;

case 3:
t="原创：未声明",l.find(".opt").html('<a href="javascript:;" onclick="return false;" class="btn btn_default js_original_apply">声明原创</a>').show();
}
l.find(".subtitle").text(t),s=e.orginal_apply_stat;
}
3!=e.orginal_apply_stat&&setTimeout(p,2e3);
});
};
$("#js_original_func_open").on("click",function(){
0==s&&window.open(c),o&&(o=!1,setTimeout(u,2e3));
});
},
_initDarkmodeNotice:function(){
var e=Y.biz_uin+"_dm_dialog",t=localStorage.getItem(e);
null==t&&p.fireEvent("showDarkmodeNoticeDialog",{},function(t){
t.cancel&&localStorage.setItem(e,1);
});
},
_initPay:function(){
var e=this,t=$("#js_pay_setting_area"),i=this.$editor;
t&&t.length>0&&!function(){
var t=i.find("#js_pay_setting_preview")[0];
i.find(".js_pay_setting_radio").checkbox({
onChanged:function(i){
var a=i.val();
if("1"===a&&"none"===t.style.display)e._showPayStatementDialog();else if("0"===a&&""===t.style.display){
var r=e.articleList&&e.articleList.getCurrentArticleObject(),n=r.data;
n.set("is_pay_subscribe",0),n.set("pay_fee",""),n.set("pay_preview_percent",""),
n.set("pay_desc",""),n.set("copyright_type",0),n.set("original_article_type",""),
n.set("allow_reprint",""),n.set("releasefirst",""),n.set("reprint_permit_type",""),
n.set("allow_reprint_modify",""),n.set("ori_white_list",""),r.hidePayEducation(),
r.renderPayRead();
}
}
}),$("#js_edit_pay_setting").on("click",function(){
e._showPayStatementDialog(!0);
});
var a=$("#js_pay_preview_popup_temp"),r=$("#js_pay_preview_popup"),n=$("#js_pay_preview_popup_mask");
a.on("mouseover",function(){
at&&(window.clearTimeout(at),at=null);
}).on("click",function(){
var t=e.articleList&&e.articleList.getCurrentArticleObject();
r.data("offset",1*a.data("offset")),t.hidePayEducation(),t.setPayPopup({
mode:"update"
}),t.setTempPayPopup({
mode:"hide"
});
}),r.on("mouseover",function(){
n.show();
}).on("mouseout",function(){
n.hide();
});
}();
},
_showPayStatementDialog:function(e){
var t=this,i=this.articleList&&this.articleList.getCurrentArticleObject(),a=i.data,r={
isShow:!0,
authorName:$("#author").val(),
readProportion:window.wx.cgiData.default_preview_percent,
priceOptionList:window.wx.cgiData.price_option_list
};
e&&(r.canReward=a.get("can_reward"),r.writer={
writerid:a.get("writerid"),
username:a.get("author_username"),
nickname:a.get("author"),
authorStatus:a.get("author_status"),
canReward:a.get("can_open_reward")
},r.payNumber=a.get("pay_fee"),r.readProportion=a.get("pay_preview_percent"),r.description=a.get("pay_desc"),
r.step=2),p.fireEvent("showPayStatementDialog",r,function(e){
if(e.cancel){
if(0===a.get("is_pay_subscribe")){
var r=t.$editor.find(".js_pay_setting_radio");
r.eq(0).checkbox("checked",!0),r.eq(1).checkbox("checked",!1);
}
}else{
a.set("copyright_type",1),a.set("author",e.authorName),a.set("is_pay_subscribe",1),
a.set("pay_fee",e.payNumber),a.set("pay_preview_percent",e.readProportion),a.set("pay_desc",e.description);
var n=e.writer;
a.set("writerid",n.writerid||""),a.set("author_username",n.username||""),a.set("author_status",1*n.authorStatus),
a.set("can_open_reward",1*n.canReward),a.set("can_reward",1*e.canReward),i.showPayEducation(),
i.renderPayRead(!0);
}
delete e.cancel,p.fireEvent("showPayStatementDialog",$.extend({
isShow:!1,
step:2
},e));
});
},
_initBan:function(){
var e=this.$editor,t=e.find(".js_url_area"),i=17,a=function(){
var e;
$.each(Y.func_ban_info,function(t,a){
a.func_id==i&&(e=a);
});
var a=x.getReason(e.reason_id),r='你的帐号<a href="'+(a.pc_url?a.pc_url:defaultReason.pc_url)+'">'+a.reason_description+"</a>，",n=new Date(1e3*e.unlock_time);
e.ban_time==e.unlock_time?r+="已被永久屏蔽阅读原文功能。":(r+="已被屏蔽阅读原文功能至",r+=n.getFullYear()+"/"+(n.getMonth()+1)+"/"+n.getDate(),
r+="，期间阅读原文将不可用。"),t.find(".js_url_checkbox").attr("disabled",!0).attr("checked",!1).parent().addClass("disabled"),
$(".js_url").attr("disabled",!0).parent().addClass("disabled"),$(".js_url_ban_wording").html(r);
};
x(Y.func_ban_info,"source-url")?Y.can_use_appmsg_source_url||t.hide():a();
},
_initAd:function(){
var e=this.$editor;
e.on("click",".js_del_ad",function(){
e.find(".js_ad_preview").html(""),e.find(".js_ad_preview").parent().hide(),$("#js_editor_insertad").removeClass("disabled");
});
},
_showPayDialog:function(e){
var t=this,i=t.$editor,a=e.popup("get");
a.find(".js_fee").val($(".js_fee",i).text()),a.find(".js_step_panel").hide().eq(0).show(),
a.find(".js_btn_p").hide(),a.find(".js_btn_p").eq(0).show(),a.find(".js_btn_p").eq(1).show(),
e._step.setStep(1),e.popup("show");
},
_createPayDialog:function(){
var e=this,t=e.$editor,i=$("#tpl_pay").popup({
title:"付费阅读设置",
width:960,
className:"simple align_edge pay_dialog",
autoShow:!1,
data:{},
buttons:[{
text:"取消",
click:function(){
$(".js_pay_setting",t).is(":visible")||$("#js_pay",t).checkbox("checked",!1),this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
var i=e.freeUEditor.val(),n=a.find(".js_fee").val();
return""==i?void v.err("免费区域不能为空"):w.rangelength(i,[20,200])?!n||!/^\d*(\.\d+)?$/.test(n)||n.toString().match(/\.\d{3,}/)||.01>n?void v.err("请输入正确的金额"):.01>n?void v.err("金额必须大于零"):n>200?void v.err("金额不能超过200元"):(a.find(".js_content").html(i),
a.find(".js_content_count").text(e.ueditor.getUeditor().getContent().text().length),
a.find(".js_fee_preview").text(parseFloat(n).toFixed(2)),a.find(".js_nickname").text(wx.data.nick_name),
a.find(".js_title").text($.trim($(".js_title",t).val())),a.find(".js_author").text($.trim($(".js_author",t).val())),
a.find(".js_date").text(j().format("YYYY-MM-DD")),a.find(".js_step_panel").hide().eq(1).show(),
a.find(".js_btn_p").hide(),a.find(".js_btn_p").eq(2).show(),a.find(".js_btn_p").eq(3).show(),
a.find(".js_preview").scrollTop(1e8),r.setStep(2),void this.resetPosition()):void v.err("正文字数要多于20字且不能超过200字");
}
},{
text:"上一步",
click:function(){
a.find(".js_step_panel").hide().eq(0).show(),a.find(".js_btn_p").hide(),a.find(".js_btn_p").eq(0).show(),
a.find(".js_btn_p").eq(1).show(),r.setStep(1),this.resetPosition();
}
},{
text:"确定",
type:"primary",
click:function(){
$(".js_pay_setting",t).show().find(".js_fee").text((+a.find(".js_fee").val()).toFixed(2)),
$(".js_pay_tips",t).hide(),this.hide();
}
}],
onClose:function(){
$(".js_pay_setting",t).is(":visible")||$("#js_pay",t).checkbox("checked",!1),i.popup("hide");
},
onShow:function(){
this.resetPosition();
}
}),a=i.popup("get");
a.find(".js_btn_p").eq(2).hide(),a.find(".js_btn_p").eq(3).hide();
var r=new m({
container:a.find(".js_step"),
selected:1,
names:["设置","预览并确认"]
});
return e.freeUEditor=a.find(".js_editor"),new h(e.freeUEditor,{
minLength:20,
maxLength:200
}),a.find(".js_fee").on("input propertychange",function(){
var e=$(this).val();
e&&/^\d*(\.\d+)?$/.test(e)&&!e.toString().match(/\.\d{3,}/)?.01>e?$(this).parent().addClass("error"):e>200?$(this).parent().addClass("error"):$(this).parent().removeClass("error"):$(this).parent().addClass("error");
}),i.popup("resetPosition"),i._step=r,i;
},
_checkOriginal:function(e){
var t=!0,i="",a="checked"==e.find(".js_forIEbug_frm").attr("checked")?1:e.find(".js_reprint_frm:checked").val(),r=e.data("author_info"),n=r.author,o=r.writerid,s=!!e.find("#js_enable_reprint").prop("checked"),d=!1,c=e.find("#js_original_article_type .dropdown_switch label").text();
e.find("input.js_reward_switch").prop("checked")?n&&o?e.find(".js_author_error").hide():(e.find(".js_author_error").text("请选择赞赏账户").show(),
i=i||"请选择赞赏账户",t=!1):n.len()>16||n.len()<=0?(e.find(".js_author_error").text("作者不能为空且不超过8个字").show(),
i=i||"作者不能为空且不超过8个字",t=!1):e.find(".js_author_error").hide();
for(var l=!1,_=0;_<V.length;_++)c==V[_].name&&(l=!0);
if(0==l?(e.find(".js_article_type_error").show(),t=!1,i=i||"请选择文章类别"):e.find(".js_article_type_error").hide(),
t){
var u=$("#js_original");
u.find(".js_author").text(n),u.find(".js_reprint_frm").val(a),$("#original_type_msg").hide(),
u.find(".js_classify").text(c),u.find(".js_can_reprint").text(s?"开启":"关闭"),Y.can_use_original_reprint&&localStorage.setItem("reprintOptions",JSON.stringify({
canReprint:s,
canModify:d
})),this._updateWhitelist(a);
}else v.err(i);
return t;
},
_updateWhitelist:function(e){
$("#js_original").find(".js_whitelist").children().each(function(){
var t=1*$(this).attr("data-can_modify"),i=1*$(this).attr("data-can_reward"),a=1*$(this).attr("data-can_hide_source");
1==e&&(t||i||a||$(this).remove());
});
},
_updateCurUrl:function(e){
if(e){
wx.cgiData.app_id=e,window.history&&history.replaceState?history.replaceState(history.state,document.title,wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(e))):1==Y.isNew&&(location.href=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(e)));
var t=new RegExp("^"+location.protocol+"//"+location.hostname+"(:8080)?"+location.pathname+"?.*action=(list_card|list_list)");
J.match(t)&&window.opener&&opener.location&&(opener.location=J);
}
},
_initRecentList:function(){
c.initList({
$inputContainer:$("#author"),
$listContainer:$("#js_author_area").find(".js_author_list")
});
},
_getSendData:function(){
var e=this;
C.get({
url:"/cgi-bin/masssendpage?f=json"
},function(t){
e.sendCgiData=t;
});
},
_bindEvent:function(){
function t(e,i,a){
C.post({
url:"/cgi-bin/appmsg?action=get_appmsg_update_history&appmsgid="+wx.cgiData.app_id+"&offset="+e+"&limit="+i
},function(e){
if(0==e.base_resp.ret){
var i=e.list;
i.each(function(e){
e.time=j.unix(e.update_time).format("YYYY-MM-DD HH:mm:ss"),e.action=0==e.operate_type?"保存":"群发",
""==e.operator_name&&(e.operator_name="未知"),wx.cgiData.bizmediaid&&wx.cgiData.bizmediaid==e.bizmediaid&&(e.current=!0),
e.url=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=get_history_appmsg&bizmediaid="+e.bizmediaid+"&type="+wx.cgiData.type+"&appmsgid="+wx.cgiData.app_id);
}),$("#history_list").html(template.render("history_tpl",{
list:i
})),a&&new K({
container:"#history_page",
perPage:4,
first:!1,
last:!1,
isSimple:!0,
totalItemsNum:e.total,
callback:function(e){
t(4*(e.currentPage-1),4);
}
}),$("#history_bt").addClass("appmsg_history_active"),$("#history_pop").show();
}
});
}
function i(e){
var t=e.target;
t&&($.contains($("#history_bt")[0],t)||$.contains($("#history_pop")[0],t))?($("#history_pop").show(),
$("#history_bt").addClass("appmsg_history_active")):($("#history_pop").hide(),$("#history_bt").removeClass("appmsg_history_active"));
}
function a(e){
var t='<div class="edui-listitem edui-default"><div class="js_toolbar_more_item edui-listitem-body edui-default"></div></div>',i=$.parseHTML(t)[0],a=$(i).find(".js_toolbar_more_item");
return a.append(e),i;
}
function s(e){
var t=!0;
return $.each(e.children(),function(e,i){
"none"!==$(i).css("display")&&(t=!1);
}),!et.children().length||t;
}
function d(e){
var t=G.children().eq(-2);
return t.length?(lt=t.data("index"),_t=ot[lt],Z.is(":hidden")&&!t.is(":hidden")?Z.show():_t&&(e-=_t),
t.addClass("tpl_dropdown_menu_item"),t.removeClass("tpl_item"),et.prepend(t),e):!1;
}
function c(e){
var t=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];
if(t){
for(;et.children().length;){
var i=et.children().eq(0);
if(!i.length)break;
i.removeClass("tpl_dropdown_menu_item"),i.addClass("tpl_item"),i.insertBefore(Z),
lt+=1,_t=ot[lt];
}
return Z.hide(),!1;
}
var i=et.children().eq(0);
return i.length?(i.removeClass("tpl_dropdown_menu_item"),i.addClass("tpl_item"),
i.insertBefore(Z),s(et)?(Z.hide(),0):(_t&&(e-=_t),lt+=1,_t=ot[lt],e)):(Z.hide(),
0);
}
function l(e){
var t=it[0]&&it.prev();
return t.length?(t.hasClass("edui-separator")?(e-=t.outerWidth(),t.css("cssText","display:none!important")):e-=rt,
st.prepend(a(t)),e):!1;
}
function _(e){
var t=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],i=void 0,a=void 0;
if(t){
for(;st.children().length&&(i=st.children().eq(0),a=i.find(".js_toolbar_more_item").children().eq(0),
a.length);)a.hasClass("edui-separator")?(e-=a.outerWidth(),a.css("cssText","display:inline_block!important")):e-=rt,
a.length&&a.insertBefore(it),i.remove();
return it.length&&it.css("cssText","display:none!important"),!1;
}
return i=st.children().eq(0),a=i.find(".js_toolbar_more_item").children().eq(0),
a.length?(a.hasClass("edui-separator")?(e-=a.outerWidth(),a.css("cssText","display:inline_block!important")):e-=rt,
a.insertBefore(it),i.remove(),st.children().length?e:(it.length&&it.css("cssText","display:none!important"),
!1)):(it.length&&it.css("cssText","display:none!important"),!1);
}
function u(e,t){
var i=null,a=f.articleList&&f.articleList.getCurrentArticle();
if(a){
var r=a.data("article");
r&&r.getArticleType&&(i=r.getArticleType());
}
if(0===i&&X&&J){
rt=$("#js_toolbar_0").find(".edui-box").outerWidth();
var n=Math.round(X.offset().left-J.offset().left),o=Math.round(document.body.clientWidth);
if(nt=Math.round($("#edui1_toolbarboxouter").outerWidth()),t)c(0,t),dt=n,_(0,t),
ct=nt;else{
if(dt>n){
for(var s=dt-n;s>0&&(s=d(s)););
dt=n+s;
}else if(n-dt>=_t){
for(var s=n-dt,u=!1;s>=_t;)if(s=c(s),!s){
u=!0;
break;
}
dt=u?n:n-s;
}else n===at&&c(0,!0);
if(ut&&!function(){
ut=!1;
var e=0,t=$("#js_toolbar_0").children();
$.each(t,function(i,a){
i<t.length-1&&(e+=$(a).outerWidth(!0));
}),nt=e,ct=e;
}(),nt>o){
it.is(":hidden")&&it.css("cssText","display:inline_block!important");
for(var s=nt-o;s>0&&(s=l(s)););
ct=nt+s;
}else if(o-ct>=rt){
for(var s=o-ct;s>=rt&&(s=_(s)););
ct=Math.min(o-s,nt);
}
}
}
}
function p(e){
e.matches?(u(),$(window).on("resize",u)):(u(null,!0),Z.hide(),dt=at,ct=nt,$(window).off("resize",u)),
f.ueditor.fireEvent("hide_action_btn");
}
function h(e){
var t=Z.find(".js_more_plugins_menu");
Z.is($(e.target))||t.is($(e.target))||t.has($(e.target)).length||(t.length&&t.hide(),
$(document).off("click",h),f.ueditor.removeListener("click",h));
}
function m(){
var e=document.getElementById("js_btn_account_opr"),t=document.getElementById("js_div_account_opr");
if(e&&t){
window._hideHeaderMenu=!0;
var i=setTimeout(function(){
clearTimeout(i),t.style.display="none";
},100);
}
}
var f=this,w=function(){
if(Q.$articlePanel){
var e=$("#js_add_appmsg")[0].getBoundingClientRect(),t=$(window).height(),i=Q.$articlePanel.height(),a=10,r=e.bottom-a;
r+i>t?Q.$articlePanel.css({
top:e.top-i+$(window).scrollTop()-25,
left:e.left+e.width/2-65
}).find(".js_article_panel_inner").addClass("preview_media_add_panel_up"):Q.$articlePanel.css({
top:r+$(window).scrollTop()+20,
left:e.left+e.width/2-65
}).find(".js_article_panel_inner").removeClass("preview_media_add_panel_up");
}
},T=function(){
var e=$(".js_action_container"),t=e.offset();
Q.$articlePanel&&Q.$articlePanel.css({
top:t.top,
left:t.left+e.width()-10
});
},L=function(){
Q.hideArticlePanelId&&(clearTimeout(Q.hideArticlePanelId),Q.hideArticlePanelId=null),
Q.hideArticlePanelId=setTimeout(function(){
Q.$articlePanel&&Q.$articlePanel.hide(),Q.hideArticlePanelId=null;
},100);
},S=function(){
Q.isReplacing||f.ueditor.fireEvent("is_article_removing")||"add"===Q.actionType&&L();
},A=function(e){
return function(){
if(Q.canShowArticlePanel){
if("add"===e)f.ueditor.fireEvent("hide_action_btn"),f.ueditor.fireEvent("hide_replace_popover"),
f.ueditor.fireEvent("hide_del_popover");else if("replace"===e&&$(".js_replace_pop")[0]&&!$(".js_replace_pop").is(":hidden"))return;
Q.hideArticlePanelId&&(clearTimeout(Q.hideArticlePanelId),Q.hideArticlePanelId=null),
Q.$articlePanel||(Q.$articlePanel=$(template.render("tpl_article_panel",{})).appendTo($("body")),
Q.$articlePanel.bind({
mouseenter:function(){
Q.hideArticlePanelId&&(clearTimeout(Q.hideArticlePanelId),Q.hideArticlePanelId=null);
},
mouseleave:S
}),f.ueditor&&f.ueditor.fireEvent("can_change_article",Q.$articlePanel)),Q.actionType=e,
"replace"===e?(Q.$articlePanel.find(".js_article_panel_inner").addClass("delete_arrow"),
f.ueditor.fireEvent("reportAddNum",121548,11,1)):Q.$articlePanel.find(".js_article_panel_inner").removeClass("delete_arrow"),
"replace"===e?T():w(),Q.$articlePanel.show();
}
};
},D=function(){
if(Q.$articlePanel){
var e=$("#js_add_appmsg")[0].getBoundingClientRect(),t=$("#js_side_article_list")[0].getBoundingClientRect();
t.top+t.height<e.top?L():Q.$articlePanel.is(":hidden")||w();
}
},I=function(){
if(Q.$articlePanel){
var e=$(".js_replace_appmsg")[0].getBoundingClientRect(),t=$("#js_side_article_list")[0].getBoundingClientRect();
t.top+t.height<e.top?L():Q.$articlePanel.is(":hidden")||T();
}
};
$("#js_add_appmsg").click(A("add")).hover(A("add"),S),$("#js_mp_sidemenu").on("scroll",function(){
f.ueditor.fireEvent("article_item_list_scroll");
}),f.ueditor.addListener("update_action_panel_pos",function(){
"add"===Q.actionType&&D(),"replace"===Q.actionType&&I();
}),f.ueditor.addListener("get_article_action_type",function(){
return Q.actionType||"add";
});
var E={
0:"写新图文",
100:"选择其他图文",
5:"替换为视频",
7:"替换为音频",
8:"替换为图片",
9:"替换为转载"
};
f.ueditor.addListener("reset_replace_popover",function(){
$(".js_article_panel")&&$(".js_article_panel")[0]&&$(".js_replace_appmsg")&&$(".js_replace_appmsg")[0]&&Q._replacePopover&&(Q._replacePopover.resetPosition($(".js_replace_appmsg")),
Q._replacePopover.$dom=$(".js_article_panel"));
}),f.ueditor.addListener("hide_replace_popover",function(){
Q._replacePopover&&Q._replacePopover.hide();
}),f.ueditor.addListener("before_replace_article",function(e,t){
Q._replacePopover=new k({
dom:$(".js_replace_appmsg"),
content:$("#js_article_replace_popover_tpl").html(),
addCls:"js_replace_pop",
margin:"left_top",
width:300,
hideIfBlur:!0,
buttons:[{
text:"确定",
type:"primary",
click:function(){
f.ueditor.fireEvent("reportAddNum",121548,23,1),f.ueditor.fireEvent("replace_article",Q.articleReplaceType),
$(".js_action_container").hide(),this.hide();
}
},{
text:"取消",
type:"default",
click:function(){
f.ueditor.fireEvent("reportAddNum",121548,22,1),$(".js_action_container").hide(),
this.hide();
}
}],
onShow:function(){
var e=$(".js_replace_appmsg"),t=this.$pop.find("#js_replace_type").eq(0);
t.html(E[Q.articleReplaceType]),this.resetPosition(e),this.$dom=$(".js_article_panel"),
Q.isReplacing=!0;
},
onHide:function(){
Q.isReplacing=!1;
}
}),Q._replacePopover.hide(),Q.articleReplaceType=t,L(),f.ueditor.fireEvent("reportAddNum",121548,21,1),
Q._replacePopover.show();
}),$(".js_replace_appmsg").click(A("replace")).hover(A("replace")),$("#history_bt").click(function(){
$(this).hasClass("appmsg_history_active")?($(this).removeClass("appmsg_history_active"),
$("#history_pop").hide()):($("#history_pop").css({
top:$(this).offset().top-$(window).scrollTop()+$(this).height()+10
}),t(0,4,!0),f.ueditor.fireEvent("reportAddNum","122333","98","1"));
}),$("#history_list").on("click",".js_history_link",function(){
wx.cgiData.bizmediaid?window.location=$(this).data("url")+"&idx"+wx.cgiData.idx:window.open($(this).data("url")+"&idx"+wx.cgiData.idx),
f.ueditor.fireEvent("reportAddNum","122333","99","1");
}),$(document).on("click",i),f.ueditor.addListener("click",i),$("#read_only_container").find(".js_close").click(function(){
$("#read_only_container").hide();
}),f.$editor.on("click",".js_msg_close",function(){
$(this).closest(".page_msg").hide();
}),f.$editor.find(".js_cover_preview").on("click","img",function(){
var e=$(this).attr("src");
e&&y.show({
imgdata:[{
imgsrc:e
}]
});
}),$("#bot_bar_left_container").on("click",".js_fold",function(){
var e=$(this).find("a").data("type");
"1"==e?f.ueditor.fireEvent("scrollIntoView",$("#article_setting_area")):"2"==e&&f.ueditor.fireEvent("scrollIntoView",$("#editor_pannel"),131);
});
var O=$("#reprint_article_main");
if(O.on("click",".js_replace_media",function(){
var e=f.articleList&&f.articleList.getCurrentArticleObject();
e&&"function"==typeof e.replaceMedia&&e.replaceMedia();
}),O.on("click",".js_preview_hd",function(){
var e=f.articleList&&f.articleList.getCurrentArticleObject();
e&&"function"==typeof e.previewVideoPlay&&e.previewVideoPlay();
}),new g({
container:f.$editor.find(".js_edit_tips"),
content:"",
parentClass:"",
position:{
left:-136
},
reposition:!0,
onshow:function(){
var e=f.articleList&&f.articleList.getCurrentArticleObject();
e&&"function"==typeof e.getEditTipsContent&&(this.changeContent(e.getEditTipsContent()),
this.show());
},
type:"hover"
}),$("#js_submit").on("click",function(){
var e=$(this);
1*f.appmsg_data.is_illegal==1||e.hasClass("btn_disabled")||($("#js_import_tips,#js_draft_tips").hide(),
$(".js_warn").hide(),$(".js_ad_error_tips").hide(),H.mark("appmsg","saveArticle","start"),
f.articleList&&f.articleList.save(e,function(t,i){
var a=localStorage.getItem("finalAdText");
a?localStorage.setItem("adTransitionText",a):localStorage.setItem("adTransitionText",B);
for(var r=0,n=0;n<i.count;n++)if(i["ad_id"+n]){
r=1;
break;
}
e.btn(!0),v.remove(),t.is_ad_optioal?$("#js_save_success_with_ad_op").show().delay(2e3).fadeOut(300):r?$("#js_save_success_with_ad").show().delay(2e3).fadeOut(300):$("#js_save_success").show().delay(2e3).fadeOut(300),
f._updateCurUrl(t.appMsgId);
},!1,n),f.ueditor.fireEvent("reportAddNum","122333","100","1"));
}),$("#js_submit_close").on("click",function(){
var e=$(this);
f.articleList&&f.articleList.save(e,function(){
v.suc("保存成功"),window.close();
},!1,n);
}),$("#js_send").on("click",function(){
var e=$(this);
1*f.appmsg_data.is_illegal==1||e.hasClass("btn_disabled")||(f.ueditor.fireEvent("reportAddNum",[{
id:"122333",
key:"102",
len:1
},{
id:"65080",
key:"120",
len:1
}]),$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),f.articleList&&f.articleList.save(e,function(e,t){
window.onbeforeunload=null;
var i=localStorage.getItem("finalAdText");
if(i?localStorage.setItem("adTransitionText",i):localStorage.setItem("adTransitionText",B),
f.articleList.draft.isDropped=!0,f._updateCurUrl(e.appMsgId),1==wx.cgiData.can_use_new_material){
if(f.appmsg_data.app_id||(f.appmsg_data.app_id=e.appMsgId),f.appmsg_data.isMulti=t.count>1?1:0,
!f.sendCgiData)return;
o.send(f.appmsg_data,f.sendCgiData,r,wx.cgiData.client_time_diff);
}else location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&type=10&appmsgid=%s".sprintf(e.appMsgId));
},!1,n,void 0,!0));
}),$("#js_preview").on("click",function(){
var e=$(this);
if(1*f.appmsg_data.is_illegal!=1&&!e.hasClass("btn_disabled")){
if(f.ueditor.fireEvent("reportAddNum",65080,119,1),$("#js_import_tips,#js_draft_tips").hide(),
$(".js_warn").hide(),x(Y.func_ban_info,"preview")){
var e=$(this);
f.articleList&&f.articleList.preview(n,function(e){
f._updateCurUrl(e.appMsgId);
});
}
f.ueditor.fireEvent("reportAddNum","122333","101","1");
}
}),1==wx.cgiData.can_use_new_material){
var P=e("common/wx/media/previewDialog.js");
R.$on("preview",function(e){
new P({
sendData:e,
AppMsgId:e.appmsgid,
type:2,
uin:wx.data.uin,
token:wx.data.t,
nickname:wx.data.nick_name,
onCancel:function(){
R.$emit("previewClose");
},
onOK:function(){
R.$emit("previewClose");
}
});
});
}
f.$editor.on("click",".js_jumpToOrder",function(){
b.show({
type:"info",
msg:"是否保存文章并跳转至广告订单页面？",
buttons:[{
text:"确定",
click:function(){
$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),$(".js_ad_error_tips").hide();
var e=$("#js_submit"),t=this,i=$(".js_ad_msg").data("ad_id");
t.remove(),f.articleList&&f.articleList.save(e,function(e){
f._updateCurUrl(e.appMsgId),window.location.href=wx.url("/cgi-bin/frame?t=ad_system/common_simple_frame&t1=publisher/freetrade_item_detail&aid="+i);
},!1,n);
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
});
var N,M,q=($("body"),$(".edui-editor-toolbarbox")),U=$(".js_catch_tips"),z=$("#article_setting_area")[0],F=$("#bottom_main")[0],W=document.getElementById("js_author_area"),V=$(".js_editor_area")[0],J=$("#js_media_list_box"),X=$(".js_header_account"),G=$("#js_plugins_list"),Z=$("#editor_showmore"),et=Z.find(".js_more_plugins_menu"),tt=window.matchMedia("(max-width: 1169px)"),it=$(".edui-combox.js_toolbar_more"),at=768,rt=0,nt=Math.round($("#edui1_toolbarboxouter").outerWidth()),ot=[],st=$("<div></div>"),dt=at,ct=0,lt=-2,_t=null,ut=!0;
$.each(G.children(),function(e,t){
$(t).data("index",e);
var i=$(t).outerWidth();
i&&ot.push(i);
}),it.click(function(){
if(!st.hasClass("js_toolbar_more_list")){
$(".js_toolbar_more_list").append(st.children()),st=$(".js_toolbar_more_list");
var e=$(".edui-popup.js_toolbar_more");
e.length&&e.removeClass("edui-for-more");
}
}),tt.addListener(p),p(tt),f.ueditor.addListener("foldToolbar",function(){
u();
}),Z&&Z.click(function(){
var e=Z.find(".js_more_plugins_menu");
e.length&&e.show(),$(document).on("click",h),f.ueditor.addListener("click",h);
}),f.ueditor.addListener("click",m),$(window).scroll(function(){
M&&(clearTimeout(M),M=null),N&&(clearTimeout(N),N=null),$("#history_pop").css({
top:$("#history_bt").offset().top-$(window).scrollTop()+$("#history_bt").height()+10
});
var e,t=!0,i=f.articleList&&f.articleList.getCurrentArticle();
if(i){
var a=i.data("article");
a&&a.getArticleType&&(e=a.getArticleType());
}
t=!0;
var r=$(window).scrollTop(),n=V.getBoundingClientRect();
if(t&&r>$(".main_bd").offset().top){
var o=q[0].getBoundingClientRect();
U.css({
position:"fixed",
top:o.bottom,
width:n.width,
zIndex:999
});
}else U.css({
position:"",
top:"",
width:"",
zIndex:""
});
if(t&&(M=setTimeout(function(){
f.ueditor&&f.ueditor.fireEvent("toolbar_fixed_change");
},100)),!$("#edui1_iframeholder").is(":hidden")){
var s=z.getBoundingClientRect(),d=F.getBoundingClientRect();
if(d.top-s.top<=50)f._setFoldStatus(!0,{
type:1
});else if(f.ueditor){
var c=f.ueditor.getDom("toolbarbox").getBoundingClientRect(),l=W.getBoundingClientRect();
c.bottom>l.bottom?f._setFoldStatus(!0,{
type:2
}):f._setFoldStatus(!1);
}
}
}).trigger("scroll",!1),$("#js_mp_sidemenu").on("scroll",function(){
$("#history_pop").css({
top:$("#history_bt").offset().top-$(window).scrollTop()+$("#history_bt").height()+10
});
}).parent().on("scroll",function(){
$("#history_pop").css({
top:$("#history_bt").offset().top-$(window).scrollTop()+$("#history_bt").height()+10
});
});
$(window).width();
$(window).on("resize",function(){
1==Q.curRenderType&&f.ueditor.fireEvent("star_toolbar_float"),f._getFrameHeight(),
$(window).trigger("scroll",!1);
}),$("#js_insert_ad_area").on("click",".js_insert_ad_allow_click.open",function(e){
e.preventDefault(),n.fireEvent("openCpcSetting");
});
}
});
new rt({
app_id:Y.app_id,
editor_selector:"#js_appmsg_editor",
appmsg_selector:"#js_appmsg_preview",
appmsg_account_selector:"#js_appmsg_account",
appmsg_data:Y.appmsg_data
});
}
H.setBasicSpeeds("appmsg"),H.send();
});