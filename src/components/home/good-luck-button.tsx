
"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export function GoodLuckButton() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
    // Future confetti logic will be triggered here
  };

  return (
    <Button
      variant="secondary"
      className="h-12 w-full flex items-center justify-center rounded-full bg-primary/10 text-primary transition-transform hover:scale-105"
      onClick={handleClick}
    >
      <span className="font-bold">Tap for Goodluck:</span>
      <span className="ml-2 font-bold">{count}</span>
    </Button>
  );
}
