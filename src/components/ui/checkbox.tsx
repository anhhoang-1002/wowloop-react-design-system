import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CheckboxProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <label
      className={cn(
        "flex items-start gap-3 p-3 rounded-xl bg-surface dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 select-none transition-colors",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
      )}
    >
      <div className="relative flex items-center mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            "w-4 h-4 rounded-md border flex items-center justify-center transition-all",
            checked
              ? "bg-secondary border-secondary dark:bg-blue-600 dark:border-blue-600 text-white"
              : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          )}
        >
          {checked && <Check size={12} className="stroke-[3]" />}
        </div>
      </div>

      <div className="flex flex-col text-xs text-left">
        <span className="font-bold text-slate-800 dark:text-slate-100">{label}</span>
        {description && <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{description}</span>}
      </div>
    </label>
  );
};
