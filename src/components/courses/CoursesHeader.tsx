"use client";

import { ArrowLeft, BookDown, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoursesHeaderProps {
  onBack?: () => void;
  onDownload?: () => void;
  onMenu?: () => void;
}

export function CoursesHeader({ onBack, onDownload, onMenu }: CoursesHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onBack}
        className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
      >
        <ArrowLeft size={24} />
      </Button>
      
      <h1 className="text-lg font-semibold text-gray-900">
        Courses
      </h1>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onDownload}
          className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 w-10 h-10 rounded-lg bg-gray-50"
        >
          <BookDown size={20} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onMenu}
          className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 w-10 h-10 rounded-lg bg-gray-50"
        >
          <AlignLeft size={20} />
        </Button>
      </div>
    </header>
  );
}