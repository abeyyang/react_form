import React, { Component, PropTypes } from 'react';
import { ValidateTypes } from './controller/index';
import styles from './style/style.scss';
export class Validated extends Component {
    constructor(props, context){
        super(props, context);
        console.log(context, 'context validated');
        this.state = {
            value: this.props.value,
            checkResult: true,
            tipElement: null,
            displayStyle: ''
        };
        this.isRender = false;
        this.validate = this.validate.bind(this);
        this.provider = context.validation;
        this.validator = this.provider.register(this.props.id, ValidateTypes[this.props.type], {
            tag: props.tag,
            ...(this.props.errorMsg || {}),
            onError: props.onError,
            onSuccess: props.onSuccess
        });
        console.log(this.validator, 'this.validator');
        this.setConfig = this.setConfig.bind(this);
        this.setConfig(props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setConfig(nextProps);
            this.setState({
                value: nextProps.value
            });
            this.validate(nextProps);
        }
    }
    setConfig(props){
        const nProps = {
            ...props,
            handleOnError: (element)=>{
                this.isRender && this.setState({
                    checkResult: false,
                    tipElement: element,
                    displayStyle: props.errorTheme || styles.errorMessage
                });
            }
        };
        if(this.validator) {
            if(Object.assign){
                Object.assign(this.validator.config,nProps);
            } else {
                Object.keys(nProps).map((key)=>{
                    this.validator[key] = nProps[key];
                });
            }
        } else {
            console.error("This validated can not find the vaildationController:"+ this.props.id);
        }
        console.log(this.validator, 'this.validator validated');
    }
    validate(nextProps){
        const { value } = nextProps;
        const { id, onSuccess,successTheme } = this.props;
        const result = this.provider.validate(id,value, nextProps);
        if(result){
            const dom = typeof onSuccess === 'function' && onSuccess(); 
            this.isRender && this.setState({
                checkResult: true,
                tipElement: dom,
                displayStyle: successTheme || styles.successInput
            });
        }
    }

    componentDidMount(){
        this.isRender = true;
        // this.validate(this.props);
    }
    componentDidUpdate(){
        this.isRender = true;
        //this.validate(this.props);
    }
    componentWillUnMount(){
        this.isRender = false;
    }
    render() {
        const { onError, successTheme, errorTheme } = this.props;
        const { tipElement, checkResult, displayStyle } = this.state;
        const displayElement = tipElement || '';

        return (
            <div className={displayStyle}>
                {this.props.children}
                {displayElement}
            </div>
        );
    }
}
Validated.contextTypes = {
    validation: PropTypes.object
};

Validated.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    errorMsg: PropTypes.object,
    errorTheme: PropTypes.string,
    successTheme: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.node
    ]),
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func
};

Validated.defaultProps = {
    errorMsg: {},
    errorTheme: styles.errorMessage,
    successTheme: ''
}

export default Validated;
