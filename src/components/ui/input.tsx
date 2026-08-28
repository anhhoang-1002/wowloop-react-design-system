import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  floatingLabel?: string;
  requiredStar?: boolean;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, floatingLabel, requiredStar = false, error, ...props }, ref) => {
    const displayLabel = label || floatingLabel;
    const isFloating = Boolean(floatingLabel && !label);

    return (
      <div className="relative w-full mb-5 text-left">
        {/* Standard Label Above Input */}
        {displayLabel && !isFloating && (
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
            {displayLabel}
            {requiredStar && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div className="relative w-full">
          <input
            type={type}
            ref={ref}
            className={cn(
              "peer flex h-12 w-full rounded-md border border-secondary/30 dark:border-slate-700 bg-surface dark:bg-slate-800 px-4 text-sm text-foreground dark:text-slate-100 shadow-none focus-visible:shadow-input-shadow transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:border-secondary disabled:cursor-not-allowed disabled:opacity-50",
              isFloating && "pt-5 pb-1 placeholder-transparent",
              error && "bg-danger-bg dark:bg-rose-950/30 border-danger focus-visible:ring-danger",
              className
            )}
            placeholder={isFloating ? " " : props.placeholder}
            {...props}
          />

          {/* Floating Label */}
          {isFloating && (
            <label className="absolute left-4 top-3.5 text-sm text-slate-400 dark:text-slate-500 pointer-events-none transition-all duration-150 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-secondary dark:peer-focus:text-blue-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-secondary dark:peer-[:not(:placeholder-shown)]:text-blue-400">
              {floatingLabel}
              {requiredStar && <span className="text-danger ml-1">*</span>}
            </label>
          )}
        </div>

        {error && <p className="text-xs font-medium text-danger mt-1.5">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
