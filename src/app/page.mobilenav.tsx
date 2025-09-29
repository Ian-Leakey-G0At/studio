"use client";

import { MobileHeader } from "@/components/mobile/MobileHeader";
import { HeroCarousel } from "@/components/mobile/HeroCarousel";
import { GoodluckButton } from "@/components/mobile/GoodluckButton";
import { MobileCourseCard } from "@/components/mobile/MobileCourseCard";
import { BottomNavigation } from "@/components/mobile/BottomNavigation";

const courses = [
  {
    id: "stock-market-investing",
    title: "Stock Market Investing for Beginners",
    lessons: 15,
    category: "Investing"
  },
  {
    id: "cryptocurrency-blockchain",
    title: "Cryptocurrency & Blockchain",
    lessons: 20,
    category: "Investing"
  },
  {
    id: "real-estate-investment",
    title: "Real Estate Investment Mastery",
    lessons: 25,
    category: "Investing"
  },
  {
    id: "personal-finance-budgeting",
    title: "Personal Finance & Budgeting",
    lessons: 12,
    category: "Budgeting"
  },
  {
    id: "advanced-options-trading",
    title: "Advanced Options Trading",
    lessons: 30,
    category: "Investing"
  },
  {
    id: "building-online-business",
    title: "Building an Online Business",
    lessons: 18,
    category: "Business"
  }
];

// Mock content to test scrolling and clipping
const additionalContent = [
  "Financial Planning Basics",
  "Investment Strategies",
  "Risk Management",
  "Portfolio Diversification",
  "Market Analysis",
  "Trading Psychology",
  "Retirement Planning",
  "Tax Optimization",
  "Wealth Building",
  "Economic Indicators"
];

export default function MobileNavDemo() {
  return (
    <div className="min-h-screen bg-white">
      <MobileHeader />
      
      <main className="px-4">
        {/* Hero Carousel */}
        <div className="mb-6">
          <HeroCarousel />
        </div>

        {/* Goodluck Button */}
        <div className="mb-8">
          <GoodluckButton />
        </div>

        {/* Our Courses Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Courses</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {courses.map((course) => (
              <MobileCourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Additional Content to Test Scrolling */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Topics</h2>
          <div className="space-y-4">
            {additionalContent.map((topic, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <h3 className="font-semibold text-gray-800">{topic}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Learn about {topic.toLowerCase()} and how it can help you build wealth and achieve financial freedom.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final content to ensure proper spacing */}
        <section className="mb-8">
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">Bottom Content Test</h3>
            <p className="text-blue-700">
              This content should be fully visible and not clipped by the bottom navigation. 
              There should be adequate spacing below this text.
            </p>
          </div>
        </section>
      </main>
      
      <BottomNavigation />
    </div>
  );
}