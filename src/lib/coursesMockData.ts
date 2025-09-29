import type { CourseCategory } from './enums';

// Course categories enum
export enum CourseCategory {
  ALL = "All",
  INVESTING = "Investing", 
  TRADING = "Trading",
  CRYPTO = "Crypto"
}

// String formatters
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const formatCourseCategory = (category: CourseCategory): string => {
  return category;
};

// Props types (data passed to components)
export interface Course {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  backgroundColor: string;
}

export interface CoursesPageProps {
  courses: Course[];
}

// Data passed as props to the root component
export const mockRootProps = {
  courses: [
    {
      id: "basics-investing",
      title: "The Basics of Investing",
      price: 49.99,
      category: "Investing" as const,
      description: "Learn fundamental investing principles",
      image: "https://images.unsplash.com/photo-1612125666285-da5771e02b59?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxwbGFudCUyMGxlYXZlcyUyMGdyZWVuJTIwbmF0dXJlfGVufDB8MHx8Z3JlZW58MTc1OTE2NTgwNHww&ixlib=rb-4.1.0&q=85",
      backgroundColor: "#F4C2A1"
    },
    {
      id: "advanced-trading",
      title: "Advanced Trading Strategies", 
      price: 59.99,
      category: "Trading" as const,
      description: "Master advanced trading techniques",
      image: "https://images.unsplash.com/photo-1579836262329-41256f46a1fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxwbGFudHMlMjBmb2xpYWdlJTIwZ3JlZW4lMjBsZWF2ZXN8ZW58MHwwfHxncmVlbnwxNzU5MTY1ODA1fDA&ixlib=rb-4.1.0&q=85",
      backgroundColor: "#E8E8E8"
    },
    {
      id: "real-estate-101",
      title: "Real Estate Investing 101",
      price: 79.99,
      category: "Investing" as const, 
      description: "Introduction to real estate",
      image: "https://images.unsplash.com/photo-1715247018241-692b2b4f1bc7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxob3VzZSUyMGhvbWUlMjBidWlsZGluZyUyMHRyZWVzfGVufDB8MHx8fDE3NTkxNjU4MDR8MA&ixlib=rb-4.1.0&q=85",
      backgroundColor: "#F4C2A1"
    },
    {
      id: "crypto-masterclass",
      title: "Cryptocurrency Masterclass",
      price: 129.99,
      category: "Crypto" as const,
      description: "Crypto trading and analysis", 
      image: "https://images.unsplash.com/photo-1643270869468-c1522976b91c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxiaXRjb2luJTIwY29pbnMlMjBjcnlwdG9jdXJyZW5jeSUyMGdvbGRlbnxlbnwwfDB8fHllbGxvd3wxNzU5MTY1ODA1fDA&ixlib=rb-4.1.0&q=85",
      backgroundColor: "#D4E6D4"
    }
  ]
};