import { useState, useEffect } from 'react';
import { IEvent } from '../../../core/types/invitation';
import { eventService } from '../api/eventService';

/**
 * useEvent Hook
 * Simplified hook for fetching event data without form logic.
 */
export const useEvent = () => {
    const [eventData, setEventData] = useState<IEvent | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const data = await eventService.getEventConfig();
                setEventData(data);
            } catch (err) {
                setError('Error al cargar la información del evento.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, []);

    return { eventData, loading, error };
};
