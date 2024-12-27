// Types for OpenAI API responses
interface ChatCompletionMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionChoice {
  index: number;
  message: ChatCompletionMessage;
  finish_reason: string;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Content metadata interface
export interface ContentMetadata {
  url: string;
  title: string;
  contentType?: string;
  ogType?: string;
}

// Content analysis functions
export async function analyzeContent(content: string, contentType: 'text' | 'video' | 'image' = 'text'): Promise<string> {
  const systemPrompt = getSystemPromptForContentType(contentType);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data: ChatCompletionResponse = await response.json();
    return data.choices[0]?.message?.content || 'No summary available';
  } catch (error) {
    console.error('Error analyzing content:', error);
    throw error;
  }
}

function getSystemPromptForContentType(contentType: 'text' | 'video' | 'image'): string {
  const prompts = {
    text: 'Analyze and summarize the following text content concisely, highlighting the main points and key takeaways:',
    video: 'Analyze the following video transcript or description and provide a concise summary of the main topics, key points, and important moments:',
    image: 'Analyze the following image description or alt text and provide a concise summary of what is depicted:',
  };

  return prompts[contentType];
}

// Helper function to determine content type from metadata
export function detectContentType(metadata: ContentMetadata): 'text' | 'video' | 'image' {
  const { url, contentType, ogType } = metadata;

  // Check content type header first
  if (contentType) {
    if (contentType.startsWith('video/')) return 'video';
    if (contentType.startsWith('image/')) return 'image';
    if (contentType.startsWith('text/')) return 'text';
  }

  // Check Open Graph type
  if (ogType) {
    if (ogType === 'video') return 'video';
    if (ogType === 'image') return 'image';
    if (ogType === 'article' || ogType === 'website') return 'text';
  }

  // Fallback to URL analysis
  const extension = url.split('.').pop()?.toLowerCase();
  if (['mp4', 'webm', 'ogg'].includes(extension || '')) return 'video';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) return 'image';

  // Default to text if we can't determine the type
  return 'text';
}

// Rate limiting and caching
const rateLimitWindow = 60000; // 1 minute
const maxRequestsPerWindow = 10;
const requestTimestamps: number[] = [];
const cache = new Map<string, { summary: string; timestamp: number }>();
const cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours

export async function getCachedOrAnalyzeContent(
  content: string,
  metadata: ContentMetadata
): Promise<string> {
  const cacheKey = `${metadata.url}:${content.slice(0, 100)}`; // Use URL + content preview as cache key
  const cached = cache.get(cacheKey);

  // Return cached result if still valid
  if (cached && Date.now() - cached.timestamp < cacheExpiration) {
    return cached.summary;
  }

  // Check rate limiting
  const now = Date.now();
  requestTimestamps.push(now);
  requestTimestamps.splice(0, requestTimestamps.length - maxRequestsPerWindow);

  if (requestTimestamps.length >= maxRequestsPerWindow &&
      now - requestTimestamps[0] < rateLimitWindow) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }

  // Get fresh analysis
  const contentType = detectContentType(metadata);
  const summary = await analyzeContent(content, contentType);

  // Cache the result
  cache.set(cacheKey, { summary, timestamp: now });

  return summary;
}
