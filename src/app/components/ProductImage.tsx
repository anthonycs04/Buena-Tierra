import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import { Product } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductImageProps {
  product: Pick<Product, 'name' | 'image' | 'images'>;
  className?: string;
  showIndicator?: boolean;
}

export function getProductImageSources(
  product: Pick<Product, 'image' | 'images'>
) {
  return product.images?.length ? product.images : product.image ? [product.image] : [];
}

export function ProductImage({
  product,
  className = '',
  showIndicator = true,
}: ProductImageProps) {
  const sources = getProductImageSources(product);
  const sourcesKey = sources.join('|');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [sourcesKey]);

  useEffect(() => {
    if (sources.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % sources.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [sources.length, sourcesKey]);

  if (!sources.length) {
    return (
      <div
        className={`bg-gradient-to-br from-[#A5D6A7] to-[#2E7D32] flex items-center justify-center ${className}`}
      >
        <Leaf className="w-1/2 h-1/2 text-white" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F2F2EC] ${className}`}>
      {sources.map((src, index) => (
        <ImageWithFallback
          key={src}
          src={src}
          alt={`${product.name} - imagen ${index + 1}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {showIndicator && sources.length > 1 && (
        <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-black/35 px-1.5 py-1">
          {sources.map((src, index) => (
            <span
              key={src}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                index === activeIndex ? 'bg-white' : 'bg-white/45'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
