"use client";

import { formatPrice, type CourseCategory } from "@/lib/courseCatalogMockData";

interface CourseCardProps {
  id: string;
  title: string;
  category: CourseCategory;
  price: number;
  imageUrl: string;
  backgroundColor: string;
  description: string;
  attribution: string;
  onClick?: () => void;
}

export function CourseCard({
  id,
  title,
  category,
  price,
  imageUrl,
  backgroundColor,
  description,
  attribution,
  onClick,
}: CourseCardProps) {
  return (
    <div 
      className="relative overflow-hidden rounded-3xl cursor-pointer transition-transform hover:scale-[1.02] shadow-lg"
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <div className="relative h-64 p-6">
        {/* Framed image positioned on the right */}
        <div className="absolute top-6 right-6 w-40 h-32">
          <div className="relative w-full h-full">
            {/* Frame/border effect */}
            <div className="absolute inset-0 bg-white rounded-lg shadow-md transform rotate-1"></div>
            <div className="absolute inset-0 bg-white rounded-lg shadow-lg">
              <img
                src={imageUrl}
                alt={`${title} - ${attribution}`}
                className="w-full h-full object-cover rounded-lg"
                width={160}
                height={128}
              />
            </div>
          </div>
        </div>
        
        {/* Text content positioned on the left */}
        <div className="absolute bottom-6 left-6 right-48">
          <div className="text-white">
            <p className="text-sm opacity-90 mb-1 font-medium">{category}</p>
            <h3 className="text-xl font-bold mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-2xl font-bold">
              {formatPrice(price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}