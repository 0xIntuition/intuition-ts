import{j as m}from"./jsx-runtime-Cw0GR0a5.js";import{useMDXComponents as a}from"./index-DSkyVWTJ.js";import{M as r,T as e,d as i,C as p}from"./index-9sH2wlq6.js";import{B as d}from"./AlertDialog-3CDXO2v4.js";import"./Checkbox-BaXYeBzr.js";import"./Icon.types-Ck8KU8EG.js";import"./Label-CkICs1_r.js";import"./PieChart-B_dtFskq.js";import"./ProgressBar-Bfgyotpp.js";import"./ProgressCard-BYKzYHAL.js";import"./SegmentedControl-DQCOk3Kf.js";import"./Separator-juOyYLvc.js";import"./Skeleton-pYLGnhFW.js";import"./Table-JXx_s4Wj.js";import"./Text-COZqca-9.js";import"./Textarea-74mgfiS7.js";import"./ValueDisplay-BLpqF4VW.js";import"./Banner-BbS_KexI.js";import{S as s,B as C}from"./Command.stories-DiPVxUjk.js";import"./index-CTjT7uj6.js";import"./iframe-CcgvOIQl.js";import"../sb-preview/runtime.js";import"./index-BqnMPuz1.js";import"./index-DVBfyTD9.js";import"./index-9r8iugjR.js";import"./index-DXimoRZY.js";import"./index-Bx4XDAbk.js";import"./index-DrFu-skq.js";import"./index-Bb4qSo10.js";import"./index-Ca1CH5Oj.js";import"./themes-JyTiufSz.js";import"./palette-saq09hvB.js";function n(o){const t={h4:"h4",...a(),...o.components};return m.jsxs(m.Fragment,{children:[m.jsx(r,{of:s}),`
`,m.jsx(e,{}),`
`,m.jsx(t.h4,{id:"fast-composable-unstyled-command-menu-for-react",children:"Fast, composable, unstyled command menu for React."}),`
`,m.jsx(d,{variant:"accent",onClick:()=>window.open("https://cmdk.paco.me/","_blank"),children:"API Reference"}),`
`,m.jsx(i,{dark:!0,language:"tsx",code:`
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator, 
} from '@0xintuition/1ui'

<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
`}),`
`,m.jsx(p,{of:C,sourceState:"none"})]})}function H(o={}){const{wrapper:t}={...a(),...o.components};return t?m.jsx(t,{...o,children:m.jsx(n,{...o})}):n(o)}export{H as default};