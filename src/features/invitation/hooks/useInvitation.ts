import { useState, useEffect } from 'react';
import { invitationService } from '../api/invitationService';
import { IInvitation, IEvent } from '../../../core/types/invitation';

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
                setError('No se encontró la invitación solicitada.');
            }
        } catch (err) {
            setError('Error de conexión al cargar la invitación.');
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        eventData,
        loading,
        error
    };
};
