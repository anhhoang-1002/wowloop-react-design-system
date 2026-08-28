import React from 'react';
import { cn } from '../../lib/utils';

export interface SwitchProps {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "flex items-center justify-between p-3.5 rounded-2xl bg-surface dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-colors select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
      )}
    >
      {(label || description) && (
        <div className="flex flex-col pr-4">
          {label && <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{label}</span>}
          {description && <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{description}</span>}
        </div>
      )}

      <div
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
          checked ? "bg-secondary dark:bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
    </div>
  );
};
