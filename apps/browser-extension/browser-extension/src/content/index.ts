import browser from 'webextension-polyfill';

// Message type definitions
interface ExtensionMessage {
  type: 'EXTRACT_CONTENT' | 'ANALYZE_CONTENT';
}

// Extract metadata from the page
function extractMetadata() {
  const ogType = document.querySelector('meta[property="og:type"]')?.getAttribute('content');
  const contentType = document.querySelector('meta[http-equiv="Content-Type"]')?.getAttribute('content');

  return {
    url: window.location.href,
    title: document.title,
    ogType,
    contentType,
  };
}

// Extract main content based on common patterns
function extractContent(): string {
  // Try to find the main content container
  const selectors = [
    'article',
    '[role="main"]',
    'main',
    '.main-content',
    '#main-content',
    '.post-content',
    '.article-content',
    '.content',
    '#content',
  ];

  let mainElement = null;

  // Find the first matching element that has substantial content
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent && element.textContent.trim().length > 100) {
      mainElement = element;
      break;
    }
  }

  // Fallback to body if no main content container found
  mainElement = mainElement || document.body;

  // Create a clone to modify without affecting the page
  const clone = mainElement.cloneNode(true) as HTMLElement;

  // Remove unwanted elements
  const unwantedSelectors = [
    'nav',
    'header',
    'footer',
    'script',
    'style',
    'noscript',
    'iframe',
    '.nav',
    '.header',
    '.footer',
    '.sidebar',
    '.ad',
    '.advertisement',
    '.social-share',
    '.comments',
    '#comments',
  ];

  unwantedSelectors.forEach(selector => {
    clone.querySelectorAll(selector).forEach(el => el.remove());
  });

  // Extract video content
  const videoElements = mainElement.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
  let videoContent = '';
  if (videoElements.length > 0) {
    videoContent = Array.from(videoElements)
      .map(element => {
        if (element instanceof HTMLVideoElement) {
          const video = element;
          const videoSrc = video.src || video.querySelector('source')?.src;
          const videoTitle = video.title || video.getAttribute('aria-label');
          const videoDescription = video.getAttribute('description') || '';
          return `Video: ${videoTitle || 'Untitled'}\nSource: ${videoSrc || 'Unknown'}\nDescription: ${videoDescription}`;
        } else if (element instanceof HTMLIFrameElement) {
          const iframe = element;
          return `Video: ${iframe.title || 'Embedded Video'}\nSource: ${iframe.src}`;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n');
  }

  // Extract image content
  const imageElements = mainElement.querySelectorAll('img');
  let imageContent = '';
  if (imageElements.length > 0) {
    imageContent = Array.from(imageElements)
      .filter(img => {
        const src = img.src;
        // Filter out small icons and decorative images
        return !src.includes('icon') && !src.includes('logo') && img.width > 100 && img.height > 100;
      })
      .map(img => {
        const altText = img.alt || '';
        const figcaption = img.closest('figure')?.querySelector('figcaption')?.textContent || '';
        return `Image: ${img.src}\nAlt text: ${altText}\nCaption: ${figcaption}`;
      })
      .join('\n\n');
  }

  // Combine all content
  const textContent = clone.textContent?.trim() || '';
  const combinedContent = [
    textContent,
    videoContent,
    imageContent,
  ].filter(Boolean).join('\n\n');

  return combinedContent;
}

// Listen for messages from the background script
browser.runtime.onMessage.addListener((message: ExtensionMessage) => {
  if (message.type === 'EXTRACT_CONTENT') {
    try {
      return Promise.resolve({
        content: extractContent(),
        metadata: extractMetadata(),
      });
    } catch (error) {
      console.error('Error extracting content:', error);
      return Promise.resolve({
        error: 'Failed to extract content',
        metadata: extractMetadata(),
      });
    }
  }
});
