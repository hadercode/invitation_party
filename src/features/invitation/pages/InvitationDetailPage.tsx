import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, Sparkles, AlertCircle, ChevronDown, MousePointer2 } from 'lucide-react';

import InvitationCard from '../components/InvitationCard';
import { useInvitation } from '../hooks/useInvitation';
import { INVITATION_MESSAGES } from '../../../core/constants/messages';
import GlassCard from '../../../shared/components/GlassCard';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

/**
 * InvitationDetailPage
 * Displays the invitation card and a QR code for check-in.
 * Integrated with TanStack Query and shared components.
 */
const InvitationDetailPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const { data: inviteData, eventData, isPending, error, updateStatus } = useInvitation(code || null);
    const [isSparkling, setIsSparkling] = React.useState(false);
    const [isShaking, setIsShaking] = React.useState(false);
    const [showStickyFooter, setShowStickyFooter] = React.useState(false);

    // Scroll handling for indicator and sticky footer
    const { scrollYProgress } = useScroll();
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    const rsvpRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowStickyFooter(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (rsvpRef.current) {
            observer.observe(rsvpRef.current);
        }

        return () => observer.disconnect();
    }, [inviteData]);

    const handleRSVP = async (status: 'CONFIRMED' | 'DECLINED') => {
        if (!inviteData?.id) return;

        if (status === 'CONFIRMED') {
            setIsSparkling(true);
            setTimeout(() => setIsSparkling(false), 4000);
        } else if (status === 'DECLINED') {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }

        updateStatus.mutate({ id: inviteData.id, newStatus: status }, {
            onError: () => {
                alert(INVITATION_MESSAGES.ERROR_CONNECTION_UPDATE);
            }
        });
    };

    if (isPending && !inviteData) {
        return <LoadingSpinner message="Cargando tu invitación mágica..." />;
    }

    if (error || !inviteData) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
                <GlassCard style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '400px' }}>
                    <AlertCircle size={48} color="#ff4d4d" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ color: '#ff4d4d', marginBottom: '1rem' }}>¡Ups!</h2>
                    <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
                        {error || INVITATION_MESSAGES.ERROR_NOT_FOUND}
                    </p>
                    <Link to="/access" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ChevronLeft size={18} /> Volver a intentar
                    </Link>
                </GlassCard>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem', position: 'relative', overflow: 'hidden' }}>
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
                <div ref={rsvpRef}>
                    <GlassCard
                        className="tiana-border"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ marginTop: '1.5rem', padding: '2rem', textAlign: 'center' }}
                    >
                        <h4 style={{ marginBottom: '1.5rem', color: 'var(--secondary)', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem' }}>
                            ¿Podrás acompañarnos?
                        </h4>

                        <div style={{ position: 'relative', width: '100%' }}>
                            {/* Magic Effects */}
                            <AnimatePresence>
                                {isSparkling && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: [0, 0.4, 0.6, 0.4, 0],
                                            scale: [1, 1.3, 1.5, 1.3, 1],
                                            rotate: [0, 180, 360]
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 4, ease: "easeInOut" }}
                                        style={{
                                            position: 'absolute',
                                            inset: '-30px',
                                            borderRadius: '32px',
                                            background: 'radial-gradient(circle, var(--bayou-glow) 0%, transparent 70%)',
                                            pointerEvents: 'none',
                                            zIndex: 5
                                        }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Sparkles explosion */}
                            <AnimatePresence>
                                {isSparkling && (
                                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
                                        {[...Array(50)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                                animate={{
                                                    opacity: [0, 1, 1, 0],
                                                    scale: [0, Math.random() * 2 + 1, 0],
                                                    x: (Math.random() - 0.5) * 600,
                                                    y: (Math.random() - 0.5) * 400,
                                                    rotate: [0, Math.random() * 360]
                                                }}
                                                transition={{
                                                    duration: Math.random() * 2.5 + 1.5,
                                                    ease: "easeOut",
                                                    delay: Math.random() * 0.4
                                                }}
                                                style={{ position: 'absolute', left: '50%', top: '50%' }}
                                            >
                                                <Sparkles
                                                    size={Math.random() * 35 + 15}
                                                    color={i % 2 === 0 ? "var(--bayou-gold)" : "var(--secondary)"}
                                                    fill={i % 2 === 0 ? "var(--bayou-gold)" : "var(--secondary)"}
                                                    style={{ filter: 'drop-shadow(0 0 15px var(--bayou-glow))' }}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                {(inviteData.status === 'PENDING' || inviteData.status === 'SENT' || inviteData.status === 'COMPLETED' || isSparkling) ? (
                                    <motion.div
                                        key="rsvp-buttons"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ display: 'flex', gap: '1rem', justifyContent: 'center', position: 'relative' }}
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleRSVP('CONFIRMED')}
                                            className="btn-primary"
                                            style={{
                                                background: 'linear-gradient(135deg, #10b981 0%, #065f46 100%)',
                                                flex: 1,
                                                border: 'none',
                                                position: 'relative',
                                                overflow: 'visible',
                                                boxShadow: isSparkling ? '0 0 50px var(--bayou-glow)' : 'none',
                                                zIndex: 10
                                            }}
                                            disabled={updateStatus.isPending}
                                        >
                                            <motion.span
                                                animate={isSparkling ? {
                                                    scale: [1, 1.1, 1],
                                                    color: ['#fff', 'var(--bayou-gold)', '#fff'],
                                                    textShadow: ['0 0 0px #fff', '0 0 20px var(--bayou-gold)', '0 0 0px #fff']
                                                } : {}}
                                                transition={{ duration: 1, repeat: 3 }}
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
                                            disabled={updateStatus.isPending}
                                        >
                                            {INVITATION_MESSAGES.STATUS_LABELS.DECLINED}
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="rsvp-status"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,204,51,0.05)', border: '1px solid rgba(255,204,51,0.1)', position: 'relative', zIndex: 1 }}
                                    >
                                        <p style={{ fontWeight: '500', color: '#fff', fontSize: '1.1rem' }}>
                                            Tu respuesta: <span style={{ color: inviteData.status === 'CONFIRMED' ? '#10b981' : (inviteData.status === 'DECLINED' ? '#ef4444' : 'var(--bayou-gold)'), fontWeight: '700' }}>
                                                {inviteData.status === 'CONFIRMED' ? INVITATION_MESSAGES.STATUS_LABELS.CONFIRMED_ALT : (inviteData.status === 'DECLINED' ? INVITATION_MESSAGES.STATUS_LABELS.DECLINED : INVITATION_MESSAGES.STATUS_LABELS.RECEIVED)}
                                            </span>
                                        </p>
                                        <button
                                            onClick={() => handleRSVP('PENDING' as any)}
                                            style={{ fontSize: '0.9rem', background: 'transparent', border: 'none', color: 'var(--secondary)', textDecoration: 'underline', marginTop: '1rem', cursor: 'pointer', fontWeight: '600' }}
                                            disabled={updateStatus.isPending}
                                        >
                                            Cambiar mi respuesta
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </GlassCard>
                </div>
            </motion.div>

            {/* Sticky Action Footer / Scroll Guide */}
            <AnimatePresence>
                {(inviteData.status === 'PENDING' || inviteData.status === 'SENT' || inviteData.status === 'COMPLETED') && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{
                            y: showStickyFooter ? 0 : 100,
                            opacity: showStickyFooter ? 1 : 0
                        }}
                        exit={{ y: 100, opacity: 0 }}
                        style={{
                            position: 'fixed',
                            bottom: '1.5rem',
                            left: '50%',
                            x: '-50%',
                            width: 'calc(100% - 2rem)',
                            maxWidth: '400px',
                            zIndex: 1000,
                            pointerEvents: showStickyFooter ? 'auto' : 'none',
                            opacity: scrollOpacity // Fade out as soon as user scrolls past threshold
                        }}
                    >
                        <button
                            onClick={() => {
                                window.scrollTo({
                                    top: 400,
                                    behavior: 'smooth'
                                });
                            }}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.8rem',
                                padding: '1rem',
                                background: 'linear-gradient(135deg, #10b981 0%, #065f46 100%)',
                                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                                borderRadius: '18px',
                                border: '2px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <ChevronDown size={20} />
                            <span style={{ fontWeight: '700' }}>Deslizar para ver más</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InvitationDetailPage;
