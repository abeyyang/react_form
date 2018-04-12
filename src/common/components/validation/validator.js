
export class Validator {
    constructor(config){
        this.onError = this.onError.bind(this);
        const myConfig = {
            id: '',
            tag: '',
            onError: function(){}
        };
        this.extend(myConfig, config);
        this.config = myConfig;
        this.id = this.config.id;
        this.tag = this.config.tag;
        this.errorDom = null;
        this.errorCode = "";
        this.errorMessage = "";
    }
    validate() {
        throw new Error('Override & Implementation of "validate" method is required.');
    }
    onError(){
        const { onError,handleOnError } = this.config;
        this.errorCode = arguments[0];
        this.errorMessage = arguments[1];
        if(typeof onError === 'function'){
            this.errorDom = onError(...arguments);
            typeof handleOnError === 'function' && handleOnError(this.errorDom);
        }
    }
    extend(des,src){
        for(const key in src){
            des[key] = src[key]
        }
    }
    getType(value){
        return Object.prototype.toString.call(value);
    }
    isString(value){
        return this.getType(value) === '[object String]';
    }
    isNumber(value){
        return this.getType(value) === '[object Number]';
    }
    isNull(value){
        return value === undefined || value === null;
    }
}

