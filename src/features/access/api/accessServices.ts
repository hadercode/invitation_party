import { IValidationResult, IInvitation } from '../../../core/types/invitation';
import { invitationService } from '../../invitation/api/invitationService';

/**
 * Access Service
 */
export const accessService = {
  /**
   * Validates an access code.
   * @param code - The code to validate.
   */
  validateCode: async (code: string): Promise<IValidationResult & { data?: IInvitation }> => {
    try {
      const result = await invitationService.getInvitationByCode(code);

      if (result) {
        // Upon successful access, mark as COMPLETED (checked-in)
        await invitationService.updateInvitationStatus(result.invitation.id!, 'COMPLETED');
        return {
          success: true,
          data: { ...result.invitation, status: 'COMPLETED' }
        };
      }

      return { success: false, message: 'Código inválido. Inténtalo de nuevo.' };
    } catch (error) {
      console.error('Error validating code:', error);
      return { success: false, message: 'Ocurrió un error al validar el código.' };
    }
  }
};
