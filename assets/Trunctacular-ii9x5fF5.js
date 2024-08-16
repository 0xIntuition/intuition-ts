import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{useMDXComponents as i}from"./index-DSkyVWTJ.js";import{M as s,T as l,d as n,C as a,e as m}from"./index-9sH2wlq6.js";import{S as p,B as u,W as c,N as d}from"./Trunctacular.stories-F9a_gzUQ.js";import"./index-CTjT7uj6.js";import"./iframe-CcgvOIQl.js";import"../sb-preview/runtime.js";import"./index-BqnMPuz1.js";import"./index-DVBfyTD9.js";import"./index-9r8iugjR.js";import"./index-DXimoRZY.js";import"./index-Bx4XDAbk.js";import"./index-DrFu-skq.js";import"./AlertDialog-3CDXO2v4.js";import"./Checkbox-BaXYeBzr.js";import"./Icon.types-Ck8KU8EG.js";import"./index-Ca1CH5Oj.js";import"./themes-JyTiufSz.js";import"./palette-saq09hvB.js";import"./index-Bb4qSo10.js";import"./Text-COZqca-9.js";import"./Label-CkICs1_r.js";import"./PieChart-B_dtFskq.js";import"./ProgressBar-Bfgyotpp.js";import"./ProgressCard-BYKzYHAL.js";import"./SegmentedControl-DQCOk3Kf.js";import"./Separator-juOyYLvc.js";import"./Skeleton-pYLGnhFW.js";import"./Table-JXx_s4Wj.js";import"./Textarea-74mgfiS7.js";import"./ValueDisplay-BLpqF4VW.js";import"./Banner-BbS_KexI.js";function e(r){const o={h2:"h2",h3:"h3",h4:"h4",...i(),...r.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{of:p}),`
`,t.jsx(l,{}),`
`,t.jsx(o.h4,{id:"a-super-component-that-truncates-long-strings---including-wallet-addresses---and-adds-a-tooltip-to-display-the-full-value",children:"A super component that truncates long strings - including wallet addresses - and adds a tooltip to display the full value."}),`
`,t.jsx(n,{dark:!0,language:"tsx",code:`
import { Trunctacular } from '@0xintuition/1ui'

<Trunctacular value="reallyReallyLongName" />
`}),`
`,t.jsx(a,{of:u,sourceState:"none"}),`
`,t.jsx(o.h2,{id:"properties",children:"Properties"}),`
`,t.jsx(m,{}),`
`,t.jsx(o.h2,{id:"variants",children:"Variants"}),`
`,t.jsx(o.h3,{id:"wallet-usage",children:"Wallet Usage"}),`
`,t.jsx(n,{dark:!0,language:"tsx",code:`
<Trunctacular value="0x1234567890abcdef1234567890abcdef12345678" />
`}),`
`,t.jsx(a,{of:c,sourceState:"none"}),`
`,t.jsx(o.h3,{id:"no-truncationtooltip",children:"No Truncation/Tooltip"}),`
`,t.jsx(n,{dark:!0,language:"tsx",code:`
Trunctacular value="shortName" />
`}),`
`,t.jsx(a,{of:d,sourceState:"none"})]})}function I(r={}){const{wrapper:o}={...i(),...r.components};return o?t.jsx(o,{...r,children:t.jsx(e,{...r})}):e(r)}export{I as default};