import { useState, useEffect, useMemo } from 'react';
import { IInvitation } from '../../../core/types/invitation';
import { invitationService } from '../api/invitationService';

/**
 * useInvitationList
 * Custom hook to handle business logic for the invitation list,
 * including loading, filtering, searching, and actions.
 */
export const useInvitationList = (eventId: string, refreshTrigger: number) => {
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
                await loadInvitations();
                return true;
            } else {
                alert('Error al eliminar: ' + result.error);
                return false;
            }
        }
        return false;
    };

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const handleWhatsAppShare = async (invitation: IInvitation) => {
        const baseUrl = window.location.origin;
        const inviteUrl = `${baseUrl}/invitation/${invitation.access_code}`;
        const message = `¡Hola ${invitation.recipient}! 👋%0A%0AEstás cordialmente invitado a nuestro evento especial. 🎉%0A%0APuedes ver tu invitación digital aquí: ${inviteUrl}%0A%0A¡Esperamos contar con tu presencia! ✨`;

        window.open(`https://wa.me/?text=${message}`, '_blank');

        // Auto-mark as SENT if it was PENDING
        if (invitation.status === 'PENDING') {
            await invitationService.updateInvitationStatus(invitation.id!, 'SENT');
            await loadInvitations();
        }
    };

    const toggleStatus = (status: string) => {
        setSelectedStatuses(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const statusCounts = useMemo(() => {
        return invitations.reduce((acc, inv) => {
            const s = inv.status || 'PENDING';
            acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [invitations]);

    const filteredInvitations = useMemo(() => {
        return invitations.filter(inv => {
            const matchesSearch = inv.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inv.access_code?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(inv.status || 'PENDING');

            return matchesSearch && matchesStatus;
        });
    }, [invitations, searchTerm, selectedStatuses]);

    const handleCopyTable = () => {
        const headers = ['Nombre', 'Pases', 'Código', 'Estado'].join('\t');
        const rows = filteredInvitations.map(inv => {
            const statusLabel = inv.status === 'SENT' ? 'Enviado' :
                inv.status === 'CONFIRMED' ? 'Confirmado' :
                    inv.status === 'DECLINED' ? 'Declinado' :
                        'Pendiente';
            return [
                inv.recipient,
                inv.passes,
                inv.access_code,
                statusLabel
            ].join('\t');
        }).join('\n');

        const content = `${headers}\n${rows}`;
        navigator.clipboard.writeText(content);
        setTableCopied(true);
        setTimeout(() => setTableCopied(false), 2000);
    };

    const updateStatus = async (id: string, status: IInvitation['status']) => {
        const res = await invitationService.updateInvitationStatus(id, status);
        if (res.success) {
            await loadInvitations();
            return true;
        }
        return false;
    };

    return {
        invitations,
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
        updateStatus,
        refresh: loadInvitations
    };
};
