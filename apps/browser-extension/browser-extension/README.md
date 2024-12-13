# Content Analyzer Browser Extension

A browser extension that analyzes webpage content using Jina.ai's reader API and provides intelligent summaries. The extension can process various content types including web pages, PDFs, and images.

## Features

- 📝 Automatic content extraction from web pages
- 📄 PDF document analysis
- 🖼️ Image content analysis
- 💡 Smart content summarization
- ⚡ Fast processing with caching
- 🔄 Rate-limited to ensure service availability (20 requests/minute)

## Use Cases

- **Research**: Quickly understand academic papers and long-form content
- **Content Curation**: Extract key information from multiple sources
- **Knowledge Management**: Save and organize important content summaries
- **Accessibility**: Convert image-based content into readable text
- **Time Saving**: Get quick summaries of lengthy articles

## Installation (Development)

Since this extension is not yet published to the Chrome Web Store, follow these steps to install it locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/0xIntuition/intuition-ts.git
   cd intuition-ts
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the extension:
   ```bash
   cd apps/browser-extension/browser-extension
   pnpm build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the `dist` directory in `apps/browser-extension/browser-extension/dist`

## Configuration

1. Create a `.env.local` file in the `apps/browser-extension/browser-extension` directory:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

2. Rebuild the extension after making any configuration changes:
   ```bash
   pnpm build
   ```

## Usage

1. Click the extension icon in your browser toolbar
2. The extension will automatically analyze the current page's content
3. View the generated summary in the popup
4. For PDFs and images, the extension will extract text content before analysis

## Limitations

- Video content analysis is not currently supported
- Rate limited to 20 requests per minute
- Requires an OpenAI API key for summarization features
- Some websites may block content extraction

## Development

To set up the development environment:

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server:
   ```bash
   pnpm dev
   ```

3. Run tests:
   ```bash
   pnpm test
   ```

## Architecture

The extension uses:
- Jina.ai Reader API for content extraction (`https://r.jina.ai/`)
- OpenAI API for content summarization
- React for the popup UI
- TypeScript for type safety
- Vite for building

## Contributing

1. Create a new branch
2. Make your changes
3. Run tests: `pnpm test`
4. Submit a pull request

## License

MIT License
