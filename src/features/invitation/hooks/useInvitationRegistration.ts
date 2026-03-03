import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
 * Custom hook with TanStack Query for guest registration.
 */
export const useInvitationRegistration = ({
    initialEventId,
    onSuccess,
    onEventChange
}: UseInvitationRegistrationProps) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<RegistrationFormData>({
        defaultValues: {
            eventId: initialEventId || '',
            recipient: '',
            passes: 1
        }
    });

    const selectedEventId = watch('eventId');

    // Query for events
    const { data: events = [], isLoading: loadingEvents } = useQuery({
        queryKey: ['events'],
        queryFn: () => eventService.getAllEvents(),
    });

    // Mutation for registration
    const registrationMutation = useMutation({
        mutationFn: (data: RegistrationFormData) => invitationService.createInvitation({
            event_id: data.eventId,
            recipient: data.recipient,
            passes: data.passes
        }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['invitations'] });
            reset({
                eventId: variables.eventId,
                recipient: '',
                passes: 1
            });
            onSuccess();
        },
        onError: (error: any) => {
            alert(INVITATION_MESSAGES.ERROR_REGISTER + error.message);
        }
    });

    // Handle initial event selection
    useEffect(() => {
        if (!loadingEvents && events.length > 0) {
            if (initialEventId) {
                setValue('eventId', initialEventId);
            } else if (!selectedEventId) {
                setValue('eventId', events[0].id || '');
            }
        }
    }, [initialEventId, setValue, selectedEventId, loadingEvents, events]);

    // Notify parent when event selection changes
    useEffect(() => {
        if (selectedEventId && onEventChange) {
            onEventChange(selectedEventId);
        }
    }, [selectedEventId, onEventChange]);

    const onSubmit = (data: RegistrationFormData) => {
        if (!data.eventId) {
            alert(INVITATION_MESSAGES.VALIDATION.EVENT_REQUIRED);
            return;
        }
        registrationMutation.mutate(data);
    };

    return {
        events,
        loadingEvents,
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting: registrationMutation.isPending,
        selectedEventId
    };
};
