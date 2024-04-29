import { Button, Input, Label } from '@intuition-ts/1ui';
import { ThemeTest } from '~/components/theme-test';

export default function Index() {
  return (
    <div className="flex flex-col items-center gap-4 bg-primary-900 m-8">
      <div className="flex flex-col">
        <Button variant="default">Test 1ui Button</Button>
        <Button variant="secondary">Test 1ui Button</Button>
        <Button variant="outline">Test 1ui Button</Button>
        <Button variant="link">Test 1ui Button</Button>
      </div>
      <Label htmlFor="textTest">Test Text Input</Label>
      <Input type="text" id="fileTest" placeholder="Test text input" />
    </div>
  );
}
