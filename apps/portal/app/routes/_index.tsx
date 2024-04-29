import { Button } from '@intuition-ts/1ui';
import { ThemeTest } from '~/components/theme-test';

export default function Index() {
  return (
    <div className="flex flex-col items-center gap-4 bg-primary-900">
      <Button variant="default">Test 1ui Button</Button>
      <Button variant="secondary">Test 1ui Button</Button>
      <Button variant="outline">Test 1ui Button</Button>
      <Button variant="link">Test 1ui Button</Button>
      <Button variant="tooltip">Test 1ui Button</Button>
      <ThemeTest />
    </div>
  );
}
