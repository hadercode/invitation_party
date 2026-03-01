import React from 'react';
import { Link } from 'react-router-dom';
import InvitationForm from '../invitation/components/InvitationForm';
import { useInvitation } from '../invitation/hooks/useInvitation';
import { useEventForm } from '../event/hooks/useEventForm';
import EventForm from '../event/components/EventForm';
import InvitationCard from '../invitation/components/InvitationCard';
import { IEvent, IInvitation } from '../../core/types/invitation';
import InvitationRegistrationForm from '../invitation/components/InvitationRegistrationForm';
import InvitationList from '../invitation/components/InvitationList';

/**
 * AdminView Component
 * Extracted feature for invitation creation/management and event configuration.
 */
const AdminView: React.FC = () => {
    const { data: inviteData, updateData: updateInvite } = useInvitation();
    const { watchedData: eventData, eventId } = useEventForm();
    const [refreshTrigger, setRefreshTrigger] = React.useState(0);
    const [selectedGuest, setSelectedGuest] = React.useState<IInvitation | null>(null);

    const handleRegistrationSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleGuestSelect = (guest: IInvitation) => {
        setSelectedGuest(guest);
    };

    // Use selected guest data for preview if available, otherwise use default preview data
    const previewData: IInvitation = selectedGuest || inviteData;

    return (
        <div className="admin-view">
            <header style={{ textAlign: 'center', padding: '2rem 1rem 1rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
                    Party Maker
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Gestión Maestra de tu Celebración</p>
                <div style={{ marginTop: '1rem' }}>
                    <Link to="/access" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
                        👉 Probar Vista de Invitado
                    </Link>
                </div>
            </header>

            <main className="invitation-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 550px) 1fr', gap: '3rem', padding: '0 1rem', maxWidth: '1300px', margin: '0 auto', alignItems: 'start' }}>
                <div className="admin-controls" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <section>
                        <h3 style={{ opacity: 0.6, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                            1. Configuración del Evento
                        </h3>
                        <EventForm />
                    </section>

                    <section>
                        <h3 style={{ opacity: 0.6, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                            2. Gestión de Invitados
                        </h3>
                        {eventId ? (
                            <>
                                <InvitationRegistrationForm initialEventId={eventId || undefined} onSuccess={handleRegistrationSuccess} />
                                <InvitationList eventId={eventId} refreshTrigger={refreshTrigger} onSelect={handleGuestSelect} />
                            </>
                        ) : (
                            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', opacity: 0.7 }}>
                                <p>Cargando información del evento...</p>
                            </div>
                        )}
                    </section>
                </div>

                <div className="preview-section" style={{ position: 'sticky', top: '2rem' }}>
                    <h3 style={{ marginBottom: '2rem', opacity: 0.6, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>
                        Vista Previa {selectedGuest && <span style={{ color: 'var(--secondary)' }}> ( {selectedGuest.recipient} )</span>}
                    </h3>
                    <InvitationCard
                        data={previewData}
                        eventData={eventData ? {
                            ...eventData,
                            subtitle: eventData.subtitle || ''
                        } as IEvent : undefined}
                    />
                </div>
            </main>
        </div>
    );
};

export default AdminView;
