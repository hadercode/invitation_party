import React from 'react';

interface LocationMapProps {
    url?: string;
}

/**
 * LocationMap Component
 * Displays a Google Maps iframe based on the provided URL.
 */
const LocationMap: React.FC<LocationMapProps> = ({ url }) => {
    const defaultUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.908026723244!2d-71.64487932410631!3d10.664246789477836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8999b3ad664317%3A0x23530b5962ac4c97!2sSALON%20DE%20FIESTA%20LA%20CHINITA!5e0!3m2!1ses!2sve!4v1772332016270!5m2!1ses!2sve";

    return (
        <div className="location-map">
            <iframe
                src={url || defaultUrl}
                width="100%"
                height="350"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div >
    );
};

export default LocationMap;