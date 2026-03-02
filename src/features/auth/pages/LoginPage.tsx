import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, LogIn, Sparkles } from 'lucide-react';
import { supabase } from '../../../core/database/connection';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from?.pathname || "/";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>
            {/* Ambient Fireflies */}
            <div className="firefly-container">
                {[...Array(15)].map((_, i) => (
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card tiana-border"
                style={{ maxWidth: '400px', width: '100%', padding: '3rem 2.5rem', textAlign: 'center' }}
            >
                <div style={{ marginBottom: '2.5rem' }}>
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        style={{ background: 'rgba(212, 163, 115, 0.15)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--secondary)' }}
                    >
                        <Sparkles size={32} color="var(--bayou-gold)" />
                    </motion.div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif", color: 'var(--secondary)' }}>
                        Portal Admin
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ingresa tus credenciales reales para entrar al Bayou.</p>
                </div>

                <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
                    <div className="input-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Mail size={14} /> Correo Electrónico
                        </label>
                        <input
                            type="email"
                            placeholder="tu@admin.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Lock size={14} /> Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}
                        >
                            {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', padding: '1rem', marginTop: '1rem', background: 'linear-gradient(135deg, var(--secondary) 0%, #8b5cf6 100%)', border: 'none' }}
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar al Panel'}
                        <LogIn size={18} />
                    </button>
                </form>

                <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)' }}>
                    Acceso restringido para organizadores
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
