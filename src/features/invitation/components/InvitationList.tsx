import React from 'react';
import { Ticket, Search, Check, FileText } from 'lucide-react';
import { IInvitation } from '../../../core/types/invitation';
import { useInvitationList } from '../hooks/useInvitationList';
import InvitationTable from './InvitationTable';
import { INVITATION_MESSAGES } from '../../../core/constants/messages';

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
    const {
        loading,
        searchTerm,
        setSearchTerm,
        copiedCode,
        selectedStatuses,
        tableCopied,
        filteredInvitations,
        statusCounts,
        handleDelete,
        handleCopy,
        handleWhatsAppShare,
        handleCopyTable,
        toggleStatus,
        updateStatus
    } = useInvitationList(eventId, refreshTrigger);

    const statusLabels: Record<string, { label: string, color: string }> = {
        'PENDING': { label: INVITATION_MESSAGES.STATUS_LABELS.PENDING, color: 'var(--text-muted)' },
        'SENT': { label: INVITATION_MESSAGES.STATUS_LABELS.SENT, color: '#74c69d' },
        'CONFIRMED': { label: INVITATION_MESSAGES.STATUS_LABELS.CONFIRMED, color: '#4d96ff' },
        'DECLINED': { label: INVITATION_MESSAGES.STATUS_LABELS.DECLINED, color: '#ff4d4d' }
    };

    return (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
            {/* Header with Search and Copy Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                <h4 style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <Ticket size={18} /> {INVITATION_MESSAGES.UI.TITLE_GUESTS}
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
                        {tableCopied ? INVITATION_MESSAGES.UI.COPIED : INVITATION_MESSAGES.UI.COPY_TABLE}
                    </button>
                    <div style={{ position: 'relative', flex: '1', maxWidth: '250px' }}>
                        <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                        <input
                            type="text"
                            placeholder={INVITATION_MESSAGES.UI.SEARCH_PLACEHOLDER}
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

            <InvitationTable
                invitations={filteredInvitations}
                loading={loading}
                copiedCode={copiedCode}
                onCopy={handleCopy}
                onWhatsAppShare={handleWhatsAppShare}
                onDelete={handleDelete}
                onUpdateStatus={updateStatus}
                onSelect={onSelect}
            />
        </div>
    );
};

export default InvitationList;
