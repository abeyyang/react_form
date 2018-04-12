import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {updateSampleField, addSampleRecord} from '../actions/sample_act';

import classNames from 'classnames';
import styles from './style.scss';
import UIStyles from './ui.scss';

// --------
// form
// --------
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form'
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';
import Form, { Input, SelectButton} from 'wealth/lib/web/components/ui/form';

import Title from 'wealth/lib/web/components/ui/title';
import { Details, Summary } from 'wealth/lib/web/components/ui/detailsSummary';
import Button from 'wealth/lib/web/components/ui/button';



class SampleForm extends Component {
    constructor (props) {
        super(props);

        console.log("++++Test: here is props for SampleForm : ", props);
        this.state = {
            flag : false
        };

        this.buttonClick = this.buttonClick.bind(this);
        this.multipleDropdownChange  = this.multipleDropdownChange.bind(this);
    }

    buttonClick (event) {
        console.log("++++Test: buttonClick ", event);
        console.log("++++Test: the latest state is ", this.state);
        
        const result = this.props.validateByTag("example",(error)=>{
            console.log("ErrorValidators:", error);
        });
        alert('Form validate pass ?' + result);

        if (result == true) {
            this.props.addSampleRecord();
        }
    }

    multipleDropdownChange (selectedOption) {
        console.log("++++Test: multipleDropdownChange ", selectedOption);
        this.props.updateSampleField({multipleDropdownValue : selectedOption});
    }


