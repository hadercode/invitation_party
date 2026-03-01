import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Users, UserPlus } from 'lucide-react';
import { useEventForm } from '../../event/hooks/useEventForm';
import InvitationRegistrationForm from '../components/InvitationRegistrationForm';
import InvitationList from '../components/InvitationList';

/**
 * InvitationManagementPage
 * Dedicated feature page for managing guest invitations.
 * Layout: Two columns with independent scrolling for the guest list.
 */
const InvitationManagementPage: React.FC = () => {
    const { eventId: initialEventId } = useEventForm();
    const [activeEventId, setActiveEventId] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Sync active event with initial event if not set
    useEffect(() => {
        if (initialEventId && !activeEventId) {
            setActiveEventId(initialEventId);
        }
    }, [initialEventId, activeEventId]);

    const handleRegistrationSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleEventChange = (id: string) => {
        setActiveEventId(id);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', color: 'white' }}>
            {/* Header */}
            <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <ChevronLeft size={20} /> <span style={{ fontSize: '0.9rem' }}>Panel Admin</span>
                    </Link>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: "'Playfair Display', serif", margin: 0 }}>
                        Gestión de Invitados
                    </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(212, 163, 115, 0.1)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={16} color="var(--secondary)" />
                        <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--secondary)' }}>Panel de Control</span>
                    </div>
                </div>
            </header>

            {/* Main Content: Two Columns */}
            <main style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(350px, 450px) 1fr', gap: 0, overflow: 'hidden' }}>

                {/* Left Column: Form (Static/Scrollable if small) */}
                <aside style={{ padding: '2rem', borderRight: '1px solid var(--glass-border)', overflowY: 'auto', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--secondary)' }}>
                            <UserPlus size={20} /> Nuevo Registro
                        </h3>
                        <InvitationRegistrationForm
                            initialEventId={initialEventId || undefined}
                            onSuccess={handleRegistrationSuccess}
                            onEventChange={handleEventChange}
                        />
                    </div>

                    <div style={{ padding: '1.5rem', background: 'rgba(212, 163, 115, 0.05)', borderRadius: '20px', border: '1px dotted var(--glass-border)' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            <strong>Tip:</strong> Selecciona el evento, registra al invitado y luego copia su código desde la lista de la derecha.
                        </p>
                    </div>
                </aside>

                {/* Right Column: Independent Scrollable List */}
                <section style={{ padding: '2rem', overflowY: 'auto', background: 'rgba(0,0,0,0.1)' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {activeEventId ? (
                            <InvitationList
                                eventId={activeEventId}
                                refreshTrigger={refreshTrigger}
                                onSelect={() => { }}
                            />
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5 }}>
                                <p>Selecciona un evento para ver la lista de invitados...</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default InvitationManagementPage;
