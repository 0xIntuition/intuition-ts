import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{useMDXComponents as a}from"./index-DSkyVWTJ.js";import{M as e,T as m,d as n,C as r,e as p}from"./index-9sH2wlq6.js";import"./AlertDialog-3CDXO2v4.js";import"./Checkbox-BaXYeBzr.js";import"./Icon.types-Ck8KU8EG.js";import"./Label-CkICs1_r.js";import"./PieChart-B_dtFskq.js";import"./ProgressBar-Bfgyotpp.js";import"./ProgressCard-BYKzYHAL.js";import"./SegmentedControl-DQCOk3Kf.js";import"./Separator-juOyYLvc.js";import"./Skeleton-pYLGnhFW.js";import"./Table-JXx_s4Wj.js";import"./Text-COZqca-9.js";import"./Textarea-74mgfiS7.js";import"./ValueDisplay-BLpqF4VW.js";import"./Banner-BbS_KexI.js";import{S as c,U as d,I as l}from"./ClaimPositionRow.stories-Dk94d7eR.js";import"./index-CTjT7uj6.js";import"./iframe-CcgvOIQl.js";import"../sb-preview/runtime.js";import"./index-BqnMPuz1.js";import"./index-DVBfyTD9.js";import"./index-9r8iugjR.js";import"./index-DXimoRZY.js";import"./index-Bx4XDAbk.js";import"./index-DrFu-skq.js";import"./index-Bb4qSo10.js";import"./index-Ca1CH5Oj.js";import"./themes-JyTiufSz.js";import"./palette-saq09hvB.js";function s(i){const t={h2:"h2",h3:"h3",h4:"h4",p:"p",...a(),...i.components};return o.jsxs(o.Fragment,{children:[o.jsx(e,{of:c}),`
`,o.jsx(m,{}),`
`,o.jsx(t.h4,{id:"a-claim-position-component-is-used-to-display-a-position-on-a-claim",children:"A Claim Position component is used to display a position on a claim"}),`
`,o.jsx(n,{dark:!0,language:"tsx",code:`
import { ClaimPositionRow } from '@0xintuition/1ui'

<ClaimPositionRow
  variant="user"
  position="claimFor"
  avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
  name="John Doe"
  walletAddress="0x1234567890abcdef1234567890abcdef12345678"
  amount={1.21}
  feesAccrued={0.005}
  updatedAt="2021-10-01T16:00:00Z"
/>
`}),`
`,o.jsx(r,{of:d,sourceState:"none"}),`
`,o.jsx(t.h2,{id:"properties",children:"Properties"}),`
`,o.jsx(p,{}),`
`,o.jsx(t.h2,{id:"variants",children:"Variants"}),`
`,o.jsx(t.h3,{id:"entity",children:"Entity"}),`
`,o.jsx(n,{dark:!0,language:"tsx",code:`
import { ClaimPositionRow } from '@0xintuition/1ui'
import { Text } from 'components/Text'

<ClaimPositionRow
  variant="claim"
  position="claimAgainst"
  claimsFor={30}
  claimsAgainst={70}
  amount={1.21}
  feesAccrued={0.005}
/>
`}),`
`,o.jsx(r,{of:l,sourceState:"none"}),`
`,o.jsx(t.p,{children:"./ClaimPositionRow.stories"})]})}function G(i={}){const{wrapper:t}={...a(),...i.components};return t?o.jsx(t,{...i,children:o.jsx(s,{...i})}):s(i)}export{G as default};