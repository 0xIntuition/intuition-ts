import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{useMDXComponents as a}from"./index-DSkyVWTJ.js";import{M as s,T as m,d as e,C as o,e as p}from"./index-9sH2wlq6.js";import{S as d,B as c,E as u}from"./IdentityCard.stories-BO7t4AgD.js";import"./index-CTjT7uj6.js";import"./iframe-CcgvOIQl.js";import"../sb-preview/runtime.js";import"./index-BqnMPuz1.js";import"./index-DVBfyTD9.js";import"./index-9r8iugjR.js";import"./index-DXimoRZY.js";import"./index-Bx4XDAbk.js";import"./index-DrFu-skq.js";import"./AlertDialog-3CDXO2v4.js";import"./Checkbox-BaXYeBzr.js";import"./Icon.types-Ck8KU8EG.js";import"./index-Ca1CH5Oj.js";import"./themes-JyTiufSz.js";import"./palette-saq09hvB.js";import"./index-Bb4qSo10.js";import"./Text-COZqca-9.js";import"./Label-CkICs1_r.js";import"./PieChart-B_dtFskq.js";import"./ProgressBar-Bfgyotpp.js";import"./ProgressCard-BYKzYHAL.js";import"./SegmentedControl-DQCOk3Kf.js";import"./Separator-juOyYLvc.js";import"./Skeleton-pYLGnhFW.js";import"./Table-JXx_s4Wj.js";import"./Textarea-74mgfiS7.js";import"./ValueDisplay-BLpqF4VW.js";import"./Banner-BbS_KexI.js";function n(i){const r={h2:"h2",h3:"h3",h4:"h4",...a(),...i.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{of:d}),`
`,t.jsx(m,{}),`
`,t.jsx(r.h4,{id:"displays-an-identity-or-entity-and-its-key-data",children:"Displays an identity or entity and its key data."}),`
`,t.jsx(e,{dark:!0,language:"tsx",code:`
import { IdentityCard } from '@0xintuition/1ui'

<IdentityCard
  variant="user"
  avatarSrc="image.jpg"
  name="Super Dave"
  value={4.123}
  currency="ETH"
  walletAddress="0x1234567890abcdef1234567890abcdef12345678"
/>
`}),`
`,t.jsx(o,{of:c,sourceState:"none"}),`
`,t.jsx(r.h2,{id:"properties",children:"Properties"}),`
`,t.jsx(p,{}),`
`,t.jsx(r.h2,{id:"variants",children:"Variants"}),`
`,t.jsx(r.h3,{id:"other",children:"Other"}),`
`,t.jsx(e,{dark:!0,language:"tsx",code:`
<IdentityCard
  variant="non-user"
  avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
  name="Intuition"
  value={7.892}
  currency="ETH"
  walletAddress="0x1234567890abcdef1234567890abcdef12345678"
/>
`}),`
`,t.jsx(o,{of:u,sourceState:"none"})]})}function G(i={}){const{wrapper:r}={...a(),...i.components};return r?t.jsx(r,{...i,children:t.jsx(n,{...i})}):n(i)}export{G as default};