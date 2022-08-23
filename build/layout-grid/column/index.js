(()=>{var e={184:(e,t)=>{var o;!function(){"use strict";var l={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var r=typeof o;if("string"===r||"number"===r)e.push(o);else if(Array.isArray(o)){if(o.length){var a=n.apply(null,o);a&&e.push(a)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var i in o)l.call(o,i)&&o[i]&&e.push(i);else e.push(o.toString())}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(o=function(){return n}.apply(t,[]))||(e.exports=o)}()}},t={};function o(l){var n=t[l];if(void 0!==n)return n.exports;var r=t[l]={exports:{}};return e[l](r,r.exports,o),r.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var l in t)o.o(t,l)&&!o.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.blocks,t=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","name":"prc-block-library/layout-grid-column","description":"A column used inside a Layout Grid block.","title":"Column","parent":["prc-block-library/layout-grid"],"category":"design","supports":{"inserter":false,"reusable":false,"html":false,"color":{"background":true,"text":true}},"attributes":{"padding":{"type":"string","default":"none"},"verticalAlignment":{"type":"string"}},"editorScript":"file:./index.js"}'),l=window.wp.element;var n=o(184),r=o.n(n);const a=window.wp.blockEditor,i=window.wp.compose,c=window.wp.components,s=window.wp.i18n;const d=window.wp.data,u=(0,i.compose)((0,a.withColors)("backgroundColor"),(0,d.withSelect)(((e,t)=>{const{clientId:o}=t,{getBlockOrder:l}=e("core/block-editor");return{hasChildBlocks:0<l(o).length}})),(0,d.withDispatch)(((e,t,o)=>({updateAlignment(l){const{clientId:n,setAttributes:r}=t,{updateBlockAttributes:a}=e("core/block-editor"),{getBlockRootClientId:i}=o.select("core/block-editor");r({verticalAlignment:l}),a(i(n),{verticalAlignment:null})}}))))((function(e){let{className:t,hasChildBlocks:o,attributes:n,setAttributes:i,updateAlignment:d}=e;const{padding:u,verticalAlignment:p}=n,[m,g]=(0,l.useState)(null),b=r()(t,{[`wp-block-prc-block-library-layout-grid__padding-${u}`]:!0,"components-resizable-box__container":!0,"wp-blocks-prc-block-library-layout-grid__showleft":"right"===m,"wp-blocks-prc-block-library-layout-grid__showright":"left"===m,[`is-vertically-aligned-${p}`]:p}),h=()=>{g(null),document.removeEventListener("mouseup",h)},v=()=>{g(null),document.removeEventListener("mouseup",v)};return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(a.InspectorControls,null,(0,l.createElement)(c.PanelBody,{title:(0,s.__)("Column Padding","layout-grid")},(0,l.createElement)("p",null,(0,s.__)("Choose padding for this column:","layout-grid")),(0,l.createElement)(c.SelectControl,{value:u,onChange:e=>i({padding:e}),options:[{value:"none",label:(0,s.__)("No padding","layout-grid")}].concat([{value:"small",label:(0,s.__)("Small","layout-grid")},{value:"medium",label:(0,s.__)("Medium","layout-grid")},{value:"large",label:(0,s.__)("Large","layout-grid")},{value:"huge",label:(0,s.__)("Huge","layout-grid")}])}))),(0,l.createElement)(a.BlockControls,null,(0,l.createElement)(a.BlockVerticalAlignmentToolbar,{onChange:d,value:p})),(0,l.createElement)("div",{className:b},(0,l.createElement)("span",{className:"wp-blocks-prc-block-library-layout-grid__resize-handles"},(0,l.createElement)("div",{className:"components-resizable-box__handle components-resizable-box__side-handle components-resizable-box__handle-right",onMouseDown:()=>{g("right"),document.addEventListener("mouseup",v)},"data-resize-right":!0}),(0,l.createElement)("div",{className:"components-resizable-box__handle components-resizable-box__side-handle components-resizable-box__handle-left",onMouseDown:()=>{g("left"),document.addEventListener("mouseup",h)},"data-resize-left":!0})),(0,l.createElement)(a.InnerBlocks,{templateLock:!1,renderAppender:o?void 0:()=>(0,l.createElement)(a.InnerBlocks.ButtonBlockAppender,null)})))}));function p(){return p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var l in o)Object.prototype.hasOwnProperty.call(o,l)&&(e[l]=o[l])}return e},p.apply(this,arguments)}const{name:m}=t,g={icon:function(e){return(0,l.createElement)(c.SVG,p({xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},e),(0,l.createElement)(c.Path,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM5.5 17V8c0-.3.2-.5.5-.5h5.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2v-10h2c.3 0 .5.2.5.5v9z"}))},edit:u,save:e=>{let{attributes:t={}}=e;const{className:o,backgroundColor:n,customBackgroundColor:i,padding:c,verticalAlignment:s}=t,d=(0,a.getColorClassName)("background-color",n),u=r()(o,{[`wp-block-prc-block-library-layout-grid__padding-${c}`]:!0,"has-background":n||i,[d]:d,[`is-vertically-aligned-${s}`]:s}),p={backgroundColor:d?void 0:i};return(0,l.createElement)("div",{className:u,style:p},(0,l.createElement)(a.InnerBlocks.Content,null))}};(0,e.registerBlockType)(m,{...t,...g})})()})();
//# sourceMappingURL=index.js.map