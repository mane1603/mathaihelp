(()=>{"use strict";var e,r={994:(e,r,t)=>{var n=t(83),o=function(e,r,t,n){return new(t||(t=Promise))((function(o,a){function s(e){try{i(n.next(e))}catch(e){a(e)}}function c(e){try{i(n.throw(e))}catch(e){a(e)}}function i(e){var r;e.done?o(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(s,c)}i((n=n.apply(e,r||[])).next())}))},a=function(e,r){var t,n,o,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},s=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return s.next=c(0),s.throw=c(1),s.return=c(2),"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function c(c){return function(i){return function(c){if(t)throw new TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(a=0)),a;)try{if(t=1,n&&(o=2&c[0]?n.return:c[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,c[1])).done)return o;switch(n=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,n=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){a.label=c[1];break}if(6===c[0]&&a.label<o[1]){a.label=o[1],o=c;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(c);break}o[2]&&a.ops.pop(),a.trys.pop();continue}c=r.call(e,a)}catch(e){c=[6,e],n=0}finally{t=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,i])}}};function s(){return o(this,void 0,void 0,(function(){return a(this,(function(e){return[2,new Promise((function(e){chrome.storage.local.get(["token"],(function(r){(null==r?void 0:r.token)?e(r.token):e(null)}))}))]}))}))}function c(e){return o(this,void 0,void 0,(function(){var r,t,o;return a(this,(function(a){switch(a.label){case 0:return[4,s()];case 1:if(!(r=a.sent()))return[2,"No Token"];a.label=2;case 2:return a.trys.push([2,4,,5]),[4,n.A.post("http://localhost:5555/image/upload",{url:e,language:"English"},{headers:{Authorization:"Bearer ".concat(r),"Content-Type":"application/json"}})];case 3:return t=a.sent(),chrome.storage.local.set({lastScreenShot:new Date},(function(){chrome.runtime.lastError&&console.error("Error saving screenshot time:",chrome.runtime.lastError)})),[2,t.data.gptResponse];case 4:return o=a.sent(),console.error("Error in request:",o),[2,"No Token"];case 5:return[2]}}))}))}function i(e,r){var t=!1;chrome.tabs.query({active:!0,currentWindow:!0},(function n(s){return o(this,void 0,void 0,(function(){return a(this,(function(o){switch(o.label){case 0:return!s[0].id||t?[3,2]:[4,chrome.tabs.sendMessage(s[0].id,{type:r,response:e},(function(e){chrome.runtime.lastError?setTimeout((function(){return n(s)}),400):e&&e.success&&(t=!0)}))];case 1:o.sent(),o.label=2;case 2:return[2]}}))}))}))}chrome.runtime.onMessage.addListener((function(e,r,t){return o(void 0,void 0,void 0,(function(){var r,n,o,s,c;return a(this,(function(a){switch(a.label){case 0:return"get-user-data"!==e.type?[3,1]:(t("Hello from background"),[2,!0]);case 1:return"logout"!==e.type?[3,2]:(chrome.storage.local.remove("token",(function(){t({success:!0})})),[2,!0]);case 2:if("startAuth"!==e.type)return[3,9];r="http://localhost:5555/auth/google",a.label=3;case 3:return a.trys.push([3,7,,8]),[4,chrome.identity.launchWebAuthFlow({url:r,interactive:!0})];case 4:return n=a.sent(),chrome.runtime.lastError||!n?(t({success:!1,error:chrome.runtime.lastError}),[2]):(o=function(e){return new URLSearchParams(new URL(e).search).get("code")}(n),[4,fetch("http://localhost:5555/auth/google/token",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:o})})]);case 5:return[4,a.sent().json()];case 6:return(s=a.sent()).token?chrome.storage.local.set({token:s.token},(function(){t({success:!0,token:s.token})})):(console.error("Failed to retrieve token from server."),t({success:!1})),[3,8];case 7:return c=a.sent(),console.error("Error during authentication:",c),t({success:!1,error:c}),[3,8];case 8:return[2,!0];case 9:"get-user-data"===e.type&&t("Hello from background"),a.label=10;case 10:return[2]}}))}))})),chrome.runtime.onMessage.addListener((function(e,r,t){return o(void 0,void 0,void 0,(function(){var r,t,n,s,u,l,f,h,d;return a(this,(function(p){switch(p.label){case 0:return"captureSelection"!==e.type?[3,2]:(r=e.rect||{},t=r.x,n=void 0===t?0:t,s=r.y,u=void 0===s?0:s,l=r.width,f=void 0===l?0:l,h=r.height,d=void 0===h?0:h,f<=0||d<=0?(console.error("Invalid rectangle dimensions:",e.rect),i("","responseDenied"),[2]):[4,chrome.tabs.captureVisibleTab({format:"png"},(function(e){return o(void 0,void 0,void 0,(function(){var r,t,s,l,h,p,v;return a(this,(function(b){switch(b.label){case 0:return b.trys.push([0,6,,7]),[4,fetch(e)];case 1:return[4,b.sent().blob()];case 2:return r=b.sent(),[4,createImageBitmap(r)];case 3:return t=b.sent(),s=new OffscreenCanvas(f,d),(l=s.getContext("2d"))?(l.drawImage(t,n,u,f,d,0,0,f,d),[4,s.convertToBlob()]):[3,5];case 4:h=b.sent(),(p=new FileReader).readAsDataURL(h),p.onloadend=function(){return o(void 0,void 0,void 0,(function(){var e,r,t;return a(this,(function(n){switch(n.label){case 0:return(e=null===(t=p.result)||void 0===t?void 0:t.toString())?(i("Loading...","startDisplay"),[4,c(e)]):[3,2];case 1:(r=n.sent())&&"No Token"===r?i("","responseDenied"):r&&i(r,"responseSuccess"),n.label=2;case 2:return[2]}}))}))},b.label=5;case 5:return[3,7];case 6:return v=b.sent(),i("","responseDenied"),console.error("Error in getting image:",v),[3,7];case 7:return[2]}}))}))}))]);case 1:return p.sent(),[2,!0];case 2:return[2]}}))}))}))}},t={};function n(e){var o=t[e];if(void 0!==o)return o.exports;var a=t[e]={exports:{}};return r[e](a,a.exports,n),a.exports}n.m=r,e=[],n.O=(r,t,o,a)=>{if(!t){var s=1/0;for(l=0;l<e.length;l++){t=e[l][0],o=e[l][1],a=e[l][2];for(var c=!0,i=0;i<t.length;i++)(!1&a||s>=a)&&Object.keys(n.O).every((e=>n.O[e](t[i])))?t.splice(i--,1):(c=!1,a<s&&(s=a));if(c){e.splice(l--,1);var u=o();void 0!==u&&(r=u)}}return r}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[t,o,a]},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={471:0};n.O.j=r=>0===e[r];var r=(r,t)=>{var o,a,s=t[0],c=t[1],i=t[2],u=0;if(s.some((r=>0!==e[r]))){for(o in c)n.o(c,o)&&(n.m[o]=c[o]);if(i)var l=i(n)}for(r&&r(t);u<s.length;u++)a=s[u],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},t=self.webpackChunkmath_help_ai_front=self.webpackChunkmath_help_ai_front||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var o=n.O(void 0,[83],(()=>n(994)));o=n.O(o)})();