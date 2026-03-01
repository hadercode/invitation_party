import { IInvitation, IGenerationResult } from '../../../core/types/invitation';

/**
 * Invitation Service
 */
export const invitationService = {
    /**
     * Fetches invitation details by code.
     * @param code - The invitation code.
     */
    getInvitationByCode: async (code: string): Promise<IInvitation> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    recipient: code === 'tiana15' ? 'Invitado Especial' : code,
                    passes: 2,
                    location: { lat: -12.046374, lng: -77.042793 },
                    date: 'Sábado, 24 Mayo',
                    theme: 'Princess Tiana'
                });
            }, 500);
        });
    },

    /**
     * Generates a new invitation.
     * @param data - The invitation data.
     */
    generateInvitation: async (data: IInvitation): Promise<IGenerationResult> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Generating invitation with data:', data);
                resolve({ success: true, code: 'NEW-CODE-123' });
            }, 800);
        });
    }
};
