import{j as a}from"./jsx-runtime-Cw0GR0a5.js";import{useMDXComponents as i}from"./index-DSkyVWTJ.js";import{M as r,T as n,d as m,C as l}from"./index-9sH2wlq6.js";import"./AlertDialog-3CDXO2v4.js";import"./Checkbox-BaXYeBzr.js";import"./Icon.types-Ck8KU8EG.js";import"./Label-CkICs1_r.js";import"./PieChart-B_dtFskq.js";import"./ProgressBar-Bfgyotpp.js";import"./ProgressCard-BYKzYHAL.js";import"./SegmentedControl-DQCOk3Kf.js";import"./Separator-juOyYLvc.js";import"./Skeleton-pYLGnhFW.js";import"./Table-JXx_s4Wj.js";import"./Text-COZqca-9.js";import"./Textarea-74mgfiS7.js";import"./ValueDisplay-BLpqF4VW.js";import"./Banner-BbS_KexI.js";import{S as d,B as s}from"./SidebarLayout.stories-CmyvTCmg.js";import"./index-CTjT7uj6.js";import"./iframe-CcgvOIQl.js";import"../sb-preview/runtime.js";import"./index-BqnMPuz1.js";import"./index-DVBfyTD9.js";import"./index-9r8iugjR.js";import"./index-DXimoRZY.js";import"./index-Bx4XDAbk.js";import"./index-DrFu-skq.js";import"./index-Bb4qSo10.js";import"./index-Ca1CH5Oj.js";import"./themes-JyTiufSz.js";import"./palette-saq09hvB.js";function o(t){const e={h4:"h4",...i(),...t.components};return a.jsxs(a.Fragment,{children:[a.jsx(r,{of:d}),`
`,a.jsx(n,{}),`
`,a.jsx(e.h4,{id:"a-two-panel-layout-with-a-built-in-collapsible-side-panel",children:"A two-panel layout with a built in collapsible side panel."}),`
`,a.jsx(m,{dark:!0,language:"tsx",code:`
import {   
  SidebarLayout,
  SidebarLayoutContent,
  SidebarLayoutNav,
  SidebarLayoutNavAvatar,
  SidebarLayoutNavBody,
  SidebarLayoutNavHeader,
  SidebarLayoutNavHeaderButton,
  SidebarLayoutProvider,
  SidebarNavItem,
} from '@0xintuition/1ui'

<SidebarLayoutProvider>
  <SidebarLayout {...args}>
    <SidebarLayoutNav>
      <SidebarLayoutNavHeader>
        <SidebarLayoutNavHeaderButton imgLogo={<svg />} textLogo={<svg />} />
      </SidebarLayoutNavHeader>
      <SidebarLayoutNavBody className="flex flex-col justify-between">
        <div className="flex flex-col gap-px">
          <SidebarNavItem
            iconName="crystal-ball"
            label="Explore This"
            onClick={() => null}
          />
          <SidebarNavItem
            iconName="megaphone"
            label="Explore That"
            onClick={() => null}
          />
        </div>
        <div className="flex flex-col gap-px">
          <SidebarNavItem
            iconName="settings-gear"
            label="Settings"
            onClick={() => null}
          />
          <SidebarLayoutNavAvatar
            imageSrc="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
            name="Super Dave"
            onClick={() => null}
          />
        </div>
      </SidebarLayoutNavBody>
    </SidebarLayoutNav>
    <SidebarLayoutContent className="flex items-center justify-center p-6">
      Content goes here.
    </SidebarLayoutContent>
  </SidebarLayout>
</SidebarLayoutProvider>
`}),`
`,a.jsx(l,{of:s,sourceState:"none"})]})}function R(t={}){const{wrapper:e}={...i(),...t.components};return e?a.jsx(e,{...t,children:a.jsx(o,{...t})}):o(t)}export{R as default};