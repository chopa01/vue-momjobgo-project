(function(){"use strict";var t={1471:function(t,e,i){var s=i(144),n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{attrs:{id:"app"}},[i("NavView"),i("HeaderView"),i("MainView"),i("FooterView")],1)},a=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.visible.footer?i("v-navigation-drawer",{attrs:{app:""}},[i("v-list-item",[i("v-list-item-content",[i("v-list-item-title",{staticClass:"text-h6"},[t._v("Vue-Project")]),i("v-list-item-subtitle",[t._v(" 송연주님 환영합니다. ")])],1)],1),i("v-divider"),i("v-list",{attrs:{dense:"",nav:""}},[t._l(t.menuList,(function(e,s){return i("v-list-item",{key:s,attrs:{to:e.path}},[i("v-list-item-icon",[i("v-icon",[t._v(t._s(e.meta.icon))])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(t._s(e.name))])],1)],1)})),i("v-list-item",{on:{click:t.logout}},[i("v-list-item-icon",[i("v-icon",[t._v("logout")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("logout")])],1)],1)],2)],1):t._e()},r=[],l=i(629),c={data:()=>({}),computed:{...(0,l.Se)("page",["menuList","visible"])},methods:{logout(){alert("아직입니다.")}}},u=c,v=i(1001),m=i(3453),d=i.n(m),h=i(1418),p=i(24),f=i(6816),b=i(5405),_=i(651),g=i(459),y=i(4216),k=(0,v.Z)(u,o,r,!1,null,null,null),x=k.exports;d()(k,{VDivider:h.Z,VIcon:p.Z,VList:f.Z,VListItem:b.Z,VListItemContent:_.km,VListItemIcon:g.Z,VListItemSubtitle:_.oZ,VListItemTitle:_.V9,VNavigationDrawer:y.Z});var w=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.visible.header?i("v-app-bar",{attrs:{app:""}},[i("v-app-bar-title",[t._v(t._s(t.title))])],1):t._e()},C=[],V={computed:{...(0,l.Se)("page",["title","visible"])}},Z=V,T=i(426),j=i(7905),L=(0,v.Z)(Z,w,C,!1,null,null,null),S=L.exports;d()(L,{VAppBar:T.Z,VAppBarTitle:j.Z});var E=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div")},I=[],A={computed:{...(0,l.Se)("page",["visible"])}},O=A,P=(0,v.Z)(O,E,I,!1,null,null,null),$=P.exports,H=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-main",[i("v-list-item",[i("v-list-item-content",[i("v-list-item-title",{staticClass:"text-h6"},[t._v("todolist 기능")]),i("v-list-item-subtitle",[i("div",[t._v(" 1. 작업할 일을 등록하세요 => 글 등록 가능 "),i("p"),t._v(" 2.체크박스 클릭시 "),i("br"),t._v(" 1) Complete로 인정 "),i("br"),t._v(" 2) 휴지통 아이콘 클릭 시 삭제"),i("p"),t._v(" 3. 소트 기능 및 건 수 보여주기"),i("br"),t._v(" 1) All - 전체"),i("br"),t._v(" 2) Active - 작업할 내용"),i("br"),t._v(" 3) Complete - 완료된 내용 "),i("br"),t._v(" 4) Clear completed - 체크박스 일괄 삭제 "),i("br")])])],1)],1)],1)},F=[],M={},N=M,D=i(7877),q=(0,v.Z)(N,H,F,!1,null,null,null),W=q.exports;d()(q,{VListItem:b.Z,VListItemContent:_.km,VListItemSubtitle:_.oZ,VListItemTitle:_.V9,VMain:D.Z});var B={name:"App",data:()=>({}),components:{NavView:x,HeaderView:S,MainView:W,FooterView:$},computed:{...(0,l.Se)("page",["menuList"])},created(){"/"===window.location.pathname&&this.$router.push(this.menuList.home.path)}},Q=B,R=i(7524),X=(0,v.Z)(Q,n,a,!1,null,null,null),Y=X.exports;d()(X,{VApp:R.Z});var z=i(8345),G=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticStyle:{"max-width":"800px"}},[i("v-text-field",{attrs:{label:"작업할 일을 등록하세요.",solo:""},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.create.apply(null,arguments)}},scopedSlots:t._u([{key:"append",fn:function(){return[i("v-fade-transition",[t.newTask?i("v-icon",{on:{click:t.create}},[t._v(" mdi-plus-circle ")]):t._e()],1)]},proxy:!0}]),model:{value:t.newTask,callback:function(e){t.newTask=e},expression:"newTask"}}),i("v-divider",{staticClass:"mt-4"}),i("v-row",{staticClass:"my-1",attrs:{align:"center"}},[i("v-spacer"),i("strong",{staticClass:"mx-4 info--text text--darken-1"},[i("a",{class:{selected:"all"===t.visibility},attrs:{href:"#/all"}},[t._v("All("+t._s(t.tasks.length)+")")])]),i("v-divider",{attrs:{vertical:""}}),i("strong",{staticClass:"mx-4 info--text text--darken-2"},[i("a",{class:{selected:"active"===t.visibility},attrs:{href:"#/active"}},[t._v("Active ("+t._s(t.remainingTasks)+") ")])]),i("v-divider",{attrs:{vertical:""}}),i("strong",{staticClass:"mx-4 success--text text--darken-2"},[i("a",{class:{selected:"completed"===t.visibility},attrs:{href:"#/completed"}},[t._v("Completed ("+t._s(t.completedTasks)+")")])]),i("v-divider",{directives:[{name:"show",rawName:"v-show",value:t.tasks.length>t.remainingTasks,expression:"tasks.length > remainingTasks"}],attrs:{vertical:""}}),i("button",{directives:[{name:"show",rawName:"v-show",value:t.tasks.length>t.remainingTasks,expression:"tasks.length > remainingTasks"}],staticClass:"mx-4 success--text text--darken-2",on:{click:t.removeCompleted}},[t._v(" Clear completed ")])],1),i("v-divider",{staticClass:"mb-4"}),t.tasks.length>0?i("v-card",[i("v-slide-y-transition",{staticClass:"py-0",attrs:{group:"",tag:"v-list"}},[t._l(t.filteredTodos,(function(e,s){return[0!==s?i("v-divider",{key:s+"-divider"}):t._e(),i("v-list-item",{key:s+"-"+e.text},[i("v-list-item-action",[i("v-checkbox",{attrs:{color:e.done?"grey":"primary"},scopedSlots:t._u([{key:"label",fn:function(){return[i("div",{staticClass:"ml-4",class:e.done?"grey--text":"primary--text",domProps:{textContent:t._s(e.text)}})]},proxy:!0}],null,!0),model:{value:e.done,callback:function(i){t.$set(e,"done",i)},expression:"task.done"}})],1),i("v-spacer"),i("v-scroll-x-transition",[e.done?i("v-icon",{on:{click:function(e){return t.removeTodo(""+s)}}},[t._v(" mdi-delete")]):t._e()],1)],1)]}))],2)],1):t._e()],1)},J=[],K=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-row",{staticClass:"text-center"},[s("v-col",{attrs:{cols:"12"}},[s("v-img",{staticClass:"my-3",attrs:{src:i(9574),contain:"",height:"200"}})],1),s("v-col",{staticClass:"mb-4"},[s("h1",{staticClass:"display-2 font-weight-bold mb-3"},[t._v(" Welcome to Vuetify ")]),s("p",{staticClass:"subheading font-weight-regular"},[t._v(" For help and collaboration with other Vuetify developers, "),s("br"),t._v("please join our online "),s("a",{attrs:{href:"https://community.vuetifyjs.com",target:"_blank"}},[t._v("Discord Community")])])]),s("v-col",{staticClass:"mb-5",attrs:{cols:"12"}},[s("h2",{staticClass:"headline font-weight-bold mb-3"},[t._v(" What's next? ")]),s("v-row",{attrs:{justify:"center"}},t._l(t.whatsNext,(function(e,i){return s("a",{key:i,staticClass:"subheading mx-3",attrs:{href:e.href,target:"_blank"}},[t._v(" "+t._s(e.text)+" ")])})),0)],1),s("v-col",{staticClass:"mb-5",attrs:{cols:"12"}},[s("h2",{staticClass:"headline font-weight-bold mb-3"},[t._v(" Important Links ")]),s("v-row",{attrs:{justify:"center"}},t._l(t.importantLinks,(function(e,i){return s("a",{key:i,staticClass:"subheading mx-3",attrs:{href:e.href,target:"_blank"}},[t._v(" "+t._s(e.text)+" ")])})),0)],1),s("v-col",{staticClass:"mb-5",attrs:{cols:"12"}},[s("h2",{staticClass:"headline font-weight-bold mb-3"},[t._v(" Ecosystem ")]),s("v-row",{attrs:{justify:"center"}},t._l(t.ecosystem,(function(e,i){return s("a",{key:i,staticClass:"subheading mx-3",attrs:{href:e.href,target:"_blank"}},[t._v(" "+t._s(e.text)+" ")])})),0)],1)],1)],1)},U=[],tt={name:"HelloWorld",data:()=>({ecosystem:[{text:"vuetify-loader",href:"https://github.com/vuetifyjs/vuetify-loader"},{text:"github",href:"https://github.com/vuetifyjs/vuetify"},{text:"awesome-vuetify",href:"https://github.com/vuetifyjs/awesome-vuetify"}],importantLinks:[{text:"Documentation",href:"https://vuetifyjs.com"},{text:"Chat",href:"https://community.vuetifyjs.com"},{text:"Made with Vuetify",href:"https://madewithvuejs.com/vuetify"},{text:"Twitter",href:"https://twitter.com/vuetifyjs"},{text:"Articles",href:"https://medium.com/vuetify"}],whatsNext:[{text:"Explore components",href:"https://vuetifyjs.com/components/api-explorer"},{text:"Select a layout",href:"https://vuetifyjs.com/getting-started/pre-made-layouts"},{text:"Frequently Asked Questions",href:"https://vuetifyjs.com/getting-started/frequently-asked-questions"}]})},et=tt,it=i(2102),st=i(9846),nt=i(7047),at=i(2877),ot=(0,v.Z)(et,K,U,!1,null,null,null),rt=ot.exports;d()(ot,{VCol:it.Z,VContainer:st.Z,VImg:nt.Z,VRow:at.Z});const lt={all:t=>t,active:t=>t.filter((t=>!t.done)),completed:t=>t.filter((t=>t.done))};var ct={name:"Home",components:{HelloWorld:rt},data:()=>({tasks:[{done:!1,text:"Vue숙제하기"},{done:!1,text:"남한산성 등산하기"},{done:!1,text:"노트북 수리하기"}],newTask:null,visibility:"all"}),mounted(){window.addEventListener("hashchange",this.onHashChange),this.onHashChange()},computed:{completedTasks(){return this.tasks.filter((t=>t.done)).length},remainingTasks(){return this.tasks.length-this.completedTasks},filteredTodos(){return lt[this.visibility](this.tasks)}},methods:{create(){this.tasks.push({done:!1,text:this.newTask}),this.newTask=null},onHashChange(){var t=window.location.hash.replace(/#\/?/,"");lt[t]?this.visibility=t:(window.location.hash="",this.visibility="all")},removeCompleted(){this.tasks=lt.active(this.tasks)},removeTodo(t){this.tasks.splice(t,1)}}},ut=ct,vt=i(2660),mt=i(9362),dt=i(5827),ht=i(3099),pt=i(9762),ft=i(3105),bt=(0,v.Z)(ut,G,J,!1,null,null,null),_t=bt.exports;d()(bt,{VCard:vt.Z,VCheckbox:mt.Z,VContainer:st.Z,VDivider:h.Z,VFadeTransition:dt.Z5,VIcon:p.Z,VListItem:b.Z,VListItemAction:ht.Z,VRow:at.Z,VScrollXTransition:dt.vQ,VSlideYTransition:dt.cu,VSpacer:pt.Z,VTextField:ft.Z});var gt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},yt=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"about"},[i("h1",[t._v("todolist 기능")]),i("div",[t._v(" 1. 작업할 일을 등록하세요 => 글 등록 가능 "),i("p"),t._v(" 2.체크박스 클릭시 "),i("br"),t._v(" 1) Complete로 인정 "),i("br"),t._v(" 2) 휴지통 아이콘 클릭 시 삭제"),i("p"),t._v(" 3. 소트 기능 및 건 수 보여주기"),i("br"),t._v(" 1) All - 전체"),i("br"),t._v(" 2) Active - 작업할 내용"),i("br"),t._v(" 3) Complete - 완료된 내용 "),i("br"),t._v(" 4) Clear completed - 체크박스 일괄 삭제 "),i("br")])])}],kt={},xt=kt,wt=(0,v.Z)(xt,gt,yt,!1,null,null,null),Ct=wt.exports,Vt={namespaced:!0,state:{title:"",basePath:"",list:{home:{path:"/home",name:"home",meta:{title:"Home",icon:"home"},component:_t},about:{path:"/about",name:"about",meta:{title:"About",icon:"question_mark"},component:Ct}},visible:{header:!0,navi:!0,footer:!0}},getters:{title(t){return t.title},basePath(t){return t.basePath},menuList(t){return t.list},visible(t){return t.visible}},mutations:{setTitle(t,e){t.title=e},setVisible(t,{key:e,value:i}){t[e]=i}},actions:{setTitle({commit:t},e){t("setTitle",e)},setVisible({commit:t},e){t("setVisible",e)}}};s.Z.use(l.ZP);var Zt=new l.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{page:Vt}});function Tt(){const t=new Array;return Object.entries(Zt.getters["page/menuList"]).forEach((([e,i])=>{t.push(i)})),t}function jt(){return Zt.getters["page/basePath"]}s.Z.use(z.Z);const Lt=Tt(),St=new z.Z({base:jt(),mode:"history",routes:Lt});St.beforeEach((function(t,e,i){i()})),St.afterEach((function(t,e){Zt.dispatch("page/setTitle",t.meta.title)}));var Et=St,It=i(5671);s.Z.use(It.Z);var At=new It.Z({icons:{iconfont:"md"}});s.Z.config.productionTip=!1,new s.Z({router:Et,store:Zt,vuetify:At,render:t=>t(Y)}).$mount("#app")},9574:function(t,e,i){t.exports=i.p+"img/logo.5919a104.svg"}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var a=e[s]={exports:{}};return t[s](a,a.exports,i),a.exports}i.m=t,function(){var t=[];i.O=function(e,s,n,a){if(!s){var o=1/0;for(u=0;u<t.length;u++){s=t[u][0],n=t[u][1],a=t[u][2];for(var r=!0,l=0;l<s.length;l++)(!1&a||o>=a)&&Object.keys(i.O).every((function(t){return i.O[t](s[l])}))?s.splice(l--,1):(r=!1,a<o&&(o=a));if(r){t.splice(u--,1);var c=n();void 0!==c&&(e=c)}}return e}a=a||0;for(var u=t.length;u>0&&t[u-1][2]>a;u--)t[u]=t[u-1];t[u]=[s,n,a]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){i.p="/vue-momjobgo-project/"}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var n,a,o=s[0],r=s[1],l=s[2],c=0;if(o.some((function(e){return 0!==t[e]}))){for(n in r)i.o(r,n)&&(i.m[n]=r[n]);if(l)var u=l(i)}for(e&&e(s);c<o.length;c++)a=o[c],i.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return i.O(u)},s=self["webpackChunkvue_momjobgo_project"]=self["webpackChunkvue_momjobgo_project"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(1471)}));s=i.O(s)})();
//# sourceMappingURL=app.81cefb3f.js.map