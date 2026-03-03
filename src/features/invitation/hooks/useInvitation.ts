import { useState, useEffect } from 'react';
import { invitationService } from '../api/invitationService';
import { IInvitation, IEvent } from '../../../core/types/invitation';
import { INVITATION_MESSAGES } from '../../../core/constants/messages';

/**
 * Hook to manage invitation logic.
 */
export const useInvitation = (code: string | null = null) => {
    const [data, setData] = useState<IInvitation | null>(null);
    const [eventData, setEventData] = useState<IEvent | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (code) {
            loadInvitation(code);
        }
    }, [code]);

    const loadInvitation = async (inviteCode: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = await invitationService.getInvitationByCode(inviteCode);
            if (result) {
                setData(result.invitation);
                setEventData(result.event);
            } else {
                setError(INVITATION_MESSAGES.ERROR_NOT_FOUND);
            }
        } catch (err) {
            setError(INVITATION_MESSAGES.ERROR_CONNECTION_LOAD);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (newStatus: 'CONFIRMED' | 'DECLINED') => {
        if (!data?.id) return { success: false, error: INVITATION_MESSAGES.ERROR_NO_ID };

        setLoading(true);
        try {
            const result = await invitationService.updateInvitationStatus(data.id, newStatus);
            if (result.success) {
                setData(prev => prev ? { ...prev, status: newStatus } : null);
            }
            return result;
        } catch (err) {
            return { success: false, error: INVITATION_MESSAGES.ERROR_CONNECTION_UPDATE };
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        eventData,
        loading,
        error,
        updateStatus
    };
};
