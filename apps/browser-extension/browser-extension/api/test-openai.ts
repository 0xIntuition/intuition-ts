import OpenAI from 'openai';

const apiKey = process.env.API_KEY;
const openai = new OpenAI({ apiKey });

async function testOpenAIKey() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Hello world' }],
      model: 'gpt-4',
    });
    console.log('OpenAI API key is valid');
    return true;
  } catch (error) {
    console.error('OpenAI API key is invalid:', error.message);
    return false;
  }
}

testOpenAIKey();
