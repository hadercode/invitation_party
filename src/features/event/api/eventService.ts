import { IEvent } from '../../../core/types/invitation';

const STORAGE_KEY = 'event_config_data';

/**
 * Event Service
 * Manages event details persistence using localStorage for demonstration.
 */
export const eventService = {
    /**
     * Fetches the current event configuration.
     */
    getEventConfig: async (): Promise<IEvent> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    resolve(JSON.parse(stored));
                } else {
                    // Default data
                    resolve({
                        title: 'Mis Quince Años',
                        date: '2026-05-24',
                        startTime: '19:00',
                        endTime: '02:00',
                        venue: 'SALON DE FIESTA LA CHINITA',
                        location: 'Maracaibo, Venezuela',
                        googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.908026723244!2d-71.64487932410631!3d10.664246789477836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8999b3ad664317%3A0x23530b5962ac4c97!2sSALON%20DE%20FIESTA%20LA%20CHINITA!5e0!3m2!1ses!2sve!4v1772332016270!5m2!1ses!2sve'
                    });
                }
            }, 300);
        });
    },

    /**
     * Saves the event configuration.
     */
    saveEventConfig: async (data: IEvent): Promise<{ success: boolean }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                resolve({ success: true });
            }, 500);
        });
    }
};
