(()=>{"use strict";var e=0,t=0,n=!1,o=document.createElement("div");o.className="selection-box",document.body.appendChild(o),chrome.runtime.onMessage.addListener((function(e,t,n){return console.log("Message received in content script:",e),"startSelection"===e.type&&(document.addEventListener("mousedown",c),document.addEventListener("mousemove",s),document.addEventListener("mouseup",i)),!0}));var c=function(c){e=c.pageX,t=c.pageY,n=!0,o.style.left="".concat(e,"px"),o.style.top="".concat(t,"px"),o.style.width="0",o.style.height="0"},s=function(c){if(n){var s=c.pageX,i=c.pageY,r=s-e,u=i-t;o.style.width="".concat(Math.abs(r),"px"),o.style.height="".concat(Math.abs(u),"px"),o.style.left="".concat(r<0?s:e,"px"),o.style.top="".concat(u<0?i:t,"px")}},i=function(){n=!1;var e=o.getBoundingClientRect();document.body.contains(o)&&document.body.removeChild(o),function t(){chrome.runtime.sendMessage({type:"captureSelection",rect:{x:e.left,y:e.top,width:e.width,height:e.height}},(function(n){chrome.runtime.lastError?setTimeout((function(){return t()}),100):console.log("Message sent successfully: ",{type:"captureSelection",rect:{x:e.left,y:e.top,width:e.width,height:e.height}})}))}(),document.removeEventListener("mousedown",c),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",i)}})();