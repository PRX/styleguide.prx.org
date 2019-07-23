import { BaseInvalid } from '../../../model/base.invalid';
import { BaseModel } from '../../../model/base.model';

/**
 * Make sure a relation exists
 */
export const RELATIONS = (msg?: string): BaseInvalid => {
  return (key: string, models: BaseModel[], strict: boolean) => {
    if (strict) {
      if (!models || models.length === 0 || models.every(m => m.isDestroy)) {
        return msg || `${key} is required`;
      }
    }
    return null;
  };
};
