'use client'

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
    >
      <AnimatedIcon dark={theme === 'dark'} />
    </motion.button>
  );
}

function AnimatedIcon({ dark }: { dark: boolean }) {
  return dark
    ? <Sun  className="w-4 h-4" style={{ color: 'var(--gold)' }} />
    : <Moon className="w-4 h-4" style={{ color: 'var(--gold)' }} />;
}
