import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

import InvitationCard from '../components/InvitationCard';
import { useInvitation } from '../hooks/useInvitation';
import { useEvent } from '@/features/event/hooks/useEvent';

/**
 * InvitationDetailPage
 */
const InvitationDetailPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const { data: inviteData, loading: inviteLoading, error: inviteError } = useInvitation(code || null);
    const { eventData, loading: eventLoading } = useEvent();

    const loading = inviteLoading || eventLoading;

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <p>Cargando invitación mágica...</p>
        </div>
    );

    if (inviteError) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexDirection: 'column', gap: '1rem' }}>
            <p>{inviteError}</p>
            <Link to="/access" className="btn-primary">Volver a intentar</Link>
        </div>
    );

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
            <InvitationCard data={inviteData} eventData={eventData ?? undefined} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card"
                style={{ marginTop: '2rem', textAlign: 'center' }}
            >
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Código de Verificación QR</h3>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', display: 'inline-block', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                    <QRCodeSVG
                        value={`VERIFY:${code}:${inviteData.recipient}`}
                        size={180}
                        level={"H"}
                        includeMargin={false}
                    />
                </div>
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Presenta este código en la entrada para verificar tu acceso.
                </p>
                <div style={{ marginTop: '0.5rem', fontWeight: '700', letterSpacing: '2px', color: 'var(--primary)' }}>
                    {code}
                </div>
            </motion.div>
        </div>
    );
};

export default InvitationDetailPage;