    render () {

        const radioGroup = [
            {key: 'Y', desc: 'YES'},
            {key: 'N', desc: 'NO'},
            {key: 'NA', desc: 'Not Applicable'},
        ];

        // single dropdown options:
        const dropdownList = [
            {value: 'AMH', displayValue: 'Hong Kong'},
            {value: 'AOC', displayValue: 'China', img: require('./images/pic2.png'),},
            {value: 'SGH', displayValue: 'Singapore'}
        ];

        const multiData = [
            {
                img: require('./images/pic1.png'),
                value: 'AMH',
                displayValue: 'Hong Kong'
            },{
                img: require('./images/pic2.png'),
                value: 'AOC',
                displayValue: 'China'
            },{
                value: 'SGH',
                displayValue: 'Singapore'
            },{
                value: 'FR',
                displayValue: 'France'
            },{
                value: 'CA',
                displayValue: 'Canada'
            }
        ];
        
        return (

            <div>

<Title title="Form" />


<Form action="/form" method="POST" theme={styles} onSubmit={this.handleSubmit}>

    <br/>
    <h2>Input:</h2>
    <br/>

    
    <Input htmlAttributes={ {maxLength : 10 } } name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.form.inputValue} theme={UIStyles} onChange = { (event) => { this.props.updateSampleField( {inputValue : event.target.value} ); } } />

    <br/><br/>
    <h2> Amount Input with 500px </h2>
    

    <Validated id="example_validate"
        type={ValidateTypes.RangeValidate}
        value={this.props.form.amountValue}
        tag="example"
        successTheme={styles.succssInput}
        rangeErrorMsg="我在这里覆盖了validatevalidator中的错误信息提示内容"
        isRequired
        onError={(code,msg)=>{
            console.log("++++Test: code = ", code);
            return <div className={styles.errorMessage}><span>{msg}</span></div>;
        }}
        onSuccess={ () => {
            console.log("++++Test: logic here to handle success input if any.");
        } }
    >
        <AmountInput type="decimal" data-role="validate" showStar={true} data-role="validate"
            symbol={this.props.form.amountCurrency} width={'500px'}
            value={this.props.form.amountValue}
            onChange={(value,disValue) => {
                this.props.updateSampleField({
                    amountValue : value
                });
            }}
        />
    </Validated>

    <br/><br/>

    <AmountDisplay currency={this.props.form.amountCurrency} value={this.props.form.amountValue} theme={UIStyles} />

    <br/><br/>


    <h2> Checkbox </h2>

    <div className={UIStyles.checkboxList}>
        <ul>
            <li>
                <label htmlFor="checkboxes-1">
                    <Checkbox name="URGENT" value={this.props.form.checkboxValue == 'URGENT' ? 1 : 0 } id="checkboxes-1" theme={UIStyles} onChange= { (event, isChecked, index) => { this.props.updateSampleField( {checkboxValue: isChecked ? 'URGENT' : null }); } }  />
                    <span>Is it urgent ?</span>
                </label>
            </li>
        </ul>
    </div>

    <br/><br/>

    <h2> Radio button </h2>

    <div className={UIStyles.radioButtonList}>
        <ul>

        {radioGroup.map((item, index) => {

            const radioId = "RadioButton-" + index;

            return(
                    <li key={radioId}>
                        <label htmlFor={radioId} className={UIStyles.radioButtonLabel}>
                            <RadioButton name="RadioButtonX" id={radioId} value={item.key} theme={UIStyles} onChange= { (event) => { this.props.updateSampleField( {radioValue : event.target.value} ); } } defaultChecked={this.props.form.radioValue == item.key ? true : false} />
                            <span className={UIStyles.labelText}>{item.desc}</span>
                        </label>
                    </li>
            )
        })}

        </ul>
    </div>

    <br/><br/>

    <h2> Single Dropdown </h2>
    <br/>
    <span>Basic: </span>
    <Dropdown id="basicSingleDropdown" name="basicSingleDropdown" option={dropdownList} initialValue={this.props.form.singleDropdownValue} onChange={(selectedObj, index) => { this.props.updateSampleField( {singleDropdownValue : selectedObj.value} ); }} />
    
    <br/>
    <span>Disabled</span>
    <Dropdown id="basicSingleDropdown2" name="basicSingleDropdown2" option={dropdownList} initialValue={this.props.form.singleDropdownValue} disabled={true} onChange={(selectedObj, index) => { this.props.updateSampleField( {singleDropdownValue : selectedObj.value} ); }} />
    <br/>

    <br/><br/>


    <h2>MultiCheckbox:</h2>
    <br/>
    <span>Single column</span>
    <MultiSelect displayString="You have selected {{value}} items" initialValue = {this.props.form.multipleDropdownValue} name="multiCheckbox" id="multiCheckbox" onChange={this.multipleDropdownChange} option={multiData} />
    <br/>
    <span>3 columns </span>
    <MultiSelect column={4}  displayString="You have selected {{value}} items" initialValue = {this.props.form.multipleDropdownValue}  name="multiCheckbox2" id="multiCheckbox2" onChange={this.multipleDropdownChange} option={multiData} />
    <br/>
    <span>Disabled</span>
    <MultiSelect disabled={true} displayString="You have selected {{value}} items" initialValue = {this.props.form.multipleDropdownValue} name="multiCheckbox3" id="multiCheckbox3" onChange={this.multipleDropdownChange} option={multiData} />
    <br/><br/>

    <h2>Text Area:</h2>
    <Textarea placeholder="please enter" value={this.props.form.textAreaText} onChange = { (event) => { this.props.updateSampleField( {textAreaText:  event.target.value} );} } />

    <br/>
    <span>Disabled</span>
    <br/>
    <Textarea disabled={true} placeholder="please enter" value={this.props.form.textAreaText} onChange = { (event) => { this.props.updateSampleField( {textAreaText:  event.target.value} );} } />

    <br/>
    <br/>

    <Button value="Submit" onClick = { (event) =>  { this.buttonClick(event); } }/>

    <br/><br/>
    
</Form>

                </div>
        );
    }
}


SampleForm.propTypes = {
    validateByTag: PropTypes.func.isRequired,
    demo: PropTypes.string
};

const mapStateToProps = (state) => ({
    form: state.sampleReducer.formSample
})

const mapDispatchToProps = {
    updateSampleField,
    addSampleRecord
}

SampleForm = connect(mapStateToProps, mapDispatchToProps)(SampleForm);

export default ValidationController(SampleForm);