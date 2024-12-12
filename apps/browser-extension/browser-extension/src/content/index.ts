import browser from 'webextension-polyfill';

// Extract page content
function extractContent() {
  const content = document.body.innerText;
  return content;
}

// Send content to background script for analysis
async function analyzeContent() {
  const content = extractContent();
  const response = await browser.runtime.sendMessage({
    type: 'ANALYZE_CONTENT',
    content,
  });
  return response;
}

// Initialize content script
analyzeContent();
