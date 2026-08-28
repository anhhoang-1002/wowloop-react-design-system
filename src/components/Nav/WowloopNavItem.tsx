import React from 'react';
import { Repeat } from 'lucide-react';

export interface WowloopNavItemProps {
  isActive?: boolean;
  onClick?: () => void;
}

/**
 * WowloopNavItem for LibreChat Sidebar:
 * Clean white card container with subtle border matching the Wow Admin profile card style.
 */
export const WowloopNavItem: React.FC<WowloopNavItemProps> = ({ isActive = true, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs border text-left
        ${
          isActive
            ? 'bg-white dark:bg-slate-800 text-secondary dark:text-blue-400 border-slate-200/80 dark:border-slate-700'
            : 'bg-white/60 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800'
        }
      `}
    >
      <div className="w-7 h-7 rounded-lg bg-secondary-bg dark:bg-blue-950/80 text-secondary dark:text-blue-400 flex items-center justify-center shrink-0 border border-secondary/20 dark:border-blue-800/40">
        <Repeat className="h-4 w-4" />
      </div>
      <span className="font-extrabold text-slate-900 dark:text-slate-100">Wowloop SaaS</span>
      <span className="ml-auto text-[10px] bg-primary-vibrant text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-2xs">
        PRO
      </span>
    </button>
  );
};
