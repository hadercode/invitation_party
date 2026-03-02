import React, { useEffect, useState } from 'react';
import { Trash2, Ticket, Search, Copy, Check, Share2, FileText } from 'lucide-react';
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
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [tableCopied, setTableCopied] = useState(false);

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

    const handleCopyTable = () => {
        const headers = ['Nombre', 'Pases', 'Código', 'Estado'].join('\t');
        const rows = filteredInvitations.map(inv => {
            const status = inv.status === 'SENT' ? 'Enviado' :
                inv.status === 'CONFIRMED' ? 'Confirmado' :
                    inv.status === 'DECLINED' ? 'Declinado' :
                        'Pendiente';
            return [
                inv.recipient,
                inv.passes,
                inv.access_code,
                status
            ].join('\t');
        }).join('\n');

        const content = `${headers}\n${rows}`;
        navigator.clipboard.writeText(content);
        setTableCopied(true);
        setTimeout(() => setTableCopied(false), 2000);
    };

    const handleWhatsAppShare = async (invitation: IInvitation) => {
        const baseUrl = window.location.origin;
        const inviteUrl = `${baseUrl}/invitation/${invitation.access_code}`;
        const message = `¡Hola ${invitation.recipient}! 👋%0A%0AEstás cordialmente invitado a nuestro evento especial. 🎉%0A%0APuedes ver tu invitación digital aquí: ${inviteUrl}%0A%0A¡Esperamos contar con tu presencia! ✨`;

        window.open(`https://wa.me/?text=${message}`, '_blank');

        // Auto-mark as SENT if it was PENDING
        if (invitation.status === 'PENDING') {
            await invitationService.updateInvitationStatus(invitation.id!, 'SENT');
            loadInvitations();
        }
    };

    const statusCounts = invitations.reduce((acc, inv) => {
        const s = inv.status || 'PENDING';
        acc[s] = (acc[s] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const toggleStatus = (status: string) => {
        setSelectedStatuses(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const filteredInvitations = invitations.filter(inv => {
        const matchesSearch = inv.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.access_code?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(inv.status || 'PENDING');

        return matchesSearch && matchesStatus;
    });

    const statusLabels: Record<string, { label: string, color: string }> = {
        'PENDING': { label: 'Pendientes', color: 'var(--text-muted)' },
        'SENT': { label: 'Enviados', color: '#74c69d' },
        'CONFIRMED': { label: 'Confirmados', color: '#4d96ff' },
        'DECLINED': { label: 'Declinados', color: '#ff4d4d' }
    };

    return (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
            {/* Header with Search and Copy Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                <h4 style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <Ticket size={18} /> Invitados Registrados
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flex: '1', maxWidth: '400px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={handleCopyTable}
                        style={{
                            background: tableCopied ? 'rgba(116, 198, 157, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${tableCopied ? '#74c69d' : 'var(--glass-border)'}`,
                            borderRadius: '8px',
                            padding: '0.4rem 0.8rem',
                            color: tableCopied ? '#74c69d' : 'white',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            transition: 'all 0.2s'
                        }}
                        title="Copiar tabla para Excel/Text"
                    >
                        {tableCopied ? <Check size={14} /> : <FileText size={14} />}
                        {tableCopied ? 'Copiado' : 'Copiar Tabla'}
                    </button>
                    <div style={{ position: 'relative', flex: '1', maxWidth: '250px' }}>
                        <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o código..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.4rem 0.6rem 0.4rem 2rem',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(0,0,0,0.2)',
                                fontSize: '0.8rem',
                                color: 'white',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Status Filters */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                {Object.entries(statusLabels).map(([status, { label, color }]) => (
                    <button
                        key={status}
                        onClick={() => toggleStatus(status)}
                        style={{
                            padding: '0.3rem 0.75rem',
                            borderRadius: '20px',
                            border: `1px solid ${selectedStatuses.includes(status) ? color : 'var(--glass-border)'}`,
                            background: selectedStatuses.includes(status) ? `${color}20` : 'transparent',
                            color: selectedStatuses.includes(status) ? color : 'var(--text-muted)',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            transition: 'all 0.2s',
                            opacity: selectedStatuses.length === 0 || selectedStatuses.includes(status) ? 1 : 0.6
                        }}
                    >
                        {label}
                        <span style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '10px',
                            fontSize: '0.65rem'
                        }}>
                            {statusCounts[status] || 0}
                        </span>
                    </button>
                ))}
            </div>

            {loading ? (
                <p style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>Cargando invitados...</p>
            ) : filteredInvitations.length === 0 ? (
                <p style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>No se encontraron invitados con los criterios seleccionados.</p>
            ) : (
                <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--secondary)', opacity: 0.8 }}>
                                <th style={{ padding: '0.5rem' }}>Nombre</th>
                                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Pases</th>
                                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Código</th>
                                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Estado</th>
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
                                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '12px',
                                            background: inv.status === 'SENT' ? 'rgba(116, 198, 157, 0.1)' :
                                                inv.status === 'CONFIRMED' ? 'rgba(77, 150, 255, 0.1)' :
                                                    inv.status === 'DECLINED' ? 'rgba(255, 77, 77, 0.1)' :
                                                        'rgba(255, 255, 255, 0.05)',
                                            color: inv.status === 'SENT' ? '#74c69d' :
                                                inv.status === 'CONFIRMED' ? '#4d96ff' :
                                                    inv.status === 'DECLINED' ? '#ff4d4d' :
                                                        'var(--text-muted)',
                                            border: `1px solid ${inv.status === 'SENT' ? 'rgba(116, 198, 157, 0.2)' :
                                                    inv.status === 'CONFIRMED' ? 'rgba(77, 150, 255, 0.2)' :
                                                        inv.status === 'DECLINED' ? 'rgba(255, 77, 77, 0.2)' :
                                                            'rgba(255, 255, 255, 0.1)'
                                                }`
                                        }}>
                                            {inv.status === 'SENT' ? 'Enviado' :
                                                inv.status === 'CONFIRMED' ? 'Confirmado' :
                                                    inv.status === 'DECLINED' ? 'Declinado' :
                                                        'Pendiente'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                            {inv.status === 'PENDING' && (
                                                <button
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        const res = await invitationService.updateInvitationStatus(inv.id!, 'SENT');
                                                        if (res.success) loadInvitations();
                                                    }}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#74c69d', opacity: 0.9, display: 'flex' }}
                                                    title="Marcar como Enviado"
                                                >
                                                    <Check size={16} />
                                                </button>
                                            )}
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
