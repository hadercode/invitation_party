import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserPlus, Users, Save, Calendar } from 'lucide-react';
import { invitationService } from '../api/invitationService';
import { eventService } from '../../event/api/eventService';
import { IEvent } from '../../../core/types/invitation';

interface RegistrationFormData {
    eventId: string;
    recipient: string;
    passes: number;
}

interface InvitationRegistrationFormProps {
    initialEventId?: string;
    onSuccess: () => void;
    onEventChange?: (eventId: string) => void;
}

/**
 * InvitationRegistrationForm
 * Allows admin to register new guests linked to a selected event.
 */
const InvitationRegistrationForm: React.FC<InvitationRegistrationFormProps> = ({ initialEventId, onSuccess, onEventChange }) => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<RegistrationFormData>({
        defaultValues: {
            eventId: initialEventId || '',
            recipient: '',
            passes: 1
        }
    });

    const selectedEventId = watch('eventId');

    // Load available events
    useEffect(() => {
        const fetchEvents = async () => {
            const data = await eventService.getAllEvents();
            setEvents(data);
            setLoadingEvents(false);

            // If we have an initial ID, ensure it's selected
            if (initialEventId) {
                setValue('eventId', initialEventId);
            } else if (data.length > 0 && !selectedEventId) {
                setValue('eventId', data[0].id || '');
            }
        };
        fetchEvents();
    }, [initialEventId, setValue, selectedEventId]);

    // Notify parent when event selection changes
    useEffect(() => {
        if (selectedEventId && onEventChange) {
            onEventChange(selectedEventId);
        }
    }, [selectedEventId, onEventChange]);

    const onSubmit = async (data: RegistrationFormData) => {
        if (!data.eventId) {
            alert('Por favor selecciona un evento.');
            return;
        }

        const result = await invitationService.createInvitation({
            event_id: data.eventId,
            recipient: data.recipient,
            passes: data.passes
        });

        if (result.success) {
            reset({
                eventId: data.eventId,
                recipient: '',
                passes: 1
            });
            onSuccess();
        } else {
            alert('Error al registrar invitado: ' + result.error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
                <UserPlus size={18} /> Registrar Nuevo Invitado
            </h4>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.75rem' }}><Calendar size={12} /> Seleccionar Evento</label>
                    <select
                        {...register('eventId', { required: 'El evento es obligatorio' })}
                        style={{
                            width: '100%',
                            background: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '12px',
                            padding: '0.85rem 1rem',
                            color: 'white',
                            fontFamily: "'Outfit', sans-serif",
                            outline: 'none'
                        }}
                        disabled={loadingEvents}
                    >
                        {loadingEvents ? (
                            <option>Cargando eventos...</option>
                        ) : (
                            events.map(event => (
                                <option key={event.id} value={event.id} style={{ background: '#081c15' }}>
                                    {event.title} - {event.date}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '1rem', alignItems: 'end' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.75rem' }}>Nombre del Invitado / Familia</label>
                        <input
                            type="text"
                            placeholder="Ej: Familia Rodriguez"
                            {...register('recipient', { required: 'El nombre es obligatorio' })}
                            style={errors.recipient ? { borderColor: '#ff4d4d' } : {}}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.75rem' }}><Users size={12} /> Pases</label>
                        <input
                            type="number"
                            min="1"
                            {...register('passes', { valueAsNumber: true })}
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '1.25rem', padding: '0.6rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                disabled={isSubmitting}
            >
                <Save size={16} /> {isSubmitting ? 'Registrando...' : 'Registrar Invitado'}
            </button>
        </form>
    );
};

export default InvitationRegistrationForm;
