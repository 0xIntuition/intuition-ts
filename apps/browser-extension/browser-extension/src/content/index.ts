import browser from 'webextension-polyfill';
import { JinaReader, jinaReader } from '../lib/jina';
import {
  ExtractContentMessage,
  ContentResponse,
  ContentMetadata
} from '../types/messages';

// Debug: Log when content script loads
console.log('Content script loaded');

// Extract metadata from the page
function extractMetadata(): ContentMetadata {
  const ogType = document.querySelector('meta[property="og:type"]')?.getAttribute('content');
  const contentType = document.querySelector('meta[http-equiv="Content-Type"]')?.getAttribute('content') || 'text/html';

  return {
    url: window.location.href,
    title: document.title,
    contentType,
    ...(ogType && { ogType })
  };
}

// Fallback content extraction using DOM parsing
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

// Extract content using Jina Reader with DOM fallback
async function extractContentWithJina(): Promise<{
  content: string;
  metadata: ContentMetadata;
  source: 'jina' | 'dom';
}> {
  try {
    const url = window.location.href;
    console.log('Attempting to extract content using Jina Reader:', url);

    // Check if content type is supported by Jina
    if (!JinaReader.isSupportedContentType(url)) {
      console.log('Content type not supported by Jina, falling back to DOM parsing');
      const domContent = extractContent();
      return {
        content: domContent,
        metadata: extractMetadata(),
        source: 'dom'
      };
    }

    // Try Jina Reader
    const jinaResponse = await jinaReader.extractContent(url);
    console.log('Successfully extracted content using Jina Reader');

    return {
      content: jinaResponse.content,
      metadata: {
        ...extractMetadata(), // Include DOM metadata for completeness
        ...(jinaResponse.metadata || {}) // Optional Jina metadata
      },
      source: 'jina'
    };
  } catch (error) {
    console.warn('Jina Reader extraction failed, falling back to DOM parsing:', error);

    // Fallback to DOM parsing
    const domContent = extractContent();
    const metadata = extractMetadata();

    return {
      content: domContent,
      metadata,
      source: 'dom'
    };
  }
}

// Listen for messages from the background script
browser.runtime.onMessage.addListener(async (
  message: ExtractContentMessage
): Promise<ContentResponse> => {
  console.log('Content script: Received message', message);

  if (message.type === 'EXTRACT_CONTENT') {
    try {
      const result = await extractContentWithJina();
      console.log(`Content extracted using ${result.source} method`);
      console.log('Content script: Metadata', result.metadata);

      return {
        content: result.content,
        metadata: result.metadata,
        source: result.source,
      };
    } catch (error) {
      console.error('Error extracting content:', error);
      return {
        error: error instanceof Error ? error.message : 'Failed to extract content',
        metadata: extractMetadata(),
      };
    }
  }

  return { error: 'Unknown message type', metadata: extractMetadata() };
});
