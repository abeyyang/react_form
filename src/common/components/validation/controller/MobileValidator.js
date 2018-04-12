import { Validator } from '../validator';

export class MobileValidator extends Validator{
    validate(value,options){
        const config = {
            isRequired: false,
        };
        this.extend(config, options);
        if(config.isRequired && (this.isNull(value)|| value.toString().length<=0)){
            this.onError('requireError', "Plase input mobile phone number");
            return false;
        } else {
            if(/^1[0-9]{10}$/.test(value)){
                return true;
            } else if(value.toString().length>0) {
                this.onError('inputError', "Not the correct phone number format");
                return false;
            }
        }
        return true;
    }
}
