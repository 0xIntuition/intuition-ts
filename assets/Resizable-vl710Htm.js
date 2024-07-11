import{j as we}from"./jsx-runtime-Cw0GR0a5.js";import{a as Xe}from"./index-CTjT7uj6.js";import{c as Je}from"./index-DeHqaMYO.js";import{c as Pn}from"./createLucideIcon-BfM7wYCo.js";/**
 * @license lucide-react v0.376.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wn=Pn("GripVertical",[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]]),{createElement:ue,createContext:En,createRef:at,forwardRef:Ye,useCallback:G,useContext:Ze,useEffect:re,useImperativeHandle:Qe,useLayoutEffect:Ln,useMemo:Cn,useRef:_,useState:me}=Xe,je=Xe.useId,In=Ln,Le=En(null);Le.displayName="PanelGroupContext";const oe=In,Rn=typeof je=="function"?je:()=>null;let An=0;function De(e=null){const n=Rn(),t=_(e||n||null);return t.current===null&&(t.current=""+An++),e??t.current}function en({children:e,className:n="",collapsedSize:t,collapsible:r,defaultSize:i,forwardedRef:o,id:a,maxSize:l,minSize:s,onCollapse:p,onExpand:b,onResize:f,order:c,style:y,tagName:d="div",...E}){const w=Ze(Le);if(w===null)throw Error("Panel components must be rendered within a PanelGroup container");const{collapsePanel:S,expandPanel:C,getPanelSize:N,getPanelStyle:D,groupId:L,isPanelCollapsed:h,reevaluatePanelConstraints:F,registerPanel:W,resizePanel:q,unregisterPanel:O}=w,j=De(a),A=_({callbacks:{onCollapse:p,onExpand:b,onResize:f},constraints:{collapsedSize:t,collapsible:r,defaultSize:i,maxSize:l,minSize:s},id:j,idIsFromProps:a!==void 0,order:c});_({didLogMissingDefaultSizeWarning:!1}),oe(()=>{const{callbacks:$,constraints:k}=A.current,H={...k};A.current.id=j,A.current.idIsFromProps=a!==void 0,A.current.order=c,$.onCollapse=p,$.onExpand=b,$.onResize=f,k.collapsedSize=t,k.collapsible=r,k.defaultSize=i,k.maxSize=l,k.minSize=s,(H.collapsedSize!==k.collapsedSize||H.collapsible!==k.collapsible||H.maxSize!==k.maxSize||H.minSize!==k.minSize)&&F(A.current,H)}),oe(()=>{const $=A.current;return W($),()=>{O($)}},[c,j,W,O]),Qe(o,()=>({collapse:()=>{S(A.current)},expand:$=>{C(A.current,$)},getId(){return j},getSize(){return N(A.current)},isCollapsed(){return h(A.current)},isExpanded(){return!h(A.current)},resize:$=>{q(A.current,$)}}),[S,C,N,h,j,q]);const Y=D(A.current,i);return ue(d,{...E,children:e,className:n,id:a,style:{...Y,...y},"data-panel":"","data-panel-collapsible":r||void 0,"data-panel-group-id":L,"data-panel-id":j,"data-panel-size":parseFloat(""+Y.flexGrow).toFixed(1)})}const nn=Ye((e,n)=>ue(en,{...e,forwardedRef:n}));en.displayName="Panel";nn.displayName="forwardRef(Panel)";let $e=null,te=null;function kn(e,n){if(n){const t=(n&ln)!==0,r=(n&sn)!==0,i=(n&cn)!==0,o=(n&un)!==0;if(t)return i?"se-resize":o?"ne-resize":"e-resize";if(r)return i?"sw-resize":o?"nw-resize":"w-resize";if(i)return"s-resize";if(o)return"n-resize"}switch(e){case"horizontal":return"ew-resize";case"intersection":return"move";case"vertical":return"ns-resize"}}function Nn(){te!==null&&(document.head.removeChild(te),$e=null,te=null)}function Ne(e,n){const t=kn(e,n);$e!==t&&($e=t,te===null&&(te=document.createElement("style"),document.head.appendChild(te)),te.innerHTML=`*{cursor: ${t}!important;}`)}function tn(e){return e.type==="keydown"}function rn(e){return e.type.startsWith("pointer")}function on(e){return e.type.startsWith("mouse")}function Ce(e){if(rn(e)){if(e.isPrimary)return{x:e.clientX,y:e.clientY}}else if(on(e))return{x:e.clientX,y:e.clientY};return{x:1/0,y:1/0}}function Mn(){if(typeof matchMedia=="function")return matchMedia("(pointer:coarse)").matches?"coarse":"fine"}function $n(e,n,t){return e.x<n.x+n.width&&e.x+e.width>n.x&&e.y<n.y+n.height&&e.y+e.height>n.y}function Dn(e,n){if(e===n)throw new Error("Cannot compare node with itself");const t={a:Ke(e),b:Ke(n)};let r;for(;t.a.at(-1)===t.b.at(-1);)e=t.a.pop(),n=t.b.pop(),r=e;v(r,"Stacking order can only be calculated for elements with a common ancestor");const i={a:Fe(Te(t.a)),b:Fe(Te(t.b))};if(i.a===i.b){const o=r.childNodes,a={a:t.a.at(-1),b:t.b.at(-1)};let l=o.length;for(;l--;){const s=o[l];if(s===a.a)return 1;if(s===a.b)return-1}}return Math.sign(i.a-i.b)}const _n=/\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;function Hn(e){var n;const t=getComputedStyle((n=an(e))!==null&&n!==void 0?n:e).display;return t==="flex"||t==="inline-flex"}function Gn(e){const n=getComputedStyle(e);return!!(n.position==="fixed"||n.zIndex!=="auto"&&(n.position!=="static"||Hn(e))||+n.opacity<1||"transform"in n&&n.transform!=="none"||"webkitTransform"in n&&n.webkitTransform!=="none"||"mixBlendMode"in n&&n.mixBlendMode!=="normal"||"filter"in n&&n.filter!=="none"||"webkitFilter"in n&&n.webkitFilter!=="none"||"isolation"in n&&n.isolation==="isolate"||_n.test(n.willChange)||n.webkitOverflowScrolling==="touch")}function Te(e){let n=e.length;for(;n--;){const t=e[n];if(v(t,"Missing node"),Gn(t))return t}return null}function Fe(e){return e&&Number(getComputedStyle(e).zIndex)||0}function Ke(e){const n=[];for(;e;)n.push(e),e=an(e);return n}function an(e){const{parentNode:n}=e;return n&&n instanceof ShadowRoot?n.host:n}const ln=1,sn=2,cn=4,un=8,Bn=Mn()==="coarse";let Q=[],Ie=!1,Z=new Map,Re=new Map;const ye=new Set;function jn(e,n,t,r,i){var o;const{ownerDocument:a}=n,l={direction:t,element:n,hitAreaMargins:r,setResizeHandlerState:i},s=(o=Z.get(a))!==null&&o!==void 0?o:0;return Z.set(a,s+1),ye.add(l),Ee(),function(){var b;Re.delete(e),ye.delete(l);const f=(b=Z.get(a))!==null&&b!==void 0?b:1;Z.set(a,f-1),Ee(),f===1&&Z.delete(a)}}function Ve(e){const{target:n}=e,{x:t,y:r}=Ce(e);Ie=!0,_e({target:n,x:t,y:r}),Ee(),Q.length>0&&(He("down",e),e.preventDefault(),e.stopPropagation())}function de(e){const{x:n,y:t}=Ce(e);if(!Ie){const{target:r}=e;_e({target:r,x:n,y:t})}He("move",e),fn(),Q.length>0&&e.preventDefault()}function ae(e){const{target:n}=e,{x:t,y:r}=Ce(e);Re.clear(),Ie=!1,Q.length>0&&e.preventDefault(),He("up",e),_e({target:n,x:t,y:r}),fn(),Ee()}function _e({target:e,x:n,y:t}){Q.splice(0);let r=null;e instanceof HTMLElement&&(r=e),ye.forEach(i=>{const{element:o,hitAreaMargins:a}=i,l=o.getBoundingClientRect(),{bottom:s,left:p,right:b,top:f}=l,c=Bn?a.coarse:a.fine;if(n>=p-c&&n<=b+c&&t>=f-c&&t<=s+c){if(r!==null&&o!==r&&!o.contains(r)&&!r.contains(o)&&Dn(r,o)>0){let d=r,E=!1;for(;d&&!d.contains(o);){if($n(d.getBoundingClientRect(),l)){E=!0;break}d=d.parentElement}if(E)return}Q.push(i)}})}function Me(e,n){Re.set(e,n)}function fn(){let e=!1,n=!1;Q.forEach(r=>{const{direction:i}=r;i==="horizontal"?e=!0:n=!0});let t=0;Re.forEach(r=>{t|=r}),e&&n?Ne("intersection",t):e?Ne("horizontal",t):n?Ne("vertical",t):Nn()}function Ee(){Z.forEach((e,n)=>{const{body:t}=n;t.removeEventListener("contextmenu",ae),t.removeEventListener("pointerdown",Ve),t.removeEventListener("pointerleave",de),t.removeEventListener("pointermove",de)}),window.removeEventListener("pointerup",ae),window.removeEventListener("pointercancel",ae),ye.size>0&&(Ie?(Q.length>0&&Z.forEach((e,n)=>{const{body:t}=n;e>0&&(t.addEventListener("contextmenu",ae),t.addEventListener("pointerleave",de),t.addEventListener("pointermove",de))}),window.addEventListener("pointerup",ae),window.addEventListener("pointercancel",ae)):Z.forEach((e,n)=>{const{body:t}=n;e>0&&(t.addEventListener("pointerdown",Ve,{capture:!0}),t.addEventListener("pointermove",de))}))}function He(e,n){ye.forEach(t=>{const{setResizeHandlerState:r}=t,i=Q.includes(t);r(e,i,n)})}function v(e,n){if(!e)throw console.error(n),Error(n)}const Ge=10;function ie(e,n,t=Ge){return e.toFixed(t)===n.toFixed(t)?0:e>n?1:-1}function J(e,n,t=Ge){return ie(e,n,t)===0}function B(e,n,t){return ie(e,n,t)===0}function Tn(e,n,t){if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++){const i=e[r],o=n[r];if(!B(i,o,t))return!1}return!0}function ce({panelConstraints:e,panelIndex:n,size:t}){const r=e[n];v(r!=null,`Panel constraints not found for index ${n}`);let{collapsedSize:i=0,collapsible:o,maxSize:a=100,minSize:l=0}=r;if(ie(t,l)<0)if(o){const s=(i+l)/2;ie(t,s)<0?t=i:t=l}else t=l;return t=Math.min(a,t),t=parseFloat(t.toFixed(Ge)),t}function pe({delta:e,initialLayout:n,panelConstraints:t,pivotIndices:r,prevLayout:i,trigger:o}){if(B(e,0))return n;const a=[...n],[l,s]=r;v(l!=null,"Invalid first pivot index"),v(s!=null,"Invalid second pivot index");let p=0;if(o==="keyboard"){{const f=e<0?s:l,c=t[f];v(c,`Panel constraints not found for index ${f}`);const{collapsedSize:y=0,collapsible:d,minSize:E=0}=c;if(d){const w=n[f];if(v(w!=null,`Previous layout not found for panel index ${f}`),B(w,y)){const S=E-w;ie(S,Math.abs(e))>0&&(e=e<0?0-S:S)}}}{const f=e<0?l:s,c=t[f];v(c,`No panel constraints found for index ${f}`);const{collapsedSize:y=0,collapsible:d,minSize:E=0}=c;if(d){const w=n[f];if(v(w!=null,`Previous layout not found for panel index ${f}`),B(w,E)){const S=w-y;ie(S,Math.abs(e))>0&&(e=e<0?0-S:S)}}}}{const f=e<0?1:-1;let c=e<0?s:l,y=0;for(;;){const E=n[c];v(E!=null,`Previous layout not found for panel index ${c}`);const S=ce({panelConstraints:t,panelIndex:c,size:100})-E;if(y+=S,c+=f,c<0||c>=t.length)break}const d=Math.min(Math.abs(e),Math.abs(y));e=e<0?0-d:d}{let c=e<0?l:s;for(;c>=0&&c<t.length;){const y=Math.abs(e)-Math.abs(p),d=n[c];v(d!=null,`Previous layout not found for panel index ${c}`);const E=d-y,w=ce({panelConstraints:t,panelIndex:c,size:E});if(!B(d,w)&&(p+=d-w,a[c]=w,p.toPrecision(3).localeCompare(Math.abs(e).toPrecision(3),void 0,{numeric:!0})>=0))break;e<0?c--:c++}}if(Tn(i,a))return i;{const f=e<0?s:l,c=n[f];v(c!=null,`Previous layout not found for panel index ${f}`);const y=c+p,d=ce({panelConstraints:t,panelIndex:f,size:y});if(a[f]=d,!B(d,y)){let E=y-d,S=e<0?s:l;for(;S>=0&&S<t.length;){const C=a[S];v(C!=null,`Previous layout not found for panel index ${S}`);const N=C+E,D=ce({panelConstraints:t,panelIndex:S,size:N});if(B(C,D)||(E-=D-C,a[S]=D),B(E,0))break;e>0?S--:S++}}}const b=a.reduce((f,c)=>c+f,0);return B(b,100)?a:i}function Fn({layout:e,panelsArray:n,pivotIndices:t}){let r=0,i=100,o=0,a=0;const l=t[0];v(l!=null,"No pivot index found"),n.forEach((f,c)=>{const{constraints:y}=f,{maxSize:d=100,minSize:E=0}=y;c===l?(r=E,i=d):(o+=E,a+=d)});const s=Math.min(i,100-o),p=Math.max(r,100-a),b=e[l];return{valueMax:s,valueMin:p,valueNow:b}}function he(e,n=document){return Array.from(n.querySelectorAll(`[data-panel-resize-handle-id][data-panel-group-id="${e}"]`))}function dn(e,n,t=document){const i=he(e,t).findIndex(o=>o.getAttribute("data-panel-resize-handle-id")===n);return i??null}function pn(e,n,t){const r=dn(e,n,t);return r!=null?[r,r+1]:[-1,-1]}function gn(e,n=document){var t;if(n instanceof HTMLElement&&(n==null||(t=n.dataset)===null||t===void 0?void 0:t.panelGroupId)==e)return n;const r=n.querySelector(`[data-panel-group][data-panel-group-id="${e}"]`);return r||null}function Ae(e,n=document){const t=n.querySelector(`[data-panel-resize-handle-id="${e}"]`);return t||null}function Kn(e,n,t,r=document){var i,o,a,l;const s=Ae(n,r),p=he(e,r),b=s?p.indexOf(s):-1,f=(i=(o=t[b])===null||o===void 0?void 0:o.id)!==null&&i!==void 0?i:null,c=(a=(l=t[b+1])===null||l===void 0?void 0:l.id)!==null&&a!==void 0?a:null;return[f,c]}function Vn({committedValuesRef:e,eagerValuesRef:n,groupId:t,layout:r,panelDataArray:i,panelGroupElement:o,setLayout:a}){_({didWarnAboutMissingResizeHandle:!1}),oe(()=>{if(!o)return;const l=he(t,o);for(let s=0;s<i.length-1;s++){const{valueMax:p,valueMin:b,valueNow:f}=Fn({layout:r,panelsArray:i,pivotIndices:[s,s+1]}),c=l[s];if(c!=null){const y=i[s];v(y,`No panel data found for index "${s}"`),c.setAttribute("aria-controls",y.id),c.setAttribute("aria-valuemax",""+Math.round(p)),c.setAttribute("aria-valuemin",""+Math.round(b)),c.setAttribute("aria-valuenow",f!=null?""+Math.round(f):"")}}return()=>{l.forEach((s,p)=>{s.removeAttribute("aria-controls"),s.removeAttribute("aria-valuemax"),s.removeAttribute("aria-valuemin"),s.removeAttribute("aria-valuenow")})}},[t,r,i,o]),re(()=>{if(!o)return;const l=n.current;v(l,"Eager values not found");const{panelDataArray:s}=l,p=gn(t,o);v(p!=null,`No group found for id "${t}"`);const b=he(t,o);v(b,`No resize handles found for group id "${t}"`);const f=b.map(c=>{const y=c.getAttribute("data-panel-resize-handle-id");v(y,"Resize handle element has no handle id attribute");const[d,E]=Kn(t,y,s,o);if(d==null||E==null)return()=>{};const w=S=>{if(!S.defaultPrevented)switch(S.key){case"Enter":{S.preventDefault();const C=s.findIndex(N=>N.id===d);if(C>=0){const N=s[C];v(N,`No panel data found for index ${C}`);const D=r[C],{collapsedSize:L=0,collapsible:h,minSize:F=0}=N.constraints;if(D!=null&&h){const W=pe({delta:B(D,L)?F-L:L-D,initialLayout:r,panelConstraints:s.map(q=>q.constraints),pivotIndices:pn(t,y,o),prevLayout:r,trigger:"keyboard"});r!==W&&a(W)}}break}}};return c.addEventListener("keydown",w),()=>{c.removeEventListener("keydown",w)}});return()=>{f.forEach(c=>c())}},[o,e,n,t,r,i,a])}function We(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}function mn(e,n){const t=e==="horizontal",{x:r,y:i}=Ce(n);return t?r:i}function Wn(e,n,t,r,i){const o=t==="horizontal",a=Ae(n,i);v(a,`No resize handle element found for id "${n}"`);const l=a.getAttribute("data-panel-group-id");v(l,"Resize handle element has no group id attribute");let{initialCursorPosition:s}=r;const p=mn(t,e),b=gn(l,i);v(b,`No group element found for id "${l}"`);const f=b.getBoundingClientRect(),c=o?f.width:f.height;return(p-s)/c*100}function qn(e,n,t,r,i,o){if(tn(e)){const a=t==="horizontal";let l=0;e.shiftKey?l=100:i!=null?l=i:l=10;let s=0;switch(e.key){case"ArrowDown":s=a?0:l;break;case"ArrowLeft":s=a?-l:0;break;case"ArrowRight":s=a?l:0;break;case"ArrowUp":s=a?0:-l;break;case"End":s=100;break;case"Home":s=-100;break}return s}else return r==null?0:Wn(e,n,t,r,o)}function On({panelDataArray:e}){const n=Array(e.length),t=e.map(o=>o.constraints);let r=0,i=100;for(let o=0;o<e.length;o++){const a=t[o];v(a,`Panel constraints not found for index ${o}`);const{defaultSize:l}=a;l!=null&&(r++,n[o]=l,i-=l)}for(let o=0;o<e.length;o++){const a=t[o];v(a,`Panel constraints not found for index ${o}`);const{defaultSize:l}=a;if(l!=null)continue;const s=e.length-r,p=i/s;r++,n[o]=p,i-=p}return n}function le(e,n,t){n.forEach((r,i)=>{const o=e[i];v(o,`Panel data not found for index ${i}`);const{callbacks:a,constraints:l,id:s}=o,{collapsedSize:p=0,collapsible:b}=l,f=t[s];if(f==null||r!==f){t[s]=r;const{onCollapse:c,onExpand:y,onResize:d}=a;d&&d(r,f),b&&(c||y)&&(y&&(f==null||J(f,p))&&!J(r,p)&&y(),c&&(f==null||!J(f,p))&&J(r,p)&&c())}})}function Pe(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!=n[t])return!1;return!0}function Un({defaultSize:e,dragState:n,layout:t,panelData:r,panelIndex:i,precision:o=3}){const a=t[i];let l;return a==null?l=e!=null?e.toPrecision(o):"1":r.length===1?l="1":l=a.toPrecision(o),{flexBasis:0,flexGrow:l,flexShrink:1,overflow:"hidden",pointerEvents:n!==null?"none":void 0}}function Xn(e,n=10){let t=null;return(...i)=>{t!==null&&clearTimeout(t),t=setTimeout(()=>{e(...i)},n)}}function qe(e){try{if(typeof localStorage<"u")e.getItem=n=>localStorage.getItem(n),e.setItem=(n,t)=>{localStorage.setItem(n,t)};else throw new Error("localStorage not supported in this environment")}catch(n){console.error(n),e.getItem=()=>null,e.setItem=()=>{}}}function yn(e){return`react-resizable-panels:${e}`}function hn(e){return e.map(n=>{const{constraints:t,id:r,idIsFromProps:i,order:o}=n;return i?r:o?`${o}:${JSON.stringify(t)}`:JSON.stringify(t)}).sort((n,t)=>n.localeCompare(t)).join(",")}function zn(e,n){try{const t=yn(e),r=n.getItem(t);if(r){const i=JSON.parse(r);if(typeof i=="object"&&i!=null)return i}}catch{}return null}function Jn(e,n,t){var r,i;const o=(r=zn(e,t))!==null&&r!==void 0?r:{},a=hn(n);return(i=o[a])!==null&&i!==void 0?i:null}function Yn(e,n,t,r,i){var o;const a=yn(e),l=hn(n),s=(o=zn(e,i))!==null&&o!==void 0?o:{};s[l]={expandToSizes:Object.fromEntries(t.entries()),layout:r};try{i.setItem(a,JSON.stringify(s))}catch(p){console.error(p)}}function Oe({layout:e,panelConstraints:n}){const t=[...e],r=t.reduce((o,a)=>o+a,0);if(t.length!==n.length)throw Error(`Invalid ${n.length} panel layout: ${t.map(o=>`${o}%`).join(", ")}`);if(!B(r,100))for(let o=0;o<n.length;o++){const a=t[o];v(a!=null,`No layout data found for index ${o}`);const l=100/r*a;t[o]=l}let i=0;for(let o=0;o<n.length;o++){const a=t[o];v(a!=null,`No layout data found for index ${o}`);const l=ce({panelConstraints:n,panelIndex:o,size:a});a!=l&&(i+=a-l,t[o]=l)}if(!B(i,0))for(let o=0;o<n.length;o++){const a=t[o];v(a!=null,`No layout data found for index ${o}`);const l=a+i,s=ce({panelConstraints:n,panelIndex:o,size:l});if(a!==s&&(i-=s-a,t[o]=s,B(i,0)))break}return t}const Zn=100,ge={getItem:e=>(qe(ge),ge.getItem(e)),setItem:(e,n)=>{qe(ge),ge.setItem(e,n)}},Ue={};function xn({autoSaveId:e=null,children:n,className:t="",direction:r,forwardedRef:i,id:o=null,onLayout:a=null,keyboardResizeBy:l=null,storage:s=ge,style:p,tagName:b="div",...f}){const c=De(o),y=_(null),[d,E]=me(null),[w,S]=me([]),C=_({}),N=_(new Map),D=_(0),L=_({autoSaveId:e,direction:r,dragState:d,id:c,keyboardResizeBy:l,onLayout:a,storage:s}),h=_({layout:w,panelDataArray:[],panelDataArrayChanged:!1});_({didLogIdAndOrderWarning:!1,didLogPanelConstraintsWarning:!1,prevPanelIds:[]}),Qe(i,()=>({getId:()=>L.current.id,getLayout:()=>{const{layout:u}=h.current;return u},setLayout:u=>{const{onLayout:x}=L.current,{layout:z,panelDataArray:g}=h.current,m=Oe({layout:u,panelConstraints:g.map(P=>P.constraints)});We(z,m)||(S(m),h.current.layout=m,x&&x(m),le(g,m,C.current))}}),[]),oe(()=>{L.current.autoSaveId=e,L.current.direction=r,L.current.dragState=d,L.current.id=c,L.current.onLayout=a,L.current.storage=s}),Vn({committedValuesRef:L,eagerValuesRef:h,groupId:c,layout:w,panelDataArray:h.current.panelDataArray,setLayout:S,panelGroupElement:y.current}),re(()=>{const{panelDataArray:u}=h.current;if(e){if(w.length===0||w.length!==u.length)return;let x=Ue[e];x==null&&(x=Xn(Yn,Zn),Ue[e]=x);const z=[...u],g=new Map(N.current);x(e,z,g,w,s)}},[e,w,s]),re(()=>{});const F=G(u=>{const{onLayout:x}=L.current,{layout:z,panelDataArray:g}=h.current;if(u.constraints.collapsible){const m=g.map(K=>K.constraints),{collapsedSize:P=0,panelSize:I,pivotIndices:M}=ne(g,u,z);if(v(I!=null,`Panel size not found for panel "${u.id}"`),!J(I,P)){N.current.set(u.id,I);const T=se(g,u)===g.length-1?I-P:P-I,R=pe({delta:T,initialLayout:z,panelConstraints:m,pivotIndices:M,prevLayout:z,trigger:"imperative-api"});Pe(z,R)||(S(R),h.current.layout=R,x&&x(R),le(g,R,C.current))}}},[]),W=G((u,x)=>{const{onLayout:z}=L.current,{layout:g,panelDataArray:m}=h.current;if(u.constraints.collapsible){const P=m.map(V=>V.constraints),{collapsedSize:I=0,panelSize:M=0,minSize:K=0,pivotIndices:T}=ne(m,u,g),R=x??K;if(J(M,I)){const V=N.current.get(u.id),Se=V!=null&&V>=R?V:R,be=se(m,u)===m.length-1?M-Se:Se-M,ee=pe({delta:be,initialLayout:g,panelConstraints:P,pivotIndices:T,prevLayout:g,trigger:"imperative-api"});Pe(g,ee)||(S(ee),h.current.layout=ee,z&&z(ee),le(m,ee,C.current))}}},[]),q=G(u=>{const{layout:x,panelDataArray:z}=h.current,{panelSize:g}=ne(z,u,x);return v(g!=null,`Panel size not found for panel "${u.id}"`),g},[]),O=G((u,x)=>{const{panelDataArray:z}=h.current,g=se(z,u);return Un({defaultSize:x,dragState:d,layout:w,panelData:z,panelIndex:g})},[d,w]),j=G(u=>{const{layout:x,panelDataArray:z}=h.current,{collapsedSize:g=0,collapsible:m,panelSize:P}=ne(z,u,x);return v(P!=null,`Panel size not found for panel "${u.id}"`),m===!0&&J(P,g)},[]),A=G(u=>{const{layout:x,panelDataArray:z}=h.current,{collapsedSize:g=0,collapsible:m,panelSize:P}=ne(z,u,x);return v(P!=null,`Panel size not found for panel "${u.id}"`),!m||ie(P,g)>0},[]),Y=G(u=>{const{panelDataArray:x}=h.current;x.push(u),x.sort((z,g)=>{const m=z.order,P=g.order;return m==null&&P==null?0:m==null?-1:P==null?1:m-P}),h.current.panelDataArrayChanged=!0},[]);oe(()=>{if(h.current.panelDataArrayChanged){h.current.panelDataArrayChanged=!1;const{autoSaveId:u,onLayout:x,storage:z}=L.current,{layout:g,panelDataArray:m}=h.current;let P=null;if(u){const M=Jn(u,m,z);M&&(N.current=new Map(Object.entries(M.expandToSizes)),P=M.layout)}P==null&&(P=On({panelDataArray:m}));const I=Oe({layout:P,panelConstraints:m.map(M=>M.constraints)});We(g,I)||(S(I),h.current.layout=I,x&&x(I),le(m,I,C.current))}}),oe(()=>{const u=h.current;return()=>{u.layout=[]}},[]);const $=G(u=>function(z){z.preventDefault();const g=y.current;if(!g)return()=>null;const{direction:m,dragState:P,id:I,keyboardResizeBy:M,onLayout:K}=L.current,{layout:T,panelDataArray:R}=h.current,{initialLayout:V}=P??{},Se=pn(I,u,g);let X=qn(z,u,m,P,M,g);if(X===0)return;const be=m==="horizontal";document.dir==="rtl"&&be&&(X=-X);const ee=R.map(bn=>bn.constraints),fe=pe({delta:X,initialLayout:V??T,panelConstraints:ee,pivotIndices:Se,prevLayout:T,trigger:tn(z)?"keyboard":"mouse-or-touch"}),Be=!Pe(T,fe);(rn(z)||on(z))&&D.current!=X&&(D.current=X,Be?Me(u,0):be?Me(u,X<0?ln:sn):Me(u,X<0?cn:un)),Be&&(S(fe),h.current.layout=fe,K&&K(fe),le(R,fe,C.current))},[]),k=G((u,x)=>{const{onLayout:z}=L.current,{layout:g,panelDataArray:m}=h.current,P=m.map(V=>V.constraints),{panelSize:I,pivotIndices:M}=ne(m,u,g);v(I!=null,`Panel size not found for panel "${u.id}"`);const T=se(m,u)===m.length-1?I-x:x-I,R=pe({delta:T,initialLayout:g,panelConstraints:P,pivotIndices:M,prevLayout:g,trigger:"imperative-api"});Pe(g,R)||(S(R),h.current.layout=R,z&&z(R),le(m,R,C.current))},[]),H=G((u,x)=>{const{layout:z,panelDataArray:g}=h.current,{collapsedSize:m=0,collapsible:P}=x,{collapsedSize:I=0,collapsible:M,maxSize:K=100,minSize:T=0}=u.constraints,{panelSize:R}=ne(g,u,z);R!=null&&(P&&M&&J(R,m)?J(m,I)||k(u,I):R<T?k(u,T):R>K&&k(u,K))},[k]),ke=G((u,x)=>{const{direction:z}=L.current,{layout:g}=h.current;if(!y.current)return;const m=Ae(u,y.current);v(m,`Drag handle element not found for id "${u}"`);const P=mn(z,x);E({dragHandleId:u,dragHandleRect:m.getBoundingClientRect(),initialCursorPosition:P,initialLayout:g})},[]),ze=G(()=>{E(null)},[]),xe=G(u=>{const{panelDataArray:x}=h.current,z=se(x,u);z>=0&&(x.splice(z,1),delete C.current[u.id],h.current.panelDataArrayChanged=!0)},[]),ve=Cn(()=>({collapsePanel:F,direction:r,dragState:d,expandPanel:W,getPanelSize:q,getPanelStyle:O,groupId:c,isPanelCollapsed:j,isPanelExpanded:A,reevaluatePanelConstraints:H,registerPanel:Y,registerResizeHandle:$,resizePanel:k,startDragging:ke,stopDragging:ze,unregisterPanel:xe,panelGroupElement:y.current}),[F,d,r,W,q,O,c,j,A,H,Y,$,k,ke,ze,xe]),U={display:"flex",flexDirection:r==="horizontal"?"row":"column",height:"100%",overflow:"hidden",width:"100%"};return ue(Le.Provider,{value:ve},ue(b,{...f,children:n,className:t,id:o,ref:y,style:{...U,...p},"data-panel-group":"","data-panel-group-direction":r,"data-panel-group-id":c}))}const vn=Ye((e,n)=>ue(xn,{...e,forwardedRef:n}));xn.displayName="PanelGroup";vn.displayName="forwardRef(PanelGroup)";function se(e,n){return e.findIndex(t=>t===n||t.id===n.id)}function ne(e,n,t){const r=se(e,n),o=r===e.length-1?[r-1,r]:[r,r+1],a=t[r];return{...n.constraints,panelSize:a,pivotIndices:o}}function Qn({disabled:e,handleId:n,resizeHandler:t,panelGroupElement:r}){re(()=>{if(e||t==null||r==null)return;const i=Ae(n,r);if(i==null)return;const o=a=>{if(!a.defaultPrevented)switch(a.key){case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"End":case"Home":{a.preventDefault(),t(a);break}case"F6":{a.preventDefault();const l=i.getAttribute("data-panel-group-id");v(l,`No group element found for id "${l}"`);const s=he(l,r),p=dn(l,n,r);v(p!==null,`No resize element found for id "${n}"`);const b=a.shiftKey?p>0?p-1:s.length-1:p+1<s.length?p+1:0;s[b].focus();break}}};return i.addEventListener("keydown",o),()=>{i.removeEventListener("keydown",o)}},[r,e,n,t])}function Sn({children:e=null,className:n="",disabled:t=!1,hitAreaMargins:r,id:i,onDragging:o,style:a={},tabIndex:l=0,tagName:s="div",...p}){var b,f;const c=_(null),y=_({onDragging:o});re(()=>{y.current.onDragging=o});const d=Ze(Le);if(d===null)throw Error("PanelResizeHandle components must be rendered within a PanelGroup container");const{direction:E,groupId:w,registerResizeHandle:S,startDragging:C,stopDragging:N,panelGroupElement:D}=d,L=De(i),[h,F]=me("inactive"),[W,q]=me(!1),[O,j]=me(null),A=_({state:h});oe(()=>{A.current.state=h}),re(()=>{if(t)j(null);else{const H=S(L);j(()=>H)}},[t,L,S]);const Y=(b=r==null?void 0:r.coarse)!==null&&b!==void 0?b:15,$=(f=r==null?void 0:r.fine)!==null&&f!==void 0?f:5;return re(()=>{if(t||O==null)return;const H=c.current;return v(H,"Element ref not attached"),jn(L,H,E,{coarse:Y,fine:$},(ze,xe,ve)=>{if(xe)switch(ze){case"down":{F("drag"),C(L,ve);const{onDragging:U}=y.current;U&&U(!0);break}case"move":{const{state:U}=A.current;U!=="drag"&&F("hover"),O(ve);break}case"up":{F("hover"),N();const{onDragging:U}=y.current;U&&U(!1);break}}else F("inactive")})},[Y,E,t,$,S,L,O,C,N]),Qn({disabled:t,handleId:L,resizeHandler:O,panelGroupElement:D}),ue(s,{...p,children:e,className:n,id:i,onBlur:()=>q(!1),onFocus:()=>q(!0),ref:c,role:"separator",style:{...{touchAction:"none",userSelect:"none"},...a},tabIndex:l,"data-panel-group-direction":E,"data-panel-group-id":w,"data-resize-handle":"","data-resize-handle-active":h==="drag"?"pointer":W?"keyboard":void 0,"data-resize-handle-state":h,"data-panel-resize-handle-enabled":!t,"data-panel-resize-handle-id":L})}Sn.displayName="PanelResizeHandle";const et=({className:e,...n})=>we.jsx(vn,{className:Je("flex h-full w-full data-[panel-group-direction=vertical]:flex-col",e),...n}),lt=nn,nt=({withHandle:e,className:n,...t})=>we.jsx(Sn,{className:Je("border-border/30 focus-visible:ring-ring relative flex w-px items-center justify-center border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",n),...t,children:e&&we.jsx("div",{className:"bg-background border-border/30 z-10 flex h-4 w-3 items-center justify-center rounded-sm border",children:we.jsx(wn,{className:"h-2.5 w-2.5"})})});et.__docgenInfo={description:"",methods:[],displayName:"ResizablePanelGroup"};nt.__docgenInfo={description:"",methods:[],displayName:"ResizableHandle",props:{withHandle:{required:!1,tsType:{name:"boolean"},description:""}}};export{lt as R,et as a,nt as b};
