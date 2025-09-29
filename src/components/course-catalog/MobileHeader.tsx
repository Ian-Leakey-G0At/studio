"use client";

import { ArrowLeft, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onBack?: () => void;
  onDownload?: () => void;
  onFilter?: () => void;
}

export function MobileHeader({ onBack, onDownload, onFilter }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-10 w-10 hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </Button>
        
        <h1 className="text-lg font-semibold text-gray-900">
          Courses
        </h1>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onDownload}
            className="h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-xl"
          >
            <Download className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFilter}
            className="h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-xl"
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}