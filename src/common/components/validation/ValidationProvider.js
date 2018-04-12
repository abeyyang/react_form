import React, { Component, PropTypes } from 'react';
import { Validator } from './index';
import { RangeValidator, ValidateTypes, ValidatorControllers } from './controller/index';

class ValidationProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = context.store;
        this.validateState = {
            register: this.register,
            validators: [],
            validatorController: {},
            validate: this.validate,
            validateByTag: this.validateByTag,
            unRegister: this.unRegister
        };
        this.validators = {};
        this.validateState.validatorController=ValidatorControllers;
        this.validateByTag = this.validateByTag.bind(this);
    }
    register(id,type, options){
        const config = {
            tag: '',
            onError:function(){}
        };
        const vp = new Validator();
        vp.extend(config,options);
        if(vp.isNull(id)){
            typeof config.onError === 'function' && config.onError('IDError',"Please set the id");
            throw new Error("Please set the validation id");
        } else {
            const { validators,validatorController } = this;
            console.log(validators, 'validators provider');
            console.log(validatorController, 'validatorController provider');
            let isExists = false;
            let existsController = null;
            if (validators) {
                 for(const vd of validators){
                     if (vd.id === id) {
                         isExists = true;
                         existsController = vd;
                         break;
                     }
                 }
            }
            console.log(existsController, 'existsController');
            if (!isExists){
                if (validatorController[type]){
                    const ValidatorController = validatorController[type];
                    console.log(ValidatorController, 'ValidatorController');
                    const validate = new ValidatorController({
                        id,
                        ...config
                    });
                    console.log(validate, 'validate existsController');
                    console.log(this.validators, 'validators register before');
                    this.validators.push(validate);
                    console.log(this.validators, 'validators register');
                    return validate;
                }else {
                    throw new Error("Canot find the Validate Type");
                }
            } else {
                console.error("The validated id  already exists: " + id);
                return existsController;
            }
        }
    }
    validate(id,value,props) {
        const { validators } = this;
        console.log(validators, id, 'validators');
        const validator = validators[id];
        console.log(validator, 'validator')
        if(validators && validators.length>0){
            let isExists = false;
            let validateObject = null;
            Object.keys(validators).map((key)=>{
                const curValidator = validators[key];
                if(curValidator.id===id){
                    isExists = true;
                    validateObject = curValidator;
                }
            });
            if(isExists && validateObject !== null) {
                const properties = props || validateObject.properties;
                console.log(validateObject, 'validateObject');
                console.log(properties, 'properties');
                return validateObject.validate(value, properties);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    validateByTag(tagName,onError){
        const { validators } = this.validation;
        let fResult = true;
        const errorResult = {};
        validators && validators.map && validators.map((validateObject)=>{
            if(validateObject.tag === tagName) {
                const result = validateObject.validate(validateObject.config.value,validateObject.config);
                if(!result) {
                    fResult = false;
                    errorResult[validateObject.id] = {
                        errorCode: validateObject.errorCode,
                        errorMessage: validateObject.errorMessage
                    };
                }
            }
        });
        if(!fResult){
            typeof onError === 'function' && onError(errorResult);
        }
        return fResult;
    }
    unRegister(id){
        console.log(this, '---->unRegister');
        const { validators } = this.validation;
    }
    getChildContext() {
        return {
            validation: {
                ...this.validateState
            },
            store: this.store
        };
    }
    render(){
        return this.props.children;
    }
}
ValidationProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.node,
        PropTypes.number
    ])
};
ValidationProvider.contextTypes ={
    store: PropTypes.object.isRequired
};
ValidationProvider.childContextTypes = {
    validation: PropTypes.object,
    store: PropTypes.object
};
export default ValidationProvider;
