import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass' | 'neon';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {

        // Cleaner base shape
        const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium tracking-wide transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] uppercase';

        const variants = {
            // Solid, reliable red. Less outer glow.
            primary: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20 border border-white/5',
            secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/5',
            // Danger still needs to pop, but cleaner
            danger: 'bg-red-600 text-white animate-pulse-slow shadow-lg shadow-red-900/30',
            ghost: 'bg-transparent text-slate-400 hover:text-white',
            glass: 'bg-white/5 backdrop-blur-lg text-white border border-white/10 hover:bg-white/10',
            neon: 'bg-transparent border border-blue-500/30 text-blue-400 hover:bg-blue-500/5',
        };

        const sizes = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-5 text-sm',
            lg: 'h-12 px-8 text-base w-full',
            xl: 'h-16 text-lg w-full rounded-xl',
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.98 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={isLoading}
                {...props}
            >
                {isLoading ? (
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
