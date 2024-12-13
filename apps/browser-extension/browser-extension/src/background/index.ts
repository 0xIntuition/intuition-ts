import browser from 'webextension-polyfill';
import { getCachedOrAnalyzeContent } from '../lib/openai';
import { jinaReader, JinaReader } from '../lib/jina';
import { Cache } from '../lib/cache';
import {
  ExtensionMessage,
  ContentResponse,
  SummaryResponse,
  ContentMetadata,
  ExtractContentMessage,
  AnalyzeContentMessage
} from '../types/messages';

interface RuntimeMessageSender extends browser.Runtime.MessageSender {
  tab?: browser.Tabs.Tab;
}

// Initialize cache for retry handling
const retryCache = Cache.getInstance<{ retryCount: number; lastRetry: number }>('retry');
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

async function handleRateLimitedRequest<T>(
  key: string,
  operation: () => Promise<T>
): Promise<T> {
  const retryData = retryCache.get(key) || { retryCount: 0, lastRetry: 0 };

  try {
    return await operation();
  } catch (error) {
    if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
      if (retryData.retryCount >= MAX_RETRIES) {
        retryCache.delete(key);
        throw new Error('Max retries exceeded for rate-limited request');
      }

      const now = Date.now();
      const waitTime = Math.max(RETRY_DELAY, retryData.lastRetry + RETRY_DELAY - now);

      await new Promise(resolve => setTimeout(resolve, waitTime));

      retryCache.set(key, {
        retryCount: retryData.retryCount + 1,
        lastRetry: now
      });

      return handleRateLimitedRequest(key, operation);
    }
    throw error;
  }
}

browser.runtime.onMessage.addListener(async (
  message: ExtensionMessage,
  sender: RuntimeMessageSender
): Promise<SummaryResponse> => {
  if (message.type === 'GET_SUMMARY') {
    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id || !tab.url) {
        throw new Error('No active tab found or URL is undefined');
      }

      // Check if URL is supported by Jina
      if (!JinaReader.isSupportedContentType(tab.url)) {
        console.log('Content type not supported by Jina, using DOM extraction');
      }

      const response = await handleRateLimitedRequest(
        `extract_${tab.url}`,
        async () => {
          const result = await browser.tabs.sendMessage(
            tab.id!,
            { type: 'EXTRACT_CONTENT' } as ExtractContentMessage
          ) as ContentResponse;
          return result;
        }
      );

      if (response.error) {
        throw new Error(response.error);
      }

      // Use OpenAI to analyze the content
      const summary = await handleRateLimitedRequest(
        `analyze_${tab.url}`,
        async () => {
          return getCachedOrAnalyzeContent(
            response.content || '',
            response.metadata
          );
        }
      );

      return { summary, source: response.source };
    } catch (error) {
      console.error('Error:', error);
      return {
        error: error instanceof Error ? error.message : 'Failed to generate summary'
      };
    }
  }

  if (message.type === 'ANALYZE_CONTENT' && message.content) {
    try {
      const summary = await handleRateLimitedRequest(
        `analyze_${sender.tab?.url || 'unknown'}`,
        async () => {
          const result = await getCachedOrAnalyzeContent(
            message.content,
            {
              url: sender.tab?.url || '',
              title: sender.tab?.title || '',
              contentType: message.metadata?.contentType || 'text/plain'
            }
          );
          return result;
        }
      );
      return { summary };
    } catch (error) {
      console.error('Error:', error);
      return {
        error: error instanceof Error ? error.message : 'Failed to analyze content'
      };
    }
  }

  return { error: 'Unknown message type' };
});

browser.runtime.onInstalled.addListener(() => {
  console.log('Browser extension installed');
});
