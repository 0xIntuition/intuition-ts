import{j as m}from"./jsx-runtime-Cw0GR0a5.js";import{r as l}from"./index-CTjT7uj6.js";import{c as h}from"./index-Bb4qSo10.js";import{c as x}from"./index-Ca1CH5Oj.js";const e={heading1:"heading1",heading2:"heading2",heading3:"heading3",heading4:"heading4",heading5:"heading5",headline:"headline",bodyLarge:"bodyLarge",body:"body",caption:"caption",footnote:"footnote",small:"small"},t={normal:"normal",medium:"medium",semibold:"semibold",bold:"bold"},g=h("text-primary",{variants:{variant:{[e.heading1]:"text-6xl",[e.heading2]:"text-5xl",[e.heading3]:"text-4xl",[e.heading4]:"text-3xl",[e.heading5]:"text-2xl",[e.headline]:"text-xl",[e.bodyLarge]:"text-lg",[e.body]:"text-base",[e.caption]:"text-sm",[e.footnote]:"text-sm",[e.small]:"text-xs"},weight:{[t.normal]:"font-normal",[t.medium]:"font-medium",[t.semibold]:"font-semibold",[t.bold]:"font-bold"}},defaultVariants:{variant:e.body,weight:t.normal}}),c=a=>{switch(a){case e.heading1:return"h1";case e.heading2:return"h2";case e.heading3:return"h3";case e.heading4:return"h4";case e.heading5:return"h5";case e.headline:return"h6";default:return"p"}},o=l.forwardRef(({className:a,variant:n,weight:i,...d},r)=>{const s=c(n);return m.jsx(s,{className:x(g({variant:n,weight:i,className:a})),ref:r,...d})});o.displayName="Text";o.__docgenInfo={description:"",methods:[],displayName:"Text"};export{o as T,e as a,t as b};