import { Validator } from '../validator';

export class RangeValidator extends Validator {
    validate(value,options){
        const config = {
            emptyAsZero: false,
            isRequired: false,
            min: 0,
            max: 99999999,
            requireErrorMsg: 'please input value',
            rangeErrorMsg: 'The input number must be between 0 and 999999999999',
            configErrorMsg: 'The max or min value is null',
            nanErrorMsg: 'The input value is NaN'
        };
        this.extend(config, options);
        if (config.isRequired && (value === undefined || value===null || value.toString().length<=0)) {
            this.onError('requireError',config.requireErrorMsg);
            return false;
        } else {
            if (config.emptyAsZero && (value === undefined || value===null || value.toString().length<=0)) {
                value = 0;
            }
            if(!isNaN(value)){
                if (isNaN(config.max) || isNaN(config.max)){
                    this.onError('configError',config.configErrorMsg);
                    return false;
                }else {
                    if(parseFloat(value)>=config.min && parseFloat(value)<=config.max) {
                        return true;
                    }else if(value.toString().length>0) {
                        this.onError('rangeError',config.rangeErrorMsg, config.min, config.max);
                        return false;
                    }
                    return true;
                }
            } else {
                this.onError("nanError",config.nanErrorMsg);
                return false;
            }
        }
    }
}
