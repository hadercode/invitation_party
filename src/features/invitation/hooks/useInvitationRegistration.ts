import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IEvent } from '../../../core/types/invitation';
import { invitationService } from '../api/invitationService';
import { eventService } from '../../event/api/eventService';
import { INVITATION_MESSAGES } from '../../../core/constants/messages';

interface RegistrationFormData {
    eventId: string;
    recipient: string;
    passes: number;
}

interface UseInvitationRegistrationProps {
    initialEventId?: string;
    onSuccess: () => void;
    onEventChange?: (eventId: string) => void;
}

/**
 * useInvitationRegistration
 * Custom hook to handle invitation registration logic, including event loading,
 * form state management, and submission.
 */
export const useInvitationRegistration = ({
    initialEventId,
    onSuccess,
    onEventChange
}: UseInvitationRegistrationProps) => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<RegistrationFormData>({
        defaultValues: {
            eventId: initialEventId || '',
            recipient: '',
            passes: 1
        }
    });

    const selectedEventId = watch('eventId');

    // Load available events
    useEffect(() => {
        const fetchEvents = async () => {
            const data = await eventService.getAllEvents();
            setEvents(data);
            setLoadingEvents(false);

            // If we have an initial ID, ensure it's selected
            if (initialEventId) {
                setValue('eventId', initialEventId);
            } else if (data.length > 0 && !selectedEventId) {
                setValue('eventId', data[0].id || '');
            }
        };
        fetchEvents();
    }, [initialEventId, setValue, selectedEventId]);

    // Notify parent when event selection changes
    useEffect(() => {
        if (selectedEventId && onEventChange) {
            onEventChange(selectedEventId);
        }
    }, [selectedEventId, onEventChange]);

    const onSubmit = async (data: RegistrationFormData) => {
        if (!data.eventId) {
            alert(INVITATION_MESSAGES.VALIDATION.EVENT_REQUIRED);
            return;
        }

        const result = await invitationService.createInvitation({
            event_id: data.eventId,
            recipient: data.recipient,
            passes: data.passes
        });

        if (result.success) {
            reset({
                eventId: data.eventId,
                recipient: '',
                passes: 1
            });
            onSuccess();
        } else {
            alert(INVITATION_MESSAGES.ERROR_REGISTER + result.error);
        }
    };

    return {
        events,
        loadingEvents,
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting,
        selectedEventId
    };
};
