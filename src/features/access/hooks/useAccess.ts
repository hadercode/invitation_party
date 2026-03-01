import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessService } from '../api/accessServices';

/**
 * Hook to manage access logic.
 */
export const useAccess = () => {
    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleAccess = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!code.trim()) {
            setError('Por favor ingresa un código.');
            return;
        }

        setLoading(true);
        try {
            const result = await accessService.validateCode(code);
            if (result.success) {
                navigate(`/invitation/${code}`);
            } else {
                setError(result.message || 'Error de validación');
            }
        } catch (err) {
            setError('Ocurrió un error inesperado.');
        } finally {
            setLoading(false);
        }
    };

    return {
        code,
        handleInputChange,
        error,
        loading,
        handleAccess
    };
};
