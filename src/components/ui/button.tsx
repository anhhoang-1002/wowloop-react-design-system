import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(90deg,#009959_0%,#52CC85_100%)] !text-white shadow-btn-green hover:opacity-90 font-extrabold active:scale-95",
        primaryGradient:
          "bg-[linear-gradient(90deg,#009959_0%,#52CC85_100%)] !text-white shadow-btn-green hover:opacity-90 font-extrabold",
        secondaryGradient:
          "bg-[linear-gradient(90deg,#FF3C3A_0%,#FF7A1D_100%)] !text-white shadow-solid-offset font-extrabold hover:opacity-95",
        deepBlue:
          "bg-[linear-gradient(90deg,#122DBD_0%,#465FF1_100%)] !text-white shadow-md hover:bg-secondary-hover font-extrabold",
        solidGreen:
          "bg-primary-vibrant !text-white hover:bg-primary-dark font-extrabold",
        outline:
          "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary-bg font-bold",
        ghost:
          "bg-transparent text-foreground hover:bg-black/5 font-bold",
        destructive:
          "bg-danger !text-white hover:bg-danger/90 font-extrabold",
      },
      size: {
        default: "h-11 px-6 py-2 text-base",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-lg px-8 text-lg",
        icon: "h-10 w-10",
      },
      pill: {
        true: "rounded-pill",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      pill: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, pill, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, pill, className }))}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        )}
        <span className="relative z-10">{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
