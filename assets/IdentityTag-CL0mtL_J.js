import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{useMDXComponents as s}from"./index-DSkyVWTJ.js";import{M as a,T as m,d as r,C as o,e as p}from"./index-9sH2wlq6.js";import"./AlertDialog-3CDXO2v4.js";import"./Checkbox-BaXYeBzr.js";import"./Icon.types-Ck8KU8EG.js";import"./Label-CkICs1_r.js";import"./PieChart-B_dtFskq.js";import"./ProgressBar-Bfgyotpp.js";import"./ProgressCard-BYKzYHAL.js";import"./SegmentedControl-DQCOk3Kf.js";import"./Separator-juOyYLvc.js";import"./Skeleton-pYLGnhFW.js";import"./Table-JXx_s4Wj.js";import"./Text-COZqca-9.js";import"./Textarea-74mgfiS7.js";import"./ValueDisplay-BLpqF4VW.js";import"./Banner-BbS_KexI.js";import{S as d,B as c,N as u,H as x}from"./IdentityTag.stories-Bq0HAn4z.js";import"./index-CTjT7uj6.js";import"./iframe-CcgvOIQl.js";import"../sb-preview/runtime.js";import"./index-BqnMPuz1.js";import"./index-DVBfyTD9.js";import"./index-9r8iugjR.js";import"./index-DXimoRZY.js";import"./index-Bx4XDAbk.js";import"./index-DrFu-skq.js";import"./index-Bb4qSo10.js";import"./index-Ca1CH5Oj.js";import"./themes-JyTiufSz.js";import"./palette-saq09hvB.js";function e(n){const i={h2:"h2",h3:"h3",h4:"h4",...s(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(a,{of:d}),`
`,t.jsx(m,{}),`
`,t.jsx(i.h4,{id:"a-clickable-component-representing-an-indentity",children:"A clickable component representing an indentity."}),`
`,t.jsx(r,{dark:!0,language:"tsx",code:`
import { Identity } from '@0xintuition/1ui'

<Identity imgSrc="image.jpg">super dave</Identity>
`}),`
`,t.jsx(o,{of:c,sourceState:"none"}),`
`,t.jsx(i.h2,{id:"properties",children:"Properties"}),`
`,t.jsx(p,{}),`
`,t.jsx(i.h2,{id:"variants",children:"Variants"}),`
`,t.jsx(i.h3,{id:"non-user",children:"Non User"}),`
`,t.jsx(r,{dark:!0,language:"tsx",code:`
import { Identity } from '@0xintuition/1ui'

<Identity variant="non-user">identity name</Identity>
`}),`
`,t.jsx(o,{of:u,sourceState:"none"}),`
`,t.jsx(i.h3,{id:"user-with-hover-card",children:"User With Hover Card"}),`
`,t.jsx(r,{dark:!0,language:"tsx",code:`
import { Identity } from '@0xintuition/1ui'

<IdentityTag
  variant="user"
  hoverCardContent={
    <div>
      <p>Some more info...</p>
    </div>
  }
>
  identity name
</IdentityTag>
`}),`
`,t.jsx(o,{of:x,sourceState:"none"})]})}function G(n={}){const{wrapper:i}={...s(),...n.components};return i?t.jsx(i,{...n,children:t.jsx(e,{...n})}):e(n)}export{G as default};