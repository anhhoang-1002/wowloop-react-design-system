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
    // If standard label is provided or no floating label, render label above input box
    const displayLabel = label || floatingLabel;
    const isFloating = Boolean(floatingLabel && !label);

    return (
      <div className="relative w-full mb-5 text-left">
        {/* Standard Label Above Input (Wowsuite Style) */}
        {displayLabel && !isFloating && (
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            {displayLabel}
            {requiredStar && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div className="relative w-full">
          <input
            type={type}
            ref={ref}
            className={cn(
              "peer flex h-12 w-full rounded-md border border-secondary/30 bg-white px-4 text-sm text-slate-900 shadow-input-shadow transition-all placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:border-secondary disabled:cursor-not-allowed disabled:opacity-50",
              isFloating && "pt-5 pb-1 placeholder-transparent",
              error && "bg-danger-bg border-danger focus-visible:ring-danger",
              className
            )}
            placeholder={isFloating ? " " : props.placeholder}
            {...props}
          />

          {/* Floating Label (Triggers when input has class `peer`) */}
          {isFloating && (
            <label className="absolute left-4 top-3.5 text-sm text-slate-400 pointer-events-none transition-all duration-150 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-secondary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-secondary">
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
