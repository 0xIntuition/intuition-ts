import { Button, Label, Input, ButtonVariant } from '@intuition-ts/1ui'

export default function Index() {
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">
        <Button>Default Button</Button>
        <Button variant={ButtonVariant.Secondary}>Secondary Button</Button>
        <Button variant={ButtonVariant.Outline}>Outline Button</Button>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="textTest">Test Text Input</Label>
        <Input type="text" id="fileTest" placeholder="Test text input" />
      </div>
    </div>
  )
}
