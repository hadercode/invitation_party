import React from 'react';
import { Settings, Calendar, Clock, MapPin, Globe, Type, AlertCircle } from 'lucide-react';
import { useEventForm } from '../hooks/useEventForm';

/**
 * EventForm Component
 * Refactored to use react-hook-form and Zod validation.
 * Logic is isolated in the useEventForm custom hook.
 */
const EventForm: React.FC = () => {
    const { form, onSubmit, isSubmitting, loadError } = useEventForm();
    const { register, formState: { errors } } = form;

    if (loadError) {
        return (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#ff4d4d' }}>
                <AlertCircle size={40} style={{ marginBottom: '1rem' }} />
                <p>{loadError}</p>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="glass-card event-config-form" style={{ marginBottom: '2rem' }}>
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
                        style={errors.title ? { borderColor: '#ff4d4d' } : {}}
                    />
                    {errors.title && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '4px' }}>{errors.title.message}</span>}
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
                        style={errors.date ? { borderColor: '#ff4d4d' } : {}}
                    />
                    {errors.date && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '4px' }}>{errors.date.message}</span>}
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
                            style={errors.startTime ? { borderColor: '#ff4d4d' } : {}}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>
                            <Clock size={14} style={{ marginRight: '4px' }} /> Fin
                        </label>
                        <input
                            type="time"
                            {...register('endTime')}
                            style={errors.endTime ? { borderColor: '#ff4d4d' } : {}}
                        />
                    </div>
                </div>

                {/* Venue Name */}
                <div className="input-group">
                    <label>
                        <MapPin size={14} style={{ marginRight: '4px' }} /> Nombre del Lugar
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Salón de Fiestas..."
                        {...register('venue')}
                        style={errors.venue ? { borderColor: '#ff4d4d' } : {}}
                    />
                    {errors.venue && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '4px' }}>{errors.venue.message}</span>}
                </div>

                {/* City/Location */}
                <div className="input-group">
                    <label>
                        <Globe size={14} style={{ marginRight: '4px' }} /> Ciudad / Ubicación
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Maracaibo, Venezuela"
                        {...register('location')}
                        style={errors.location ? { borderColor: '#ff4d4d' } : {}}
                    />
                    {errors.location && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '4px' }}>{errors.location.message}</span>}
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
                        style={errors.googleMapsUrl ? { borderColor: '#ff4d4d' } : {}}
                    />
                    {errors.googleMapsUrl && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '4px' }}>{errors.googleMapsUrl.message}</span>}
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
        </form>
    );
};

export default EventForm;
