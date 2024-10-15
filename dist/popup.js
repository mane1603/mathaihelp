(()=>{"use strict";var e,n={481:(e,n,t)=>{t.d(n,{A:()=>p});var r=t(601),o=t.n(r),s=t(314),a=t.n(s),i=t(417),c=t.n(i),l=new URL(t(964),t.b),u=a()(o()),d=c()(l);u.push([e.id,`.main_button {\n  padding: 16px;\n  margin: 10px 0;\n  border: none;\n  background-color: #e9ba00;\n  color: white;\n  cursor: url(${d});\n  border-radius: 5px;\n  transition: background-color 0.3s;\n  display: flex;\n  font: 600 20px 'Manrope';\n  align-items: center;\n  justify-content: center;\n}\n\n.main_button:hover {\n  background-color: #caa100;\n}\n`,""]);const p=u},208:(e,n,t)=>{t.d(n,{A:()=>i});var r=t(601),o=t.n(r),s=t(314),a=t.n(s)()(o());a.push([e.id,".app-container {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  width: 300px;\n  height: 318px;\n  border-radius: 20px;\n  background-color: #410058;\n}\n\n.selection-box {\n  position: absolute;\n  border: 2px dashed red;\n  pointer-events: none;\n  z-index: 9999;\n  background-color: rgba(0, 0, 0, 0.5)\n}\n\n.success-message {\n  color: green;\n}\n\n.error-message {\n  color: red;\n}\n",""]);const i=a},765:(e,n,t)=>{var r=t(848),o=t(540),s=t(338),a=t(72),i=t.n(a),c=t(825),l=t.n(c),u=t(659),d=t.n(u),p=t(56),f=t.n(p),h=t(159),b=t.n(h),g=t(113),m=t.n(g),v=t(481),y={};y.styleTagTransform=m(),y.setAttributes=f(),y.insert=d().bind(null,"head"),y.domAPI=l(),y.insertStyleElement=b(),i()(v.A,y),v.A&&v.A.locals&&v.A.locals;const x=function(){return(0,r.jsx)("button",{onClick:function(){chrome.runtime.onMessage.addListener((function(e,n,t){if(console.log("Message received in ScreenshotButton script:",e),"screenshotTaken"===e.type){var r=e.screenshotUrl,o=document.createElement("a");o.href=r,o.download="screenshot.png",o.click()}})),console.log("Screenshot button clicked"),chrome.tabs.query({active:!0,currentWindow:!0},(function e(n){console.log(n),n[0].id&&chrome.tabs.sendMessage(n[0].id,{type:"startSelection"},(function(t){chrome.runtime.lastError?setTimeout((function(){return e(n)}),100):console.log("Message sent successfully: ",{type:"startSelection"})}))}))},id:"captureButton",className:"main_button",children:"Screenshot"})};const j=function(){var e=(0,o.useState)(null),n=e[0],t=e[1],s=(0,o.useState)(null),a=s[0],i=s[1];return(0,o.useEffect)((function(){var e,n,r,o;e=void 0,n=void 0,o=function(){var e;return function(e,n){var t,r,o,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},a=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return a.next=i(0),a.throw=i(1),a.return=i(2),"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(c){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(s=0)),s;)try{if(t=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=n.call(e,s)}catch(e){i=[6,e],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}(this,(function(n){switch(n.label){case 0:return[4,chrome.storage.local.get("result")];case 1:return e=n.sent(),t(e.result),i(e.message),[2]}}))},new((r=void 0)||(r=Promise))((function(t,s){function a(e){try{c(o.next(e))}catch(e){s(e)}}function i(e){try{c(o.throw(e))}catch(e){s(e)}}function c(e){var n;e.done?t(e.value):(n=e.value,n instanceof r?n:new r((function(e){e(n)}))).then(a,i)}c((o=o.apply(e,n||[])).next())}))}),[]),(0,r.jsxs)("div",{className:"result-display",children:[a&&(0,r.jsx)("p",{children:a}),n?(0,r.jsx)("img",{src:n,alt:"Screenshot result"}):(0,r.jsx)("p",{children:"No result to display."})]})};var w=function(){var e=(0,o.useState)(!1),n=e[0];return e[1],(0,r.jsx)(r.Fragment,{children:n?(0,r.jsx)("button",{className:"login",children:"Sing in"}):(0,r.jsx)("button",{children:(0,r.jsx)("img",{src:"../../../public/singout.png",alt:"sing out"})})})};const S=function(){return(0,r.jsxs)("div",{className:"header",children:[(0,r.jsx)("img",{src:"../../../public/header_logo.png",alt:""}),(0,r.jsx)(w,{})]})};var k=t(208),A={};A.styleTagTransform=m(),A.setAttributes=f(),A.insert=d().bind(null,"head"),A.domAPI=l(),A.insertStyleElement=b(),i()(k.A,A),k.A&&k.A.locals&&k.A.locals;s.createRoot(document.getElementById("root")).render((0,r.jsx)(o.StrictMode,{children:(0,r.jsx)((function(){return(0,r.jsxs)("div",{className:"app-container",children:[(0,r.jsx)(S,{}),(0,r.jsx)(x,{}),(0,r.jsx)(j,{})]})}),{})}))},964:(e,n,t)=>{e.exports=t.p+"7768efe3e7e12832ddbd.png"}},t={};function r(e){var o=t[e];if(void 0!==o)return o.exports;var s=t[e]={id:e,exports:{}};return n[e](s,s.exports,r),s.exports}r.m=n,e=[],r.O=(n,t,o,s)=>{if(!t){var a=1/0;for(u=0;u<e.length;u++){t=e[u][0],o=e[u][1],s=e[u][2];for(var i=!0,c=0;c<t.length;c++)(!1&s||a>=s)&&Object.keys(r.O).every((e=>r.O[e](t[c])))?t.splice(c--,1):(i=!1,s<a&&(a=s));if(i){e.splice(u--,1);var l=o();void 0!==l&&(n=l)}}return n}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[t,o,s]},r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;r.g.importScripts&&(e=r.g.location+"");var n=r.g.document;if(!e&&n&&(n.currentScript&&"SCRIPT"===n.currentScript.tagName.toUpperCase()&&(e=n.currentScript.src),!e)){var t=n.getElementsByTagName("script");if(t.length)for(var o=t.length-1;o>-1&&(!e||!/^http(s?):/.test(e));)e=t[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),(()=>{r.b=document.baseURI||self.location.href;var e={887:0};r.O.j=n=>0===e[n];var n=(n,t)=>{var o,s,a=t[0],i=t[1],c=t[2],l=0;if(a.some((n=>0!==e[n]))){for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(c)var u=c(r)}for(n&&n(t);l<a.length;l++)s=a[l],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(u)},t=self.webpackChunkmath_help_ai_front=self.webpackChunkmath_help_ai_front||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})(),r.nc=void 0;var o=r.O(void 0,[913],(()=>r(765)));o=r.O(o)})();