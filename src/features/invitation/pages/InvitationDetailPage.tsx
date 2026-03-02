import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

import InvitationCard from '../components/InvitationCard';
import { useInvitation } from '../hooks/useInvitation';

/**
 * InvitationDetailPage
 * Displays the invitation card and a QR code for check-in.
 * Supports fetching by UUID or Access Code.
 */
const InvitationDetailPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const { data: inviteData, eventData, loading, error } = useInvitation(code || null);

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <div style={{ textAlign: 'center' }}>
                <div className="loading-spinner" style={{ marginBottom: '1rem' }}></div>
                <p style={{ fontFamily: "'Outfit', sans-serif", opacity: 0.8 }}>Cargando tu invitación mágica...</p>
            </div>
        </div>
    );

    if (error || !inviteData) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '400px' }}>
                <h2 style={{ color: '#ff4d4d', marginBottom: '1rem' }}>¡Ups!</h2>
                <p style={{ marginBottom: '2rem', opacity: 0.9 }}>{error || 'No pudimos encontrar tu invitación.'}</p>
                <Link to="/access" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ChevronLeft size={18} /> Volver a intentar
                </Link>
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <InvitationCard data={inviteData} eventData={eventData ?? undefined} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card"
                style={{ marginTop: '2rem', textAlign: 'center', padding: '2rem' }}
            >
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600', color: 'var(--secondary)' }}>
                    Código de Acceso Digital
                </h3>

                <div style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '24px',
                    display: 'inline-block',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    border: '8px solid rgba(212, 163, 115, 0.1)'
                }}>
                    <QRCodeSVG
                        value={`INVITE:${inviteData.id}:${inviteData.recipient}`}
                        size={200}
                        level={"H"}
                        includeMargin={false}
                    />
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        Muestra este código en la entrada
                    </p>
                    <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        letterSpacing: '4px',
                        color: 'var(--secondary)',
                        textShadow: '0 0 10px rgba(212, 163, 115, 0.3)'
                    }}>
                        {inviteData.access_code}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default InvitationDetailPage;
