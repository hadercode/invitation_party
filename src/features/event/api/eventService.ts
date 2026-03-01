import { supabase } from '../../../core/database/connection';
import { IEvent } from '../../../core/types/invitation';

/**
 * Event Service
 * Logic isolation for database operations with Supabase.
 */
export const eventService = {
    /**
     * Fetches the current event configuration.
     * Note: In this simple app, we fetch the first record or a default one.
     */
    getEventConfig: async (): Promise<IEvent | null> => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            console.error('Error fetching event:', error.message);
            return null;
        }

        return {
            id: data.id,
            title: data.title,
            subtitle: data.subtitle || '',
            date: data.event_date,
            startTime: data.start_time,
            endTime: data.end_time,
            venue: data.venue_name,
            location: data.city_location,
            googleMapsUrl: data.google_maps_url || ''
        };
    },

    /**
     * Saves or updates the event configuration.
     */
    saveEventConfig: async (event: IEvent): Promise<{ success: boolean; data?: any; error?: string }> => {
        const payload = {
            title: event.title,
            subtitle: event.subtitle,
            event_date: event.date,
            start_time: event.startTime,
            end_time: event.endTime,
            venue_name: event.venue,
            city_location: event.location,
            google_maps_url: event.googleMapsUrl,
            updated_at: new Date().toISOString()
        };

        // For simplicity, we search for an existing one to update or insert
        const { data: existing } = await supabase.from('events').select('id').limit(1).single();

        let result;
        if (existing) {
            result = await supabase
                .from('events')
                .update(payload)
                .eq('id', existing.id);
        } else {
            result = await supabase
                .from('events')
                .insert([payload]);
        }

        if (result.error) {
            return { success: false, error: result.error.message };
        }

        return { success: true, data: result.data };
    },

    /**
     * Fetches all registered events.
     */
    getAllEvents: async (): Promise<IEvent[]> => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching events:', error.message);
            return [];
        }

        return data.map(item => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle || '',
            date: item.event_date,
            startTime: item.start_time,
            endTime: item.end_time,
            venue: item.venue_name,
            location: item.city_location,
            googleMapsUrl: item.google_maps_url || ''
        }));
    },
};
