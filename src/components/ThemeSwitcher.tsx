import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../contexts/ThemeContext';

export const ThemeSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center h-9 px-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 select-none cursor-pointer
        ${isDark ? 'bg-slate-800 border border-slate-700 text-amber-300' : 'bg-slate-100 border border-slate-200 text-slate-700'}
        ${className}
      `}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle Theme"
    >
      <div className="flex items-center gap-1.5 text-xs font-bold">
        {isDark ? (
          <>
            <Moon size={15} className="text-amber-300 fill-amber-300/20 animate-in spin-in-90 duration-300" />
            <span className="text-slate-200">Dark</span>
          </>
        ) : (
          <>
            <Sun size={15} className="text-amber-500 fill-amber-500/20 animate-in spin-in-90 duration-300" />
            <span className="text-slate-700">Light</span>
          </>
        )}
      </div>
    </button>
  );
};
