import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, ArrowRight, Camera, CheckCircle2 } from 'lucide-react';
import { useAccess } from '../hooks/useAccess';
import QRScanner from '../components/QRScanner';

/**
 * AccessPage Component
 */
const AccessPage: React.FC = () => {
    const {
        code,
        handleInputChange,
        error,
        loading,
        handleAccess,
        showScanner,
        setShowScanner,
        handleScanSuccess,
        showWelcome,
        inviteData,
        closeWelcome
    } = useAccess();

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}
            >
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ background: 'rgba(124, 58, 237, 0.2)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                        <Key size={32} color="#a78bfa" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Acceso a Invitación</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Ingresa el código que recibiste para ver los detalles de la fiesta.</p>
                </div>

                <form onSubmit={handleAccess}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Código de Invitación (ej: Tiana15)"
                            value={code}
                            onChange={handleInputChange}
                            style={{ textAlign: 'center', fontSize: '1.1rem', letterSpacing: '2px' }}
                            disabled={loading}
                            autoFocus
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => setShowScanner(true)}
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            disabled={loading}
                        >
                            <Camera size={20} />
                            Escanear QR
                        </button>

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Validando...' : 'Ver Invitación'}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </div>
                </form>

                {error && (
                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem' }}>
                        {error}
                    </p>
                )}
            </motion.div>

            {/* QR Scanner Modal */}
            {showScanner && (
                <QRScanner
                    onScanSuccess={handleScanSuccess}
                    onClose={() => setShowScanner(false)}
                />
            )}

            {/* Welcome Modal */}
            <AnimatePresence>
                {showWelcome && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        zIndex: 2000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            className="glass-card"
                            style={{
                                maxWidth: '400px',
                                width: '100%',
                                textAlign: 'center',
                                padding: '3rem 2rem',
                                border: '2px solid var(--secondary)'
                            }}
                        >
                            <div style={{
                                background: 'rgba(16, 185, 129, 0.2)',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem'
                            }}>
                                <CheckCircle2 size={48} color="#10b981" />
                            </div>

                            <h2 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '2rem',
                                marginBottom: '1rem',
                                color: 'var(--secondary)'
                            }}>
                                ¡Bienvenido/a!
                            </h2>

                            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                                {inviteData?.recipient}
                            </p>

                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                Tu invitación ha sido validada correctamente.
                            </p>

                            <button
                                onClick={closeWelcome}
                                className="btn-primary"
                                style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
                            >
                                Continuar
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccessPage;
