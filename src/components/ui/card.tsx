import * as React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "input-shadow" | "blue-shadow" | "light" | "pill" }
>(({ className, variant = "input-shadow", ...props }, ref) => {
  const variantStyles = {
    // Standard Card Style (Unified Rules Tab Card Shadow & Border)
    "input-shadow": "bg-white rounded-[15px] shadow-input-shadow border border-secondary/30",
    "blue-shadow": "bg-white rounded-[15px] shadow-input-shadow border border-secondary/30",
    light: "bg-white rounded-[15px] shadow-input-shadow border border-secondary/30",
    pill: "bg-white rounded-[52px] shadow-pill-shadow border border-secondary/20",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-200 overflow-hidden",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { hasDivider?: boolean }
>(({ className, hasDivider = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 px-6 pt-6 pb-5",
      hasDivider && "border-b border-border/80 mb-1",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-bold text-secondary leading-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-1.5", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 pt-5 pb-6 space-y-5", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center px-6 py-5 border-t border-border/80 bg-slate-50/50 mt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
