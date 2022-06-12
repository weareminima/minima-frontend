import { useEffect } from 'react';

import { IMAGES } from 'constants/images';

export default function usePreloadImages() {
  useEffect(() => {
    const PRELOAD_IMAGES = IMAGES.map((image) => {
      const img = new Image();
      img.src = image;
      return img;
    });

    globalThis.preloadImages = PRELOAD_IMAGES;
  }, []);
}
