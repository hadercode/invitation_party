export interface ILocation {
    lat: number;
    lng: number;
}

export interface IInvitation {
    recipient: string;
    passes: number;
    location: ILocation | null;
    date?: string;
    theme?: string;
    code?: string;
}

export interface IValidationResult {
    success: boolean;
    message?: string;
}

export interface IGenerationResult {
    success: boolean;
    code?: string;
}
