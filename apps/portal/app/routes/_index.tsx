import { Button, Label, Input } from '@0xintuition/1ui'

export default function Index() {
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="outline">Outline Button</Button>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="textTest">Test Text Input</Label>
        <Input type="text" id="fileTest" placeholder="Test text input" />
      </div>
    </div>
  )
}
