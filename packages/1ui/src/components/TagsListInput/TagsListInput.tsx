import * as React from 'react'

export interface TagsListInputProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TagsListInput = ({ children }: TagsListInputProps) => {
  return <div className="w-full">{children}</div>
}
