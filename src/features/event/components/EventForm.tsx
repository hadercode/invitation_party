import React from 'react';
import { Settings, Calendar, Clock, MapPin, Globe, Type } from 'lucide-react';
import { IEvent } from '../../../core/types/invitation';

interface EventFormProps {
    data: IEvent;
    onUpdate: (field: keyof IEvent, value: string) => void;
    onSave: () => void;
    isSaving: boolean;
}

/**
 * EventForm
 * Component to manage general event settings.
 */
const EventForm: React.FC<EventFormProps> = ({ data, onUpdate, onSave, isSaving }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onUpdate(name as keyof IEvent, value);
    };

    return (
        <div className="glass-card event-config-form" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings size={20} /> Detalles del Evento
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <label>
                        <Type size={14} style={{ marginRight: '4px' }} /> Título del Evento
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Ej: Mis Quince Años"
                        value={data.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>
                        <Calendar size={14} style={{ marginRight: '4px' }} /> Fecha
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={data.date}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group" style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <label>
                            <Clock size={14} style={{ marginRight: '4px' }} /> Inicio
                        </label>
                        <input
                            type="time"
                            name="startTime"
                            value={data.startTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>
                            <Clock size={14} style={{ marginRight: '4px' }} /> Fin
                        </label>
                        <input
                            type="time"
                            name="endTime"
                            value={data.endTime}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>
                        <MapPin size={14} style={{ marginRight: '4px' }} /> Nombre del Lugar
                    </label>
                    <input
                        type="text"
                        name="venue"
                        placeholder="Ej: Salón de Fiestas..."
                        value={data.venue}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>
                        <Globe size={14} style={{ marginRight: '4px' }} /> Ciudad / Ubicación
                    </label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Ej: Maracaibo, Venezuela"
                        value={data.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <label>
                        <Globe size={14} style={{ marginRight: '4px' }} /> URL de Google Maps (Iframe src)
                    </label>
                    <input
                        type="text"
                        name="googleMapsUrl"
                        placeholder="Pega el src del iframe de Google Maps aquí"
                        value={data.googleMapsUrl}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <button
                className="btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={onSave}
                disabled={isSaving}
            >
                {isSaving ? 'Guardando...' : 'Guardar Información del Evento'}
            </button>
        </div>
    );
};

export default EventForm;
