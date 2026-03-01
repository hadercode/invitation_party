import React from 'react';
import { motion } from 'framer-motion';
import { Key, ArrowRight } from 'lucide-react';
import { useAccess } from '../hooks/useAccess';

/**
 * AccessPage Component
 */
const AccessPage: React.FC = () => {
    const { code, handleInputChange, error, loading, handleAccess } = useAccess();

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
                        />
                    </div>

                    {error && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '-0.5rem', marginBottom: '1rem' }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Validando...' : 'Ver mi Invitación'}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AccessPage;
