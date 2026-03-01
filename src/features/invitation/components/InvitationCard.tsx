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
    const displayMapsUrl = eventData?.googleMapsUrl;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card invitation-card"
            style={{ border: '2px solid rgba(212, 163, 115, 0.3)', width: '100%', maxWidth: '500px', margin: '0 auto' }}
        >
            <div className="card-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                        filter: ['drop-shadow(0 0 0px #d4a373)', 'drop-shadow(0 0 10px #d4a373)', 'drop-shadow(0 0 0px #d4a373)']
                    }}
                    transition={{ repeat: Infinity, duration: 5 }}
                    style={{ display: 'inline-block' }}
                >
                    <Sparkles size={48} color="#d4a373" />
                </motion.div>

                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    color: 'var(--secondary)',
                    fontSize: '1.2rem',
                    margin: '0.5rem 0 0'
                }}>
                    {displayTitle}
                </h3>

                <h2 style={{
                    fontSize: '2.5rem',
                    marginTop: '0.2rem',
                    background: 'linear-gradient(to bottom, #f8f9fa, #d4a373)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.2'
                }}>
                    {displaySubtitle}
                </h2>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <Heart size={14} color="#b5838d" fill="#b5838d" />
                    <Heart size={14} color="#b5838d" fill="#b5838d" />
                    <Heart size={14} color="#b5838d" fill="#b5838d" />
                </div>
            </div>

            <div className="card-content" style={{ display: 'grid', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div style={{
                    padding: '1.25rem',
                    background: 'rgba(45, 106, 79, 0.15)',
                    borderRadius: '20px',
                    border: '1px solid rgba(212, 163, 115, 0.2)',
                    textAlign: 'center'
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>Especialmente para</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: "'Playfair Display', serif" }}>
                        {data.recipient || 'Invitado de Honor'}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="info-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px' }}>
                        <div style={{ background: 'rgba(212, 163, 115, 0.15)', padding: '0.6rem', borderRadius: '50%' }}>
                            <Users size={22} color="#d4a373" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pases</p>
                            <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{data.passes || 1} Personas</p>
                        </div>
                    </div>

                    <div className="info-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px' }}>
                        <div style={{ background: 'rgba(181, 131, 141, 0.15)', padding: '0.6rem', borderRadius: '50%' }}>
                            <Calendar size={22} color="#b5838d" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Fecha</p>
                            <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{displayDate}</p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '16px' }}>
                    <Clock size={18} color="#d4a373" />
                    <span style={{ fontWeight: '600' }}>{displayTime}</span>
                </div>

                <div className="map-section">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', justifyContent: 'center' }}>
                        <MapPin size={18} color="#d4a373" />
                        <div style={{ textAlign: 'center' }}>
                            <a href='https://maps.app.goo.gl/2Pc19MZTCYRH9Coi9'><p style={{ fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.5px', color: 'var(--secondary)' }}>{displayVenue}</p></a>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{displayLocation}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.8, color: 'var(--text-muted)' }}>
                    "Tómate un descanso en el bayou y celebra conmigo"
                </p>
            </div>

            {/* Decorative leaf corner */}
            <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', opacity: 0.2 }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <path d="M0,100 C40,100 100,60 100,0 C100,40 60,100 0,100" fill="#2d6a4f" />
                </svg>
            </div>
        </motion.div >
    );
};

export default InvitationCard;
