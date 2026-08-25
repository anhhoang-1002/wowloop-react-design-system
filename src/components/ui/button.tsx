import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex flex-row items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2.5 cursor-pointer leading-none shrink-0 shadow-sm hover:shadow-md active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(90deg,#009959_0%,#52CC85_100%)] !text-white hover:opacity-92 font-extrabold",
        primaryGradient:
          "bg-[linear-gradient(90deg,#009959_0%,#52CC85_100%)] !text-white hover:opacity-92 font-extrabold",
        secondaryGradient:
          "bg-[linear-gradient(90deg,#FF3C3A_0%,#FF7A1D_100%)] !text-white hover:opacity-92 font-extrabold",
        deepBlue:
          "bg-[linear-gradient(90deg,#122DBD_0%,#465FF1_100%)] !text-white hover:opacity-92 font-extrabold",
        solidGreen:
          "bg-primary-vibrant !text-white hover:bg-primary-dark font-extrabold",
        outline:
          "border-2 border-secondary text-secondary bg-white hover:bg-secondary-bg font-bold shadow-none",
        ghost:
          "bg-transparent text-foreground hover:bg-black/5 font-bold shadow-none",
        destructive:
          "bg-danger !text-white hover:bg-danger/90 font-extrabold",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-base min-w-max",
        sm: "h-9 rounded-md px-4 py-2 text-xs min-w-max",
        lg: "h-14 rounded-lg px-8 py-3.5 text-lg min-w-max",
        icon: "h-10 w-10 shrink-0",
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
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
        )}
        <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
