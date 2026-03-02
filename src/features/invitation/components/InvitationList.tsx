import React, { useEffect, useState } from 'react';
import { Trash2, Ticket, Search, Copy, Check, Share2 } from 'lucide-react';
import { IInvitation } from '../../../core/types/invitation';
import { invitationService } from '../api/invitationService';

interface InvitationListProps {
    eventId: string;
    refreshTrigger: number;
    onSelect: (invitation: IInvitation) => void;
}

/**
 * InvitationList
 * Displays a list of all guests with their access codes and options to manage them.
 */
const InvitationList: React.FC<InvitationListProps> = ({ eventId, refreshTrigger, onSelect }) => {
    const [invitations, setInvitations] = useState<IInvitation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const loadInvitations = async () => {
        if (!eventId) return;
        setLoading(true);
        const data = await invitationService.getInvitationsByEvent(eventId);
        setInvitations(data);
        setLoading(false);
    };

    useEffect(() => {
        loadInvitations();
    }, [eventId, refreshTrigger]);

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar este invitado?')) {
            const result = await invitationService.deleteInvitation(id);
            if (result.success) {
                loadInvitations();
            } else {
                alert('Error al eliminar: ' + result.error);
            }
        }
    };

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const handleWhatsAppShare = (invitation: IInvitation) => {
        const baseUrl = window.location.origin;
        const inviteUrl = `${baseUrl}/invitation/${invitation.access_code}`;
        const message = `¡Hola ${invitation.recipient}! 👋%0A%0AEstás cordialmente invitado a nuestro evento especial. 🎉%0A%0APuedes ver tu invitación digital aquí: ${inviteUrl}%0A%0A¡Esperamos contar con tu presencia! ✨`;
        window.open(`https://wa.me/?text=${message}`, '_blank');
    };

    const filteredInvitations = invitations.filter(inv =>
        inv.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.access_code?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Ticket size={18} /> Invitados Registrados
                </h4>
                <div style={{ position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '0.4rem 0.6rem 0.4rem 2rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', fontSize: '0.8rem', color: 'white', outline: 'none' }}
                    />
                </div>
            </div>

            {loading ? (
                <p style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>Cargando invitados...</p>
            ) : filteredInvitations.length === 0 ? (
                <p style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>No hay invitados registrados.</p>
            ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--secondary)', opacity: 0.8 }}>
                                <th style={{ padding: '0.5rem' }}>Nombre</th>
                                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Pases</th>
                                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Código</th>
                                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvitations.map((inv) => (
                                <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }} onClick={() => onSelect(inv)}>
                                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: '500' }}>{inv.recipient}</td>
                                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>{inv.passes}</td>
                                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                                            <code style={{ background: 'rgba(212, 163, 115, 0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: 'var(--secondary)', fontSize: '0.8rem' }}>
                                                {inv.access_code}
                                            </code>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleCopy(inv.access_code || ''); }}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
                                            >
                                                {copiedCode === inv.access_code ? <Check size={14} color="#74c69d" /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(inv); }}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#25D366', opacity: 0.9, display: 'flex' }}
                                                title="Reenviar por WhatsApp"
                                            >
                                                <Share2 size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(inv.id!); }}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4d', opacity: 0.7, display: 'flex' }}
                                                title="Eliminar invitado"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InvitationList;
