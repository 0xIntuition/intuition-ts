export async function loadThumbnail(
  imageUrl: string,
  size: number = 50
): Promise<string> {
  if (!imageUrl) {
    // Empty image URL, return 'X' placeholder
    return getPlaceholderThumbnail(size, 'X');
  }

  const fileExtension = imageUrl.split('.').pop()?.toLowerCase();

  if (fileExtension === 'svg') {
    return loadSVGThumbnail(imageUrl, size);
  } else {
    return loadRasterThumbnail(imageUrl, size);
  }
}

async function loadRasterThumbnail(
  imageUrl: string,
  size: number
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Attempt to load cross-origin images
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size);
          const dataUrl = canvas.toDataURL();
          resolve(dataUrl);
        } else {
          resolve(getPlaceholderThumbnail(size, '?'));
        }
      } catch (error) {
        console.error('Error processing image:', error);
        resolve(getPlaceholderThumbnail(size, '?'));
      }
    };
    img.onerror = () => {
      console.error('Error loading image:', imageUrl);
      resolve(getPlaceholderThumbnail(size, '?'));
    };
    img.src = imageUrl;
  });
}

async function loadSVGThumbnail(
  imageUrl: string,
  size: number
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Attempt to load cross-origin images
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size);
          const dataUrl = canvas.toDataURL();
          resolve(dataUrl);
        } else {
          resolve(getPlaceholderThumbnail(size, '?'));
        }
      } catch (error) {
        console.error('Error processing SVG image:', error);
        resolve(getPlaceholderThumbnail(size, '?'));
      }
    };
    img.onerror = () => {
      console.error('Error loading SVG image:', imageUrl);
      resolve(getPlaceholderThumbnail(size, '?'));
    };
    img.src = imageUrl;
  });
}

function getPlaceholderThumbnail(size: number, symbol: string): string {
  // Create a canvas and draw a placeholder with the specified symbol
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Background
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(0, 0, size, size);

    // Draw the symbol ('X' or '?')
    ctx.fillStyle = '#ff0000';
    ctx.font = `${size * 0.8}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, size / 2, size / 2 + size * 0.05);
  }
  return canvas.toDataURL();
}

export async function loadThumbnails(
  imageUrls: string[],
  size: number = 50
): Promise<string[]> {
  const promises = imageUrls.map((url) => loadThumbnail(url, size));
  return Promise.all(promises);
}
