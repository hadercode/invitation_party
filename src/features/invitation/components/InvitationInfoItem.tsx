import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface InvitationInfoItemProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    delay?: number;
    iconColor?: string;
    iconBg?: string;
    itemBg?: string;
    itemBorder?: string;
    shadowColor?: string;
    textColor?: string;
}

const InvitationInfoItem: React.FC<InvitationInfoItemProps> = ({
    icon: Icon,
    label,
    value,
    delay = 0,
    iconColor = 'var(--secondary)',
    iconBg = 'rgba(212, 163, 115, 0.1)',
    itemBg = 'rgba(255,255,255,0.03)',
    itemBorder = '1px solid rgba(255,255,255,0.05)',
    shadowColor = 'rgba(212, 163, 115, 0.2)',
    textColor = 'white'
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                background: itemBg,
                padding: '1.2rem',
                borderRadius: '20px',
                border: itemBorder
            }}
        >
            <div style={{
                background: iconBg,
                padding: '0.7rem',
                borderRadius: '50%',
                boxShadow: shadowColor ? `0 0 10px ${shadowColor}` : 'none',
                flexShrink: 0
            }}>
                <Icon size={24} color={iconColor} />
            </div>
            <div>
                <p style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '2px'
                }}>{label}</p>
                <p style={{
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    lineHeight: '1.2',
                    color: textColor
                }}>{value}</p>
            </div>
        </motion.div>
    );
};

export default InvitationInfoItem;
