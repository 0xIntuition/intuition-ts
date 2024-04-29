import { useState } from 'react';

export function TestButton(props: any) {
  const [count, setCount] = useState(0);
  console.log('test', props);
  return (
    <button
      onClick={() => setCount((count) => count + 1)}
      className="p-4 h-2 w-2 bg-cyan-50 text-cyan-500"
    >
      Count: {count}
    </button>
  );
}

export default TestButton;
