'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface FallbackImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

const FallbackImage = ({
  src,
  fallbackSrc = '/images/placeholder.jpg',
  alt,
  ...rest
}: FallbackImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  // Generate placeholder color based on src
  const generatePlaceholderColor = () => {
    let hash = 0;
    for (let i = 0; i < (alt || 'placeholder').length; i++) {
      hash = (alt || 'placeholder').charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      '#ff5500', '#00aaff', '#44ff00', '#ffaa00', '#ff00aa'
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <>
      {hasError ? (
        <div 
          className="w-full h-full flex items-center justify-center bg-zinc-800"
          style={{ backgroundColor: generatePlaceholderColor() }}
        >
          <div className="text-white text-center p-4">
            <div className="text-4xl mb-2">🖼️</div>
            <div className="font-medium">{alt || 'Image'}</div>
          </div>
        </div>
      ) : (
        <Image
          src={imgSrc}
          alt={alt || ''}
          onError={handleError}
          {...rest}
        />
      )}
    </>
  );
};

export default FallbackImage; 