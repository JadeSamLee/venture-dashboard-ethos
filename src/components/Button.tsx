
import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', isLoading, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "btn-gradient focus:ring-blue-500/50",
      secondary: "glass-card border border-white/10 text-white hover:bg-white/10 focus:ring-white/25",
      outline: "border border-white/20 bg-transparent text-white hover:bg-white/5 focus:ring-white/25",
      ghost: "text-white hover:bg-white/5 focus:ring-white/25"
    };
    
    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded-md",
      md: "text-sm px-5 py-2.5 rounded-lg",
      lg: "text-base px-6 py-3 rounded-lg"
    };
    
    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
