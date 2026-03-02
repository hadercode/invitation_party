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

            {/* Main Content: Single Column / 2 Rows */}
            <main style={{ flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.05)' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>

                    {/* Top: Registration Form */}
                    <section style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--secondary)' }}>
                                <UserPlus size={22} /> Registro de Invitados
                            </h3>
                            <div style={{ padding: '0.5rem 1rem', background: 'rgba(212, 163, 115, 0.05)', borderRadius: '12px', border: '1px dotted var(--glass-border)' }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                                    Selecciona el evento y completa los datos.
                                </p>
                            </div>
                        </div>

                        <InvitationRegistrationForm
                            initialEventId={initialEventId || undefined}
                            onSuccess={handleRegistrationSuccess}
                            onEventChange={handleEventChange}
                        />
                    </section>

                    {/* Bottom: Guest List */}
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
                            <Users size={22} />
                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Invitados Registrados</h3>
                        </div>

                        {activeEventId ? (
                            <InvitationList
                                eventId={activeEventId}
                                refreshTrigger={refreshTrigger}
                                onSelect={() => { }}
                            />
                        ) : (
                            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>
                                <p>Selecciona un evento para ver la lista de invitados...</p>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default InvitationManagementPage;
