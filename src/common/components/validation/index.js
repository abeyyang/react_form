import { Validator as clsValidator } from './validator';
import { ValidateTypes as EnumValidateTypes } from './controller/index';
import { Validated as ValidatedComponent } from './Validated';
import { ValidationController as ValidationControllerComponent } from './ValidationController';
import ValidationProviderComponent from './ValidationProvider';

export const Validated = ValidatedComponent;
export const Validator = clsValidator;
export const ValidateTypes = EnumValidateTypes;
export const ValidationProvider = ValidationProviderComponent;
export const ValidationController = ValidationControllerComponent;

export default {
    Validator: clsValidator,
    ValidateTypes: EnumValidateTypes,
    ValidationProvider: ValidationProviderComponent,
    ValidationController: ValidationControllerComponent
};
