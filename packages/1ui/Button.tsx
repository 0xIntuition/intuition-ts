import { useState } from 'react';

export function Button(props: any) {
  const [count, setCount] = useState(0);
  console.log('test', props);
  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count issss {count}
    </button>
  );
}

export default Button;
