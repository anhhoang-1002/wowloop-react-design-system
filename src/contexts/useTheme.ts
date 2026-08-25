import { useState, useEffect, useLayoutEffect } from 'react';

export type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (storedPrefs === 'light' || storedPrefs === 'dark') {
      return storedPrefs;
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }
  return 'light'; // Default fallback
};

export const useTheme = (): [Theme, (theme: Theme | ((prev: Theme) => Theme)) => void] => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // useLayoutEffect prevents the "flash of incorrect theme" (FOIT) on load
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    localStorage.setItem('color-theme', theme);
  }, [theme]);

  // Real-time listener for OS preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('color-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return [theme, setTheme];
};
