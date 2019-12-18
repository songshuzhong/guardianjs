!function(e,t){for(var n in t)e[n]=t[n]}(window,function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(t,"__esModule",{value:!0}),t.BaseClass=void 0;var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.device=this.getDevice(),this.happenTime=(new Date).getTime(),this.webMonitorId="haokan-next",this.pageTitle=document.title,this.simpleUrl=window.location.href.split("?")[0].replace("#",""),this.completeUrl=this.b64EncodeUnicode(window.location.href)}var t,n,r;return t=e,(n=[{key:"getDevice",value:function(){var e={},t=navigator.userAgent,n=t.match(/(Android);?[\s\/]+([\d.]+)?/),o=t.match(/(iPad).*OS\s([\d_]+)/),r=t.match(/(iPod)(.*OS\s([\d_]+))?/),i=!o&&t.match(/(iPhone\sOS)\s([\d_]+)/),a=t.match(/Android\s[\S\s]+Build\//);if(e.ios=e.android=e.iphone=e.ipad=e.androidChrome=!1,e.isWeixin=/MicroMessenger/i.test(t),e.os="web",e.deviceName="PC",n&&(e.os="android",e.osVersion=n[2],e.android=!0,e.androidChrome=t.toLowerCase().indexOf("chrome")>=0),(o||i||r)&&(e.os="ios",e.ios=!0),i&&!r&&(e.osVersion=i[2].replace(/_/g,"."),e.iphone=!0),o&&(e.osVersion=o[2].replace(/_/g,"."),e.ipad=!0),r&&(e.osVersion=r[3]?r[3].replace(/_/g,"."):null,e.iphone=!0),e.ios&&e.osVersion&&t.indexOf("Version/")>=0&&"10"===e.osVersion.split(".")[0]&&(e.osVersion=t.toLowerCase().split("version/")[1].split(" ")[0]),e.iphone){e.deviceName="iphone";var s=window.screen.width,c=window.screen.height;320===s&&480===c?e.deviceName="iphone 4":320===s&&568===c?e.deviceName="iphone 5/SE":375===s&&667===c?e.deviceName="iphone 6/7/8":414===s&&736===c?e.deviceName="iphone 6/7/8 Plus":375===s&&812===c&&(e.deviceName="iphone X/S/Max")}else if(e.ipad)e.deviceName="ipad";else if(a){var u=a[0].split(";")[1].replace(/Build\//g,"");e.deviceName=u.replace(/(^\s*)|(\s*$)/g,"")}if(-1==t.indexOf("Mobile")){var l=navigator.userAgent.toLowerCase();if(e.browserName="未知",l.indexOf("msie")>0){var f=l.match(/msie [\d.]+;/gi)[0];e.browserName=f.split("/")[0],e.browserVersion=f.split("/")[1]}if(l.indexOf("firefox")>0){var p=l.match(/firefox\/[\d.]+/gi)[0];e.browserName=p.split("/")[0],e.browserVersion=p.split("/")[1]}if(l.indexOf("safari")>0&&l.indexOf("chrome")<0){var d=l.match(/safari\/[\d.]+/gi)[0];e.browserName=d.split("/")[0],e.browserVersion=d.split("/")[1]}if(l.indexOf("chrome")>0){var y=l.match(/chrome\/[\d.]+/gi)[0];e.browserName=y.split("/")[0],e.browserVersion=y.split("/")[1]}}return e.webView=(i||o||r)&&t.match(/.*AppleWebKit(?!.*Safari)/i),JSON.stringify(e)}},{key:"setLocalStorage",value:function(e,t){var n=sessionStorage.getItem("monitor");switch(n=JSON.parse(n),e){case"ele-behavior":n.ele_behavior=t;break;case"network":n.network.push(t);break;case"script":n.script.push(t);break;case"customer-pv":n.customer_pv=t;break;case"performance":n.performance=t;break;case"resource":n.resource.push(t);break;case"customer-behavior":n.customer_behavior=t}n=JSON.stringify(n),sessionStorage.setItem("monitor",n)}},{key:"b64EncodeUnicode",value:function(e){try{return btoa(encodeURIComponent(e).replace(/%([0-9A-f]{2})/g,(function(e,t){return function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e),String.fromCharCode(NaN+t)})))}catch(t){return e}}}])&&o(t.prototype,n),r&&o(t,r),e}();t.BaseClass=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Guardian=void 0;var o=n(2),r=n(3),i=n(4),a=n(5),s=n(6);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.url=t.url,this.basename=t.basename,this.cache=[],sessionStorage.setItem("monitor",JSON.stringify({performance:{},resource:[],network:[],script:[]})),this.onInit()}var t,n,f;return t=e,(n=[{key:"setFetch",value:function(){if(window.fetch){var e=fetch;window.fetch=function(){return e.apply(this,arguments).then((function(e){if(!e.ok){var t={infoType:"fetch",uploadType:"network",simpleUrl:e.url,status:e.status,statusText:e.statusText,happenTime:(new Date).getTime()},n=new i.Network(t);n.setLocalStorage("network",n)}return e})).catch((function(e){throw e}))}}}},{key:"getFetch",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"post",t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0,o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");o.open(e,this.url,!0),o.setRequestHeader("Content-Type","application/json"),o.onreadystatechange=function(){if(4===o.readyState&&200===o.status){var e=JSON.parse(o.responseText);"function"==typeof t&&t(e)}else"function"==typeof n&&n()};var r=sessionStorage.getItem("monitor");o.send(r)}},{key:"getPerformance",value:function(){if(window.performance){var e=window.performance.timing;return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},this.getResources(),{uploadType:"performance",redirect:e.redirectEnd-e.redirectStart,whiteScreen:e.responseStart-e.navigationStart,dom:e.domComplete-e.domLoading,load:e.loadEventEnd-e.navigationStart,unload:e.unloadEventEnd-e.unloadEventStart,request:e.responseEnd-e.requestStart,loadPage:e.loadEventEnd-e.navigationStart,domReady:e.domComplete-e.responseEnd,lookupDomain:e.domainLookupEnd-e.domainLookupStart,ttfb:e.responseStart-e.navigationStart,loadEvent:e.loadEventEnd-e.loadEventStart,appcache:e.domainLookupStart-e.fetchStart,unloadEvent:e.unloadEventEnd-e.unloadEventStart,connect:e.connectEnd-e.connectStart})}}},{key:"getResources",value:function(){if(window.performance){var e="",t=window.performance.getEntriesByType("resource"),n={xmlhttprequest:[],css:[],other:[],script:[],img:[],link:[],fetch:[]};return t.forEach((function(t){e=t.name.endsWith(".js")?"script":t.name.endsWith(".css")?"css":t.initiatorType;var o=n[e];o&&o.push(new s.Entry({name:t.name,uploadType:e,duration:t.duration.toFixed(2),size:t.transferSize}))})),n}}},{key:"onInit",value:function(){window.onload=this.onLoad()}},{key:"onLoad",value:function(){var e=this;this.setFetch(),this.onResourceReport(),this.onScriptReport(),this.onAjaxReport(),window.requestIdleCallback?window.requestIdleCallback((function(){setTimeout((function(){e.onPerformanceReport(),e.getFetch()}),100)})):setTimeout((function(){e.onPerformanceReport(),e.getFetch()}),1e3)}},{key:"onError",value:function(e,t,n,o,r){var i={row:n,col:o,url:t,infoType:"javascript",uploadType:"script",msg:r&&r.stack?r.stack:e},s=new a.Script(i);s.setLocalStorage("script",s)}},{key:"onPerformanceReport",value:function(){var e=new o.Performance(this.getPerformance());e.setLocalStorage("performance",e)}},{key:"onResourceReport",value:function(){var e=this;window.addEventListener("error",(function(t){var n=t.target;if(n!==window&&!e.cache.includes(n.src)){var o=n.localName,i=n.src,a=n.href,s={uploadType:"resource",tag:o,url:i||a,msg:(i||a)+"  is load error"},c=new r.Resource(s);c.setLocalStorage("resource",c),e.cache.push(i)}}),!0)}},{key:"onScriptReport",value:function(){var e=this;window.onerror=function(t,n,o,r,i){return e.onError(t,n,o,r,i)},window.addEventListener("unhandledrejection",(function(e){var t={infoType:"promise",uploadType:"script",msg:e.reason&&e.reason.msg||e.reason||""},n=new a.Script(t);n.setLocalStorage("script",n)}))}},{key:"onAjaxReport",value:function(){var e=this,t=[],n=window.XMLHttpRequest;function o(e){var t=new CustomEvent(e,{detail:this});window.dispatchEvent(t)}function r(n,o){if(t[n]&&!t[n].uploadFlag){var r="";if(o&&r.length<300)try{r=o?JSON.stringify(JSON.parse(o)):""}catch(e){r=""}else r="data is too long.";var a=t[n].simpleUrl,s=(new Date).getTime(),c=t[n].event.detail.responseURL,u=t[n].event.detail.status,l=t[n].event.detail.statusText,f=t[n].timeStamp;if(c&&-1===c.indexOf(e.url)){var p=new i.Network({uploadType:"network",simpleUrl:a,url:c,status:u,statusText:l,statusResult:"发起请求",responseText:"",currentTime:f,loadTime:0}),d=new i.Network({uploadType:"network",simpleUrl:a,url:c,status:u,statusText:l,statusResult:"请求返回",responseText:r,currentTime:s,loadTime:f});p.setLocalStorage("network",p),d.setLocalStorage("network",d),t[n].uploadFlag=!0}}}window.XMLHttpRequest=function(){var e=new n;return e.addEventListener("abort",(function(){o.call(this,"ajaxAbort")}),!1),e.addEventListener("error",(function(){o.call(this,"ajaxError")}),!1),e.addEventListener("load",(function(){o.call(this,"ajaxLoad")}),!1),e.addEventListener("loadstart",(function(){o.call(this,"ajaxLoadStart")}),!1),e.addEventListener("progress",(function(){o.call(this,"ajaxProgress")}),!1),e.addEventListener("timeout",(function(){o.call(this,"ajaxTimeout")}),!1),e.addEventListener("loadend",(function(){o.call(this,"ajaxLoadEnd")}),!1),e.addEventListener("readystatechange",(function(){o.call(this,"ajaxReadyStateChange")}),!1),e},window.addEventListener("ajaxLoadStart",(function(e){var n={timeStamp:(new Date).getTime(),event:e,simpleUrl:window.location.href.split("?")[0].replace("#",""),uploadFlag:!1};t.push(n)})),window.addEventListener("ajaxLoadEnd",(function(){for(var e=0;e<t.length;e++)t[e].uploadFlag||t[e].event.detail.status>0&&("blob"===(t[e].event.detail.responseType+"").toLowerCase()?function(e){var n=new FileReader;n.onload=function(){var t=n.result;r(e,t)};try{n.readAsText(t[e].event.detail.response,"utf-8")}catch(n){r(e,t[e].event.detail.response)}}(e):r(e,t[e].event.detail.responseText))}))}}])&&l(t.prototype,n),f&&l(t,f),e}();t.Guardian=f},function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Performance=void 0;var s=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=r(this,i(t).call(this))).redirect=e.redirect,n.whiteScreen=e.whiteScreen,n.dom=e.dom,n.load=e.load,n.unload=e.unload,n.request=e.request,n.loadPage=e.loadPage,n.domReady=e.domReady,n.lookupDomain=e.lookupDomain,n.ttfb=e.ttfb,n.loadEvent=e.loadEvent,n.appcache=e.appcache,n.unloadEvent=e.unloadEvent,n.connect=e.connect,n.xmlhttprequest=e.xmlhttprequest,n.css=e.css,n.other=e.other,n.script=e.script,n.img=e.img,n.link=e.link,n.fetch=e.fetch,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(t,e),t}(n(0).BaseClass);t.Performance=s},function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Resource=void 0;var s=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=r(this,i(t).call(this))).uploadType=e.uploadType,n.tag=e.tag,n.url=n.b64EncodeUnicode(e.url),n.msg=n.b64EncodeUnicode(e.url)+"is load error.",n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(t,e),t}(n(0).BaseClass);t.Resource=s},function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Network=void 0;var s=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=r(this,i(t).call(this))).uploadType=e.uploadType,n.httpUrl=n.b64EncodeUnicode(e.url),n.status=e.status,n.statusText=e.statusText,n.statusResult=e.statusResult,n.requestText="",n.responseText=n.b64EncodeUnicode(e.responseText),n.happenTime=e.currentTime,n.loadTime=e.loadTime,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(t,e),t}(n(0).BaseClass);t.Network=s},function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Script=void 0;var s=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=r(this,i(t).call(this))).device=n.getDevice(),n.uploadType=e.uploadType,n.infoType=e.infoType,n.col=e.col,n.row=e.row,n.msg=e.msg,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(t,e),t}(n(0).BaseClass);t.Script=s},function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Entry=void 0;var s=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=r(this,i(t).call(this))).uploadType=e.uploadType,n.name=e.name,n.duration=e.duration,n.size=e.size,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(t,e),t}(n(0).BaseClass);t.Entry=s}]));