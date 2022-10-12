(()=>{var e={114:function(e,t){var n,r;n=function(){"use strict";var e=["|","^"],t=[",",";","\t","|","^"],n=["\r\n","\r","\n"];var r=Array.isArray||function(e){return"[object Array]"===toString.call(e)};function i(e){return"string"==typeof e}function o(e,t){return function(e){return null!=e}(e)?e:t}function c(e,t){for(var n=0,r=e.length;n<r&&!1!==t(e[n],n);n+=1);}function a(e){return e.replace(/"/g,'\\"')}function l(e){return"attrs["+e+"]"}function s(e,t){return isNaN(Number(e))?function(e){return 0==e||1==e}(e)?"Boolean("+l(t)+" == true)":"String("+l(t)+")":"Number("+l(t)+")"}function u(e,t,n,o){var u=[];return 3==arguments.length?(t?r(t)?c(n,(function(n,r){i(t[r])?t[r]=t[r].toLowerCase():e[t[r]]=t[r],u.push("deserialize[cast["+r+"]]("+l(r)+")")})):c(n,(function(e,t){u.push(s(e,t))})):c(n,(function(e,t){u.push(l(t))})),u="return ["+u.join(",")+"]"):(t?r(t)?c(n,(function(n,r){i(t[r])?t[r]=t[r].toLowerCase():e[t[r]]=t[r],u.push('"'+a(o[r])+'": deserialize[cast['+r+"]]("+l(r)+")")})):c(n,(function(e,t){u.push('"'+a(o[t])+'": '+s(e,t))})):c(n,(function(e,t){u.push('"'+a(o[t])+'": '+l(t))})),u="return {"+u.join(",")+"}"),new Function("attrs","deserialize","cast",u)}function f(t,n){var r,i=0;return c(n,(function(n){var o,c=n;-1!=e.indexOf(n)&&(c="\\"+c),(o=t.match(new RegExp(c,"g")))&&o.length>i&&(i=o.length,r=n)})),r||n[0]}var h=function(){function e(e,c){if(c||(c={}),r(e))this.mode="encode";else{if(!i(e))throw new Error("Incompatible format!");this.mode="parse"}this.data=e,this.options={header:o(c.header,!1),cast:o(c.cast,!0)};var a=c.lineDelimiter||c.line,l=c.cellDelimiter||c.delimiter;this.isParser()?(this.options.lineDelimiter=a||f(this.data,n),this.options.cellDelimiter=l||f(this.data,t),this.data=function(e,t){return e.slice(-t.length)!=t&&(e+=t),e}(this.data,this.options.lineDelimiter)):this.isEncoder()&&(this.options.lineDelimiter=a||"\r\n",this.options.cellDelimiter=l||",")}function a(e,t,n,r,i){e(new t(n,r,i))}function l(e){return r(e)?"array":function(e){var t=typeof e;return"function"===t||"object"===t&&!!e}(e)?"object":i(e)?"string":null==e?"null":"primitive"}return e.prototype.set=function(e,t){return this.options[e]=t},e.prototype.isParser=function(){return"parse"==this.mode},e.prototype.isEncoder=function(){return"encode"==this.mode},e.prototype.parse=function(e){if("parse"==this.mode){if(0===this.data.trim().length)return[];var t,n,i,o=this.data,c=this.options,l=c.header,s={cell:"",line:[]},f=this.deserialize;e||(i=[],e=function(e){i.push(e)}),1==c.lineDelimiter.length&&(b=v);var h,p,d,m=o.length,g=c.cellDelimiter.charCodeAt(0),y=c.lineDelimiter.charCodeAt(c.lineDelimiter.length-1);for(w(),h=0,p=0;h<m;h++)d=o.charCodeAt(h),t.cell&&(t.cell=!1,34==d)?t.escaped=!0:t.escaped&&34==d?t.quote=!t.quote:(t.escaped&&t.quote||!t.escaped)&&(d==g?(v(s.cell+o.slice(p,h)),p=h+1):d==y&&(b(s.cell+o.slice(p,h)),p=h+1,(s.line.length>1||""!==s.line[0])&&E(),s.line=[]));return i||this}function w(){t={escaped:!1,quote:!1,cell:!0}}function v(e){s.line.push(t.escaped?e.slice(1,-1).replace(/""/g,'"'):e),s.cell="",w()}function b(e){v(e.slice(0,1-c.lineDelimiter.length))}function E(){l?r(l)?(n=u(f,c.cast,s.line,l),(E=function(){a(e,n,s.line,f,c.cast)})()):l=s.line:(n||(n=u(f,c.cast,s.line)),(E=function(){a(e,n,s.line,f,c.cast)})())}},e.prototype.deserialize={string:function(e){return String(e)},number:function(e){return Number(e)},boolean:function(e){return Boolean(e)}},e.prototype.serialize={object:function(e){var t=this,n=Object.keys(e),r=Array(n.length);return c(n,(function(n,i){r[i]=t[l(e[n])](e[n])})),r},array:function(e){var t=this,n=Array(e.length);return c(e,(function(e,r){n[r]=t[l(e)](e)})),n},string:function(e){return'"'+String(e).replace(/"/g,'""')+'"'},null:function(e){return""},primitive:function(e){return e}},e.prototype.encode=function(e){if("encode"==this.mode){if(0==this.data.length)return"";var t,n,o=this.data,a=this.options,s=a.header,u=o[0],f=this.serialize,h=0;e||(n=Array(o.length),e=function(e,t){n[t+h]=e}),s&&(r(s)||(s=t=Object.keys(u)),e(m(f.array(s)),0),h=1);var p,d=l(u);return"array"==d?(r(a.cast)?(p=Array(a.cast.length),c(a.cast,(function(e,t){i(e)?p[t]=e.toLowerCase():(p[t]=e,f[e]=e)}))):(p=Array(u.length),c(u,(function(e,t){p[t]=l(e)}))),c(o,(function(t,n){var r=Array(p.length);c(t,(function(e,t){r[t]=f[p[t]](e)})),e(m(r),n)}))):"object"==d&&(t=Object.keys(u),r(a.cast)?(p=Array(a.cast.length),c(a.cast,(function(e,t){i(e)?p[t]=e.toLowerCase():(p[t]=e,f[e]=e)}))):(p=Array(t.length),c(t,(function(e,t){p[t]=l(u[e])}))),c(o,(function(n,r){var i=Array(t.length);c(t,(function(e,t){i[t]=f[p[t]](n[e])})),e(m(i),r)}))),n?n.join(a.lineDelimiter):this}function m(e){return e.join(a.cellDelimiter)}},e.prototype.forEach=function(e){return this[this.mode](e)},e}();return h.parse=function(e,t){return new h(e,t).parse()},h.encode=function(e,t){return new h(e,t).encode()},h.forEach=function(e,t,n){return 2==arguments.length&&(n=t),new h(e,t).forEach(n)},h},void 0===(r=n.apply(t,[]))||(e.exports=r)}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.element,t=window.wp.i18n,r=window.wp.compose,i=window.wp.blockEditor,o=window.wp.components,c=window.wp.hooks;var a=n(114),l=n.n(a);function s(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return e.map((e=>({content:e,tag:t})))}function u(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return"th"===t?s(e,t):e.map((e=>({cells:s(e,t)})))}function f(e,t,n){const r=new FileReader;r.onload=()=>{!function(e,t,n){const r=new(l())(e,{header:!1}).parse(),i=u(r.shift(),"th");n({body:u(r)}),n({head:[{cells:i}]})}(r.result,0,n)},Array.from(e).forEach((e=>r.readAsBinaryString(e)))}function h(n){const{attributes:r,setAttributes:c}=n,a=(0,e.useRef)(null);return(0,e.createElement)(i.InspectorControls,null,(0,e.createElement)(o.PanelBody,{title:"CSV Import"},(0,e.createElement)(o.PanelRow,null,(0,e.createElement)(o.Button,{isPrimary:!0,onClick:()=>{a.current.click()}},(0,t.__)("Import CSV to Table","prc-block-library")),(0,e.createElement)("input",{ref:a,type:"file",accept:"text/csv",onChange:e=>f(e.target.files,0,c),style:{display:"none"}}),(0,e.createElement)(o.DropZone,{onFilesDrop:e=>f(e,0,c)}))))}(0,c.addFilter)("editor.BlockEdit","prc-block-library/table",(0,r.createHigherOrderComponent)((t=>function(n){const{name:r}=n;return"core/table"!==r?(0,e.createElement)(t,n):(0,e.createElement)(e.Fragment,null,(0,e.createElement)(t,n),(0,e.createElement)(h,n))}),"withTableUtilities"),21)})()})();
//# sourceMappingURL=index.js.map