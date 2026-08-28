import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  requiredStar?: boolean;
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, requiredStar = false, error, helperText, ...props }, ref) => {
    return (
      <div className="relative w-full mb-4 text-left">
        {label && (
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
            {label}
            {requiredStar && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          className={cn(
            "flex min-h-[100px] w-full rounded-xl border border-secondary/30 dark:border-slate-700 bg-surface dark:bg-slate-800 p-3.5 text-xs text-foreground dark:text-slate-100 shadow-none focus-visible:shadow-input-shadow transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:border-secondary disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            error && "bg-danger-bg dark:bg-rose-950/30 border-danger focus-visible:ring-danger",
            className
          )}
          {...props}
        />

        {helperText && !error && (
          <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-1">{helperText}</p>
        )}
        {error && <p className="text-xs font-medium text-danger mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
