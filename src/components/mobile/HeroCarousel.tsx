"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  {
    id: 1,
    url: "https://placehold.co/400x200/2563eb/ffffff?text=Financial+Charts",
    alt: "Financial charts and graphs"
  },
  {
    id: 2,
    url: "https://placehold.co/400x200/059669/ffffff?text=Investment+Growth",
    alt: "Investment and money growth"
  },
  {
    id: 3,
    url: "https://placehold.co/400x200/dc2626/ffffff?text=Budget+Planning",
    alt: "Budget planning workspace"
  },
  {
    id: 4,
    url: "https://placehold.co/400x200/7c3aed/ffffff?text=Savings+Goals",
    alt: "Savings and financial goals"
  },
  {
    id: 5,
    url: "https://placehold.co/400x200/ea580c/ffffff?text=Trading+App",
    alt: "Stock market trading app"
  }
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? heroImages.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === heroImages.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full h-48 bg-gray-100 rounded-2xl overflow-hidden">
      {/* Images */}
      <div className="relative w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}