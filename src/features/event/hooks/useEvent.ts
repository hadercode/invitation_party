import { useState, useEffect } from 'react';
import { IEvent } from '../../../core/types/invitation';
import { eventService } from '../api/eventService';

/**
 * Hook to manage event configuration logic.
 */
export const useEvent = () => {
    const [eventData, setEventData] = useState<IEvent>({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        venue: '',
        location: '',
        googleMapsUrl: ''
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadEvent();
    }, []);

    const loadEvent = async () => {
        setLoading(true);
        try {
            const data = await eventService.getEventConfig();
            setEventData(data);
        } catch (err) {
            setError('Error al cargar la configuración del evento.');
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field: keyof IEvent, value: string) => {
        setEventData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const result = await eventService.saveEventConfig(eventData);
            if (result.success) {
                alert('Configuración guardada exitosamente.');
            }
        } catch (err) {
            setError('Error al guardar la configuración.');
        } finally {
            setSaving(false);
        }
    };

    return {
        eventData,
        loading,
        saving,
        error,
        updateField,
        handleSave,
        refresh: loadEvent
    };
};
