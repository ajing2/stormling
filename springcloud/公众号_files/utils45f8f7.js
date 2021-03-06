"use strict"
define("3rd/editor/common/no_editable.js",["3rd/editor/common/browser.js","3rd/editor/common/domUtils.js"],function(e,t,n){function l(e){var t=0<arguments.length&&void 0!==e?e:{}
t.container&&$(t.container).find("."+y.selectedClass+"."+y.className).removeClass(y.selectedClass)}function d(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.node){var n=[]
"[object Array]"!==Object.prototype.toString.call(t.node)?n.push(t.node):n=t.node,t.removeStatus&&n[0]&&n[0].ownerDocument&&n[0].ownerDocument.body&&l({container:n[0].ownerDocument.body})
for(var o=0,a=n.length;o<a;o++){var s=n[o]
s.getAttribute&&!s.getAttribute(y.noSelectAttr)&&2===v.isContentEditable({node:s,checkParent:!1})&&($(s).addClass(y.selectedClass),t.changeRange&&t.ueditor&&o===a-1&&t.ueditor.selection.getRange().selectNode(s).select())}}}var E=e("3rd/editor/common/browser.js").browser,c=e("3rd/editor/common/domUtils.js"),v=c.domUtils,y={className:"js_uneditable",parentClass:c.uneditableParentClass,pluginParentClass:c.pluginParentClass,cusPluginParentClassAttr:"data-parentclass",mouseoverClass:"js_uneditablemouseover",noSelectAttr:"uneditableonoselect",selectedClass:"custom_select_card_selected",noDefaultSelectedClass:"custom_select_card",eventType:["click","keydown"],docEventType:["copy","selectionchange"],event:{},asyncDef:{},uneditableInRange:!1}
y.event.clickEvent=function(e,t){var n=t.srcElement||t.target,o=f({dom:n})
if(!o&&y.uneditableInRange||l({container:this.body}),d({node:o,changeRange:!0,ueditor:this,removeStatus:!1}),this.fireEvent("noEditableClick",{unEditableDom:o,target:n,uneditableInRange:y.uneditableInRange,e:t}),y.uneditableInRange=!1,o)return v.preventDefault(t),!0},y.event.keydownEvent=function(e,t){var n=t.keyCode||t.which
if(8==n||46==n||13===n){var o=this.selection.getRange()
if(o.collapsed)return
var a,s=null
if((s=3===o.startContainer.nodeType?o.startContainer:o.startContainer.childNodes[o.startOffset])&&"br"===s.nodeName.toLowerCase()&&(s=s.nextSibling),!(a=f({dom:s})))return
var r,i=null
if(i=3===o.endContainer.nodeType?o.endContainer:o.endContainer.childNodes[o.endOffset-1],!(r=f({dom:i}))||r!==a)return
if(this.fireEvent("saveScene"),8==n||46==n){var l=a.parentNode
if(o.selectNode(a).deleteContents(),l&&"body"===l.nodeName.toLowerCase()){var d=o.document.createElement("p")
d.innerHTML="<br>",o.insertNode(d),o.selectNodeContents(d).collapse(!0)}else l&&!l.firstChild&&v.isBlockElm(l)&&(l.innerHTML="<br>"),v.removePluginDefaultClass({node:l})
o.select(),this.fireEvent("noeditableDel",{dom:a,e:t})}else if(13===n){var c=v.findParent(a,function(e){return!(v.isBody(e)||!v.isBlockElm(e))},!1)
c?o.selectNode(c).collapse(!1).select():o.selectNode(a).collapse(!1).select()
var u=this.execCommand("inserthtml","<p><br></p>")
u&&u[0]&&o.selectNodeContents(u[0]).collapse(!0).select()}return v.preventDefault(t),!0}},y.asyncDef.copyEvent=function(){var o=(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}).ueditor
y.event.copyEvent=function(e){var t=o.selection.getRange(),n=null
!t.collapsed&&t.startContainer===t.endContainer&&t.startOffset===t.endOffset-1&&(n=t.startContainer.childNodes[t.startOffset])&&v.isUneditablePluginNode({node:n})&&e.originalEvent.clipboardData&&"function"==typeof e.originalEvent.clipboardData.setData&&(e.originalEvent.clipboardData.setData("text/html",n.outerHTML),e.preventDefault())}},y.asyncDef.selectionchangeEvent=function(){var i=(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}).ueditor
y.event.selectionchangeEvent=function(e){var t=i.selection.getRange()
if(y.uneditableInRange=!1,t.collapsed)return l({container:i.body}),!0
var n=i.selection.getRange().getRangeDom()
if(n&&0<n.length){for(var o=[],a=0,s=n.length;a<s;a++){var r=n[a]
2===v.isContentEditable({node:r,checkParent:!1})&&o.push(r)}0<o.length&&(y.uneditableInRange=!0,d({node:o,changeRange:!1,removeStatus:!0}))}}}
function s(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.editor){var n=new RegExp("class=['\"][^'\"]*"+y.className+"[^'\"]*['\"]"),o=new RegExp("class=['\"][^'\"]*"+y.mouseoverClass+"[^'\"]*['\"]"),a=t.editor.getUeditor(),s=a.body.innerHTML||""
if(n.test(s)){for(var r=0,i=y.eventType.length;r<i;r++){var l=y.eventType[r]
t.editor.removeListener(l,y.event[l+"Event"]),t.editor.addListener(l,y.event[l+"Event"])}for(var d=0,c=y.docEventType.length;d<c;d++){var u=y.docEventType[d],v=u+"Event"
"function"==typeof y.event[v]&&$(a.document).off(u,y.event[v]),"function"==typeof y.asyncDef[v]&&y.asyncDef[v]({ueditor:a}),"function"==typeof y.event[v]&&$(a.document).on(u,y.event[v])}}else if(!n.test(s)){for(var f=0,m=y.eventType.length;f<m;f++){var g=y.eventType[f]
t.editor.removeListener(g,y.event[g+"Event"])}for(var p=0,C=y.docEventType.length;p<C;p++){var h=y.docEventType[p],b=h+"Event"
"function"==typeof y.event[b]&&$(a.document).off(h,y.event[b])}}o.test(s)?($(a.body).off("mouseover mouseout","."+y.mouseoverClass).on("mouseover","."+y.mouseoverClass,function(e){a.fireEvent("noEditableMouseover",{target:this,e:e})}).on("mouseout","."+y.mouseoverClass,function(e){a.fireEvent("noEditableMouseout",{target:this,e:e})}),E.safari&&$(a.iframe).off("mouseout").on("mouseout",function(e){a.fireEvent("noEditableMouseout",{target:null,e:e})})):($(a.body).off("mouseover mouseout","."+y.mouseoverClass),E.safari&&$(a.iframe).off("mouseout"))}}var f=function(e){var t=null,n=(0<arguments.length&&void 0!==e?e:{}).dom
for(n&&3===n.nodeType&&(n=n.parentElement);n&&n.nodeName&&"body"!==n.nodeName.toLocaleLowerCase();){if(n.getAttribute&&0<=(n.getAttribute("class")||"").indexOf(y.className)){t=n
break}n=n.parentElement}return t}
return{insertHtml:function(e){var n=0<arguments.length&&void 0!==e?e:{},o=null,t=$("<div></div>").html(n.html)
if(t.find("."+y.className).each(function(){if(!this.parentNode||!/^(p)|(section)$/.test(this.parentNode.nodeName.toLowerCase()))return o=!1
var e=$(this.parentNode)
if(!1!==n.isPlugin){var t=this.getAttribute(y.cusPluginParentClassAttr)||y.pluginParentClass
e.addClass(t)}e.addClass(y.parentClass),o=!0}),!0===o){var a=n.editor.execCommand("inserthtml",t.html(),{notNeedFilter:!0})
a&&0<a.length&&s({editor:n.editor})}},selectNode:d,setDisable:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.dom&&1===t.dom.nodeType){t.dom.contentEditable=!1,t.dom.setAttribute("contenteditable","false")
var n=$(t.dom)
n.addClass(y.className+" "+y.noDefaultSelectedClass),t.mouseover?n.addClass(y.mouseoverClass):n.removeClass(y.mouseoverClass),t.noSelect?n.attr(y.noSelectAttr,"1"):n.removeAttr(y.noSelectAttr)}t.editor&&s({editor:t.editor})},setEnable:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.dom&&1===t.dom.nodeType){t.dom.contentEditable=!0,t.dom.removeAttribute("contenteditable")
var n=$(t.dom)
n.removeClass(y.className+" "+y.mouseoverClass+" "+y.noDefaultSelectedClass),n.removeAttr(y.noSelectAttr),t.editor&&s({editor:t.editor})}},setNoSelect:function(e){var t=0<arguments.length&&void 0!==e?e:{}
t.dom&&1===t.dom.nodeType&&0<=t.dom.className.indexOf(y.className)&&t.dom.setAttribute(y.noSelectAttr,"1")},handleEvent:s,unEditablClass:y.className,selectedClass:y.selectedClass,noDefaultSelectedClass:y.noDefaultSelectedClass,parentClass:y.parentClass,pluginParentClass:y.pluginParentClass,cusPluginParentClassAttr:y.cusPluginParentClassAttr,formatUneditablePluginHtml:function(e){for(var r=0<arguments.length&&void 0!==e?e:{},i={hasUneditable:!1,hasUneditablePlugin:!1},l="insertaudio",t=["qqmusic","mpvoice"],n=0,o=t.length;n<o;n++){var a=t[n],s=r.$container.find(a)
s&&0<s.length&&s.attr(c.pluginAttr,l).addClass(y.className).css({display:""}).parents("p").replaceTagName("section")}return r.$container.find("."+y.className).each(function(){i.hasUneditable=!0
var e=$(this),t=this.getAttribute(c.pluginAttr)
if(t||(e.hasClass("js_editor_qqmusic")||e.hasClass("js_editor_audio"))&&(t=l,e.attr(c.pluginAttr,t)),t){i.hasUneditablePlugin=!0
var n=this.getAttribute(y.cusPluginParentClassAttr)||y.pluginParentClass,o=y.parentClass+" "+n,a=this.parentNode
if(a===r.$container[0]){var s=this.ownerDocument.createElement("section")
s.className=o,a.insertBefore(s,this),s.appendChild(this)}else $(a).addClass(o)}}),i}}})
"use strict"
define("3rd/editor/contextmenu.js",["3rd/editor/zh_CN.js"],function(e,t,l){e("3rd/editor/zh_CN.js")
var n=baidu.editor.browser,a=UE.I18N.zh_CN.contextMenu
return[{label:a.selectall,cmdName:"selectall"},{label:a.cleardoc,cmdName:"cleardoc",exec:function(){confirm(a.confirmclear)&&this.execCommand("cleardoc")}},"-",{group:a.paragraph,icon:"justifyjustify",subMenu:[{label:a.justifyleft,cmdName:"justify",value:"left"},{label:a.justifyright,cmdName:"justify",value:"right"},{label:a.justifycenter,cmdName:"justify",value:"center"},{label:a.justifyjustify,cmdName:"justify",value:"justify"}]},"-",{group:a.table,icon:"table",subMenu:[{label:a.inserttable,cmdName:"inserttable"},{label:a.deletetable,cmdName:"deletetable"},"-",{label:a.deleterow,cmdName:"deleterow"},{label:a.deletecol,cmdName:"deletecol"},{label:a.insertcol,cmdName:"insertcol"},{label:a.insertcolnext,cmdName:"insertcolnext"},{label:a.insertrow,cmdName:"insertrow"},{label:a.insertrownext,cmdName:"insertrownext"},"-",{label:a.insertcaption,cmdName:"insertcaption"},{label:a.deletecaption,cmdName:"deletecaption"},{label:a.inserttitle,cmdName:"inserttitle"},{label:a.deletetitle,cmdName:"deletetitle"},"-",{label:a.mergecells,cmdName:"mergecells"},{label:a.mergeright,cmdName:"mergeright"},{label:a.mergedown,cmdName:"mergedown"},"-",{label:a.splittorows,cmdName:"splittorows"},{label:a.splittocols,cmdName:"splittocols"},{label:a.splittocells,cmdName:"splittocells"},"-",{label:a.averageDiseRow,cmdName:"averagedistributerow"},{label:a.averageDisCol,cmdName:"averagedistributecol"},"-",{label:a.edittd,cmdName:"edittd",exec:function(){UE.ui.edittd&&new UE.ui.edittd(this),this.getDialog("edittd").open()}},{label:a.edittable,cmdName:"edittable",exec:function(){UE.ui.edittable&&new UE.ui.edittable(this),this.getDialog("edittable").open()}}]},{group:a.tablesort,icon:"tablesort",subMenu:[{label:a.reversecurrent,cmdName:"sorttable",value:1},{label:a.orderbyasc,cmdName:"sorttable"},{label:a.reversebyasc,cmdName:"sorttable",exec:function(){this.execCommand("sorttable",function(e,t){var l=e.innerHTML
return t.innerHTML.localeCompare(l)})}},{label:a.orderbynum,cmdName:"sorttable",exec:function(){this.execCommand("sorttable",function(e,t){var l=e[n.ie?"innerText":"textContent"].match(/\d+/),a=t[n.ie?"innerText":"textContent"].match(/\d+/)
return((l=l&&+l[0])||0)-((a=a&&+a[0])||0)})}},{label:a.reversebynum,cmdName:"sorttable",exec:function(){this.execCommand("sorttable",function(e,t){var l=e[n.ie?"innerText":"textContent"].match(/\d+/),a=t[n.ie?"innerText":"textContent"].match(/\d+/)
return l=l&&+l[0],((a=a&&+a[0])||0)-(l||0)})}}]},{group:a.borderbk,icon:"borderBack",subMenu:[{label:a.setcolor,cmdName:"interlacetable",exec:function(){this.execCommand("interlacetable")}},{label:a.unsetcolor,cmdName:"uninterlacetable",exec:function(){this.execCommand("uninterlacetable")}},{label:a.setbackground,cmdName:"settablebackground",exec:function(){this.execCommand("settablebackground",{repeat:!0,colorList:["#bbb","#ccc"]})}},{label:a.unsetbackground,cmdName:"cleartablebackground",exec:function(){this.execCommand("cleartablebackground")}},{label:a.redandblue,cmdName:"settablebackground",exec:function(){this.execCommand("settablebackground",{repeat:!0,colorList:["red","blue"]})}},{label:a.threecolorgradient,cmdName:"settablebackground",exec:function(){this.execCommand("settablebackground",{repeat:!0,colorList:["#aaa","#bbb","#ccc"]})}}]},{group:a.aligntd,icon:"aligntd",subMenu:[{cmdName:"cellalignment",value:{align:"left",vAlign:"top"}},{cmdName:"cellalignment",value:{align:"center",vAlign:"top"}},{cmdName:"cellalignment",value:{align:"right",vAlign:"top"}},{cmdName:"cellalignment",value:{align:"left",vAlign:"middle"}},{cmdName:"cellalignment",value:{align:"center",vAlign:"middle"}},{cmdName:"cellalignment",value:{align:"right",vAlign:"middle"}},{cmdName:"cellalignment",value:{align:"left",vAlign:"bottom"}},{cmdName:"cellalignment",value:{align:"center",vAlign:"bottom"}},{cmdName:"cellalignment",value:{align:"right",vAlign:"bottom"}}]},{group:a.aligntable,icon:"aligntable",subMenu:[{cmdName:"tablealignment",className:"left",label:a.tableleft,value:"left"},{cmdName:"tablealignment",className:"center",label:a.tablecenter,value:"center"},{cmdName:"tablealignment",className:"right",label:a.tableright,value:"right"}]},"-",{label:a.insertparagraphbefore,cmdName:"insertparagraph",value:!0},{label:a.insertparagraphafter,cmdName:"insertparagraph"},{label:a.copy,cmdName:"copy",exec:function(){var e=window.alert
window.Vue&&window.Vue.prototype.$tipsErr&&(e=window.Vue.prototype.$tipsErr),e(a.copymsg)},query:function(){return 0}},{label:a.paste,cmdName:"paste",exec:function(){var e=window.alert
window.Vue&&window.Vue.prototype.$tipsErr&&(e=window.Vue.prototype.$tipsErr),e(a.pastemsg)},query:function(){return 0}}]})
"use strict"
var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e}
define("3rd/editor/zh_CN.js",["3rd/editor/editor_all_min.js","3rd/editor/utils.js","3rd/editor/common/browser.js"],function(e,t,a){e("3rd/editor/editor_all_min.js")
var l=e("3rd/editor/utils.js").getShortcutsKeyMap(),r=e("3rd/editor/common/browser.js").browser
UE.I18N.zh_CN={labelMap:_extends({anchor:"锚点",undo:"撤销",redo:"重做",bold:"加粗",indent:"首行缩进",snapscreen:"截图",italic:"斜体",underline:"下划线",strikethrough:"删除线",subscript:"下标",fontborder:"字符边框",superscript:"上标",formatmatch:"格式刷",source:"源代码",blockquote:"引用",pasteplain:"纯文本粘贴模式",selectall:"全选",print:"打印",preview:"预览",horizontal:"分隔线",removeformat:"清除格式",time:"时间",date:"日期",insertrow:"前插入行",insertcol:"前插入列",mergeright:"右合并单元格",mergedown:"下合并单元格",deleterow:"删除行",deletecol:"删除列",splittorows:"拆分成行",splittocols:"拆分成列",splittocells:"完全拆分单元格",mergecells:"合并多个单元格",deletetable:"删除表格",cleardoc:"清空文档",insertparagraphbeforetable:"表格前插入行",insertcode:"代码语言",fontfamily:"字体",fontsize:"字号 10~50px",letterspacing:"字间距",justifyindent:"两端缩进",paragraph:"段落格式",edittable:"表格属性",edittd:"单元格属性",emotion:"表情",spechars:"特殊字符",searchreplace:"查询替换",map:"Baidu地图",gmap:"Google地图",insertvideo:"视频",help:"帮助",justifyleft:"居左对齐",justifyright:"居右对齐",justifycenter:"居中对齐",justify:"对齐",justifyjustify:"两端对齐",forecolor:"字体颜色",backcolor:"背景色",insertorderedlist:"有序列表",insertlist:"序号列表",insertunorderedlist:"无序列表",fullscreen:"全屏",directionalityltr:"从左向右输入",directionalityrtl:"从右向左输入",rowspacingtop:"段前距",rowspacingbottom:"段后距",highlightcode:"插入代码",pagebreak:"分页",insertframe:"插入Iframe",imagenone:"默认",imagefloat:"浮动",imageleft:"左浮动",imageright:"右浮动",attachment:"附件",imagecenter:"居中",wordimage:"图片转存",lineheight:"行间距",edittip:"编辑提示",customstyle:"自定义标题",autotypeset:"自动排版",webapp:"百度应用",touppercase:"字母大写",tolowercase:"字母小写",background:"背景",template:"模版",scrawl:"涂鸦",music:"音乐",inserttable:"插入表格",more:"更多"},l),insertorderedlist:{num:"1,2,3...",num1:"1),2),3)...",num2:"(1),(2),(3)...",cn:"一,二,三....",cn1:"一),二),三)....",cn2:"(一),(二),(三)....",decimal:"1,2,3...","lower-alpha":"a,b,c...","lower-roman":"i,ii,iii...","upper-alpha":"A,B,C...","upper-roman":"I,II,III..."},insertunorderedlist:{circle:"○ 大圆圈",disc:"● 小黑点",square:"■ 小方块 ",dash:"— 破折号",dot:" 。 小圆圈"},paragraph:{p:"段落",h1:"标题 1",h2:"标题 2",h3:"标题 3",h4:"标题 4",h5:"标题 5",h6:"标题 6"},fontfamily:{songti:'"宋体"',kaiti:'"楷体"',heiti:'"黑体"',lishu:'"隶书"',yahei:'"微软雅黑"',andaleMono:"andale mono",arial:"arial",arialBlack:"arial black",comicSansMs:"comic sans ms",impact:"impact",timesNewRoman:"times new roman"},insertcode:{as3:"ActionScript3",bash:"Bash/Shell",cpp:"C/C++",css:"Css",cf:"CodeFunction","c#":"C#",delphi:"Delphi",diff:"Diff",erlang:"Erlang",groovy:"Groovy",html:"Html",java:"Java",jfx:"JavaFx",js:"Javascript",pl:"Perl",php:"Php",plain:"Plain Text",ps:"PowerShell",python:"Python",ruby:"Ruby",scala:"Scala",sql:"Sql",vb:"Vb",xml:"Xml"},customstyle:{tc:"标题居中",tl:"标题居左",im:"强调",hi:"明显强调"},elementPathTip:"元素路径",wordCountTip:"字数统计",wordCountMsg:"当前已输入{#count}个字符, 您还可以输入{#leave}个字符。 ",wordOverFlowMsg:'<span style="color:red;">字数超出最大允许值，服务器可能拒绝保存！</span>',ok:"确认",cancel:"取消",closeDialog:"关闭对话框",tableDrag:"表格拖动必须引入uiUtils.js文件！",autofloatMsg:"工具栏浮动依赖编辑器UI，您首先需要引入UI文件!",snapScreen_plugin:{browserMsg:"仅支持IE浏览器！",callBackErrorMsg:"服务器返回数据有误，请检查配置项之后重试。",uploadErrorMsg:"截图上传失败，请检查服务器端环境! "},confirmClear:"确定清空当前文档么？",contextMenu:{delete:"删除",selectall:"全选",deletecode:"删除代码",cleardoc:"清空文档",confirmclear:"确定清空当前文档么？",unlink:"删除超链接",paragraph:"段落格式",edittable:"表格属性",aligntd:"单元格对齐方式",aligntable:"表格对齐方式",tableleft:"左浮动",tablecenter:"居中显示",tableright:"右浮动",edittd:"单元格属性",justifyleft:"左对齐",justifyright:"右对齐",justifycenter:"居中对齐",justifyjustify:"两端对齐",table:"表格",inserttable:"插入表格",deletetable:"删除表格",insertparagraphbefore:"前插入段落",insertparagraphafter:"后插入段落",deleterow:"删除当前行",deletecol:"删除当前列",insertrow:"前插入行",insertcol:"左插入列",insertrownext:"后插入行",insertcolnext:"右插入列",insertcaption:"插入表格名称",deletecaption:"删除表格名称",inserttitle:"插入表格标题行",deletetitle:"删除表格标题行",averageDiseRow:"平均分布各行",averageDisCol:"平均分布各列",mergeright:"向右合并",mergeleft:"向左合并",mergedown:"向下合并",mergecells:"合并单元格",splittocells:"完全拆分单元格",splittocols:"拆分成列",splittorows:"拆分成行",tablesort:"表格排序",reversecurrent:"逆序当前",orderbyasc:"按ASCII字符升序",reversebyasc:"按ASCII字符降序",orderbynum:"按数值大小升序",reversebynum:"按数值大小降序",borderbk:"边框底纹",setcolor:"表格隔行变色",unsetcolor:"取消表格隔行变色",setbackground:"选区背景隔行",unsetbackground:"取消选区背景",redandblue:"红蓝相间",threecolorgradient:"三色渐变",copy:r.mac?"复制(Command + c)":"复制(Ctrl + c)",copymsg:r.mac?'请使用 "Command + c" 执行复制操作':'请使用 "Ctrl + c" 执行复制操作',paste:r.mac?"粘贴(Command + v)":"粘贴(Ctrl + v)",pastemsg:r.mac?'请使用 "Command + v" 执行粘贴操作':'请使用 "Ctrl + v" 执行粘贴操作',highlightcode:"插入代码"},anthorMsg:"链接",clearColor:"清空颜色",standardColor:"标准颜色",themeColor:"主题颜色",basicColor:"基本色",recentlyColor:"最近使用颜色",property:"属性",default:"默认",modify:"修改",justifyleft:"左对齐",justifyright:"右对齐",justifycenter:"居中",justify:{justifyleft:l.justifyleft,justifycenter:l.justifycenter,justifyright:l.justifyright,justifyjustify:l.justifyjustify},imagefloat:{none:"默认",left:"左浮动",right:"右浮动"},clear:"清除",anchorMsg:"锚点",delete:"删除",clickToUpload:"点击上传",unset:"尚未设置语言文件",t_row:"行",t_col:"列",pasteOpt:"粘贴选项",pasteSourceFormat:"保留源格式",tagFormat:"只保留标签",pasteTextFormat:"只保留文本",autoTypeSet:{mergeLine:"合并空行",delLine:"清除空行",removeFormat:"清除格式",indent:"首行缩进",alignment:"对齐方式",imageFloat:"图片浮动",removeFontsize:"清除字号",removeFontFamily:"清除字体",removeHtml:"清除冗余HTML代码",pasteFilter:"粘贴过滤",run:"执行"},background:{static:{lang_background_normal:"背景设置",lang_background_local:"本地图片",lang_background_set:"选项",lang_background_none:"无",lang_background_color:"颜色设置",lang_background_netimg:"网络图片",lang_background_align:"对齐方式",lang_background_position:"精确定位",repeatType:{options:["居中","横向重复","纵向重复","平铺","自定义"]}},noUploadImage:"当前未上传过任何图片！",toggleSelect:"单击可切换选中状态\n原图尺寸: "},insertimage:{static:{lang_tab_remote:"远程图片",lang_tab_local:"本地上传",lang_tab_imgManager:"在线管理",lang_tab_imgSearch:"图片搜索",lang_input_url:"地 址：",lang_input_width:"宽 度：",lang_input_height:"高 度：",lang_input_border:"边 框：",lang_input_vhspace:"边 距：",lang_input_title:"描 述：",lang_input_remoteAlign:"对 齐：",lang_imgLoading:"　图片加载中……",lock:{title:"锁定宽高比例"},imgType:{title:"图片类型",options:["新闻","壁纸","表情","头像"]},imgSearchTxt:{value:"请输入搜索关键词"},imgSearchBtn:{value:"百度一下"},imgSearchReset:{value:"清空搜索"},upload:{style:"background: url(upload.png);"},duiqi:{style:"background: url(imglabel.png) -12px 2px no-repeat;"},lang_savePath:"选择保存目录"},netError:"网络链接错误，请检查配置后重试！",noUploadImage:"当前未上传过任何图片！",imageLoading:"图片加载中，请稍后……",tryAgain:" :( ，抱歉，没有找到图片！请重试一次！",toggleSelect:"单击可切换选中状态\n原图尺寸: ",searchInitInfo:"请输入搜索关键词",numError:"请输入正确的长度或者宽度值！例如：123，400",fileType:"图片",imageUrlError:"不允许的图片格式或者图片域！",imageLoadError:"图片加载失败！请检查链接地址或网络状态！",flashError:"Flash插件初始化失败，请更新您的FlashPlayer版本之后重试！",floatDefault:"默认",floatLeft:"左浮动",floatRight:"右浮动",floatCenter:"居中",flashI18n:{}},webapp:{tip1:"本功能由百度APP提供，如看到此页面，请各位站长首先申请百度APPKey!",tip2:"申请完成之后请至ueditor.config.js中配置获得的appkey! ",applyFor:"点此申请",anthorApi:"百度API"},template:{static:{lang_template_bkcolor:"背景颜色",lang_template_clear:"保留原有内容",lang_template_select:"选择模版"},blank:"空白文档",blog:"博客文章",resume:"个人简历",richText:"图文混排",sciPapers:"科技论文"},scrawl:{static:{lang_input_previousStep:"上一步",lang_input_nextsStep:"下一步",lang_input_clear:"清空",lang_input_addPic:"添加背景",lang_input_ScalePic:"缩放背景",lang_input_removePic:"删除背景",J_imgTxt:{title:"添加背景图片"}},noScarwl:"尚未作画，白纸一张~",scrawlUpLoading:"涂鸦上传中,别急哦~",continueBtn:"继续",imageError:"糟糕，图片读取失败了！",backgroundUploading:"背景图片上传中,别急哦~"},music:{static:{lang_input_tips:"输入歌手/歌曲/专辑，搜索您感兴趣的音乐！",J_searchBtn:{value:"搜索歌曲"}},emptyTxt:"未搜索到相关音乐结果，请换一个关键词试试。",chapter:"歌曲",singer:"歌手",special:"专辑",listenTest:"试听"},anchor:{static:{lang_input_anchorName:"锚点名字："}},attachment:{static:{lang_input_fileStatus:" 当前未上传文件",startUpload:{style:"background:url(upload.png) no-repeat;"}},browseFiles:"文件浏览…",uploadSuccess:"上传成功!",delSuccessFile:"从成功队列中移除",delFailSaveFile:"移除保存失败文件",statusPrompt:" 个文件已上传！ ",flashVersionError:"当前Flash版本过低，请更新FlashPlayer后重试！",flashLoadingError:"Flash加载失败!请检查路径或网络状态",fileUploadReady:"等待上传……",delUploadQueue:"从上传队列中移除",limitPrompt1:"单次不能选择超过",limitPrompt2:"个文件！请重新选择！",delFailFile:"移除失败文件",fileSizeLimit:"文件大小超出限制！",emptyFile:"空文件无法上传！",fileTypeError:"文件类型错误！",unknownError:"未知错误！",fileUploading:"上传中，请等待……",cancelUpload:"取消上传",netError:"网络错误",failUpload:"上传失败!",serverIOError:"服务器IO错误！",noAuthority:"无权限！",fileNumLimit:"上传个数限制",failCheck:"验证失败，本次上传被跳过！",fileCanceling:"取消中，请等待……",stopUploading:"上传已停止……"},highlightcode:{static:{lang_input_selectLang:"选择语言"},importCode:"请输入代码"},emotion:{static:{lang_input_choice:"精选",lang_input_Tuzki:"兔斯基",lang_input_BOBO:"BOBO",lang_input_lvdouwa:"绿豆蛙",lang_input_babyCat:"baby猫",lang_input_bubble:"泡泡",lang_input_youa:"有啊"}},gmap:{static:{lang_input_address:"地址",lang_input_search:"搜索",address:{value:"北京"}},searchError:"无法定位到该地址!"},help:{static:{lang_input_about:"关于UEditor",lang_input_shortcuts:"快捷键",lang_input_version:"版本:1.2.6",lang_input_introduction:"UEditor是由百度web前端研发部开发的所见即所得富文本web编辑器，具有轻量，可定制，注重用户体验等特点。开源基于BSD协议，允许自由使用和修改代码。",lang_Txt_shortcuts:"快捷键",lang_Txt_func:"功能",lang_Txt_bold:"给选中字设置为加粗",lang_Txt_copy:"复制选中内容",lang_Txt_cut:"剪切选中内容",lang_Txt_Paste:"粘贴",lang_Txt_undo:"重新执行上次操作",lang_Txt_redo:"撤销上一次操作",lang_Txt_italic:"给选中字设置为斜体",lang_Txt_underline:"给选中字加下划线",lang_Txt_selectAll:"全部选中",lang_Txt_visualEnter:"软回车",lang_Txt_fullscreen:"全屏"}},insertframe:{static:{lang_input_address:"地址：",lang_input_width:"宽度：",lang_input_height:"高度：",lang_input_isScroll:"允许滚动条：",lang_input_frameborder:"显示框架边框：",lang_input_alignMode:"对齐方式：",align:{title:"对齐方式",options:["默认","左对齐","右对齐","居中"]}},enterAddress:"请输入地址!"},map:{static:{lang_city:"城市",lang_address:"地址",city:{value:"北京"},lang_search:"搜索"},cityMsg:"请选择城市",errorMsg:"抱歉，找不到该位置！"},searchreplace:{static:{lang_tab_search:"查找",lang_tab_replace:"替换",lang_search1:"查找",lang_search2:"查找",lang_replace:"替换",lang_searchReg:"支持正则表达式，添加前后斜杠标示为正则表达式，例如“/表达式/”",lang_searchReg1:"支持正则表达式，添加前后斜杠标示为正则表达式，例如“/表达式/”",lang_case_sensitive1:"区分大小写",lang_case_sensitive2:"区分大小写",nextFindBtn:{value:"下一个"},preFindBtn:{value:"上一个"},nextReplaceBtn:{value:"下一个"},preReplaceBtn:{value:"上一个"},repalceBtn:{value:"替换"},repalceAllBtn:{value:"全部替换"}},getEnd:"已经搜索到文章末尾！",getStart:"已经搜索到文章头部",countMsg:"总共替换了{#count}处！"},snapscreen:{static:{lang_showMsg:"截图功能需要首先安装UEditor截图插件！ ",lang_download:"点此下载",lang_step1:"第一步，下载UEditor截图插件并运行安装。",lang_step2:"第二不，插件安装完成后即可使用，如不生效，请重启浏览器后再试！"}},insertvideo:{static:{lang_tab_insertV:"插入视频",lang_video_url:"视频网址",lang_video_size:"视频尺寸",lang_videoW:"宽度",lang_videoH:"高度",lang_alignment:"对齐方式",videoSearchTxt:{value:"请输入搜索关键字！"},videoType:{options:["全部","热门","娱乐","搞笑","体育","科技","综艺"]},videoSearchBtn:{value:"百度一下"},videoSearchReset:{value:"清空结果"}},numError:"请输入正确的数值，如123,400",floatLeft:"左浮动",floatRight:"右浮动",default:"默认",block:"独占一行",urlError:"输入的视频地址有误，请检查后再试！",loading:" &nbsp;视频加载中，请等待……",clickToSelect:"点击选中",goToSource:"访问源视频",noVideo:" &nbsp; &nbsp;抱歉，找不到对应的视频，请重试！"},spechars:{static:{},tsfh:"特殊字符",lmsz:"罗马字符",szfh:"数学字符",rwfh:"日文字符",xlzm:"希腊字母",ewzm:"俄文字符",pyzm:"拼音字母",zyzf:"注音及其他"},edittable:{static:{lang_tableStyle:"表格样式",lang_insertCaption:"添加表格标题行",lang_insertTitle:"添加表格名称行",lang_orderbycontent:"使表格内容可排序",lang_tableSize:"自动调整表格尺寸",lang_autoSizeContent:"按表格文字自适应",lang_autoSizePage:"按页面宽度自适应",lang_example:"示例",lang_borderStyle:"表格边框",lang_color:"颜色:"},captionName:"表格名称",titleName:"标题",cellsName:"内容"},edittip:{static:{lang_delRow:"删除整行",lang_delCol:"删除整列"}},edittd:{static:{lang_tdBkColor:"背景颜色:"}},formula:{static:{}},wordimage:{static:{lang_resave:"转存步骤",uploadBtn:{src:"upload.png",alt:"上传"},clipboard:{style:"background: url(copy.png) -153px -1px no-repeat;"},lang_step:"1、点击顶部复制按钮，将地址复制到剪贴板；2、点击添加照片按钮，在弹出的对话框中使用Ctrl+V粘贴地址；3、点击打开后选择图片上传流程。"},fileType:"图片 ",flashError:"FLASH初始化失败，请检查FLASH插件是否正确安装！ ",netError:"网络连接错误，请重试！ ",copySuccess:"图片地址已经复制！ ",flashI18n:{}}}})
"use strict"
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}define("3rd/editor/editor_all_min.js",["3rd/editor/common/clear_dom.js","3rd/editor/plugin/filter.js","3rd/store/store.js","3rd/editor/common/colorpicker.js","3rd/editor/common/utils.js","3rd/editor/common/browser.js","3rd/editor/common/dtd.js","3rd/editor/common/domUtils.js","3rd/editor/common/selection.js"],function(e,t,n){var _=e("3rd/editor/common/clear_dom.js"),R=e("3rd/editor/plugin/filter.js"),s=e("3rd/store/store.js"),a=e("3rd/editor/common/colorpicker.js"),J=e("3rd/editor/common/utils.js").utils
window.baidu||(window.baidu={})
var y=window.baidu
window.UE||(window.UE={}),UE.dom||(UE.dom={})
var Q=UE.dom
y.editor=window.UE,UE.plugins={},UE.commands={},UE.instants={},UE.I18N={},UE.version="1.2.6.3"
var Z=e("3rd/editor/common/browser.js").browser,l=Z.ie,f=(Z.webkit,Z.gecko,Z.opera),i=(J=e("3rd/editor/common/utils.js").utils,UE.EventBase=function(){})
function c(e,t,n){var i
return t=t.toLowerCase(),(i=e.__allListeners||n&&(e.__allListeners={}))&&(i[t]||n&&(i[t]=[]))}i.prototype={addListener:function(e,t){e=J.trim(e).split(" ")
for(var n,i=0;n=e[i++];)c(this,n,!0).push(t)},removeListener:function(e,t){e=J.trim(e).split(" ")
for(var n,i=0;n=e[i++];)J.removeItem(c(this,n)||[],t)},fireEvent:function(e){var t=e
t=J.trim(t).split(" ")
for(var n,i=0;n=t[i++];){try{this.options.debug&&J.isArray(this.eventLog)&&this.eventLog.push({time:+new Date,name:n,param:JSON.stringify(arguments).substr(0,200),error:!1,errorLog:""})}catch(e){}var o,r,a,s=c(this,n)
if(s)for(a=s.length;a--;)if(s[a]){try{r=s[a].apply(this,arguments)}catch(e){if(this.options.debug&&J.isArray(this.eventLog)){var l=this.eventLog.length,d=this.eventLog[l-1]
d&&d.name==n&&(d.error=!0,d.errorLog+=e&&e.stack?e.stack:"")}window.BJ_REPORT&&"function"==typeof window.BJ_REPORT.report&&e&&e.stack&&(e.stack="editor_fireEvent|"+n+"|"+e.stack,window.BJ_REPORT.report(e)),e.stack&&console&&console.error&&console.error("[BJ-REPORT]",e.stack)}if(!0===r)return r
void 0!==r&&(o=r)}if(r=this["on"+n.toLowerCase()])try{o=r.apply(this,arguments)}catch(e){window.BJ_REPORT&&"function"==typeof window.BJ_REPORT.report&&e&&e.stack&&(e.stack="editor_fireEvent|on"+n.toLowerCase()+"|"+e.stack,window.BJ_REPORT.report(e)),e.stack&&console&&console.error&&console.error("[BJ-REPORT]",e.stack)}}return o}}
var o,r,d,ee=e("3rd/editor/common/dtd.js").dtd,u=e("3rd/editor/common/domUtils.js"),te=u.domUtils,m=u.getDomNode,T=(u.fillChar,u.fillCharEncode,u.fillCharReg)
function h(e,t){var n
if(t.textarea)if(J.isString(t.textarea)){for(var i,o=0,r=te.getElementsByTagName(e,"textarea");i=r[o++];)if(i.id=="ueditor_textarea_"+t.options.textarea){n=i
break}}else n=t.textarea
n||(e.appendChild(n=te.createElement(document,"textarea",{name:t.options.textarea,id:"ueditor_textarea_"+t.options.textarea,style:"display:none"})),t.textarea=n),n.value=t.hasContents()?t.options.allHtmlEnabled?t.getAllHtml():t.getContent(null,null,!0):""}function p(e){for(var t in UE.plugins)UE.plugins[t].call(e)
if(e.options.pluginsContainer)for(var t in e.options.pluginsContainer)e.options.pluginsContainer[t].call(e)
e.langIsReady=!0,e.fireEvent("langReady")}function g(){var e=this
e.document.getElementById("initContent")&&(e.body.innerHTML="<p>"+(Z.ie11below?te.fillChar:"<br/>")+"</p>",e.removeListener("firstBeforeExecCommand focus",g),setTimeout(function(){e.focus(),e._selectionChange(null,null,"setDefaultContent")},0))}e("3rd/editor/common/selection.js"),r=0,(d=UE.Editor=function(e){var t=this
t.uid=r++,i.call(t),t.commands={},t.options=J.clone(e||{}),t.shortcutkeys={},t.inputRules=[],t.outputRules=[],t.inputNativeNodeRules=[],J.isEmptyObject(UE.I18N)||(t.options.lang=function(e){for(var t in e)return t}(UE.I18N)),p(t),UE.instants["ueditorInstant"+t.uid]=t}).prototype={ready:function(e){e&&(this.isReady?e.apply(this):this.addListener("ready",e))},setOpt:function(e,t){var n={}
J.isString(e)?n[e]=t:n=e,J.extend(this.options,n,!0)},destroy:function(){var e=this
e.fireEvent("destroy")
var t=e.container.parentNode,n=e.textarea
n?n.style.display="":(n=document.createElement("textarea"),t.parentNode.insertBefore(n,t)),n.style.width=e.iframe.offsetWidth+"px",n.style.height=e.iframe.offsetHeight+"px",n.value=e.getContent(),n.id=e.key,t.innerHTML="",te.remove(t)
var i=e.key
for(var o in e)e.hasOwnProperty(o)&&delete this[o]
UE.delEditor(i)},render:function(e){var t=this.options
if(J.isString(e)&&(e=document.getElementById(e)),e){var n=""
n=Z.edge?"javascript:void(function(){"+(t.customDomain&&document.domain!=location.hostname?'document.domain="'+document.domain+'";':"")+'window.parent.UE.instants["ueditorInstant'+this.uid+'"]._docWrite(document);}())':"javascript:void(function(){document.open();"+(t.customDomain&&document.domain!=location.hostname?'document.domain="'+document.domain+'";':"")+'document.write("'+this._getIframeHtml()+'");document.close();}())',e.appendChild(te.createElement(document,"iframe",{id:"ueditor_"+this.uid,allowtransparency:"true",width:"100%",height:"100%",frameborder:"0",src:n}))}},_getIframeHtml:function(){var e=this.options
return(l&&Z.version<9?"":"<!DOCTYPE html>")+"<html xmlns='http://www.w3.org/1999/xhtml' ><head><style type='text/css'>body{font-family:sans-serif;}</style>"+(e.iframeCssUrl?"<link rel='stylesheet' type='text/css' href='"+J.unhtml(e.iframeCssUrl)+"'/>":"")+(e.initialStyle?"<style>"+e.initialStyle+"</style>":"")+"</head><body class='view' lang='en' ></body><script type='text/javascript' "+(l?"defer='defer'":"")+" id='_initialScript'>setTimeout(function(){window.parent.UE.instants['ueditorInstant"+this.uid+"']._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);<\/script></html>"},_docWrite:function(e){var t=this.options
e.open(),t.customDomain&&document.domain!=location.hostname&&(e.domain=document.domain),e.write(this._getIframeHtml()),e.close()},_setup:function(e){var t,n=this,i=n.options
l?(e.body.disabled=!0,e.body.contentEditable=!0,e.body.disabled=!1):e.body.contentEditable=!0,e.body.spellcheck=!1,n.document=e,n.window=e.defaultView||e.parentWindow,n.iframe=n.window.frameElement,n.body=e.body,n.selection=new Q.Selection(e),Z.gecko&&(t=this.selection.getNative())&&t.removeAllRanges(),this._initEvents()
for(var o=this.iframe.parentNode;!te.isBody(o);o=o.parentNode)if("FORM"==o.tagName){n.form=o,n.options.autoSyncData?te.on(n.window,"blur",function(){h(o,n)}):te.on(o,"submit",function(){h(this,n)})
break}if(i.initialContent)if(i.autoClearinitialContent){var r=n.execCommand
n.execCommand=function(){return n.fireEvent("firstBeforeExecCommand"),r.apply(n,arguments)},this._setDefaultContent(i.initialContent)}else this.setContent(i.initialContent,!1,!0)
te.isEmptyNode(n.body)&&(n.body.innerHTML="<p>"+(Z.ie11below?te.fillChar:"<br/>")+"</p>"),i.focus&&setTimeout(function(){n.focus(),n.options.autoClearinitialContent||n._selectionChange(null,null,"setup")},0),n.container||(n.container=this.iframe.parentNode),i.fullscreen&&n.ui&&n.ui.setFullScreen(!0)
try{n.document.execCommand("2D-position",!1,!1)}catch(e){}try{n.document.execCommand("enableInlineTableEditing",!1,!1)}catch(e){}try{n.document.execCommand("enableObjectResizing",!1,!1)}catch(e){}n._bindshortcutKeys(),n.isReady=1,n.fireEvent("ready"),i.onready&&i.onready.call(n),Z.ie9below||te.on(n.window,["blur","focus"],function(e){if("blur"==e.type){n._bakRange=n.selection.getRange()
try{n._bakNativeRange=n.selection.getNative().getRangeAt(0),n.selection.getNative().removeAllRanges()}catch(e){n._bakNativeRange=null}}else try{n._bakRange&&n._bakRange.select(!0)}catch(e){}}),Z.gecko&&Z.version<=10902&&(n.body.contentEditable=!1,setTimeout(function(){n.body.contentEditable=!0},100),setInterval(function(){n.body.style.height=n.iframe.offsetHeight-20+"px"},100)),i.isShow||n.setHide(),i.readonly&&n.setDisabled()},sync:function(e){var t=e?document.getElementById(e):te.findParent(this.iframe.parentNode,function(e){return"FORM"==e.tagName},!0)
t&&h(t,this)},setHeight:function(e,t){var n=e,i=n+20
this.options.canChangeIframeHeight&&i!==parseInt(this.iframe.parentNode.style.height)&&$(this.iframe).parent().height(i),t||(this.options.minFrameHeight=n),this.options.canChangeIframeHeight&&(this.iframe.style.height=i+"px"),this.body.style.height=n+"px",this.fireEvent("heightChanged",n)},addshortcutkey:function(e,t){var n={}
t?n[e]=t:n=e,J.extend(this.shortcutkeys,n)},_bindshortcutKeys:function(){var c=this,u=this.shortcutkeys,m={Undo:{id:"122325",key:"22"},Redo:{id:"122333",key:"113"}}
c.addListener("keydown",function(e,t){var n=t.keyCode||t.which
for(var i in u)for(var o,r=u[i].split(","),a=0;o=r[a++];){var s=(o=o.split(":"))[0],l=o[1]
if((/^(ctrl)(\+shift)?\+(\d+)$/.test(s.toLowerCase())||/^(\d+)$/.test(s))&&("ctrl"==RegExp.$1&&(t.ctrlKey||t.metaKey)&&(""==RegExp.$2||t[RegExp.$2.slice(1)+"Key"])&&n==RegExp.$3||n==RegExp.$1)){if(-1!=c.queryCommandState(i,l)){c.execCommand(i,l)
var d=m[i]
d&&c.fireEvent("reportAddNum",d.id,d.key,1)}te.preventDefault(t)}}})},getContent:function(e,t,n,i,o,r){if(e&&J.isFunction(e)&&(t=e,e=""),t?!t():!this.hasContents())return""
var a=""
if("range"===r){var s=this.selection.getRange().cloneContents()
if(s){var l=document.createElement("div")
l.appendChild(s),a=l.innerHTML}}else a=this.body.innerHTML
if(this.fireEvent("beforegetcontent"),a){var d=UE.htmlparser(a,i)
return this.filterOutputRule(d),this.fireEvent("aftergetcontent",e),d.toHtml(o)}return""},getAllHtml:function(){var e=this,t=[]
if(e.fireEvent("getAllHtml",t),Z.ie&&8<Z.version){var n=""
J.each(e.document.styleSheets,function(e){n+=e.href?'<link rel="stylesheet" type="text/css" href="'+e.href+'" />':"<style>"+e.cssText+"</style>"}),J.each(e.document.getElementsByTagName("script"),function(e){n+=e.outerHTML})}return"<html><head>"+(e.options.charset?'<meta http-equiv="Content-Type" content="text/html; charset='+e.options.charset+'"/>':"")+(n||e.document.getElementsByTagName("head")[0].innerHTML)+t.join("\n")+"</head><body "+(l&&Z.version<9?'class="view"':"")+">"+e.getContent(null,null,!0)+"</body></html>"},getPlainTxt:function(){var e=new RegExp(te.fillChar,"g"),t=this.body.innerHTML.replace(/[\n\r]/g,"")
return(t=t.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi,"\n").replace(/<br\/?>/gi,"\n").replace(/<[^>/]+>/g,"").replace(/(\n)?<\/([^>]+)>/g,function(e,t,n){return ee.$block[n]?"\n":t||""})).replace(e,"").replace(/\u00a0/g," ").replace(/&nbsp;/g," ")},getContentTxt:function(){var e=new RegExp(te.fillChar,"g")
return this.body[Z.ie?"innerText":"textContent"].replace(e,"").replace(/\u00a0/g," ")},setContent:function(e,t,n){var i=this
i.fireEvent("beforesetcontent",e)
var o,r,a=UE.htmlparser(e,!0)
if(i.filterInputRule(a),e=a.toHtml(),i.body.innerHTML=(t?i.body.innerHTML:"")+e,"p"==i.options.enterTag){var s,l=this.body.firstChild
if(!l||1==l.nodeType&&(ee.$cdata[l.tagName]||"DIV"==(o=l).tagName&&o.getAttribute("cdata_tag")||te.isCustomeNode(l))&&l===this.body.lastChild)this.body.innerHTML="<p>"+(Z.ie11below?te.fillChar:"<br/>")+"</p>"+this.body.innerHTML
else for(var d=i.document.createElement("p");l;){for(;l&&(3==l.nodeType||1==l.nodeType&&ee.p[l.tagName]&&!ee.$cdata[l.tagName]);)s=l.nextSibling,d.appendChild(l),l=s
if(d.firstChild){if(!l){i.body.appendChild(d)
break}l.parentNode.insertBefore(d,l),d=i.document.createElement("p")}l=l.nextSibling}}i.filterInputNativeNode(i.body),i.fireEvent("aftersetcontent",e,[i.body]),i.fireEvent("contentchange"),n||i._selectionChange(null,null,"setContent"),i._bakRange=i._bakIERange=i._bakNativeRange=null,Z.gecko&&(r=this.selection.getNative())&&r.removeAllRanges(),i.options.autoSyncData&&i.form&&h(i.form,i)},focus:function(e){var t=0<arguments.length&&void 0!==e?e:{}
try{var n=this.document,i=this.selection.getRange()
if(t.toFirstText&&J.isSupportWalker()){for(var o=n.createTreeWalker(n.body,window.NodeFilter.SHOW_TEXT,{acceptNode:function(e){return(e.nodeValue||"").replace(te.fillCharReg,"").replace(te.bookmarkFillCharReg,"")?window.NodeFilter.FILTER_ACCEPT:window.NodeFilter.FILTER_REJECT}},!1),r=[];o.nextNode();){r.push(o.currentNode)
break}0<r.length&&i.selectNode(r[0]).collapse(!0)}i.select(!0),this.fireEvent("focus")}catch(e){}},_initEvents:function(){var t=this,e=t.document,n=t.window
t._proxyDomEvent=J.bind(t._proxyDomEvent,t),te.on(e,["click","contextmenu","mousedown","keydown","keyup","keypress","mouseup","mouseover","mouseout","selectstart"],t._proxyDomEvent),te.on(n,["focus","blur"],t._proxyDomEvent),te.on(e,["mouseup","keydown"],function(e){"keydown"==e.type&&(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)||2!=e.button&&t._selectionChange(250,e,e.type)})},_proxyDomEvent:function(e){return!1!==this.fireEvent("before"+e.type.replace(/^on/,"").toLowerCase(),e)&&(!1!==this.fireEvent(e.type.replace(/^on/,""),e)&&this.fireEvent("after"+e.type.replace(/^on/,"").toLowerCase(),e))},_selectionChange:function(e,s,l){var d,c,u=this,m=!1
Z.ie&&Z.version<9&&s&&"mouseup"==s.type&&(this.selection.getRange().collapsed||(m=!0,d=s.clientX,c=s.clientY))
clearTimeout(o),o=setTimeout(function(){var e=+new Date
if(u.selection&&u.selection.getNative()){var t,n
if(m&&"None"==u.selection.getNative().type){t=u.document.body.createTextRange()
try{t.moveToPoint(d,c)}catch(e){t=null}}if(t&&(n=u.selection.getIERange,u.selection.getIERange=function(){return t}),u.selection.cache(),n&&(u.selection.getIERange=n),u.selection._cachedRange&&u.selection._cachedStartElement){var i=u.selection._cachedRange.getRangeDom()
u.fireEvent("beforeselectionchange")
var o=!!s
"iframeSelected"!==l&&"iframeMouseup"!==l||(o=!0),u.fireEvent("selectionchange",o,!1,l,{allDomInRange:i}),u.fireEvent("afterselectionchange"),u.selection.clear()}var r=new Date-e,a=[]
a.push({id:"122443",key:"16"}),a.push({id:"122443",key:"17",len:r}),u.fireEvent("reportAddNum",a)}},e||50)},_callCmdFn:function(e,t){var n,i,o=t[0].toLowerCase()
return i=(n=this.commands[o]||UE.commands[o])&&n[e],n&&i||"queryCommandState"!=e?i?("execCommand"==e&&!0!==n.noCommandReprot&&this._cmdReport(t),i.apply(this,t)):void 0:0},_cmdReport:function(e){var t=e[0]
"justify"==t||"imagefloat"==t?this.fireEvent("funcPvUvReport",t+(e[1]||"")):"rowspacing"==t?this.fireEvent("funcPvUvReport",t+(e[2]||"")):this.fireEvent("funcPvUvReport",t)},execCommand:function(e){arguments[0]=arguments[0].toLowerCase(),e=e.toLowerCase()
var t,n=this,i=n.commands[e]||UE.commands[e]
return i&&i.execCommand?(i.notNeedUndo||n.__hasEnterExecCommand?(t=this._callCmdFn("execCommand",arguments),n._ignoreContentChange||n.fireEvent("contentchange")):(n.__hasEnterExecCommand=!0,-1!=n.queryCommandState.apply(n,arguments)&&(n.fireEvent("beforeexeccommand",e),t=this._callCmdFn("execCommand",arguments),n._ignoreContentChange||n.fireEvent("contentchange"),n.fireEvent("afterexeccommand",e)),n.__hasEnterExecCommand=!1),n._ignoreContentChange||n._selectionChange(null,null,e),t):null},queryCommandState:function(e){return this._callCmdFn("queryCommandState",arguments)},queryCommandValue:function(e){return this._callCmdFn("queryCommandValue",arguments)},hasContents:function(e){if(e)for(var t,n=0;t=e[n++];)if(0<this.document.getElementsByTagName(t).length)return!0
if(!te.isEmptyBlock(this.body))return!0
for(e=["div"],n=0;t=e[n++];)for(var i,o=te.getElementsByTagName(this.document,t),r=0;i=o[r++];)if(te.isCustomeNode(i))return!0
return!1},reset:function(){this.fireEvent("reset")},setEnabled:function(){var t,n=this
if("false"==n.body.contentEditable){n.body.contentEditable=!0,t=n.selection.getRange()
try{t.moveToBookmark(n.lastBk),delete n.lastBk}catch(e){t.setStartAtFirst(n.body).collapse(!0)}t.select(!0),n.bkqueryCommandState&&(n.queryCommandState=n.bkqueryCommandState,delete n.bkqueryCommandState),n.fireEvent("selectionchange",!1,!1,"setEnabled")}},enable:function(){return this.setEnabled()},setDisabled:function(t){var n=this
t=t?J.isArray(t)?t:[t]:[],"true"==n.body.contentEditable&&(n.lastBk||(n.lastBk=n.selection.getRange().createBookmark(!0)),n.body.contentEditable=!1,n.bkqueryCommandState=n.queryCommandState,n.queryCommandState=function(e){return-1!=J.indexOf(t,e)?n.bkqueryCommandState.apply(n,arguments):-1},n.fireEvent("selectionchange",!1,!1,"setDisabled"))},disable:function(e){return this.setDisabled(e)},_setDefaultContent:function(e){this.body.innerHTML='<p id="initContent">'+e+"</p>",this.addListener("firstBeforeExecCommand focus",g)},setShow:function(){var t=this,n=t.selection.getRange()
if("none"==t.container.style.display){try{n.moveToBookmark(t.lastBk),delete t.lastBk}catch(e){n.setStartAtFirst(t.body).collapse(!0)}setTimeout(function(){n.select(!0)},100),t.container.style.display=""}},show:function(){return this.setShow()},setHide:function(){this.lastBk||(this.lastBk=this.selection.getRange().createBookmark(!0)),this.container.style.display="none"},hide:function(){return this.setHide()},getLang:function(e){var t=UE.I18N[this.options.lang]
if(!t)throw Error("not import language file")
e=(e||"").split(".")
for(var n,i=0;(n=e[i++])&&(t=t[n]););return t},getContentLength:function(e,t){var n=this.getContent(!1,!1,!0).length
if(e){t=(t||[]).concat(["hr","img","iframe"]),n=this.getContentTxt().replace(/[\t\r\n]+/g,"").length
for(var i,o=0;i=t[o++];)n+=this.document.getElementsByTagName(i).length}return n},nativeNodeTraversal:function(e){return e.childNodes&&e.childNodes.length&&function(e,t){if(e.childNodes&&e.childNodes.length)for(var n,i=0;n=e.childNodes[i];)nodeTraversal(n,t),n.parentNode&&(n.childNodes&&n.childNodes.length&&t(n),n.parentNode&&i++)
else t(e)}(e),e},addInputRule:function(e){this.inputRules.push(e)},addInputNativeNodeRule:function(e){this.inputNativeNodeRules.push(e)},filterInputNativeNode:function(e){for(var t,n=0;t=this.inputNativeNodeRules[n++];)t.call(this,e)},filterInputRule:function(e){for(var t,n=0;t=this.inputRules[n++];)t.call(this,e)},addOutputRule:function(e){this.outputRules.push(e)},filterOutputRule:function(e){for(var t,n=0;t=this.outputRules[n++];)t.call(this,e)}},J.inherits(d,i),UE.ajax=function(){var t="XMLHttpRequest()"
try{new ActiveXObject("Msxml2.XMLHTTP"),t="ActiveXObject('Msxml2.XMLHTTP')"}catch(e){try{new ActiveXObject("Microsoft.XMLHTTP"),t="ActiveXObject('Microsoft.XMLHTTP')"}catch(e){}}var c=new Function("return new "+t)
function u(e){var t=[]
for(var n in e)"method"!=n&&"timeout"!=n&&"async"!=n&&"function"!=_typeof(e[n]).toLowerCase()&&"object"!=_typeof(e[n]).toLowerCase()&&t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]))
return t.join("&")}return{request:function(e,t){var n=c(),i=!1,o={method:"POST",timeout:5e3,async:!0,data:{},onsuccess:function(){},onerror:function(){}}
if("object"===(void 0===e?"undefined":_typeof(e))&&(e=(t=e).url),n&&e){var r=t?J.extend(o,t):o,a=u(r)
J.isEmptyObject(r.data)||(a+=(a?"&":"")+u(r.data))
var s=setTimeout(function(){4!=n.readyState&&(i=!0,n.abort(),clearTimeout(s))},r.timeout),l=r.method.toUpperCase(),d=e+(-1==e.indexOf("?")?"?":"&")+("POST"==l?"":a+"&noCache="+ +new Date)
n.open(l,d,r.async),n.onreadystatechange=function(){4==n.readyState&&(i||200!=n.status?r.onerror(n):r.onsuccess(n))},"POST"==l?(n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.send(a)):n.send(null)}}}}()
var v,b,C
UE.filterWord=function(e){return/(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<v:)/gi.test(e)?e.replace(/[\t\r\n]+/g,"").replace(/<!--[\s\S]*?-->/gi,"").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi,function(e){if(Z.opera)return""
try{var t=e.match(/width:([ \d.]*p[tx])/i)[1],n=e.match(/height:([ \d.]*p[tx])/i)[1],i=e.match(/src=\s*"([^"]*)"/i)[1]
return'<img width="'+N(t)+'" height="'+N(n)+'" src="'+i+'" />'}catch(e){return""}}).replace(/<\/?div[^>]*>/g,"").replace(/v:\w+=(["']?)[^'"]+\1/g,"").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi,"").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi,"<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/gi,function(e,t,n,i){return"class"==t&&"MsoListParagraph"==i?e:""}).replace(/<(font|span)[^>]*>\s*<\/\1>/gi,"").replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi,function(e,t,n,i){for(var o,r=[],a=i.replace(/^\s+|\s+$/,"").replace(/&#39;/g,"'").replace(/&quot;/gi,"'").split(/;\s*/g),s=0;o=a[s];s++){var l,d,c=o.split(":")
if(2==c.length){if(l=c[0].toLowerCase(),d=c[1].toLowerCase(),/^(background)\w*/.test(l)&&0==d.replace(/(initial|\s)/g,"").length||/^(margin)\w*/.test(l)&&/^0\w+$/.test(d))continue
switch(l){case"mso-padding-alt":case"mso-padding-top-alt":case"mso-padding-right-alt":case"mso-padding-bottom-alt":case"mso-padding-left-alt":case"mso-margin-alt":case"mso-margin-top-alt":case"mso-margin-right-alt":case"mso-margin-bottom-alt":case"mso-margin-left-alt":case"mso-height":case"mso-width":case"mso-vertical-align-alt":/<table/.test(t)||(r[s]=l.replace(/^mso-|-alt$/g,"")+":"+N(d))
continue
case"horiz-align":r[s]="text-align:"+d
continue
case"vert-align":r[s]="vertical-align:"+d
continue
case"font-color":case"mso-foreground":r[s]="color:"+d
continue
case"mso-background":case"mso-highlight":r[s]="background:"+d
continue
case"mso-default-height":r[s]="min-height:"+N(d)
continue
case"mso-default-width":r[s]="min-width:"+N(d)
continue
case"mso-padding-between-alt":r[s]="border-collapse:separate;border-spacing:"+N(d)
continue
case"text-line-through":"single"!=d&&"double"!=d||(r[s]="text-decoration:line-through")
continue
case"mso-zero-height":"yes"==d&&(r[s]="display:none")
continue
case"background":break
case"margin":if(!/[1-9]/.test(d))continue
case"font-family":d=c[1].replace(/'([^\s']+)'/g,"$1"),/'([^']+)'/.test(d)||(r[s]="font-family:"+d)
continue}if(/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(l)||/text\-indent|padding|margin/.test(l)&&/\-[\d.]+/.test(d))continue
r[s]=l+":"+c[1]}}return t+(r.length?' style="'+r.join(";").replace(/;{2,}/g,";")+'"':"")}).replace(/[\d]+(\.\d+)?(cm|pt)(?=[^<]*>)/g,function(e){return J.transUnitToPx(e)}):e}
function N(e){return e=e.replace(/[\d.]+\w+/g,function(e){return J.transUnitToPx(e)})}function x(e,t,n){return e.push(C),t+(n?1:-1)}function w(e,t){for(var n=0;n<t;n++)e.push(b)}function k(e,t,n,i){switch(e.type){case"root":for(var o,r=0;o=e.children[r++];)n&&"element"==o.type&&!ee.$inlineWithA[o.tagName]&&1<r&&(x(t,i,!0),w(t,i)),k(o,t,n,i)
break
case"text":!function(e,t){var n=e,i=!1
for(;n=n.parentNode;)if("pre"==n.tagName||"code"==n.tagName){i=!0
break}i?t.push(e.data):t.push(e.data.replace(/[ ]{2}/g," &nbsp;"))}(e,t)
break
case"element":!function(e,t,n,i){var o=""
if(e.attrs){o=[]
var r=e.attrs
for(var a in r)o.push(a+(void 0!==r[a]?'="'+J.unhtml(r[a])+'"':""))
o=o.join(" ")}t.push("<"+e.tagName+(o?" "+o:"")+(ee.$empty[e.tagName]?"/":"")+">"),!n||ee.$inlineWithA[e.tagName]||"pre"==e.tagName||e.children&&e.children.length&&(i=x(t,i,!0),w(t,i))
if(e.children&&e.children.length)for(var s,l=0;s=e.children[l++];)n&&"element"==s.type&&!ee.$inlineWithA[s.tagName]&&1<l&&(x(t,i),w(t,i)),k(s,t,n,i)
ee.$empty[e.tagName]||(n&&!ee.$inlineWithA[e.tagName]&&"pre"!=e.tagName&&e.children&&e.children.length&&(i=x(t,i),w(t,i)),t.push("</"+e.tagName+">"))}(e,t,n,i)
break
case"comment":a=e,t.push("\x3c!--"+a.data+"--\x3e")}var a
return t}function E(e,t){var n
if("element"==e.type&&e.getAttr("id")==t)return e
if(e.children&&e.children.length)for(var i,o=0;i=e.children[o++];)if(n=E(i,t))return n}function S(e,t,n){if("element"==e.type&&e.tagName==t&&n.push(e),e.children&&e.children.length)for(var i,o=0;i=e.children[o++];)S(i,t,n)}v=UE.uNode=function(e){this.type=e.type,this.data=e.data,this.tagName=e.tagName,this.parentNode=e.parentNode,this.attrs=e.attrs||{},this.children=e.children},b="    ",C="\n",v.createElement=function(e){return/[<>]/.test(e)?UE.htmlparser(e).children[0]:new v({type:"element",children:[],tagName:e})},v.createFillChar=function(e){return new UE.uNode({type:"text",data:te.fillCharEncode})},v.createText=function(e){return new UE.uNode({type:"text",data:J.unhtml(e||"")})},v.prototype={toHtml:function(e){var t=[]
return k(this,t,e,0),t.join("").replace(new RegExp(te.fillChar,"g"),"")},innerHTML:function(e){if("element"!=this.type||ee.$empty[this.tagName])return this
if(J.isString(e)){if(this.children)for(var t=0;n=this.children[t++];)n.parentNode=null
this.children=[]
var n,i=UE.htmlparser(e)
for(t=0;n=i.children[t++];)this.children.push(n),n.parentNode=this
return this}return(i=new UE.uNode({type:"root",children:this.children})).toHtml()},innerText:function(e){if("element"!=this.type||ee.$empty[this.tagName])return this
if(e){if(this.children)for(var t,n=0;t=this.children[n++];)t.parentNode=null
return this.children=[],this.appendChild(v.createText(e)),this}return this.toHtml().replace(/<[^>]+>/g,"")},getData:function(){return"element"==this.type?"":this.data},firstChild:function(){return this.children?this.children[0]:null},lastChild:function(){return this.children?this.children[this.children.length-1]:null},previousSibling:function(){for(var e,t=this.parentNode,n=0;e=t.children[n];n++)if(e===this)return 0==n?null:t.children[n-1]},nextSibling:function(){for(var e,t=this.parentNode,n=0;e=t.children[n++];)if(e===this)return t.children[n]},replaceChild:function(e,t){if(this.children){e.parentNode&&e.parentNode.removeChild(e)
for(var n,i=0;n=this.children[i];i++)if(n===t)return this.children.splice(i,1,e),t.parentNode=null,e.parentNode=this,e}},appendChild:function(e){if("root"==this.type||"element"==this.type&&!ee.$empty[this.tagName]){this.children||(this.children=[]),e.parentNode&&e.parentNode.removeChild(e)
for(var t,n=0;t=this.children[n];n++)if(t===e){this.children.splice(n,1)
break}return this.children.push(e),e.parentNode=this,e}},insertBefore:function(e,t){if(this.children){e.parentNode&&e.parentNode.removeChild(e)
for(var n,i=0;n=this.children[i];i++)if(n===t)return this.children.splice(i,0,e),e.parentNode=this,e}},insertAfter:function(e,t){if(this.children){e.parentNode&&e.parentNode.removeChild(e)
for(var n,i=0;n=this.children[i];i++)if(n===t)return this.children.splice(i+1,0,e),e.parentNode=this,e}},removeChild:function(e,t){if(this.children)for(var n,i=0;n=this.children[i];i++)if(n===e){if(this.children.splice(i,1),n.parentNode=null,t&&n.children&&n.children.length)for(var o,r=0;o=n.children[r];r++)this.children.splice(i+r,0,o),o.parentNode=this
return n}},getAttr:function(e){return this.attrs&&this.attrs[e.toLowerCase()]},setAttr:function(e,t){if(e)if(this.attrs||(this.attrs={}),J.isObject(e))for(var n in e)e[n]?this.attrs[n.toLowerCase()]=e[n]:delete this.attrs[n]
else t?this.attrs[e.toLowerCase()]=t:delete this.attrs[e]
else delete this.attrs},getIndex:function(){for(var e,t=this.parentNode,n=0;e=t.children[n];n++)if(e===this)return n
return-1},getNodeById:function(e){var t
if(this.children&&this.children.length)for(var n,i=0;n=this.children[i++];)if(t=E(n,e))return t},getNodesByTagName:function(e){e=J.trim(e).replace(/[ ]{2,}/g," ").split(" ")
var i=[],o=this
return J.each(e,function(e){if(o.children&&o.children.length)for(var t,n=0;t=o.children[n++];)S(t,e,i)}),i},getStyle:function(e){var t=this.getAttr("style")
if(!t)return""
var n=new RegExp(e+":([^;]+)","i"),i=t.match(n)
return i&&i[0]?i[1]:""},setStyle:function(e,t){function n(e,t){var n=new RegExp(e+":([^;]+;?)","gi")
i=i.replace(n,""),t&&(i=e+":"+J.unhtml(t)+";"+i)}var i=this.getAttr("style")
if(i=i||"",J.isObject(e))for(var o in e)n(o,e[o])
else n(e,t)
this.setAttr("style",J.trim(i))},traversal:function(e){return this.children&&this.children.length&&function e(t,n){if(t.children&&t.children.length)for(var i,o=0;i=t.children[o];)e(i,n),i.parentNode&&(i.children&&i.children.length&&n(i),i.parentNode&&o++)
else n(t)}(this,e),this}}
var B,I,L,D,A,P,M,U,H,O,q,j,V,F,W,z,X,K,Y,G,ne,ie,oe,re,ae,se,le,de,ce,ue,me,he,fe,pe,ge,ve,be,ye,Ce,Ne,xe,we,ke,Ee,Te,Se,Be,Ie,_e,Re,Le,De,Ae,Pe,Me,Ue,He,Oe,qe,$e,je,Ve,Fe,We,ze,Xe,Ke,Ye,Ge,Je,Qe,Ze,et,tt,nt,it,ot,rt,at,st,lt,dt,ct,ut,mt,ht,ft,pt,gt,vt,bt,yt,Ct,Nt,xt,wt,kt,Et,Tt,St,Bt,It,_t,Rt,Lt
UE.htmlparser=function(e,n){var t=/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,d=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,i={b:1,code:1,i:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,span:1,sub:1,img:1,sup:1,font:1,big:1,small:1,iframe:1,a:1,br:1,pre:1}
e=e.replace(new RegExp(te.fillChar,"g"),""),n||(e=e.replace(new RegExp("[\\r\\t\\n"+(n?"":" ")+"]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n"+(n?"":" ")+"]*","g"),function(e,t){return t&&i[t.toLowerCase()]?e.replace(/(^[\n\r]+)|([\n\r]+$)/g,""):e.replace(new RegExp("^[\\r\\n"+(n?"":" ")+"]+"),"").replace(new RegExp("[\\r\\n"+(n?"":" ")+"]+$"),"")}))
var c=UE.uNode,u={td:"tr",tr:["tbody","thead","tfoot"],tbody:"table",th:"tr",thead:"table",tfoot:"table",caption:"table",li:["ul","ol"],dt:"dl",dd:"dl",option:"select"},o={ol:"li",ul:"li"}
function r(e,t){if(o[e.tagName]){var n=c.createElement(o[e.tagName])
e.appendChild(n),n.appendChild(c.createText(t)),e=n}else e.appendChild(c.createText(t))}function m(e,t,n){var i
if(i=u[t]){for(var o,r=e;"root"!=r.type;){if(J.isArray(i)?-1!=J.indexOf(i,r.tagName):i==r.tagName){e=r,o=!0
break}r=r.parentNode}o||(e=m(e,J.isArray(i)?i[0]:i))}var a=new c({parentNode:e,type:"element",tagName:t.toLowerCase(),children:ee.$empty[t]?null:[]})
if(n){for(var s,l={};s=d.exec(n);)l[s[1].toLowerCase()]=J.unhtml(s[2]||s[3]||s[4])
a.attrs=l}return e.children.push(a),ee.$empty[t]?e:a}for(var a,s,l,h=0,f=0,p=new c({type:"root",children:[]}),g=p;a=t.exec(e);){h=a.index
try{if(f<h&&r(g,e.slice(f,h)),a[3])g=m(g,a[3].toLowerCase(),a[4])
else if(a[1]){if("root"!=g.type){for(var v=g;"element"==g.type&&g.tagName!=a[1].toLowerCase();)if("root"==(g=g.parentNode).type)throw g=v,"break"
g=g.parentNode}}else a[2]&&(s=g,l=a[2],s.children.push(new c({type:"comment",data:l,parentNode:s})))}catch(e){}f=t.lastIndex}return f<e.length&&r(g,e.slice(f)),p},UE.filterNode=function(e,t){if(J.isEmptyObject(t))return e
var n;(n=t["-"])&&J.each(n.split(" "),function(e){t[e]="-"})
for(var i,o=0;i=e.children[o];)Dt(i,t),i.parentNode&&o++
return e}
function Dt(n,e){switch(n.type){case"text":break
case"element":var t
if(t=e[n.tagName])if("-"===t)n.parentNode.removeChild(n)
else if(J.isFunction(t)){var i=n.parentNode,o=n.getIndex()
if(t(n),n.parentNode){if(n.children)for(var r=0;u=n.children[r];)Dt(u,e),u.parentNode&&r++}else for(r=o;u=i.children[r];)Dt(u,e),u.parentNode&&r++}else{var a=t.$
if(a&&n.attrs){var s,l={}
for(var d in a){if(s=n.getAttr(d),"style"==d&&J.isArray(a[d])){var c=[]
J.each(a[d],function(e){var t;(t=n.getStyle(e))&&c.push(e+":"+t)}),s=c.join(";")}s&&(l[d]=s)}n.attrs=l}if(n.children)for(r=0;u=n.children[r];)Dt(u,e),u.parentNode&&r++}else if(ee.$cdata[n.tagName])n.parentNode.removeChild(n)
else{i=n.parentNode,o=n.getIndex()
n.parentNode.removeChild(n,!0)
var u
for(r=o;u=i.children[r];)Dt(u,e),u.parentNode&&r++}break
case"comment":n.parentNode.removeChild(n)}}function At(e){return I.getTableItemsByRange(e)}function Pt(e){return I.getUETableBySelected(e)}function Mt(e,t){return I.getDefaultValue(e,t)}function Ut(e){return I.getUETable(e)}function Ht(e){var t=At(e).cell
if(t){var n=Ut(t)
return n.selectedTds.length?n.selectedTds:[t]}return[]}function Ot(){var e=document.getElementById("edui_fixedlayer")
H.setViewportOffset(e,{left:0,top:0})}function qt(e){for(var t,n=e.editor.options.autotypeset,i=e.getDom(),o=e.editor.uid,r=null,a=te.getElementsByTagName(i,"input"),s=a.length-1;t=a[s--];)if("checkbox"==t.getAttribute("type")&&(n[r=t.getAttribute("name")]&&delete n[r],t.checked)){var l=document.getElementById(r+"Value"+o)
if(l){if(/input/gi.test(l.tagName))n[r]=l.value
else for(var d,c=l.getElementsByTagName("input"),u=c.length-1;d=c[u--];)if(d.checked){n[r]=d.value
break}}else n[r]=!0}var m,h=te.getElementsByTagName(i,"select")
for(s=0;m=h[s++];){var f=m.getAttribute("name")
n[f]=n[f]?m.value:""}e.editor.options.autotypeset=n}function $t(e){var t=e.target||e.srcElement
if(!Tt.findParent(t,function(e){return Tt.hasClass(e,"edui-shortcutmenu")||Tt.hasClass(e,"edui-popup")},!0))for(var n,i=0;n=St[i++];)n.hide()}UE.plugins.defaultfilter=function(){var c=this
c.setOpt("allowDivTransToP",!0),c.addInputRule(function(e){var s,l=this.options.allowDivTransToP
e.traversal(function(t){if("element"==t.type){if(!ee.$cdata[t.tagName]&&c.options.autoClearEmptyNode&&ee.$inline[t.tagName]&&!ee.$empty[t.tagName]&&(!t.attrs||J.isEmptyObject(t.attrs)))return void(t.firstChild()?"span"!=t.tagName||t.attrs&&!J.isEmptyObject(t.attrs)||t.parentNode.removeChild(t,!0):t.parentNode.removeChild(t))
switch(t.tagName){case"style":case"script":t.setAttr({cdata_tag:t.tagName,cdata_data:encodeURIComponent(t.innerText()||"")}),t.tagName="div",t.removeChild(t.firstChild())
break
case"a":(s=t.getAttr("href"))&&t.setAttr("_href",s)
break
case"img":s=t.getAttr("src"),/^wewebkit-fake-url:\/\//i.test(s)?t.parentNode.removeChild(t):/^data:/.test(s)
break
case"hr":var e=t.getAttr("style")||"";(e=e.replace(/\s/g,"").replace(/;$/,""))&&"white-space:normal"!==e||t.setAttr("style","border-style: solid;border-width: 1px 0 0;border-color: rgba(0,0,0,0.1);-webkit-transform-origin: 0 0;-webkit-transform: scale(1, 0.5);transform-origin: 0 0;transform: scale(1, 0.5);")
break
case"span":Z.webkit&&(s=t.getStyle("white-space"))&&/nowrap|normal/.test(s)&&(t.setStyle("white-space",""),c.options.autoClearEmptyNode&&J.isEmptyObject(t.attrs)&&t.parentNode.removeChild(t,!0)),t.getAttr("data-fillchar")&&0==t.innerHTML().replace(te.fillCharReg,"").length&&(Z.ie11below?t.appendChild(UE.uNode.createFillChar()):(t.parentNode.insertBefore(UE.uNode.createElement("br"),t),t.parentNode.removeChild(t)))
break
case"p":(s=t.getAttr("align"))&&(t.setAttr("align"),t.setStyle("text-align",s)),t.firstChild()?1==t.children.length&&"br"==t.children[0].tagName&&Z.ie11below&&(t.removeChild(t.children[0]),t.appendChild(UE.uNode.createFillChar())):Z.ie11below?t.appendChild(UE.uNode.createFillChar()):t.innerHTML("<br />")
break
case"section":t.firstChild()?1==t.children.length&&"br"==t.children[0].tagName&&Z.ie11below&&(t.removeChild(t.children[0]),t.appendChild(UE.uNode.createFillChar())):Z.ie11below?t.appendChild(UE.uNode.createFillChar()):t.innerHTML("<br />")
break
case"div":if(t.getAttr("cdata_tag"))break
if((s=t.getAttr("class"))&&/^line number\d+/.test(s)||"pre"===t.parentNode.tagName)break
if(!l)break
for(var n,i=UE.uNode.createElement("p");n=t.firstChild();)"text"!=n.type&&UE.dom.dtd.$block[n.tagName]?i.firstChild()?(t.parentNode.insertBefore(i,t),i=UE.uNode.createElement("p")):t.parentNode.insertBefore(n,t):i.appendChild(n)
i.firstChild()&&t.parentNode.insertBefore(i,t),t.parentNode.removeChild(t)
break
case"dl":t.tagName="ul"
break
case"dt":case"dd":t.tagName="li"
break
case"li":var o=t.getAttr("class")
if(!o||!/list\-/.test(o)){var r=t.getAttr("style")
t.setAttr(),t.setAttr("style",r)}var a=t.getNodesByTagName("ol ul")
UE.utils.each(a,function(e){t.parentNode.insertAfter(e,t)})
break
case"td":case"th":case"caption":t.children&&t.children.length||t.appendChild(Z.ie11below?UE.uNode.createText(" "):UE.uNode.createElement("br"))}}"comment"==t.type&&t.parentNode.removeChild(t)})}),c.addInputNativeNodeRule(function(e){if(Z.ie11below)for(var t=function(e){return!(te.isBody(e)||3==e.nodeType&&0==(e.nodeValue||"").replace(te.fillCharReg,"").length)},n=e.getElementsByTagName("br"),i=0;i<n.length;i++){var o=n[i]
if(o.parentNode){var r,a=te.findPreviousSibling(o,t,!1),s=!1,l=te.findNextSibling(o,t,!1)
if(!a)for(a=o;a=a&&te.findParent(a,null,!1);){if(/^(td|li)$/i.test(a.nodeName)){a=null
break}if(r=te.findPreviousSibling(a,t,!1)){a=r
break}}if(s=!(a&&!te.isBlockElm2(a)),!l)for(l=o;l=l&&te.findParent(l,null,!1);){if(/^(td|li)$/i.test(l.nodeName)){l=null
break}if(r=te.findNextSibling(l,t,!1)){l=r
break}}if(!1!==!(l&&!te.isBlockElm2(l)))if(!1===s)o.parentNode.removeChild(o),--i
else if(!0===s){var d=c.document.createElement("div")
d.innerHTML='<span data-fillchar="1">'+te.fillChar+"</span>",o.parentNode.insertBefore(d.children[0],o),o.parentNode.removeChild(o),--i}}}}),c.addOutputRule(function(e){var t
e.traversal(function(e){if("element"==e.type){if(!0===c.fireEvent("isInCodeBlockVirtual",e))return
if(c.options.autoClearEmptyNode&&ee.$inline[e.tagName]&&!ee.$empty[e.tagName]&&(!e.attrs||J.isEmptyObject(e.attrs)))return void(e.firstChild()?"span"!=e.tagName||e.attrs&&!J.isEmptyObject(e.attrs)||e.parentNode.removeChild(e,!0):e.parentNode.removeChild(e))
switch(e.tagName){case"div":(t=e.getAttr("cdata_tag"))&&(e.tagName=t,e.appendChild(UE.uNode.createText(e.getAttr("cdata_data"))),e.setAttr({cdata_tag:"",cdata_data:""}))
break
case"a":(t=e.getAttr("_href"))&&e.setAttr({href:t,_href:""})
break
case"img":(t=e.getAttr("_src")&&!e.getAttr("src"))&&e.setAttr({src:e.getAttr("_src")}),e.setAttr({_src:""})
break
case"span":Z.ie11below&&e.getAttr("data-fillchar")&&0==e.innerHTML().replace(te.fillCharReg,"").length&&(e.parentNode.insertBefore(UE.uNode.createElement("br"),e),e.parentNode.removeChild(e))
break
case"p":case"section":e.firstChild()?1==e.children.length&&"br"==e.children[0].tagName&&Z.ie11below&&(e.removeChild(e.children[0]),e.appendChild(UE.uNode.createFillChar())):Z.ie11below?e.appendChild(UE.uNode.createFillChar()):e.innerHTML("<br />")}}})})},UE.commands.inserthtml={execCommand:function(e,t,n){var i,o,r=this,a=[]
if(!t)return a
if(!0===r.fireEvent("beforeinserthtml",t))return a
var s=!1
if("[object Object]"===Object.prototype.toString.call(n)&&(s=n.noSelect,n=n.notNeedFilter),(o=(i=r.selection.getRange()).document.createElement("div")).style.display="inline",!n){var l=UE.htmlparser(t)
r.options.filterRules&&UE.filterNode(l,r.options.filterRules),r.filterInputRule(l),t=l.toHtml()}if(o.innerHTML=J.trim(t),!i.collapsed){var d=i.startContainer
if(te.isFillChar(d)&&i.setStartBefore(d),d=i.endContainer,te.isFillChar(d)&&i.setEndAfter(d),i.txtToElmBoundary(),i.endContainer&&1==i.endContainer.nodeType&&(d=i.endContainer.childNodes[i.endOffset])&&te.isBr(d)&&i.setEndAfter(d),0==i.startOffset&&(d=i.startContainer,te.isBoundaryNode(d,"firstChild")&&(d=i.endContainer,i.endOffset==(3==d.nodeType?d.nodeValue.length:d.childNodes.length)&&te.isBoundaryNode(d,"lastChild")&&(r.body.innerHTML="<p>"+(Z.ie11below?te.fillChar:"<br/>")+"</p>",i.setStart(r.body.firstChild,0).collapse(!0)))),i.collapsed||i.deleteContents(),1==i.startContainer.nodeType)if((c=i.startContainer.childNodes[i.startOffset])&&te.isBlockElm2(c)&&(k=c.previousSibling)&&te.isBlockElm2(k)){for(i.setEnd(k,k.childNodes.length).collapse();c.firstChild;)k.appendChild(c.firstChild)
te.remove(c)}}var c,u,m,h,f=0
i.inFillChar()&&(c=i.startContainer,te.isFillChar(c)?(i.setStartBefore(c).collapse(!0),te.remove(c)):te.isFillChar(c,!0)&&(c.nodeValue=c.nodeValue.replace(T,""),i.startOffset--,i.collapsed&&i.collapse(!0)))
var p=te.findParentByTagName(i.startContainer,"li",!0)
if(p){for(var g;c=o.firstChild;){for(;c&&(3==c.nodeType||!te.isBlockElm2(c)||"HR"==c.tagName);)E=c.nextSibling,i.insertNode(c).collapse(),a.push(c),g=c,c=E
if(c)if(/^(ol|ul)$/i.test(c.tagName)){for(;c.firstChild;)g=c.firstChild,te.insertAfter(p,c.firstChild),a.push(g),p=p.nextSibling
te.remove(c)}else{var v
E=c.nextSibling,v=r.document.createElement("li"),te.insertAfter(p,v),v.appendChild(c),g=c,a.push(g),c=E,p=v}}p=te.findParentByTagName(i.startContainer,"li",!0),te.isEmptyBlock(p)&&te.remove(p),g&&(i.setStartAfter(g).collapse(!0),!0!==s&&i.select(!0))}else{for(;c=o.firstChild;){if(f){for(var b=r.document.createElement("p");c&&(3==c.nodeType||!ee.$block2[c.tagName]);)h=c.nextSibling,b.appendChild(c),c=h
b.firstChild&&(c=b)}if(i.insertNode(c),a.push(c),h=c.nextSibling,!f&&c.nodeType==te.NODE_ELEMENT&&te.isBlockElm2(c)&&2!==te.isContentEditable({node:c,checkParent:!1})){if(c&&1==c.nodeType&&("p"==c.tagName.toLowerCase()||0<c.getElementsByTagName("p").length)){var y=te.findParentByTagName(c,"p")
u=y&&!te.isBody(y)?y:te.findParent(c,function(e){return te.isBlockElm2(e)})}else u=te.findParent(c,function(e){return te.isBlockElm2(e)})
if(u&&"body"!=u.nodeName.toLowerCase()&&(!ee[u.nodeName]||!ee[u.nodeName][c.nodeName]||c.parentNode!==u)){if(ee[u.nodeName]&&ee[u.nodeName][c.nodeName])for(m=c.parentNode;m&&m!==u;)m=(k=m).parentNode
else k=u
for(var C=te.breakParent({node:c,parent:k||m,returnNewDom:!0}),N=0,x=C.length;N<x;N++){var w=C[N]
te.removePluginDefaultClass({node:w})}var k;(k=c.previousSibling)&&(te.trimWhiteTextNode(k),k.childNodes.length||te.remove(k)),!Z.ie&&(E=c.nextSibling)&&te.isBlockElm2(E)&&E.lastChild&&!te.isBr(E.lastChild)&&!te.isBlockElm2(E.lastChild)&&E.appendChild(r.document.createElement("br")),f=1}}var E=c.nextSibling
if(!o.firstChild&&E&&te.isBlockElm2(E)){i.setStart(E,0).collapse(!0)
break}i.setEndAfter(c).collapse()}if(c=i.startContainer,h&&te.isBr(h)&&te.remove(h),te.isBlockElm2(c)&&te.isEmptyNode(c))if(h=c.nextSibling)te.remove(c),1==h.nodeType&&ee.$block2[h.tagName]&&i.setStart(h,0).collapse(!0).shrinkBoundary()
else try{c.innerHTML=Z.ie11below?te.fillChar:"<br/>"}catch(e){i.setStartBefore(c),te.remove(c)}if(!0!==s)try{i.select(!0)}catch(e){}}return setTimeout(function(){(i=r.selection.getRange()).scrollToView(r.autoHeightEnabled,r.autoHeightEnabled?te.getXY(r.iframe).y-200:0),r.fireEvent("afterinserthtml","",a)},200),a}},UE.plugins.autosubmit=function(){this.commands.autosubmit={execCommand:function(){var e=te.findParentByTagName(this.iframe,"form",!1)
if(e){if(!1===this.fireEvent("beforesubmit"))return
this.sync(),e.submit()}}},this.addshortcutkey({autosubmit:"ctrl+13"})},UE.commands.imagefloat={execCommand:function(e,t){var n=this,i=n.selection.getRange()
if(!i.collapsed){var o=i.getClosedNode()
if(o&&"IMG"==o.tagName)switch(t){case"left":case"right":case"none":for(var r,a,s,l=o.parentNode;ee.$inline[l.tagName]||"A"==l.tagName;)l=l.parentNode
if("P"==(r=l).tagName&&"center"==te.getStyle(r,"text-align")){if(!te.isBody(r)&&1==te.getChildCount(r,function(e){return!te.isBr(e)&&!te.isWhitespace(e)}))if(a=r.previousSibling,s=r.nextSibling,a&&s&&1==a.nodeType&&1==s.nodeType&&a.tagName==s.tagName&&te.isBlockElm(a)){for(a.appendChild(r.firstChild);s.firstChild;)a.appendChild(s.firstChild)
te.remove(r),te.remove(s)}else te.setStyle(r,"text-align","")
i.selectNode(o).select()}te.setStyle(o,"float","none"==t?"":t),"none"==t&&te.removeAttributes(o,"align")
break
case"center":if("center"!=n.queryCommandValue("imagefloat")){for(l=o.parentNode,te.setStyle(o,"float",""),te.removeAttributes(o,"align"),r=o;l&&1==te.getChildCount(l,function(e){return!te.isBr(e)&&!te.isWhitespace(e)})&&(ee.$inline[l.tagName]||"A"==l.tagName);)l=(r=l).parentNode
i.setStartBefore(r).setCursor(!1),(l=n.document.createElement("div")).appendChild(r),te.setStyle(r,"float",""),n.execCommand("insertHtml",'<p id="_img_parent_tmp" style="text-align:center">'+l.innerHTML+"</p>")
var d=(r=n.document.getElementById("_img_parent_tmp")).getElementsByTagName("img")[0]
r.removeAttribute("id"),r=r.firstChild,i.selectNode(d).select(),(s=r.parentNode.nextSibling)&&te.isEmptyNode(s)&&te.remove(s)}}}},queryCommandValue:function(){var e,t,n=this.selection.getRange()
return!n.collapsed&&(e=n.getClosedNode())&&1==e.nodeType&&"IMG"==e.tagName?("none"==(t=e.getAttribute("align")||te.getComputedStyle(e,"float"))&&(t="center"==te.getComputedStyle(e.parentNode,"text-align")?"center":t),{left:1,right:1,center:1}[t]?t:"none"):"none"},queryCommandState:function(e,t,n){var i=2<arguments.length&&void 0!==n?n:{}
if(i.allDomInRange&&i.allDomInRange[0]&&2===te.isContentEditable({node:i.allDomInRange[0],checkParent:!1}))return-1
var o,r=this.selection.getRange()
return!r.collapsed&&(o=r.getClosedNode())&&1==o.nodeType&&"IMG"==o.tagName?0:-1}},UE.plugins.justify=function(){function o(e,t){function n(e){return 1==e.nodeType?!te.isBookmarkNode(e)&&2!==te.isContentEditable({node:e,checkParent:!0}):!te.isWhitespace(e)}function i(e){var t=0<arguments.length&&void 0!==e?e:{},n=t.node,i=J.isString(t.style)?{"text-align":t.style}:t.style,o=null
if(te.isContainUneditable({node:n,ignoreMarkNode:!0})){var r={style:""}
for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(r.style+=a+":"+i[a]+";")
var s=te.breadByUneditable({node:n,attrs:r,applyUneditablParent:!1})
s&&s[s.length-1]&&(o=s[s.length-1])}else te.setStyles(n,i),o=n
return o}var o=e.createBookmark()
e.enlarge(!0)
for(var r=e.createBookmark(),a=te.getNextDomNode(r.start,!1,n),s=e.cloneRange(),l=null;a&&!(te.getPosition(a,r.end)&te.POSITION_FOLLOWING);)if(3!=a.nodeType&&b(a)&&"br"!==a.nodeName.toLowerCase())a=te.getNextDomNode(a,!0,n)
else{for(s.setStartBefore(a),l=a;a&&a!==r.end&&!b(a);)l=a,a=te.getNextDomNode(a,!1,null,function(e){return!b(e)})
s.setEndAfter(l),l=null
var d=s.getCommonAncestor()
if(!te.isBody(d)&&b(d))a=i({node:d,style:t})
else{for(var c=s.extractContents(),u=!0,m=c.firstChild;m;){if(!te.canContainByP({dom:m})){u=!1
break}m=m.nextSibling}var h=e.document.createElement("span")
s.insertNode(h)
var f=h.parentNode,p=""
p=u&&f&&te.canContainP({dom:f})?"p":"section"
var g=e.document.createElement(p)
g.appendChild(c),f.insertBefore(g,h),f.removeChild(h)
var v=g.parentNode
!te.isBody(v)&&v.className&&"[object String]"===Object.prototype.toString.call(v.className)&&(g.className=v.className),a=i({node:g,style:t})}a=te.getNextDomNode(a,!1,n)}return e.moveToBookmark(r).moveToBookmark(o)}var b=te.isBlockElm2,n={left:1,right:1,center:1,justify:1}
UE.commands.justify={execCommand:function(e,t){var n,i=this.selection.getRange()
return i.collapsed&&(n=this.document.createTextNode("p"),i.insertNode(n)),o(i,t),n&&(i.setStartBefore(n).collapse(!0),te.remove(n)),i.select(),!0},queryCommandValue:function(){var e=te.filterNodeList(this.selection.getStartElementPath(),function(e){return te.isBlockElm(e)}),t=te.getComputedStyle(e,"text-align")
return n[t]?t:"left"},queryCommandState:function(e,t,n){var i=2<arguments.length&&void 0!==n?n:{}
if(i.allDomInRange&&i.allDomInRange[0]&&2===te.isContentEditable({node:i.allDomInRange[0],checkParent:!1}))return-1
var o=this.selection.getStart()
return o&&te.findParentByTagName(o,["td","th","caption"],!0)?-1:0}}},UE.plugins.font=function(){var e={forecolor:"color",backcolor:"background-color",letterspacing:"letter-spacing",fontsize:"font-size",fontfamily:"font-family",underline:"text-decoration",strikethrough:"text-decoration",fontborder:"border"},m={underline:1,strikethrough:1,fontborder:1,forecolor:1,fontsize:1,backcolor:1},B={forecolor:"color",backcolor:"background-color",letterspacing:"letter-spacing",fontsize:"font-size",fontfamily:"font-family"}
function h(e,i,o){var t,n=e.collapsed,r=e.createBookmark()
if(n)for(t=r.start.parentNode;ee.$inline[t.tagName];)t=t.parentNode
else t=te.getCommonAncestor(r.start,r.end)
J.each(te.getElementsByTagName(t,"span"),function(e){if(e.parentNode&&!te.isBookmarkNode(e)&&2!==te.isContentEditable({node:e,checkParent:!0}))if(te.isEmptyInlineElement(e))te.remove(e,!1)
else if(/\s*border\s*:\s*none;?\s*/i.test(e.style.cssText))/^\s*border\s*:\s*none;?\s*$/.test(e.style.cssText)?te.remove(e,!0):te.removeStyle(e,"border")
else{if(/border/i.test(e.style.cssText)&&"SPAN"==e.parentNode.tagName&&/border/i.test(e.parentNode.style.cssText)&&(e.style.cssText=e.style.cssText.replace(/border[^:]*:[^;]+;?/gi,"")),"fontborder"!=i||"none"!=o)for(var t=e.nextSibling;t&&1==t.nodeType&&"SPAN"==t.tagName;)if(te.isBookmarkNode(t)&&"fontborder"==i)e.appendChild(t),t=e.nextSibling
else{if(t.style.cssText==e.style.cssText&&(te.moveChild(t,e),te.remove(t)),e.nextSibling===t)break
t=e.nextSibling}if(!function(e){for(var t;(t=e.parentNode)&&"SPAN"==t.tagName&&1==te.getChildCount(t,function(e){return!te.isBookmarkNode(e)&&!te.isBr(e)});)t.style.cssText+=e.style.cssText,te.remove(e,!0),e=t}(e),Z.ie&&8<Z.version){var n=te.findParent(e,function(e){return"SPAN"==e.tagName&&/background-color/.test(e.style.cssText)})
n&&!/background-color/.test(e.style.cssText)&&(e.style.backgroundColor=n.style.backgroundColor)}}}),e.moveToBookmark(r),function(e,t,n){var i=B[t]
if(i){var o=e.createBookmark(),r=null
for(r=e.collapsed?o.start.parentNode:te.getCommonAncestor(o.start,o.end);r&&"span"===r.nodeName.toLowerCase();)r=r.parentNode
if(r){var a=te.getElementsByTagName(r,"span"),s=e.document.createElement("span")
a.push(s)
for(var l=[],d=[],c=!1,u=0;u<a.length;u++){var m=a[u]
if(m===s&&0===d.length)break
if(m!==o.start)if(m!==o.end){if(2!==te.isContentEditable({node:m,checkParent:!0})){var h=null,f=null,p=null
if(0<d.length&&(p=a[h=(f=d[d.length-1]).targetIndex]),0===d.length||p.contains(m)){var g=te.getStyle(m,i)
""===g&&(g=void 0),d.push({targetIndex:u,value:g,isInRange:c,children:[]})}else{if(f.isInRange){for(var v=!0,b=0,y=f.children.length;b<y;b++)if(!f.children[b].isInRange){v=!1
break}f.isInRange=v}!f.isInRange||void 0!==f.value&&f.value===n||(f.value=n,p.setAttribute("data-mpmergeaction","change"))
for(var C=!0,N=0,x=f.children.length;N<x;N++){var w=f.children[N]
w.value===f.value&&w.childValueTheSame?w.node.setAttribute("data-mpmergeaction","remove"):C=!1}f.childValueTheSame=C,0<=d.length-2&&d[d.length-2].children.push({value:f.value,isInRange:f.isInRange,node:p,childValueTheSame:f.childValueTheSame}),p&&l.push(p),d.pop(),a.splice(h,1),u=h-1}}}else c=!1
else c=!0}for(var k=0,E=l.length;k<E;k++){var T=l[k],S=T.getAttribute("data-mpmergeaction")
"change"===S?te.setStyle(T,i,n):"remove"===S&&te.removeStyle(T,i),T.removeAttribute("data-mpmergeaction"),0==T.style.cssText.replace(/^\s+$/,"").length&&te.remove(T,!0)}}e.moveToBookmark(o)}}(e,i,o)}function t(e){var r={1:"10",2:"13",3:"16",4:"18",5:"24",6:"32",7:"48"}
J.each(e.getNodesByTagName("u s del font strike"),function(e){if("font"==e.tagName){var t=[]
for(var n in e.attrs)switch(n){case"size":var i=r[e.attrs[n]]||e.attrs[n]
t.push("font-size:"+i+"px")
break
case"color":t.push("color:"+e.attrs[n])
break
case"face":t.push("font-family:"+e.attrs[n])
break
case"style":t.push(e.attrs[n])}e.attrs={style:t.join(";")}}else{var o="u"==e.tagName?"underline":"line-through"
e.attrs={style:(e.getAttr("style")||"")+"text-decoration:"+o+";"}}e.tagName="span"})}for(var n in this.setOpt({fontfamily:[{name:"songti",val:"宋体,SimSun"},{name:"yahei",val:"微软雅黑,Microsoft YaHei"},{name:"kaiti",val:"楷体,楷体_GB2312, SimKai"},{name:"heiti",val:"黑体, SimHei"},{name:"lishu",val:"隶书, SimLi"},{name:"andaleMono",val:"andale mono"},{name:"arial",val:"arial, helvetica,sans-serif"},{name:"arialBlack",val:"arial black,avant garde"},{name:"comicSansMs",val:"comic sans ms"},{name:"impact",val:"impact,chicago"},{name:"timesNewRoman",val:"times new roman"}]}),this.addInputRule(function(e){t(e)}),this.addOutputRule(function(e){t(e)}),e)!function(c,u){UE.commands[c]={execCommand:function(t,n){n=n||(this.queryCommandState(t)?"none":"underline"==t?"underline":"fontborder"==t?"1px solid #000":"line-through")
var i,o=this,r=this.selection.getRange(),e=o.fireEvent("getCommonReportIDKey",[t,n+""])
if(e=e||o.fireEvent("getCommonReportIDKey",[t,"default"])){o.fireEvent("reportAddNum",e.id,e.key,1)
var a=o.fireEvent("getCommonReportIDKey",[t,"all"])
a&&o.fireEvent("reportAddNum",a.id,a.key,1)}if("default"==n)r.collapsed&&(i=o.document.createTextNode("font"),r.insertNode(i).select()),o.execCommand("removeFormat","span,a,li",u),i&&(r.setStartBefore(i).collapse(!0),te.remove(i)),h(r,t,n),r.select()
else if(r.collapsed){i=o.document.createTextNode("font")
var s=function(){if(r.selectNode(i).select(),l=r.document.createElement("span"),m[c]){if(te.findParentByTagName(i,"a",!0))return r.setStartBefore(i).setCursor(),void te.remove(i)
o.execCommand("removeFormat","span,a",u)}if(l.style.cssText=u+":"+n,i.parentNode.insertBefore(l,i),!Z.ie||Z.ie&&9==Z.version)for(var e=l.parentNode;!te.isBlockElm(e);)"SPAN"==e.tagName&&(l.style.cssText=e.style.cssText+";"+l.style.cssText),e=e.parentNode
f?setTimeout(function(){r.setStart(l,0).collapse(!0),h(r,t,n),r.select()}):(r.setStart(l,0).collapse(!0),h(r,t,n),r.select())},l=te.findParentByTagName(r.startContainer,"span",!0)
!l||l.children.length||l[Z.ie?"innerText":"textContent"].replace(T,"").length?(r.insertNode(i),s()):(r.insertNode(i),m[c]&&(r.selectNode(i).select(),o.execCommand("removeFormat","span,a",u,null),l=te.findParentByTagName(i,"span",!0),r.setStartBefore(i)),l?(l&&(l.style.cssText+=";"+u+":"+n),r.collapse(!0).select()):s()),te.remove(i)}else{m[c]&&(o.queryCommandValue(c)||"backcolor"==c)&&o.execCommand("removeFormat","span,a",u),r=o.selection.getRange()
var d={ignoreUnEditable:!0};/^(backcolor)|(underline)|(strikethrough)$/.test(c)||(d.liStyle=_defineProperty({},u,n)),r.applyInlineStyle("span",{style:u+":"+n},null,d),h(r,t,n),r.select()}return!0},queryCommandValue:function(e){var t=this.selection.getStart()
if("underline"==e||"strikethrough"==e){for(var n,i=t;i&&!te.isBlockElm(i)&&!te.isBody(i);){if(1==i.nodeType&&"none"!=(n=te.getComputedStyle(i,u)))return n
i=i.parentNode}return"none"}if("fontborder"==e){for(var o,r=t;r&&ee.$inline[r.tagName];){if((o=te.getComputedStyle(r,"border"))&&/1px/.test(o)&&/solid/.test(o))return o
r=r.parentNode}return""}if("fontsize"!=e.toLowerCase())return te.getComputedStyle(t,u)
var a
for(i=t;!te.isBody(i)&&(a=te.getComputedStyle(i,u),!parseInt(a));)i=i.parentNode
return(r=/^([\d\.]+)(\w+)$/.exec(a))?Math.floor(r[1])+r[2]:a},queryCommandState:function(e,t){var n=1<arguments.length&&void 0!==t?t:{}
if(n.allDomInRange&&n.allDomInRange[0]&&2===te.isContentEditable({node:n.allDomInRange[0],checkParent:!1}))return-1
if(!m[e])return 0
var i=this.queryCommandValue(e)
return"fontborder"==e?/1px/.test(i)&&/solid/.test(i):i==("underline"==e?"underline":"line-through")}}}(n,e[n])},UE.plugins.removeformat=function(){var w=["list-style-type"]
this.setOpt({removeFormatTags:"b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",removeFormatAttributes:"style,lang,width,height,align,hspace,valign"}),this.commands.removeformat={execCommand:function(e,t,f,n,p){var g=!0
"[object Object]"===Object.prototype.toString.call(t)&&(f=t.style,n=t.attrs,p=t.notIncludeA,g=t.ignoreUnEditable,t=t.tags),!1!==g&&(g=!0)
var v,b,y=new RegExp("^(?:"+(t||this.options.removeFormatTags).replace(/,/g,"|")+")$","i"),C=f?[]:(n||this.options.removeFormatAttributes).split(","),i=new Q.Range(this.document),N=function(e){return 1==e.nodeType}
function x(e){if(3!=e.nodeType&&"span"==e.tagName.toLowerCase()){if(Z.ie){var t=e.attributes
if(t.length){for(var n=0,i=t.length;n<i;n++)if(t[n].specified)return
return 1}}return!e.attributes.length}}(function(e){var t=e.createBookmark()
if(e.collapsed&&e.enlarge(!0),!p){var n=te.findParentByTagName(e.startContainer,"a",!0)
!n||!0===g&&2===te.isContentEditable({node:n,checkParent:!0})||e.setStartBefore(n),!(n=te.findParentByTagName(e.endContainer,"a",!0))||!0===g&&2===te.isContentEditable({node:n,checkParent:!0})||e.setEndAfter(n)}for(m=(v=e.createBookmark()).start;(b=m.parentNode)&&!te.isBlockElm(b)&&(!0!==g||2!==te.isContentEditable({node:b,checkParent:!0}));)te.breakParent(m,b),te.clearEmptySibling(m)
if(v.end){for(m=v.end;(b=m.parentNode)&&!te.isBlockElm(b)&&(!0!==g||2!==te.isContentEditable({node:b,checkParent:!0}));)te.breakParent(m,b),te.clearEmptySibling(m)
for(var i,o=te.getNextDomNode(v.start,!1,N);o&&o!=v.end;){if(i=te.getNextDomNode(o,!0,N),!(ee.$empty[o.tagName.toLowerCase()]||te.isBookmarkNode(o)||!0===g&&2===te.isContentEditable({node:o,checkParent:!0})))if(y.test(o.tagName))f?(te.removeStyle(o,f),x(o)&&"text-decoration"!=f&&te.remove(o,!0)):te.remove(o,!0)
else if(ee.$list[o.tagName]){for(var r={},a=0,s=w.length;a<s;a++){var l=w[a]
r[l]=te.getStyle(o,l)}te.removeAttributes(o,C),te.setStyles(o,r)}else ee.$tableContent[o.tagName]||(te.removeAttributes(o,C),x(o)&&te.remove(o,!0))
o=i}}var d=v.start.parentNode
if(!(C&&0<C.length&&te.isBlockElm(d))||ee.$tableContent[d.tagName]||ee.$list[d.tagName]||!0===g&&2===te.isContentEditable({node:d,checkParent:!0})||te.removeAttributes(d,C),d=v.end.parentNode,!(C&&0<C.length&&v.end&&te.isBlockElm(d))||ee.$tableContent[d.tagName]||ee.$list[d.tagName]||!0===g&&2===te.isContentEditable({node:d,checkParent:!0})||te.removeAttributes(d,C),y.test("li")&&f)(c=te.findParentByTagName(v.start,"li",!0))&&te.removeStyle(c,f)
else if(!y.test("li")&&!f&&C&&0<C.length){var c;(c=te.findParentByTagName(v.start,"li",!0))&&te.removeAttributes(c,C)}e.moveToBookmark(v).moveToBookmark(t)
for(var u,m=e.startContainer,h=e.collapsed;1==m.nodeType&&te.isEmptyNode(m)&&ee.$removeEmpty[m.tagName]&&(!0!==g||2!==te.isContentEditable({node:m,checkParent:!0}));)u=m.parentNode,e.setStartBefore(m),e.startContainer===e.endContainer&&e.endOffset--,te.remove(m),m=u
if(!h)for(m=e.endContainer;1==m.nodeType&&te.isEmptyNode(m)&&ee.$removeEmpty[m.tagName]&&(!0!==g||2!==te.isContentEditable({node:m,checkParent:!0}));)u=m.parentNode,e.setEndBefore(m),te.remove(m),m=u})(i=this.selection.getRange()),i.select()},queryCommandState:function(e,t){var n=1<arguments.length&&void 0!==t?t:{}
return n.allDomInRange&&n.allDomInRange[0]&&2===te.isContentEditable({node:n.allDomInRange[0],checkParent:!1})?-1:0}}},UE.commands.indent={execCommand:function(){var e=this.queryCommandState("indent")?"0em":this.options.indentValue||"2em"
this.execCommand("Paragraph","p",{style:"text-indent:"+e})},queryCommandState:function(e,t){var n=1<arguments.length&&void 0!==t?t:{}
if(n.allDomInRange&&n.allDomInRange[0]&&2===te.isContentEditable({node:n.allDomInRange[0],checkParent:!1}))return-1
var i=te.filterNodeList(this.selection.getStartElementPath(),"p h1 h2 h3 h4 h5 h6")
return i&&i.style.textIndent&&parseInt(i.style.textIndent)?1:0}},UE.plugins.selectall=function(){this.commands.selectall={execCommand:function(){var e=this.body,t=this.selection.getRange()
t.selectNodeContents(e),te.isEmptyBlock(e)&&(Z.opera&&e.firstChild&&1==e.firstChild.nodeType&&t.setStartAtFirst(e.firstChild),t.collapse(!0)),t.select(!0)},notNeedUndo:1},this.addshortcutkey({selectAll:"ctrl+65"})},UE.plugins.paragraph=function(){function m(e,t,n,i,o){function r(e){return 1!=e.nodeType?!te.isWhitespace(e):!te.isBookmarkNode(e)&&(2===te.isContentEditable({node:e,checkParent:!1})||2!==te.isContentEditable({node:e,checkParent:!0}))}var a,s=4<arguments.length&&void 0!==o?o:{},l=e.createBookmark()
e.enlarge(!0)
for(var d=e.createBookmark(),c=te.getNextDomNode(d.start,!1,r),u=e.cloneRange(),m=null;c&&!(te.getPosition(c,d.end)&te.POSITION_FOLLOWING);)if(c&&"justifyindent"==i&&/^(li)|(ol)|(ul)$/i.test(c.nodeName))"li"==c.nodeName.toLowerCase()&&(c=te.findParent(c,function(e){if(e&&/^(ol)|(ul)$/i.test(e.nodeName))return!0})),te.setAttributes(c,n),c=te.getNextDomNode(c,!1,r)
else if(3!=c.nodeType&&2!==te.isContentEditable({node:c,checkParent:!1})&&"br"!==c.nodeName.toLowerCase()&&x(c))c=te.getNextDomNode(c,!0,r)
else{for(u.setStartBefore(c),m=c;c&&c!==d.end&&!x(c);)m=c,c=te.getNextDomNode(c,!1,null,function(e){return!x(e)})
u.setEndAfter(m),m=null
var h=u.extractContents(),f=null,p=t
if("p"===p){for(var g=!0,v=h.firstChild;v;){if(!te.canContainByP({dom:v})){g=!1
break}v=v.nextSibling}f=e.document.createElement("span"),u.insertNode(f)
var b=f.parentNode
t=p=g&&b&&te.canContainP({dom:b})?"p":"section"}(a=e.document.createElement(p)).appendChild(h)
var y=!1
te.isEmptyNode(a)?te.fillNode(e.document,a):te.isContainUneditable({node:a,ignoreMarkNode:!0})&&(y=!0),f?(f.parentNode.insertBefore(a,f),f.parentNode.removeChild(f)):u.insertNode(a)
var C=a.parentNode
if(x(C)&&!te.isBody(a.parentNode)&&-1==J.indexOf(w,C.tagName))if(i&&"customstyle"==i||(C.getAttribute("dir")&&a.setAttribute("dir",C.getAttribute("dir")),C.style.cssText&&(a.style.cssText=C.style.cssText+";"+a.style.cssText),C.style.textAlign&&!a.style.textAlign&&(a.style.textAlign=C.style.textAlign),C.style.textIndent&&!a.style.textIndent&&(a.style.textIndent=C.style.textIndent),C.style.padding&&!a.style.padding&&(a.style.padding=C.style.padding),C.className&&"[object String]"===Object.prototype.toString.call(C.className)&&(a.className=C.className)),n&&/h\d/i.test(C.tagName)&&!/h\d/i.test(a.tagName))te.remove(a,!0),a=C,0
else{for(;C.firstChild;)te.isFillChar2(C.firstChild)?C.removeChild(C.firstChild):C.parentNode.insertBefore(C.firstChild,C)
C.parentNode.removeChild(C)}if(c=a,n)if(s.applyUneditablParent||!y)te.setAttributes(a,n),i&&"customstyle"==i&&n.style&&(a.style.cssText=n.style)
else{var N=te.breadByUneditable({node:a,attrs:n,applyUneditablParent:s.applyUneditablParent})
N&&N[N.length-1]&&(c=N[N.length-1])}c=te.getNextDomNode(c,!1,r)}return e.moveToBookmark(d).moveToBookmark(l),{range:e,newTagName:t}}var x=te.isBlockElm,w=["TD","LI","PRE"]
this.setOpt("paragraph",{p:"",h1:"",h2:"",h3:"",h4:"",h5:"",h6:""}),this.commands.paragraph={execCommand:function(e,t,n,i,o){var r=4<arguments.length&&void 0!==o?o:{},a=this.selection.getRange()
if(a.collapsed){var s=this.document.createTextNode("p")
if(a.insertNode(s),Z.ie){var l=s.previousSibling
l&&te.isWhitespace(l)&&te.remove(l),(l=s.nextSibling)&&te.isWhitespace(l)&&te.remove(l)}}var d=m(a,t,n,i,r)
if(a=d.range,t=d.newTagName,s){a.setStartBefore(s).collapse(!0)
var c=s.parentNode
te.remove(s),te.isBlockElm(c)&&te.isEmptyNode(c)&&te.fillNode(this.document,c)}if(Z.gecko&&a.collapsed&&1==a.startContainer.nodeType){var u=a.startContainer.childNodes[a.startOffset]
u&&1==u.nodeType&&u.tagName.toLowerCase()==t&&a.setStart(u,0).collapse(!0)}return a.select(),!0},queryCommandValue:function(){var e=te.filterNodeList(this.selection.getStartElementPath(),"p h1 h2 h3 h4 h5 h6")
return e?e.tagName.toLowerCase():""}}},UE.plugins.horizontal=function(){this.commands.horizontal={execCommand:function(e){var t=this
if(-1!==t.queryCommandState(e)){t.execCommand("insertHtml",'<hr style="border-style: solid;border-width: 1px 0 0;border-color: rgba(0,0,0,0.1);-webkit-transform-origin: 0 0;-webkit-transform: scale(1, 0.5);transform-origin: 0 0;transform: scale(1, 0.5);">')
var n,i=t.selection.getRange(),o=i.startContainer
if(1==o.nodeType&&!o.childNodes[i.startOffset])(n=o.childNodes[i.startOffset-1])&&1==n.nodeType&&"HR"==n.tagName&&("p"==t.options.enterTag?(n=t.document.createElement("p"),i.insertNode(n),i.setStart(n,0).setCursor()):(n=t.document.createElement("br"),i.insertNode(n),i.setStartBefore(n).setCursor()))
return!0}},queryCommandState:function(e,t){var n=1<arguments.length&&void 0!==t?t:{}
return n.allDomInRange&&n.allDomInRange[0]&&2===te.isContentEditable({node:n.allDomInRange[0],checkParent:!1})||te.filterNodeList(this.selection.getStartElementPath(),"table")?-1:0}},this.addListener("delkeydown",function(e,t){var n=this.selection.getRange()
if(n.txtToElmBoundary(!0),te.isStartInblock(n)){var i=n.startContainer.previousSibling
if(i&&te.isTagNode(i,"hr"))return te.remove(i),n.select(),te.preventDefault(t),!0}})},UE.plugins.rowspacing=function(){this.setOpt({rowspacingtop:["5","10","15","20","25"],rowspacingbottom:["5","10","15","20","25"]}),this.commands.rowspacing={execCommand:function(e,t,n){return this.execCommand("paragraph","p",{style:"margin-"+n+":"+t+"px"},null,{applyUneditablParent:!0}),!0},queryCommandValue:function(e,t){var n=te.filterNodeList(this.selection.getStartElementPath(),function(e){return 2!==te.isContentEditable({node:e,checkParent:!1})&&te.isBlockElm(e)})
return n&&te.getComputedStyle(n,"margin-"+t).replace(/[^\d]/g,"")||0}}},UE.plugins.justifyindent=function(){this.commands.justifyindent={execCommand:function(e,t){var n=this.fireEvent("getCommonReportIDKey",[e,t+""])
if(n){this.fireEvent("reportAddNum",n.id,n.key,1)
var i=this.fireEvent("getCommonReportIDKey",[e,"all"])
i&&this.fireEvent("reportAddNum",i.id,i.key,1)}return this.execCommand("paragraph","p",{style:"margin-left:"+t+"px;margin-right:"+t+"px"},"justifyindent",{applyUneditablParent:!1}),!0},queryCommandValue:function(){var e,t=te.findParents(this.selection.getStart(),!0,function(e){if(/^(ol)|(ul)$/i.test(e.nodeName))return!0},!0)
if(e=t&&0<t.length?t[0]:te.filterNodeList(this.selection.getStartElementPath(),function(e){return 2!==te.isContentEditable({node:e,checkParent:!1})&&te.isBlockElm(e)})){var n=te.getComputedStyle(e,"margin-left").replace(/[^\d]/g,""),i=te.getComputedStyle(e,"margin-right").replace(/[^\d]/g,"")
return n&&n==i?n:0}return 0},queryCommandState:function(e,t){var n=1<arguments.length&&void 0!==t?t:{}
return n.allDomInRange&&n.allDomInRange[0]&&2===te.isContentEditable({node:n.allDomInRange[0],checkParent:!1})?-1:0}}},UE.plugins.lineheight=function(){this.setOpt({lineheight:["1","1.5","1.75","2","3","4","5"]}),this.commands.lineheight={execCommand:function(e,t){return this.execCommand("paragraph","p",{style:"line-height:"+("1"==t?"normal":t+"em")}),!0},queryCommandValue:function(){var e=te.filterNodeList(this.selection.getStartElementPath(),function(e){return te.isBlockElm(e)})
if(e){var t=te.getComputedStyle(e,"line-height")
return"normal"==t?1:t.replace(/[^\d.]*/gi,"")}},queryCommandState:function(e,t){var n=1<arguments.length&&void 0!==t?t:{}
return n.allDomInRange&&n.allDomInRange[0]&&2===te.isContentEditable({node:n.allDomInRange[0],checkParent:!1})?-1:0}}},UE.commands.cleardoc={execCommand:function(){var e=this,t=e.options.enterTag,n=e.selection.getRange()
"br"==t?(e.body.innerHTML="<br/>",n.setStart(e.body,0).setCursor()):(e.body.innerHTML="<p>"+(Z.ie11below?te.fillChar:"<br/>")+"</p>",n.setStart(e.body.firstChild,0).setCursor(!1,!0)),setTimeout(function(){e.fireEvent("clearDoc")},0)}},UE.plugins.dragdrop=function(){var o=this
o.ready(function(){te.on(this.body,"dragend",function(){var e=o.selection.getRange(),t=e.getClosedNode()||o.selection.getStart()
if(t&&"IMG"==t.tagName){for(var n,i=t.previousSibling;(n=t.nextSibling)&&1==n.nodeType&&"SPAN"==n.tagName&&!n.firstChild;)te.remove(n);(!i||1!=i.nodeType||te.isEmptyBlock(i))&&i||n&&(!n||te.isEmptyBlock(n))||(i&&"P"==i.tagName&&!te.isEmptyBlock(i)?(i.appendChild(t),te.moveChild(n,i),te.remove(n)):n&&"P"==n.tagName&&!te.isEmptyBlock(n)&&n.insertBefore(t,n.firstChild),i&&"P"==i.tagName&&te.isEmptyBlock(i)&&te.remove(i),n&&"P"==n.tagName&&te.isEmptyBlock(n)&&te.remove(n),e.selectNode(t).select(),o.fireEvent("saveScene"))}})})},UE.plugins.undo=function(){var a,o=this,s=o.options.maxUndoCount||20,r=o.options.maxInputCount||20,l=new RegExp(te.fillChar+"|</hr>","gi"),d={ol:1,ul:1,table:1,tbody:1,tr:1,body:1},c=o.options.autoClearEmptyNode
function u(e,t){if(e.length==t.length){for(var n=0,i=e.length;n<i;n++)if(e[n]!=t[n])return
return 1}}function e(){this.undoManger.save()}o.undoManger=new function(){this.list=[],this.index=0,this.hasUndo=!1,this.hasRedo=!1,this.undo=function(){if(this.hasUndo){if(!this.list[this.index-1]&&1==this.list.length)return void this.reset()
for(;this.list[this.index].content==this.list[this.index-1].content;)if(this.index--,0==this.index)return this.restore(0)
this.restore(--this.index)}},this.redo=function(){if(this.hasRedo){for(;this.list[this.index].content==this.list[this.index+1].content;)if(this.index++,this.index==this.list.length-1)return this.restore(this.index)
this.restore(++this.index)}},this.restore=function(){var t=this.editor,e=this.list[this.index],n=UE.htmlparser(e.content.replace(l,""))
t.options.autoClearEmptyNode=!1,t.filterInputRule(n),t.options.autoClearEmptyNode=c,t.document.body.innerHTML=n.toHtml(),t.fireEvent("afterscencerestore"),Z.ie&&J.each(te.getElementsByTagName(t.document,"td th caption p"),function(e){te.isEmptyNode(e)&&te.fillNode(t.document,e)})
try{var i=new Q.Range(t.document).moveToAddress(e.address)
i.select(d[i.startContainer.nodeName.toLowerCase()])}catch(e){}this.editor.fireEvent("hide_common_popup"),this.update(),this.clearKey(),t.fireEvent("reset",!0)},this.getScene=function(){var e=this.editor,t=e.selection.getRange().createAddress(!1,!0)
e.fireEvent("beforegetscene")
var n=UE.htmlparser(e.body.innerHTML)
e.options.autoClearEmptyNode=!1,e.filterOutputRule(n),e.options.autoClearEmptyNode=c
var i=n.toHtml()
return e.fireEvent("aftergetscene"),{address:t,content:i}},this.save=function(e,t){clearTimeout(a)
var n,i,o=this.getScene(t),r=this.list[this.index]
this.editor.fireEvent("beforesavescene",o),r&&r.content==o.content&&(e||(n=r.address,i=o.address,n.collapsed==i.collapsed&&u(n.startAddress,i.startAddress)&&u(n.endAddress,i.endAddress)))||(this.list=this.list.slice(0,this.index+1),this.list.push(o),this.list.length>s&&this.list.shift(),this.index=this.list.length-1,this.clearKey(),this.update())},this.update=function(){var e,t,n,i
this.hasRedo=!!this.list[this.index+1],this.hasUndo=!!this.list[this.index-1],e=y.editor.ui.buttons.undo,t=y.editor.ui.buttons.redo,n=o.queryCommandState("undo"),i=o.queryCommandState("redo"),-1==n?(e.setDisabled(!0),e.setChecked(!1)):(e.setDisabled(!1),e.setChecked(n)),-1==i?(t.setDisabled(!0),t.setChecked(!1)):(t.setDisabled(!1),t.setChecked(i))},this.reset=function(){this.list=[],this.index=0,this.hasUndo=!1,this.hasRedo=!1,this.clearKey(),this.editor.fireEvent("hide_common_popup")},this.clearKey=function(){h=0,0},this.replaceLast=function(){this.list&&0<this.list.length&&"function"==typeof this.list.pop&&this.list.pop(),this.save()}},(o.undoManger.editor=o).addListener("saveScene",function(){var e=Array.prototype.splice.call(arguments,1)
this.undoManger.save.apply(this.undoManger,e)}),o.addListener("beforeexeccommand",e),o.addListener("afterexeccommand",e),o.addListener("reset",function(e,t){t||this.undoManger.reset()}),o.commands.redo=o.commands.undo={execCommand:function(e){this.undoManger[e]()},queryCommandState:function(e){return this.undoManger["has"+("undo"==e.toLowerCase()?"Undo":"Redo")]?0:-1},notNeedUndo:1}
var m={16:1,17:1,18:1,37:1,38:1,39:1,40:1},h=0,f=!1
o.addListener("ready",function(){te.on(this.body,"compositionstart",function(){f=!0}),te.on(this.body,"compositionend",function(){f=!1})}),o.addshortcutkey({Undo:"ctrl+90",Redo:"ctrl+89"})
var p=!0
o.addListener("keydown",function(e,t){var n=this,i=t.keyCode||t.which
if(!(m[i]||t.ctrlKey||t.metaKey||t.shiftKey||t.altKey)){var o=function(e){e.selection.getRange().collapsed&&e.fireEvent("contentchange"),e.undoManger.save(!1,!0),e.fireEvent("selectionchange",!1,!1,"keydown")}
if(f)return
if(!n.selection.getRange().collapsed)return n.undoManger.save(!1,!0),void(p=!1)
0==n.undoManger.list.length&&n.undoManger.save(!0),clearTimeout(a),a=setTimeout(function(){if(f)var e=setInterval(function(){f||(o(n),clearInterval(e))},300)
else o(n)},200),r<=++h&&o(n)}}),o.addListener("keyup",function(e,t){var n=t.keyCode||t.which
if(!(m[n]||t.ctrlKey||t.metaKey||t.shiftKey||t.altKey)){if(f)return
p||(this.undoManger.save(!1,!0),p=!0)}})},UE.plugins.paste=function(){var w,k,E,T=this,S="baidu_pastebin",a="",B="",s=null
function I(){s&&(clearTimeout(s),s=null),a&&B?(T.fireEvent("mplog",{description:"mp editor paste content",level:"info",data:{pasteContent:a,afterpasteContent:B}}),B=a=null):s=setTimeout(function(){I()},1e3)}function l(e){var t,n,i=null
if(e.firstChild){(i=R.filterBr({node:e})).hasFilterNode&&T.fireEvent("reportAddNum",67292,119,1)
for(var o,r=te.getElementsByTagName(e,"span"),a=0;o=r[a++];)"_baidu_cut_start"!=o.id&&"_baidu_cut_end"!=o.id||te.remove(o)
if(Z.webkit){var s,l=e.querySelectorAll("div br")
for(a=0;s=l[a++];){var d=s.parentNode
"DIV"==d.tagName&&1==d.childNodes.length&&(d.innerHTML="<p><br/></p>",te.remove(d))}var c,u=e.querySelectorAll("#"+S)
for(a=0;c=u[a++];){var m=T.document.createElement("p")
for(c.parentNode.insertBefore(m,c);c.firstChild;)m.appendChild(c.firstChild)
te.remove(c)}var h=e.querySelectorAll("meta")
for(a=0;p=h[a++];)te.remove(p)
l=e.querySelectorAll("br")
for(a=0;p=l[a++];)/^apple-/i.test(p.className)&&te.remove(p)}if(Z.gecko){var f=e.querySelectorAll("[_moz_dirty]")
for(a=0;p=f[a++];)p.removeAttribute("_moz_dirty")}if(!Z.ie){var p,g=e.querySelectorAll("span.Apple-style-span")
for(a=0;p=g[a++];)te.remove(p,!0)}T.filterInputNativeNode(e),t=e.innerHTML,(i=R.filterBr({html:t})).hasFilterHtml&&(t=i.html,T.fireEvent("reportAddNum",67292,120,1)),t=(t=UE.filterWord(t)).replace(/(<[^>]+?style=([\'\"]))([^\2]*?text-decoration-line[\s]*:[^\2]*?)(\2)/gi,function(){return arguments[1]+arguments[3].replace(/text-decoration-line[\s]*:/g,"text-decoration:")+arguments[4]})
var v=UE.htmlparser(t)
if(T.options.filterRules&&UE.filterNode(v,T.options.filterRules),T.filterInputRule(v),Z.webkit){var b=v.lastChild()
b&&"element"==b.type&&"br"==b.tagName&&v.removeChild(b),J.each(T.body.querySelectorAll("div"),function(e){te.isEmptyBlock(e)&&te.remove(e)})}if(t={html:v.toHtml()},T.fireEvent("beforepaste",t,v),!t.html)return
v=UE.htmlparser(t.html,!0),function(e){var t=!1,n=!1,i=!1,o=+new Date,r=_.init({Eles:e})
0<r.deepCount&&(t=!0)
0<r.invisibleCount&&(n=!0)
0<r.flatCount&&(i=!0)
if(T.fireEvent("reportAddNum",67292,94,1),t){var a=new Date-o
T.fireEvent("reportAddNum",67292,95,1),T.fireEvent("reportAddNum",67292,97,a)}n&&T.fireEvent("reportAddNum",67292,115,1)
i&&T.fireEvent("reportAddNum",67292,117,1)}(n=1===T.queryCommandState("pasteplain")?T.execCommand("insertHtml",UE.filterNode(v,T.options.filterTxtRules).toHtml(),!0):(UE.filterNode(v,T.options.filterTxtRules),w=v.toHtml(),k=t.html,E=T.selection.getRange().createAddress(!0),T.execCommand("insertHtml",k,!0)||[])),T.fireEvent("funcPvUvReport","paste"),T.fireEvent("afterpaste",t,n)
for(var y=[],C=0,N=n.length;C<N;C++){var x=n[C]
y.push(x.outerHTML)}B=y.join(""),I()}}T.addListener("get_paste_domid",function(e){return S}),T.addListener("pasteTransfer",function(e,t){if(E&&w&&k&&w!=k){var n=T.selection.getRange()
if(n.moveToAddress(E,!0),!n.collapsed){for(;!te.isBody(n.startContainer);){var i=n.startContainer
if(1==i.nodeType){if(!(i=i.childNodes[n.startOffset])){n.setStartBefore(n.startContainer)
continue}var o=i.previousSibling
o&&3==o.nodeType&&new RegExp("^[\n\r\t "+te.fillChar+"]*$").test(o.nodeValue)&&n.setStartBefore(o)}if(0!=n.startOffset)break
n.setStartBefore(n.startContainer)}for(;!te.isBody(n.endContainer);){var r=n.endContainer
if(1==r.nodeType){if(!(r=r.childNodes[n.endOffset])){n.setEndAfter(n.endContainer)
continue}var a=r.nextSibling
a&&3==a.nodeType&&new RegExp("^[\n\r\t"+te.fillChar+"]*$").test(a.nodeValue)&&n.setEndAfter(a)}if(n.endOffset!=n.endContainer[3==n.endContainer.nodeType?"nodeValue":"childNodes"].length)break
n.setEndAfter(n.endContainer)}}n.deleteContents(),n.select(!0),T.__hasEnterExecCommand=!0
var s=k
2===t?s=s.replace(/<(\/?)([\w\-]+)([^>]*)>/gi,function(e,t,n,i){return{img:1}[n=n.toLowerCase()]?e:(i=i.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi,function(e,t,n){return{src:1,href:1,name:1}[t.toLowerCase()]?t+"="+n+" ":""}),{span:1,div:1}[n]?"":"<"+t+n+" "+J.trim(i)+">")}):t&&(s=w),T.execCommand("inserthtml",s,!0),T.__hasEnterExecCommand=!1
for(var l=T.selection.getRange();!te.isBody(l.startContainer)&&!l.startOffset&&l.startContainer[3==l.startContainer.nodeType?"nodeValue":"childNodes"].length;)l.setStartBefore(l.startContainer)
var d=l.createAddress(!0)
E.endAddress=d.startAddress}}),T.addListener("ready",function(){te.on(T.body,"cut",function(){!T.selection.getRange().collapsed&&T.undoManger&&T.undoManger.save()})
var r="onpaste"in T.document
te.on(T.body,r?"paste":"keydown",function(e){if((r||(e.ctrlKey||e.metaKey)&&"86"==e.keyCode)&&!1!==T.fireEvent("beforepasteEvent")){if(B=a="",s&&(clearTimeout(s),s=null),!0===T.fireEvent("onpasting",e))return e.stopPropagation&&(e.stopPropagation(),e.preventDefault()),!1
var t=(e.clipboardData?e.clipboardData:e.originalEvent&&e.originalEvent.clipboardData?e.originalEvent.clipboardData:{}).items,n=!1
if(t&&0<t.length){for(var i=0,o=t.length;i<o;i++)/text\/html/i.test(t[i].type)&&(n=!0,t[i].getAsString(function(e){a=e,I()}))
n||(a="no clipboardData")}else a="no clipboardData";(function(i){var o=this.document
if(!o.getElementById(S)){var r=this.selection.getRange(),a=r.createBookmark(),s=o.createElement("div")
s.id=S,Z.webkit&&s.appendChild(o.createTextNode(te.fillChar+te.fillChar)),o.body.appendChild(s),a.start.style.display="",s.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:"+te.getXY(a.start).y+"px",r.selectNodeContents(s).select(!0),setTimeout(function(){if(Z.webkit)for(var e,t=0,n=o.querySelectorAll("#"+S);e=n[t++];){if(!te.isEmptyNode(e)){s=e
break}te.remove(e)}try{s.parentNode.removeChild(s)}catch(e){}r.moveToBookmark(a).select(!0),i(s)},0)}}).call(T,function(e){l(e)})}})})},UE.plugins.list=function(){var E=this,L={TD:1,PRE:1,BLOCKQUOTE:1},d={cn:"cn-1-",cn1:"cn-2-",cn2:"cn-3-",num:"num-1-",num1:"num-2-",num2:"num-3-",dash:"dash",dot:"dot"}
function e(e){var t=[]
for(var n in e)t.push(n)
return t}E.setOpt({insertorderedlist:{decimal:"","lower-alpha":"","lower-roman":"","upper-alpha":"","upper-roman":""},insertunorderedlist:{circle:"",disc:"",square:""},listDefaultPaddingLeft:"30",listiconpath:"http://bs.baidu.com/listicon/",maxListLevel:-1})
var f={OL:e(E.options.insertorderedlist),UL:e(E.options.insertunorderedlist)},i=E.options.listiconpath
for(var t in d)E.options.insertorderedlist.hasOwnProperty(t)||E.options.insertunorderedlist.hasOwnProperty(t)||delete d[t]
function D(e){var t=e.className
return te.hasClass(e,/custom_/)?t.match(/custom_(\w+)/)[1]:te.getStyle(e,"list-style-type")}function a(a,s){J.each(te.getElementsByTagName(a,"ol ul"),function(o){if(te.inDoc(o,a)){var e=o.parentNode
if(e.tagName==o.tagName){var t=D(o)||("OL"==o.tagName?"decimal":"disc")
if(t==(D(e)||("OL"==e.tagName?"decimal":"disc"))){var n=J.indexOf(f[o.tagName],t)
n=n+1==f[o.tagName].length?0:n+1,P(o,f[o.tagName][n])}}var r=0,i=2
te.hasClass(o,/custom_/)?/[ou]l/i.test(e.tagName)&&te.hasClass(e,/custom_/)||(i=1):/[ou]l/i.test(e.tagName)&&te.hasClass(e,/custom_/)&&(i=3),100<=o.childNodes.length&&(i=3),o.className=J.trim(o.className.replace(/list-paddingleft-\w+/,""))+" list-paddingleft-"+i,J.each(te.getElementsByTagName(o,"li"),function(e){if(e.firstChild){if(e.parentNode===o){if(r++,te.hasClass(o,/custom_/)){var t=1,n=D(o)
if("OL"==o.tagName){if(n)switch(n){case"cn":case"cn1":case"cn2":10<r&&(r%10==0||10<r&&r<20)?t=2:20<r&&(t=3)
break
case"num2":9<r&&(t=2)}e.className="list-"+d[n]+r+" list-"+n+"-paddingleft-"+t}else e.className="list-"+d[n]+" list-"+n+"-paddingleft"}else e.className=e.className.replace(/list-[\w\-]+/gi,"")
var i=e.getAttribute("class")
null===i||i.replace(/\s/g,"")||te.removeAttributes(e,"class")}}else te.remove(e)}),s||A(o,o.tagName.toLowerCase(),D(o)||te.getStyle(o,"list-style-type"),!0)}})}function A(e,t,n,i){var o=e.nextSibling
o&&1==o.nodeType&&o.tagName.toLowerCase()==t&&(D(o)||te.getStyle(o,"list-style-type")||("ol"==t?"decimal":"disc"))==n&&(te.moveChild(o,e),0==o.childNodes.length&&te.remove(o)),o&&te.isFillChar(o)&&te.remove(o)
var r=e.previousSibling
r&&1==r.nodeType&&r.tagName.toLowerCase()==t&&(D(r)||te.getStyle(r,"list-style-type")||("ol"==t?"decimal":"disc"))==n&&te.moveChild(e,r),r&&te.isFillChar(r)&&te.remove(r),!i&&te.isEmptyBlock(e)&&te.remove(e),D(e)&&a(e.ownerDocument,!0)}function P(e,t){d[t]&&(e.className="custom_"+t)
try{te.setStyle(e,"list-style-type",t)}catch(e){}}function T(e){var t=e.previousSibling
t&&te.isEmptyBlock(t)&&te.remove(t),(t=e.nextSibling)&&te.isEmptyBlock(t)&&te.remove(t)}function M(e){for(;e&&!te.isBody(e);){if("TABLE"==e.nodeName)return null
if("LI"==e.nodeName)return e
e=e.parentNode}}E.ready(function(){var e=[]
for(var t in d){if("dash"==t||"dot"==t)e.push("li.list-"+d[t]+"{background-image:url("+i+d[t]+".gif)}"),e.push("ul.custom_"+t+"{list-style:none;}ul.custom_"+t+" li{background-position:0 3px;background-repeat:no-repeat}")
else{for(var n=0;n<99;n++)e.push("li.list-"+d[t]+n+"{background-image:url("+i+"list-"+d[t]+n+".gif)}")
e.push("ol.custom_"+t+"{list-style:none;}ol.custom_"+t+" li{background-position:0 3px;background-repeat:no-repeat}")}switch(t){case"cn":e.push("li.list-"+t+"-paddingleft-1{padding-left:25px}"),e.push("li.list-"+t+"-paddingleft-2{padding-left:40px}"),e.push("li.list-"+t+"-paddingleft-3{padding-left:55px}")
break
case"cn1":e.push("li.list-"+t+"-paddingleft-1{padding-left:30px}"),e.push("li.list-"+t+"-paddingleft-2{padding-left:40px}"),e.push("li.list-"+t+"-paddingleft-3{padding-left:55px}")
break
case"cn2":e.push("li.list-"+t+"-paddingleft-1{padding-left:40px}"),e.push("li.list-"+t+"-paddingleft-2{padding-left:55px}"),e.push("li.list-"+t+"-paddingleft-3{padding-left:68px}")
break
case"num":case"num1":e.push("li.list-"+t+"-paddingleft-1{padding-left:25px}")
break
case"num2":e.push("li.list-"+t+"-paddingleft-1{padding-left:35px}"),e.push("li.list-"+t+"-paddingleft-2{padding-left:40px}")
break
case"dash":e.push("li.list-"+t+"-paddingleft{padding-left:35px}")
break
case"dot":e.push("li.list-"+t+"-paddingleft{padding-left:20px}")}}e.push(".list-paddingleft-1{padding-left:1.2em}"),e.push(".list-paddingleft-2{padding-left:2.2em}"),e.push(".list-paddingleft-3{padding-left:3.2em}"),J.cssRule("list","ol,ul{margin:0;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;"+(Z.ie||Z.gecko&&11e4<=Z.version?"":"width:99.9%")+"}li{clear:both;}"+e.join("\n"),E.document)}),E.ready(function(){te.on(E.body,"cut",function(){setTimeout(function(){var e,t=E.selection.getRange()
if(!t.collapsed&&(e=te.findParentByTagName(t.startContainer,"li",!0))&&!e.nextSibling&&te.isEmptyBlock(e)){var n,i=e.parentNode
if(n=i.previousSibling)te.remove(i),t.setStartAtLast(n).collapse(!0),t.select(!0)
else if(n=i.nextSibling)te.remove(i),t.setStartAtFirst(n).collapse(!0),t.select(!0)
else{var o=E.document.createElement("p")
te.fillNode(E.document,o),i.parentNode.insertBefore(o,i),te.remove(i),t.setStart(o,0).collapse(!0),t.select(!0)}}})})}),E.addListener("beforepaste",function(o,e){var t,n=this.selection.getRange(),r=UE.htmlparser(e.html,!0)
if(t=te.findParentByTagName(n.startContainer,"li",!0)){var a=t.parentNode,i="OL"==a.tagName?"ul":"ol"
J.each(r.getNodesByTagName(i),function(e){if(e.tagName=a.tagName,e.setAttr(),e.parentNode===r)o=D(a)||("OL"==a.tagName?"decimal":"disc")
else{var t=e.parentNode.getAttr("class")
o=(o=t&&/custom_/.test(t)?t.match(/custom_(\w+)/)[1]:e.parentNode.getStyle("list-style-type"))||("OL"==a.tagName?"decimal":"disc")}var n=J.indexOf(f[a.tagName],o)
e.parentNode!==r&&(n=n+1==f[a.tagName].length?0:n+1)
var i=f[a.tagName][n]
d[i]?e.setAttr("class","custom_"+i):e.setStyle("list-style-type",i)})}e.html=r.toHtml()}),E.addInputRule(function(e){J.each(e.getNodesByTagName("li"),function(e){for(var t,n=UE.uNode.createElement("p"),i=0;t=e.children[i];)"text"==t.type||ee.p[t.tagName]?n.appendChild(t):n.firstChild()?(e.insertBefore(n,t),n=UE.uNode.createElement("p"),i+=2):i++;(!n.firstChild()||n.parentNode)&&e.firstChild()||e.appendChild(n),n.firstChild()||n.innerHTML(Z.ie11below?te.fillChar:"<br/>")
var o=e.firstChild(),r=o.lastChild()
r&&"text"==r.type&&/^\s*$/.test(r.data)&&o.removeChild(r)})
var s={num1:/^\d+\)/,decimal:/^\d+\./,"lower-alpha":/^[a-z]+\)/,"upper-alpha":/^[A-Z]+\./,cn:/^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/,cn2:/^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/},o={square:"n"}
function l(e,t){var n=t.firstChild()
if(n&&"element"==n.type&&"span"==n.tagName&&/Wingdings|Symbol/.test(n.getStyle("font-family"))){for(var i in o)if(o[i]==n.data)return i
return"disc"}for(var i in s)if(s[i].test(e))return i}J.each(e.getNodesByTagName("p"),function(e){if("MsoListParagraph"==e.getAttr("class")){e.setStyle("margin",""),e.setStyle("margin-left",""),e.setAttr("class","")
var t,n=e,i=e
if("li"!=e.parentNode.tagName&&(t=l(e.innerText(),e))){var o=UE.uNode.createElement(E.options.insertorderedlist.hasOwnProperty(t)?"ol":"ul")
for(d[t]?o.setAttr("class","custom_"+t):o.setStyle("list-style-type",t);e&&"li"!=e.parentNode.tagName&&l(e.innerText(),e);)(n=e.nextSibling())||e.parentNode.insertBefore(o,e),a(o,e,t),e=n
!o.parentNode&&e&&e.parentNode&&e.parentNode.insertBefore(o,e)}var r=i.firstChild()
r&&"element"==r.type&&"span"==r.tagName&&/^\s*(&nbsp;)+\s*$/.test(r.innerText())&&r.parentNode.removeChild(r)}function a(e,t,n){if("ol"==e.tagName)if(Z.ie){var i=t.firstChild()
"element"==i.type&&"span"==i.tagName&&s[n].test(i.innerText())&&t.removeChild(i)}else t.innerHTML(t.innerHTML().replace(s[n],""))
else t.removeChild(t.firstChild())
var o=UE.uNode.createElement("li")
o.appendChild(t),e.appendChild(o)}})}),E.addListener("contentchange",function(){a(E.document)}),E.addListener("keydown",function(e,t){function n(){t.preventDefault?t.preventDefault():t.returnValue=!1,E.fireEvent("contentchange"),E.undoManger&&E.undoManger.save()}function i(e,t){for(;e&&!te.isBody(e);){if(t(e))return null
if(1==e.nodeType&&/[ou]l/i.test(e.tagName))return e
e=e.parentNode}return null}var o=t.keyCode||t.which
if(13==o&&!t.shiftKey){var r=E.selection.getRange(),a=te.findParent(r.startContainer,function(e){return te.isBlockElm(e)},!0),s=te.findParentByTagName(r.startContainer,"li",!0)
if(a&&"PRE"!=a.tagName&&!s){var l=a.innerHTML.replace(new RegExp(te.fillChar,"g"),"");/^\s*1\s*\.[^\d]/.test(l)&&(a.innerHTML=l.replace(/^\s*1\s*\./,""),r.setStartAtLast(a).collapse(!0).select(),E.__hasEnterExecCommand=!0,E.execCommand("insertorderedlist"),E.__hasEnterExecCommand=!1)}var d=E.selection.getRange(),c=i(d.startContainer,function(e){return"TABLE"==e.tagName}),u=d.collapsed?c:i(d.endContainer,function(e){return"TABLE"==e.tagName})
if(c&&u&&c===u){if(!d.collapsed){if(c=te.findParentByTagName(d.startContainer,"li",!0),u=te.findParentByTagName(d.endContainer,"li",!0),!c||!u||c!==u){var m=d.cloneRange(),h=m.collapse(!1).createBookmark()
return d.deleteContents(),m.moveToBookmark(h),T(s=te.findParentByTagName(m.startContainer,"li",!0)),m.select(),void n()}if(d.deleteContents(),(s=te.findParentByTagName(d.startContainer,"li",!0))&&te.isEmptyBlock(s))return x=s.previousSibling,next=s.nextSibling,b=E.document.createElement("p"),te.fillNode(E.document,b),k=s.parentNode,x&&next?(d.setStart(next,0).collapse(!0).select(!0),te.remove(s)):((x||next)&&x?s.parentNode.parentNode.insertBefore(b,k.nextSibling):k.parentNode.insertBefore(b,k),te.remove(s),k.firstChild||te.remove(k),d.setStart(b,0).setCursor()),void n()}s=te.findParentByTagName(d.startContainer,"li",!0)
var f,p,g=!!Z.safari
if(s){if(te.isEmptyBlock(s)){if(h=d.createBookmark(),s!==(k=s.parentNode).lastChild?(te.breakParent(s,k),T(s)):(k.parentNode.insertBefore(s,k.nextSibling),te.isEmptyNode(k)&&te.remove(k)),!ee.$list[s.parentNode.tagName])if(te.isBlockElm(s.firstChild))te.remove(s,!0)
else{for(b=E.document.createElement("p"),s.parentNode.insertBefore(b,s);s.firstChild;)b.appendChild(s.firstChild)
te.remove(s)}d.moveToBookmark(h).select()}else{var v=s.firstChild
if(!v||!te.isBlockElm(v)){var b=E.document.createElement("p")
for(s.firstChild||te.fillNode(E.document,b);s.firstChild;)b.appendChild(s.firstChild)
s.appendChild(b),v=b}var y=E.document.createElement("span")
d.insertNode(y)
var C=y.nextSibling
g&&C&&1===C.nodeType&&"none"===te.getComputedStyle(C,"display")||(g=!1),te.breakParent(y,s,!0,!0)
var N=y.nextSibling;(v=N.firstChild)||(b=E.document.createElement("p"),te.fillNode(E.document,b),N.appendChild(b),v=b),te.isEmptyNode(v,!1)&&((f=v).innerHTML="",te.fillNode(E.document,v)),g&&f?p=d.setStart(v,0).collapse(!0).shrinkBoundary().createBookmark(!0):d.setStart(v,0).collapse(!0).shrinkBoundary().select(),te.remove(y)
var x=N.previousSibling
x&&te.isEmptyBlock(x)&&(x.innerHTML="<p></p>",te.fillNode(E.document,x.firstChild))}if(n(),g&&f&&p){var w=f.parentNode
w.style.display="none",setTimeout(function(){w.style.display="",d.moveToBookmark(p).select()},0)}}}}if(8==o&&(d=E.selection.getRange()).collapsed&&te.isStartInblock(d)&&(m=d.cloneRange().trimBoundary(),(s=te.findParentByTagName(d.startContainer,"li",!0))&&te.isStartInblock(m))){if((c=te.findParentByTagName(d.startContainer,"p",!0))&&c!==s.firstChild){var k=te.findParentByTagName(c,["ol","ul"])
return te.breakParent(c,k),T(c),E.fireEvent("contentchange"),d.setStart(c,0).setCursor(!1,!0),E.fireEvent("saveScene"),void te.preventDefault(t)}if(s&&(x=s.previousSibling)){if(46==o&&s.childNodes.length)return
if(ee.$list[x.tagName]&&(x=x.lastChild),E.undoManger&&E.undoManger.save(),v=s.firstChild,te.isBlockElm(v))if(te.isEmptyNode(v))for(x.appendChild(v),d.setStart(v,0).setCursor(!1,!0);s.firstChild;)x.appendChild(s.firstChild)
else y=E.document.createElement("span"),d.insertNode(y),te.isEmptyBlock(x)&&(x.innerHTML=""),te.moveChild(s,x),d.setStartBefore(y).collapse(!0).select(!0),te.remove(y)
else if(te.isEmptyNode(s)){b=E.document.createElement("p")
x.appendChild(b),d.setStart(b,0).setCursor()}else for(d.setEnd(x,x.childNodes.length).collapse().select(!0);s.firstChild;)x.appendChild(s.firstChild)
return te.remove(s),E.fireEvent("contentchange"),E.fireEvent("saveScene"),void te.preventDefault(t)}if(s&&!s.previousSibling){k=s.parentNode,h=d.createBookmark()
if(te.isTagNode(k.parentNode,"ol ul"))k.parentNode.insertBefore(s,k),te.isEmptyNode(k)&&te.remove(k)
else{for(;s.firstChild;)k.parentNode.insertBefore(s.firstChild,k)
te.remove(s),te.isEmptyNode(k)&&te.remove(k)}return d.moveToBookmark(h).setCursor(!1,!0),E.fireEvent("contentchange"),E.fireEvent("saveScene"),void te.preventDefault(t)}}}),E.addListener("keyup",function(e,t){if(8==(t.keyCode||t.which)){var n,i=E.selection.getRange();(n=te.findParentByTagName(i.startContainer,["ol","ul"],!0))&&A(n,n.tagName.toLowerCase(),D(n)||te.getComputedStyle(n,"list-style-type"),!0)}}),E.addListener("tabkeydown",function(){var e=E.selection.getRange()
function t(e){if(-1!=E.options.maxListLevel){for(var t=e.parentNode,n=0;/[ou]l/i.test(t.tagName);)n++,t=t.parentNode
if(n>=E.options.maxListLevel)return 1}}var n=te.findParentByTagName(e.startContainer,"li",!0)
if(n){var i
if(!e.collapsed){E.fireEvent("saveScene"),i=e.createBookmark()
for(var o,r,a=0,s=te.findParents(n);r=s[a++];)if(te.isTagNode(r,"ol ul")){o=r
break}var l=n
if(i.end)for(;l&&!(te.getPosition(l,i.end)&te.POSITION_FOLLOWING);)if(t(l))l=te.getNextDomNode(l,!1,null,function(e){return e!==o})
else{m=l.parentNode,h=E.document.createElement(m.tagName)
var d=(c=J.indexOf(f[h.tagName],D(m)||te.getComputedStyle(m,"list-style-type")))+1==f[h.tagName].length?0:c+1
for(P(h,u=f[h.tagName][d]),m.insertBefore(h,l);l&&!(te.getPosition(l,i.end)&te.POSITION_FOLLOWING);){if(n=l.nextSibling,h.appendChild(l),!n||te.isTagNode(n,"ol ul")){if(n)for(;(n=n.firstChild)&&"LI"!=n.tagName;);else n=te.getNextDomNode(l,!1,null,function(e){return e!==o})
break}l=n}A(h,h.tagName.toLowerCase(),u),l=n}return E.fireEvent("contentchange"),e.moveToBookmark(i).select(),!0}if(t(n))return!0
var c,u,m=n.parentNode,h=E.document.createElement(m.tagName)
if(c=(c=J.indexOf(f[h.tagName],D(m)||te.getComputedStyle(m,"list-style-type")))+1==f[h.tagName].length?0:c+1,P(h,u=f[h.tagName][c]),te.isStartInblock(e))return E.fireEvent("saveScene"),i=e.createBookmark(),m.insertBefore(h,n),h.appendChild(n),A(h,h.tagName.toLowerCase(),u),E.fireEvent("contentchange"),e.moveToBookmark(i).select(!0),!0}}),E.commands.insertorderedlist=E.commands.insertunorderedlist={execCommand:function(e,t){t=t||("insertorderedlist"==e.toLowerCase()?"decimal":"disc")
function n(e){return 1==e.nodeType?"br"!=e.tagName.toLowerCase():!te.isWhitespace(e)}var i=this,o=this.selection.getRange(),r="insertorderedlist"==e.toLowerCase()?"ol":"ul",a=i.document.createDocumentFragment()
o.adjustmentBoundary().shrinkBoundary()
var s,l,d,c,u=o.createBookmark(!0),m=M(i.document.getElementById(u.start)),h=0,f=M(i.document.getElementById(u.end)),p=0
if(m||f){if(m&&(s=m.parentNode),u.end||(f=m),f&&(l=f.parentNode),s===l){for(;m!==f;){if(m=(c=m).nextSibling,!te.isBlockElm(c.firstChild)){for(var g=i.document.createElement("p");c.firstChild;)g.appendChild(c.firstChild)
c.appendChild(g)}a.appendChild(c)}if(c=i.document.createElement("span"),s.insertBefore(c,f),!te.isBlockElm(f.firstChild)){for(g=i.document.createElement("p");f.firstChild;)g.appendChild(f.firstChild)
f.appendChild(g)}a.appendChild(f),te.breakParent(c,s),c.previousSibling&&te.isEmptyNode(c.previousSibling)&&te.remove(c.previousSibling),c.nextSibling&&te.isEmptyNode(c.nextSibling)&&te.remove(c.nextSibling)
var v=D(s)||te.getComputedStyle(s,"list-style-type")||("insertorderedlist"==e.toLowerCase()?"decimal":"disc")
if(s.tagName.toLowerCase()==r&&v==t){for(var b=0,y=i.document.createDocumentFragment();_=a.childNodes[b++];)if(te.isTagNode(_,"ol ul"))J.each(te.getElementsByTagName(_,"li"),function(e){for(;e.firstChild;)y.appendChild(e.firstChild)})
else for(;_.firstChild;)y.appendChild(_.firstChild)
c.parentNode.insertBefore(y,c)}else P(d=i.document.createElement(r),t),d.appendChild(a),c.parentNode.insertBefore(d,c)
return te.remove(c),d&&A(d,r,t),void o.moveToBookmark(u).select()}if(m){for(;m;){if(c=m.nextSibling,te.isTagNode(m,"ol ul"))a.appendChild(m)
else{for(var C=i.document.createDocumentFragment(),N=0;m.firstChild;)te.isBlockElm(m.firstChild)&&(N=1),C.appendChild(m.firstChild)
if(N)a.appendChild(C)
else{var x=i.document.createElement("p")
x.appendChild(C),a.appendChild(x)}te.remove(m)}m=c}s.parentNode.insertBefore(a,s.nextSibling),te.isEmptyNode(s)?(o.setStartBefore(s),te.remove(s)):o.setStartAfter(s),h=1}if(f&&te.inDoc(l,i.document)){for(m=l.firstChild;m&&m!==f;){if(c=m.nextSibling,te.isTagNode(m,"ol ul"))a.appendChild(m)
else{for(C=i.document.createDocumentFragment(),N=0;m.firstChild;)te.isBlockElm(m.firstChild)&&(N=1),C.appendChild(m.firstChild)
N?a.appendChild(C):((x=i.document.createElement("p")).appendChild(C),a.appendChild(x)),te.remove(m)}m=c}var w=te.createElement(i.document,"div",{tmpDiv:1})
te.moveChild(f,w),a.appendChild(w),te.remove(f),l.parentNode.insertBefore(a,l),o.setEndBefore(l),te.isEmptyNode(l)&&te.remove(l),p=1}}h||o.setStartBefore(i.document.getElementById(u.start)),u.end&&!p&&o.setEndAfter(i.document.getElementById(u.end)),o.enlarge(!0,function(e){return L[e.tagName]}),a=i.document.createDocumentFragment()
for(var k=o.createBookmark(),E=te.getNextDomNode(k.start,!1,n),T=o.cloneRange(),S=te.isBlockElm;E&&E!==k.end&&te.getPosition(E,k.end)&te.POSITION_PRECEDING;)if(3==E.nodeType||ee.li[E.tagName]){if(1==E.nodeType&&ee.$list[E.tagName]){for(;E.firstChild;)a.appendChild(E.firstChild)
I=te.getNextDomNode(E,!1,n),te.remove(E),E=I
continue}for(I=E,T.setStartBefore(E);E&&E!==k.end&&(!S(E)||te.isBookmarkNode(E));)I=E,E=te.getNextDomNode(E,!1,null,function(e){return!L[e.tagName]})
E&&S(E)&&(c=te.getNextDomNode(I,!1,n))&&te.isBookmarkNode(c)&&(E=te.getNextDomNode(c,!1,n),I=c),T.setEndAfter(I),E=te.getNextDomNode(I,!1,n)
var B=o.document.createElement("li")
if(B.appendChild(T.extractContents()),te.isEmptyNode(B)){for(var I=o.document.createElement("p");B.firstChild;)I.appendChild(B.firstChild)
B.appendChild(I)}a.appendChild(B)}else E=te.getNextDomNode(E,!0,n)
o.moveToBookmark(k).collapse(!0),P(d=i.document.createElement(r),t),d.appendChild(a),o.insertNode(d),A(d,r,t)
b=0
for(var _,R=te.getElementsByTagName(d,"div");_=R[b++];)_.getAttribute("tmpDiv")&&te.remove(_,!0)
o.moveToBookmark(u).select()},queryCommandState:function(e,t){var n=1<arguments.length&&void 0!==t?t:{}
if(n.allDomInRange&&n.allDomInRange[0]&&2===te.isContentEditable({node:n.allDomInRange[0],checkParent:!1}))return-1
for(var i,o="insertorderedlist"==e.toLowerCase()?"ol":"ul",r=this.selection.getStartElementPath(),a=0;i=r[a++];){if("TABLE"==i.nodeName)return 0
if(o==i.nodeName.toLowerCase())return 1}return 0},queryCommandValue:function(e){for(var t,n,i="insertorderedlist"==e.toLowerCase()?"ol":"ul",o=this.selection.getStartElementPath(),r=0;n=o[r++];){if("TABLE"==n.nodeName){t=null
break}if(i==n.nodeName.toLowerCase()){t=n
break}}return t?D(t)||te.getComputedStyle(t,"list-style-type"):null}}},UE.plugins.enterkey=function(){var l,d=this,c=d.options.enterTag
d.addListener("keyup",function(e,t){if(13==(t.keyCode||t.which)){var n,i=d.selection.getRange(),o=i.startContainer
if(Z.ie)d.fireEvent("saveScene",!0,!0)
else{if(/h\d/i.test(l)){if(Z.gecko)te.findParentByTagName(o,["h1","h2","h3","h4","h5","h6","blockquote","caption","table"],!0)||(d.document.execCommand("formatBlock",!1,"<p>"),n=1)
else if(1==o.nodeType){var r,a=d.document.createTextNode("")
if(i.insertNode(a),r=te.findParentByTagName(a,"div",!0)){for(var s=d.document.createElement("p");r.firstChild;)s.appendChild(r.firstChild)
r.parentNode.insertBefore(s,r),te.remove(r),i.setStartBefore(a).setCursor(),n=1}te.remove(a)}d.undoManger&&n&&d.undoManger.save()}Z.opera&&i.select()}}}),d.addListener("keydown",function(e,t){if(13==(t.keyCode||t.which)){if(d.fireEvent("beforeenterkeydown"))return void te.preventDefault(t)
d.fireEvent("saveScene",!0,!0),l=""
var n=d.selection.getRange()
if(!n.collapsed){var i=n.startContainer,o=n.endContainer,r=te.findParentByTagName(i,"td",!0),a=te.findParentByTagName(o,"td",!0)
if(r&&a&&r!==a||!r&&a||r&&!a)return void(t.preventDefault?t.preventDefault():t.returnValue=!1)}if("p"==c)Z.ie||((i=te.findParentByTagName(n.startContainer,["ol","ul","p","h1","h2","h3","h4","h5","h6","blockquote","caption","section"],!0))||Z.opera?(l=i.tagName,"p"==i.tagName.toLowerCase()&&Z.gecko&&te.removeDirtyAttr(i)):(d.document.execCommand("formatBlock",!1,"<p>"),Z.gecko&&(n=d.selection.getRange(),(i=te.findParentByTagName(n.startContainer,"p",!0))&&te.removeDirtyAttr(i))))
else if(t.preventDefault?t.preventDefault():t.returnValue=!1,n.collapsed)s=n.document.createElement("br"),n.insertNode(s),s.parentNode.lastChild===s?(s.parentNode.insertBefore(s.cloneNode(!0),s),n.setStartBefore(s)):n.setStartAfter(s),n.setCursor()
else if(n.deleteContents(),1==(i=n.startContainer).nodeType&&(i=i.childNodes[n.startOffset])){for(;1==i.nodeType;){if(ee.$empty[i.tagName])return n.setStartBefore(i).setCursor(),d.undoManger&&d.undoManger.save(),!1
if(!i.firstChild){var s=n.document.createElement("br")
return i.appendChild(s),n.setStart(i,0).setCursor(),d.undoManger&&d.undoManger.save(),!1}i=i.firstChild}i===n.startContainer.childNodes[n.startOffset]?(s=n.document.createElement("br"),n.insertNode(s).setCursor()):n.setStart(i,0).setCursor()}else s=n.document.createElement("br"),n.insertNode(s).setStartAfter(s).setCursor()}})},UE.plugins.keystrokes=function(){var y=this,C=!0
y.addListener("keydown",function(e,t){var n=t.keyCode||t.which,i=y.selection.getRange()
if(!i.collapsed&&!(t.ctrlKey||t.shiftKey||t.altKey||t.metaKey)&&(65<=n&&n<=90||48<=n&&n<=57||96<=n&&n<=111||{13:1,8:1,46:1}[n])){var o=i.startContainer
if(te.isFillChar(o)&&i.setStartBefore(o),o=i.endContainer,te.isFillChar(o)&&i.setEndAfter(o),i.txtToElmBoundary(),i.endContainer&&1==i.endContainer.nodeType&&(o=i.endContainer.childNodes[i.endOffset])&&te.isBr(o)&&i.setEndAfter(o),0==i.startOffset&&(o=i.startContainer,te.isBoundaryNode(o,"firstChild")&&(o=i.endContainer,i.endOffset==(3==o.nodeType?o.nodeValue.length:o.childNodes.length)&&te.isBoundaryNode(o,"lastChild"))))return y.fireEvent("saveScene"),y.body.innerHTML="<p>"+(Z.ie11below?te.fillChar:"<br/>")+"</p>",i.setStart(y.body.firstChild,0).setCursor(!1,!0),void y._selectionChange(null,null,"keydown")}if(8==n){if(i=y.selection.getRange(),C=i.collapsed,y.fireEvent("delkeydown",t))return
var r,a
if(i.collapsed&&i.inFillChar()&&(r=i.startContainer,te.isFillChar(r)?(i.setStartBefore(r).shrinkBoundary(!0).collapse(!0),te.remove(r)):(r.nodeValue=r.nodeValue.replace(new RegExp("^"+te.fillChar),""),i.startOffset--,i.collapse(!0).select(!0))),r=i.getClosedNode())return y.fireEvent("saveScene"),i.setStartBefore(r),te.remove(r),i.setCursor(),y.fireEvent("saveScene"),void te.preventDefault(t)
if(!Z.ie&&(r=te.findParentByTagName(i.startContainer,"table",!0),a=te.findParentByTagName(i.endContainer,"table",!0),r&&!a||!r&&a||r!==a))return void t.preventDefault()}if(9==n){var s={ol:1,ul:1,table:1}
if(y.fireEvent("tabkeydown",t))return void te.preventDefault(t)
var l=y.selection.getRange()
y.fireEvent("saveScene")
for(var d=0,c="",u=y.options.tabSize||4,m=y.options.tabNode||"&nbsp;";d<u;d++)c+=m
var h=y.document.createElement("span")
if(h.innerHTML=c+te.fillChar,l.collapsed)l.insertNode(h.cloneNode(!0).firstChild).setCursor(!0)
else if(r=te.findParent(l.startContainer,p),a=te.findParent(l.endContainer,p),r&&a&&r===a)l.deleteContents(),l.insertNode(h.cloneNode(!0).firstChild).setCursor(!0)
else{var f=l.createBookmark(),p=function(e){return te.isBlockElm(e)&&!s[e.tagName.toLowerCase()]}
l.enlarge(!0)
for(var g=l.createBookmark(),v=te.getNextDomNode(g.start,!1,p);v&&!(te.getPosition(v,g.end)&te.POSITION_FOLLOWING);)v.insertBefore(h.cloneNode(!0).firstChild,v.firstChild),v=te.getNextDomNode(v,!1,p)
l.moveToBookmark(g).moveToBookmark(f).select()}te.preventDefault(t)}if(Z.gecko&&46==n&&(l=y.selection.getRange()).collapsed&&(r=l.startContainer,te.isEmptyBlock(r))){for(var b=r.parentNode;1==te.getChildCount(b)&&!te.isBody(b);)b=(r=b).parentNode
r===b.lastChild&&t.preventDefault()}else;}),y.addListener("keyup",function(e,t){var n
if(8==(t.keyCode||t.which)){if(this.fireEvent("delkeyup"))return
if((n=this.selection.getRange()).collapsed){if((r=te.findParentByTagName(n.startContainer,["h1","h2","h3","h4","h5","h6"],!0))&&te.isEmptyBlock(r)){var i=r.previousSibling
if(i&&"TABLE"!=i.nodeName)return te.remove(r),void n.setStartAtLast(i).setCursor(!1,!0)
var o=r.nextSibling
if(o&&"TABLE"!=o.nodeName)return te.remove(r),void n.setStartAtFirst(o).setCursor(!1,!0)}if(te.isBody(n.startContainer)){var r=te.createElement(this.document,"p",{innerHTML:Z.ie11below?te.fillChar:"<br/>"})
n.insertNode(r).setStart(r,0).setCursor(!1,!0)}}if(!C&&(3==n.startContainer.nodeType||1==n.startContainer.nodeType&&te.isEmptyBlock(n.startContainer)))if(Z.ie){var a=n.document.createElement("span")
n.insertNode(a).setStartBefore(a).collapse(!0),n.select(),te.remove(a)}else n.select()}})},UE.plugins.autoheight=function(){var t=this
if(t.autoHeightEnabled=!1!==t.options.autoHeightEnabled,t.autoHeightEnabled){var n,a,e,i,s=0,l=t.options
t.addListener("fullscreenchanged",function(e,t){i=t}),t.addListener("destroy",function(){t.removeListener("adjustheight contentchange afterinserthtml keyup mouseup",o)}),t.enableAutoHeight=function(){var e=this
if(e.autoHeightEnabled){var t=e.document
e.autoHeightEnabled=!0,n=t.body.style.overflowY,t.body.style.overflowY="hidden",e.addListener("adjustheight contentchange afterinserthtml keyup mouseup",o),setTimeout(function(){o.call(e)},Z.gecko?100:0),e.fireEvent("autoheightchanged",e.autoHeightEnabled)}},t.disableAutoHeight=function(){t.body.style.overflowY=n||"",t.removeListener("contentchange",o),t.removeListener("keyup",o),t.removeListener("mouseup",o),t.autoHeightEnabled=!1,t.fireEvent("autoheightchanged",t.autoHeightEnabled)},t.addListener("ready",function(){var e
t.enableAutoHeight(),te.on(Z.ie?t.body:t.document,Z.webkit?"dragover":"drop",function(){clearTimeout(e),e=setTimeout(function(){o.call(t)},100)})})}function o(o){var r=this
clearTimeout(e),i||(!r.queryCommandState||r.queryCommandState&&1!=r.queryCommandState("source"))&&(e=setTimeout(function(){for(var e,t,n,i=r.body.lastChild;i&&1!=i.nodeType;)i=i.previousSibling
i&&1==i.nodeType&&(i.style.clear="both",l.minFrameHeight=Math.max((e=window.innerHeight||Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),t=($("#bottom_main")[0]&&$("#bottom_main")[0].getBoundingClientRect()).height,n=$("#edui1_iframeholder")[0]&&$("#edui1_iframeholder").offset().top,Math.round(e-t-n-45)||400),400),a=Math.max(te.getXY(i).y+i.offsetHeight+25,l.minFrameHeight),("adjustheight"==o||a!=s&&a!=$(r.iframe).height())&&(r.setHeight(a,!0),s=a),te.removeStyle(i,"clear")),r.fireEvent("afterAdjustHeightFnExcute")},50))}},UE.plugins.autofloat=function(){var t=this,n=t.getLang(),e=!1!==t.options.autoFloatEnabled
t.options.topOffset
if(e){var i,o,r,a=UE.ui.uiUtils,s=Z.ie&&Z.version<=6,l=(Z.quirks,document.createElement("div")),d=J.defer(function(){},Z.ie?200:100,!0)
t.addListener("destroy stop_toolbar_float",function(){c(),te.un(window,["scroll","resize"],u),t.removeListener("keydown",d)}),t.addListener("star_toolbar_float",function(){t.fireEvent("stop_toolbar_float"),te.on(window,["scroll","resize"],u),t.addListener("keydown",d)}),t.addListener("ready",function(){var e
!function(){if(UE.ui)return 1
alert(n.autofloatMsg)}()||(r=a.getClientRect,o=t.ui.getDom("toolbarbox"),r(o).top,i=o.style.cssText,s&&((e=document.body.style).backgroundImage='url("about:blank")',e.backgroundAttachment="fixed"),te.on(window,["scroll","resize"],u),t.addListener("keydown",d),t.addListener("beforefullscreenchange",function(e,t){t&&c()}),t.addListener("fullscreenchanged",function(e,t){}),t.addListener("sourcemodechanged",function(e,t){setTimeout(function(){},0)}),t.addListener("clearDoc",function(){setTimeout(function(){},0)}))})}function c(){l&&l.parentNode&&l.parentNode.removeChild(l),o&&(o.style.cssText=i,o.style.marginLeft="0px")}function u(){}},UE.plugins.pasteplain=function(){function e(e){e.tagName="p",e.setStyle()}function t(e){e.parentNode.removeChild(e,!0)}this.setOpt({pasteplain:!1,filterTxtRules:{"-":"script style object iframe embed input select",p:{$:{}},br:{$:{}},div:function(e){for(var t,n=UE.uNode.createElement("p");t=e.firstChild();)"text"!=t.type&&UE.dom.dtd.$block[t.tagName]?n.firstChild()?(e.parentNode.insertBefore(n,e),n=UE.uNode.createElement("p")):e.parentNode.insertBefore(t,e):n.appendChild(t)
n.firstChild()&&e.parentNode.insertBefore(n,e),e.parentNode.removeChild(e)},ol:t,ul:t,dl:t,dt:t,dd:t,li:t,caption:e,th:e,tr:e,h1:e,h2:e,h3:e,h4:e,h5:e,h6:e,td:function(e){e.innerText()&&e.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"),e),e.parentNode.removeChild(e,e.innerText())}}})
var n=this.options.pasteplain
this.commands.pasteplain={queryCommandState:function(){return n?1:0},execCommand:function(){n=0|!n},notNeedUndo:1}},(B=UE.UETable=function(e){this.table=e,this.indexTable=[],this.selectedTds=[],this.cellsRange={},this.update(e)}).removeSelectedClass=function(e){J.each(e,function(e){te.removeClasses(e,"selectTdClass")})},B.addSelectedClass=function(e){J.each(e,function(e){te.addClass(e,"selectTdClass")})},B.isEmptyBlock=function(e){var t=new RegExp(te.fillChar,"g")
if(0<e[Z.ie?"innerText":"textContent"].replace(/^\s*$/,"").replace(t,"").length)return 0
for(var n in ee.$isNotEmpty)if(ee.$isNotEmpty.hasOwnProperty(n)&&e.getElementsByTagName(n).length)return 0
return 1},B.getWidth=function(e){return e?parseInt(te.getComputedStyle(e,"width"),10):0},B.getTableCellAlignState=function(e){J.isArray(e)||(e=[e])
var n={},i=["align","valign"],o=null,r=!0
return J.each(e,function(t){return J.each(i,function(e){if(o=t.getAttribute(e),!n[e]&&o)n[e]=o
else if(!n[e]||o!==n[e])return r=!1}),r}),r?n:null},B.getTableItemsByRange=function(e){var t=e.selection.getStart()
t&&t.id&&0===t.id.indexOf("_baidu_bookmark_start_")&&(t=t.nextSibling)
var n=t&&te.findParentByTagName(t,["td","th"],!0),i=n&&n.parentNode,o=t&&te.findParentByTagName(t,"caption",!0)
return{cell:n,tr:i,table:o?o.parentNode:i&&i.parentNode.parentNode,caption:o}},B.getUETableBySelected=function(e){var t=B.getTableItemsByRange(e).table
return t&&t.ueTable&&t.ueTable.selectedTds.length?t.ueTable:null},B.getDefaultValue=function(e,t){var n,i,o,r,a={thin:"0px",medium:"1px",thick:"2px"}
if(t)return s=t.getElementsByTagName("td")[0],r=te.getComputedStyle(t,"border-left-width"),n=parseInt(a[r]||r,10),r=te.getComputedStyle(s,"padding-left"),i=parseInt(a[r]||r,10),r=te.getComputedStyle(s,"border-left-width"),{tableBorder:n,tdPadding:i,tdBorder:o=parseInt(a[r]||r,10)};(t=e.document.createElement("table")).insertRow(0).insertCell(0).innerHTML="xxx",e.body.appendChild(t)
var s=t.getElementsByTagName("td")[0]
return r=te.getComputedStyle(t,"border-left-width"),n=parseInt(a[r]||r,10),r=te.getComputedStyle(s,"padding-left"),i=parseInt(a[r]||r,10),r=te.getComputedStyle(s,"border-left-width"),o=parseInt(a[r]||r,10),te.remove(t),{tableBorder:n,tdPadding:i,tdBorder:o}},B.getUETable=function(e){var t=e.tagName.toLowerCase()
return(e="td"==t||"th"==t||"caption"==t?te.findParentByTagName(e,"table",!0):e).ueTable||(e.ueTable=new B(e)),e.ueTable},B.cloneCell=function(e,t,n){if(!e||J.isString(e))return this.table.ownerDocument.createElement(e||"td")
var i=te.hasClass(e,"selectTdClass")
i&&te.removeClasses(e,"selectTdClass")
var o=e.cloneNode(!0)
return t&&(o.rowSpan=o.colSpan=1),n||te.removeAttributes(o,"width height"),n||te.removeAttributes(o,"style"),o.style.borderLeftStyle="",o.style.borderTopStyle="",o.style.borderLeftColor=e.style.borderRightColor,o.style.borderLeftWidth=e.style.borderRightWidth,o.style.borderTopColor=e.style.borderBottomColor,o.style.borderTopWidth=e.style.borderBottomWidth,i&&te.addClass(e,"selectTdClass"),o},B.prototype={getMaxRows:function(){for(var e,t=this.table.rows,n=1,i=0;e=t[i];i++){for(var o,r=1,a=0;o=e.cells[a++];)r=Math.max(o.rowSpan||1,r)
n=Math.max(r+i,n)}return n},getMaxCols:function(){for(var e,t=this.table.rows,n=0,i={},o=0;e=t[o];o++){for(var r,a=0,s=0;r=e.cells[s++];)if(a+=r.colSpan||1,r.rowSpan&&1<r.rowSpan)for(var l=1;l<r.rowSpan;l++)i["row_"+(o+l)]?i["row_"+(o+l)]++:i["row_"+(o+l)]=r.colSpan||1
a+=i["row_"+o]||0,n=Math.max(a,n)}return n},getCellColIndex:function(){},getHSideCell:function(e,t){try{var n,i,o=this.getCellInfo(e),r=this.selectedTds.length,a=this.cellsRange
return!t&&(r?!a.beginColIndex:!o.colIndex)||t&&(r?a.endColIndex==this.colsNum-1:o.colIndex==this.colsNum-1)?null:(n=r?a.beginRowIndex:o.rowIndex,i=t?r?a.endColIndex+1:o.colIndex+1:r?a.beginColIndex-1:o.colIndex<1?0:o.colIndex-1,this.getCell(this.indexTable[n][i].rowIndex,this.indexTable[n][i].cellIndex))}catch(e){}},getTabNextCell:function(e,t){var n,i=this.getCellInfo(e),o=t||i.rowIndex,r=i.colIndex+1+(i.colSpan-1)
try{n=this.getCell(this.indexTable[o][r].rowIndex,this.indexTable[o][r].cellIndex)}catch(e){try{o=+o+1,r=0,n=this.getCell(this.indexTable[o][r].rowIndex,this.indexTable[o][r].cellIndex)}catch(e){}}return n},getVSideCell:function(e,t,n){try{var i,o,r=this.getCellInfo(e),a=this.selectedTds.length&&!n,s=this.cellsRange
return!t&&0==r.rowIndex||t&&(a?s.endRowIndex==this.rowsNum-1:r.rowIndex+r.rowSpan>this.rowsNum-1)?null:(i=t?a?s.endRowIndex+1:r.rowIndex+r.rowSpan:a?s.beginRowIndex-1:r.rowIndex-1,o=a?s.beginColIndex:r.colIndex,this.getCell(this.indexTable[i][o].rowIndex,this.indexTable[i][o].cellIndex))}catch(e){}},getSameEndPosCells:function(e,t){try{for(var n="x"===t.toLowerCase(),i=te.getXY(e)[n?"x":"y"]+e["offset"+(n?"Width":"Height")],o=this.table.rows,r=null,a=[],s=0;s<this.rowsNum;s++){r=o[s].cells
for(var l,d=0;l=r[d++];){var c=te.getXY(l)[n?"x":"y"]+l["offset"+(n?"Width":"Height")]
if(i<c&&n)break
if((e==l||i==c)&&(1==l[n?"colSpan":"rowSpan"]&&a.push(l),n))break}}return a}catch(e){}},setCellContent:function(e,t){e.innerHTML=t||(Z.ie11below?te.fillChar:"<br />")},cloneCell:B.cloneCell,getSameStartPosXCells:function(e){try{for(var t,n=te.getXY(e).x+e.offsetWidth,i=this.table.rows,o=[],r=0;r<this.rowsNum;r++){t=i[r].cells
for(var a,s=0;a=t[s++];){var l=te.getXY(a).x
if(n<l)break
if(l==n&&1==a.colSpan){o.push(a)
break}}}return o}catch(e){}},update:function(e){this.table=e||this.table,this.selectedTds=[],this.cellsRange={},this.indexTable=[]
for(var t=this.table.rows,n=this.getMaxRows(),i=n-t.length,o=this.getMaxCols();i--;)this.table.insertRow(t.length)
this.rowsNum=n,this.colsNum=o
for(var r=0,a=t.length;r<a;r++)this.indexTable[r]=new Array(o)
for(var s,l=0;s=t[l];l++)for(var d,c=0,u=s.cells;d=u[c];c++){d.rowSpan>n&&(d.rowSpan=n)
for(var m=c,h=d.rowSpan||1,f=d.colSpan||1;this.indexTable[l][m];)m++
for(var p=0;p<h;p++)for(var g=0;g<f;g++)this.indexTable[l+p][m+g]={rowIndex:l,cellIndex:c,colIndex:m,rowSpan:h,colSpan:f}}for(p=0;p<n;p++)for(g=0;g<o;g++)void 0===this.indexTable[p][g]&&(d=(d=(s=t[p]).cells[s.cells.length-1])?d.cloneNode(!0):this.table.ownerDocument.createElement("td"),this.setCellContent(d),1!==d.colSpan&&(d.colSpan=1),1!==d.rowSpan&&(d.rowSpan=1),s.appendChild(d),this.indexTable[p][g]={rowIndex:p,cellIndex:d.cellIndex,colIndex:g,rowSpan:1,colSpan:1})
var v=te.getElementsByTagName(this.table,"td"),b=[]
if(J.each(v,function(e){te.hasClass(e,"selectTdClass")&&b.push(e)}),b.length){var y=b[0],C=b[b.length-1],N=this.getCellInfo(y),x=this.getCellInfo(C)
this.selectedTds=b,this.cellsRange={beginRowIndex:N.rowIndex,beginColIndex:N.colIndex,endRowIndex:x.rowIndex+x.rowSpan-1,endColIndex:x.colIndex+x.colSpan-1}}},getCellInfo:function(e){if(e)for(var t=e.cellIndex,n=e.parentNode.rowIndex,i=this.indexTable[n],o=this.colsNum,r=t;r<o;r++){var a=i[r]
if(a.rowIndex===n&&a.cellIndex===t)return a}},getCell:function(e,t){return e<this.rowsNum&&this.table.rows[e].cells[t]||null},deleteCell:function(e,t){t="number"==typeof t?t:e.parentNode.rowIndex,this.table.rows[t].deleteCell(e.cellIndex)},getCellsRange:function(e,t){try{var m=this,n=m.getCellInfo(e)
if(e===t)return{beginRowIndex:n.rowIndex,beginColIndex:n.colIndex,endRowIndex:n.rowIndex+n.rowSpan-1,endColIndex:n.colIndex+n.colSpan-1}
var i=m.getCellInfo(t)
return function e(t,n,i,o){var r,a,s,l=t,d=n,c=i,u=o
if(0<t)for(a=n;a<o;a++)(s=(r=m.indexTable[t][a]).rowIndex)<t&&(l=Math.min(s,l))
if(o<m.colsNum)for(s=t;s<i;s++)o<(a=(r=m.indexTable[s][o]).colIndex+r.colSpan-1)&&(u=Math.max(a,u))
if(i<m.rowsNum)for(a=n;a<o;a++)i<(s=(r=m.indexTable[i][a]).rowIndex+r.rowSpan-1)&&(c=Math.max(s,c))
if(0<n)for(s=t;s<i;s++)(a=(r=m.indexTable[s][n]).colIndex)<n&&(d=Math.min(r.colIndex,d))
return l!=t||d!=n||c!=i||u!=o?e(l,d,c,u):{beginRowIndex:t,beginColIndex:n,endRowIndex:i,endColIndex:o}}(Math.min(n.rowIndex,i.rowIndex),Math.min(n.colIndex,i.colIndex),Math.max(n.rowIndex+n.rowSpan-1,i.rowIndex+i.rowSpan-1),Math.max(n.colIndex+n.colSpan-1,i.colIndex+i.colSpan-1))}catch(e){}},getCells:function(e){this.clearSelected()
for(var t,n,i,o=e.beginRowIndex,r=e.beginColIndex,a=e.endRowIndex,s=e.endColIndex,l={},d=[],c=o;c<=a;c++)for(var u=r;u<=s;u++){var m=(n=(t=this.indexTable[c][u]).rowIndex)+"|"+(i=t.colIndex)
if(!l[m]){if(l[m]=1,n<c||i<u||n+t.rowSpan-1>a||i+t.colSpan-1>s)return null
d.push(this.getCell(n,t.cellIndex))}}return d},clearSelected:function(){B.removeSelectedClass(this.selectedTds),this.selectedTds=[],this.cellsRange={}},setSelected:function(e){var t=this.getCells(e)
B.addSelectedClass(t),this.selectedTds=t,this.cellsRange=e},isFullRow:function(){var e=this.cellsRange
return e.endColIndex-e.beginColIndex+1==this.colsNum},isFullCol:function(){var e=this.cellsRange,t=this.table.getElementsByTagName("th"),n=e.endRowIndex-e.beginRowIndex+1
return t.length?n==this.rowsNum||n==this.rowsNum-1:n==this.rowsNum},getNextCell:function(e,t,n){try{var i,o,r=this.getCellInfo(e),a=this.selectedTds.length&&!n,s=this.cellsRange
return!t&&0==r.rowIndex||t&&(a?s.endRowIndex==this.rowsNum-1:r.rowIndex+r.rowSpan>this.rowsNum-1)?null:(i=t?a?s.endRowIndex+1:r.rowIndex+r.rowSpan:a?s.beginRowIndex-1:r.rowIndex-1,o=a?s.beginColIndex:r.colIndex,this.getCell(this.indexTable[i][o].rowIndex,this.indexTable[i][o].cellIndex))}catch(e){}},getPreviewCell:function(e,t){try{var n,i,o=this.getCellInfo(e),r=this.selectedTds.length,a=this.cellsRange
return!t&&(r?!a.beginColIndex:!o.colIndex)||t&&(r?a.endColIndex==this.colsNum-1:o.rowIndex>this.colsNum-1)?null:(n=t?r?a.beginRowIndex:o.rowIndex<1?0:o.rowIndex-1:r?a.beginRowIndex:o.rowIndex,i=t?r?a.endColIndex+1:o.colIndex:r?a.beginColIndex-1:o.colIndex<1?0:o.colIndex-1,this.getCell(this.indexTable[n][i].rowIndex,this.indexTable[n][i].cellIndex))}catch(e){}},moveContent:function(e,t){if(!B.isEmptyBlock(t))if(B.isEmptyBlock(e))e.innerHTML=t.innerHTML
else{var n=e.lastChild
for(3!=n.nodeType&&ee.$block[n.tagName]||e.appendChild(e.ownerDocument.createElement("br"));n=t.firstChild;)e.appendChild(n)}},mergeRight:function(e){var t=this.getCellInfo(e),n=t.colIndex+t.colSpan,i=this.indexTable[t.rowIndex][n],o=this.getCell(i.rowIndex,i.cellIndex)
e.colSpan=t.colSpan+i.colSpan,e.removeAttribute("width"),this.moveContent(e,o),this.deleteCell(o,i.rowIndex),this.update()},mergeDown:function(e){var t=this.getCellInfo(e),n=t.rowIndex+t.rowSpan,i=this.indexTable[n][t.colIndex],o=this.getCell(i.rowIndex,i.cellIndex)
e.rowSpan=t.rowSpan+i.rowSpan,e.removeAttribute("height"),this.moveContent(e,o),this.deleteCell(o,i.rowIndex),this.update()},mergeRange:function(){var e=this.cellsRange,t=this.getCell(e.beginRowIndex,this.indexTable[e.beginRowIndex][e.beginColIndex].cellIndex)
if("TH"==t.tagName&&e.endRowIndex!==e.beginRowIndex){var n=this.indexTable,i=this.getCellInfo(t)
t=this.getCell(1,n[1][i.colIndex].cellIndex),e=this.getCellsRange(t,this.getCell(n[this.rowsNum-1][i.colIndex].rowIndex,n[this.rowsNum-1][i.colIndex].cellIndex))}for(var o,r=this.getCells(e),a=0;o=r[a++];)o!==t&&(this.moveContent(t,o),this.deleteCell(o))
if(t.rowSpan=e.endRowIndex-e.beginRowIndex+1,1<t.rowSpan&&t.removeAttribute("height"),t.colSpan=e.endColIndex-e.beginColIndex+1,1<t.colSpan&&t.removeAttribute("width"),t.rowSpan==this.rowsNum&&1!=t.colSpan&&(t.colSpan=1),t.colSpan==this.colsNum&&1!=t.rowSpan){var s=t.parentNode.rowIndex
if(this.table.deleteRow){a=s+1
for(var l=s+1,d=t.rowSpan;a<d;a++)this.table.deleteRow(l)}else for(a=0,d=t.rowSpan-1;a<d;a++){var c=this.table.rows[s+1]
c.parentNode.removeChild(c)}t.rowSpan=1}this.update()},insertRow:function(e,t){var n,i=this.colsNum,o=this.table,r=o.insertRow(e)
parseInt((o.offsetWidth-20*i-i-1)/i,10)
if(0==e||e==this.rowsNum)for(var a=0;a<i;a++)n=this.cloneCell(t,!0),this.setCellContent(n),n.getAttribute("vAlign")&&n.setAttribute("vAlign",n.getAttribute("vAlign")),r.appendChild(n)
else{var s=this.indexTable[e]
for(a=0;a<i;a++){var l=s[a]
l.rowIndex<e?(n=this.getCell(l.rowIndex,l.cellIndex)).rowSpan=l.rowSpan+1:(n=this.cloneCell(t,!0),this.setCellContent(n),r.appendChild(n))}}return this.update(),r},deleteRow:function(e){for(var t=this.table.rows[e],n=this.indexTable[e],i=this.colsNum,o=0,r=0;r<i;){var a=n[r],s=this.getCell(a.rowIndex,a.cellIndex)
if(1<s.rowSpan&&a.rowIndex==e){var l=s.cloneNode(!0)
l.rowSpan=s.rowSpan-1,l.innerHTML=""
var d,c=e+(s.rowSpan=1),u=this.table.rows[c],m=this.getPreviewMergedCellsNum(c,r)-o
m<r?(d=r-m-1,te.insertAfter(u.cells[d],l)):u.cells.length&&u.insertBefore(l,u.cells[0]),o+=1}r+=s.colSpan||1}var h=[],f={}
for(r=0;r<i;r++){var p=n[r].rowIndex,g=n[r].cellIndex,v=p+"_"+g
f[v]||(f[v]=1,s=this.getCell(p,g),h.push(s))}var b=[]
J.each(h,function(e){1==e.rowSpan?e.parentNode.removeChild(e):b.push(e)}),J.each(b,function(e){e.rowSpan--}),t.parentNode.removeChild(t),this.update()},insertCol:function(e,t,n){var i,o,r,a=this.rowsNum,s=0,l=parseInt((this.table.offsetWidth-20*(this.colsNum+1)-(this.colsNum+1))/(this.colsNum+1),10)
function d(e,t,n){if(0==e){var i=t.nextSibling||t.previousSibling
"TH"==i.tagName&&((i=t.ownerDocument.createElement("th")).appendChild(t.firstChild),n.insertBefore(i,t),te.remove(t))}else if("TH"==t.tagName){var o=t.ownerDocument.createElement("td")
o.appendChild(t.firstChild),n.insertBefore(o,t),te.remove(t)}}if(0==e||e==this.colsNum)for(;s<a;s++)r=(i=this.table.rows[s]).cells[0==e?e:i.cells.length],o=this.cloneCell(t,!0),this.setCellContent(o),o.setAttribute("vAlign",o.getAttribute("vAlign")),r&&o.setAttribute("width",r.getAttribute("width")),e?te.insertAfter(i.cells[i.cells.length-1],o):i.insertBefore(o,i.cells[0]),d(s,o,i)
else for(;s<a;s++){var c=this.indexTable[s][e]
c.colIndex<e?(o=this.getCell(c.rowIndex,c.cellIndex)).colSpan=c.colSpan+1:(r=(i=this.table.rows[s]).cells[c.cellIndex],o=this.cloneCell(t,!0),this.setCellContent(o),o.setAttribute("vAlign",o.getAttribute("vAlign")),r&&o.setAttribute("width",r.getAttribute("width")),r?i.insertBefore(o,r):i.appendChild(o)),d(s,o,i)}this.update(),this.updateWidth(l,n||{tdPadding:10,tdBorder:1})},updateWidth:function(t,e){var n=this.table,i=B.getWidth(n)-2*e.tdPadding-e.tdBorder+t
if(i<n.ownerDocument.body.offsetWidth)n.setAttribute("width",i)
else{var o=te.getElementsByTagName(this.table,"td")
J.each(o,function(e){e.setAttribute("width",t)})}},deleteCol:function(e){for(var t=this.indexTable,n=this.table.rows,i=this.table.getAttribute("width"),o=0,r=this.rowsNum,a={},s=0;s<r;){var l=t[s][e],d=l.rowIndex+"_"+l.colIndex
if(!a[d]){a[d]=1
var c=this.getCell(l.rowIndex,l.cellIndex)
o=o||c&&parseInt(c.offsetWidth/c.colSpan,10).toFixed(0),1<c.colSpan?c.colSpan--:n[s].deleteCell(l.cellIndex),s+=l.rowSpan||1}}this.table.setAttribute("width",i-o),this.update()},splitToCells:function(e){var t=this,n=this.splitToRows(e)
J.each(n,function(e){t.splitToCols(e)})},splitToRows:function(e){var t=this.getCellInfo(e),n=t.rowIndex,i=t.colIndex,o=[]
e.rowSpan=1,o.push(e)
for(var r=n,a=n+t.rowSpan;r<a;r++)if(r!=n){var s=this.table.rows[r].insertCell(i-this.getPreviewMergedCellsNum(r,i))
s.colSpan=t.colSpan,this.setCellContent(s),s.setAttribute("vAlign",e.getAttribute("vAlign")),s.setAttribute("align",e.getAttribute("align")),e.style.cssText&&(s.style.cssText=e.style.cssText),o.push(s)}return this.update(),o},getPreviewMergedCellsNum:function(e,t){for(var n=this.indexTable[e],i=0,o=0;o<t;){var r=n[o].colSpan
i+=r-(n[o].rowIndex==e?1:0),o+=r}return i},splitToCols:function(e){var t=(e.offsetWidth/e.colSpan-22).toFixed(0),n=this.getCellInfo(e),i=n.rowIndex,o=n.colIndex,r=[]
e.colSpan=1,e.setAttribute("width",t),r.push(e)
for(var a=o,s=o+n.colSpan;a<s;a++)if(a!=o){var l=this.table.rows[i],d=l.insertCell(this.indexTable[i][a].cellIndex+1)
if(d.rowSpan=n.rowSpan,this.setCellContent(d),d.setAttribute("vAlign",e.getAttribute("vAlign")),d.setAttribute("align",e.getAttribute("align")),d.setAttribute("width",t),e.style.cssText&&(d.style.cssText=e.style.cssText),"TH"==e.tagName){var c=e.ownerDocument.createElement("th")
c.appendChild(d.firstChild),c.setAttribute("vAlign",e.getAttribute("vAlign")),c.rowSpan=d.rowSpan,l.insertBefore(c,d),te.remove(d)}r.push(d)}return this.update(),r},isLastCell:function(e,t,n){t=t||this.rowsNum,n=n||this.colsNum
var i=this.getCellInfo(e)
return i.rowIndex+i.rowSpan==t&&i.colIndex+i.colSpan==n},getLastCell:function(e){e=e||this.table.getElementsByTagName("td")
this.getCellInfo(e[0])
var t,n=this,i=e[0],o=i.parentNode,r=0,a=0
return J.each(e,function(e){e.parentNode==o&&(a+=e.colSpan||1),r+=e.rowSpan*e.colSpan||1}),t=r/a,J.each(e,function(e){if(n.isLastCell(e,t,a))return i=e,!1}),i},selectRow:function(e){var t=this.indexTable[e],n=this.getCell(t[0].rowIndex,t[0].cellIndex),i=this.getCell(t[this.colsNum-1].rowIndex,t[this.colsNum-1].cellIndex),o=this.getCellsRange(n,i)
this.setSelected(o)},selectTable:function(){var e=this.table.getElementsByTagName("td"),t=this.getCellsRange(e[0],e[e.length-1])
this.setSelected(t)},sortTable:function(r,a){var e=this.table,t=e.rows,n=[],i="TH"===t[0].cells[0].tagName,o=0
if(this.selectedTds.length){for(var s=this.cellsRange,l=s.endRowIndex+1,d=s.beginRowIndex;d<l;d++)n[d]=t[d]
n.splice(0,s.beginRowIndex),o=s.endRowIndex+1===this.rowsNum?0:s.endRowIndex+1}else for(d=0,l=t.length;d<l;d++)n[d]=t[d]
i&&n.splice(0,1),n=J.sort(n,function(e,t){function n(e){return e.innerText||e.textContent}var i,o
return a?"number"==typeof a?a:a.call(this,e.cells[r],t.cells[r]):(i=n(e.cells[r]),o=n(t.cells[r]),i.localeCompare(o))})
var c=e.ownerDocument.createDocumentFragment(),u=0
for(l=n.length;u<l;u++)c.appendChild(n[u])
var m=e.getElementsByTagName("tbody")[0]
o?m.insertBefore(c,t[o-s.endRowIndex+s.beginRowIndex-1]):m.appendChild(c)},setBackground:function(e,t){if("string"==typeof t)J.each(e,function(e){e.style.backgroundColor=t})
else if("object"===(void 0===t?"undefined":_typeof(t))){t=J.extend({repeat:!0,colorList:["#ddd","#fff"]},t)
for(var n,i=this.getCellInfo(e[0]).rowIndex,o=0,r=t.colorList,a=0;n=e[a++];){var s=this.getCellInfo(n)
n.style.backgroundColor=(l=r,d=i+o==s.rowIndex?o:++o,c=t.repeat,l[d]?l[d]:c?l[d%l.length]:"")}}var l,d,c},removeBackground:function(e){J.each(e,function(e){e.style.backgroundColor=""})}},I=UE.UETable,UE.commands.inserttable={queryCommandState:function(){return At(this).table?-1:0},execCommand:function(e,t){t=t||J.extend({},{numCols:this.options.defaultCols,numRows:this.options.defaultRows,tdvalign:this.options.tdvalign})
var n=this.selection.getRange().startContainer,i=te.findParent(n,function(e){return te.isBlockElm(e)},!0)||this.body,o=Mt(this),r=i.offsetWidth,a=Math.floor(r/t.numCols-2*o.tdPadding-o.tdBorder)
t.tdvalign||(t.tdvalign=this.options.tdvalign),this.execCommand("inserthtml",function(e,t){for(var n=[],i=e.numRows,o=e.numCols,r=0;r<i;r++){n.push("<tr>")
for(var a=0;a<o;a++)n.push('<td width="'+t+'"  vAlign="'+e.tdvalign+'" >'+(Z.ie11below?te.fillChar:"<br/>")+"</td>")
n.push("</tr>")}return"<table><tbody>"+n.join("")+"</tbody></table>"}(t,a))}},UE.commands.insertparagraphbeforetable={queryCommandState:function(){return At(this).cell?0:-1},execCommand:function(){var e=At(this).table
if(e){var t=this.document.createElement("p")
t.innerHTML=Z.ie11below?te.fillChar:"<br />",e.parentNode.insertBefore(t,e),this.selection.getRange().setStart(t,0).setCursor()}}},UE.commands.deletetable={queryCommandState:function(){var e=this.selection.getRange()
return te.findParentByTagName(e.startContainer,"table",!0)?0:-1},execCommand:function(e,t){var n=this.selection.getRange()
if(t=t||te.findParentByTagName(n.startContainer,"table",!0)){var i=t.nextSibling
i||(i=te.createElement(this.document,"p",{innerHTML:Z.ie11below?te.fillChar:"<br/>"}),t.parentNode.insertBefore(i,t)),te.remove(t),n=this.selection.getRange(),3==i.nodeType?n.setStartBefore(i):n.setStart(i,0),n.setCursor(!1,!0),this.fireEvent("tablehasdeleted")}}},UE.commands.cellalign={queryCommandState:function(){return Ht(this).length?0:-1},execCommand:function(e,t){var n=Ht(this)
if(n.length)for(var i,o=0;i=n[o++];)i.setAttribute("align",t)}},UE.commands.cellvalign={queryCommandState:function(){return Ht(this).length?0:-1},execCommand:function(e,t){var n=Ht(this)
if(n.length)for(var i,o=0;i=n[o++];)i.setAttribute("vAlign",t)}},UE.commands.insertcaption={queryCommandState:function(){var e=At(this).table
return e&&0==e.getElementsByTagName("caption").length?1:-1},execCommand:function(){var e=At(this).table
if(e){var t=this.document.createElement("caption")
t.innerHTML=Z.ie11below?te.fillChar:"<br/>",e.insertBefore(t,e.firstChild),this.selection.getRange().setStart(t,0).setCursor()}}},UE.commands.deletecaption={queryCommandState:function(){var e=this.selection.getRange(),t=te.findParentByTagName(e.startContainer,"table")
return!t||0==t.getElementsByTagName("caption").length?-1:1},execCommand:function(){var e=this.selection.getRange(),t=te.findParentByTagName(e.startContainer,"table")
t&&(te.remove(t.getElementsByTagName("caption")[0]),this.selection.getRange().setStart(t.rows[0].cells[0],0).setCursor())}},UE.commands.inserttitle={queryCommandState:function(){var e=At(this).table
return e&&0==e.rows[0].getElementsByTagName("th").length?0:-1},execCommand:function(){var e=At(this).table
e&&Ut(e).insertRow(0,"th")
var t=e.getElementsByTagName("th")[0]
this.selection.getRange().setStart(t,0).setCursor(!1,!0)}},UE.commands.deletetitle={queryCommandState:function(){var e=At(this).table
return e&&e.rows[0].getElementsByTagName("th").length?0:-1},execCommand:function(){var e=At(this).table
e&&te.remove(e.rows[0])
var t=e.getElementsByTagName("td")[0]
this.selection.getRange().setStart(t,0).setCursor(!1,!0)}},UE.commands.mergeright={queryCommandState:function(){var e=At(this)
if(!e.cell)return-1
var t=Ut(e.table)
if(t.selectedTds.length)return-1
var n=t.getCellInfo(e.cell),i=n.colIndex+n.colSpan
if(i>=t.colsNum)return-1
var o=t.indexTable[n.rowIndex][i]
return o.rowIndex==n.rowIndex&&o.rowSpan==n.rowSpan?0:-1},execCommand:function(){var e=this.selection.getRange(),t=e.createBookmark(!0),n=At(this).cell
Ut(n).mergeRight(n),e.moveToBookmark(t).select()}},UE.commands.mergedown={queryCommandState:function(){var e=At(this),t=e.cell
if(!t||"TH"==t.tagName)return-1
var n=Ut(e.table)
if(n.selectedTds.length)return-1
var i=n.getCellInfo(e.cell),o=i.rowIndex+i.rowSpan
if(o>=n.rowsNum)return-1
var r=n.indexTable[o][i.colIndex]
return r.colIndex==i.colIndex&&r.colSpan==i.colSpan&&"TH"!==e.cell.tagName?0:-1},execCommand:function(){var e=this.selection.getRange(),t=e.createBookmark(!0),n=At(this).cell
Ut(n).mergeDown(n),e.moveToBookmark(t).select()}},UE.commands.mergecells={queryCommandState:function(){return Pt(this)?0:-1},execCommand:function(){var e=Pt(this)
if(e&&e.selectedTds.length){var t=e.selectedTds[0]
e.mergeRange()
var n=this.selection.getRange()
te.isEmptyBlock(t)?n.setStart(t,0).collapse(!0):n.selectNodeContents(t),n.select()}}},UE.commands.insertrow={queryCommandState:function(){var e=At(this),t=e.cell
return t&&"TD"==t.tagName&&Ut(e.table).rowsNum<this.options.maxRowNum?0:-1},execCommand:function(){var e=this.selection.getRange(),t=e.createBookmark(!0),n=At(this),i=n.cell,o=n.table,r=Ut(o),a=r.getCellInfo(i)
if(r.selectedTds.length)for(var s=r.cellsRange,l=0,d=s.endRowIndex-s.beginRowIndex+1;l<d;l++)r.insertRow(s.beginRowIndex,i)
else r.insertRow(a.rowIndex,i)
e.moveToBookmark(t).select(),"enabled"===o.getAttribute("interlaced")&&this.fireEvent("interlacetable",o)}},UE.commands.insertrownext={queryCommandState:function(){var e=At(this),t=e.cell
return t&&"TD"==t.tagName&&Ut(e.table).rowsNum<this.options.maxRowNum?0:-1},execCommand:function(){var e=this.selection.getRange(),t=e.createBookmark(!0),n=At(this),i=n.cell,o=n.table,r=Ut(o),a=r.getCellInfo(i)
if(r.selectedTds.length)for(var s=r.cellsRange,l=0,d=s.endRowIndex-s.beginRowIndex+1;l<d;l++)r.insertRow(s.endRowIndex+1,i)
else r.insertRow(a.rowIndex+a.rowSpan,i)
e.moveToBookmark(t).select(),"enabled"===o.getAttribute("interlaced")&&this.fireEvent("interlacetable",o)}},UE.commands.deleterow={queryCommandState:function(){return At(this).cell?0:-1},execCommand:function(){var e=At(this).cell,t=Ut(e),n=t.cellsRange,i=t.getCellInfo(e),o=t.getVSideCell(e),r=t.getVSideCell(e,!0),a=this.selection.getRange()
if(J.isEmptyObject(n))t.deleteRow(i.rowIndex)
else for(var s=n.beginRowIndex;s<n.endRowIndex+1;s++)t.deleteRow(n.beginRowIndex)
var l=t.table
if(l.getElementsByTagName("td").length)if(1==i.rowSpan||i.rowSpan==n.endRowIndex-n.beginRowIndex+1)(r||o)&&a.selectNodeContents(r||o).setCursor(!1,!0)
else{var d=t.getCell(i.rowIndex,t.indexTable[i.rowIndex][i.colIndex].cellIndex)
d&&a.selectNodeContents(d).setCursor(!1,!0)}else{var c=l.nextSibling
te.remove(l),c&&a.setStart(c,0).setCursor(!1,!0)}"enabled"===l.getAttribute("interlaced")&&this.fireEvent("interlacetable",l)}},UE.commands.insertcol={queryCommandState:function(){var e=At(this),t=e.cell
return t&&("TD"==t.tagName||"TH"==t.tagName)&&Ut(e.table).colsNum<this.options.maxColNum?0:-1},execCommand:function(e){var t=this.selection.getRange(),n=t.createBookmark(!0)
if(-1!=this.queryCommandState(e)){var i=At(this).cell,o=Ut(i),r=o.getCellInfo(i)
if(o.selectedTds.length)for(var a=o.cellsRange,s=0,l=a.endColIndex-a.beginColIndex+1;s<l;s++)o.insertCol(a.beginColIndex,i)
else o.insertCol(r.colIndex,i)
t.moveToBookmark(n).select(!0)}}},UE.commands.insertcolnext={queryCommandState:function(){var e=At(this)
return e.cell&&Ut(e.table).colsNum<this.options.maxColNum?0:-1},execCommand:function(){var e=this.selection.getRange(),t=e.createBookmark(!0),n=At(this).cell,i=Ut(n),o=i.getCellInfo(n)
if(i.selectedTds.length)for(var r=i.cellsRange,a=0,s=r.endColIndex-r.beginColIndex+1;a<s;a++)i.insertCol(r.endColIndex+1,n)
else i.insertCol(o.colIndex+o.colSpan,n)
e.moveToBookmark(t).select()}},UE.commands.deletecol={queryCommandState:function(){return At(this).cell?0:-1},execCommand:function(){var e=At(this).cell,t=Ut(e),n=t.cellsRange,i=t.getCellInfo(e),o=t.getHSideCell(e),r=t.getHSideCell(e,!0)
if(J.isEmptyObject(n))t.deleteCol(i.colIndex)
else for(var a=n.beginColIndex;a<n.endColIndex+1;a++)t.deleteCol(n.beginColIndex)
var s=t.table,l=this.selection.getRange()
if(s.getElementsByTagName("td").length)te.inDoc(e,this.document)?l.setStart(e,0).setCursor(!1,!0):r&&te.inDoc(r,this.document)?l.selectNodeContents(r).setCursor(!1,!0):o&&te.inDoc(o,this.document)&&l.selectNodeContents(o).setCursor(!0,!0)
else{var d=s.nextSibling
te.remove(s),d&&l.setStart(d,0).setCursor(!1,!0)}}},UE.commands.splittocells={queryCommandState:function(){var e=At(this),t=e.cell
return t&&!(0<Ut(e.table).selectedTds.length)&&t&&(1<t.colSpan||1<t.rowSpan)?0:-1},execCommand:function(){var e=this.selection.getRange(),t=e.createBookmark(!0),n=At(this).cell
Ut(n).splitToCells(n),e.moveToBookmark(t).select()}},UE.commands.splittorows={queryCommandState:function(){var e=At(this),t=e.cell
return t&&!(0<Ut(e.table).selectedTds.length)&&t&&1<t.rowSpan?0:-1},execCommand:function(){var e=this.selection.getRange(),t=e.createBookmark(!0),n=At(this).cell
Ut(n).splitToRows(n),e.moveToBookmark(t).select()}},UE.commands.splittocols={queryCommandState:function(){var e=At(this),t=e.cell
return t&&!(0<Ut(e.table).selectedTds.length)&&t&&1<t.colSpan?0:-1},execCommand:function(){var e=this.selection.getRange(),t=e.createBookmark(!0),n=At(this).cell
Ut(n).splitToCols(n),e.moveToBookmark(t).select()}},UE.commands.adaptbytext=UE.commands.adaptbywindow={queryCommandState:function(){return At(this).table?0:-1},execCommand:function(e){var t,n,i,o=At(this).table
if(o)if("adaptbywindow"==e)n=this,i=(t=o).getElementsByTagName("td"),J.each(i,function(e){e.removeAttribute("width")}),t.setAttribute("width",function(e,t,n){var i=e.body
return i.offsetWidth-(t?2*parseInt(te.getComputedStyle(i,"margin-left"),10):0)-2*n.tableBorder-(e.options.offsetWidth||0)}(n,!0,Mt(n,t))),setTimeout(function(){J.each(i,function(e){1==e.colSpan&&e.setAttribute("width",e.offsetWidth+"")})},0)
else{var r=te.getElementsByTagName(o,"td th")
J.each(r,function(e){e.removeAttribute("width")}),o.removeAttribute("width")}}},UE.commands.averagedistributecol={queryCommandState:function(){var e=Pt(this)
return e&&(e.isFullRow()||e.isFullCol())?0:-1},execCommand:function(){var l=this,d=Pt(l)
d&&d.selectedTds.length&&function(t){J.each(te.getElementsByTagName(d.table,"th"),function(e){e.setAttribute("width","")})
var e=d.isFullRow()?te.getElementsByTagName(d.table,"td"):d.selectedTds
J.each(e,function(e){1==e.colSpan&&e.setAttribute("width",t)})}(function(){var e=d.table,t=0,n=0,i=Mt(l,e)
if(d.isFullRow())t=e.offsetWidth,n=d.colsNum
else for(var o,r=d.cellsRange.beginColIndex,a=d.cellsRange.endColIndex,s=r;s<=a;)t+=(o=d.selectedTds[s]).offsetWidth,s+=o.colSpan,n+=1
return Math.ceil(t/n)-2*i.tdBorder-2*i.tdPadding}())}},UE.commands.averagedistributerow={queryCommandState:function(){var e=Pt(this)
return e&&(!e.selectedTds||!/th/gi.test(e.selectedTds[0].tagName))&&(e.isFullRow()||e.isFullCol())?0:-1},execCommand:function(){var t,e,f=this,p=Pt(f)
p&&p.selectedTds.length&&(t=function(){var e,t=0,n=p.table,i=Mt(f,n),o=parseInt(te.getComputedStyle(n.getElementsByTagName("td")[0],"padding-top"))
if(p.isFullCol()){var r,a,s=te.getElementsByTagName(n,"caption"),l=te.getElementsByTagName(n,"th")
0<s.length&&(r=s[0].offsetHeight),0<l.length&&(a=l[0].offsetHeight),t=n.offsetHeight-(r||0)-(a||0),e=0==l.length?p.rowsNum:p.rowsNum-1}else{for(var d=p.cellsRange.beginRowIndex,c=p.cellsRange.endRowIndex,u=0,m=te.getElementsByTagName(n,"tr"),h=d;h<=c;h++)t+=m[h].offsetHeight,u+=1
e=u}return Z.ie&&Z.version<9?Math.ceil(t/e):Math.ceil(t/e)-2*i.tdBorder-2*o}(),e=p.isFullCol()?te.getElementsByTagName(p.table,"td"):p.selectedTds,J.each(e,function(e){1==e.rowSpan&&e.setAttribute("height",t)}))}},UE.commands.cellalignment={queryCommandState:function(){return At(this).table?0:-1},execCommand:function(e,t){var n=Pt(this)
if(n)J.each(n.selectedTds,function(e){te.setAttributes(e,t)})
else{var i=this.selection.getStart(),o=i&&te.findParentByTagName(i,["td","th","caption"],!0);/caption/gi.test(o.tagName)?(o.style.textAlign=t.align,o.style.verticalAlign=t.vAlign):te.setAttributes(o,t),this.selection.getRange().setCursor(!0)}},queryCommandValue:function(){var e=At(this).cell
if(e=e||Ht(this)[0]){var t=UE.UETable.getUETable(e).selectedTds
return t.length||(t=e),UE.UETable.getTableCellAlignState(t)}return null}},UE.commands.tablealignment={queryCommandState:function(){return!(Z.ie&&Z.version<8)&&At(this).table?0:-1},execCommand:function(e,t){var n=this.selection.getStart(),i=n&&te.findParentByTagName(n,["table"],!0)
i&&i.setAttribute("align",t)}},UE.commands.edittable={queryCommandState:function(){return At(this).table?0:-1},execCommand:function(e,t){var n=this.selection.getRange(),i=te.findParentByTagName(n.startContainer,"table")
if(i){var o=te.getElementsByTagName(i,"td").concat(te.getElementsByTagName(i,"th"),te.getElementsByTagName(i,"caption"))
J.each(o,function(e){e.style.borderColor=t})}}},UE.commands.edittd={queryCommandState:function(){return At(this).table?0:-1},execCommand:function(e,t){var n=Pt(this)
if(n)J.each(n.selectedTds,function(e){e.style.backgroundColor=t})
else{var i=this.selection.getStart(),o=i&&te.findParentByTagName(i,["td","th","caption"],!0)
o&&(o.style.backgroundColor=t)}}},UE.commands.sorttable={queryCommandState:function(){var e=At(this)
if(!e.cell)return-1
for(var t,n=e.table.getElementsByTagName("td"),i=0;t=n[i++];)if(1!=t.rowSpan||1!=t.colSpan)return-1
return 0},execCommand:function(e,t){var n=this.selection.getRange(),i=n.createBookmark(!0),o=At(this),r=o.cell,a=Ut(o.table),s=a.getCellInfo(r)
a.sortTable(s.cellIndex,t),n.moveToBookmark(i).select()}},UE.commands.enablesort=UE.commands.disablesort={queryCommandState:function(){return At(this).table?0:-1},execCommand:function(e){At(this).table.setAttribute("data-sort","enablesort"==e?"sortEnabled":"sortDisabled")}},UE.commands.settablebackground={queryCommandState:function(){return 1<Ht(this).length?0:-1},execCommand:function(e,t){var n
n=Ht(this),Ut(n[0]).setBackground(n,t)}},UE.commands.cleartablebackground={queryCommandState:function(){var e=Ht(this)
if(!e.length)return-1
for(var t,n=0;t=e[n++];)if(""!==t.style.backgroundColor)return 0
return-1},execCommand:function(){var e=Ht(this)
Ut(e[0]).removeBackground(e)}},UE.commands.interlacetable=UE.commands.uninterlacetable={queryCommandState:function(e){var t=At(this).table
if(!t)return-1
var n=t.getAttribute("interlaced")
return"interlacetable"==e?"enabled"===n?-1:0:n&&"disabled"!==n?0:-1},execCommand:function(e,t){var n=At(this).table
"interlacetable"==e?(n.setAttribute("interlaced","enabled"),this.fireEvent("interlacetable",n,t)):(n.setAttribute("interlaced","disabled"),this.fireEvent("uninterlacetable",n))}},UE.plugins.table=function(){function T(e,t){return S.getDefaultValue(e,t)}var c=this,r=null,u=5,m=!1,i=5,a=10,h=0,f=null,p=360,S=UE.UETable,B=function(e){return S.getUETable(e)},I=function(e){return S.getUETableBySelected(e)},s=function(e){return S.removeSelectedClass(e)}
c.ready(function(){var n=this,i=n.selection.getText
n.selection.getText=function(){var e=I(n)
if(e){var t=""
return J.each(e.selectedTds,function(e){t+=e[Z.ie?"innerText":"textContent"]}),t}return i.call(n.selection)}})
var g=null,l=null,v="",b=!1,d=null,y=!1,C=null,N=null,x=!1
c.setOpt({maxColNum:20,maxRowNum:100,defaultCols:5,defaultRows:5,tdvalign:"top",cursorpath:c.options.UEDITOR_HOME_URL+"themes/default/images/cursor_",tableDragable:!1,classList:["ue-table-interlace-color-single","ue-table-interlace-color-double"]}),c.getUETable=B
var _={deletetable:1,inserttable:1,cellvalign:1,insertcaption:1,deletecaption:1,inserttitle:1,deletetitle:1,mergeright:1,mergedown:1,mergecells:1,insertrow:1,insertrownext:1,deleterow:1,insertcol:1,insertcolnext:1,deletecol:1,splittocells:1,splittorows:1,splittocols:1,adaptbytext:1,adaptbywindow:1,adaptbycustomer:1,insertparagraph:1,insertparagraphbeforetable:1,averagedistributecol:1,averagedistributerow:1}
function R(e){t(e,"width",!0),t(e,"height",!0)}function t(e,t,n){e.style[t]&&(n&&e.setAttribute(t,parseInt(e.style[t],10)),e.style[t]="")}function L(e){return"TD"==e.tagName||"TH"==e.tagName?e:(t=te.findParentByTagName(e,"td",!0)||te.findParentByTagName(e,"th",!0))?t:null
var t}function D(e){var t=new RegExp(te.fillChar,"g")
if(!(0<e[Z.ie?"innerText":"textContent"].replace(/^\s*$/,"").replace(t,"").length)){for(var n in ee.$isNotEmpty)if(e.getElementsByTagName(n).length)return
return 1}}function w(e){return e.pageX||e.pageY?{x:e.pageX,y:e.pageY}:{x:e.clientX+c.document.body.scrollLeft-c.document.body.clientLeft,y:e.clientY+c.document.body.scrollTop-c.document.body.clientTop}}function n(e){if(!j())try{var t,n=L(e.target||e.srcElement)
if(m&&(c.body.style.webkitUserSelect="none",(Math.abs(f.x-e.clientX)>a||Math.abs(f.y-e.clientY)>a)&&(U(),m=!1,h=0,H(e))),v&&N)return h=0,c.body.style.webkitUserSelect="none",c.selection.getNative()[Z.ie9below?"empty":"removeAllRanges"](),t=w(e),M(c,!0,v,0,n),void("h"==v?C.style.left=function(e,t){var n=B(e)
if(n){var i=n.getSameEndPosCells(e,"x")[0],o=n.getSameStartPosXCells(e)[0],r=w(t).x,a=(i?te.getXY(i).x:te.getXY(n.table).x)+20,s=o?te.getXY(o).x+o.offsetWidth-20:c.body.offsetWidth+5||parseInt(te.getComputedStyle(c.body,"width"),10)
return s-=u,r<(a+=u)?a:s<r?s:r}}(N,e)+"px":"v"==v&&(C.style.top=function(e,t){try{var n=te.getXY(e).y,i=w(t).y
return i<n?n:i}catch(e){}}(N,e)+"px"))
if(n){if(!0===c.fireEvent("excludetable",n))return
var i=k(n,t=w(e)),o=te.findParentByTagName(n,"table",!0)
if(P(o,n,e,!0)){if(!0===c.fireEvent("excludetable",o))return
c.body.style.cursor="url("+c.options.cursorpath+"h.png),pointer"}else if(P(o,n,e)){if(!0===c.fireEvent("excludetable",o))return
c.body.style.cursor="url("+c.options.cursorpath+"v.png),pointer"}else{c.body.style.cursor="text";/\d/.test(i)&&(i=i.replace(/\d/,""),n=B(n).getPreviewCell(n,"v"==i)),M(c,!!n&&!!i,n?i:"",0,n)}}else A(!1,o,c)}catch(e){}}function A(e,t,n){if(e)!function(o,r){var a,e=te.getXY(o),t=o.ownerDocument
if(d&&d.parentNode)return;(d=t.createElement("div")).contentEditable=!1,d.innerHTML="",d.style.cssText="width:15px;height:15px;background-image:url("+r.options.UEDITOR_HOME_URL+"dialogs/table/dragicon.png);position: absolute;cursor:move;top:"+(e.y-15)+"px;left:"+e.x+"px;",te.unSelectable(d),d.onmouseover=function(e){y=!0},d.onmouseout=function(e){y=!1},te.on(d,"click",function(e,t){var n
n=this,clearTimeout(a),a=setTimeout(function(){r.fireEvent("tableClicked",o,n)},300)}),te.on(d,"dblclick",function(e,t){!function(){clearTimeout(a)
var e=B(o),t=o.rows[0].cells[0],n=e.getLastCell(),i=e.getCellsRange(t,n)
r.selection.getRange().setStart(t,0).setCursor(!1,!0),e.setSelected(i)}()}),te.on(d,"dragstart",function(e,t){te.preventDefault(t)}),t.body.appendChild(d)}(t,n)
else{if(y)return
setTimeout(function(){!y&&d&&d.parentNode&&d.parentNode.removeChild(d)},2e3)}}function P(e,t,n,i){var o=w(n),r=k(t,o)
if(i){var a=e.getElementsByTagName("caption")[0],s=a?a.offsetHeight:0
return"v1"==r&&o.y-te.getXY(e).y-s<8}return"h1"==r&&o.x-te.getXY(e).x<8}function M(e,t,n,i,o){try{e.body.style.cursor="h"==n?"col-resize":"v"==n?"row-resize":"text",Z.ie&&(!n||x||I(e)?X(e):(z(e,e.document),K(n,o))),b=t}catch(e){}}function k(e,t){var n=te.getXY(e)
return n?n.x+e.offsetWidth-t.x<i?"h":t.x-n.x<i?"h1":n.y+e.offsetHeight-t.y<i?"v":t.y-n.y<i?"v1":"":""}function o(e,t){if(!j())if(f={x:t.clientX,y:t.clientY},2==t.button){var n=I(c),i=!1
if(n){var o=G(c,t)
J.each(n.selectedTds,function(e){e===o&&(i=!0)}),i?(o=n.selectedTds[0],setTimeout(function(){c.selection.getRange().setStart(o,0).setCursor(!1,!0)},0)):(s(te.getElementsByTagName(c.body,"th td")),n.clearSelected())}}else!function(e){if(s(te.getElementsByTagName(c.body,"td th")),J.each(c.document.getElementsByTagName("table"),function(e){e.ueTable=null}),!(g=G(c,e)))return
var t=te.findParentByTagName(g,"table",!0),n=B(t)
n&&n.clearSelected(),b?function(e){Z.ie&&(e=function(e){var t=["pageX","pageY","clientX","clientY","srcElement","target"],n={}
if(e)for(var i,o,r=0;i=t[r];r++)(o=e[i])&&(n[i]=o)
return n}(e))
U(),m=!0,r=setTimeout(function(){H(e)},p)}(e):(c.document.body.style.webkitUserSelect="",x=!0,c.addListener("mouseover",q))}(t)}function E(e){h=0
var t,n=L((e=e||c.window.event).target||e.srcElement)
if(n&&(t=k(n,w(e)))){if(X(c),"h1"==t)if(t="h",P(te.findParentByTagName(n,"table"),n,e))c.execCommand("adaptbywindow")
else if(n=B(n).getPreviewCell(n))c.selection.getRange().selectNodeContents(n).setCursor(!0,!0)
if("h"==t){var i=B(n),o=V(n,i.table,!0)
o=function(e,t){for(var n=[],i=null,o=0,r=e.length;o<r;o++)(i=e[o][t])&&n.push(i)
return n}(o,"left"),i.width=i.offsetWidth
var r=[],a=[]
J.each(o,function(e){r.push(e.offsetWidth)}),J.each(o,function(e){e.removeAttribute("width")}),window.setTimeout(function(){var i=!0
J.each(o,function(e,t){var n=e.offsetWidth
if(n>r[t])return i=!1
a.push(n)})
var n=i?a:r
J.each(o,function(e,t){e.width=n[t]-W()})},0)}}}function U(){r&&clearTimeout(r),r=null}function H(e){if(m=!1,g){var t=Math.abs(f.x-e.clientX)>=Math.abs(f.y-e.clientY)?"h":"v";/\d/.test(t)&&(t=t.replace(/\d/,""),g=B(g).getPreviewCell(g,"v"==t)),X(c),z(c,c.document),c.fireEvent("saveScene"),K(t,g),x=!0,v=t,N=g}}function O(e,t){if(!j()){if(U(),m=!1,b&&(h=++h%3,f={x:t.clientX,y:t.clientY},setTimeout(function(){0<h&&h--},p),2===h))return h=0,void E(t)
if(2!=t.button){var n=this,i=n.selection.getRange(),o=te.findParentByTagName(i.startContainer,"table",!0),r=te.findParentByTagName(i.endContainer,"table",!0)
if(!o&&!r||o===r&&(o=te.findParentByTagName(i.startContainer,["td","th","caption"],!0))===(r=te.findParentByTagName(i.endContainer,["td","th","caption"],!0))||n.selection.clearRange(),x=!1,n.document.body.style.webkitUserSelect="",v&&N){n.selection.getNative()[Z.ie9below?"empty":"removeAllRanges"](),h=0,C=n.document.getElementById("ue_tableDragLine")
var a=te.getXY(N),s=te.getXY(C)
switch(v){case"h":!function(e,t){var n=B(e)
if(n){var i=n.table,o=V(e,i)
if(i.style.width="",i.removeAttribute("width"),t=function(n,e,t){if((n-=W())<0)return 0
var i=(n-=F(e))<0?"left":"right"
return n=Math.abs(n),J.each(t,function(e){var t=e[i]
t&&(n=Math.min(n,F(t)-u))}),n=n<0?0:n,"left"==i?-n:n}(t,e,o),e.nextSibling){J.each(o,function(e){e.left.width=+e.left.width+t,e.right&&(e.right.width=e.right.width-t)})}else J.each(o,function(e){e.left.width-=-t})}}(N,s.x-a.x)
break
case"v":!function(e,t){if(Math.abs(t)<10)return
var n=B(e)
if(n)for(var i,o=n.getSameEndPosCells(e,"y"),r=o[0]?o[0].offsetHeight:0,a=0;i=o[a++];)$(i,t,r)}(N,s.y-a.y-N.offsetHeight)}return v="",N=null,X(n),void n.fireEvent("saveScene")}if(g){var l=B(g),d=l?l.selectedTds[0]:null
if(d)i=new Q.Range(n.document),te.isEmptyBlock(d)?i.setStart(d,0).setCursor(!1,!0):i.selectNodeContents(d).shrinkBoundary().setCursor(!1,!0)
else if(!(i=n.selection.getRange().shrinkBoundary()).collapsed){o=te.findParentByTagName(i.startContainer,["td","th"],!0),r=te.findParentByTagName(i.endContainer,["td","th"],!0);(o&&!r||!o&&r||o&&r&&o!==r)&&i.setCursor(!1,!0)}g=null,n.removeListener("mouseover",q)}else{var c=te.findParentByTagName(t.target||t.srcElement,"td",!0)
if((c=c||te.findParentByTagName(t.target||t.srcElement,"th",!0))&&("TD"==c.tagName||"TH"==c.tagName)){if(!0===n.fireEvent("excludetable",c))return;(i=new Q.Range(n.document)).setStart(c,0).setCursor(!1,!0)}}n._selectionChange(250,t,t.type)}}}function q(e,t){if(!j()){var n=t.target||t.srcElement
if(l=te.findParentByTagName(n,"td",!0)||te.findParentByTagName(n,"th",!0),g&&l&&("TD"==g.tagName&&"TD"==l.tagName||"TH"==g.tagName&&"TH"==l.tagName)&&te.findParentByTagName(g,"table")==te.findParentByTagName(l,"table")){var i=B(l)
if(g!=l){this.document.body.style.webkitUserSelect="none",this.selection.getNative()[Z.ie9below?"empty":"removeAllRanges"]()
var o=i.getCellsRange(g,l)
i.setSelected(o)}else this.document.body.style.webkitUserSelect="",i.clearSelected()}t.preventDefault?t.preventDefault():t.returnValue=!1}}function $(e,t,n){var i=parseInt(te.getComputedStyle(e,"line-height"),10),o=n+t
t=o<i?i:o,e.style.height&&(e.style.height=""),1==e.rowSpan?e.setAttribute("height",t):e.removeAttribute&&e.removeAttribute("height")}function j(){return"false"===c.body.contentEditable}function V(e,t,i){if(!(t=t||te.findParentByTagName(e,"table")))return null
te.getNodeIndex(e)
for(var n=e,o=t.rows,r=0;n;)1===n.nodeType&&(r+=n.colSpan||1),n=n.previousSibling
n=null
var a=[]
return J.each(o,function(e){var t=e.cells,n=0
J.each(t,function(e){return(n+=e.colSpan||1)===r?(a.push({left:e,right:e.nextSibling||null}),!1):r<n?(i&&a.push({left:e}),!1):void 0})}),a}function F(e){var t=0
t=e.offsetWidth-W()
e.nextSibling||(t-=function(e){var t=te.findParentByTagName(e,"table",!1)
if(void 0===t.offsetVal){var n=e.previousSibling
t.offsetVal=n&&e.offsetWidth-n.offsetWidth===S.borderWidth?S.borderWidth:0}return t.offsetVal}(e)),t=t<0?0:t
try{e.width=t}catch(e){}return t}function W(){if(void 0===S.tabcellSpace){var e=c.document.createElement("table"),t=c.document.createElement("tbody"),n=c.document.createElement("tr"),i=c.document.createElement("td"),o=null
i.style.cssText="border: 0;",i.width=1,n.appendChild(i),n.appendChild(o=i.cloneNode(!1)),t.appendChild(n),e.appendChild(t),e.style.cssText="visibility: hidden;",c.body.appendChild(e),S.paddingSpace=i.offsetWidth-1
var r=e.offsetWidth
i.style.cssText="",o.style.cssText="",S.borderWidth=(e.offsetWidth-r)/3,S.tabcellSpace=S.paddingSpace+S.borderWidth,c.body.removeChild(e)}return W=function(){return S.tabcellSpace},S.tabcellSpace}function z(e){x||(C=e.document.createElement("div"),te.setAttributes(C,{id:"ue_tableDragLine",unselectable:"on",contenteditable:!1,onresizestart:"return false",ondragstart:"return false",onselectstart:"return false",style:"background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)"}),e.body.appendChild(C))}function X(e){if(!x)for(var t;t=e.document.getElementById("ue_tableDragLine");)te.remove(t)}function K(e,t){if(t){var n,i=te.findParentByTagName(t,"table"),o=i.getElementsByTagName("caption"),r=i.offsetWidth,a=i.offsetHeight-(0<o.length?o[0].offsetHeight:0),s=te.getXY(i),l=te.getXY(t)
switch(e){case"h":n="height:"+a+"px;top:"+(s.y+(0<o.length?o[0].offsetHeight:0))+"px;left:"+(l.x+t.offsetWidth),C.style.cssText=n+"px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)"
break
case"v":n="width:"+r+"px;left:"+s.x+"px;top:"+(l.y+t.offsetHeight),C.style.cssText=n+"px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)"}}}function Y(e,t){for(var n,i,o=te.getElementsByTagName(e.body,"table"),r=0;i=o[r++];){var a=te.getElementsByTagName(i,"td")
a[0]&&(t?(n=a[0].style.borderColor.replace(/\s/g,""),/(#ffffff)|(rgb\(255,f55,255\))/gi.test(n)&&te.addClass(i,"noBorderTable")):te.removeClasses(i,"noBorderTable"))}}function G(e,t){var n,i=te.findParentByTagName(t.target||t.srcElement,["td","th"],!0)
if(!i)return null
if(n=k(i,w(t)),!i)return null
if("h1"===n&&i.previousSibling){var o=te.getXY(i),r=i.offsetWidth
Math.abs(o.x+r-t.clientX)>r/3&&(i=i.previousSibling)}else if("v1"===n&&i.parentNode.previousSibling){o=te.getXY(i)
var a=i.offsetHeight
Math.abs(o.y+a-t.clientY)>a/3&&(i=i.parentNode.previousSibling.firstChild)}return i&&!0!==e.fireEvent("excludetable",i)?i:null}c.ready(function(){var w,k,E,e
J.cssRule("table",".selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:2px solid #BBB;background:#F7F7F7;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}",c.document),c.addListener("keydown",function(e,t){var n=this,i=t.keyCode||t.which
if(8==i){var o;(o=I(n))&&o.selectedTds.length&&(o.isFullCol()?n.execCommand("deletecol"):o.isFullRow()?n.execCommand("deleterow"):n.fireEvent("delcells"),te.preventDefault(t))
var r=te.findParentByTagName(n.selection.getStart(),"caption",!0),a=n.selection.getRange()
if(a.collapsed&&r&&D(r)){n.fireEvent("saveScene")
var s=r.parentNode
te.remove(r),s&&a.setStart(s.rows[0].cells[0],0).setCursor(!1,!0),n.fireEvent("saveScene")}}if(46==i&&(o=I(n))){n.fireEvent("saveScene")
for(var l=0;p=o.selectedTds[l++];)te.fillNode(n.document,p)
n.fireEvent("saveScene"),te.preventDefault(t)}if(13==i){var d=n.selection.getRange()
if(r=te.findParentByTagName(d.startContainer,"caption",!0)){var s=te.findParentByTagName(r,"table")
return d.collapsed?r&&d.setStart(s.rows[0].cells[0],0).setCursor(!1,!0):(d.deleteContents(),n.fireEvent("saveScene")),void te.preventDefault(t)}if(d.collapsed)if(s=te.findParentByTagName(d.startContainer,"table")){var c=s.rows[0].cells[0],u=te.findParentByTagName(n.selection.getStart(),["td","th"],!0),m=s.previousSibling
if(c===u&&(!m||1==m.nodeType&&"TABLE"==m.tagName)&&te.isStartInblock(d)){var h=te.findParent(n.selection.getStart(),function(e){return te.isBlockElm(e)},!0)
h&&(/t(h|d)/i.test(h.tagName)||h===u.firstChild)&&(n.execCommand("insertparagraphbeforetable"),te.preventDefault(t))}}}if((t.ctrlKey||t.metaKey)&&"67"==t.keyCode&&(w=null,o=I(n))){var f=o.selectedTds
k=o.isFullCol(),E=o.isFullRow(),w=[[o.cloneCell(f[0],null,!0)]]
var p
for(l=1;p=f[l];l++)p.parentNode!==f[l-1].parentNode?w.push([o.cloneCell(p,null,!0)]):w[w.length-1].push(o.cloneCell(p,null,!0))}}),c.addListener("tablehasdeleted",function(){M(this,!1,""),d&&te.remove(d)}),c.addListener("beforepaste",function(e,t){var n=this,i=n.selection.getRange()
if(te.findParentByTagName(i.startContainer,"caption",!0))return(o=n.document.createElement("div")).innerHTML=t.html,void(t.html=o[Z.ie9below?"innerText":"textContent"])
var o,r,a=I(n)
if(w){n.fireEvent("saveScene")
i=n.selection.getRange()
var s,l,d=te.findParentByTagName(i.startContainer,["td","th"],!0)
if(d){var c=B(d)
if(E){var u=c.getCellInfo(d).rowIndex
"TH"==d.tagName&&u++
for(var m=0;v=w[m++];){for(var h=c.insertRow(u++,"td"),f=0;C=v[f];f++){var p=h.cells[f];(p=p||h.insertCell(f)).innerHTML=C.innerHTML,C.getAttribute("width")&&p.setAttribute("width",C.getAttribute("width")),C.getAttribute("vAlign")&&p.setAttribute("vAlign",C.getAttribute("vAlign")),C.getAttribute("align")&&p.setAttribute("align",C.getAttribute("align")),C.style.cssText&&(p.style.cssText=C.style.cssText)}for(f=0;(C=h.cells[f])&&v[f];f++)C.innerHTML=v[f].innerHTML,v[f].getAttribute("width")&&C.setAttribute("width",v[f].getAttribute("width")),v[f].getAttribute("vAlign")&&C.setAttribute("vAlign",v[f].getAttribute("vAlign")),v[f].getAttribute("align")&&C.setAttribute("align",v[f].getAttribute("align")),v[f].style.cssText&&(C.style.cssText=v[f].style.cssText)}}else{if(k){y=c.getCellInfo(d)
for(var g=0,v=(f=0,w[0]);C=v[f++];)g+=C.colSpan||1
for(n.__hasEnterExecCommand=!0,m=0;m<g;m++)n.execCommand("insertcol")
n.__hasEnterExecCommand=!1,"TH"==(d=c.table.rows[0].cells[y.cellIndex]).tagName&&(d=c.table.rows[1].cells[y.cellIndex])}for(m=0;v=w[m++];){s=d
for(f=0;C=v[f++];)if(d)d.innerHTML=C.innerHTML,C.getAttribute("width")&&d.setAttribute("width",C.getAttribute("width")),C.getAttribute("vAlign")&&d.setAttribute("vAlign",C.getAttribute("vAlign")),C.getAttribute("align")&&d.setAttribute("align",C.getAttribute("align")),C.style.cssText&&(d.style.cssText=C.style.cssText),d=(l=d).nextSibling
else{var b=C.cloneNode(!0)
te.removeAttributes(b,["class","rowSpan","colSpan"]),l.parentNode.appendChild(b)}if(d=c.getNextCell(s,!0,!0),!w[m])break
if(!d){var y=c.getCellInfo(s)
c.table.insertRow(c.table.rows.length),c.update(),d=c.getVSideCell(s,!0)}}}c.update()}else{a=n.document.createElement("table")
for(m=0;v=w[m++];){var C
for(h=a.insertRow(a.rows.length),f=0;C=v[f++];)b=S.cloneCell(C,null,!0),te.removeAttributes(b,["class"]),h.appendChild(b)
2==f&&1<b.rowSpan&&(b.rowSpan=1)}var N=T(n),x=n.body.offsetWidth-2*parseInt(te.getComputedStyle(n.body,"margin-left"),10)-2*N.tableBorder-(n.options.offsetWidth||0)
n.execCommand("insertHTML","<table  "+(k&&E?'width="'+x+'"':"")+">"+a.innerHTML.replace(/>\s*</g,"><").replace(/\bth\b/gi,"td")+"</table>")}return n.fireEvent("contentchange"),n.fireEvent("saveScene"),!(t.html="")}(o=n.document.createElement("div")).innerHTML=t.html,r=o.getElementsByTagName("table"),te.findParentByTagName(n.selection.getStart(),"table")?(J.each(r,function(e){te.remove(e)}),te.findParentByTagName(n.selection.getStart(),"caption",!0)&&(o.innerHTML=o[Z.ie?"innerText":"textContent"])):J.each(r,function(e){R(e),te.removeAttributes(e,["style","border"]),J.each(te.getElementsByTagName(e,"td"),function(e){D(e)&&te.fillNode(n.document,e),R(e)})}),t.html=o.innerHTML}),c.addListener("afterpaste",function(){J.each(te.getElementsByTagName(c.body,"table"),function(e){if(e.offsetWidth>c.body.offsetWidth){var t=T(c,e)
e.style.width=c.body.offsetWidth-2*parseInt(te.getComputedStyle(c.body,"margin-left"),10)-2*t.tableBorder-(c.options.offsetWidth||0)+"px"}})}),c.addListener("blur",function(){w=null}),c.addListener("keydown",function(){clearTimeout(e),e=setTimeout(function(){var e=c.selection.getRange(),t=te.findParentByTagName(e.startContainer,["th","td"],!0)
if(t){var n=t.parentNode.parentNode.parentNode
n.offsetWidth>n.getAttribute("width")&&(t.style.wordBreak="break-all")}},100)}),c.addListener("selectionchange",function(){M(c,!1,"")}),c.addListener("contentchange",function(){var d=this
if(X(d),!I(d)){var t=d.selection.getRange().startContainer
t=te.findParentByTagName(t,["td","th"],!0),J.each(te.getElementsByTagName(d.document,"table"),function(e){!0!==d.fireEvent("excludetable",e)&&(e.ueTable=new S(e),J.each(te.getElementsByTagName(d.document,"td"),function(e){te.isEmptyBlock(e)&&e!==t&&(te.fillNode(d.document,e),Z.ie&&6==Z.version&&(e.innerHTML="&nbsp;"))}),J.each(te.getElementsByTagName(d.document,"th"),function(e){te.isEmptyBlock(e)&&e!==t&&(te.fillNode(d.document,e),Z.ie&&6==Z.version&&(e.innerHTML="&nbsp;"))}),e.onmouseover=function(){d.fireEvent("tablemouseover",e)},e.onmousemove=function(){d.fireEvent("tablemousemove",e),d.options.tableDragable&&A(!0,this,d)},e.onmouseout=function(){d.fireEvent("tablemouseout",e),M(d,!1,""),X(d)},e.onclick=function(e){var t=L((e=d.window.event||e).target||e.srcElement)
if(t){var n,i=B(t),o=i.table,r=i.getCellInfo(t),a=d.selection.getRange()
if(P(o,t,e,!0)){var s=i.getCell(i.indexTable[i.rowsNum-1][r.colIndex].rowIndex,i.indexTable[i.rowsNum-1][r.colIndex].cellIndex)
e.shiftKey&&i.selectedTds.length?i.selectedTds[0]!==s?(n=i.getCellsRange(i.selectedTds[0],s),i.setSelected(n)):a&&a.selectNodeContents(s).select():t!==s?(n=i.getCellsRange(t,s),i.setSelected(n)):a&&a.selectNodeContents(s).select()}else if(P(o,t,e)){var l=i.getCell(i.indexTable[r.rowIndex][i.colsNum-1].rowIndex,i.indexTable[r.rowIndex][i.colsNum-1].cellIndex)
e.shiftKey&&i.selectedTds.length?i.selectedTds[0]!==l?(n=i.getCellsRange(i.selectedTds[0],l),i.setSelected(n)):a&&a.selectNodeContents(l).select():t!==l?(n=i.getCellsRange(t,l),i.setSelected(n)):a&&a.selectNodeContents(l).select()}}})}),Y(d,!0)}}),te.on(c.document,"mousemove",n),te.on(c.document,"mouseout",function(e){"TABLE"==(e.target||e.srcElement).tagName&&M(c,!1,"")}),c.addListener("interlacetable",function(e,t,n){if(t)for(var i,o,r,a=t.rows,s=a.length,l=0;l<s;l++)a[l].className=(i=n||this.options.classList,r=!0,i[o=l]?i[o]:r?i[o%i.length]:"")}),c.addListener("uninterlacetable",function(e,t){if(t)for(var n=t.rows,i=this.options.classList,o=n.length,r=0;r<o;r++)te.removeClasses(n[r],i)}),c.addListener("mousedown",o),c.addListener("mouseup",O),te.on(c.body,"dragstart",function(e){O.call(c,"dragstart",e)})
var a=0
c.addListener("mousedown",function(){a=0}),c.addListener("tabkeydown",function(){var e=this.selection.getRange(),t=e.getCommonAncestor(!0,!0),n=te.findParentByTagName(t,"table")
if(n){if(te.findParentByTagName(t,"caption",!0)){(i=te.getElementsByTagName(n,"th td"))&&i.length&&e.setStart(i[0],0).setCursor(!1,!0)}else{var i=te.findParentByTagName(t,["td","th"],!0),o=B(i)
a=1<i.rowSpan?a:o.getCellInfo(i).rowIndex
var r=o.getTabNextCell(i,a)
r?D(r)?e.setStart(r,0).setCursor(!1,!0):e.selectNodeContents(r).select():(c.fireEvent("saveScene"),c.__hasEnterExecCommand=!0,this.execCommand("insertrownext"),c.__hasEnterExecCommand=!1,(e=this.selection.getRange()).setStart(n.rows[n.rows.length-1].cells[0],0).setCursor(),c.fireEvent("saveScene"))}return!0}}),Z.ie&&c.addListener("selectionchange",function(){M(this,!1,"")}),c.addListener("keydown",function(e,t){var n=t.keyCode||t.which
if(8!=n&&46!=n){var i=!(t.ctrlKey||t.metaKey||t.shiftKey||t.altKey)
i&&s(te.getElementsByTagName(this.body,"td"))
var o=I(this)
o&&i&&o.clearSelected()}}),c.addListener("beforegetcontent",function(){Y(this,!1),Z.ie&&J.each(this.document.getElementsByTagName("caption"),function(e){te.isEmptyNode(e)&&(e.innerHTML="&nbsp;")})}),c.addListener("aftergetcontent",function(){Y(this,!0)}),c.addListener("getAllHtml",function(){s(c.document.getElementsByTagName("td"))}),c.addListener("fullscreenchanged",function(e,t){if(!t){var d=this.body.offsetWidth/document.body.offsetWidth,n=te.getElementsByTagName(this.body,"table")
J.each(n,function(e){if(e.offsetWidth<c.body.offsetWidth)return!1
var t,n,i,o,r=te.getElementsByTagName(e,"td"),a=[]
J.each(r,function(e){a.push(e.offsetWidth)})
for(var s,l=0;s=r[l];l++)s.setAttribute("width",Math.floor(a[l]*d))
e.setAttribute("width",Math.floor((n=!0,i=T(t=c),(o=t.body).offsetWidth-(n?2*parseInt(te.getComputedStyle(o,"margin-left"),10):0)-2*i.tableBorder-(t.options.offsetWidth||0))))})}})
var f=c.execCommand
c.execCommand=function(e,t){var n=this
e=e.toLowerCase()
var i,o,r=I(n),a=new Q.Range(n.document),s=n.commands[e]||UE.commands[e]
if(s){if(!r||_[e]||s.notNeedUndo||n.__hasEnterExecCommand)o=f.apply(n,arguments)
else{n.__hasEnterExecCommand=!0,n.fireEvent("beforeexeccommand",e),i=r.selectedTds
for(var l,d,c,u=-2,m=-2,h=0;c=i[h];h++)D(c)?a.setStart(c,0).setCursor(!1,!0):a.selectNode(c).select(!0),d=n.queryCommandState(e),l=n.queryCommandValue(e),-1!=d&&(u===d&&m===l||(n._ignoreContentChange=!0,o=f.apply(n,arguments),n._ignoreContentChange=!1),u=n.queryCommandState(e),m=n.queryCommandValue(e),te.isEmptyBlock(c)&&te.fillNode(n.document,c))
a.setStart(i[0],0).shrinkBoundary(!0).setCursor(!1,!0),n.fireEvent("contentchange"),n.fireEvent("afterexeccommand",e),n.__hasEnterExecCommand=!1,n._selectionChange(null,null,e)}return o}}})},UE.plugins.contextmenu=function(){var l,d=this,c=d.getLang("contextMenu"),u=d.options.contextMenu
if(u.length){var m=UE.ui.uiUtils,s={click:[{id:"122333",key:"50"}],selectall:[{id:"122333",key:"51"}],cleardoc:[{id:"122333",key:"53"}],justify:{pv:[{id:"122333",key:"55"}],left:[{id:"122333",key:"57"}],right:[{id:"122333",key:"59"}],center:[{id:"122333",key:"61"}],justify:[{id:"122333",key:"63"}]},inserttable:[{id:"122333",key:"65"}],insertparagraph:{true:[{id:"122333",key:"67"}],undefined:[{id:"122333",key:"69"}]},copy:[{id:"122333",key:"71"}],paste:[{id:"122333",key:"73"}]},h=function(e){var t=0<arguments.length&&void 0!==e?e:{},n=s[t.cmd]
if(n){var i=[].concat(s.click),o=null,r=t.value+""
if(r&&(o=n[r]),o){i=i.concat(o)
var a=n.pv
a&&(i=i.concat(a))}else i=i.concat(n)
d.fireEvent("reportAddNum",i)}}
d.addListener("contextmenu",function(e,t){var n=m.getViewportOffsetByEvent(t)
d.fireEvent("beforeselectionchange"),l&&l.destroy()
for(var i,o=0,r=[];i=u[o];o++){var a
!function(e){if("-"==e)(a=r[r.length-1])&&"-"!==a&&r.push("-")
else if(e.hasOwnProperty("group")){for(var t,n=0,i=[];t=e.subMenu[n];n++)!function(e){"-"==e?(a=i[i.length-1])&&"-"!==a?i.push("-"):i.splice(i.length-1):(d.commands[e.cmdName]||UE.commands[e.cmdName]||e.query)&&-1<(e.query?e.query():d.queryCommandState(e.cmdName))&&i.push({label:e.label||d.getLang("contextMenu."+e.cmdName+(e.value||""))||"",className:"edui-for-"+e.cmdName+(e.className?" edui-for-"+e.cmdName+"-"+e.className:""),onclick:e.exec?function(){e.cmdName&&d.fireEvent("funcPvUvReport","menu_"+e.cmdName),e.exec.call(d),h({cmd:e.cmdName})}:function(){d.fireEvent("funcPvUvReport","menu_"+e.cmdName+(e.value||"")),d.execCommand(e.cmdName,e.value),h({cmd:e.cmdName,value:e.value+""})}})}(t)
if(i.length){r.push({label:function(){switch(e.icon){case"table":return d.getLang("contextMenu.table")
case"justifyjustify":return d.getLang("contextMenu.paragraph")
case"aligntd":return d.getLang("contextMenu.aligntd")
case"aligntable":return d.getLang("contextMenu.aligntable")
case"tablesort":return c.tablesort
case"borderBack":return c.borderbk
default:return""}}(),className:"edui-for-"+e.icon,subMenu:{items:i,editor:d}})}}else if((d.commands[e.cmdName]||UE.commands[e.cmdName]||e.query)&&-1<(e.query?e.query.call(d):d.queryCommandState(e.cmdName))){if("highlightcode"==e.cmdName){if(1==d.queryCommandState(e.cmdName)&&"deletehighlightcode"!=e.icon)return
if(1!=d.queryCommandState(e.cmdName)&&"deletehighlightcode"==e.icon)return}r.push({label:e.label||d.getLang("contextMenu."+e.cmdName),className:"edui-for-"+(e.icon?e.icon:e.cmdName+(e.value||"")),onclick:e.exec?function(){e.cmdName&&d.fireEvent("funcPvUvReport","menu_"+e.cmdName),e.exec.call(d),h({cmd:e.cmdName})}:function(){d.fireEvent("funcPvUvReport","menu_"+e.cmdName+(e.value||"")),d.execCommand(e.cmdName,e.value),h({cmd:e.cmdName,value:e.value+""})}})}}(i)}if("-"==r[r.length-1]&&r.pop(),(l=new UE.ui.Menu({items:r,className:"edui-contextmenu",editor:d})).render(),l.showAt(n),d.fireEvent("funcPvUvReport","contextmenu"),d.fireEvent("aftershowcontextmenu",l),d.fireEvent("reportAddNum","122333","49","1"),te.preventDefault(t),Z.ie){var s
try{s=d.selection.getNative().createRange()}catch(e){return}if(s.item)new Q.Range(d.document).selectNode(s.item(0)).select(!0,!0)}})}},UE.plugins.shortcutmenu=function(){var r,a=this.options.shortcutMenu||[]
a.length&&(this.addListener("contextmenu mouseup",function(e,t){var n=this,i={type:e,target:t.target||t.srcElement,screenX:t.screenX,screenY:t.screenY,clientX:t.clientX,clientY:t.clientY}
if(setTimeout(function(){!1!==n.selection.getRange().collapsed&&"contextmenu"!=e||(r||((r=new y.editor.ui.ShortCutMenu({editor:n,items:a,theme:n.options.theme,className:"edui-shortcutmenu"})).render(),n.fireEvent("afterrendershortcutmenu",r)),r.show(i,!!UE.plugins.contextmenu))}),"contextmenu"==e&&(te.preventDefault(t),Z.ie9below)){var o
try{o=n.selection.getNative().createRange()}catch(t){return}if(o.item)new Q.Range(n.document).selectNode(o.item(0)).select(!0,!0)}"keydown"==e&&r&&!r.isHidden&&r.hide()}),this.addListener("keydown",function(e){"keydown"==e&&r&&!r.isHidden&&r.hide()}))},UE.plugins.basestyle=function(){function s(e,t){return te.filterNodeList(e.selection.getStartElementPath(),t)}var l={bold:{"font-weight":"bold"},italic:{"font-style":"italic"}},e={bold:["strong","b"],italic:["em","i"],subscript:["sub"],superscript:["sup"]},d=this
for(var t in d.addshortcutkey({Bold:"ctrl+66",Italic:"ctrl+73",Underline:"ctrl+85"}),d.addInputRule(function(e){J.each(e.getNodesByTagName("b i"),function(e){switch(e.tagName){case"b":e.tagName="strong"
break
case"i":e.tagName="em"}})}),e)!function(r,a){d.commands[r]={execCommand:function(e){var t=d.selection.getRange(),n=s(this,a)
if(t.collapsed){if(n){var i=d.document.createTextNode("")
t.insertNode(i).removeInlineStyle(a,{ignoreUnEditable:!0,liStyle:l[r]}),t.setStartBefore(i),te.remove(i)}else{var o=t.document.createElement(a[0])
"superscript"!=e&&"subscript"!=e||(i=d.document.createTextNode(""),t.insertNode(i).removeInlineStyle(["sub","sup"],{ignoreUnEditable:!0}).setStartBefore(i).collapse(!0)),t.insertNode(o).setStart(o,0)}t.collapse(!0)}else"superscript"!=e&&"subscript"!=e||n&&n.tagName.toLowerCase()==e||t.removeInlineStyle(["sub","sup"],{ignoreUnEditable:!0}),n?t.removeInlineStyle(a,{ignoreUnEditable:!0,liStyle:l[r]}):t.applyInlineStyle(a[0],null,null,{ignoreUnEditable:!0,liStyle:l[r]})
t.select()},queryCommandState:function(e,t){var n=1<arguments.length&&void 0!==t?t:{}
return n.allDomInRange&&n.allDomInRange[0]&&2===te.isContentEditable({node:n.allDomInRange[0],checkParent:!1})?-1:s(this,a)?1:0}}}(t,e[t])},UE.plugins.elementpath=function(){var r,a,o=this
o.setOpt("elementPathEnabled",!0),o.options.elementPathEnabled&&(o.commands.elementpath={execCommand:function(e,t){var n=a[t],i=o.selection.getRange()
r=+t,i.selectNode(n).select()},queryCommandValue:function(){var e=[].concat(this.selection.getStartElementPath()).reverse(),t=[]
a=e
for(var n,i=0;n=e[i];i++)if(3!=n.nodeType){var o=n.tagName.toLowerCase()
if("img"==o&&n.getAttribute("anchorname")&&(o="anchor"),t[i]=o,r==i){r=-1
break}}return t}})},UE.plugins.formatmatch=function(){var l,d=this,c=[],u=0,m=null,h=null,f=null
function p(e,t){if(Z.webkit)var n="IMG"==t.target.tagName?t.target:null
d.undoManger&&d.undoManger.save()
var i,o=d.selection.getRange(),r=n||o.getClosedNode()
if(l&&r&&"IMG"==r.tagName)r.style.cssText+=";float:"+(l.style.cssFloat||l.style.styleFloat||"none")+";display:"+(l.style.display||"inline"),l=null
else if(!l){if(o.collapsed){var a=d.document.createTextNode("match")
o.insertNode(a).select()}d.__hasEnterExecCommand=!0
var s=d.options.removeFormatAttributes
d.options.removeFormatAttributes="",d.execCommand("removeformat",{ignoreUnEditable:!0}),d.options.removeFormatAttributes=s,d.__hasEnterExecCommand=!1,o=d.selection.getRange(),i=o,a&&i.selectNode(a),c.length&&i.applyInlineStyle(c[c.length-1].tagName,null,c,{ignoreUnEditable:!0,liStyle:h}),i.applyBlockStyle({attrs:m,liAttrs:h,listAttrs:f,removeOrigin:!0,ignoreUnEditable:!0,distUnEditableParentAttr:!0}),a&&o.setStartBefore(a).collapse(!0),o.select(),a&&te.remove(a)}f=h=m=null,d.undoManger&&d.undoManger.save(),d.removeListener("mouseup",p),u=0}d.addListener("reset",function(){c=[],u=0}),d.commands.formatmatch={execCommand:function(){if(u)return u=0,c=[],f=h=m=null,void d.removeListener("mouseup",p)
var e=d.selection.getRange()
if(!(l=e.getClosedNode())||"IMG"!=l.tagName){e.collapse(!0).shrinkBoundary()
var t=e.startContainer
c=te.findParents(t,!0,function(e){if(te.isBody(e))return!1
var t=te.isBlockElm(e),n=!("li"!==e.nodeName.toLowerCase()),i=!!/^(ul)|(ol)$/i.test(e.nodeName),o=null
if(n?o=h=h||{}:i?o=f=f||{}:t&&(o=m=m||{}),o){var r=te.getStyles(e)
if(r)for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(o[a]||(o[a]=r[a]))}return!t&&!n&&!i&&1==e.nodeType})
for(var n,i=0;n=c[i];i++)if("A"==n.tagName){c.splice(i,1)
break}}d.addListener("mouseup",p),u=1},queryCommandState:function(e,t){var n=1<arguments.length&&void 0!==t?t:{}
return n.allDomInRange&&n.allDomInRange[0]&&2===te.isContentEditable({node:n.allDomInRange[0],checkParent:!1})?-1:u},notNeedUndo:1}},UE.plugins.customstyle=function(){var a=this
a.setOpt({customstyle:[{tag:"h1",name:"tc",style:"font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;"},{tag:"h1",name:"tl",style:"font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:left;margin:0 0 10px 0;"},{tag:"span",name:"im",style:"font-size:16px;font-style:italic;font-weight:bold;line-height:18px;"},{tag:"span",name:"hi",style:"font-size:16px;font-style:italic;font-weight:bold;color:rgb(51, 153, 204);line-height:18px;"}]}),a.commands.customstyle={execCommand:function(e,t){var n,i,o=this,r=t.tag,a=te.findParent(o.selection.getStart(),function(e){return e.getAttribute("label")},!0),s={}
for(var l in t)void 0!==t[l]&&(s[l]=t[l])
if(delete s.tag,a&&a.getAttribute("label")==t.label){if(i=(n=this.selection.getRange()).createBookmark(),n.collapsed)if(ee.$block[a.tagName]){var d=o.document.createElement("p")
te.moveChild(a,d),a.parentNode.insertBefore(d,a),te.remove(a)}else te.remove(a,!0)
else{var c=te.getCommonAncestor(i.start,i.end),u=te.getElementsByTagName(c,r)
new RegExp(r,"i").test(c.tagName)&&u.push(c)
for(var m,h=0;m=u[h++];)if(m.getAttribute("label")==t.label){var f=te.getPosition(m,i.start),p=te.getPosition(m,i.end)
if((f&te.POSITION_FOLLOWING||f&te.POSITION_CONTAINS)&&(p&te.POSITION_PRECEDING||p&te.POSITION_CONTAINS)&&ee.$block[r]){d=o.document.createElement("p")
te.moveChild(m,d),m.parentNode.insertBefore(d,m)}te.remove(m,!0)}(a=te.findParent(c,function(e){return e.getAttribute("label")==t.label},!0))&&te.remove(a,!0)}n.moveToBookmark(i).select()}else if(ee.$block[r]){if(this.execCommand("paragraph",r,s,"customstyle"),!(n=o.selection.getRange()).collapsed){n.collapse(),a=te.findParent(o.selection.getStart(),function(e){return e.getAttribute("label")==t.label},!0)
var g=o.document.createElement("p")
te.insertAfter(a,g),te.fillNode(o.document,g),n.setStart(g,0).setCursor()}}else{if((n=o.selection.getRange()).collapsed)return a=o.document.createElement(r),te.setAttributes(a,s),void n.insertNode(a).setStart(a,0).setCursor()
i=n.createBookmark(),n.applyInlineStyle(r,s).moveToBookmark(i).select()}},queryCommandValue:function(){var e=te.filterNodeList(this.selection.getStartElementPath(),function(e){return e.getAttribute("label")})
return e?e.getAttribute("label"):""}},a.addListener("keyup",function(e,t){var n=t.keyCode||t.which
if(32==n||13==n){var i=a.selection.getRange()
if(i.collapsed){var o=te.findParent(a.selection.getStart(),function(e){return e.getAttribute("label")},!0)
if(o&&ee.$block[o.tagName]&&te.isEmptyNode(o)){var r=a.document.createElement("p")
te.insertAfter(o,r),te.fillNode(a.document,r),te.remove(o),i.setStart(r,0).setCursor()}}}})},UE.commands.insertparagraph={execCommand:function(e,t){for(var n,i=this.selection.getRange(),o=i.startContainer;o&&!te.isBody(o);)o=(n=o).parentNode
if(n){var r=this.document.createElement("p")
t?n.parentNode.insertBefore(r,n):n.parentNode.insertBefore(r,n.nextSibling),te.fillNode(this.document,r),i.setStart(r,0).setCursor(!1,!0)}}},(y=y||{}).editor=y.editor||{},y.editor.ui={},L=y.editor.browser,D=y.editor.dom.domUtils,A="$EDITORUI",P=window[A]={},M="ID"+A,U=0,H=y.editor.ui.uiUtils={uid:function(e){return e?e[M]||(e[M]=++U):++U},hook:function(o,e){var r
return o&&o._callbacks?r=o:(r=function(){var e
o&&(e=o.apply(this,arguments))
for(var t=r._callbacks,n=t.length;n--;){var i=t[n].apply(this,arguments)
void 0===e&&(e=i)}return e})._callbacks=[],r._callbacks.push(e),r},createElementByHtml:function(e){var t=document.createElement("div")
return t.innerHTML=e,(t=t.firstChild).parentNode.removeChild(t),t},getViewportElement:function(){return L.ie&&L.quirks?document.body:document.documentElement},getClientRect:function(e){var t
try{t=e.getBoundingClientRect()}catch(e){t={left:0,top:0,height:0,width:0}}for(var n,i={left:Math.round(t.left),top:Math.round(t.top),height:Math.round(t.bottom-t.top),width:Math.round(t.right-t.left)};(n=e.ownerDocument)!==document&&(e=D.getWindow(n).frameElement);)t=e.getBoundingClientRect(),i.left+=t.left,i.top+=t.top
return i.bottom=i.top+i.height,i.right=i.left+i.width,i},getViewportRect:function(){var e=H.getViewportElement(),t=0|(window.innerWidth||e.clientWidth),n=0|(window.innerHeight||e.clientHeight)
return{left:0,top:0,height:n,width:t,bottom:n,right:t}},setViewportOffset:function(e,t){var n=H.getFixedLayer()
e.parentNode===n?(e.style.left=t.left+"px",e.style.top=t.top+"px"):D.setViewportOffset(e,t)},setViewportSize:function(e,t){if(t){var n=e.getElementsByClassName("js_link_popup")
t.width&&(e.style.width=t.width+"px",n&&(n[0].style.width=t.width+"px")),t.height&&(e.style.height=t.height+"px",n&&(n[0].style.height=t.height+"px"))}},getEventOffset:function(e){var t=e.target||e.srcElement,n=H.getClientRect(t),i=H.getViewportOffsetByEvent(e)
return{left:i.left-n.left,top:i.top-n.top}},getViewportOffsetByEvent:function(e){var t=e.target||e.srcElement,n=D.getWindow(t).frameElement,i={left:e.clientX,top:e.clientY}
if(n&&t.ownerDocument!==document){var o=H.getClientRect(n)
i.left+=o.left,i.top+=o.top}return i},setGlobal:function(e,t){return P[e]=t,A+'["'+e+'"]'},unsetGlobal:function(e){delete P[e]},copyAttributes:function(e,t){for(var n=t.attributes,i=n.length;i--;){var o=n[i]
"style"==o.nodeName||"class"==o.nodeName||L.ie&&!o.specified||e.setAttribute(o.nodeName,o.nodeValue)}t.className&&D.addClass(e,t.className),t.style.cssText&&(e.style.cssText+=";"+t.style.cssText)},removeStyle:function(e,t){if(e.style.removeProperty)e.style.removeProperty(t)
else{if(!e.style.removeAttribute)throw""
e.style.removeAttribute(t)}},contains:function(e,t){return e&&t&&e!==t&&(e.contains?e.contains(t):16&e.compareDocumentPosition(t))},startDrag:function(e,i,n){n=n||document
var o=e.clientX,r=e.clientY
function a(e){var t=e.clientX-o,n=e.clientY-r
i.ondragmove(t,n,e),e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}if(n.addEventListener){var t=function e(t){n.removeEventListener("mousemove",a,!0),n.removeEventListener("mouseup",e,!0),window.removeEventListener("mouseup",e,!0),i.ondragstop()}
n.addEventListener("mousemove",a,!0),n.addEventListener("mouseup",t,!0),window.addEventListener("mouseup",t,!0),e.preventDefault()}else{var s=function e(){l.releaseCapture(),l.detachEvent("onmousemove",a),l.detachEvent("onmouseup",e),l.detachEvent("onlosecaptrue",e),i.ondragstop()},l=e.srcElement
l.setCapture(),l.attachEvent("onmousemove",a),l.attachEvent("onmouseup",s),l.attachEvent("onlosecaptrue",s),e.returnValue=!1}i.ondragstart()},getFixedLayer:function(){var e=document.getElementById("edui_fixedlayer")
return null==e&&((e=document.createElement("div")).id="edui_fixedlayer",document.body.appendChild(e),L.ie&&L.version<=8?(e.style.position="absolute",D.on(window,"scroll",Ot),D.on(window,"resize",y.editor.utils.defer(Ot,0,!0)),setTimeout(Ot)):e.style.position="fixed",e.style.left="0",e.style.top="0",e.style.width="0",e.style.height="0"),e},makeUnselectable:function(e){if(L.opera||L.ie&&L.version<9){if(e.unselectable="on",e.hasChildNodes())for(var t=0;t<e.childNodes.length;t++)1==e.childNodes[t].nodeType&&H.makeUnselectable(e.childNodes[t])}else void 0!==e.style.MozUserSelect?e.style.MozUserSelect="none":void 0!==e.style.WebkitUserSelect?e.style.WebkitUserSelect="none":void 0!==e.style.KhtmlUserSelect&&(e.style.KhtmlUserSelect="none")}},O=y.editor.utils,q=y.editor.ui.uiUtils,j=y.editor.EventBase,(V=y.editor.ui.UIBase=function(){}).prototype={className:"",uiName:"",initOptions:function(e){for(var t in e)this[t]=e[t]
this.id=this.id||"edui"+q.uid()},initUIBase:function(){this._globalKey=O.unhtml(q.setGlobal(this.id,this))},render:function(e){for(var t,n=this.renderHtml(),i=q.createElementByHtml(n),o=te.getElementsByTagName(i,"*"),r="edui-"+(this.theme||this.editor.options.theme),a=document.getElementById("edui_fixedlayer"),s=0;t=o[s++];)te.addClass(t,r)
te.addClass(i,r),a&&(a.className="",te.addClass(a,r))
var l=this.getDom()
null!=l?(l.parentNode.replaceChild(i,l),q.copyAttributes(i,l)):("string"==typeof e&&(e=document.getElementById(e)),e=e||q.getFixedLayer(),te.addClass(e,r),e.appendChild(i)),this.postRender()},getDom:function(e){return e?document.getElementById(this.id+"_"+e):document.getElementById(this.id)},postRender:function(){this.fireEvent("postrender")},getHtmlTpl:function(){return""},formatHtml:function(e){var t="edui-"+this.uiName
return e.replace(/##/g,this.id).replace(/%%-/g,this.uiName?t+"-":"").replace(/%%/g,(this.uiName?t:"")+" "+this.className).replace(/\$\$/g,this._globalKey)},renderHtml:function(){return this.formatHtml(this.getHtmlTpl())},dispose:function(){var e=this.getDom()
e&&y.editor.dom.domUtils.remove(e),q.unsetGlobal(this.id)}},O.inherits(V,j),F=y.editor.utils,W=y.editor.ui.UIBase,(z=y.editor.ui.Separator=function(e){this.initOptions(e),this.initSeparator()}).prototype={uiName:"separator",initSeparator:function(){this.initUIBase()},getHtmlTpl:function(){return'<div id="##" class="edui-box %%"></div>'}},F.inherits(z,W),X=y.editor.utils,K=y.editor.dom.domUtils,Y=y.editor.ui.UIBase,G=y.editor.ui.uiUtils,(ne=y.editor.ui.Mask=function(e){this.initOptions(e),this.initUIBase()}).prototype={getHtmlTpl:function(){return'<div id="##" class="edui-mask %%" onmousedown="return $$._onMouseDown(event, this);"></div>'},postRender:function(){var e=this
K.on(window,"resize",function(){setTimeout(function(){e.isHidden()||e._fill()})})},show:function(e){this._fill(),this.getDom().style.display="",this.getDom().style.zIndex=e},hide:function(){this.getDom().style.display="none",this.getDom().style.zIndex=""},isHidden:function(){return"none"==this.getDom().style.display},_onMouseDown:function(){return!1},_fill:function(){var e=this.getDom(),t=G.getViewportRect()
e.style.width=t.width+"px",e.style.height=t.height+"px"}},X.inherits(ne,Y),function(){var e=y.editor.utils,d=y.editor.ui.uiUtils,c=y.editor.dom.domUtils,r=y.editor.ui.UIBase,t=y.editor.ui.Popup=function(e){this.initOptions(e),this.initPopup()},o=[]
function n(e,t){for(var n=0;n<o.length;n++){var i=o[n]
if(!i.isHidden()&&!1!==i.queryAutoHide(t)){if(e&&/scroll/gi.test(e.type)&&"edui-wordpastepop"==i.className)return
i.hide()}}o.length&&i.editor.fireEvent("afterhidepop")}t.postHide=n
var u=["edui-anchor-topleft","edui-anchor-topright","edui-anchor-bottomleft","edui-anchor-bottomright"]
t.prototype={contentClass:"edui-popup-content",SHADOW_RADIUS:5,content:null,_hidden:!1,autoRender:!0,canSideLeft:!0,canSideUp:!0,initPopup:function(){this.initUIBase(),o.push(this)},getHtmlTpl:function(){return'<div id="##" class="edui-popup %%"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="javascript:"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="'+this.contentClass+'">'+this.getContentHtmlTpl()+"  </div> </div></div>"},getContentHtmlTpl:function(){return this.content?"string"==typeof this.content?this.content:this.content.renderHtml():""},_UIBase_postRender:r.prototype.postRender,postRender:function(){if(this.content instanceof r&&this.content.postRender(),this.captureWheel&&!this.captured){this.captured=!0
for(var e=(document.documentElement.clientHeight||document.body.clientHeight)-80,t=this.getDom().offsetHeight,n=this.combox.getDom().getBoundingClientRect().top,i=this.getDom("content"),o=this;e<n+t;)t-=30
window.XMLHttpRequest?c.on(i,"onmousewheel"in document.body?"mousewheel":"DOMMouseScroll",function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,e.wheelDelta?i.scrollTop-=e.wheelDelta/120*60:i.scrollTop-=e.detail/-3*60}):c.on(this.getDom(),"mousewheel",function(e){e.returnValue=!1,o.getDom("content").scrollTop-=e.wheelDelta/120*60})}this.fireEvent("postRenderAfter"),this.hide(!0),this._UIBase_postRender()},_doAutoRender:function(){!this.getDom()&&this.autoRender&&this.render()},mesureSize:function(){var e=this.getDom("content")
return d.getClientRect(e)},fitSize:function(){if(this.captureWheel&&this.sized)return this.__size
this.sized=!0
var e=this.getDom("body")
e.style.width="",e.style.height=""
var t=this.mesureSize()
return this.captureWheel?e.style.width=-(-20-t.width)+"px":e.style.width=t.width+"px",e.style.height=t.height+"px",this.__size=t,this.captureWheel&&(this.getDom("content").style.overflow="auto"),t},showAnchor:function(e,t){this.showAnchorRect(d.getClientRect(e),t)},showAnchorRect:function(e,t){this._doAutoRender()
var n=d.getViewportRect()
this._show()
var i,o,r,a,s=this.fitSize()
a=t?(i=this.canSideLeft&&e.right+s.width>n.right&&e.left>s.width,o=this.canSideUp&&e.top+s.height>n.bottom&&e.bottom>s.height,r=i?e.left-s.width:e.right,o?e.bottom-s.height:e.top):(i=this.canSideLeft&&e.right+s.width>n.right&&e.left>s.width,o=this.canSideUp&&e.top+s.height>n.bottom&&e.bottom>s.height,r=i?e.right-s.width:e.left,o?e.top-s.height:e.bottom)
var l=this.getDom()
d.setViewportOffset(l,{left:r,top:a}),c.removeClasses(l,u),l.className+=" "+u[2*(o?1:0)+(i?1:0)],this.editor&&(l.style.zIndex=+this.editor.container.style.zIndex+10,y.editor.ui.uiUtils.getFixedLayer().style.zIndex=l.style.zIndex-1)},showAt:function(e){var t=e.left,n=e.top,i={left:t,top:n,right:t,bottom:n,height:0,width:0}
this.showAnchorRect(i,!1,!0)},_show:function(){this._hidden&&(this.getDom().style.display="",this._hidden=!1,this.fireEvent("show"))},isHidden:function(){return this._hidden},show:function(){this._doAutoRender(),this._show()},hide:function(e){!this._hidden&&this.getDom()&&(this.getDom().style.display="none",this._hidden=!0,e||this.fireEvent("hide"))},queryAutoHide:function(e){return!e||!d.contains(this.getDom(),e)}},e.inherits(t,r),c.on(document,"mousedown",function(e){n(e,e.target||e.srcElement)}),c.on(window,"scroll",function(e,t){n(e,t)})}(),function(){var e=y.editor.utils,t=y.editor.ui.UIBase,l='<span onclick="return false;" title="清除颜色" class="ue_colorpicker_nocolor ue_colorpicker_square"></span>',n=y.editor.ui.ColorPicker=function(e){this.initOptions(e),this.noColorText=this.noColorText||this.editor.getLang("clearColor"),this.initUIBase()
var t=this.storekey="__ue_recentlycolor_"+(e.storekey||""),n=s.get(t)
n=n?n.split(",").slice(0,8):["#000"],this.recentlyColor=n}
n.prototype={getHtmlTpl:function(){return function(e,t){var n='<div unselectable="on" id="##_preview" class="edui-colorpicker-preview" style="display:none;"></div><div class="ue_colorpicker_box" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);">'
n+='<div class="ue_colorpicker_group" style="overflow:hidden;"><div class="ue_colorpicker_hd">'+e.getLang("recentlyColor")+'</div><div class="ue_colorpicker_bd" id="##_recently_color" >'+l
var i=t.recentlyColor
if(0<i.length)for(var o=0,r=i.length;o<r;o++){var a=i[o].substr(1)
n+='<span onclick="return false;" title="#'+a+'" data-type="recently" data-color="#'+a+'" class="ue_colorpicker_square" style="background-color:#'+a+'"></span>'}n+="</div></div>"
var s='<span id="##_colorpicker_tab" class="ue_colorpicker_hd_tab" onclick="return $$._onColorPickerClick(event, this);">更多颜色</span>'
document.getElementsByClassName||(s="")
n+='<div class="ue_colorpicker_group" style="overflow:hidden;"><div class="ue_colorpicker_hd"><span id="##_basiccolor_tab" class="ue_colorpicker_hd_tab selected" onclick="return $$._onBasicColorClick(event, this);">'+e.getLang("basicColor")+"</span>"+s+'</div><div class="ue_colorpicker_bd" id="##_basiccolor">'
for(o=0,r=d.length;o<r;o++){a=d[o]
n+='<span onclick="return false;" title="#'+a+'" data-type="basic" data-color="#'+a+'" class="ue_colorpicker_square" style="background-color:#'+a+'"></span>'}return n+='</div><div class="ue_colorpicker_bd" id="##_colorpicker" style="display:none;"></div></div><div class="ue_colorpicker_toolbar"><span onclick="return false;" title="#f00" data-type="preview" data-color="#f00" class="ue_colorpicker_square" id="##_colorinput_preview" style="background-color:#f00"></span><a href="javascript:void(0);" onclick="return $$._onBtnClick(event, this);" class="btn_ue_colorpicker">确认</a><span class="ue_colorpicker_input_box"><span class="ue_colorpicker_input_append">#</span><span class="ue_colorpicker_input_inner"><input id="##_colorinput" value="ff0000" type="text" onkeyup="return $$._onInputKeyup(event, this);" onclick="return $$._onInputClick(event, this);"></span></span></div></div>'}((this.noColorText,this.editor),this)},_initColorPicker:function(){var i=this,e=this.getDom("colorpicker"),o=this.getDom("colorinput_preview"),r=i.getDom("colorinput")
$(e).addClass("cp cp-default")
a(e,function(e){if(e){e=e.substr(1),r.value=e
var t=i._getColor(),n=t||"#ffffff"
o.style.backgroundColor=n,o.setAttribute("title",n),o.setAttribute("data-color",n)}})},_onTableClick:function(e){var t=e.target||e.srcElement,n=t.getAttribute("data-color")
if(n){this._saveColor(n)
var i=this.getDom("colorinput_preview"),o=this.getDom("colorinput")
i.style.backgroundColor=n,i.setAttribute("title",n),i.setAttribute("data-color",n),o.value=(n||"").substr(1)
var r=t.getAttribute("data-type")||""
this.fireEvent("pickcolor",n,{type:r})}else this._onPickNoColor()},_saveColor:function(e){for(var t=this.recentlyColor||["#000"],n=[],i=0,o=t.length;i<o;++i){(a=t[i])!=e&&n.push(a)}n.unshift(e),t=n.slice(0,8),this.recentlyColor=t,s.set(this.storekey,t.join(","))
var r=l
for(i=0,o=t.length;i<o;i++){var a
r+='<span onclick="return false;" title="#'+(a=t[i].substr(1))+'" data-type="recently" data-color="#'+a+'" class="ue_colorpicker_square" style="background-color:#'+a+'"></span>'}this.getDom("recently_color").innerHTML=r},_onTableOver:function(e){var t=(e.target||e.srcElement).getAttribute("data-color")
t&&(this.getDom("preview").style.backgroundColor=t)},_getColor:function(){var e=this.getDom("colorinput").value||"",t=(e=e.toLowerCase()).split(""),n=t.length
if(3!=n&&6!=n)return!1
for(var i=0;i<n;++i){var o=t[i]
if(!("0"<=o&&o<="9")&&!("a"<=o&&o<="f"))return!1}return"#"+e},_onBtnClick:function(e){var t=this._getColor()
return t&&(this._saveColor(t),this.fireEvent("pickcolor",t,{type:"okBtn"})),e.stopPropagation?(e.stopPropagation(),e.preventDefault()):e.cancelBubble=!0,!1},_onInputKeyup:function(e){var t=this.getDom("colorinput_preview"),n=this._getColor(),i=n||"#ffffff",o=e.keyCode||e.which
t.style.backgroundColor=i,t.setAttribute("title",i),t.setAttribute("data-color",i),n&&13==o&&(this._saveColor(n),this.fireEvent("pickcolor",n,{type:"input"}))},_onInputClick:function(e){e.stopPropagation?(e.stopPropagation(),e.preventDefault()):e.cancelBubble=!0},_onTableOut:function(){this.getDom("preview").style.backgroundColor=""},_onPickNoColor:function(){this.fireEvent("picknocolor")},_onBasicColorClick:function(e){var t=this.getDom("basiccolor"),n=this.getDom("colorpicker")
t.style.display="block",n.style.display="none"
var i=this.getDom("basiccolor_tab"),o=this.getDom("colorpicker_tab")
return $(i).addClass("selected"),$(o).removeClass("selected"),e.stopPropagation?(e.stopPropagation(),e.preventDefault()):e.cancelBubble=!0,!1},_onColorPickerClick:function(e){var t=this.getDom("basiccolor"),n=this.getDom("colorpicker")
t.style.display="none",n.style.display="block"
var i=this.getDom("basiccolor_tab"),o=this.getDom("colorpicker_tab")
return $(i).removeClass("selected"),$(o).addClass("selected"),this.__hasInitColorPicker||(this.__hasInitColorPicker=!0,this._initColorPicker()),e.stopPropagation?(e.stopPropagation(),e.preventDefault()):e.cancelBubble=!0,!1}},e.inherits(n,t)
var d="ffffff,ffd7d5,ffdaa9,fffed5,d4fa00,73fcd6,a5c8ff,ffacd5,ff7faa,d6d6d6,ffacaa,ffb995,fffb00,73fa79,00fcff,78acfe,d84fa9,ff4f79,b2b2b2,d7aba9,ff6827,ffda51,00d100,00d5ff,0080ff,ac39ff,ff2941,888888,7a4442,ff4c00,ffa900,3da742,3daad6,0052ff,7a4fd6,d92142,000000,7b0c00,ff4c41,d6a841,407600,007aaa,021eaa,797baa,ab1942".split(",")}(),ie=y.editor.utils,oe=y.editor.ui.uiUtils,re=y.editor.ui.UIBase,(ae=y.editor.ui.TablePicker=function(e){this.initOptions(e),this.initTablePicker()}).prototype={defaultNumRows:10,defaultNumCols:10,maxNumRows:20,maxNumCols:20,numRows:10,numCols:10,lengthOfCellSide:22,initTablePicker:function(){this.initUIBase()},getHtmlTpl:function(){return'<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>'},_UIBase_render:re.prototype.render,render:function(e){this._UIBase_render(e),this.getDom("label").innerHTML="0"+this.editor.getLang("t_row")+" x 0"+this.editor.getLang("t_col")},_track:function(e,t){var n=this.getDom("overlay").style,i=this.lengthOfCellSide
n.width=e*i+"px",n.height=t*i+"px",this.getDom("label").innerHTML=e+this.editor.getLang("t_col")+" x "+t+this.editor.getLang("t_row"),this.numCols=e,this.numRows=t},_onMouseOver:function(e,t){var n=e.relatedTarget||e.fromElement
oe.contains(t,n)||t===n||(this.getDom("label").innerHTML="0"+this.editor.getLang("t_col")+" x 0"+this.editor.getLang("t_row"),this.getDom("overlay").style.visibility="")},_onMouseOut:function(e,t){var n=e.relatedTarget||e.toElement
oe.contains(t,n)||t===n||(this.getDom("label").innerHTML="0"+this.editor.getLang("t_col")+" x 0"+this.editor.getLang("t_row"),this.getDom("overlay").style.visibility="hidden")},_onMouseMove:function(e){this.getDom("overlay").style
var t=oe.getEventOffset(e),n=this.lengthOfCellSide,i=Math.ceil(t.left/n),o=Math.ceil(t.top/n)
this._track(i,o)},_onClick:function(){this.fireEvent("picktable",this.numCols,this.numRows)}},ie.inherits(ae,re),se=y.editor.browser,le=y.editor.dom.domUtils,de=y.editor.ui.uiUtils,ce='onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"'+(se.ie?' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"':' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"'),y.editor.ui.Stateful={alwalysHoverable:!1,target:null,Stateful_init:function(){this._Stateful_dGetHtmlTpl=this.getHtmlTpl,this.getHtmlTpl=this.Stateful_getHtmlTpl},Stateful_getHtmlTpl:function(){return this._Stateful_dGetHtmlTpl().replace(/stateful/g,function(){return ce})},Stateful_onMouseEnter:function(e,t){this.target=t,this.isDisabled()&&!this.alwalysHoverable||(this.addState("hover"),this.fireEvent("over"))},Stateful_onMouseLeave:function(){this.isDisabled()&&!this.alwalysHoverable||(this.removeState("hover"),this.removeState("active"),this.fireEvent("out"))},Stateful_onMouseOver:function(e,t){var n=e.relatedTarget
de.contains(t,n)||t===n||this.Stateful_onMouseEnter(e,t)},Stateful_onMouseOut:function(e,t){var n=e.relatedTarget
de.contains(t,n)||t===n||this.Stateful_onMouseLeave(e,t)},Stateful_onMouseDown:function(){this.isDisabled()||this.addState("active")},Stateful_onMouseUp:function(){this.isDisabled()||this.removeState("active")},Stateful_postRender:function(){this.disabled&&!this.hasState("disabled")&&this.addState("disabled")},hasState:function(e){return le.hasClass(this.getStateDom(),"edui-state-"+e)},addState:function(e){var t=this.getStateDom()
!this.hasState(e)&&t&&(t.className+=" edui-state-"+e)},removeState:function(e){this.hasState(e)&&le.removeClasses(this.getStateDom(),["edui-state-"+e])},getStateDom:function(){return this.getDom("state")},isChecked:function(){return this.hasState("checked")},setChecked:function(e){!this.isDisabled()&&e?this.addState("checked"):this.removeState("checked")},isDisabled:function(){return this.hasState("disabled")},setDisabled:function(e){e?(this.removeState("hover"),this.removeState("checked"),this.removeState("active"),this.addState("disabled")):this.removeState("disabled")}},ue=y.editor.utils,me=y.editor.ui.UIBase,he=y.editor.ui.Stateful,(fe=y.editor.ui.Button=function(e){this.initOptions(e),this.initButton()}).prototype={uiName:"button",label:"",title:"",showIcon:!0,showText:!0,initButton:function(){this.initUIBase(),this.Stateful_init()},getHtmlTpl:function(){return'<div id="##" class="edui-box %%"'+(this.hideWhenInit?' style="display:none !important;"':"")+'><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" '+(this.title?'data-tooltip="'+this.title+'"':"")+' class="%%-body js_tooltip" onmousedown="return false;" onclick="return $$._onClick();">'+(this.showIcon?'<div class="edui-box edui-icon"></div>':"")+(this.showText?'<div class="edui-box edui-label">'+this.label+"</div>":"")+"</div></div></div></div>"},postRender:function(){this.Stateful_postRender(),this.setDisabled(this.disabled)},_onClick:function(){this.isDisabled()||this.fireEvent("click")}},ue.inherits(fe,me),ue.extend(fe.prototype,he),pe=y.editor.utils,ge=y.editor.ui.uiUtils,y.editor.dom.domUtils,ve=y.editor.ui.UIBase,be=y.editor.ui.Stateful,(ye=y.editor.ui.SplitButton=function(e){this.initOptions(e),this.initSplitButton()}).prototype={popup:null,uiName:"splitbutton",title:"",initSplitButton:function(){this.initUIBase(),this.Stateful_init()
if(null!=this.popup){var e=this.popup
this.popup=null,this.setPopup(e)}},_UIBase_postRender:ve.prototype.postRender,postRender:function(){this.Stateful_postRender(),this._UIBase_postRender()},setPopup:function(e){this.popup!==e&&(null!=this.popup&&this.popup.dispose(),e.addListener("show",pe.bind(this._onPopupShow,this)),e.addListener("hide",pe.bind(this._onPopupHide,this)),e.addListener("postrender",pe.bind(function(){e.getDom("body").appendChild(ge.createElementByHtml('<div id="'+this.popup.id+'_bordereraser" class="edui-bordereraser edui-background" style="width:'+(ge.getClientRect(this.getDom()).width+20)+'px"></div>')),e.getDom().className+=" "+this.className},this)),this.popup=e)},_onPopupShow:function(){this.addState("opened")},_onPopupHide:function(){this.removeState("opened")},getHtmlTpl:function(){var e='<div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div>'
return this.useInput&&(e='<div id="##_button_body" class="edui-box edui-button-body"><input id="##_wx_input" class="edui-box edui-wx-input " type="text" onkeydown="$$._onInputKeydown(event, this);" onclick="$$._onInputClick(event, this);" onblur="$$._onInputBlur(event, this);"></div>'),!1!==this.useArrow&&(e+='<div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div>'),'<div id="##" class="edui-box %%"><div '+(this.title?'data-tooltip="'+this.title+'"':"")+' id="##_state" stateful class="js_tooltip"><div class="%%-body">'+e+"</div></div></div>"},showPopup:function(){var e=ge.getClientRect(this.getDom())
e.top-=this.popup.SHADOW_RADIUS,e.height+=this.popup.SHADOW_RADIUS,this.popup.showAnchorRect(e)},_onArrowClick:function(){this.isDisabled()||this.showPopup()},_onInputClick:function(){this.isDisabled()||this.fireEvent("inputclick")},_onInputBlur:function(e){this.isDisabled()||this.fireEvent("inputblur"),e.stopPropagation?(e.stopPropagation(),e.preventDefault()):e.cancelBubble=!0},_onInputKeydown:function(e){this.isDisabled()||this.fireEvent("inputkeydown",e)},_onButtonClick:function(){this.isDisabled()||this.fireEvent("buttonclick")}},pe.inherits(ye,ve),pe.extend(ye.prototype,be,!0),Ce=y.editor.utils,Ne=y.editor.ui.uiUtils,xe=y.editor.ui.ColorPicker,we=y.editor.ui.Popup,ke=y.editor.ui.SplitButton,(Ee=y.editor.ui.ColorButton=function(e){this.initOptions(e),this.initColorButton()}).prototype={initColorButton:function(){var i=this
this.popup=new we({content:new xe({noColorText:i.editor.getLang("clearColor"),storekey:i.storekey,editor:i.editor,onpickcolor:function(e,t,n){i._onPickColor(t,n)},onpicknocolor:function(e,t){i._onPickNoColor(t)}}),editor:i.editor}),this.initSplitButton()},_SplitButton_postRender:ke.prototype.postRender,postRender:function(){this._SplitButton_postRender(),this.getDom("button_body").appendChild(Ne.createElementByHtml('<div id="'+this.id+'_colorlump" class="edui-colorlump"></div>')),this.getDom().className+=" edui-colorbutton"},setColor:function(e){this.getDom("colorlump").style.backgroundColor=e,this.color=e},_onPickColor:function(e,t){!1!==this.fireEvent("pickcolor",e,t)&&(this.setColor(e),this.popup.hide())},_onPickNoColor:function(){!1!==this.fireEvent("picknocolor")&&this.popup.hide()}},Ce.inherits(Ee,ke),Te=y.editor.utils,Se=y.editor.ui.Popup,Be=y.editor.ui.TablePicker,Ie=y.editor.ui.SplitButton,(_e=y.editor.ui.TableButton=function(e){this.initOptions(e),this.initTableButton()}).prototype={initTableButton:function(){var i=this
this.popup=new Se({content:new Be({editor:i.editor,onpicktable:function(e,t,n){i._onPickTable(t,n)}}),editor:i.editor}),this.initSplitButton()},_onPickTable:function(e,t){!1!==this.fireEvent("picktable",e,t)&&this.popup.hide()}},Te.inherits(_e,Ie),Re=y.editor.utils,Le=y.editor.ui.UIBase,(De=y.editor.ui.AutoTypeSetPicker=function(e){this.initOptions(e),this.initAutoTypeSetPicker()}).prototype={initAutoTypeSetPicker:function(){this.initUIBase()},getHtmlTpl:function(){var e=this.editor,t=e.options.autotypeset,n=e.getLang("autoTypeSet"),i="textAlignValue"+e.uid,o="imageBlockLineValue"+e.uid
return'<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap colspan="2"><input type="checkbox" name="mergeEmptyline" '+(t.mergeEmptyline?"checked":"")+">"+n.mergeLine+'</td><td colspan="2"><input type="checkbox" name="removeEmptyline" '+(t.removeEmptyline?"checked":"")+">"+n.delLine+'</td></tr><tr><td nowrap colspan="2"><input type="checkbox" name="removeClass" '+(t.removeClass?"checked":"")+">"+n.removeFormat+'</td><td colspan="2"><input type="checkbox" name="indent" '+(t.indent?"checked":"")+">"+n.indent+'</td></tr><tr><td nowrap colspan="2"><input type="checkbox" name="textAlign" '+(t.textAlign?"checked":"")+">"+n.alignment+'</td><td colspan="2" id="'+i+'"><input type="radio" name="'+i+'" value="left" '+(t.textAlign&&"left"==t.textAlign?"checked":"")+">"+e.getLang("justifyleft")+'<input type="radio" name="'+i+'" value="center" '+(t.textAlign&&"center"==t.textAlign?"checked":"")+">"+e.getLang("justifycenter")+'<input type="radio" name="'+i+'" value="right" '+(t.textAlign&&"right"==t.textAlign?"checked":"")+">"+e.getLang("justifyright")+' </tr><tr><td nowrap colspan="2"><input type="checkbox" name="imageBlockLine" '+(t.imageBlockLine?"checked":"")+">"+n.imageFloat+'</td><td nowrap colspan="2" id="'+o+'"><input type="radio" name="'+o+'" value="none" '+(t.imageBlockLine&&"none"==t.imageBlockLine?"checked":"")+">"+e.getLang("default")+'<input type="radio" name="'+o+'" value="left" '+(t.imageBlockLine&&"left"==t.imageBlockLine?"checked":"")+">"+e.getLang("justifyleft")+'<input type="radio" name="'+o+'" value="center" '+(t.imageBlockLine&&"center"==t.imageBlockLine?"checked":"")+">"+e.getLang("justifycenter")+'<input type="radio" name="'+o+'" value="right" '+(t.imageBlockLine&&"right"==t.imageBlockLine?"checked":"")+">"+e.getLang("justifyright")+'</tr><tr><td nowrap colspan="2"><input type="checkbox" name="clearFontSize" '+(t.clearFontSize?"checked":"")+">"+n.removeFontsize+'</td><td colspan="2"><input type="checkbox" name="clearFontFamily" '+(t.clearFontFamily?"checked":"")+">"+n.removeFontFamily+'</td></tr><tr><td nowrap colspan="4"><input type="checkbox" name="removeEmptyNode" '+(t.removeEmptyNode?"checked":"")+">"+n.removeHtml+'</td></tr><tr><td nowrap colspan="4"><input type="checkbox" name="pasteFilter" '+(t.pasteFilter?"checked":"")+">"+n.pasteFilter+'</td></tr><tr><td nowrap colspan="4" align="right"><button >'+n.run+"</button></td></tr></table></div></div>"},_UIBase_render:Le.prototype.render},Re.inherits(De,Le),Ae=y.editor.utils,Pe=y.editor.ui.Popup,Me=y.editor.ui.AutoTypeSetPicker,Ue=y.editor.ui.SplitButton,(He=y.editor.ui.AutoTypeSetButton=function(e){this.initOptions(e),this.initAutoTypeSetButton()}).prototype={initAutoTypeSetButton:function(){var t=this
this.popup=new Pe({content:new Me({editor:t.editor}),editor:t.editor,hide:function(){!this._hidden&&this.getDom()&&(qt(this),this.getDom().style.display="none",this._hidden=!0,this.fireEvent("hide"))}})
var n=0
this.popup.addListener("postRenderAfter",function(){var e=this
n||(this.getDom().getElementsByTagName("button")[0].onclick=function(){qt(e),t.editor.execCommand("autotypeset"),e.hide()},n=1)}),this.initSplitButton()}},Ae.inherits(He,Ue),Oe=y.editor.utils,qe=y.editor.ui.Popup,$e=y.editor.ui.Stateful,je=y.editor.ui.UIBase,(Ve=y.editor.ui.CellAlignPicker=function(e){this.initOptions(e),this.initSelected(),this.initCellAlignPicker()}).prototype={initSelected:function(){var e={top:0,middle:1,bottom:2},t={left:0,center:1,right:2},n=3
this.selected&&(this.selectedIndex=e[this.selected.valign]*n+t[this.selected.align])},initCellAlignPicker:function(){this.initUIBase(),this.Stateful_init()},getHtmlTpl:function(){for(var e=["left","center","right"],t=null,n=-1,i=[],o=0;o<9;o++)t=this.selectedIndex===o?' class="edui-cellalign-selected" ':"",0===(n=o%3)&&i.push("<tr>"),i.push('<td index="'+o+'" '+t+' stateful><div class="edui-icon edui-'+e[n]+'"></div></td>'),2===n&&i.push("</tr>")
return'<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">'+i.join("")+"</table></div></div>"},getStateDom:function(){return this.target},_onClick:function(e){var t=e.target||e.srcElement;/icon/.test(t.className)&&(this.items[t.parentNode.getAttribute("index")].onclick(),qe.postHide(e))},_UIBase_render:je.prototype.render},Oe.inherits(Ve,je),Oe.extend(Ve.prototype,$e,!0),Fe=y.editor.utils,We=y.editor.ui.Stateful,ze=y.editor.ui.uiUtils,Xe=y.editor.ui.UIBase,(Ke=y.editor.ui.PastePicker=function(e){this.initOptions(e),this.initPastePicker()}).prototype={initPastePicker:function(){this.initUIBase(),this.Stateful_init()},getHtmlTpl:function(){return'<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">'+this.editor.getLang("pasteOpt")+'</div><div class="edui-button"><div title="'+this.editor.getLang("pasteSourceFormat")+'" onclick="$$.format(false)" stateful><div class="edui-richtxticon"></div></div><div title="'+this.editor.getLang("tagFormat")+'" onclick="$$.format(2)" stateful><div class="edui-tagicon"></div></div><div title="'+this.editor.getLang("pasteTextFormat")+'" onclick="$$.format(true)" stateful><div class="edui-plaintxticon"></div></div></div></div></div>'},getStateDom:function(){return this.target},format:function(e){this.editor.ui._isTransfer=!0,this.editor.fireEvent("pasteTransfer",e)},_onClick:function(e){var t=te.getNextDomNode(e),n=ze.getViewportRect().height,i=ze.getClientRect(t)
i.top+i.height>n?t.style.top=-i.height-e.offsetHeight+"px":t.style.top="",/hidden/gi.test(te.getComputedStyle(t,"visibility"))?(t.style.visibility="visible",te.addClass(e,"edui-state-opened")):(t.style.visibility="hidden",te.removeClasses(e,"edui-state-opened"))},_UIBase_render:Xe.prototype.render},Fe.inherits(Ke,Xe),Fe.extend(Ke.prototype,We,!0),Ye=y.editor.utils,Ge=y.editor.ui.uiUtils,Je=y.editor.ui.UIBase,(Qe=y.editor.ui.Toolbar=function(e){this.initOptions(e),this.initToolbar()}).prototype={items:null,initToolbar:function(){this.items=this.items||[],this.initUIBase()},add:function(e){this.items.push(e)},getHtmlTpl:function(){for(var e=[],t=0;t<this.items.length;t++)e[t]=this.items[t].renderHtml()
return'<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">'+e.join("")+"</div>"},postRender:function(){for(var e=this.getDom(),t=0;t<this.items.length;t++)this.items[t].postRender()
Ge.makeUnselectable(e)},_onMouseDown:function(){return!1}},Ye.inherits(Qe,Je),function(){var e=y.editor.utils,n=y.editor.dom.domUtils,o=y.editor.ui.uiUtils,t=y.editor.ui.UIBase,i=y.editor.ui.Popup,r=y.editor.ui.Stateful,a=y.editor.ui.CellAlignPicker,s=y.editor.ui.Menu=function(e){this.initOptions(e),this.initMenu()},l={renderHtml:function(){return'<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'},postRender:function(){},queryAutoHide:function(){return!0}}
s.prototype={items:null,uiName:"menu",initMenu:function(){this.items=this.items||[],this.initPopup(),this.initItems()},initItems:function(){for(var e=0;e<this.items.length;e++){var t=this.items[e]
"-"==t?this.items[e]=this.getSeparator():t instanceof d||(t.editor=this.editor,t.theme=this.editor.options.theme,this.items[e]=this.createItem(t))}},getSeparator:function(){return l},createItem:function(e){return e.menu=this,new d(e)},_Popup_getContentHtmlTpl:i.prototype.getContentHtmlTpl,getContentHtmlTpl:function(){if(0==this.items.length)return this._Popup_getContentHtmlTpl()
for(var e=[],t=0;t<this.items.length;t++){var n=this.items[t]
e[t]=n.renderHtml()}return'<div class="%%-body">'+e.join("")+"</div>"},_Popup_postRender:i.prototype.postRender,postRender:function(){for(var i=this,e=0;e<this.items.length;e++){var t=this.items[e]
t.ownerMenu=this,t.postRender()}n.on(this.getDom(),"mouseover",function(e){var t=(e=e||event).relatedTarget||e.fromElement,n=i.getDom()
o.contains(n,t)||n===t||i.fireEvent("over")}),this._Popup_postRender()},queryAutoHide:function(e){if(e){if(o.contains(this.getDom(),e))return!1
for(var t=0;t<this.items.length;t++){if(!1===this.items[t].queryAutoHide(e))return!1}}},clearItems:function(){for(var e=0;e<this.items.length;e++){var t=this.items[e]
clearTimeout(t._showingTimer),clearTimeout(t._closingTimer),t.subMenu&&t.subMenu.destroy()}this.items=[]},destroy:function(){this.getDom()&&n.remove(this.getDom()),this.clearItems()},dispose:function(){this.destroy()}},e.inherits(s,i)
var d=y.editor.ui.MenuItem=function(e){if(this.initOptions(e),this.initUIBase(),this.Stateful_init(),this.subMenu&&!(this.subMenu instanceof s))if(e.className&&-1!=e.className.indexOf("aligntd")){var t=this
this.subMenu.selected=this.editor.queryCommandValue("cellalignment"),this.subMenu=new i({content:new a(this.subMenu),parentMenu:t,editor:t.editor,destroy:function(){this.getDom()&&n.remove(this.getDom())}}),this.subMenu.addListener("postRenderAfter",function(){n.on(this.getDom(),"mouseover",function(){t.addState("opened")})})}else this.subMenu=new s(this.subMenu)}
d.prototype={label:"",subMenu:null,ownerMenu:null,uiName:"menuitem",alwalysHoverable:!0,getHtmlTpl:function(){return'<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">'+this.renderLabelHtml()+"</div></div>"},postRender:function(){var n=this
this.addListener("over",function(){n.ownerMenu.fireEvent("submenuover",n),n.subMenu&&n.delayShowSubMenu()}),this.subMenu&&(this.getDom().className+=" edui-hassubmenu",this.subMenu.render(),this.addListener("out",function(){n.delayHideSubMenu()}),this.subMenu.addListener("over",function(){clearTimeout(n._closingTimer),n._closingTimer=null,n.addState("opened")}),this.ownerMenu.addListener("hide",function(){n.hideSubMenu()}),this.ownerMenu.addListener("submenuover",function(e,t){t!==n&&n.delayHideSubMenu()}),this.subMenu._bakQueryAutoHide=this.subMenu.queryAutoHide,this.subMenu.queryAutoHide=function(e){return(!e||!o.contains(n.getDom(),e))&&this._bakQueryAutoHide(e)}),this.getDom().style.tabIndex="-1",o.makeUnselectable(this.getDom()),this.Stateful_postRender()},delayShowSubMenu:function(){var e=this
e.isDisabled()||(e.addState("opened"),clearTimeout(e._showingTimer),clearTimeout(e._closingTimer),e._closingTimer=null,e._showingTimer=setTimeout(function(){e.showSubMenu()},250))},delayHideSubMenu:function(){var e=this
e.isDisabled()||(e.removeState("opened"),clearTimeout(e._showingTimer),e._closingTimer||(e._closingTimer=setTimeout(function(){e.hasState("opened")||e.hideSubMenu(),e._closingTimer=null},400)))},renderLabelHtml:function(){return'<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">'+(this.label||"")+"</div>"},getStateDom:function(){return this.getDom()},queryAutoHide:function(e){if(this.subMenu&&this.hasState("opened"))return this.subMenu.queryAutoHide(e)},_onClick:function(e,t){this.hasState("disabled")||!1!==this.fireEvent("click",e,t)&&(this.subMenu?this.showSubMenu():i.postHide(e))},showSubMenu:function(){var e=o.getClientRect(this.getDom())
e.right-=5,e.left+=2,e.width-=7,e.top-=4,e.bottom+=4,e.height+=8,this.subMenu.showAnchorRect(e,!0,!0)},hideSubMenu:function(){this.subMenu.hide()}},e.inherits(d,t),e.extend(d.prototype,r,!0)}(),Ze=y.editor.utils,et=y.editor.ui.uiUtils,tt=y.editor.ui.Menu,nt=y.editor.ui.SplitButton,(it=y.editor.ui.Combox=function(e){this.initOptions(e),this.initCombox()}).prototype={uiName:"combox",initCombox:function(){var e=this
this.items=this.items||[]
for(var t=0;t<this.items.length;t++){var n=this.items[t]
n.uiName="listitem",n.index=t,n.onclick=function(){e.selectByIndex(this.index)}}this.popup=new tt({items:this.items,uiName:"list",editor:this.editor,captureWheel:!0,combox:this}),this.initSplitButton()},_SplitButton_postRender:nt.prototype.postRender,postRender:function(){this._SplitButton_postRender(),this.setLabel(this.label||""),this.setValue(this.initValue||"")},showPopup:function(){var e=et.getClientRect(this.getDom())
e.top+=1,--e.bottom,e.height-=2,this.popup.showAnchorRect(e)},getValue:function(){return this.value},setValue:function(e){var t=this.indexByValue(e);-1!=t?(this.selectedIndex=t,this.setLabel(this.items[t].label),this.value=this.items[t].value):(this.selectedIndex=-1,this.setLabel(this.getLabelForUnknowValue(e)),this.value=e)},setLabel:function(e){if(this.useInput){var t=this.getDom("wx_input")
t&&(t.value=e)}else{var n=this.getDom("button_body")
n&&(n.innerHTML=e)}this.label=e},getLabelForUnknowValue:function(e){return e},indexByValue:function(e){for(var t=0;t<this.items.length;t++)if(e==this.items[t].value)return t
return-1},getItem:function(e){return this.items[e]},selectByIndex:function(e){e<this.items.length&&!1!==this.fireEvent("select",e)&&(this.selectedIndex=e,this.value=this.items[e].value,this.setLabel(this.items[e].label))}},Ze.inherits(it,nt),at=y.editor.utils,st=y.editor.dom.domUtils,lt=y.editor.ui.uiUtils,dt=y.editor.ui.Mask,ct=y.editor.ui.UIBase,ut=y.editor.ui.Button,(mt=y.editor.ui.Dialog=function(e){this.initOptions(at.extend({autoReset:!0,draggable:!0,onok:function(){},oncancel:function(){},onclose:function(e,t){return t?this.onok():this.oncancel()},holdScroll:!1},e)),this.initDialog()}).prototype={draggable:!1,uiName:"dialog",initDialog:function(){var e=this,t=this.editor.options.theme
if(this.initUIBase(),this.modalMask=ot=ot||new dt({className:"edui-dialog-modalmask",theme:t}),this.dragMask=rt=rt||new dt({className:"edui-dialog-dragmask",theme:t}),this.closeButton=new ut({className:"edui-dialog-closebutton",title:e.closeDialog,theme:t,onclick:function(){e.close(!1)}}),this.buttons)for(var n=0;n<this.buttons.length;n++)this.buttons[n]instanceof ut||(this.buttons[n]=new ut(this.buttons[n]))},fitSize:function(){var e=this.getDom("body"),t=this.mesureSize()
return e.style.width=t.width+"px",e.style.height=t.height+"px",t},safeSetOffset:function(e){var t=this.getDom(),n=lt.getViewportRect(),i=lt.getClientRect(t),o=e.left
o+i.width>n.right&&(o=n.right-i.width)
var r=e.top
r+i.height>n.bottom&&(r=n.bottom-i.height),t.style.left=Math.max(o,0)+"px",t.style.top=Math.max(r,0)+"px"},showAtCenter:function(){this.getDom().style.display=""
var e=lt.getViewportRect(),t=this.fitSize(),n=0|this.getDom("titlebar").offsetHeight,i=e.width/2-t.width/2,o=e.height/2-(t.height-n)/2-n,r=this.getDom()
this.safeSetOffset({left:Math.max(0|i,0),top:Math.max(0|o,0)}),st.hasClass(r,"edui-state-centered")||(r.className+=" edui-state-centered"),this._show()},getContentHtml:function(){var e=""
return"string"==typeof this.content?e=this.content:this.iframeUrl&&(e='<span id="'+this.id+'_contmask" class="dialogcontmask"></span><iframe id="'+this.id+'_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="'+this.iframeUrl+'"></iframe>'),e},getHtmlTpl:function(){var e=""
if(this.buttons){for(var t=[],n=0;n<this.buttons.length;n++)t[n]=this.buttons[n].renderHtml()
e='<div class="%%-foot"><div id="##_buttons" class="%%-buttons">'+t.join("")+"</div></div>"}return'<div id="##" class="%%"><div class="%%-wrap"><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">'+(this.title||"")+"</span></div>"+this.closeButton.renderHtml()+'</div><div id="##_content" class="%%-content">'+(this.autoReset?"":this.getContentHtml())+"</div>"+e+"</div></div></div>"},postRender:function(){this.modalMask.getDom()||(this.modalMask.render(),this.modalMask.hide()),this.dragMask.getDom()||(this.dragMask.render(),this.dragMask.hide())
var n=this
if(this.addListener("show",function(){n.modalMask.show(this.getDom().style.zIndex-2)}),this.addListener("hide",function(){n.modalMask.hide()}),this.buttons)for(var e=0;e<this.buttons.length;e++)this.buttons[e].postRender()
st.on(window,"resize",function(){setTimeout(function(){n.isHidden()||n.safeSetOffset(lt.getClientRect(n.getDom()))})}),this.holdScroll&&(n.iframeUrl?n.addListener("dialogafterreset",function(){window.setTimeout(function(){var e=document.getElementById(n.id+"_iframe").contentWindow
if(Z.ie)var t=window.setInterval(function(){e.document&&e.document.body&&(window.clearInterval(t),t=null,st.on(e.document.body,Z.gecko?"DOMMouseScroll":"mousewheel",function(e){st.preventDefault(e)}))},100)
else st.on(e,Z.gecko?"DOMMouseScroll":"mousewheel",function(e){st.preventDefault(e)})},1)}):st.on(document.getElementById(n.id+"_iframe"),Z.gecko?"DOMMouseScroll":"mousewheel",function(e){st.preventDefault(e)})),this._hide()},mesureSize:function(){var e=this.getDom("body"),t=lt.getClientRect(this.getDom("content")).width
return e.style.width=t,lt.getClientRect(e)},_onTitlebarMouseDown:function(e){if(this.draggable){lt.getViewportRect()
var o,r=this
lt.startDrag(e,{ondragstart:function(){o=lt.getClientRect(r.getDom()),r.getDom("contmask").style.visibility="visible",r.dragMask.show(r.getDom().style.zIndex-1)},ondragmove:function(e,t){var n=o.left+e,i=o.top+t
r.safeSetOffset({left:n,top:i})},ondragstop:function(){r.getDom("contmask").style.visibility="hidden",st.removeClasses(r.getDom(),["edui-state-centered"]),r.dragMask.hide()}})}},reset:function(){this.getDom("content").innerHTML=this.getContentHtml(),this.fireEvent("dialogafterreset")},_show:function(){this._hidden&&(this.getDom().style.display="",this.editor.container.style.zIndex&&(this.getDom().style.zIndex=+this.editor.container.style.zIndex+10),this._hidden=!1,this.fireEvent("show"),y.editor.ui.uiUtils.getFixedLayer().style.zIndex=this.getDom().style.zIndex-4)},isHidden:function(){return this._hidden},_hide:function(){this._hidden||(this.getDom().style.display="none",this.getDom().style.zIndex="",this._hidden=!0,this.fireEvent("hide"))},open:function(){if(this.autoReset)try{this.reset()}catch(e){this.render(),this.open()}if(this.showAtCenter(),this.iframeUrl)try{this.getDom("iframe").focus()}catch(e){}},_onCloseButtonClick:function(){this.close(!1)},close:function(e){!1!==this.fireEvent("close",e)&&this._hide()}},at.inherits(mt,ct),ht=y.editor.utils,ft=y.editor.ui.Menu,pt=y.editor.ui.SplitButton,(gt=y.editor.ui.MenuButton=function(e){this.initOptions(e),this.initMenuButton()}).prototype={initMenuButton:function(){var t=this
this.uiName="menubutton",this.popup=new ft({items:t.items,className:t.className,editor:t.editor}),this.popup.addListener("show",function(){for(var e=0;e<this.items.length;e++)this.items[e].removeState("checked"),this.items[e].value==t._value&&(this.items[e].addState("checked"),this.value=t._value)}),this.initSplitButton()},setValue:function(e){this._value=e}},ht.inherits(gt,pt),function(){var c=y.editor.utils,u=y.editor.ui,t=u.Dialog
u.buttons={},u.Dialog=function(e){var i=new t(e)
return i.addListener("hide",function(){if(i.editor){var e=i.editor
try{if(Z.gecko){var t=e.window.scrollY,n=e.window.scrollX
e.body.focus(),e.window.scrollTo(n,t)}else e.focus()}catch(e){}}}),i}
for(var s={edittable:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=pages/editor/plugin/table/edittable_tmpl",edittd:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=pages/editor/plugin/table/edittd_tmpl"},e=["undo","redo","formatmatch","bold","italic","underline","fontborder","indent","strikethrough","pasteplain","selectall","horizontal","removeformat",,"insertparagraphbeforetable","insertlist","insertrow","insertcol","mergeright","mergedown","deleterow","deletecol","splittorows","splittocols","splittocells","mergecells","deletetable","more"],d={undo:{id:"122325",key:"20"},redo:{id:"122325",key:"23"},horizontal:{id:"122325",key:"29"},removeformat:{id:"122325",key:"31"},formatmatch:{id:"122325",key:"33"},bold:{id:"122325",key:"45"},italic:{id:"122325",key:"47"},underline:{id:"122325",key:"49"},strikethrough:{id:"122325",key:"53"},indent:{id:"122325",key:"71"},justifyleft:{id:"122325",key:"73"},justifycenter:{id:"122325",key:"75"},justifyright:{id:"122325",key:"77"},justifyjustify:{id:"122325",key:"79"},imagenone:{id:"122333",key:"21"},imageleft:{id:"122333",key:"23"},imageright:{id:"122333",key:"25"},inserttable:{id:"122325",key:"125"}},n=0;r=e[n++];)r=r.toLowerCase(),u[r]=function(l){return function(a){var s=new u.Button({className:"edui-for-"+l,title:a.options.labelMap[l]||a.getLang("labelMap."+l)||"",onclick:function(){a.execCommand(l)
var e=d[l]
e&&a.fireEvent("reportToolbarClick",e.id,e.key,1)},theme:a.options.theme,showText:!1})
return u.buttons[l]=s,a.addListener("selectionchange",function(e,t,n,i){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{},r=a.queryCommandState(l,{allDomInRange:o.allDomInRange||[]});-1==r?(s.setDisabled(!0),s.setChecked(!1)):n||(s.setDisabled(!1),s.setChecked(r))}),s}}(r)
u.cleardoc=function(e){var t=new u.Button({className:"edui-for-cleardoc",title:e.options.labelMap.cleardoc||e.getLang("labelMap.cleardoc")||"",theme:e.options.theme,onclick:function(){confirm(e.getLang("confirmClear"))&&e.execCommand("cleardoc")}})
return u.buttons.cleardoc=t,e.addListener("selectionchange",function(){t.setDisabled(-1==e.queryCommandState("cleardoc"))}),t}
var i={justify:["left","right","center","justify"],imagefloat:["none","left","center","right"]}
for(var o in i)!function(l,e){for(var t,n=0;t=e[n++];)!function(s){var t=l.replace("float","")+s
u[t]=function(r){var a=new u.Button({className:"edui-for-"+t,title:r.options.labelMap[t]||r.getLang("labelMap."+t)||"",theme:r.options.theme,onclick:function(){r.execCommand(l,s)
var e=d[t]
e&&r.fireEvent("reportToolbarClick",e.id,e.key,1)}})
return u.buttons[l+s]=a,r.addListener("selectionchange",function(e,t,n,i){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{}
a.setDisabled(-1==r.queryCommandState(l,s,{allDomInRange:o.allDomInRange||[]})),a.setChecked(r.queryCommandValue(l,s)==s&&!n)}),a}}(t)}(o,i[o])
var r,a={forecolor:{pv:[{id:"122333",key:"114"},{id:"122325",key:"55"}],recently:{id:"122325",key:"57"},basic:{id:"122325",key:"59"},input:{id:"122325",key:"61"},button:{id:"122333",key:"115"},okBtn:{id:"122333",key:"117"},noColor:{id:"122333",key:"119"}},backcolor:{pv:[{id:"122333",key:"121"},{id:"122325",key:"63"}],recently:{id:"122325",key:"65"},basic:{id:"122325",key:"67"},input:{id:"122325",key:"69"},button:{id:"122333",key:"122"},okBtn:{id:"122333",key:"124"},noColor:{id:"122333",key:"126"}}},l=function(e){var t=0<arguments.length&&void 0!==e?e:{},n=a[t.cmd][t.type]
if(n){var i=[].concat(a[t.cmd].pv)
i.push({id:n.id,key:n.key}),t.editor.fireEvent("reportToolbarClick",i)}}
for(n=0;r=["backcolor","forecolor"][n++];)u[r]=function(s){return function(r){var a=new u.ColorButton({className:"edui-for-"+s,color:"default",storekey:s,title:r.options.labelMap[s]||r.getLang("labelMap."+s)||"",editor:r,onpickcolor:function(e,t,n){var i=2<arguments.length&&void 0!==n?n:{}
r.execCommand(s,t),l({editor:r,cmd:s,type:i.type})},onpicknocolor:function(){r.execCommand(s,"default"),this.setColor("transparent"),this.color="default",l({editor:r,cmd:s,type:"noColor"})},onbuttonclick:function(){r.execCommand(s,this.color),l({editor:r,cmd:s,type:"button"})}})
return u.buttons[s]=a,r.addListener("selectionchange",function(e,t,n,i){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{}
a.setDisabled(-1==r.queryCommandState(s,{allDomInRange:o.allDomInRange||[]}))}),a}}(r)
var m={noOk:[],ok:["edittable","edittd"]}
for(var o in m)!function(a,e){for(var t,n=0;t=e[n++];)Z.opera&&"searchreplace"===t||function(r){u[r]=function(t,e,n){var i
e=e||(t.options.iframeUrlMap||{})[r]||s[r],n=t.options.labelMap[r]||t.getLang("labelMap."+r)||"",e&&(i=new u.Dialog(c.extend({iframeUrl:e,editor:t,className:"edui-for-"+r,title:n,holdScroll:"insertimage"===r,closeDialog:t.getLang("closeDialog")},"ok"==a?{buttons:[{className:"edui-okbutton",label:t.getLang("ok"),editor:t,onclick:function(){i.close(!0)}},{className:"edui-cancelbutton",label:t.getLang("cancel"),editor:t,onclick:function(){i.close(!1)}}]}:{})),t.ui._dialogs[r+"Dialog"]=i)
var o=new u.Button({className:"edui-for-"+r,title:n,onclick:function(){if(i)switch(r){case"wordimage":t.execCommand("wordimage","word_img"),t.word_img&&(i.render(),i.open())
break
case"scrawl":-1!=t.queryCommandState("scrawl")&&(i.render(),i.open())
break
default:i.render(),i.open()}},theme:t.options.theme,disabled:"scrawl"==r&&-1==t.queryCommandState("scrawl")})
return u.buttons[r]=o,t.addListener("selectionchange",function(){if(!(r in{edittable:1})){var e=t.queryCommandState(r)
o.getDom()&&(o.setDisabled(-1==e),o.setChecked(e))}}),o}}(t.toLowerCase())}(o,m[o])
u.fontfamily=function(o,e,t){if(e=o.options.fontfamily||[],t=o.options.labelMap.fontfamily||o.getLang("labelMap.fontfamily")||"",e.length){for(var n,i=0,r=[];n=e[i];i++){var a=o.getLang("fontfamily")[n.name]||""
s=n.label||a,l=n.val,r.push({label:s,value:l,theme:o.options.theme,renderLabelHtml:function(){return'<div class="edui-label %%-label" style="font-family:'+c.unhtml(this.value)+'">'+(this.label||"")+"</div>"}})}var s,l,d=new u.Combox({editor:o,items:r,onselect:function(e,t){o.execCommand("FontFamily",this.items[t].value)},onbuttonclick:function(){this.showPopup()},title:t,initValue:t,className:"edui-for-fontfamily",indexByValue:function(e){if(e)for(var t,n=0;t=this.items[n];n++)if(-1!=t.value.indexOf(e))return n
return-1}})
return u.buttons.fontfamily=d,o.addListener("selectionchange",function(e,t,n){if(!n)if(-1==o.queryCommandState("FontFamily"))d.setDisabled(!0)
else{d.setDisabled(!1)
var i=o.queryCommandValue("FontFamily")
i=i&&i.replace(/['"]/g,"").split(",")[0],d.setValue(i)}}),d}},u.fontsize=function(r,e,t){if(t=r.options.labelMap.fontsize||r.getLang("labelMap.fontsize")||"",(e=e||r.options.fontsize||[]).length){for(var n=[],i=0;i<e.length;i++){var o=e[i]+"px"
n.push({label:o,value:o,theme:r.options.theme,renderLabelHtml:function(){return'<div class="edui-label %%-label" style="line-height:1;font-size:'+this.value+'">'+(this.label||"")+"</div>"}})}var a=new u.Combox({editor:r,items:n,title:t,useInput:!(Z.ie&&Z.version<9),initValue:t,onselect:function(e,t){var n=this.items[t].value
r.execCommand("FontSize",n),r.fireEvent("reportToolbarClick","122325","25",1)},onbuttonclick:function(){this.showPopup()},oninputclick:function(){var n=this
setTimeout(function(){var e=n.getDom("wx_input"),t=(parseInt(this.value),e.value)
parseInt(t)
Z.ie?(e.value="",e.focus()):(e.focus(),e.select())},100)},oninputblur:function(){var e=this.getDom("wx_input"),t=e.value,n=parseInt(t),i=parseInt(this.value)
return""==t?(e.value=i+"px",!1):(n<10&&(n=10),50<n&&(n=50),i!=n&&(r.execCommand("FontSize",n+"px"),void r.fireEvent("reportToolbarClick","122325","25",1)))},oninputkeydown:function(e,t){var n=t.keyCode||t.which,i=this.getDom("wx_input")
13==n&&(i.blur(),t.stopPropagation?(t.stopPropagation(),t.preventDefault()):t.cancelBubble=!0)},className:"edui-for-fontsize"})
return u.buttons.fontsize=a,r.addListener("selectionchange",function(e,t,n,i){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{}
n||(-1==r.queryCommandState("FontSize",{allDomInRange:o.allDomInRange})?a.setDisabled(!0):(a.setDisabled(!1),a.setValue(r.queryCommandValue("FontSize"))))}),a}},u.paragraph=function(o,e,t){if(t=o.options.labelMap.paragraph||o.getLang("labelMap.paragraph")||"",e=o.options.paragraph||[],!c.isEmptyObject(e)){var n=[]
for(var i in e)n.push({value:i,label:e[i]||o.getLang("paragraph")[i],theme:o.options.theme,renderLabelHtml:function(){return'<div class="edui-label %%-label"><span class="edui-for-'+this.value+'">'+(this.label||"")+"</span></div>"}})
var r=new u.Combox({editor:o,items:n,title:t,initValue:t,className:"edui-for-paragraph",onselect:function(e,t){o.execCommand("Paragraph",this.items[t].value)},onbuttonclick:function(){this.showPopup()}})
return u.buttons.paragraph=r,o.addListener("selectionchange",function(e,t,n){if(!n)if(-1==o.queryCommandState("Paragraph"))r.setDisabled(!0)
else{r.setDisabled(!1)
var i=o.queryCommandValue("Paragraph");-1!=r.indexByValue(i)?r.setValue(i):r.setValue(r.initValue)}}),r}},u.justify=function(a,n,e){if(e=a.options.labelMap.justify||a.getLang("labelMap.justify")||"",n=a.options.justify||[],!c.isEmptyObject(n)){var i=[],t=function(){var e=a.getLang("justify")[o],t="<div "+(e?'data-tooltip="'+e+'"':"")+'><div class="edui-box edui-button edui-default edui-for-'+o+'"><div class="edui-button-wrap"><div unselectable="on"  class="edui-button-body js_tooltip" onmousedown="return false;"><div class="edui-box edui-icon"></div></div></div></div><span class="edui-button-desc">'+n[o]+"</span></div>"
i.push({value:o,label:t,theme:a.options.theme,renderLabelHtml:function(){return t}})}
for(var o in n)t()
var s=new u.Combox({editor:a,items:i,title:e,initValue:"justify",className:"edui-for-justify",onselect:function(e,t){var n=this.items[t].value,i=n.slice(7)
a.execCommand("justify",i)
var o=d[n]
o&&a.fireEvent("reportToolbarClick",o.id,o.key,1)},onbuttonclick:function(){this.showPopup()},indexByValue:function(e){for(var t,n=0;t=this.items[n++];)if(t.value=="justify"+e)return n-1
return-1}})
return u.buttons.justify=s,a.addListener("selectionchange",function(e,t,n,i){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{}
if(!n){var r=a.queryCommandValue("justify")
if(-1==a.queryCommandState("justify",r,{allDomInRange:o.allDomInRange||[]}))s.setDisabled(!0)
else s.setDisabled(!1),-1!=s.indexByValue(r)?r&&s.setValue((r+"").replace(/cm/,"")):s.setValue((s.initValue+"").replace(/cm/,"")),s.setChecked(a.queryCommandValue("justify",r)==r)}}),s}},u.imagefloat=function(a,n,e){if(e=a.options.labelMap.imagefloat||a.getLang("labelMap.imagefloat")||"",n=a.options.imagefloat||[],!c.isEmptyObject(n)){var i=[],t=function(){var e=a.getLang("imagefloat")[o],t="<div "+(e?'data-tooltip="'+e+'"':"")+'><div class="edui-box edui-button edui-default edui-for-image'+o+'"><div class="edui-button-wrap"><div unselectable="on"  class="edui-button-body js_tooltip" onmousedown="return false;"><div class="edui-box edui-icon"></div></div></div></div><span class="edui-button-desc">'+n[o]+"</span></div>"
i.push({value:o,label:t,theme:a.options.theme,renderLabelHtml:function(){return t}})}
for(var o in n)t()
var s=new u.Combox({editor:a,items:i,title:e,initValue:"none",className:"edui-for-imagefloat",onselect:function(e,t){var n=this.items[t].value,i="image"+n
a.execCommand("imagefloat",n)
var o=d[i]
o&&a.fireEvent("reportToolbarClick",o.id,o.key,1)},onbuttonclick:function(){this.showPopup()}})
return u.buttons.imagefloat=s,a.addListener("selectionchange",function(e,t,n,i){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{}
if(!n){var r=a.queryCommandValue("imagefloat")
if(-1==a.queryCommandState("imagefloat",r,{allDomInRange:o.allDomInRange||[]}))s.setDisabled(!0)
else s.setDisabled(!1),-1!=s.indexByValue(r)?r&&s.setValue((r+"").replace(/cm/,"")):s.setValue((s.initValue+"").replace(/cm/,"")),s.setChecked(a.queryCommandValue("imagefloat",r)==r)}}),s}},u.customstyle=function(o){var e=o.options.customstyle||[],t=o.options.labelMap.customstyle||o.getLang("labelMap.customstyle")||""
if(e.length){for(var n,i=o.getLang("customstyle"),r=0,a=[];n=e[r++];)!function(e){var t={}
t.label=e.label?e.label:i[e.name],t.style=e.style,t.className=e.className,t.tag=e.tag,a.push({label:t.label,value:t,theme:o.options.theme,renderLabelHtml:function(){return'<div class="edui-label %%-label"><'+t.tag+" "+(t.className?' class="'+t.className+'"':"")+(t.style?' style="'+t.style+'"':"")+">"+t.label+"</"+t.tag+"></div>"}})}(n)
var s=new u.Combox({editor:o,items:a,title:t,initValue:t,className:"edui-for-customstyle",onselect:function(e,t){o.execCommand("customstyle",this.items[t].value)},onbuttonclick:function(){this.showPopup()},indexByValue:function(e){for(var t,n=0;t=this.items[n++];)if(t.label==e)return n-1
return-1}})
return u.buttons.customstyle=s,o.addListener("selectionchange",function(e,t,n){if(!n)if(-1==o.queryCommandState("customstyle"))s.setDisabled(!0)
else{s.setDisabled(!1)
var i=o.queryCommandValue("customstyle");-1!=s.indexByValue(i)?s.setValue(i):s.setValue(s.initValue)}}),s}},u.inserttable=function(o,e,t){t=o.options.labelMap.inserttable||o.getLang("labelMap.inserttable")||""
var n=new u.TableButton({editor:o,title:t,className:"edui-for-inserttable",onpicktable:function(e,t,n){o.execCommand("InsertTable",{numRows:n,numCols:t,border:1})
var i=d.inserttable
i&&o.fireEvent("reportToolbarClick",i.id,i.key,1)},onbuttonclick:function(){this.showPopup()}})
return u.buttons.inserttable=n,o.addListener("selectionchange",function(){n.setDisabled(-1==o.queryCommandState("inserttable"))}),n}
var h={1:{id:"122325",key:"109"},1.5:{id:"122325",key:"111"},1.75:{id:"122325",key:"113"},2:{id:"122325",key:"115"},3:{id:"122325",key:"117"},4:{id:"122325",key:"119"},5:{id:"122325",key:"121"}}
u.lineheight=function(s){var e=s.options.lineheight||[]
if(e.length){for(var t,n=0,i=[];t=e[n++];)i.push({label:t,value:t,theme:s.options.theme,onclick:function(){s.execCommand("lineheight",this.value)
var e=h[this.value]
e&&s.fireEvent("reportToolbarClick",[{id:"122325",key:"107"},{id:e.id,key:e.key}])}})
var l=new u.MenuButton({editor:s,className:"edui-for-lineheight",title:s.options.labelMap.lineheight||s.getLang("labelMap.lineheight")||"",items:i,onbuttonclick:function(){var e=s.queryCommandValue("LineHeight")||this.value
s.execCommand("LineHeight",e)}})
return u.buttons.lineheight=l,s.addListener("selectionchange",function(e,t,n,i){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{},r=s.queryCommandState("LineHeight",{allDomInRange:o.allDomInRange||[]})
if(-1==r)l.setDisabled(!0)
else{l.setDisabled(!1)
var a=s.queryCommandValue("LineHeight")
a&&l.setValue((a+"").replace(/cm/,"")),l.setChecked(r)}}),l}},u.justifyindent=function(s){var e=s.options.justifyindent||[]
if(!e.length)return null
for(var t,n=0,i=[];t=e[n++];)i.push({label:t.name,value:t.val,theme:s.options.theme,onclick:function(){s.execCommand("justifyindent",this.value),s.fireEvent("reportToolbarClick","122325","81",1)}})
var l=new u.MenuButton({editor:s,className:"edui-for-justifyindent",title:s.options.labelMap.justifyindent||s.getLang("labelMap.justifyindent")||"",items:i,onbuttonclick:function(){var e=s.queryCommandValue("justifyindent")||this.value
s.execCommand("justifyindent",e)}})
return u.buttons.justifyindent=l,s.addListener("selectionchange",function(e,t,n,i){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{},r=s.queryCommandState("justifyindent",{allDomInRange:o.allDomInRange||[]})
if(-1==r)l.setDisabled(!0)
else{l.setDisabled(!1)
var a=s.queryCommandValue("justifyindent")
a&&l.setValue((a+"").replace(/%/,"")),l.setChecked(r)}}),l}
for(var f,p={top:{pv:{id:"122325",key:"83"},5:{id:"122325",key:"85"},10:{id:"122325",key:"87"},15:{id:"122325",key:"89"},20:{id:"122325",key:"91"},25:{id:"122325",key:"93"}},bottom:{pv:{id:"122325",key:"95"},5:{id:"122325",key:"97"},10:{id:"122325",key:"99"},15:{id:"122325",key:"101"},20:{id:"122325",key:"103"},25:{id:"122325",key:"105"}}},g=["top","bottom"],v=0;f=g[v++];)!function(a){u["rowspacing"+a]=function(n){var e=n.options["rowspacing"+a]||[]
if(!e.length)return null
for(var t,i=0,o=[];t=e[i++];)o.push({label:t,value:t,theme:n.options.theme,onclick:function(){n.execCommand("rowspacing",this.value,a)
var e=p[a].pv,t=p[a][this.value]
e&&t&&n.fireEvent("reportToolbarClick",[{id:e.id,key:e.key},{id:t.id,key:t.key}])}})
var r=new u.MenuButton({editor:n,className:"edui-for-rowspacing"+a,title:n.options.labelMap["rowspacing"+a]||n.getLang("labelMap.rowspacing"+a)||"",items:o,onbuttonclick:function(){var e=n.queryCommandValue("rowspacing",a)||this.value
n.execCommand("rowspacing",e,a)}})
return u.buttons["rowspacing"+a]=r,n.addListener("selectionchange",function(){var e=n.queryCommandState("rowspacing",a)
if(-1==e)r.setDisabled(!0)
else{r.setDisabled(!1)
var t=n.queryCommandValue("rowspacing",a)
t&&r.setValue((t+"").replace(/%/,"")),r.setChecked(e)}}),r}}(f)
var b={letterspacing:{pv:{id:"122325",key:"123"}},insertorderedlist:{pv:{id:"122333",key:"1"},decimal:{id:"122333",key:"3"},"lower-alpha":{id:"122333",key:"5"},"lower-roman":{id:"122333",key:"7"},"upper-alpha":{id:"122333",key:"9"},"upper-roman":{id:"122333",key:"11"}},insertunorderedlist:{pv:{id:"122333",key:"13"},circle:{id:"122333",key:"15"},disc:{id:"122333",key:"17"},square:{id:"122333",key:"19"}}}
u.letterspacing=function(s){function e(){s.execCommand(l,this.value)
var e=b[l].pv,t=b[l][this.value],n=[]
e&&n.push({id:e.id,key:e.key}),t&&n.push({id:t.id,key:t.key}),0<n.length&&s.fireEvent("reportToolbarClick",n)}var l="letterspacing",t=s.options[l],n=[]
for(var i in t)n.push({label:t[i]||s.getLang()[l][i]||"",value:i,theme:s.options.theme,onclick:e})
var d=new u.MenuButton({editor:s,className:"edui-for-letterspacing",title:s.getLang("labelMap."+l)||"",items:n,onbuttonclick:function(){var e=s.queryCommandValue(l)||this.value
s.execCommand(l,e)}})
return u.buttons[l]=d,s.addListener("selectionchange",function(e,t,n,i){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{},r=s.queryCommandState(l,{allDomInRange:o.allDomInRange||[]})
if(-1==r)d.setDisabled(!0)
else{d.setDisabled(!1)
var a=s.queryCommandValue(l)
d.setValue(a),d.setChecked(r)}}),d},u.insertlist=function(s,e,t){t=s.options.labelMap.insertlist||s.getLang("labelMap.insertlist")||"",e=s.options.insertlist||[]
var l=s.options.insertorderedlist||[],d=s.options.insertunorderedlist||[]
if(!c.isEmptyObject(e)){var n=[]
for(var i in e)n.push({value:i,label:e[i]||s.getLang("insertlist")[i],theme:s.options.theme,renderLabelHtml:function(){return'<div class="edui-label %%-label"><span class="edui-for-'+this.value+'">'+(this.label||"")+"</span></div>"}})
var a=new u.Combox({editor:s,items:n,title:t,initValue:'<div class="edui-box edui-icon edui-default"></div>',className:"edui-for-insertunorderedlist",onselect:function(e,t){var n=this.items[t].value,i=null
if(-1!==Object.keys(l).indexOf(n))s.execCommand("insertorderedlist",n),i="insertorderedlist"
else{if(-1===Object.keys(d).indexOf(n))return
s.execCommand("insertunorderedlist",n),i="insertunorderedlist"}var o=b[i].pv,r=b[i][n],a=[]
o&&a.push({id:o.id,key:o.key}),r&&a.push({id:r.id,key:r.key}),0<a.length&&s.fireEvent("reportToolbarClick",a)},onbuttonclick:function(){this.showPopup()},selectByIndex:function(e){e<this.items.length&&!1!==this.fireEvent("select",e)&&(this.selectedIndex=e,this.value=this.items[e].value)}})
return u.buttons.insertlist=a,s.addListener("selectionchange",function(e,t,n,i){var o=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{}
if(!n){var r=s.queryCommandValue("insertlist")
if(-1!==Object.keys(l).indexOf(r)?0:-1!==Object.keys(d).indexOf(r)&&0,-1==s.queryCommandState("insertlist",{allDomInRange:o.allDomInRange||[]}))a.setDisabled(!0)
else{a.setDisabled(!1)
s.queryCommandValue("insertlist")
a.setValue(a.initValue)}}}),a}}}(),function(){var t=y.editor.utils,n=y.editor.ui.uiUtils,r=y.editor.ui.UIBase,C=y.editor.dom.domUtils,a=[]
function s(e){this.initOptions(e),this.initEditorUI()}s.prototype={uiName:"editor",initEditorUI:function(){(this.editor.ui=this)._dialogs={},this.initUIBase(),this._initToolbars()
var n=this.editor,i=this
n.addListener("ready",function(){if(n.getDialog=function(e){return n.ui._dialogs[e+"Dialog"]},C.on(n.window,"scroll",function(e){y.editor.ui.Popup.postHide(e)}),n.options.elementPathEnabled&&(n.ui.getDom("elementpath").innerHTML='<div class="edui-editor-breadcrumb">'+n.getLang("elementPathTip")+":</div>"),n.options.scaleEnabled?(n.ui._scale(),n.autoHeightEnabled&&n.disableAutoHeight(),i.enableScale()):"function"==typeof i.disableScale&&i.disableScale(),!n.options.elementPathEnabled&&!n.options.scaleEnabled){var e=n.ui.getDom("elementpath"),t=n.ui.getDom("scale")
e&&(e.style.display="none"),t&&(t.style.display="none")}n.selection.isFocus()&&n.fireEvent("selectionchange",!1,!0,"ready")}),n.addListener("mousedown",function(e,t){var n=t.target||t.srcElement
y.editor.ui.Popup.postHide(t,n),y.editor.ui.ShortCutMenu.postHide(t)})
var o,e,r=!1
n.addListener("afterpaste",function(){n.queryCommandState("pasteplain")||(y.editor.ui.PastePicker&&(o=new y.editor.ui.Popup({content:new y.editor.ui.PastePicker({editor:n}),editor:n,className:"edui-wordpastepop"})).render(),r=!0)}),n.addListener("afterinserthtml",function(){clearTimeout(e),e=setTimeout(function(){if(o&&(r||n.ui._isTransfer)){if(o.isHidden()){var e=C.createElement(n.document,"span",{style:"line-height:0px;",innerHTML:"\ufeff"})
n.selection.getRange().insertNode(e)
var t=m(e,"firstChild","previousSibling")
t&&o.showAnchor(3==t.nodeType?t.parentNode:t),C.remove(e)}else o.show()
delete n.ui._isTransfer,r=!1}},200)}),n.addListener("contextmenu",function(e,t){y.editor.ui.Popup.postHide(t)}),n.addListener("keydown",function(e,t){o&&o.dispose(t)
var n=t.keyCode||t.which
t.altKey&&90==n&&UE.ui.buttons.fullscreen&&UE.ui.buttons.fullscreen.onclick()}),n.addListener("selectionchange",function(){n.options.elementPathEnabled&&i[(-1==n.queryCommandState("elementpath")?"dis":"en")+"ableElementPath"](),n.options.scaleEnabled&&i[(-1==n.queryCommandState("scale")?"dis":"en")+"ableScale"]()})},_initToolbars:function(){for(var e=this.editor,t=this.toolbars||[],n=[],i=["edui-toolbar-primary","edui-toobar-secondary"],o=0;o<t.length;o++){for(var r=t[o],a=new y.editor.ui.Toolbar({theme:e.options.theme,className:i[o],id:"js_toolbar_"+o}),s=0;s<r.length;s++){var l=r[s],d=null
"string"==typeof l?("|"==(l=l.toLowerCase())&&(l="Separator"),"||"==l&&(l="Breakline"),y.editor.ui[l]&&(d=new y.editor.ui[l](e))):d=l,d&&d.id&&a.add(d)}n[o]=a}this.toolbars=n},getHtmlTpl:function(){return this.layout({is_illegal:+this.is_illegal||0,length:this.toolbars.length,toolbarBoxHtml:this.renderToolbarBoxHtml(),clickToUpload:this.editor.getLang("clickToUpload")})},showWordImageDialog:function(){this.editor.execCommand("wordimage","word_img"),this._dialogs.wordimageDialog.open()},renderToolbarBoxHtml:function(){for(var e=[],t=0;t<this.toolbars.length;t++)e.push(this.toolbars[t].renderHtml())
return e.join("")},setFullScreen:function(e){var t=this.editor,n=t.container.parentNode.parentNode
if(this._fullscreen!=e){if(this._fullscreen=e,this.editor.fireEvent("beforefullscreenchange",e),y.editor.browser.gecko)var i=t.selection.getRange().createBookmark()
if(e){for(;"BODY"!=n.tagName;){var o=y.editor.dom.domUtils.getComputedStyle(n,"position")
a.push(o),n.style.position="static",n=n.parentNode}this._bakHtmlOverflow=document.documentElement.style.overflow,this._bakBodyOverflow=document.body.style.overflow,this._bakAutoHeight=this.editor.autoHeightEnabled,this._bakScrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop),this._bakEditorContaninerWidth=t.iframe.parentNode.offsetWidth,this._bakAutoHeight&&(t.autoHeightEnabled=!1,this.editor.disableAutoHeight()),document.documentElement.style.overflow="hidden",document.body.style.overflow="hidden",this._bakCssText=this.getDom().style.cssText,this._bakCssText1=this.getDom("iframeholder").style.cssText,t.iframe.parentNode.style.width="",this._updateFullScreen()}else{for(;"BODY"!=n.tagName;)n.style.position=a.shift(),n=n.parentNode
this.getDom().style.cssText=this._bakCssText,this.getDom("iframeholder").style.cssText=this._bakCssText1,this._bakAutoHeight&&(t.autoHeightEnabled=!0,this.editor.enableAutoHeight()),document.documentElement.style.overflow=this._bakHtmlOverflow,document.body.style.overflow=this._bakBodyOverflow,t.iframe.parentNode.style.width=this._bakEditorContaninerWidth+"px",window.scrollTo(0,this._bakScrollTop)}if(Z.gecko&&"true"===t.body.contentEditable){var r=document.createElement("input")
document.body.appendChild(r),t.body.contentEditable=!1,setTimeout(function(){r.focus(),setTimeout(function(){t.body.contentEditable=!0,t.fireEvent("fullscreenchanged",e),t.selection.getRange().moveToBookmark(i).select(!0),y.editor.dom.domUtils.remove(r),e&&window.scroll(0,0)},0)},0)}"true"===t.body.contentEditable&&(this.editor.fireEvent("fullscreenchanged",e),this.triggerLayout())}},_updateFullScreen:function(){if(this._fullscreen){var e=n.getViewportRect()
if(this.getDom().style.cssText="border:0;position:absolute;left:0;top:"+(this.editor.options.topOffset||0)+"px;width:"+e.width+"px;height:"+e.height+"px;z-index:"+(+this.getDom().style.zIndex+100),n.setViewportOffset(this.getDom(),{left:0,top:this.editor.options.topOffset||0}),this.editor.setHeight(e.height-this.getDom("toolbarbox").offsetHeight-this.getDom("bottombar").offsetHeight-(this.editor.options.topOffset||0)),Z.gecko)try{window.onresize()}catch(e){}}},_updateElementPath:function(){var e,t=this.getDom("elementpath")
if(this.elementPathEnabled&&(e=this.editor.queryCommandValue("elementpath"))){for(var n,i=[],o=0;n=e[o];o++)i[o]=this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;'+o+'&quot;);">'+n+"</span>")
t.innerHTML='<div class="edui-editor-breadcrumb" onmousedown="return false;">'+this.editor.getLang("elementPathTip")+": "+i.join(" &gt; ")+"</div>"}else t.style.display="none"},disableElementPath:function(){var e=this.getDom("elementpath")
e.innerHTML="",e.style.display="none",this.elementPathEnabled=!1},enableElementPath:function(){this.getDom("elementpath").style.display="",this.elementPathEnabled=!0,this._updateElementPath()},_scale:function(){var n=document,e=this.editor,t=e.container,i=e.document,o=this.getDom("toolbarbox"),r=this.getDom("bottombar"),a=this.getDom("scale"),s=this.getDom("scalelayer"),l=!1,d=null,c=0,u=e.options.minFrameWidth,m=0,h=0,f=0,p=0
function g(){d=C.getXY(t),c=c||e.options.minFrameHeight+o.offsetHeight+r.offsetHeight,s.style.cssText="position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:"+t.offsetWidth+"px;height:"+t.offsetHeight+"px;z-index:"+(e.options.zIndex+1),C.on(n,"mousemove",v),C.on(i,"mouseup",b),C.on(n,"mouseup",b)}function v(e){y()
var t=e||window.event
m=t.pageX||n.documentElement.scrollLeft+t.clientX,h=t.pageY||n.documentElement.scrollTop+t.clientY,f=m-d.x,p=h-d.y,u<=f&&(l=!0,s.style.width=f+"px"),c<=p&&(l=!0,s.style.height=p+"px")}function b(){l&&(l=!1,e.ui._actualFrameWidth=s.offsetWidth-2,t.style.width=e.ui._actualFrameWidth+"px",e.setHeight(s.offsetHeight-r.offsetHeight-o.offsetHeight-2)),s&&(s.style.display="none"),y(),C.un(n,"mousemove",v),C.un(i,"mouseup",b),C.un(n,"mouseup",b)}function y(){Z.ie?n.selection.clear():window.getSelection().removeAllRanges()}this.enableScale=function(){a&&1!=e.queryCommandState("source")&&(a.style.display="",this.scaleEnabled=!0,C.on(a,"mousedown",g))},this.disableScale=function(){a&&(a.style.display="none",this.scaleEnabled=!1,C.un(a,"mousedown",g))}},isFullScreen:function(){return this._fullscreen},postRender:function(){r.prototype.postRender.call(this)
for(var e=0;e<this.toolbars.length;e++)this.toolbars[e].postRender()
function t(){clearTimeout(n),n=setTimeout(function(){i._updateFullScreen()})}var n,i=this,o=y.editor.dom.domUtils
o.on(window,"resize",t),i.addListener("destroy",function(){o.un(window,"resize",t),clearTimeout(n)})},showToolbarMsg:function(e,t){this.getDom("toolbarmsg_label").innerHTML=e,this.getDom("toolbarmsg").style.display="",t||(this.getDom("upload_dialog").style.display="none")},hideToolbarMsg:function(){this.getDom("toolbarmsg").style.display="none"},mapUrl:function(e){return e?e.replace("~/",this.editor.options.UEDITOR_HOME_URL||""):""},triggerLayout:function(){var e=this.getDom()
"1"==e.style.zoom?e.style.zoom="100%":e.style.zoom="1"}},t.inherits(s,y.editor.ui.UIBase)
var l={}
UE.ui.Editor=function(e){var i=new UE.Editor(e),o=(i.options.editor=i).render
return i.render=function(n){n.constructor===String&&(i.key=n,l[n]=i),t.domReady(function(){function e(){if(i.setOpt({labelMap:i.options.labelMap||i.getLang("labelMap")}),new s(i.options),n&&(n.constructor===String&&(n=document.getElementById(n)),n&&n.getAttribute("name")&&(i.options.textarea=n.getAttribute("name")),n&&/script|textarea/gi.test(n.tagName))){var e=document.createElement("div")
n.parentNode.insertBefore(e,n)
var t=n.value||n.innerHTML
i.options.initialContent=/^[\t\r\n ]*$/.test(t)?i.options.initialContent:t.replace(/>[\n\r\t]+([ ]{4})+/g,">").replace(/[\n\r\t]+([ ]{4})+</g,"<").replace(/>[\n\r\t]+</g,"><"),n.className&&(e.className=n.className),n.style.cssText&&(e.style.cssText=n.style.cssText),/textarea/i.test(n.tagName)?(i.textarea=n,i.textarea.style.display="none"):(n.parentNode.removeChild(n),n.id&&(e.id=n.id)),(n=e).innerHTML=""}C.addClass(n,"edui-"+i.options.theme),i.ui.render(n)
i.options
i.container=i.ui.getDom(),i.container.style.cssText="z-index:"+i.options.zIndex,o.call(i,i.ui.getDom("iframeholder"))}i.langIsReady?e():i.addListener("langReady",e)})},i},UE.getEditor=function(e,t){var n=l[e]
return n||(n=l[e]=new UE.ui.Editor(t)).render(e),n},UE.delEditor=function(e){var t;(t=l[e])&&(t.key&&t.destroy(),delete l[e])}}(),vt=y.editor.utils,bt=y.editor.ui.Popup,yt=y.editor.ui.SplitButton,(Ct=y.editor.ui.MultiMenuPop=function(e){this.initOptions(e),this.initMultiMenu()}).prototype={initMultiMenu:function(){var e=this
this.popup=new bt({content:"",editor:e.editor,iframe_rendered:!1,onshow:function(){this.iframe_rendered||(this.iframe_rendered=!0,this.getDom("content").innerHTML='<iframe id="'+e.id+'_iframe" src="'+e.iframeUrl+'" frameborder="0"></iframe>',e.editor.container.style.zIndex&&(this.getDom().style.zIndex=+e.editor.container.style.zIndex+1))}}),this.onbuttonclick=function(){this.showPopup()},this.initSplitButton()}},vt.inherits(Ct,yt),xt=y.editor.ui,wt=xt.UIBase,kt=xt.uiUtils,Et=y.editor.utils,Tt=y.editor.dom.domUtils,Bt=!(St=[]),(It=xt.ShortCutMenu=function(e){this.initOptions(e),this.initShortCutMenu()}).postHide=$t,It.prototype={isHidden:!0,SPACE:5,initShortCutMenu:function(){this.items=this.items||[],this.initUIBase(),this.initItems(),this.initEvent(),St.push(this)},initEvent:function(){var d=this,e=d.editor.document
Tt.on(e,"mousemove",function(e){if(!1===d.isHidden){if(d.getSubMenuMark()||"contextmenu"==d.eventType)return
var t=!0,n=d.getDom(),i=n.offsetWidth,o=n.offsetHeight,r=i/2+d.SPACE,a=o/2,s=Math.abs(e.screenX-d.left),l=Math.abs(e.screenY-d.top)
clearTimeout(Nt),Nt=setTimeout(function(){0<l&&l<a?d.setOpacity(n,"1"):a<l&&l<70+a?(d.setOpacity(n,"0.5"),t=!1):70+a<l&&l<140+a&&d.hide(),t&&0<s&&s<r?d.setOpacity(n,"1"):r<s&&s<r+70?d.setOpacity(n,"0.5"):r+70<s&&s<r+140&&d.hide()})}}),Z.chrome&&Tt.on(e,"mouseout",function(e){var t=e.relatedTarget||e.toElement
null!=t&&"HTML"!=t.tagName||d.hide()}),d.editor.addListener("afterhidepop",function(){d.isHidden||(Bt=!0)})},initItems:function(){if(Et.isArray(this.items))for(var e=0,t=this.items.length;e<t;e++){var n=this.items[e].toLowerCase()
xt[n]&&(this.items[e]=new xt[n](this.editor),this.items[e].className+=" edui-shortcutsubmenu ")}},setOpacity:function(e,t){Z.ie&&Z.version<9?e.style.filter="alpha(opacity = "+100*parseFloat(t)+");":e.style.opacity=t},getSubMenuMark:function(){Bt=!1
for(var e,t=kt.getFixedLayer(),n=Tt.getElementsByTagName(t,"div",function(e){return Tt.hasClass(e,"edui-shortcutsubmenu edui-popup")}),i=0;e=n[i++];)"none"!=e.style.display&&(Bt=!0)
return Bt},show:function(e,t){var n=this,i={},o=this.getDom(),r=kt.getFixedLayer()
function a(e){e.left<0&&(e.left=0),e.top<0&&(e.top=0),o.style.cssText="position:absolute;left:"+e.left+"px;top:"+e.top+"px;"}function s(e){e.tagName||(e=e.getDom()),i.left=parseInt(e.style.left),i.top=parseInt(e.style.top),i.top-=o.offsetHeight+15,a(i)}if(n.eventType=e.type,o.style.cssText="display:block;left:-9999px","contextmenu"==e.type&&t){var l=Tt.getElementsByTagName(r,"div","edui-contextmenu")[0]
l?s(l):n.editor.addListener("aftershowcontextmenu",function(e,t){s(t)})}else(i=kt.getViewportOffsetByEvent(e)).top-=o.offsetHeight+n.SPACE,i.left+=n.SPACE+20,a(i),n.setOpacity(o,.2)
n.isHidden=!1,n.left=e.screenX+o.offsetWidth/2-n.SPACE,n.top=e.screenY-o.offsetHeight/2-n.SPACE,n.editor&&(o.style.zIndex=+n.editor.container.style.zIndex+10,r.style.zIndex=o.style.zIndex-1)},hide:function(){this.getDom()&&(this.getDom().style.display="none"),this.isHidden=!0},postRender:function(){if(Et.isArray(this.items))for(var e,t=0;e=this.items[t++];)e.postRender()},getHtmlTpl:function(){var e
if(Et.isArray(this.items)){e=[]
for(var t=0;t<this.items.length;t++)e[t]=this.items[t].renderHtml()
e=e.join("")}else e=this.items
return'<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >'+e+"</div>"}},Et.inherits(It,wt),Tt.on(document,"mousedown",function(e){$t(e)}),Tt.on(window,"scroll",function(e){$t(e)}),_t=y.editor.utils,Rt=y.editor.ui.UIBase,(Lt=y.editor.ui.Breakline=function(e){this.initOptions(e),this.initSeparator()}).prototype={uiName:"Breakline",initSeparator:function(){this.initUIBase()},getHtmlTpl:function(){return"<br/>"}},_t.inherits(Lt,Rt)})
"use strict"
define("3rd/editor/common/clear_dom.js",["3rd/editor/plugin/insertcode/insertCodeUtils.js"],function(e,t,n){var o=e("3rd/editor/plugin/insertcode/insertCodeUtils.js"),u={styleKey:["line-height","max-width","letter-spacing","color","font-weight","box-sizing","word-wrap","-webkit-box-sizing","margin","padding","font-family","background-color","white-space","min-height","font-size","background-image","background-clip","background-position","background-repeat","background-size","border","bottom","display","float","height","left","max-height","min-width","text-align","text-decoration","top","position","z-index","visibility","clear"],tagName:","+["strong","span","section","br"].join(",")+",",deepLen:20,flatLen:20,data:[]}
function h(e,t){if(t.push({}),d(e))t[t.length-1]={type:"invisible",dom:e},t.push({})
else if(2!==l({node:e,checkParent:!1}))for(var n=0,r=0;r<e.childNodes.length;r++){var a=e.childNodes[r]
1==a.nodeType?f(a)&&0<=u.tagName.indexOf(","+a.nodeName.toLowerCase()+",")?++n>=u.flatLen&&u.data.push({type:"flat",dom:a,parent:e}):(n=0,i(a,t)):n=0}}function i(e,t){var n=t[t.length-1]
if(d(e))n.parent&&"deep"==n.type&&n.deep>=u.deepLen&&(n.end=e.parentElement,t.push({})),t[t.length-1]={type:"invisible",dom:e},t.push({})
else if(1==e.nodeType&&0<=u.tagName.indexOf(","+e.nodeName.toLowerCase()+",")&&1==e.childElementCount&&2!==l({node:e,checkParent:!1})){n.parent?n.deep++:(n.parent=e,n.type="deep",n.deep=0),(r=a(e))&&(n.styleHeight=r),i(e.firstElementChild,t)}else{var r
if(n.parent&&"deep"==n.type&&n.deep>=u.deepLen)1==e.nodeType?n.end=e:n.end=e.parentElement,(r=a(e))&&(n.styleHeight=r),t.push({})
else t.splice(t.length-1,1),h(e,t)}}function a(e){if(!e||1!=e.nodeType)return""
var t=e.style.height||e.getAttribute("height")
return t&&-1==t.indexOf("%")&&(t=parseInt(t))&&(t+="px"),t||""}function f(e){var t=!1
if(null!==e.childElementCount)t=!e.childElementCount
else for(var n=0;n<e.childNodes.length;n++){if(1==e.childNodes[n].nodeType){t=!1
break}}return t&&function(e){for(var t=0;t<e.childNodes.length;t++){var n=e.childNodes[t]
if(3==n.nodeType&&$.trim(n.nodeValue))return!1}return!0}(e)}function c(e,t){var n=e.cloneNode(!0),r=function(e,t){for(var n={},r=window.getComputedStyle(e),a=0,i=u.styleKey.length;a<i;a++){for(var o=u.styleKey[a],d=o.replace(/^\-/,"").split("-"),l=1;l<d.length;l++)d[l]=d[l].charAt(0).toUpperCase()+d[l].substr(1)
var p=d.join("")
"backgroundColor"==p&&"rgba(0,0,0,0)"==r[p].replace(/\s/g,"")||(n[o]=r[p])}(m(e)||s(e))&&(t.styleHeight?n.height=t.styleHeight:n.height="auto")
var g=[]
for(var a in n)g.push(a+":"+n[a])
return g.join(";")}(e,t)
return n.style.cssText=r,n}function d(e){if(!e||1!=e.nodeType||2===l({node:e,checkParent:!1}))return!1
var t=window.getComputedStyle(e),n=e.getBoundingClientRect(),r=t.getPropertyValue("display"),a=t.getPropertyValue("opacity"),i=t.getPropertyValue("visiblity")
return!("none"!==r&&"hidden"!==i&&"0"!==a||m(e)||s(e))||(0===n.width||0===n.height)&&("br"!==e.tagName.toLowerCase()&&("none"===t.clear&&(!(m(e)||s(e)||o.isInCodeBlock(e))&&!!function(e){var t=e.getElementsByTagName("*")
if(t&&0<t.length)for(var n=0,r=t.length;n<r;n++){var a=t[n].getBoundingClientRect()
if(0!=a.width&&0!=a.height)return!1}return!0}(e))))}function s(e){function t(e){if("img"===e.tagName.toLowerCase()&&e.src)return!0
var t=window.getComputedStyle(e).backgroundImage.replace(/['"]/g,"")
return!!/^url\(.+\)$/.test(t)}if(!e||1!=e.nodeType)return!1
if(t(e))return!0
var n=e.getElementsByTagName("img")
if(n&&0<n.length)for(var r=0,a=n.length;r<a;r++)if(n[r].src)return!0
var i=e.getElementsByTagName("*")
if(i&&0<i.length)for(r=0,a=i.length;r<a;r++)if(t(i[r]))return!0
return!1}function m(e){if(!e||1!=e.nodeType)return!1
var t=e.tagName.toLowerCase()
if("svg"===t||"animate"===t)return!0
var n=e.getElementsByTagName("svg")
if(n&&0<n.length)return!0
var r=e.getElementsByTagName("animate")
return!!(r&&0<r.length)}function l(e){var t=0<arguments.length&&void 0!==e?e:{},n=t.node,r=t.checkParent
if(!n)return 2
var a=n
if(1!==a.nodeType&&(a=a.parentElement),!a||1!==a.nodeType)return 2
if(!r)return"false"==a.contentEditable+""?2:3
for(;a;){var i=a.contentEditable+""
if("false"==i)return 2
if("true"==i)return 1
a=a.parentElement}return 2}return{init:function(e){u.data=[]
for(var t=e.Eles,n=null,r=0,a=0,i=t.length;a<i;a++)f(n=t[a])&&0<=u.tagName.indexOf(","+n.nodeName.toLowerCase()+",")?++r>=u.flatLen&&u.data.push({type:"flat",dom:n,parent:n.parentElement}):(r=0,h(n,u.data))
var o=r=0,d=0,l=0,p=0
for(a=0,i=u.data.length;a<i;a++){"invisible"==(g=u.data[a]).type&&g.dom&&g.dom.parentElement&&(o++,g.dom.parentElement.removeChild(g.dom))}for(a=0,i=u.data.length;a<i;a++){"flat"==(g=u.data[a]).type&&g.dom&&g.parent&&(p++,g.parent.removeChild(g.dom))}for(a=0,i=u.data.length;a<i;a++){var g
if("deep"==(g=u.data[a]).type&&g.parent&&g.end&&g.deep>=u.deepLen){d++,l+=g.deep
var s=c(g.end,{styleHeight:g.styleHeight})
g.parent.innerHTML="",g.parent.appendChild(s)}}return u.data=[],{deepCount:d,perDeepLen:parseInt(l/d),invisibleCount:o,flatCount:p}}}})
define("3rd/editor/plugin/insertcode/insertCodeUtils.js",["3rd/editor/common/domUtils.js"],function(a,e,n){"use strict"
var t=a("3rd/editor/common/domUtils.js").domUtils,o={outputMainTagName:"section",outputMainClass:"code-snippet__fix",outputLineMainTagName:"ul",outputLineItemTagName:"li",outputLineMainClass:"code-snippet__line-index",inputCodeBlockClass:"code-snippet code-snippet_nowrap",codeBlockTagName:"pre",codeBlockClass:"code-snippet__js",languageAttr:"data-lang",lineTagName:"code",lineContainTagName:"span",lineContainClass:"code-snippet_outer",tabSize:"  ",classPrefix:"code-snippet__"}
o.lineStartTag="<"+o.lineTagName+">",o.lineEndTag="</"+o.lineTagName+">",o.lineContainStartTag="<"+o.lineContainTagName+" class="+o.lineContainClass+">",o.lineContainEndTag="</"+o.lineContainTagName+">",n.exports={getCodeLineStr:function(a){return a=a||t.fillChar,o.lineStartTag+o.lineContainStartTag+a+o.lineContainEndTag+o.lineEndTag},languageAttr:o.languageAttr,lineTagName:o.lineTagName,tabSize:o.tabSize,lineStartTag:o.lineStartTag,lineEndTag:o.lineEndTag,classPrefix:o.classPrefix,lineContainTagName:o.lineContainTagName,lineContainStartTag:o.lineContainStartTag,lineContainEndTag:o.lineContainEndTag,getCodeBlockStr:function(a,e){return e?"<"+o.codeBlockTagName+' class="'+o.inputCodeBlockClass+" "+o.codeBlockClass+'" '+o.languageAttr+'="'+e+'">'+a+"</"+o.codeBlockTagName+">":"<"+o.codeBlockTagName+' class="'+o.inputCodeBlockClass+" "+o.codeBlockClass+'">'+a+"</"+o.codeBlockTagName+">"},codeBlockClass:o.codeBlockClass,codeBlockTagName:o.codeBlockTagName,isInCodeBlock:function(a){var e=""
if(!a||3!==a.nodeType&&1!==a.nodeType||1===a.nodeType&&(e=a.nodeName.toLowerCase())&&e!==o.codeBlockTagName&&e!==o.lineTagName&&e!==o.lineContainTagName)return!1
for(var n,t=a;t;){if(!0==!!((n=t)&&1===n.nodeType&&n.nodeName.toLowerCase()===o.codeBlockTagName&&0<=(n.className||"").indexOf(o.codeBlockClass)))return!0
t=t.parentNode}return!1},lineContainClass:o.lineContainClass,outputMainTagName:o.outputMainTagName,outputMainClass:o.outputMainClass,outputLineMainTagName:o.outputLineMainTagName,outputLineItemTagName:o.outputLineItemTagName,outputLineMainClass:o.outputLineMainClass,inputCodeBlockClass:o.inputCodeBlockClass}})
"use strict"
define("3rd/editor/common/colorpicker.js",["widget/colorpicker/colorpicker.css"],function(t,e,o){var k
return t("widget/colorpicker/colorpicker.css"),function(l,n,c){var h,d,v=l.SVGAngle||n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML",u=['<div class="picker-wrapper">','<div class="picker"></div>','<div class="picker-indicator"></div>',"</div>",'<div class="slide-wrapper">','<div class="slide"></div>','<div class="slide-indicator"></div>',"</div>"].join("")
function a(t){if(l.event&&l.event.contentOverflow!==c)return{x:l.event.offsetX,y:l.event.offsetY}
if(t.offsetX!==c&&t.offsetY!==c)return{x:t.offsetX,y:t.offsetY}
var e=t.target.parentNode.parentNode
return{x:t.layerX-e.offsetLeft,y:t.layerY-e.offsetTop}}function t(t,e,o){for(var i in t=n.createElementNS("http://www.w3.org/2000/svg",t),e)t.setAttribute(i,e[i])
"[object Array]"!=Object.prototype.toString.call(o)&&(o=[o])
for(var s=0,r=o[0]&&o.length||0;s<r;s++)t.appendChild(o[s])
return t}function f(t){var e,o,i,s,r,n=t.h%360/60
s=(r=t.v*t.s)*(1-Math.abs(n%2-1)),e=o=i=t.v-r,e+=[r,s,0,0,s,r][n=~~n],o+=[s,r,r,s,0,0][n],i+=[0,0,s,r,r,s][n]
var l=Math.floor(255*e),c=Math.floor(255*o),a=Math.floor(255*i)
return{r:l,g:c,b:a,hex:"#"+(16777216|a|c<<8|l<<16).toString(16).slice(1)}}function e(t){var e,o,i=t.r,s=t.g,r=t.b
return(1<t.r||1<t.g||1<t.b)&&(i/=255,s/=255,r/=255),{h:(0==(o=(e=Math.max(i,s,r))-Math.min(i,s,r))?null:e==i?(s-r)/o+(s<r?6:0):e==s?(r-i)/o+2:(i-s)/o+4)%6*60,s:0==o?0:o/e,v:e}}function g(s,r,n){return function(t){var e=a(t=t||l.event)
s.h=e.y/r.offsetHeight*360+15
var o=f({h:s.h,s:1,v:1}),i=f({h:s.h,s:s.s,v:s.v})
return n.style.backgroundColor=o.hex,s.callback&&s.callback(i.hex,{h:s.h-15,s:s.s,v:s.v},{r:i.r,g:i.g,b:i.b},c,e),t.stopPropagation?(t.stopPropagation(),t.preventDefault()):t.cancelBubble=!0,!1}}function y(r,n){return function(t){var e=a(t=t||l.event),o=n.offsetWidth,i=n.offsetHeight
r.s=e.x/o,r.v=(i-e.y)/i
var s=f(r)
return r.callback&&r.callback(s.hex,{h:r.h-15,s:r.s,v:r.v},{r:s.r,g:s.g,b:s.b},e),t.stopPropagation?(t.stopPropagation(),t.preventDefault()):t.cancelBubble=!0,!1}}"SVG"==v?(d=t("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"100%",height:"100%"},[t("defs",{},t("linearGradient",{id:"gradient-hsv",x1:"0%",y1:"100%",x2:"0%",y2:"0%"},[t("stop",{offset:"0%","stop-color":"#FF0000","stop-opacity":"1"}),t("stop",{offset:"13%","stop-color":"#FF00FF","stop-opacity":"1"}),t("stop",{offset:"25%","stop-color":"#8000FF","stop-opacity":"1"}),t("stop",{offset:"38%","stop-color":"#0040FF","stop-opacity":"1"}),t("stop",{offset:"50%","stop-color":"#00FFFF","stop-opacity":"1"}),t("stop",{offset:"63%","stop-color":"#00FF40","stop-opacity":"1"}),t("stop",{offset:"75%","stop-color":"#0BED00","stop-opacity":"1"}),t("stop",{offset:"88%","stop-color":"#FFFF00","stop-opacity":"1"}),t("stop",{offset:"100%","stop-color":"#FF0000","stop-opacity":"1"})])),t("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"url(#gradient-hsv)"})]),h=t("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"100%",height:"100%"},[t("defs",{},[t("linearGradient",{id:"gradient-black",x1:"0%",y1:"100%",x2:"0%",y2:"0%"},[t("stop",{offset:"0%","stop-color":"#000000","stop-opacity":"1"}),t("stop",{offset:"100%","stop-color":"#CC9A81","stop-opacity":"0"})]),t("linearGradient",{id:"gradient-white",x1:"0%",y1:"100%",x2:"100%",y2:"100%"},[t("stop",{offset:"0%","stop-color":"#FFFFFF","stop-opacity":"1"}),t("stop",{offset:"100%","stop-color":"#CC9A81","stop-opacity":"0"})])]),t("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"url(#gradient-white)"}),t("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"url(#gradient-black)"})])):"VML"==v&&(d=['<DIV style="position: relative; width: 100%; height: 100%">','<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>',"</v:rect>","</DIV>"].join(""),h=['<DIV style="position: relative; width: 100%; height: 100%">','<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',"</v:rect>",'<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',"</v:rect>","</DIV>"].join(""),n.namespaces.v||n.namespaces.add("v","urn:schemas-microsoft-com:vml","#default#VML"))
var m=0
function b(t,e,o){t.attachEvent?t.attachEvent("on"+e,o):t.addEventListener&&t.addEventListener(e,o,!1)}function x(t,e,o){var i=!1
b(e,"mousedown",function(t){i=!0}),b(e,"mouseup",function(t){i=!1}),b(e,"mouseout",function(t){i=!1}),b(e,"mousemove",function(t){i&&o(t)})}function o(t,e,o,i){t.h=e.h%360,t.s=e.s,t.v=e.v
var s=f(t),r={y:t.h*t.slideElement.offsetHeight/360,x:0},n=t.pickerElement.offsetHeight,l={x:t.s*t.pickerElement.offsetWidth,y:n-t.v*n}
return t.pickerElement.style.backgroundColor=f({h:t.h,s:1,v:1}).hex,t.callback&&t.callback(i||s.hex,{h:t.h,s:t.s,v:t.v},o||{r:s.r,g:s.g,b:s.b},l,r),t}(k=function(t,r,e){if(!(this instanceof k))return new k(t,r,e)
if(this.h=0,this.s=1,this.v=1,e)this.callback=e,this.pickerElement=r,this.slideElement=t
else{var o=t
o.innerHTML=u,this.slideElement=o.getElementsByClassName("slide")[0],this.pickerElement=o.getElementsByClassName("picker")[0]
var n=o.getElementsByClassName("slide-indicator")[0],l=o.getElementsByClassName("picker-indicator")[0]
k.fixIndicators(n,l),this.callback=function(t,e,o,i,s){k.positionIndicators(n,l,s,i),r(t,e,o)}}if("SVG"==v){var i=d.cloneNode(!0),s=h.cloneNode(!0),c=i.getElementById("gradient-hsv"),a=i.getElementsByTagName("rect")[0]
c.id="gradient-hsv-"+m,a.setAttribute("fill","url(#"+c.id+")")
var f=[s.getElementById("gradient-black"),s.getElementById("gradient-white")],p=s.getElementsByTagName("rect")
f[0].id="gradient-black-"+m,f[1].id="gradient-white-"+m,p[0].setAttribute("fill","url(#"+f[1].id+")"),p[1].setAttribute("fill","url(#"+f[0].id+")"),this.slideElement.appendChild(i),this.pickerElement.appendChild(s),m++}else this.slideElement.innerHTML=d,this.pickerElement.innerHTML=h
b(this.slideElement,"click",g(this,this.slideElement,this.pickerElement)),b(this.pickerElement,"click",y(this,this.pickerElement)),x(this,this.slideElement,g(this,this.slideElement,this.pickerElement)),x(this,this.pickerElement,y(this,this.pickerElement))}).hsv2rgb=function(t){var e=f(t)
return delete e.hex,e},k.hsv2hex=function(t){return f(t).hex},k.rgb2hsv=e,k.rgb2hex=function(t){return f(e(t)).hex},k.hex2hsv=function(t){return e(k.hex2rgb(t))},k.hex2rgb=function(t){return{r:parseInt(t.substr(1,2),16),g:parseInt(t.substr(3,2),16),b:parseInt(t.substr(5,2),16)}},k.prototype.setHsv=function(t){return o(this,t)},k.prototype.setRgb=function(t){return o(this,e(t),t)},k.prototype.setHex=function(t){return o(this,k.hex2hsv(t),c,t)},k.positionIndicators=function(t,e,o,i){o&&(t.style.top=o.y-t.offsetHeight/2+"px"),i&&(e.style.top=i.y-e.offsetHeight/2+"px",e.style.left=i.x-e.offsetWidth/2+"px")},k.fixIndicators=function(t,e){e.style.pointerEvents="none",t.style.pointerEvents="none"}}(window,window.document),k})
"use strict"
define("3rd/editor/common/selection.js",["3rd/editor/common/browser.js","3rd/editor/common/utils.js","3rd/editor/common/dtd.js","3rd/editor/common/domUtils.js","3rd/editor/common/range.js"],function(t,e,n){var s=t("3rd/editor/common/browser.js").browser,f=(t("3rd/editor/common/utils.js").utils,t("3rd/editor/common/dtd.js").dtd),m=t("3rd/editor/common/domUtils.js").domUtils,c=(t("3rd/editor/common/range.js").Range,window.UE.dom)
function l(t,e){var n=m.getNodeIndex;(t=t.duplicate()).collapse(e)
var r=t.parentElement()
if(!r.hasChildNodes())return{container:r,offset:0}
for(var a,i,o=r.children,s=t.duplicate(),c=0,l=o.length-1,d=-1;c<=l;){a=o[d=Math.floor((c+l)/2)],s.moveToElementText(a)
var h=s.compareEndPoints("StartToStart",t)
if(0<h)l=d-1
else{if(!(h<0))return{container:r,offset:n(a)}
c=d+1}}if(-1==d){if(s.moveToElementText(r),s.setEndPoint("StartToStart",t),i=s.text.replace(/(\r\n|\r)/g,"\n").length,o=r.childNodes,!i)return{container:a=o[o.length-1],offset:a.nodeValue.length}
for(var g=o.length;0<i;)i-=o[--g].nodeValue.length
return{container:o[g],offset:-i}}if(s.collapse(0<h),s.setEndPoint(0<h?"StartToStart":"EndToStart",t),!(i=s.text.replace(/(\r\n|\r)/g,"\n").length))return f.$empty[a.tagName]||f.$nonChild[a.tagName]?{container:r,offset:n(a)+(0<h?0:1)}:{container:a,offset:0<h?0:a.childNodes.length}
for(;0<i;)try{var u=a
i-=(a=a[0<h?"previousSibling":"nextSibling"]).nodeValue.length}catch(t){return{container:r,offset:n(u)}}return{container:a,offset:0<h?-i:a.nodeValue.length+i}}function r(t){var e
try{e=t.getNative().createRange()}catch(t){return null}var n=e.item?e.item(0):e.parentElement()
return(n.ownerDocument||n)===t.document?e:null}return(c.Selection=function(t){var e,n=this
n.document=t,s.ie9below&&(e=m.getWindow(t).frameElement,m.on(e,"beforedeactivate",function(){n._bakIERange=n.getIERange()}),m.on(e,"activate",function(){try{!r(n)&&n._bakIERange&&n._bakIERange.select()}catch(t){}n._bakIERange=null})),e=t=null}).prototype={rangeInBody:function(t,e){var n=s.ie9below||e?t.item?t.item():t.parentElement():t.startContainer
return n===this.document.body||m.inDoc(n,this.document)},getNative:function(){var t=this.document
try{return t?s.ie9below?t.selection:m.getWindow(t).getSelection():null}catch(t){return null}},getIERange:function(){var t=r(this)
return!t&&this._bakIERange?this._bakIERange:t},cache:function(){this.clear(),this._cachedRange=this.getRange(),this._cachedStartElement=this.getStart(),this._cachedStartElementPath=this.getStartElementPath()},getStartElementPath:function(){if(this._cachedStartElementPath)return this._cachedStartElementPath
var t=this.getStart()
return t?m.findParents(t,!0,null,!0):[]},clear:function(){this._cachedStartElementPath=this._cachedRange=this._cachedStartElement=null},isFocus:function(){try{if(s.ie9below){var t=r(this)
return!(!t||!this.rangeInBody(t))}return!!this.getNative().rangeCount}catch(t){return!1}},getRange:function(){var r=this
function e(t){for(var e=r.document.body.firstChild,n=t.collapsed;e&&e.firstChild;)t.setStart(e,0),e=e.firstChild
t.startContainer||t.setStart(r.document.body,0),n&&t.collapse(!0)}if(null!=r._cachedRange)return this._cachedRange.enlargeUnEditable()
var n=new c.Range(r.document)
if(s.ie9below){var t=r.getIERange()
if(t)try{!function(t,e){if(t.item)e.selectNode(t.item(0))
else{var n=l(t,!0)
e.setStart(n.container,n.offset),0!=t.compareEndPoints("StartToEnd",t)&&(n=l(t,!1),e.setEnd(n.container,n.offset))}}(t,n)}catch(t){e(n)}else e(n)}else{var a=r.getNative()
if(a&&a.rangeCount){var i=a.getRangeAt(0),o=a.getRangeAt(a.rangeCount-1)
n.setStart(i.startContainer,i.startOffset).setEnd(o.endContainer,o.endOffset),n.collapsed&&m.isBody(n.startContainer)&&!n.startOffset&&e(n)}else{if(this._bakRange&&m.inDoc(this._bakRange.startContainer,this.document))return this._bakRange.enlargeUnEditable()
e(n)}}return n.enlargeUnEditable(),this._bakRange=n},getStart:function(){if(this._cachedStartElement)return this._cachedStartElement
var t,e,n,r,a=s.ie9below?this.getIERange():this.getRange()
if(s.ie9below){if(!a)return this.document.body.firstChild
if(a.item)return a.item(0)
for(0<(t=a.duplicate()).text.length&&t.moveStart("character",1),t.collapse(1),e=t.parentElement(),r=n=a.parentElement();n=n.parentNode;)if(n==e){e=r
break}}else if(a.shrinkBoundary(),1==(e=a.startContainer).nodeType&&e.hasChildNodes()&&(e=e.childNodes[Math.min(e.childNodes.length-1,a.startOffset)]),3==e.nodeType)return e.parentNode
return e},getText:function(){var t,e
return this.isFocus()&&(t=this.getNative())?(e=s.ie9below?t.createRange():t.getRangeAt(0),s.ie9below?e.text:e.toString()):""},clearRange:function(){this.getNative()[s.ie9below?"empty":"removeAllRanges"]()}},{Selection:c.Selection}})
"use strict"
define("3rd/editor/common/range.js",["3rd/editor/common/browser.js","3rd/editor/common/utils.js","3rd/editor/common/dtd.js","3rd/editor/common/domUtils.js"],function(e,t,n){var c,i,u,h,r,p=e("3rd/editor/common/browser.js").browser,m=e("3rd/editor/common/utils.js").utils,T=e("3rd/editor/common/dtd.js").dtd,H=e("3rd/editor/common/domUtils.js").domUtils,o=window.UE.dom
function s(e){return!e.collapsed&&1==e.startContainer.nodeType&&e.startContainer===e.endContainer&&e.endOffset-e.startOffset==1}function a(e,t,n,r){if(!t)return r
try{1==t.nodeType&&(T.$empty[t.tagName]||T.$nonChild[t.tagName])&&(n=H.getNodeIndex(t)+(e?0:1),t=t.parentNode),e?(r.startContainer=t,r.startOffset=n,r.endContainer||r.collapse(!0)):(r.endContainer=t,r.endOffset=n,r.startContainer||r.collapse(!1)),(i=r).collapsed=i.startContainer&&i.endContainer&&i.startContainer===i.endContainer&&i.startOffset==i.endOffset}catch(e){}var i
return r}function d(e,t){var n,r,i=e.startContainer,o=e.endContainer,s=e.startOffset,a=e.endOffset,d=e.document,l=d.createDocumentFragment()
if(1==i.nodeType&&(i=i.childNodes[s]||(n=i.appendChild(d.createTextNode("")))),1==o.nodeType&&(o=o.childNodes[a]||(r=o.appendChild(d.createTextNode("")))),i===o&&3==i.nodeType)return l.appendChild(d.createTextNode(i.substringData(s,a-s))),t&&(i.deleteData(s,a-s),e.collapse(!0)),l
for(var f,h,c=l,u=H.findParents(i,!0),p=H.findParents(o,!0),m=0;u[m]==p[m];)m++
for(var g,C=m;g=u[C];C++){for(f=g.nextSibling,g==i?n||(3==e.startContainer.nodeType?(c.appendChild(d.createTextNode(i.nodeValue.slice(s))),t&&i.deleteData(s,i.nodeValue.length-s)):c.appendChild(t?i:i.cloneNode(!0))):(h=g.cloneNode(!1),c.appendChild(h));f&&f!==o&&f!==p[C];)g=f.nextSibling,c.appendChild(t?f:f.cloneNode(!0)),f=g
c=h}c=l,u[m]||(c.appendChild(u[m-1].cloneNode(!1)),c=c.firstChild)
var N
for(C=m;N=p[C];C++){if(f=N.previousSibling,N==o?r||3!=e.endContainer.nodeType||(c.appendChild(d.createTextNode(o.substringData(0,a))),t&&o.deleteData(0,a)):(h=N.cloneNode(!1),c.appendChild(h)),C!=m||!u[m])for(;f&&f!==i;)N=f.previousSibling,c.insertBefore(t?f:f.cloneNode(!0),c.firstChild),f=N
c=h}return t&&e.setStartBefore(p[m]?u[m]?p[m]:u[m-1]:p[m-1]).collapse(!0),n&&H.remove(n),r&&H.remove(r),l}function g(e,t){try{if(c&&H.inDoc(c,e))if(c.nodeValue.replace(h,"").length)c.nodeValue=c.nodeValue.replace(h,"")
else{var n=c.parentNode,r=!1,i=n.getBoundingClientRect().height
for(H.remove(c),n.getBoundingClientRect().height<i&&(r=!0);n&&H.isEmptyInlineElement(n)&&(p.safari?!(H.getPosition(n,t)&H.POSITION_CONTAINS):!n.contains(t));)c=n.parentNode,H.remove(n),n=c
n&&(0===H.getChildCount(n,function(e){return!H.isMarkNode(e)})||0===n.innerHTML.replace(h,"").length)&&r&&(n.innerHTML="<br>")}}catch(e){}}function C(e,t){var n
for(e=e[t];e&&H.isFillChar(e);)n=e[t],H.remove(e),e=n}return i=0,u=H.fillChar,h=H.fillCharReg,(r=o.Range=function(e){var t=this
t.startContainer=t.startOffset=t.endContainer=t.endOffset=null,t.document=e,t.collapsed=!0}).prototype={cloneContents:function(){return this.collapsed?null:d(this,0)},deleteContents:function(){var e
return this.collapsed||d(this,1),p.webkit&&(3!=(e=this.startContainer).nodeType||e.nodeValue.length||(this.setStartBefore(e).collapse(!0),H.remove(e))),this},extractContents:function(){return this.collapsed?null:d(this,2)},setStart:function(e,t){return a(!0,e,t,this)},setEnd:function(e,t){return a(!1,e,t,this)},setStartAfter:function(e){return this.setStart(e.parentNode,H.getNodeIndex(e)+1)},setStartBefore:function(e){return this.setStart(e.parentNode,H.getNodeIndex(e))},setEndAfter:function(e){return this.setEnd(e.parentNode,H.getNodeIndex(e)+1)},setEndBefore:function(e){return this.setEnd(e.parentNode,H.getNodeIndex(e))},setStartAtFirst:function(e){return this.setStart(e,0)},setStartAtLast:function(e){return this.setStart(e,3==e.nodeType?e.nodeValue.length:e.childNodes.length)},setEndAtFirst:function(e){return this.setEnd(e,0)},setEndAtLast:function(e){return this.setEnd(e,3==e.nodeType?e.nodeValue.length:e.childNodes.length)},selectNode:function(e){return this.setStartBefore(e).setEndAfter(e)},selectNodeContents:function(e){return this.setStart(e,0).setEndAtLast(e)},cloneRange:function(){var e=this
return new r(e.document).setStart(e.startContainer,e.startOffset).setEnd(e.endContainer,e.endOffset)},collapse:function(e){var t=this
return e?(t.endContainer=t.startContainer,t.endOffset=t.startOffset):(t.startContainer=t.endContainer,t.startOffset=t.endOffset),t.collapsed=!0,t},shrinkBoundary:function(e){var t,n=this,r=n.collapsed
function i(e){return 1==e.nodeType&&!H.isBookmarkNode(e)&&!T.$empty[e.tagName]&&!T.$nonChild[e.tagName]&&1===H.isContentEditable({node:e,checkParent:!0})}for(;1==n.startContainer.nodeType&&(t=n.startContainer.childNodes[n.startOffset])&&i(t);)n.setStart(t,0)
if(r)return n.collapse(!0)
if(!e)for(;1==n.endContainer.nodeType&&0<n.endOffset&&(t=n.endContainer.childNodes[n.endOffset-1])&&i(t);)n.setEnd(t,t.childNodes.length)
return n},getCommonAncestor:function(e,t){var n=this.startContainer,r=this.endContainer
return n===r?(!e||!s(this)||1!=(n=n.childNodes[this.startOffset]).nodeType)&&t&&3==n.nodeType?n.parentNode:n:H.getCommonAncestor(n,r)},trimBoundary:function(e){this.txtToElmBoundary()
var t=this.startContainer,n=this.startOffset,r=this.collapsed,i=this.endContainer
if(3==t.nodeType){if(0==n)this.setStartBefore(t)
else if(n>=t.nodeValue.length)this.setStartAfter(t)
else{var o=H.split(t,n)
t===i?this.setEnd(o,this.endOffset-n):t.parentNode===i&&(this.endOffset+=1),this.setStartBefore(o)}if(r)return this.collapse(!0)}return e||(n=this.endOffset,3==(i=this.endContainer).nodeType&&(0==n?this.setEndBefore(i):(n<i.nodeValue.length&&H.split(i,n),this.setEndAfter(i)))),this},txtToElmBoundary:function(e){function t(e,t){var n=e[t+"Container"],r=e[t+"Offset"]
3==n.nodeType&&(r?r>=n.nodeValue.length&&e["set"+t.replace(/(\w)/,function(e){return e.toUpperCase()})+"After"](n):e["set"+t.replace(/(\w)/,function(e){return e.toUpperCase()})+"Before"](n))}return!e&&this.collapsed||(t(this,"start"),t(this,"end")),this},insertNode:function(e){var t=e,n=1
11==e.nodeType&&(t=e.firstChild,n=e.childNodes.length),this.trimBoundary(!0)
var r=this.startContainer,i=this.startOffset,o=r.childNodes[i]
return o?r.insertBefore(e,o):r.appendChild(e),t.parentNode===this.endContainer&&(this.endOffset=this.endOffset+n),this.setStartBefore(t)},setCursor:function(e,t){return this.collapse(!e).select(t)},createBookmark:function(e,t){var n,r=H.createBookmarkNode(this.document,i++)
return this.collapsed||((n=r.cloneNode(!0)).id=H.bookmarkPrefix+"end_"+(t?"":i++)),this.insertNode(r),n&&this.collapse().insertNode(n).setEndBefore(n),this.setStartAfter(r),{start:e?r.id:r,end:n?e?n.id:n:null,id:e}},moveToBookmark:function(e){var t=e.id?this.document.getElementById(e.start):e.start,n=e.end&&e.id?this.document.getElementById(e.end):e.end
return t&&(this.setStartBefore(t),H.remove(t)),n?(this.setEndBefore(n),H.remove(n)):this.collapse(!0),this},enlarge:function(e,t){var n,r,i=H.isBody,o=this.document.createTextNode("")
if(e){for(n=1==(r=this.startContainer).nodeType?r=r.childNodes[this.startOffset]?r.childNodes[this.startOffset]:(r.appendChild(o),o):r;;){if(H.isBlockElm(r)){for(r=n;(n=r.previousSibling)&&!H.isBlockElm(n);)r=n
this.setStartBefore(r)
break}r=(n=r).parentNode}for(n=1==(r=this.endContainer).nodeType?((n=r.childNodes[this.endOffset])?r.insertBefore(o,n):r.appendChild(o),r=o):r;;){if(H.isBlockElm(r)){for(r=n;(n=r.nextSibling)&&!H.isBlockElm(n);)r=n
this.setEndAfter(r)
break}r=(n=r).parentNode}o.parentNode===this.endContainer&&this.endOffset--,H.remove(o)}if(!this.collapsed){for(;!(0!=this.startOffset||t&&t(this.startContainer)||i(this.startContainer));)this.setStartBefore(this.startContainer)
for(;!(this.endOffset!=(1==this.endContainer.nodeType?this.endContainer.childNodes.length:this.endContainer.nodeValue.length)||t&&t(this.endContainer)||i(this.endContainer));)this.setEndAfter(this.endContainer)}return this},adjustmentBoundary:function(){if(!this.collapsed){for(;!H.isBody(this.startContainer)&&this.startOffset==this.startContainer[3==this.startContainer.nodeType?"nodeValue":"childNodes"].length&&this.startContainer[3==this.startContainer.nodeType?"nodeValue":"childNodes"].length;)this.setStartAfter(this.startContainer)
for(;!H.isBody(this.endContainer)&&!this.endOffset&&this.endContainer[3==this.endContainer.nodeType?"nodeValue":"childNodes"].length;)this.setEndBefore(this.endContainer)}return this},applyBlockStyle:function(e){var t=this,n=0<arguments.length&&void 0!==e?e:{}
if(this.collapsed||"[object Object]"!==Object.prototype.toString.call(n.attrs)&&!0!==n.removeOrigin)return this
function r(){H.remove(o.start),H.remove(o.end),t.moveToBookmark(i).adjustmentBoundary()}var i=this.trimBoundary().enlarge(!1).createBookmark(),o=this.enlarge(!0).createBookmark(),s=H.getCommonAncestor(i.start,i.end)
if(!s||!s.getElementsByTagName)return r(),this
var a=H.getCommonAncestor(o.start,o.end)
if(!a||!a.getElementsByTagName)return r(),this
var d=H.getCommonAncestor(s,a)
if(!d||!d.getElementsByTagName)return r(),this
var l=H.getTreeWalker({root:d,whatToShow:window.NodeFilter.SHOW_ALL,filterMarkNode:!1,filterFillchar:!0,filter:function(e){var t=0<arguments.length&&void 0!==e?e:{}
return(1!==t.node.nodeType||"br"!==t.node.tagName.toLowerCase())&&(!!H.isBookmarkNode(t.node)||!H.isMarkNode(t.node))}})
if(!l)return r(),this
for(var f=[],h=[],c=!1,u=!1;l.nextNode();){var p=l.currentNode
if(p!==i.start){if(p!==o.start)if(p!==i.end&&p!==o.end)c&&H.isBlockElm(p)?f.push(p):u&&h.push(p)
else{if(u)break
u=!0}}else c=!0}for(var m=0,g=h.length;m<g;m++)for(var C=h[m],N=0;N<f.length;N++){var y=f[N]
C!==y&&!y.contains(C)||(f.splice(N,1),N--)}if(!1!==n.ignoreUnEditable||!1!==n.distUnEditableParentAttr)for(var v=0;v<f.length;v++){var b=f[v]
!1===n.ignoreUnEditable||2!==H.isContentEditable({node:b,checkParent:!0})?!1!==n.distUnEditableParentAttr&&H.isContainUneditable({node:b})&&b.setAttribute("data-containuneditable","1"):(f.splice(v,1),v--)}var T={},B="",S=""
if("[object Object]"===Object.prototype.toString.call(n.attrs))for(var O in n.attrs)if(Object.prototype.hasOwnProperty.call(n.attrs,O)){var E=O+":"+n.attrs[O]+";"
H.isUneditableApplyStyle({styleKey:O})&&(B+=E,T[O]=n.attrs[O]),S+=O+":"+n.attrs[O]+";"}var k={},A="",x=""
if("[object Object]"===Object.prototype.toString.call(n.liAttrs))for(var w in n.liAttrs)if(Object.prototype.hasOwnProperty.call(n.liAttrs,w)){var P=w+":"+n.liAttrs[w]+";"
H.isUneditableApplyStyle({styleKey:w})&&(A+=P,k[w]=n.liAttrs[w]),x+=w+":"+n.liAttrs[w]+";"}var j={},R="",U=""
if("[object Object]"===Object.prototype.toString.call(n.listAttrs))for(var V in n.listAttrs)if(Object.prototype.hasOwnProperty.call(n.listAttrs,V)){var D=V+":"+n.listAttrs[V]+";"
H.isUneditableApplyStyle({styleKey:V})&&(R+=D,j[V]=n.listAttrs[V]),U+=V+":"+n.listAttrs[V]+";"}for(var I=0,L=f.length;I<L;I++){var F=f[I],M=B,$=T,W=S,_=n.attrs
x&&"li"===F.nodeName.toLowerCase()?(M=A,$=k,W=x,_=n.liAttrs):U&&/^(ol)|(ul)$/i.test(F.nodeName)&&(M=R,$=j,W=U,_=n.listAttrs),"1"===F.getAttribute("data-containuneditable")?(!0===n.removeOrigin?(F.style.cssText=M)||F.removeAttribute("style"):M&&H.setStyles(F,$),F.removeAttribute("data-containuneditable")):!0===n.removeOrigin?(F.style.cssText=W)||F.removeAttribute("style"):W&&H.setStyles(F,_)}return r(),this},applyInlineStyle:function(t,e,n,r){var i=3<arguments.length&&void 0!==r?r:{}
if(!t)return this
if(this.collapsed)return this
this.trimBoundary().enlarge(!1,function(e){return 1==e.nodeType&&H.isBlockElm(e)}).adjustmentBoundary()
for(var o,s,a=this.createBookmark(),d=a.end,l=function(e){return(!0!==i.ignoreUnEditable||2!==H.isContentEditable({node:e,checkParent:!0}))&&(1==e.nodeType?"br"!=e.tagName.toLowerCase():!H.isWhitespace(e))},f=H.getNextDomNode(a.start,!1,l),h=this.cloneRange();f&&H.getPosition(f,d)&H.POSITION_PRECEDING;)if(3==f.nodeType||T[t]&&T[t][f.tagName]||H.isMarkNode(f)){for(h.setStartBefore(f),o=f;o&&(3==o.nodeType||T[t]&&T[t][o.tagName]||H.isMarkNode(o))&&o!==d;)s=o,o=H.getNextDomNode(o,1==o.nodeType,null,function(e){return T[t][e.tagName]})
var c,u,p=h.setEndAfter(s).extractContents()
if(n&&0<n.length){var m,g
g=m=n[0].cloneNode(!1)
for(var C,N=1;C=n[N++];)m.appendChild(C.cloneNode(!1)),m=m.firstChild
c=m}else c=h.document.createElement(t)
e&&H.setAttributes(c,e),c.appendChild(p),h.insertNode(n?g:c),"span"==t&&e.style&&/text\-decoration/.test(e.style)&&(u=H.findParentByTagName(c,"a",!0))?(H.setAttributes(u,e),H.remove(c,!0),c=u):(H.mergeSibling(c),H.clearEmptySibling(c)),H.mergeChild(c,e),f=H.getNextDomNode(c,!1,l)
var y=c.parentNode
if(H.mergeToParent(c),i.liStyle&&c.parentNode){H.inDoc(c,this.document)||(c=y)
var v=H.findParentByTagName(c,"li")
if(v){var b=H.replaceFillChar(c.innerText||"").replace(/\n+$/g,"")
H.replaceFillChar(v.innerText||"").replace(/\n+$/g,"")===b&&H.setStyles(v,i.liStyle)}}if(o===d)break}else f=H.getNextDomNode(f,!0,l)
return this.moveToBookmark(a)},removeInlineStyle:function(e,t){var n=1<arguments.length&&void 0!==t?t:{}
if(this.collapsed)return this
e=m.isArray(e)?e:[e],this.shrinkBoundary().adjustmentBoundary()
for(var r=this.startContainer,i=this.endContainer;;){if(1==r.nodeType){if(-1<m.indexOf(e,r.tagName.toLowerCase()))break
if("body"==r.tagName.toLowerCase()){r=null
break}}r=r.parentNode}for(;;){if(1==i.nodeType){if(-1<m.indexOf(e,i.tagName.toLowerCase()))break
if("body"==i.tagName.toLowerCase()){i=null
break}}i=i.parentNode}var o,s,a=this.createBookmark()
!r||!0===n.ignoreUnEditable&&2===H.isContentEditable({node:r,checkParent:!0})||(o=(s=this.cloneRange().setEndBefore(a.start).setStartBefore(r)).extractContents(),s.insertNode(o),H.clearEmptySibling(r,!0),r.parentNode.insertBefore(a.start,r)),!i||!0===n.ignoreUnEditable&&2===H.isContentEditable({node:i,checkParent:!0})||(o=(s=this.cloneRange().setStartAfter(a.end).setEndAfter(i)).extractContents(),s.insertNode(o),H.clearEmptySibling(i,!1,!0),i.parentNode.insertBefore(a.end,i.nextSibling))
for(var d,l=H.getNextDomNode(a.start,!1,function(e){return 1==e.nodeType});l&&l!==a.end;){if(d=H.getNextDomNode(l,!0,function(e){return 1==e.nodeType}),-1<m.indexOf(e,l.tagName.toLowerCase())&&(!0!==n.ignoreUnEditable||2!==H.isContentEditable({node:l,checkParent:!0}))){if(n.liStyle){var f=H.findParentByTagName(l,"li")
if(f)for(var h in n.liStyle)n.liStyle.hasOwnProperty(h)&&H.getStyle(f,h)===n.liStyle[h]&&H.removeStyle(f,h)}H.remove(l,!0)}l=d}return this.moveToBookmark(a)},getClosedNode:function(){var e
if(!this.collapsed){var t=this.cloneRange().adjustmentBoundary().shrinkBoundary()
if(s(t)){var n=t.startContainer.childNodes[t.startOffset]
n&&1==n.nodeType&&(T.$empty[n.tagName]||T.$nonChild[n.tagName])&&(e=n)}}return e},select:p.ie?function(e,t){var n
this.collapsed||this.shrinkBoundary()
var r=this.getClosedNode()
if(r&&!t){try{(n=this.document.body.createControlRange()).addElement(r),n.select()}catch(e){}return this}var i,o=this.createBookmark(),s=o.start
if((n=this.document.body.createTextRange()).moveToElementText(s),n.moveStart("character",1),this.collapsed){if(!e&&3!=this.startContainer.nodeType){var a=this.document.createTextNode(u),d=this.document.createElement("span")
d.appendChild(this.document.createTextNode(u)),s.parentNode.insertBefore(d,s),s.parentNode.insertBefore(a,s),g(this.document,a),c=a,C(d,"previousSibling"),C(s,"nextSibling"),n.moveStart("character",-1),n.collapse(!0)}}else{var l=this.document.body.createTextRange()
i=o.end,l.moveToElementText(i),n.setEndPoint("EndToEnd",l)}this.moveToBookmark(o),d&&H.remove(d)
try{n.select()}catch(e){}return this}:function(e){var t,r,n=H.getWindow(this.document),i=n.getSelection()
if(p.gecko?this.document.body.focus():n.focus(),i){if(i.removeAllRanges(),!this.startContainer)return
if(this.collapsed&&!e){var o=this.startContainer,s=o
if(1==o.nodeType&&(s=o.childNodes[this.startOffset]),!(3==o.nodeType&&this.startOffset||(s?s.previousSibling&&3==s.previousSibling.nodeType:o.lastChild&&3==o.lastChild.nodeType))){t=this.document.createTextNode(u)
var a=this.cloneRange()
this.insertNode(t),g(this.document,t),C(t,"previousSibling"),C(t,"nextSibling"),"body"===t.parentNode.tagName.toLowerCase()||/^[uo]l/i.test(t.parentNode.tagName)||t.nextSibling&&H.isUneditablePluginNode({node:t.nextSibling})||t.previousSibling&&H.isUneditablePluginNode({node:t.previousSibling})||2===H.isContentEditable({node:t,checkParent:!0})?(t.parentNode.removeChild(t),this.startContainer=a.startContainer,this.endContainer=a.endContainer,this.startOffset=a.startOffset,this.endOffset=a.endOffset,this.collapsed=a.collapsed):(c=t,this.setStart(t,p.webkit?1:0).collapse(!0))}}var d=this.document.createRange()
if(this.collapsed&&p.opera&&1==this.startContainer.nodeType)if(s=this.startContainer.childNodes[this.startOffset]){for(;s&&H.isBlockElm(s)&&1==s.nodeType&&s.childNodes[0];)s=s.childNodes[0]
s&&this.setStartBefore(s).collapse(!0)}else(s=this.startContainer.lastChild)&&H.isBr(s)&&this.setStartBefore(s).collapse(!0)
if(h((r=this).startContainer,r.startOffset,"start"),h(r.endContainer,r.endOffset,"end"),!H.isBody(this.startContainer)){for(var l=this.startContainer.parentElement,f=!1;l;){if(l===this.document.body){f=!0
break}l=l.parentElement}if(!f)return}try{d.setStart(this.startContainer,this.startOffset),d.setEnd(this.endContainer,this.endOffset),i.addRange(d)}catch(e){}}function h(e,t,n){3==e.nodeType&&e.nodeValue.length<t&&(r[n+"Offset"]=e.nodeValue.length)}return this},scrollToView:function(e,t){e=e?window:H.getWindow(this.document)
var n=this.document.createElement("span")
return n.innerHTML="&nbsp;",this.cloneRange().insertNode(n),H.scrollToView(n,e,t),H.remove(n),this},inFillChar:function(){var e=this.startContainer
return!(!this.collapsed||3!=e.nodeType||e.nodeValue.replace(new RegExp("^"+H.fillChar),"").length+1!=e.nodeValue.length)},createDomAddress:function(e,t){var n={}
if(!this.startContainer||!e&&!this.endContainer)return null
var r=this.createAddress(e,t)
function i(e){for(var t,n=H.findParents(e,!0,function(e){return!H.isBody(e)}),r=[],i=0;t=n[i++];)r.push(t.nodeName.toUpperCase())
return r}return r.startAddress&&(n.startAddress={index:r.startAddress,name:i(this.startContainer)}),r.endAddress&&(n.endAddress={index:r.endAddress,name:i(this.endContainer)}),n},moveToDomAddress:function(e,t){var d=this
function n(e,t){for(var n,r,i,o=d.document.body,s=0,a=e.index.length;s<a;s++){if(i=e.index[s],!(o=(n=o).childNodes[i])){r=i
break}if(void 0!==e.name[s]&&o.nodeName.toUpperCase()!=e.name[s]){o=null,r=i
break}}t?o?d.setStartBefore(o):d.setStart(n,r):o?d.setEndBefore(o):d.setEnd(n,r)}return n(e.startAddress,!0),!t&&e.endAddress&&n(e.endAddress),d},createAddress:function(e,l){var t={},f=this
function n(e){for(var t,n=e?f.startContainer:f.endContainer,r=H.findParents(n,!0,function(e){return!H.isBody(e)}),i=[],o=0;t=r[o++];)i.push(H.getNodeIndex(t,l))
var s=0
if(l)if(3==n.nodeType){for(var a=n.previousSibling;a&&3==a.nodeType;)s+=a.nodeValue.replace(h,"").length,a=a.previousSibling
s+=e?f.startOffset:f.endOffset}else if(n=n.childNodes[e?f.startOffset:f.endOffset])s=H.getNodeIndex(n,l)
else for(var d=(n=e?f.startContainer:f.endContainer).firstChild;d;)if(H.isFillChar(d))d=d.nextSibling
else if(s++,3==d.nodeType)for(;d&&3==d.nodeType;)d=d.nextSibling
else d=d.nextSibling
else s=e?H.isFillChar(n)?0:f.startOffset:f.endOffset
return s<0&&(s=0),i.push(s),i}return t.startAddress=n(!0),e||(t.endAddress=f.collapsed?[].concat(t.startAddress):n()),t},moveToAddress:function(e,t){var d=this
function n(e,t){for(var n,r,i,o=d.document.body,s=0,a=e.length;s<a;s++)if(i=e[s],!(o=(n=o).childNodes[i])){r=i
break}t?o?d.setStartBefore(o):d.setStart(n,r):o?d.setEndBefore(o):d.setEnd(n,r)}return n(e.startAddress,!0),!t&&e.endAddress&&n(e.endAddress),d},equals:function(e){for(var t in this)if(this.hasOwnProperty(t)&&this[t]!==e[t])return!1
return!0},traversal:function(e,t){if(this.collapsed)return this
for(var n=this.createBookmark(),r=n.end,i=H.getNextDomNode(n.start,!1,t);i&&i!==r&&H.getPosition(i,r)&H.POSITION_PRECEDING;){var o=H.getNextDomNode(i,!1,t)
e(i),i=o}return this.moveToBookmark(n)},getRangeText:function(){var e=[],t=this.createBookmark(),n=this.getRangeDom()
if(n&&n.length)for(var r=0;r<n.length;r++)3===n[r].nodeType&&e.push(n[r].nodeValue)
return this.moveToBookmark(t),e.join("")},getRangeDom:function(){if(!this.startContainer||!this.endContainer)return null
this.adjustmentBoundary()
var e=null,t=null
if(e=1===this.startContainer.nodeType?this.startContainer.childNodes[this.startOffset]:this.startContainer,t=1===this.endContainer.nodeType?this.endContainer.childNodes[this.endOffset-1]:this.endContainer,!e||!t)return null
if(e&&t&&t===e){if(e.getElementsByTagName){var n=H.getElementsByTagName(e,"*")
return n.unshift(e),n}return[e]}var r=H.getCommonAncestor(e,t)
if(!r||!r.getElementsByTagName)return null
var i=t.lastChild||t,o=H.getTreeWalker({root:r,whatToShow:window.NodeFilter.SHOW_ALL,filterMarkNode:!1,filterFillchar:!1})
if(!o)return null
for(var s=[],a=null;o.nextNode();){var d=o.currentNode
if(d===e?a=!0:d===i&&(a=!1),null!==a&&(H.isFillChar2(d)||H.isMarkNode(d)||s.push(d),!1===a))break}return s},enlargeUnEditable:function(){var e=null,t=null
if(this.startContainer&&1===this.startContainer.nodeType?e=this.startContainer.childNodes[this.startOffset]:this.startContainer&&(e=this.startContainer),this.endContainer&&1===this.endContainer.nodeType?t=this.endContainer.childNodes[this.endOffset-1]:this.endContainer&&(t=this.endContainer),e){var n=H.getContentEditableNode({node:e,isMarkNode:!1})
n&&n!==e&&this.setStartBefore(n)}if(t){var r=H.getContentEditableNode({node:t,isMarkNode:!1})
r&&r!==t&&this.setEndAfter(r)}return this},adjustUnEditable:function(){return this}},{Range:o.Range}})
"use strict"
define("3rd/editor/utils.js",[],function(e,t,n){return{initEventInterface:function(e){e.prototype.bindEventInterface=function(e){if(!this.domUtils||!this.editor)return!1
"domUtils"==e.type?this.domUtils.on(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.addListener(e.eventName,e.fun),this.__EventInterfaceCache||(this.__EventInterfaceCache=[]),this.__EventInterfaceCache.push(e)},e.prototype.unbindEventInterface=function(){if(!this.domUtils||!this.editor)return!1
if(this.__EventInterfaceCache)for(;0<this.__EventInterfaceCache.length;){var e=this.__EventInterfaceCache[0]
"domUtils"==e.type?this.domUtils.un(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.removeListener(e.eventName,e.fun),this.__EventInterfaceCache.shift()}this.__EventInterfaceCache=[]},e.prototype.unbindSpecifyEvent=function(e){if(!this.domUtils||!this.editor)return!1
if(this.__EventInterfaceCache&&e)for(var t=0,n=this.__EventInterfaceCache.length;t<n;t++){var i=this.__EventInterfaceCache[t]
if(i.type===e.type&&i.eventName===e.eventName&&i.fun===e.fun&&(!e.dom||e.dom&&i.dom===e.dom)){"domUtils"==i.type?this.domUtils.un(i.dom,i.eventName,i.fun):"editor"==i.type&&this.editor.removeListener(i.eventName,i.fun),this.__EventInterfaceCache.splice(t,1)
break}}}},getShortcutsKeyMap:function(){var e=/Mac/.test(navigator.platform),t=/Win/.test(navigator.platform),n={}
return e?n={bold:"加粗（⌘+B）",italic:"斜体（⌘+I）",underline:"下划线（⌘+U）",undo:"撤销（⌘+Z）",redo:"重做（⌘+Y）"}:t&&(n={bold:"加粗（Ctrl+B）",italic:"斜体（Ctrl+I）",underline:"下划线（Ctrl+U）",undo:"撤销（Ctrl+Z）",redo:"重做（Ctrl+Y）"}),n}}})
"use strict"
define("3rd/editor/editor_options.js",[],function(e,t,i){var n={justifyindent:[{name:"取消",val:"0"},{name:"8",val:"8"},{name:"16",val:"16"},{name:"32",val:"32"},{name:"48",val:"48"}],letterspacing:{normal:"默认","0.5px":"0.5","1px":"1","2px":"2"},fontsize:[12,14,15,16,17,18,20,24],justify:{justifyleft:"左对齐",justifycenter:"居中对齐",justifyright:"右对齐",justifyjustify:"两端对齐"},insertlist:{circle:"○ 大圆圈",disc:"● 小黑点",square:"■ 小方块 ",decimal:"1,2,3...","lower-alpha":"a,b,c...","lower-roman":"i,ii,iii...","upper-alpha":"A,B,C...","upper-roman":"I,II,III..."},imagefloat:{none:"默认",left:"左浮动",right:"右浮动"}}
return n.commonReportConf={justifyindent:{all:"69271_0",0:"69271_18",8:"69271_1",16:"69271_2",32:"69271_3",48:"69271_4"},letterspacing:{all:"69271_5",normal:"69271_6","0.5px":"69271_7","1px":"69271_8","2px":"69271_9"},fontsize:{all:"65080_8","12px":"65080_13","14px":"65080_15","15px":"65080_17","16px":"65080_19","17px":"65080_9","18px":"65080_21","20px":"65080_23","24px":"65080_25",default:"65080_29"},blockquote:{textCountAll:"69271_27",textCount:function(e){var t="69271"
return 0<=e&&e<150?{id:t,key:"20"}:150<=e&&e<300?{id:t,key:"21"}:300<=e&&e<500?{id:t,key:"22"}:500<=e&&e<800?{id:t,key:"23"}:800<=e&&e<1e3?{id:t,key:"24"}:1e3<=e&&e<2e3?{id:t,key:"25"}:{id:t,key:"26"}}}},{getOptions:function(){return n}}})
"use strict"
define("3rd/editor/plugin/popup.js",["3rd/editor/utils.js","pages/modules/utils/cgi.js"],function(t,e,i){var o=t("3rd/editor/utils.js")
t("pages/modules/utils/cgi.js")
function n(t){this.mpeditor=t,this.editor=t.getUeditor(),this.uiUtils=baidu.editor.ui.uiUtils,this.domUtils=UE.dom.domUtils,this._g={selectionchangePopup:!0,event:{}},this.init(),this.addEvent()}return n.prototype.init=function(){var v=this,h=v.editor,d=v.mpeditor
this.popup=new baidu.editor.ui.Popup({editor:h,content:"",className:"edui-bubble",_execCommand:function(t){for(var e=[],i=0,o=arguments.length;i<o;i++)e.push(arguments[i])
e.push(this._anchorEl),h.execCommand.apply(h,e)},_execCommandAndHide:function(t){for(var e=[],i=0,o=arguments.length;i<o;i++)e.push(arguments[i])
e.push(this._anchorEl),h.execCommand.apply(h,e),this.hide(this._closeId)},_fireEvent:function(t){for(var e=[],i=0,o=arguments.length;i<o;i++)e.push(arguments[i])
e.push(this._anchorEl),h.fireEvent.apply(h,e)},_fireEventAndHide:function(t){for(var e=[],i=0,o=arguments.length;i<o;i++)e.push(arguments[i])
e.push(this._anchorEl),h.fireEvent.apply(h,e),this.hide(this._closeId)},_delRange:function(){h.fireEvent("saveScene")
var t=$(this._anchorEl),e=t.parent("a")
0<e.length&&(t=e),h.selection.getRange().collapse(!1),t.remove(),this.hide(this._closeId),h.focus(),h.fireEvent("saveScene"),d.funcPvUvReport("del_img")},_cropImg:function(){this.hide(this._closeId),d.fireEvent("crop_img",this._anchorEl)},_imgReplace:function(){this.hide(this._closeId),d.fireEvent("img_replace",this._anchorEl)},_imgAutoWidth:function(t){h.fireEvent("saveScene")
var e=$(this.getDom("content")),i=e.find(".js_adapt"),o=e.find(".js_canceladapt")
if(!0===t){var n=$(this._anchorEl),s=n.width(),r=n.height(),p=n.attr("src")
n.attr("data-oversubscription-url")
this._anchorEl.style.width="100%",n.attr("data-backw",s),n.attr("data-backh",r),i.hide(),o.show(),d.funcPvUvReport("autowidth"),h.fireEvent("reportAddNum","122333","88","1")}else{s=this._anchorEl.getAttribute("data-backw"),r=this._anchorEl.getAttribute("data-backh")
s&&r?(this._anchorEl.style.width=s+"px",this._anchorEl.style.height=r+"px"):this._anchorEl.style.width="auto",this._anchorEl.removeAttribute("data-backw"),this._anchorEl.removeAttribute("data-backh"),console.log("beforeSrc",p),i.show(),o.hide(),d.funcPvUvReport("cancel_autowidth"),h.fireEvent("reportAddNum","122333","89","1")}this._anchorEl.style.height="auto",h.focus(),h.fireEvent("adjustheight afterImgAutoWidth saveScene")},getHtmlTpl:function(){return'<div id="##" class="edui-popup edui_mask_edit_bar %%"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="javascript:"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">'+this.getContentHtmlTpl()+"  </div> </div></div>"},showAnchorRect:function(t){if(this._anchorEl){t=t||{},this._doAutoRender(),this._show()
var e=this.fitSize(),i=v.uiUtils.getClientRect(this._anchorEl),o=this.editor.ui.getDom("toolbarbox"),n=null
o&&(n=v.uiUtils.getClientRect(o))
var s,r,p=this.getDom()
p&&t.size&&(v.uiUtils.setViewportSize(p.firstElementChild,t.size),e=v.uiUtils.getClientRect(p))
var h=""
switch(t.pos){case"bottomleft":s=i.left,r=i.bottom,h="bottom"
break
case"bottomcenter":r=i.bottom,h="bottom"
var d=$(window),a=d.height()
d.width()
r+e.height>a&&(r=i.top-e.height,h="top"),s=i.left+i.width/2-e.width/2
var u=v.uiUtils.getClientRect(this.editor.iframe)
s=Math.max(u.left-20,s),s=Math.min(s,u.right+20-e.width)
break
case"topleft":default:s=i.left,r=i.top-e.height,h="top"}var l=!1
if(o&&n){var c=n.top+n.height
r<c&&(r=c,l=!0)}if("function"==typeof t.beforeSetOffset){var f=t.beforeSetOffset({popEl:p,relativePos:h,top:r,left:s,isEqToolbarBottom:l})
f&&(r=void 0!==f.top?f.top:r,s=void 0!==f.left?f.left:s)}return p&&(v.uiUtils.setViewportOffset(p,{left:s,top:r}),this.editor&&(p.style.zIndex=1*this.editor.container.style.zIndex+10,v.uiUtils.getFixedLayer().style.zIndex=p.style.zIndex-1)),v.unbindEvent(),v.bindEventInterface({type:"editor",eventName:"afterkeyup",fun:v._g.event.afterkeyupEvent}),{popEl:p,relativePos:h}}},queryAutoHide:function(t){return t&&t.ownerDocument==h.document&&("img"==t.tagName.toLowerCase()||v.domUtils.findParentByTagName(t,"a",!0))?t!==v.popup.anchorEl:baidu.editor.ui.Popup.prototype.queryAutoHide.call(this,t)},justShow:function(t,e){var i=1<arguments.length&&void 0!==e?e:{}
if((!this._closeId||this._closeId&&this._closeId===t)&&this.getDom())return v.popup.showAnchorRect(i)},hide:function(t){(!this._closeId||this._closeId&&this._closeId===t)&&!this._hidden&&this.getDom()&&(this.getDom().style.display="none",this._hidden=!0,v.unbindEvent())},reset:function(t){(!this._closeId||this._closeId&&this._closeId===t)&&!this._hidden&&this.getDom()&&(this.getDom().style.display="none",this._hidden=!0,this._closeId=null,v.unbindEvent())}}),this.popup.render(),this.initEvent()},n.prototype.initEvent=function(){var i=this
this._g.event={afterkeyupEvent:function(t,e){(e=e||window.event)&&e.type&&i.popup._anchorEl&&!i.popup._anchorEl.parentNode&&!0!==i.popup._hidden&&i.popup.hide(i.popup._closeId)}}},n.prototype.beforeEditorDestory=function(){this.unbindEventInterface()},n.prototype.unbindEvent=function(){this.unbindSpecifyEvent({type:"editor",eventName:"afterkeyup",fun:this._g.event.afterkeyupEvent})},n.prototype.addEvent=function(){var n=this,t=n.editor
t.addListener("cancel_selectionchange_popup",function(t,e){n._g.selectionchangePopup=!1}),t.addListener("set_selectionchange_popup",function(t,e){n._g.selectionchangePopup=!0}),t.addListener("selectionchange",function(t,e,i,o){if(e&&!0===n._g.selectionchangePopup)return n.triggerAndShowPopup({from:o})}),t.addListener("trigger_showpopup",function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}
return n.triggerAndShowPopup({from:e.from})}),t.addListener("hide_common_popup",function(t,e){n.popup.hide(e)}),t.addListener("update_common_popup",function(t,e){var i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{}
return n.popup.justShow(e,i)}),t.addListener("reset_common_popup",function(t,e){n.popup.reset(e)})},n.prototype.triggerAndShowPopup=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e={data:[],size:void 0,pos:void 0}
if(this.editor.fireEvent("handle_common_popup",e,{from:t.from}),0<e.data.length){for(var i=e.data[e.data.length-1].node,o=null,n="",s=0,r=e.data.length;s<r;s++){var p=e.data[s]
n+=p.html||"",p.closeId&&(o=p.closeId)}if(i&&n)return o&&(this.popup._closeId=o),this.showpopup({target:i,html:n,size:e.size,pos:e.pos})
this.popup.hide()}else this.popup.hide()},n.prototype.showpopup=function(t){var e=t||{},i={html:e.html||"",node:e.target||null,adjust:!0===t.adjust,size:e.size,pos:e.pos||"topleft"},o=this,n=o.editor
if(i.html&&i.node){o.popup.getDom("content").innerHTML=o.popup.formatHtml(i.html)
var s=$(i.node).find("img")
return 0<s.length&&(i.node=s[0]),o.popup._anchorEl=i.node,/js_img_popup/i.test(i.html)&&n.fireEvent("funcPvUvReport","img_popup"),/js_link_popup/i.test(i.html)&&n.fireEvent("funcPvUvReport","link_popup"),o.popup.showAnchorRect({size:i.size,pos:i.pos})}},o.initEventInterface(n),n})
"use strict"
define("3rd/editor/plugin/remoteimg.js",["pages/modules/utils/cgi.js","pages/modules/utils/str_util.js","3rd/editor/common/no_editable.js","3rd/editor/common/report.js","3rd/editor/plugin/filter.js","3rd/editor/plugin/checkTextUtils.js","3rd/editor/tpl/img_fail.tpl.js","3rd/editor/tpl/remoteimg_popup.tpl.js","pages/questions/modules/utils.js"],function(require,exports,module){var Cgi=require("pages/modules/utils/cgi.js"),Str=require("pages/modules/utils/str_util.js"),NoEditable=require("3rd/editor/common/no_editable.js"),Report=require("3rd/editor/common/report.js"),Filter=require("3rd/editor/plugin/filter.js"),CheckTextUtils=require("3rd/editor/plugin/checkTextUtils.js"),ImgFailTpl=require("3rd/editor/tpl/img_fail.tpl.js"),popupTpl=require("3rd/editor/tpl/remoteimg_popup.tpl.js"),Utils=require("pages/questions/modules/utils.js"),g={appmsgTmpImg:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",defaultRemoteImg:"http://mmbiz.qpic.cn/mmbiz/G1lssUsxJOsVVJNUIuKfUP7bLm5EVWxXl5znicMum6Os0CMJHPdeHicicZ4W5MGOVa8ooSXYuE61Ek/0",catchErrClass:"js_catchremoteimageerror",catchErrSelectClass:NoEditable.selectedClass,catchErrTagName:"section",cacheDomClass:"js_cache",noCatchClass:"js_nocatch",popupClass:"js_remoteimgpopup"}
function Remoteimg(e){this.init(e),this.addEvent()}return Remoteimg.defaultRemoteImg=g.defaultRemoteImg,Remoteimg.prototype.init=function(e){var t=this
this.mpeditor=e.mpeditor,this.editor=e.mpeditor.getUeditor(),this.domUtils=UE.dom.domUtils,this.uiUtils=UE.ui.uiUtils,this._g={hasBindCatchFailEvent:!1,event:null,catchRetryCache:{},noEditableMouseoutId:null,popupCloseId:null,popupErrDom:null,popupAnchorEl:null,hasBindPopupEventL:!1,stopImgErrMouseoverout:!1},this.localDomain=["127.0.0.1","localhost","mmbiz.qpic.cn","mmbiz.qlogo.cn","mmsns.qpic.cn"],this.domCache={catchTipsDom:e.catchTipsDom||null,catchTipsLoading:null,catchTipsMsg:null,catchTipsRetry:null,catchTipsNext:null},this.catcherUrl=this.editor.options.catcherUrl,this.catchQueue=[],this.catchConcurrent=5,this.catchTimeoutId=null,this.catching=!1,this.uploadUrl=(~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"")+"/cgi-bin/filetransfer?action=upload_material&f=json&scene=8&writetype=doublewrite&groupid=3&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time,this.uploadUrl=wx.url(this.uploadUrl),this.uploadQueue=[],this.uploadConcurrent=this.catchConcurrent,this.uploadTimeoutId=null,this.uploading=!1,this.id=+new Date,this.remoteList={},this.Blob_obj_support=function(){try{return!!window.Blob&&Boolean(new Blob)}catch(e){return!1}}(),this.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,this.dataURLtoBlobSupport=!!((t.BlobBuilder||t.Blob_obj_support)&&window.atob&&window.ArrayBuffer&&window.Uint8Array),this.Blob_Uint8Array_support=function(){try{return!!t.Blob_obj_support&&!!window.Uint8Array&&100===new Blob([new Uint8Array(100)]).size}catch(e){return!1}}(),this.defineEvent()},Remoteimg.prototype.getName=function(){return"remoteimg"},Remoteimg.prototype.defineEvent=function(){var l=this
this._g.event={keyupCheckCatchFail:function(){l.handleCatchTips({needPost:!1})},localretry:function(e){var t=$(this),o=t.attr("data-remoteid"),r=$(l.editor.body).find(g.catchErrTagName+"."+g.catchErrClass+'[data-remoteid="'+o+'"]')
if(0!==r.length){var i=r.attr("data-canretry")
o&&2==+i&&(l.editor.selection.getRange().selectNode(r[0]).select(),l.editor.fireEvent("uploadLocalImg",{evt:e}),t.val(""),l.resetCatchErrPopup())}},retryCatch:function(){var e=$(this).attr("data-remoteid"),t=$(l.editor.body).find(g.catchErrTagName+"."+g.catchErrClass+'[data-remoteid="'+e+'"]')
if(0!==t.length){var o=t.attr("data-canretry")
e&&l._g.catchRetryCache[e]&&1==+o&&l.retryRemoteCatch({uid:e,$errDom:t})}},globalRetryCatch:function(){var e=$(l.editor.body).find(g.catchErrTagName+"."+g.catchErrClass)
if(0!==e.length){var r=!1
e.each(function(){var e=$(this),t=e.attr("data-remoteid"),o=e.attr("data-canretry")
t&&l._g.catchRetryCache[t]&&1==+o&&(r||(l.domCache.catchTipsLoading&&$(l.domCache.catchTipsLoading).show(),l.domCache.catchTipsRetry&&$(l.domCache.catchTipsRetry).hide()),r=!0,l.retryRemoteCatch({uid:t,$errDom:e}))})}else l.handleCatchTips({needPost:!1})},noeditableDel:function(e,t){var o=1<arguments.length&&void 0!==t?t:{}
if(0<=(o.dom.getAttribute("class")||"").indexOf(g.catchErrClass)){var r=o.dom.getAttribute("data-remoteid")
r&&$(this.body).find('[data-remoteid="'+r+'"]').remove(),l.resetCatchErrPopup()}},noEditableMouseover:function(e,t){l._g.stopImgErrMouseoverout||(l._g.noEditableMouseoutId&&(clearTimeout(l._g.noEditableMouseoutId),l._g.noEditableMouseoutId=null),0<=(t.target.getAttribute("class")||"").indexOf(g.catchErrClass)&&l.showCatchErrPopup({dom:t.target}))},popupMouseover:function(){if(!l._g.stopImgErrMouseoverout){var e=this.getAttribute("data-remoteid"),t=null
e&&(t=$(l.editor.body).find(g.catchErrTagName+"."+g.catchErrClass+'[data-remoteid="'+e+'"]')),t&&0<t.length&&l._g.noEditableMouseoutId&&(clearTimeout(l._g.noEditableMouseoutId),l._g.noEditableMouseoutId=null)}},noEditableMouseout:function(){l._g.stopImgErrMouseoverout||(l._g.noEditableMouseoutId&&(clearTimeout(l._g.noEditableMouseoutId),l._g.noEditableMouseoutId=null),l._g.noEditableMouseoutId=setTimeout(function(){l.resetCatchErrPopup()},100))},popupMouseout:function(){l._g.stopImgErrMouseoverout||(l._g.noEditableMouseoutId&&(clearTimeout(l._g.noEditableMouseoutId),l._g.noEditableMouseoutId=null),l._g.noEditableMouseoutId=setTimeout(function(){l.resetCatchErrPopup()},100))},nextCatchErr:function(){var e=$(l.editor.body).find(g.catchErrTagName+"."+g.catchErrClass)
if(0!==e.length){var t=0,o=-1
e.each(function(){if(o++,$(this).hasClass(g.catchErrSelectClass))return t=o+1,!1}),t>e.length-1&&(t=0)
var r=e.eq(t)
l.selectcatchErrDom({$dom:r}),l.domCache.catchTipsNext&&(t===e.length-1?l.domCache.catchTipsNext.innerHTML="查看失败图片":l.domCache.catchTipsNext.innerHTML="查看下一张"),l.scrollIntoView({node:r,select:!0})}else l.handleCatchTips({needPost:!1})},handleCommonPopup:function(e,t,o){if((2<arguments.length&&void 0!==o?o:{}).from===l.getName()&&l._g.popupErrDom){var r=l._g.popupErrDom,i=null,a=null
if(r.nodeName.toLowerCase()===g.catchErrTagName&&0<=(r.getAttribute("class")||"").indexOf(g.catchErrClass)&&(i=r),i&&(a=$(i).find(".js_loaded .img")[0]),a){l._g.popupAnchorEl=a
var s=i.getAttribute("data-cacheurl")||"",n=s
20<s.length&&(n=s.substr(0,10)+"..."+s.substr(-7))
var c={scene:i.getAttribute("data-scene"),filename:decodeURIComponent(i.getAttribute("data-filename")||""),canRetry:i.getAttribute("data-canretry"),reason:decodeURIComponent(i.getAttribute("data-reason")||""),uid:i.getAttribute("data-remoteid"),url:i.getAttribute("data-cacheurl"),shortUrl:n},d=wx.T(popupTpl,c)
if(l._g.popupCloseId=Math.random(),t&&t.data)return l.bindPopupEvent(),t.data=[{html:d,renderData:c,renderTpl:popupTpl,cmd:l.getName(),node:a,closeId:l._g.popupCloseId,pos:"bottomcenter"}],!0}}},windowScrollEvent:function(){l.updatePopupPos()}}},Remoteimg.prototype.unSelectcatchErrDom=function(){$(this.editor.body).find(g.catchErrTagName+"."+g.catchErrClass+"."+g.catchErrSelectClass).removeClass(g.catchErrSelectClass)},Remoteimg.prototype.selectcatchErrDom=function(e){e.$dom.hasClass(g.catchErrClass)&&e.$dom[0].nodeName.toLowerCase()===g.catchErrTagName&&(e.$dom.hasClass(g.catchErrSelectClass)||(this.unSelectcatchErrDom(),e.$dom.addClass(g.catchErrSelectClass)))},Remoteimg.prototype.scrollIntoView=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
if(e.node&&0!==e.node.length){!0===e.select&&this.editor.selection.getRange().selectNode(e.node[0]).select()
var t=this,o=null
this._g.stopImgErrMouseoverout=!0,$("html,body").animate({scrollTop:e.node.offset().top+(e.offset||100)},function(){o&&(clearTimeout(o),o=null),o=setTimeout(function(){t.showCatchErrPopup({dom:e.node[0]}),t._g.stopImgErrMouseoverout=!1},20)})}},Remoteimg.prototype.showCatchErrPopup=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
this.resetCatchErrPopup(),this._g.popupErrDom=e.dom,this.editor.fireEvent("hide_img_scale"),this.editor.fireEvent("trigger_showpopup",{from:this.getName()}),this.updatePopupPos()},Remoteimg.prototype.resetCatchErrPopup=function(){this._g.popupCloseId&&(this.editor.fireEvent("reset_common_popup",this._g.popupCloseId),this._g.popupCloseId=null,this._g.popupErrDom=null,this._g.popupAnchorEl=null,this.unbindPopupEvent())},Remoteimg.prototype.updatePopupPos=function(){if(this._g.popupCloseId&&this._g.popupAnchorEl){var e,t=1/0,o=0,s=this.uiUtils.getClientRect(this._g.popupAnchorEl),r=$("#bottom_main"),i=this.editor.ui.getDom("toolbarbox")
if(r&&r[0]&&(t=this.uiUtils.getClientRect(r[0]).top),i){var a=this.uiUtils.getClientRect(i)
o=a.top+a.height}e=this.uiUtils.getClientRect(this.editor.iframe).bottom,s.bottom<o||s.top>t||e<100?this.editor.fireEvent("hide_common_popup",this._g.popupCloseId):this.editor.fireEvent("update_common_popup",this._g.popupCloseId,{pos:"bottomcenter",beforeSetOffset:function(e){var t=$(e.popEl).find(".js_triangle"),o=t[0].getBoundingClientRect(),r=o.height,i=o.width
t.css({left:s.left+s.width/2-e.left-i/2})
var a=void 0
return"top"===e.relativePos?(t.addClass("top").removeClass("bottom"),a=e.top-r):"bottom"===e.relativePos&&(t.addClass("bottom").removeClass("top"),a=e.top+r),{top:a}}})}},Remoteimg.prototype.bindPopupEvent=function(){this.unbindPopupEvent(),this._g.hasBindPopupEvent||(this._g.hasBindPopupEvent=!0,$(document.body).on("mouseover","."+g.popupClass,this._g.event.popupMouseover).on("mouseout","."+g.popupClass,this._g.event.popupMouseout),$(this.editor.window).scroll(this._g.event.windowScrollEvent),$(window).scroll(this._g.event.windowScrollEvent))},Remoteimg.prototype.unbindPopupEvent=function(){this._g.hasBindPopupEvent&&(this._g.hasBindPopupEvent=!1,$(document.body).off("mouseover","."+g.popupClass,this._g.event.popupMouseover).off("mouseout","."+g.popupClass,this._g.event.popupMouseout),$(this.editor.window).off("scroll",this._g.event.windowScrollEvent),$(window).off("scroll",this._g.event.windowScrollEvent))},Remoteimg.prototype.beforeEditorDestory=function(){this.removeCatchFailEvent(),this.resetCatchErrPopup()},Remoteimg.prototype.retryRemoteCatch=function(e){if(e.uid&&this._g.catchRetryCache[e.uid]){e.$errDom.find(".js_loading").show(),e.$errDom.find(".js_loaded").hide()
var t=this._g.catchRetryCache[e.uid],o=t.scene
"upload"===o?(this.setRemoteTag({dom:e.$errDom[0],uid:e.uid}),this.addUploadQueue({uid:e.uid,url:t.url,myFormData:t.formData,success:t.success,error:t.error})):"catch"===o&&(this.setRemoteTag({dom:e.$errDom[0],uid:e.uid}),this.addCatchremoteimageQueue({uid:e.uid,imgUrl:t.imgUrl,success:t.success,error:t.error}))}},Remoteimg.prototype.bindCatchFailEvent=function(){this._g.hasBindCatchFailEvent||(this._g.hasBindCatchFailEvent=!0,this.editor.addListener("keyup",this._g.event.keyupCheckCatchFail),this.editor.addListener("noEditableMouseover",this._g.event.noEditableMouseover),this.editor.addListener("noEditableMouseout",this._g.event.noEditableMouseout),this.editor.addListener("noeditableDel",this._g.event.noeditableDel),this.editor.addListener("handle_common_popup",this._g.event.handleCommonPopup),$(document.body).on("click",".js_remoteimgretry",this._g.event.retryCatch),$(document.body).on("change",".js_uploadlocalimgretry",this._g.event.localretry),this.domCache.catchTipsDom&&($(this.domCache.catchTipsDom).on("click",".js_msg_retry",this._g.event.globalRetryCatch),$(this.domCache.catchTipsDom).on("click",".js_msg_next",this._g.event.nextCatchErr)),NoEditable.handleEvent({editor:this.mpeditor}))},Remoteimg.prototype.removeCatchFailEvent=function(){this._g.hasBindCatchFailEvent&&(this._g.hasBindCatchFailEvent=!1,this.editor.removeListener("keyup",this._g.event.keyupCheckCatchFail),this.editor.removeListener("noEditableMouseover",this._g.event.noEditableMouseover),this.editor.removeListener("noEditableMouseout",this._g.event.noEditableMouseout),this.editor.removeListener("noeditableDel",this._g.event.noeditableDel),this.editor.removeListener("handle_common_popup",this._g.event.handleCommonPopup),$(document.body).off("click",".js_remoteimgretry",this._g.event.retryCatch),$(document.body).off("change",".js_uploadlocalimgretry",this._g.event.localretry),this.domCache.catchTipsDom&&($(this.domCache.catchTipsDom).off("click",".js_msg_retry",this._g.event.globalRetryCatch),$(this.domCache.catchTipsDom).off("click",".js_msg_next",this._g.event.nextCatchErr)),NoEditable.handleEvent({editor:this.mpeditor}),this.resetCatchErrPopup())},Remoteimg.prototype.countSentence=function(e){var t=0,o=CheckTextUtils.splitChar,r="=#,@",i={list:[]}
try{for(var a=e.getData("text/plain").replace(/\n/g,r),s=0,n=o.length;s<n;s++){var c=o[s]
d=c.escape?new RegExp("\\"+c.value,"g"):new RegExp(c.value,"g"),a=a.replace(d,r)}for(var d=new RegExp("(=#,@)+","g"),l=new RegExp("^(=#,@)","g"),u=new RegExp("(=#,@)$","g"),m=(a=a.replace(d,r).replace(l,"").replace(u,"")).split(r),p=0,h=m.length;p<h;p++){var g=m[p]
g&&g.replace(/\s/g,"")&&i.list.push(g)}t=i.list.length,setTimeout(function(){Cgi.post({url:"/cgi-bin/spellingcheck?action=report",data:{scene:1,sentence_list:JSON.stringify(i)}})},0)}catch(e){}0<t&&(Report.addNum(65080,110,1),Report.addNum(65080,111,t))},Remoteimg.prototype.addEvent=function(){var E=this,T=this.editor
this.mpeditor
T.addListener("ready",function(){E.domCache.catchTipsDom||(E.domCache.catchTipsDom=this.ui.getDom().querySelector(".js_catch_tips"))}),T.addListener("onpasting",function(e,t){var o=null,r=t.clipboardData?t.clipboardData:t.originalEvent&&t.originalEvent.clipboardData?t.originalEvent.clipboardData:{},i=r.items
if(i&&0<i.length){Report.addNum(Report.reportId[2],5,1),1==i.length&&/image/i.test(i[0].type)&&(o=i[0].getAsFile())
for(var a=0,s=i.length;a<s;a++)/text\/rtf/i.test(i[a].type)&&Report.addNum(Report.reportId[2],6,100)
E.countSentence(r)}return E.catchObjectBlob(o)}),T.addListener("afterpaste aftersetcontent afterscencerestore afterinserthtml beforeGetEditorData",function(e,t,o){o=o||[this.body]
for(var r,i,a,s,n=[],c=[],d=0;s=o[d++];)if(s.tagName){if(r="img"==s.tagName.toLowerCase()?[s]:E.domUtils.getElementsByTagName(s,"img"),c="svg"==s.tagName.toLowerCase()?[s]:E.domUtils.getElementsByTagName(s,"svg"),"afterpaste"===e)for(var l=0;l<c.length;l++)if(!(c[l].parentNode&&"svg"==c[l].parentNode.tagName.toLowerCase()||0<=(c[l].getAttribute("class")||"").indexOf(g.noCatchClass))){var u=[]
$.each(c[l].attributes,function(){if(this&&this.name&&0<this.name.indexOf(":")){var e=this.name.split(":")
1<e.length&&"xlink"!=e[1]&&u.push(this.name)}})
for(var m=0;m<u.length;m++)c[l].removeAttribute(u[m])
var p=document.createElement("embed"),h=Utils.replaceHtml(c[l].outerHTML||(new XMLSerializer).serializeToString(c[l]),!1)
if(!(h.length<11e3)){var f=c[l].getAttribute("width"),v=c[l].getAttribute("height"),b=c[l].getAttribute("style")
f&&p.setAttribute("width",f),v&&p.setAttribute("height",v),b&&p.setAttribute("style",b),c[l].parentNode.replaceChild(p,c[l]),E.catchDataSvg(h,p)}}for(var y,C=0;y=r[C++];)if(!(0<=(y.getAttribute("class")||"").indexOf(g.noCatchClass))){if(E.handleDataSrc(y),i=y.getAttribute("style")||y.style.cssText||"",y.getAttribute("src")&&/;?\s*(background|background-image)\s*\:/.test(i)&&($(y).css({"background-image":"none"}).removeClass("img_loading"),Filter.filterStyleAttr(y,["background-image"])),y.src===g.appmsgTmpImg){var _=y.getAttribute("data-src")
_&&E.isLocalDomain(_)&&(y.src=_,y.removeAttribute("data-src"))}E.http2https("img",y),a=y.getAttribute("_src")||y.src||"",/^(https?|ftp):/i.test(a)&&!E.isLocalDomain(a)?T.fireEvent("catchRemoteImage",y,"img",a):/^data:image/i.test(a)?E.catchDataUrl(a,y):/^blob:/i.test(a)?E.catchObjectUrl(y,a):E.isLocalDomain(a)||y.parentNode&&y.parentNode.removeChild(y)}for("afterpaste"==e&&0<r.length&&T.fireEvent("afterpasteimg","",r),(n=[s]).push.apply(n,E.domUtils.getElementsByTagName(s,"*")),C=0;y=n[C++];)if(!(0<=(y.getAttribute("class")||"").indexOf(g.noCatchClass))&&(!(i=y.getAttribute("style")||"")&&y.style&&y.style.cssText&&(i=y.style.cssText),(i=i.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/))&&i[2])){a=i[2].replace(/^['"]|['"]$/g,"")
var R=E.http2https("bg",y,a)
a=R&&R.url?R.url:a,/^(https?|ftp):/i.test(a)&&!E.isLocalDomain(a)?T.fireEvent("catchRemoteImage",y,"bg",a):/^data:image/i.test(a)?E.catchDataUrl(a,y):/^blob:/i.test(a)?E.catchObjectUrl(y,a):E.isLocalDomain(a)||(y.style.background="")}for(C=0;y=n[C++];)y.style&&(y.style.borderImage="",y.style.borderImageSource="")}}),T.addListener("catchRemoteImage",function(e,t,o,i){var a=E.setRemoteTag({dom:t,uid:"c"+E.getuid()})
if(a){var r=a.uid
"bg"==o?T.fireEvent("funcPvUvReport","remoteimg_style"):"img"==o&&T.fireEvent("funcPvUvReport","remoteimg_img"),E.addCatchremoteimageQueue({imgUrl:i,uid:r,success:function(e){var t=0<arguments.length&&void 0!==e?e:{},o=!1
if(0==t.errcode&&t.url)o=!0
else{var r="errorcode:"+t.errcode+", cgi:"+i
WX_BJ_REPORT.BadJs.report("UndefinedErrorCode",r,{mid:"mmbizweb2:appmsgMonitor"}),o=!1}E.catchremoteResult({cgiType:"catch",scene:"catch",pvReport:!0,uid:a.uid,article:a.article,format:t.img_format,url:t.url,isSuccess:o,responseCode:t.errcode})},error:function(){E.catchremoteResult({cgiType:"catch",scene:"catch",pvReport:!0,uid:a.uid,article:a.article,format:"",url:"",isSuccess:!1,responseCode:-9999})}})}}),T.addListener("checkRemoteList",function(e,t){return E.checkRemoteList(!0===t)}),T.addListener("getRemoteList",function(e,t){return E.remoteList}),T.addListener("aftersetcontent afterscencerestore cleardoc",function(){E.handleCatchTips({needPost:!1})}),T.addListener("handleCatchTips",function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}
return E.handleCatchTips({$dom:t.$dom,needPost:t.needPost})})},Remoteimg.prototype.catchremoteResult=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
this.remoteList[e.uid]&&delete this.remoteList[e.uid]
var t=e.responseCode,o=!!e.isSuccess
if(window.__testMpCatchImgCode&&(t=window.__testMpCatchImgCode,o=!1),o&&this._g.catchRetryCache[e.uid]&&delete this._g.catchRetryCache[e.uid],e.pvReport){var r=""
"catch"===e.scene?r=e.isSuccess?"remoteimgsuc":"remoteimgerr":"upload"===e.scene&&(r=e.isSuccess?"screen_shot_suc":"screen_shot_fail"),r&&this.editor.fireEvent("funcPvUvReport",r)}this.updateRemoteImg({article:e.article,isSuccess:o,uid:e.uid,format:e.format,img_url:e.url,cgiType:e.cgiType,scene:e.scene,responseCode:t,filename:e.filename}),this.handleCatchTips({needPost:!0}),this.editor.fireEvent("adjustheight")},Remoteimg.prototype.updateRemoteImg=function(e){var t=e.article
if(!t||!0===this.editor.fireEvent("is_article_alive",t)){var o=!1,r=null,i=null,a=null;(r=!t||t.hasClass("current")?(o=!0,$(this.editor.body).find("[data-remoteid="+e.uid+"]")):(this.mpeditor.funcPvUvReport("not_cur_img_count"),i=t.data("article").data,(a=$("<div>").html(i.get("content")||"")).find("[data-remoteid="+e.uid+"]")))&&0!==r.length&&(this.changeRemoteImgUrl({imgDom:r,isSuccess:e.isSuccess,format:e.format,img_url:e.img_url,scene:e.scene,cgiType:e.cgiType,responseCode:e.responseCode,uid:e.uid,filename:e.filename}),!o&&i&&t&&a&&(i.set("content",a.html()),t.data("article").data.setData(i.getData())))}},Remoteimg.prototype.changeRemoteImgUrl=function(a){var u=this,e=a.imgDom,i=a.format,s=a.img_url
if(e&&0!=e.length){var m=function(e){var t=u.analyzeResp({cgiType:a.cgiType,code:a.responseCode})
!t.canRetry&&u._g.catchRetryCache[a.uid]&&delete u._g.catchRetryCache[a.uid]
var o="0"
return t.canRetry?o="1":t.isGloabl||"upload"!==a.scene||(o="2"),template.compile(ImgFailTpl)({uid:a.uid,isGloabl:t.isGloabl?"1":"0",canRetry:o,scene:a.scene,reasonEncode:encodeURIComponent(t.wording),reason:t.wording,imgType:e.imgType,width:e.width,height:e.height,cacheUrl:/^http(s)?:\/\//.test(e.url)?e.url:"",filenameEncode:encodeURIComponent(a.filename),filename:a.filename})},o=this,n=function(e){if(e.$dom.removeAttr("data-remoteid").removeAttr("data-cacheurl").removeClass(g.noCatchClass).removeClass(g.cacheDomClass).data("cacheurl","").data("remoteid",""),/^blob:/.test(e.oldUrl))try{var t=o.editor.window;(t.window.URL||t.window.webkitURL).revokeObjectURL(e.oldUrl)}catch(e){}},c=function(e){var t=e.$dom.attr("src"),o=e.$dom.attr("data-src")
if(o&&!t?e.$dom.attr("data-src",s):e.$dom.attr("src",s).removeAttr("data-src").data("src",""),i&&e.$dom.attr({"data-type":i}),"embed"==e.imgType){var r=e.$dom.attr("height")
r?e.$dom.css("height",r):e.$dom.css("height","auto")}n({$dom:e.$dom,oldUrl:t||o||""})},p=function(e){var t="",o=e.$dom.attr("style")||e.$dom[0].style.cssText||""
return(o=o.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/))&&o[2]&&(t=o[2].replace(/^['"]|['"]$/g,"")),t=t||(e.$dom.attr("data-cacheurl")||"")},d=function(e){for(var t=-1,o=-1,r=-1,i=-1,a=e.$dom;a&&0<a.length&&"body"!==a[0].nodeName.toLowerCase();){if(i=a.width(),r=a.height(),0<i&&0<r){t=i,o=r
break}a=a.parent()}"embed"===e.imgType&&(o=(o=e.$cacheDom.attr("height"))?parseInt(o,10):-1),-1===t&&(t=$(u.editor.body).width())
var s=null
if("img"==e.imgType||"embed"==e.imgType){var n=e.$cacheDom.attr("src")||e.$cacheDom.attr("data-src")||e.$cacheDom.attr("data-cacheurl")||"";/^data:/.test(n)&&(n="")
var c=m({imgType:e.imgType,height:o,width:t,url:n});(s=$(c).insertAfter(e.$dom)).append(e.$cacheDom),e.$cacheDom.removeAttr("src").removeAttr("data-remoteid").attr("data-cacheurl",n).addClass(g.cacheDomClass).addClass(g.noCatchClass).hide()}else if("bg"==e.imgType){var d=p({$dom:e.$bgDom});/^data:/.test(d)&&(d="")
var l=m({imgType:e.imgType,height:o,width:t,url:d})
s=$(l).insertAfter(e.$dom),e.$bgDom.css({"background-image":"none"}).attr("data-cacheurl",d)}NoEditable.setDisable({editor:u.mpeditor,dom:s[0],mouseover:!0})}
e.removeAttr("_src"),e.each(function(){var e,t=$(this)
if(t.hasClass(g.catchErrClass)){var o=t.attr("data-imgtype")
if("img"===o||"embed"===o){var r=t.find("."+g.cacheDomClass)
a.isSuccess?r&&0<r.length&&(r.insertBefore(t).show(),c({$dom:r,imgType:o})):d({$dom:t,$bgDom:t,$cacheDom:r,imgType:o})}t.remove()}else{var i=""
i=/^img$/i.test(this.nodeName)?"img":/^embed$/i.test(this.nodeName)?"embed":"bg",a.isSuccess?"img"==i||"embed"==i?c({$dom:t,imgType:i}):"bg"==i&&((e={$dom:t}).$dom.css({"background-image":"url("+s+")"}),n({$dom:e.$dom,oldUrl:p({$dom:e.$dom})})):d({$dom:t,$bgDom:t,$cacheDom:t,imgType:i})}})}},Remoteimg.prototype.initCatchTipsDom=function(){var e=this.domCache
e.catchTipsDom&&(e.catchTipsLoading=e.catchTipsDom.querySelector(".js_msg_loading"),e.catchTipsMsg=e.catchTipsDom.querySelector(".js_msg_content"),e.catchTipsRetry=e.catchTipsDom.querySelector(".js_msg_retry"),e.catchTipsNext=e.catchTipsDom.querySelector(".js_msg_next"))},Remoteimg.prototype.handleCatchTips=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=this.domCache
if(t.catchTipsMsg||(this.initCatchTipsDom(),t.catchTipsMsg)){var o=e.$dom
o&&0!==o.length||(o=$(this.editor.body))
var r=this.checkRemoteList(e.needPost),i=o.find(g.catchErrTagName+"."+g.catchErrClass),a=i.length
if(0<a){for(var s=!1,n=0;n<a;n++){if(0<=i[n].className.indexOf(g.catchErrSelectClass)){s=!0
break}}for(var c=Str.sprintf("有%s张图片上传失败。",a),d="",l=!1,u=0,m=i.length;u<m;u++){var p=i[u]
if("1"===p.getAttribute("data-global")){if("1"===p.getAttribute("data-canretry")){l=!0,d=decodeURIComponent(p.getAttribute("data-reason"))
break}d=d||decodeURIComponent(p.getAttribute("data-reason"))}}d&&(c+="原因："+d),t.catchTipsMsg&&(t.catchTipsMsg.innerHTML=c),r&&(t.catchTipsLoading&&(t.catchTipsLoading.style.display="none"),l?t.catchTipsRetry&&(t.catchTipsRetry.style.display=""):t.catchTipsRetry&&(t.catchTipsRetry.style.display="none")),s?t.catchTipsNext&&(t.catchTipsNext.innerHTML="查看下一张"):t.catchTipsNext&&(t.catchTipsNext.innerHTML="查看失败图片"),t.catchTipsDom&&(t.catchTipsDom.style.display="block"),this.bindCatchFailEvent()}else t.catchTipsDom&&(t.catchTipsDom.style.display="none"),this.removeCatchFailEvent()
return{errNum:a}}},Remoteimg.prototype.catchObjectBlob=function(t,o){var r=this,e=this.editor,i=!1
if(null!==t&&(i=r.filterImgSize(t)),null!==t&&!0!==i)return r.pasteImageError({msg:i.msg?i.msg:"图片粘贴失败",dom:o}),!0
if(null!==t&&!0===i){var a,s=t.type.split("/")[1]||""
if(a=e.window.URL||e.window.webkitURL){var n=a.createObjectURL(t)
if("string"==typeof n)return o?r.uploadPasteImg({image:n,blob:t,type:s,dom:o}):r.pasteImageInserted({image:n,blob:t,type:s}),!0}if("function"!=typeof FileReader)return!1
var c=new FileReader
return c.onload=function(e){e.target&&2==e.target.readyState&&(o?r.uploadPasteImg({image:n,blob:t,type:s,dom:o}):r.pasteImageInserted({image:e.target.result,blob:t,type:s}))},c.onerror=function(){r.pasteImageError({msg:"图片粘贴失败",dom:o})},c.readAsDataURL(t),!0}},Remoteimg.prototype.catchObjectUrl=function(a,e){var s=this,n=this.editor,t=s.setRemoteTag({dom:a,uid:"p"+s.getuid()})
if(t){var c=t.uid,d=new Image
d.onerror=function(){s.remoteList[c]&&delete s.remoteList[c],n.fireEvent("catchremoteerror",t,""),s.checkRemoteList(!0)},d.onload=function(){s.remoteList[c]&&delete s.remoteList[c],d.onerror=null,d.onload=null
var e=d.width||d.naturalWidth,t=d.height||d.naturalHeight,o=n.document.createElement("canvas"),r=o.getContext("2d")
o.width=e,o.height=t,r.drawImage(d,0,0,e,t)
var i=o.toDataURL()
s.catchDataUrl(i,a)},d.src=e}},Remoteimg.prototype.catchDataSvg=function(e,t){var o=this.svgToBlob(e)
this.uploadPasteImg({blob:o,dom:t})},Remoteimg.prototype.catchDataUrl=function(e,t){var o=this,r=o.dataURLtoBlob(e),i=!1
if(r&&!o.validImg(r)&&(r=null),r)if(!0===(i=o.filterImgSize(r))){var a=r.type.split("/")[1]||""
o.uploadPasteImg({image:e,blob:r,dom:t,type:a})}else o.pasteImageError({msg:i.msg?i.msg:"图片粘贴失败",dom:t})
else o.pasteImageError({msg:"图片粘贴失败",dom:t})},Remoteimg.prototype.objectUrl2Blob=function(e,t,o){var r=new XMLHttpRequest
r.onerror=function(e){"function"==typeof o&&o()},r.onreadystatechange=function(e){4===r.readyState&&(r.onreadystatechange=null,r.onerror=null,200<=r.status&&r.status<300?"function"==typeof t&&t(this.response):"function"==typeof o&&o())},r.responseType="blob",r.open("GET",e,!0),r.send()},Remoteimg.prototype.pasteImageError=function(e){var t=this.editor
if(e.dom){var o=this.setRemoteTag({dom:e.dom,force:!0,uid:"p_"+this.getuid()})
this.remoteList[o.uid]&&delete this.remoteList[o.uid],t.fireEvent("catchremoteerror",o,e.msg||"")}else t.fireEvent("catchremoteerror",null,e.msg||"")},Remoteimg.prototype.pasteImageInserted=function(e){for(var t=this.editor.fireEvent("insertMaterialImg",[{format:e.type,src:e.image}]),o=0,r=t.length;o<r;o++){var i=t[o]
if(/^img$/i.test(i.nodeName)){e.dom=i
break}var a=i.getElementsByTagName("img")
if(a&&0<a.length){e.dom=a[0]
break}}e.dom&&/^img$/i.test(e.dom.nodeName)&&this.uploadPasteImg(e)},Remoteimg.prototype.svgToBlob=function(e){return new Blob([e],{type:"image/svg+xml"})},Remoteimg.prototype.dataURLtoBlob=function(e){if(!this.dataURLtoBlobSupport)return!1
try{var t,o=e.split(",")
t=0<=o[0].indexOf("base64")?window.atob(o[1]):decodeURIComponent(o[1])
for(var r=new ArrayBuffer(t.length),i=new Uint8Array(r),a=0,s=t.length;a<s;a++)i[a]=t.charCodeAt(a)
var n=o[0].split(":")[1].split(";")[0]
if(this.Blob_obj_support)return this.Blob_Uint8Array_support?new Blob([i],{type:n}):new Blob([r],{type:n})
var c=new BlobBuilder
return c.append(r),c.getBlob(n)}catch(e){return!1}},Remoteimg.prototype.setRemoteTag=function(e){var t=this.editor.fireEvent("get_current_article")
if(!e.dom||!e.uid)return!1
var o=e.dom.getAttribute("data-remoteid")
if(o&&this.remoteList[o]){if(!0!==e.force)return!1
delete this.remoteList[o]}o=o||e.uid
var r=this.remoteList[o]={article:t,uid:o,defaultRemoteImg:g.defaultRemoteImg}
return this.domUtils.setAttributes(e.dom,{"data-remoteid":o}),r},Remoteimg.prototype.uploadPasteImg=function(e){var a=this
this.editor
if("function"!=typeof FormData)return a.pasteImageError({msg:"粘贴图片失败",dom:e.dom}),!1
var t=this.getuid(),s=a.setRemoteTag({dom:e.dom,uid:"p_"+t})
if(s){var o=s.uid,r=$(e.dom),i=r.data("filename"),n=0<=(r.attr("class")||"").indexOf("js_insertlocalimg"),c=wx&&wx.getSeq(),d=new FormData,l=e.blob.type.split("/")[1]||"",u=this.uploadUrl+"&seq="+c,m=i||"粘贴图片_"+this.formatDate(new Date,"YYYYMMDDHHIISS")+(l?"."+l:"")
d.append("id",t),d.append("name",m),d.append("type",e.blob.type),d.append("lastModifiedDate",new Date),d.append("size",e.blob.size),d.append("file",e.blob,m),this.addUploadQueue({uid:o,url:u,myFormData:d,success:function(e){var t=0<arguments.length&&void 0!==e?e:{},o=!1,r=""
if(t.base_resp&&0==t.base_resp.ret&&t.cdn_url)r=t.cdn_url.http2https(),o=!0
else{var i="errorcode:"+t.base_resp.ret+", cgi:"+u
WX_BJ_REPORT.BadJs.report("UndefinedErrorCode",i,{mid:"mmbizweb2:appmsgMonitor"}),o=!1}a.catchremoteResult({cgiType:"upload",scene:n?"upload":"catch",pvReport:!0,uid:s.uid,article:s.article,format:l,url:r,isSuccess:o,responseCode:t.base_resp?t.base_resp.ret:-999,filename:m})},error:function(){a.catchremoteResult({cgiType:"upload",scene:n?"upload":"catch",pvReport:!0,uid:s.uid,article:s.article,format:"",url:"",isSuccess:!1,responseCode:-999,filename:m})}})}},Remoteimg.prototype.addUploadQueue=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.url,o=e.myFormData,r=this.uploadQueue[this.uploadQueue.length-1];(!r||r.length>=this.catchConcurrent)&&(r=[],this.uploadQueue.push(r)),r.push({scene:"upload",uid:e.uid,url:t,formData:o,success:e.success,error:e.error,retry:1}),this.uploadRequest()},Remoteimg.prototype.uploadRequest=function(){var _this2=this
this.uploading||(this.uploadTimeoutId&&(clearTimeout(this.uploadTimeoutId),this.uploadTimeoutId=null),this.uploadTimeoutId=setTimeout(function(){var queue=_this2.uploadQueue.shift()
if(queue&&0!==queue.length){var count=queue.length
_this2.uploading=!0
var completeCount=0,nextQueue=null,_myRequest=null
nextQueue=function(){completeCount===count&&(_myRequest=null,_this2.uploading=!1,_this2.uploadRequest())},_myRequest=function myRequest(){var opt=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},xhr=new XMLHttpRequest,errFunc=function(){var e=queue[opt.index]
e.retry?(e.retry=0,_myRequest(opt)):(completeCount++,nextQueue(),"function"==typeof e.error&&e.error.call(_this2))}
xhr.onerror=function(){xhr.onreadystatechange=null,xhr.onerror=null,errFunc()},xhr.onreadystatechange=function(){if(4===xhr.readyState)if(xhr.onreadystatechange=null,xhr.onerror=null,200<=xhr.status&&xhr.status<300){var json=null
try{json=eval("("+xhr.responseText+")")}catch(e){return void errFunc()}var myqueue=queue[opt.index]
completeCount++,nextQueue(),"function"==typeof myqueue.success&&myqueue.success.call(_this2,json)}else errFunc()},xhr.open("POST",queue[opt.index].url+"&t="+Math.random()),xhr.send(queue[opt.index].formData)}
for(var i=0;i<count;i++)_this2._g.catchRetryCache[queue[i].uid]=queue[i],_myRequest({index:i})}},0))},Remoteimg.prototype.analyzeResp=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t={wording:"",canRetry:!1,isGloabl:!0},o=+e.code
switch(window.__testMpCatchImgCode&&(o=+window.__testMpCatchImgCode),o){case-1:t.wording="系统繁忙",t.canRetry=!0
break
case 200003:t.wording="登录超时",t.canRetry=!1
break
case 200004:t.wording="没有授权",t.canRetry=!0
break
case 200005:t.wording="请求错误",t.canRetry=!0
break
case 200006:t.wording="数据校验错误",t.canRetry=!0
break
case 200007:t.wording="没有访问权限",t.canRetry=!0
break
case 200040:t.wording="登录超时",t.canRetry=!1
break
default:if(t.isGloabl=!1,"upload"===e.cgiType)switch(o){case-18:case 200018:t.wording="页面停留时间过久",t.canRetry=!1,t.isGloabl=!0
break
case-20:case 200020:t.wording="图片解析错误",t.canRetry=!1
break
case-13:case 200013:t.wording="上传文件过于频繁",t.canRetry=!0,t.isGloabl=!0
break
case-10:case 200010:t.wording="上传文件过大",t.canRetry=!1
break
case-39:case 200039:t.wording="图片高度（像素）与宽度（像素）的乘积不能超过600万",t.canRetry=!1
break
case 220001:case 220002:t.wording='"素材管理"中的存储数量已达到上限',t.canRetry=!0,t.isGloabl=!0
break
case 200077:t.wording="图片帧数超过300帧",t.canRetry=!1
break
default:t.wording="系统错误",t.canRetry=!0}else if("catch"===e.cgiType)switch(o){case 15001:t.wording="拉取图片数据失败",t.canRetry=!0
break
case 15002:t.wording="拉取图片数据格式错误",t.canRetry=!0
break
case 15003:t.wording="图片文件过大",t.canRetry=!1
break
default:t.wording="系统错误",t.canRetry=!0}}return t},Remoteimg.prototype.validImg=function(e){return!(e.size<1024)},Remoteimg.prototype.filterImgSize=function(e){var t=","+(e.type.split("/")[1]||"")+","
return 10485760<e.size?{type:1,msg:"截图的图片大小不能超过10M"}:-1!=",bmp,png,jpeg,jpg,gif,".indexOf(t)||{type:2,msg:"截图的图片必须为以下格式：bmp,png,jpeg,jpg,gif"}},Remoteimg.prototype.checkRemoteList=function(e){var t=0
for(var o in this.remoteList)this.remoteList.hasOwnProperty(o)&&t++
return!(0<t)&&(!0===e&&this.editor.fireEvent("remoteimg_all_complete"),!0)},Remoteimg.prototype.handleDataSrc=function(e){var t=e.getAttribute("src")||"",o=e.getAttribute("data-src")||"";/^data:image/i.test(t)&&(/^http:\/\/mmbiz\.qpic\.cn/.test(o)||/^https:\/\/mmbiz\.qpic\.cn/.test(o)||/^https:\/\/mmbiz\.qlogo\.cn/.test(o))&&(e.setAttribute("src",o),e.removeAttribute("data-src"))},Remoteimg.prototype.http2https=function(e,t,o){if("img"==e){var r=t.getAttribute("src")||""
if(!this.isCdnImg(r))return
var i=this.formatUrl(r)
return t.setAttribute("src",i.url),i.format&&t.setAttribute("data-type",i.format),t.removeAttribute("_src"),t.removeAttribute("data-src"),i}if("bg"==e&&o&&this.isCdnImg(o)){i=this.formatUrl(o)
return t.style.backgroundImage=i.url,i}return null},Remoteimg.prototype.formatUrl=function(e){var t=(e=e||"").match(/(?:\?|&)wx_fmt=(.*?)(?:&|$)/)||[]
return t=t[1]||"",e=e.http2https().replace(/\?.*$/,"?"),t&&e&&(e=e+"wx_fmt="+t),{url:e,format:t}},Remoteimg.prototype.addCatchremoteimageQueue=function(e){var t=this.catchQueue[this.catchQueue.length-1];(!t||t.length>=this.catchConcurrent)&&(t=[],this.catchQueue.push(t)),t.push({scene:"catch",uid:e.uid,imgUrl:e.imgUrl,success:e.success,error:e.error,retry:1}),this.catchremoteimageRequest()},Remoteimg.prototype.catchremoteimageRequest=function(){var s=this
this.catching||(this.catchTimeoutId&&(clearTimeout(this.catchTimeoutId),this.catchTimeoutId=null),this.catchTimeoutId=setTimeout(function(){var o=s.catchQueue.shift()
if(o&&0!==o.length){var e=o.length
s.catching=!0
var r,i=0,a=null
r=function(){i===e&&(a=null,s.catching=!1,s.catchremoteimageRequest())},a=function(e){var t=0<arguments.length&&void 0!==e?e:{}
Cgi.post({url:s.catcherUrl+"&t="+Math.random(),data:{imgurl:o[t.index].imgUrl,t:"ajax-editor-upload-img"}},function(e){if((!e||0!=+e.errcode||!e.url)&&o[t.index].retry)return o[t.index].retry=0,void a(t)
i++,r(),"function"==typeof o[t.index].success&&o[t.index].success.call(s,e)},function(){o[t.index].retry?(o[t.index].retry=0,a(t)):(i++,r(),"function"==typeof o[t.index].error&&o[t.index].error.call(s))})}
for(var t=0;t<e;t++)s._g.catchRetryCache[o[t].uid]=o[t],a({index:t})}},0))},Remoteimg.prototype.getuid=function(){return this.id++},Remoteimg.isCdnImg=Remoteimg.prototype.isCdnImg=function(e){for(var t,o=[/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmsns\.qpic\.cn([\/?].*)*$/i],r=0;t=o[r++];)if(t.test(e))return!0
return!1},Remoteimg.isLocalDomain=Remoteimg.prototype.isLocalDomain=function(e){for(var t,o=[/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/mp\.weixin\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/res\.wx\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/mmcomm\.qpic\.cn([\/?].*)*$/i],r=0;t=o[r++];)if(t.test(e))return!0
return!1},Remoteimg.prototype.formatDate=function(e,t){return t.replace(/yyyy|YYYY/,e.getFullYear()).replace(/yy|YY/,this.addZero(e.getFullYear()%100,2)).replace(/mm|MM/,this.addZero(e.getMonth()+1,2)).replace(/m|M/g,e.getMonth()+1).replace(/dd|DD/,this.addZero(e.getDate(),2)).replace(/d|D/g,e.getDate()).replace(/hh|HH/,this.addZero(e.getHours(),2)).replace(/h|H/g,e.getHours()).replace(/ii|II/,this.addZero(e.getMinutes(),2)).replace(/i|I/g,e.getMinutes()).replace(/ss|SS/,this.addZero(e.getSeconds(),2)).replace(/s|S/g,e.getSeconds())},Remoteimg.prototype.addZero=function(e,t){for(var o=0,r=t-(e+"").length;o<r;o++)e="0"+e
return e+""},Remoteimg})
"use strict"
define("3rd/editor/common/report.js",["3rd/editor/common/monitor.js","pages/modules/utils/cgi.js"],function(e,t,o){var r=e("3rd/editor/common/monitor.js"),l=e("pages/modules/utils/cgi.js"),u={debug:-1<window.location.href.indexOf("&_debug=1"),id:["28146","28305","65080"],keyConf:["autowidth","fontsize","blockquote","horizontal","removeformat","link","unlink","mpvideo","qqvideo","wxvideo","insertimage","insertvote","insertmusic","insertaudio","insertcard","bold","italic","underline","forecolor","backcolor","justifyleft","justifycenter","justifyright","rowspacingtop","rowspacingbottom","lineheight","insertorderedlist","insertunorderedlist","imagefloatnone","imagefloatleft","imagefloatright","imagefloatcenter","usecache","cover_from_article","showlink","hidelink","remoteimgsuc","remoteimgerr","cancel_autowidth","paste","formatmatch","contextmenu","menu_selectall","menu_cleardoc","menu_justifyleft","menu_justifyright","menu_justifycenter","menu_justifyjustify","menu_inserttable","menu_copy","menu_paste","menu_unlink","insertshop","menu_insertparagraphtrue","menu_insertparagraph","img_popup","link_popup","del_img","remoteimg_img","remoteimg_style","screen_shot_suc","screen_shot_fail","not_cur_img_count","save_remoting_img"],pv:{},uv:{},ohterData:{}}
function n(e,t){u.pv[e]&&(t=t||1,u.pv[e].count+=t,u.debug&&console.log("addpv:"+e+" count:"+u.pv[e].count))}function i(e){u.uv[e]&&(u.uv[e].count=1,u.debug&&console.log("addUv:"+e+" count:"+u.uv[e].count))}return function(){for(var e=0,t=u.keyConf.length;e<t;e++){var o=2*e,n=2*e+1,i=u.keyConf[e]
u.pv[i]={key:o,count:0},u.uv[i]={key:n,count:0}}}(),{logReport:function(e,t,o){var n=0,i=[],r={}
if(t&&"[object String]"==Object.prototype.toString.call(t))n=1,"img"==o&&(t=encodeURIComponent(t)),i.push("log0="+t),r.log0=t
else if(t&&"[object Array]"==Object.prototype.toString.call(t)){n=t.length
for(var u=0;u<n;u++){var a="img"==o?encodeURIComponent(t[u]):t[u]
i.push("log"+u+"="+a),r["log"+u]=a}}if("img"==o){var c=new Image,s="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e
0<n&&(s+="&lc="+n+"&"+i.join("&")),s+="&t="+Math.random(),c.src=s}else{var m={}
0<n&&(m=r),m.idkey=e,m.lc=n,l.post({url:"//mp.weixin.qq.com/mp/jsmonitor?",data:m,dataType:"json"})}},addPv:n,addUv:i,addPvUv:function(e,t){n(e,t),i(e)},setData:function(e){var t=u.id[e]||u.id[0]
for(var o in u.pv){0<(n=u.pv[o]).count&&r.setSum(t,n.key,n.count)}for(var o in u.uv){0<(n=u.uv[o]).count&&r.setSum(t,n.key,n.count)}for(var o in u.ohterData){var n
if(0<(n=u.ohterData[o]).count){var i=o.split("_")
r.setSum(i[0],i[1],n.count)}}},addNum:function(e,t,o){u.ohterData[e+"_"+t]||(u.ohterData[e+"_"+t]={count:0}),u.ohterData[e+"_"+t].count+=1*o||1,u.debug&&console.log("addNum:"+e+"_"+t+"_"+u.ohterData[e+"_"+t].count)},send:function(e){r.send({async:!1})},reportId:u.id}})
"use strict"
define("3rd/editor/common/monitor.js",["pages/modules/utils/cgi.js"],function(n,e,s){var o=n("pages/modules/utils/cgi.js"),r=[],t={setAvg:function(n,e,s){return r.push(n+"_"+e+"_"+s),r.push(n+"_"+(e-1)+"_1"),t},setSum:function(n,e,s){return r.push(n+"_"+e+"_"+s),t},send:function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
if(0!=r.length){var e=!1!==n.async
if(60<r.length)o.post({url:"/mp/jsmonitor?",async:e,data:{idkey:r.join(";")}})
else{var s=[]
for(s.push(r.splice(0,60));0<r.length;)s.push(r.splice(0,60))
for(var t=0,i=s.length;t<i;t++){(new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+s[t].join(";")+"&t="+Math.random()}}r=[]}}}
return t})
define("3rd/editor/tpl/img_fail.tpl.js",[],function(e,a,i){return'<section class="page_image_error js_catchremoteimageerror" data-remoteid="{uid}" data-scene="{scene}" data-global="{isGloabl}" data-canretry="{canRetry}" data-reason="{reasonEncode}" data-imgtype="{imgType}" data-cacheurl="{cacheUrl}" data-filename="{filenameEncode}" style="{if width>0}width:{width}px;{/if}{if height>0}height:{height}px;{/if}">  <section class=\'page_image_error_loading js_loading\' style="display: none;">        <i class="img js_nocatch js_noimgpopup js_noimgselected"></i>  </section>  <section class=\'page_image_error_loaded js_loaded\'>        <i class="img js_nocatch js_noimgpopup js_noimgselected"></i>  </section></section>'})
define("3rd/editor/tpl/remoteimg_popup.tpl.js",[],function(e,i,a){return'<div class="remoteimg js_remoteimgpopup edui_mask_edit_group edui_mask_edit_img_group" data-remoteid="{uid}" style="font-size: 14px;width: 300px;">  <i class="js_triangle remoteimg_triangle"></i>{if scene === \'upload\'}  <div class="remoteimg_title">    {if filename}<span>{filename}</span>{/if}&nbsp;上传失败</div>  <div class="remoteimg_desc">    {reason}    {if canRetry == \'2\'}    请调整后    <label class="remoteimg_upload" for="{uid}">重新上传</label>    <input id="{uid}" class="js_uploadlocalimgretry" data-remoteid="{uid}" data-canretry="{canRetry}" type="file" value="重新上传" style="display: none;"/>    {else if canRetry == \'1\'}    <a class="js_remoteimgretry" data-remoteid="{uid}" data-canretry="{canRetry}" href="javascript:;">重试</a>    {/if}  </div>{else if scene === \'catch\'}  <div class="remoteimg_title">图片载入失败</div>  <div class="remoteimg_desc">{reason}{if canRetry == \'1\'}    <a class="js_remoteimgretry" data-remoteid="{uid}" data-canretry="{canRetry}" href="javascript:;">重试</a>    {/if}</div>  <div class="remoteimg_desc">{if url && shortUrl}来源链接&nbsp;<a target="_blank" href="{url}">{shortUrl}</a>{else}来源信息无法识别{/if}</div>{/if}</div>'})
define("pages/questions/modules/utils.js",["pages/modules/common/emoji/emoji.js","pages/modules/utils/xss.js","pages/modules/utils/url.js"],function(e,t,n){"use strict"
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=e("pages/modules/common/emoji/emoji.js"),s=e("pages/modules/utils/xss.js"),a=e("pages/modules/utils/url.js"),i=function(e,t){var n=void 0
n=t?["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"]:["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"]
for(var o=0;o<n.length;o+=2)e=e.replace(new RegExp(n[o],"g"),n[o+1])
return e},u=function(e,t){for(var n=0,o=t-(e+"").length;n<o;n++)e="0"+e
return e+""},c=function(e,t){if(!e)return""
var n=void 0
n="object"===(void 0===e?"undefined":o(e))&&e instanceof Date?new Date(1*e):new Date(10===e.toString().length?1e3*e:1*e)
return t.replace(/yyyy|YYYY/,n.getFullYear()).replace(/yy|YY/,u(n.getFullYear()%100,2)).replace(/mm|MM/,u(n.getMonth()+1,2)).replace(/m|M/g,n.getMonth()+1).replace(/dd|DD/,u(n.getDate(),2)).replace(/d|D/g,n.getDate()).replace(/hh|HH/,u(n.getHours(),2)).replace(/h|H/g,n.getHours()).replace(/ii|II/,u(n.getMinutes(),2)).replace(/i|I/g,n.getMinutes()).replace(/ss|SS/,u(n.getSeconds(),2)).replace(/s|S/g,n.getSeconds()).replace(/w/g,n.getDay())},l=function(e,t){var n=new Date(1e3*e),o=e-t,r=n.getFullYear(),s=1*t,a=new Date(1e3*s)
n.setHours(0),n.setMinutes(0),n.setSeconds(0)
var i=n.getTime()/1e3
return s>=i?o<3600?Math.ceil(o/60)+"分钟前":"今天 "+c(t,"hh:ii"):s>=i-86400?"昨天 "+c(t,"hh:ii"):s>=i-172800?"前天 "+c(t,"hh:ii"):a.getFullYear()===r?a.getMonth()+1+"月"+a.getDate()+"日":a.getFullYear()+"年"+(a.getMonth()+1)+"月"+a.getDate()+"日"},m=function(e){var t={content:"",imgs:[]}
return e.forEach(function(e){"TEXT"===e.type?t.content=i(e.content,!0).replace(/\n/g,"<br>").replace(/&nbsp;/g," "):"PIC_CDN_URL"===e.type&&t.imgs.push(e.content)}),t},p=function(e){var t=[]
return e.forEach(function(e){"TEXT"===e.type?(e.content=i(e.content,!0),e.rawContent=e.content,e.content=r(s(e.content))):"PIC_CDN_URL"===e.type&&(e.imgHtml='<img class="edit_upload_img" src="'+e.content+'" />'),t.push(e)}),t},g=function(e,t){var n="未知状态:"+e
switch(e){case 2:n="未回答"
break
case 4:n="正在发表回答"
break
case 5:n=1===t?"已公开并回答":"已回答未公开"
break
case 6:n="发表回答失败"
break
case 8:n="提问已被用户删除"}return n}
n.exports.getAnswerHtml=function(e){var t=""
return(e=p(e)).forEach(function(e){"TEXT"===e.type?t+=e.rawContent+"<br/>":"PIC_CDN_URL"===e.type&&(t+=e.imgHtml+"<br/>")}),t},n.exports.getQuestionStatusWording=g,n.exports.replaceHtml=i,n.exports.formatCreateTime=l,n.exports.findQuestionData=function(e,t){var n=!1,o=void 0
for(o=0;o<e.length;o++)if(e[o].appmsgid===t.appmsgid&&e[o].idx===t.idx){n=o
break}return n},n.exports.formatQustion=m,n.exports.formatAnswer=p,n.exports.parseQuestionList=function(e,t){return e.forEach(function(e){e.questionInfo=m(e.question_content.question.desc),e.questionInfo.title=r(i(e.question_content.question.title,!0)),e.questionInfo.qid=e.question_content.qa_id,e.questionInfo.askTimeStr=l(t,e.question_content.question.ask_timestamp),e.answerInfo={},e.question_content.answer&&(e.answerInfo={answer:p(e.question_content.answer.answer),answerTimeStr:l(t,e.question_content.answer.answer_timestamp)}),e.statusWording=g(e.status,e.is_open),e.questionImgGalleryVisible=!1,e.questionImgSelected=0,e.commentJumpUrl=a.addBaseParm("/misc/appmsgcomment?action=list_latest_comment&begin=0&count=10&mp_version=7&comment_id="+e.comment_topic_id),e.rewardJumpUrl=a.addBaseParm("/merchant/reward?action=getlatestreward&token=1895861489&lang=zh_CNappmsgid="+e.appmsgid+"&idx="+e.idx)}),e},n.exports.getUrlParam=function(e,t){var n=t||location.search,o=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),r=n.substr(n.indexOf("?")+1).match(o)
return null!==r?r[2]:""}})
