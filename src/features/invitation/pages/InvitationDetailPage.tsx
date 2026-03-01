import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2 } from 'lucide-react';
import InvitationCard from '../components/InvitationCard';
import { useInvitation } from '../hooks/useInvitation';

/**
 * InvitationDetailPage
 */
const InvitationDetailPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const { data, loading, error } = useInvitation(code || null);

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <p>Cargando invitación mágica...</p>
        </div>
    );

    if (error) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexDirection: 'column', gap: '1rem' }}>
            <p>{error}</p>
            <Link to="/access" className="btn-primary">Volver a intentar</Link>
        </div>
    );

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/access" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <ChevronLeft size={16} /> Volver
                </Link>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Share2 size={14} /> Compartir
                </button>
            </div>

            <InvitationCard data={data} />

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
                        value={`VERIFY:${code}:${data.recipient}`}
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
