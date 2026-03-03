import React from 'react';
import { Ticket, Search, Check, FileText } from 'lucide-react';
import { IInvitation } from '../../../core/types/invitation';
import { useInvitationList } from '../hooks/useInvitationList';
import InvitationTable from './InvitationTable';
import { INVITATION_MESSAGES } from '../../../core/constants/messages';
import GlassCard from '../../../shared/components/GlassCard';

interface InvitationListProps {
    eventId: string;
    refreshTrigger: number;
    onSelect: (invitation: IInvitation) => void;
}

/**
 * InvitationList
 * High-level orchestration for guest management. Integrated with shared components.
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

    const statuses = ['PENDING', 'SENT', 'CONFIRMED', 'DECLINED'] as const;

    return (
        <GlassCard padding="1.5rem">
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
                        title={INVITATION_MESSAGES.UI.COPY_TABLE}
                        aria-label={INVITATION_MESSAGES.UI.COPY_TABLE}
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
                            aria-label="Buscar invitados"
                        />
                    </div>
                </div>
            </div>

            {/* Status Filters */}
            <div
                style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}
                role="group"
                aria-label="Filtros por estado"
            >
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => toggleStatus(status)}
                        style={{
                            padding: '0.3rem 0.75rem',
                            borderRadius: '20px',
                            border: `1px solid ${selectedStatuses.includes(status) ? 'var(--secondary)' : 'var(--glass-border)'}`,
                            background: selectedStatuses.includes(status) ? 'rgba(212, 163, 115, 0.15)' : 'transparent',
                            color: selectedStatuses.includes(status) ? 'var(--secondary)' : 'var(--text-muted)',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            transition: 'all 0.2s',
                            opacity: selectedStatuses.length === 0 || selectedStatuses.includes(status) ? 1 : 0.6
                        }}
                    >
                        {INVITATION_MESSAGES.STATUS_LABELS[status as keyof typeof INVITATION_MESSAGES.STATUS_LABELS]}
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
        </GlassCard>
    );
};

export default InvitationList;
