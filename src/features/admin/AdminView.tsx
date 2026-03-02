import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, UserPlus } from 'lucide-react';
import { useAuth } from '../auth/hooks/useAuth';
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
    const { watchedData: eventData } = useEventForm();
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const [selectedGuest, setSelectedGuest] = React.useState<IInvitation | null>(null);

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    const defaultInvitation: IInvitation = {
        recipient: 'Nombre del Invitado',
        passes: 1,
        location: null,
        access_code: 'XXXXXX',
        status: 'PENDING'
    };

    // Use selected guest data for preview if available, otherwise use default preview data
    const previewData: IInvitation = selectedGuest || defaultInvitation;

    return (
        <div className="admin-view">
            <header style={{
                padding: '2rem 2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderBottom: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.2)',
                marginBottom: '2rem',
                position: 'relative'
            }}>
                <button
                    onClick={handleLogout}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '2rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '0.5rem 1rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
                >
                    <LogOut size={16} /> Salir
                </button>

                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #fff 0%, var(--secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.2rem', fontFamily: "'Playfair Display', serif" }}>
                    Party Maker Admin
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>GESTIÓN MAESTRA DEL BAYOU</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                    <Link to="/access" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem' }}>
                        👉 VISTA INVITADO
                    </Link>
                    <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
                    <Link to="/invitation/manage" style={{ color: 'var(--secondary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem' }}>
                        👥 GESTIONAR LISTA
                    </Link>
                </div>
            </header>

            <main className="invitation-container">
                <div className="admin-controls" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <section>
                        <h3 style={{ opacity: 0.6, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                            1. Configuración del Evento
                        </h3>
                        <EventForm />
                    </section>
                </div>

                <div className="preview-section">
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
