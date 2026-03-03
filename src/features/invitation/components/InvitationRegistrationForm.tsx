import React from 'react';
import { UserPlus, Users, Save, Calendar } from 'lucide-react';
import { useInvitationRegistration } from '../hooks/useInvitationRegistration';
import { INVITATION_MESSAGES } from '../../../core/constants/messages';

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
    const {
        events,
        loadingEvents,
        register,
        handleSubmit,
        errors,
        isSubmitting
    } = useInvitationRegistration({ initialEventId, onSuccess, onEventChange });

    return (
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
                <UserPlus size={18} /> {INVITATION_MESSAGES.UI.REGISTRATION_TITLE}
            </h4>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.75rem' }}><Calendar size={12} /> {INVITATION_MESSAGES.UI.SELECT_EVENT_LABEL}</label>
                    <select
                        {...register('eventId', { required: INVITATION_MESSAGES.VALIDATION.EVENT_REQUIRED_FORM })}
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
                            <option>{INVITATION_MESSAGES.UI.LOADING_EVENTS}</option>
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
                        <label style={{ fontSize: '0.75rem' }}>{INVITATION_MESSAGES.UI.RECIPIENT_LABEL}</label>
                        <input
                            type="text"
                            placeholder={INVITATION_MESSAGES.UI.RECIPIENT_PLACEHOLDER}
                            {...register('recipient', { required: INVITATION_MESSAGES.VALIDATION.RECIPIENT_REQUIRED })}
                            style={errors.recipient ? { borderColor: '#ff4d4d' } : {}}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label style={{ fontSize: '0.75rem' }}><Users size={12} /> {INVITATION_MESSAGES.UI.PASSES_LABEL}</label>
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
                <Save size={16} /> {isSubmitting ? INVITATION_MESSAGES.UI.REGISTERING_BUTTON : INVITATION_MESSAGES.UI.REGISTER_BUTTON}
            </button>
        </form>
    );
};

export default InvitationRegistrationForm;
