'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {motion} from "framer-motion"

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // prevent hydration mismatch

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <motion.div key={currentTheme}
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.5 }}>
     <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="p-5 rounded-full"
    >
      {currentTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="text-blue-500 w-5 h-5 animate-in" />}
    </button>
    </motion.div>
  );
}
