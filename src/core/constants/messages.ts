/**
 * messages.ts
 * Centralized messages for the application to facilitate maintenance and internationalization.
 */

export const INVITATION_MESSAGES = {
    ERROR_NOT_FOUND: 'No se encontró la invitación solicitada.',
    ERROR_CONNECTION_LOAD: 'Error de conexión al cargar la invitación.',
    ERROR_CONNECTION_UPDATE: 'Error de conexión',
    ERROR_NO_ID: 'No invitation ID',
    ERROR_DELETE: 'Error al eliminar: ',

    CONFIRM_DELETE: '¿Estás seguro de eliminar este invitado?',

    SUCCESS_DELETE: 'Invitado eliminado con éxito',

    WHATSAPP_MESSAGE: (recipient: string, inviteUrl: string) =>
        `🌸 *¡Mis 15 Años!* 🌸

Hay momentos en la vida que son especiales, pero compartirlos con las personas que más queremos los hace inolvidables.

Te espero para celebrar este día tan importante para mí. ✨

📍 Encuentra todos los detalles, y confirma tu asistencia en el siguiente enlace:

🔗 ${inviteUrl}

¡No faltes! Tu presencia es mi mejor regalo. 💖`,

    STATUS_LABELS: {
        PENDING: 'Pendiente',
        SENT: 'Enviado',
        CONFIRMED: 'Confirmado',
        DECLINED: 'Declinado',
        RECEIVED: 'Recibida',
        CONFIRMED_ALT: '¡Confirmada!'
    },

    TABLE_HEADERS: {
        NAME: 'Nombre',
        PASSES: 'Pases',
        CODE: 'Código',
        STATUS: 'Estado',
        ACTIONS: 'Acciones'
    },

    UI: {
        LOADING_GUESTS: 'Cargando invitados registrados...',
        LOADING_INVITATIONS: 'Cargando invitaciones...',
        NO_GUESTS_FOUND: 'No se encontraron invitados con los criterios seleccionados.',
        NO_INVITATIONS_FOUND: 'No se encontraron invitaciones.',
        COPY_TABLE: 'Copiar Tabla',
        COPIED: 'Copiado',
        SEARCH_PLACEHOLDER: 'Buscar por nombre o código...',
        TITLE_GUESTS: 'Invitados Registrados',
        REGISTRATION_TITLE: 'Registrar Nuevo Invitado',
        SELECT_EVENT_LABEL: 'Seleccionar Evento',
        LOADING_EVENTS: 'Cargando eventos...',
        RECIPIENT_LABEL: 'Nombre del Invitado / Familia',
        RECIPIENT_PLACEHOLDER: 'Ej: Familia Rodriguez',
        PASSES_LABEL: 'Pases',
        REGISTER_BUTTON: 'Registrar Invitado',
        REGISTERING_BUTTON: 'Registrando...',
        COPY_CODE: 'Copiar código',
        MARK_SENT: 'Marcar como enviado',
        SHARE_WHATSAPP: 'Compartir por WhatsApp',
        DELETE_ACTION: 'Eliminar registro'
    },
    VALIDATION: {
        EVENT_REQUIRED: 'Por favor selecciona un evento.',
        EVENT_REQUIRED_FORM: 'El evento es obligatorio',
        RECIPIENT_REQUIRED: 'El nombre es obligatorio'
    },
    ERROR_REGISTER: 'Error al registrar invitado: '
};
