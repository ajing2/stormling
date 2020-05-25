define("pages/modules/region/region.tpl.js",[],function(o,n,e){return'<div class="mp-region">  <mp-dropdown :options="countryList" :initvalue="country.value"               class="mp-region-dropdown" @select="countryChange" placeholder="国家"></mp-dropdown>  <mp-dropdown :options="provinceList" v-if="province.show"               placeholder="省份"               class="mp-region-dropdown" @select="provinceChange"></mp-dropdown>  <mp-dropdown :options="cityList" v-if="province.show && city.show"               placeholder="城市/区县"               class="mp-region-dropdown" @select="cityChange"></mp-dropdown></div>'})
define("vue-weui/src/dropdown_cascade/dropdown_cascade.js",["vue-weui/src/dropdown_cascade/dropdown_cascade.css.js","vue-weui/src/dropdown_cascade/dropdown_cascade.tpl.js"],function(e,t,i){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
e("vue-weui/src/dropdown_cascade/dropdown_cascade.css.js")
var s,n=e("vue-weui/src/dropdown_cascade/dropdown_cascade.tpl.js")
var l={name:"mp-dropdowncascade",template:((s=n)&&s.__esModule?s:{default:s}).default,props:{name:{type:String,default:""},type:{type:String,default:"default"},placeholder:{type:String,default:"请选择"},classname:{type:String,default:""},initvalue:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},filterable:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},newoptiontext:{type:String,default:""},isverifyfinish:{type:Boolean,default:!1},options:{type:Array,default:[]},required:{type:Boolean,default:!1}},data:function(){return{searchValue:"",forFormDecoratorValue:[],v:[],isOpen:!1,optionsList:[],isWarn:!1}},methods:{cloneObject:function(e){var t=e instanceof Array?[]:{}
for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]="object"===o(e[i])?this.cloneObject(e[i]):e[i])
return t},isOpenOptionsList:function(){this.isOpen=!this.isOpen},resetOptionsList:function(e,t,i){if(this.optionsList.push(t),0!==e.length){for(var s="",n=0;n<t.length;n++)t[n].isChecked=!1,"object"!==o(e[0])?t[n].value===e[0]&&(s={index:n,ele:t[n]},this.v.push(this.cloneObject(s)),this.v[this.v.length-1].ele.isChecked&&delete this.v[this.v.length-1].ele.isChecked,this.v[this.v.length-1].ele.options&&delete this.v[this.v.length-1].ele.options,this.optionsList[this.optionsList.length-1][n].isChecked=!0):t[n].value===e[0].value&&(s={index:n,ele:t[n]},this.v.push(this.cloneObject(s)),this.v[this.v.length-1].ele.isChecked&&delete this.v[this.v.length-1].ele.isChecked,this.v[this.v.length-1].ele.options&&delete this.v[this.v.length-1].ele.options,this.optionsList[this.optionsList.length-1][n].isChecked=!0)
""!==s&&s.ele.options&&0!==s.ele.options.length?(e.shift(),this.resetOptionsList(e,s.ele.options,i)):"init"===i&&(this.forFormDecoratorValue=this.cloneObject(this.v))}else"init"===i&&(this.isverifyfinish&&t&&0!==t.length?this.forFormDecoratorValue=[]:this.forFormDecoratorValue=this.cloneObject(this.v))},resetSingleOptinsList:function(e,t){for(var i=0;i<this.optionsList[e].length;i++)this.optionsList[e][i].isChecked=!1
this.optionsList[e][t].isChecked=!0},handleNext:function(e){for(var t={index:e.index,ele:this.cloneObject(e.ele)},i=this.optionsList.length-1;i>e.level;--i)this.optionsList.pop()
for(var s=this.v.length;s>e.level;--s)this.v.pop()
this.v.push(t),delete this.v[this.v.length-1].ele.isChecked,delete this.v[this.v.length-1].ele.options,this.resetSingleOptinsList(e.level,e.index),e.ele.options&&0<e.ele.options.length?(this.optionsList.push(e.ele.options),this.$emit("change",{name:this.name?this.name:void 0,isFinish:!1,value:this.v}),this.isverifyfinish?this.forFormDecoratorValue=[]:this.forFormDecoratorValue=this.v):(this.isOpenOptionsList(),this.$emit("change",{name:this.name?this.name:void 0,isFinish:!0,value:this.v}),this.forFormDecoratorValue=this.v),this.isWarn=!1},handleSearch:function(){this.$emit("search",{name:this.name?this.name:void 0,value:this.v,searchValue:this.searchValue})},handleActive:function(){this.disabled||this.isOpenOptionsList()},handleDocumentClick:function(e){this.$el&&!this.$el.contains(e.target)&&(this.isOpen=!1)},validate:function(e,t){return this.required&&0===this.forFormDecoratorValue.length?(this.isWarn=!0,t("required")):(this.isWarn=!1,e())}},created:function(){this.resetOptionsList(this.initvalue,this.options,"init")
var i=this
this.APIs=Object.create(null,{validate:{value:function(e,t){i.validate(e,function(e){t({info:e||"",name:i.name,value:i.v})})}}})},mounted:function(){document.addEventListener("click",this.handleDocumentClick)},beforeDestroy:function(){document.removeEventListener("click",this.handleDocumentClick)}}
"function"==typeof l.template&&l.template(l),l.install=function(e){return e.component(l.name,l)},t.default=l})
define("vue-weui/src/dropdown_cascade/dropdown_cascade.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.weui-desktop-form__dropdowncascade {  min-width: 15em;  display: inline-block;  vertical-align: middle;}.weui-desktop-form__dropdowncascade.weui-desktop-form__dropdowncascade__warn .weui-desktop-form__dropdowncascade__dt.weui-desktop-form__dropdowncascade__dt__inner-button {  border: 1px solid #FA5151;}.weui-desktop-form__dropdowncascade__dt {  position: relative;  min-width: 75px;  padding: 0 36px 0 15px;  line-height: 34px;  text-overflow: ellipsis;  overflow: hidden;  white-space: nowrap;  cursor: pointer;  /*&.filter{\t}*/}.weui-desktop-form__dropdowncascade__dt .weui-desktop-form__dropdowncascade__dt__value_ele:after {  content: '>';  position: relative;  left: -2px;}.weui-desktop-form__dropdowncascade__dt .weui-desktop-form__dropdowncascade__dt__value_ele:last-child:after {  display: none;}.weui-desktop-form__dropdowncascade__dt:after {  position: absolute;  top: 50%;  right: 11px;  margin-top: -2px;  content: ' ';  display: block;  width: 8px;  height: 5px;  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOHB4IiBoZWlnaHQ9IjVweCIgdmlld0JveD0iMCAwIDggNSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNDcuMSAoNDU0MjIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPlRyaWFuZ2xlIDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDg5LjAwMDAwMCwgLTE0NC4wMDAwMDApIiBmaWxsPSIjOUE5QTlBIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTktQ29weSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUxLjAwMDAwMCwgMTMwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkRyb3Bkb3duLS8tRGVmdWx0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjM4LjAwMDAwMCwgMTQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJUcmlhbmdsZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNC4wMDAwMDAsIDIuMjg1NzE0KSBzY2FsZSgxLCAtMSkgdHJhbnNsYXRlKC00LjAwMDAwMCwgLTIuMjg1NzE0KSAiIHBvaW50cz0iNCAwIDggNC41NzE0Mjg1NyAwIDQuNTcxNDI4NTciPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==) no-repeat center;  background-size: contain;}.weui-desktop-form__dropdowncascade__dt.weui-desktop-form__dropdowncascade__dt__inner-button {  border: 1px solid #E4E8EB;  border-radius: 2px;  background-color: #FFFFFF;}.weui-desktop-form__dropdowncascade__dt.disabled {  color: #E9E9E9;}.weui-desktop-form__dropdowncascade__dt.placeholder {  color: #8D8D8D;}.weui-desktop-form__dropdowncascade__dt .weui-desktop-form__dropdowncascade__search {  width: 98%;  font-size: inherit;  border: none;  outline: none;}.weui-desktop-dropdowncascade-menu__wrp {  position: relative;}/*选项*/.weui-desktop-dropdowncascade-menu {  display: table;  display: -ms-flexbox;  display: flex;  padding: 0;  font-size: 14px;  position: absolute;  left: 0;  z-index: 4000;  border-radius: 5px;  background: #FFFFFF;  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);  border-radius: 2px;  /*加载中*/}.weui-desktop-dropdowncascade-menu.single {  right: 0;  border-left: none;}.weui-desktop-dropdowncascade-menu.single .weui-desktop-dropdowncascade__list {  width: 100%;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade__list {  display: table-cell;  position: relative;  width: 11em;  padding: 11px 0;  overflow-y: auto;  border-right: 1px solid #E4E8EB;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade__list:last-child {  border-right: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade__list.last-list:after {  display: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade__list.last-list .weui-desktop-dropdowncascade__list-ele-contain {  padding: 7px 30px 7px 15px;}.weui-desktop-dropdowncascade-menu .weui-desktop-form__dropdowncascade-ele.more .weui-desktop-dropdowncascade__list-ele-contain:after {  content: ' ';  width: 7px;  height: 11px;  position: absolute;  display: block;  right: 15px;  top: 50%;  margin-top: -5px;  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkzLjAwMDAwMCwgLTg5LjAwMDAwMCkiIGZpbGw9IiM5QTlBOUEiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDkxLjc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5Ny41IEw0OTAuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDk3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OTQuMjU3MzU5LCA5NC41MDAwMDApIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTQ5NC4yNTczNTksIC05NC41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) no-repeat center;  background-size: contain;}.weui-desktop-dropdowncascade-menu .weui-desktop-form__dropdowncascade-ele.more.checked .weui-desktop-dropdowncascade__list-ele-contain:after {  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dCBITDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTS0wLjU1MDI1MjUzMiw4LjQ0OTc0NzQ3IEw1LjQ0OTc0NzQ3LDguNDQ5NzQ3NDcgTDUuNDQ5NzQ3NDcsOS40NDk3NDc0NyBMLTEuNTUwMjUyNTMsOS40NDk3NDc0NyBMLTEuNTUwMjUyNTMsOC45NDk3NDc0NyBMLTEuNTUwMjUyNTMsMi40NDk3NDc0NyBMLTAuNTUwMjUyNTMyLDIuNDQ5NzQ3NDcgTC0wLjU1MDI1MjUzMiw4LjQ0OTc0NzQ3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE2IiBmaWxsPSIjMUFBRDE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjk0OTc0NywgNS45NDk3NDcpIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTEuOTQ5NzQ3LCAtNS45NDk3NDcpICI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=) no-repeat center;}.weui-desktop-dropdowncascade-menu .weui-desktop-form__dropdowncascade-ele.checked {  color: #07C160;}.weui-desktop-dropdowncascade-menu .weui-desktop-form__dropdowncascade-ele.disabled {  color: #E9E9E9;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade__list-ele-contain {  position: relative;  padding: 7px 30px 7px 15px;  width: inherit;  text-overflow: ellipsis;  overflow: hidden;  white-space: nowrap;}.weui-desktop-dropdowncascade-menu .loading {  text-align: center;  padding: 40px 0;  color: #9A9A9A;}.weui-desktop-dropdowncascade-menu .empty {  text-align: center;  padding: 40px 0;  color: #9A9A9A;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown-menu {  position: relative;  width: 100%;  min-width: 11em;  max-width: 13em;  max-height: 300px;  padding: 11px 0;  overflow-y: auto;  border-right: 1px solid #E4E8EB;  box-shadow: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown-menu:last-child {  border-right: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown-menu.last-list:after {  display: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown-menu.last-list .weui-desktop-dropdown__list-ele {  padding: 7px 30px 7px 15px;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list {  max-height: initial;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele {  position: relative;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.checked {  color: #07C160;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.checked .weui-desktop-dropdown__list-ele-contain {  color: #07C160;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.checked:after {  /*content: ' ';\t\t\t\tdisplay: block;\t\t\t\twidth: 7px;\t\t\t\theight: 11px;\t\t\t\tposition: absolute;\t\t\t\tdisplay: block;\t\t\t\tright: 15px;\t\t\t\ttop: 50%;\t\t\t\tmargin-top: -5px;\t\t\t\tbackground: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkzLjAwMDAwMCwgLTg5LjAwMDAwMCkiIGZpbGw9IiM5QTlBOUEiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDkxLjc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5Ny41IEw0OTAuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDk3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OTQuMjU3MzU5LCA5NC41MDAwMDApIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTQ5NC4yNTczNTksIC05NC41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) no-repeat center;\t\t\t\tbackground-size: contain;*/  display: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.module-has-options {  /*.weui-desktop-dropdown__list-ele-contain{\t\t\t\tpadding-right: 30px;\t\t\t}*/}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.module-has-options:after {  content: ' ';  width: 7px;  height: 11px;  position: absolute;  display: block;  right: 15px;  top: 50%;  margin-top: -5px;  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkzLjAwMDAwMCwgLTg5LjAwMDAwMCkiIGZpbGw9IiM5QTlBOUEiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDkxLjc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5Ny41IEw0OTAuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDk3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OTQuMjU3MzU5LCA5NC41MDAwMDApIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTQ5NC4yNTczNTksIC05NC41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) no-repeat center;  background-size: contain;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.module-has-options.checked:after {  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dCBITDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTS0wLjU1MDI1MjUzMiw4LjQ0OTc0NzQ3IEw1LjQ0OTc0NzQ3LDguNDQ5NzQ3NDcgTDUuNDQ5NzQ3NDcsOS40NDk3NDc0NyBMLTEuNTUwMjUyNTMsOS40NDk3NDc0NyBMLTEuNTUwMjUyNTMsOC45NDk3NDc0NyBMLTEuNTUwMjUyNTMsMi40NDk3NDc0NyBMLTAuNTUwMjUyNTMyLDIuNDQ5NzQ3NDcgTC0wLjU1MDI1MjUzMiw4LjQ0OTc0NzQ3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE2IiBmaWxsPSIjMUFBRDE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjk0OTc0NywgNS45NDk3NDcpIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTEuOTQ5NzQ3LCAtNS45NDk3NDcpICI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=) no-repeat center;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.disabled {  color: #E9E9E9;}";});define("vue-weui/src/dropdown_cascade/dropdown_cascade.tpl.js",[],function(t,e,s){return'<div\tclass="weui-desktop-form__dropdowncascade"\t:class="{\t\t\'weui-desktop-form__dropdowncascade__default\': type == \'default\',\t\t\'weui-desktop-form__dropdowncascade__inner-text\': type == \'text\',\t\t\'weui-desktop-form__dropdowncascade__inner-table\': type == \'table-head\',\t\t\'weui-desktop-form__dropdowncascade__warn\': isWarn == true\t}">\t<dl class="weui-desktop-form__dropdowncascade-label">\t\t\t\t<dt\t\t\tclass="weui-desktop-form__dropdowncascade__dt"\t\t\t:class="{\t\t\t\t\'focus\': isOpen,\t\t\t\t\'weui-desktop-form__dropdowncascade__dt__inner-button\': type == \'default\',\t\t\t\t\'filter\': filterable,\t\t\t\t\'disabled\': disabled,\t\t\t\t\'placeholder\': !v.length\t\t\t}"\t\t\t@click.stop.prevent="handleActive()">\t\t\t<slot name="head"></slot>\t\t\t<template v-if="!filterable">\t\t\t\t<template v-if="v.length">\t\t\t\t\t<span\t\t\t\t\t\tv-for="(item, index) in v"\t\t\t\t\t\tclass="weui-desktop-form__dropdowncascade__dt__value_ele"\t\t\t\t\t\t:class="{\'last\': index == (v.length - 1)}">\t\t\t\t\t\t<i\t\t\t\t\t\t\tv-if="item.ele.icon || item.optionHeadClassName"\t\t\t\t\t\t\tclass="weui-desktop-dropdown__list-ele__head"\t\t\t\t\t\t\t:class="item.ele.optionHeadClassName">\t\t\t\t\t\t\t<img\t\t\t\t\t\t\t\tclass="weui-desktop-dropdown__list-ele__head__icon"\t\t\t\t\t\t\t\tv-if="item.ele.icon"\t\t\t\t\t\t\t\t:src="item.ele.icon" />\t\t\t\t\t\t</i>{{item.ele.label}}\t\t\t\t\t</span>\t\t\t\t</template>\t\t\t\t\t\t\t\t<template v-else>{{placeholder}}</template>\t\t\t</template>\t\t\t<template v-else>\t\t\t\t<input type="text" class="weui-desktop-form__dropdowncascade__search"  v-model="searchValue" @change="handleSearch" :placeholder="placeholder" :disabled="disabled" />\t\t\t</template>\t\t</dt>\t\t<dd class="weui-desktop-dropdowncascade-menu__wrp">\t\t\t<div class="weui-desktop-dropdowncascade-menu" v-if="" :class="{\'single\': optionsList.length == 1}">\t\t\t\t<template v-if="isOpen" v-for="(op, level) in optionsList">\t\t\t\t\t<ul :ref="\'list_\' + level" v-if="!loading && op && op.length != 0" class="weui-desktop-dropdowncascade__list" :class="{\'last-list\': level == (optionsList.length - 1)}">\t\t\t\t      <li class="weui-desktop-form__dropdowncascade-ele" v-for="(ele, index) in op" :title="ele.label" :class="{\'checked\': ele.isChecked, \'more\': ele.options && ele.options.length}">\t\t\t\t        <div class="weui-desktop-dropdowncascade__list-ele-contain" @click="handleNext({\'ele\': ele, \'level\': level, \'index\': index})">\t\t\t\t          {{ele.label}}\t\t\t\t        </div>\t\t\t\t      </li>\t\t\t\t    </ul>\t\t\t\t    <div v-if="loading" class="weui-desktop-dropdowncascade__list loading">\t\t\t\t\t\t加载中...\t\t\t\t\t</div>\t\t\t\t\t<div v-if="op && op.length == 0" class="weui-desktop-dropdowncascade__list weui-desktop-dropdown__list__empty">\t\t\t\t\t\t暂无数据\t\t\t\t\t</div>\t\t\t\t</template>\t\t\t</div>\t\t</dd>\t</dl>  <p class="weui-desktop-form__msg weui-desktop-form__msg_warn" v-if="isWarn && $slots.msg">    <slot name="msg"></slot>  </p>  <p class="weui-desktop-form__tips" v-if="$slots.tips">    <slot name="tips"></slot>  </p></div>'})
define("pages/modules/masssend/originalDialog/originalDialog.js",["pages/modules/masssend/originalDialog/originalDialog.tpl.js","vue-weui/src/dialog/dialog.js","vue-weui/src/step/step.js","vue-weui/src/input/input.js","pages/modules/masssend/originalDialog/originalDialog.css.js","pages/editor/eventBus4Web1.js"],function(e,t,r){"use strict"
var i=e("pages/modules/masssend/originalDialog/originalDialog.tpl.js")
e("vue-weui/src/dialog/dialog.js"),e("vue-weui/src/step/step.js"),e("vue-weui/src/input/input.js"),e("pages/modules/masssend/originalDialog/originalDialog.css.js")
var s=e("pages/editor/eventBus4Web1.js")
function a(e,t){if(0<arguments.length)for(var r in t)if(void 0!==t[r]){var i=new RegExp("({"+r+"})","g")
e=e.replace(i,t[r])}return e}Vue.component("masssend-original-dialog",{template:i,props:{show:{type:Boolean,default:!1},list:{type:Array},appmsgid:{type:String}},watch:{show:function(e){this.innerShow=e},innerShow:function(e){this.$emit("show-change",e)},list:function(e){e&&(this.step=1,this.dataList=this.getDataList(e))}},methods:{getDataList:function(e){return e.map(function(e){var t={article_title:e.article_title,source_url:e.source_url,source_title:e.source_title,idx:e.idx}
return t.complainUrl="/cgi-bin/appmsgcopyright?action=appeal&original_type="+e.source_type+"&original_url="+encodeURIComponent(e.source_url)+"&article_url="+encodeURIComponent(e.article_url)+"&article_title="+e.article_title,e.source_info.is_pay_subscribe||"EN_SOURCE_REPRINT_STATUS_REJECT_REPRINT"===e.source_info.source_reprint_status||"EN_SOURCE_REPRINT_STATUS_REPRINT_WITH_MODIFY"===e.source_info.source_reprint_status||"EN_SOURCE_REPRINT_STATUS_REPRINT_WITHOUT_MODIFY"===e.source_info.source_reprint_status?(1===e.user_source?t.reseaon=a('你的文章《{article_title}》与原创文章<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，不能声明原创，将以分享方式群发，如有异议可在当前页面申诉。',t):t.reseaon=a('你的文章《{article_title}》与原创文章<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，将以分享方式群发，如有异议可在当前页面申诉。',t),t.sendType=2):"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITH_SOURCE"===e.source_info.source_reprint_status?(t.reseaon=a('你的文章《{article_title}》已被原创文章<a href="{source_url}" target="_blank">《{source_title}》</a>纳入白名单，将默认以白名单约定的转载方式<span class="gray-content">（可修改，显示转载来源）</span>群发，如有异议可在当前页面申诉。',t),t.sendType=3,t.reprintTypeShow=!1,t.reprintType="white"):"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE"===e.source_info.source_reprint_status?(t.reseaon=a('你的文章《{article_title}》已被原创文章<a href="{source_url}" target="_blank">《{source_title}》</a>纳入白名单，将默认以白名单约定的转载方式<span class="gray-content">（可修改，不显示转载来源）</span>群发，如有异议可在当前页面申诉。',t),t.sendType=3,t.reprintTypeShow=!1,t.double=!0,t.reprintType="white"):"EN_SOURCE_REPRINT_STATUS_UNDECLARE"===e.source_info.source_reprint_status&&9===e.source_type?(t.reseaon=a('你的文章《{article_title}》与历史文章<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，不能声明原创，将以非原创方式群发，如有异议可在当前页面申诉。',t),t.sendType=1):"EN_SOURCE_REPRINT_STATUS_UNDECLARE"!==e.source_info.source_reprint_status||2!==e.source_type&&3!==e.source_type?"EN_SOURCE_REPRINT_STATUS_UNDECLARE"===e.source_info.source_reprint_status&&4===e.source_type?(t.sendType=1,4===e.black_type?t.black_name="公共公开信息":6===e.black_type?t.black_name="网络整合信息":5===e.black_type?t.black_name="营销宣传信息":t.black_name="默认类型",t.reseaon=a('你的文章《{article_title}》与{black_name}<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，不能声明原创，将以非原创方式群发，如有异议可在当前页面申诉。',t)):1===e.source_type&&(1===e.user_source?t.reseaon=a('你的文章《{article_title}》与原创文章<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，不能声明原创，将以分享方式群发，如有异议可在当前页面申诉。',t):t.reseaon=a('你的文章《{article_title}》与原创文章<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，将以分享方式群发，如有异议可在当前页面申诉。',t),t.sendType=2):(t.reseaon=a('你的文章《{article_title}》与时事新闻<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，不能声明原创，将以非原创方式群发，如有异议可在当前页面申诉。',t),t.sendType=1),t.word="",t})},next:function(){this.step=2},pre:function(){this.step=1},preview:function(){var e={appmsgid:this.appmsgid,copyright_check_result:this.list,operate_info:[]}
this.valid()&&(e.operate_info=this.dataList.map(function(e){var t=1
return 1===e.sendType?t=3:2===e.sendType?t=1:3===e.sendType&&(t="white"===e.reprintType?2:1),{idx:e.idx,operate_type:t,recommend_msg:e.word}}),this.$emit("preview",e),s.$emit("preview",e),this.innerShow=!1)},valid:function(){var t=!0
return this.dataList.forEach(function(e){2===e.sendType&&e.word&&140<e.word.length&&(t=!1),3===e.sendType&&("share"===e.reprintType&&e.word&&140<e.word.length&&(t=!1),"white"===e.reprintType&&e.word&&120<e.word.length&&(t=!1))}),!!t||(this.$tipsErr("推荐语长度超过限制，请依次检查并更正后重试"),!1)},send:function(){if(this.valid()){var e=this.dataList.map(function(e){var t={idx:e.idx}
return 3===e.sendType&&"white"===e.reprintType?(t.reprint_type="EN_REPRINT_TYPE_WHITELIST",t.recommend_msg=e.word):(t.reprint_type="EN_REPRINT_TYPE_SHARE",t.guide_words=e.word),t})
this.$emit("submit",e)}}},mounted:function(){var e=this
document.addEventListener?document.addEventListener("click",function(){e.dataList.forEach(function(e){3===e.sendType&&!0===e.reprintTypeShow&&(e.reprintTypeShow=!1)})},!0):document.attachEvent("onclick",function(){e.dataList.forEach(function(e){3===e.sendType&&!0===e.reprintTypeShow&&(e.reprintTypeShow=!1)})})},data:function(){return{innerShow:this.show,step:1,dataList:this.getDataList(this.list)}}})})
define("pages/modules/masssend/originalDialog/originalDialog.tpl.js",[],function(t,e,s){return'<mp-dialog ref="dialog" v-model="innerShow" title="原创校验"  width.number="800" height.number="800">  <div class=" js_maincontent">    <div>      <mp-step :step="step">        <mp-step-item title="确认群发方式"></mp-step-item>        <mp-step-item title="填写编者推荐语"></mp-step-item>      </mp-step>    </div>    <div class="flex original_popup-tips">      <div class="flex__item">        共{{dataList.length}}篇文章未通过原创校验逻辑，将按下列情况调整群发方式，如有异议可申诉      </div>      <div class="">        <a class="gray-content" href="https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=11540820414s4Fh8&version=1&lang=zh_CN&platform=2" target="_blank"><span class="icon-file"></span>原创规则指引</a>      </div>    </div>          <div class="weui-desktop-table__wrp original-table__wrap js_original_table" v-show="step==1">        <table class="weui-desktop-table js_list_wrap desktop-send-table">            <thead class="weui-desktop-table__hd">                <tr>                    <th class="original_td-max-width">未通过原因</th>                    <th class="original_popup-tabletd-one-last tl">群发方式</th>                </tr>            </thead>            <tbody class="weui-desktop-table__bd">                <tr v-for="item in dataList">                    <td class="original_td-max-width" v-html="item.reseaon"></td>                    <td class="original_popup-tabletd-one-last tl" v-if="item.sendType==1">                        <div class=" js_choosePublishWay js_enable" >                          <span class="js_publishWayText">                              非原创方式群发                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          如有异议，可<a :href="item.complainUrl" target="_blank">申诉</a>                        </div>                    </td>                    <td class="original_popup-tabletd-one-last tl" v-if="item.sendType==2">                        <div class=" js_choosePublishWay js_enable" >                          <span class="js_publishWayText">                              分享                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          如有异议，可<a :href="item.complainUrl" target="_blank">申诉</a>                        </div>                    </td>                    <td class="original_popup-tabletd-one-last tl" v-if="item.sendType==3">                        <div class=" js_choosePublishWay js_enable pb-position" >                          <span class="js_publishWayText">                              转载                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          如有异议，可<a :href="item.complainUrl" target="_blank">申诉</a>                        </div>                    </td>                </tr>            </tbody>        </table>    </div>        <div class="weui-desktop-table__wrp original-table__wrap js_original_table" v-show="step==2">        <table class="weui-desktop-table js_list_wrap desktop-send-table">            <thead class="weui-desktop-table__hd">                <tr>                    <th class="original_popup-tabletd-two-left">待群发文章</th>                    <th class="tl original_popup-tabletd-two-middle">群发方式</th>                    <th class="tl">编者荐语</th>                </tr>            </thead>            <tbody class="weui-desktop-table__bd">                <tr v-for="item in dataList">                    <td class="original_popup-tabletd-two-left">                        {{item.article_title}}                    </td>                    <td class="tl original_popup-tabletd-two-middle" v-if="item.sendType==1">                        <div class=" js_choosePublishWay" >                          <span class="js_publishWayText">                              非原创方式群发                          </span>                          <div class="gray-content js_publishWay_below_text">                            <a @click="preview(item)">预览</a>                          </div>                        </div>                    </td>                    <td class="tl" v-if="item.sendType==2">                        <div class=" js_choosePublishWay" >                          <span class="js_publishWayText">                              分享                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          分享样式，可<a @click="preview(item)">预览</a>                        </div>                    </td>                    <td class="tl" v-if="item.sendType==3&&item.reprintType==\'white\'">                        <div class=" js_choosePublishWay" >                          <span class="js_publishWayText">                              转载                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          转载样式，可<a @click="preview(item)">预览</a>                        </div>                    </td>                    <td class="tl" v-if="item.sendType==3&&item.reprintType==\'share\'">                        <div class=" js_choosePublishWay" >                          <span class="js_publishWayText">                              分享                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          分享样式，可<a @click="preview(item)">预览</a>                        </div>                    </td>                    <td class="tl" v-if="item.sendType==2||(item.sendType==3&&!item.double)">                        <div class="textarea-area" >                                                    <mp-input :multi="true" v-model="item.word" :countable="true" placeholder="分享推荐语，可以不填写" :maxlength="140" v-show="item.sendType==2||(item.sendType==3&&item.reprintType==\'share\')">                            <template slot="message">最大不能超过140个字</template>                          </mp-input>                          <mp-input :multi="true" v-model="item.word" :countable="true" placeholder="转载推荐语，可以不填写" :maxlength="120" v-show="item.sendType==3&&item.reprintType==\'white\'">                            <template slot="message">最大不能超过120个字</template>                          </mp-input>                        </div>                    </td>                    <td class="tl gray-content" v-if="item.sendType==1||(item.sendType==3&&item.double)">                       无需填写推荐语                    </td>                </tr>            </tbody>        </table>    </div>          </div>  <template slot="footer">    <mp-button  @click="show = false" v-show="step==1">取消</mp-button>    <mp-button type="primary" @click="next" v-show="step==1">下一步</mp-button>    <mp-button  @click="pre" v-show="step==2">上一步</mp-button>    <mp-button type="primary" @click="send" v-show="step==2">继续群发</mp-button>  </template></mp-dialog>'})
define("pages/modules/masssend/originalDialog/originalDialog.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.flex {  display: -ms-flexbox;  display: flex;}.flex__item {  -ms-flex: 1;      flex: 1;}.weui-desktop-step.weui-desktop-step:before {  display: inline-block !important;}.original_popup-tips {  padding: 20px 30px;}.original_popup-tabletd-one-last {  width: 140px;  padding-left: 80px;}.original_popup-tabletd-two-left {  width: 150px;  padding-right: 50px !important;}.original_popup-tabletd-two-middle {  padding-right: 50px !important;}.new-page_msg.large .inner {  padding: 0;}.new-msg_icon_wrapper {  width: 100%;  text-align: center;  padding-bottom: 30px;}.new-msg_icon_wrapper p {  color: #353535;  font-size: 18px;}.center-msg-icon .icon_msg {  margin-bottom: 30px;}.desktop-send-table td {  vertical-align: top;}.pdb-10 {  margin-bottom: 10px;}.desktop-send-table textarea {  height: 45px;  resize: none;  width: 100%;  border: 0;}.textarea-tips {  font-size: 14px;  color: #d7d7d7;  position: absolute;  right: 15px;  bottom: 10px;}.textarea-tips .share-text__counter_current {  color: #07C160;}.textarea-tips .share-text__counter_warn {  color: #fa5151;}.textarea-area {  position: relative;  padding: 10px;  border-radius: 3px;  width: 270px;  border: 1px solid #DFE3E5;}.textarea-area textarea {  height: 57px;  margin-bottom: 33px;  min-height: auto;}.textarea-area .weui-desktop-form__msg_warn {  padding-top: 0;  padding-bottom: 0;  margin-right: 10px;  margin-left: 10px;  margin-top: -29px;}.gray-content {  color: #9a9a9a;}.original-label {  margin-left: 2px;  font-size: 12px;  color: #ffffff;  padding: 0 5px;  border-radius: 2px;  display: inline-block;  background-color: rgba(0, 0, 0, 0.4);}.bold {  color: #353535;  font-weight: bold;}.tl {  text-align: left !important;}.black-link {  font-size: 14px;  color: #353535 !important;}.black-link:hover {  text-decoration: underline;}.original-table__wrap {  min-height: 240px;  max-height: 400px;  min-width: 750px;  overflow: auto;  width: 100%;  padding: 0 30px;  box-sizing: border-box;}.origin_dialog_bd {  padding: 66px 45px 0;}.icon-wenhao {  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAYAAADsHujfAAAABGdBTUEAALGPC/xhBQAABb9JREFUWAm1mFtMnEUUx9nlFhsKUSMBFxWpaFOrAuLdh4JWm7XEJhIa0Yhc9bGpWhMTm5QmJsWXvlm5rTyZIA8alFSD8OKtiniLpC2GNpblZmMDDyiwgL//53zbj+XbW5tOcnZmzvzPZc7MnG9mPSlJlJGRkfTR0dFKj8fz7Pr6ejG1D/ECo2ISXhDeOPUnZWVlQ+Xl5SuJqvckAuzo6CjAwOG1tbVq8NcnIgP+b3B90NHm5ubJeDIxHent7b1ufn7+EDM8hKItRtkaRr6CvsWxIDzbSIHX6/WBfQR6HL7X4BfBtuXk5LTV1NT8Y3ibqqiOdHd3F62urg6g9C4j9acU0u5jhrObNDkYgUAgLxQKPWcmcKuGkD2Tmprqb2homHBAw01XRzo7Ox9ktv2gcqFFZnosOzv73VgzCmt0NBTRhYWFN9D1JmxFdA5dVU1NTd87YFZzkyNE4iFmM2QEtfn8RODXSMFk+uyxe4nOADLa3ItpaWmVROaUU8cGR3DiJpbjR4RuAfSbccLeA065pNva8MaZe9B7gWW6H2f+shXZGyqFMKbixIdyAuAswD2J7HZbUbxauqRTumVDtmTTlkuzG5yOlwA8QT+EwH68nbLH3GpmuBv+y9BOaCuyY6z/SfbSe+ylVXibSmNj4xRR38/SD8qWbAIKCGgtjUlUZ+kXQm0tLS3aXK5lYGAgMxgMdqHoBTcAM/45IyNjb11dnY62a2lvbz/GgFLCeRLfnUp81tKQLRthFkILOiHUUcvU1NQROYHBVegdNt4u6GHk3qL/L2Mly8vLAeoN+8+p0NhYgFdobKdYS4OCVxAU9jhHSxnRtZAfthPW1zWIzKtgOx3AUxz7P9DTC+0Gq2UedIyHm7JBVI7DOCzb1Ce8PT09yoYlQqWnp1vrpbZbwYmnwKYiPLtt27YPIjEY+AjeRfHJHWWR486+bUu25YN3aWnJbwBj9fX1553gyDYO3CYewqcrKipCkeOmP6caR5QCohZja0wA+aClqVQHI5+pjlVQ/gXrq+N3xg3X39+/ZXp6utCM/e6GieApye3AdoUcKdAgyi3v1I5WOE2fMyZyLTMzM60MKJWHCP2XriAHEwfGsCtOgZdOnlrMdEb1lRbySj1KX5M8OlsJ/Xg8XeCmDSbfi7DlCGG/Yke6urq0iduNEwGy6NF4Tmjctikfwik+EUE3DEf2DtK1TksaM+zj3tHshovH09JYkWBprMjEE4gcZ1aafTb0i8/nezFaeo+UU9+2KR8UEWudUJi0I0TjBuR1fVQ54vf7l/5vJvbrsDktRyaN2N2JiV9GMZMd9KzsnJ+fH/U0XZbY2EJeH0yVSW3WYbVgPqM6yaKjekmhraqqWkxSVnC/fpAf8rDjb2azWV9KGEXs+HMavNaF4347QbDur1w7fF7dEXDgJ2O4/lo74NBv2ZJt+WAdXzrvG8ABPkA3OsAxm2zWfXxFz4q48MT8tjgVGRsHDO+EasuRkpKSbpw5R6i2cpeIeilyKlMbvI5tsaF08RIpsiFbsllaWhqQjOWIbkgMtBolB1m/XaYdr9JxvSRC6Vo8sMbZkxVUB9WWTftZGr5FwfTigI7gk9BcZmZmWazrnhQlW3Tv4JM/ilwuNMjBeNqegBURKRQjKyvreeoLAhK+k8msu3TEKtIlnWByZcPYCkcx7IiU1NbWXgSkTLlIhHZyrL8jlPdp7GqKdEiXdKJHb+Fq2XLqDC+Nk8l984GVlZVP4SmECT2infJ22+URP8c9ZS9XhB9sjF27OqJBk3AGaG5XX+GE2kg+fSiKeWVgInlEoJoI6J8E+1ifRl7PV9eEGdURGXd5RIutvyW+hr7ho6W3sZWVMejja6qL+KPQY+DsZU/oER/TEVlVITq6Tr4NaZb64sYtOKhnSR909X/URFobHh5Om5iYqCQS+3CoGGOKgF74WrogbUVonMh8XFRUNBTjph+pOuU/U5uwM0vfkSQAAAAASUVORK5CYII=);  background-size: 17px 18px;  width: 17px;  height: 18px;  display: inline-block;  cursor: pointer;  margin-left: 5px;  vertical-align: middle;  background-repeat: no-repeat;}.icon-file {  display: inline-block;  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAMAAABMOI/cAAAADFBMVEUAAACdnZ2bm5uamprkb5frAAAAA3RSTlMASePizoNQAAAANElEQVR4AWNgZGLGApgYGSDimDIMzMwMmAAkOvASMEfilKC15QiAU2JoWE5/CZwJDmcSBQAW5AMJVP7LrQAAAABJRU5ErkJggg==);  width: 12px;  height: 14px;  background-size: 12px 14px;  vertical-align: middle;  margin-right: 5px;}.icon-arrow {  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAABGdBTUEAALGPC/xhBQAAAE1JREFUGBljNDMza/j//389AxGAkZGxkfnp06cHZGRkGIHqHfDpASk+depUAzNIESFNMMUgtWAN+DQhK0bRgE0TumKQGqwAFBAgjE0SABXvJQzoKuPQAAAAAElFTkSuQmCC);  width: 6px;  height: 3px;  background-size: 6px 3px;  display: inline-block;  background-position: center center;  vertical-align: middle;  padding: 5px;  background-repeat: no-repeat;}.ad_transition_area {  margin-bottom: 20px;}.ad_transition_area.hide {  display: none;}.related_video_area {  margin-top: 20px;}.related_video_area .weui-desktop-popover__wrp {  vertical-align: -4px;}.related_video_img {  max-width: 100%;  margin-top: 5px;}.share-white_button {  display: inline-block;  box-shadow: 0px 1px 6px 0px #e4e8eb;  width: 86px;  height: 38px;  background-color: #ffffff;  font-size: 14px;  line-height: 38px;  color: #353535;  padding: 0 0 0 10px;  position: absolute;  cursor: pointer;}.share-white_button:hover {  background-color: #F7F7F7;}.pb-position {  position: relative;}.original_td-max-width {  width: 380px;  padding-right: 80px !important;}.weui-desktop-wechat-search {  position: relative;}.weui-desktop-wechat-search .weui-desktop-form-tag__input {  width: 14em;  font-size: 14px;}.weui-desktop-wechat-search .weui-desktop-opr-btn_close {  display: inline-block;}.weui-desktop-pop-panel {  position: absolute;  top: 100%;  left: 0;  right: 0;  background: #FFFFFF;  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);  border-radius: 2px;  padding: 15px 0;  z-index: 1;}.weui-desktop-pop-panel__hd {  padding: 0 20px 15px;}.weui-desktop-pop-panel__hd .weui-desktop-global__info {  color: #9A9A9A;}.weui-desktop-wechat-list {  max-height: 300px;  overflow: auto;}.weui-desktop-wechat {  padding: 9px 40px 9px 20px;  width: auto;  overflow: hidden;  text-overflow: ellipsis;  white-space: nowrap;  word-wrap: normal;  color: #353535;}.weui-desktop-wechat:hover {  background-color: #FAFAFA;  cursor: pointer;}.weui-desktop-wechat_selected {  color: #07C160;  position: relative;}.weui-desktop-wechat_selected:after {  content: \" \";  width: 8px;  height: 4px;  border-left: 2px solid #21B020;  border-bottom: 2px solid #21B020;  border-radius: 1px;  transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);  -ms-transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);  -webkit-transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);  position: absolute;  right: 20px;  top: 50%;  margin-top: -4px;}.wechat_send_dialog .dialog_bd {  padding: 45px 100px 0;  min-height: 355px;}.wechat_send_dialog .frm_control_group {  padding-bottom: 0;}.wechat_send_dialog .frm_tips,.wechat_send_dialog .frm_msg {  width: auto;}.wechat_send_content.with_qrcheck .wechat_send_qrcheck {  display: block;}.wechat_send_extra_info {  padding-top: 10px;}.wechat_send_extra_info:after {  content: \"\\200B\";  display: block;  height: 0;  clear: both;}.wechat_send_msg {  float: none;  display: table-cell;  vertical-align: top;  width: auto;}.wechat_send_msg:after {  content: \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . \";  display: block;  clear: both;  height: 0;  line-height: 0;  visibility: hidden;}.wechat_send_qrcheck {  float: right;  margin-left: 50px;  padding-left: 40px;  border-left: 1px solid #E7E7EB;  text-align: center;  display: none;}.wechat_send_qrcheck_img {  width: 140px;  height: 140px;  margin-bottom: 10px;}.weui-desktop-form-tag__wrp {  margin: 0;}";});define("pages/modules/verify_code/verify_code.js",["pages/modules/verify_code/verify_code.tpl.js","vue-weui/src/input/input.js","vue-weui/src/form/form.js","vue-weui/src/form/form_item.js","pages/modules/verify_code/verify_code.css.js"],function(e,r,o){"use strict"
var i=e("pages/modules/verify_code/verify_code.tpl.js")
e("vue-weui/src/input/input.js"),e("vue-weui/src/form/form.js"),e("vue-weui/src/form/form_item.js"),e("pages/modules/verify_code/verify_code.css.js")
Vue.component("mp-verify-code",{template:i,name:"mp-verify-code",model:{prop:"code",event:"input"},props:{name:String,code:{type:String,require:!0,default:""},required:{type:Boolean,default:!1}},data:function(){return{internalCode:this.code||"",random:Date.now(),internalStatus:"normal",codeRules:[{required:!0,message:"请输入验证码",trigger:"blur"}]}},watch:{code:function(e){this.internalCode=e},internalCode:function(e){this.$emit("input",e)}},computed:{verifyImg:function(){return"/cgi-bin/verifycode?r="+this.random}},methods:{onClickRefresh:function(){this.random=Date.now()}}})})
define("pages/modules/verify_code/verify_code.tpl.js",[],function(e,i,r){return'<mp-form-item class="verify-code__area" :prop="name" :rules="codeRules">  <span slot="label">验证码</span>\t<mp-input v-model.trim="internalCode" :clearable="true" filter="trim" autocomplete="off">\t</mp-input>\t<div class="verify-code__wrp">\t  <img :src="verifyImg" @click="onClickRefresh">\t  <a href="javascript:;" class="weui-desktop-link" @click="onClickRefresh">换一张</a>\t</div></mp-form-item>'})
define("pages/modules/verify_code/verify_code.css.js", [], function (require, exports, module){module.exports = ".verify-code__wrp {  margin-top: 10px;}.verify-code__wrp img,.verify-code__wrp a {  vertical-align: middle;}";});define("vue-weui/src/utils/string.js",[],function(t,n,e){"use strict"
e.exports={format:function(t,e){return t.replace(/\{(\w+)\}/g,function(t,n){return void 0!==e[n]?e[n]:t})},sprintf:function(){for(var t=arguments.length,n=Array(t),e=0;e<t;e++)n[e]=arguments[e]
var r=void 0,i=n[0]||"",o=void 0,u=void 0,c=n.length-1
if(c<1)return i
for(r=1;r<1+c;)i=i.replace(/%s/,"{#"+r+"#}"),r++
for(i.replace("%s",""),r=1;void 0!==(o=n[r]);)u=new RegExp("{#"+r+"#}","g"),i=i.replace(u,o),r++
return i},text:function(t){return t.replace(/<\/?[^>]*\/?>/g,"")},len:function(t){return t.replace(/[^\x00-\xff]/g,"**").length},truncate:function(t,n,e){var r=n||30,i=Object.isUndefined(e)?"...":e
return t.length>r?t.slice(0,r-i.length)+i:String(t)},trim:String.prototype.trim||function(t,n){return!0===n?t.replace(/^\s+/,""):!1===n?t.replace(/\s+$/,""):t.replace(/^\s+/,"").replace(/\s+$/,"")},html:function(t,n){var e=void 0
e=!1===n?["&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&amp;","&"]:["&","&amp;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;"]
for(var r=t,i=0;i<e.length;i+=2)r=r.replace(new RegExp(e[i],"g"),e[1+i])
return r},has:function(t,n){return-1<t.indexOf(n)},startsWith:function(t,n){return 0===t.lastIndexOf(n,0)},endsWith:function(t,n){var e=t.length-n.length
return 0<=e&&t.indexOf(n,e)===e},param:function(t,e,n){if("function"!=typeof t.split)return null
var r=t.split(n||"&"),i={}
return r.each(function(t){var n=t.split("=")
2===n.length&&n[0]&&n[1]&&(!0===e?i[decodeURIComponent(n[0])]=decodeURIComponent(n[1]):i[n[0]]=n[1])}),i},empty:function(t){return""===t},blank:function(t){return/^\s*$/.test(t)},bytes:function(t){for(var n=0,e=void 0,r=0;e=t.charAt(n++);)r+=e.charCodeAt().toString(16).length/2
return r}}})
define("pages/modules/media_dialog/mass_send_dialog/mass_send_dialog.tpl.js",[],function(i,a,e){return'<div v-if="data.cgiData">  <mp-dialog title="发布图文" :width="726" v-model="innerShow">    <div class="multi-send">      <div class="multi-send__head" v-show="!timer">群发设置</div>      <div class="multi-send__desc" v-show="!timer">群发开始后不能撤销</div>      <div class="multi-send__form">        <mp-form>          <mp-form-item label="群发对象">            <mp-cascader placeholder="全部用户" v-model="group" :options="groupData"></mp-cascader>          </mp-form-item>          <mp-form-item label="性别">            <mp-dropdown :options="sexData" v-model="sex"></mp-dropdown>          </mp-form-item>          <mp-form-item label="地区">            <mp-region :initChina="false" @change="areaChange"></mp-region>          </mp-form-item>          <mp-form-item label="定时群发">            <div class="multi-send__timer-wrp">              <mp-switch v-model="timer" @change="timerSwitchChange"></mp-switch>              <div class="weui-desktop-form__tips" v-show="timer">                你可以选择5分钟后的今、明两天内任意时刻定时群发，成功设置后不支持修改，但在设定的时间之前可取消，取消后不占用群发条数。<a target="blank" href="http://kf.qq.com/faq/170627JRVbAb170627mMza6F.html">查看详情</a>              </div>              <div class="multi-send__timer" v-show="timer">                <mp-dropdown :options="dayData" @change="dayChange" v-model="day"></mp-dropdown>                <mp-time-picker v-model="curTime" :min="minTime" @time-change="timerChange" v-if="timer"></mp-time-picker>              </div>            </div>            <p v-show="hot_time_type!=0">{{hot_time_word}}</p>          </mp-form-item>          <mp-form-item>            <mp-verify-code v-if="needVerifycode" v-model="verifyCode"></mp-verify-code>          </mp-form-item>        </mp-form>      </div>    </div>    <div slot="footer" class="multi-send__footer">      <div class="multi-sent__notice" v-show="!timer">        <div v-show="serviceType==0||serviceType==1">今天还可以群发<span>{{data.cgiData.time_send_today_left}}</span>次</div>        <div v-show="serviceType==2">本月还可以群发<span>{{data.cgiData.mass_send_left}}</span>次</div>       </div>      <div class="multi-sent__notice" v-show="timer">        <div v-show="day==1">今天还可以群发<span>{{data.cgiData.time_send_today_left}}</span>次</div>         <div v-show="day==2">明天还可以群发<span>{{data.cgiData.time_send_tomorrow_left}}</span>次</div>      </div>      <div class="weui-desktop-popover__wrp">                <mp-button type="primary" :disabled="submitDisabled" @click="submit" slot="target">{{btTxt}}</mp-button>                <transition name="fade">          <div v-show="confirmShow" class="weui-desktop-popover weui-desktop-popover_pos-down-center">            <div class="weui-desktop-popover__inner">              <div class="weui-desktop-popover__desc">                <div v-html="confirmMsg"></div>              </div>              <div class="weui-desktop-popover__bar">                <mp-button type="primary" @click="doConfirm">群发</mp-button>                <mp-button type="default" @click="confirmShow=false">取消</mp-button>              </div>            </div>          </div>        </transition>      </div>    </div>  </mp-dialog>    <masssend-original-dialog :show="originalDialogShow" @show-change="originalDialogShowChange" :list="originalList"    v-if="originalList.length>0" @submit="originalDialogSubmit" :appmsgid="originalAppmsgid" @preview="onPreview"></masssend-original-dialog>  <mp-dialog title="添加广告" v-model="adWarnShow">    <div class="dialog_bd">      <div class="page_msg large simple default">        <div class="inner group">          <span class="msg_icon_wrapper"><i class="icon_msg info"></i></span>          <div class="msg_content ">            {{adWarnContent}}          </div>        </div>      </div>    </div>    <div slot="footer">      <mp-button type="default" @click="adWarnShow=false">确定</mp-button>    </div>  </mp-dialog>  <mp-dialog title="添加广告" v-model="adViewShow">    <div class="mpda_send_panel">      <div class="mpda_preview_area">        <div class="wx_preview_default" v-for="item in adViewList">          <div class="wx_preview_default_hd">            <h3 class="wx_preview_default_title">{{nick_name}}</h3>          </div>          <div class="mpda_wrp">            <div class="mpda_area show" >              <div class="mpda_placeholder">                <p class="mpda_tips">广告，也是生活的一部分</p>              </div>              <div class="mpda_inner">                <div class="mpda_hd">                  <span class="mpda_main_img img_bg_cover" :style="{backgroundImage:\'url(\'+item.ad_img+\')\'}"></span>                </div>                <div class="mpda_bd">                  <span class="mpda_logo img_bg_cover" :style="{backgroundImage:\'url(\'+item.img+\')\'}"></span>                  <div class="mpda_desc_box">                    <p class="mpda_title">{{item.nick_name}}</p>                    <p class="mpda_details">提供的广告</p>                  </div>                  <a class="mpda_btn_more" v-if="item.pt == 108 || item.pt==116">查看详情</a>                  <a class="mpda_btn_more" v-else-if="item.pt == 109">下载应用</a>                  <a class="mpda_btn_more" v-else-if="item.pt == 110 || item.pt==117">了解公众号</a>                  <a class="mpda_btn_about" id="js_btn_about" href="./about.html">关于赞助广告</a>                </div>              </div>            </div>          </div>        </div>      </div>      <div class="mpda_msg_area">        <div class="page_msg mini default">          <div class="inner">            <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>            <div class="msg_content">              <p>{{adViewContent}}</p>            </div>          </div>        </div>      </div>    </div>    <div slot="footer">      <mp-button type="primary" @click="adSend">群发</mp-button>      <mp-button type="default" @click="adViewShow=false">取消</mp-button>    </div>  </mp-dialog>  <mp-dialog title="原创校验中" v-model="copyRightingShow" @close="copyRightingClose">    <div class="dialog_bd">      <div class="page_msg large simple default">        <div class="inner group">          <span class="msg_icon_wrapper"><i class="icon_msg waiting"></i></span>          <div class="msg_content ">            {{copyRightingContent}}          </div>        </div>      </div>    </div>  </mp-dialog>  <mp-dialog title="原创校验超时" v-model="copyRightedShow" @close="copyRightedClose">    <div class="dialog_bd">      <div class="page_msg large simple default">        <div class="inner group">          <span class="msg_icon_wrapper"><i class="icon_msg warn_primary"></i></span>          <div class="msg_content ">            原创校验超时，暂时无法声明原创|你可以选择继续群发，先以非原创的样式发出。原创校验一旦完成，将对已群发并成功声明原创的文章补上原创标志，若文章有设置赞赏则同步恢复文章中的赞赏。          </div>        </div>      </div>    </div>    <div slot="footer">      <mp-button type="primary" @click="copyRightTimeout">继续群发</mp-button>      <mp-button type="default" @click="copyRightedClose">取消</mp-button>    </div>  </mp-dialog></div>'})
define("message/message_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/dialog.js","resp_types/base_resp.rt.js"],function(e,s,r){
"use strict";
var t={
masssend:"/cgi-bin/masssend?t=ajax-response",
massTimesend:"/cgi-bin/masssend?action=time_send&t=ajax-response",
massCheckTimer:"/cgi-bin/masssend?action=check_send_time",
massdel:"/cgi-bin/masssendpage?action=delete",
star:"/cgi-bin/setstarmessage?t=ajax-setstarmessage&only_cdn=0",
save:"/cgi-bin/savemsgtofile?t=ajax-response&only_cdn=0",
sendMsg:"/cgi-bin/singlesend?t=ajax-response&f=json",
getNewMsg:"/cgi-bin/singlesendpage?tofakeid=%s&f=json&action=sync&lastmsgfromfakeid=%s&lastmsgid=%s&createtime=%s",
getNewMsgCount:"/cgi-bin/getnewmsgnum?f=json&t=ajax-getmsgnum&lastmsgid=",
pageNav:"/cgi-bin/message?f=json&offset=%s&day=%s&keyword=%s&action=%s&frommsgid=%s&count=%s",
searchMsgByKeyword:"/cgi-bin/getmessage?t=ajax-message&count=10&keyword=",
checkcopyright:"/cgi-bin/masssend?action=get_appmsg_copyright_stat",
checkSponsorAd:"/cgi-bin/masssend?action=check_ad",
openAdReprint:"/cgi-bin/operate_appmsg?sub=open_ad_reprint"
},n=e("common/wx/Tips.js"),i=e("common/wx/Cgi.js"),o=e("common/wx/dialog.js"),a=e("resp_types/base_resp.rt.js");
r.exports={
masssend:function(e,s,r){
i.post({
url:wx.url(e.send_time?t.massTimesend:t.masssend),
data:e,
rtDesc:$.extend({},a,{
month_max_count:"number",
month_cur_count:"number",
pub_product_count:"number"
}),
error:function(){
n.err("发送失败"),r&&r();
}
},function(t){
if(!t||!t.base_resp)return n.err("发送失败"),void(r&&r(t));
var i=t.base_resp.ret;
if("0"==i){
var a="";
return a=e.send_time?"定时发送成功":"发送成功",n.suc(a),void(s&&s(t));
}
if("202702"==i)n.err("请删除红包封面后再群发");else if("67016"==i){
var c=t.video_title?"视频《%s》".sprintf(t.video_title):"视频";
n.err(c+"还在审核中，若审核失败则将无法播放");
}else if("67015"==i){
var c=t.video_title?"视频《%s》".sprintf(t.video_title):"视频";
n.err(c+"审核失败、已被下架或删除，无法播放，请重新选择");
}else if("67012"==i)n.err("设置失败，定时时间与已有互选广告订单时间冲突");else if("67013"==i)n.err("设置失败，定时时间超过卡券有效期");else if("67024"==i){
var c=t.video_title||e.title;
n.err("因视频《"+c+"》被删除，导致转载视频无法播放，请重新上传视频");
}else if("67025"==i){
var c=t.video_title||e.title;
n.err("因视频《"+c+"》被取消原创，导致转载视频无法播放，请重新上传视频");
}else if("200002"==i)n.err("系统繁忙，请稍后重试");else if("200013"==i)n.err("操作太频繁，请稍后再试");else if("67014"==i)n.err("该时刻定时消息过多，请选择其他时刻");else if("67020"==i)n.err("赞赏账户授权失效或者状态异常");else if("67023"==i)n.err("内容不能包含外部链接，请调整后发送");else if("67023"==i)n.err("内容不能包含外部链接，请输入以http://和https://开头的公众号相关链接");else if("67011"==i)n.err("设置的定时群发时间错误，请重新选择");else if("64004"==i)n.err(e.send_time?"剩余定时群发数量不足":"今天的群发数量已到，无法群发");else if("67008"==i)n.err("消息中可能含有具备安全风险的链接，请检查");else if("200008"==i)n.err("请输入验证码");else if("14002"==i)n.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行卡券投放。");else if("200001"==i)n.err("图文内包含的音频已被删除，请重新添加。");else if("200046"==i)n.err("图文内含有不合法的音频，请重新上传后再次插入。");else if("14003"==i)n.err("投放用户缺少测试权限，请先设置白名单");else if("67010"==i);else if("155001"==i){
var a=t.month_cur_count>=t.month_max_count?"本月发表付费文章已达10篇|每个月发送的付费文章最多10篇，本月你已超过限制数量，不能再发送付费文章":"本月发表付费文章已达10篇|每个月发送的付费文章最多10篇，本月你还可以发送"+(t.month_max_count-t.month_cur_count)+"篇付费文章，请重新设置。";
o.show({
type:"warn",
msg:a,
buttons:[{
text:"关闭",
click:function(){
this.remove();
}
}]
});
}else"154017"==i?n.err("先绑定管理员再群发"):"64559"==i?n.err("不支持添加未群发的文章链接"):"202605"==i?n.err("帐号付费功能被封禁期间不可群发付费内容"):"202610"==i?n.err("帐号未开通付费功能，不可群发付费内容"):t.hasnotHandle=!0;
r&&r(t);
});
},
massCheckTimer:function(e,s,r){
i.post({
url:wx.url(t.massCheckTimer),
data:e,
rtDesc:$.extend({},a,{
time_now:"number"
}),
error:function(){
n.err("校验定时群发失败"),r&&r();
}
},function(e){
if(!e||!e.base_resp)return n.err("校验定时群发失败"),void(r&&r(e));
var t=e.base_resp.ret;
return"0"==t?void(s&&s(e)):("67018"==t?(e.customerMsg="你已设置过相同时间的定时消息，请到定时列表检查，避免重复操作。",
n.err(e.customerMsg)):n.err("67014"==t?"该时刻定时消息过多，请选择其他时刻":"67012"==t?"设置失败，定时时间与已有互选广告订单时间冲突":"67013"==t?"设置失败，定时时间超过卡券有效期":"200013"==t?"操作频率过高，请明天再试":"64004"==t?"剩余定时群发数量不足":"67011"==t?"设置的定时群发时间错误，请重新选择":"系统繁忙，请稍后再试"),
void(r&&r(e)));
});
},
checkCopyright:function(e,s,r){
return i.post({
url:wx.url(t.checkcopyright),
data:e,
rtDesc:$.extend({},a,{
list:"string"
}),
error:function(e,s){
r&&r(s);
}
},function(e){
return e&&e.base_resp?void(s&&s(e)):(i.handleRet(e,{
id:64462,
key:49,
url:"/cgi-bin/masssend?action=get_appmsg_copyright_stat",
showMsg:!1
}),void(r&&r(e)));
});
},
checkSponsorAd:function(e,s,r){
return i.post({
url:wx.url(t.checkSponsorAd),
data:e,
error:function(e,s){
s&&s(status);
}
},function(e){
return e&&e.base_resp?void(s&&s(e)):void(r&&r(e));
});
},
massdel:function(e,s,r,o){
i.post({
url:wx.url(t.massdel),
data:{
id:e,
idx:o
},
error:function(){
n.err("删除失败");
}
},function(e){
return e&&e.base_resp&&0==e.base_resp.ret?(n.suc("删除成功"),void(s&&s(e))):(i.handleRet(e,{
id:64462,
key:50,
url:"/cgi-bin/masssendpage?action=delete",
msg:"删除失败"
}),void(r&&r(e)));
});
},
getNewMsg:function(e,s,r,n,o,a){
i.get({
url:wx.url(t.getNewMsg.sprintf(e,s,r,n)),
mask:!1,
handlerTimeout:!0,
error:a
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?o&&o(e.page_info.msg_items.msg_item):i.handleRet(e,{
id:64462,
key:51,
url:"/cgi-bin/singlesendpage?action=sync",
showMsg:!1
});
});
},
saveVoice:function(e,s,r,o){
i.post({
mask:!1,
url:wx.url(t.save),
data:{
msgid:e,
title:s,
filename:s,
voice_cagtegory:r
},
error:function(){
n.err("保存音频失败");
}
},function(e){
if(!e||!e.base_resp)return void n.err("保存音频失败");
var s=e.base_resp.ret;
"0"==s?(n.suc("保存音频成功"),"function"==typeof o&&o(e)):"220001"==s?n.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'):"220002"==s?n.err("你的图片库已达到存储上限，请进行清理。"):i.handleRet(e,{
id:64462,
key:52,
url:"/cgi-bin/savemsgtofile",
msg:"保存音频失败"
});
});
},
save:function(e,s,r,o,a){
"function"==typeof r&&(o=r,r=""),i.post({
mask:!1,
url:wx.url(t.save),
data:{
msgid:e,
filename:s,
digest:r,
scene:a
},
error:function(){
n.err("保存素材失败");
}
},function(e){
if(!e||!e.base_resp)return void n.err("保存素材失败");
var s=e.base_resp.ret;
"0"==s?(n.suc("保存素材成功"),"function"==typeof o&&o(e)):"220001"==s?n.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'):"220002"==s?n.err("你的图片库已达到存储上限，请进行清理。"):i.handleRet(e,{
id:64462,
key:53,
url:"/cgi-bin/savemsgtofile",
msg:"保存素材失败"
});
});
},
star:function(e,s,r){
i.post({
mask:!1,
url:wx.url(t.star),
data:{
msgid:e,
value:1==s?0:1
},
error:function(){
n.err(1==s?"取消收藏失败":"收藏消息失败");
}
},function(e){
if(!e||!e.base_resp)return void n.err(1==s?"取消收藏失败":"收藏消息失败");
var t=e.base_resp.ret;
0!=t?i.handleRet(e,{
id:64462,
key:54,
url:"/cgi-bin/setstarmessage",
msg:1==s?"取消收藏失败":"收藏消息失败"
}):(n.suc(1==s?"已取消收藏":"已收藏"),"function"==typeof r&&r(e));
});
},
sendMsg:function(e,s,r){
i.post({
url:wx.url(t.sendMsg),
data:e,
error:function(){
n.err("发送失败"),r&&r();
}
},function(e){
if(!e||!e.base_resp)return n.err("发送失败"),void(r&&r(e));
var t=e.base_resp.ret;
return 0==t?(n.suc("回复成功"),void("function"==typeof s&&s(e))):(10703==t?n.err("对方关闭了接收消息"):10700==t?n.err("该用户已经取消关注，你无法再给他发送消息。"):10701==t?n.err("该用户已被加入黑名单，无法向其发送消息"):62752==t?n.err("消息中可能含有具备安全风险的链接，请检查"):10704==t?n.err("该素材已被删除"):10705==t?n.err("该素材已被删除"):10706==t?n.err("由于该用户48小时未与你互动，你不能再主动发消息给他。直到用户下次主动发消息给你才可以对其进行回复。"):200008==t?n.err("请输入验证码"):(1530500!=t||1530507!=t)&&i.handleRet(e,{
id:64462,
key:55,
url:"/cgi-bin/singlesend",
msg:"发送失败"
}),void(r&&r(e)));
});
},
getNewMsgCount:function(e,s,r,n,o){
i.post({
mask:!1,
handlerTimeout:!0,
url:wx.url(t.getNewMsgCount+e+"&filterivrmsg="+s+"&filterspammsg="+r),
error:o
},function(e){
"function"==typeof n&&n(e),e&&e.base_resp&&e.base_resp.ret&&i.handleRet(e,{
id:64462,
key:56,
url:"/cgi-bin/getnewmsgnum",
showMsg:!1
});
});
},
quickReply:function(e,s,r){
this.sendMsg({
mask:!1,
tofakeid:e.toFakeId,
imgcode:e.imgcode,
type:1,
content:e.content,
out_trade_no:e.out_trade_no,
appmsg:e.appmsg||"",
quickreplyid:e.quickReplyId
},s,r);
},
pageNav:function(e,s,r){
var n=t.pageNav.sprintf((e.page-1)*e.count,e.day||"",e.keyword||"",e.action||"",e.frommsgid||"",e.count||"");
i.post({
dataType:"json",
url:wx.url(n),
mask:!1,
data:{},
error:r
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?"function"==typeof s&&s(e.msg_items.msg_item):i.handleRet(e,{
id:64462,
key:57,
url:"/cgi-bin/message",
showMsg:!1
});
});
},
searchMsgByKeyword:function(e,s,r){
i.post({
dataType:"html",
mask:!1,
url:wx.url(url.searchMsgByKeyword+e),
error:function(){
n.err("系统发生异常，请刷新页面重试"),r&&r({});
}
},function(e){
"function"==typeof s&&s($.parseJSON(e)),e&&e.base_resp&&e.base_resp.ret&&i.handleRet(e,{
id:64462,
key:58,
url:"/cgi-bin/getmessage",
showMsg:!1
});
});
},
openAdReprint:function(e,s,r){
"EN_CAN_OPEN_AD_REPRINT"===s?i.post({
url:t.openAdReprint,
data:{
msgid:e.appmsgid,
idx_list:e.idxList
}
},{
done:function(e){
e&&e.base_resp&&64706===e.base_resp.ret&&console.log("不满足开通条件"),"function"==typeof r&&r();
},
fail:function(){
"function"==typeof r&&r();
}
}):"function"==typeof r&&r();
}
};
});define("safe/safe_check.js",["common/wx/Tips.js","common/wx/popup.js","common/wx/Cgi.js","safe/Scan.js","safe/Mobile.js","biz_web/ui/checkbox.js","common/wx/Step.js","safe/tpl/safe_check.html.js"],function(e,s,t){
"use strict";
var i=e("common/wx/Tips.js"),n=(e("common/wx/popup.js"),e("common/wx/Cgi.js")),o=e("safe/Scan.js"),a=e("safe/Mobile.js"),c=(e("biz_web/ui/checkbox.js"),
e("common/wx/Step.js")),d=e("safe/tpl/safe_check.html.js");
t.exports={
_types:{
send:'_"(群发)"'
},
check:function(e,s,t){
t=t||{},t.onClose&&t.onClose(),"undefined"==typeof t.autoClose&&(t.autoClose=!0);
var i=!0;
switch(e.source){
case"msgs":
i=2==(2&e.protect_status);
break;

case"cburl":
i=4==(4&e.protect_status);
break;

case"appkey":
i=!0;
break;

case"showas":
i=!0;
break;

case"unbindopen":
i=!0;
break;

case"bind_IP":
i=!0;
break;

default:
i=!1;
}
if(i){
var n,a,c={
scaner:null,
destroy:function(){
c.scaner&&c.scaner.destroy();
}
},r=$(d).find(t&&t.checkdom?t.checkdom:".js_wxcheck");
return t.dialog&&t.dialogdom?(n=t.dialog,a=t.dialogdom,a.html(r)):a=r.popup({
title:"微信验证",
width:860,
onShow:function(){
n=this,$(this.$dialogWrp.get(0)).css({
"margin-top":-227
}),t&&t.onShow&&t.onShow();
},
close:function(){
c&&c.destroy(),t&&t.onClose&&t.onClose(),this.remove();
}
}),c.scaner=new o({
container:a,
type:"check",
source:e.source,
msgid:e.msgid,
distinguish:e.distinguish,
default_initdom:e.default_initdom,
mustAdmin:e.mustAdmin,
wx_name:"wx.pass"==e.wx_alias?"":e.wx_alias,
onconfirm:function(){
var i={
code:this.code
},o=function(){
t.autoClose&&n.remove(),e.unadmin_url?location.href=e.unadmin_url:location.reload();
};
this.isadmin&&!this.issubadmin||!this.distinguish?(i.type=1,t.autoClose&&n.remove()):(i.type=this.issubadmin?2:-1,
"msgs"!=e.source&&"bind_IP"!=e.source||2!=i.type?(this.container.find(".js_wxchecks").html((t&&t.unadmin_html?t.unadmin_html:'<div class="page_msg large simple default"><div class="inner group"><span class="msg_icon_wrp"><i class="icon_msg_primary waiting"></i></span><div class="msg_content"><h4>已发送操作申请</h4><p>请等待管理员(%s)验证操作申请，验证通过后操作将立即进行。此申请在30分钟后过期，请尽快联系管理员验证。</p></div></div><div class="tool_bar tc border"><a href="javascript:;" class="btn btn_primary js_unadminsend">我知道了</a></div></div>').sprintf(this.opt.wx_name)),
this.container.find(".js_wxchecks").find(".js_unadminsend").on("click",o),this.container.find(".pop_closed").on("click",o),
n.resetPosition()):t.autoClose&&n.remove(),t&&t.notadminCallback&&t.notadminCallback()),
"function"==typeof s&&s(i);
}
}),n.resetPosition(),c;
}
return"function"==typeof s&&s("wx.pass"),null;
},
off_protect_tip:function(e,s){
s&&s.onClose&&s.onClose();
$(d).find(s.dom?s.dom:".js_off_protect").popup({
title:"开启微信保护",
width:860,
close:function(){
this.remove();
},
buttons:[{
text:"开始",
click:function(){
this.remove(),"function"==typeof e&&e();
},
type:"primary"
},{
text:"取消",
click:function(){
s&&s.onClose&&s.onClose(),this.remove();
},
type:"default"
}]
});
},
no_helper_tip:function(e,s){
s&&s.onClose&&s.onClose();
$(d).find(s.dom?s.dom:".js_no_helper").popup({
title:"开启微信保护",
width:860,
close:function(){
this.remove();
},
buttons:[{
text:"开始",
click:function(){
this.remove(),"function"==typeof e&&e();
},
type:"primary"
},{
text:"取消",
click:function(){
s&&s.onClose&&s.onClose(),this.remove();
},
type:"default"
}]
});
},
bind:function(e,s,t,r){
function l(){
var i=w.find(".js_step3");
i.show(),m=new o({
container:i,
type:e,
source:s.source,
code:s.code,
auth:s.auth,
dom_init:'<div class="status tips"><p>请使用微信扫描二维码进行验证</p></div>',
onconfirm:function(){
p.remove(),"function"==typeof t&&t({
data:this,
wx_name:"wx.pass"
});
}
});
}
function _(){
var e=w.find(".js_step3"),i=e.find(".js_forget"),n="/acct/findacct?action=scan";
i.find("a").attr("href",wx.url(n+("ticket"==s.auth?"&auth=ticket":""))),i.show(),
e.show(),m=new o({
container:e,
type:f,
source:s.source,
code:s.code,
auth:s.auth,
wx_name:"wx.pass"==s.wx_alias?"":s.wx_alias,
onconfirm:function(){
p.remove(),"function"==typeof t&&t({
data:this,
wx_name:"wx.pass"
});
}
});
}
!s&&(s={}),!r&&(r={});
var f;
switch(e){
case"bind_showas":
f="change_protect_showas";
break;

case"bind_masssend":
f="change_protect_masssend";
break;

case"bind_login":
f="change_protect_login";
break;

default:
f="bind";
}
r&&r.onClose&&r.onClose();
var m,u,p,h=s&&s.wx_alias?!0:!1,b="click",w=$(d).find(".js_bind").popup({
className:"dialog_process",
title:"bind"==e?"绑定公众号安全管理员":"开启微信保护",
width:960,
onShow:function(){
p=this,$(this.$dialogWrp.get(0)).css({
"margin-top":-227
});
},
close:function(){
r&&r.onClose&&r.onClose(),m&&m.destroy(),this.remove();
}
});
n.post({
url:wx.url("/misc/safeassistant?action=checkwx_report")+(s.auth?"&auth=ticket":""),
mask:!1
},$.noop),u=new c({
container:w.find(".js_process"),
selected:1,
names:["1 选择验证方式","2 帐号验证",h?"3 开启微信保护":"3 绑定微信号"]
}),w.find(".js_step1_num").text(s&&s.mobile?s.mobile:""),w.find(".js_step1_email").text(s&&s.bind_mail?s.bind_mail:""),
s&&"1"==s.third_status&&w.find(".js_option").show(),w.find(".frm_radio").checkbox({
multi:!1,
onChanged:function(e){
w.find(".js_step1_next").data("type",e.val());
}
}),w.find(".js_step1_next").data("type","1").on(b,function(){
var e=$(this).data("type");
if(!("1"!=e||s&&s.mobile))return void i.err("手机号为空，请选择其他验证方式");
if(!("2"!=e||s&&s.bind_mail))return void i.err("邮箱为空，请选择其他验证方式");
if(u.setStep(2),w.find(".js_step1").hide(),"1"==e){
var t=w.find(".js_setp2_mobile");
t.find(".js_mobile_forget").attr("href",wx.url("/misc/rebindverify?action=mail_get&safeaction=mobile_mail_get&t=setting/safe-rebind"+("ticket"==s.auth?"&auth=ticket":""))),
t.show(),t.find(".js_oldsend").click();
}else if("2"==e){
var t=w.find(".js_step2_mail");
t.show(),t.find(".js_resend_mail").click();
}else w.find(".js_step2_name").show(),s.is_overseas&&(w.find(".js_step2_name").find(".js_cardname_label").text("身份证件姓名"),
w.find(".js_step2_name").find(".js_cardname_tips").text("请填写注册时所登记的身份证件姓名"),w.find(".js_step2_name").find(".js_cardid_label").text("身份证件号码"),
w.find(".js_step2_name").find(".js_cardid_tips").text("请正确填写注册时所登记的身份证件号码"));
}),w.find(".js_step1_cancel").on(b,function(){
p.remove();
}),w.find(".js_step2_prev").on(b,function(){
$(this).parent().parent().hide(),u.setStep(1),w.find(".js_step1").show();
}),s&&s.mobile&&new a({
container:w.find(".js_setp2_mobile"),
mobile_num:s.mobile,
old_submit:".js_step2_mobilecheck",
auth:s.auth,
old_callback:function(e){
w.find(".js_step2_mobilecheck").html("下一步").removeClass("btn_loading").attr("disabled",!1);
var t=e.err_code;
0==t?(w.find(".js_setp2_mobile").hide(),u.setStep(3),s.wx_alias?_():l()):i.err("验证失败");
},
old_checkparam:function(e){
s.code=e,s.source="mobile";
var t={
code_num:e
};
return s.auth&&(t.auth=s.auth),t;
},
before_check:function(){
return $(this).attr("disabled")?!1:($(this).html("验证中<i></i>").addClass("btn_loading").attr("disabled",!0),
!0);
}
}),w.find(".js_resend_mail").on(b,function(){
n.post({
url:wx.url("/misc/rebindverify?action=send_safe_code"),
mask:!1
},function(e){
if(!e&&!e.base_resp)return void i.err("邮件发送失败");
switch(+e.base_resp.ret){
case 0:
i.suc("邮件发送成功");
break;

default:
i.err("邮件发送失败");
}
});
}),w.find(".js_step2_namecheck").on(b,function(){
var e=w.find(".js_cardname"),t=w.find(".js_cardid"),o=e.val().trim(),a=t.val().trim();
if(!o)return i.err(s.is_overseas?"请输入身份证姓名":"请输入身份证件姓名"),!1;
if(!a)return i.err(s.is_overseas?"请输入身份证件号码":"请输入身份证号码"),!1;
$(this).html("验证中<i></i>").addClass("btn_loading").attr("disabled",!0);
var c={
card_name:o,
card_id:a
};
s.auth&&(c.auth=s.auth),n.post({
url:wx.url("/misc/safeassistant?action=check_id"),
data:c,
mask:!1
},function(e){
if(w.find(".js_step2_namecheck").html("下一步").removeClass("btn_loading").attr("disabled",!1),
!e&&!e.check_flag&&!e.code)return void i.err("验证失败");
switch(+e.check_flag){
case 1:
s.code=e.code,s.source="id",w.find(".js_step2_name").hide(),u.setStep(3),s.wx_alias?_():l();
break;

case-5:
case 200005:
i.err("请1分钟后重新尝试");
break;

default:
i.err("验证失败");
}
});
}),w.find(".js_step2_mailcheck").on(b,function(){
var e=w.find(".js_email_code").val().trim();
if(!e)return i.err("请输入邮件验证码"),!1;
$(this).html("验证中<i></i>").addClass("btn_loading").attr("disabled",!0);
var t={
safecode:e
};
s.auth&&(t.auth=s.auth),n.post({
url:wx.url("/misc/safeassistant?action=check_safecode"),
data:t,
mask:!1
},function(e){
if(w.find(".js_step2_mailcheck").html("下一步").removeClass("btn_loading").attr("disabled",!1),
!e&&!e.check_flag&&!e.code)return void i.err("验证失败");
switch(+e.check_flag){
case 1:
s.code=e.code,s.source="safecode",w.find(".js_step2_mail").hide(),u.setStep(3),s.wx_alias?_():l();
break;

default:
i.err("验证失败");
}
});
});
}
};
});