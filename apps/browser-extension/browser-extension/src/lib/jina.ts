import { Cache } from './cache';

export interface JinaReaderResponse {
  content: string;
  metadata?: {
    url: string;
    title?: string;
    contentType?: string;
    timestamp: string;
  };
}

const JINA_READER_BASE_URL = 'https://r.jina.ai/';
const RATE_LIMIT_RPM = 20; // Free tier limit

export class JinaReader {
  private static instance: JinaReader;
  private readonly cache: Cache<JinaReaderResponse>;

  private constructor() {
    this.cache = Cache.getInstance<JinaReaderResponse>('jina', 3600000); // 1 hour TTL
  }

  static getInstance(): JinaReader {
    if (!JinaReader.instance) {
      JinaReader.instance = new JinaReader();
    }
    return JinaReader.instance;
  }

  async extractContent(url: string): Promise<JinaReaderResponse> {
    try {
      if (!JinaReader.isValidUrl(url)) {
        throw new Error('Invalid URL provided');
      }

      // Check cache first
      const cachedResponse = this.cache.get(url);
      if (cachedResponse) {
        console.log('Using cached response for:', url);
        return cachedResponse;
      }

      // Check rate limit before making request
      await this.cache.checkRateLimit();

      // Construct Jina Reader URL and make request
      const jinaUrl = `${JINA_READER_BASE_URL}${encodeURIComponent(url)}`;
      const response = await fetch(jinaUrl);

      if (!response.ok) {
        throw new Error(`Jina Reader error: ${response.statusText}`);
      }

      const content = await response.text();
      const result: JinaReaderResponse = {
        content,
        metadata: {
          url,
          timestamp: new Date().toISOString(),
          contentType: response.headers.get('content-type') || 'text/plain'
        }
      };

      // Cache the successful response
      this.cache.set(url, result);
      return result;

    } catch (error) {
      console.error('Error extracting content with Jina:', error);
      throw error;
    }
  }

  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Helper method to check if content type is supported
  static isSupportedContentType(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname.toLowerCase();

      // Supported extensions (web pages, PDFs, images)
      const supportedExtensions = [
        '.pdf', '.png', '.jpg', '.jpeg', '.gif', '.webp',
        '.html', '.htm'
      ];

      return supportedExtensions.some(ext => path.endsWith(ext)) ||
             !path.includes('.'); // Assume URLs without extensions are web pages
    } catch {
      return false;
    }
  }
}

// Export a singleton instance
export const jinaReader = JinaReader.getInstance();
