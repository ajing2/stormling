define("pages/modules/upload/webuploader.js",["3rd/webuploader/base.js","3rd/webuploader/widgets/filepicker.js","3rd/webuploader/widgets/queue.js","3rd/webuploader/widgets/runtime.js","3rd/webuploader/widgets/upload.js","3rd/webuploader/widgets/validator.js","3rd/webuploader/widgets/image.js","3rd/webuploader/runtime/html5/blob.js","3rd/webuploader/runtime/html5/filepicker.js","3rd/webuploader/runtime/html5/imagemeta/exif.js","3rd/webuploader/runtime/html5/transport.js","3rd/webuploader/runtime/html5/image.js","3rd/webuploader/runtime/flash/filepicker.js","3rd/webuploader/runtime/flash/transport.js","3rd/webuploader/runtime/flash/blob.js","3rd/webuploader/runtime/flash/image.js"],function(e,r,d){"use strict"
var l=e("3rd/webuploader/base.js")
e("3rd/webuploader/widgets/filepicker.js"),e("3rd/webuploader/widgets/queue.js"),e("3rd/webuploader/widgets/runtime.js"),e("3rd/webuploader/widgets/upload.js"),e("3rd/webuploader/widgets/validator.js"),e("3rd/webuploader/widgets/image.js"),e("3rd/webuploader/runtime/html5/blob.js"),e("3rd/webuploader/runtime/html5/filepicker.js"),e("3rd/webuploader/runtime/html5/imagemeta/exif.js"),e("3rd/webuploader/runtime/html5/transport.js"),e("3rd/webuploader/runtime/html5/image.js"),e("3rd/webuploader/runtime/flash/filepicker.js"),e("3rd/webuploader/runtime/flash/transport.js"),e("3rd/webuploader/runtime/flash/blob.js"),e("3rd/webuploader/runtime/flash/image.js"),d.exports=l})
define("3rd/webuploader/base.js",["3rd/webuploader/promise.js"],function(e,r,t){function o(){}var n,a,i,s,c,p,u,d,f,l,h,m,w,F,g=e("3rd/webuploader/promise.js"),b=Function.call
function v(e,r){return function(){return e.apply(r,arguments)}}return{version:"@version@",$:$,Deferred:g.Deferred,isPromise:g.isPromise,when:g.when,browser:(u=navigator.userAgent,d={},f=u.match(/WebKit\/([\d.]+)/),l=u.match(/Chrome\/([\d.]+)/)||u.match(/CriOS\/([\d.]+)/),h=u.match(/MSIE\s([\d\.]+)/)||u.match(/(?:trident)(?:.*rv:([\w.]+))?/i),m=u.match(/Firefox\/([\d.]+)/),w=u.match(/Safari\/([\d.]+)/),F=u.match(/OPR\/([\d.]+)/),f&&(d.webkit=parseFloat(f[1])),l&&(d.chrome=parseFloat(l[1])),h&&(d.ie=parseFloat(h[1])),m&&(d.firefox=parseFloat(m[1])),w&&(d.safari=parseFloat(w[1])),F&&(d.opera=parseFloat(F[1])),d),os:(i=navigator.userAgent,s={},c=i.match(/(?:Android);?[\s\/]+([\d.]+)?/),p=i.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/),c&&(s.android=parseFloat(c[1])),p&&(s.ios=parseFloat(p[1].replace(/_/g,"."))),s),inherits:function(e,r,t){var o
return"function"==typeof r?(o=r,r=null):o=r&&r.hasOwnProperty("constructor")?r.constructor:function(){return e.apply(this,arguments)},$.extend(!0,o,e,t||{}),o.__super__=e.prototype,o.prototype=function(e){var r
return Object.create?Object.create(e):((r=function(){}).prototype=e,new r)}(e.prototype),r&&$.extend(!0,o.prototype,r),o},noop:o,bindFn:v,log:window.console?v(console.log,console):o,nextTick:function(e){setTimeout(e,1)},slice:(a=[].slice,function(){return b.apply(a,arguments)}),guid:(n=0,function(e){for(var r=(+new Date).toString(32),t=0;t<5;t++)r+=Math.floor(65535*Math.random()).toString(32)
return(e||"wu_")+r+(n++).toString(32)}),formatSize:function(e,r,t){var o
for(t=t||["B","K","M","G","TB"];(o=t.shift())&&1024<e;)e/=1024
return("B"===o?e:e.toFixed(r||2))+o}}})
define("3rd/webuploader/promise.js",["3rd/jquery/jquery.2.1.4.js"],function(e,r,n){return window.$=e("3rd/jquery/jquery.2.1.4.js"),{Deferred:$.Deferred,when:$.when,isPromise:function(e){return e&&"function"==typeof e.then}}})
define("3rd/webuploader/widgets/filepicker.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/lib/filepicker.js","3rd/webuploader/widgets/widget.js"],function(e,i,r){var a=e("3rd/webuploader/base.js"),t=e("3rd/webuploader/uploader.js"),o=e("3rd/webuploader/lib/filepicker.js")
e("3rd/webuploader/widgets/widget.js")
var p=a.$
return p.extend(t.options,{pick:null,accept:null}),t.register({name:"picker",init:function(e){return this.pickers=[],e.pick&&this.addBtn(e.pick)},refresh:function(){p.each(this.pickers,function(){this.refresh()})},addBtn:function(t){var n=this,s=n.options,d=s.accept,c=[]
if(t)return p.isPlainObject(t)||(t={id:t}),p(t.id).each(function(){var e,i,r
r=a.Deferred(),e=p.extend({},t,{accept:p.isPlainObject(d)?[d]:d,swf:s.swf,runtimeOrder:s.runtimeOrder,imageSize:s.imageSize,id:this}),(i=new o(e)).once("ready",r.resolve),i.on("select",function(e){n.owner.request("add-file",[e])}),i.init(),n.pickers.push(i),c.push(r.promise())}),a.when.apply(a,c)},disable:function(){p.each(this.pickers,function(){this.disable()})},enable:function(){p.each(this.pickers,function(){this.enable()})},destroy:function(){p.each(this.pickers,function(){this.destroy()}),this.pickers=null}})})
define("3rd/webuploader/uploader.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js"],function(e,t,i){var r=e("3rd/webuploader/base.js"),s=e("3rd/webuploader/mediator.js"),n=r.$
function o(e){this.options=n.extend(!0,{},o.options,e),this._init(this.options)}return o.options={},s.installTo(o.prototype),n.each({upload:"start-upload",stop:"stop-upload",getFile:"get-file",getFiles:"get-files",addFile:"add-file",addFiles:"add-file",sort:"sort-files",removeFile:"remove-file",cancelFile:"cancel-file",skipFile:"skip-file",retry:"retry",isInProgress:"is-in-progress",makeThumb:"make-thumb",md5File:"md5-file",getDimension:"get-dimension",addButton:"add-btn",predictRuntimeType:"predict-runtime-type",refresh:"refresh",disable:"disable",enable:"enable",reset:"reset"},function(e,t){o.prototype[e]=function(){return this.request(t,arguments)}}),n.extend(o.prototype,{state:"pending",_init:function(e){var t=this
t.request("init",e,function(){t.state="ready",t.trigger("ready")})},option:function(e,t){var i=this.options
if(!(1<arguments.length))return e?i[e]:i
n.isPlainObject(t)&&n.isPlainObject(i[e])?n.extend(i[e],t):i[e]=t},getStats:function(){var e=this.request("get-stats")
return e?{successNum:e.numOfSuccess,progressNum:e.numOfProgress,cancelNum:e.numOfCancel,invalidNum:e.numOfInvalid,uploadFailNum:e.numOfUploadFailed,queueNum:e.numOfQueue,interruptNum:e.numofInterrupt}:{}},trigger:function(e){var t=[].slice.call(arguments,1),i=this.options,r="on"+e.substring(0,1).toUpperCase()+e.substring(1)
return!(!1===s.trigger.apply(this,arguments)||n.isFunction(i[r])&&!1===i[r].apply(this,t)||n.isFunction(this[r])&&!1===this[r].apply(this,t)||!1===s.trigger.apply(s,[this,e].concat(t)))},destroy:function(){this.request("destroy",arguments),this.off()},request:r.noop}),r.create=o.create=function(e){return new o(e)},r.Uploader=o})
define("3rd/webuploader/mediator.js",["3rd/webuploader/base.js"],function(t,n,e){var r,i=t("3rd/webuploader/base.js").$,c=[].slice,s=/\s+/
function u(t,n,e,r){return i.grep(t,function(t){return t&&(!n||t.e===n)&&(!e||t.cb===e||t.cb._cb===e)&&(!r||t.ctx===r)})}function o(t,e,r){i.each((t||"").split(s),function(t,n){r(n,e)})}function f(t,n){for(var e,r=!1,i=-1,c=t.length;++i<c;)if(!1===(e=t[i]).cb.apply(e.ctx2,n)){r=!0
break}return!r}return r={on:function(t,n,r){var i,c=this
return n&&(i=this._events||(this._events=[]),o(t,n,function(t,n){var e={e:t}
e.cb=n,e.ctx=r,e.ctx2=r||c,e.id=i.length,i.push(e)})),this},once:function(t,n,r){var i=this
return n&&o(t,n,function(t,n){var e=function(){return i.off(t,e),n.apply(r||i,arguments)}
e._cb=n,i.on(t,e,r)}),i},off:function(t,n,e){var r=this._events
return r&&(t||n||e?o(t,n,function(t,n){i.each(u(r,t,n,e),function(){delete r[this.id]})}):this._events=[]),this},trigger:function(t){var n,e,r
return this._events&&t?(n=c.call(arguments,1),e=u(this._events,t),r=u(this._events,"all"),f(e,n)&&f(r,arguments)):this}},i.extend({installTo:function(t){return i.extend(t,r)}},r)})
define("3rd/webuploader/lib/filepicker.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js","3rd/webuploader/lib/file.js","3rd/webuploader/lib/image.js"],function(e,i,t){var r=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/runtime/client.js"),a=e("3rd/webuploader/lib/file.js"),l=e("3rd/webuploader/lib/image.js"),u=r.$
function o(e){if((e=this.options=u.extend({},o.options,e)).container=u(e.id),!e.container.length)throw new Error('_("按钮指定错误")')
e.button=e.container,n.call(this,"FilePicker",!0)}return o.options={button:null,container:null,label:null,innerHTML:null,multiple:!0,accept:null},r.inherits(n,{constructor:o,init:function(){var o=this,s=o.options,i=s.button
i.addClass("webuploader-pick"),o.on("all",function(e){var r,n
switch(e){case"mouseenter":i.addClass("webuploader-pick-hover")
break
case"mouseleave":i.removeClass("webuploader-pick-hover")
break
case"change":r=o.exec("getFiles"),n=0,r=u.map(r,function(i){if((i=new a(o.getRuid(),i))._refer=s.container,s.imageSize&&~"image/jpeg,image/jpg,image/png,image/bmp,image/gif".indexOf(i.type)){var t=new l(s.compress||s.resize)
t.on("load",function(){var e=t.info()
i.width=e.width,i.height=e.height,++n==r.length&&o.trigger("select",r,s.container)}),t.on("error",function(){++n==r.length&&o.trigger("select",r,s.container)}),t.loadFromBlob(i)}else n++
return i}),n==r.length&&o.trigger("select",r,s.container)}}),o.connectRuntime(s,function(){o.refresh(),o.exec("init",s),o.trigger("ready")}),this._resizeHandler=r.bindFn(this.refresh,this),u(window).on("resize",this._resizeHandler),setInterval(function(){o.refresh()},1e3)},refresh:function(){var e=this.getRuntime().getContainer(),i=this.options.button,t=i.outerWidth?i.outerWidth():i.width(),r=i.outerHeight?i.outerHeight():i.height(),n=i.offset()
try{i.is(":visible")||(t+=parseInt(i.css("min-width"))||0)}catch(e){}t&&r&&e.css({bottom:"auto",right:"auto",width:t+"px",height:r+"px"}).offset(n)},enable:function(){this.options.button.removeClass("webuploader-pick-disable"),this.refresh()},disable:function(){var e=this.options.button
this.getRuntime().getContainer().css({top:"-99999px"}),e.addClass("webuploader-pick-disable")},destroy:function(){var e=this.options.button
u(window).off("resize",this._resizeHandler),e.removeClass("webuploader-pick-disable webuploader-pick-hover webuploader-pick")}}),o})
define("3rd/webuploader/runtime/client.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js","3rd/webuploader/runtime/runtime.js"],function(e,t,n){var o,r,u=e("3rd/webuploader/base.js"),i=e("3rd/webuploader/mediator.js"),d=e("3rd/webuploader/runtime/runtime.js")
function s(t,n){var r,e,i=u.Deferred()
this.uid=u.guid("client_"),this.runtimeReady=function(e){return i.done(e)},this.connectRuntime=function(e,t){if(r)throw new Error("already connected!")
return i.done(t),"string"==typeof e&&o.get(e)&&(r=o.get(e)),(r=r||o.get(null,n))?(u.$.extend(r.options,e),r.__promise.then(i.resolve),r.__client++):((r=d.create(e,e.runtimeOrder)).__promise=i.promise(),r.once("ready",i.resolve),r.init(),o.add(r),r.__client=1),n&&(r.__standalone=n),r},this.getRuntime=function(){return r},this.disconnectRuntime=function(){r&&(r.__client--,r.__client<=0&&(o.remove(r),delete r.__promise,r.destroy()),r=null)},this.exec=function(){if(r){var e=u.slice(arguments)
return t&&e.unshift(t),r.exec.apply(this,e)}},this.getRuid=function(){return r&&r.uid},this.destroy=(e=this.destroy,function(){e&&e.apply(this,arguments),this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime()})}return r={},o={add:function(e){r[e.uid]=e},get:function(e,t){var n
if(e)return r[e]
for(n in r)if(!t||!r[n].__standalone)return r[n]
return null},remove:function(e){delete r[e.uid]}},i.installTo(s.prototype),s})
define("3rd/webuploader/runtime/runtime.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js"],function(t,e,n){function r(t){for(var e in t)if(t.hasOwnProperty(e))return e
return null}var o=t("3rd/webuploader/base.js"),i=t("3rd/webuploader/mediator.js"),a=o.$,s={}
function d(t){this.options=a.extend({container:document.body},t),this.uid=o.guid("rt_")}return a.extend(d.prototype,{getContainer:function(){var t,e,n=this.options
return this._container?this._container:(t=a(n.container||document.body).parent(),(e=a(document.createElement("div"))).attr("id","rt_"+this.uid),e.css({position:"absolute",top:"0px",left:"0px",width:"1px",height:"1px",overflow:"hidden"}),t.append(e),t.addClass("webuploader-container"),this._container=e,this._parent=t,e)},init:o.noop,exec:o.noop,destroy:function(){this._container&&this._container.remove(),this._parent&&this._parent.removeClass("webuploader-container"),this.off()}}),d.orders="html5,flash",d.addRuntime=function(t,e){s[t]=e},d.hasRuntime=function(t){return!!(t?s[t]:r(s))},d.create=function(t,e){var n
if(e=e||d.orders,a.each(e.split(/\s*,\s*/g),function(){if(s[this])return n=this,!1}),!(n=n||r(s)))throw new Error("Runtime Error")
return new s[n](t)},i.installTo(d.prototype),d})
define("3rd/webuploader/lib/file.js",["3rd/webuploader/base.js","3rd/webuploader/lib/blob.js"],function(e,t,a){var i=e("3rd/webuploader/base.js"),r=e("3rd/webuploader/lib/blob.js"),o=1,s=/\.([^.]+)$/
return i.inherits(r,function(e,t){var a
this.name=t.name||"untitled"+o++,!(a=s.exec(t.name)?RegExp.$1.toLowerCase():"")&&t.type&&(a=/\/(jpg|jpeg|png|gif|bmp)$/i.exec(t.type)?RegExp.$1.toLowerCase():"",this.name+="."+a),this.ext=a,this.lastModifiedDate=t.lastModifiedDate||(new Date).toLocaleString(),r.apply(this,arguments)})})
define("3rd/webuploader/lib/blob.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js"],function(e,t,i){var r=e("3rd/webuploader/base.js"),s=e("3rd/webuploader/runtime/client.js")
function n(e,t){var i=this
i.source=t,i.ruid=e,this.size=t.size||0,!t.type&&this.ext&&~"jpg,jpeg,png,gif,bmp".indexOf(this.ext)?this.type="image/"+("jpg"===this.ext?"jpeg":this.ext):this.type=t.type||"application/octet-stream",s.call(i,"Blob"),this.uid=t.uid||this.uid,e&&i.connectRuntime(e)}return r.inherits(s,{constructor:n,slice:function(e,t){return this.exec("slice",e,t)},getSource:function(){return this.source}}),n})
define("3rd/webuploader/lib/image.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js","3rd/webuploader/lib/blob.js"],function(e,t,i){var n=e("3rd/webuploader/base.js"),o=e("3rd/webuploader/runtime/client.js"),r=e("3rd/webuploader/lib/blob.js"),s=n.$
function a(e){this.options=s.extend({},a.options,e),o.call(this,"Image"),this.on("load",function(){this._info=this.exec("info"),this._meta=this.exec("meta")})}return a.options={quality:90,crop:!1,preserveHeaders:!1,allowMagnify:!1},n.inherits(o,{constructor:a,info:function(e){return e?(this._info=e,this):this._info},meta:function(e){return e?(this._meta=e,this):this._meta},loadFromBlob:function(e){var t=this,i=e.getRuid()
this.connectRuntime(i,function(){t.exec("init",t.options),t.exec("loadFromBlob",e)})},resize:function(){var e=n.slice(arguments)
return this.exec.apply(this,["resize"].concat(e))},crop:function(){var e=n.slice(arguments)
return this.exec.apply(this,["crop"].concat(e))},getAsDataUrl:function(e){return this.exec("getAsDataUrl",e)},getAsBlob:function(e,t){var i=t?this.exec("getAsBlob",e,t):this.exec("getAsBlob",e)
return new r(this.getRuid(),i)}}),a})
define("3rd/webuploader/widgets/widget.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js"],function(e,n,t){var h=e("3rd/webuploader/base.js"),r=e("3rd/webuploader/uploader.js"),l=h.$,o=r.prototype._init,i=r.prototype.destroy,f={},s=[]
function p(e){this.owner=e,this.options=e.options}return l.extend(p.prototype,{init:h.noop,invoke:function(e,n){var t=this.responseMap
return t&&e in t&&t[e]in this&&l.isFunction(this[t[e]])?this[t[e]].apply(this,n):f},request:function(){return this.owner.request.apply(this.owner,arguments)}}),l.extend(r.prototype,{_init:function(){var t=this,r=t._widgets=[],i=t.options.disableWidgets||""
return l.each(s,function(e,n){i&&~i.indexOf(n._name)||r.push(new n(t))}),o.apply(t,arguments)},request:function(e,n,t){var r,i,o,s=0,p=this._widgets,u=p&&p.length,a=[],d=[]
for(n=function(e){if(!e)return!1
var n=e.length,t=l.type(e)
return!(1!==e.nodeType||!n)||("array"===t||"function"!==t&&"string"!==t&&(0===n||"number"==typeof n&&0<n&&n-1 in e))}(n)?n:[n];s<u;s++)(r=p[s].invoke(e,n))!==f&&(h.isPromise(r)?d.push(r):a.push(r))
return t||d.length?(i=h.when.apply(h,d))[o=i.pipe?"pipe":"then"](function(){var e=h.Deferred(),n=arguments
return 1===n.length&&(n=n[0]),setTimeout(function(){e.resolve(n)},1),e.promise()})[t?o:"done"](t||h.noop):a[0]},destroy:function(){i.apply(this,arguments),this._widgets=null}}),r.register=p.register=function(e,n){var t,r={init:"init",destroy:"destroy",name:"anonymous"}
return 1===arguments.length?(n=e,l.each(n,function(e){"_"!==e[0]&&"name"!==e?r[e.replace(/[A-Z]/g,"-$&").toLowerCase()]=e:"name"===e&&(r.name=n.name)})):r=l.extend(r,e),n.responseMap=r,(t=h.inherits(p,n))._name=r.name,s.push(t),t},r.unRegister=p.unRegister=function(e){if(e&&"anonymous"!==e)for(var n=s.length;n--;)s[n]._name===e&&s.splice(n,1)},p})
define("3rd/webuploader/widgets/queue.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/queue.js","3rd/webuploader/file.js","3rd/webuploader/lib/file.js","3rd/webuploader/runtime/client.js","3rd/webuploader/widgets/widget.js"],function(e,t,r){var o=e("3rd/webuploader/base.js"),i=e("3rd/webuploader/uploader.js"),d=e("3rd/webuploader/queue.js"),u=e("3rd/webuploader/file.js"),s=e("3rd/webuploader/lib/file.js"),c=e("3rd/webuploader/runtime/client.js")
e("3rd/webuploader/widgets/widget.js")
var p=o.$,n=u.Status
return i.register({name:"queue",init:function(e){var t,r,i,u,s,n,a,l=this
if(p.isPlainObject(e.accept)&&(e.accept=[e.accept]),e.accept){for(s=[],i=0,r=e.accept.length;i<r;i++)(u=e.accept[i].extensions)&&s.push(u)
s.length&&(n="\\."+s.join(",").replace(/,/g,"$|\\.").replace(/\*/g,".*")+"$"),l.accept=new RegExp(n,"i")}if(l.queue=new d,l.stats=l.queue.stats,"html5"===this.request("predict-runtime-type"))return t=o.Deferred(),this.placeholder=a=new c("Placeholder"),a.connectRuntime({runtimeOrder:"html5"},function(){l._ruid=a.getRuid(),t.resolve()}),t.promise()},_wrapFile:function(e){if(!(e instanceof u)){if(!(e instanceof s)){if(!this._ruid)throw new Error("Can't add external files.")
e=new s(this._ruid,e)}e=new u(e)}return e},acceptFile:function(e){return!(!e||!e.size||this.accept&&!this.accept.test(e.name))},_addFile:function(e){var t=this
if(e=t._wrapFile(e),t.owner.trigger("beforeFileQueued",e)){if(t.acceptFile(e))return t.queue.append(e),t.owner.trigger("fileQueued",e),e
t.owner.trigger("error","Q_TYPE_DENIED",e)}},getFile:function(e){return this.queue.getFile(e)},addFile:function(e){var t=this
e.length||(e=[e]),e=p.map(e,function(e){return t._addFile(e)}),t.owner.trigger("filesQueued",e),t.options.auto&&setTimeout(function(){t.request("start-upload")},20)},getStats:function(){return this.stats},removeFile:function(e,t){e=e.id?e:this.queue.getFile(e),this.request("cancel-file",e),t&&this.queue.removeFile(e)},getFiles:function(){return this.queue.getFiles.apply(this.queue,arguments)},fetchFile:function(){return this.queue.fetch.apply(this.queue,arguments)},retry:function(e,t){var r,i,u,s=this
if(e)return(e=e.id?e:s.queue.getFile(e)).setStatus(n.QUEUED),void(t||s.request("start-upload"))
for(i=0,u=(r=s.queue.getFiles(n.ERROR)).length;i<u;i++)(e=r[i]).setStatus(n.QUEUED)
s.request("start-upload")},sortFiles:function(){return this.queue.sort.apply(this.queue,arguments)},reset:function(){this.owner.trigger("reset"),this.queue=new d,this.stats=this.queue.stats},destroy:function(){this.reset(),this.placeholder&&this.placeholder.destroy()}})})
define("3rd/webuploader/queue.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js","3rd/webuploader/file.js"],function(e,t,u){var n=e("3rd/webuploader/base.js"),s=e("3rd/webuploader/mediator.js"),a=e("3rd/webuploader/file.js"),r=n.$,i=a.Status
function o(){this.stats={numOfQueue:0,numOfSuccess:0,numOfCancel:0,numOfProgress:0,numOfUploadFailed:0,numOfInvalid:0,numofDeleted:0,numofInterrupt:0},this._queue=[],this._map={}}return r.extend(o.prototype,{append:function(e){return this._queue.push(e),this._fileAdded(e),this},prepend:function(e){return this._queue.unshift(e),this._fileAdded(e),this},getFile:function(e){return"string"!=typeof e?e:this._map[e]},fetch:function(e){var t,u,n=this._queue.length
for(e=e||i.QUEUED,t=0;t<n;t++)if(e===(u=this._queue[t]).getStatus())return u
return null},sort:function(e){"function"==typeof e&&this._queue.sort(e)},getFiles:function(){for(var e,t=[].slice.call(arguments,0),u=[],n=0,s=this._queue.length;n<s;n++)e=this._queue[n],t.length&&!~r.inArray(e.getStatus(),t)||u.push(e)
return u},removeFile:function(e){this._map[e.id]&&(delete this._map[e.id],e.destroy(),this.stats.numofDeleted++)},_fileAdded:function(e){var u=this
this._map[e.id]||(this._map[e.id]=e).on("statuschange",function(e,t){u._onFileStatusChange(e,t)})},_onFileStatusChange:function(e,t){var u=this.stats
switch(t){case i.PROGRESS:u.numOfProgress--
break
case i.QUEUED:u.numOfQueue--
break
case i.ERROR:u.numOfUploadFailed--
break
case i.INVALID:u.numOfInvalid--
break
case i.INTERRUPT:u.numofInterrupt--}switch(e){case i.QUEUED:u.numOfQueue++
break
case i.PROGRESS:u.numOfProgress++
break
case i.ERROR:u.numOfUploadFailed++
break
case i.COMPLETE:u.numOfSuccess++
break
case i.CANCELLED:u.numOfCancel++
break
case i.INVALID:u.numOfInvalid++
break
case i.INTERRUPT:u.numofInterrupt++}}}),s.installTo(o.prototype),o})
define("3rd/webuploader/file.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js"],function(t,e,i){var s=t("3rd/webuploader/base.js"),r=t("3rd/webuploader/mediator.js"),a=s.$,d="WU_FILE_",o=0,n=/\.([^.]+)$/,h={}
function u(t){this.name=t.name||"Untitled",this.size=t.size||0,this.width=t.width||-1,this.height=t.height||-1,this.type=t.type||"application/octet-stream",this.lastModifiedDate=t.lastModifiedDate||1*new Date,this.id=d+o++,this.ext=n.exec(this.name)?RegExp.$1:"",this.statusText="",h[this.id]=u.Status.INITED,this.source=t,this.loaded=0,this.on("error",function(t){this.setStatus(u.Status.ERROR,t)})}return a.extend(u.prototype,{setStatus:function(t,e){var i=h[this.id]
void 0!==e&&(this.statusText=e),t!==i&&(h[this.id]=t,this.trigger("statuschange",t,i))},getStatus:function(){return h[this.id]},getSource:function(){return this.source},destroy:function(){this.off(),delete h[this.id]}}),r.installTo(u.prototype),u.Status={INITED:"inited",QUEUED:"queued",PROGRESS:"progress",ERROR:"error",COMPLETE:"complete",CANCELLED:"cancelled",INTERRUPT:"interrupt",INVALID:"invalid"},u})
define("3rd/webuploader/widgets/runtime.js",["3rd/webuploader/uploader.js","3rd/webuploader/runtime/runtime.js","3rd/webuploader/widgets/widget.js"],function(e,r,t){var i=e("3rd/webuploader/uploader.js"),u=e("3rd/webuploader/runtime/runtime.js")
return e("3rd/webuploader/widgets/widget.js"),i.support=function(){return u.hasRuntime.apply(u,arguments)},i.register({name:"runtime",init:function(){if(!this.predictRuntimeType())throw Error("Runtime Error")},predictRuntimeType:function(){var e,r,t=this.options.runtimeOrder||u.orders,i=this.type
if(!i)for(e=0,r=(t=t.split(/\s*,\s*/g)).length;e<r;e++)if(u.hasRuntime(t[e])){this.type=i=t[e]
break}return i}})})
