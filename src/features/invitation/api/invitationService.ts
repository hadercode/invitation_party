import { supabase } from '../../../core/database/connection';
import { IInvitation } from '../../../core/types/invitation';

/**
 * Invitation Service
 * Handles CRUD operations for guest invitations.
 */
export const invitationService = {
    /**
     * Generates a unique 6-character access code.
     */
    generateAccessCode: (): string => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    },

    /**
     * Fetches all invitations for a specific event.
     */
    getInvitationsByEvent: async (eventId: string): Promise<IInvitation[]> => {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('event_id', eventId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching invitations:', error.message);
            return [];
        }

        return data.map(item => ({
            id: item.id,
            event_id: item.event_id,
            recipient: item.recipient,
            passes: item.passes,
            access_code: item.access_code,
            location: null // Location is usually defined at the event level
        }));
    },

    /**
     * Registers a new invitation.
     */
    createInvitation: async (invitation: Partial<IInvitation> & { event_id: string }): Promise<{ success: boolean; data?: any; error?: string }> => {
        const accessCode = invitation.access_code || invitationService.generateAccessCode();

        const { data, error } = await supabase
            .from('invitations')
            .insert([{
                event_id: invitation.event_id,
                recipient: invitation.recipient,
                passes: invitation.passes || 1,
                access_code: accessCode
            }])
            .select()
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    },

    /**
     * Deletes an invitation.
     */
    deleteInvitation: async (id: string): Promise<{ success: boolean; error?: string }> => {
        const { error } = await supabase
            .from('invitations')
            .delete()
            .eq('id', id);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    }
};
