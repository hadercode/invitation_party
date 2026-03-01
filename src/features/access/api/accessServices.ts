import { IValidationResult } from '../../../core/types/invitation';

/**
 * Access Service
 */
export const accessService = {
  /**
   * Validates an access code.
   * @param code - The code to validate.
   */
  validateCode: async (code: string): Promise<IValidationResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code.toLowerCase() === 'tiana15') {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'Código inválido. Inténtalo de nuevo.' });
        }
      }, 500);
    });
  }
};
