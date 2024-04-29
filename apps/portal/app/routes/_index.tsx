import { Button, Label, Input } from '@intuition-ts/1ui';

export default function Index() {
  return (
    <div className="flex flex-col items-center gap-4 bg-primary-900 m-8">
      <div className="flex flex-col">
        <Button variant="default">Default Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="destructive">Destructive Button</Button>
      </div>
      <Label htmlFor="textTest">Test Text Input</Label>
      <Input type="text" id="fileTest" placeholder="Test text input" />
    </div>
  );
}
