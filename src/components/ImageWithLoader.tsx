import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  showContourIcon?: boolean;
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  overlayClassName = '',
  showContourIcon = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Minimalist Skeleton Placeholder / Contour Layout while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-800/20 backdrop-blur-xs animate-pulse flex flex-col items-center justify-center border border-white/10 rounded-inherit z-10">
          <div className="w-full h-full bg-gradient-to-br from-slate-700/20 via-slate-800/40 to-slate-900/30 flex items-center justify-center p-4">
            {showContourIcon && (
              <div className="flex flex-col items-center gap-2 opacity-40">
                {/* Minimalist Layout Wireframe Contour Icon */}
                <div className="w-10 h-10 rounded-lg border border-slate-400/50 border-dashed flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-slate-300" />
                </div>
                <div className="h-1.5 w-16 bg-slate-400/40 rounded-full" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actual Image with smooth transition */}
      <img
        src={src}
        alt={alt}
        onLoad={(e) => {
          setIsLoaded(true);
          if (props.onLoad) props.onLoad(e);
        }}
        onError={(e) => {
          setHasError(true);
          if (props.onError) props.onError(e);
        }}
        className={`w-full h-full transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-xs'
        } ${imageClassName}`}
        {...props}
      />

      {/* Fallback Error Display if image fails */}
      {hasError && (
        <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center p-2 text-center text-xs text-slate-400">
          <span className="font-mono">{alt}</span>
        </div>
      )}
    </div>
  );
};
