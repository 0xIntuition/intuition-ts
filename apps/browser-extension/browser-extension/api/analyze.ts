import { OpenAIApi, Configuration } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function fetchContent(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Basic content extraction (you might want to use a proper HTML parser)
    const textContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return textContent;
  } catch (error) {
    throw new Error(`Failed to fetch content from URL: ${error.message}`);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Fetch content from URL
    const content = await fetchContent(url);

    // Generate summary using OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes web content. Provide concise but informative summaries."
        },
        {
          role: "user",
          content: `Please summarize the following content from ${url}:\n\n${content}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const summary = completion.data.choices[0]?.message?.content || 'No summary generated';
    return res.status(200).json({ summary });
  } catch (error) {
    console.error('Error analyzing content:', error);
    return res.status(500).json({ error: error.message || 'Failed to analyze content' });
  }
}
