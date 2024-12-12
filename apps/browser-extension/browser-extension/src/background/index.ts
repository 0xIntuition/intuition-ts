import browser from 'webextension-polyfill';

// Listen for messages from content script
browser.runtime.onMessage.addListener(async (message, sender) => {
  if (message.type === 'ANALYZE_CONTENT') {
    // TODO: Implement OpenAI API integration
    return { summary: 'Content analysis will be implemented in the next step.' };
  }
});
