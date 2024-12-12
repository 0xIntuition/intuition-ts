import React, { useState, useEffect } from 'react';
import browser from 'webextension-polyfill';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [summary, setSummary] = useState<string>('');

  useEffect(() => {
    const getCurrentTab = async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      if (tabs[0]?.url) {
        setUrl(tabs[0].url);
      }
    };
    getCurrentTab();
  }, []);

  return (
    <div className="w-96 p-4">
      <h1 className="text-xl font-bold mb-4">Content Analyzer</h1>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Current URL:</p>
        <p className="text-sm truncate">{url}</p>
      </div>
      <div className="mb-4">
        <p className="font-medium mb-2">Content Summary:</p>
        <p className="text-sm">{summary || 'Analyzing content...'}</p>
      </div>
    </div>
  );
};

export default App;
