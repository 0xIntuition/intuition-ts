import React, { useState, useEffect, useCallback } from 'react';
import browser from 'webextension-polyfill';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  const getCurrentTabAndSummary = useCallback(async () => {
    try {
      setLoading(true);
      const isExtension = typeof browser !== 'undefined' && browser.runtime?.id;
      setIsStandalone(!isExtension);

      if (isExtension) {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        if (tabs[0]?.url) {
          setUrl(tabs[0].url);
          const response = await browser.runtime.sendMessage({ type: 'GET_SUMMARY' });
          if (response.error) {
            setError(response.error);
          } else {
            setSummary(response.summary);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze content');
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeUrl = async (urlToAnalyze: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlToAnalyze }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSummary(data.summary);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentTabAndSummary();
  }, [getCurrentTabAndSummary]);

  return (
    <div className="w-96 p-4 bg-white dark:bg-gray-800">
      <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Content Summary</h1>

      {isStandalone && (
        <div className="mb-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to analyze"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={() => analyzeUrl(url)}
            className="mt-2 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
            disabled={loading || !url}
          >
            Analyze URL
          </button>
        </div>
      )}

      {!isStandalone && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Current URL:</p>
          <p className="text-sm truncate text-gray-800 dark:text-gray-200">{url}</p>
        </div>
      )}

      <div className="mb-4">
        <p className="font-medium mb-2 text-gray-900 dark:text-white">Summary:</p>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ) : error ? (
          <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
            {error}
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {summary}
            </p>
          </div>
        )}
      </div>

      {!isStandalone && (
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            getCurrentTabAndSummary();
          }}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Refresh Summary'}
        </button>
      )}
    </div>
  );
};

export default App;
