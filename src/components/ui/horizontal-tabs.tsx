import React from 'react';
import { cn } from '../../lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface HorizontalTabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'underline' | 'segmented';
  className?: string;
}

export const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  items,
  activeId,
  onChange,
  variant = 'pills',
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center select-none overflow-x-auto scrollbar-none",
        variant === 'pills' && "gap-2",
        variant === 'segmented' && "bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700",
        variant === 'underline' && "border-b border-slate-200 dark:border-slate-800 gap-6",
        className
      )}
    >
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 text-xs font-bold transition-all shrink-0 cursor-pointer",
              tab.disabled && "opacity-40 cursor-not-allowed",
              
              // Pills Variant
              variant === 'pills' && [
                "px-3.5 py-2 rounded-xl",
                isActive
                  ? "bg-secondary-bg dark:bg-blue-950/80 text-secondary dark:text-blue-400 font-extrabold border border-secondary/20 dark:border-blue-800/40"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
              ],

              // Segmented Control Variant
              variant === 'segmented' && [
                "flex-1 justify-center px-3.5 py-1.5 rounded-lg",
                isActive
                  ? "bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 shadow-xs font-extrabold"
                  : "text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white",
              ],

              // Underline Tab Variant
              variant === 'underline' && [
                "pb-3 pt-1 border-b-2 -mb-px rounded-none",
                isActive
                  ? "border-secondary dark:border-blue-400 text-secondary dark:text-blue-400 font-extrabold"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200",
              ]
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold",
                  isActive
                    ? "bg-secondary text-white dark:bg-blue-500"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
