import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invitationService } from '../api/invitationService';
import { INVITATION_MESSAGES } from '../../../core/constants/messages';

/**
 * Hook to manage invitation logic using TanStack Query.
 */
export const useInvitation = (code: string | null = null) => {
    const queryClient = useQueryClient();

    const {
        data: result,
        isLoading,
        isError,
        error: queryError
    } = useQuery({
        queryKey: ['invitation', code],
        queryFn: () => code ? invitationService.getInvitationByCode(code) : Promise.resolve(null),
        enabled: !!code,
    });

    const statusMutation = useMutation({
        mutationFn: ({ id, newStatus }: { id: string, newStatus: 'CONFIRMED' | 'DECLINED' }) =>
            invitationService.updateInvitationStatus(id, newStatus),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['invitation', code] });
            queryClient.invalidateQueries({ queryKey: ['invitations'] });
        }
    });

    const updateStatus = async (newStatus: 'CONFIRMED' | 'DECLINED') => {
        if (!result?.invitation?.id) {
            return { success: false, error: INVITATION_MESSAGES.ERROR_NO_ID };
        }

        try {
            const res = await statusMutation.mutateAsync({
                id: result.invitation.id,
                newStatus
            });
            return res;
        } catch (err) {
            return { success: false, error: INVITATION_MESSAGES.ERROR_CONNECTION_UPDATE };
        }
    };

    return {
        data: result?.invitation || null,
        eventData: result?.event || null,
        isPending: isLoading,
        error: isError ? INVITATION_MESSAGES.ERROR_CONNECTION_LOAD : null,
        updateStatus: statusMutation,
    };
};
