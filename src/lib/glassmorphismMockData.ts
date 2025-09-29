// Mock data for the glassmorphism financial education platform
export const mockStore = {
  user: {
    id: "user-1",
    displayName: "John Doe",
    email: "john.doe@example.com",
    photoURL: "https://i.pravatar.cc/150?img=1"
  },
  theme: {
    isDark: true,
    glassmorphismEnabled: true
  }
};

export const mockQuery = {
  courses: [
    {
      id: "course-1",
      title: "Complete Investing Masterclass",
      description: "Learn the fundamentals of investing, from stocks to real estate, with proven strategies used by successful investors.",
      category: "Investing" as const,
      price: 199,
      duration: "8 weeks",
      format: "Video",
      imageId: "investing-course",
      imageUrl: "https://images.unsplash.com/photo-1605512930578-a93be1839e4f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxjaGFydHMlMjBncmFwaHMlMjBmaW5hbmNpYWwlMjBidXNpbmVzc3xlbnwwfDB8fGJsdWV8MTc1OTE1ODQ0OHww&ixlib=rb-4.1.0&q=85",
      rating: 4.8,
      studentCount: 1200
    },
    {
      id: "course-2", 
      title: "Debt Freedom Blueprint",
      description: "A comprehensive guide to eliminating debt using the snowball and avalanche methods, plus negotiation tactics.",
      category: "Debt" as const,
      price: 149,
      duration: "6 weeks", 
      format: "Interactive",
      imageId: "debt-course",
      imageUrl: "https://images.unsplash.com/photo-1582775031245-dc40b3a446f2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjcmVkaXQlMjBjYXJkcyUyMGRvY3VtZW50cyUyMGRlYnQlMjBmaW5hbmNlfGVufDB8MHx8cmVkfDE3NTkxNTg0NDh8MA&ixlib=rb-4.1.0&q=85",
      rating: 4.9,
      studentCount: 850
    },
    {
      id: "course-3",
      title: "Smart Budgeting System",
      description: "Create a sustainable budget that works for your lifestyle and helps you reach your financial goals faster.",
      category: "Budgeting" as const,
      price: 99,
      duration: "4 weeks",
      format: "Workbook",
      imageId: "budget-course",
      imageUrl: "https://images.unsplash.com/photo-1654360057953-81305834dd30?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxjYWxjdWxhdG9yJTIwc3ByZWFkc2hlZXQlMjBidWRnZXQlMjBwbGFubmluZ3xlbnwwfDB8fGdyZWVufDE3NTkxNTg0NDh8MA&ixlib=rb-4.1.0&q=85", 
      rating: 4.7,
      studentCount: 2100
    },
    {
      id: "course-4",
      title: "Real Estate Investment Fundamentals",
      description: "Master the art of real estate investing with proven strategies for building long-term wealth through property.",
      category: "Investing" as const,
      price: 249,
      duration: "10 weeks",
      format: "Video",
      imageId: "realestate-course",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxyZWFsJTIwZXN0YXRlJTIwaW52ZXN0aW5nfGVufDB8MHx8fDE3NTkxNTg0NDh8MA&ixlib=rb-4.1.0&q=85",
      rating: 4.6,
      studentCount: 750
    },
    {
      id: "course-5",
      title: "Advanced Tax Strategies",
      description: "Learn advanced tax planning techniques to minimize your tax burden and maximize your wealth building potential.",
      category: "Investing" as const,
      price: 179,
      duration: "6 weeks",
      format: "Interactive",
      imageId: "tax-course",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHx0YXglMjBwbGFubmluZyUyMGZpbmFuY2V8ZW58MHwwfHx8MTc1OTE1ODQ0OHww&ixlib=rb-4.1.0&q=85",
      rating: 4.7,
      studentCount: 920
    },
    {
      id: "course-6",
      title: "Emergency Fund Mastery",
      description: "Build and maintain the perfect emergency fund to protect yourself from financial disasters and unexpected expenses.",
      category: "Budgeting" as const,
      price: 79,
      duration: "3 weeks",
      format: "Workbook",
      imageId: "emergency-course",
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxlbWVyZ2VuY3klMjBmdW5kJTIwc2F2aW5nc3xlbnwwfDB8fHwxNzU5MTU4NDQ4fDA&ixlib=rb-4.1.0&q=85",
      rating: 4.8,
      studentCount: 1850
    }
  ],
  successStories: [
    {
      name: "Sarah Johnson",
      result: "Paid off $45,000 in debt",
      time: "18 months",
      quote: "The debt elimination strategies changed my life completely.",
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Mike Chen", 
      result: "Built $100,000 portfolio",
      time: "2 years",
      quote: "Finally understanding investing made all the difference.",
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Lisa Rodriguez",
      result: "Emergency fund of $25,000", 
      time: "1 year",
      quote: "I sleep better knowing I'm financially prepared.",
      image: "https://i.pravatar.cc/150?img=3"
    }
  ],
  stats: [
    { icon: "Users", value: "10,000+", label: "Students Empowered" },
    { icon: "DollarSign", value: "$2.5M+", label: "Debt Eliminated" },
    { icon: "TrendingUp", value: "85%", label: "Success Rate" },
    { icon: "Target", value: "3x", label: "Average ROI" }
  ]
};

export const mockRootProps = {
  initialCourses: mockQuery.courses,
  userProfile: mockStore.user,
  isAuthenticated: false
};