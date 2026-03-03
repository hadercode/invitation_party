import React from 'react';
import { UserPlus, Users, Save, Calendar, Loader2 } from 'lucide-react';
import { useInvitationRegistration } from '../hooks/useInvitationRegistration';
import { INVITATION_MESSAGES } from '../../../core/constants/messages';
import GlassCard from '../../../shared/components/GlassCard';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

interface InvitationRegistrationFormProps {
    initialEventId?: string;
    onSuccess: () => void;
    onEventChange?: (eventId: string) => void;
}

/**
 * InvitationRegistrationForm
 * UI for registering new guests. Fully refactored for Enterprise standards.
 */
const InvitationRegistrationForm: React.FC<InvitationRegistrationFormProps> = (props) => {
    const {
        events,
        loadingEvents,
        register,
        handleSubmit,
        errors,
        isSubmitting
    } = useInvitationRegistration(props);

    if (loadingEvents) {
        return <LoadingSpinner message={INVITATION_MESSAGES.UI.LOADING_EVENTS} />;
    }

    return (
        <GlassCard
            as="form"
            onSubmit={handleSubmit}
            padding="1.5rem"
            style={{ marginBottom: '2rem' }}
            aria-label="Formulario de registro de invitados"
        >
            <h4 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
                <UserPlus size={18} /> {INVITATION_MESSAGES.UI.REGISTRATION_TITLE}
            </h4>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="input-group">
                    <label htmlFor="eventId" style={{ fontSize: '0.75rem' }}>
                        <Calendar size={12} /> {INVITATION_MESSAGES.UI.SELECT_EVENT_LABEL}
                    </label>
                    <select
                        id="eventId"
                        {...register('eventId', { required: INVITATION_MESSAGES.VALIDATION.EVENT_REQUIRED_FORM })}
                        className={errors.eventId ? 'input-error' : ''}
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
                    >
                        {events.map(event => (
                            <option key={event.id} value={event.id} style={{ background: '#081c15' }}>
                                {event.title} - {event.date}
                            </option>
                        ))}
                    </select>
                    {errors.eventId && <span className="error-text">{errors.eventId.message}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '1rem', alignItems: 'end' }}>
                    <div className="input-group">
                        <label htmlFor="recipient" style={{ fontSize: '0.75rem' }}>{INVITATION_MESSAGES.UI.RECIPIENT_LABEL}</label>
                        <input
                            id="recipient"
                            type="text"
                            placeholder={INVITATION_MESSAGES.UI.RECIPIENT_PLACEHOLDER}
                            {...register('recipient', { required: INVITATION_MESSAGES.VALIDATION.RECIPIENT_REQUIRED })}
                            className={errors.recipient ? 'input-error' : ''}
                        />
                        {errors.recipient && <span className="error-text">{errors.recipient.message}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="passes" style={{ fontSize: '0.75rem' }}>
                            <Users size={12} /> {INVITATION_MESSAGES.UI.PASSES_LABEL}
                        </label>
                        <input
                            id="passes"
                            type="number"
                            min="1"
                            {...register('passes', { valueAsNumber: true })}
                            className={errors.passes ? 'input-error' : ''}
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="btn-primary"
                style={{
                    width: '100%',
                    marginTop: '1.25rem',
                    padding: '0.6rem',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
            >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {isSubmitting ? INVITATION_MESSAGES.UI.REGISTERING_BUTTON : INVITATION_MESSAGES.UI.REGISTER_BUTTON}
            </button>
        </GlassCard>
    );
};

export default InvitationRegistrationForm;
