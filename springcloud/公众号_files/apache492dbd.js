define("3rd/editor/tpl/crop_img.tpl.js",[],function(s,a,i){return'<div class=\'js_crop_img_container\'>  <div class="js_crop_img_wrap img_edit_area" style="position:absolute;">    <div class="js_crop_area img_edit_wrp" style="overflow:hidden;">      <div class="js_img_scale_cover" style="position:absolute;background-color: #fff;" draggable="false">      </div>      <img src="{url}">      <div class="js_img_scale edui-editor-imagescale img_edit_scale" draggable="false"        style="display:block;z-index:500;">        <span draggable="false" class="edui-editor-imagescale-hand0"></span>        <span draggable="false" class="edui-editor-imagescale-hand2"></span>        <span draggable="false" class="edui-editor-imagescale-hand5"></span>        <span draggable="false" class="edui-editor-imagescale-hand7"></span>      </div>    </div>  </div>  <div class="js_tool_bar img_edit_toolbar">    <div class="weui-slider-box">      <div class="weui-slider">        <div class="js_drag_bar weui-slider__inner">          <div style="width: 0%;" class="js_progress weui-slider__track"></div>          <div style="left: 0%;" class="js_dot weui-slider__handler__wrp">            <div class="weui-slider__handler"></div>          </div>        </div>      </div>    </div>    <a class="js_ok btn btn_primary" href="javascript:;">完成</a>    <a class="js_cancel btn btn_default" href="javascript:;">放弃裁剪</a>  </div></div>'})
define("common/wx/mpEditor/common/eventbus.js",[],function(){
"use strict";
function n(n,e,t){
if(window.web2_eventBus){
var i=window.web2_eventBus;
if("function"==typeof t){
var o=n+"_callback";
i.$on(o,function(){
window.web2_eventBus.$off(o),t.apply(this,arguments);
});
}
i.$emit(n,e);
}
}
return{
fireEvent:n
};
});"use strict"
function _asyncToGenerator(e){return function(){var s=e.apply(this,arguments)
return new Promise(function(o,a){return function t(e,i){try{var n=s[e](i),r=n.value}catch(e){return void a(e)}if(!n.done)return Promise.resolve(r).then(function(e){t("next",e)},function(e){t("throw",e)})
o(r)}("next")})}}define("3rd/editor/plugin/checkText.js",["pages/modules/utils/cgi.js","3rd/editor/common/utils.js","3rd/editor/tpl/errorTextCount.tpl.js","pages/modules/utils/str_util.js","3rd/editor/plugin/basePlugin.js","3rd/editor/plugin/checkTextUtils.js","3rd/editor/tpl/checktext_popup.tpl.js"],function(e,t,i){var n=e("pages/modules/utils/cgi.js"),r=e("3rd/editor/common/utils.js").utils,s=e("3rd/editor/tpl/errorTextCount.tpl.js"),x=e("pages/modules/utils/str_util.js"),o=e("3rd/editor/plugin/basePlugin.js"),O=e("3rd/editor/plugin/checkTextUtils.js"),a=e("3rd/editor/tpl/checktext_popup.tpl.js"),S={highlineIdPrefix:"highline",isDebug:0<=window.location.href.indexOf("&_debug=1"),supportWalker:!1,hasReportSplitSentence:!1,reportSplitSentence:!0,highlineClass:O.highlineClass,highlineclassJs:O.highlineclassJs,highlineTagName:O.highlineTagName}
function N(e){var t={}
for(var i in e)if(e.hasOwnProperty(i)){var n=encodeURIComponent(e[i].origin)
t[n]||(t[n]=[]),t[n].push(e[i])}return t}function V(e,t){var i=t.parentNode
i&&i.insertBefore(e,t.nextSibling)}function J(e){return!(!e||1!=e.nodeType||e.tagName.toLocaleLowerCase()!=O.splitTagName)}function P(e){return!!(e&&1==e.nodeType&&e.tagName.toLocaleLowerCase()==S.highlineTagName&&0<=e.className.indexOf(S.highlineclassJs))}function m(e,t){var i=e,n=t
e.length<t.length&&(i=t,n=e)
var r=i.length,o=n.length
return 0===r&&0===o?1:0===r&&0!==o?0:(r-function(e,t){e=e.toLowerCase(),t=t.toLowerCase()
for(var i=new Array,n=0;n<=e.length;n++){for(var r=n,o=0;o<=t.length;o++)if(0==n)i[o]=o
else if(0<o){var a=i[o-1]
e.charAt(n-1)!=t.charAt(o-1)&&(a=Math.min(Math.min(a,r),i[o])+1),i[o-1]=r,r=a}0<n&&(i[t.length]=r)}return i[t.length]}(i,n))/parseFloat(r)}return o.inherit({init:function(e){var t=0<arguments.length&&void 0!==e?e:{}
this.initG(t),this.getCacheCheckTextInfo(t)},initG:function(e){var t=0<arguments.length&&void 0!==e?e:{}
this._g={app_id:t.app_id+"",checkTextInfo:{},cacheCheckTextInfo:[],curSeq:-1,composition:!1,compositionForKeyup:!1,isHighline:!1,supportChecktext:S.supportWalker,resplitSentenceUndoId:null,resetSplitId:null,incrementHighlineId:null,updateErrCountId:null,compositionEndId:null,keyupInit:!1,asynSplitSentenceWhenKeyupId:null,lastKeyupId:null,splitSentenceRangeArr:[],hasRemoveHighlineBeforeIncrement:!1,splitElementToClear:[],editorFocus:!0,editorMouseDown:!1,modifyRecordList:{}}},updateSeq:function(e){var t=0<arguments.length&&void 0!==e?e:{}
this._g.curSeq=+t.seq},updateAppid:function(e){var t=0<arguments.length&&void 0!==e?e:{}
this._g.app_id=t.app_id+""
for(var i=0;i<t.maxArticleNum;i++)!function(t,i,n){O.getCacheData(t,n).then(function(e){e&&(e.cacheValue&&O.setCacheData({content:e.cacheValue.content||"",checkTextInfo:e.cacheValue.checkTextInfo,appmsgId:i,seq:n}),O.removeCacheData(t,n))})}(t.oldAppid,this._g.app_id,i)},getType:function(){return 0},getName:function(){return"checktext"},beforeEditorDestory:function(){this.unbindEventInterface()},addListener:function(){this.ueditor=this.editor.getUeditor(),this.domUtils=this.editor.getDomUtils()
var i=this
this.ueditor.addListener("splitsentence_by_html",function(e,t){return i.splitSentenceByHtml(t)}),this.ueditor.addListener("ready",function(){r.isSupportWalker()&&O.isDbCacheSupported&&(S.supportWalker=!0,i._g.supportChecktext=!0,r.cssRule(i.getName(),O.splitTagName+","+O.tmpTagName+"{display:none;}",this.document),i.bindEvent())})},getCacheCheckTextInfo:function(e){var n=this,r=0<arguments.length&&void 0!==e?e:{}
return _asyncToGenerator(regeneratorRuntime.mark(function e(){var t,i
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(O.isDbCacheSupported){e.next=2
break}return e.abrupt("return")
case 2:for(t=[],i=0;i<r.maxArticleNum;i++)t.push(function(i){return _asyncToGenerator(regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=void 0,e.prev=1,e.next=4,O.getCacheData(r.app_id,i)
case 4:t=e.sent,e.next=10
break
case 7:e.prev=7,e.t0=e.catch(1),t=null
case 10:return+i==+n._g.curSeq&&t&&t.cacheValue&&t.cacheValue.checkTextInfo&&(n.mergeCacheCheckTextInfo(t),n.updateErrCount(),t=null),e.abrupt("return",t)
case 12:case"end":return e.stop()}},e,n,[[1,7]])}))()}(i))
return e.prev=4,e.next=7,Promise.all(t)
case 7:n._g.cacheCheckTextInfo=e.sent,e.next=13
break
case 10:e.prev=10,e.t0=e.catch(4),n._g.cacheCheckTextInfo=[]
case 13:return e.abrupt("return",n._g.cacheCheckTextInfo)
case 14:case"end":return e.stop()}},e,n,[[4,10]])}))()},mergeCacheCheckTextInfo:function(e){if(e&&e.cacheValue&&e.cacheValue.checkTextInfo){var t=N(this._g.checkTextInfo)
for(var i in e.cacheValue.checkTextInfo){var n=e.cacheValue.checkTextInfo[i]
if(3==+n.status||4==+n.status){var r=encodeURIComponent(n.origin)
if(t[r]&&0<t[r].length)for(var o=0,a=t[r].length;o<a;o++){var s=t[r][o]
3!=+s.status&&(s.status=n.status,s.position=n.position)}}}}},cancelCompositionTimeout:function(){this._g.compositionEndId&&(clearTimeout(this._g.compositionEndId),this._g.compositionEndId=null)},cancelLastKeyupTimeout:function(){this._g.lastKeyupId&&(clearTimeout(this._g.lastKeyupId),this._g.lastKeyupId=null)},bindEvent:function(){var s=this
this.ueditor.addListener("beforeSaveArticle",function(){s.completeAllModifyLink()}),$("#bot_bar_left_container").on("click",".js_show_text_err",function(){s.editor.fireEvent("highline_checktext")}),this.ueditor.addListener("focus",function(){s._g.editorFocus=!0}),this.ueditor.addListener("blur",function(){s._g.editorFocus=!1}),this.ueditor.addListener("mousedown",function(){s._g.editorMouseDown=!0}),this.ueditor.addListener("mouseup",function(){s._g.editorMouseDown=!1}),this.ueditor.addListener("highline_checktext",function(){0<$(this.body).find(S.highlineTagName+"."+S.highlineclassJs).length?(s.removeHighline(),this.fireEvent("reportAddNum","122333","105",1)):(s.highlineAll({scrollToFirst:!0}),this.fireEvent("reportAddNum","122333","104",1))}),this.ueditor.addListener("is_highline_checktext",function(e){return 0<$(this.body).find(S.highlineTagName+"."+S.highlineclassJs).length}),s.domUtils.on(s.ueditor.body,"compositionstart",function(){s.cancelCompositionTimeout(),s._g.composition=!0,!(s._g.compositionForKeyup=!0)===s._g.keyupInit&&(s._g.keyupInit=!0,s.bindKeyupEvent())}),s.domUtils.on(s.ueditor.body,"compositionend",function(){s.cancelCompositionTimeout(),s._g.compositionForKeyup=!1,s._g.compositionEndId=setTimeout(function(){s._g.composition=!1},300)})
var l=!1
this.ueditor.addListener("beforepaste",function(e,t,i){t.html=O.clearSplitTag(t.html),l=!(!t.html||!s.replaceFillChar(x.text(t.html)))}),this.ueditor.addListener("afterpaste",function(e,t,i){if(s._g.supportChecktext&&l&&i&&i[0]){var n=this.selection.getRange(),r=n.createBookmark(!0),o=+new Date
s.splitSentenceWhenKeyup({node:i[0],noRequest:!1,noSaveSceen:!1})
var a=new Date-o
this.fireEvent("reportAddNum",67292,99,1),this.fireEvent("reportAddNum",67292,100,a),n.moveToBookmark(r).select()}}),this.ueditor.addListener("afterscencerestore",function(e,t){s.splitSentenceWhenRestore()}),this.ueditor.addListener("aftersetcontent",function(e,t,i){if(t){s._g.cacheCheckTextInfo&&s.mergeCacheCheckTextInfo(s._g.cacheCheckTextInfo[s._g.curSeq])
var n=!1
!S.isDebug&&1<+s._g.app_id&&(n=!0),s.addQueue(s._g.checkTextInfo,n),s.updateErrCount({noSelect:!0})}}),this.editor.addListener("next_check_text",function(e){var t=s.getPopupTarget()
if(t){var i=s.getNextHighlineElement({node:t})
i&&1===i.length&&s.highlineEleScrollIntoView({node:i,select:!0})}}),this.editor.addListener("handle_common_popup",function(e,t){var i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{}
if("mouseup"===i.from||i.from===s.getName()){var n=s.getPopupTarget()
if(n){var r=s.getNextHighlineElement({node:n})
if(r&&1===r.length){var o={needBreak:0<t.data.length,hasNextCheckText:!0}
t.data.push({html:wx.T(a,o),renderData:o,cmd:s.getName(),node:n})}}}})},getNextHighlineElement:function(e){var t=this,i=0<arguments.length&&void 0!==e?e:{},n=this,r=i.node,o=i.$container||$(this.ueditor.body),a=void 0
if(!r||P(r)){var s=o.find(S.highlineTagName+"."+S.highlineclassJs)
if(s&&0<s.length){r||(a=s.eq(0))
var l=0,d=r,c=void 0
s.each(function(){if(this===d){if(!P(n.domUtils.findNextSibling(this,function(e){return!n.domUtils.isFillChar(e)},!1)))return c=l+1,!1
d=this.nextSibling}l++}),void 0!==c&&s.length>=c+1&&(a=s.eq(c))}}if(a&&a[0]){for(var h=a[0];(h=h&&this.domUtils.findNextSibling(h,function(e){return!t.domUtils.isFillChar(e)},!1))&&P(h);)a=h
a=$(a)}return a},getPopupTarget:function(){for(var t=this,e=this.ueditor.selection.getRange(),i=e.createBookmark(),n=i.start,r=null,o=n.parentNode;o&&"body"!==o.nodeName.toLowerCase();){if(P(o)){r=o
break}o=o.parentNode}return r||P(o=this.domUtils.findPreviousSibling(n,function(e){return!t.domUtils.isFillChar(e)&&!J(e)},!1))&&(r=o),r||P(o=this.domUtils.findNextSibling(n,function(e){return!t.domUtils.isFillChar(e)&&!J(e)},!1))&&(r=o),e.moveToBookmark(i).select(),r},bindKeyupEvent:function(){var r=this,o=","+["16","17","18","188","37","38","39","40"].join(",")+",",a=this.ueditor.fireEvent("get_paste_domid")
this.ueditor.addListener("keyup",function(e,t){if(!1===r._g.compositionForKeyup&&!0===r._g.composition&&(r.cancelCompositionTimeout(),r._g.compositionEndId=setTimeout(function(){r._g.composition=!1},100)),!(!r._g.supportChecktext||!0===r._g.compositionForKeyup||t.altKey||t.metaKey||t.ctrlKey||0<=o.indexOf(","+t.keyCode+","))){var i=this.selection.getRange()
if(i.collapsed&&!i.startContainer.ownerDocument.getElementById(a)){r.cancelLastKeyupTimeout()
var n=r.isSplitSentenceInput(i,t.keyCode)
0<n?(r._g.splitSentenceRangeArr.push({range:i,taskType:n}),r.asynSplitSentenceWhenKeyup()):r._g.lastKeyupId=setTimeout(function(){r._g.splitSentenceRangeArr.push({range:i,taskType:-1}),r.asynSplitSentenceWhenKeyup()},1e3)}}})},isSplitSentenceInput:function(e,t){if(t=+t,!1===this._g.compositionForKeyup&&!0===this._g.composition)return 1
if(13===t)return 2
if(46===t||8===t||32===t)return 1
var i=this.getEditingTextNode(e.startContainer,e.startOffset)
if(i&&i.nodeValue){var n=i.nodeValue.substr(-1,1)
if(0<=O.splitcharStr.indexOf(n))return 2
var r=void 0
if((r=P(i.parentNode)?i.parentNode.parentNode.textContent:i.parentNode.textContent)&&/[^\u0000-\u00FF]/.test(r))return 1}return 0},getEditingTextNode:function(e,t){if(3===e.nodeType)return e
if(1!==e.nodeType)return null
var i=Math.min(t-1,e.childNodes.length)
i=Math.max(0,i)
var n=e.childNodes[i]
return J(n)?n.previousSibling||n.nextSibling:n},keyupSplitReport:function(e){var t=e.costTime,i=e.executeInfo,n=this.editor
n.fireEvent("reportAddNum",67292,102,1),n.fireEvent("reportAddNum",67292,103,t)
for(var r=0,o=i.length;r<o;r++){var a=i[r]
0<=a.findNeighborSplitTime&&0<=a.getTextNodeTime&&0<=a.splitSentenceTime&&(n.fireEvent("reportAddNum",67292,105,1),n.fireEvent("reportAddNum",67292,106,a.findNeighborSplitTime),n.fireEvent("reportAddNum",67292,108,1),n.fireEvent("reportAddNum",67292,109,a.getTextNodeTime),n.fireEvent("reportAddNum",67292,111,1),n.fireEvent("reportAddNum",67292,112,a.splitSentenceTime))}if(150<t){var s=n.fireEvent("get_current_article")
if(!(s=s.data?s.data("article"):null)||!s.data)return
this._g.app_id,s.data.get("seq"),s.data.get("title")
this.editor.fireEvent("mplog",{level:"info",description:"mpEditor_checktext_keyup_splitSentence",data:_key+JSON.stringify(_data)})}},splitSentenceWhenRestore:function(){this._g.resetSplitId&&(clearTimeout(this._g.resetSplitId),this._g.resetSplitId=null)
var c=this
this._g.resetSplitId=setTimeout(function(){var e=c.ueditor.selection.getRange(),t=e.createBookmark(!0),i=c.ueditor.document.getElementsByTagName(O.splitTagName)
if(i&&0<i.length){for(var n={},r=[],o=[],a=0,s=i.length;a<s;a++){var l=i[a].id,d=c.replaceFillChar(c.getTextByEndSplit(i[a]))
c._g.checkTextInfo[l]&&c._g.checkTextInfo[l].origin===d?n[l]=c._g.checkTextInfo[l]:(r.push(l),o.push(d))}c._g.checkTextInfo=n,0<r.length&&c.createSentenceData({sentenceArr:o,idArr:r,oriTextKeyData:null}),c.splitRemainSentence({splitElement:i,noRequest:!1,noSaveSceen:!0,createBookmark:!1})}else c._g.checkTextInfo={},c.splitRemainSentence({splitElement:[],noRequest:!1,noSaveSceen:!0,createBookmark:!1})
c.updateErrCount({noSelect:!0}),e.moveToBookmark(t).select()},1e3)},splitRemainSentence:function(e){var t=0<arguments.length&&void 0!==e?e:{},i=t.splitElement,n=t.noRequest,r=t.noSaveSceen,o=this.ueditor.document
i=i||o.getElementsByTagName(O.splitTagName)
var a=void 0,s=this.ueditor.selection.getRange(),l="restore_splitSentence_tmp"
if(i&&0<i.length){t.createBookmark&&(a=s.createBookmark(!0))
var d=i[i.length-1],c=o.createElement("span")
c.id=l,d.parentNode.insertBefore(c,d.nextSibling),this.splitSentenceWhenKeyup({node:c,noRequest:n,noSaveSceen:r}),c.parentNode.removeChild(c)}else if(i&&0===i.length){t.createBookmark&&(a=s.createBookmark(!0))
var h=o.createElement("span")
h.id=l,o.body.insertBefore(h,o.body.firstChild),this.splitSentenceWhenKeyup({node:h,noRequest:n,noSaveSceen:r}),h.parentNode.removeChild(h)}a&&s.moveToBookmark(a).select()},asynSplitSentenceWhenKeyup:function(){var x=this
this._g.asynSplitSentenceWhenKeyupId&&(clearTimeout(this._g.asynSplitSentenceWhenKeyupId),this._g.asynSplitSentenceWhenKeyupId=null),this._g.asynSplitSentenceWhenKeyupId=setTimeout(function(){if(0!==x._g.splitSentenceRangeArr.length)if(!0!==x._g.composition){for(var e=[],t=0,i=x._g.splitSentenceRangeArr.length;t<i;t++){var n=x._g.splitSentenceRangeArr[t],r=n.range,o=n.taskType
if(x.domUtils.inDoc(r.startContainer,r.startContainer.ownerDocument)){var a=n.dom,s=!1
if(a||(s=!0,a=x.getEditingTextNode(r.startContainer,r.startOffset)),a&&x.domUtils.inDoc(a,a.ownerDocument)){var l=!1
if(s)for(var d=0,c=e.length;d<c;d++)if(e[d].dom===a){e[d].taskType=Math.max(o,e[d].taskType),l=!0
break}!1===l&&e.push({dom:a,range:r,taskType:o})}}}if(0!==(x._g.splitSentenceRangeArr=e).length){for(var h=x.ueditor.selection.getRange(),u=h.createBookmark(!0),g=void 0,p=0;p<3;p++){var f=x._g.splitSentenceRangeArr.shift()
if(!f)break
var m,v=f.range,T=x.removeBrowserBackColor({range:v})
!0===T&&(x._g.hasRemoveHighlineBeforeIncrement=T),!(m=x.splitSentenceWhenKeyup({node:x.getEditingTextNode(v.startContainer,v.startOffset),noRequest:!1,noSaveSceen:!1}))||-1!=+m.hasResplit&&2!=+m.hasResplit||(g=m)}(!g||-1!==g.hasResplit&&2!==g.hasResplit)&&0!==x._g.splitElementToClear.length||x.updateErrCount({noSelect:!0}),h.moveToBookmark(u).select(),0<x._g.splitSentenceRangeArr.length&&x.asynSplitSentenceWhenKeyup()}}else x.asynSplitSentenceWhenKeyup()},800)},removeBrowserBackColor:function(e){var s=0<arguments.length&&void 0!==e?e:{},l=!1,t=void 0,d=void 0
if(s.container)t=s.container
else if(s.range&&s.range.startContainer){var i=s.range,n=this.getEditingTextNode(i.startContainer,i.startOffset),r=this.findNeighborSplitElement(n),o=this.ueditor.document,a=void 0,c=void 0
r&&r.left&&r.left.id&&(a=o.getElementById(r.left.id))
var h=r&&r.right?r.right.id:""
h&&(c=o.getElementById(h)),a=a||n,c=c||n,t=this.domUtils.getCommonAncestor(a,c)}return t&&$(t).find("span").each(function(){var e=new RegExp("background-color:rgba\\(9,187,7,0\\.3[012](\\d)*\\);?","i"),t=(this.getAttribute("style")||"").replace(/\s/g,"")
if(e.test(t)){for(var i=t.split(";"),n=0,r=0,o=i.length;r<o&&(i[r]&&n++,!(1<n));r++);if(1===this.attributes.length&&1===n){for(!d&&s.range&&(d=s.range.createBookmark(!0)),l=!0;this.firstChild;)this.parentNode.insertBefore(this.firstChild,this)
this.parentNode.removeChild(this)}else{var a=t.replace(e,"")
this.setAttribute("style",a),this.style.cssText=a}}}),d&&s.range&&s.range.moveToBookmark(d),l},getHighlineDomsBySplitId:function(e,t){t=t||$(this.ueditor.body)
var i=S.highlineTagName+"."+S.highlineclassJs+'[data-splitid="'+e+'"]'
return t.find(i)},removeHighlineSingleDom:function(e,n){n=n||$(this.ueditor.body),e.each(function(){if(n[0].contains(this)){for(var e=this.ownerDocument.createDocumentFragment(),t=0,i=this.childNodes.length;t<i;t++)e.appendChild(this.childNodes[t].cloneNode(!0))
this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this)}})},removeHighline:function(e){var t=0<arguments.length&&void 0!==e?e:{},i=t.$dom||null,n=void 0,r=void 0
i||(i=$(this.ueditor.body),r=(n=this.ueditor.selection.getRange()).createBookmark(!0))
for(var o=S.highlineTagName+"."+S.highlineclassJs,a=void 0;(a=i.find(o))&&0<a.length;)this.removeHighlineSingleDom(a,i)
n&&this.updateErrBtnText(),n&&r&&(n.moveToBookmark(r),!0!==t.noSelect&&this._g.editorFocus&&n.select())},incrementHighline:function(e){var t=this,i=0<arguments.length&&void 0!==e?e:{}
if(this.cancelIncrementHighline(),!0===this._g.composition||this._g.editorMouseDown)this._g.incrementHighlineId=setTimeout(function(){t.incrementHighline(i)},500)
else{var n=0<$(this.ueditor.body).find(S.highlineTagName+"."+S.highlineclassJs).length,r=this.ueditor.selection.getRange(),o=r.createBookmark(!0);(!0===this._g.hasRemoveHighlineBeforeIncrement||n)&&(0<i.errCount||0<this.getErrCount())&&this.highline(),r.moveToBookmark(o),this._g.editorFocus&&r.select(),this._g.hasRemoveHighlineBeforeIncrement=!1}},highline:function(e){var t,i=0<arguments.length&&void 0!==e?e:{},n=void 0,r=void 0,o=void 0
r=i.dom?(t=i.dom,n=$(i.dom),o=t.ownerDocument,function(e){return n.find('[id="'+e+'"]')[0]}):(t=this.ueditor.body,o=t.ownerDocument,function(e){return o.getElementById(e)})
var a=!1,s=[],l=[]
for(var d in this._g.checkTextInfo){if("3"==(C=this._g.checkTextInfo[d]).status&&0<C.position.length){var c=r(C.id)
if(!c||!c.previousSibling){s.push(C.id)
continue}var h=this.getHighlineDomsBySplitId(C.id,n)
if(h&&0<h.length)continue
if(this.getTextByEndSplit(C.id,i.dom)!==C.origin){s.push(C.id)
continue}var u=this.findNeighborSplitElement(c.previousSibling,i.dom)
if(u.right!==c){s.push(C.id)
continue}for(var g=this.getTextNodeBySplitElement(u.left,c,t).textNodeArr,p=0,f=C.position.length;p<f;p++)for(var m=(L=C.position[p]).index,v=L.len,T=L.text,x=0,k=0,S=g.length;k<S&&!(v<=0);k++){var N=x+(B=this.replaceFillChar(g[k].nodeValue)).length
if(x<=m&&m<N)if(v<=N-m)l.push({id:C.id,textNode:g[k],errIndex:m-x,errLen:v,replaceText:T}),T="",v=m=0
else{var y=m-x,_=B.length-y,E=T.substr(0,_)
T=T.substr(_),m+=_,v-=_,l.push({id:C.id,textNode:g[k],errIndex:y,errLen:_,replaceText:E})}x=N}}}for(d=0;d<l.length;d++){var C=l[d],I=Math.random().toString(),A=[{id:C.id,errIndex:C.errIndex,errLen:C.errLen,replaceText:C.replaceText,uid:I,uidLen:I.length}]
if(d!=l.length-1)for(p=d+1;p<l.length;p++){if((L=l[p]).textNode===C.textNode){var b=Math.random().toString()
A.push({id:L.id,errIndex:L.errIndex,errLen:L.errLen,replaceText:L.replaceText,uid:b,uidLen:b.length}),l.splice(p,1),p--}}var R=0,B=this.replaceFillChar(C.textNode.nodeValue),w=[]
for(p=0,f=A.length;p<f;p++){var L=A[p],D=this.getHighlineTag(L.replaceText,L.id),H=L.errIndex+R,F=B.substr(H,L.errLen)
T=L.uid+F+L.uid
B=B.replace(new RegExp(F,"g"),function(e,t){return t===H?(R+=2*L.uidLen,T):e}),w.push({oldText:F,replaceText:T,startTag:D.startTag,endTag:D.endTag})}B=O.html(B,!0)
for(p=0,f=w.length;p<f;p++){var K=O.html(w[p].oldText,!0),M=O.html(w[p].replaceText,!0)
B=B.replace(M,w[p].startTag+K+w[p].endTag)}var U=C.textNode.nextSibling
J(U)||(U=null)
var W=o.createElement("div")
W.innerHTML=B
for(var q=o.createDocumentFragment();W.firstChild;){var j=W.firstChild
U&&j===W.lastChild&&P(j)&&j.appendChild(U),q.appendChild(j)}V(q,C.textNode),C.textNode.parentNode.removeChild(C.textNode),a=!0}for(d=0;d<s.length;d++)this.clearSplitElement({id:s[d],container:i.dom})
return a},highlineAll:function(e){var t,i,n=void 0
e.dom?i=e.dom:(i=this.ueditor.body,n=(t=this.ueditor.selection.getRange()).createBookmark(!0)),this.cancelIncrementHighline(),this.removeHighline({noSelect:!0,$dom:$(i)})
var r=this.highline({dom:e.dom})
if(t&&(this.updateErrCount({noSelect:!0}),r&&this.updateErrBtnText()),r&&e.scrollToFirst){var o=this.getNextHighlineElement({$container:$(i)})
t&&(n&&t.moveToBookmark(n),t.selectNodeContents(o[0]).collapse(!1).select()),this.highlineEleScrollIntoView({node:o,select:!1,offset:e.offset})}else t&&n&&t.moveToBookmark(n).select()},highlineEleScrollIntoView:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.node&&0!==t.node.length){if(!0===t.select)this.ueditor.selection.getRange().selectNodeContents(t.node[0]).collapse(!1).select()
var i=this,n=null
$("html,body").animate({scrollTop:t.node.offset().top+(t.offset||100)},function(){n&&(clearTimeout(n),n=null),n=setTimeout(function(){i.editor.fireEvent("trigger_showpopup",{from:i.getName()})},20)})}},getHighlineTag:function(e,t){var i=encodeURIComponent(e),n=void 0
return t&&(n=' data-splitid="'+t+'"'),{startTag:"<"+S.highlineTagName+(n||"")+' class="'+S.highlineClass+" "+S.highlineclassJs+'" data-text="'+i+'">',endTag:"</"+S.highlineTagName+">"}},hideErrCount:function(e){var t=0<arguments.length&&void 0!==e?e:{}
this.handleDom({show:!1,afterCheck:t.afterCheck})},updateErrBtnText:function(){var e=this.getDom()
return e.$showErrBtn?0<$(this.ueditor.body).find(S.highlineTagName+"."+S.highlineclassJs).length?(e.$showErrBtn.text("隐藏"),!1):(e.$showErrBtn.text("查看"),!0):null},cancelIncrementHighline:function(){this._g.incrementHighlineId&&(clearTimeout(this._g.incrementHighlineId),this._g.incrementHighlineId=null)},cancelUpdateErrCount:function(){this._g.updateErrCountId&&(clearTimeout(this._g.updateErrCountId),this._g.updateErrCountId=null)},getDom:function(){var e=$("#js_checktext"),t={}
return e&&1===e.length&&(t.$container=e,t.$errCount=e.find(".js_text_err_count"),t.$showErrBtn=e.find(".js_show_text_err")),t},handleDom:function(e){var t=0<arguments.length&&void 0!==e?e:{},i=this.getDom(),n=i.$container
if(t.show&&this._g.supportChecktext&&this.editor.fireEvent("is_use_editor"))if(n)i.$errCount&&i.$errCount.text(t.count),t.updateErrBtnText&&this.updateErrBtnText()
else{var r=$("#word_count_container"),o=template.compile(s)({count:t.count})
r&&0===r.length?$("#bot_bar_left_container").prepend(o):r.after(o)
var a=this.updateErrBtnText()
!0===t.afterCheck&&!0===a&&this.editor.fireEvent("reportAddNum","122333","103",1)}else!t.show&&n&&n.remove()},updateErrCount:function(e){var t=this,i=0<arguments.length&&void 0!==e?e:{}
if(this.cancelUpdateErrCount(),this._g.supportChecktext)if(!0===this._g.composition||this._g.editorMouseDown)this._g.updateErrCountId=setTimeout(function(){t.updateErrCount(i)},500)
else{var n=this.ueditor.selection.getRange(),r=n.createBookmark(!0),o=this.getErrCount()
if(o?(this.handleDom({show:!0,count:o,updateErrBtnText:!0,afterCheck:i.afterCheck}),this.cancelIncrementHighline(),this.incrementHighline({afterCheck:i.afterCheck,status:i.status,splitId:i.splitId,errCount:o})):this.hideErrCount({afterCheck:i.afterCheck}),!0===i.afterCheck&&0<this._g.splitElementToClear.length){for(var a=0,s=this._g.splitElementToClear.length;a<s;a++)this.clearSplitElement({id:this._g.splitElementToClear[a]})
this._g.splitElementToClear=[]}if(4===i.status){var l=this._g.checkTextInfo[i.splitId]
l&&this.completeSingleModifyLink({id:i.splitId,modifyText:l.origin})}n.moveToBookmark(r),!0!==i.noSelect&&this._g.editorFocus&&n.select()}else this.disableCheckText()},completeAllModifyLink:function(){var e=this,t=[]
for(var i in this._g.modifyRecordList)if(this._g.modifyRecordList.hasOwnProperty(i)){var n=this._g.modifyRecordList[i]
if(n&&!n.nextId){var r=this._g.modifyRecordList[n.rootId]
r&&t.push({old_sentence:r.origin,new_sentence:n.modify,check_result:r.position,scene:101})}}this._g.modifyRecordList={},setTimeout(function(){e.reportModifyRecord({list:t})},0)},completeSingleModifyLink:function(e){var t=this,i=0<arguments.length&&void 0!==e?e:{},n=this._g.modifyRecordList[i.id]
if(n&&n.modify===i.modifyText&&!n.nextId){var r=this._g.modifyRecordList[n.rootId]
if(r){var o={old_sentence:r.origin,new_sentence:n.modify,check_result:r.position,scene:101}
setTimeout(function(){t.reportModifyRecord({list:[o]})},0)}this.delModifyRecordLink({id:n.rootId})}},reportModifyRecord:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.list&&0!==t.list.length){var i={list:t.list}
try{i=JSON.stringify(i)}catch(e){i=""}i&&n.post({url:"/cgi-bin/spellingcheck?",dataType:"json",data:{action:"report",list:i}})}},getErrCount:function(e){var t=0,i=[]
for(var n in this._g.checkTextInfo){var r=this._g.checkTextInfo[n]
if("3"==r.status&&0<r.position.length){var o=this.ueditor.document.getElementById(n)
if(o){var a=this.getTextByEndSplit(o.id)
if(a&&r.origin===a)for(var s=0,l=r.position.length;s<l;s++)t+=r.position[s].len
else i.push(n)}else i.push(n)}}n=0
for(var d=i.length;n<d;n++)this.clearSplitElement({id:i[n],markRemoveHighline:!0})
return t},getCheckTextInfo:function(){return this._g.checkTextInfo},splitSentenceWhenKeyup:function(e){var t,i,n,r=0<arguments.length&&void 0!==e?e:{},o=r.node,a=r.noRequest,s=r.noSaveSceen,l={costTime:{findNeighborSplitTime:-1,getTextNodeTime:-1,splitSentenceTime:-1},hasResplit:-1}
if(this._g.composition||!o||!this.isInEditor(o))return l
var d=!1,c=+new Date
do{if(d=!1,!(t=this.findNeighborSplitElement(o)))break
i=t.left,n=t.right,i&&!this.checkSplitElement(i)&&(this.clearSplitElement({id:i}),d=!0),d||!n||this.checkSplitElement(n)||(this.clearSplitElement({id:n}),d=!0)}while(d)
c=new Date-c
var h=this.getHtmlBySplitElement(i,n,o.ownerDocument)
if(!h)return l
var u,g=this.formatSpace(O.html(this.replaceFillChar(x.text(h)),!1)),p=n?this._g.checkTextInfo[n.id]:null
return!g||n&&p?g&&n&&p&&(g==p.origin&&0<p.position.length?l.hasResplit=2:(g!=p.origin||g==p.origin&&this.hasBlockTag(h))&&(u=this.reSplitSentence({startSplit:i,endSplit:n,bodyNode:o.ownerDocument.body,noRequest:a,noSaveSceen:s}),l.hasResplit=1,(p.origin&&"3"==p.status&&0<p.position.length||this._g.modifyRecordList[n.id])&&this.markModifyRecord({originId:n.id,originText:p.origin,newIdArr:u.splitResult.idArr,newTextArr:u.splitResult.sentenceArr,position:p.position}))):(u=this.reSplitSentence({startSplit:i,endSplit:n,bodyNode:o.ownerDocument.body,noRequest:a,noSaveSceen:s}),l.hasResplit=1),l.costTime.findNeighborSplitTime=c,u&&u.costTime&&(l.costTime.getTextNodeTime=u.costTime.getTextNodeTime,l.costTime.splitSentenceTime=u.costTime.splitSentenceTime),l},markModifyRecord:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.originText===x.text(t.originText))if(75<t.originText.length)this.editor.fireEvent("reportAddNum",[{id:"122443",key:"6"},{id:"122443",key:"7"}])
else{this.editor.fireEvent("reportAddNum","122443","6")
for(var i=null,n=null,r=0,o=0,a=+new Date,s=0,l=t.newTextArr.length;s<l;s++){var d=this.replaceFillChar(t.newTextArr[s]||"")
if(d&&d!=t.originText&&d===x.text(d)){var c=m(d,t.originText)
r++,o<c&&.5<c&&(o=c,i=d,n=t.newIdArr[s])}}var h=+new Date
if(0<r&&this.editor.fireEvent("reportAddNum",[{id:"122443",key:"8"},{id:"122443",key:"9",len:h-a}]),0!==o){var u=this._g.modifyRecordList,g=u[t.originId],p=!0,f=n
g&&(g.nextId&&this.delModifyRecordLink({id:g.nextId}),g.nextId=n,p=!1,f=g.rootId),u[n]={origin:t.originText,modify:i,nextId:null,preId:p?null:t.originId,position:p?t.position:null,rootId:f}}}},delModifyRecordLink:function(e){for(var t=0<arguments.length&&void 0!==e?e:{},i=this._g.modifyRecordList,n=t.id,r=i[t.id];r;)delete this._g.modifyRecordList[n],r=(n=r.nextId)?i[n]:null},getTextNodeBySplitElement:function(e,t,i){e=e||i,t=t||i
var n=i.ownerDocument.createElement("span")
n.innerHTML=O.splitTagText,n.style.display="none"
var r=n.cloneNode(!0)
e===i?e.insertBefore(n,e.firstChild):V(n,e),t===i?t.appendChild(r):t.parentNode.insertBefore(r,t)
for(var o=n.firstChild,a=r.firstChild,s=this.domUtils.getCommonAncestor(e,t),l=this.getTextWalker(s),d=[],c=!1;l.nextNode();)if(l.currentNode===o)c=!0
else{if(l.currentNode===a)break
c&&d.push(l.currentNode)}return n.parentNode.removeChild(n),r.parentNode.removeChild(r),{textNodeArr:d,commonAncestor:s}},reSplitSentence:function(e){var t=this,i=0<arguments.length&&void 0!==e?e:{},n={costTime:{getTextNodeTime:-1,splitSentenceTime:-1},splitResult:{idArr:[],sentenceArr:[]}}
n.costTime.getTextNodeTime=+new Date
var r=this.getTextNodeBySplitElement(i.startSplit,i.endSplit,i.bodyNode),o=r.textNodeArr,a=r.commonAncestor
n.costTime.getTextNodeTime=new Date-n.costTime.getTextNodeTime
var s=[]
n.costTime.splitSentenceTime=+new Date
for(var l=0,d=o.length;l<d;l++)this.splitSentence({startNode:o[l],endNode:o[l+1]||null,sentenceArr:s,hasBlock:!(!i.endSplit||l!=o.length-1),rootNode:a})
n.costTime.splitSentenceTime=new Date-n.costTime.splitSentenceTime,i.endSplit&&this._g.splitElementToClear.push(i.endSplit)
var c=this.getIdTextBySentenceArr({sentenceArr:s})
return n.splitResult.idArr=c.idArr,n.splitResult.sentenceArr=c.sentenceArr,this.createSentenceData({sentenceArr:c.sentenceArr,idArr:c.idArr,oriTextKeyData:null,noRequest:i.noRequest}),this._g.resplitSentenceUndoId&&(clearTimeout(this._g.resplitSentenceUndoId),this._g.resplitSentenceUndoId=null),!0!==i.noSaveSceen&&(this._g.resplitSentenceUndoId=setTimeout(function(){var e=t.ueditor.undoManger
e&&"function"==typeof e.replaceLast&&e.replaceLast()},1e3)),n},clearSplitElement:function(e){var t,i=0<arguments.length&&void 0!==e?e:{},n=i.id,r=i.container,o=i.markRemoveHighline,a=void 0,s=void 0
s="string"==typeof n?(t=r?(a=$(r)).find('[id="'+n+'"]')[0]:this.ueditor.document.getElementById(n),n):(t=n).id,t&&t.parentNode&&t.parentNode.removeChild(t)
try{delete this._g.checkTextInfo[s]}catch(e){}if(s){var l=this.getHighlineDomsBySplitId(s,a)
0<l.length&&(this.removeHighlineSingleDom(l,a),!0===o&&(this._g.hasRemoveHighlineBeforeIncrement=!0))}},checkSplitElement:function(e){if(!e||1!=e.nodeType||e.tagName.toLocaleLowerCase()!=O.splitTagName||!e.id)return!1
if(this._g.checkTextInfo[e.id]){var t=e.previousSibling
if(!t||3!=t.nodeType)return!1
var i=this.replaceFillChar(t.nodeValue)
if(!i)return!1
for(var n=O.splitChar,r=!1,o=0,a=n.length;o<a;o++){var s=n[o]
if((d=s.escape?new RegExp("\\"+s.value+"$"):new RegExp(s.value+"$")).test(i)){r=!0
break}}if(r)return!0
var l=O.getSplitTag(e.id),d=new RegExp(l+"([\\s\\S]*)$"),c=e.ownerDocument.body.innerHTML.match(d)
if(!c||!c[1])return!1
if(this.replaceFillChar(x.text(c[1]))){for(var h,u=t.parentNode,g=i+O.splitTagText,p=g.length;u;){var f=this.formatSpace(O.html(this.replaceFillChar(x.text(u.innerHTML.replace(l,O.splitTagText))),!1)),m=f.length,v=f.indexOf(g)
if(!(0<m&&0<=v&&v+p==m)){for(var T=this.getTextWalker(u);T.nextNode();)if(T.currentNode===t&&T.nextNode()){h=T.currentNode
break}if(h)break
if("body"==u.tagName.toLocaleLowerCase())break}u=u.parentNode}if(h&&this.hasBlockElement(t,h,u))return!0}else if(this.hasBlockTag(c[1]))return!0
return!1}},getTextByEndSplit:function(e,t){var i
if(!J(i="string"==typeof e?t?$(t).find('[id="'+e+'"]')[0]:this.ueditor.document.getElementById(e):e))return!1
var n=i.previousSibling
if(!n)return!1
var r=this.findNeighborSplitElement(n,t)
if(r.right!==i)return!1
var o=this.getHtmlBySplitElement(r.left,i,t||i.ownerDocument)
return o?this.formatSpace(O.html(this.replaceFillChar(x.text(o)),!1)):""},getHtmlBySplitElement:function(e,t,i){var n,r
n=e?O.getSplitTag(e.id):"^",r=t?O.getSplitTag(t.id):"$"
var o,a=new RegExp(n+"([\\s\\S]*)"+r)
return 9===i.nodeType?o=this.replaceBookmarkTag(i.body.innerHTML).match(a):1===i.nodeType&&(o=this.replaceBookmarkTag(i.innerHTML).match(a)),!(!o||!o[1])&&o[1]},getTextWalker:function(e){var t=this
this.domUtils
return e.ownerDocument.createTreeWalker(e,window.NodeFilter.SHOW_TEXT,{acceptNode:function(e){return t.replaceFillChar(e.nodeValue)?window.NodeFilter.FILTER_ACCEPT:window.NodeFilter.FILTER_REJECT}},!1)},splitSentenceByHtml:function(e){var t=(e=e||{}).html||""
if(!this._g.supportChecktext||!t)return t||""
this._g.checkTextInfo={}
var i,n,r=t,o=!0
if(e.htmlChecktext){var a=e.htmlChecktext||""
a&&O.clearSplitTag(a)===r&&(r=a,o=!1)}try{i=JSON.parse(JSON.stringify(e.checkTextInfo||{}))}catch(e){i={}}if(this.editor.fireEvent("reportAddNum",67292,88,1),!1===o)this.editor.fireEvent("reportAddNum",67292,89,1),this._g.checkTextInfo=i
else{this.domUtils
var s=!1,l=+new Date,d=$("<div></div>").html(r)
!void("string"==typeof(n=d)?n=O.clearSplitTag(n):"function"==typeof n.remove&&n.remove(O.tmpTagName).remove(O.splitTagName))
var c=d[0],h=c.getElementsByTagName("*").length,u=0,g=h
try{for(var p=this.getTextWalker(c),f=[];p.nextNode();)f.push(p.currentNode)
if((g+=u=f.length)<=1500){for(var m=[],v=0,T=f.length;v<T;v++)this.splitSentence({startNode:f[v],endNode:f[v+1]||null,sentenceArr:m,rootNode:c})
this._g.checkTextInfo={}
var x=this.getIdTextBySentenceArr({sentenceArr:m})
this.createSentenceData({sentenceArr:x.sentenceArr,idArr:x.idArr,oriTextKeyData:N(i),notAddQueue:!0}),e.highline&&this.highlineAll({dom:c}),r=c.innerHTML}else r=t}catch(e){throw s=!0,r=t,e}var k=new Date-l;(2e3<k||1500<g)&&!S.isDebug&&this.disableCheckText(),this.reportSplitSentenceInfo({hasErr:s,costTime:k,textNodeNum:u,elementNum:h})}return r},disableCheckText:function(){this._g.supportChecktext=!1,this.hideErrCount(),this.removeHighline()},beforeSetContent:function(e,t,i){var n=2<arguments.length&&void 0!==i?i:{}
return this._g.curSeq=+n.seq,e},initPluginData:function(){return["check_text_info"]},getPluginData:function(e){var t=e.init(this.initPluginData()),i=t.get("content")
if(i){var n=void 0
try{n=JSON.parse(JSON.stringify(this._g.checkTextInfo))}catch(e){n={}}t.set("check_text_info",n)
var r=$("<div></div>").html(i)
this.removeHighline({$dom:r}),t.set("content",r.html())}},getIdTextBySentenceArr:function(e){var i={idArr:[],sentenceArr:[]},t=new RegExp("<"+O.splitTagName+" [^>]*\\s*id=((?:\"[^\">]*\")|(?:'[^'>]*'))[^>]*>[^<>]*</"+O.splitTagName+">","g"),n=e.sentenceArr.join("").replace(t,function(e,t){return i.idArr.push(t.replace(/["']/g,"")),e})
return i.sentenceArr=n.split(O.getSplitTagReg()),i.sentenceArr.length>i.idArr.length&&i.sentenceArr.pop(),i},createSentenceData:function(e){for(var t=e.sentenceArr,i=e.idArr,n=e.oriTextKeyData,r={},o=0,a=i.length;o<a;o++){var s,l=this.replaceFillChar(t[o]),d=encodeURIComponent(l||"")
l&&n&&n[d]&&0<n[d].length?(s=n[d].shift()).id=i[o]:s={id:i[o],status:"1",origin:l,position:[]},r[s.id]=s,this._g.checkTextInfo[s.id]=s}!0!==e.notAddQueue&&this.addQueue(r,e.noRequest)},addQueue:function(e,t){var i=this.ueditor.document.getElementsByTagName(O.splitTagName),n=i[i.length-1],r=n?n.id:""
for(var o in e){var a=e[o]
if("3"!=a.status&&"4"!=a.status){a.status="1"
var s=!0
if(a.id===r){for(var l=!1,d=0,c=O.splitChar.length;d<c;d++){var h=O.splitChar[d]
if(0<=a.origin.indexOf(h.value)){l=!0
break}}!1===l&&(s=!1)}!0===s&&(a.noRequest=!0===t,O.addCheckInfoQueue({data:a,instance:this}))}}var u=i[i.length-2],g=u?u.id:"",p=this._g.checkTextInfo[g]
p&&"1"==p.status&&(p.noRequest=!0===t,O.addCheckInfoQueue({data:p,instance:this}))},reportSplitSentenceInfo:function(e){if(S.reportSplitSentence&&!S.hasReportSplitSentence){S.hasReportSplitSentence=!0
var t=e.hasErr,i=e.costTime,n=e.textNodeNum+e.elementNum
if(this.editor.fireEvent("reportAddNum",67292,38,1),t)this.editor.fireEvent("reportAddNum",67292,85,1)
else switch(this.editor.fireEvent("reportAddNum",67292,83,1),this.editor.fireEvent("reportAddNum",67292,86,i),!0){case 0<n&&n<=100:this.editor.fireEvent("reportAddNum",67292,39,1),this.editor.fireEvent("reportAddNum",67292,41,i)
break
case 100<n&&n<=200:this.editor.fireEvent("reportAddNum",67292,43,1),this.editor.fireEvent("reportAddNum",67292,45,i)
break
case 200<n&&n<=300:this.editor.fireEvent("reportAddNum",67292,47,1),this.editor.fireEvent("reportAddNum",67292,49,i)
break
case 300<n&&n<=400:this.editor.fireEvent("reportAddNum",67292,51,1),this.editor.fireEvent("reportAddNum",67292,53,i)
break
case 400<n&&n<=500:this.editor.fireEvent("reportAddNum",67292,55,1),this.editor.fireEvent("reportAddNum",67292,57,i)
break
case 500<n&&n<=600:this.editor.fireEvent("reportAddNum",67292,59,1),this.editor.fireEvent("reportAddNum",67292,61,i)
break
case 600<n&&n<=700:this.editor.fireEvent("reportAddNum",67292,63,1),this.editor.fireEvent("reportAddNum",67292,65,i)
break
case 700<n&&n<=800:this.editor.fireEvent("reportAddNum",67292,67,1),this.editor.fireEvent("reportAddNum",67292,69,i)
break
case 800<n&&n<=900:this.editor.fireEvent("reportAddNum",67292,71,1),this.editor.fireEvent("reportAddNum",67292,73,i)
break
case 900<n&&n<=1e3:this.editor.fireEvent("reportAddNum",67292,75,1),this.editor.fireEvent("reportAddNum",67292,77,i)
break
case 1e3<n:this.editor.fireEvent("reportAddNum",67292,79,1),this.editor.fireEvent("reportAddNum",67292,81,i)}}},replaceBookmarkTag:function(e){if(!e)return""
var t=this.domUtils
return e.replace(t.getBookmarkReg(),"")},replaceFillChar:function(e){if(!e)return""
var t=this.domUtils
return this.formatSpace(e.replace(t.fillCharReg,"").replace(t.bookmarkFillCharReg,""))},formatSpace:function(e){return e?e.replace(/\u00A0/g,function(e,t,i){return 0!==t&&(/[a-zA-Z1-9\.\?\!,]/.test(i.substr(t-1,1))||/[a-zA-Z1-9\.\?\!,]/.test(i.substr(t+1,1)))?" ":e}):""},findNeighborSplitElement:function(e,t){if(!e||!t&&!this.isInEditor(e))return null
var i,n=new RegExp("<"+O.splitTagName+" [^>]*\\s*id=((?:\"[^\">]*\")|(?:'[^'>]*'))[^>]*>[^<>]*</"+O.splitTagName+">(([\\s\\S](?!"+O.splitTagName+">))*)<"+O.tmpTagName+"></"+O.tmpTagName+">"),r=new RegExp("<"+O.tmpTagName+"></"+O.tmpTagName+">(([\\s\\S](?!"+O.splitTagName+">))*)<"+O.splitTagName+" [^>]*\\s*id=((?:\"[^\">]*\")|(?:'[^'>]*'))[^>]*>[^<>]*</"+O.splitTagName+">"),o=e.ownerDocument,a=o.createElement(O.tmpTagName)
V(a,e),i=t?t.innerHTML:o.body.innerHTML,i=this.replaceBookmarkTag(i),a.parentNode.removeChild(a)
var s=i.match(n),l=i.match(r),d={left:null,right:null}
if(s&&s[1]){var c=s[1].replace(/["']/g,"")
d.left=t?$(t).find('[id="'+c+'"]')[0]||null:o.getElementById(c)||null}if(l&&l[3]){var h=l[3].replace(/["']/g,"")
d.right=t?$(t).find('[id="'+h+'"]')[0]||null:o.getElementById(h)||null}return d},getfilterIdTagNameWhiteList:function(){return[O.splitTagName]},splitSentence:function(e){var t=e.startNode,i=this.formatSpace(t.nodeValue)
if(this.replaceFillChar(i)){for(var n=t.ownerDocument,r=e.endNode,o=O.splitChar,a=O.html(i||"",!0),s=0,l=o.length;s<l;s++){var d,c=o[s]
d=c.escape?new RegExp("\\"+c.value,"g"):new RegExp(c.value,"g")
var h=[]
i=i.replace(d,function(e){var t=O.getUid()
return h.push(t),e+O.getSplitTag(t)})
var u=0
a=a.replace(d,function(e){return e+O.getSplitTag(h[u++])})}if(i!==this.formatSpace(t.nodeValue)){if(!new RegExp("<"+O.splitTagName+"[^<>]*>[^<>]*</"+O.splitTagName+">$").test(i)&&(e.hasBlock||this.hasBlockElement(t,r,e.rootNode))){var g=O.getUid()
i+=O.getSplitTag(g),a+=O.getSplitTag(g)}e.sentenceArr.push(i)
var p=n.createElement("div")
p.innerHTML=a
for(var f=n.createDocumentFragment();0<p.childNodes.length;)f.appendChild(p.childNodes[0])
V(f,t),t.parentNode.removeChild(t)}else if(e.hasBlock||this.hasBlockElement(t,r,e.rootNode)){var m=n.createElement("div"),v=O.getSplitTag(O.getUid())
m.innerHTML=v
var T=m.firstChild
e.sentenceArr.push(i+v),V(T,t)}else e.sentenceArr.push(i)}},hasBlockElement:function(e,t,i){if(!e)return!1
var n,r,o,a=e.parentNode,s=O.tmpTagName,l=e.ownerDocument.createElement(s)
V(l,e),o=t?(n=t.parentNode,r=l.cloneNode(!0),n.insertBefore(r,t),new RegExp("<"+s+"></"+s+">([\\s\\S]*)<"+s+"></"+s+">")):new RegExp("<"+s+"></"+s+">([\\s\\S]*)$")
var d=i.innerHTML
a.removeChild(l),n&&r&&n.removeChild(r)
var c=d.match(o)
if(!c||!c[1])return!1
var h=!1
return t?h=this.hasBlockTag(c[1]):this.replaceFillChar(x.text(c[1]))||(h=this.hasBlockTag(c[1],!0)),h},hasBlockTag:function(e,t){var i=O.blockTag,n=!1
for(var r in i){if(i.hasOwnProperty(r))if((t?new RegExp("(<"+r+">)|(<"+r+" [^>]*>)"):new RegExp("(<"+r+">)|(<"+r+" [^>]*>)|(</"+r+">)")).test(e)){n=!0
break}}return n},isInEditor:function(e){if(!e)return!1
var t=this.ueditor.document
if("string"==typeof e)return!!t.getElementById(e)
var i=this.ueditor.body
return!(!e||e!==i&&!i.contains(e))}})})
define("3rd/editor/tpl/errorTextCount.tpl.js",[],function(t,s,e){return'<span id="js_checktext" class="fold_tips fold_tips_err_character">  疑似错别字<span class="fold_tips_value js_text_err_count">{count}</span>  <a class="fold_tips_value js_show_text_err" href="javascript:;"></a></span>'})
define("3rd/editor/tpl/checktext_popup.tpl.js",[],function(e,i,t){return'{if needBreak}<div style="height:5px;display:none"></div>{/if}<div class="js_link_popup character_ignore">  {if hasNextCheckText}    <div onclick="$$._fireEventAndHide(\'next_check_text\');" class="character_ignore_box"><a class="character_ignore_inner" href="javascript:;">下一个错别字</a></div>  {/if}</div>'})
"use strict"
define("3rd/editor/plugin/wordcount.js",["3rd/editor/plugin/basePlugin.js","3rd/editor/common/domUtils.js","3rd/editor/tpl/wordCount.tpl.js","3rd/editor/common/no_editable.js"],function(t,e,n){var o=t("3rd/editor/plugin/basePlugin.js"),i=t("3rd/editor/common/domUtils.js").domUtils,d=t("3rd/editor/tpl/wordCount.tpl.js"),r=t("3rd/editor/common/no_editable.js")
return o.inherit({init:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this.initG(e)},initG:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this._g={timeoutId:null,requestId:null,curSeq:-1,app_id:e.app_id+""}},getName:function(){return"wordcount"},beforeSetContent:function(t,e,n){var o=2<arguments.length&&void 0!==n?n:{}
return this._g.curSeq=1*o.seq,t},addListener:function(){var t=this,e=this
this.editor.addListener("contentchange afterinserthtml",function(){t.wordcount({delay:500})}),this.editor.addListener("getWordCountContent",function(){return e.getWordCountContent()}),this.editor.addListener("ready",function(){i.on(this.body,"keyup",function(t){(t.keyCode||t.which)in{16:1,18:1,20:1,37:1,38:1,39:1,40:1}||e.wordcount({delay:500})})})},getWordCountContent:function(){var t=this.editor.getUeditor().body.cloneNode(!0)
$(t).find("."+r.unEditablClass).each(function(){$(this).remove()})
var e=t.textContent||""
return e=e&&e.replace(i.fillCharReg,"").replace(i.bookmarkFillCharReg,"").replace(/(\b|^)(\w)(\w*)(\b|$)/g,"#").replace(/\s/g,"")},handleDom:function(t){var e=0<arguments.length&&void 0!==t?t:{},n=$("#word_count_container")
e.show&&this.editor.fireEvent("is_use_editor")?n&&0!==n.length?n.find(".js_word_count").text(e.wordCount):$("#bot_bar_left_container").prepend(template.compile(d)({wordCount:e.wordCount})):e.show||n.remove()},updateSeq:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this._g.curSeq=1*e.seq},updateAppid:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this._g.app_id=e.app_id+""},wordcount:function(t){var n=this,e=0<arguments.length&&void 0!==t?t:{},o=void 0!==e.delay?1*e.delay:5e3
this._g.timeoutId&&(clearTimeout(this._g.timeoutId),this._g.timeoutId=null),this._g.timeoutId=setTimeout(function(){var t,e
t=n.getWordCountContent(),e=0,t&&(e=t.length),n.updateWordCount({contentLength:e,quoteContentLength:0})},o)},updateWordCount:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this.handleDom({show:!0,wordCount:e.contentLength+e.quoteContentLength})}})})
define("3rd/editor/tpl/wordCount.tpl.js",[],function(n,o,s){return'<span id="word_count_container" class="fold_tips">  正文字数<span class="fold_tips_value js_word_count">{wordCount}</span></span>'})
"use strict"
function _asyncToGenerator(t){return function(){var d=t.apply(this,arguments)
return new Promise(function(r,s){return function e(t,a){try{var i=d[t](a),n=i.value}catch(t){return void s(t)}if(!i.done)return Promise.resolve(n).then(function(t){e("next",t)},function(t){e("throw",t)})
r(n)}("next")})}}define("3rd/editor/plugin/multiple_tab.js",["3rd/editor/lsMessage.js","3rd/editor/plugin/basePlugin.js","pages/modules/dbCache/dbCache.js"],function(t,e,a){var i=t("3rd/editor/lsMessage.js"),n=t("3rd/editor/plugin/basePlugin.js"),r=t("pages/modules/dbCache/dbCache.js"),s="editor",d="multipetab",o=3e5,u=1e4
return n.inherit({init:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this.initG(e)},initG:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this._g={app_id:+e.app_id,tabId:(new Date).getTime()+"_"+Math.random(),keepAliveTimeoutId:null,workerPath:e.workerPath||"/mpres/zh_CN/htmledition/3rd/editor/worker/plain/multipleTabWorker.js",sharedWorker:null,supportType:0,workerFunc:{},getLastTabDataCallbackFunc:[],workerInitTime:null,postMessageTime:null,checkDbTimeoutId:null,tabState:!0,getLastTabDataId:null,synDraftId:null,hasBindFocusEvent:!1,hasInitLsMessage:!1}},getName:function(){return"multipletab"},updateAppid:function(t){var e=0<arguments.length&&void 0!==t?t:{},a=!1
this._g.app_id<1&&1<+e.app_id&&(a=!0),this._g.app_id=+e.app_id,a&&this.initMultipleTab()},addListener:function(){var t=this
this.editor.addListener("ready",function(){t.bindEvent()})},bindEvent:function(){var t=this
this.editor.addListener("initMultipleTab",function(){t.initMultipleTab()})},activeStateChange:function(t){var e=0<arguments.length&&void 0!==t?t:{},a=this
if(a._g.tabState&&!e.isFocus){if(a.canUseDb()){a.editor.fireEvent("reportAddNum",69271,60,1)
var i=+new Date
a.getDbData().then(function(t){if(a.editor.fireEvent("reportAddNum",69271,61,new Date-i),t&&t.tabId!==a._g.tabId){a.editor.fireEvent("reportAddNum",69271,63,1)
var e=a.editor.fireEvent("getArticleListData")
try{e=JSON.parse(JSON.stringify(e))}catch(t){e={data:null}}a.setDbData({appmsgData:e.data})}})}this.editor.fireEvent("activeStateChange",{isFocus:!!e.isFocus})}else!a._g.tabState&&e.isFocus&&(a._g.getLastTabDataId&&clearTimeout(a._g.getLastTabDataId),a._g.getLastTabDataId=setTimeout(function(){a._g.tabState&&(a.editor.fireEvent("reportAddNum",65080,104,1),a.getLastTabData({callback:function(t){t&&t.data&&t.data.appmsgData&&"[object Array]"===Object.prototype.toString.call(t.data.appmsgData)&&(a._g.synDraftId&&clearTimeout(a._g.synDraftId),a._g.synDraftId=setTimeout(function(){a._g.tabState&&(a.editor.fireEvent("syn_draft",{data:t.data.appmsgData}),a.editor.fireEvent("mplog",{level:"info",description:"syn_draft info",data:{otherTabId:t.data.tabId||"",curTabId:a._g.tabId,appmsgData:t.data.appmsgData,type:t.type}}))},0))}}))},500),this.editor.fireEvent("activeStateChange",{isFocus:!!e.isFocus}))
a._g.tabState=!!e.isFocus},getLastTabData:function(t){var e=this,a=0<arguments.length&&void 0!==t?t:{}
this.canUseWorker()?0<this._g.getLastTabDataCallbackFunc.length?this._g.getLastTabDataCallbackFunc.push(a.callback):(this._g.getLastTabDataCallbackFunc.push(a.callback),this._g.sharedWorker.port.postMessage({tabId:this._g.tabId,appId:this._g.app_id,func:"getLastTabData"})):this.canUseDb()?this.getDbData().then(function(t){t&&t.tabId!==e._g.tabId&&t.appmsgData&&a.callback({data:t,type:"dbcache"})}):a.callback({data:null})},initMultipleTab:function(){var t=this
1<this._g.app_id&&0===this._g.supportType&&(this.editor.fireEvent("reportAddNum",69271,49,1),window.SharedWorker?(this.initSharedWorker(),this._g.checkDbTimeoutId&&(clearTimeout(this._g.checkDbTimeoutId),this._g.checkDbTimeoutId=null),this._g.checkDbTimeoutId=setTimeout(function(){t.editor.fireEvent("reportAddNum",69271,58,1),t.initDb()},u)):this.initDb(),this.initLsMessage())},initLsMessage:function(){var a=this
this._g.hasInitLsMessage||(this._g.hasInitLsMessage=!0,this._g.lsMessageFunc={getOtherTabId:function(t){var e=0<arguments.length&&void 0!==t?t:{}
e.data&&+e.data.appId==+a._g.app_id&&a._g.tabId!==e.data.tabId&&i.postMessage({scope:s,eventName:"getOtherTabIdCallback",data:{appId:a._g.app_id,tabId:a._g.tabId}})},getOtherTabIdCallback:function(t){var e=0<arguments.length&&void 0!==t?t:{}
e.data&&+e.data.appId==+a._g.app_id&&a._g.tabId!==e.data.tabId&&a.editor.fireEvent("reportAddNum","122443","11")}},i.onReceiveMessage({scope:s,func:function(t){var e=0<arguments.length&&void 0!==t?t:{}
e.scope===s&&a._g.lsMessageFunc[e.eventName]&&a._g.lsMessageFunc[e.eventName]({data:e.data})}}),i.postMessage({scope:s,eventName:"getOtherTabId",data:{appId:this._g.app_id,tabId:this._g.tabId}}))},initDb:function(){if(1<this._g.app_id&&0===this._g.supportType&&r.isSupported){this._g.supportType=2,this.editor.fireEvent("reportAddNum",69271,52,1)
var e=this.editor.fireEvent("getArticleListData")
try{e=JSON.parse(JSON.stringify(e))}catch(t){e={data:null}}this.setDbData({appmsgData:e.data}),this.bindFocusEvent()}},bindFocusEvent:function(){if(!this._g.hasBindFocusEvent){this._g.hasBindFocusEvent=!0
var t=this,e=t.editor.window,a=null,i=!1
t.activeStateChange({isFocus:!0}),this.editor.fireEvent("reportAddNum",65080,94,1)
var n="",r=""
void 0!==document.hidden?(n="hidden",r="visibilitychange"):void 0!==document.msHidden?(n="msHidden",r="msvisibilitychange"):void 0!==document.webkitHidden?(n="webkitHidden",r="webkitvisibilitychange"):void 0!==document.mozHidden&&(n="mozHidden",r="mozvisibilitychange"),n&&(t.editor.fireEvent("reportAddNum",65080,102,1),$(document).on(r,function(){document[n]&&o()})),$(window).on("focus",s),$(e).on("focus",s),$(window).on("blur",o),$(e).on("blur",o)
t.editor.addListener("before_add_article before_del_article focus mousedown keydown",d),t.editor.addListener("blur",o)}function s(){i||(t.editor.fireEvent("reportAddNum",65080,95,1),i=!0),d()}function d(){a&&(clearTimeout(a),a=null),t.activeStateChange({isFocus:!0})}function o(){a=a||setTimeout(function(){a=null,t._g.tabState&&("function"!=typeof document.hasFocus||!0!==document.hasFocus()&&!0!==t.editor.getDocument().hasFocus())&&t.activeStateChange({isFocus:!1})},200)}},setDbData:function(t){var e=0<arguments.length&&void 0!==t?t:{}
this.canUseDb()&&(this.editor.fireEvent("reportAddNum",69271,69,1),r.isUsable()||this.editor.fireEvent("reportAddNum",69271,70,1),r.set({data:{cacheKey:this.getCacheKey(),cacheValue:{tabId:this._g.tabId,appmsgData:e.appmsgData},expireTime:this.getDbDataExpireTime()}}))},getDbData:function(){var n=this
return _asyncToGenerator(regeneratorRuntime.mark(function t(){var e,a,i
return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=null,t.prev=1,2===n._g.supportType)return n.editor.fireEvent("reportAddNum",69271,69,1),r.isUsable()||n.editor.fireEvent("reportAddNum",69271,70,1),t.next=7,r.get({cacheKey:n.getCacheKey()})
t.next=10
break
case 7:a=t.sent,i=+new Date,a&&a.cacheValue&&a.expireTime>i&&(e=a.cacheValue)
case 10:t.next=15
break
case 12:t.prev=12,t.t0=t.catch(1),e=null
case 15:return t.abrupt("return",e)
case 16:case"end":return t.stop()}},t,n,[[1,12]])}))()},initSharedWorker:function(){var e=this
if(1<this._g.app_id&&!this._g.sharedWorker){if(!window.SharedWorker)return
this._g.workerInitTime=+new Date,this.initWorkerFunc(),this._g.sharedWorker=new SharedWorker(this._g.workerPath),this._g.sharedWorker.port.addEventListener("message",function(t){t.data&&t.data.appId&&t.data.tabId&&t.data.func&&"function"==typeof e._g.workerFunc[t.data.func]&&e._g.workerFunc[t.data.func]({data:t.data.data,tabId:t.data.tabId,appId:t.data.appId})}),this._g.sharedWorker.port.start(),this._g.sharedWorker.port.postMessage({tabId:this._g.tabId,appId:this._g.app_id,func:"register"})}},initWorkerFunc:function(){var r=this
this._g.workerFunc={getAppmsgData:function(t){var e=0<arguments.length&&void 0!==t?t:{}
if(+e.appId==+r._g.app_id&&r._g.tabId!==e.tabId){var a=r.editor.fireEvent("getArticleListData")
try{a=JSON.parse(JSON.stringify(a))}catch(t){a={data:null}}r._g.sharedWorker.port.postMessage({func:"setAppmsgData",tabId:r._g.tabId,appId:e.appId,data:{appmsgData:a.data}})}},getLastTabDataCallback:function(t){var e=0<arguments.length&&void 0!==t?t:{}
if(+e.appId==+r._g.app_id&&r._g.tabId===e.tabId){for(var a=0,i=r._g.getLastTabDataCallbackFunc.length;a<i;a++){var n=r._g.getLastTabDataCallbackFunc[a]
"function"==typeof n&&n({data:e.data,type:"sharedWorker"})}r._g.getLastTabDataCallbackFunc=[]}},registed:function(t){var e=0<arguments.length&&void 0!==t?t:{}
if(+e.appId==+r._g.app_id&&r._g.tabId===e.tabId){if(0<r._g.workerInitTime){var a=new Date-r._g.workerInitTime
r.editor.fireEvent("reportAddNum",69271,54,a)}r._g.checkDbTimeoutId&&(clearTimeout(r._g.checkDbTimeoutId),r._g.checkDbTimeoutId=null),r._g.supportType=1,r.editor.fireEvent("reportAddNum",69271,50,1),r._g.keepAliveTimeoutId=setTimeout(function(){r.keepTabAlive()},o),r._g.postMessageTime=+new Date,r._g.sharedWorker.port.postMessage({func:"testMessageTime",tabId:r._g.tabId,appId:e.appId,data:{}}),r.bindFocusEvent()}},testMessageTimeCallback:function(t){var e=0<arguments.length&&void 0!==t?t:{};+e.appId==+r._g.app_id&&r._g.tabId===e.tabId&&0<r._g.postMessageTime&&r.editor.fireEvent("reportAddNum",69271,56,new Date-r._g.postMessageTime)}}},keepTabAlive:function(){var t=this
this._g.keepAliveTimeoutId&&(clearTimeout(this._g.keepAliveTimeoutId),this._g.keepAliveTimeoutId=null),this.canUseWorker()&&(this._g.sharedWorker.port.postMessage({func:"keepTabAlive",tabId:this._g.tabId,appId:this._g.app_id}),this._g.keepAliveTimeoutId=setTimeout(function(){t.keepTabAlive()},o))},canUseWorker:function(){return 1<this._g.app_id&&1===this._g.supportType},canUseDb:function(){return 1<this._g.app_id&&2===this._g.supportType},getDbDataExpireTime:function(){return 864e5+(new Date).getTime()},getCacheKey:function(){return d+"_"+this._g.app_id}})})
"use strict"
define("3rd/editor/lsMessage.js",[],function(e,t,o){var p={lsEventKey:"__mpLSEvent",supported:!1,postQueue:{},receiveQueue:{},postId:null}
try{"localStorage"in window&&window.localStorage&&(p.supported=!0)}catch(e){}return p.supported&&window.addEventListener("storage",function(e){if(e.key===p.lsEventKey){var t=(e.storageArea||window.localStorage).getItem(e.key)
if(t){var o=[]
try{o=JSON.parse(t)}catch(e){return}if("[object Array]"===Object.prototype.toString.call(o))for(var r=0,a=o.length;r<a;r++){var n=o[r]
if(n.scope&&p.receiveQueue[n.scope])for(var s=0,u=p.receiveQueue[n.scope].length;s<u;s++){var i=p.receiveQueue[n.scope][s]
"function"==typeof i&&i({eventName:n.eventName,scope:n.scope,data:n.data})}}}}}),{onReceiveMessage:function(e){var t=0<arguments.length&&void 0!==e?e:{},o=t.scope
o=o||"*",p.receiveQueue[o]||(p.receiveQueue[o]=[]),p.receiveQueue[o].push(t.func)},postMessage:function(e){var t=0<arguments.length&&void 0!==e?e:{}
p.supported&&(function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.eventName){var o=t.scope
o=o||"*",p.postQueue[o]||(p.postQueue[o]=[])
for(var r=-1,a=0,n=p.postQueue[o].length;a<n;a++){var s=p.postQueue[o][a]
if(s.eventName===t.eventName){s.dataArr.push(t.data),r=a
break}}-1===r&&p.postQueue[o].push({eventName:t.eventName,dataArr:[t.data]})}}(t),p.postId&&clearTimeout(p.postId),p.postId=setTimeout(function(){for(var e in p.postQueue){if(!Object.prototype.hasOwnProperty.call(p.postQueue,e))return
var t=p.postQueue[e].shift()
if(t.eventName&&0<t.dataArr.length)try{for(var o=[],r=0,a=t.dataArr.length;r<a;r++)o.push({eventName:t.eventName,scope:e,data:t.dataArr[r]})
JSON.stringify(o)===window.localStorage.getItem(p.lsEventKey)&&window.localStorage.setItem(p.lsEventKey,""),window.localStorage.setItem(p.lsEventKey,JSON.stringify(o))}catch(e){}0===p.postQueue[e].length&&delete p.postQueue[e]}},0))}}})
define("3rd/editor/plugin/insertcode/insertcode.js",["3rd/editor/plugin/basePlugin.js","3rd/editor/common/utils.js","3rd/editor/common/domUtils.js","3rd/editor/common/browser.js","3rd/editor/common/dtd.js","3rd/editor/plugin/insertcode/shCore.js","3rd/editor/plugin/insertcode/insertCodeUtils.js","pages/modules/utils/str_util.js"],function(e,t,n){"use strict"
var r=e("3rd/editor/plugin/basePlugin.js"),v=e("3rd/editor/common/utils.js").utils,B=e("3rd/editor/common/domUtils.js").domUtils,o=e("3rd/editor/common/browser.js").browser,i=e("3rd/editor/common/dtd.js").dtd,L=e("3rd/editor/plugin/insertcode/shCore.js"),E=e("3rd/editor/plugin/insertcode/insertCodeUtils.js"),m=e("pages/modules/utils/str_util.js"),a={undo:1,redo:1,insertcode:1,inserthtml:1,selectall:1},l=r.inherit({init:function(){this.initG()},initG:function(){this._g={curSelectPre:null,scrollIntoViewId:null,scrollXId:null,canScrollX:!0}},getType:function(){return 1},hideButtonWhenInit:function(){return!0},getTitle:function(){return"fire_getinsertcodetitle"},getName:function(){return"insertcode"},getExecCommand:function(){var s=this
return function(e){if(s.editor){var m=this,f=m.selection.getRange(),t="",u=s.getCodeBlockDom(f.startContainer)
if(u){var v=s.getLineByRang(f)
0<v.length&&function(){m.fireEvent("saveScene")
for(var r=f.createBookmark(!0),i={id:!0},e=m.document.createDocumentFragment(),t=void 0,n=0,a=v.length;n<a;n++){var o=v[n],l=""
l="body"===u.parentNode.nodeName.toLowerCase()?"p":"section"
var d=m.document.createElement(l),s=o.textContent
s=s.html(!0).replace(B.bookmarkFillCharReg,function(e){if(r.start){delete r.start
var t=B.createBookmarkNode(m.document,Math.random())
return i.start=t.id,t.outerHTML}if(r.end){delete r.end
var n=B.createBookmarkNode(m.document,Math.random())
return i.end=n.id,n.outerHTML}}),d.innerHTML=s,e.appendChild(d)}var c=v[v.length-1]
if(c.nextSibling&&c.nextSibling.nodeName.toLowerCase()===E.lineTagName){for(t=u.cloneNode(!1);c.nextSibling&&c.nextSibling.nodeName.toLowerCase()===E.lineTagName;)t.appendChild(c.nextSibling)
e.appendChild(t)}for(var g=0,h=v.length;g<h;g++)v[g].parentNode.removeChild(v[g])
u.parentNode.insertBefore(e,u.nextSibling),0<u.getElementsByTagName(E.lineTagName).length?m.fireEvent("blurPre",u,!0):u.parentNode.removeChild(u),t&&m.fireEvent("blurPre",t,!0),f.moveToBookmark(i).select(),m.fireEvent("saveScene"),m.fireEvent("reportAddNum",69271,30,1)}()}else{var n=""
if(f.collapsed)n=E.getCodeLineStr(B.fillChar),m.fireEvent("reportAddNum",69271,28,1)
else{var r=f.extractContents(),i=m.document.createElement("div")
if(i.appendChild(r),n=s.parseHtml2String(i.innerHTML)){var a=L.highlightStr(n,"",m.document)
a.result.language&&(t=a.result.language),n=a.result.value,m.fireEvent("reportAddNum",69271,29,1)}else n=E.getCodeLineStr(B.fillChar),m.fireEvent("reportAddNum",69271,28,1)}var o=E.getCodeBlockStr(n,t),l=m.execCommand("inserthtml",o,!0)
if(l&&l[0]){u=l[0],s._g.curSelectPre=u
var d=s.getLastLineLastElement(u)
d&&f.selectNodeContents(d).collapse(!1).select()}}}}},getQueryCommandValue:function(){var a=this
return function(e,t){if(a.editor){var n=this.selection.getRange(),r=a.getCodeBlockDom(n.startContainer),i=void 0
return r&&(i=r.getAttribute(E.languageAttr)||""),i}}},addListener:function(){var r=this
this.editor.addListener("getinsertcodetitle",function(e){return r._g.curSelectPre?"取消代码":"插入代码"}),this.editor.addListener("isInCodeBlockVirtual",function(e,t){if(!t||"text"!==t.type&&"element"!==t.type||"element"===t.type&&t.tagName!==E.codeBlockTagName&&t.tagName!==E.lineTagName&&t.tagName!==E.lineContainTagName)return!1
for(var n,r=t;r&&"root"!==r.type;){if(!0==!!((n=r)&&"element"===n.type&&n.tagName===E.codeBlockTagName&&0<=(n.getAttr("class")||"").indexOf(E.codeBlockClass)))return!0
r=r.parentNode}return!1}),this.editor.addListener("ready",function(){if(v.isSupportWalker()){var e=r.editor.getUi().buttons[r.getName()]
if(e&&"function"==typeof e.getDom){var t=e.getDom()
t&&(t.style.display="")}var n=this.queryCommandState
this.queryCommandState=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}
if(e===r.getName()&&t.allDomInRange&&t.allDomInRange[0]&&2===B.isContentEditable({node:t.allDomInRange[0],checkParent:!1}))return-1
if(this.selection&&void 0!==this.queryCommandValue("insertcode")){if(!a[e.toLowerCase()])return-1
if(e===r.getName())return 1}else if(e===r.getName())return 0
return n.apply(this,arguments)},r.bindEvent(),r.addFilterRule()}})},getPluginData:function(e){var t=e.init(),n=t.get("content")
if(n){var r=$("<div></div>"),i=E.codeBlockTagName,a=E.codeBlockClass,o=E.lineTagName,l=E.lineContainTagName,d=E.lineContainStartTag,s=E.lineContainEndTag,c=[]
r.html(n).find(i+"."+a).each(function(){var e=$(this)
e.removeAttr("style")
var t=e.find(o)
0===t.length?e.append(E.getCodeLineStr("br")):t.each(function(){var e=this
if(0===e.childNodes.length||1<e.childNodes.length||1===e.childNodes.length&&(1!==e.firstChild.nodeType||e.firstChild.nodeName.toLowerCase()!==l||-1===e.firstChild.className.indexOf(E.lineContainClass))){var t=e.ownerDocument.createElement(l)
for(t.className=E.lineContainClass;e.firstChild;)t.appendChild(e.firstChild)
e.appendChild(t)}e.textContent.replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")||(e.innerHTML=d+"<br>"+s)}),c.push({codeBlock:this})})
for(var g=0,h=c.length;g<h;g++){var m=c[g].codeBlock,f=$(m).find(o).length
if(0!==f){var u=m.ownerDocument,v=u.createElement(E.outputMainTagName)
v.className=E.outputMainClass+" "+E.codeBlockClass
var C=u.createElement(E.outputLineMainTagName)
C.className=E.outputLineMainClass+" "+E.codeBlockClass,v.appendChild(C),m.parentNode.insertBefore(v,m),v.appendChild(m),m.className=E.codeBlockClass
for(var p=0;p<f;p++)C.appendChild(u.createElement(E.outputLineItemTagName))}}t.set("content",r.html())}},reportCodeBolckEdit:function(){this.editor.fireEvent("reportAddNum",69271,32,1)},addFilterRule:function(){var l=E.codeBlockTagName,d=E.codeBlockClass,s=E.lineTagName,c=E.lineContainTagName,g=E.lineContainStartTag,h=E.lineContainEndTag,e=this.editor.getUeditor()
e.addInputNativeNodeRule(function(e){for(var t=e.getElementsByTagName("pre"),n=0,r=t.length;n<r;n++){var i=t[n],a=i.innerHTML;/\n/.test(a)&&(i.innerHTML=a.replace(/\n/g,"<br>"))}}),e.addInputRule(function(e){var i=[]
v.each(e.getNodesByTagName(l),function(e){var t=e.getAttr("class")||""
if(e.tagName==l&&0<=t.indexOf(d)){e.setAttr("style",""),e.setAttr("class",d+" "+E.inputCodeBlockClass),v.each(e.getNodesByTagName("br"),function(e){e.parentNode.removeChild(e)})
var n=e.getNodesByTagName(s)
if(0===n.length){var r=UE.uNode.createElement(E.getCodeLineStr())
e.appendChild(r)}else v.each(n,function(e){if(0===e.children.length||1<e.children.length||1===e.children.length&&("element"!==e.children[0].type||e.children[0].tagName!==c||e.children[0].getAttr("class")!==E.lineContainClass)){var t=UE.uNode.createElement(c)
for(t.setAttr("class",E.lineContainClass);e.firstChild();)t.appendChild(e.firstChild())
e.appendChild(t)}m.html(e.innerText(),!1).replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")||e.innerHTML(g+h)})
i.push({codeBlock:e})}})
for(var t=0,n=i.length;t<n;t++){var r=i[t].codeBlock,a=r.parentNode,o=a?a.getAttr("class"):""
a.parentNode&&o&&(0<=o.indexOf(d)||0<=o.indexOf(E.outputMainClass))&&(a.parentNode.insertBefore(r,a),a.parentNode.removeChild(a))}v.each(e.getNodesByTagName(E.outputLineMainTagName),function(e){var t=e.getAttr("class")||""
t&&(0<=t.indexOf(d)||0<=t.indexOf(E.outputLineMainClass))&&e.parentNode.removeChild(e)})})},bindEvent:function(){var C=this
this.editor.addListener("afterscencerestore aftersetcontent afterpaste",function(e,t,n){var r=[],i=this.document
"afterpaste"===e&&n&&0<n.length?v.each(n,function(e){if(e)if(e.nodeName.toLowerCase()===E.codeBlockTagName&&0<=e.className.indexOf(E.codeBlockClass))r.push(e)
else if(1==e.nodeType){var t=e.getElementsByTagName(E.codeBlockTagName)
v.each(t,function(e){r.push(e)})}}):r=i.getElementsByTagName(E.codeBlockTagName)
for(var a=0,o=r.length;a<o;a++){var l=r[a]
if(l=C.getCodeBlockDom(l)){for(var d=l.getElementsByTagName("br"),s=0,c=d.length;s<c;s++)d[s].parentNode.removeChild(d[s])
for(var g=l.getElementsByTagName(E.lineTagName),h=0,m=g.length;h<m;h++){var f=g[h]
if(!f.textContent.replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")){var u=f.ownerDocument.createElement("div")
u.innerHTML=E.getCodeLineStr(),f.innerHTML=u.firstChild.innerHTML}}}}setTimeout(function(){C.scrollXIntoView()},100)}),this.editor.addListener("beforeinserthtml",function(e,t){var n=this.selection.getRange()
if(C.getCodeBlockDom(n.startContainer)){var r=C.parseHtml2String(t)
return C.insertHighlight2Range(r,n),this.fireEvent("saveScene"),!0}}),this.editor.addListener("beforeenterkeydown",function(){var e=this.selection.getRange(),t=C.getCodeBlockDom(e.startContainer)
if(t){this.fireEvent("saveScene")
var n=B.findParentByTagName(e.startContainer,E.lineTagName,!0),r=""
if(n){var i=e.createBookmark()
r=n.textContent.split(B.bookmarkFillChar)[0]||""
var a=new RegExp("^([\\s"+B.fillChar+"]+)([^\\s"+B.fillChar+"]|$)"),o=r.match(a)
r=o&&o[0]?o[0].replace(a,"$1").replace(/\t/g,E.tabSize).replace(B.fillCharReg,""):"",e.moveToBookmark(i)}return C.insertHighlight2Range("\n"+r,e),this.fireEvent("saveScene"),C.reportCodeBolckEdit(t),!0}}),this.editor.addListener("selectionchange",function(e,t){if(t){var n=this.selection.getRange(),r=C.getCodeBlockDom(n.startContainer);(r&&C._g.curSelectPre!==r&&C._g.curSelectPre||!r&&C._g.curSelectPre)&&this.fireEvent("blurPre",C._g.curSelectPre),C._g.curSelectPre=r||null}}),this.editor.addListener("onpasting",function(e,t){var n=this,r=(t.clipboardData?t.clipboardData:t.originalEvent&&t.originalEvent.clipboardData?t.originalEvent.clipboardData:{}).items
if(r&&0<r.length){var i=this.selection.getRange()
if(C.getCodeBlockDom(i.startContainer)){for(var a=void 0,o=0,l=r.length;o<l;o++)if("text/plain"===r[o].type){a=r[o]
break}if(a){var d=[+new Date]
return a.getAsString(function(e){e&&(n.fireEvent("saveScene"),d.push(+new Date),C.insertHighlight2Range(e,i),d.push(+new Date),n.fireEvent("saveScene"),n.fireEvent("reportAddNum",69271,31,1))}),!0}}}}),this.editor.addListener("heightChanged",function(){C._g.scrollIntoViewId&&clearTimeout(C._g.scrollIntoViewId)
var n=this
C._g.scrollIntoViewId=setTimeout(function(){var e=n.selection.getRange()
if(C.getCodeBlockDom(e.startContainer)){var t=e.startContainer
1!=+t.nodeType&&(t=t.parentNode),n.fireEvent("scrollIntoView",t)}},100)}),this.editor.addListener("tabkeydown",function(e,t){var n=this,r=n.selection.getRange(),i=C.getCodeBlockDom(r.startContainer)
if(i){var a=!1
if(n.fireEvent("saveScene"),t.shiftKey){var o=C.getLineByRang(r)
if(0<o.length){for(var l=r.createBookmark(),d=0,s=o.length;d<s;d++)C.deletePreTab(o[d])
r.moveToBookmark(l),r.select(),a=!0}}else if(r.collapsed)C.insertTabByCollapseRange(r),a=!0
else{var c=C.getLineByRang(r)
if(1===c.length)C.deleteRangeContents(r),C.insertTabByCollapseRange(r),a=!0
else if(1<c.length){for(var g=r.createBookmark(),h=n.document.createTextNode(E.tabSize),m=0,f=c.length;m<f;m++){var u=c[m]
if(u.firstChild)u.firstChild.insertBefore(h.cloneNode(!0),u.firstChild.firstChild)
else{var v=n.document.createElement(E.lineContainTagName)
v.className=E.lineContainClass,v.appendChild(h.cloneNode(!0)),u.appendChild(v)}}r.moveToBookmark(g).select(),a=!0}}if(n.fireEvent("saveScene"),a)return C.reportCodeBolckEdit(i),!0}}),this.editor.addListener("keydown",function(e,t){var n=t.keyCode||t.which,r=this.selection.getRange(),i=C.getCodeBlockDom(r.startContainer)
if(i)if(40==n)C.handleDownKeydown(t,r,i)
else if(38==n)C.handleUpKeydown(t,r,i)
else if(8==n){if(!0===C.handleBackKeydown(t,r))return C.reportCodeBolckEdit(i),!0}else if(46==n){if(!0===C.handleDelKeydown(t,r))return C.reportCodeBolckEdit(i),!0}else if(32==n)this.fireEvent("saveScene")
else if(65==n&&(t.ctrlKey||t.metaKey)){if(!0===C.handleSelectAll(t,r,i))return!0}}),this.editor.addListener("keyup",function(e,t){var n=t.keyCode||t.which,r=this.selection.getRange(),i=C.getCodeBlockDom(r.startContainer)
if(i&&32==n){var a=B.findParentByTagName(r.startContainer,E.lineTagName,!0)
if(!a)return
var o=r.createBookmark(!0)
C.mergeCommentLine(a),r.moveToBookmark(o),C.highlightCurLine(a.firstChild,r),this.fireEvent("saveScene")}i&&C.scrollXIntoView()}),this.editor.addListener("blur",function(e){C._g.curSelectPre&&this.fireEvent("blurPre",C._g.curSelectPre),C._g.curSelectPre=null}),this.editor.addListener("blurPre",function(e,t,n){if(t=C.getCodeBlockDom(t)){var r=t.getAttribute(E.languageAttr)||""
if(r){for(var i=[],a=[],o=0,l=t.children.length;o<l;o++){var d=t.children[o]
i.push(d),a.push(d.textContent||"")}if((a=a.join("\n")).replace(/\n/g,"").replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")){var s=t.ownerDocument,c=L.highlightStr(a,r,s,!1),g=s.createElement(E.codeBlockTagName)
g.innerHTML=c.result.value
for(var h=[],m=0,f=g.children.length;m<f;m++)h.push(g.children[m])
n||this.fireEvent("saveScene"),C.updateLine(i,h),n||this.fireEvent("saveScene")}}}})},handleSelectAll:function(e,t,n){var r=n.firstChild,i=n.lastChild
if(r&&i&&r.nodeName.toLowerCase()===i.nodeName.toLowerCase()&&r.nodeName.toLowerCase()===E.lineTagName){var a=r.firstChild?r.firstChild.firstChild:null,o=i.lastChild?i.lastChild.lastChild:null
if(a&&o)return t.setStartBefore(a),t.setEndAfter(o),t.select(),B.preventDefault(e),!0}},handleUpKeydown:function(e,t,n){var r=this.editor.getUeditor(),i=B.findParentByTagName(t.startContainer,E.lineTagName,!0)
if(i&&!i.previousSibling&&!n.previousSibling){r.fireEvent("saveScene")
var a=n.ownerDocument.createElement("p")
a.innerHTML=o.ie&&o.ie11below?B.fillChar:"<br>",n.parentNode.insertBefore(a,n),t.selectNodeContents(a).collapse(!0).select(),r.fireEvent("saveScene"),B.preventDefault(e)}},handleDownKeydown:function(e,t,n){var r=this.editor.getUeditor(),i=B.findParentByTagName(t.startContainer,E.lineTagName,!0)
if(i&&!i.nextSibling&&!n.nextSibling){r.fireEvent("saveScene")
var a=n.ownerDocument.createElement("p")
a.innerHTML=o.ie&&o.ie11below?B.fillChar:"<br>",n.parentNode.appendChild(a),t.selectNodeContents(a).collapse(!0).select(),r.fireEvent("saveScene"),B.preventDefault(e)}},handleBackKeydown:function(e,t){var n=this.editor.getUeditor(),r=!1
if(t.collapsed){var i=B.findParentByTagName(t.startContainer,E.lineTagName,!0)
if(!i)return
var a=t.createBookmark(),o=i.textContent
t.moveToBookmark(a)
var l=i.parentNode
if(1===l.childNodes.length&&!o.replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")){var d=l.previousSibling
return d?(n.fireEvent("saveScene"),t.selectNodeContents(d).collapse(!1).select(),B.preventDefault(e),n.fireEvent("saveScene")):this.handleUpKeydown(e,t,l),l.parentNode.removeChild(l),r=!0}var s=B.createBookmarkNode(n.document,Math.random()),c=n.document.createElement(E.codeBlockTagName)
c.innerHTML=E.getCodeLineStr(B.fillChar+s.outerHTML)
var g=c.firstChild,h={id:s.id,start:s.id},m=new RegExp("[^"+B.fillChar+"]["+B.fillChar+"]*"+B.bookmarkFillChar,"m"),f=void 0,u="##__insertcode_tmp_char__##"
m.test(o)?(n.fireEvent("saveScene"),i.innerHTML=o.replace(m,u).html(!0).replace(u,g.innerHTML),t.moveToBookmark(h),this.resetLanguage(t.startContainer),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0):(f=i.previousSibling)&&(n.fireEvent("saveScene"),o=f.textContent+"\n"+o,f.parentNode.removeChild(f),i.innerHTML=o.replace(m,u).html(!0).replace(u,g.innerHTML),t.moveToBookmark(h),this.resetLanguage(t.startContainer),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0)}else n.fireEvent("saveScene"),this.deleteRangeContents(t),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0
if(r)return B.preventDefault(e),!0},handleDelKeydown:function(e,t){var n=this.editor.getUeditor(),r=!1
if(t.collapsed){var i=t.createBookmark(),a=B.findParentByTagName(t.startContainer,E.lineTagName,!0)
if(!a)return
var o=a.textContent
t.moveToBookmark(i)
var l=B.createBookmarkNode(n.document,Math.random()),d=n.document.createElement(E.codeBlockTagName)
d.innerHTML=E.getCodeLineStr(l.outerHTML+B.fillChar)
var s=d.firstChild,c={id:l.id,start:l.id},g=new RegExp(B.bookmarkFillChar+"["+B.fillChar+"]*[^"+B.fillChar+"]","m"),h=void 0,m="##__insertcode_tmp_char__##"
g.test(o)?(n.fireEvent("saveScene"),a.innerHTML=o.replace(g,m).html(!0).replace(m,s.innerHTML),t.moveToBookmark(c),this.resetLanguage(t.startContainer),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0):(h=a.nextSibling)&&(n.fireEvent("saveScene"),o=o+"\n"+h.textContent,h.parentNode.removeChild(h),a.innerHTML=o.replace(g,m).html(!0).replace(m,s.innerHTML),t.moveToBookmark(c),this.resetLanguage(t.startContainer),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0),r=!0}else n.fireEvent("saveScene"),this.deleteRangeContents(t),this.highlightCurLine(t.startContainer,t),n.fireEvent("saveScene"),r=!0
if(r)return B.preventDefault(e),!0},parseHtml2String:function(e){var r=""
if(!e)return r
var t=this.editor.getUeditor()
return e=e.replace(/\r/g,"").replace(/\t/g,E.tabSize),v.each(UE.filterNode(UE.htmlparser(e),t.options.filterTxtRules).children,function(e){var t=""
t="element"==e.type?i.$empty[e.tagName]?"":(t=e.innerHTML().replace(/<br[^>]*>/g,"\n").text(),m.html(t,!1)):m.html(e.data,!1),r+=t
var n=e.nextSibling()
n&&"element"==n.type&&(i.$block2[n.tagName]||"br"===n.tagName)&&(r+="\n")}),r},scrollXIntoView:function(){this._g.scrollXId&&clearTimeout(this._g.scrollXId)
var s=this
this._g.scrollXId=setTimeout(function(){var e=null,t=s.editor.getUeditor().selection.getRange(),n=s.getCodeBlockDom(t.startContainer)
if(n&&t.collapsed){var r=B.findParentByTagName(t.startContainer,E.lineTagName,!0)
if(r&&r.firstChild){var i=$(r.firstChild.lastElementChild)
if(0<n.scrollLeft||0<i.length&&i.offset().left+i.width()>$(n).width()){var a=t.createBookmark()
a.start.style.display="",e=a.start.getBoundingClientRect().left-r.getBoundingClientRect().left-n.getBoundingClientRect().left,t.moveToBookmark(a)}}}if(null!==e){var o=n.scrollLeft,l=n.scrollLeft+$(n).width(),d=Math.max(e-20,0)
s._g.canScrollX&&n&&B.inDoc(n,n.ownerDocument)&&!(o<e&&e<l)&&d!==n.scrollLeft&&(s._g.canScrollX=!1,$(n).animate({scrollLeft:d},null,null,function(){s._g.canScrollX=!0}))}},100)},insertTabByCollapseRange:function(e){var t=this,n=e.document.createTextNode(E.tabSize)
e.insertNode(n).setStartAfter(n).collapse(!1),B.findParent(n,function(e){if(t.isCommentNode(e))return!0})?e.select():this.highlightCurLine(n,e)},deletePreTab:function(e){for(var t=e.ownerDocument.createTreeWalker(e,window.NodeFilter.SHOW_TEXT,{acceptNode:function(e){return e.nodeValue&&0<e.nodeValue.replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"").length?window.NodeFilter.FILTER_ACCEPT:window.NodeFilter.FILTER_REJECT}},!1),n=[],r=new RegExp("^["+B.fillChar+"]* ["+B.fillChar+"]*"),i=0;t.nextNode()&&i<2;){for(var a=t.currentNode.nodeValue;r.test(a)&&i<2;)a=a.replace(r,""),i++
if(a!==t.currentNode.nodeValue&&n.push({node:t.currentNode,text:a}),0===n.length)break}for(var o=[],l=0,d=n.length;l<d;l++){var s=n[l]
if(s.node&&s.node.parentNode){var c=s.node.ownerDocument.createTextNode(s.text),g=s.node.parentNode
g.insertBefore(c,s.node),g.removeChild(s.node),o.push(c)}}return o},getLineByRang:function(e){var t=[],n=B.findParentByTagName(e.startContainer,E.lineTagName,!0),r=B.findParentByTagName(e.endContainer,E.lineTagName,!0)
if(!n||!r)return t
if(t.push(n),n===r)return t
for(var i=n;(i=i.nextSibling)&&1===i.nodeType&&i!==r;)t.push(i)
return t.push(r),t},highlightCurLine:function(e,t){var n={result:{language:"",relevance:0}}
if(!e)return n
var r=B.findParentByTagName(e,E.lineTagName,!0)
if(!r)return n
var i=this.getCodeBlockDom(r)
if(!i)return n
if(r.textContent){var a=!1
if(t){var o=B.findParentByTagName(t.startContainer,E.lineTagName,!0),l=B.findParentByTagName(t.endContainer,E.lineTagName,!0)
o===r&&l===r&&(a=!0)}var d=void 0
a&&(d=t.createBookmark())
var s=this.getCommentSibling(r,!0,!0),c=this.editor.getUeditor().document,g=i.getAttribute(E.languageAttr)||"";(n=L.highlightStr(s.nodeText,g,c,a)).result.language&&!g&&i.setAttribute(E.languageAttr,n.result.language)
var h=c.createElement(E.codeBlockTagName)
h.innerHTML=n.result.value
for(var m=[],f=0,u=h.children.length;f<u;f++)m.push(h.children[f])
var v=m[s.pre.length],C=this.getFirstElementChild(v),p=v.textContent.replace(B.fillCharReg,"")
if(a&&!p&&(!n.bookmark||!n.bookmark.startid)){var N=B.createBookmarkNode(c,Math.random())
C.appendChild(N),C.appendChild(c.createTextNode(B.fillChar)),d.id=N.id,d.start=N.id}return this.updateLine(s.nodeList,m),a&&(!d.id&&n.bookmark&&n.bookmark.startid&&(d.id=n.bookmark.startid,d.start=n.bookmark.startid),!d.id&&n.bookmark&&n.bookmark.endid&&(d.end=n.bookmark.endid),t.moveToBookmark(d).select()),n}},updateLine:function(e,t){if(e&&t&&e.length===t.length)for(var n=0,r=e.length;n<r;n++){var i=e[n],a=t[n]
i.innerHTML!==a.innerHTML&&(i.parentNode.insertBefore(a,i),i.parentNode.removeChild(i))}},getCommentSibling:function(e,t,n){var r={cur:e,pre:[],next:[],nodeText:"",nodeList:[]}
if(!e||e.nodeName.toLowerCase()!==E.lineTagName)return r
for(var i=e;i=i.previousSibling;){var a=i.firstChild
if(!(a&&a.children&&1===a.children.length&&this.isCommentNode(a.children[0])))break
r.pre.push(i),(n||t)&&r.nodeList.push(i)}for((n||t)&&(r.nodeList.reverse(),r.nodeList.push(e)),i=e;i=i.nextSibling;){var o=i.firstChild
if(!(o&&o.children&&1===o.children.length&&this.isCommentNode(o.children[0])))break
r.next.push(i),(n||t)&&r.nodeList.push(i)}if(t){for(var l=[],d=0,s=r.nodeList.length;d<s;d++){var c=r.nodeList[d]
l.push(c.textContent||"")}r.nodeText=l.join("\n")}return r},insertHighlight2Range:function(e,t,n){if(e){var r=this.getCodeBlockDom(t.startContainer)
if(r){this.deleteRangeContents(t)
var i=r.getAttribute(E.languageAttr)||"",a=L.highlightStr(e,i,r.ownerDocument),o=a.result.value
a.result.language&&(i=a.result.language,r.setAttribute(E.languageAttr,a.result.language))
var l=B.findParentByTagName(t.startContainer,E.lineTagName,!0),d=this.getFirstElementChild(l)
if(l&&B.inDoc(l,l.ownerDocument)&&d){var s=this.editor.getUeditor(),c=this.createFragmentByStr(o,s.document),g=this.getFirstElementChild(c),h=this.getFirstElementChild(g),m=h.firstChild
m||(m=s.document.createTextNode(B.fillChar),h.appendChild(m))
var f=this.getLastElementChild(c),u=this.getLastElementChild(f),v=u.lastChild
v||(v=s.document.createTextNode(B.fillChar),u.appendChild(v))
var C=t.createBookmark(!1)
this.mergeFromeStart2End(C.start,d,h,"pre"),this.mergeFromeStart2End(C.end||C.start,d,u,"next")
var p=void 0,N=void 0,k=void 0
g!==f&&(u.insertBefore(B.createBookmarkNode(s.document,Math.random()),v.nextSibling),p=(N=L.highlightStr(f.textContent,i||"",s.document,!0)).bookmark,k=this.createFragmentByStr(N.result.value,s.document),c.appendChild(k),c.removeChild(f))
var T=void 0
return p&&p.startid||(T=B.createBookmarkNode(s.document,Math.random()),u.insertBefore(T,v.nextSibling)),(N=L.highlightStr(g.textContent,i||"",s.document,!!T)).bookmark&&N.bookmark.startid&&(p=N.bookmark),k=this.createFragmentByStr(N.result.value,s.document),c.insertBefore(k,g),c.removeChild(g),f=this.getLastElementChild(c),u=this.getLastElementChild(f),g=this.getFirstElementChild(c),l.parentNode.insertBefore(c,l),l.parentNode.removeChild(l),p&&(p.startid&&(p.id=p.startid,p.start=p.startid),p.endid&&(p.end=p.endid)),p&&p.start?t.moveToBookmark(p):t.selectNodeContents(u).collapse(!1),n||t.select(),g}}}},resetLanguage:function(e){(e=this.getCodeBlockDom(e))&&(e.textContent.replace(/\s/g,"").replace(B.fillCharReg,"").replace(B.bookmarkFillCharReg,"")||e.setAttribute(E.languageAttr,""))},deleteRangeContents:function(e){if(!e.collapsed){var t=e.createBookmark()
e.deleteContents()
var n=this.getCodeBlockDom(e.startContainer)
this.resetLanguage(n)
var r=void 0,i=void 0,a=void 0,o=void 0
t.start&&t.start.parentNode&&(r=B.findParentByTagName(t.start,E.lineTagName,!0))&&(i=this.getFirstElementChild(r)),t.end&&t.start.parentNode&&(a=B.findParentByTagName(t.end,E.lineTagName,!0))&&(o=this.getFirstElementChild(a))
var l=void 0,d=void 0,s=void 0;(r||a)&&(l=this.createFragmentByStr(E.getCodeLineStr(),e.document),d=this.getFirstElementChild(l),s=this.getFirstElementChild(d))
var c=void 0
if(r&&i){this.mergeFromeStart2End(t.start,i,s,"pre")
var g=B.createBookmarkNode(e.document,Math.random())
s.appendChild(g),c={start:g.id,end:null,id:g.id},a&&o&&this.mergeFromeStart2End(t.end,o,s,"next"),this.mergeCommentLine(d),r.parentNode.insertBefore(l,r)}else if(a&&o){this.mergeFromeStart2End(t.end,o,s,"next")
var h=B.createBookmarkNode(e.document,Math.random())
s.insertBefore(h,s.firstChild),c={start:h.id,end:null,id:h.id},this.mergeCommentLine(d),a.parentNode.insertBefore(l,a)}r&&r.parentNode&&r.parentNode.removeChild(r),a&&a.parentNode&&a.parentNode.removeChild(a),c&&e.moveToBookmark(c)}},isCommentNode:function(e){return!!(e&&"span"===e.nodeName.toLowerCase()&&0<=e.className.indexOf(E.classPrefix+"comment"))},mergeCommentLine:function(e){if(!e||e.nodeName.toLowerCase()!==E.lineTagName)return!1
if(!(e=e.firstChild)||e.nodeName.toLowerCase()!==E.lineContainTagName)return!1
if(e.childNodes.length<=1)return!1
var t=e.ownerDocument.createElement(E.lineTagName)
t.innerHTML=e.innerHTML
var n=!1,r=t.firstChild
do{if(this.isCommentNode(r))for(var i=r;i=i.nextSibling;)if(B.isBookmarkNode(i)||B.isFillChar(i))r.appendChild(i),i=r,n=!0
else{if(!this.isCommentNode(i))break
var a=this.createFragmentByStr(i.innerHTML)
r.appendChild(a),i.parentNode.removeChild(i),i=r,n=!0}}while(r=r.nextSibling)
return!!n&&(e.innerHTML=t.innerHTML,!0)},mergeFromeStart2End:function(e,t,n,r){var i=new RegExp("[^>]*(<\\/?(\\w+)\\s*(?:[^>]*)>)[^<]*","g"),a=new RegExp("<(\\w+)\\s*(?:[^>]*)>[^<]*<\\/\\1>","g"),o=t.innerHTML.split(e.outerHTML)
o[0]=(o[0]||"").replace(B.getBookmarkReg(),""),o[1]=(o[1]||"").replace(B.getBookmarkReg(),"")
var l=""
if("pre"===r)if(i.test(o[1])){for(o[1]=o[1].replace(i,"$1");a.test(o[1]);)o[1]=o[1].replace(a,"")
l=o[0]+o[1]}else l=o[0]
else if(i.test(o[0])){for(o[0]=o[0].replace(i,"$1");a.test(o[0]);)o[0]=o[0].replace(a,"")
l=o[0]+o[1]}else l=o[1]
var d=e.ownerDocument||document,s=d.createElement(E.codeBlockTagName)
s.innerHTML=l
for(var c=d.createDocumentFragment();s.firstChild;)c.appendChild(s.firstChild)
"pre"===r?n.insertBefore(c,n.firstChild):n.appendChild(c)},createFragmentByStr:function(e,t){e=e||""
var n=(t=t||document).createElement(E.codeBlockTagName)
n.innerHTML=e
for(var r=t.createDocumentFragment();n.firstChild;)r.appendChild(n.firstChild)
return r},getLastLineLastElement:function(e){var t=void 0
return t=(t=this.getLastElementChild(e))&&this.getLastElementChild(t)},getFirstLineFirstElement:function(e){var t=void 0
return t=(t=this.getFirstElementChild(e))&&this.getFirstElementChild(t)},getLastElementChild:function(e){if(!e||0===e.childNodes.length)return null
for(var t=void 0,n=e.childNodes,r=n.length-1;t=n[r--];)if(1===t.nodeType)return t
return null},getFirstElementChild:function(e){if(!e||0===e.childNodes.length)return null
for(var t=void 0,n=e.childNodes,r=0;t=n[r++];)if(1===t.nodeType)return t
return null},getCodeBlockDom:function(e){var t=void 0
return e?t=B.findParent(e,function(e){if(e&&e.nodeName.toLowerCase()===E.codeBlockTagName&&0<=e.className.indexOf(E.codeBlockClass))return!0},!0):t}})
n.exports=l})
define("3rd/editor/plugin/insertcode/shCore.js",["3rd/editor/plugin/insertcode/highlight.js","3rd/editor/plugin/insertcode/languageList.js","3rd/editor/plugin/insertcode/insertCodeUtils.js","3rd/editor/common/domUtils.js"],function(e,n,r){"use strict"
var l=e("3rd/editor/plugin/insertcode/highlight.js"),o=e("3rd/editor/plugin/insertcode/languageList.js"),s=e("3rd/editor/plugin/insertcode/insertCodeUtils.js"),m=e("3rd/editor/common/domUtils.js").domUtils,c="lang-"
function f(e){var n=e.node.ownerDocument,r=e.node.cloneNode(!0),o=r.splitText(e.pos+1),t=n.createDocumentFragment()
t.appendChild(r)
var d=m.createBookmarkNode(n,Math.random())
t.appendChild(d),t.appendChild(n.createTextNode(m.fillChar)),t.appendChild(o)
var a=e.node.parentNode
return a.insertBefore(t,e.node),a.removeChild(e.node),d}!function(){for(var e in o)l.registerLanguage(e,o[e])
l.configure({tabReplace:s.tabSize,classPrefix:s.classPrefix})}(),r.exports={highlightStr:function(e,n,r,o){var t=(r=r||document).createElement(s.codeBlockTagName)
n&&(t.className=c+n),e=e.replace(/\r/g,"").replace(m.fillCharReg,"").replace(/\t/g,s.tabSize)
var d=void 0
o&&(d=function(e){if(!e)return null
var n=new RegExp(m.bookmarkFillChar,"g"),r=[],o=void 0
for(;null!==(o=n.exec(e))&&r.length<2;)r.push(o.index)
return{startPos:void 0!==r[0]?r[0]:void 0,endPos:void 0!==r[1]?r[1]:void 0}}(e)),e=e.replace(m.bookmarkFillCharReg,""),t.textContent=e,l.highlightBlock(t)
var a={}
o&&d&&(a=function(e,n){var r=!0,o=!0
n&&(void 0!==n.startPos&&(r=!1),void 0!==n.endPos&&(o=!1))
if(r&&o)return
var t=e.ownerDocument.createTreeWalker(e,window.NodeFilter.SHOW_TEXT,{acceptNode:function(e){return e.nodeValue?window.NodeFilter.FILTER_ACCEPT:window.NodeFilter.FILTER_REJECT}},!1),d=0,a={start:{node:null},end:{node:null}}
for(;t.nextNode()&&(!r||!o);){var i=d+t.currentNode.nodeValue.length
!r&&d<=n.startPos&&n.startPos<=i&&(a.start.node=t.currentNode,a.start.pos=n.startPos-d-1,d+=1,i+=1,r=!0),!o&&d<=n.endPos&&n.endPos<=i&&(a.end.node=t.currentNode,a.end.pos=n.endPos-d-1,o=!0),d=i}var l=void 0,s=void 0
if(a.start.node&&a.start.node!==a.end.node)l=f(a.start),a.end.node&&(s=f(a.end))
else if(a.start.node&&a.start.node===a.end.node){var c=a.start.node.cloneNode(!0),u=c.splitText(a.start.pos+1),p=a.end.pos-c.nodeValue.length+1,g=void 0
p<=u.nodeValue.length&&(g=u.splitText(p)),l=m.createBookmarkNode(e.ownerDocument,Math.random()),s=m.createBookmarkNode(e.ownerDocument,Math.random())
var h=e.ownerDocument.createDocumentFragment()
h.appendChild(c),h.appendChild(l),h.appendChild(e.ownerDocument.createTextNode(m.fillChar)),h.appendChild(u),h.appendChild(s),g&&h.appendChild(g)
var v=_nodeInfo.node.parentNode
v.insertBefore(h,a.start.node),v.removeChild(a.start.node)}s&&(s.id=s.id.replace("start","end"))
return{startid:l?l.id:"",endid:s?s.id:""}}(t,d)),function(e){var d=e.ownerDocument||document,n="."+s.classPrefix+"comment",a=[]
$(e).find(n).each(function(){if(0<=this.innerHTML.indexOf("\n")){var e="</"+this.nodeName.toLowerCase()+">",n=this.cloneNode(!1).outerHTML.replace(e,""),r=this.innerHTML.replace(/\n/g,e+"\n"+n)
r=n+r+e
var o=d.createElement(s.codeBlockTagName)
o.innerHTML=r
for(var t=d.createDocumentFragment();o.firstChild;)t.appendChild(o.firstChild)
a.push([this,t])}})
for(var r=0,o=a.length;r<o;r++){var t=a[r]
t[0].parentNode&&(t[0].parentNode.insertBefore(t[1],t[0]),t[0].parentNode.removeChild(t[0]))}}(t)
var i=function(e){var n=e.innerHTML,r=new RegExp("\\n[\\s]*(<\\/[^>]*>)","g")
for(;r.test(n);)n=n.replace(r,"$1\n")
for(var o=n.split(/\n/),t=0,d=o.length;t<d;t++)o[t]=s.getCodeLineStr(o[t])
var a={language:"",relevance:0},i={language:e.result.language||"",relevance:e.result.relevance,value:o.join("")}
e.second_best&&(a.language=e.second_best.language,a.relevance=e.second_best.relevance)
return{result:i,second_best:a}}(t)
return i.bookmark=a,i}}})
define("3rd/editor/plugin/insertcode/highlight.js",[],function(e,n,t){"use strict"
function b(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function g(e){return e.nodeName.toLowerCase()}function h(e,n){var t=e&&e.exec(n)
return t&&0===t.index}function l(e){return m.test(e)}function a(e){var n,t={},a=Array.prototype.slice.call(arguments,1)
for(n in e)t[n]=e[n]
return a.forEach(function(e){for(n in e)t[n]=e[n]}),t}function c(e){var r=[]
return function e(n,t){for(var a=n.firstChild;a;a=a.nextSibling)3===a.nodeType?t+=a.nodeValue.length:1===a.nodeType&&(r.push({event:"start",offset:t,node:a}),t=e(a,t),g(a).match(/br|hr|img|input/)||r.push({event:"stop",offset:t,node:a}))
return t}(e,0),r}function u(n){return n.variants&&!n.cached_variants&&(n.cached_variants=n.variants.map(function(e){return a(n,{variants:null},e)})),n.cached_variants||n.endsWithParent&&[a(n)]||[n]}function _(s){function o(e){return e&&e.source||e}function l(e,n){return new RegExp(o(e),"m"+(s.case_insensitive?"i":"")+(n?"g":""))}!function n(t,e){if(t.compiled)return
t.compiled=!0
t.keywords=t.keywords||t.beginKeywords
if(t.keywords){var a={},r=function(t,e){s.case_insensitive&&(e=e.toLowerCase()),e.split(" ").forEach(function(e){var n=e.split("|")
a[n[0]]=[t,n[1]?Number(n[1]):1]})}
"string"==typeof t.keywords?r("keyword",t.keywords):E(t.keywords).forEach(function(e){r(e,t.keywords[e])}),t.keywords=a}t.lexemesRe=l(t.lexemes||/\w+/,!0)
e&&(t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")\\b"),t.begin||(t.begin=/\B|\b/),t.beginRe=l(t.begin),t.endSameAsBegin&&(t.end=t.begin),t.end||t.endsWithParent||(t.end=/\B|\b/),t.end&&(t.endRe=l(t.end)),t.terminator_end=o(t.end)||"",t.endsWithParent&&e.terminator_end&&(t.terminator_end+=(t.end?"|":"")+e.terminator_end))
t.illegal&&(t.illegalRe=l(t.illegal))
null==t.relevance&&(t.relevance=1)
t.contains||(t.contains=[])
t.contains=Array.prototype.concat.apply([],t.contains.map(function(e){return u("self"===e?t:e)}))
t.contains.forEach(function(e){n(e,t)})
t.starts&&n(t.starts,e)
var i=t.contains.map(function(e){return e.beginKeywords?"\\.?("+e.begin+")\\.?":e.begin}).concat([t.terminator_end,t.illegal]).map(o).filter(Boolean)
t.terminators=i.length?l(i.join("|"),!0):{exec:function(){return null}}}(s)}function R(e,n,i,t){function o(e,n,t,a){var r=a?"":S.classPrefix,i='<span class="'+r,s=t?"":O
return(i+=e+'">')+n+s}function s(){f+=null!=u.subLanguage?function(){var e="string"==typeof u.subLanguage
if(e&&!x[u.subLanguage])return b(d)
var n=e?R(u.subLanguage,d,!0,g[u.subLanguage]):N(d,u.subLanguage.length?u.subLanguage:void 0)
0<u.relevance&&(E+=n.relevance)
e&&(g[u.subLanguage]=n.top)
return o(n.language,n.value,!1,!0)}():function(){var e,n,t,a
if(!u.keywords)return b(d)
a="",n=0,u.lexemesRe.lastIndex=0,t=u.lexemesRe.exec(d)
for(;t;)a+=b(d.substring(n,t.index)),r=u,i=t,void 0,s=c.case_insensitive?i[0].toLowerCase():i[0],(e=r.keywords.hasOwnProperty(s)&&r.keywords[s])?(E+=e[1],a+=o(e[0],b(t[0]))):a+=b(t[0]),n=u.lexemesRe.lastIndex,t=u.lexemesRe.exec(d)
var r,i,s
return a+b(d.substr(n))}(),d=""}function l(e){f+=e.className?o(e.className,"",!0):"",u=Object.create(e,{parent:{value:u}})}function a(e,n){if(d+=e,null==n)return s(),0
var t=function(e,n){var t,a
for(t=0,a=n.contains.length;t<a;t++)if(h(n.contains[t].beginRe,e))return n.contains[t].endSameAsBegin&&(n.contains[t].endRe=(r=n.contains[t].beginRe.exec(e)[0],new RegExp(r.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m"))),n.contains[t]
var r}(n,u)
if(t)return t.skip?d+=n:(t.excludeBegin&&(d+=n),s(),t.returnBegin||t.excludeBegin||(d=n)),l(t),t.returnBegin?0:n.length
var a=function e(n,t){if(h(n.endRe,t)){for(;n.endsParent&&n.parent;)n=n.parent
return n}if(n.endsWithParent)return e(n.parent,t)}(u,n)
if(a){var r=u
for(r.skip?d+=n:(r.returnEnd||r.excludeEnd||(d+=n),s(),r.excludeEnd&&(d=n));u.className&&(f+=O),u.skip||u.subLanguage||(E+=u.relevance),(u=u.parent)!==a.parent;);return a.starts&&(a.endSameAsBegin&&(a.starts.endRe=a.endRe),l(a.starts)),r.returnEnd?0:n.length}if(function(e,n){return!i&&h(n.illegalRe,e)}(n,u))throw new Error('Illegal lexeme "'+n+'" for mode "'+(u.className||"<unnamed>")+'"')
return d+=n,n.length||1}var c=M(e)
if(!c)throw new Error('Unknown language: "'+e+'"')
_(c)
var r,u=t||c,g={},f=""
for(r=u;r!==c;r=r.parent)r.className&&(f=o(r.className,"",!0)+f)
var d="",E=0
try{for(var v,m,p=0;u.terminators.lastIndex=p,v=u.terminators.exec(n);)m=a(n.substring(p,v.index),v[0]),p=v.index+m
for(a(n.substr(p)),r=u;r.parent;r=r.parent)r.className&&(f+=O)
return{relevance:E,value:f,language:e,top:u}}catch(e){if(e.message&&-1!==e.message.indexOf("Illegal"))return{relevance:0,value:b(n)}
throw e}}function N(t,e){e=e||S.languages||E(x)
var a={relevance:0,value:b(t)},r=a
return e.filter(M).filter(s).forEach(function(e){var n=R(e,t,!1)
n.language=e,n.relevance>r.relevance&&(r=n),n.relevance>a.relevance&&(r=a,a=n)}),r.language&&(a.second_best=r),a}function f(e){return S.tabReplace||S.useBR?e.replace(w,function(e,n){return S.useBR&&"\n"===e?"<br>":S.tabReplace?n.replace(/\t/g,S.tabReplace):""}):e}function r(e,n){var t,a,r,i,s,o=function(e){var n,t,a,r,i=e.className+" "
if(i+=e.parentNode?e.parentNode.className:"",t=p.exec(i))return M(t[1])?t[1]:"no-highlight"
for(i=i.split(/\s+/),n=0,a=i.length;n<a;n++)if(l(r=i[n])||M(r))return r}(e)
l(o)||(s=(t=e).textContent,r=o?R(o,s,!0):N(s),(a=c(t)).length&&((i=document.createElementNS("http://www.w3.org/1999/xhtml","div")).innerHTML=r.value,r.value=function(e,n,t){var a=0,r="",i=[]
function s(){return e.length&&n.length?e[0].offset!==n[0].offset?e[0].offset<n[0].offset?e:n:"start"===n[0].event?e:n:e.length?e:n}function o(e){function n(e){return" "+e.nodeName+'="'+b(e.value).replace('"',"&quot;")+'"'}r+="<"+g(e)+d.map.call(e.attributes,n).join("")+">"}function l(e){r+="</"+g(e)+">"}function c(e){("start"===e.event?o:l)(e.node)}for(;e.length||n.length;){var u=s()
if(r+=b(t.substring(a,u[0].offset)),a=u[0].offset,u===e){for(i.reverse().forEach(l);c(u.splice(0,1)[0]),(u=s())===e&&u.length&&u[0].offset===a;);i.reverse().forEach(o)}else"start"===u[0].event?i.push(u[0].node):i.pop(),c(u.splice(0,1)[0])}return r+b(t.substr(a))}(a,c(i),s)),r.value=f(r.value),e.innerHTML=r.value,n&&(e.className=n(e.className,o,r.language)),e.result={language:r.language,re:r.relevance},r.second_best&&(e.second_best={language:r.second_best.language,re:r.second_best.relevance}))}function i(){if(!i.called){i.called=!0
var e=document.querySelectorAll("pre code")
d.forEach.call(e,r)}}function M(e){return e=(e||"").toLowerCase(),x[e]||x[v[e]]}function s(e){var n=M(e)
return n&&!n.disableAutodetect}var o,d,E,x,v,m,p,w,O,S
t.exports=(o={},d=[],E=Object.keys,x={},v={},m=/^(no-?highlight|plain|text)$/i,p=/\blang(?:uage)?-([\w-]+)\b/i,w=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,S={classPrefix:"hljs-",tabReplace:null,useBR:!(O="</span>"),languages:void 0},o.highlight=R,o.highlightAuto=N,o.fixMarkup=f,o.highlightBlock=r,o.configure=function(e){S=a(S,e)},o.initHighlighting=i,o.initHighlightingOnLoad=function(){addEventListener("DOMContentLoaded",i,!1),addEventListener("load",i,!1)},o.registerLanguage=function(n,e){var t=x[n]=e(o)
t.aliases&&t.aliases.forEach(function(e){v[e]=n})},o.listLanguages=function(){return E(x)},o.getLanguage=M,o.autoDetection=s,o.inherit=a,o.IDENT_RE="[a-zA-Z]\\w*",o.UNDERSCORE_IDENT_RE="[a-zA-Z_]\\w*",o.NUMBER_RE="\\b\\d+(\\.\\d+)?",o.C_NUMBER_RE="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",o.BINARY_NUMBER_RE="\\b(0b[01]+)",o.RE_STARTERS_RE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",o.BACKSLASH_ESCAPE={begin:"\\\\[\\s\\S]",relevance:0},o.APOS_STRING_MODE={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[o.BACKSLASH_ESCAPE]},o.QUOTE_STRING_MODE={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[o.BACKSLASH_ESCAPE]},o.PHRASAL_WORDS_MODE={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},o.COMMENT=function(e,n,t){var a=o.inherit({className:"comment",begin:e,end:n,contains:[]},t||{})
return a.contains.push(o.PHRASAL_WORDS_MODE),a.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0}),a},o.C_LINE_COMMENT_MODE=o.COMMENT("//","$"),o.C_BLOCK_COMMENT_MODE=o.COMMENT("/\\*","\\*/"),o.HASH_COMMENT_MODE=o.COMMENT("#","$"),o.NUMBER_MODE={className:"number",begin:o.NUMBER_RE,relevance:0},o.C_NUMBER_MODE={className:"number",begin:o.C_NUMBER_RE,relevance:0},o.BINARY_NUMBER_MODE={className:"number",begin:o.BINARY_NUMBER_RE,relevance:0},o.CSS_NUMBER_MODE={className:"number",begin:o.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},o.REGEXP_MODE={className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[o.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[o.BACKSLASH_ESCAPE]}]},o.TITLE_MODE={className:"title",begin:o.IDENT_RE,relevance:0},o.UNDERSCORE_TITLE_MODE={className:"title",begin:o.UNDERSCORE_IDENT_RE,relevance:0},o.METHOD_GUARD={begin:"\\.\\s*"+o.UNDERSCORE_IDENT_RE,relevance:0},o)})
define("3rd/editor/plugin/insertcode/languageList.js",["3rd/editor/plugin/insertcode/languages/javascript.js","3rd/editor/plugin/insertcode/languages/apache.js","3rd/editor/plugin/insertcode/languages/bash.js","3rd/editor/plugin/insertcode/languages/shell.js","3rd/editor/plugin/insertcode/languages/cs.js","3rd/editor/plugin/insertcode/languages/cpp.js","3rd/editor/plugin/insertcode/languages/css.js","3rd/editor/plugin/insertcode/languages/typescript.js","3rd/editor/plugin/insertcode/languages/diff.js","3rd/editor/plugin/insertcode/languages/xml.js","3rd/editor/plugin/insertcode/languages/http.js","3rd/editor/plugin/insertcode/languages/ini.js","3rd/editor/plugin/insertcode/languages/json.js","3rd/editor/plugin/insertcode/languages/java.js","3rd/editor/plugin/insertcode/languages/makefile.js","3rd/editor/plugin/insertcode/languages/markdown.js","3rd/editor/plugin/insertcode/languages/nginx.js","3rd/editor/plugin/insertcode/languages/objectivec.js","3rd/editor/plugin/insertcode/languages/php.js","3rd/editor/plugin/insertcode/languages/perl.js","3rd/editor/plugin/insertcode/languages/properties.js","3rd/editor/plugin/insertcode/languages/python.js","3rd/editor/plugin/insertcode/languages/ruby.js","3rd/editor/plugin/insertcode/languages/sql.js","3rd/editor/plugin/insertcode/languages/powershell.js","3rd/editor/plugin/insertcode/languages/swift.js","3rd/editor/plugin/insertcode/languages/kotlin.js","3rd/editor/plugin/insertcode/languages/go.js"],function(e,s,i){"use strict"
var r=e("3rd/editor/plugin/insertcode/languages/javascript.js"),n=e("3rd/editor/plugin/insertcode/languages/apache.js"),d=e("3rd/editor/plugin/insertcode/languages/bash.js"),g=e("3rd/editor/plugin/insertcode/languages/shell.js"),t=e("3rd/editor/plugin/insertcode/languages/cs.js"),a=e("3rd/editor/plugin/insertcode/languages/cpp.js"),l=e("3rd/editor/plugin/insertcode/languages/css.js"),o=e("3rd/editor/plugin/insertcode/languages/typescript.js"),u=e("3rd/editor/plugin/insertcode/languages/diff.js"),p=e("3rd/editor/plugin/insertcode/languages/xml.js"),c=e("3rd/editor/plugin/insertcode/languages/http.js"),j=e("3rd/editor/plugin/insertcode/languages/ini.js"),h=e("3rd/editor/plugin/insertcode/languages/json.js"),f=e("3rd/editor/plugin/insertcode/languages/java.js"),v=e("3rd/editor/plugin/insertcode/languages/makefile.js"),b=e("3rd/editor/plugin/insertcode/languages/markdown.js"),k=e("3rd/editor/plugin/insertcode/languages/nginx.js"),m=e("3rd/editor/plugin/insertcode/languages/objectivec.js"),w=e("3rd/editor/plugin/insertcode/languages/php.js"),y=e("3rd/editor/plugin/insertcode/languages/perl.js"),x=e("3rd/editor/plugin/insertcode/languages/properties.js"),q=e("3rd/editor/plugin/insertcode/languages/python.js"),L=e("3rd/editor/plugin/insertcode/languages/ruby.js"),z=e("3rd/editor/plugin/insertcode/languages/sql.js"),A=e("3rd/editor/plugin/insertcode/languages/powershell.js"),B=e("3rd/editor/plugin/insertcode/languages/swift.js"),C=e("3rd/editor/plugin/insertcode/languages/kotlin.js"),D=e("3rd/editor/plugin/insertcode/languages/go.js")
i.exports={javascript:r,apache:n,bash:d,shell:g,cs:t,cpp:a,css:l,typescript:o,diff:u,xml:p,http:c,ini:j,json:h,java:f,makefile:v,markdown:b,nginx:k,objectivec:m,php:w,perl:y,properties:x,python:q,ruby:L,sql:z,powershell:A,swift:B,kotlin:C,go:D}})
define("3rd/editor/plugin/insertcode/languages/javascript.js",[],function(e,n,a){"use strict"
a.exports=function(e){var n="[A-Za-z$_][0-9A-Za-z$_]*",a={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},r={className:"number",variants:[{begin:"\\b(0[bB][01]+)"},{begin:"\\b(0[oO][0-7]+)"},{begin:e.C_NUMBER_RE}],relevance:0},s={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},i={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,s]}
s.contains=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,i,r,e.REGEXP_MODE]
var t=s.contains.concat([e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE])
return{aliases:["js","jsx"],keywords:a,contains:[{className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},{className:"meta",begin:/^#!/,end:/$/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,i,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,r,{begin:/[{,]\s*/,relevance:0,contains:[{begin:n+"\\s*:",returnBegin:!0,relevance:0,contains:[{className:"attr",begin:n,relevance:0}]}]},{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.REGEXP_MODE,{className:"function",begin:"(\\(.*?\\)|"+n+")\\s*=>",returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:n},{begin:/\(\s*\)/},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:t}]}]},{begin:/</,end:/(\/\w+|\w+\/)>/,subLanguage:"xml",contains:[{begin:/<\w+\s*\/>/,skip:!0},{begin:/<\w+/,end:/(\/\w+|\w+\/)>/,skip:!0,contains:[{begin:/<\w+\s*\/>/,skip:!0},"self"]}]}],relevance:0},{className:"function",beginKeywords:"function",end:/\{/,excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:n}),{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,contains:t}],illegal:/\[|%/},{begin:/\$[(.]/},e.METHOD_GUARD,{className:"class",beginKeywords:"class",end:/[{;=]/,excludeEnd:!0,illegal:/[:"\[\]]/,contains:[{beginKeywords:"extends"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"constructor",end:/\{/,excludeEnd:!0}],illegal:/#(?!!)/}}})
define("3rd/editor/plugin/insertcode/languages/apache.js",[],function(e,n,a){"use strict"
a.exports=function(e){var n={className:"number",begin:"[\\$%]\\d+"}
return{aliases:["apacheconf"],case_insensitive:!0,contains:[e.HASH_COMMENT_MODE,{className:"section",begin:"</?",end:">"},{className:"attribute",begin:/\w+/,relevance:0,keywords:{nomarkup:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{end:/$/,relevance:0,keywords:{literal:"on off all"},contains:[{className:"meta",begin:"\\s\\[",end:"\\]$"},{className:"variable",begin:"[\\$%]\\{",end:"\\}",contains:["self",n]},n,e.QUOTE_STRING_MODE]}}],illegal:/\S/}}})
