import React from 'react';
import { cn } from '../../lib/utils';

export interface VerticalTabItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface VerticalTabsProps {
  items: VerticalTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const VerticalTabs: React.FC<VerticalTabsProps> = ({
  items,
  activeId,
  onChange,
  className,
}) => {
  return (
    <div className={cn("w-full space-y-1.5 select-none", className)}>
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={cn(
              "w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer",
              tab.disabled && "opacity-40 cursor-not-allowed",
              isActive
                ? "bg-secondary-bg dark:bg-blue-950/80 border border-secondary/20 dark:border-blue-800/40 text-secondary dark:text-blue-300 font-extrabold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent"
            )}
          >
            {tab.icon && (
              <div
                className={cn(
                  "p-1.5 rounded-xl shrink-0 mt-0.5 transition-colors",
                  isActive
                    ? "bg-secondary text-white dark:bg-blue-600"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                )}
              >
                {tab.icon}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-xs font-bold truncate",
                    isActive ? "text-secondary dark:text-blue-300" : "text-slate-800 dark:text-slate-200"
                  )}
                >
                  {tab.label}
                </span>

                {tab.badge !== undefined && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold shrink-0 ml-2",
                      isActive
                        ? "bg-secondary text-white dark:bg-blue-500"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              {tab.description && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed truncate">
                  {tab.description}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
