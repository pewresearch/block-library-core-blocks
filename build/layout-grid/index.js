(()=>{var e={184:(e,t)=>{var r;!function(){"use strict";var o={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var l=typeof r;if("string"===l||"number"===l)e.push(r);else if(Array.isArray(r)){if(r.length){var c=n.apply(null,r);c&&e.push(c)}}else if("object"===l)if(r.toString===Object.prototype.toString)for(var i in r)o.call(r,i)&&r[i]&&e.push(i);else e.push(r.toString())}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(r=function(){return n}.apply(t,[]))||(e.exports=r)}()}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,r),l.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.blocks,t=JSON.parse('{"apiVersion":2,"$schema":"https://schemas.wp.org/trunk/block.json","name":"prc-block/layout-grid","description":"Align blocks to a global grid, with support for responsive breakpoints, gutter gap (block-spacing), and server side filtering of content.","title":"Grid","category":"design","supports":{"align":["full","wide"],"html":false,"color":{"background":true,"text":true},"spacing":{"margin":["top","bottom"],"padding":true,"blockGap":true},"__experimentalBorder":{"color":true,"width":true}},"attributes":{"presetLayout":{"type":"string"},"gutterSize":{"type":"string","default":"large"},"addGutterEnds":{"type":"boolean","default":true},"enableVerticalDivider":{"type":"boolean","default":false},"verticalAlignment":{"type":"string"}},"usesContext":["queryId","query","postId","postType"],"providesContext":{"prc-block/layout-grid/presetLayout":"presetLayout"},"example":{"innerBlocks":[{"name":"prc-block/layout-grid-column","innerBlocks":[{"name":"core/paragraph","attributes":{"customFontSize":32,"content":"<strong>Hello world!</strong>","align":"center"}}]},{"name":"prc-block/layout-grid-column","innerBlocks":[{"name":"core/image","attributes":{"url":"https://s.w.org/images/core/5.3/Windbuchencom.jpg"}}]}]},"editorScript":"file:./index.js","editorStyle":"file:./index.css","viewScript":"file:./view.js","style":"file:./view.css"}');function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},o.apply(this,arguments)}const n=window.wp.element;var l=r(184),c=r.n(l);const i=window.wp.i18n,s=window.wp.blockEditor,a=window.wp.data,u=window.lodash,p=window.wp.primitives,d=(0,n.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(p.Path,{d:"M20.5 16h-.7V8c0-1.1-.9-2-2-2H6.2c-1.1 0-2 .9-2 2v8h-.7c-.8 0-1.5.7-1.5 1.5h20c0-.8-.7-1.5-1.5-1.5zM5.7 8c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v7.6H5.7V8z"})),m=(0,n.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(p.Path,{d:"M17 4H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12zm-7.5-.5h4V16h-4v1.5z"})),h=(0,n.createElement)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(p.Path,{d:"M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"})),g="Tablet",v="Mobile",f=()=>[{value:"Desktop",label:(0,i.__)("Desktop","prc-block-library-layout-grid"),icon:d},{value:g,label:(0,i.__)("Tablet","prc-block-library-layout-grid"),icon:m},{value:v,label:(0,i.__)("Mobile","prc-block-library-layout-grid"),icon:h}];function b(e,t){return`column${e+1}${t}Span`}function w(e,t){return`column${e+1}${t}Offset`}const y=e=>e===g?8:e===v?4:12,k=function(e){let{peviewDeviceType:t,ref:r}=e;return(0,n.createElement)("div",{className:"prc-block-layout-grid__overlay",ref:r},(0,n.createElement)("div",{className:"prc-block-layout-grid__overlay__inner"},(0,u.times)(y(t)).map((e=>(0,n.createElement)("div",{className:"prc-block-layout-grid__overlay__column",key:e})))))},_=window.wp.components,E=window.wp.compose;function S(e){let{previewDeviceType:t,viewPort:r,updateViewport:o}=e;console.log("<DevicePreviewToolbar />",t,r);const{__experimentalSetPreviewDeviceType:l}=(0,a.useDispatch)(document.querySelector("#edit-site-editor")?"core/edit-site":"core/edit-post"),[c,i]=(0,E.useResizeObserver)(),u=(0,E.useViewportMatch)("medium","<"),p=(0,E.useViewportMatch)("small","<");return(0,n.useEffect)((()=>{const e=function(e,t){return e?"Mobile":t?"Tablet":"Desktop"}(p,u);e!==r&&o(e)}),[i]),(0,n.createElement)(n.Fragment,null,c,!p&&(0,n.createElement)(s.BlockControls,null,(0,n.createElement)(_.Dropdown,{renderToggle:e=>{let{isOpen:r,onToggle:o}=e;return(0,n.createElement)(_.ToolbarGroup,null,(0,n.createElement)(_.Button,{"aria-expanded":r,onClick:o,icon:f().find((e=>e.value===t)).icon}))},renderContent:()=>(0,n.createElement)(_.MenuGroup,null,(0,n.createElement)(_.MenuItemsChoice,{value:t,onSelect:e=>l(e),choices:f()}))})))}function V(e){return(0,n.createElement)(_.SVG,o({xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},e),(0,n.createElement)(_.Path,{d:"M7 12v24h34V12H7zm32 22H9V14h30v20z"}))}function O(e){return(0,n.createElement)(_.SVG,o({xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},e),(0,n.createElement)(_.Path,{d:"M7,12v24h34V12H7z M23,34H9V14h14V34z M39,34H25V14h14V34z"}))}function x(e){return(0,n.createElement)(_.SVG,o({xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},e),(0,n.createElement)(_.Path,{d:"M7 12v24h34V12H7zm23 2h9v20h-9V14zm-2 20h-8V14h8v20zM9 14h9v20H9V14z"}))}function z(e){return(0,n.createElement)(_.SVG,o({xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 48 48"},e),(0,n.createElement)(_.Path,{d:"M7 12v24h34V12H7zm8 22H9V14h6v20zm8 0h-6V14h6v20zm8 0h-6V14h6v20zm8 0h-6V14h6v20z"}))}const j=function(e){let{columns:t,...r}=e;return 4===t?(0,n.createElement)(z,r):3===t?(0,n.createElement)(x,r):2===t?(0,n.createElement)(O,r):(0,n.createElement)(V,r)};function M(e){let{columns:t}=e;return console.log("<LayoutPanel />",t),(0,n.createElement)(_.PanelBody,{title:(0,i.__)("Layout","layout-grid")},(0,n.createElement)("div",{className:"prc-block-layout-grid__controls__layout block-editor-block-styles"},[{label:(0,i.__)("1 cols","prc-block-library-layout-grid"),value:1},{label:(0,i.__)("2 cols","prc-block-library-layout-grid"),value:2},{label:(0,i.__)("3 cols","prc-block-library-layout-grid"),value:3},{label:(0,i.__)("4 cols","prc-block-library-layout-grid"),value:4}].map((e=>(0,n.createElement)("div",{key:e.value,className:c()("block-editor-block-styles__item",{"is-active":t===e.value}),onClick:()=>console.log("columns",e.value),onKeyDown:t=>{ENTER!==t.keyCode&&SPACE!==t.keyCode||(t.preventDefault(),console.log("columns",e.value))},role:"button",tabIndex:"0","aria-label":e.label},(0,n.createElement)("div",{className:"block-editor-block-styles__item-preview"},(0,n.createElement)(j,{columns:e.value})),(0,n.createElement)("div",{className:"editor-block-styles__item-label block-editor-block-styles__item-label"},e.label))))),(0,n.createElement)("p",{className:"prc-block-layout-grid__controls__layout__help"},(0,i.__)("Changing the number of columns will reset your layout and could remove content.","layout-grid")))}function B(e){let{previewDeviceType:t,columns:r,clientId:o}=e;const[l,c]=(0,n.useState)(null);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(s.InspectorControls,null,(0,n.createElement)(M,{columns:r})),(0,n.createElement)(s.BlockControls,null,(0,n.createElement)(S,{previewDeviceType:t,viewPort:l,updateViewport:e=>c(e)})))}const T=["prc-block/layout-grid-column"],A=[{name:"one-column",title:(0,i.__)("One"),description:(0,i.__)("One column","prc-block-library-primitives"),icon:(0,n.createElement)(j,{columns:1}),isDefault:!0,innerBlocks:[["prc-block/layout-grid-column"]],scope:["block"]},{name:"two-columns",title:(0,i.__)("Two"),description:(0,i.__)("Two columns","prc-block-library-primitives"),icon:(0,n.createElement)(j,{columns:2}),innerBlocks:[["prc-block/layout-grid-column"],["prc-block/layout-grid-column"]],scope:["block"]},{name:"three-columns",title:(0,i.__)("Three"),description:(0,i.__)("Three columns","prc-block-library-primitives"),icon:(0,n.createElement)(j,{columns:3}),innerBlocks:[["prc-block/layout-grid-column"],["prc-block/layout-grid-column"],["prc-block/layout-grid-column"]],scope:["block"]},{name:"four-columns",title:(0,i.__)("Four"),description:(0,i.__)("Four columns","prc-block-library-primitives"),icon:(0,n.createElement)(j,{columns:4}),innerBlocks:[["prc-block/layout-grid-column"],["prc-block/layout-grid-column"],["prc-block/layout-grid-column"],["prc-block/layout-grid-column"]],scope:["block"]}],{name:D,attributes:C}=t,P={icon:function(e){return e.size&&(e.width=e.size,e.height=e.size),(0,n.createElement)(_.SVG,o({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},e),(0,n.createElement)(_.Path,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7.5 11.5H6c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h5.5v10zm4 0H13v-10h2.5v10zm4-.5c0 .3-.2.5-.5.5h-2v-10h2c.3 0 .5.2.5.5v9z"}))},edit:function(e){let{className:t,attributes:r,setAttributes:l,isSelected:i,clientId:u}=e;const p=(0,n.useRef)(),{presetLayout:d,gutterSize:m,addGutterEnds:h,enableVerticalDivider:f,verticalAlignment:_}=r,{columns:E,previewDeviceType:S}=(0,a.useSelect)((e=>{var t;const{getBlockCount:r}=e("core/block-editor");return{columns:r(u),previewDeviceType:null===(t=e("core/edit-post"))||void 0===t?void 0:t.__experimentalGetPreviewDeviceType()}}),[]),V=(0,s.useBlockProps)({className:c()(t)}),O=(0,s.useInnerBlocksProps)({},{allowedBlocks:T,orientation:"horizontal",template:[["prc-block/layout-grid-column",{}]]});return(0,n.useEffect)((()=>{console.log("previewDeviceType",S),console.log("COLUMNS",E);const e=new class{constructor(e,t,r){this.attributes=e,this.device=t,this.columnCount=r}getGridValues(){const e={};for(let o=0;o<this.columnCount;o++){const n=(t=this.device,r=this.columnCount,t===g?3===r&&2===o?y(t):1<r?y(t)/2:y(t):t===v?y(t):y(t)/r);e[b(o,this.device)]=this.getSpan(o)||n,e[w(o,this.device)]=this.getOffset(o)}var t,r;return e}applyAdjustments(e){let t=this.getGridValues();for(let r=0;r<e.length;r++)t={...t,...e[r]};return t}getSpanAdjustment(e,t){return{[b(e,this.device)]:t}}getAdjustOffset(e,t){return{[w(e,this.device)]:t}}getShrinkOffset(e,t){const r=this.getOffset(e),o=t>=r?r:t;return{adjustment:this.getAdjustOffset(e,r-o),offsetUsed:o}}hasOverlaps(e){for(let t=0;t<e.length;t++){const r=e[t];for(let o=t+1;o<e.length;o++){const t=e[o];if(r.start>t.start&&r.start<t.end)return!0;if(r.end>t.start&&r.end<t.end)return!0}}return!1}validateGrid(e){const t=[],r=y(this.device);let o=0,n=0;for(let l=0;l<this.columnCount;l++){const c=e[b(l,this.device)],i=e[w(l,this.device)];if(n+=i,n>=r&&(n-=r),n+=c,n>r)return!1;t.push({start:o+i,end:o+i+c}),o+=c+i}return!(o>(l=this.device,c=this.columnCount,l===g&&2<c?2*y(l):l===v?y(l)*c:y(l))||this.hasOverlaps(t));var l,c}getEndAdjustments(e,t){const r=[];if(0>t)return[this.getAdjustOffset(e,this.getOffset(e)+Math.abs(t))];if(0<t)for(let o=e;o<this.columnCount&&0<t;o++){const e=this.getShrinkOffset(o,Math.abs(t));r.push(e.adjustment),t-=e.offsetUsed}return r}getStartMovedLeft(e,t){const r=[];for(let o=e;0<=o&&0<t;o--){const e=this.getShrinkOffset(o,t);r.push(e.adjustment),t-=e.offsetUsed}return r}getStartAdjustments(e,t){const r=this.getOffset(e),o=this.getOffsetFromStart(e,t),n=o-r;return 0>n?this.getStartMovedLeft(e,Math.abs(n)):[this.getAdjustOffset(e,o)]}getSpan(e){return this.attributes[b(e,this.device)]}getOffset(e){return this.attributes[w(e,this.device)]}getStart(e){let t=0;for(let r=0;r<e;r++)t+=this.getSpan(r)+this.getOffset(r);const r=Math.max(1,Math.floor(t/y(this.device)));return(t+this.getOffset(e))%(r*y(this.device))}getOffsetFromStart(e,t){if(0===e)return t;const r=t-this.getStart(e);return this.getOffset(e)+r}convertOffsetToStart(e,t){return this.getStart(e)+(t-this.getOffset(e))}getAdjustedGrid(e,t){const{start:r=this.getStart(e),span:o=this.getSpan(e)}=t;let n=[];r!==this.getStart(e)&&o!==this.getSpan(e)?(n=n.concat(this.getStartAdjustments(e,r)),n=n.concat(this.getSpanAdjustment(e,o))):o!==this.getSpan(e)?(n=n.concat(this.getSpanAdjustment(e,o)),n=n.concat(this.getEndAdjustments(e+1,o-this.getSpan(e)))):r!==this.getStart(e)&&(n=n.concat(this.getStartAdjustments(e,r)),n=n.concat(this.getEndAdjustments(e+1,r-this.getStart(e))));const l=this.applyAdjustments(n);return 0<n.length&&this.validateGrid(l)?l:null}}(r,S,E);console.log("GRID ",e)}),[S]),(0,n.createElement)("div",V,(0,n.createElement)(k,{previewDeviceType:S,ref:p}),(0,n.createElement)(B,o({},r,{columns:E,previewDeviceType:S,clientId:u})),(0,n.createElement)("div",O))},save:()=>(0,n.createElement)(s.InnerBlocks.Content,null),variations:A};(0,e.registerBlockType)(D,{...t,...P})})()})();
//# sourceMappingURL=index.js.map