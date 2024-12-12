import browser from 'webextension-polyfill';
import { getCachedOrAnalyzeContent, ContentMetadata } from '../lib/openai';

interface ExtensionMessage {
  type: 'ANALYZE_CONTENT' | 'GET_SUMMARY';
  content?: string;
}

interface ContentResponse {
  content: string;
  metadata: ContentMetadata;
  error?: string;
}

interface RuntimeMessageSender extends browser.Runtime.MessageSender {
  tab?: browser.Tabs.Tab;
}

browser.runtime.onMessage.addListener(async (message: ExtensionMessage, sender: RuntimeMessageSender) => {
  if (message.type === 'GET_SUMMARY') {
    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) {
        throw new Error('No active tab found');
      }

      const response = await browser.tabs.sendMessage<any, ContentResponse>(
        tab.id,
        { type: 'EXTRACT_CONTENT' }
      );

      if (response.error) {
        throw new Error(response.error);
      }

      const summary = await getCachedOrAnalyzeContent(
        response.content,
        response.metadata
      );

      return { summary };
    } catch (error) {
      console.error('Error:', error);
      return {
        error: error instanceof Error ? error.message : 'Failed to generate summary'
      };
    }
  }

  if (message.type === 'ANALYZE_CONTENT' && message.content) {
    try {
      const summary = await getCachedOrAnalyzeContent(
        message.content,
        { url: sender.tab?.url || '', title: sender.tab?.title || '' }
      );
      return { summary };
    } catch (error) {
      console.error('Error:', error);
      return {
        error: error instanceof Error ? error.message : 'Failed to analyze content'
      };
    }
  }
});

browser.runtime.onInstalled.addListener(() => {
  console.log('Browser extension installed');
});
