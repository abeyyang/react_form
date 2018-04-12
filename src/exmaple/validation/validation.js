import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import { AmountInput } from 'CommonUI/Form';
import { Validated, ValidateTypes } from 'CommonUI/validation/index';

class ValidationDemoComponent extends Component {
    constructor(props, context) {
        super(props, context);
        console.log(context, 'context');
        this.state={
            bindValue: '',
            bindValue2: '',
            inputErrorStyle: '',
            phoneNumber: '',
            InputValue1: '',
            visible: true
        };
        this.onValidateByTangName = this.onValidateByTangName.bind(this);
    }
    onValidateByTangName() {
        const result = this.props.validateByTag("example",(error)=>{
            console.log("ErrorValidators:", error);
        });
        alert('Validation by tagName:' + result);
    }
    render() {
        return (
            <div className={styles.examle}>
                <div>
                    <div>
                        <h1>example component</h1>
                        <label>
                            <input type="checkbox" checked={this.state.visible} readOnly={false}
                                onChange={()=>{}}
                                onClick={(evt)=>{
                                    this.setState({
                                        visible: evt.target.checked
                                    });
                                }}
                            />
                            Show hide validationTest
                        </label>
                        {
                            this.state.visible &&
                            <Validated id="example_showhide"
                                type={ValidateTypes.RangeValidate}
                                value={this.state.InputValue1}
                                min={0}
                                max={1000}
                                onError={(err,msg)=>{
                                    return <div className={styles.errorMessage}><span>{msg}</span></div>;
                                }}
                            >
                                <AmountInput showStar={true}
                                    data-role="validate"
                                    value={this.state.InputValue1}
                                    onChange={(value)=>{
                                        this.setState({
                                            InputValue1: value
                                        })
                                    }}
                                />
                            </Validated>
                        }
                        <p style={{margin: "5px 0",display:'block'}}/>
                        <AmountInput type="decimal" min={-100} max={100} />
                        <p style={{margin: "5px 0",display:'block'}}/>
                        <h2>example component</h2>
                        <Validated id="example_validate"
                            type={ValidateTypes.RangeValidate}
                            value={this.state.bindValue}
                            tag="example"
                            successTheme={styles.succssInput}
                            rangeErrorMsg="我在这里覆盖了validatevalidator中的错误信息提示内容"
                            isRequired
                            onError={(code,msg)=>{
                                return <div className={styles.errorMessage}><span>{msg}</span></div>;
                            }}
                        >
                            <AmountInput type="decimal" data-role="validate"
                                symbol="RMB"
                                onChange={(value,disValue) => {
                                    this.setState({
                                        bindValue: value,
                                        bindValue2: disValue
                                    });
                                }}
                            />
                        </Validated>
                        <p style={{margin: "5px 0",display:'block'}}>AmountInput Data Binding:</p>
                        <input type="text" value={this.state.bindValue} />
                        <p style={{margin: "5px 0",display:'block'}}/>
                        <input type="text" value={this.state.bindValue2} />
                    </div>
                    <div>
                        <h1>MobileValidate</h1>
                        <Validated id="Mobile_PhoneValidate"
                            type={ValidateTypes.MobileValidate}
                            value={this.state.phoneNumber}
                            tag="example"
                            onError={(errCode,errMsg)=>{
                                return <div className={styles.errorMessage}><span>{errMsg}</span></div>;
                            }}
                        >
                            <input type="text" value={this.state.phoneNumber} data-role="validate"
                                onChange={(event)=>{
                                    this.setState({
                                        phoneNumber: event.target.value
                                    });
                                }}
                            />
                            <button style={{display: "block", padding: "10px 20px",marginTop:"10px"}} data-role="validate">test component</button>
                            <button onClick={this.onValidateByTangName} style={{display: "block", padding: "10px 20px",marginTop:"10px"}}>ValidateByTagName</button>
                        </Validated>
                    </div>
                </div>
            </div>
        );
    }
}
ValidationDemoComponent.propTypes = {
    validateByTag: PropTypes.func.isRequired,
    demo: PropTypes.string
};
export default ValidationDemoComponent;
