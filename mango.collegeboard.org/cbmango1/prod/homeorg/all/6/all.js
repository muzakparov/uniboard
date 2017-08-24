/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(a){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;n<o;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0!==a.cookie(b)&&(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});;!function(a){function b(a,b){"string"==typeof a&&(a=[a]);var c,d;for(c=0;c<a.length;c++)d=new RegExp("(?:^|; )"+a[c]+"=([^;]*)","i").exec(document.cookie),d=d&&d[1],d&&b.call(null,a[c],d)}function c(a){if(a.length>=5){var b,c,d,e=a.substring(a.length<=20?0:a.length-20),f=e.length-1;if("~"===e.charAt(f)){for(b=f--;f>=0&&"~"!==e.charAt(f);f--);if(c=parseInt(e.substring(f+1,b)),!isNaN(c)&&c>=0&&f>=2&&"~"===e.charAt(f)){for(b=f--;f>=0&&"~"!==e.charAt(f);f--);if(d=parseInt(e.substring(f+1,b)),!isNaN(d)&&f>=0&&"~"===e.charAt(f))return b=a.length-c-e.length+f,[d,a.substring(0,b),a.substr(b,c)]}}}return[200,a,""]}function d(a){if("object"==typeof a)return a;var b=h.exec(a);return b?{href:b[0]||"",hrefNoHash:b[1]||"",hrefNoSearch:b[2]||"",domain:b[3]||"",protocol:b[4]||"",authority:b[5]||"",username:b[7]||"",password:b[8]||"",host:b[9]||"",hostname:b[10]||"",port:b[11]||"",pathname:b[12]||"",directory:b[13]||"",filename:b[14]||"",search:b[15]||"",hash:b[16]||""}:{}}function e(a){if(0==a.length)return[];var b,c,d=[],e=0,f=0;do b=a.indexOf(",",f),d[e]=(d[e]||"")+a.substring(f,b==-1?a.length:b),f=b+1,d[e].indexOf("Expires=")==-1||d[e].indexOf(",")!=-1?e++:d[e]+=",";while(b>0);for(e=0;e<d.length;e++)c=d[e].indexOf("Domain="),c!=-1&&(d[e]=d[e].substring(0,c)+d[e].substring(d[e].indexOf(";",c)+1));return d}if(!("__jquery_xdomain__"in a)&&/msie/.test(navigator.userAgent.toLowerCase())&&"XDomainRequest"in window&&!(window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest)&&document.location.href.indexOf("file:///")==-1){a.__jquery_xdomain__=a.support.cors=!0;var f,g,h=/^(((([^:\/#\?]+:)?(?:\/\/((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?]+)(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,i=a.ajaxSettings.xhr,j="XDR_SESSION_COOKIE_NAME"in window?window.XDR_SESSION_COOKIE_NAME:"jsessionid",k="XDR_COOKIE_HEADERS"in window?window.XDR_COOKIE_HEADERS:[],l="XDR_HEADERS"in window?window.XDR_HEADERS:["Content-Type"],m={UNSENT:0,OPENED:1,LOADING:3,DONE:4},n=window.XDR_DEBUG&&"console"in window,o=0;g=d(document.location.href).domain,f=function(){var d,f,g,h=this,i=new XDomainRequest,p=[],q=o++,r=function(a){h.readyState=a,"function"==typeof h.onreadystatechange&&h.onreadystatechange.call(h)},s=function(b,c){if(h.responseText||(h.responseText=""),n&&console.log("[XDR-"+q+"] request end with state "+b+" and code "+c+" and data length "+h.responseText.length),h.status=c,!h.responseType)if(d=d||i.contentType,d.match(/\/json/))h.responseType="json",h.response=h.responseText;else if(d.match(/\/xml/)){h.responseType="document";var e,f=new ActiveXObject("Microsoft.XMLDOM");f.async=!1,f.loadXML(h.responseText),h.responseXML=h.response=f,0!=a(f).children("error").length&&(e=a(f).find("error"),h.status=parseInt(e.attr("response_code")))}else h.responseType="text",h.response=h.responseText;r(b),i=null,p=null,g=null};i.onprogress=function(){r(m.LOADING)},i.ontimeout=function(){s(m.DONE,408)},i.onerror=function(){s(m.DONE,500)},i.onload=function(){var a,b,d=c(i.responseText||"");for(n&&console.log("[XDR-"+o+"] parsing cookies for header "+d[2]),a=e(d[2]),h.responseText=d[1]||"",n&&console.log("[XDR-"+q+"] raw data:\n"+i.responseText+"\n parsed response: status="+d[0]+", header="+d[2]+", data=\n"+d[1]),b=0;b<a.length;b++)n&&console.log("[XDR-"+q+"] installing cookie "+a[b]),document.cookie=a[b]+";Domain="+document.domain;s(m.DONE,d[0]),d=null},this.readyState=m.UNSENT,this.status=0,this.statusText="",this.responseType="",this.timeout=0,this.withCredentials=!1,this.overrideMimeType=function(a){d=a},this.abort=function(){i.abort()},this.setRequestHeader=function(b,c){a.inArray(b,l)>=0&&p.push({k:b,v:c})},this.open=function(a,b){g=b,f=a,r(m.OPENED)},this.send=function(a){if(i.timeout=this.timeout,j||k||p.length){var c,d=function(a,b){var c=g.indexOf("?");g+=(c==-1?"?":"&")+a+"="+encodeURIComponent(b),n&&console.log("[XDR-"+q+"] added parameter "+a+"="+b+" => "+g)};for(c=0;c<p.length;c++)d(p[c].k,p[c].v);b(j,function(a,b){var c=g.indexOf("?");c==-1?g+=";"+a+"="+b:g=g.substring(0,c)+";"+a+"="+b+g.substring(c),n&&console.log("[XDR-"+q+"] added cookie "+g)}),b(k,d),d("_xdr",""+q)}n&&console.log("[XDR-"+q+"] opening "+g),i.open(f,g),n&&console.log("[XDR-"+q+"] send, timeout="+i.timeout),i.send(a)},this.getAllResponseHeaders=function(){return""},this.getResponseHeader=function(){return null}},a.ajaxSettings.xhr=function(){var b=d(this.url).domain;if(""===b||b===g)return i.call(a.ajaxSettings);try{return new f}catch(a){}}}}(jQuery);;jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*(2*Math.PI)/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=e*(.3*1.5)),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return b<1?-.5*(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g))+c:h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*(b*b*(((f*=1.525)+1)*b-f))+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*(7.5625*b*b)+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return b<e/2?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}});;/*!

 handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
var Handlebars=function(){var a=function(){"use strict";function a(a){this.string=a}var b;return a.prototype.toString=function(){return""+this.string},b=a}(),b=function(a){"use strict";function b(a){return h[a]||"&amp;"}function c(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])}function d(a){return a instanceof g?a.toString():a||0===a?(a=""+a,j.test(a)?a.replace(i,b):a):""}function e(a){return!a&&0!==a||!(!m(a)||0!==a.length)}var f={},g=a,h={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},i=/[&<>"'`]/g,j=/[&<>"'`]/;f.extend=c;var k=Object.prototype.toString;f.toString=k;var l=function(a){return"function"==typeof a};l(/x/)&&(l=function(a){return"function"==typeof a&&"[object Function]"===k.call(a)});var l;f.isFunction=l;var m=Array.isArray||function(a){return!(!a||"object"!=typeof a)&&"[object Array]"===k.call(a)};return f.isArray=m,f.escapeExpression=d,f.isEmpty=e,f}(a),c=function(){"use strict";function a(a,b){var d;b&&b.firstLine&&(d=b.firstLine,a+=" - "+d+":"+b.firstColumn);for(var e=Error.prototype.constructor.call(this,a),f=0;f<c.length;f++)this[c[f]]=e[c[f]];d&&(this.lineNumber=d,this.column=b.firstColumn)}var b,c=["description","fileName","lineNumber","message","name","number","stack"];return a.prototype=new Error,b=a}(),d=function(a,b){"use strict";function c(a,b){this.helpers=a||{},this.partials=b||{},d(this)}function d(a){a.registerHelper("helperMissing",function(a){if(2!==arguments.length)throw new h("Missing helper: '"+a+"'")}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse||function(){},e=c.fn;return m(b)&&(b=b.call(this)),b===!0?e(this):b===!1||null==b?d(this):l(b)?b.length>0?a.helpers.each(b,c):d(this):e(b)}),a.registerHelper("each",function(a,b){var c,d=b.fn,e=b.inverse,f=0,g="";if(m(a)&&(a=a.call(this)),b.data&&(c=q(b.data)),a&&"object"==typeof a)if(l(a))for(var h=a.length;f<h;f++)c&&(c.index=f,c.first=0===f,c.last=f===a.length-1),g+=d(a[f],{data:c});else for(var i in a)a.hasOwnProperty(i)&&(c&&(c.key=i,c.index=f,c.first=0===f),g+=d(a[i],{data:c}),f++);return 0===f&&(g=e(this)),g}),a.registerHelper("if",function(a,b){return m(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||g.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers.if.call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){if(m(a)&&(a=a.call(this)),!g.isEmpty(a))return b.fn(a)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)})}function e(a,b){p.log(a,b)}var f={},g=a,h=b,i="1.3.0";f.VERSION=i;var j=4;f.COMPILER_REVISION=j;var k={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:">= 1.0.0"};f.REVISION_CHANGES=k;var l=g.isArray,m=g.isFunction,n=g.toString,o="[object Object]";f.HandlebarsEnvironment=c,c.prototype={constructor:c,logger:p,log:e,registerHelper:function(a,b,c){if(n.call(a)===o){if(c||b)throw new h("Arg not supported with multiple helpers");g.extend(this.helpers,a)}else c&&(b.not=c),this.helpers[a]=b},registerPartial:function(a,b){n.call(a)===o?g.extend(this.partials,a):this.partials[a]=b}};var p={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(a,b){if(p.level<=a){var c=p.methodMap[a];"undefined"!=typeof console&&console[c]&&console[c].call(console,b)}}};f.logger=p,f.log=e;var q=function(a){var b={};return g.extend(b,a),b};return f.createFrame=q,f}(b,c),e=function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=m;if(b!==c){if(b<c){var d=n[c],e=n[b];throw new l("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new l("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){if(!b)throw new l("No environment passed to template");var c=function(a,c,d,e,f,g){var h=b.VM.invokePartial.apply(this,arguments);if(null!=h)return h;if(b.compile){var i={helpers:e,partials:f,data:g};return f[c]=b.compile(a,{data:void 0!==g},b),f[c](d,i)}throw new l("The partial "+c+" could not be compiled when running in runtime-only mode")},d={escapeExpression:k.escapeExpression,invokePartial:c,programs:[],program:function(a,b,c){var d=this.programs[a];return c?d=g(a,b,c):d||(d=this.programs[a]=g(a,b)),d},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c={},k.extend(c,b),k.extend(c,a)),c},programWithDepth:b.VM.programWithDepth,noop:b.VM.noop,compilerInfo:null};return function(c,e){e=e||{};var f,g,h=e.partial?e:b;e.partial||(f=e.helpers,g=e.partials);var i=a.call(d,h,c,f,g,e.data);return e.partial||b.VM.checkRevision(d.compilerInfo),i}}function f(a,b,c){var d=Array.prototype.slice.call(arguments,3),e=function(a,e){return e=e||{},b.apply(this,[a,e.data||c].concat(d))};return e.program=a,e.depth=d.length,e}function g(a,b,c){var d=function(a,d){return d=d||{},b(a,d.data||c)};return d.program=a,d.depth=0,d}function h(a,b,c,d,e,f){var g={partial:!0,helpers:d,partials:e,data:f};if(void 0===a)throw new l("The partial "+b+" could not be found");if(a instanceof Function)return a(c,g)}function i(){return""}var j={},k=a,l=b,m=c.COMPILER_REVISION,n=c.REVISION_CHANGES;return j.checkRevision=d,j.template=e,j.programWithDepth=f,j.program=g,j.invokePartial=h,j.noop=i,j}(b,c,d),f=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c,j=d,k=e,l=function(){var a=new g.HandlebarsEnvironment;return j.extend(a,g),a.SafeString=h,a.Exception=i,a.Utils=j,a.VM=k,a.template=function(b){return k.template(b,a)},a},m=l();return m.create=l,f=m}(d,a,c,b,e),g=function(a){"use strict";function b(a){a=a||{},this.firstLine=a.first_line,this.firstColumn=a.first_column,this.lastColumn=a.last_column,this.lastLine=a.last_line}var c,d=a,e={ProgramNode:function(a,c,d,f){var g,h;3===arguments.length?(f=d,d=null):2===arguments.length&&(f=c,c=null),b.call(this,f),this.type="program",this.statements=a,this.strip={},d?(h=d[0],h?(g={first_line:h.firstLine,last_line:h.lastLine,last_column:h.lastColumn,first_column:h.firstColumn},this.inverse=new e.ProgramNode(d,c,g)):this.inverse=new e.ProgramNode(d,c),this.strip.right=c.left):c&&(this.strip.left=c.right)},MustacheNode:function(a,c,d,f,g){if(b.call(this,g),this.type="mustache",this.strip=f,null!=d&&d.charAt){var h=d.charAt(3)||d.charAt(2);this.escaped="{"!==h&&"&"!==h}else this.escaped=!!d;a instanceof e.SexprNode?this.sexpr=a:this.sexpr=new e.SexprNode(a,c),this.sexpr.isRoot=!0,this.id=this.sexpr.id,this.params=this.sexpr.params,this.hash=this.sexpr.hash,this.eligibleHelper=this.sexpr.eligibleHelper,this.isHelper=this.sexpr.isHelper},SexprNode:function(a,c,d){b.call(this,d),this.type="sexpr",this.hash=c;var e=this.id=a[0],f=this.params=a.slice(1),g=this.eligibleHelper=e.isSimple;this.isHelper=g&&(f.length||c)},PartialNode:function(a,c,d,e){b.call(this,e),this.type="partial",this.partialName=a,this.context=c,this.strip=d},BlockNode:function(a,c,e,f,g){if(b.call(this,g),a.sexpr.id.original!==f.path.original)throw new d(a.sexpr.id.original+" doesn't match "+f.path.original,this);this.type="block",this.mustache=a,this.program=c,this.inverse=e,this.strip={left:a.strip.left,right:f.strip.right},(c||e).strip.left=a.strip.right,(e||c).strip.right=f.strip.left,e&&!c&&(this.isInverse=!0)},ContentNode:function(a,c){b.call(this,c),this.type="content",this.string=a},HashNode:function(a,c){b.call(this,c),this.type="hash",this.pairs=a},IdNode:function(a,c){b.call(this,c),this.type="ID";for(var e="",f=[],g=0,h=0,i=a.length;h<i;h++){var j=a[h].part;if(e+=(a[h].separator||"")+j,".."===j||"."===j||"this"===j){if(f.length>0)throw new d("Invalid path: "+e,this);".."===j?g++:this.isScoped=!0}else f.push(j)}this.original=e,this.parts=f,this.string=f.join("."),this.depth=g,this.isSimple=1===a.length&&!this.isScoped&&0===g,this.stringModeValue=this.string},PartialNameNode:function(a,c){b.call(this,c),this.type="PARTIAL_NAME",this.name=a.original},DataNode:function(a,c){b.call(this,c),this.type="DATA",this.id=a},StringNode:function(a,c){b.call(this,c),this.type="STRING",this.original=this.string=this.stringModeValue=a},IntegerNode:function(a,c){b.call(this,c),this.type="INTEGER",this.original=this.integer=a,this.stringModeValue=Number(a)},BooleanNode:function(a,c){b.call(this,c),this.type="BOOLEAN",this.bool=a,this.stringModeValue="true"===a},CommentNode:function(a,c){b.call(this,c),this.type="comment",this.comment=a}};return c=e}(c),h=function(){"use strict";var a,b=function(){function a(a,b){return{left:"~"===a.charAt(2),right:"~"===b.charAt(0)||"~"===b.charAt(1)}}function b(){this.yy={}}var c={trace:function(){},yy:{},symbols_:{error:2,root:3,statements:4,EOF:5,program:6,simpleInverse:7,statement:8,openInverse:9,closeBlock:10,openBlock:11,mustache:12,partial:13,CONTENT:14,COMMENT:15,OPEN_BLOCK:16,sexpr:17,CLOSE:18,OPEN_INVERSE:19,OPEN_ENDBLOCK:20,path:21,OPEN:22,OPEN_UNESCAPED:23,CLOSE_UNESCAPED:24,OPEN_PARTIAL:25,partialName:26,partial_option0:27,sexpr_repetition0:28,sexpr_option0:29,dataName:30,param:31,STRING:32,INTEGER:33,BOOLEAN:34,OPEN_SEXPR:35,CLOSE_SEXPR:36,hash:37,hash_repetition_plus0:38,hashSegment:39,ID:40,EQUALS:41,DATA:42,pathSegments:43,SEP:44,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",35:"OPEN_SEXPR",36:"CLOSE_SEXPR",40:"ID",41:"EQUALS",42:"DATA",44:"SEP"},productions_:[0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[37,1],[39,3],[26,1],[26,1],[26,1],[30,2],[21,1],[43,3],[43,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[38,1],[38,2]],performAction:function(b,c,d,e,f,g,h){var i=g.length-1;switch(f){case 1:return new e.ProgramNode(g[i-1],this._$);case 2:return new e.ProgramNode([],this._$);case 3:this.$=new e.ProgramNode([],g[i-1],g[i],this._$);break;case 4:this.$=new e.ProgramNode(g[i-2],g[i-1],g[i],this._$);break;case 5:this.$=new e.ProgramNode(g[i-1],g[i],[],this._$);break;case 6:this.$=new e.ProgramNode(g[i],this._$);break;case 7:this.$=new e.ProgramNode([],this._$);break;case 8:this.$=new e.ProgramNode([],this._$);break;case 9:this.$=[g[i]];break;case 10:g[i-1].push(g[i]),this.$=g[i-1];break;case 11:this.$=new e.BlockNode(g[i-2],g[i-1].inverse,g[i-1],g[i],this._$);break;case 12:this.$=new e.BlockNode(g[i-2],g[i-1],g[i-1].inverse,g[i],this._$);break;case 13:this.$=g[i];break;case 14:this.$=g[i];break;case 15:this.$=new e.ContentNode(g[i],this._$);break;case 16:this.$=new e.CommentNode(g[i],this._$);break;case 17:this.$=new e.MustacheNode(g[i-1],null,g[i-2],a(g[i-2],g[i]),this._$);break;case 18:this.$=new e.MustacheNode(g[i-1],null,g[i-2],a(g[i-2],g[i]),this._$);break;case 19:this.$={path:g[i-1],strip:a(g[i-2],g[i])};break;case 20:this.$=new e.MustacheNode(g[i-1],null,g[i-2],a(g[i-2],g[i]),this._$);break;case 21:this.$=new e.MustacheNode(g[i-1],null,g[i-2],a(g[i-2],g[i]),this._$);break;case 22:this.$=new e.PartialNode(g[i-2],g[i-1],a(g[i-3],g[i]),this._$);break;case 23:this.$=a(g[i-1],g[i]);break;case 24:this.$=new e.SexprNode([g[i-2]].concat(g[i-1]),g[i],this._$);break;case 25:this.$=new e.SexprNode([g[i]],null,this._$);break;case 26:this.$=g[i];break;case 27:this.$=new e.StringNode(g[i],this._$);break;case 28:this.$=new e.IntegerNode(g[i],this._$);break;case 29:this.$=new e.BooleanNode(g[i],this._$);break;case 30:this.$=g[i];break;case 31:g[i-1].isHelper=!0,this.$=g[i-1];break;case 32:this.$=new e.HashNode(g[i],this._$);break;case 33:this.$=[g[i-2],g[i]];break;case 34:this.$=new e.PartialNameNode(g[i],this._$);break;case 35:this.$=new e.PartialNameNode(new e.StringNode(g[i],this._$),this._$);break;case 36:this.$=new e.PartialNameNode(new e.IntegerNode(g[i],this._$));break;case 37:this.$=new e.DataNode(g[i],this._$);break;case 38:this.$=new e.IdNode(g[i],this._$);break;case 39:g[i-2].push({part:g[i],separator:g[i-1]}),this.$=g[i-2];break;case 40:this.$=[{part:g[i]}];break;case 43:this.$=[];break;case 44:g[i-1].push(g[i]);break;case 47:this.$=[g[i]];break;case 48:g[i-1].push(g[i])}},table:[{3:1,4:2,5:[1,3],8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[3]},{5:[1,16],8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[2,2]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{4:20,6:18,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{4:20,6:22,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{17:23,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:29,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:30,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:31,21:24,30:25,40:[1,28],42:[1,27],43:26},{21:33,26:32,32:[1,34],33:[1,35],40:[1,28],43:26},{1:[2,1]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{10:36,20:[1,37]},{4:38,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,7],22:[1,13],23:[1,14],25:[1,15]},{7:39,8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,6],22:[1,13],23:[1,14],25:[1,15]},{17:23,18:[1,40],21:24,30:25,40:[1,28],42:[1,27],43:26},{10:41,20:[1,37]},{18:[1,42]},{18:[2,43],24:[2,43],28:43,32:[2,43],33:[2,43],34:[2,43],35:[2,43],36:[2,43],40:[2,43],42:[2,43]},{18:[2,25],24:[2,25],36:[2,25]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38],40:[2,38],42:[2,38],44:[1,44]},{21:45,40:[1,28],43:26},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],42:[2,40],44:[2,40]},{18:[1,46]},{18:[1,47]},{24:[1,48]},{18:[2,41],21:50,27:49,40:[1,28],43:26},{18:[2,34],40:[2,34]},{18:[2,35],40:[2,35]},{18:[2,36],40:[2,36]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{21:51,40:[1,28],43:26},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,3],22:[1,13],23:[1,14],25:[1,15]},{4:52,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,5],22:[1,13],23:[1,14],25:[1,15]},{14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,45],21:56,24:[2,45],29:53,30:60,31:54,32:[1,57],33:[1,58],34:[1,59],35:[1,61],36:[2,45],37:55,38:62,39:63,40:[1,64],42:[1,27],43:26},{40:[1,65]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37],40:[2,37],42:[2,37]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,66]},{18:[2,42]},{18:[1,67]},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],25:[1,15]},{18:[2,24],24:[2,24],36:[2,24]},{18:[2,44],24:[2,44],32:[2,44],33:[2,44],34:[2,44],35:[2,44],36:[2,44],40:[2,44],42:[2,44]},{18:[2,46],24:[2,46],36:[2,46]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26],40:[2,26],42:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27],40:[2,27],42:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28],40:[2,28],42:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29],40:[2,29],42:[2,29]},{18:[2,30],24:[2,30],32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30],40:[2,30],42:[2,30]},{17:68,21:24,30:25,40:[1,28],42:[1,27],43:26},{18:[2,32],24:[2,32],36:[2,32],39:69,40:[1,70]},{18:[2,47],24:[2,47],36:[2,47],40:[2,47]},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],41:[1,71],42:[2,40],44:[2,40]},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39],40:[2,39],42:[2,39],44:[2,39]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{36:[1,72]},{18:[2,48],24:[2,48],36:[2,48],40:[2,48]},{41:[1,71]},{21:56,30:60,31:73,32:[1,57],33:[1,58],34:[1,59],35:[1,61],40:[1,28],42:[1,27],43:26},{18:[2,31],24:[2,31],32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31],40:[2,31],42:[2,31]},{18:[2,33],24:[2,33],36:[2,33],40:[2,33]}],defaultActions:{3:[2,2],16:[2,1],50:[2,42]},parseError:function(a,b){throw new Error(a)},parse:function(a){function b(){var a;return a=c.lexer.lex()||1,"number"!=typeof a&&(a=c.symbols_[a]||a),a}var c=this,d=[0],e=[null],f=[],g=this.table,h="",i=0,j=0,k=0;this.lexer.setInput(a),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var l=this.lexer.yylloc;f.push(l);var m=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var n,o,p,q,r,s,t,u,v,w={};;){if(p=d[d.length-1],this.defaultActions[p]?q=this.defaultActions[p]:(null!==n&&"undefined"!=typeof n||(n=b()),q=g[p]&&g[p][n]),"undefined"==typeof q||!q.length||!q[0]){var x="";if(!k){v=[];for(s in g[p])this.terminals_[s]&&s>2&&v.push("'"+this.terminals_[s]+"'");x=this.lexer.showPosition?"Parse error on line "+(i+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+v.join(", ")+", got '"+(this.terminals_[n]||n)+"'":"Parse error on line "+(i+1)+": Unexpected "+(1==n?"end of input":"'"+(this.terminals_[n]||n)+"'"),this.parseError(x,{text:this.lexer.match,token:this.terminals_[n]||n,line:this.lexer.yylineno,loc:l,expected:v})}}if(q[0]instanceof Array&&q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+p+", token: "+n);switch(q[0]){case 1:d.push(n),e.push(this.lexer.yytext),f.push(this.lexer.yylloc),d.push(q[1]),n=null,o?(n=o,o=null):(j=this.lexer.yyleng,h=this.lexer.yytext,i=this.lexer.yylineno,l=this.lexer.yylloc,k>0&&k--);break;case 2:if(t=this.productions_[q[1]][1],w.$=e[e.length-t],w._$={first_line:f[f.length-(t||1)].first_line,last_line:f[f.length-1].last_line,first_column:f[f.length-(t||1)].first_column,last_column:f[f.length-1].last_column},m&&(w._$.range=[f[f.length-(t||1)].range[0],f[f.length-1].range[1]]),r=this.performAction.call(w,h,j,i,this.yy,q[1],e,f),"undefined"!=typeof r)return r;t&&(d=d.slice(0,-1*t*2),e=e.slice(0,-1*t),f=f.slice(0,-1*t)),d.push(this.productions_[q[1]][0]),e.push(w.$),f.push(w._$),u=g[d[d.length-2]][d[d.length-1]],d.push(u);break;case 3:return!0}}return!0}},d=function(){var a={EOF:1,parseError:function(a,b){if(!this.yy.parser)throw new Error(a);this.yy.parser.parseError(a,b)},setInput:function(a){return this._input=a,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a;var b=a.match(/(?:\r\n?|\n).*/g);return b?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},unput:function(a){var b=a.length,c=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-b-1),this.offset-=b;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var e=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===d.length?this.yylloc.first_column:0)+d[d.length-c.length].length-c[0].length:this.yylloc.first_column-b},this.options.ranges&&(this.yylloc.range=[e[0],e[0]+this.yyleng-b]),this},more:function(){return this._more=!0,this},less:function(a){this.unput(this.match.slice(a))},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),b=new Array(a.length+1).join("-");return a+this.upcomingInput()+"\n"+b+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,b,c,d,e;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),g=0;g<f.length&&(c=this._input.match(this.rules[f[g]]),!c||b&&!(c[0].length>b[0].length)||(b=c,d=g,this.options.flex));g++);return b?(e=b[0].match(/(?:\r\n?|\n).*/g),e&&(this.yylineno+=e.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:e?e[e.length-1].length-e[e.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+b[0].length},this.yytext+=b[0],this.match+=b[0],this.matches=b,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(b[0].length),this.matched+=b[0],a=this.performAction.call(this,this.yy,this,f[d],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a?a:void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var a=this.next();return"undefined"!=typeof a?a:this.lex()},begin:function(a){this.conditionStack.push(a)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(a){this.begin(a)}};return a.options={},a.performAction=function(a,b,c,d){function e(a,c){return b.yytext=b.yytext.substr(a,b.yyleng-c)}switch(c){case 0:if("\\\\"===b.yytext.slice(-2)?(e(0,1),this.begin("mu")):"\\"===b.yytext.slice(-1)?(e(0,1),this.begin("emu")):this.begin("mu"),b.yytext)return 14;break;case 1:return 14;case 2:return this.popState(),14;case 3:return e(0,4),this.popState(),15;case 4:return 35;case 5:return 36;case 6:return 25;case 7:return 16;case 8:return 20;case 9:return 19;case 10:return 19;case 11:return 23;case 12:return 22;case 13:this.popState(),this.begin("com");break;case 14:return e(3,5),this.popState(),15;case 15:return 22;case 16:return 41;case 17:return 40;case 18:return 40;case 19:return 44;case 20:break;case 21:return this.popState(),24;case 22:return this.popState(),18;case 23:return b.yytext=e(1,2).replace(/\\"/g,'"'),32;case 24:return b.yytext=e(1,2).replace(/\\'/g,"'"),32;case 25:return 42;case 26:return 34;case 27:return 34;case 28:return 33;case 29:return 40;case 30:return b.yytext=e(1,2),40;case 31:return"INVALID";case 32:return 5}},a.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],a.conditions={mu:{rules:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[3],inclusive:!1},INITIAL:{rules:[0,1,32],inclusive:!0}},a}();return c.lexer=d,b.prototype=c,c.Parser=b,new b}();return a=b}(),i=function(a,b){"use strict";function c(a){return a.constructor===f.ProgramNode?a:(e.yy=f,e.parse(a))}var d={},e=a,f=b;return d.parser=e,d.parse=c,d}(h,g),j=function(a){"use strict";function b(){}function c(a,b,c){if(null==a||"string"!=typeof a&&a.constructor!==c.AST.ProgramNode)throw new f("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+a);b=b||{},"data"in b||(b.data=!0);var d=c.parse(a),e=(new c.Compiler).compile(d,b);return(new c.JavaScriptCompiler).compile(e,b)}function d(a,b,c){function d(){var d=c.parse(a),e=(new c.Compiler).compile(d,b),f=(new c.JavaScriptCompiler).compile(e,b,void 0,!0);return c.template(f)}if(null==a||"string"!=typeof a&&a.constructor!==c.AST.ProgramNode)throw new f("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+a);b=b||{},"data"in b||(b.data=!0);var e;return function(a,b){return e||(e=d()),e.call(this,a,b)}}var e={},f=a;return e.Compiler=b,b.prototype={compiler:b,disassemble:function(){for(var a,b,c,d=this.opcodes,e=[],f=0,g=d.length;f<g;f++)if(a=d[f],"DECLARE"===a.opcode)e.push("DECLARE "+a.name+"="+a.value);else{b=[];for(var h=0;h<a.args.length;h++)c=a.args[h],"string"==typeof c&&(c='"'+c.replace("\n","\\n")+'"'),b.push(c);e.push(a.opcode+" "+b.join(" "))}return e.join("\n")},equals:function(a){var b=this.opcodes.length;if(a.opcodes.length!==b)return!1;for(var c=0;c<b;c++){var d=this.opcodes[c],e=a.opcodes[c];if(d.opcode!==e.opcode||d.args.length!==e.args.length)return!1;for(var f=0;f<d.args.length;f++)if(d.args[f]!==e.args[f])return!1}if(b=this.children.length,a.children.length!==b)return!1;for(c=0;c<b;c++)if(!this.children[c].equals(a.children[c]))return!1;return!0},guid:0,compile:function(a,b){this.opcodes=[],this.children=[],this.depths={list:[]},this.options=b;var c=this.options.knownHelpers;if(this.options.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,if:!0,unless:!0,with:!0,log:!0},c)for(var d in c)this.options.knownHelpers[d]=c[d];return this.accept(a)},accept:function(a){var b,c=a.strip||{};return c.left&&this.opcode("strip"),b=this[a.type](a),c.right&&this.opcode("strip"),b},program:function(a){for(var b=a.statements,c=0,d=b.length;c<d;c++)this.accept(b[c]);return this.isSimple=1===d,this.depths.list=this.depths.list.sort(function(a,b){return a-b}),this},compileProgram:function(a){var b,c=(new this.compiler).compile(a,this.options),d=this.guid++;this.usePartial=this.usePartial||c.usePartial,this.children[d]=c;for(var e=0,f=c.depths.list.length;e<f;e++)b=c.depths.list[e],b<2||this.addDepth(b-1);return d},block:function(a){var b=a.mustache,c=a.program,d=a.inverse;c&&(c=this.compileProgram(c)),d&&(d=this.compileProgram(d));var e=b.sexpr,f=this.classifySexpr(e);"helper"===f?this.helperSexpr(e,c,d):"simple"===f?(this.simpleSexpr(e),this.opcode("pushProgram",c),this.opcode("pushProgram",d),this.opcode("emptyHash"),this.opcode("blockValue")):(this.ambiguousSexpr(e,c,d),this.opcode("pushProgram",c),this.opcode("pushProgram",d),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},hash:function(a){var b,c,d=a.pairs;this.opcode("pushHash");for(var e=0,f=d.length;e<f;e++)b=d[e],c=b[1],this.options.stringParams?(c.depth&&this.addDepth(c.depth),this.opcode("getContext",c.depth||0),this.opcode("pushStringParam",c.stringModeValue,c.type),"sexpr"===c.type&&this.sexpr(c)):this.accept(c),this.opcode("assignToHash",b[0]);this.opcode("popHash")},partial:function(a){var b=a.partialName;this.usePartial=!0,a.context?this.ID(a.context):this.opcode("push","depth0"),this.opcode("invokePartial",b.name),this.opcode("append")},content:function(a){this.opcode("appendContent",a.string)},mustache:function(a){this.sexpr(a.sexpr),a.escaped&&!this.options.noEscape?this.opcode("appendEscaped"):this.opcode("append")},ambiguousSexpr:function(a,b,c){var d=a.id,e=d.parts[0],f=null!=b||null!=c;this.opcode("getContext",d.depth),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.opcode("invokeAmbiguous",e,f)},simpleSexpr:function(a){var b=a.id;"DATA"===b.type?this.DATA(b):b.parts.length?this.ID(b):(this.addDepth(b.depth),this.opcode("getContext",b.depth),this.opcode("pushContext")),this.opcode("resolvePossibleLambda")},helperSexpr:function(a,b,c){var d=this.setupFullMustacheParams(a,b,c),e=a.id.parts[0];if(this.options.knownHelpers[e])this.opcode("invokeKnownHelper",d.length,e);else{if(this.options.knownHelpersOnly)throw new f("You specified knownHelpersOnly, but used the unknown helper "+e,a);this.opcode("invokeHelper",d.length,e,a.isRoot)}},sexpr:function(a){var b=this.classifySexpr(a);"simple"===b?this.simpleSexpr(a):"helper"===b?this.helperSexpr(a):this.ambiguousSexpr(a)},ID:function(a){this.addDepth(a.depth),this.opcode("getContext",a.depth);var b=a.parts[0];b?this.opcode("lookupOnContext",a.parts[0]):this.opcode("pushContext");for(var c=1,d=a.parts.length;c<d;c++)this.opcode("lookup",a.parts[c])},DATA:function(a){if(this.options.data=!0,a.id.isScoped||a.id.depth)throw new f("Scoped data references are not supported: "+a.original,a);this.opcode("lookupData");for(var b=a.id.parts,c=0,d=b.length;c<d;c++)this.opcode("lookup",b[c])},STRING:function(a){this.opcode("pushString",a.string)},INTEGER:function(a){this.opcode("pushLiteral",a.integer)},BOOLEAN:function(a){this.opcode("pushLiteral",a.bool)},comment:function(){},opcode:function(a){this.opcodes.push({opcode:a,args:[].slice.call(arguments,1)})},declare:function(a,b){this.opcodes.push({opcode:"DECLARE",name:a,value:b})},addDepth:function(a){0!==a&&(this.depths[a]||(this.depths[a]=!0,this.depths.list.push(a)))},classifySexpr:function(a){var b=a.isHelper,c=a.eligibleHelper,d=this.options;if(c&&!b){var e=a.id.parts[0];d.knownHelpers[e]?b=!0:d.knownHelpersOnly&&(c=!1)}return b?"helper":c?"ambiguous":"simple"},pushParams:function(a){for(var b,c=a.length;c--;)b=a[c],this.options.stringParams?(b.depth&&this.addDepth(b.depth),this.opcode("getContext",b.depth||0),this.opcode("pushStringParam",b.stringModeValue,b.type),"sexpr"===b.type&&this.sexpr(b)):this[b.type](b)},setupFullMustacheParams:function(a,b,c){var d=a.params;return this.pushParams(d),this.opcode("pushProgram",b),this.opcode("pushProgram",c),a.hash?this.hash(a.hash):this.opcode("emptyHash"),d}},e.precompile=c,e.compile=d,e}(c),k=function(a,b){"use strict";function c(a){this.value=a}function d(){}var e,f=a.COMPILER_REVISION,g=a.REVISION_CHANGES,h=a.log,i=b;d.prototype={nameLookup:function(a,b){var c,e;return 0===a.indexOf("depth")&&(c=!0),e=/^[0-9]+$/.test(b)?a+"["+b+"]":d.isValidJavaScriptVariableName(b)?a+"."+b:a+"['"+b+"']",c?"("+a+" && "+e+")":e},compilerInfo:function(){var a=f,b=g[a];return"this.compilerInfo = ["+a+",'"+b+"'];\n"},appendToBuffer:function(a){return this.environment.isSimple?"return "+a+";":{appendToBuffer:!0,content:a,toString:function(){return"buffer += "+a+";"}}},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(a,b,c,d){this.environment=a,this.options=b||{},h("debug",this.environment.disassemble()+"\n\n"),this.name=this.environment.name,this.isChild=!!c,this.context=c||{programs:[],environments:[],aliases:{}},this.preamble(),this.stackSlot=0,this.stackVars=[],this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],
this.compileChildren(a,b);var e,f=a.opcodes;this.i=0;for(var g=f.length;this.i<g;this.i++)e=f[this.i],"DECLARE"===e.opcode?this[e.name]=e.value:this[e.opcode].apply(this,e.args),e.opcode!==this.stripNext&&(this.stripNext=!1);if(this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new i("Compile completed with content left on stack");return this.createFunctionContext(d)},preamble:function(){var a=[];if(this.isChild)a.push("");else{var b=this.namespace,c="helpers = this.merge(helpers, "+b+".helpers);";this.environment.usePartial&&(c=c+" partials = this.merge(partials, "+b+".partials);"),this.options.data&&(c+=" data = data || {};"),a.push(c)}this.environment.isSimple?a.push(""):a.push(", buffer = "+this.initializeBuffer()),this.lastContext=0,this.source=a},createFunctionContext:function(a){var b=this.stackVars.concat(this.registers.list);if(b.length>0&&(this.source[1]=this.source[1]+", "+b.join(", ")),!this.isChild)for(var c in this.context.aliases)this.context.aliases.hasOwnProperty(c)&&(this.source[1]=this.source[1]+", "+c+"="+this.context.aliases[c]);this.source[1]&&(this.source[1]="var "+this.source[1].substring(2)+";"),this.isChild||(this.source[1]+="\n"+this.context.programs.join("\n")+"\n"),this.environment.isSimple||this.pushSource("return buffer;");for(var d=this.isChild?["depth0","data"]:["Handlebars","depth0","helpers","partials","data"],e=0,f=this.environment.depths.list.length;e<f;e++)d.push("depth"+this.environment.depths.list[e]);var g=this.mergeSource();if(this.isChild||(g=this.compilerInfo()+g),a)return d.push(g),Function.apply(this,d);var i="function "+(this.name||"")+"("+d.join(",")+") {\n  "+g+"}";return h("debug",i+"\n\n"),i},mergeSource:function(){for(var a,b="",c=0,d=this.source.length;c<d;c++){var e=this.source[c];e.appendToBuffer?a=a?a+"\n    + "+e.content:e.content:(a&&(b+="buffer += "+a+";\n  ",a=void 0),b+=e+"\n  ")}return b},blockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var a=["depth0"];this.setupParams(0,a),this.replaceStack(function(b){return a.splice(1,0,b),"blockHelperMissing.call("+a.join(", ")+")"})},ambiguousBlockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var a=["depth0"];this.setupParams(0,a);var b=this.topStack();a.splice(1,0,b),this.pushSource("if (!"+this.lastHelper+") { "+b+" = blockHelperMissing.call("+a.join(", ")+"); }")},appendContent:function(a){this.pendingContent&&(a=this.pendingContent+a),this.stripNext&&(a=a.replace(/^\s+/,"")),this.pendingContent=a},strip:function(){this.pendingContent&&(this.pendingContent=this.pendingContent.replace(/\s+$/,"")),this.stripNext="strip"},append:function(){this.flushInline();var a=this.popStack();this.pushSource("if("+a+" || "+a+" === 0) { "+this.appendToBuffer(a)+" }"),this.environment.isSimple&&this.pushSource("else { "+this.appendToBuffer("''")+" }")},appendEscaped:function(){this.context.aliases.escapeExpression="this.escapeExpression",this.pushSource(this.appendToBuffer("escapeExpression("+this.popStack()+")"))},getContext:function(a){this.lastContext!==a&&(this.lastContext=a)},lookupOnContext:function(a){this.push(this.nameLookup("depth"+this.lastContext,a,"context"))},pushContext:function(){this.pushStackLiteral("depth"+this.lastContext)},resolvePossibleLambda:function(){this.context.aliases.functionType='"function"',this.replaceStack(function(a){return"typeof "+a+" === functionType ? "+a+".apply(depth0) : "+a})},lookup:function(a){this.replaceStack(function(b){return b+" == null || "+b+" === false ? "+b+" : "+this.nameLookup(b,a,"context")})},lookupData:function(){this.pushStackLiteral("data")},pushStringParam:function(a,b){this.pushStackLiteral("depth"+this.lastContext),this.pushString(b),"sexpr"!==b&&("string"==typeof a?this.pushString(a):this.pushStackLiteral(a))},emptyHash:function(){this.pushStackLiteral("{}"),this.options.stringParams&&(this.push("{}"),this.push("{}"))},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[]}},popHash:function(){var a=this.hash;this.hash=this.hashes.pop(),this.options.stringParams&&(this.push("{"+a.contexts.join(",")+"}"),this.push("{"+a.types.join(",")+"}")),this.push("{\n    "+a.values.join(",\n    ")+"\n  }")},pushString:function(a){this.pushStackLiteral(this.quotedString(a))},push:function(a){return this.inlineStack.push(a),a},pushLiteral:function(a){this.pushStackLiteral(a)},pushProgram:function(a){null!=a?this.pushStackLiteral(this.programExpression(a)):this.pushStackLiteral(null)},invokeHelper:function(a,b,c){this.context.aliases.helperMissing="helpers.helperMissing",this.useRegister("helper");var d=this.lastHelper=this.setupHelper(a,b,!0),e=this.nameLookup("depth"+this.lastContext,b,"context"),f="helper = "+d.name+" || "+e;d.paramsInit&&(f+=","+d.paramsInit),this.push("("+f+",helper ? helper.call("+d.callParams+") : helperMissing.call("+d.helperMissingParams+"))"),c||this.flushInline()},invokeKnownHelper:function(a,b){var c=this.setupHelper(a,b);this.push(c.name+".call("+c.callParams+")")},invokeAmbiguous:function(a,b){this.context.aliases.functionType='"function"',this.useRegister("helper"),this.emptyHash();var c=this.setupHelper(0,a,b),d=this.lastHelper=this.nameLookup("helpers",a,"helper"),e=this.nameLookup("depth"+this.lastContext,a,"context"),f=this.nextStack();c.paramsInit&&this.pushSource(c.paramsInit),this.pushSource("if (helper = "+d+") { "+f+" = helper.call("+c.callParams+"); }"),this.pushSource("else { helper = "+e+"; "+f+" = typeof helper === functionType ? helper.call("+c.callParams+") : helper; }")},invokePartial:function(a){var b=[this.nameLookup("partials",a,"partial"),"'"+a+"'",this.popStack(),"helpers","partials"];this.options.data&&b.push("data"),this.context.aliases.self="this",this.push("self.invokePartial("+b.join(", ")+")")},assignToHash:function(a){var b,c,d=this.popStack();this.options.stringParams&&(c=this.popStack(),b=this.popStack());var e=this.hash;b&&e.contexts.push("'"+a+"': "+b),c&&e.types.push("'"+a+"': "+c),e.values.push("'"+a+"': ("+d+")")},compiler:d,compileChildren:function(a,b){for(var c,d,e=a.children,f=0,g=e.length;f<g;f++){c=e[f],d=new this.compiler;var h=this.matchExistingProgram(c);null==h?(this.context.programs.push(""),h=this.context.programs.length,c.index=h,c.name="program"+h,this.context.programs[h]=d.compile(c,b,this.context),this.context.environments[h]=c):(c.index=h,c.name="program"+h)}},matchExistingProgram:function(a){for(var b=0,c=this.context.environments.length;b<c;b++){var d=this.context.environments[b];if(d&&d.equals(a))return b}},programExpression:function(a){if(this.context.aliases.self="this",null==a)return"self.noop";for(var b,c=this.environment.children[a],d=c.depths.list,e=[c.index,c.name,"data"],f=0,g=d.length;f<g;f++)b=d[f],1===b?e.push("depth0"):e.push("depth"+(b-1));return(0===d.length?"self.program(":"self.programWithDepth(")+e.join(", ")+")"},register:function(a,b){this.useRegister(a),this.pushSource(a+" = "+b+";")},useRegister:function(a){this.registers[a]||(this.registers[a]=!0,this.registers.list.push(a))},pushStackLiteral:function(a){return this.push(new c(a))},pushSource:function(a){this.pendingContent&&(this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))),this.pendingContent=void 0),a&&this.source.push(a)},pushStack:function(a){this.flushInline();var b=this.incrStack();return a&&this.pushSource(b+" = "+a+";"),this.compileStack.push(b),b},replaceStack:function(a){var b,d,e,f="",g=this.isInline();if(g){var h=this.popStack(!0);if(h instanceof c)b=h.value,e=!0;else{d=!this.stackSlot;var i=d?this.incrStack():this.topStackName();f="("+this.push(i)+" = "+h+"),",b=this.topStack()}}else b=this.topStack();var j=a.call(this,b);return g?(e||this.popStack(),d&&this.stackSlot--,this.push("("+f+j+")")):(/^stack/.test(b)||(b=this.nextStack()),this.pushSource(b+" = ("+f+j+");")),b},nextStack:function(){return this.pushStack()},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var a=this.inlineStack;if(a.length){this.inlineStack=[];for(var b=0,d=a.length;b<d;b++){var e=a[b];e instanceof c?this.compileStack.push(e):this.pushStack(e)}}},isInline:function(){return this.inlineStack.length},popStack:function(a){var b=this.isInline(),d=(b?this.inlineStack:this.compileStack).pop();if(!a&&d instanceof c)return d.value;if(!b){if(!this.stackSlot)throw new i("Invalid stack pop");this.stackSlot--}return d},topStack:function(a){var b=this.isInline()?this.inlineStack:this.compileStack,d=b[b.length-1];return!a&&d instanceof c?d.value:d},quotedString:function(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},setupHelper:function(a,b,c){var d=[],e=this.setupParams(a,d,c),f=this.nameLookup("helpers",b,"helper");return{params:d,paramsInit:e,name:f,callParams:["depth0"].concat(d).join(", "),helperMissingParams:c&&["depth0",this.quotedString(b)].concat(d).join(", ")}},setupOptions:function(a,b){var c,d,e,f=[],g=[],h=[];f.push("hash:"+this.popStack()),this.options.stringParams&&(f.push("hashTypes:"+this.popStack()),f.push("hashContexts:"+this.popStack())),d=this.popStack(),e=this.popStack(),(e||d)&&(e||(this.context.aliases.self="this",e="self.noop"),d||(this.context.aliases.self="this",d="self.noop"),f.push("inverse:"+d),f.push("fn:"+e));for(var i=0;i<a;i++)c=this.popStack(),b.push(c),this.options.stringParams&&(h.push(this.popStack()),g.push(this.popStack()));return this.options.stringParams&&(f.push("contexts:["+g.join(",")+"]"),f.push("types:["+h.join(",")+"]")),this.options.data&&f.push("data:data"),f},setupParams:function(a,b,c){var d="{"+this.setupOptions(a,b).join(",")+"}";return c?(this.useRegister("options"),b.push("options"),"options="+d):(b.push(d),"")}};for(var j="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),k=d.RESERVED_WORDS={},l=0,m=j.length;l<m;l++)k[j[l]]=!0;return d.isValidJavaScriptVariableName=function(a){return!(d.RESERVED_WORDS[a]||!/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a))},e=d}(d,c),l=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c.parser,j=c.parse,k=d.Compiler,l=d.compile,m=d.precompile,n=e,o=g.create,p=function(){var a=o();return a.compile=function(b,c){return l(b,c,a)},a.precompile=function(b,c){return m(b,c,a)},a.AST=h,a.Compiler=k,a.JavaScriptCompiler=n,a.Parser=i,a.parse=j,a};return g=p(),g.create=p,f=g}(f,g,i,j,k);return l}();;(function(){var a=this,b=a._,c={},d=Array.prototype,e=Object.prototype,f=Function.prototype,g=d.push,h=d.slice,i=d.concat,j=e.toString,k=e.hasOwnProperty,l=d.forEach,m=d.map,n=d.reduce,o=d.reduceRight,p=d.filter,q=d.every,r=d.some,s=d.indexOf,t=d.lastIndexOf,u=Array.isArray,v=Object.keys,w=f.bind,x=function(a){return a instanceof x?a:this instanceof x?void(this._wrapped=a):new x(a)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=x),exports._=x):a._=x,x.VERSION="1.6.0";var y=x.each=x.forEach=function(a,b,d){if(null==a)return a;if(l&&a.forEach===l)a.forEach(b,d);else if(a.length===+a.length){for(var e=0,f=a.length;e<f;e++)if(b.call(d,a[e],e,a)===c)return}else for(var g=x.keys(a),e=0,f=g.length;e<f;e++)if(b.call(d,a[g[e]],g[e],a)===c)return;return a};x.map=x.collect=function(a,b,c){var d=[];return null==a?d:m&&a.map===m?a.map(b,c):(y(a,function(a,e,f){d.push(b.call(c,a,e,f))}),d)};var z="Reduce of empty array with no initial value";x.reduce=x.foldl=x.inject=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),n&&a.reduce===n)return d&&(b=x.bind(b,d)),e?a.reduce(b,c):a.reduce(b);if(y(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)}),!e)throw new TypeError(z);return c},x.reduceRight=x.foldr=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),o&&a.reduceRight===o)return d&&(b=x.bind(b,d)),e?a.reduceRight(b,c):a.reduceRight(b);var f=a.length;if(f!==+f){var g=x.keys(a);f=g.length}if(y(a,function(h,i,j){i=g?g[--f]:--f,e?c=b.call(d,c,a[i],i,j):(c=a[i],e=!0)}),!e)throw new TypeError(z);return c},x.find=x.detect=function(a,b,c){var d;return A(a,function(a,e,f){if(b.call(c,a,e,f))return d=a,!0}),d},x.filter=x.select=function(a,b,c){var d=[];return null==a?d:p&&a.filter===p?a.filter(b,c):(y(a,function(a,e,f){b.call(c,a,e,f)&&d.push(a)}),d)},x.reject=function(a,b,c){return x.filter(a,function(a,d,e){return!b.call(c,a,d,e)},c)},x.every=x.all=function(a,b,d){b||(b=x.identity);var e=!0;return null==a?e:q&&a.every===q?a.every(b,d):(y(a,function(a,f,g){if(!(e=e&&b.call(d,a,f,g)))return c}),!!e)};var A=x.some=x.any=function(a,b,d){b||(b=x.identity);var e=!1;return null==a?e:r&&a.some===r?a.some(b,d):(y(a,function(a,f,g){if(e||(e=b.call(d,a,f,g)))return c}),!!e)};x.contains=x.include=function(a,b){return null!=a&&(s&&a.indexOf===s?a.indexOf(b)!=-1:A(a,function(a){return a===b}))},x.invoke=function(a,b){var c=h.call(arguments,2),d=x.isFunction(b);return x.map(a,function(a){return(d?b:a[b]).apply(a,c)})},x.pluck=function(a,b){return x.map(a,x.property(b))},x.where=function(a,b){return x.filter(a,x.matches(b))},x.findWhere=function(a,b){return x.find(a,x.matches(b))},x.max=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.max.apply(Math,a);var d=-(1/0),e=-(1/0);return y(a,function(a,f,g){var h=b?b.call(c,a,f,g):a;h>e&&(d=a,e=h)}),d},x.min=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.min.apply(Math,a);var d=1/0,e=1/0;return y(a,function(a,f,g){var h=b?b.call(c,a,f,g):a;h<e&&(d=a,e=h)}),d},x.shuffle=function(a){var b,c=0,d=[];return y(a,function(a){b=x.random(c++),d[c-1]=d[b],d[b]=a}),d},x.sample=function(a,b,c){return null==b||c?(a.length!==+a.length&&(a=x.values(a)),a[x.random(a.length-1)]):x.shuffle(a).slice(0,Math.max(0,b))};var B=function(a){return null==a?x.identity:x.isFunction(a)?a:x.property(a)};x.sortBy=function(a,b,c){return b=B(b),x.pluck(x.map(a,function(a,d,e){return{value:a,index:d,criteria:b.call(c,a,d,e)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;if(c!==d){if(c>d||void 0===c)return 1;if(c<d||void 0===d)return-1}return a.index-b.index}),"value")};var C=function(a){return function(b,c,d){var e={};return c=B(c),y(b,function(f,g){var h=c.call(d,f,g,b);a(e,h,f)}),e}};x.groupBy=C(function(a,b,c){x.has(a,b)?a[b].push(c):a[b]=[c]}),x.indexBy=C(function(a,b,c){a[b]=c}),x.countBy=C(function(a,b){x.has(a,b)?a[b]++:a[b]=1}),x.sortedIndex=function(a,b,c,d){c=B(c);for(var e=c.call(d,b),f=0,g=a.length;f<g;){var h=f+g>>>1;c.call(d,a[h])<e?f=h+1:g=h}return f},x.toArray=function(a){return a?x.isArray(a)?h.call(a):a.length===+a.length?x.map(a,x.identity):x.values(a):[]},x.size=function(a){return null==a?0:a.length===+a.length?a.length:x.keys(a).length},x.first=x.head=x.take=function(a,b,c){if(null!=a)return null==b||c?a[0]:b<0?[]:h.call(a,0,b)},x.initial=function(a,b,c){return h.call(a,0,a.length-(null==b||c?1:b))},x.last=function(a,b,c){if(null!=a)return null==b||c?a[a.length-1]:h.call(a,Math.max(a.length-b,0))},x.rest=x.tail=x.drop=function(a,b,c){return h.call(a,null==b||c?1:b)},x.compact=function(a){return x.filter(a,x.identity)};var D=function(a,b,c){return b&&x.every(a,x.isArray)?i.apply(c,a):(y(a,function(a){x.isArray(a)||x.isArguments(a)?b?g.apply(c,a):D(a,b,c):c.push(a)}),c)};x.flatten=function(a,b){return D(a,b,[])},x.without=function(a){return x.difference(a,h.call(arguments,1))},x.partition=function(a,b){var c=[],d=[];return y(a,function(a){(b(a)?c:d).push(a)}),[c,d]},x.uniq=x.unique=function(a,b,c,d){x.isFunction(b)&&(d=c,c=b,b=!1);var e=c?x.map(a,c,d):a,f=[],g=[];return y(e,function(c,d){(b?d&&g[g.length-1]===c:x.contains(g,c))||(g.push(c),f.push(a[d]))}),f},x.union=function(){return x.uniq(x.flatten(arguments,!0))},x.intersection=function(a){var b=h.call(arguments,1);return x.filter(x.uniq(a),function(a){return x.every(b,function(b){return x.contains(b,a)})})},x.difference=function(a){var b=i.apply(d,h.call(arguments,1));return x.filter(a,function(a){return!x.contains(b,a)})},x.zip=function(){for(var a=x.max(x.pluck(arguments,"length").concat(0)),b=new Array(a),c=0;c<a;c++)b[c]=x.pluck(arguments,""+c);return b},x.object=function(a,b){if(null==a)return{};for(var c={},d=0,e=a.length;d<e;d++)b?c[a[d]]=b[d]:c[a[d][0]]=a[d][1];return c},x.indexOf=function(a,b,c){if(null==a)return-1;var d=0,e=a.length;if(c){if("number"!=typeof c)return d=x.sortedIndex(a,b),a[d]===b?d:-1;d=c<0?Math.max(0,e+c):c}if(s&&a.indexOf===s)return a.indexOf(b,c);for(;d<e;d++)if(a[d]===b)return d;return-1},x.lastIndexOf=function(a,b,c){if(null==a)return-1;var d=null!=c;if(t&&a.lastIndexOf===t)return d?a.lastIndexOf(b,c):a.lastIndexOf(b);for(var e=d?c:a.length;e--;)if(a[e]===b)return e;return-1},x.range=function(a,b,c){arguments.length<=1&&(b=a||0,a=0),c=arguments[2]||1;for(var d=Math.max(Math.ceil((b-a)/c),0),e=0,f=new Array(d);e<d;)f[e++]=a,a+=c;return f};var E=function(){};x.bind=function(a,b){var c,d;if(w&&a.bind===w)return w.apply(a,h.call(arguments,1));if(!x.isFunction(a))throw new TypeError;return c=h.call(arguments,2),d=function(){if(!(this instanceof d))return a.apply(b,c.concat(h.call(arguments)));E.prototype=a.prototype;var e=new E;E.prototype=null;var f=a.apply(e,c.concat(h.call(arguments)));return Object(f)===f?f:e}},x.partial=function(a){var b=h.call(arguments,1);return function(){for(var c=0,d=b.slice(),e=0,f=d.length;e<f;e++)d[e]===x&&(d[e]=arguments[c++]);for(;c<arguments.length;)d.push(arguments[c++]);return a.apply(this,d)}},x.bindAll=function(a){var b=h.call(arguments,1);if(0===b.length)throw new Error("bindAll must be passed function names");return y(b,function(b){a[b]=x.bind(a[b],a)}),a},x.memoize=function(a,b){var c={};return b||(b=x.identity),function(){var d=b.apply(this,arguments);return x.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},x.delay=function(a,b){var c=h.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},x.defer=function(a){return x.delay.apply(x,[a,1].concat(h.call(arguments,1)))},x.throttle=function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:x.now(),g=null,f=a.apply(d,e),d=e=null};return function(){var j=x.now();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,k<=0?(clearTimeout(g),g=null,h=j,f=a.apply(d,e),d=e=null):g||c.trailing===!1||(g=setTimeout(i,k)),f}},x.debounce=function(a,b,c){var d,e,f,g,h,i=function(){var j=x.now()-g;j<b?d=setTimeout(i,b-j):(d=null,c||(h=a.apply(f,e),f=e=null))};return function(){f=this,e=arguments,g=x.now();var j=c&&!d;return d||(d=setTimeout(i,b)),j&&(h=a.apply(f,e),f=e=null),h}},x.once=function(a){var b,c=!1;return function(){return c?b:(c=!0,b=a.apply(this,arguments),a=null,b)}},x.wrap=function(a,b){return x.partial(b,a)},x.compose=function(){var a=arguments;return function(){for(var b=arguments,c=a.length-1;c>=0;c--)b=[a[c].apply(this,b)];return b[0]}},x.after=function(a,b){return function(){if(--a<1)return b.apply(this,arguments)}},x.keys=function(a){if(!x.isObject(a))return[];if(v)return v(a);var b=[];for(var c in a)x.has(a,c)&&b.push(c);return b},x.values=function(a){for(var b=x.keys(a),c=b.length,d=new Array(c),e=0;e<c;e++)d[e]=a[b[e]];return d},x.pairs=function(a){for(var b=x.keys(a),c=b.length,d=new Array(c),e=0;e<c;e++)d[e]=[b[e],a[b[e]]];return d},x.invert=function(a){for(var b={},c=x.keys(a),d=0,e=c.length;d<e;d++)b[a[c[d]]]=c[d];return b},x.functions=x.methods=function(a){var b=[];for(var c in a)x.isFunction(a[c])&&b.push(c);return b.sort()},x.extend=function(a){return y(h.call(arguments,1),function(b){if(b)for(var c in b)a[c]=b[c]}),a},x.pick=function(a){var b={},c=i.apply(d,h.call(arguments,1));return y(c,function(c){c in a&&(b[c]=a[c])}),b},x.omit=function(a){var b={},c=i.apply(d,h.call(arguments,1));for(var e in a)x.contains(c,e)||(b[e]=a[e]);return b},x.defaults=function(a){return y(h.call(arguments,1),function(b){if(b)for(var c in b)void 0===a[c]&&(a[c]=b[c])}),a},x.clone=function(a){return x.isObject(a)?x.isArray(a)?a.slice():x.extend({},a):a},x.tap=function(a,b){return b(a),a};var F=function(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;if(null==a||null==b)return a===b;a instanceof x&&(a=a._wrapped),b instanceof x&&(b=b._wrapped);var e=j.call(a);if(e!=j.call(b))return!1;switch(e){case"[object String]":return a==String(b);case"[object Number]":return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if("object"!=typeof a||"object"!=typeof b)return!1;for(var f=c.length;f--;)if(c[f]==a)return d[f]==b;var g=a.constructor,h=b.constructor;if(g!==h&&!(x.isFunction(g)&&g instanceof g&&x.isFunction(h)&&h instanceof h)&&"constructor"in a&&"constructor"in b)return!1;c.push(a),d.push(b);var i=0,k=!0;if("[object Array]"==e){if(i=a.length,k=i==b.length)for(;i--&&(k=F(a[i],b[i],c,d)););}else{for(var l in a)if(x.has(a,l)&&(i++,!(k=x.has(b,l)&&F(a[l],b[l],c,d))))break;if(k){for(l in b)if(x.has(b,l)&&!i--)break;k=!i}}return c.pop(),d.pop(),k};x.isEqual=function(a,b){return F(a,b,[],[])},x.isEmpty=function(a){if(null==a)return!0;if(x.isArray(a)||x.isString(a))return 0===a.length;for(var b in a)if(x.has(a,b))return!1;return!0},x.isElement=function(a){return!(!a||1!==a.nodeType)},x.isArray=u||function(a){return"[object Array]"==j.call(a)},x.isObject=function(a){return a===Object(a)},y(["Arguments","Function","String","Number","Date","RegExp"],function(a){x["is"+a]=function(b){return j.call(b)=="[object "+a+"]"}}),x.isArguments(arguments)||(x.isArguments=function(a){return!(!a||!x.has(a,"callee"))}),"function"!=typeof/./&&(x.isFunction=function(a){return"function"==typeof a}),x.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},x.isNaN=function(a){return x.isNumber(a)&&a!=+a},x.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==j.call(a)},x.isNull=function(a){return null===a},x.isUndefined=function(a){return void 0===a},x.has=function(a,b){return k.call(a,b)},x.noConflict=function(){return a._=b,this},x.identity=function(a){return a},x.constant=function(a){return function(){return a}},x.property=function(a){return function(b){return b[a]}},x.matches=function(a){return function(b){if(b===a)return!0;for(var c in a)if(a[c]!==b[c])return!1;return!0}},x.times=function(a,b,c){for(var d=Array(Math.max(0,a)),e=0;e<a;e++)d[e]=b.call(c,e);return d},x.random=function(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))},x.now=Date.now||function(){return(new Date).getTime()};var G={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};G.unescape=x.invert(G.escape);var H={escape:new RegExp("["+x.keys(G.escape).join("")+"]","g"),unescape:new RegExp("("+x.keys(G.unescape).join("|")+")","g")};x.each(["escape","unescape"],function(a){x[a]=function(b){return null==b?"":(""+b).replace(H[a],function(b){return G[a][b]})}}),x.result=function(a,b){if(null!=a){var c=a[b];return x.isFunction(c)?c.call(a):c}},x.mixin=function(a){y(x.functions(a),function(b){var c=x[b]=a[b];x.prototype[b]=function(){var a=[this._wrapped];return g.apply(a,arguments),M.call(this,c.apply(x,a))}})};var I=0;x.uniqueId=function(a){var b=++I+"";return a?a+b:b},x.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var J=/(.)^/,K={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},L=/\\|'|\r|\n|\t|\u2028|\u2029/g;x.template=function(a,b,c){var d;c=x.defaults({},c,x.templateSettings);var e=new RegExp([(c.escape||J).source,(c.interpolate||J).source,(c.evaluate||J).source].join("|")+"|$","g"),f=0,g="__p+='";a.replace(e,function(b,c,d,e,h){return g+=a.slice(f,h).replace(L,function(a){return"\\"+K[a]}),c&&(g+="'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'"),d&&(g+="'+\n((__t=("+d+"))==null?'':__t)+\n'"),e&&(g+="';\n"+e+"\n__p+='"),f=h+b.length,b}),g+="';\n",c.variable||(g="with(obj||{}){\n"+g+"}\n"),g="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+g+"return __p;\n";try{d=new Function(c.variable||"obj","_",g)}catch(a){throw a.source=g,a}if(b)return d(b,x);var h=function(a){return d.call(this,a,x)};return h.source="function("+(c.variable||"obj")+"){\n"+g+"}",h},x.chain=function(a){return x(a).chain()};var M=function(a){return this._chain?x(a).chain():a};x.mixin(x),y(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=d[a];x.prototype[a]=function(){var c=this._wrapped;return b.apply(c,arguments),"shift"!=a&&"splice"!=a||0!==c.length||delete c[0],M.call(this,c)}}),y(["concat","join","slice"],function(a){var b=d[a];x.prototype[a]=function(){return M.call(this,b.apply(this._wrapped,arguments))}}),x.extend(x.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return x})}).call(this);;!function(a,b){if("function"==typeof define&&define.amd)define(["underscore","jquery","exports"],function(c,d,e){a.Backbone=b(a,e,c,d)});else if("undefined"!=typeof exports){var c=require("underscore");b(a,exports,c)}else a.Backbone=b(a,{},a._,a.jQuery||a.Zepto||a.ender||a.$)}(this,function(a,b,c,d){var e=a.Backbone,f=[],g=(f.push,f.slice);f.splice;b.VERSION="1.1.2",b.$=d,b.noConflict=function(){return a.Backbone=e,this},b.emulateHTTP=!1,b.emulateJSON=!1;var h=b.Events={on:function(a,b,c){if(!j(this,"on",a,[b,c])||!b)return this;this._events||(this._events={});var d=this._events[a]||(this._events[a]=[]);return d.push({callback:b,context:c,ctx:c||this}),this},once:function(a,b,d){if(!j(this,"once",a,[b,d])||!b)return this;var e=this,f=c.once(function(){e.off(a,f),b.apply(this,arguments)});return f._callback=b,this.on(a,f,d)},off:function(a,b,d){var e,f,g,h,i,k,l,m;if(!this._events||!j(this,"off",a,[b,d]))return this;if(!a&&!b&&!d)return this._events=void 0,this;for(h=a?[a]:c.keys(this._events),i=0,k=h.length;i<k;i++)if(a=h[i],g=this._events[a]){if(this._events[a]=e=[],b||d)for(l=0,m=g.length;l<m;l++)f=g[l],(b&&b!==f.callback&&b!==f.callback._callback||d&&d!==f.context)&&e.push(f);e.length||delete this._events[a]}return this},trigger:function(a){if(!this._events)return this;var b=g.call(arguments,1);if(!j(this,"trigger",a,b))return this;var c=this._events[a],d=this._events.all;return c&&k(c,b),d&&k(d,arguments),this},stopListening:function(a,b,d){var e=this._listeningTo;if(!e)return this;var f=!b&&!d;d||"object"!=typeof b||(d=this),a&&((e={})[a._listenId]=a);for(var g in e)a=e[g],a.off(b,d,this),(f||c.isEmpty(a._events))&&delete this._listeningTo[g];return this}},i=/\s+/,j=function(a,b,c,d){if(!c)return!0;if("object"==typeof c){for(var e in c)a[b].apply(a,[e,c[e]].concat(d));return!1}if(i.test(c)){for(var f=c.split(i),g=0,h=f.length;g<h;g++)a[b].apply(a,[f[g]].concat(d));return!1}return!0},k=function(a,b){var c,d=-1,e=a.length,f=b[0],g=b[1],h=b[2];switch(b.length){case 0:for(;++d<e;)(c=a[d]).callback.call(c.ctx);return;case 1:for(;++d<e;)(c=a[d]).callback.call(c.ctx,f);return;case 2:for(;++d<e;)(c=a[d]).callback.call(c.ctx,f,g);return;case 3:for(;++d<e;)(c=a[d]).callback.call(c.ctx,f,g,h);return;default:for(;++d<e;)(c=a[d]).callback.apply(c.ctx,b);return}},l={listenTo:"on",listenToOnce:"once"};c.each(l,function(a,b){h[b]=function(b,d,e){var f=this._listeningTo||(this._listeningTo={}),g=b._listenId||(b._listenId=c.uniqueId("l"));return f[g]=b,e||"object"!=typeof d||(e=this),b[a](d,e,this),this}}),h.bind=h.on,h.unbind=h.off,c.extend(b,h);var m=b.Model=function(a,b){var d=a||{};b||(b={}),this.cid=c.uniqueId("c"),this.attributes={},b.collection&&(this.collection=b.collection),b.parse&&(d=this.parse(d,b)||{}),d=c.defaults({},d,c.result(this,"defaults")),this.set(d,b),this.changed={},this.initialize.apply(this,arguments)};c.extend(m.prototype,h,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(a){return c.clone(this.attributes)},sync:function(){return b.sync.apply(this,arguments)},get:function(a){return this.attributes[a]},escape:function(a){return c.escape(this.get(a))},has:function(a){return null!=this.get(a)},set:function(a,b,d){var e,f,g,h,i,j,k,l;if(null==a)return this;if("object"==typeof a?(f=a,d=b):(f={})[a]=b,d||(d={}),!this._validate(f,d))return!1;g=d.unset,i=d.silent,h=[],j=this._changing,this._changing=!0,j||(this._previousAttributes=c.clone(this.attributes),this.changed={}),l=this.attributes,k=this._previousAttributes,this.idAttribute in f&&(this.id=f[this.idAttribute]);for(e in f)b=f[e],c.isEqual(l[e],b)||h.push(e),c.isEqual(k[e],b)?delete this.changed[e]:this.changed[e]=b,g?delete l[e]:l[e]=b;if(!i){h.length&&(this._pending=d);for(var m=0,n=h.length;m<n;m++)this.trigger("change:"+h[m],this,l[h[m]],d)}if(j)return this;if(!i)for(;this._pending;)d=this._pending,this._pending=!1,this.trigger("change",this,d);return this._pending=!1,this._changing=!1,this},unset:function(a,b){return this.set(a,void 0,c.extend({},b,{unset:!0}))},clear:function(a){var b={};for(var d in this.attributes)b[d]=void 0;return this.set(b,c.extend({},a,{unset:!0}))},hasChanged:function(a){return null==a?!c.isEmpty(this.changed):c.has(this.changed,a)},changedAttributes:function(a){if(!a)return!!this.hasChanged()&&c.clone(this.changed);var b,d=!1,e=this._changing?this._previousAttributes:this.attributes;for(var f in a)c.isEqual(e[f],b=a[f])||((d||(d={}))[f]=b);return d},previous:function(a){return null!=a&&this._previousAttributes?this._previousAttributes[a]:null},previousAttributes:function(){return c.clone(this._previousAttributes)},fetch:function(a){a=a?c.clone(a):{},void 0===a.parse&&(a.parse=!0);var b=this,d=a.success;return a.success=function(c){return!!b.set(b.parse(c,a),a)&&(d&&d(b,c,a),void b.trigger("sync",b,c,a))},L(this,a),this.sync("read",this,a)},save:function(a,b,d){var e,f,g,h=this.attributes;if(null==a||"object"==typeof a?(e=a,d=b):(e={})[a]=b,d=c.extend({validate:!0},d),e&&!d.wait){if(!this.set(e,d))return!1}else if(!this._validate(e,d))return!1;e&&d.wait&&(this.attributes=c.extend({},h,e)),void 0===d.parse&&(d.parse=!0);var i=this,j=d.success;return d.success=function(a){i.attributes=h;var b=i.parse(a,d);return d.wait&&(b=c.extend(e||{},b)),!(c.isObject(b)&&!i.set(b,d))&&(j&&j(i,a,d),void i.trigger("sync",i,a,d))},L(this,d),f=this.isNew()?"create":d.patch?"patch":"update","patch"===f&&(d.attrs=e),g=this.sync(f,this,d),e&&d.wait&&(this.attributes=h),g},destroy:function(a){a=a?c.clone(a):{};var b=this,d=a.success,e=function(){b.trigger("destroy",b,b.collection,a)};if(a.success=function(c){(a.wait||b.isNew())&&e(),d&&d(b,c,a),b.isNew()||b.trigger("sync",b,c,a)},this.isNew())return a.success(),!1;L(this,a);var f=this.sync("delete",this,a);return a.wait||e(),f},url:function(){var a=c.result(this,"urlRoot")||c.result(this.collection,"url")||K();return this.isNew()?a:a.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(a,b){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(a){return this._validate({},c.extend(a||{},{validate:!0}))},_validate:function(a,b){if(!b.validate||!this.validate)return!0;a=c.extend({},this.attributes,a);var d=this.validationError=this.validate(a,b)||null;return!d||(this.trigger("invalid",this,d,c.extend(b,{validationError:d})),!1)}});var n=["keys","values","pairs","invert","pick","omit"];c.each(n,function(a){m.prototype[a]=function(){var b=g.call(arguments);return b.unshift(this.attributes),c[a].apply(c,b)}});var o=b.Collection=function(a,b){b||(b={}),b.model&&(this.model=b.model),void 0!==b.comparator&&(this.comparator=b.comparator),this._reset(),this.initialize.apply(this,arguments),a&&this.reset(a,c.extend({silent:!0},b))},p={add:!0,remove:!0,merge:!0},q={add:!0,remove:!1};c.extend(o.prototype,h,{model:m,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},sync:function(){return b.sync.apply(this,arguments)},add:function(a,b){return this.set(a,c.extend({merge:!1},b,q))},remove:function(a,b){var d=!c.isArray(a);a=d?[a]:c.clone(a),b||(b={});var e,f,g,h;for(e=0,f=a.length;e<f;e++)h=a[e]=this.get(a[e]),h&&(delete this._byId[h.id],delete this._byId[h.cid],g=this.indexOf(h),this.models.splice(g,1),this.length--,b.silent||(b.index=g,h.trigger("remove",h,this,b)),this._removeReference(h,b));return d?a[0]:a},set:function(a,b){b=c.defaults({},b,p),b.parse&&(a=this.parse(a,b));var d=!c.isArray(a);a=d?a?[a]:[]:c.clone(a);var e,f,g,h,i,j,k,l=b.at,n=this.model,o=this.comparator&&null==l&&b.sort!==!1,q=c.isString(this.comparator)?this.comparator:null,r=[],s=[],t={},u=b.add,v=b.merge,w=b.remove,x=!(o||!u||!w)&&[];for(e=0,f=a.length;e<f;e++){if(i=a[e]||{},g=i instanceof m?h=i:i[n.prototype.idAttribute||"id"],j=this.get(g))w&&(t[j.cid]=!0),v&&(i=i===h?h.attributes:i,b.parse&&(i=j.parse(i,b)),j.set(i,b),o&&!k&&j.hasChanged(q)&&(k=!0)),a[e]=j;else if(u){if(h=a[e]=this._prepareModel(i,b),!h)continue;r.push(h),this._addReference(h,b)}h=j||h,!x||!h.isNew()&&t[h.id]||x.push(h),t[h.id]=!0}if(w){for(e=0,f=this.length;e<f;++e)t[(h=this.models[e]).cid]||s.push(h);s.length&&this.remove(s,b)}if(r.length||x&&x.length)if(o&&(k=!0),this.length+=r.length,null!=l)for(e=0,f=r.length;e<f;e++)this.models.splice(l+e,0,r[e]);else{x&&(this.models.length=0);var y=x||r;for(e=0,f=y.length;e<f;e++)this.models.push(y[e])}if(k&&this.sort({silent:!0}),!b.silent){for(e=0,f=r.length;e<f;e++)(h=r[e]).trigger("add",h,this,b);(k||x&&x.length)&&this.trigger("sort",this,b)}return d?a[0]:a},reset:function(a,b){b||(b={});for(var d=0,e=this.models.length;d<e;d++)this._removeReference(this.models[d],b);return b.previousModels=this.models,this._reset(),a=this.add(a,c.extend({silent:!0},b)),b.silent||this.trigger("reset",this,b),a},push:function(a,b){return this.add(a,c.extend({at:this.length},b))},pop:function(a){var b=this.at(this.length-1);return this.remove(b,a),b},unshift:function(a,b){return this.add(a,c.extend({at:0},b))},shift:function(a){var b=this.at(0);return this.remove(b,a),b},slice:function(){return g.apply(this.models,arguments)},get:function(a){if(null!=a)return this._byId[a]||this._byId[a.id]||this._byId[a.cid]},at:function(a){return this.models[a]},where:function(a,b){return c.isEmpty(a)?b?void 0:[]:this[b?"find":"filter"](function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},findWhere:function(a){return this.where(a,!0)},sort:function(a){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return a||(a={}),c.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(c.bind(this.comparator,this)),a.silent||this.trigger("sort",this,a),this},pluck:function(a){return c.invoke(this.models,"get",a)},fetch:function(a){a=a?c.clone(a):{},void 0===a.parse&&(a.parse=!0);var b=a.success,d=this;return a.success=function(c){var e=a.reset?"reset":"set";d[e](c,a),b&&b(d,c,a),d.trigger("sync",d,c,a)},L(this,a),this.sync("read",this,a)},create:function(a,b){if(b=b?c.clone(b):{},!(a=this._prepareModel(a,b)))return!1;b.wait||this.add(a,b);var d=this,e=b.success;return b.success=function(a,c){b.wait&&d.add(a,b),e&&e(a,c,b)},a.save(null,b),a},parse:function(a,b){return a},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(a,b){if(a instanceof m)return a;b=b?c.clone(b):{},b.collection=this;var d=new this.model(a,b);return d.validationError?(this.trigger("invalid",this,d.validationError,b),!1):d},_addReference:function(a,b){this._byId[a.cid]=a,null!=a.id&&(this._byId[a.id]=a),a.collection||(a.collection=this),a.on("all",this._onModelEvent,this)},_removeReference:function(a,b){this===a.collection&&delete a.collection,a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"!==a&&"remove"!==a||c===this)&&("destroy"===a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],null!=b.id&&(this._byId[b.id]=b)),this.trigger.apply(this,arguments))}});var r=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];c.each(r,function(a){o.prototype[a]=function(){var b=g.call(arguments);return b.unshift(this.models),c[a].apply(c,b)}});var s=["groupBy","countBy","sortBy","indexBy"];c.each(s,function(a){o.prototype[a]=function(b,d){var e=c.isFunction(b)?b:function(a){return a.get(b)};return c[a](this.models,e,d)}});var t=b.View=function(a){this.cid=c.uniqueId("view"),a||(a={}),c.extend(this,c.pick(a,v)),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},u=/^(\S+)\s*(.*)$/,v=["model","collection","el","id","attributes","className","tagName","events"];c.extend(t.prototype,h,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(a,c){return this.$el&&this.undelegateEvents(),this.$el=a instanceof b.$?a:b.$(a),this.el=this.$el[0],c!==!1&&this.delegateEvents(),this},delegateEvents:function(a){if(!a&&!(a=c.result(this,"events")))return this;this.undelegateEvents();for(var b in a){var d=a[b];if(c.isFunction(d)||(d=this[a[b]]),d){var e=b.match(u),f=e[1],g=e[2];d=c.bind(d,this),f+=".delegateEvents"+this.cid,""===g?this.$el.on(f,d):this.$el.on(f,g,d)}}return this},undelegateEvents:function(){return this.$el.off(".delegateEvents"+this.cid),this},_ensureElement:function(){if(this.el)this.setElement(c.result(this,"el"),!1);else{var a=c.extend({},c.result(this,"attributes"));this.id&&(a.id=c.result(this,"id")),this.className&&(a.class=c.result(this,"className"));var d=b.$("<"+c.result(this,"tagName")+">").attr(a);this.setElement(d,!1)}}}),b.sync=function(a,d,e){var f=x[a];c.defaults(e||(e={}),{emulateHTTP:b.emulateHTTP,emulateJSON:b.emulateJSON});var g={type:f,dataType:"json"};if(e.url||(g.url=c.result(d,"url")||K()),null!=e.data||!d||"create"!==a&&"update"!==a&&"patch"!==a||(g.contentType="application/json",g.data=JSON.stringify(e.attrs||d.toJSON(e))),e.emulateJSON&&(g.contentType="application/x-www-form-urlencoded",g.data=g.data?{model:g.data}:{}),e.emulateHTTP&&("PUT"===f||"DELETE"===f||"PATCH"===f)){g.type="POST",e.emulateJSON&&(g.data._method=f);var h=e.beforeSend;e.beforeSend=function(a){if(a.setRequestHeader("X-HTTP-Method-Override",f),h)return h.apply(this,arguments)}}"GET"===g.type||e.emulateJSON||(g.processData=!1),"PATCH"===g.type&&w&&(g.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")});var i=e.xhr=b.ajax(c.extend(g,e));return d.trigger("request",d,i,e),i};var w=!("undefined"==typeof window||!window.ActiveXObject||window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent),x={create:"POST",update:"PUT",patch:"PATCH",delete:"DELETE",read:"GET"};b.ajax=function(){return b.$.ajax.apply(b.$,arguments)};var y=b.Router=function(a){a||(a={}),a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},z=/\((.*?)\)/g,A=/(\(\?)?:\w+/g,B=/\*\w+/g,C=/[\-{}\[\]+?.,\\\^$|#\s]/g;c.extend(y.prototype,h,{initialize:function(){},route:function(a,d,e){c.isRegExp(a)||(a=this._routeToRegExp(a)),c.isFunction(d)&&(e=d,d=""),e||(e=this[d]);var f=this;return b.history.route(a,function(c){var g=f._extractParameters(a,c);f.execute(e,g),f.trigger.apply(f,["route:"+d].concat(g)),f.trigger("route",d,g),b.history.trigger("route",f,d,g)}),this},execute:function(a,b){a&&a.apply(this,b)},navigate:function(a,c){return b.history.navigate(a,c),this},_bindRoutes:function(){if(this.routes){this.routes=c.result(this,"routes");for(var a,b=c.keys(this.routes);null!=(a=b.pop());)this.route(a,this.routes[a])}},_routeToRegExp:function(a){return a=a.replace(C,"\\$&").replace(z,"(?:$1)?").replace(A,function(a,b){return b?a:"([^/?]+)"}).replace(B,"([^?]*?)"),new RegExp("^"+a+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(a,b){var d=a.exec(b).slice(1);return c.map(d,function(a,b){return b===d.length-1?a||null:a?decodeURIComponent(a):null})}});var D=b.History=function(){this.handlers=[],c.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},E=/^[#\/]|\s+$/g,F=/^\/+|\/+$/g,G=/msie [\w.]+/,H=/\/$/,I=/#.*$/;D.started=!1,c.extend(D.prototype,h,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(a){var b=(a||this).location.href.match(/#(.*)$/);return b?b[1]:""},getFragment:function(a,b){if(null==a)if(this._hasPushState||!this._wantsHashChange||b){a=decodeURI(this.location.pathname+this.location.search);var c=this.root.replace(H,"");a.indexOf(c)||(a=a.slice(c.length))}else a=this.getHash();return a.replace(E,"")},start:function(a){if(D.started)throw new Error("Backbone.history has already been started");D.started=!0,this.options=c.extend({root:"/"},this.options,a),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var d=this.getFragment(),e=document.documentMode,f=G.exec(navigator.userAgent.toLowerCase())&&(!e||e<=7);if(this.root=("/"+this.root+"/").replace(F,"/"),f&&this._wantsHashChange){var g=b.$('<iframe src="javascript:0" tabindex="-1">');this.iframe=g.hide().appendTo("body")[0].contentWindow,this.navigate(d)}this._hasPushState?b.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!f?b.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=d;var h=this.location;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot())return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+"#"+this.fragment),!0;this._hasPushState&&this.atRoot()&&h.hash&&(this.fragment=this.getHash().replace(E,""),this.history.replaceState({},document.title,this.root+this.fragment))}if(!this.options.silent)return this.loadUrl()},stop:function(){b.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),this._checkUrlInterval&&clearInterval(this._checkUrlInterval),D.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(a){var b=this.getFragment();return b===this.fragment&&this.iframe&&(b=this.getFragment(this.getHash(this.iframe))),b!==this.fragment&&(this.iframe&&this.navigate(b),void this.loadUrl())},loadUrl:function(a){return a=this.fragment=this.getFragment(a),c.any(this.handlers,function(b){if(b.route.test(a))return b.callback(a),!0})},navigate:function(a,b){if(!D.started)return!1;b&&b!==!0||(b={trigger:!!b});var c=this.root+(a=this.getFragment(a||""));if(a=a.replace(I,""),this.fragment!==a){if(this.fragment=a,""===a&&"/"!==c&&(c=c.slice(0,-1)),this._hasPushState)this.history[b.replace?"replaceState":"pushState"]({},document.title,c);else{if(!this._wantsHashChange)return this.location.assign(c);this._updateHash(this.location,a,b.replace),this.iframe&&a!==this.getFragment(this.getHash(this.iframe))&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,a,b.replace))}return b.trigger?this.loadUrl(a):void 0}},_updateHash:function(a,b,c){if(c){var d=a.href.replace(/(javascript:|#).*$/,"");a.replace(d+"#"+b)}else a.hash="#"+b}}),b.history=new D;var J=function(a,b){var d,e=this;d=a&&c.has(a,"constructor")?a.constructor:function(){return e.apply(this,arguments)},c.extend(d,e,b);var f=function(){this.constructor=d};return f.prototype=e.prototype,d.prototype=new f,a&&c.extend(d.prototype,a),d.__super__=e.prototype,d};m.extend=o.extend=y.extend=t.extend=D.extend=J;var K=function(){throw new Error('A "url" property or function must be specified')},L=function(a,b){var c=b.error;b.error=function(d){c&&c(a,d,b),a.trigger("error",a,d,b)}};return b});;!function(a){a.Model.extend=a.Collection.extend=a.Router.extend=a.View.extend=function(a,b){var d=c(this,a,b);return d.extend=this.extend,d};var b=function(){},c=function(a,c,d){var e,f=a.prototype,g=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;if(e=c&&c.hasOwnProperty("constructor")?c.constructor:function(){a.apply(this,arguments)},_.extend(e,a),b.prototype=a.prototype,e.prototype=new b,c){_.extend(e.prototype,c);for(var h in c)"function"==typeof c[h]&&"function"==typeof f[h]&&g.test(c[h])&&(e.prototype[h]=function(a,b){var c=function(){var c=this._super;this._super=f[a];var d;try{d=b.apply(this,arguments)}finally{this._super=c}return d};for(var d in b)c[d]=b[d],delete b[d];return c}(h,c[h]))}return d&&_.extend(e,d),e.prototype.constructor=e,e.__super__=a.prototype,e}}(Backbone);;/**
 * Copyright 2014 Tim Down.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


if(!Array.prototype.push){Array.prototype.push=function(){for(var i=0,len=arguments.length;i<len;i++){this[this.length]=arguments[i];}
return this.length;};}
if(!Array.prototype.shift){Array.prototype.shift=function(){if(this.length>0){var firstItem=this[0];for(var i=0,len=this.length-1;i<len;i++){this[i]=this[i+1];}
this.length=this.length-1;return firstItem;}};}
if(!Array.prototype.splice){Array.prototype.splice=function(startIndex,deleteCount){var itemsAfterDeleted=this.slice(startIndex+deleteCount);var itemsDeleted=this.slice(startIndex,startIndex+deleteCount);this.length=startIndex;var argumentsArray=[];for(var i=0,len=arguments.length;i<len;i++){argumentsArray[i]=arguments[i];}
var itemsToAppend=(argumentsArray.length>2)?itemsAfterDeleted=argumentsArray.slice(2).concat(itemsAfterDeleted):itemsAfterDeleted;for(i=0,len=itemsToAppend.length;i<len;i++){this.push(itemsToAppend[i]);}
return itemsDeleted;};}
var log4javascript=(function(){function isUndefined(obj){return typeof obj=="undefined";}
function EventSupport(){}
EventSupport.prototype={eventTypes:[],eventListeners:{},setEventTypes:function(eventTypesParam){if(eventTypesParam instanceof Array){this.eventTypes=eventTypesParam;this.eventListeners={};for(var i=0,len=this.eventTypes.length;i<len;i++){this.eventListeners[this.eventTypes[i]]=[];}}else{handleError("log4javascript.EventSupport ["+this+"]: setEventTypes: eventTypes parameter must be an Array");}},addEventListener:function(eventType,listener){if(typeof listener=="function"){if(!array_contains(this.eventTypes,eventType)){handleError("log4javascript.EventSupport ["+this+"]: addEventListener: no event called '"+eventType+"'");}
this.eventListeners[eventType].push(listener);}else{handleError("log4javascript.EventSupport ["+this+"]: addEventListener: listener must be a function");}},removeEventListener:function(eventType,listener){if(typeof listener=="function"){if(!array_contains(this.eventTypes,eventType)){handleError("log4javascript.EventSupport ["+this+"]: removeEventListener: no event called '"+eventType+"'");}
array_remove(this.eventListeners[eventType],listener);}else{handleError("log4javascript.EventSupport ["+this+"]: removeEventListener: listener must be a function");}},dispatchEvent:function(eventType,eventArgs){if(array_contains(this.eventTypes,eventType)){var listeners=this.eventListeners[eventType];for(var i=0,len=listeners.length;i<len;i++){listeners[i](this,eventType,eventArgs);}}else{handleError("log4javascript.EventSupport ["+this+"]: dispatchEvent: no event called '"+eventType+"'");}}};var applicationStartDate=new Date();var uniqueId="log4javascript_"+applicationStartDate.getTime()+"_"+
Math.floor(Math.random()*100000000);var emptyFunction=function(){};var newLine="\r\n";var pageLoaded=false;function Log4JavaScript(){}
Log4JavaScript.prototype=new EventSupport();log4javascript=new Log4JavaScript();log4javascript.version="1.4.9";log4javascript.edition="log4javascript_production";function toStr(obj){if(obj&&obj.toString){return obj.toString();}else{return String(obj);}}
function getExceptionMessage(ex){if(ex.message){return ex.message;}else if(ex.description){return ex.description;}else{return toStr(ex);}}
function getUrlFileName(url){var lastSlashIndex=Math.max(url.lastIndexOf("/"),url.lastIndexOf("\\"));return url.substr(lastSlashIndex+1);}
function getExceptionStringRep(ex){if(ex){var exStr="Exception: "+getExceptionMessage(ex);try{if(ex.lineNumber){exStr+=" on line number "+ex.lineNumber;}
if(ex.fileName){exStr+=" in file "+getUrlFileName(ex.fileName);}}catch(localEx){logLog.warn("Unable to obtain file and line information for error");}
if(showStackTraces&&ex.stack){exStr+=newLine+"Stack trace:"+newLine+ex.stack;}
return exStr;}
return null;}
function bool(obj){return Boolean(obj);}
function trim(str){return str.replace(/^\s+/,"").replace(/\s+$/,"");}
function splitIntoLines(text){var text2=text.replace(/\r\n/g,"\n").replace(/\r/g,"\n");return text2.split("\n");}
var urlEncode=(typeof window.encodeURIComponent!="undefined")?function(str){return encodeURIComponent(str);}:function(str){return escape(str).replace(/\+/g,"%2B").replace(/"/g,"%22").replace(/'/g,"%27").replace(/\//g,"%2F").replace(/=/g,"%3D");};var urlDecode=(typeof window.decodeURIComponent!="undefined")?function(str){return decodeURIComponent(str);}:function(str){return unescape(str).replace(/%2B/g,"+").replace(/%22/g,"\"").replace(/%27/g,"'").replace(/%2F/g,"/").replace(/%3D/g,"=");};function array_remove(arr,val){var index=-1;for(var i=0,len=arr.length;i<len;i++){if(arr[i]===val){index=i;break;}}
if(index>=0){arr.splice(index,1);return true;}else{return false;}}
function array_contains(arr,val){for(var i=0,len=arr.length;i<len;i++){if(arr[i]==val){return true;}}
return false;}
function extractBooleanFromParam(param,defaultValue){if(isUndefined(param)){return defaultValue;}else{return bool(param);}}
function extractStringFromParam(param,defaultValue){if(isUndefined(param)){return defaultValue;}else{return String(param);}}
function extractIntFromParam(param,defaultValue){if(isUndefined(param)){return defaultValue;}else{try{var value=parseInt(param,10);return isNaN(value)?defaultValue:value;}catch(ex){logLog.warn("Invalid int param "+param,ex);return defaultValue;}}}
function extractFunctionFromParam(param,defaultValue){if(typeof param=="function"){return param;}else{return defaultValue;}}
function isError(err){return(err instanceof Error);}
if(!Function.prototype.apply){Function.prototype.apply=function(obj,args){var methodName="__apply__";if(typeof obj[methodName]!="undefined"){methodName+=String(Math.random()).substr(2);}
obj[methodName]=this;var argsStrings=[];for(var i=0,len=args.length;i<len;i++){argsStrings[i]="args["+i+"]";}
var script="obj."+methodName+"("+argsStrings.join(",")+")";var returnValue=eval(script);delete obj[methodName];return returnValue;};}
if(!Function.prototype.call){Function.prototype.call=function(obj){var args=[];for(var i=1,len=arguments.length;i<len;i++){args[i-1]=arguments[i];}
return this.apply(obj,args);};}
function getListenersPropertyName(eventName){return"__log4javascript_listeners__"+eventName;}
function addEvent(node,eventName,listener,useCapture,win){win=win?win:window;if(node.addEventListener){node.addEventListener(eventName,listener,useCapture);}else if(node.attachEvent){node.attachEvent("on"+eventName,listener);}else{var propertyName=getListenersPropertyName(eventName);if(!node[propertyName]){node[propertyName]=[];node["on"+eventName]=function(evt){evt=getEvent(evt,win);var listenersPropertyName=getListenersPropertyName(eventName);var listeners=this[listenersPropertyName].concat([]);var currentListener;while((currentListener=listeners.shift())){currentListener.call(this,evt);}};}
node[propertyName].push(listener);}}
function removeEvent(node,eventName,listener,useCapture){if(node.removeEventListener){node.removeEventListener(eventName,listener,useCapture);}else if(node.detachEvent){node.detachEvent("on"+eventName,listener);}else{var propertyName=getListenersPropertyName(eventName);if(node[propertyName]){array_remove(node[propertyName],listener);}}}
function getEvent(evt,win){win=win?win:window;return evt?evt:win.event;}
function stopEventPropagation(evt){if(evt.stopPropagation){evt.stopPropagation();}else if(typeof evt.cancelBubble!="undefined"){evt.cancelBubble=true;}
evt.returnValue=false;}
var logLog={quietMode:false,debugMessages:[],setQuietMode:function(quietMode){this.quietMode=bool(quietMode);},numberOfErrors:0,alertAllErrors:false,setAlertAllErrors:function(alertAllErrors){this.alertAllErrors=alertAllErrors;},debug:function(message){this.debugMessages.push(message);},displayDebug:function(){alert(this.debugMessages.join(newLine));},warn:function(message,exception){},error:function(message,exception){if(++this.numberOfErrors==1||this.alertAllErrors){if(!this.quietMode){var alertMessage="log4javascript error: "+message;if(exception){alertMessage+=newLine+newLine+"Original error: "+getExceptionStringRep(exception);}
alert(alertMessage);}}}};log4javascript.logLog=logLog;log4javascript.setEventTypes(["load","error"]);function handleError(message,exception){logLog.error(message,exception);log4javascript.dispatchEvent("error",{"message":message,"exception":exception});}
log4javascript.handleError=handleError;var enabled=!((typeof log4javascript_disabled!="undefined")&&log4javascript_disabled);log4javascript.setEnabled=function(enable){enabled=bool(enable);};log4javascript.isEnabled=function(){return enabled;};var useTimeStampsInMilliseconds=true;log4javascript.setTimeStampsInMilliseconds=function(timeStampsInMilliseconds){useTimeStampsInMilliseconds=bool(timeStampsInMilliseconds);};log4javascript.isTimeStampsInMilliseconds=function(){return useTimeStampsInMilliseconds;};log4javascript.evalInScope=function(expr){return eval(expr);};var showStackTraces=false;log4javascript.setShowStackTraces=function(show){showStackTraces=bool(show);};var Level=function(level,name){this.level=level;this.name=name;};Level.prototype={toString:function(){return this.name;},equals:function(level){return this.level==level.level;},isGreaterOrEqual:function(level){return this.level>=level.level;}};Level.ALL=new Level(Number.MIN_VALUE,"ALL");Level.TRACE=new Level(10000,"TRACE");Level.DEBUG=new Level(20000,"DEBUG");Level.INFO=new Level(30000,"INFO");Level.WARN=new Level(40000,"WARN");Level.ERROR=new Level(50000,"ERROR");Level.FATAL=new Level(60000,"FATAL");Level.OFF=new Level(Number.MAX_VALUE,"OFF");log4javascript.Level=Level;function Timer(name,level){this.name=name;this.level=isUndefined(level)?Level.INFO:level;this.start=new Date();}
Timer.prototype.getElapsedTime=function(){return new Date().getTime()-this.start.getTime();};var anonymousLoggerName="[anonymous]";var defaultLoggerName="[default]";var nullLoggerName="[null]";var rootLoggerName="root";function Logger(name){this.name=name;this.parent=null;this.children=[];var appenders=[];var loggerLevel=null;var isRoot=(this.name===rootLoggerName);var isNull=(this.name===nullLoggerName);var appenderCache=null;var appenderCacheInvalidated=false;this.addChild=function(childLogger){this.children.push(childLogger);childLogger.parent=this;childLogger.invalidateAppenderCache();};var additive=true;this.getAdditivity=function(){return additive;};this.setAdditivity=function(additivity){var valueChanged=(additive!=additivity);additive=additivity;if(valueChanged){this.invalidateAppenderCache();}};this.addAppender=function(appender){if(isNull){handleError("Logger.addAppender: you may not add an appender to the null logger");}else{if(appender instanceof log4javascript.Appender){if(!array_contains(appenders,appender)){appenders.push(appender);appender.setAddedToLogger(this);this.invalidateAppenderCache();}}else{handleError("Logger.addAppender: appender supplied ('"+
toStr(appender)+"') is not a subclass of Appender");}}};this.removeAppender=function(appender){array_remove(appenders,appender);appender.setRemovedFromLogger(this);this.invalidateAppenderCache();};this.removeAllAppenders=function(){var appenderCount=appenders.length;if(appenderCount>0){for(var i=0;i<appenderCount;i++){appenders[i].setRemovedFromLogger(this);}
appenders.length=0;this.invalidateAppenderCache();}};this.getEffectiveAppenders=function(){if(appenderCache===null||appenderCacheInvalidated){var parentEffectiveAppenders=(isRoot||!this.getAdditivity())?[]:this.parent.getEffectiveAppenders();appenderCache=parentEffectiveAppenders.concat(appenders);appenderCacheInvalidated=false;}
return appenderCache;};this.invalidateAppenderCache=function(){appenderCacheInvalidated=true;for(var i=0,len=this.children.length;i<len;i++){this.children[i].invalidateAppenderCache();}};this.log=function(level,params){if(enabled&&level.isGreaterOrEqual(this.getEffectiveLevel())){var exception;var finalParamIndex=params.length-1;var lastParam=params[finalParamIndex];if(params.length>1&&isError(lastParam)){exception=lastParam;finalParamIndex--;}
var messages=[];for(var i=0;i<=finalParamIndex;i++){messages[i]=params[i];}
var loggingEvent=new LoggingEvent(this,new Date(),level,messages,exception);this.callAppenders(loggingEvent);}};this.callAppenders=function(loggingEvent){var effectiveAppenders=this.getEffectiveAppenders();for(var i=0,len=effectiveAppenders.length;i<len;i++){effectiveAppenders[i].doAppend(loggingEvent);}};this.setLevel=function(level){if(isRoot&&level===null){handleError("Logger.setLevel: you cannot set the level of the root logger to null");}else if(level instanceof Level){loggerLevel=level;}else{handleError("Logger.setLevel: level supplied to logger "+
this.name+" is not an instance of log4javascript.Level");}};this.getLevel=function(){return loggerLevel;};this.getEffectiveLevel=function(){for(var logger=this;logger!==null;logger=logger.parent){var level=logger.getLevel();if(level!==null){return level;}}};this.group=function(name,initiallyExpanded){if(enabled){var effectiveAppenders=this.getEffectiveAppenders();for(var i=0,len=effectiveAppenders.length;i<len;i++){effectiveAppenders[i].group(name,initiallyExpanded);}}};this.groupEnd=function(){if(enabled){var effectiveAppenders=this.getEffectiveAppenders();for(var i=0,len=effectiveAppenders.length;i<len;i++){effectiveAppenders[i].groupEnd();}}};var timers={};this.time=function(name,level){if(enabled){if(isUndefined(name)){handleError("Logger.time: a name for the timer must be supplied");}else if(level&&!(level instanceof Level)){handleError("Logger.time: level supplied to timer "+
name+" is not an instance of log4javascript.Level");}else{timers[name]=new Timer(name,level);}}};this.timeEnd=function(name){if(enabled){if(isUndefined(name)){handleError("Logger.timeEnd: a name for the timer must be supplied");}else if(timers[name]){var timer=timers[name];var milliseconds=timer.getElapsedTime();this.log(timer.level,["Timer "+toStr(name)+" completed in "+milliseconds+"ms"]);delete timers[name];}else{logLog.warn("Logger.timeEnd: no timer found with name "+name);}}};this.assert=function(expr){if(enabled&&!expr){var args=[];for(var i=1,len=arguments.length;i<len;i++){args.push(arguments[i]);}
args=(args.length>0)?args:["Assertion Failure"];args.push(newLine);args.push(expr);this.log(Level.ERROR,args);}};this.toString=function(){return"Logger["+this.name+"]";};}
Logger.prototype={trace:function(){this.log(Level.TRACE,arguments);},debug:function(){this.log(Level.DEBUG,arguments);},info:function(){this.log(Level.INFO,arguments);},warn:function(){this.log(Level.WARN,arguments);},error:function(){this.log(Level.ERROR,arguments);},fatal:function(){this.log(Level.FATAL,arguments);},isEnabledFor:function(level){return level.isGreaterOrEqual(this.getEffectiveLevel());},isTraceEnabled:function(){return this.isEnabledFor(Level.TRACE);},isDebugEnabled:function(){return this.isEnabledFor(Level.DEBUG);},isInfoEnabled:function(){return this.isEnabledFor(Level.INFO);},isWarnEnabled:function(){return this.isEnabledFor(Level.WARN);},isErrorEnabled:function(){return this.isEnabledFor(Level.ERROR);},isFatalEnabled:function(){return this.isEnabledFor(Level.FATAL);}};Logger.prototype.trace.isEntryPoint=true;Logger.prototype.debug.isEntryPoint=true;Logger.prototype.info.isEntryPoint=true;Logger.prototype.warn.isEntryPoint=true;Logger.prototype.error.isEntryPoint=true;Logger.prototype.fatal.isEntryPoint=true;var loggers={};var loggerNames=[];var ROOT_LOGGER_DEFAULT_LEVEL=Level.DEBUG;var rootLogger=new Logger(rootLoggerName);rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL);log4javascript.getRootLogger=function(){return rootLogger;};log4javascript.getLogger=function(loggerName){if(!(typeof loggerName=="string")){loggerName=anonymousLoggerName;logLog.warn("log4javascript.getLogger: non-string logger name "+
toStr(loggerName)+" supplied, returning anonymous logger");}
if(loggerName==rootLoggerName){handleError("log4javascript.getLogger: root logger may not be obtained by name");}
if(!loggers[loggerName]){var logger=new Logger(loggerName);loggers[loggerName]=logger;loggerNames.push(loggerName);var lastDotIndex=loggerName.lastIndexOf(".");var parentLogger;if(lastDotIndex>-1){var parentLoggerName=loggerName.substring(0,lastDotIndex);parentLogger=log4javascript.getLogger(parentLoggerName);}else{parentLogger=rootLogger;}
parentLogger.addChild(logger);}
return loggers[loggerName];};var defaultLogger=null;log4javascript.getDefaultLogger=function(){if(!defaultLogger){defaultLogger=log4javascript.getLogger(defaultLoggerName);var a=new log4javascript.PopUpAppender();defaultLogger.addAppender(a);}
return defaultLogger;};var nullLogger=null;log4javascript.getNullLogger=function(){if(!nullLogger){nullLogger=new Logger(nullLoggerName);nullLogger.setLevel(Level.OFF);}
return nullLogger;};log4javascript.resetConfiguration=function(){rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL);loggers={};};var LoggingEvent=function(logger,timeStamp,level,messages,exception){this.logger=logger;this.timeStamp=timeStamp;this.timeStampInMilliseconds=timeStamp.getTime();this.timeStampInSeconds=Math.floor(this.timeStampInMilliseconds/1000);this.milliseconds=this.timeStamp.getMilliseconds();this.level=level;this.messages=messages;this.exception=exception;};LoggingEvent.prototype={getThrowableStrRep:function(){return this.exception?getExceptionStringRep(this.exception):"";},getCombinedMessages:function(){return(this.messages.length==1)?this.messages[0]:this.messages.join(newLine);},toString:function(){return"LoggingEvent["+this.level+"]";}};log4javascript.LoggingEvent=LoggingEvent;var Layout=function(){};Layout.prototype={defaults:{loggerKey:"logger",timeStampKey:"timestamp",millisecondsKey:"milliseconds",levelKey:"level",messageKey:"message",exceptionKey:"exception",urlKey:"url"},loggerKey:"logger",timeStampKey:"timestamp",millisecondsKey:"milliseconds",levelKey:"level",messageKey:"message",exceptionKey:"exception",urlKey:"url",batchHeader:"",batchFooter:"",batchSeparator:"",returnsPostData:false,overrideTimeStampsSetting:false,useTimeStampsInMilliseconds:null,format:function(){handleError("Layout.format: layout supplied has no format() method");},ignoresThrowable:function(){handleError("Layout.ignoresThrowable: layout supplied has no ignoresThrowable() method");},getContentType:function(){return"text/plain";},allowBatching:function(){return true;},setTimeStampsInMilliseconds:function(timeStampsInMilliseconds){this.overrideTimeStampsSetting=true;this.useTimeStampsInMilliseconds=bool(timeStampsInMilliseconds);},isTimeStampsInMilliseconds:function(){return this.overrideTimeStampsSetting?this.useTimeStampsInMilliseconds:useTimeStampsInMilliseconds;},getTimeStampValue:function(loggingEvent){return this.isTimeStampsInMilliseconds()?loggingEvent.timeStampInMilliseconds:loggingEvent.timeStampInSeconds;},getDataValues:function(loggingEvent,combineMessages){var dataValues=[[this.loggerKey,loggingEvent.logger.name],[this.timeStampKey,this.getTimeStampValue(loggingEvent)],[this.levelKey,loggingEvent.level.name],[this.urlKey,window.location.href],[this.messageKey,combineMessages?loggingEvent.getCombinedMessages():loggingEvent.messages]];if(!this.isTimeStampsInMilliseconds()){dataValues.push([this.millisecondsKey,loggingEvent.milliseconds]);}
if(loggingEvent.exception){dataValues.push([this.exceptionKey,getExceptionStringRep(loggingEvent.exception)]);}
if(this.hasCustomFields()){for(var i=0,len=this.customFields.length;i<len;i++){var val=this.customFields[i].value;if(typeof val==="function"){val=val(this,loggingEvent);}
dataValues.push([this.customFields[i].name,val]);}}
return dataValues;},setKeys:function(loggerKey,timeStampKey,levelKey,messageKey,exceptionKey,urlKey,millisecondsKey){this.loggerKey=extractStringFromParam(loggerKey,this.defaults.loggerKey);this.timeStampKey=extractStringFromParam(timeStampKey,this.defaults.timeStampKey);this.levelKey=extractStringFromParam(levelKey,this.defaults.levelKey);this.messageKey=extractStringFromParam(messageKey,this.defaults.messageKey);this.exceptionKey=extractStringFromParam(exceptionKey,this.defaults.exceptionKey);this.urlKey=extractStringFromParam(urlKey,this.defaults.urlKey);this.millisecondsKey=extractStringFromParam(millisecondsKey,this.defaults.millisecondsKey);},setCustomField:function(name,value){var fieldUpdated=false;for(var i=0,len=this.customFields.length;i<len;i++){if(this.customFields[i].name===name){this.customFields[i].value=value;fieldUpdated=true;}}
if(!fieldUpdated){this.customFields.push({"name":name,"value":value});}},hasCustomFields:function(){return(this.customFields.length>0);},formatWithException:function(loggingEvent){var formatted=this.format(loggingEvent);if(loggingEvent.exception&&this.ignoresThrowable()){formatted+=loggingEvent.getThrowableStrRep();}
return formatted;},toString:function(){handleError("Layout.toString: all layouts must override this method");}};log4javascript.Layout=Layout;var Appender=function(){};Appender.prototype=new EventSupport();Appender.prototype.layout=new PatternLayout();Appender.prototype.threshold=Level.ALL;Appender.prototype.loggers=[];Appender.prototype.doAppend=function(loggingEvent){if(enabled&&loggingEvent.level.level>=this.threshold.level){this.append(loggingEvent);}};Appender.prototype.append=function(loggingEvent){};Appender.prototype.setLayout=function(layout){if(layout instanceof Layout){this.layout=layout;}else{handleError("Appender.setLayout: layout supplied to "+
this.toString()+" is not a subclass of Layout");}};Appender.prototype.getLayout=function(){return this.layout;};Appender.prototype.setThreshold=function(threshold){if(threshold instanceof Level){this.threshold=threshold;}else{handleError("Appender.setThreshold: threshold supplied to "+
this.toString()+" is not a subclass of Level");}};Appender.prototype.getThreshold=function(){return this.threshold;};Appender.prototype.setAddedToLogger=function(logger){this.loggers.push(logger);};Appender.prototype.setRemovedFromLogger=function(logger){array_remove(this.loggers,logger);};Appender.prototype.group=emptyFunction;Appender.prototype.groupEnd=emptyFunction;Appender.prototype.toString=function(){handleError("Appender.toString: all appenders must override this method");};log4javascript.Appender=Appender;function SimpleLayout(){this.customFields=[];}
SimpleLayout.prototype=new Layout();SimpleLayout.prototype.format=function(loggingEvent){return loggingEvent.level.name+" - "+loggingEvent.getCombinedMessages();};SimpleLayout.prototype.ignoresThrowable=function(){return true;};SimpleLayout.prototype.toString=function(){return"SimpleLayout";};log4javascript.SimpleLayout=SimpleLayout;function NullLayout(){this.customFields=[];}
NullLayout.prototype=new Layout();NullLayout.prototype.format=function(loggingEvent){return loggingEvent.messages;};NullLayout.prototype.ignoresThrowable=function(){return true;};NullLayout.prototype.formatWithException=function(loggingEvent){var messages=loggingEvent.messages,ex=loggingEvent.exception;return ex?messages.concat([ex]):messages;};NullLayout.prototype.toString=function(){return"NullLayout";};log4javascript.NullLayout=NullLayout;function XmlLayout(combineMessages){this.combineMessages=extractBooleanFromParam(combineMessages,true);this.customFields=[];}
XmlLayout.prototype=new Layout();XmlLayout.prototype.isCombinedMessages=function(){return this.combineMessages;};XmlLayout.prototype.getContentType=function(){return"text/xml";};XmlLayout.prototype.escapeCdata=function(str){return str.replace(/\]\]>/,"]]>]]&gt;<![CDATA[");};XmlLayout.prototype.format=function(loggingEvent){var layout=this;var i,len;function formatMessage(message){message=(typeof message==="string")?message:toStr(message);return"<log4javascript:message><![CDATA["+
layout.escapeCdata(message)+"]]></log4javascript:message>";}
var str="<log4javascript:event logger=\""+loggingEvent.logger.name+"\" timestamp=\""+this.getTimeStampValue(loggingEvent)+"\"";if(!this.isTimeStampsInMilliseconds()){str+=" milliseconds=\""+loggingEvent.milliseconds+"\"";}
str+=" level=\""+loggingEvent.level.name+"\">"+newLine;if(this.combineMessages){str+=formatMessage(loggingEvent.getCombinedMessages());}else{str+="<log4javascript:messages>"+newLine;for(i=0,len=loggingEvent.messages.length;i<len;i++){str+=formatMessage(loggingEvent.messages[i])+newLine;}
str+="</log4javascript:messages>"+newLine;}
if(this.hasCustomFields()){for(i=0,len=this.customFields.length;i<len;i++){str+="<log4javascript:customfield name=\""+
this.customFields[i].name+"\"><![CDATA["+
this.customFields[i].value.toString()+"]]></log4javascript:customfield>"+newLine;}}
if(loggingEvent.exception){str+="<log4javascript:exception><![CDATA["+
getExceptionStringRep(loggingEvent.exception)+"]]></log4javascript:exception>"+newLine;}
str+="</log4javascript:event>"+newLine+newLine;return str;};XmlLayout.prototype.ignoresThrowable=function(){return false;};XmlLayout.prototype.toString=function(){return"XmlLayout";};log4javascript.XmlLayout=XmlLayout;function escapeNewLines(str){return str.replace(/\r\n|\r|\n/g,"\\r\\n");}
function JsonLayout(readable,combineMessages){this.readable=extractBooleanFromParam(readable,false);this.combineMessages=extractBooleanFromParam(combineMessages,true);this.batchHeader=this.readable?"["+newLine:"[";this.batchFooter=this.readable?"]"+newLine:"]";this.batchSeparator=this.readable?","+newLine:",";this.setKeys();this.colon=this.readable?": ":":";this.tab=this.readable?"\t":"";this.lineBreak=this.readable?newLine:"";this.customFields=[];}
JsonLayout.prototype=new Layout();JsonLayout.prototype.isReadable=function(){return this.readable;};JsonLayout.prototype.isCombinedMessages=function(){return this.combineMessages;};JsonLayout.prototype.format=function(loggingEvent){var layout=this;var dataValues=this.getDataValues(loggingEvent,this.combineMessages);var str="{"+this.lineBreak;var i,len;function formatValue(val,prefix,expand){var formattedValue;var valType=typeof val;if(val instanceof Date){formattedValue=String(val.getTime());}else if(expand&&(val instanceof Array)){formattedValue="["+layout.lineBreak;for(var i=0,len=val.length;i<len;i++){var childPrefix=prefix+layout.tab;formattedValue+=childPrefix+formatValue(val[i],childPrefix,false);if(i<val.length-1){formattedValue+=",";}
formattedValue+=layout.lineBreak;}
formattedValue+=prefix+"]";}else if(valType!=="number"&&valType!=="boolean"){formattedValue="\""+escapeNewLines(toStr(val).replace(/\"/g,"\\\""))+"\"";}else{formattedValue=val;}
return formattedValue;}
for(i=0,len=dataValues.length-1;i<=len;i++){str+=this.tab+"\""+dataValues[i][0]+"\""+this.colon+formatValue(dataValues[i][1],this.tab,true);if(i<len){str+=",";}
str+=this.lineBreak;}
str+="}"+this.lineBreak;return str;};JsonLayout.prototype.ignoresThrowable=function(){return false;};JsonLayout.prototype.toString=function(){return"JsonLayout";};JsonLayout.prototype.getContentType=function(){return"application/json";};log4javascript.JsonLayout=JsonLayout;function HttpPostDataLayout(){this.setKeys();this.customFields=[];this.returnsPostData=true;}
HttpPostDataLayout.prototype=new Layout();HttpPostDataLayout.prototype.allowBatching=function(){return false;};HttpPostDataLayout.prototype.format=function(loggingEvent){var dataValues=this.getDataValues(loggingEvent);var queryBits=[];for(var i=0,len=dataValues.length;i<len;i++){var val=(dataValues[i][1]instanceof Date)?String(dataValues[i][1].getTime()):dataValues[i][1];queryBits.push(urlEncode(dataValues[i][0])+"="+urlEncode(val));}
return queryBits.join("&");};HttpPostDataLayout.prototype.ignoresThrowable=function(loggingEvent){return false;};HttpPostDataLayout.prototype.toString=function(){return"HttpPostDataLayout";};log4javascript.HttpPostDataLayout=HttpPostDataLayout;function formatObjectExpansion(obj,depth,indentation){var objectsExpanded=[];function doFormat(obj,depth,indentation){var i,j,len,childDepth,childIndentation,childLines,expansion,childExpansion;if(!indentation){indentation="";}
function formatString(text){var lines=splitIntoLines(text);for(var j=1,jLen=lines.length;j<jLen;j++){lines[j]=indentation+lines[j];}
return lines.join(newLine);}
if(obj===null){return"null";}else if(typeof obj=="undefined"){return"undefined";}else if(typeof obj=="string"){return formatString(obj);}else if(typeof obj=="object"&&array_contains(objectsExpanded,obj)){try{expansion=toStr(obj);}catch(ex){expansion="Error formatting property. Details: "+getExceptionStringRep(ex);}
return expansion+" [already expanded]";}else if((obj instanceof Array)&&depth>0){objectsExpanded.push(obj);expansion="["+newLine;childDepth=depth-1;childIndentation=indentation+"  ";childLines=[];for(i=0,len=obj.length;i<len;i++){try{childExpansion=doFormat(obj[i],childDepth,childIndentation);childLines.push(childIndentation+childExpansion);}catch(ex){childLines.push(childIndentation+"Error formatting array member. Details: "+
getExceptionStringRep(ex)+"");}}
expansion+=childLines.join(","+newLine)+newLine+indentation+"]";return expansion;}else if(Object.prototype.toString.call(obj)=="[object Date]"){return obj.toString();}else if(typeof obj=="object"&&depth>0){objectsExpanded.push(obj);expansion="{"+newLine;childDepth=depth-1;childIndentation=indentation+"  ";childLines=[];for(i in obj){try{childExpansion=doFormat(obj[i],childDepth,childIndentation);childLines.push(childIndentation+i+": "+childExpansion);}catch(ex){childLines.push(childIndentation+i+": Error formatting property. Details: "+
getExceptionStringRep(ex));}}
expansion+=childLines.join(","+newLine)+newLine+indentation+"}";return expansion;}else{return formatString(toStr(obj));}}
return doFormat(obj,depth,indentation);}
var SimpleDateFormat;(function(){var regex=/('[^']*')|(G+|y+|M+|w+|W+|D+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/;var monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];var dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var TEXT2=0,TEXT3=1,NUMBER=2,YEAR=3,MONTH=4,TIMEZONE=5;var types={G:TEXT2,y:YEAR,M:MONTH,w:NUMBER,W:NUMBER,D:NUMBER,d:NUMBER,F:NUMBER,E:TEXT3,a:TEXT2,H:NUMBER,k:NUMBER,K:NUMBER,h:NUMBER,m:NUMBER,s:NUMBER,S:NUMBER,Z:TIMEZONE};var ONE_DAY=24*60*60*1000;var ONE_WEEK=7*ONE_DAY;var DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK=1;var newDateAtMidnight=function(year,month,day){var d=new Date(year,month,day,0,0,0);d.setMilliseconds(0);return d;};Date.prototype.getDifference=function(date){return this.getTime()-date.getTime();};Date.prototype.isBefore=function(d){return this.getTime()<d.getTime();};Date.prototype.getUTCTime=function(){return Date.UTC(this.getFullYear(),this.getMonth(),this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds(),this.getMilliseconds());};Date.prototype.getTimeSince=function(d){return this.getUTCTime()-d.getUTCTime();};Date.prototype.getPreviousSunday=function(){var midday=new Date(this.getFullYear(),this.getMonth(),this.getDate(),12,0,0);var previousSunday=new Date(midday.getTime()-this.getDay()*ONE_DAY);return newDateAtMidnight(previousSunday.getFullYear(),previousSunday.getMonth(),previousSunday.getDate());};Date.prototype.getWeekInYear=function(minimalDaysInFirstWeek){if(isUndefined(this.minimalDaysInFirstWeek)){minimalDaysInFirstWeek=DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK;}
var previousSunday=this.getPreviousSunday();var startOfYear=newDateAtMidnight(this.getFullYear(),0,1);var numberOfSundays=previousSunday.isBefore(startOfYear)?0:1+Math.floor(previousSunday.getTimeSince(startOfYear)/ONE_WEEK);var numberOfDaysInFirstWeek=7-startOfYear.getDay();var weekInYear=numberOfSundays;if(numberOfDaysInFirstWeek<minimalDaysInFirstWeek){weekInYear--;}
return weekInYear;};Date.prototype.getWeekInMonth=function(minimalDaysInFirstWeek){if(isUndefined(this.minimalDaysInFirstWeek)){minimalDaysInFirstWeek=DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK;}
var previousSunday=this.getPreviousSunday();var startOfMonth=newDateAtMidnight(this.getFullYear(),this.getMonth(),1);var numberOfSundays=previousSunday.isBefore(startOfMonth)?0:1+Math.floor(previousSunday.getTimeSince(startOfMonth)/ONE_WEEK);var numberOfDaysInFirstWeek=7-startOfMonth.getDay();var weekInMonth=numberOfSundays;if(numberOfDaysInFirstWeek>=minimalDaysInFirstWeek){weekInMonth++;}
return weekInMonth;};Date.prototype.getDayInYear=function(){var startOfYear=newDateAtMidnight(this.getFullYear(),0,1);return 1+Math.floor(this.getTimeSince(startOfYear)/ONE_DAY);};SimpleDateFormat=function(formatString){this.formatString=formatString;};SimpleDateFormat.prototype.setMinimalDaysInFirstWeek=function(days){this.minimalDaysInFirstWeek=days;};SimpleDateFormat.prototype.getMinimalDaysInFirstWeek=function(){return isUndefined(this.minimalDaysInFirstWeek)?DEFAULT_MINIMAL_DAYS_IN_FIRST_WEEK:this.minimalDaysInFirstWeek;};var padWithZeroes=function(str,len){while(str.length<len){str="0"+str;}
return str;};var formatText=function(data,numberOfLetters,minLength){return(numberOfLetters>=4)?data:data.substr(0,Math.max(minLength,numberOfLetters));};var formatNumber=function(data,numberOfLetters){var dataString=""+data;return padWithZeroes(dataString,numberOfLetters);};SimpleDateFormat.prototype.format=function(date){var formattedString="";var result;var searchString=this.formatString;while((result=regex.exec(searchString))){var quotedString=result[1];var patternLetters=result[2];var otherLetters=result[3];var otherCharacters=result[4];if(quotedString){if(quotedString=="''"){formattedString+="'";}else{formattedString+=quotedString.substring(1,quotedString.length-1);}}else if(otherLetters){}else if(otherCharacters){formattedString+=otherCharacters;}else if(patternLetters){var patternLetter=patternLetters.charAt(0);var numberOfLetters=patternLetters.length;var rawData="";switch(patternLetter){case"G":rawData="AD";break;case"y":rawData=date.getFullYear();break;case"M":rawData=date.getMonth();break;case"w":rawData=date.getWeekInYear(this.getMinimalDaysInFirstWeek());break;case"W":rawData=date.getWeekInMonth(this.getMinimalDaysInFirstWeek());break;case"D":rawData=date.getDayInYear();break;case"d":rawData=date.getDate();break;case"F":rawData=1+Math.floor((date.getDate()-1)/7);break;case"E":rawData=dayNames[date.getDay()];break;case"a":rawData=(date.getHours()>=12)?"PM":"AM";break;case"H":rawData=date.getHours();break;case"k":rawData=date.getHours()||24;break;case"K":rawData=date.getHours()%12;break;case"h":rawData=(date.getHours()%12)||12;break;case"m":rawData=date.getMinutes();break;case"s":rawData=date.getSeconds();break;case"S":rawData=date.getMilliseconds();break;case"Z":rawData=date.getTimezoneOffset();break;}
switch(types[patternLetter]){case TEXT2:formattedString+=formatText(rawData,numberOfLetters,2);break;case TEXT3:formattedString+=formatText(rawData,numberOfLetters,3);break;case NUMBER:formattedString+=formatNumber(rawData,numberOfLetters);break;case YEAR:if(numberOfLetters<=3){var dataString=""+rawData;formattedString+=dataString.substr(2,2);}else{formattedString+=formatNumber(rawData,numberOfLetters);}
break;case MONTH:if(numberOfLetters>=3){formattedString+=formatText(monthNames[rawData],numberOfLetters,numberOfLetters);}else{formattedString+=formatNumber(rawData+1,numberOfLetters);}
break;case TIMEZONE:var isPositive=(rawData>0);var prefix=isPositive?"-":"+";var absData=Math.abs(rawData);var hours=""+Math.floor(absData/60);hours=padWithZeroes(hours,2);var minutes=""+(absData%60);minutes=padWithZeroes(minutes,2);formattedString+=prefix+hours+minutes;break;}}
searchString=searchString.substr(result.index+result[0].length);}
return formattedString;};})();log4javascript.SimpleDateFormat=SimpleDateFormat;function PatternLayout(pattern){if(pattern){this.pattern=pattern;}else{this.pattern=PatternLayout.DEFAULT_CONVERSION_PATTERN;}
this.customFields=[];}
PatternLayout.TTCC_CONVERSION_PATTERN="%r %p %c - %m%n";PatternLayout.DEFAULT_CONVERSION_PATTERN="%m%n";PatternLayout.ISO8601_DATEFORMAT="yyyy-MM-dd HH:mm:ss,SSS";PatternLayout.DATETIME_DATEFORMAT="dd MMM yyyy HH:mm:ss,SSS";PatternLayout.ABSOLUTETIME_DATEFORMAT="HH:mm:ss,SSS";PatternLayout.prototype=new Layout();PatternLayout.prototype.format=function(loggingEvent){var regex=/%(-?[0-9]+)?(\.?[0-9]+)?([acdfmMnpr%])(\{([^\}]+)\})?|([^%]+)/;var formattedString="";var result;var searchString=this.pattern;while((result=regex.exec(searchString))){var matchedString=result[0];var padding=result[1];var truncation=result[2];var conversionCharacter=result[3];var specifier=result[5];var text=result[6];if(text){formattedString+=""+text;}else{var replacement="";switch(conversionCharacter){case"a":case"m":var depth=0;if(specifier){depth=parseInt(specifier,10);if(isNaN(depth)){handleError("PatternLayout.format: invalid specifier '"+
specifier+"' for conversion character '"+conversionCharacter+"' - should be a number");depth=0;}}
var messages=(conversionCharacter==="a")?loggingEvent.messages[0]:loggingEvent.messages;for(var i=0,len=messages.length;i<len;i++){if(i>0&&(replacement.charAt(replacement.length-1)!==" ")){replacement+=" ";}
if(depth===0){replacement+=messages[i];}else{replacement+=formatObjectExpansion(messages[i],depth);}}
break;case"c":var loggerName=loggingEvent.logger.name;if(specifier){var precision=parseInt(specifier,10);var loggerNameBits=loggingEvent.logger.name.split(".");if(precision>=loggerNameBits.length){replacement=loggerName;}else{replacement=loggerNameBits.slice(loggerNameBits.length-precision).join(".");}}else{replacement=loggerName;}
break;case"d":var dateFormat=PatternLayout.ISO8601_DATEFORMAT;if(specifier){dateFormat=specifier;if(dateFormat=="ISO8601"){dateFormat=PatternLayout.ISO8601_DATEFORMAT;}else if(dateFormat=="ABSOLUTE"){dateFormat=PatternLayout.ABSOLUTETIME_DATEFORMAT;}else if(dateFormat=="DATE"){dateFormat=PatternLayout.DATETIME_DATEFORMAT;}}
replacement=(new SimpleDateFormat(dateFormat)).format(loggingEvent.timeStamp);break;case"f":if(this.hasCustomFields()){var fieldIndex=0;if(specifier){fieldIndex=parseInt(specifier,10);if(isNaN(fieldIndex)){handleError("PatternLayout.format: invalid specifier '"+
specifier+"' for conversion character 'f' - should be a number");}else if(fieldIndex===0){handleError("PatternLayout.format: invalid specifier '"+
specifier+"' for conversion character 'f' - must be greater than zero");}else if(fieldIndex>this.customFields.length){handleError("PatternLayout.format: invalid specifier '"+
specifier+"' for conversion character 'f' - there aren't that many custom fields");}else{fieldIndex=fieldIndex-1;}}
var val=this.customFields[fieldIndex].value;if(typeof val=="function"){val=val(this,loggingEvent);}
replacement=val;}
break;case"n":replacement=newLine;break;case"p":replacement=loggingEvent.level.name;break;case"r":replacement=""+loggingEvent.timeStamp.getDifference(applicationStartDate);break;case"%":replacement="%";break;default:replacement=matchedString;break;}
var l;if(truncation){l=parseInt(truncation.substr(1),10);var strLen=replacement.length;if(l<strLen){replacement=replacement.substring(strLen-l,strLen);}}
if(padding){if(padding.charAt(0)=="-"){l=parseInt(padding.substr(1),10);while(replacement.length<l){replacement+=" ";}}else{l=parseInt(padding,10);while(replacement.length<l){replacement=" "+replacement;}}}
formattedString+=replacement;}
searchString=searchString.substr(result.index+result[0].length);}
return formattedString;};PatternLayout.prototype.ignoresThrowable=function(){return true;};PatternLayout.prototype.toString=function(){return"PatternLayout";};log4javascript.PatternLayout=PatternLayout;var xhrFactory=function(){return new XMLHttpRequest();};var xmlHttpFactories=[xhrFactory,function(){return new ActiveXObject("Msxml2.XMLHTTP");},function(){return new ActiveXObject("Microsoft.XMLHTTP");}];var withCredentialsSupported=false;var getXmlHttp=function(errorHandler){var xmlHttp=null,factory;for(var i=0,len=xmlHttpFactories.length;i<len;i++){factory=xmlHttpFactories[i];try{xmlHttp=factory();withCredentialsSupported=(factory==xhrFactory&&("withCredentials"in xmlHttp));getXmlHttp=factory;return xmlHttp;}catch(e){}}
if(errorHandler){errorHandler();}else{handleError("getXmlHttp: unable to obtain XMLHttpRequest object");}};function isHttpRequestSuccessful(xmlHttp){return isUndefined(xmlHttp.status)||xmlHttp.status===0||(xmlHttp.status>=200&&xmlHttp.status<300)||xmlHttp.status==1223;}
function AjaxAppender(url,withCredentials){var appender=this;var isSupported=true;if(!url){handleError("AjaxAppender: URL must be specified in constructor");isSupported=false;}
var timed=this.defaults.timed;var waitForResponse=this.defaults.waitForResponse;var batchSize=this.defaults.batchSize;var timerInterval=this.defaults.timerInterval;var requestSuccessCallback=this.defaults.requestSuccessCallback;var failCallback=this.defaults.failCallback;var postVarName=this.defaults.postVarName;var sendAllOnUnload=this.defaults.sendAllOnUnload;var contentType=this.defaults.contentType;var sessionId=null;var queuedLoggingEvents=[];var queuedRequests=[];var headers=[];var sending=false;var initialized=false;function checkCanConfigure(configOptionName){if(initialized){handleError("AjaxAppender: configuration option '"+
configOptionName+"' may not be set after the appender has been initialized");return false;}
return true;}
this.getSessionId=function(){return sessionId;};this.setSessionId=function(sessionIdParam){sessionId=extractStringFromParam(sessionIdParam,null);this.layout.setCustomField("sessionid",sessionId);};this.setLayout=function(layoutParam){if(checkCanConfigure("layout")){this.layout=layoutParam;if(sessionId!==null){this.setSessionId(sessionId);}}};this.isTimed=function(){return timed;};this.setTimed=function(timedParam){if(checkCanConfigure("timed")){timed=bool(timedParam);}};this.getTimerInterval=function(){return timerInterval;};this.setTimerInterval=function(timerIntervalParam){if(checkCanConfigure("timerInterval")){timerInterval=extractIntFromParam(timerIntervalParam,timerInterval);}};this.isWaitForResponse=function(){return waitForResponse;};this.setWaitForResponse=function(waitForResponseParam){if(checkCanConfigure("waitForResponse")){waitForResponse=bool(waitForResponseParam);}};this.getBatchSize=function(){return batchSize;};this.setBatchSize=function(batchSizeParam){if(checkCanConfigure("batchSize")){batchSize=extractIntFromParam(batchSizeParam,batchSize);}};this.isSendAllOnUnload=function(){return sendAllOnUnload;};this.setSendAllOnUnload=function(sendAllOnUnloadParam){if(checkCanConfigure("sendAllOnUnload")){sendAllOnUnload=extractBooleanFromParam(sendAllOnUnloadParam,sendAllOnUnload);}};this.setRequestSuccessCallback=function(requestSuccessCallbackParam){requestSuccessCallback=extractFunctionFromParam(requestSuccessCallbackParam,requestSuccessCallback);};this.setFailCallback=function(failCallbackParam){failCallback=extractFunctionFromParam(failCallbackParam,failCallback);};this.getPostVarName=function(){return postVarName;};this.setPostVarName=function(postVarNameParam){if(checkCanConfigure("postVarName")){postVarName=extractStringFromParam(postVarNameParam,postVarName);}};this.getHeaders=function(){return headers;};this.addHeader=function(name,value){if(name.toLowerCase()=="content-type"){contentType=value;}else{headers.push({name:name,value:value});}};function sendAll(){if(isSupported&&enabled){sending=true;var currentRequestBatch;if(waitForResponse){if(queuedRequests.length>0){currentRequestBatch=queuedRequests.shift();sendRequest(preparePostData(currentRequestBatch),sendAll);}else{sending=false;if(timed){scheduleSending();}}}else{while((currentRequestBatch=queuedRequests.shift())){sendRequest(preparePostData(currentRequestBatch));}
sending=false;if(timed){scheduleSending();}}}}
this.sendAll=sendAll;function sendAllRemaining(){var sendingAnything=false;if(isSupported&&enabled){var actualBatchSize=appender.getLayout().allowBatching()?batchSize:1;var currentLoggingEvent;var batchedLoggingEvents=[];while((currentLoggingEvent=queuedLoggingEvents.shift())){batchedLoggingEvents.push(currentLoggingEvent);if(queuedLoggingEvents.length>=actualBatchSize){queuedRequests.push(batchedLoggingEvents);batchedLoggingEvents=[];}}
if(batchedLoggingEvents.length>0){queuedRequests.push(batchedLoggingEvents);}
sendingAnything=(queuedRequests.length>0);waitForResponse=false;timed=false;sendAll();}
return sendingAnything;}
this.sendAllRemaining=sendAllRemaining;function preparePostData(batchedLoggingEvents){var formattedMessages=[];var currentLoggingEvent;var postData="";while((currentLoggingEvent=batchedLoggingEvents.shift())){formattedMessages.push(appender.getLayout().formatWithException(currentLoggingEvent));}
if(batchedLoggingEvents.length==1){postData=formattedMessages.join("");}else{postData=appender.getLayout().batchHeader+
formattedMessages.join(appender.getLayout().batchSeparator)+
appender.getLayout().batchFooter;}
if(contentType==appender.defaults.contentType){postData=appender.getLayout().returnsPostData?postData:urlEncode(postVarName)+"="+urlEncode(postData);if(postData.length>0){postData+="&";}
postData+="layout="+urlEncode(appender.getLayout().toString());}
return postData;}
function scheduleSending(){window.setTimeout(sendAll,timerInterval);}
function xmlHttpErrorHandler(){var msg="AjaxAppender: could not create XMLHttpRequest object. AjaxAppender disabled";handleError(msg);isSupported=false;if(failCallback){failCallback(msg);}}
function sendRequest(postData,successCallback){try{var xmlHttp=getXmlHttp(xmlHttpErrorHandler);if(isSupported){if(withCredentials&&withCredentialsSupported){xmlHttp.withCredentials=true;}
xmlHttp.onreadystatechange=function(){if(xmlHttp.readyState==4){if(isHttpRequestSuccessful(xmlHttp)){if(requestSuccessCallback){requestSuccessCallback(xmlHttp);}
if(successCallback){successCallback(xmlHttp);}}else{var msg="AjaxAppender.append: XMLHttpRequest request to URL "+
url+" returned status code "+xmlHttp.status;handleError(msg);if(failCallback){failCallback(msg);}}
xmlHttp.onreadystatechange=emptyFunction;xmlHttp=null;}};xmlHttp.open("POST",url,true);try{for(var i=0,header;header=headers[i++];){xmlHttp.setRequestHeader(header.name,header.value);}
xmlHttp.setRequestHeader("Content-Type",contentType);}catch(headerEx){var msg="AjaxAppender.append: your browser's XMLHttpRequest implementation"+" does not support setRequestHeader, therefore cannot post data. AjaxAppender disabled";handleError(msg);isSupported=false;if(failCallback){failCallback(msg);}
return;}
xmlHttp.send(postData);}}catch(ex){var errMsg="AjaxAppender.append: error sending log message to "+url;handleError(errMsg,ex);isSupported=false;if(failCallback){failCallback(errMsg+". Details: "+getExceptionStringRep(ex));}}}
this.append=function(loggingEvent){if(isSupported){if(!initialized){init();}
queuedLoggingEvents.push(loggingEvent);var actualBatchSize=this.getLayout().allowBatching()?batchSize:1;if(queuedLoggingEvents.length>=actualBatchSize){var currentLoggingEvent;var batchedLoggingEvents=[];while((currentLoggingEvent=queuedLoggingEvents.shift())){batchedLoggingEvents.push(currentLoggingEvent);}
queuedRequests.push(batchedLoggingEvents);if(!timed&&(!waitForResponse||(waitForResponse&&!sending))){sendAll();}}}};function init(){initialized=true;if(sendAllOnUnload){var oldBeforeUnload=window.onbeforeunload;window.onbeforeunload=function(){if(oldBeforeUnload){oldBeforeUnload();}
if(sendAllRemaining()){return"Sending log messages";}};}
if(timed){scheduleSending();}}}
AjaxAppender.prototype=new Appender();AjaxAppender.prototype.defaults={waitForResponse:false,timed:false,timerInterval:1000,batchSize:1,sendAllOnUnload:false,requestSuccessCallback:null,failCallback:null,postVarName:"data",contentType:"application/x-www-form-urlencoded"};AjaxAppender.prototype.layout=new HttpPostDataLayout();AjaxAppender.prototype.toString=function(){return"AjaxAppender";};log4javascript.AjaxAppender=AjaxAppender;log4javascript.setDocumentReady=function(){pageLoaded=true;log4javascript.dispatchEvent("load",{});};if(window.addEventListener){window.addEventListener("load",log4javascript.setDocumentReady,false);}else if(window.attachEvent){window.attachEvent("onload",log4javascript.setDocumentReady);}else{var oldOnload=window.onload;if(typeof window.onload!="function"){window.onload=log4javascript.setDocumentReady;}else{window.onload=function(evt){if(oldOnload){oldOnload(evt);}
log4javascript.setDocumentReady();};}}
window.log4javascript=log4javascript;return log4javascript;})();
;"undefined"!=typeof _&&_.mixin({isKey:function(a,b){b=b.toUpperCase();var c={TAB:9,ENTER:13,LEFT:37,UP:38,RIGHT:39,DOWN:40,SPACE:32,ESC:27,SHIFT:16,BACKSPACE:8,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMBER_0:48,NUMBER_1:49,NUMBER_2:50,NUMBER_3:51,NUMBER_4:52,NUMBER_5:53,NUMBER_6:54,NUMBER_7:55,NUMBER_8:56,NUMBER_9:57,ANDROID_SOFTWARE_KEYBOARD:229},d=function(a){return a>=c.A&&a<=c.Z},e=function(a){return a>=c.NUMBER_0&&a<=c.NUMBER_9};return c[b]===a||("LETTER"===b?d(a):"NUMBER"===b?e(a):!("ALPHANUMERIC"!==b||!d(a)&&!e(a)))},addEventListener:function(a,b,c,d,e){"undefined"!=typeof a&&(_.hasEventListener(a,b,c)||a.on(b+"."+c,d,e))},hasEventListener:function(a,b,c){if("undefined"==typeof a)return!1;if(!a.length)return!1;var d=$._data(a[0],"events");if(!d)return!1;if(d[b]){var e=d[b];if(!c)return!0;for(var f=0;f<e.length;f++){var g=e[f];if(g.type===b&&g.namespace===c)return!0}}return!1},parseJSONStr:function(a,b){var c;try{c=JSON.parse(a)}catch(a){return!1}b(c)}});;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalheader"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n  <div class=\"lv-gh-skip-content\"><a href=\"";
  if (helper = helpers.skipLocation) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.skipLocation); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Skip to content</a></div>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"lv-gh-menu lv-gh-item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.lockup), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n              <a href=\"#menu\" aria-label=\"open global navigation\" aria-expanded=\"false\">\n                <div class=\"visible-sm visible-md visible-lg\">\n                  <span aria-hidden=\"true\" class=\"glyphicon-cb cb-icon-icn_arrow-down\"></span><span aria-hidden=\"true\" class=\"glyphicon-cb cb-icon-icn_close\"></span>\n                </div>\n                <div class=\"visible-xs\">\n                  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.lockup), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n              </a>\n            </div>\n            ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "lv-full";
  }

function program8(depth0,data) {
  
  
  return "\n                    <span aria-hidden=\"true\" class=\"glyphicon-cb cb-icon-Acorn\"></span><span aria-hidden=\"true\" class=\"glyphicon-cb cb-icon-icn_close\"></span>\n                  ";
  }

function program10(depth0,data) {
  
  
  return "\n                    <div class=\"cb-logo-white\"></div><span aria-hidden=\"true\" class=\"glyphicon-cb cb-icon-icn_close\"></span>\n                  ";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <div class=\"lv-gh-item lv-gh-lockup lv-gh-lockup-id-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.lockup)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                  <h2>\n                    <a class=\"\n                      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lockup)),stack1 == null || stack1 === false ? stack1 : stack1.logo), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                      lv-logo-id-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.lockup)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" href=\"/?navId=";
  if (helper = helpers.siteCode) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.siteCode); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-lu\">\n                      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lockup)),stack1 == null || stack1 === false ? stack1 : stack1.logo), {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </a>\n                  </h2>\n                </div>\n              ";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "lv-lockup-logo cb";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lockup)),stack1 == null || stack1 === false ? stack1 : stack1.property), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.lockup)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-e";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.lockup)),stack1 == null || stack1 === false ? stack1 : stack1.property)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <span class=\"lv-lockup-name\" aria-hidden=\"true\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.lockup)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                      ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <span class=\"lv-lockup-name\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.lockup)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                      ";
  return buffer;
  }

function program20(depth0,data) {
  
  
  return "\n              <!-- Start Login -->\n              <div class=\"lv-gh-login lv-gh-control\"></div>\n              <!-- End Login -->\n              ";
  }

function program22(depth0,data) {
  
  
  return "\n              <!-- Start Search -->\n              <div id=\"gh-search-form\" class=\"lv-gh-flyout lv-gh-search\" aria-hidden=\"true\" aria-expanded=\"false\" aria-label=\"Search Form\"></div>\n              <div class=\"lv-gh-flyout-search lv-gh-control\"></div>\n              <div class=\"lv-gh-search lv-gh-control\"></div>\n              <!-- End Search -->\n              \n              ";
  }

function program24(depth0,data) {
  
  
  return "\n    <div class=\"lv-gh-panel lv-gh-nav\" aria-expanded=\"false\" role=\"navigation\" aria-label=\"Global Navigation\"></div>\n  ";
  }

function program26(depth0,data) {
  
  
  return "\n  <!-- Start Login -->\n    <div class=\"lv-gh-panel lv-gh-login\" aria-expanded=\"false\" role=\"dialog\" aria-label=\"Login Panel\"></div>\n  <!-- End Login -->\n  ";
  }

function program28(depth0,data) {
  
  
  return "\n  <!-- Start Search -->\n    <div class=\"lv-gh-panel lv-gh-search\" aria-expanded=\"false\" role=\"dialog\" aria-label=\"Search Panel\"></div>\n  <!-- End Search -->\n  ";
  }

  buffer += "<div class=\"lv-globalHeader-widget\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.skipLocation), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"lv-gh-mobile visible-xs\"></div>\n  <div class=\"lv-gh-bar lv-gh-type-";
  if (helper = helpers.siteType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.siteType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"lv-gh-container\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useGlobalNavigation), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <div class=\"lv-gh-title\">\n              <div class=\"lv-gh-logo lv-gh-item\">\n                <a href=\"//www.collegeboard.org/?navId=";
  if (helper = helpers.siteCode) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.siteCode); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-cb\" aria-label=\"The College Board\"><span aria-hidden=\"true\">The College Board</span></a>\n              </div>\n              ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.lockup), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div><!-- End Title -->\n            <div class=\"lv-gh-controls\">\n              ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useLoginWidget), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n              ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useSearchWidget), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div><!-- End Controls -->\n          </div><!-- End Global Header Container -->\n        </div><!-- End Column -->\n      </div><!-- End Row -->\n    </div><!-- End Container -->\n  </div>\n\n  <!-- Global Navigation -->\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useGlobalNavigation), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useLoginWidget), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useSearchWidget), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalheader-warning"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"lv-globalheader-warning\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <p>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " module was not included in this bundle.</p>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalnavigation"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div \n        role=\"navigation\"\n        aria-label=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.description), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n        class=\"\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.layout), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        lv-nav-category lv-nav-category-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <div class=\"lv-nav-category-container\">\n          <ul class=\"lv-category-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.links), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </ul>\n        </div>\n      </div>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.layout), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

function program4(depth0,data) {
  
  
  return "The College Board Websites";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        col-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-";
  if (helper = helpers.size) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.size); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n        col-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-offset-";
  if (helper = helpers.offset) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.offset); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.children), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.url), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.children), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n              </li>\n            ";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "class=\"lv-link-parent\"";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                  <a class=\"\n                    lv-link-type-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " \n                    lv-link-id-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " \n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.icon), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.target), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1);
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tracking), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.logo), {hash:{},inverse:self.program(22, program22, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                  </a>\n                ";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "lv-icon lv-icon-";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1);
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "target=\"";
  if (helper = helpers.target) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.target); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "?navId=";
  if (helper = helpers.tracking) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tracking); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1);
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                      <div class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.logo), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><span class=\"lv-link-name\" aria-label=\"hidden\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></div>\n                    ";
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "lv-logo cb";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.property), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-e";
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "-";
  if (helper = helpers.property) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.property); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1);
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.glyph), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"lv-link-name\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n                    ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<span class=\"cb-glyph-xs cb-glyph-circular cb-icon-icn_";
  if (helper = helpers.glyph) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.glyph); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" aria-hidden=\"true\"></span> ";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <!--<div class=\"lv-link-group lv-group-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.children)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">-->\n                  <ul class=\"lv-link-group lv-group-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.children)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.children)),stack1 == null || stack1 === false ? stack1 : stack1.links), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                  </ul>\n                <!--</div>-->\n              ";
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                      <li>\n                        <a class=\"\n                          lv-link-type-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " \n                          lv-link-id-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " \n                          ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.logo), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                          ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.icon), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n                          ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.glyph), {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                          ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.target), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                          href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1);
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tracking), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                          ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.glyph), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"lv-link-name\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n                        </a>\n                      </li>\n                    ";
  return buffer;
  }
function program27(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "aria-label=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['break']), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n          <div class=\"clearfix visible-";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-block\"></div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"container lv-nav-container\">\n  <div class=\"row lv-nav-links\">\n    ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.navigation)),stack1 == null || stack1 === false ? stack1 : stack1.categories), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalheader-login"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n  <div class=\"lv-login-desktop hidden-xs hidden-sm\">\n    <div class=\"col-md-6 offset-md-5 lv-gh-login-details\">\n      <div class=\"col-md-10 col-md-pull-2 col-lg-8 pull-right lv-gh-login-content\">\n        <div class=\"lv-gh-login-icon lv-gh-login-controls\">\n          <ul>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),stack1 == null || stack1 === false ? stack1 : stack1.account)),stack1 == null || stack1 === false ? stack1 : stack1.isProfessional), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),stack1 == null || stack1 === false ? stack1 : stack1.account)),stack1 == null || stack1 === false ? stack1 : stack1.isStudent), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <li>\n              <form accept-charset=\"utf-8\" method=\"post\" action=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.endpoints)),stack1 == null || stack1 === false ? stack1 : stack1.logout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__SignOutForm\">\n                <input type=\"hidden\" name=\"userType\" value=\"S\" />\n                <input type=\"hidden\" name=\"DURL\" value=\"";
  if (helper = helpers.redirectUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n                <input type=\"hidden\" name=\"appId\" value=\"";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n                <input type=\"hidden\" name=\"formState\" value=\"1\" />\n                <button class=\"lv-btn-link\" type=\"submit\">Sign Out</button>\n              </form>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-6 lv-gh-login-links\">\n      <div class=\"col-md-8 col-md-offset-2 lv-gh-login-content\">\n        <ul>\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),stack1 == null || stack1 === false ? stack1 : stack1.account)),stack1 == null || stack1 === false ? stack1 : stack1.isProfessional), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),stack1 == null || stack1 === false ? stack1 : stack1.account)),stack1 == null || stack1 === false ? stack1 : stack1.isStudent), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n      </div>\n    </div>\n  </div>\n  <!-- Mobile / Tablet -->\n  <div class=\"lv-login-mobile hidden-md hidden-lg\">\n    <div class=\"col-xs-12 col-sm-12\">\n      <ul>\n        <li class=\"lv-gh-login-icon\">My Account</li>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),stack1 == null || stack1 === false ? stack1 : stack1.account)),stack1 == null || stack1 === false ? stack1 : stack1.isProfessional), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),stack1 == null || stack1 === false ? stack1 : stack1.account)),stack1 == null || stack1 === false ? stack1 : stack1.isStudent), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n      <form accept-charset=\"utf-8\" method=\"post\" action=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.endpoints)),stack1 == null || stack1 === false ? stack1 : stack1.logout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__SignOutForm\">\n        <input type=\"hidden\" name=\"userType\" value=\"S\" />\n        <input type=\"hidden\" name=\"DURL\" value=\"";
  if (helper = helpers.redirectUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n        <input type=\"hidden\" name=\"appId\" value=\"";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n        <input type=\"hidden\" name=\"formState\" value=\"1\" />\n        <button class=\"lv-btn-link\" type=\"submit\"><span class=\"glyphicon cb-icon-icn_new-window\"></span> Sign Out</button>\n      </form>\n    </div>\n  </div>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.professional)),stack1 == null || stack1 === false ? stack1 : stack1.controls), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n              <li><a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tracking), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n              ";
  return buffer;
  }
function program4(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.trackingURL) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.trackingURL); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

function program6(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.student)),stack1 == null || stack1 === false ? stack1 : stack1.controls), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.professional)),stack1 == null || stack1 === false ? stack1 : stack1.links), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <li><a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tracking), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n            ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.student)),stack1 == null || stack1 === false ? stack1 : stack1.links), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.professional)),stack1 == null || stack1 === false ? stack1 : stack1.all), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n          <li><a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tracking), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n          ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.student)),stack1 == null || stack1 === false ? stack1 : stack1.all), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n          <li><a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tracking), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.icon), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n          ";
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<span class=\"glyphicon ";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span> ";
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <div class=\"lv-gh-login-loggedout\">\n      <!-- Mobile -->\n      <div class=\"visible-xs\">\n        <div class=\"lv-gh-login-signin\">\n          <div class=\"col-xs-12\">\n            <h2>Sign In</h2>\n            <form \n              autocomplete=\"off\" \n              accept-charset=\"utf-8\" \n              method=\"post\" \n              action=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.endpoints)),stack1 == null || stack1 === false ? stack1 : stack1.authentication)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n              name=\"SignInForm\" \n              id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__SignInForm\"\n              role=\"form\">\n              <input type=\"hidden\" name=\"DURL\" value=\"";
  if (helper = helpers.redirectUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n              <input type=\"hidden\" name=\"appId\" value=\"";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n              <input type=\"hidden\" name=\"formState\" value=\"1\" />\n              <div class=\"form-group\">\n                <label for=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__username_mobile\">Username</label>\n                <input type=\"text\" name=\"username\" id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__username_mobile\" class=\"form-control\" />\n              </div>\n              <div class=\"form-group\">\n                <label for=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__password_mobile\">Password</label>\n                <input type=\"password\" name=\"password\" id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__password_mobile\" class=\"form-control\" />\n                <p class=\"lv-content-recover\">Forgot <a href=\"https://account.collegeboard.org/login/forgotUsername?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">username</a> or <a href=\"https://account.collegeboard.org/login/forgotPassword?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">password?</a></p>\n              </div>\n              <div class=\"form-group\">\n                <button name=\"sign-in\" class=\"btn btn-primary\" type=\"submit\">Sign In</button>\n                <p class=\"lv-content-signup\">Don't have an account? <a href=\"https://account.collegeboard.org/login/signUp?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Sign up</a></p>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n      <!-- Tablet / Desktop / Oversize -->\n      <div class=\"visible-sm visible-md visible-lg\">\n        <div class=\"lv-gh-login-signup col-sm-4 col-md-5 col-lg-6\">\n          <div class=\"col-sm-pull-0 col-sm-12 col-md-pull-1 col-md-8 col-lg-pull-1 col-lg-5 pull-right\" style=\"text-align: center;\">\n            <h2>Don't have an account?</h2>\n            <a class=\"btn btn-primary\" href=\"https://account.collegeboard.org/login/signUp?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Sign Up</a>\n          </div>\n        </div>\n        <div class=\"lv-gh-login-signin col-sm-8 col-md-7 col-lg-6\">\n          <div class=\"col-sm-offset-0 col-sm-12 col-md-offset-1 col-md-11 col-lg-offset-1 col-lg-11\">\n            <div class=\"col-md-12 col-lg-12\">\n              <form \n                autocomplete=\"off\" \n                accept-charset=\"utf-8\" \n                method=\"post\" \n                action=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.endpoints)),stack1 == null || stack1 === false ? stack1 : stack1.authentication)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n                name=\"SignInForm\" \n                id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__SignInForm\"\n                role=\"form\">\n                <input type=\"hidden\" name=\"DURL\" value=\"";
  if (helper = helpers.redirectUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n                <input type=\"hidden\" name=\"appId\" value=\"";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n                <input type=\"hidden\" name=\"formState\" value=\"1\" />\n                <div class=\"form-group\">\n                  <label for=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__username\">Username</label>\n                  <input type=\"text\" name=\"username\" id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__username\" class=\"form-control\" />\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__password\">Password</label>\n                  <input type=\"password\" name=\"password\" id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__password\" class=\"form-control\" />\n                  <button name=\"sign-in\" class=\"btn btn-primary\" type=\"submit\">Sign In</button>\n                </div>\n                <div class=\"form-group\">\n                  <p class=\"lv-content-recover\">Forgot <a href=\"https://account.collegeboard.org/login/forgotUsername?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">username</a> or <a href=\"https://account.collegeboard.org/login/forgotPassword?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">password?</a></p>\n                </div>\n              </form>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ";
  return buffer;
  }

  buffer += "<div class=\"lv-gh-login lv-gh-login-state-";
  if (helper = helpers.isLoggedIn) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.isLoggedIn); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.isLoggedIn), {hash:{},inverse:self.program(22, program22, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalheader-login-control"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.status)),stack1 == null || stack1 === false ? stack1 : stack1.userInfo)),stack1 == null || stack1 === false ? stack1 : stack1.firstName), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.status)),stack1 == null || stack1 === false ? stack1 : stack1.messageInfo)),stack1 == null || stack1 === false ? stack1 : stack1.welcome)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.status)),stack1 == null || stack1 === false ? stack1 : stack1.userInfo)),stack1 == null || stack1 === false ? stack1 : stack1.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "Retrieving Information...";
  }

function program6(depth0,data) {
  
  
  return "Sign In";
  }

function program8(depth0,data) {
  
  
  return "\n          <span class=\"glyphicon-cb cb-icon-icn_authenticated\"></span>\n\n        ";
  }

function program10(depth0,data) {
  
  
  return "\n          <span class=\"glyphicon-cb cb-icon-icn_signin\"></span>\n        ";
  }

  buffer += "<div class=\"lv-gh-login-control lv-gh-login-state-";
  if (helper = helpers.isLoggedIn) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.isLoggedIn); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n  <a href=\"#login\" aria-expanded=\"false\" aria-label=\"open login panel\">\n    <div class=\"lv-gh-login-status\">\n      <div class=\"hidden-xs\">\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.status)),stack1 == null || stack1 === false ? stack1 : stack1.loginInfo)),stack1 == null || stack1 === false ? stack1 : stack1.isLoggedIn), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <span class=\"lv-gh-login-icon\"></span>\n      </div>\n      <div class=\"hidden-sm hidden-md hidden-lg\">\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.status)),stack1 == null || stack1 === false ? stack1 : stack1.loginInfo)),stack1 == null || stack1 === false ? stack1 : stack1.isLoggedIn), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n    </div>\n    <div class=\"lv-gh-login-close\">\n      <span class=\"glyphicon-cb cb-icon-icn_close\"></span>\n    </div>\n  </a>\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalheader-login-panel"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"container lv-login-container\">\n  <div class=\"row\">\n    <div class=\"lv-globalheader-identity-widget\"></div> \n  </div>\n</div>";
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalheader-search"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <input type=\"hidden\" name=\"x1\" value=\"u4\" />\n        <input type=\"hidden\" name=\"q1\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.uniqueSearch)),stack1 == null || stack1 === false ? stack1 : stack1.facet)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n        <input type=\"hidden\" name=\"x1\" value=\"t4\" />\n      ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <input type=\"hidden\" name=\"logo\" value=\"";
  if (helper = helpers.logo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.logo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n      ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <input type=\"hidden\" name=\"searchType\" value=\"";
  if (helper = helpers.searchType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.searchType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n      ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "aria-controls=\"suggestions-for-search-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" aria-haspopup=\"true\"";
  return buffer;
  }

  buffer += "<div class=\"lv-search-widget lv-search-widget-id-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n  <div class=\"lv-search-form-container\">\n    <form action=\"";
  if (helper = helpers.searchURL) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.searchURL); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"get\">\n      <input type=\"hidden\" name=\"tp\" value=\"usearch\" />\n      <input type=\"hidden\" name=\"x\" value=\"15\" />\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.uniqueSearch), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <input type=\"hidden\" name=\"y\" value=\"13\" />\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.logo), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.searchType), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n      <div class=\"input-group\">\n        <input class=\"form-control\" type=\"text\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useSuggestionWidget), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-search=\"search\" name=\"word\" id=\"word-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" autocomplete=\"off\" title=\"Type for search\"/>\n        <span class=\"input-group-btn\">\n          <a href=\"#search\">\n            <span aria-hidden=\"true\" class=\"glyphicon-cb cb-icon-icn_search\"></span>\n          </a>\n        </span>\n      </div>\n    </form>\n  </div>\n  <div class=\"lv-suggestions\"></div>\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalheader-search-control"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"lv-gh-search-control visible-xs\">\n  <a href=\"#search\" aria-controls=\"gh-search-form\" aria-expanded=\"false\" aria-label=\"open search form\">\n    <div class=\"lv-gh-search-icon\">\n      <span class=\"glyphicon-cb cb-icon-icn_search lv-gh-search-";
  if (helper = helpers.state) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.state); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span>\n    </div>\n    <div class=\"lv-gh-search-close\">\n      <span class=\"glyphicon-cb cb-icon-icn_close\"></span>\n    </div>\n  </a>\n</div>\n";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalheader-search-flyout"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"lv-gh-search-widget\"></div>";
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalheader-search-flyout-control"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"lv-gh-search-control visible-sm visible-md visible-lg\">\n  <a href=\"#search\" aria-controls=\"gh-search-form\" aria-expanded=\"false\" aria-label=\"open search form\"><div class=\"lv-gh-search-icon\"><span class=\"glyphicon-cb cb-icon-icn_search lv-gh-search-";
  if (helper = helpers.state) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.state); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span></div></a>\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalheader-search-panel"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"container lv-search-container\">\n  <div class=\"row\">\n    <div class=\"lv-globalheader-search-widget\"></div> \n  </div>\n</div>";
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["search"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <input type=\"hidden\" name=\"logo\" value=\"";
  if (helper = helpers.logo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.logo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <input type=\"hidden\" name=\"searchType\" value=\"";
  if (helper = helpers.searchType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.searchType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "aria-controls=\"suggestions-for-search-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" aria-haspopup=\"true\" aria-activedescendant=\"\"";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "value=\"";
  if (helper = helpers.startValue) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.startValue); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

  buffer += "<div class=\"lv-search-widget lv-search-widget-id-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n  <form action=\"";
  if (helper = helpers.searchURL) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.searchURL); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"get\">\r\n    <input type=\"hidden\" name=\"tp\" value=\"usearch\" />\r\n    <input type=\"hidden\" name=\"x\" value=\"15\" />\r\n    <input type=\"hidden\" name=\"x1\" value=\"t4\" />\r\n    <input type=\"hidden\" name=\"y\" value=\"13\" />\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.logo), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.searchType), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    <div class=\"input-group\">\r\n      <input class=\"form-control\" type=\"text\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useSuggestionWidget), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-search=\"search\" name=\"word\" id=\"word-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" autocomplete=\"off\" placeholder=\"Search\" title=\"Search\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.startValue), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\r\n      <span class=\"input-group-btn\">\r\n        <button class=\"btn btn-primary\" type=\"submit\" title=\"Search\">Search</button>\r\n      </span>\r\n    </div>\r\n  </form>\r\n  <div class=\"lv-suggestions\"></div>\r\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["search-college"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <input type=\"hidden\" name=\"logo\" value=\"";
  if (helper = helpers.logo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.logo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "aria-controls=\"suggestions-for-search-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" aria-haspopup=\"true\" aria-activedescendant=\"\"";
  return buffer;
  }

  buffer += "<div class=\"lv-search-widget lv-search-widget-id-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " lv-search-type-college\">\r\n  <form action=\"";
  if (helper = helpers.searchURL) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.searchURL); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" method=\"get\">\r\n    <input type=\"hidden\" name=\"tp\" value=\"bf\" />\r\n    <input type=\"hidden\" name=\"bf_cat\" value=\"college\" />\r\n    <input type=\"hidden\" name=\"searchType\" value=\"site_qfs\" />\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.logo), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      <label for=\"word-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">College Search</label>\r\n      <div class=\"input-group\">\r\n        <input class=\"form-control\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useSuggestionWidget), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-search=\"search\" type=\"text\" name=\"q\" id=\"word-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" autocomplete=\"off\" placeholder=\"Search by college name\" title=\"Type for search\" />\r\n        <span class=\"input-group-btn\">\r\n          <button class=\"btn\" type=\"submit\" title=\"Search\"><span class=\"glyphicon glyphicon-search\"></span><span aria-hidden=\"true\" class=\"sr-only\">Search</span></button>\r\n        </span>\r\n      </div>\r\n  </form>\r\n  <div class=\"lv-suggestions\"></div>\r\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["suggestion"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n  <div class=\"lv-suggestions\">\r\n    <ul ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.scrollable), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.suggestions), {hash:{},inverse:self.noop,fn:self.programWithDepth(4, program4, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </ul>\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useStatus), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  </div>\r\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "class=\"lv-scrollable\"";
  }

function program4(depth0,data,depth1) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <li>\r\n          <a\r\n            id=\"suggestion-item-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\r\n            data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n            data-name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" \r\n            href=\"#suggestion-"
    + escapeExpression(((stack1 = (depth1 && depth1.namespace)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n            ";
  if (helper = helpers.output) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.output); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          </a>\r\n        </li>\r\n      ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <div class=\"lv-status\">There are ";
  if (helper = helpers.results) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.results); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " result(s)</div>\r\n    ";
  return buffer;
  }

  buffer += "<div class=\"lv-suggestion-widget\" id=\"suggestions-for-search-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.widgets)),stack1 == null || stack1 === false ? stack1 : stack1.search)),stack1 == null || stack1 === false ? stack1 : stack1.context)),stack1 == null || stack1 === false ? stack1 : stack1.cid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" role=\"search\" aria-label=\"suggested search results for your search term\" aria-haspopup=\"true\" aria-live=\"polite\">\r\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.suggestions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["suggestion-college"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n  <div class=\"lv-suggestions\">\r\n    <ul ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.scrollable), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.suggestions), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </ul>\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useStatus), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  </div>\r\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "class=\"lv-scrollable\"";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <li>\r\n          <a\r\n            id=\"suggestion-item-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\r\n            data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n            data-diCode=\"";
  if (helper = helpers.diCode) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.diCode); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n            data-name=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n            data-schoolUrl=\"";
  if (helper = helpers.schoolUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.schoolUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n            data-netPriceCalculatorUrl=\"";
  if (helper = helpers.netPriceCalculatorUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.netPriceCalculatorUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n            data-state=\"{[state}}\"\r\n            href=\"#suggestion-";
  if (helper = helpers.namespace) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.namespace); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n            ";
  if (helper = helpers.output) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.output); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          </a>\r\n        </li>\r\n      ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <div class=\"lv-status\">There are ";
  if (helper = helpers.results) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.results); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " result(s)</div>\r\n    ";
  return buffer;
  }

  buffer += "<div class=\"lv-suggestion-widget\" id=\"suggestions-for-search-"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.widgets)),stack1 == null || stack1 === false ? stack1 : stack1.search)),stack1 == null || stack1 === false ? stack1 : stack1.context)),stack1 == null || stack1 === false ? stack1 : stack1.cid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" role=\"search\" aria-label=\"suggested search results for college search term\" aria-haspopup=\"true\" aria-live=\"polite\">\r\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.suggestions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["globalfooter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n  <div class=\"lv-controls\">\n    <a class=\"lv-back-to-top\" href=\"#\" aria-label=\"Back to top of page\">Top <span aria-hidden=\"true\" class=\"cb-icon-icn_arrow-up\"></span></a>\n  </div>\n  ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.categories)),stack1 == null || stack1 === false ? stack1 : stack1.programs)),stack1 == null || stack1 === false ? stack1 : stack1.columns), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <div class=\"col-xs-6 col-sm-12 col-md-12 col-lg-12\">\n                <ul>\n                  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.links), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n              </div>\n            ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <li><a href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.target), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.label), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n                  ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "target=\"";
  if (helper = helpers.target) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.target); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

function program8(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program10(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

function program12(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n              <li><a href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.target), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.label), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></li>\n            ";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n              <li>\n                <a ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.icon), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.target), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.glyph), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.label), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.children), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n              </li>\n            ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "class=\"lv-icon lv-icon-";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<span class=\"cb-icon-icn_";
  if (helper = helpers.glyph) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.glyph); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span>";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                  <ul class=\"lv-link-group lv-group-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.children)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.children)),stack1 == null || stack1 === false ? stack1 : stack1.links), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                  </ul>\n                  <div class=\"clearfix\"></div>\n                ";
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                      <li><a aria-label=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.target), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><span class=\"cb-icon-icn_";
  if (helper = helpers.glyph) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.glyph); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span> <span aria-hidden=\"true\" class=\"lv-link-name\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></a></li>\n                    ";
  return buffer;
  }

  buffer += "<div class=\"lv-globalfooter-widget\" role=\"contentinfo\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useControls), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"lv-navigation\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"lv-column col-xs-12 col-sm-4 col-md-4 col-lg-3\">\n          <div class=\"lv-heading\">\n            <h2>Programs</h2>\n          </div>\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.categories)),stack1 == null || stack1 === false ? stack1 : stack1.programs)),stack1 == null || stack1 === false ? stack1 : stack1.columns), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"lv-column col-xs-12 col-sm-4 col-md-4 col-lg-3\">\n          <div class=\"lv-heading\">\n            <h2>The College Board</h2>\n          </div>\n          <ul>\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.categories)),stack1 == null || stack1 === false ? stack1 : stack1.organization)),stack1 == null || stack1 === false ? stack1 : stack1.links), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </ul>\n        </div>\n        <div class=\"lv-column col-xs-12 col-sm-4 col-md-4 col-lg-push-3 col-lg-3\">\n          <div class=\"lv-heading\"></div>\n          <ul>\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.categories)),stack1 == null || stack1 === false ? stack1 : stack1.extra)),stack1 == null || stack1 === false ? stack1 : stack1.links), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>        \n      </div>\n    </div>\n  </div>\n  <div class=\"lv-about\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"lv-organization\">\n            <p class=\"visible-lg\">&copy; ";
  if (helper = helpers.year) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.year); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " The College Board &#124; PSAT/NMSQT is a registered trademark of the College Board and National Merit Scholarship Corporation.</p>\n            <p class=\"visible-md visible-sm\">&copy; ";
  if (helper = helpers.year) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.year); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " The College Board <br /> PSAT/NMSQT is a registered trademark of the College Board and National Merit Scholarship Corporation.</p>\n            <p class=\"visible-xs\">&copy; ";
  if (helper = helpers.year) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.year); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " The College Board <br /> PSAT/NMSQT is a registered trademark of the College Board and National Merit Scholarship Corporation.</p>\n          </div>\n          <div class=\"lv-vendor\">\n            <div id=\"1004457a-3559-4a1d-ba25-ec2827b7ab0c\">\n              <script type=\"text/javascript\" src=\"//privacy-policy.truste.com/privacy-seal/Collegeboard-com/asc?rid=1004457a-3559-4a1d-ba25-ec2827b7ab0c\"></script>\n                <div class=\"hidden-xs\">\n                  <!--<a href=\"//privacy.truste.com/privacy-seal/Collegeboard-com/validation?rid=e4698ef1-adf3-4af0-9f86-9574bcb0b023\" title=\"TRUSTe online privacy certification\" target=\"_blank\">-->\n                    <!--<img src=\"//privacy-policy.truste.com/privacy-seal/Collegeboard-com/seal?rid=d348c952-c5af-45d7-9df4-ebaf109c7809\" alt=\"TRUSTe online privacy certification\" width=\"142\" height=\"45\"/>-->\n                  <!--</a>-->\n                  <a href=\"//privacy.truste.com/privacy-seal/validation?rid=811bde09-ca38-4028-bdb2-591742e0d146\" title=\"TRUSTe\" target=\"_blank\">\n                    <img style=\"border: none\" src=\"//privacy-policy.truste.com/privacy-seal/seal?rid=811bde09-ca38-4028-bdb2-591742e0d146\" alt=\"TRUSTe\" width=\"142\" height=\"45\"/>\n                  </a>\n                </div>\n                <div class=\"hidden-sm hidden-md hidden-lg\">\n                  <!--<a href=\"//privacy.truste.com/privacy-seal/Collegeboard-com/validation?rid=e4698ef1-adf3-4af0-9f86-9574bcb0b023\" title=\"TRUSTe online privacy certification\" target=\"_blank\">-->\n                    <!--<img src=\"//privacy-policy.truste.com/privacy-seal/Collegeboard-com/seal?rid=d348c952-c5af-45d7-9df4-ebaf109c7809\" alt=\"TRUSTe online privacy certification\" width=\"104\" height=\"33\"/>-->\n                  <!--</a>-->\n                  <a href=\"//privacy.truste.com/privacy-seal/validation?rid=811bde09-ca38-4028-bdb2-591742e0d146\" title=\"TRUSTe\" target=\"_blank\">\n                    <img style=\"border: none\" src=\"//privacy-policy.truste.com/privacy-seal/seal?rid=811bde09-ca38-4028-bdb2-591742e0d146\" alt=\"TRUSTe\" width=\"104\" height=\"33\"/>\n                  </a>\n                </div>\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["login-hero"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "lv-logged-in";
  }

function program3(depth0,data) {
  
  
  return "lv-logged-out";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<p>";
  if (helper = helpers.descriptive) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.descriptive); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>";
  return buffer;
  }

  buffer += "<div class=\"lv-login-hero-widget lv-login-hero-widget-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n  <div \n      class=\"\n        cb-hero \n        cb-hero-standard \n        cb-hero-left \n        cb-hero-light-text\" \n      style=\"\n        background-image: url(&quot;"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.images)),stack1 == null || stack1 === false ? stack1 : stack1.lg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;);\"\n      data-cb-viewport=\"true\" \n      data-cb-default-image=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.images)),stack1 == null || stack1 === false ? stack1 : stack1.lg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n      data-cb-xs-image=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.images)),stack1 == null || stack1 === false ? stack1 : stack1.xs)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n      data-cb-sm-image=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.images)),stack1 == null || stack1 === false ? stack1 : stack1.sm)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n      data-cb-md-image=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.images)),stack1 == null || stack1 === false ? stack1 : stack1.md)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n      data-cb-lg-image=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.images)),stack1 == null || stack1 === false ? stack1 : stack1.lg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" \n      id=\"hero-login-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n    >\n    <div class=\"container ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isLoggedIn), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <div class=\"row\"> \n        <div class=\"col-xs-12 col-sm-6 col-sm-offset-6 flex-block\">\n          <div class=\"content\">\n            <h2>";
  if (helper = helpers.headline) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.headline); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.descriptive), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <div class=\"lv-identity-widget\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["login-hero-identity"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <div class=\"lv-identity-widget-content lv-logged-in\">\n      <ul>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),stack1 == null || stack1 === false ? stack1 : stack1.account)),stack1 == null || stack1 === false ? stack1 : stack1.isProfessional), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),stack1 == null || stack1 === false ? stack1 : stack1.account)),stack1 == null || stack1 === false ? stack1 : stack1.isStudent), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <!-- <li>\n          <form accept-charset=\"utf-8\" method=\"post\" action=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.endpoints)),stack1 == null || stack1 === false ? stack1 : stack1.logout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__SignOutForm\">\n            <input type=\"hidden\" name=\"userType\" value=\"S\" />\n            <input type=\"hidden\" name=\"DURL\" value=\"";
  if (helper = helpers.redirectUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n            <input type=\"hidden\" name=\"appId\" value=\"";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n            <input type=\"hidden\" name=\"formState\" value=\"1\" />\n            <button class=\"lv-button-link\">Sign Out</button>\n          </form>\n        </li> -->\n      </ul>\n    </div>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "    \n          ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.professional)),stack1 == null || stack1 === false ? stack1 : stack1.all), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <li><a href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n          ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.student)),stack1 == null || stack1 === false ? stack1 : stack1.all), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <div class=\"lv-identity-widget-content lv-logged-out\">\n      <form id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__SignInForm\" name=\"SignInFormPro\" role=\"form\" autocomplete=\"off\" accept-charset=\"utif-8\" method=\"post\" action=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.endpoints)),stack1 == null || stack1 === false ? stack1 : stack1.authentication)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <input type=\"hidden\" name=\"DURL\" value=\"";
  if (helper = helpers.redirectUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n        <input type=\"hidden\" name=\"appId\" value=\"";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n\n        <div class=\"form-group\">\n          <label for=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__username_pro\">Username</label>\n          <input id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__username_pro\" name=\"username\" type=\"text\" class=\"form-control\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__password_pro\">Password</label>\n          <input id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__password_pro\" name=\"password\" type=\"password\" class=\"form-control\" />\n        </div>\n        <div class=\"lv-login-controls visible-xs-block\">\n            <div class=\"lv-login-forgot col-sm-12\">\n              <p>Forgot <a href=\"https://account.collegeboard.org/login/forgotUsername?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"visually-hidden\">Forgot </span>username</a> or <a href=\"https://account.collegeboard.org/login/forgotPassword?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"visually-hidden\">Forgot </span>password</a></p>\n            </div>\n        </div>\n        <div class=\"form-group lv-button-group\">\n            <button class=\"btn btn-primary lv-signin-button\" type=\"submit\">Sign In</button>\n        </div>\n      </form>\n\n      <div class=\"lv-login-controls\">\n        <div class=\"lv-login-signup col-md-12 col-sm-12 col-lg-6\">\n          <p>Don't have an account? <a class=\"lv-signup-link\" href=\"https://account.collegeboard.org/login/signUp?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Sign up</a></p>\n        </div>\n        <div class=\"lv-login-forgot hidden-xs col-md-12 col-lg-6\">\n          <p>Forgot <a href=\"https://account.collegeboard.org/login/forgotUsername?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"visually-hidden\">Forgot </span>username</a> or <a href=\"https://account.collegeboard.org/login/forgotPassword?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"visually-hidden\">Forgot </span>password</a>?</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  ";
  return buffer;
  }

  buffer += "  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.isLoggedIn), {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["notification"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "lv-active";
  }

function program3(depth0,data) {
  
  
  return "false";
  }

function program5(depth0,data) {
  
  
  return "true";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <div data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"lv-notification ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isClosed), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isClosed), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n        <div class=\"container\">\r\n          <div class=\"lv-notification-icon\" aria-hidden=\"true\">\r\n            <span class=\"";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></span>\r\n          </div>\r\n          <div class=\"lv-notification-content\">\r\n            <div class=\"lv-notification-header\">\r\n              <h3 id=\"lv-notification-id-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"lv-notification-title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\r\n            </div>\r\n            <div class=\"lv-notification-body\">\r\n              <p>";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\r\n            </div>\r\n          </div>\r\n          <div class=\"lv-notification-controls\">\r\n            <a class=\"lv-notification-close\" href=\"#lv-notification-id-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"glyphicon-cb cb-icon-icn_close\"></span><span class=\"sr-only\">Close Notification</span></a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    ";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "lv-notification-closed";
  }

function program10(depth0,data) {
  
  
  return "aria-hidden=\"true\"";
  }

function program12(depth0,data) {
  
  
  return "aria-hidden=\"false\"";
  }

  buffer += "<div class=\"lv-notification-widget ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isActive), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n  <div class=\"lv-notifications\" aria-hidden=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isActive), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.notifications), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  </div>\r\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["identity"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "lv-logged-in";
  }

function program3(depth0,data) {
  
  
  return "lv-logged-out";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <ul>\r\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),stack1 == null || stack1 === false ? stack1 : stack1.account)),stack1 == null || stack1 === false ? stack1 : stack1.isProfessional), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),stack1 == null || stack1 === false ? stack1 : stack1.account)),stack1 == null || stack1 === false ? stack1 : stack1.isStudent), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </ul>\r\n    <form accept-charset=\"utf-8\" method=\"post\" action=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.endpoints)),stack1 == null || stack1 === false ? stack1 : stack1.logout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__SignOutForm\">\r\n      <input type=\"hidden\" name=\"userType\" value=\"S\" />\r\n      <input type=\"hidden\" name=\"DURL\" value=\"";
  if (helper = helpers.redirectUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n      <input type=\"hidden\" name=\"appId\" value=\"";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n      <input type=\"hidden\" name=\"formState\" value=\"1\" />\r\n      <button class=\"lv-button-link\">Sign Out</button>\r\n    </form>\r\n  ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.professional)),stack1 == null || stack1 === false ? stack1 : stack1.all), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n          <li><a href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\r\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.student)),stack1 == null || stack1 === false ? stack1 : stack1.all), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <form id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__SignInForm\" name=\"SignInFormPro\" role=\"form\" autocomplete=\"off\" accept-charset=\"utif-8\" method=\"post\" action=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.endpoints)),stack1 == null || stack1 === false ? stack1 : stack1.authentication)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n      <input type=\"hidden\" name=\"DURL\" value=\"";
  if (helper = helpers.redirectUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n      <input type=\"hidden\" name=\"appId\" value=\"";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n\r\n      <div class=\"form-group\">\r\n        <label for=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__username_pro\">Username</label>\r\n        <input id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__username_pro\" name=\"username\" type=\"text\" class=\"form-control\" />\r\n      </div>\r\n\r\n      <div class=\"form-group\">\r\n        <label for=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__password_pro\">Password</label>\r\n        <input id=\"";
  if (helper = helpers.widgetId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.widgetId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "__password_pro\" name=\"password\" type=\"password\" class=\"form-control\" />\r\n      </div>\r\n\r\n      <button class=\"lv-signin-button\" type=\"submit\">Sign In</button> <a class=\"lv-signup-link\" href=\"https://account.collegeboard.org/login/signUp?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Sign Up</a>\r\n    </form>\r\n\r\n    <div class=\"lv-login-controls\">\r\n      <p>Forgot <a href=\"https://account.collegeboard.org/login/forgotUsername?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"visually-hidden\">Forgot </span>username</a> or <a href=\"https://account.collegeboard.org/login/forgotPassword?appId=";
  if (helper = helpers.appId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.appId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&amp;DURL=";
  if (helper = helpers.redirectUrlEncoded) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.redirectUrlEncoded); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"visually-hidden\">Forgot </span>password</a></p>\r\n    </div>\r\n  </div>\r\n  ";
  return buffer;
  }

  buffer += "<div class=\"lv-identity-widget ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.isLoggedIn), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.isLoggedIn), {hash:{},inverse:self.program(11, program11, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["sitesearch"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "lv-type-";
  if (helper = helpers.siteType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.siteType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1);
  return buffer;
  }

  buffer += "<div class=\"lv-sitesearch-widget ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.siteType), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n  <div class=\"visible-xs visible-sm lv-mobile-detector\"></div>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <div class=\"lv-sitesearch-sidebar\"></div>\n      </div>\n      <div class=\"col-md-9\">\n        <div class=\"lv-content\">\n          <div class=\"lv-heading\">\n            <h2>Search Results</h2>\n          </div>\n          <div class=\"lv-search-widget\"></div>\n          <div class=\"lv-sitesearch-filters\"></div>\n          <div class=\"lv-sitesearch-results\"></div>\n        </div><!-- End Content -->\n      </div><!-- End Column -->\n    </div><!-- End Row -->\n  </div><!-- End Container -->\n</div><!-- End Widget -->";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["sitesearch-results"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"lv-totals\">\n    <p><strong>Displaying results "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.results)),stack1 == null || stack1 === false ? stack1 : stack1.lower)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.results)),stack1 == null || stack1 === false ? stack1 : stack1.upper)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " of "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.results)),stack1 == null || stack1 === false ? stack1 : stack1.total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong></p>\n  </div>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.banners), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"lv-results\">\n    ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.results)),stack1 == null || stack1 === false ? stack1 : stack1.items), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  <div class=\"lv-pagination\">\n    <nav role=\"menubar\" aria-label=\"pagination\">\n      <ul class=\"pagination\">\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.previous), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.pages), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.next), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.last), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n    </nav>\n  </div><!-- End Pagination -->\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.banners), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <div class=\"lv-banner lv-banner-type-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n        ";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <div class=\"lv-result\">\n        <h3><a href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></h3>\n        <p class=\"lv-description\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n        <small class=\"lv-url\">";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</small>\n      </div>\n    ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li>\n            <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.previous)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" aria-label=\"Previous Page\">\n              <span class=\"sr-only\">Go to previous page</span>\n              <span aria-hidden=\"true\">Previous</span>\n            </a>\n          </li>\n          ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><a href=\"";
  if (helper = helpers.link) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.page) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.page); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n        ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "class=\"active\"";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li>\n            <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.next)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" aria-label=\"Next Page\">\n              <span class=\"sr-only\">Go to Next page</span>\n              <span aria-hidden=\"true\">Next</span>\n            </a>\n          </li>\n        ";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li>\n            <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.pagination)),stack1 == null || stack1 === false ? stack1 : stack1.last)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" aria-label=\"Last Page\">\n              <span class=\"sr-only\">Go to Last page</span>\n              <span aria-hidden=\"true\">Last</span>\n            </a>\n          </li>\n        ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<!-- large blue radial -->\n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flags)),stack1 == null || stack1 === false ? stack1 : stack1.isRetrievingData), {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program17(depth0,data) {
  
  
  return "\n    <div class=\"lv-progress\">\n      <div role=\"progressbar\" aria-valuetext=\"Loading…\" class=\"cb-loader cb-loader-blue cb-loader-lg\"></div>\n    </div>\n  ";
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flags)),stack1 == null || stack1 === false ? stack1 : stack1.isDoneRetrieving), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flags)),stack1 == null || stack1 === false ? stack1 : stack1.isSuccessful), {hash:{},inverse:self.program(25, program25, data),fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <div class=\"lv-totals\">\n        <p><strong>No matches for: </strong>";
  if (helper = helpers.searchTerm) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.searchTerm); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n      </div>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.banners), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <div class=\"lv-no-results\">\n        <p>No search results were found. Please make sure that all keywords are spelled correctly or try different or more general keywords. For your convenience, we've provided links to commonly requested information below.</p>\n        <div class=\"lv-group\">\n          <h2>Free Tools</h2>\n          <ul>\n            <li><a href=\"https://bigfuture.collegeboard.org/college-search\" trackclickvalue=\"noresults-cs\">College Search</a></li>\n            <li><a href=\"https://bigfuture.collegeboard.org/scholarship-search\" trackclickvalue=\"noresults-scholarship\">Scholarship Search</a></li>\n            <li><a href=\"https://bigfuture.collegeboard.org/majors-careers\" trackclickvalue=\"noresults-majors-careers\">Majors and Careers Search</a></li>\n            <li><a href=\"https://bigfuture.collegeboard.org/pay-for-college/tools-calculators\" trackclickvalue=\"finaid\">Financial Aid Calculators</a></li>\n          </ul>\n        </div>\n        <div class=\"lv-group\">\n          <h2>Information about the SAT</h2>\n          <ul>\n            <li><a href=\"https://collegereadiness.collegeboard.org/sat/register\" trackclickvalue=\"noresults-sat-reg\">SAT Registration</a></li>\n            <li><a href=\"https://collegereadiness.collegeboard.org/sat/register/dates-deadlines\" trackclickvalue=\"noresults-sat-dates\">SAT Dates</a></li>\n            <li><a href=\"https://collegereadiness.collegeboard.org/sat/scores\" trackclickvalue=\"noresults-sat-scores\">SAT Scores</a></li>\n            <li><a href=\"https://collegereadiness.collegeboard.org/sat/practice\" trackclickvalue=\"noresults-sat-practice\">SAT Practice</a></li>\n          </ul>\n        </div>\n        <div class=\"lv-group\">\n          <h2>College Board Tests</h2>\n          <ul>\n            <li><a href=\"https://collegereadiness.collegeboard.org/sat\" trackclickvalue=\"noresults-sat\">SAT <sup>&reg;</sup></a></li>\n            <li><a href=\"https://collegereadiness.collegeboard.org/psat-nmsqt-psat-10\" trackclickvalue=\"noresults-psat\">PSAT/NMSQT <sup>&reg;</sup></a></li>\n            <li><a href=\"https://apstudent.collegeboard.org/home\" trackclickvalue=\"noresults-ap\">AP <sup>&reg;</sup></a></li>\n            <li><a href=\"https://clep.collegeboard.org/\" trackclickvalue=\"noresults-clep\">CLEP <sup>&reg;</sup></a></li>\n          </ul>\n        </div>\n      </div>\n      ";
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.banners), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n          <div class=\"lv-banner lv-banner-type-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            ";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </div>\n        ";
  return buffer;
  }

function program25(depth0,data) {
  
  
  return "\n      <div class=\"lv-result lv-error\">\n        <h3>Unable to retrieve search results</h3>\n        <p>We apologize for the inconvience</p>\n        <ul class=\"cb-list-style\">\n          <li>Check your internet connection</li>\n          <li>Our services are unavailable</li>\n        </ul>\n      </div>\n      ";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.results), {hash:{},inverse:self.program(16, program16, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["sitesearch-filters"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flags)),stack1 == null || stack1 === false ? stack1 : stack1.isSuccessful), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <ul>\n      ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.facets)),stack1 == null || stack1 === false ? stack1 : stack1.filters), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n      <div class=\"lv-controls\">\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.facets)),stack1 == null || stack1 === false ? stack1 : stack1.filters), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n    ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n          <a ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " href=\"";
  if (helper = helpers.link) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            ";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </a>\n        </li>  \n      ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "class=\"lv-selected\"";
  }

function program6(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "(";
  if (helper = helpers.count) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.count); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "\n            <span class=\"glyphicon-cb cb-icon-icn_close\"></span>\n            ";
  }

function program12(depth0,data) {
  
  
  return "\n          <button name=\"add-filters\" class=\"btn btn-secondary\">Modify Filters</button>\n          <a href=\"#clearfilters\" name=\"clear-filters\" aria-label=\"Clear Filters\">Clear All</a>\n        ";
  }

function program14(depth0,data) {
  
  
  return "\n          <button name=\"add-filters\" class=\"btn btn-secondary\">Add Filters</button>\n        ";
  }

  buffer += "<div class=\"lv-filters\">\n  <div class=\"visible-xs visible-sm\">\n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flags)),stack1 == null || stack1 === false ? stack1 : stack1.isDoneRetrieving), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>";
  return buffer;
  });;this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["sitesearch-sidebar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"visible-xs visible-sm\">\n      <div class=\"lv-controls\">\n        <a class=\"lv-back-to-search\" href=\"#back-to-search\">&lt; Back to Search</a>\n      </div>\n    </div>\n    <div class=\"lv-heading\">\n      <h2>Filters</h2>\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.facets)),stack1 == null || stack1 === false ? stack1 : stack1.filters), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.facets)),stack1 == null || stack1 === false ? stack1 : stack1.groups), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "<a class=\"#clearfilters\" name=\"clear-filters\" aria-label=\"Clear Filters\">Clear All</a>";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <h3>By ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\n      <ul>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.values), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n          <a ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " href=\"";
  if (helper = helpers.link) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            ";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </a>\n        </li>\n      ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "class=\"lv-selected\"";
  }

function program8(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "(";
  if (helper = helpers.count) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.count); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")";
  return buffer;
  }

function program12(depth0,data) {
  
  
  return "\n            <span class=\"glyphicon-cb cb-icon-icn_close\"></span>\n            ";
  }

  buffer += "<div class=\"lv-sidebar\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.facets), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });;this.cb=this.cb||{},cb.core=cb.core||{},cb.core.utils=cb.core.utils||{},cb.core.utils.DeploymentProfile={apiKey:"cbwww-e99be64d-d782-4fa7-a915-6a4a5b4185b2",iam:{requiresLogin:!1,loginURL:"https://account.collegeboard.org/login/login?appId=0&DURL="},dataProtector:{protectionEnabled:!1}};;var CB_MAIN_NS_NAME="cb",CB_CORE_NS_NAME="core",CB_UTILS_NS_NAME="utils";String.prototype.endsWith||(String.prototype.endsWith=function(a,b){var c=this.toString();("number"!=typeof b||!isFinite(b)||Math.floor(b)!==b||b>c.length)&&(b=c.length),b-=a.length;var d=c.lastIndexOf(a,b);return d!==-1&&d===b}),this[CB_MAIN_NS_NAME]=this[CB_MAIN_NS_NAME]||{},this[CB_MAIN_NS_NAME].global=this[CB_MAIN_NS_NAME].global||this,this[CB_MAIN_NS_NAME][CB_CORE_NS_NAME]=this[CB_MAIN_NS_NAME][CB_CORE_NS_NAME]||{},this[CB_MAIN_NS_NAME][CB_CORE_NS_NAME][CB_UTILS_NS_NAME]=function(a){function b(){}function c(b){if("undefined"==typeof b||null==b)throw"namespace parameter is required!";var c=a,d=b.split(".");d[0]!==CB_MAIN_NS_NAME&&d.unshift(CB_MAIN_NS_NAME);for(var e=d.length,f=0;f<e;f++){var g=d[f];c=c[g]?c[g]:c[g]={}}return c}function d(b,c){if("undefined"==typeof b||null==b)throw"namespace parameter is required!";var d,e=function(a){return l?void alert(a):void(n&&n.getRootLogger().fatal(a))};d=l&&c?c:e;for(var f=a,g=b.split("."),h=g.length,i=0;i<h;i++){var j=g[i];if(!f[j])return d(b+" is not defined!");f=f[j]}}function e(a){var b=document.createElement("link");b.setAttribute("rel","stylesheet"),b.setAttribute("type","text/css"),b.setAttribute("href",a),document.getElementsByTagName("head")[0].appendChild(b)}function f(a,b,c,d){var e,f=function(a){e=b?b(a):a,d?c.call(d,e):c(e)};$.get(a,f)}function g(a){k=a}function h(){return k}var i=log4javascript.NullLayout,j=log4javascript.Level;b.prototype=new log4javascript.Appender,b.prototype.layout=new i,b.prototype.threshold=j.DEBUG,b.prototype.append=function(a){var b,c=this,d=function(){var b=c.getLayout().formatWithException(a);return"string"==typeof b?[b]:b};if((b=window.console)&&b.log){var e,f=d();e=b.debug&&j.DEBUG.isGreaterOrEqual(a.level)?"debug":b.info&&j.INFO.equals(a.level)?"info":b.warn&&j.WARN.equals(a.level)?"warn":b.error&&a.level.isGreaterOrEqual(j.ERROR)?"error":"log",b[e].apply?b[e].apply(b,f):b[e](f)}else"undefined"!=typeof opera&&opera.postError&&opera.postError(d())},b.prototype.group=function(a){window.console&&window.console.group&&window.console.group(a)},b.prototype.groupEnd=function(){window.console&&window.console.groupEnd&&window.console.groupEnd()},b.prototype.toString=function(){return"BrowserConsoleAppender"};var k="invalid api key",l=!1,m={};cb.core.utils&&cb.core.utils.DeploymentProfile&&(m=cb.core.utils.DeploymentProfile,m.mode&&"debug"===m.mode.toLowerCase()&&(l=!0),m.apiKey&&(k=m.apiKey));var n=function(){if(!a.log4javascript)return null;log4javascript.BrowserConsoleAppender||(log4javascript.BrowserConsoleAppender=b);var c=new log4javascript.BrowserConsoleAppender,d=new log4javascript.PatternLayout("%d{HH:mm:ss,SSS} %c %-5p - %m");c.setLayout(d);var e=log4javascript.getRootLogger();return e.removeAllAppenders(),e.addAppender(c),e.setLevel(l?log4javascript.Level.DEBUG:log4javascript.Level.INFO),log4javascript}(),o={defineCBNamespace:c,alertIfNotDefined:d,loadCSSFile:e,loadTemplate:f,getAPIKey:h,setAPIKey:g,Logger:n,DeploymentProfile:m};return o}(this[CB_MAIN_NS_NAME].global);;cb.core.utils.defineCBNamespace("cb.core"),cb.core.utils.alertIfNotDefined("_"),cb.core.utils.alertIfNotDefined("$"),cb.core.utils.alertIfNotDefined("jQuery"),cb.core.utils.alertIfNotDefined("$.cookie"),cb.core.utils.alertIfNotDefined("JSON"),cb.core.utils.alertIfNotDefined("Backbone"),cb.core.utils.alertIfNotDefined("log4javascript"),cb.core.iam=function(){"use strict";function a(a){if(l(),D.debug("init()"),!a||"object"!=typeof a||1!=arguments.length)throw"cb.core.iam.init(): requires one parameter which must be an object";t=a.eventBus?a.eventBus:_.clone(Backbone.Events),k();var c=cb.core.utils.getAPIKey();if(cb.core.utils.DeploymentProfile&&cb.core.utils.DeploymentProfile.iam&&(cb.core.utils.DeploymentProfile.iam.authServiceURI&&(u=cb.core.utils.DeploymentProfile.iam.authServiceURI),void 0!==cb.core.utils.DeploymentProfile.iam.sessionCheck&&cb.core.utils.DeploymentProfile.iam.sessionCheck===!1&&(F=!1,D.info("session check is set to local!"),D.info("data protection will be disabled!"),cb.core.utils.DeploymentProfile.dataProtector&&(cb.core.utils.DeploymentProfile.dataProtector.protectionEnabled=!1)),cb.core.utils.DeploymentProfile.iam.requiresLogin)){if(!cb.core.utils.DeploymentProfile.iam.loginURI)throw"cb.core.utils.DeploymentProfile.iam.requiresLogin is true,but cb.core.utils.DeploymentProfile.iam.loginURI not defined!";v=cb.core.utils.DeploymentProfile.iam.requiresLogin,w=cb.core.utils.DeploymentProfile.iam.loginURI,w.endsWith("&DURL=")&&(w+=encodeURIComponent(window.location.href)),D.info("requiresLogin is ON, loginURI="+w)}if(u=u.replace(/{{API-KEY}}/g,c),D.info("levity iam options in effect: \nbsauthPartialUrl : "+u+"\nsessionCheck : "+F+"\nrequiresLogin : "+v+(v?"\nloginURI : "+w:"")+"\n"),!u)throw"cb.core.utils.DeploymentProfile.iam.authServiceURI is not defined!";K=setInterval(b,J),b()}function b(){c()}function c(){var a=d();if(!B.isLoggedIn&&!a.isLoggedIn)return void i();if(!(B.isLoggedIn&&a.isLoggedIn&&B.sessionId===a.sessionId&&Date.now()<B.expireTimeInMS))return B.isLoggedIn&&a.isLoggedIn&&B.sessionId===a.sessionId&&Date.now()>=B.expireTimeInMS?(g(),h(),r(),void i()):B.isLoggedIn&&!a.isLoggedIn?(g(),r(),void i()):B.isLoggedIn&&a.isLoggedIn&&B.sessionId!==a.sessionId?(g(),r(),void n(a)):!B.isLoggedIn&&a.isLoggedIn?(g(),void n(a)):void 0}function d(){var a={isLoggedIn:!1,firstName:"",isRegUser:!1,isProUser:!1},b=$.cookie(z.STUDENT_NAME),c=$.cookie(z.PRO_NAME),d=$.cookie(z.CBLOGIN);return"invalid_user"===c&&(c=null),"invalid_user"===b&&(b=null),a.isRegUser=!!b,a.isProUser=!!c,a.firstName=(a.isRegUser?b:a.isProUser?c:"").toLowerCase(),a.isLoggedIn=!!d,a.sessionId=d,a}function e(){return B}function f(){return t}function g(){B={},B.isLoggedIn=!1,B.sessionId="not_logged_in",C={},C.isLoggedIn=!1,sessionStorage.removeItem(A)}function h(){D.warn("levity: session is invalid: deleting login cookie"),$.removeCookie(z.CBLOGIN,{path:"/",domain:".collegeboard.org"})}function i(){v&&(D.info("requiresLogin=true, user is not logged in, redirecting..."),window.location.assign(w))}function j(){sessionStorage.setItem(A,JSON.stringify(B))}function k(){B=JSON.parse(sessionStorage.getItem(A)),null!==B?(C.isLoggedIn=B.isLoggedIn,C.isRegUser=B.basicProfile.isStudent,C.isProUser=B.basicProfile.isProfessional,C.firstName=B.basicProfile.firstName):g()}function l(){var a=$.cookie(z.LOWER_ENV);return a?L.setLevel(log4javascript.Level.DEBUG):(a="pine",L.setLevel(log4javascript.Level.INFO)),a}function m(a){var b=l(),c=a;a instanceof Object&&(c="pine"===b?a.prod:a.nonprod);var d=c;return d=c.replace(/{{TREE-ENV}}/g,b)}function n(a){if(!F){var b=a.isRegUser?"ST":"PF",c={authStatus:"Success",sessionInfo:{identityKey:{namespace:b,userName:a.firstName},unifiedSessionId:a.sessionId,expireInSeconds:E,csrId:null},basicProfile:{firstName:a.firstName,lastName:"",zip5:"",emailAddress:""}};return void setTimeout(o,0,c)}var d=a.sessionId;H++;var e=m(u);return H>G?(D.error("max number of session check attempts failed: "+e),void(K!==I&&(clearInterval(K),K=I))):(D.debug("calling BSAuth:"+e+" current nOfSessionChecks="+H),void $.ajax({url:e,cache:!1,type:"GET",dataType:"json",timeout:J,beforeSend:function(a){a.setRequestHeader("Authorization","CBLogin "+d)}}).done(o).fail(p))}function o(a){D.debug("onSuccessfulSessionRetrievalCB(): "+JSON.stringify(a)),a.authStatus&&"SUCCESS"===a.authStatus.toUpperCase()?(H=0,B.isLoggedIn=!0,B.sessionId=a.sessionInfo.unifiedSessionId,B.csrId=a.sessionInfo.csrId,B.expireTimeInMS=Date.now()+1e3*a.sessionInfo.expireInSeconds,B.basicProfile={},B.basicProfile.userName=a.sessionInfo.identityKey.userName,B.basicProfile.namespace=a.sessionInfo.identityKey.namespace,B.basicProfile.isStudent="ST"===B.basicProfile.namespace.toUpperCase(),B.basicProfile.isProfessional=!B.basicProfile.isStudent,a.basicProfile&&(B.basicProfile.firstName=a.basicProfile.firstName),C.isLoggedIn=B.isLoggedIn,C.isRegUser=B.basicProfile.isStudent,C.isProUser=B.basicProfile.isProfessional,C.firstName=B.basicProfile.firstName,j(),q()):(h(),p("CB session has expired"))}function p(a){D.debug("onFailedSessionRetrievalCB(): "+JSON.stringify(a)),g(),i()}function q(){t.trigger(y.Login),t.trigger(y.LegacyLoginLogout,C)}function r(){t.trigger(y.Logout),t.trigger(y.LegacyLoginLogout,C)}function s(){return C}var t,u="https://bsauth-{{TREE-ENV}}.vpc.collegeboard.org/bsauth/rest/auth/me/cbssosession?api_key={{API-KEY}}&needProfile=Y",v=!1,w="",x="cb:core:iam:events:",y=Object.freeze({Login:x+"Login",Logout:x+"Logout",LegacyLoginLogout:"widgets:custom:LoginLogout"}),z=Object.freeze({CBLOGIN:"cb_login",LOWER_ENV:"lower_Env",STUDENT_NAME:"ecl_user_name",PRO_NAME:"cb_pl_sso_user"}),A="iamSession",B={},C={},D=cb.core.utils.Logger.getLogger("cb.core.iam"),E=7200,F=!0,G=2,H=0,I=-1,J=2e3,K=I,L=cb.core.utils.Logger.getRootLogger();return{events:y,getEventBus:f,init:a,getAuthSession:e,finalizeMyStyleURLWithEnv:m,getLegacyState:s}}();;cb.core.utils.defineCBNamespace("cb.core"),cb.core.utils.alertIfNotDefined("_"),cb.core.utils.alertIfNotDefined("$"),cb.core.utils.alertIfNotDefined("jQuery"),cb.core.utils.alertIfNotDefined("$.cookie"),cb.core.utils.alertIfNotDefined("JSON"),cb.core.utils.alertIfNotDefined("Backbone"),cb.core.utils.alertIfNotDefined("log4javascript"),cb.core.utils.alertIfNotDefined("cb.core.iam"),cb.core.protector=function(){"use strict";function a(a){if(G)return void y.error("protector has been already initialized: ignoring this attempt");G=!0,!a&&cb.core.utils.DeploymentProfile&&cb.core.utils.DeploymentProfile.dataProtector&&(a=cb.core.utils.DeploymentProfile.dataProtector),y.debug("init(), supplied options: "+JSON.stringify(a));var b=cb.core.iam.getEventBus();if(a){if("object"!=typeof a)throw"cb.core.protector.init(): requires one parameter which must be an object";if(void 0!==a.protectionEnabled)if(a.protectionEnabled===!1||"false"===a.protectionEnabled)z=!1;else if("join"===a.protectionEnabled){var d=$.cookie(q.PROTECTOR_HEART_BEAT);d?Date.now()-d>1e3*B&&(z=!1):z=!1,z?y.info("Joining data protection ON"):(y.info("Joining data protection OFF"),b.on(cb.core.iam.events.Logout,f))}if(!z)return void y.info("data protection is DISABLED!");var g=0;a.mode&&a.mode===r.AGGRESSIVE&&(A=r.AGGRESSIVE,y.info("using new mode="+A)),a.tabRemovedTimeoutInSecs&&(g=parseInt(a.tabRemovedTimeoutInSecs,10),g&&(B=g)),a.invisibleTimeoutEnforced&&(D=a.invisibleTimeoutEnforced===!0),a.invisibleTimeoutInSecs&&(D?(g=parseInt(a.invisibleTimeoutInSecs,10),g&&(C=g)):y.error("Supplied invisibleTimeoutInSecs is ignored since invisibleTimeoutEnforced=false"))}y.info("levity protector options in effect: \nisProtectionEnabled : "+z+"\nprotectionMode : "+A+"\nprotectionTimeoutInSecs : "+B+"\ninvisibleTimeoutEnforced : "+D+(D?"\ninvisibleTimeoutInSecs : "+C:"")+"\n"),b.on(cb.core.iam.events.Login,e),b.on(cb.core.iam.events.Logout,f),D&&(document.addEventListener("visibilitychange",c),n()),i(),window.onbeforeunload=function(a){y.debug("onbeforeunload()"),h()}}function b(){$.cookie(q.PROTECTOR_HEART_BEAT,Date.now(),{path:"/",domain:".collegeboard.org",secure:!0})}function c(a){y.debug("Got visibility change event: new hidden value="+document.hidden),D&&document.hidden&&cb.core.iam.getAuthSession().isLoggedIn?(h(),E=setInterval(d,1e3*C),y.debug("started the invisible interval="+E)):E!==w&&(clearInterval(E),y.debug("cancelled the invisible interval="+E),E=w,o())}function d(){y.debug("onInvisibleTimeout()");var a=$.cookie(q.PROTECTOR_HEART_BEAT);Date.now()-a>1e3*B&&j()}function e(){return y.debug("onLogin()"),H?void j():void g()}function f(){y.debug("onLogout()"),h()}function g(){return y.debug("arm()"),cb.core.iam.getAuthSession().csrId?(y.warn("loginAs mode: protection disabled!"),void(z=!1)):($.cookie(q.PROTECTOR_CB_LOGIN,$.cookie(q.CB_LOGIN),{path:"/",domain:".collegeboard.org",secure:!0}),b(),x===w&&(y.debug("arm(): starting the heartbeat interval timer"),x=setInterval(b,1e3*t)),o(),void(z=!0))}function h(){y.debug("disarm()"),x!==w&&(clearInterval(x),x=w),o(),z=!1}function i(){if(y.debug("checkProtection()"),cb.core.iam.getAuthSession().csrId)return y.warn("loginAs mode: disabling protection"),void h();var a=$.cookie(q.PROTECTOR_CB_LOGIN),b=$.cookie(q.CB_LOGIN);if(!b)return void y.info("user is not logged in: protection disabled");if(a!=b)return y.info("lastLoginToken!=curLoginToken: login is in process, allow one time pass"),void g();if(D&&F.forceLogin)return y.info("invisibleTimeoutEnforced && pageInfo.forceLogin: enforce!"),void j();var c=parseInt($.cookie(q.PROTECTOR_HEART_BEAT),10);if(!c)return y.info("heart beat does not exist, first time use (login happened in a different tab)"),void g();var d=(Date.now()-c)/1e3;d>B?cb.core.iam.getAuthSession().isLoggedIn?(y.info("enforcing protection right away, secondsPassed="+d),j()):(y.info("enforcement pending: waiting for the session check to return..."),H=!0):(y.info("timeout not expired yet, secondsPassed = "+d+" lastHeartBeatTime="+new Date(c).toLocaleTimeString()),g())}function j(){switch(y.debug("enforceProtection()"),A){case r.REGULAR:k();break;case r.AGGRESSIVE:l(),window.location.assign("https://account.collegeboard.org/login/login?DURL="+window.location.href);break;default:y.error("invalid mode protection:"+A)}}function k(){throw window.location.assign("https://account.collegeboard.org/login/login?DURL="+encodeURIComponent(window.location.href)),"stop js execution"}function l(){y.warn("levity protector: session is invalid: deleting login cookie"),$.removeCookie(q.CB_LOGIN,{path:"/",domain:".collegeboard.org"}),$.removeCookie(q.UL_SESSION,{path:"/",domain:".collegeboard.org"})}function m(){localStorage.setItem(s,JSON.stringify(F))}function n(){F=JSON.parse(localStorage.getItem(s)),F||(F={forceLogin:!1})}function o(){D&&(F||(F={}),F.forceLogin=!1,m())}function p(){return z}var q=Object.freeze({CB_LOGIN:"cb_login",UL_SESSION:"ul_session",PROTECTOR_HEART_BEAT:"protector_heart_beat",PROTECTOR_CB_LOGIN:"protector_cb_login"}),r=Object.freeze({REGULAR:"regular",AGGRESSIVE:"aggressive"}),s="protectorLocal",t=2,u=10,v=600,w=-1,x=w,y=cb.core.utils.Logger.getLogger("cb.core.protector"),z=!0,A=r.REGULAR,B=u,C=v,D=!1,E=w,F={},G=!1,H=!1;return{MODES:r,init:a,isProtectionEnabled:p}}();;cb.core.utils.defineCBNamespace("cb.core.widgets"),cb.core.utils.alertIfNotDefined("_"),cb.core.utils.alertIfNotDefined("$"),cb.core.utils.alertIfNotDefined("$.cookie"),cb.core.utils.alertIfNotDefined("jQuery"),cb.core.utils.alertIfNotDefined("JSON"),cb.core.utils.alertIfNotDefined("Backbone"),cb.core.utils.alertIfNotDefined("log4javascript"),cb.core.utils.alertIfNotDefined("cb.core.iam"),cb.core.utils.alertIfNotDefined("cb.core.protector"),"XDomainRequest"in window&&!(window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest)&&document.location.href.indexOf("file:///")==-1&&cb.core.utils.alertIfNotDefined("$.__jquery_xdomain__"),cb.core.widgets.framework=function(){$.cookie.json=!1;var a={};a.Version="3.5.1",a.Events={},a.Events.Bus=_.clone(Backbone.Events),a.Events.PREFIX="widgets:",a.Events.PREFIX_LEN=a.Events.PREFIX.length,a.Events.CUSTOMPREFIX=a.Events.PREFIX+"custom:",cb.core.iam.init({eventBus:a.Events.Bus}),cb.core.protector.init(),a.Events.Show=a.Events.PREFIX+"show",a.Events.Hide=a.Events.PREFIX+"hide",a.Events.Remove=a.Events.PREFIX+"remove",a.Events.LayoutChange=a.Events.PREFIX+"layoutchange",a.Events.All=[];for(var b in a.Events){var c=a.Events[b];c.length>a.Events.PREFIX_LEN&&c!==a.Events.CUSTOMPREFIX&&c.slice(0,a.Events.PREFIX_LEN)===a.Events.PREFIX&&a.Events.All.push(c)}a.Widget=Backbone.View.extend({defaultTemplateCompiler:function(){return Handlebars?Handlebars.compile:null}(),initialize:function(b){var c,d,e;if(1==arguments.length)if(b.placement)c=b.placement.container?b.placement.container:null,d=b.placement.domElement?b.placement.domElement:null,b.skin&&(e=b.skin);else{if(!b.levity)throw"widget is incorrectly instantiated: placement object is missing in options";c=b.levity.container?b.levity.container:null,d=b.levity.domElement?b.levity.domElement:null,e=b.levity.widgetOptions?b.levity.widgetOptions:null}else if(arguments.length>1)c=_.isEmpty(arguments[0])?null:arguments[0],d=arguments[1],e=arguments[2]?arguments[2]:null;else if(0===arguments.length)throw"widget is incorrectly instantiated: options object is missing";if(this.PrecompiledTemplates=Handlebars.templates?Handlebars.templates:null,this.logger||(this.logger=this.constructor.logger),this.logger.debug("Widget.initialize()"),this.constructor.DeploymentProfile){this.DeploymentProfile=this.constructor.DeploymentProfile;var f=cb.core.utils.getAPIKey(),g=this.DeploymentProfile;this.logger.debug("Final widget's deployment profile:");for(var h in g)g.hasOwnProperty(h)&&(_.isString(g[h])?(g[h]=g[h].replace(/{{API-KEY}}/g,f),this.logger.debug(h+" = "+g[h])):this.logger.debug(h+" = "+JSON.stringify(g[h])))}if(this.constructor.Collection&&!this.constructor.Model)throw"Widget has Collection,but Model is not defined";if(this.constructor.Collection&&this.constructor.Collection.prototype.model===Backbone.Model&&(this.constructor.Collection.prototype.model=this.constructor.Model),this.constructor.Collection||!this.constructor.Model||this.model||(this.model=new this.constructor.Model),this.constructor.Collection&&!this.collection&&(this.collection=new this.constructor.Collection),"undefined"==typeof c)throw"container parameter is missing";if(null!==c&&"function"!=typeof c.addChild)throw"invalid container object";d&&(this.setElement(d),this.onWidgetHide());var i;if(null!==c?(c.addChild(this),i=c):(i=null,$(document).ready(function(a){return function(){a.logger.debug("RootWidget/Container.onDocReady(): sending show event"),a.trigger(cb.core.widgets.framework.Events.Show)}}(this))),e){if(e.logger&&(this.logger=e.logger),e.template){var j=!1;if(this.PrecompiledTemplates){var k=e.template.uri;k=k.substring(k.lastIndexOf("/")+1);var l=k.substring(0,k.indexOf("."));this.PrecompiledTemplates[l]&&(j=!0,setTimeout(function(a){return function(){a.logger.debug('Loaded precompiled template from Handlebars.templates["'+l+'"]'),a.template=a.PrecompiledTemplates[l],a.render()}}(this),0))}if(!j){var m=e.template.compiler?e.template.compiler:this.defaultTemplateCompiler;this.logger.debug("Getting template via ajax:"+e.template.uri),cb.core.utils.loadTemplate(this.getFullTemplateURI(e.template.uri),m,function(a){this.logger.debug("Loaded template via ajax:"+e.template.uri),this.template=a,this.render()},this)}}if(e.cssList)for(var n=e.cssList,o=0;o<n.length;o++)n[o].uri&&cb.core.utils.loadCSSFile(this.getFullCSSURI(n[o].uri)),n[o].class&&d&&this.$el.addClass(n[o].class)}this.on(a.Events.Show,this.onWidgetShow),this.on(a.Events.Hide,this.onWidgetHide),this.on(a.Events.Remove,this.onWidgetRemove),this.on(a.Events.LayoutChange,this.onWidgetLayoutChange),this.__container=i},onWidgetShow:function(){this.logger.debug("Widget.onWidgetShow()"),this.render(),this.__showOrHide(!0)},onWidgetHide:function(){this.logger.debug("Widget.onWidgetHide()"),this.__showOrHide(!1)},onWidgetRemove:function(){this.logger.debug("Widget.onWidgetRemove()"),this.__container&&this.stopListening(this.__container),this.off(),this.onWidgetHide()},onWidgetLayoutChange:function(a){return a?(this.logger.debug("Widget.onWidgetLayoutChange() param="+JSON.stringify(a)),void(this.$el&&this.$el.css(a))):void this.logger.error("Widget.onWidgetLayoutChange() is called without parameter")},getParent:function(){return this.__container},isVisible:function(){return this.__isVisible},getGlobalEventBus:function(){return a.Events.Bus},getFullCSSURI:function(a){return this.DeploymentProfile&&this.DeploymentProfile.baseCSSURI?this.__getFullURI(a,this.DeploymentProfile.baseCSSURI):a},getFullTemplateURI:function(a){return this.DeploymentProfile&&this.DeploymentProfile.baseTemplateURI?this.__getFullURI(a,this.DeploymentProfile.baseTemplateURI):a},findInsideWidgetDOM:function(a){return this.$el.find(a)},getIniqueID:function(){return _.uniqueId(this.cid)},getUniqueID:function(){return _.uniqueId(this.cid)},__showOrHide:function(a){this.__isVisible=a,this.$el&&(a?this.$el.show():this.$el.hide())},__getFullURI:function(a,b){return"http"===a.slice(0,4)||"//"===a.slice(0,2)?a:("/"!==a.slice(0,1)&&"/"!==b.slice(-1)&&(b+="/"),b+a)}},{logger:function(){return cb.core.utils.Logger.getLogger("cb.core.widgets.Widget")}()}),a.AuthenticatedWidget=a.Widget.extend({initialize:function(a){this._super.apply(this,arguments),this.logger.debug("PersonalizedWidget.initialize()");var b=this.getGlobalEventBus();b.on(cb.core.iam.events.Login,this.onLogin,this),b.on(cb.core.iam.events.Logout,this.onLogout,this)},getAuthSession:function(){return cb.core.iam.getAuthSession()},finalizeMyStyleURLWithEnv:function(a){return cb.core.iam.finalizeMyStyleURLWithEnv(a)},onLogin:function(){this.logger.debug("AuthenticatedWidget.onLogin()"),this.render()},onLogout:function(){this.logger.debug("AuthenticatedWidget.onLogout()"),this.render()}},{logger:function(){return cb.core.utils.Logger.getLogger("cb.core.widgets.AuthenticatedWidget")}()}),a.Container=a.Widget.extend({initialize:function(a){if(!("_super"in this)){var b="backbone-super.js is missing!";throw alert(b),b}this._super.apply(this,arguments),this.logger.debug("Container.initialize()"),this.__children=[],this.on("all",this.onWidgetAllEvents),null===this.getParent()&&$(window).load(function(a){return function(){a.logger.debug("Container.onPageLoaded(): page is fully loaded")}}(this))},onWidgetAllEvents:function(b){if(b.slice(0,a.Events.PREFIX_LEN)===a.Events.PREFIX&&b!==a.Events.LayoutChange){this.logger.debug("Container.onWidgetAllEvents(), propagating "+b+" to children");for(var c=0;c<this.__children.length;c++)this.__children[c].trigger.apply(this.__children[c],arguments)}},addChild:function(a){if(!a)throw"Container.addChild(): widget parameter is missing or null";if("function"!=typeof a.getParent)throw"Container.addChild(): invalid widget parameter: not a widget!";this.__children.push(a)},getChildren:function(){return this.__children}},{logger:function(){return cb.core.utils.Logger.getLogger("cb.core.widgets.Container")}()}),a.Model=Backbone.Model.extend({initialize:function(a,b){this.logger||(this.logger=this.constructor.logger),this.logger.debug("Model.initialize()")}},{logger:function(){return cb.core.utils.Logger.getLogger("cb.core.widgets.Model")}()}),a.Collection=Backbone.Collection.extend({initialize:function(a,b){this.logger||(this.logger=this.constructor.logger),this.logger.debug("Collection.initialize()")}},{logger:function(){return cb.core.utils.Logger.getLogger("cb.core.widgets.Collection")}()});var d={};d.logger=cb.core.utils.Logger.getLogger("cb.core.widgets.temp"),d.logger.setLevel(cb.core.utils.Logger.Level.ERROR);var e=new a.Container(null,null,d);return e=null,a}();;cb.core.utils.defineCBNamespace("cb.core.widgets.Identity"),cb.core.widgets.Identity.DeploymentProfile={services:{identityURI:"https://mango.collegeboard.org/cbmango1/prod/api/all/1/identity-links.json",myDataURI:"https://public.cbapis.org/persons/me/basicprofile?api_key={{API-KEY}}"}};;cb.core.utils.defineCBNamespace("cb.core.widgets.Search"),cb.core.widgets.Search.DeploymentProfile={config:{useSuggestionWidget:!0},services:{default:{destination:"https://www.collegeboard.org/search"},search:{destination:"https://www.collegeboard.org/search"},college:{destination:"https://bigfuture.collegeboard.org/sitesearch?searchType=site_qfs&tp=bf&bf_cat=college&q=%term",profile:"https://bigfuture.collegeboard.org/college-profile?id=%id"}}};;cb.core.utils.defineCBNamespace("cb.core.widgets.Suggestion"),cb.core.widgets.Suggestion.DeploymentProfile={services:{default:{autocomplete:"https://content.atomz.com/autocomplete/sp10/04/43/11?max_results=1000&query=%term"},search:{autocomplete:"//content.atomz.com/autocomplete/sp10/04/43/11?max_results=1000&query=%term"},college:{autocomplete:"https://public.cbapis.org/bscsuggestions/suggestions?q=%term&api-key=%apikey"}}};;cb.core.utils.defineCBNamespace("cb.core.widgets.GlobalHeader"),cb.core.widgets.GlobalHeader.DeploymentProfile={config:{useGlobalNavigation:!0,useLoginWidget:!0,useSearchWidget:!0},services:{navigationURI:"https://mango.collegeboard.org/cbmango1/dev/api/all/2/globalheader-links.json",myDataURI:"https://public.cbapis.org/persons/me/basicprofile?api_key={{API-KEY}}"}};;cb.core.utils.defineCBNamespace("cb.core.widgets.GlobalFooter"),cb.core.widgets.GlobalFooter.DeploymentProfile={services:{navigationURI:"https://mango.collegeboard.org/cbmango1/prod/api/all/1/globalfooter-links.json"}};;cb.core.utils.defineCBNamespace("cb.core.widgets.LoginHero"),cb.core.widgets.LoginHero.DeploymentProfile={};;cb.core.utils.defineCBNamespace("cb.core.widgets.Notification"),cb.core.widgets.Notification.DeploymentProfile={services:{notificationURI:"//www.collegeboard.org/api/v1/views/cbalerts.json"}};;cb.core.utils.defineCBNamespace("cb.core.widgets.SiteSearch"),cb.core.widgets.SiteSearch.DeploymentProfile={services:{resultsURI:"https://sp10044311.guided.ss-omtrdc.net/"}};;cb.core.utils.defineCBNamespace("cb.core.widgets.Identity"),cb.core.utils.alertIfNotDefined("cb.core.widgets.framework"),cb.core.widgets.Identity=function(a,b,c){"use strict";function d(a){this.params=[],this.a=document.createElement("a"),this.a.href=a,this._parseParameters()}d.prototype.setParameterAt0=function(a,b){return this.params=c.filter(this.params,function(b){return b.name!=a}),this.params.unshift({name:a,value:b}),this},d.prototype.getURL=function(){var a,b=this.a.protocol+"//"+this.a.host+this.a.pathname;return a=c.map(this.params,function(a){return c.isUndefined(a.value)?a.name:a.name+"="+encodeURIComponent(a.value)}),a.length>0&&(b=b+"?"+a.join("&")),this.a.hash&&(b+=this.a.hash),b},d.prototype._parseParameters=function(){var a,b,c,d,e,f,g=this.a.search;if(this.params=[],!(g.length<1))for(a=g.substring(1).split("&"),b=0,c=a.length;b<c;++b)e="",f=void 0,d=a[b].split("="),e=d[0],d.length>0&&(f=decodeURIComponent(d[1])),this.params.push({name:e,value:f})},d.prototype.removeParameter=function(a){for(var b=this.a.href.split("?")[0],c="",d=0,e=a.length;d<e;d++)for(var f=a[d],g=0,h=this.params.length;g<h;g++){var i=this.params[g];if(f.toLowerCase()===i.name.toLowerCase()){this.params.splice(g,1);break}}if(!this.params.length)return b;for(var d=0,e=this.params.length;d<e;d++){var j=this.params[d].name,k=this.params[d].value;c+="&"+j+"="+k}return c=c.slice(1),void 0===c&&""===c||(b+=b.indexOf("?")!==-1?"&"+c:"?"+c),b};var e={GetData:function(){this.trigger("stateExecute","GetData");var a=this,d=!1;this.getAuthInfo(),void 0!==a.options.services&&void 0!==a.options.services.identityURI&&(d=a.options.services.identityURI),d?c.parseJSONStr(sessionStorage.getItem("cbIdentity"),function(c){c?a.options.data.links=c:b.ajax({url:a.options.services.identityURI,success:function(b){a.options.data.links=b,a.setState(e.Initialize),a.logger.debug("Identity Widget - Retrieving Data from a Service - Success: Using Service Links")},error:function(b){a.setState(e.Initialize),a.logger.debug("Identity Widget - Retrieving Data from a Service - Failure: Using Default Links")},timeout:3e3})}):a.setState(e.Initialize)},Initialize:function(){this.trigger("stateExecute","Initialize"),void 0!==this.template&&this.template&&(this.__showOrHide(!0),this.setState(e.Render))},Render:function(){this.trigger("stateExecute","Render"),this.draw(),this.setState(e.PostRender)},PostRender:function(){this.trigger("stateExecute","PostRender")}},f=cb.core.widgets.framework.AuthenticatedWidget.extend({state:e.GetData,settings:{skin:{template:{uri:"identity.tpl"}},config:{useService:!0,dispatchAfterLogin:!0,redirectUrl:"",endpoints:{professional:"https://account.collegeboard.org/professional/dashboard",student:"https://student.collegeboard.org/",logout:"https://account.collegeboard.org/login/logout",authentication:"https://account.collegeboard.org/login/authenticateUser"}},tracking:{appId:8},data:{user:{isLoggedIn:!1,profile:{account:{isProfessional:!1,isStudent:!1},details:{}}},links:[{name:"My SAT",url:"https://nsat.collegeboard.com/satweb/viewMySatAction.do",type:"student",group:"links",linkCode:"st-mysat"},{name:"PSAT/NMSQT, PSAT 10, and PSAT 8/9 Scores",url:"https://studentscores.collegeboard.org/home",type:"student",group:"links",linkCode:"st-psatscrs"},{name:"AP Scores",url:"https://apscore.collegeboard.org/scores/view-your-scores",type:"student",group:"links",linkCode:"st-apscrs"},{name:"My Plan",url:"https://bigfuture.collegeboard.org/my-organizer?tab=myplan",type:"student",group:"links",linkCode:"st-myplan"},{name:"My Colleges",url:"https://bigfuture.collegeboard.org/my-organizer?tab=mycolleges",type:"student",group:"links",linkCode:"st-mycolls"},{name:"Account Settings",url:"https://cbaccount.collegeboard.org/iamweb/secure/smartUpdate",type:"student",group:"controls",icon:"cb-icon-icn_settings",linkCode:"st-acct"},{name:"My Dashboard",url:"https://cbaccount.collegeboard.org/professional/dashboard",type:"professional",group:"links",linkCode:"pr-dash"},{name:"Account Settings",url:"https://cbaccount.collegeboard.org/professional/viewProfile",type:"professional",group:"controls",icon:"cb-icon-icn_settings",linkCode:"pr-acct"}]}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options),this.namespace=(cb.core.widgets.Identity.NAME+"-"+cb.core.widgets.Identity.VERSION+"-"+this.cid).replace(/s/g,"-").toLowerCase(),this.options.config.useService&&(this.state=e.GetData,this.logger.debug("Identity Widget - Retrieving Data from a Service"))},applyDefaults:function(c){var d=b.extend(!0,{},this.settings,this.options,a.DeploymentProfile,c);return d},setState:function(a){this.state=a,this.render()},redirect:function(){if(""!=window.location.search&&this.options.config.dispatchAfterLogin){var a=window.location.search.substring(1).split("&"),b=cb.core.widgets.Identity.getState();a.length>0&&c.each(a,function(a){var c=a.split("=");if(c.length>1&&"redirect"==c[0]&&"on"==c[1]){if(!b)return;b.isRegUser?window.location.replace(this.options.endpoints.student):b.isProUser&&window.location.replace(this.options.endpoints.professional)}})}},buildContext:function(){var a=this.options.config,e=this.options.data,f=this.options.tracking,g=b.extend(c.pick(a,"dispatchAfterLogin","endpoints"),{user:this.getUserLoginInfo()});g.appId=f.appId;for(var h=c.filter(e.links,function(a){return"student"===a.type}),i=0,j=h.length;i<j;i++)void 0!==h[i].linkCode&&void 0!==f&&(h[i].tracking=f.siteCode+"-"+h[i].linkCode,h[i].url.indexOf("?")!==-1?h[i].trackingURL=h[i].url+"&navId="+h[i].tracking:h[i].trackingURL=h[i].url+"?navId="+h[i].tracking);for(var k=c.filter(e.links,function(a){return"professional"===a.type}),i=0,j=k.length;i<j;i++)void 0!==k[i].linkCode&&void 0!==f&&(k[i].tracking=f.siteCode+"-"+k[i].linkCode,k[i].url.indexOf("?")!==-1?k[i].trackingURL=k[i].url+"&navId="+k[i].tracking:k[i].trackingURL=k[i].url+"?navId="+k[i].tracking);return g.links={student:{all:h,links:c.filter(h,function(a){return"links"===a.group}),controls:c.filter(h,function(a){return"controls"===a.group})},professional:{all:k,links:c.filter(k,function(a){return"links"===a.group}),controls:c.filter(k,function(a){return"controls"===a.group})}},g.redirectUrl=""===a.redirectUrl?window.location.href:a.redirectUrl,g.redirectUrl=new d(g.redirectUrl).removeParameter(["TST","userName"]),g.redirectUrlEncoded=encodeURIComponent(g.redirectUrl),g.endpoints=a.endpoints,g.widgetId=this.cid,g},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},update:function(a){this.options=this.applyDefaults(a),this.$el=b(this.options.placement.domElement),this.setState(e.Initialize)},getUserData:function(a){var c=this,d=this.getAuthSession();if(d.isLoggedIn){var e=cb.core.utils.getAPIKey(),f=this.finalizeMyStyleURLWithEnv(this.options.services.myDataURI).replace("{{API-KEY}}",e);b.ajax({context:this,url:f,type:"GET",dataType:"json",timeout:3e3,beforeSend:function(a){a.setRequestHeader("Authorization","CBLogin "+d.sessionId)}}).done(function(b){c.trigger("onAuthRetrievalCompleteSuccess",b),a.onSuccess(b)}).fail(function(b){c.trigger("onAuthRetrievalCompleteFailure",b),a.onFailure(b)})}},getAuthInfo:function(){if(void 0===this.getAuthSession)return!1;var a=this.getAuthSession();return!!a.isLoggedIn&&a},getUserLoginInfo:function(){var a={isLoggedIn:!1,profile:{account:{isProfessional:!1,isStudent:!1},details:{}}},b=(this.options.config.accountType,this.options.config.mode,this.getAuthInfo());return b&&b.isLoggedIn?(a.isLoggedIn=b.isLoggedIn,a.profile.account.isProfessional=b.basicProfile.isProfessional,a.profile.account.isStudent=b.basicProfile.isStudent,a.profile.details.userName=b.basicProfile.userName,a.profile.details.firstName=b.basicProfile.firstName,a.info=b,this.options.data.user=a,this.options.data.user):(this.options.data.user=a,this.options.data.user)},onLogin:function(){this.logger.debug("onLogin()"),this.update()},onLogout:function(){this.logger.debug("onLogout()"),this.update()}},{NAME:"Identity",VERSION:"5.0.0",Events:{LoginLogout:cb.core.iam.events.LegacyLoginLogout},getState:function(){return cb.core.iam.getLegacyState()}});return c.extend(f,a)}(cb.core.widgets.Identity,$,_);;cb.core.utils.defineCBNamespace("cb.core.widgets.LoginHero"),cb.core.utils.alertIfNotDefined("cb.core.widgets.framework"),cb.core.widgets.LoginHero=function(a,b,c){"use strict";var d={GetData:function(){this.trigger("stateExecute","GetData");var a=this;this.initializeIdentityWidget(),this.identity.on("stateExecute",function(b){"PostRender"===b&&(a.identity.off("stateExecute"),a.setState(d.Initialize))})},Initialize:function(){this.trigger("stateExecute","Initialize"),void 0!==this.template&&this.template&&(this.__showOrHide(!0),this.setState(d.Render))},Render:function(){this.trigger("stateExecute","Render"),this.draw(),this.setState(d.PostRender)},PostRender:function(){this.trigger("stateExecute","PostRender"),this.identity.update(),this.initializeResponsive()}},e=cb.core.widgets.framework.AuthenticatedWidget.extend({state:d.GetData,settings:{skin:{template:{uri:"login-hero.tpl"}},config:{},tracking:{appId:8},content:{guest:{headline:"I want to be, the very best",descriptive:"Like no one ever was",images:{lg:"../src/img/guest-desktop.jpg",md:"../src/img/guest-desktop.jpg",sm:"../src/img/guest-desktop.jpg",xs:"../src/img/guest-mobile.jpg"}},professional:{headline:"To catch them is my real test",descriptive:"",images:{lg:"../src/img/professional-desktop.jpg",md:"../src/img/professional-desktop.jpg",sm:"../src/img/professional-desktop.jpg",xs:"../src/img/professional-mobile.jpg"}},student:{headline:"To train them is my cause",descriptive:"",images:{lg:"../src/img/student-desktop.jpg",md:"../src/img/student-desktop.jpg",sm:"../src/img/student-desktop.jpg",xs:"../src/img/student-mobile.jpg"}}}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options),this.namespace=(cb.core.widgets.LoginHero.NAME+"-"+cb.core.widgets.LoginHero.VERSION+"-"+this.cid).replace(/\s/g,"-").replace(/\./g,"-").toLowerCase()},initializeIdentityWidget:function(){if(void 0===this.identity){var a=".lv-login-hero-widget-"+this.cid+" .lv-identity-widget";this.identity=new cb.core.widgets.Identity({placement:{domElement:a},skin:{template:{uri:"login-hero-identity.tpl"}},tracking:{appId:this.options.tracking.appId}})}},initializeResponsive:function(){if(void 0!==cb.apricot){var a=this.findInsideWidgetDOM(".lv-login-hero-widget .cb-hero");a.cbResponsiveImage()}else this.logger.debug("WARNING: Login Hero Widget Requires Apricot to be fully supported!")},applyDefaults:function(c){var d=b.extend(!0,{},this.settings,this.options,a.DeploymentProfile,c);return d},setState:function(a){this.state=a,this.render()},buildContext:function(){var a=b.extend({},this.options.content.guest);if(void 0!==this.identity){var c=this.identity.getUserLoginInfo();if(c.isLoggedIn){if(c.profile.account.isProfessional){a=b.extend({},this.options.content.professional);var d=Handlebars.compile(a.headline),e=d(c.profile.details);a.headline=e}if(c.profile.account.isStudent){a=b.extend({},this.options.content.student);var d=Handlebars.compile(a.headline),e=d(c.profile.details);a.headline=e}}}return a.isLoggedIn=c.isLoggedIn,a.id=this.cid,a},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},update:function(a){this.options=this.applyDefaults(a),this.$el=b(this.options.placement.domElement),this.setState(d.GetData)},onLogin:function(){this.logger.debug("onLogin()"),this.update()},onLogout:function(){this.logger.debug("onLogout()"),this.update()}},{NAME:"Login Hero",VERSION:"1.0.0"});return c.extend(e,a)}(cb.core.widgets.LoginHero,$,_);;cb.core.widgets.Search.Default=function(a){var b=function(b){this.init=function(a){this.options=a},this.buildContext=function(){var a=this.options,c=this.options.config,d=_.pick(c,"searchType","logo");return d.uniqueSearch=this.isUniqueSearch(d.searchType),d.searchURL=a.services.search.destination,d.startValue=a.config.startValue,d.useSuggestionWidget=a.config.useSuggestionWidget,d.id=b.cid,d},this.isUniqueSearch=function(a){switch(a){case"accu_site":return{x:"u4",facet:"ACCUPLACER"};case"clep_site":return{x:"u4",facet:"CLEP"};case"sb_site":return{x:"u4",facet:"SpringBoard"};case"bf_site":return{x:"u4",facet:"College Planning"}}return!1},this.initializeSuggestionWidget=function(){var c=".lv-search-widget-id-"+b.cid+" .lv-suggestions",d={placement:{domElement:c},skin:{template:{uri:"suggestion.tpl"}},config:a.extend({},this.options.config.widgets.suggestion.config,{serviceName:"search",widgets:{search:{context:b}}}),setup:this.options.config.widgets.suggestion.setup};void 0===b.suggestion?b.suggestion=new cb.core.widgets.Suggestion(d):b.suggestion.update(d)},this.onSubmit=function(a){b.submitSearch(a)},this.initializeBehaviors=function(){b.suggestion.on("onSuggestionSelect",this.onSuggestionClick,this),b.suggestion.on("onSuggestionFocus",this.onSuggestionFocus,this);var c=this;a(document).off("click."+b.namespace).on("click."+b.namespace,function(d){var e=b.findInsideWidgetDOM('input[data-search="search"]'),f=a(d.target),g=f.closest(c.$el);g.length||(b.suggestion.clearSuggestions(),e.attr("aria-activedescendant",""))})},this.onSuggestionClick=function(a){var c=b.findInsideWidgetDOM('input[data-search="search"]'),d=a.data("name");c.val(d),b.submitSearch()},this.onSuggestionFocus=function(a){var c=b.findInsideWidgetDOM('input[data-search="search"]');c.attr("aria-activedescendant",""),a.length&&c.attr("aria-activedescendant",a)},this.onSearchKeyUp=function(c){var d=a(c.currentTarget);if(d.data("search").indexOf("search")!==-1){var e=d.val().trim();e.length>=this.options.config.sensitivity?b.suggestion.retrieveSuggestions(e):b.suggestion.clearSuggestions()}},this.init(b.options)};return b}($);;cb.core.widgets.Search.College=function(a){var b=function(b){this.init=function(a){this.options=a},this.initializeSuggestionWidget=function(){var c=".lv-search-widget-id-"+b.cid+" .lv-suggestions";b.suggestion=new cb.core.widgets.Suggestion({placement:{domElement:c},skin:{template:{uri:"suggestion-college.tpl"}},config:a.extend({},this.options.config.widgets.suggestion.config,{formatFunction:this.formatSuggestions,serviceName:"college",widgets:{search:{context:b}}}),setup:this.options.config.widgets.suggestion.setup})},this.formatSuggestions=function(b){for(var c=[],d=0,e=b.suggestionResponses.length;d<e;d++){var f=a.extend({},b.suggestionResponses[d]);c.push(f)}return c},this.buildContext=function(){var a=this.options,c=this.options.config,d=_.pick(c,"searchType","logo");return d.searchURL=a.services.college.destination,d.startValue=a.config.startValue,d.useSuggestionWidget=a.config.useSuggestionWidget,d.id=b.cid,d},this.initializeBehaviors=function(){b.suggestion.on("onSuggestionSelect",this.onSuggestionClick,this),b.suggestion.on("onSuggestionFocus",this.onSuggestionFocus,this);var c=this;a(document).off("click."+b.namespace).on("click."+b.namespace,function(d){var e=b.findInsideWidgetDOM('input[data-search="search"]'),f=a(d.target),g=f.closest(c.$el);g.length||(b.suggestion.clearSuggestions(),e.attr("aria-activedescendant",""))})},this.onSubmit=function(a){b.submitSearch(a)},this.onSuggestionClick=function(a){var c=b.findInsideWidgetDOM('input[data-search="search"]'),d=a.data("name"),e=a.data("id"),f=this.options.services.college.profile,g=f.replace("%id",e);c.val(d),window.location.href=g},this.onSuggestionFocus=function(a){var c=b.findInsideWidgetDOM('input[data-search="search"]');c.attr("aria-activedescendant",""),a.length&&c.attr("aria-activedescendant",a)},this.onSearchKeyUp=function(c){var d=a(c.currentTarget);if(d.data("search").indexOf("search")!==-1){var e=d.val().trim();e.length>=this.options.config.sensitivity?b.suggestion.retrieveSuggestions(e):b.suggestion.clearSuggestions()}},this.init(b.options)};return b}($);;cb.core.widgets.Search=function(a,b){"use strict";var c=function(){this.keyboardInput=[]};c.prototype.init=function(){for(var a=0;a<200;a++)this.keyboardInput=!1},c.prototype.keyDown=function(a){this.keyboardInput[a]=!0},c.prototype.keyUp=function(a){this.keyboardInput[a]=!1},c.prototype.getKey=function(a){return this.keyboardInput[a]},c.prototype.getActiveKeys=function(){for(var a=[],b=0,c=this.keyboardInput.length;b<c;b++){var d=this.keyboardInput[b];d&&a.push(b)}return a};var d={Initialize:function(){void 0===this.keyboardInput&&(this.keyboardInput=new c),"undefined"!=typeof this.template&&this.template&&(this.__showOrHide(!0),this.setState(d.Render))},Render:function(){this.draw(),this.setState(d.PostRender)},PostRender:function(){this.initializeSuggestionWidget(),this.initializeBehaviors()}},e=cb.core.widgets.framework.Widget.extend({state:d.Initialize,settings:{skin:{template:{uri:"search.tpl"}},config:{sensitivity:2,searchType:"site",strategy:cb.core.widgets.Search.Default,useSuggestionWidget:!0,widgets:{suggestion:{skin:{template:{uri:"suggestion.tpl"}},setup:{headers:{Accept:"application/javascript","Content-Type":"application/javascript"},dataType:"jsonp"}}}}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options),this.namespace=(cb.core.widgets.Search.NAME+"-"+cb.core.widgets.Search.VERSION+"-"+this.cid).replace(/\s/g,"-").replace(/\./g,"-").toLowerCase(),this.strategy=this.options.config.strategy,this.behaviors=new this.strategy(this)},initializeSuggestionWidget:function(){this.options.config.useSuggestionWidget&&this.behaviors.initializeSuggestionWidget()},initializeBehaviors:function(){this.options.config.useSuggestionWidget&&this.behaviors.initializeBehaviors()},applyDefaults:function(c){var d=b.extend(!0,{},this.settings,a.DeploymentProfile,c);return d},setState:function(a){this.state=a,this.render()},buildContext:function(){var a=this.behaviors.buildContext();return a},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},update:function(a){this.options=this.applyDefaults(a),this.$el=b(this.options.placement.domElement),this.setState(d.Initialize)},clear:function(){var a=this.findInsideWidgetDOM('input[data-search="search"]');a.val("")},submitSearch:function(a){var b=this.findInsideWidgetDOM('input[data-search="search"]'),c=this.findInsideWidgetDOM("form"),d=b.val().trim();d.length?c[0].submit():a.preventDefault()},onSuggestionClick:function(a){this.behaviors.onSuggestionClick(a)},events:{"submit form":"onFormSubmit",'click .input-group .input-group-btn button[type="submit"]':"onSubmitClick","click .input-group .input-group-btn a":"onSubmitClick","focus input":"onInputFocus","keydown input":"onSearchKeyDown","keyup input":"onSearchKeyUp","keyup .lv-suggestion-widget":"onSuggestionWidgetKeyUp"},onFormSubmit:function(a){this.behaviors.onSubmit(a)},onSubmitClick:function(a){a.preventDefault(),this.behaviors.onSubmit(a)},onInputFocus:function(a){this.trigger("onFocus")},onSearchKeyDown:function(a){var b=a.which||a.keycode;this.keyboardInput.keyDown(b)},onSearchKeyUp:function(a){var b=a.which||a.keycode;this.options.config.useSuggestionWidget&&((_.isKey(b,"ALPHANUMERIC")||_.isKey(b,"BACKSPACE")||_.isKey(b,"SPACE")||_.isKey(b,"ANDROID_SOFTWARE_KEYBOARD"))&&this.behaviors.onSearchKeyUp(a),_.isKey(b,"DOWN")&&(this.suggestion.isOpen()?this.suggestion.setIndexFocus(0):this.behaviors.onSearchKeyUp(a)),(_.isKey(b,"ESC")||_.isKey(b,"TAB"))&&this.suggestion.clearSuggestions()),this.keyboardInput.keyUp(b)},onSuggestionWidgetKeyUp:function(a){var b=a.which||a.keycode,c=this.findInsideWidgetDOM("input");_.isKey(b,"ESC")&&(this.suggestion.clearSuggestions(),c.focus())}},{NAME:"Search",VERSION:"2.0.0"});return _.extend(e,a)}(cb.core.widgets.Search,$);;cb.core.utils.defineCBNamespace("cb.core.widgets.Suggestion"),cb.core.utils.alertIfNotDefined("cb.core.widgets.framework"),cb.core.widgets.Suggestion=function(a,b){"use strict";var c={nearestThenInAlphabeticalOrder:function(a,b){var c=a.filter(function(a){return 0===a.name.toLowerCase().indexOf(b.toLowerCase())});return _.uniq(c.concat(a))},levenshtein:function(a,b){for(var c=[],d=function(a){for(var b=0,d=c.length;b<d;b++){var e=c[b];if(e.index===a)return e}return c.push({index:a,items:[]}),c[c.length-1]},e=function(a,b){return a.index>b.index?1:a.index<b.index?-1:0},f=function(a){a=a.sort(e);for(var b=[],c=0,d=a.length;c<d;c++)for(var f=a[c],g=0,h=f.items.length;g<h;g++)b.push(f.items[g]);return b},g=0,h=a.length;g<h;g++){var i=a[g],j=i.indexOf(b);if(j!==-1){var k=d(j);k.items.push(i)}}return f(c)}},d={Initialize:function(){"undefined"!=typeof this.template&&this.template&&this.setState(d.Render)},Render:function(){this.draw(),this.setState(d.PostRender)},PostRender:function(){this.__showOrHide(!0)}},e=cb.core.widgets.framework.Widget.extend({version:"2.0.0",state:d.Initialize,settings:{data:{suggestions:[]},config:{limit:10,useHighlight:!1,useStatus:!1,serviceName:"default"},setup:{headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},dataType:"json"}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options),this.namespace=(cb.core.widgets.Suggestion.NAME+"-"+cb.core.widgets.Suggestion.VERSION+"-"+this.cid).replace(/\s/g,"-").replace(/\./g,"-").toLowerCase()},applyDefaults:function(c){var d=b.extend(!0,{},this.settings,a.DeploymentProfile,c);return void 0!==c.services&&(d.services=b.extend(!0,{},d.services,c.services)),void 0===d.config.parseFunction&&(d.config.parseFunction=this.parseSuggestions),void 0===d.config.formatFunction&&(d.config.formatFunction=this.formatSuggestions),void 0===d.config.prepareFunction&&(d.config.prepareFunction=this.prepareSuggestion),d},setState:function(a){this.state=a,this.render()},buildContext:function(){var a={widgets:this.options.config.widgets,suggestions:this.options.data.suggestions,limit:this.options.data.limit,results:this.options.data.results,useStatus:this.options.config.useStatus,namespace:this.namespace};return this.options.config.limit<0&&(a.scrollable=!0),a},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},update:function(a){this.options=this.applyDefaults(a),this.$el=b(this.options.placement.domElement),this.setElement(this.$el),this.setState(d.Initialize)},setPreviousIndex:function(a){var b=this.findInsideWidgetDOM("li"),c=b.index(a);c--,c<0&&(c=b.length-1),this.setIndexFocus(c)},setNextIndex:function(a){var b=this.findInsideWidgetDOM("li"),c=b.index(a);c++,c>=b.length&&(c=0),this.setIndexFocus(c)},setIndexFocus:function(a){var c=this.findInsideWidgetDOM("li"),d=c[a];if(void 0!==d){var e=b(d),f=e.find("a");f.focus()}},retrieveSuggestions:function(a){var b=this,c=this.fetchSuggestions(a);c.done(function(c){var d;d="[object Array]"===Object.prototype.toString.call(c)||"[object Object]"===Object.prototype.toString.call(c)?c:"jsonp"===b.options.setup.dataType?c:c.responseJSON||JSON.parse(c.responseText),c=b.options.config.formatFunction(d),b.options.data={suggestions:b.options.config.parseFunction(c,a),limit:b.options.config.limit,results:d.length},b.trigger("onRetrieveComplete"),b.draw()})},fetchSuggestions:function(a){var c=this,d=this.options.services[this.options.config.serviceName],e=cb.core.utils.getAPIKey(),f=d.autocomplete.replace("%term",a).replace("%apikey",e),g=this.options.setup;return g.url=f,g.success=function(a){c.trigger("onFetchSuccess",a)},g.error=function(a){c.trigger("onFetchError")},b.ajax(g)},formatSuggestions:function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e={id:c,name:a[c]};b.push(e)}return b},prepareSuggestion:function(a){var c=b.extend({namespace:a.name.replace(/\s/g,"-").replace(/\./g,"-").toLowerCase()},a);return c},parseSuggestions:function(a,b){var d=[],e=c.nearestThenInAlphabeticalOrder(a,b);this.limit>0&&(e=e.slice(0,this.limit));for(var f=function(a){var b=a;return"("+b+")"},g=f(b),h=new RegExp(g,"ig"),i=function(a,b){for(var c=0,d=b.length;c<d;c++)if(a===b[c])return!0;return!1},j=0,k=e.length;j<k;j++){var l=e[j],m=l.name;if(this.useHighlight){for(var n,o=[];n=h.exec(l);){var p=l.slice(n.index,n.index+b.length);i(p,o)||o.push(p)}for(var q=0,r=o.length;q<r;q++){var p=o[q],s=new RegExp(p,"g");m=l.replace(s,'<span class="lv-highlight">'+p+"</span>")}}l.output=m,d.push(this.prepareFunction(l))}return d},clearSuggestions:function(){this.options.data.suggestions=[],this.draw()},isOpen:function(){var a=this.findInsideWidgetDOM("li");return!!a.length},events:{"click li a":"onItemClick","focus li a":"onItemFocus","keydown li":"onListItemKeyDown","keyup li":"onListItemKeyUp"},onItemClick:function(a){a.preventDefault(),console.log("hello?");var c=b(a.target);this.trigger("onSuggestionSelect",c),this.clearSuggestions()},onItemFocus:function(a){a.preventDefault(),this.trigger("onSuggestionFocus",a.target.id)},onListItemKeyDown:function(a){var b=a.which||a.keycode;a.shift;(_.isKey(b,"TAB")||_.isKey(b,"UP")||_.isKey(b,"DOWN"))&&a.preventDefault()},onListItemKeyUp:function(a){var c=a.which||a.keycode,d=a.shiftKey,e=b(a.currentTarget);d?_.isKey(c,"TAB")&&this.setPreviousIndex(e):(_.isKey(c,"UP")&&this.setPreviousIndex(e),(_.isKey(c,"DOWN")||_.isKey(c,"TAB"))&&this.setNextIndex(e))}},{NAME:"Suggestion",VERSION:"2.0.0"});return _.extend(e,a)}(cb.core.widgets.Suggestion,$);;cb.core.widgets.SiteSearch=function(a,b){"use strict";var c={GetData:function(){var a=this,d=this.parseParameters(this.getSearchParameters());if(void 0!==d.word&&(this.options.data.startValue=d.word),void 0!==d.siteType&&(this.options.config.siteType=d.siteType),void 0!==d.logo&&(this.options.config.logo=d.logo),this.options.config.siteType=this.parseLogo(),d.word&&d.tp&&d.searchType&&!this.flags.isRetrievingData){this.flags.isRetrievingData=!0,this.options.tracking.pageView.loading();var e=this.buildURL(d);b.ajax({url:e,type:"GET",cache:!0,dataType:"jsonp",success:function(b){a.options.data=b,a.options.data.startValue=d.word,a.options.data.searchType=d.searchType,a.flags.isRetrievingData=!1,a.flags.isDoneRetrieving=!0,a.flags.isSuccessful=!0,a.initializeAnalytics(),a.state===c.Update&&a.setState(c.Update)},error:function(b){a.options.tracking.pageView.error(),a.flags.isRetrievingData=!1,a.flags.isDoneRetrieving=!0,a.flags.isSuccessful=!1,a.state===c.Update&&a.setState(c.Update)}})}this.setState(c.Initialize)},Initialize:function(){"undefined"!=typeof this.template&&this.template&&(this.__showOrHide(!0),this.setState(c.Render))},Render:function(){this.draw(),this.setState(c.PostRender)},PostRender:function(){this.intializeSearchWidget(),this.initializeSearchResults(),this.initializeSearchSidebar(),this.initializeSearchFilters(),this.initializeBehaviors(),this.setState(c.Update)},Update:function(){var a=this.buildContext();this.results&&this.results.update({data:{searchTerm:this.options.data.startValue,results:a.results,pagination:a.pagination,banners:a.banners,flags:this.flags}}),this.sidebar&&this.sidebar.update({data:{facets:a.facets}}),this.filters&&this.filters.update({data:{facets:a.facets,flags:this.flags}}),this.flags.isRetrievingData===!1&&this.flags.isDoneRetrieving===!0&&this.flags.isSuccessful&&this.options.tracking.pageView.loaded()}},d=cb.core.widgets.framework.Widget.extend({state:c.GetData,flags:{isRetrievingData:!1,isDoneRetrieving:!1,isSuccessful:!1},settings:{skin:{template:{uri:"sitesearch.tpl"}},config:{siteType:"",logo:""},data:{startValue:""},tracking:{}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options),this.namespace=(cb.core.widgets.SiteSearch.NAME+"-"+cb.core.widgets.SiteSearch.VERSION+"-"+this.cid).replace(/\s/g,"-").replace(/\./g,"-").toLowerCase(),this.initializeTracking()},intializeSearchWidget:function(){var a={placement:{domElement:".lv-sitesearch-widget .lv-search-widget"},config:{startValue:this.options.data.startValue.replace(/\+/g," ")}};void 0===this.search&&(this.search=new cb.core.widgets.Search(a))},initializeSearchResults:function(){void 0===this.results&&(this.results=new cb.core.widgets.SiteSearch.Results({placement:{domElement:".lv-sitesearch-widget .lv-sitesearch-results"}}))},initializeSearchSidebar:function(){void 0===this.sidebar&&(this.sidebar=new cb.core.widgets.SiteSearch.Sidebar({placement:{domElement:".lv-sitesearch-widget .lv-sitesearch-sidebar"}}))},initializeSearchFilters:function(){void 0===this.filters&&(this.filters=new cb.core.widgets.SiteSearch.Filters({placement:{domElement:".lv-sitesearch-widget .lv-sitesearch-filters"}}))},initializeAnalytics:function(){void 0===window.cbTrackData&&(window.cbTrackData={});var a=parseInt(this.options.data.resultcount.total.replace(/,/g,""));window.cbTrackData.searchType=this.options.data.searchType,window.cbTrackData.searchTerm=this.options.data.startValue,window.cbTrackData.searchResultsCount=""+a},initializeTracking:function(){var a=this,b=function(b){void 0!==window._satellite?window._satellite.track(b):a.logger.debug("TRACKING - "+b)};this.options.tracking.pageView={loading:function(){b("cbTrack.pageView.siteSearch.loading")},loaded:function(){b("cbTrack.pageView.siteSearch.loaded")},error:function(){b("cbTrack.pageView.siteSearch.error")}}},initializeBehaviors:function(){var a=this,c=_.debounce(function(){var b=a.findInsideWidgetDOM(".lv-sidebar"),c=a.findInsideWidgetDOM(".lv-content");a.isMobile()?(b.hide(),c.show()):(b.show(),c.show())},250);b(window).off("resize."+this.namespace).on("resize."+this.namespace,c)},applyDefaults:function(c){var d=b.extend(!0,{},this.settings,a.DeploymentProfile,c);return d},setState:function(a){this.state=a,this.render()},buildURL:function(a){var b=this.createParameters(a),c=this.options.services.resultsURI+b;return c},isMobile:function(){var a=this.findInsideWidgetDOM(".lv-mobile-detector");return"none"!==a.css("display")},getSearchParameters:function(){var a=window.location.search;return a},removeParameters:function(a,b){for(var c=(a.split("?")[0],a.split("?")[1]),d=this.parseParameters(c),e=0,f=b.length;e<f;e++)delete d[b[e]];return this.createParameters(d)},createParameters:function(a){var b="";for(var c in a)if(a.hasOwnProperty(c)){var d=encodeURIComponent(c),e=encodeURIComponent(a[c]).replace(/%2B/g,"+").replace(/%20/g," ");b=b+d+"="+e+"&"}return b="?"+b.substr(0,b.length-1)},parseParameters:function(a){0===a.indexOf("?")&&(a=a.substr(1));for(var b=a.split("&"),c=[],d=0,e=b.length;d<e;d++){var f=b[d].split("="),g=decodeURIComponent(f[0]),h=decodeURIComponent(f[1]);c[g]=h}return c},parseLogo:function(){var a=this.options.config.logo.toLowerCase();if(void 0!==a){if(a.indexOf("sat")!==-1||a.indexOf("search")!==-1||"ap"===a||"springboard"===a)return"k-12";if("bigfuture"===a)return"access";if("clep"===a||"accuplacer"===a)return"higher-ed"}return!1},parseBanners:function(){var a=this.options.data;if(void 0!==a.banners){var b=[];return""!==a.banners.related_search&&b.push({content:a.banners.related_search,type:"related_search"}),""!==a.banners.site_bottom&&b.push({content:a.banners.site_bottom,type:"site_bottom"}),""!==a.banners.site_bottom2&&b.push({content:a.banners.site_bottom2,type:"site_bottom2"}),""!==a.banners.site_top&&b.push({content:a.banners.site_top,type:"site_top"}),""!==a.banners.trustee_search&&b.push({content:a.banners.trustee_search,type:"trustee_search"}),""!==a.banners["global-noresults"]&&b.push({content:a.banners["global-noresults"],type:"global-noresults"}),b}},parseFacets:function(){var a=this.options.data;if(void 0===a.facets)return!1;if(void 0===a.facets.t2.values&&void 0===a.facets.t1.values&&void 0===a.facets.t4.values)return!1;for(var b={groups:[{key:"audience",label:"Audience",values:a.facets.t2.values},{key:"type",label:"Type",values:a.facets.t1.values},{key:"category",label:"Category",values:a.facets.t4.values}]},c=[],d=0,e=b.groups.length;d<e;d++){var f=b.groups[d];if(void 0!==f.values)for(var g=0,h=f.values.length;g<h;g++){var i=f.values[g];""!==i.undolink&&(i.link=i.undolink),i.link.indexOf("site_ref")===-1&&(i.link=i.link.replace("searchType=site","searchType=site_ref")),i.link=this.removeParameters(i.link,["callback"]),"false"===i.selected?i.selected=!1:"true"===i.selected&&(i.selected=!0,c.push(i))}}return c.length>0&&(b.filters=c),b},parseResults:function(){var a=this.options.data;if(void 0===a.results)return!1;if(a.results.length<=0)return!1;for(var b=0,c=a.results.length;b<c;b++){a.results[b];a.results[b].description=a.results[b].description.replace(/</g,"&lt;"),a.results[b].title=a.results[b].title.replace(/</g,"&lt;"),a.results[b].url=a.results[b].url.replace(/%amp;/g,"&")}var d={items:a.results,total:a.resultcount.total,upper:a.resultcount.pageupper,lower:a.resultcount.pagelower};return d},parsePagination:function(){var a=this.options.data;if(void 0===a.pagination)return!1;if(a.pagination.pages.length<=1)return!1;for(var b=0,c=a.pagination.pages.length;b<c;b++){var d=a.pagination.pages[b];"true"===d.selected?a.pagination.pages[b].selected=!0:a.pagination.pages[b].selected=!1,d.link=this.removeParameters(d.link,["callback"])}""===a.pagination.next?a.pagination.next=!1:a.pagination.next=this.removeParameters(a.pagination.next,["callback"]),""===a.pagination.last?a.pagination.last=!1:a.pagination.last=this.removeParameters(a.pagination.last,["callback"]),""===a.pagination.previous?a.pagination.previous=!1:a.pagination.previous=this.removeParameters(a.pagination.previous,["callback"]);var e=this.parseParameters(this.getSearchParameters());e.page||(a.pagination.pages[0].selected=!0);var f=a.pagination;return f},parseData:function(){var a={banners:this.parseBanners(),facets:this.parseFacets(),results:this.parseResults(),pagination:this.parsePagination()};return a},buildContext:function(){var a=this.parseData();return a.siteType=this.options.config.siteType,a},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},events:{'click a[name="clear-filters"]':"onClearFiltersClick",'click button[name="add-filters"]':"onAddFiltersButtonClick","click a.lv-back-to-search":"onBackToSearchLinkClick"},onClearFiltersClick:function(a){a.preventDefault();var b=this.removeParameters(this.getSearchParameters(),["q1","q2","q3","rank","callback"]);window.location.assign(b)},onAddFiltersButtonClick:function(a){a.preventDefault();var b=this.findInsideWidgetDOM(".lv-sidebar"),c=this.findInsideWidgetDOM(".lv-content");b.show(),c.hide()},onBackToSearchLinkClick:function(a){a.preventDefault();var b=this.findInsideWidgetDOM(".lv-sidebar"),c=this.findInsideWidgetDOM(".lv-content");b.hide(),c.show()}},{NAME:"Site Search",VERSION:"3.0.0"});return _.extend(d,a)}(cb.core.widgets.SiteSearch,$);;cb.core.widgets.SiteSearch.Results=function(a,b){var c={Initialize:function(){"undefined"!=typeof this.template&&this.template&&(this.__showOrHide(!0),this.setState(c.Render))},Render:function(){this.draw(),this.setState(c.PostRender)},PostRender:function(){this.setState(c.Ready)},Ready:function(){}};return cb.core.widgets.framework.Container.extend({state:c.Initialize,settings:{skin:{template:{uri:"sitesearch-results.tpl"}},data:{isRetrievingData:!1}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options)},applyDefaults:function(b){var c=a.extend(!0,{},this.settings,this.options,b);return c},buildContext:function(){return this.options.data.searchTerm=this.options.data.searchTerm.replace(/\+/g," "),this.options.data},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},update:function(b){this.options=this.applyDefaults(b),this.$el=a(this.options.placement.domElement),this.setState(c.Initialize)},setState:function(a){this.state=a,this.render()}})}(jQuery,_);;cb.core.widgets.SiteSearch.Filters=function(a,b){var c={Initialize:function(){"undefined"!=typeof this.template&&this.template&&(this.__showOrHide(!0),this.setState(c.Render))},Render:function(){this.draw(),this.setState(c.PostRender)},PostRender:function(){this.setState(c.Ready)},Ready:function(){}};return cb.core.widgets.framework.Container.extend({state:c.Initialize,settings:{skin:{template:{uri:"sitesearch-filters.tpl"}},data:{}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options)},applyDefaults:function(b){var c=a.extend(!0,{},this.settings,this.options,b);return c},buildContext:function(){return this.options.data},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},update:function(b){this.options=this.applyDefaults(b),this.$el=a(this.options.placement.domElement),this.setState(c.Initialize)},setState:function(a){this.state=a,this.render()}})}(jQuery,_);;cb.core.widgets.SiteSearch.Sidebar=function(a,b){var c={Initialize:function(){"undefined"!=typeof this.template&&this.template&&(this.__showOrHide(!0),this.setState(c.Render))},Render:function(){this.draw(),this.setState(c.PostRender)},PostRender:function(){this.setState(c.Ready)},Ready:function(){}};return cb.core.widgets.framework.Container.extend({state:c.Initialize,settings:{skin:{template:{uri:"sitesearch-sidebar.tpl"}},data:{}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options)},applyDefaults:function(b){var c=a.extend(!0,{},this.settings,this.options,b);return c},buildContext:function(){return this.options.data},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},update:function(b){this.options=this.applyDefaults(b),this.$el=a(this.options.placement.domElement),this.setState(c.Initialize)},setState:function(a){this.state=a,this.render()}})}(jQuery,_);;cb.core.widgets.GlobalHeader=function(a,b,c){function d(a){this.widget=a,this.panels=[],this.activePanel=null}function e(a,b,c){this.name=a,this.context=b,this.events=c}d.prototype.addPanel=function(a){this.panels.push(a)},d.prototype.getPanel=function(a){for(var b=0,c=this.panels.length;b<c;b++){var d=this.panels[b];if(d.name.toLowerCase()===a.toLowerCase())return d}return!1},d.prototype.getActivePanel=function(){return this.activePanel},d.prototype.isPanel=function(a,b){return!!a&&(!!b&&a.name.toLowerCase()===b.name.toLowerCase())},d.prototype.togglePanel=function(a){var b=this.widget,c=this,d=this.getPanel(a);return!this.activePanel||this.isPanel(d,this.activePanel)?d!==!1&&(d.isOpen()?d.hide({onComplete:function(){b.unlockPage(),c.activePanel=null}}):d.show({onStart:function(){b.lockPage(),c.activePanel=d}})):this.activePanel.hide({onStart:function(){d.show(),c.activePanel=d}}),d},e.prototype.isOpen=function(){return this.context.isOpen()},e.prototype.show=function(a){void 0===a&&(a={}),void 0===this.events.onShow&&(this.events.onShow={});var b=this;return this.context.show({onStart:function(){void 0!==a.onStart&&a.onStart(),void 0!==b.events.onShow.onStart&&b.events.onShow.onStart()},onComplete:function(){void 0!==a.onComplete&&a.onComplete(),void 0!==b.events.onShow.onComplete&&b.events.onShow.onComplete()}}),this},e.prototype.hide=function(a){void 0===a&&(a={}),void 0===this.events.onShow&&(this.events.onShow={});var b=this;return this.context.hide({onStart:function(){void 0!==a.onStart&&a.onStart(),void 0!==b.events.onHide.onStart&&b.events.onHide.onStart()},onComplete:function(){void 0!==a.onComplete&&a.onComplete(),void 0!==b.events.onHide.onComplete&&b.events.onHide.onComplete()}}),this};var f={Initialize:function(){"undefined"!=typeof this.template&&this.template&&this.setState(f.Render)},Render:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b),this.setState(f.Wait)},Wait:function(){var a=this,b=setInterval(function(){"complete"===document.readyState&&(clearInterval(b),a.setState(f.PostRender))},100)},PostRender:function(){this.initializeGlobalNavigation(),this.initializeLoginWidget(),this.initializeSearchWidget(),this.initializeAccessibility(),this.initializeBehaviors(),this.setState(f.Ready)},Ready:function(){}},g=cb.core.widgets.framework.Container.extend({flags:{isAnimating:!1},state:f.Initialize,settings:{skin:{template:{uri:"globalheader.tpl"}},config:{siteType:"default",lockupName:"",lockupLogo:!1,lockupProperty:"",useGlobalNavigation:!1,useSearchWidget:!1,useLoginWidget:!1,useService:!0},widgets:{search:{config:{}},identity:{config:{}}},tracking:{siteCode:"gh",appId:8}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options),this.namespace=(cb.core.widgets.GlobalHeader.NAME+"-"+cb.core.widgets.GlobalHeader.VERSION+"-global-navigation-"+this.cid).replace(/\s/g,"-").replace(/\./g,"-").toLowerCase(),this.initializePanelController(),this.initializeTracking()},initializeGlobalNavigation:function(){var a=this;if(this.options.config.useGlobalNavigation)if(void 0!==cb.core.widgets.GlobalHeader.Navigation){var c={placement:{domElement:".lv-gh-nav"},config:{useService:this.options.config.useService,useSearchWidget:this.options.config.useSearchWidget,siteCode:this.options.tracking.siteCode},service:this.options.services.navigationURI};this.navigation=new cb.core.widgets.GlobalHeader.Navigation(c),this.panelController.addPanel(new e("Navigation",this.navigation,{onHide:{onStart:function(){a.disableNavigationScrolling();var c=b(".lv-gh-menu a");c.removeClass("lv-gh-menu-open"),c.attr("aria-expanded",!1),c.attr("aria-label","open global navigation"),a.$el.find(".lv-globalHeader-widget").removeClass("lv-gh-nav-open")},onComplete:function(){a.adjustNavigationPanel()}},onShow:{onStart:function(){var c=b(".lv-gh-menu a");a.options.tracking.feature.menu.open(),a.$el.find(".lv-globalHeader-widget").addClass("lv-gh-nav-open"),c.addClass("lv-gh-menu-open"),c.attr("aria-expanded",!0),c.attr("aria-label","close global navigation"),c.attr("aria-controls",a.navigation.$el.attr("id"))},onComplete:function(){a.adjustNavigationPanel()}}}))}else a.renderWarning("Global Navigation")},initializeLoginWidget:function(){var a=this;this.options.config.useLoginWidget&&(void 0!==cb.core.widgets.GlobalHeader.Login?(this.login=new cb.core.widgets.GlobalHeader.Login({placement:{domElement:".lv-gh-panel.lv-gh-login"},tracking:this.options.tracking,widgets:this.options.widgets}),this.panelController.addPanel(new e("Login",this.login,{onHide:{onStart:function(){a.disableLoginScrolling()},onComplete:function(){a.$el.find(".lv-globalHeader-widget").removeClass("lv-gh-login-open"),a.options.config.useSearchWidget&&(a.search.control.$el.show(),a.searchFlyout.control.$el.show()),a.adjustLoginPanel()}},onShow:{onStart:function(){a.$el.find(".lv-globalHeader-widget").addClass("lv-gh-login-open"),a.options.config.useSearchWidget&&(a.search.control.$el.hide(),a.searchFlyout.control.$el.hide())},onComplete:function(){a.adjustLoginPanel()}}}))):this.renderWarning("Login"))},initializeSearchWidget:function(){var a=this;if(this.options.config.useSearchWidget&&(void 0!==cb.core.widgets.GlobalHeader.Search?(this.search=new cb.core.widgets.GlobalHeader.Search({placement:{domElement:".lv-gh-panel.lv-gh-search"},widgets:this.options.widgets}),this.panelController.addPanel(new e("Search",this.search,{onHide:{onStart:function(){a.disableSearchScrolling()},onComplete:function(){a.$el.find(".lv-globalHeader-widget").removeClass("lv-gh-search-open"),a.options.config.useLoginWidget&&a.login.control.$el.show(),a.adjustSearchPanel()}},onShow:{onStart:function(){a.$el.find(".lv-globalHeader-widget").addClass("lv-gh-search-open"),a.options.config.useLoginWidget&&a.login.control.$el.hide()},onComplete:function(){a.adjustSearchPanel()}}}))):this.renderWarning("Search"),void 0!==cb.core.widgets.GlobalHeader.Search.Flyout)){var c=b.extend(!0,{},{placement:{domElement:".lv-gh-flyout.lv-gh-search"}},this.options.widgets.search);this.searchFlyout=new cb.core.widgets.GlobalHeader.Search.Flyout(c)}},initializePanelController:function(){this.panelController=new d(this)},initializeTracking:function(){this.options.tracking.feature={menu:{open:function(){void 0!==window._satellite&&window._satellite.track("cbTrack.featureUsed.ghf")}}},void 0!==window.digitalData&&void 0!==window.digitalData.page&&void 0!==window.digitalData.page.category&&void 0!==window.digitalData.page.category.primaryCategory&&(this.options.tracking.siteCode=window.digitalData.page.category.primaryCategory)},initializeAccessibility:function(){var a=this.findInsideWidgetDOM(".lv-gh-lockup a.lv-lockup-logo");"rgb(255, 255, 255)"===a.css("backgroundColor")&&($label=a.find("span"),$label.css("visibility","visible"),$label.attr("aria-hidden",!1));var b=this.findInsideWidgetDOM(".lv-gh-logo a");"rgb(255, 255, 255)"===b.css("backgroundColor")&&($label=b.find("span"),$label.css("visibility","visible"),$label.attr("aria-hidden",!1))},initializeBehaviors:function(){var a=this,d=c.debounce(function(){a.options.config.useGlobalNavigation&&a.navigation.isOpen()&&a.adjustNavigationPanel(),a.options.config.useLoginWidget&&a.login.isOpen()&&a.adjustLoginPanel(),a.options.config.useSearchWidget&&void 0!==a.searchFlyout&&a.isMobile()&&a.searchFlyout.isOpen()&&a.searchFlyout.close()},250);b(window).off("resize."+this.namespace).on("resize."+this.namespace,d),b(window).off("orientationchange."+this.namespace).on("orientationchange."+this.namespace,d)},applyDefaults:function(c){var d=b.extend(!0,{},this.settings,this.options,a.DeploymentProfile,c);return d},setState:function(a){this.state=a,this.render()},buildContext:function(){var a=this.options.config,b=c.pick(a,"siteCode","siteType","useLoginWidget","useSearchWidget","useGlobalNavigation","skipLocation");return b.siteCode=this.options.tracking.siteCode,""!==a.lockupName&&"default"!==a.siteType&&(b.lockup={id:a.lockupName.replace(/\./g,"").replace(/\,/g,"").replace(/\'/g,"").replace(/\"/g,"").replace(/\;/g,"").replace(/\&/g,"").replace(/\:/g,"").replace(/\\/g," ").replace(/\//g," ").replace(/ - /g," ").replace(/ /g,"-").toLowerCase(),name:a.lockupName},""!==a.lockupProperty&&(b.lockup.property=a.lockupProperty),a.lockupLogo!==!1&&(b.lockup.logo=a.lockupLogo)),b},render:function(){this.state()},renderWarning:function(a){var c=this.getTemplate("globalheader-warning"),d=c({name:a});this.$el.prepend(b(d))},adjustLoginPanel:function(){var a=this.findInsideWidgetDOM(".lv-gh-login-open");this.isMobile()&&a.length?this.enableLoginScrolling():this.disableLoginScrolling()},adjustSearchPanel:function(){var a=this.findInsideWidgetDOM(".lv-gh-search-open");this.isMobile()&&a.length?this.enableSearchScrolling():this.disableSearchScrolling()},adjustNavigationPanel:function(){var a=this.findInsideWidgetDOM(".lv-gh-nav-open");this.isMobile()&&a.length?this.enableNavigationScrolling():this.disableNavigationScrolling()},enableLoginScrolling:function(){var a=b(window),c=(b("body"),this.findInsideWidgetDOM(".lv-gh-bar")),d=this.findInsideWidgetDOM(".lv-gh-panel.lv-gh-login"),e=(this.findInsideWidgetDOM(".lv-gh-login-open"),d.find(".container").outerHeight()),f=a.innerHeight()-c.height();e>f?(d.css("height",f+"px"),d.css("overflow-y","scroll")):d.css("height",e+"px"),d.click()},disableLoginScrolling:function(){var a=this.findInsideWidgetDOM(".lv-gh-panel.lv-gh-login");a.css("height",""),a.css("overflow-y","")},enableSearchScrolling:function(){var a=b(window),c=(b("body"),this.findInsideWidgetDOM(".lv-gh-bar")),d=this.findInsideWidgetDOM(".lv-gh-panel.lv-gh-search"),e=(this.findInsideWidgetDOM(".lv-gh-search-open"),d.find(".container").outerHeight()),f=a.innerHeight()-c.height();e>f?(d.css("height",f+"px"),d.css("overflow-y","scroll")):d.css("height",e+"px"),d.click()},disableSearchScrolling:function(){var a=this.findInsideWidgetDOM(".lv-gh-panel.lv-gh-search");a.css("height",""),a.css("overflow-y","")},enableNavigationScrolling:function(){var a=b(window),c=(b("body"),this.findInsideWidgetDOM(".lv-gh-bar")),d=this.findInsideWidgetDOM(".lv-gh-panel.lv-gh-nav"),e=(this.findInsideWidgetDOM(".lv-gh-nav-open"),a.innerHeight()-c.height());d.css("height",e+"px"),d.css("overflow-y","scroll"),d.click()},disableNavigationScrolling:function(){var a=this.findInsideWidgetDOM(".lv-gh-panel.lv-gh-nav");a.css("height",""),a.css("overflow-y","")},isWindowScrollable:function(){return $body=b("body"),$window=b(window),b("body").outerHeight()>b(window).height()},isMobile:function(){var a=this.findInsideWidgetDOM(".lv-gh-mobile");return"none"!==a.css("display")},disableScrolling:function(){var a=b("body");a.addClass("lv-globalHeader-noscroll"),this.isWindowScrollable()&&!this.isMobile()&&a.addClass("lv-globalHeader-noscroll-disabledscrollbar")},enableScrolling:function(){var a=b("body");a.removeClass("lv-globalHeader-noscroll"),a.removeClass("lv-globalHeader-noscroll-disabledscrollbar")},lockPage:function(){var a=this,c=b('<div class="lv-globalHeader-overlay"></div>'),d=b("body");b(document);a.disableScrolling(),d.prepend(c),c.animate({opacity:.8},"fast"),c.off("click.toggleMenu-"+this.namespace).on("click.toggleMenu-"+this.namespace,function(b){a.onOverlayClick(b)})},unlockPage:function(){var a=this,c=b("body"),d=c.find(".lv-globalHeader-overlay");b(document);d.animate({opacity:0},"fast",function(){c.find(".lv-globalHeader-overlay").remove(),a.enableScrolling()}),d.off("click.toggleMenu-"+this.namespace)},getTemplate:function(a){return window.Handlebars.templates[a]},events:{"click .lv-gh-menu a":"onMenuClick","keydown .lv-globalHeader-widget":"onGlobalHeaderKeyDown","click .lv-gh-login.lv-gh-control a":"onLoginClick","click .lv-gh-search.lv-gh-control a":"onSearchClick","click .lv-gh-flyout-search.lv-gh-control a":"onFlyoutSearchClick"},onOverlayClick:function(a){var b=this.panelController.getActivePanel();b&&this.panelController.togglePanel(b.name)},onLoginClick:function(a){this.options.config.useLoginWidget&&(a.preventDefault(),this.panelController.togglePanel("Login"))},onSearchClick:function(a){this.options.config.useSearchWidget&&(a.preventDefault(),this.panelController.togglePanel("Search"))},onFlyoutSearchClick:function(a){this.options.config.useSearchWidget&&(a.preventDefault(),this.searchFlyout.isOpen()?this.searchFlyout.close():this.searchFlyout.open())},onMenuClick:function(a){this.options.config.useGlobalNavigation&&(a.preventDefault(),this.panelController.togglePanel("Navigation"))},onGlobalHeaderKeyDown:function(a){var d=a.keycode||a.which,e=a.shiftKey,f=(this.$el,b(a.target));if(this.options.config.useGlobalNavigation){var g=this.findInsideWidgetDOM(".lv-gh-nav-open"),h=this.findInsideWidgetDOM(".lv-gh-menu.lv-gh-item a");if(g.length){if(c.isKey(d,"DOWN")&&(f.closest(this.navigation.$el).length||this.navigation.setIndexFocus(0)),c.isKey(d,"TAB")&&!e){var i=this.navigation.findInsideWidgetDOM("a");i.length&&($last=b(i[i.length-1]),f.get(0)===$last.get(0)&&this.panelController.togglePanel("Navigation"))}c.isKey(d,"ESC")&&(this.panelController.togglePanel("Navigation"),h.focus())}}if(this.options.config.useLoginWidget){var j=this.findInsideWidgetDOM(".lv-gh-login-open"),k=this.findInsideWidgetDOM(".lv-gh-login.lv-gh-control a");if(j.length&&(c.isKey(d,"ESC")&&(this.panelController.togglePanel("Login"),k.focus()),c.isKey(d,"TAB")&&!e)){var i=this.login.findInsideWidgetDOM("a").filter(":visible");i.length&&($last=b(i[i.length-1]),f.get(0)===$last.get(0)&&(a.preventDefault(),k.focus()))}}}},{NAME:"Global Header",VERSION:"4.1.0"});return c.extend(g,a)}(cb.core.widgets.GlobalHeader,jQuery,_);;cb.core.widgets.GlobalHeader.Navigation=function(a,b){var c={GetData:function(){var d=this;b.parseJSONStr(sessionStorage.getItem("cbGHNavigation"),function(b){b?(d.options.data.links=b,d.logger.debug("Global Navigation - Retrieving Data from sessionStorage")):a.ajax({url:d.options.service,success:function(a){d.options.data.links=a,sessionStorage.setItem("cbGHNavigation",JSON.stringify(d.options.data.links)),d.setState(c.Render),d.logger.debug("Global Navigation - Retrieving Data from a Service - Success: Using Service Links")},error:function(a){d.logger.debug("Global Navigation - Retrieving Data from a Service - Failure: Using Default Links")},timeout:3e3})}),d.setState(c.Initialize)},Initialize:function(){"undefined"!=typeof this.template&&this.template&&this.setState(c.Render)},Render:function(){this.draw(),this.setState(c.PostRender)},PostRender:function(){this.initializeBehaviors(),this.initializeAccessibility(),this.setState(c.Ready)},Ready:function(){}};return cb.core.widgets.framework.Container.extend({state:c.Initialize,flags:{isAnimating:!1},settings:{skin:{template:{uri:"globalnavigation.tpl"}},config:{useService:!1,useSearchWidget:!1,layout:{gridWidth:12,breakpoints:[{name:"lg",divisions:4,gridWidth:12},{name:"md",divisions:4,gridWidth:12},{name:"sm",divisions:2,gridWidth:10}]}},data:{links:[{name:"SAT",url:"https://collegereadiness.collegeboard.org/sat",type:"default",category:"K-12",property:"programs",logo:!0,linkCode:"sat",description:"K-12 Resources"},{name:"SAT Subject Tests",url:"https://collegereadiness.collegeboard.org/sat-subject-tests",type:"default",category:"K-12",property:"programs",group:"SAT",linkCode:"satsubj",description:"SAT Subject Tests"},{name:"PSAT/NMSQT",url:"https://collegereadiness.collegeboard.org/psat-nmsqt-psat-10",type:"default",category:"K-12",property:"programs",logo:!0,linkCode:"pn"},{name:"PSAT 10",url:"https://collegereadiness.collegeboard.org/psat-nmsqt-psat-10",type:"default",category:"K-12",property:"programs",logo:!0,linkCode:"pn10"},{name:"PSAT 8/9",url:"https://collegereadiness.collegeboard.org/psat-8-9",type:"default",category:"K-12",property:"programs",logo:!0,linkCode:"p89"},{name:"SpringBoard",url:"https://springboard.collegeboard.org/",type:"default",category:"K-12",property:"programs",logo:!0,linkCode:"sb"},{name:"AP",url:"https://apstudent.collegeboard.org/",type:"default",category:"K-12",property:"programs",logo:!0,linkCode:"ap"},{name:"AP Students",url:"https://apstudent.collegeboard.org/",type:"program",category:"K-12",group:"AP",linkCode:"aps"},{name:"AP Central",url:"http://apcentral.collegeboard.com/home",type:"program",category:"K-12",group:"AP",linkCode:"apc"},{name:"Access",url:"https://bigfuture.collegeboard.org/",type:"default",category:"Access",property:"programs",logo:!0,linkCode:"accs",description:"Access Resources"},{name:"College Planning",url:"https://bigfuture.collegeboard.org/",type:"default",category:"Access",group:"Access",linkCode:"cp"},{name:"College Search",url:"https://bigfuture.collegeboard.org/college-search",type:"default",category:"Access",group:"Access",linkCode:"cs"},{name:"ACCUPLACER",url:"https://accuplacer.collegeboard.org/",type:"default",category:"Higher Ed",property:"programs",logo:!0,linkCode:"accu",description:"Resources for Higher Education"},{name:"CLEP",url:"https://clep.collegeboard.org/",type:"default",category:"Higher Ed",property:"programs",logo:!0,linkCode:"clep"},{name:"CSS Profile",url:"https://student.collegeboard.org/css-financial-aid-profile",type:"default",category:"Higher Ed",property:"programs",logo:!0,linkCode:"css"},{name:"Search",url:"https://collegeboardsearch.collegeboard.org/pastudentsrch/login.action",type:"default",property:"programs",category:"Higher Ed",logo:!0,linkCode:"cbsch"},{name:"PowerFAIDS",url:"https://www.collegeboard.org/powerfaids",type:"default",category:"Higher Ed",property:"programs",logo:!0,linkCode:"pfaid"},{name:"College Board Homepage",url:"https://www.collegeboard.org/",type:"mobile",category:"Organization",linkCode:"cb",description:"College Board Organizational Resources"},{name:"Professionals",url:"https://professionals.collegeboard.org/",type:"default",category:"Organization",linkCode:"prof"},{name:"Help",url:"https://www.collegeboard.org/help",type:"default",category:"Organization",linkCode:"help"},{name:"More",url:"https://www.collegeboard.org/sitemap",type:"more",category:"Organization",linkCode:"morecb"},{name:"Facebook",url:"https://www.facebook.com/thecollegeboard",type:"social",category:"Organization",group:"More",glyph:"facebook",linkCode:"sm-fb",target:"_blank"},{name:"Twitter",url:"https://twitter.com/collegeboard",type:"social",category:"Organization",group:"More",glyph:"twitter",linkCode:"sm-tw",target:"_blank"},{name:"YouTube",url:"https://www.youtube.com/user/collegeboard",type:"social",category:"Organization",group:"More",glyph:"youtube",linkCode:"sm-yt",target:"_blank"},{name:"LinkedIn",url:"https://www.linkedin.com/company/the-college-board",type:"social",category:"Organization",group:"More",glyph:"linkedin",linkCode:"sm-li",target:"_blank"},{name:"Instagram",url:"https://www.instagram.com/collegeboard/",type:"social",category:"Organization",group:"More",glyph:"instagram",linkCode:"sm-in",target:"_blank"}]},service:""},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options),this.namespace=(cb.core.widgets.GlobalHeader.NAME+"-"+cb.core.widgets.GlobalHeader.VERSION+"-global-navigation-"+this.cid).replace(/\s/g,"-").replace(/\./g,"-").toLowerCase(),this.options.config.useService&&(this.state=c.GetData,this.logger.debug("Global Navigation - Retrieving Data from a Service"))},initializeBehaviors:function(){var a=this;!function(){a.$el.show(),a.adjustPosition(),a.$el.hide()}()},initializeAccessibility:function(){if($navigation=this.$el,"rgb(255, 255, 255)"===this.$el.css("backgroundColor")&&($navLinks=this.findInsideWidgetDOM(".lv-nav-category ul li .lv-logo"),$navLinks.length))for(var b=0,c=$navLinks.length;b<c;b++)$navLink=a($navLinks[b]),$navLink.addClass("lv-no-logo"),$label=$navLink.find("span"),$label.attr("aria-hidden",!1),$label.css("visibility","visible")},applyDefaults:function(b){var c=a.extend(!0,{},this.settings,b);return c},setState:function(a){this.state=a,this.render()},buildNavigationContext:function(){for(var a={categories:[]},c=this.options.data.links,d=b.uniq(b.pluck(c,"category")),e=0;e<d.length;e++){for(var f=d[e],g=b.where(c,{category:f}),h=b.uniq(b.pluck(b.filter(g,function(a){return void 0!==a.group}),"group")),i=b.reject(g,function(a){return void 0!==a.group}),j="The College Board Resources",k=0;k<g.length;k++)g[k].id=g[k].name.replace(/\s+/g,"-").replace(/\//g,"-").toLowerCase(),void 0!==g[k].linkCode&&(g[k].tracking=this.options.config.siteCode+"-"+g[k].linkCode),void 0!==g[k].description&&(j=g[k].description);for(var l=0;l<h.length;l++){for(var m=h[l],n=b.filter(g,function(a){return a.group===m}),o=-1,p=0;p<i.length;p++){var q=i[p];if(q.name===m){o=p;break}}o!==-1?i[o].children={id:m.replace(/\s+/g,"-").replace(/\//g,"-").toLowerCase(),links:n}:i=b.union(i,n)}a.categories.push({id:f.replace(/\s+/g,"-").replace(/\//g,"-").toLowerCase(),name:f,links:i,description:j})}return a=this.buildLayoutContext(a)},buildLayoutContext:function(a){for(var b=a,c=this.options.config.layout,d=[],e=0,f=c.breakpoints.length;e<f;e++){var g=c.breakpoints[e],h=g.name,i=0,j=Math.ceil(g.gridWidth/g.divisions),k=j/b.categories.length;k<j&&(k=j),d.push({name:h,columns:j,size:k,offset:i,divisions:g.divisions,gridWidth:g.gridWidth})}for(var e=0,f=b.categories.length;e<f;e++){for(var l=[],m=0,n=d.length;m<n;m++){var o={name:d[m].name,size:d[m].size,offset:d[m].offset,divisions:d[m].divisions};e+1!=f&&(e%o.divisions||(o.offset=.5*(c.gridWidth-d[m].gridWidth)),(e+1)%o.divisions||(o.break=!0)),l.push(o)}b.categories[e].layout=l}return b},buildContext:function(){var a=this.options.config,c=b.pick(a,"useSearchWidget");return c.navigation=this.buildNavigationContext(),c},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},getHeight:function(){return this.$el.find(".container").outerHeight()},adjustPosition:function(){this.$el.find(".container").css("margin-top","-"+this.getHeight()+"px")},setIndexFocus:function(b){var c=this.findInsideWidgetDOM(".lv-nav-links a");c.length&&a(c[b]).focus()},show:function(a){if(!this.flags.isAnimating){var b=this,c=this.$el.find(".container");b.$el.show(),b.adjustPosition(),b.$el.attr("aria-expanded",!0),void 0!==a.onStart&&a.onStart(),this.flags.isAnimating=!0,c.animate({"margin-top":"0px"},600,"jswing",function(){void 0!==a.onComplete&&a.onComplete(),b.flags.isAnimating=!1})}},hide:function(a){if(!this.flags.isAnimating){var b=this,c=this.$el.find(".container");void 0!==a.onStart&&a.onStart(),this.flags.isAnimating=!0,c.animate({"margin-top":"-"+b.getHeight()+"px"},600,"jswing",function(){void 0!==a.onComplete&&a.onComplete(),b.flags.isAnimating=!1,b.$el.hide(),b.$el.attr("aria-expanded",!1)})}},isOpen:function(){return"none"!==this.$el.css("display")},isMobile:function(){return"none"!==a(".lv-globalHeader-widget .lv-gh-mobile").css("display")},events:{"mouseover ul li a":"onListItemMouseOver","mouseout ul li a":"onListItemMouseOut"},onListItemMouseOver:function(b){var c=a(b.currentTarget),d=c.closest("li");c.hasClass("lv-link-type-social")||d.addClass("lv-active")},onListItemMouseOut:function(b){var c=a(b.currentTarget).closest("li");c.removeClass("lv-active")}})}(jQuery,_);;cb.core.widgets.GlobalHeader.Login=function(a,b){var c={Initialize:function(){this.trigger("stateExecute","Initialize"),"undefined"!=typeof this.template&&this.template&&this.setState(c.Render)},Render:function(){this.trigger("stateExecute","Render"),this.draw(),this.setState(c.PostRender)},PostRender:function(){this.trigger("stateExecute","PostRender"),this.initializeBehaviors(),this.initializeIdentityWidget(),this.initializeLoginControl(),this.setState(c.Update)},Update:function(){this.trigger("stateExecute","Update");var a=this,b=this.identity.getUserLoginInfo(),d={status:{loginInfo:b}};b.isLoggedIn?(d.status.userInfo={firstName:b.profile.details.firstName},this.control.update(d),a.setState(c.Ready)):(a.control.update(d),a.setState(c.Ready))},Ready:function(){this.trigger("stateExecute","Ready")}};return cb.core.widgets.framework.AuthenticatedWidget.extend({state:c.Initialize,flags:{isAnimating:!1},settings:{skin:{template:{uri:"globalheader-login-panel.tpl"}},widgets:{identity:{config:{}}}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options)},initializeIdentityWidget:function(){void 0===this.identity?this.identity=new cb.core.widgets.Identity({placement:{domElement:".lv-globalheader-identity-widget"},tracking:this.options.tracking,skin:{template:{uri:"globalheader-login.tpl"}},config:this.options.widgets.identity.config}):this.identity.draw()},initializeLoginControl:function(){if(void 0===this.control){var a={userInfo:{},loginInfo:{}};if(void 0!==this.identity){var b=this.identity.getUserLoginInfo();a.loginInfo=b}this.control=new cb.core.widgets.GlobalHeader.Login.Control({placement:{domElement:".lv-gh-login.lv-gh-control"},skin:{template:{uri:"globalheader-login-control.tpl"}}})}else this.control.draw()},initializeBehaviors:function(){this.$el.show(),this.adjustPosition(),this.$el.hide()},applyDefaults:function(b){var c=a.extend(!0,{},this.settings,b);return c},setState:function(a){this.state=a,this.render()},buildContext:function(){return{}},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},getHeight:function(){return this.$el.find(".container").outerHeight()},show:function(a){if(!this.flags.isAnimating){var b=this,c=this.$el.find(".container");b.$el.show(),b.adjustPosition(),b.$el.attr("aria-expanded",!0),b.control.setAria("a","expanded",!0),b.control.setAria("a","label","close login panel"),b.control.setAria("a","controls",b.$el.attr("id")),void 0!==a.onStart&&a.onStart(),this.flags.isAnimating=!0,c.animate({"margin-top":"0px"},600,"jswing",function(){void 0!==a.onComplete&&a.onComplete(),b.flags.isAnimating=!1})}},hide:function(a){if(!this.flags.isAnimating){var b=this,c=this.$el.find(".container");void 0!==a.onStart&&a.onStart(),this.flags.isAnimating=!0,c.animate({"margin-top":"-"+b.getHeight()+"px"},600,"jswing",function(){void 0!==a.onComplete&&a.onComplete(),b.flags.isAnimating=!1,b.$el.hide(),b.$el.attr("aria-expanded",!1),b.control.setAria("a","expanded",!1),b.control.setAria("a","label","open login panel"),b.control.removeAria("a","controls")})}},isOpen:function(){return"none"!==this.$el.css("display")},adjustPosition:function(){this.$el.find(".container").css("margin-top","-"+this.getHeight()+"px")},onLogin:function(){this.state===c.Ready&&this.setState(c.Update)},onLogout:function(){this.state===c.Ready&&this.setState(c.Update)}})}(jQuery,_);;cb.core.widgets.GlobalHeader.Login.Control=function(a,b){var c={Initialize:function(){"undefined"!=typeof this.template&&this.template&&(this.__showOrHide(!0),this.setState(c.Render))},Render:function(){this.draw(),this.setState(c.Ready)},Ready:function(){}};return cb.core.widgets.framework.Container.extend({state:c.Initialize,settings:{config:{},status:{userInfo:{},loginInfo:{}}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options)},applyDefaults:function(b){var c=a.extend(!0,{},this.settings,b);return c},buildContext:function(){var b=a.extend({},{status:this.options.status});return b},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},update:function(a){this.options=this.applyDefaults(a),this.setState(c.Initialize),this.render()},setState:function(a){this.state=a,this.render()},setAria:function(a,b,c){var d=this.findInsideWidgetDOM(a);d.attr("aria-"+b,c)},removeAria:function(a,b){var c=this.findInsideWidgetDOM(a);c.removeAttr("aria-"+b)},events:{"click .lv-gh-login-control a":"onClick"},onClick:function(a){a.preventDefault(),this.trigger("click")}})}(jQuery,_);;cb.core.widgets.GlobalHeader.Search=function(a,b){var c={Initialize:function(){this.trigger("stateExecute","Initialize"),"undefined"!=typeof this.template&&this.template&&this.setState(c.Render)},Render:function(){this.trigger("stateExecute","Render"),this.draw(),this.setState(c.PostRender)},PostRender:function(){this.trigger("stateExecute","PostRender"),this.initializeBehaviors(),this.initializeSearchWidget(),this.initializeSearchControl(),this.setState(c.Ready)},Ready:function(){this.trigger("stateExecute","Ready")}};return cb.core.widgets.framework.Container.extend({state:c.Initialize,flags:{isAnimating:!1},settings:{skin:{template:{uri:"globalheader-search-panel.tpl"}},widgets:{identity:{config:{}}}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options)},initializeSearchWidget:function(){void 0===this.search?this.search=new cb.core.widgets.Search({placement:{domElement:".lv-globalheader-search-widget"},tracking:this.options.tracking,skin:{template:{uri:"globalheader-search.tpl"}},config:this.options.widgets.search.config}):this.search.draw()},initializeSearchControl:function(){void 0===this.control?this.control=new cb.core.widgets.GlobalHeader.Search.Control({placement:{domElement:".lv-gh-search.lv-gh-control"},skin:{template:{uri:"globalheader-search-control.tpl"}}}):this.control.draw()},initializeBehaviors:function(){this.$el.show(),this.adjustPosition(),this.$el.hide()},applyDefaults:function(b){var c=a.extend(!0,{},this.settings,b);return c},setState:function(a){this.state=a,this.render()},buildContext:function(){return{}},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},getHeight:function(){return this.$el.find(".container").outerHeight()},show:function(a){if(!this.flags.isAnimating){var b=this,c=this.$el.find(".container");b.$el.show(),b.adjustPosition(),b.$el.attr("aria-expanded",!0),b.control.setAria("a","expanded",!0),b.control.setAria("a","label","close login panel"),b.control.setAria("a","controls",b.$el.attr("id")),void 0!==a.onStart&&a.onStart(),this.flags.isAnimating=!0,c.animate({"margin-top":"0px"},600,"jswing",function(){void 0!==a.onComplete&&a.onComplete(),b.flags.isAnimating=!1})}},hide:function(a){if(!this.flags.isAnimating){var b=this,c=this.$el.find(".container");void 0!==a.onStart&&a.onStart(),this.flags.isAnimating=!0,c.animate({"margin-top":"-"+b.getHeight()+"px"},600,"jswing",function(){void 0!==a.onComplete&&a.onComplete(),b.flags.isAnimating=!1,b.$el.hide(),b.$el.attr("aria-expanded",!1),b.control.setAria("a","expanded",!1),b.control.setAria("a","label","open login panel"),b.control.removeAria("a","controls")})}},isOpen:function(){return"none"!==this.$el.css("display")},adjustPosition:function(){this.$el.find(".container").css("margin-top","-"+this.getHeight()+"px")},onLogin:function(){this.state===c.Ready&&this.setState(c.Update)},onLogout:function(){this.state===c.Ready&&this.setState(c.Update)}})}(jQuery,_);;cb.core.widgets.GlobalHeader.Search.Control=function(a,b){var c={Initialize:function(){"undefined"!=typeof this.template&&this.template&&(this.__showOrHide(!0),this.setState(c.Render))},Render:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b),this.setState(c.PostRender)},PostRender:function(){this.setState(c.Ready)},Ready:function(){}};return cb.core.widgets.framework.Container.extend({state:c.Initialize,initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options)},applyDefaults:function(b){var c=a.extend(!0,{},this.settings,b);return c},buildContext:function(){return{}},render:function(){this.state()},setState:function(a){this.state=a,this.render()},setAria:function(a,b,c){var d=this.findInsideWidgetDOM(a);d.attr("aria-"+b,c)},removeAria:function(a,b){var c=this.findInsideWidgetDOM(a);c.removeAttr("aria-"+b)},events:{"click .lv-gh-search-control a":"onClick"},onClick:function(a){a.preventDefault(),this.trigger("click")}})}(jQuery,_);;cb.core.widgets.GlobalHeader.Search=cb.core.widgets.GlobalHeader.Search||{},cb.core.widgets.GlobalHeader.Search.Flyout=function(a,b){var c={Initialize:function(){"undefined"!=typeof this.template&&this.template&&this.setState(c.Render)},Render:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b),this.setState(c.PostRender)},PostRender:function(){this.initializeSearchWidget(),this.iniitalizeBehaviors(),this.setState(c.Ready)},Ready:function(){}};return cb.core.widgets.framework.Container.extend({state:c.Initialize,settings:{skin:{template:{uri:"globalheader-search-flyout.tpl"}},config:{useSuggestionWidget:!0}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options)},initializeSearchWidget:function(){var a=this;!function(){if(void 0===a.flyout){var b={placement:{domElement:".lv-gh-flyout.lv-gh-search .lv-gh-search-widget"},skin:{template:{uri:"globalheader-search.tpl"}},config:a.options.config};a.flyout=new cb.core.widgets.Search(b)}}(),function(){void 0===a.control&&(a.control=new cb.core.widgets.GlobalHeader.Search.Control({placement:{domElement:".lv-gh-flyout-search.lv-gh-control"},skin:{template:{uri:"globalheader-search-flyout-control.tpl"}}}))}()},iniitalizeBehaviors:function(){var c=this,d=a(document);d.off("click.gh-search").on("click.gh-search",function(b){if(c.isOpen()){var d=a(b.target),e=d.closest(c.$el),f=d.closest(c.control.$el);e.length<=0&&f.length<=0&&(c.close(),c.flyout.clear())}}),d.off("keyup.gh-search").on("keyup.gh-search",function(d){if(c.isOpen()){var e=d.keycode||d.which,f=a(d.target),g=f.closest(".lv-suggestion-widget");b.isKey(e,"ESC")&&(g.length||(c.close(),c.flyout.clear()))}})},applyDefaults:function(b){var c=a.extend(!0,{},this.settings,b);return c},setState:function(a){this.state=a,this.render()},buildContext:function(){return{}},render:function(){this.state()},open:function(a){var b=this.$el,c=this.findInsideWidgetDOM("input");b.show(),b.attr("aria-hidden",!1),b.attr("aria-expanded",!0),this.control.setAria("a","expanded",!0),c.focus()},close:function(a){var b=this.$el,c=this.control.findInsideWidgetDOM("a");b.hide(),b.attr("aria-hidden",!0),b.attr("aria-expanded",!1),this.control.setAria("a","expanded",!1),c.focus()},isOpen:function(a){return"none"!==this.$el.css("display")},events:{"keydown .lv-search-widget":"onFlyoutKeyDown"},onFlyoutKeyDown:function(c){var d=c.keycode||c.which,e=c.shiftKey,f=a(c.target),g=this.findInsideWidgetDOM('input[name="word"]'),h=this.findInsideWidgetDOM(".input-group a"),i=this.control.findInsideWidgetDOM("a");b.isKey(d,"TAB")&&(e?f.get(0)===g.get(0)&&(c.preventDefault(),this.flyout.clear(),this.close(),i.focus()):f.get(0)===h.get(0)&&(c.preventDefault(),this.flyout.clear(),this.close(),i.focus()))}})}(jQuery,_);;cb.core.utils.defineCBNamespace("cb.core.widgets.Notification"),cb.core.utils.alertIfNotDefined("cb.core.widgets.framework"),cb.core.widgets.Notification=function(partialWidget,$){"use strict";var WidgetStates={GetData:function(){var a=this;this.options.config.useService?this.flags.isRetrievingData||(this.flags.isRetrievingData=!0,$.ajax({url:a.buildURL(a.options.config.filters),success:function(b){a.options.data.notifications=b,a.setState(WidgetStates.Initialize),a.logger.debug("Notifications - Retrieving Data from a Service - Success: Using Service Notifications")},error:function(b){a.logger.debug("Notifications - Retrieving Data from a Service - Failure: Will not do anything")}})):this.setState(WidgetStates.Initialize)},Initialize:function(){this.options.data.storage=this.getStorageData(),"undefined"!=typeof this.template&&this.template&&(this.__showOrHide(!0),this.setState(WidgetStates.Render))},Render:function(){this.draw(),this.setState(WidgetStates.PostRender)},PostRender:function(){var a=this.findInsideWidgetDOM(".lv-notifications");this.getNumActiveNotifications()?a.slideDown(600):a.hide()}},NotificationWidget=cb.core.widgets.framework.Widget.extend({state:WidgetStates.GetData,flags:{isRetrievingData:!1},settings:{skin:{template:{uri:"notification.tpl"}},config:{saveData:!0,saveType:"cookie",useService:!0,saveDataExpire:30,filters:{},clientFilters:[],storageName:"lv-notificationWidget-storage"},data:{notifications:[],storage:{closedNotifications:[]}}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options),this.namespace=(cb.core.widgets.Notification.NAME+"-"+cb.core.widgets.Notification.VERSION+"-"+this.cid).replace(/\s/g,"-").replace(/\./g,"-").toLowerCase()},applyDefaults:function(a){var b=$.extend(!0,{},this.settings,this.options,partialWidget.DeploymentProfile,a);return b},setData:function(a){this.options.data=$.extend(!0,{},{notifications:[],storage:{closedNotifications:[]}},a),this.setState(WidgetStates.Initialize)},setState:function(a){this.state=a,this.render()},buildURL:function(a){var b=this.options.services.notificationURI,c="";for(var d in a)c+=encodeURIComponent(d)+"="+encodeURIComponent(a[d])+"&";return c.length&&(c=c.substr(0,c.length-1),b+="?"+c),b},formatNotifications:function(a){for(var b=0,c=a.length;b<c;b++)a[b].id=parseInt(a[b].id);return a},buildNotificationContext:function(){for(var a=this.formatNotifications(this.options.data.notifications),b=this.options.data.storage.closedNotifications,c=0,d=a.length;c<d;c++){var e=a[c];e.icon=this.getIconType(e.type);for(var f=0,g=b.length;f<g;f++)if(parseInt(e.id)===parseInt(b[f])){e.isClosed=!0;break}a[c]=e}if(this.options.config.clientFilters.length&&a.length){for(var h=[],c=0,d=this.options.config.clientFilters.length;c<d;c++)for(var i=this.options.config.clientFilters[c],f=0,g=a.length;f<g;f++){var e=a[f];e.type===i&&h.push(e)}a=h}return a},buildContext:function(){var a={notifications:this.buildNotificationContext(),isActive:!1};return this.getNumActiveNotifications()&&(a.isActive=!0),a},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},update:function(a){this.options=this.applyDefaults(a),this.$el=$(this.options.placement.domElement),this.setState(WidgetStates.GetData)},getIconType:function(a){var b=(void 0===a?"":a).toLowerCase();return b.indexOf("success")!==-1?"cb-icon-icn_check":b.indexOf("emergency")!==-1?"cb-icon-icn_error":(b.indexOf("alert")!==-1,"cb-icon-icn_deadline")},getNumActiveNotifications:function(){var a=this.options.data.notifications,b=this.options.data.storage.closedNotifications,c=a.length;if(c<=0)return 0;for(var d=0,e=a.length;d<e;d++)for(var f=a[d],g=0,h=b.length;g<h;g++){var i=f.id,j=b[g];if(i===j){c--;break}}return c},storeClosedNotification:function(a){_.indexOf(this.options.data.storage.closedNotifications,a)===-1&&(this.options.data.storage.closedNotifications.push(a),this.saveStorageData())},getStorageData:function(){return this.options.config.saveData===!0&&(this.options.config.saveType===cb.core.widgets.Notification.STORAGE_TYPE.COOKIE&&(this.options.data.storage=this.getCookieData()),this.options.data.storage=this.getCookieData()),this.options.data.storage},saveStorageData:function(){this.options.config.saveData===!0&&(this.options.config.saveType===cb.core.widgets.Notification.STORAGE_TYPE.COOKIE?this.saveCookieData():this.saveSessionData())},getSessionData:function(){var sesionName=this.options.config.storageName+"-session";if(void 0===sessionStorage[sessionName]){var sessionData=JSON.stringify(this.options.data.storage);sessionStorage[sessionName]=sessionData}return eval("("+sessionStorage[sessionName]+")")},getCookieData:function(){var cookieName=this.options.config.storageName+"-cookie";if(void 0===$.cookie(cookieName)||null===$.cookie(cookieName)){var cookieData=JSON.stringify(this.options.data.storage),cookieLife={expires:this.options.saveDataExpire,domain:"collegeboard.org",path:"/"};$.cookie(cookieName,cookieData,cookieLife)}var storageData=eval("("+$.cookie(cookieName)+")");return void 0===storageData&&(storageData=this.options.data.storage),storageData},saveSessionData:function(){var a=this.options.storageName+"-session",b=JSON.stringify(this.options.data.storage);sessionStorage[a]=b},saveCookieData:function(){var a=this.options.config.storageName+"-cookie",b=JSON.stringify(this.options.data.storage),c={expires:this.options.saveDataExpire,domain:"collegeboard.org",path:"/"};$.cookie(a,b,c)},getNotificationByID:function(a){for(var b=this.findInsideWidgetDOM(".lv-notification"),c=0,d=b.length;c<d;c++){var e=$(b[c]);if(a===e.data("id"))return e}return!1},closeNotification:function(a){var b=this,c=this.getNotificationByID(a);c&&c.slideUp(300,function(){var c=$(this);c.addClass("lv-notification-close"),c.attr("aria-hidden",!0),b.storeClosedNotification(a),b.getNumActiveNotifications()?(b.$el.find(".lv-notification-widget").addClass("lv-active"),b.$el.find(".lv-notifications").attr("aria-hidden",!1),b.$el.find(".lv-notifications").show()):(b.$el.find(".lv-notification-widget").removeClass("lv-active"),b.$el.find(".lv-notifications").attr("aria-hidden",!0),b.$el.find(".lv-notifications").hide())})},events:{"click a.lv-notification-close":"onNotificationCloseClick"},onNotificationCloseClick:function(a){a.preventDefault();var b=$(a.currentTarget),c=b.closest(".lv-notification"),d=c.data("id");this.closeNotification(d)}},{NAME:"Notification",VERSION:"4.0.0",STORAGE_TYPE:{COOKIE:"cookie",SESSION:"session"}});return _.extend(NotificationWidget,partialWidget)}(cb.core.widgets.Notification,$);;cb.core.widgets.GlobalFooter=function(a,b,c){var d={GetData:function(){var a=this;c.parseJSONStr(sessionStorage.getItem("cbGFNavigation"),function(c){c?a.options.config.links=c:b.ajax({url:a.options.services.navigationURI,success:function(b){a.options.config.links=b,sessionStorage.setItem("cbGFNavigation",JSON.stringify(a.options.config.links)),a.setState(d.Initialize),a.logger.debug("Global Footer Navigation - Retrieving Data from a Service - Success: Using Service Links")},error:function(b){a.logger.debug("Global Footer Navigation - Retrieving Data from a Service - Failure: Using Default Links")},timeout:3e3})}),a.setState(d.Initialize)},Initialize:function(){"undefined"!=typeof this.template&&this.template&&this.setState(d.Render),this.options.config.isBottomAligned&&($body=b("body"),$body.css("padding-bottom",this.getHeight()+"px"))},Render:function(){this.draw(),this.setState(d.PostRender)},PostRender:function(){this.initializeBehaviors(),this.initializeAccessibility()}},e=cb.core.widgets.framework.Container.extend({version:"2.0.0",state:d.Initialize,settings:{skin:{template:{uri:"globalfooter.tpl"}},config:{useService:!0,useControls:!0,isBottomAligned:!0,layout:{categories:[{name:"programs",columns:2}]},links:[{name:"SAT",label:"SAT<sup>&reg;</sup>",url:"https://collegereadiness.collegeboard.org/sat",category:"programs",linkCode:"sat"},{name:"PSAT/NMSQT",label:"PSAT/NMSQT<sup>&reg;</sup>",url:"https://collegereadiness.collegeboard.org/psat-nmsqt-psat-10",category:"programs",linkCode:"pn"},{name:"PSAT 10",label:"PSAT<sup>&trade;</sup> 10",url:"https://collegereadiness.collegeboard.org/psat-nmsqt-psat-10",category:"programs",linkCode:"p10"},{name:"PSAT 8/9",label:"PSAT<sup>&trade;</sup> 8/9",url:"https://collegereadiness.collegeboard.org/psat-8-9",category:"programs",linkCode:"p89"},{name:"SpringBoard",label:"SpringBoard<sup>&reg;</sup>",url:"https://springboard.collegeboard.org/",category:"programs",linkCode:"sb"},{name:"AP",label:"AP",label:"AP<sup>&reg;</sup>",url:"https://apstudent.collegeboard.org/",category:"programs",linkCode:"ap"},{name:"Access",url:"https://bigfuture.collegeboard.org/",category:"programs",linkCode:"accs"},{name:"ACCUPLACER",label:"ACCUPLACER<sup>&reg;</sup>",url:"https://accuplacer.collegeboard.org/",category:"programs",linkCode:"accu"},{name:"CLEP",label:"CLEP<sup>&reg;</sup>",url:"https://clep.collegeboard.org/",category:"programs",linkCode:"clep"},{name:"CSS Profile",label:"CSS Profile<sup>&trade;</sup>",url:"https://student.collegeboard.org/css-financial-aid-profile",category:"programs",linkCode:"css"},{name:"Search",url:"https://collegeboardsearch.collegeboard.org/pastudentsrch/login.action",category:"programs",linkCode:"cbsch"},{name:"PowerFAIDS",label:"PowerFAIDS<sup>&reg;</sup>",url:"https://www.collegeboard.org/powerfaids",category:"programs",linkCode:"pfaid"},{name:"About Us",url:"https://www.collegeboard.org/about ",category:"organization",linkCode:"abt"},{name:"Careers",url:"https://www.collegeboard.org/about/careers ",category:"organization",linkCode:"car"},{name:"Membership",url:"https://www.collegeboard.org/membership ",category:"organization",linkCode:"mem"},{name:"Newsroom",url:"https://www.collegeboard.org/press ",category:"organization",linkCode:"news"},{name:"Research",url:"http://research.collegeboard.org/",category:"organization",linkCode:"rsch"},{name:"Services for Students with Disabilities",url:"https://www.collegeboard.org/students-with-disabilities",category:"organization",linkCode:"ssd"},{name:"Help",url:"https://www.collegeboard.org/help",category:"extra",linkCode:"help"},{name:"Contact Us",url:"https://www.collegeboard.org/contact-us",category:"extra",linkCode:"contact"},{name:"More",url:"https://www.collegeboard.org/sitemap",category:"extra",glyph:"matrix",linkCode:"morecb"},{name:"Facebook",url:"https://www.facebook.com/thecollegeboard",category:"extra",type:"social",group:"More",linkCode:"sm-fb",glyph:"facebook",target:"_blank"},{name:"Twitter",url:"https://twitter.com/collegeboard",category:"extra",type:"social",group:"More",linkCode:"sm-tw",glyph:"twitter",target:"_blank"},{name:"Youtube",url:"https://www.youtube.com/user/collegeboard",category:"extra",type:"social",group:"More",linkCode:"sm-yt",glyph:"youtube",target:"_blank"},{name:"LinkedIn",url:"https://www.linkedin.com/company/the-college-board",category:"extra",type:"social",group:"More",linkCode:"sm-li",glyph:"linkedin",target:"_blank"},{name:"Instagram",url:"https://www.instagram.com/collegeboard/",category:"extra",type:"social",group:"More",linkCode:"sm-in",glyph:"instagram",target:"_blank"},{name:"Doing Business",url:"https://www.collegeboard.org/about/doing-business",category:"extra",linkCode:"bus"},{name:"Compliance",url:"https://secure.ethicspoint.com/domain/en/report_custom.asp?clientid=18136",category:"extra",linkCode:"comp"},{name:"Terms of Use",url:"https://www.collegeboard.org/site-terms",category:"extra",linkCode:"terms"},{name:"Privacy Policy",url:"https://www.collegeboard.org/privacy-policy",category:"extra",linkCode:"pp"}]},tracking:{siteCode:"gf"}},initialize:function(a){this.options=this.applyDefaults(a),this._super(this.options),this.namespace=this.options.name+"-"+this.options.version+"-"+this.cid,this.options.config.useService&&(this.state=d.GetData,this.logger.debug("Global Footer - Retrieving Data from a Service")),this.options.config.isBottomAligned&&this.adjustDocument()},initializeBehaviors:function(){var a=this;if(this.options.config.isBottomAligned){var d=c.debounce(function(){a.adjustGlobalFooter()},150);b(window).off("resize."+this.namespace).on("resize."+this.namespace,d),this.adjustGlobalFooter()}},applyDefaults:function(c){var d=b.extend(!0,{},this.settings,a.DeploymentProfile,c);return d},setState:function(a){this.state=a,this.render()},buildNavigationContext:function(){for(var a={categories:{}},b=this.options.config.links,d=c.uniq(c.pluck(b,"category")),e=0,f=d.length;e<f;e++){for(var g=d[e],h=c.where(b,{category:g}),i=c.uniq(c.pluck(c.filter(h,function(a){return void 0!==a.group}),"group")),j=c.reject(h,function(a){return void 0!==a.group}),k=0,l=h.length;k<l;k++)h[k].id=h[k].name.replace(/\s+/g,"-").replace(/\//g,"-").toLowerCase(),h[k].url.indexOf("?")!==-1?h[k].url=h[k].url.trim()+"&navId="+this.options.tracking.siteCode+"-"+h[k].linkCode:h[k].url=h[k].url.trim()+"?navId="+this.options.tracking.siteCode+"-"+h[k].linkCode;for(var m=0,n=i.length;m<n;m++){for(var o=i[m],p=c.filter(h,function(a){return a.group===o}),q=-1,r=0,s=j.length;r<s;r++){var t=j[r];if(t.name===o){q=r;break}}q!==-1?j[q].children={id:o.replace(/\s+/g,"-").replace(/\//g,"-").toLowerCase(),links:p}:j=c.union(j,p)}var u=g.replace(/\s+/g,"-").replace(/\//g,"-").toLowerCase();a.categories[u]={id:u,name:g,links:j}}return a=this.buildLayoutContext(a)},buildLayoutContext:function(a){for(var b=a,c=this.options.config.layout,d=0,e=c.categories.length;d<e;d++){var f=c.categories[d],g=b.categories[f.name],h=g.links,i=f.columns,j=Math.ceil(h.length/i);g.columns=[];for(var k=0,l=i;k<l;k++){var m=k*j,n=m+j,o={links:h.slice(m,n)};b.categories[f.name].columns.push(o)}}return b},buildContext:function(){var a=this.options.config,b=this.buildNavigationContext();return b.useControls=a.useControls,b.year=(new Date).getFullYear(),b},render:function(){this.state()},draw:function(){var a=this.buildContext(),b=this.template(a);this.$el.html(b)},initializeGlobalHeaderAccessibility:function(){var a=b(".lv-globalHeader-widget").parent();return void 0!==a&&($backToTop=this.findInsideWidgetDOM(".lv-back-to-top"),$backToTop.prop("href","#"+a.prop("id")),a.prop("tabindex","-1")),a},initializeAccessibility:function(){var a=this,c=b(document),d=this.initializeGlobalHeaderAccessibility();d.length||c.off("DOMNodeInserted."+this.namespace).on("DOMNodeInserted."+this.namespace,function(d){var e=b(d.target);e.hasClass("lv-global-header")&&(a.initializeGlobalHeaderAccessibility(),c.off("DOMNodeInserted."+a.namespace))})},adjustDocument:function(){var a=b("body"),c=b("html");a.css("height","auto").css("min-height","100%"),c.css("height","100%")},adjustGlobalFooter:function(){var a=b("body");a.css("padding-bottom",this.getHeight()+"px"),this.$el.addClass("lv-globalfooter-widget-bottom-aligned")},getHeight:function(){return this.$el.outerHeight()},events:{"click .lv-back-to-top":"onBackToTopClick"},onBackToTopClick:function(a){a.preventDefault();var c=this.initializeGlobalHeaderAccessibility();c.length?b("html, body").animate({scrollTop:c.position().top},300,function(){c.focus()}):b("html, body").animate({scrollTop:0},300)}},{NAME:"Global Footer",VERSION:"2.0.0"});return c.extend(e,a)}(cb.core.widgets.GlobalFooter,jQuery,_);