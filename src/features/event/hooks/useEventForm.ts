import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, EventFormData } from '../schemas/eventSchema';
import { eventService } from '../api/eventService';
import { IEvent } from '../../../core/types/invitation';

/**
 * useEventForm Hook
 * Manages form state, validation, and submission for the Event Configuration.
 */
export const useEventForm = (onSuccess?: () => void) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    const form = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            subtitle: '',
            date: '',
            startTime: '',
            endTime: '',
            venue: '',
            location: '',
            googleMapsUrl: ''
        }
    });

    const [eventId, setEventId] = useState<string | null>(null);

    // Load initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const data = await eventService.getEventConfig();
                if (data) {
                    setEventId(data.id || null);
                    form.reset({
                        ...data,
                        subtitle: data.subtitle || ''
                    });
                }
            } catch (error) {
                setLoadError('No se pudo cargar la configuración inicial.');
            }
        };

        fetchInitialData();
    }, [form]);

    const onSubmit = async (data: EventFormData) => {
        setIsSubmitting(true);
        try {
            // Ensure data matches IEvent (subtitle must be string)
            const eventPayload: IEvent = {
                ...data,
                subtitle: data.subtitle || ''
            };
            const result = await eventService.saveEventConfig(eventPayload);
            if (result.success) {
                // Refresh ID after save if it was new
                const updated = await eventService.getEventConfig();
                if (updated) setEventId(updated.id || null);

                alert('Configuración del evento guardada correctamente.');
                if (onSuccess) onSuccess();
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            alert('Error inesperado al guardar los datos.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const watchedData = form.watch();

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        isSubmitting,
        loadError,
        watchedData,
        eventId
    };
};
