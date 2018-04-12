import { RangeValidator as clsRangeValidator } from './RangeValidator';
import { MobileValidator } from './MobileValidator';
import { MandatoryValidator } from './MandatoryValidator';
export const RangeValidator = clsRangeValidator;

export const ValidateTypes = {
    RangeValidate: "RangeValidate",
    MobileValidate: "MobileValidate",
    MandatoryValidate: "MandatoryValidate",
};

export const ValidatorControllers = {
    "RangeValidate": clsRangeValidator,
    "MobileValidate": MobileValidator,
    "MandatoryValidate": MandatoryValidator
};
