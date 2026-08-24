import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  floatingLabel?: string;
  requiredStar?: boolean;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, floatingLabel, requiredStar = false, error, ...props }, ref) => {
    const isFloating = Boolean(floatingLabel);

    return (
      <div className="relative w-full mb-4">
        <div className="relative w-full">
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-sm border border-secondary/40 bg-white px-3 py-2 text-sm shadow-input-shadow transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              isFloating && "pt-5 pb-1",
              error && "bg-danger-bg border-danger focus-visible:ring-danger",
              className
            )}
            placeholder={isFloating ? " " : props.placeholder}
            ref={ref}
            {...props}
          />
          {isFloating && (
            <label className="absolute left-3 top-3 text-sm text-muted pointer-events-none transition-all peer-focus:top-1 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-secondary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[11px]">
              {floatingLabel}
              {requiredStar && <span className="text-danger"> *</span>}
            </label>
          )}
        </div>
        {error && <p className="text-xs font-medium text-danger mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
