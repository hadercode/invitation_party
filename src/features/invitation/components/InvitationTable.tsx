import React from 'react';
import { Trash2, Copy, Check, Share2, Info } from 'lucide-react';
import { IInvitation } from '../../../core/types/invitation';
import { INVITATION_MESSAGES } from '../../../core/constants/messages';
import StatusBadge from '../../../shared/components/StatusBadge';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

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

/**
 * InvitationTable
 * Guest details table with centralized status management and accessibility.
 */
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
    if (loading && invitations.length === 0) {
        return <LoadingSpinner message={INVITATION_MESSAGES.UI.LOADING_INVITATIONS} />;
    }

    if (invitations.length === 0) {
        return (
            <div style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>
                <Info size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                <p>{INVITATION_MESSAGES.UI.NO_INVITATIONS_FOUND}</p>
            </div>
        );
    }

    return (
        <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            <table
                style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}
                aria-label="Tabla de invitados"
            >
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--secondary)', opacity: 0.8 }}>
                        <th style={{ padding: '0.5rem' }}>{INVITATION_MESSAGES.TABLE_HEADERS.NAME}</th>
                        <th style={{ padding: '0.5rem', textAlign: 'center' }}>{INVITATION_MESSAGES.TABLE_HEADERS.PASSES}</th>
                        <th style={{ padding: '0.5rem', textAlign: 'center' }}>{INVITATION_MESSAGES.TABLE_HEADERS.CODE}</th>
                        <th style={{ padding: '0.5rem', textAlign: 'center' }}>{INVITATION_MESSAGES.TABLE_HEADERS.STATUS}</th>
                        <th style={{ padding: '0.5rem', textAlign: 'right' }}>{INVITATION_MESSAGES.TABLE_HEADERS.ACTIONS}</th>
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
                            <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                                <span style={{ opacity: 0.8 }}>{inv.passes}</span>
                            </td>
                            <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                                    <code style={{ background: 'rgba(212, 163, 115, 0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: 'var(--secondary)', fontSize: '0.8rem' }}>
                                        {inv.access_code}
                                    </code>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onCopy(inv.access_code || ''); }}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
                                        aria-label={INVITATION_MESSAGES.UI.COPY_CODE}
                                        title={INVITATION_MESSAGES.UI.COPY_CODE}
                                    >
                                        {copiedCode === inv.access_code ? <Check size={14} color="#74c69d" /> : <Copy size={14} />}
                                    </button>
                                </div>
                            </td>
                            <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                                <StatusBadge status={inv.status!} />
                            </td>
                            <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                    {inv.status === 'PENDING' && (
                                        <button
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                await onUpdateStatus(inv.id!, 'SENT');
                                            }}
                                            className="btn-action confirm"
                                            style={{ color: '#74c69d' }}
                                            title={INVITATION_MESSAGES.UI.MARK_SENT}
                                            aria-label={INVITATION_MESSAGES.UI.MARK_SENT}
                                        >
                                            <Check size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onWhatsAppShare(inv); }}
                                        className="btn-action whatsapp"
                                        style={{ color: '#25D366' }}
                                        title={INVITATION_MESSAGES.UI.SHARE_WHATSAPP}
                                        aria-label={INVITATION_MESSAGES.UI.SHARE_WHATSAPP}
                                    >
                                        <Share2 size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDelete(inv.id!); }}
                                        className="btn-action delete"
                                        style={{ color: '#ff4d4d' }}
                                        title={INVITATION_MESSAGES.UI.DELETE_ACTION}
                                        aria-label={INVITATION_MESSAGES.UI.DELETE_ACTION}
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
