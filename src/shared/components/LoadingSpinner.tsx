import React from 'react';

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
    message?: string;
}

/**
 * Shared LoadingSpinner component for consistent feedback.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 40,
    color = 'var(--secondary)',
    message
}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            gap: '1rem'
        }}>
            <div
                className="loading-spinner"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderTopColor: color
                }}
            />
            {message && (
                <p style={{
                    opacity: 0.6,
                    fontSize: '0.9rem',
                    color: 'white',
                    fontFamily: "'Outfit', sans-serif"
                }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;
