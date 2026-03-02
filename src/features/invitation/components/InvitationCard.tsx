import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, Sparkles, Heart, Clock } from 'lucide-react';
import { IInvitation, IEvent } from '../../../core/types/invitation';

interface InvitationCardProps {
    data: IInvitation;
    eventData?: IEvent;
}

/**
 * InvitationCard Component
 * Pure presentation component to display invitation details.
 */
const InvitationCard: React.FC<InvitationCardProps> = ({ data, eventData }) => {
    // Fallback to defaults if eventData is not provided
    const displayTitle = eventData?.title || 'Mis Quince Años';
    const displaySubtitle = eventData?.subtitle || 'Natalia Castillo';
    const displayDate = eventData?.date || 'Sábado, 24 Mayo';
    const displayTime = eventData ? `${eventData.startTime} - ${eventData.endTime}` : '19:00 - 02:00';
    const displayVenue = eventData?.venue || 'Salón de Fiestas';
    const displayLocation = eventData?.location || 'Ubicación del evento';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card invitation-card"
            style={{ border: '2px solid rgba(212, 163, 115, 0.3)', width: '100%', maxWidth: '500px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}
        >
            {/* Water Lily Decoration top-left */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', opacity: 0.4, transform: 'rotate(-45deg)', zIndex: 0 }}>
                <svg width="40" height="40" viewBox="0 0 100 100">
                    <path d="M50 10 Q60 40 90 50 Q60 60 50 90 Q40 60 10 50 Q40 40 50 10" fill="var(--accent)" />
                    <circle cx="50" cy="50" r="5" fill="var(--bayou-gold)" />
                </svg>
            </div>

            <div className="card-header" style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                        filter: ['drop-shadow(0 0 2px var(--bayou-gold))', 'drop-shadow(0 0 12px var(--bayou-gold))', 'drop-shadow(0 0 2px var(--bayou-gold))']
                    }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    style={{ display: 'inline-block' }}
                >
                    <Sparkles size={48} color="var(--bayou-gold)" />
                </motion.div>

                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    color: 'var(--secondary)',
                    fontSize: '1.2rem',
                    margin: '0.5rem 0 0',
                    letterSpacing: '2px'
                }}>
                    {displayTitle}
                </h3>

                <h2 style={{
                    fontSize: '2.8rem',
                    marginTop: '0.2rem',
                    background: 'linear-gradient(to bottom, #f8f9fa, var(--secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.1',
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                    {displaySubtitle}
                </h2>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '0.8rem' }}>
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                            <Heart size={14} color="var(--accent)" fill="var(--accent)" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="card-content" style={{ display: 'grid', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(45, 106, 79, 0.12)',
                    borderRadius: '24px',
                    border: '1px solid rgba(212, 163, 115, 0.15)',
                    textAlign: 'center',
                    boxShadow: 'inset 0 0 20px rgba(255, 204, 51, 0.05)'
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '0.5rem' }}>Especialmente para</p>
                    <p style={{ fontSize: '2rem', fontWeight: '700', fontFamily: "'Playfair Display', serif", color: '#fff' }}>
                        {data.recipient || 'Invitado de Honor'}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="info-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ background: 'rgba(212, 163, 115, 0.1)', padding: '0.7rem', borderRadius: '50%', boxShadow: '0 0 10px rgba(212, 163, 115, 0.2)' }}>
                            <Users size={24} color="var(--secondary)" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Pases</p>
                            <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{data.passes || 1} Personas</p>
                        </div>
                    </div>

                    <div className="info-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ background: 'rgba(181, 131, 141, 0.1)', padding: '0.7rem', borderRadius: '50%', boxShadow: '0 0 10px rgba(181, 131, 141, 0.2)' }}>
                            <Calendar size={24} color="var(--accent)" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Fecha</p>
                            <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{displayDate}</p>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    background: 'rgba(212, 163, 115, 0.08)',
                    padding: '1rem',
                    borderRadius: '50px',
                    border: '1px solid rgba(212, 163, 115, 0.2)'
                }}>
                    <Clock size={20} color="var(--secondary)" />
                    <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'white' }}>{displayTime}</span>
                </div>

                <div className="map-section" style={{ marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', borderRadius: '20px', background: 'rgba(0,0,0,0.1)', justifyContent: 'center' }}>
                        <MapPin size={22} color="var(--secondary)" />
                        <div style={{ textAlign: 'center' }}>
                            <a href='https://maps.app.goo.gl/2Pc19MZTCYRH9Coi9' style={{ textDecoration: 'none' }}>
                                <p style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '0.5px', color: 'var(--secondary)' }}>{displayVenue}</p>
                            </a>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{displayLocation}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Water Lily Decoration bottom-right */}
            <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', opacity: 0.5 }}>
                <svg width="80" height="80" viewBox="0 0 100 100">
                    <path d="M50 0 C70 40 100 50 100 50 C100 50 70 60 50 100 C30 60 0 50 0 50 C0 50 30 40 50 0" fill="var(--primary)" />
                    <path d="M50 20 C65 45 80 50 80 50 C80 50 65 55 50 80 C35 55 20 50 20 50 C20 50 35 45 50 20" fill="var(--accent)" opacity="0.6" />
                    <circle cx="50" cy="50" r="10" fill="var(--bayou-gold)" />
                </svg>
            </div>
        </motion.div>
    );
};

export default InvitationCard;
