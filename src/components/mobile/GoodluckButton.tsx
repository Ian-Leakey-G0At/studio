"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function GoodluckButton() {
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    setTapCount(prev => prev + 1);
  };

  return (
    <motion.button
      onClick={handleTap}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-2xl transition-colors duration-200 shadow-lg"
    >
      <span className="text-lg">
        Tap for Goodluck: {tapCount}
      </span>
    </motion.button>
  );
}