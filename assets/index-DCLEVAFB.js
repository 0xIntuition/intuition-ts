import{r as t}from"./index-CTjT7uj6.js";import{r as $}from"./index-DdAkmXN0.js";function s(){return s=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var c in r)({}).hasOwnProperty.call(r,c)&&(e[c]=r[c])}return e},s.apply(null,arguments)}function m(e,n){typeof e=="function"?e(n):e!=null&&(e.current=n)}function d(...e){return n=>e.forEach(r=>m(r,n))}function x(...e){return t.useCallback(d(...e),e)}const p=t.forwardRef((e,n)=>{const{children:r,...c}=e,l=t.Children.toArray(r),o=l.find(E);if(o){const i=o.props.children,a=l.map(u=>u===o?t.Children.count(i)>1?t.Children.only(null):t.isValidElement(i)?i.props.children:null:u);return t.createElement(f,s({},c,{ref:n}),t.isValidElement(i)?t.cloneElement(i,void 0,a):null)}return t.createElement(f,s({},c,{ref:n}),r)});p.displayName="Slot";const f=t.forwardRef((e,n)=>{const{children:r,...c}=e;return t.isValidElement(r)?t.cloneElement(r,{...b(c,r.props),ref:n?d(n,r.ref):r.ref}):t.Children.count(r)>1?t.Children.only(null):null});f.displayName="SlotClone";const h=({children:e})=>t.createElement(t.Fragment,null,e);function E(e){return t.isValidElement(e)&&e.type===h}function b(e,n){const r={...n};for(const c in n){const l=e[c],o=n[c];/^on[A-Z]/.test(c)?l&&o?r[c]=(...a)=>{o(...a),l(...a)}:l&&(r[c]=l):c==="style"?r[c]={...l,...o}:c==="className"&&(r[c]=[l,o].filter(Boolean).join(" "))}return{...e,...r}}const v=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],g=v.reduce((e,n)=>{const r=t.forwardRef((c,l)=>{const{asChild:o,...i}=c,a=o?p:n;return t.useEffect(()=>{window[Symbol.for("radix-ui")]=!0},[]),t.createElement(a,s({},i,{ref:l}))});return r.displayName=`Primitive.${n}`,{...e,[n]:r}},{});function N(e,n){e&&$.flushSync(()=>e.dispatchEvent(n))}export{g as $,s as _,x as a,N as b,p as c,d,h as e};
