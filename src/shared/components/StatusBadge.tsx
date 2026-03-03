import React from 'react';
import { INVITATION_MESSAGES } from '../../core/constants/messages';

export type StatusType = 'PENDING' | 'SENT' | 'CONFIRMED' | 'DECLINED' | 'COMPLETED';

interface StatusBadgeProps {
    status: StatusType;
}

/**
 * Shared StatusBadge component for consistent status visualization.
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'SENT':
            case 'COMPLETED':
                return {
                    bg: 'rgba(116, 198, 157, 0.1)',
                    color: '#74c69d',
                    border: 'rgba(116, 198, 157, 0.2)',
                    label: INVITATION_MESSAGES.STATUS_LABELS.SENT
                };
            case 'CONFIRMED':
                return {
                    bg: 'rgba(77, 150, 255, 0.1)',
                    color: '#4d96ff',
                    border: 'rgba(77, 150, 255, 0.2)',
                    label: INVITATION_MESSAGES.STATUS_LABELS.CONFIRMED
                };
            case 'DECLINED':
                return {
                    bg: 'rgba(255, 77, 77, 0.1)',
                    color: '#ff4d4d',
                    border: 'rgba(255, 77, 77, 0.2)',
                    label: INVITATION_MESSAGES.STATUS_LABELS.DECLINED
                };
            default:
                return {
                    bg: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-muted)',
                    border: 'rgba(255, 255, 255, 0.1)',
                    label: INVITATION_MESSAGES.STATUS_LABELS.PENDING
                };
        }
    };

    const styles = getStatusStyles();

    return (
        <span style={{
            fontSize: '0.75rem',
            padding: '0.2rem 0.5rem',
            borderRadius: '12px',
            background: styles.bg,
            color: styles.color,
            border: `1px solid ${styles.border}`,
            display: 'inline-block',
            whiteSpace: 'nowrap'
        }}>
            {styles.label}
        </span>
    );
};

export default StatusBadge;
