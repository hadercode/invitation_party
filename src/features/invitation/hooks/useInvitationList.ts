import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IInvitation } from '../../../core/types/invitation';
import { invitationService } from '../api/invitationService';
import { INVITATION_MESSAGES } from '../../../core/constants/messages';

/**
 * useInvitationList
 * Custom hook with TanStack Query for guest management.
 */
export const useInvitationList = (eventId: string, refreshTrigger: number) => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [tableCopied, setTableCopied] = useState(false);

    // Query for invitations
    const { data: invitations = [], isLoading } = useQuery({
        queryKey: ['invitations', eventId, refreshTrigger],
        queryFn: () => invitationService.getInvitationsByEvent(eventId),
        enabled: !!eventId,
    });

    // Mutations
    const deleteMutation = useMutation({
        mutationFn: (id: string) => invitationService.deleteInvitation(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['invitations'] })
    });

    const statusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: IInvitation['status'] }) =>
            invitationService.updateInvitationStatus(id, status!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invitations'] });
            queryClient.invalidateQueries({ queryKey: ['invitation'] });
        }
    });

    const handleDelete = async (id: string) => {
        if (window.confirm(INVITATION_MESSAGES.CONFIRM_DELETE)) {
            const res = await deleteMutation.mutateAsync(id);
            return res.success;
        }
        return false;
    };

    const handleWhatsAppShare = async (invitation: IInvitation) => {
        const baseUrl = window.location.origin;
        const inviteUrl = `${baseUrl}/invitation/${invitation.access_code}`;
        const message = INVITATION_MESSAGES.WHATSAPP_MESSAGE(invitation.recipient, inviteUrl);

        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');

        // Auto-mark as SENT if it was PENDING
        if (invitation.status === 'PENDING') {
            await statusMutation.mutateAsync({ id: invitation.id!, status: 'SENT' });
        }
    };

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
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

    const totalFilteredPasses = useMemo(() => {
        return filteredInvitations.reduce((sum: number, inv: IInvitation) => sum + (inv.passes || 0), 0);
    }, [filteredInvitations]);

    const handleCopyTable = () => {
        const headers = [
            INVITATION_MESSAGES.TABLE_HEADERS.NAME,
            INVITATION_MESSAGES.TABLE_HEADERS.PASSES,
            INVITATION_MESSAGES.TABLE_HEADERS.CODE,
            INVITATION_MESSAGES.TABLE_HEADERS.STATUS
        ].join('\t');

        const rows = filteredInvitations.map(inv => {
            const statusLabel = inv.status === 'SENT' ? INVITATION_MESSAGES.STATUS_LABELS.SENT :
                inv.status === 'CONFIRMED' ? INVITATION_MESSAGES.STATUS_LABELS.CONFIRMED :
                    inv.status === 'DECLINED' ? INVITATION_MESSAGES.STATUS_LABELS.DECLINED :
                        INVITATION_MESSAGES.STATUS_LABELS.PENDING;
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

    return {
        invitations,
        loading: isLoading,
        searchTerm,
        setSearchTerm,
        copiedCode,
        selectedStatuses,
        tableCopied,
        filteredInvitations,
        totalFilteredPasses,
        statusCounts,
        handleDelete,
        handleCopy,
        handleWhatsAppShare,
        handleCopyTable,
        toggleStatus,
        updateStatus: (id: string, status: IInvitation['status']) => statusMutation.mutateAsync({ id, status }),
        refresh: () => queryClient.invalidateQueries({ queryKey: ['invitations'] })
    };
};
