import React from 'react';
import { cn } from '../../lib/utils';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  showValueBadge?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  showValueBadge = true,
  valuePrefix = '',
  valueSuffix = '',
  className,
  ...props
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full space-y-2 text-left select-none">
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            {label}
          </label>
        )}
        {showValueBadge && (
          <span className="text-xs font-mono font-extrabold text-secondary dark:text-blue-400 bg-secondary-bg dark:bg-blue-950/80 px-2 py-0.5 rounded-md border border-secondary/20 dark:border-blue-800/40">
            {valuePrefix}{value}{valueSuffix}
          </span>
        )}
      </div>

      <div className="relative flex items-center w-full h-5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={cn(
            "w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-700 accent-secondary focus:outline-none",
            className
          )}
          style={{
            background: `linear-gradient(to right, #122DBD 0%, #122DBD ${percentage}%, #CBD5E1 ${percentage}%, #CBD5E1 100%)`,
          }}
          {...props}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 font-mono font-semibold">
        <span>{valuePrefix}{min}{valueSuffix}</span>
        <span>{valuePrefix}{max}{valueSuffix}</span>
      </div>
    </div>
  );
};
