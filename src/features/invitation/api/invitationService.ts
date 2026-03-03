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
            status: item.status || 'PENDING',
            location: null
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
                access_code: accessCode,
                status: 'PENDING'
            }])
            .select()
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    },

    /**
     * Fetches an invitation by its access code or UUID.
     * Includes the related event data.
     */
    getInvitationByCode: async (code: string): Promise<{ invitation: IInvitation; event: any } | null> => {
        // Try to identify if code is a UUID or a short access code
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(code);

        let query = supabase
            .from('invitations')
            .select('*, event:events(*)');

        if (isUuid) {
            query = query.eq('id', code);
        } else {
            query = query.eq('access_code', code);
        }

        const { data, error } = await query.single();

        if (error || !data) {
            console.error('Error fetching invitation:', error?.message);
            return null;
        }

        const invitation: IInvitation = {
            id: data.id,
            event_id: data.event_id,
            recipient: data.recipient,
            passes: data.passes,
            access_code: data.access_code,
            status: data.status || 'PENDING',
            location: null
        };

        const eventData = {
            id: data.event.id,
            title: data.event.title,
            subtitle: data.event.subtitle,
            date: data.event.event_date,
            startTime: data.event.start_time,
            endTime: data.event.end_time,
            venue: data.event.venue_name,
            location: data.event.city_location,
            googleMapsUrl: data.event.google_maps_url,
            videoUrl: data.event.video_url
        };

        return { invitation, event: eventData };
    },

    /**
     * Updates the status of an invitation.
     */
    updateInvitationStatus: async (id: string, status: string): Promise<{ success: boolean; error?: string }> => {
        const { error } = await supabase
            .from('invitations')
            .update({ status })
            .eq('id', id);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
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
