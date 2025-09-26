
"use client";

import { useState, useEffect } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const carouselImages = PlaceHolderImages.slice(0, 5);

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="carousel-container rounded-lg aspect-[16/9] overflow-hidden">
      <div
        className="carousel-slide flex"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselImages.map((image) => (
          <div
            key={image.id}
            className="carousel-item bg-cover bg-center"
            style={{ backgroundImage: `url("${image.imageUrl}")` }}
            data-ai-hint={image.imageHint}
          ></div>
        ))}
      </div>
    </div>
  );
}
