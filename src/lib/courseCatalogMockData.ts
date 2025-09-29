// Course categories enum
export enum CourseCategory {
  ALL = "All",
  INVESTING = "Investing", 
  TRADING = "Trading",
  CRYPTO = "Crypto"
}

// Navigation tabs enum
export enum NavigationTab {
  HOME = "Home",
  COURSES = "Courses", 
  ACCOUNT = "Account"
}

// String formatters
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const formatCourseTitle = (title: string): string => {
  return title.trim();
};

// Mock data for course catalog
export const mockQuery = {
  courses: [
    {
      id: "course-1",
      title: "The Basics of Investing",
      category: CourseCategory.INVESTING,
      price: 49.99,
      imageUrl: "https://images.unsplash.com/photo-1651511587353-4de787604556?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxsZWF2ZXMlMjBwbGFudCUyMGdyb3d0aHxlbnwwfDB8fGdyZWVufDE3NTkxNjQ1MTd8MA&ixlib=rb-4.1.0&q=85",
      backgroundColor: "#F4C2A1" as const,
      description: "Learn fundamental investing principles and strategies",
      attribution: "Jael Coon on Unsplash"
    },
    {
      id: "course-2", 
      title: "Advanced Trading Strategies",
      category: CourseCategory.TRADING,
      price: 69.99,
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxjaGFydHMlMjBncmFwaHMlMjB0cmFkaW5nJTIwZmluYW5jaWFsfGVufDB8MHx8fDE3NTkxNjQ1MTZ8MA&ixlib=rb-4.1.0&q=85",
      backgroundColor: "#E8E8E8" as const,
      description: "Master advanced trading techniques and market analysis",
      attribution: "Maxim Hopman on Unsplash"
    },
    {
      id: "course-3",
      title: "Real Estate Investing 101", 
      category: CourseCategory.INVESTING,
      price: 79.99,
      imageUrl: "https://images.unsplash.com/photo-1756435292384-1bf32eff7baf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGhvbWUlMjByZWFsJTIwZXN0YXRlJTIwcHJvcGVydHl8ZW58MHwwfHx8MTc1OTE2NDUxNnww&ixlib=rb-4.1.0&q=85",
      backgroundColor: "#F4C2A1" as const,
      description: "Introduction to real estate investment fundamentals",
      attribution: "Justin Wolff on Unsplash"
    },
    {
      id: "course-4",
      title: "Cryptocurrency Masterclass",
      category: CourseCategory.CRYPTO,
      price: 129.99,
      imageUrl: "https://images.unsplash.com/photo-1629877522069-fe27cd719feb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxiaXRjb2luJTIwY3J5cHRvY3VycmVuY3klMjBjb2lucyUyMGdvbGR8ZW58MHwwfHx5ZWxsb3d8MTc1OTE2NDUxNnww&ixlib=rb-4.1.0&q=85",
      backgroundColor: "#D4E6D4" as const,
      description: "Crypto trading and analysis comprehensive guide",
      attribution: "Kanchanara on Unsplash"
    }
  ]
};

export const mockRootProps = {
  initialCourses: mockQuery.courses,
  selectedCategory: CourseCategory.ALL,
  activeTab: "Courses" as const
};