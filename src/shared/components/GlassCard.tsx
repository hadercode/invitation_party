import React from 'react';
import { motion, HTMLMotionProps, SVGMotionProps } from 'framer-motion';

type MotionElement = 'div' | 'form' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'nav' | 'main';

interface GlassCardProps extends HTMLMotionProps<any> {
    as?: MotionElement;
    padding?: string;
    margin?: string;
    children: React.ReactNode;
}

/**
 * Shared GlassCard component with glassmorphism styles.
 * Supports dynamic HTML elements via 'as' prop.
 */
const GlassCard: React.FC<GlassCardProps> = ({
    children,
    as = 'div',
    padding = '1.5rem',
    margin = '0',
    style,
    ...props
}) => {
    const Component = motion[as as keyof typeof motion] as any;

    return (
        <Component
            className="glass-card"
            style={{
                padding,
                margin,
                ...style
            }}
            {...props}
        >
            {children}
        </Component>
    );
};

export default GlassCard;
