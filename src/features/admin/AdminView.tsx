import React from 'react';
import { Link } from 'react-router-dom';
import InvitationForm from '../invitation/components/InvitationForm';
import { useInvitation } from '../invitation/hooks/useInvitation';
import { useEvent } from '../event/hooks/useEvent';
import EventForm from '../event/components/EventForm';
import InvitationCard from '../invitation/components/InvitationCard';

/**
 * AdminView Component
 * Extracted feature for invitation creation/management and event configuration.
 */
const AdminView: React.FC = () => {
    const { data: inviteData, updateData: updateInvite, handleGenerate, loading: inviteLoading } = useInvitation();
    const { eventData, updateField: updateEvent, handleSave: saveEvent, saving: eventSaving } = useEvent();

    return (
        <div className="admin-view">
            <header style={{ textAlign: 'center', padding: '2rem 1rem 1rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
                    Party Maker
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Crea invitaciones inolvidables en segundos</p>
                <div style={{ marginTop: '1rem' }}>
                    <Link to="/access" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
                        👉 Probar Vista de Invitado
                    </Link>
                </div>
            </header>

            <main className="invitation-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 500px) 1fr', gap: '2rem', padding: '0 1rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'start' }}>
                <div className="admin-controls" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <h3 style={{ opacity: 0.6, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>
                        Configuración del Evento
                    </h3>
                    <EventForm
                        data={eventData}
                        onUpdate={updateEvent}
                        onSave={saveEvent}
                        isSaving={eventSaving}
                    />
                </div>

                <div className="preview-section" style={{ position: 'sticky' }}>
                    <h3 style={{ marginBottom: '2rem', opacity: 0.6, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>
                        Vista Previa
                    </h3>
                    <InvitationCard data={inviteData} eventData={eventData} />
                </div>
            </main>
        </div>
    );
};

export default AdminView;
