import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{useMDXComponents as e}from"./index-DSkyVWTJ.js";import{M as i,T as c,d as s,C as n,e as m}from"./index-Di-JLc3Z.js";import{S as u,B as p,I as x,a as d,E as h}from"./Toaster.stories-kbDtIcMT.js";import"./index-CTjT7uj6.js";import"./iframe-BWaOcAPW.js";import"../sb-preview/runtime.js";import"./index-DJaOuc6h.js";import"./index-DdAkmXN0.js";import"./extends-CCbyfPlC.js";import"./index-CcyUcsxs.js";import"./index-BaW8Z0I_.js";import"./index-DXimoRZY.js";import"./index-Bx4XDAbk.js";import"./index-DrFu-skq.js";import"./Avatar-BOdXw9Ok.js";import"./index-DZjgi4oU.js";import"./index-Ey1R3kC1.js";import"./index-bugisSBR.js";import"./palette-saq09hvB.js";import"./Button-BLvVlH_2.js";import"./index-Bb4qSo10.js";import"./createLucideIcon-BfM7wYCo.js";import"./Popover-CEP5YIQn.js";import"./index-Dkmgy-nq.js";import"./Command-7WXSXKb2.js";import"./Icon-CR-nLIwf.js";import"./Tooltip-CdBPNrqr.js";import"./Text-x7qLX-eT.js";import"./Resizable-C4vcu0yH.js";import"./SidebarLayoutNavAvatar-BRfv8PkW.js";function a(r){const o={h2:"h2",h3:"h3",h4:"h4",...e(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(i,{of:u}),`
`,t.jsx(c,{}),`
`,t.jsx(o.h4,{id:"a-toaster-component-with-a-toast-utility",children:"A toaster component with a toast utility."}),`
`,t.jsx(s,{dark:!0,language:"tsx",code:`
import { Toaster, toast } from '@0xintuition/1ui'

<>
  <Toaster />
  <Button size="lg" onClick={() => toast('I am a toast!')}>
    Launch toast
  </Button>
</>
`}),`
`,t.jsx(n,{of:p,sourceState:"none"}),`
`,t.jsx(o.h2,{id:"properties",children:"Properties"}),`
`,t.jsx(m,{}),`
`,t.jsx(o.h2,{id:"variants",children:"Variants"}),`
`,t.jsx(o.h3,{id:"info",children:"Info"}),`
`,t.jsx(s,{dark:!0,language:"tsx",code:`
<>
  <Toaster />
  <Button
    size="lg"
    variant="accent"
    onClick={() => toast.info('I am an info toast!')}
  >
    Launch toast
  </Button>
</>
`}),`
`,t.jsx(n,{of:x,sourceState:"none"}),`
`,t.jsx(o.h3,{id:"success",children:"Success"}),`
`,t.jsx(s,{dark:!0,language:"tsx",code:`
<>
  <Toaster />
  <Button
    size="lg"
    variant="success"
    onClick={() => toast.success('I am a success toast!')}
  >
    Launch toast
  </Button>
</>
`}),`
`,t.jsx(n,{of:d,sourceState:"none"}),`
`,t.jsx(o.h3,{id:"error",children:"Error"}),`
`,t.jsx(s,{dark:!0,language:"tsx",code:`
<>
  <Toaster />
  <Button
    size="lg"
    variant="destructive"
    onClick={() => toast.error('I am an error toast!')}
  >
    Launch toast
  </Button>
</>
`}),`
`,t.jsx(n,{of:h,sourceState:"none"})]})}function K(r={}){const{wrapper:o}={...e(),...r.components};return o?t.jsx(o,{...r,children:t.jsx(a,{...r})}):a(r)}export{K as default};
