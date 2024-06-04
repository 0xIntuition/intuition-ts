import{j as m}from"./jsx-runtime-Cw0GR0a5.js";import{r as o}from"./index-CTjT7uj6.js";import{_ as b}from"./extends-CCbyfPlC.js";import{$ as v}from"./index-CjhMTvA2.js";import{c as g}from"./index-bugisSBR.js";function y(e,a=[]){let t=[];function n(d,s){const r=o.createContext(s),u=t.length;t=[...t,s];function i(l){const{scope:f,children:p,...$}=l,R=(f==null?void 0:f[e][u])||r,I=o.useMemo(()=>$,Object.values($));return o.createElement(R.Provider,{value:I},p)}function x(l,f){const p=(f==null?void 0:f[e][u])||r,$=o.useContext(p);if($)return $;if(s!==void 0)return s;throw new Error(`\`${l}\` must be used within \`${d}\``)}return i.displayName=d+"Provider",[i,x]}const c=()=>{const d=t.map(s=>o.createContext(s));return function(r){const u=(r==null?void 0:r[e])||d;return o.useMemo(()=>({[`__scope${e}`]:{...r,[e]:u}}),[r,u])}};return c.scopeName=e,[n,M(c,...a)]}function M(...e){const a=e[0];if(e.length===1)return a;const t=()=>{const n=e.map(c=>({useScope:c(),scopeName:c.scopeName}));return function(d){const s=n.reduce((r,{useScope:u,scopeName:i})=>{const l=u(d)[`__scope${i}`];return{...r,...l}},{});return o.useMemo(()=>({[`__scope${a.scopeName}`]:s}),[s])}};return t.scopeName=a.scopeName,t}function P(e){const a=o.useRef(e);return o.useEffect(()=>{a.current=e}),o.useMemo(()=>(...t)=>{var n;return(n=a.current)===null||n===void 0?void 0:n.call(a,...t)},[])}const _=globalThis!=null&&globalThis.document?o.useLayoutEffect:()=>{},S="Avatar",[j,J]=y(S),[k,A]=j(S),T=o.forwardRef((e,a)=>{const{__scopeAvatar:t,...n}=e,[c,d]=o.useState("idle");return o.createElement(k,{scope:t,imageLoadingStatus:c,onImageLoadingStatusChange:d},o.createElement(v.span,b({},n,{ref:a})))}),B="AvatarImage",F=o.forwardRef((e,a)=>{const{__scopeAvatar:t,src:n,onLoadingStatusChange:c=()=>{},...d}=e,s=A(B,t),r=H(n),u=P(i=>{c(i),s.onImageLoadingStatusChange(i)});return _(()=>{r!=="idle"&&u(r)},[r,u]),r==="loaded"?o.createElement(v.img,b({},d,{ref:a,src:n})):null}),q="AvatarFallback",G=o.forwardRef((e,a)=>{const{__scopeAvatar:t,delayMs:n,...c}=e,d=A(q,t),[s,r]=o.useState(n===void 0);return o.useEffect(()=>{if(n!==void 0){const u=window.setTimeout(()=>r(!0),n);return()=>window.clearTimeout(u)}},[n]),s&&d.imageLoadingStatus!=="loaded"?o.createElement(v.span,b({},c,{ref:a})):null});function H(e){const[a,t]=o.useState("idle");return _(()=>{if(!e){t("error");return}let n=!0;const c=new window.Image,d=s=>()=>{n&&t(s)};return t("loading"),c.onload=d("loaded"),c.onerror=d("error"),c.src=e,()=>{n=!1}},[e]),a}const h=T,w=F,C=G,E=o.forwardRef(({className:e,...a},t)=>m.jsx(h,{ref:t,className:g("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",e),...a}));E.displayName=h.displayName;const L=o.forwardRef(({className:e,...a},t)=>m.jsx(w,{ref:t,className:g("aspect-square h-full w-full",e),...a}));L.displayName=w.displayName;const N=o.forwardRef(({className:e,...a},t)=>m.jsx(C,{ref:t,className:g("bg-muted flex h-full w-full items-center justify-center rounded-full",e),...a}));N.displayName=C.displayName;E.__docgenInfo={description:"",methods:[]};L.__docgenInfo={description:"",methods:[]};N.__docgenInfo={description:"",methods:[]};export{P as $,E as A,L as a,N as b,y as c,_ as d};
