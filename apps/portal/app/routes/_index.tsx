import { Button } from '@intuition-ts/1ui';

export default function Index() {
  return (
    <div className="flex flex-col p-8 gap-4">
      <div className="p-8 items-center bg-cyan-50 flex flex-col"></div>
      <Button variant="destructive">Test 1ui Button</Button>
    </div>
  );
}
