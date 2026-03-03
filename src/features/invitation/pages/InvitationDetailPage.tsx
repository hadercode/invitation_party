import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Sparkles } from 'lucide-react';

import InvitationCard from '../components/InvitationCard';
import { useInvitation } from '../hooks/useInvitation';

/**
 * InvitationDetailPage
 * Displays the invitation card and a QR code for check-in.
 * Supports fetching by UUID or Access Code.
 */
const InvitationDetailPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const { data: inviteData, eventData, loading, error, updateStatus } = useInvitation(code || null);
    const [isSparkling, setIsSparkling] = React.useState(false);
    const [isShaking, setIsShaking] = React.useState(false);

    const handleRSVP = async (status: 'CONFIRMED' | 'DECLINED') => {
        if (status === 'CONFIRMED') {
            setIsSparkling(true);
            setTimeout(() => setIsSparkling(false), 2000);
        } else {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }

        const result = await updateStatus(status);
        if (result.success) {
            // Optional: Show a toast or notification
            alert(status === 'CONFIRMED' ? '¡Gracias por confirmar!' : 'Lamentamos que no puedas asistir.');
        } else {
            alert('Error al actualizar tu respuesta. Inténtalo de nuevo.');
        }
    };

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
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem', position: 'relative' }}>
            {/* Ambient Fireflies */}
            <div className="firefly-container">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="firefly"
                        style={{
                            '--x': `${Math.random() * 200 - 100}px`,
                            '--y': `${Math.random() * -200 - 50}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        } as any}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <InvitationCard data={inviteData} eventData={eventData ?? undefined} />

                {/* RSVP Section */}
                <motion.div
                    className="glass-card tiana-border"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ marginTop: '1.5rem', padding: '2rem', textAlign: 'center' }}
                >
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--secondary)', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem' }}>
                        ¿Podrás acompañarnos?
                    </h4>
                    {inviteData.status === 'PENDING' || inviteData.status === 'COMPLETED' ? (
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', position: 'relative' }}>
                            {/* Sparkles effect for Confirmation */}
                            <AnimatePresence>
                                {isSparkling && (
                                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                                animate={{
                                                    opacity: [0, 1, 0],
                                                    scale: [0, 1.2, 0],
                                                    x: (Math.random() - 0.5) * 200,
                                                    y: (Math.random() - 0.5) * 150
                                                }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                style={{ position: 'absolute', left: '50%', top: '50%' }}
                                            >
                                                <Sparkles size={Math.random() * 20 + 10} color="var(--bayou-gold)" fill="var(--bayou-gold)" />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRSVP('CONFIRMED')}
                                className="btn-primary"
                                style={{ background: 'linear-gradient(135deg, #10b981 0%, #065f46 100%)', flex: 1, border: 'none', position: 'relative', overflow: 'hidden' }}
                            >
                                <motion.span
                                    animate={isSparkling ? { scale: [1, 1.2, 1], color: ['#fff', 'var(--bayou-gold)', '#fff'] } : {}}
                                >
                                    Confirmar Asistencia
                                </motion.span>
                            </motion.button>

                            <motion.button
                                animate={isShaking ? { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } } : {}}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRSVP('DECLINED')}
                                className="btn-secondary"
                                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}
                            >
                                Declinar
                            </motion.button>
                        </div>
                    ) : (
                        <div style={{ padding: '1rem', borderRadius: '16px', background: 'rgba(255,204,51,0.05)', border: '1px solid rgba(255,204,51,0.1)' }}>
                            <p style={{ fontWeight: '500', color: '#fff' }}>
                                Tu respuesta: <span style={{ color: inviteData.status === 'CONFIRMED' ? '#10b981' : '#ef4444', fontWeight: '700' }}>
                                    {inviteData.status === 'CONFIRMED' ? '¡Confirmada!' : 'Declinada'}
                                </span>
                            </p>
                            <button
                                onClick={() => handleRSVP(inviteData.status === 'CONFIRMED' ? 'PENDING' as any : 'PENDING' as any)}
                                style={{ fontSize: '0.85rem', background: 'transparent', border: 'none', color: 'var(--secondary)', textDecoration: 'underline', marginTop: '0.8rem', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Cambiar mi respuesta
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default InvitationDetailPage;
