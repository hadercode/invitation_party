import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface LocationInfoItemProps {
    venue: string;
    location: string;
    mapUrl?: string;
    delay?: number;
}

const LocationInfoItem: React.FC<LocationInfoItemProps> = ({
    venue,
    location,
    mapUrl = '',
    delay = 0.4
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className="map-section"
            style={{ marginTop: '0.5rem' }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                padding: '1rem',
                borderRadius: '20px',
                background: 'rgba(0,0,0,0.1)',
                justifyContent: 'center'
            }}>
                <MapPin size={22} color="var(--secondary)" />
                <div style={{ textAlign: 'center' }}>
                    <a href={mapUrl} style={{ textDecoration: 'none' }}>
                        <p style={{
                            fontSize: '1rem',
                            fontWeight: '700',
                            letterSpacing: '0.5px',
                            color: 'var(--secondary)'
                        }}>{venue}</p>
                    </a>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{location}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default LocationInfoItem;
