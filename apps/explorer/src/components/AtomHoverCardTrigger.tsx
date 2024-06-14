/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  Button,
  Label, Avatar, AvatarFallback, AvatarImage, HoverCardTrigger
} from '@0xintuition/1ui'

export function AtomHoverCardTrigger({ atom }: { atom: any }) {
  return (
    <HoverCardTrigger asChild>
      <Button variant='text'>
        <Avatar >
          <AvatarImage src={atom.image} alt="intuition" />
          <AvatarFallback>{atom.emoji}</AvatarFallback>
        </Avatar>
        <Label>{atom.label}</Label>
      </Button>
    </HoverCardTrigger>
  )
}
