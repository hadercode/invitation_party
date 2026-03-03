import { z } from 'zod';

/**
 * Event Schema
 * Validation rules for the event configuration.
 */
export const eventSchema = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(100, 'El título es demasiado largo'),
    subtitle: z.string().max(100, 'El subtítulo es demasiado largo').optional().or(z.literal('')),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:MM)'),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:MM)'),
    venue: z.string().min(3, 'El lugar debe tener al menos 3 caracteres'),
    location: z.string().min(5, 'La ubicación debe ser más detallada'),
    googleMapsUrl: z.string().url('URL de Google Maps inválida').startsWith('https://', 'Debe ser una URL segura (https)'),
    videoUrl: z.string().url('URL de video inválida').optional().or(z.literal('')),
});

export type EventFormData = z.infer<typeof eventSchema>;
