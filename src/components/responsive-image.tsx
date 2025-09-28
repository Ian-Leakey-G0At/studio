
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function ResponsiveImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  priority 
}: ResponsiveImageProps) {
  const baseSrc = src.substring(0, src.lastIndexOf('.'));

  return (
    <picture>
      <source srcSet={`${baseSrc}.avif`} type="image/avif" />
      <source srcSet={`${baseSrc}.webp`} type="image/webp" />
      <Image 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        className={className}
        priority={priority}
      />
    </picture>
  );
}
