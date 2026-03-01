import React from 'react';
import { Link } from 'react-router-dom';
import InvitationForm from '../invitation/components/InvitationForm';
import InvitationCard from '../invitation/components/InvitationCard';
import { useInvitation } from '../invitation/hooks/useInvitation';

/**
 * AdminView Component
 */
const AdminView: React.FC = () => {
    const { data, updateData, handleGenerate, loading } = useInvitation();

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

            <main className="invitation-container">
                <InvitationForm
                    data={data}
                    onUpdate={updateData}
                    onGenerate={handleGenerate}
                    isLoading={loading}
                />
                <InvitationCard data={data} />
            </main>
        </div>
    );
};

export default AdminView;
