import React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: 'default' | 'glass' | 'alert' | 'hud';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', children, ...props }, ref) => {

        const variants = {
            default: 'bg-[#13151f] border border-white/5 shadow-lg',
            glass: 'bg-white/5 backdrop-blur-md border border-white/10 shadow-xl',
            alert: 'bg-red-950/30 backdrop-blur-md border border-red-900/50 text-red-50',
            hud: 'bg-[#13151f]/80 backdrop-blur-sm border-x border-white/10 relative overflow-hidden',
        };

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('rounded-lg p-5 w-full relative group', variants[variant], className)}
                {...props}
            >
                {/* HUD Decorations - Thinner, more precise */}
                {variant === 'hud' && (
                    <>
                        {/* Subtle corner markers */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 rounded-tl-[2px]" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 rounded-tr-[2px]" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 rounded-bl-[2px]" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 rounded-br-[2px]" />
                    </>
                )}

                {children}
            </motion.div>
        );
    }
);

Card.displayName = "Card";
