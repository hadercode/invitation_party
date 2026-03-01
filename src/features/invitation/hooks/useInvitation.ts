import { useState, useEffect } from 'react';
import { invitationService } from '../api/invitationServices';
import { IInvitation } from '../../../core/types/invitation';

/**
 * Hook to manage invitation logic.
 */
export const useInvitation = (code: string | null = null) => {
    const [data, setData] = useState<IInvitation>({
        recipient: '',
        passes: 1,
        location: null
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (code) {
            loadInvitation(code);
        }
    }, [code]);

    const loadInvitation = async (inviteCode: string) => {
        setLoading(true);
        try {
            const invitation = await invitationService.getInvitationByCode(inviteCode);
            setData(invitation);
        } catch (err) {
            setError('No se pudo cargar la invitación.');
        } finally {
            setLoading(false);
        }
    };

    const updateData = (newData: Partial<IInvitation>) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const result = await invitationService.generateInvitation(data);
            if (result.success) {
                alert(`¡Invitación generada! Código: ${result.code}`);
            }
        } catch (err) {
            setError('Error al generar la invitación.');
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        updateData,
        handleGenerate
    };
};
