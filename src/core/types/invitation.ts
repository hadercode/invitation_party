export interface ILocation {
    lat: number;
    lng: number;
}

export interface IInvitation {
    id?: string;
    event_id?: string;
    recipient: string;
    passes: number;
    location: ILocation | null;
    date?: string;
    theme?: string;
    access_code?: string;
}

export interface IValidationResult {
    success: boolean;
    message?: string;
}

export interface IGenerationResult {
    success: boolean;
    code?: string;
}

export interface IEvent {
    id?: string;
    title: string;
    subtitle: string;
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    location: string;
    googleMapsUrl: string;
}
