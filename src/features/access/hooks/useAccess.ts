import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessService } from '../api/accessServices';
import { IInvitation } from '../../../core/types/invitation';

/**
 * Hook to manage access logic.
 */
export const useAccess = () => {
    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showScanner, setShowScanner] = useState<boolean>(false);
    const [showWelcome, setShowWelcome] = useState<boolean>(false);
    const [inviteData, setInviteData] = useState<IInvitation | null>(null);

    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const processAccess = async (accessCode: string) => {
        setError('');
        setLoading(true);
        try {
            const result = await accessService.validateCode(accessCode);
            if (result.success && result.data) {
                setInviteData(result.data);
                setShowWelcome(true);
            } else {
                setError(result.message || 'Error de validación');
                setLoading(false);
            }
        } catch (err) {
            setError('Ocurrió un error inesperado.');
            setLoading(false);
        }
    };

    const handleAccess = async (e: FormEvent) => {
        e.preventDefault();
        if (!code.trim()) {
            setError('Por favor ingresa un código.');
            return;
        }
        await processAccess(code);
    };

    const handleScanSuccess = useCallback(async (decodedText: string) => {
        setShowScanner(false);
        // QR text might be "INVITE:id:recipient" or just the access code
        let accessCode = decodedText;
        if (decodedText.startsWith('INVITE:')) {
            const parts = decodedText.split(':');
            accessCode = parts[1]; // Use ID
        }
        setCode(accessCode);
        await processAccess(accessCode);
    }, []);

    const closeWelcome = () => {
        setShowWelcome(false);
        if (inviteData && inviteData.access_code) {
            navigate(`/invitation/${inviteData.access_code}`);
        } else if (inviteData && inviteData.id) {
            navigate(`/invitation/${inviteData.id}`);
        }
    };

    return {
        code,
        handleInputChange,
        error,
        loading,
        handleAccess,
        showScanner,
        setShowScanner,
        handleScanSuccess,
        showWelcome,
        inviteData,
        closeWelcome
    };
};
