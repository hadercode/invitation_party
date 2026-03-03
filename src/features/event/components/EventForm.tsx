import React from 'react';
import { Settings, Calendar, Clock, MapPin, Globe, Type, AlertCircle, Video } from 'lucide-react';
import { useEventForm } from '../hooks/useEventForm';
import GlassCard from '../../../shared/components/GlassCard';

/**
 * EventForm Component
 * Refactored to use react-hook-form and Zod validation.
 * Integrated with shared GlassCard.
 */
const EventForm: React.FC = () => {
    const { form, onSubmit, isSubmitting, loadError } = useEventForm();
    const { register, formState: { errors } } = form;

    if (loadError) {
        return (
            <GlassCard style={{ padding: '2rem', textAlign: 'center', color: '#ff4d4d' }}>
                <AlertCircle size={40} style={{ marginBottom: '1rem' }} />
                <p>{loadError}</p>
            </GlassCard>
        );
    }

    return (
        <GlassCard
            as="form"
            onSubmit={onSubmit}
            className="event-config-form"
            style={{ marginBottom: '2rem' }}
        >
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings size={20} /> Detalles del Evento
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Event Title */}
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <label>
                        <Type size={14} style={{ marginRight: '4px' }} /> Título del Evento
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Mis Quince Años"
                        {...register('title')}
                        className={errors.title ? 'input-error' : ''}
                    />
                    {errors.title && <span className="error-text">{errors.title.message}</span>}
                </div>

                {/* Event Subtitle */}
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <label>
                        <Type size={14} style={{ marginRight: '4px' }} /> Subtítulo (Nombre)
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Natalia Castillo"
                        {...register('subtitle')}
                    />
                </div>

                {/* Date */}
                <div className="input-group">
                    <label>
                        <Calendar size={14} style={{ marginRight: '4px' }} /> Fecha
                    </label>
                    <input
                        type="date"
                        {...register('date')}
                        className={errors.date ? 'input-error' : ''}
                    />
                    {errors.date && <span className="error-text">{errors.date.message}</span>}
                </div>

                {/* Times */}
                <div className="input-group" style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <label>
                            <Clock size={14} style={{ marginRight: '4px' }} /> Inicio
                        </label>
                        <input
                            type="time"
                            {...register('startTime')}
                            className={errors.startTime ? 'input-error' : ''}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>
                            <Clock size={14} style={{ marginRight: '4px' }} /> Fin
                        </label>
                        <input
                            type="time"
                            {...register('endTime')}
                            className={errors.endTime ? 'input-error' : ''}
                        />
                    </div>
                </div>

                {/* Venue Name */}
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <label>
                        <MapPin size={14} style={{ marginRight: '4px' }} /> Nombre del Lugar
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Salón de Fiestas..."
                        {...register('venue')}
                        className={errors.venue ? 'input-error' : ''}
                    />
                    {errors.venue && <span className="error-text">{errors.venue.message}</span>}
                </div>

                {/* City/Location */}
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <label>
                        <Globe size={14} style={{ marginRight: '4px' }} /> Ciudad / Ubicación
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Maracaibo, Venezuela"
                        {...register('location')}
                        className={errors.location ? 'input-error' : ''}
                    />
                    {errors.location && <span className="error-text">{errors.location.message}</span>}
                </div>

                {/* Google Maps URL */}
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <label>
                        <Globe size={14} style={{ marginRight: '4px' }} /> URL de Google Maps (Iframe src)
                    </label>
                    <input
                        type="text"
                        placeholder="Pega el src del iframe de Google Maps aquí"
                        {...register('googleMapsUrl')}
                        className={errors.googleMapsUrl ? 'input-error' : ''}
                    />
                    {errors.googleMapsUrl && <span className="error-text">{errors.googleMapsUrl.message}</span>}
                </div>

                {/* Video URL */}
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <label>
                        <Video size={14} style={{ marginRight: '4px' }} /> URL de Video (YouTube/Direct)
                    </label>
                    <input
                        type="text"
                        placeholder="Pega la URL del video de la invitación"
                        {...register('videoUrl')}
                        className={errors.videoUrl ? 'input-error' : ''}
                    />
                    {errors.videoUrl && <span className="error-text">{errors.videoUrl.message}</span>}
                </div>
            </div>

            <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Guardando...' : 'Guardar Información del Evento'}
            </button>
        </GlassCard>
    );
};

export default EventForm;
