import { build } from 'vite';
import { contentScriptConfig, backgroundScriptConfig } from './vite.config';

// Build all parts of the extension
async function buildExtension() {
  try {
    // Build popup (main config)
    await build();

    // Build content script
    await build(contentScriptConfig);

    // Build background script
    await build(backgroundScriptConfig);

    console.log('Build completed successfully!');
  } catch (e) {
    console.error('Build failed:', e);
    process.exit(1);
  }
}

buildExtension();
