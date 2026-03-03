import React from 'react';
import { Trash2, Copy, Check, Share2 } from 'lucide-react';
import { IInvitation } from '../../../core/types/invitation';

interface InvitationTableProps {
    invitations: IInvitation[];
    loading: boolean;
    copiedCode: string | null;
    onCopy: (code: string) => void;
    onWhatsAppShare: (invitation: IInvitation) => void;
    onDelete: (id: string) => void;
    onUpdateStatus: (id: string, status: IInvitation['status']) => void;
    onSelect: (invitation: IInvitation) => void;
}

const InvitationTable: React.FC<InvitationTableProps> = ({
    invitations,
    loading,
    copiedCode,
    onCopy,
    onWhatsAppShare,
    onDelete,
    onUpdateStatus,
    onSelect
}) => {
    if (loading) {
        return (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
                <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
                <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Cargando invitados registrados...</p>
            </div>
        );
    }

    if (invitations.length === 0) {
        return (
            <div style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>
                <p>No se encontraron invitados con los criterios seleccionados.</p>
            </div>
        );
    }

    return (
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
                    {invitations.map((inv) => (
                        <tr
                            key={inv.id}
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.2s' }}
                            onClick={() => onSelect(inv)}
                            className="hover-row"
                        >
                            <td style={{ padding: '0.75rem 0.5rem', fontWeight: '500' }}>{inv.recipient}</td>
                            <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>{inv.passes}</td>
                            <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                                    <code style={{ background: 'rgba(212, 163, 115, 0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: 'var(--secondary)', fontSize: '0.8rem' }}>
                                        {inv.access_code}
                                    </code>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onCopy(inv.access_code || ''); }}
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
                                                await onUpdateStatus(inv.id!, 'SENT');
                                            }}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#74c69d', opacity: 0.9, display: 'flex' }}
                                            title="Marcar como Enviado"
                                        >
                                            <Check size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onWhatsAppShare(inv); }}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#25D366', opacity: 0.9, display: 'flex' }}
                                        title="Reenviar por WhatsApp"
                                    >
                                        <Share2 size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDelete(inv.id!); }}
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
    );
};

export default InvitationTable;
