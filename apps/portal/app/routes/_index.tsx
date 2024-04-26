import { Button } from '@intuition-ts/1ui';
import { PrivyButton } from '~/.client/privy-button';
import { ThemeTest } from '~/components/theme-test';

export default function Index() {
  return (
    <div>
      <PrivyButton />
      <ThemeTest />
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}
