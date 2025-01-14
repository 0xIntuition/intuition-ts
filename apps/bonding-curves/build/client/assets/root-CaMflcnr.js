import{r as o,j as e}from"./index-_ym_c-sR.js";import{u as p,a as u,b as x,c as y,_ as S,M as w,L as g,O as j,S as k,d as M}from"./components-FTevL6iJ.js";/**
 * @remix-run/react v2.9.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let c="positions";function b({getKey:t,...a}){let{isSpaMode:n}=p(),i=u(),d=x();y({getKey:t,storageKey:c});let h=o.useMemo(()=>{if(!t)return null;let s=t(i,d);return s!==i.key?s:null},[]);if(n)return null;let m=((s,f)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let l=JSON.parse(sessionStorage.getItem(s)||"{}")[f||window.history.state.key];typeof l=="number"&&window.scrollTo(0,l)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return o.createElement("script",S({},a,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${m})(${JSON.stringify(c)}, ${JSON.stringify(h)})`}}))}const O="/assets/globals-BXu0OT-B.css",R=()=>[{rel:"stylesheet",href:O}];function v(){const[t,a]=o.useState("dark");return u(),o.useEffect(()=>{const n=window.matchMedia("(prefers-color-scheme: dark)").matches;a(n?"dark":"light")},[]),e.jsxs("html",{lang:"en",className:`h-full ${t}`,children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(w,{}),e.jsx(g,{})]}),e.jsxs("body",{className:"h-full bg-background text-foreground",children:[e.jsx(j,{}),e.jsx(b,{}),e.jsx(k,{}),e.jsx(M,{})]})]})}export{v as default,R as links};
