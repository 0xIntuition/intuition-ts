import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{useMDXComponents as s}from"./index-DSkyVWTJ.js";import{M as i,T as l,d as o,C as n}from"./index-9sH2wlq6.js";import{B as p}from"./AlertDialog-3CDXO2v4.js";import"./Checkbox-BaXYeBzr.js";import"./Icon.types-Ck8KU8EG.js";import"./Label-CkICs1_r.js";import"./PieChart-B_dtFskq.js";import"./ProgressBar-Bfgyotpp.js";import"./ProgressCard-BYKzYHAL.js";import"./SegmentedControl-DQCOk3Kf.js";import"./Separator-juOyYLvc.js";import"./Skeleton-pYLGnhFW.js";import"./Table-JXx_s4Wj.js";import"./Text-COZqca-9.js";import"./Textarea-74mgfiS7.js";import"./ValueDisplay-BLpqF4VW.js";import"./Banner-BbS_KexI.js";import{S as m,B as T,A as b}from"./Tabs.stories-BQg2zQX8.js";import"./index-CTjT7uj6.js";import"./iframe-CcgvOIQl.js";import"../sb-preview/runtime.js";import"./index-BqnMPuz1.js";import"./index-DVBfyTD9.js";import"./index-9r8iugjR.js";import"./index-DXimoRZY.js";import"./index-Bx4XDAbk.js";import"./index-DrFu-skq.js";import"./index-Bb4qSo10.js";import"./index-Ca1CH5Oj.js";import"./themes-JyTiufSz.js";import"./palette-saq09hvB.js";function r(e){const a={h2:"h2",h3:"h3",h4:"h4",...s(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(i,{of:m}),`
`,t.jsx(l,{}),`
`,t.jsx(a.h4,{id:"a-set-of-layered-sections-of-contentknown-as-tab-panelsthat-are-displayed-one-at-a-time",children:"A set of layered sections of content—known as tab panels—that are displayed one at a time."}),`
`,t.jsx(p,{variant:"accent",onClick:()=>window.open("https://www.radix-ui.com/primitives/docs/components/tabs#api-reference","_blank"),children:"API Reference"}),`
`,t.jsx(o,{dark:!0,language:"tsx",code:`
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@0xintuition/1ui'

<Tabs defaultValue="one">
  <TabsList>
    <TabsTrigger value="one" label="One " totalCount={69} />
    <TabsTrigger value="two" label="Two" totalCount={69} />
    <TabsTrigger disabled value="three" label="Three" totalCount={69} />
  </TabsList>
  <div className="bg-primary/10 rounded-lg p-4">
    <TabsContent value="one">
      <p>One</p>
    </TabsContent>
    <TabsContent value="two">
      <p>Two</p>
    </TabsContent>
  </div>
</Tabs>
`}),`
`,t.jsx(n,{of:T,sourceState:"none"}),`
`,t.jsx(a.h2,{id:"variants",children:"Variants"}),`
`,t.jsx(a.h3,{id:"alternate",children:"Alternate"}),`
`,t.jsx(o,{dark:!0,language:"tsx",code:`
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@0xintuition/1ui'

<Tabs defaultValue="one">
  <TabsList>
    <TabsTrigger variant="alternate" value="one" label="One" />
    <TabsTrigger variant="alternate" value="two" label="Two" />
    <TabsTrigger disabled variant="alternate" value="three" label="Three" />
  </TabsList>
  <div className="bg-primary/10 rounded-lg p-4">
    <TabsContent value="one">
      <p>One</p>
    </TabsContent>
    <TabsContent value="two">
      <p>Two</p>
    </TabsContent>
  </div>
</Tabs>
`}),`
`,t.jsx(n,{of:b,sourceState:"none"})]})}function G(e={}){const{wrapper:a}={...s(),...e.components};return a?t.jsx(a,{...e,children:t.jsx(r,{...e})}):r(e)}export{G as default};