(()=>{"use strict";const e=window.wp.element,t=window.wp.i18n,n=window.wp.compose,l=window.wp.hooks,o=window.wp.blockEditor,i=window.wp.components,r=(0,n.createHigherOrderComponent)((n=>function(l){const{name:r,attributes:a,setAttributes:c}=l;if("core/social-links"!==r)return(0,e.createElement)(n,l);const{title:s,description:w,url:d}=a;return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(o.InspectorControls,null,(0,e.createElement)(i.PanelBody,{title:(0,t.__)("Social Meta Info")},(0,e.createElement)(i.TextControl,{label:(0,t.__)("Title"),value:s,onChange:e=>c({title:e})}),(0,e.createElement)(i.TextControl,{label:(0,t.__)("Description"),value:w,onChange:e=>c({description:e})}),(0,e.createElement)(i.TextControl,{label:(0,t.__)("URL"),help:(0,t.__)("Setting a url here will override any selections on the individual social links.","SR_block_library"),value:d,onChange:e=>c({url:e})}))),(0,e.createElement)(n,l))}),"withSocialLinksExtraControls");(0,l.addFilter)("editor.BlockEdit","prc-block/social-links",r,21)})();
//# sourceMappingURL=edit.js.map