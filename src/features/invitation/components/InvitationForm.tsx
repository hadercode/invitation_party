import React, { ChangeEvent } from 'react';
import { User, Ticket, MapPin } from 'lucide-react';
import { IInvitation } from '../../../core/types/invitation';

interface InvitationFormProps {
    data: IInvitation;
    onUpdate: (newData: Partial<IInvitation>) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

/**
 * InvitationForm
 */
const InvitationForm: React.FC<InvitationFormProps> = ({ data, onUpdate, onGenerate, isLoading }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onUpdate({ [name]: value });
    };

    return (
        <div className="glass-card invitation-form">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Configurar Invitación
            </h3>

            <div className="input-group">
                <label htmlFor="recipient">
                    <User size={14} style={{ marginRight: '4px' }} /> Nombre del Destinatario
                </label>
                <input
                    type="text"
                    id="recipient"
                    name="recipient"
                    placeholder="Ej: Juan Pérez"
                    value={data.recipient}
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
            </div>

            <div className="input-group">
                <label htmlFor="passes">
                    <Ticket size={14} style={{ marginRight: '4px' }} /> Cantidad de Pases
                </label>
                <input
                    type="number"
                    id="passes"
                    name="passes"
                    min="1"
                    max="10"
                    value={data.passes}
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
            </div>

            <div className="input-group">
                <label>
                    <MapPin size={14} style={{ marginRight: '4px' }} /> Ubicación (Haz clic en el mapa)
                </label>

            </div>

            <button
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={onGenerate}
                disabled={isLoading}
            >
                {isLoading ? 'Generando...' : 'Generar Invitación'}
            </button>
        </div>
    );
};

export default InvitationForm;
