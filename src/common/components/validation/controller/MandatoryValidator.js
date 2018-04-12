import { Validator } from '../Validator';

export class MandatoryValidator extends Validator {

    validate(value, options){
        const config = {
            errMsg: 'Plase input the value '
        };
        this.extend(config,options);
        if(value === undefined || value === null) {
            this.onError("requreError", config.errMsg);
            return false;
        }else if(this.isString(value) && value.length<=0){
            this.onError("requreError", config.errMsg);
            return false;
        }else {
            return true;
        }
    }
}