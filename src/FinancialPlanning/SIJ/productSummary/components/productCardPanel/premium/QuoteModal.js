import React, { Component } from 'react';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import  Title from 'wealth/lib/web/components/ui/title';
import FormatHelper from 'common/lib/formatHelper';
import PopupStyle from './popup.scss'; 
import {browserHistory} from 'react-router';
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form';
import Form, { Input, SelectButton} from 'wealth/lib/web/components/ui/form';
import UIStyles from 'common/styles/ui.scss';


export default class SIJModal extends Component {
    constructor (props) {
        super(props);
        this.confirmSIJOverlay = this.confirmSIJOverlay.bind(this);
        this.cancelSIJOvleray = this.cancelSIJOvleray.bind(this);
        this.sumInsuredOnchange = this.sumInsuredOnchange.bind(this);
        this.state = {
            singleDropdownValue : 'AOC',
            inputValue : 'X',
            checkboxValue : null
        };
    }
   
    componentWillReceiveProps(nextProps) {
       
    }
    confirmSIJOverlay(){
        
        this.props.confirmSIJOverlay;
    }
    cancelSIJOvleray(){
          
        this.props.cancelSIJOvleray;
    }
    sumInsuredOnchange(event){
        debugger;
        console.log('sumInsuredOnchange....',event.value,event.displayValue);
        let params={

        }
        this.props.updateGetQuoteForm();
    }
    render () {
         const dropdownList = [
            {value: 'AMH', displayValue: 'HKD'},
            {value: 'AOC', displayValue: 'AOC'},
            {value: 'SGH', displayValue: 'SGH'}
        ];
        let currencyCodeList =[]
        if(this.props.getQuoteData.currencyCodeList==undefined){
                 currencyCodeList=[
                {value: 'USD', displayValue: 'USD'},
                {value: 'TWD', displayValue: 'TWD'},
                {value: 'GBP', displayValue: 'GBP'},
                {value: 'EUR', displayValue: 'EUR'},
                {value: 'JPY', displayValue: 'JPY'},
                {value: 'AUD', displayValue: 'AUD'},
                {value: 'HKD', displayValue: 'HKD'},
                {value: 'NZD', displayValue: 'NZD'},
            ]
        }
        let selectCurrencyCode=''
        if(this.props.getQuoteData.selectCurrencyCode==undefined){
                 selectCurrencyCode='HKD'
        }
        console.log('currencyCodeList...',this.props.getQuoteData);
        return (
                <div >
                    <div className={PopupStyle.title}><h2>Get a quote</h2></div>
                    <p className={PopupStyle.description}>Wealthsave insurance plan |||</p>
                    <div className={PopupStyle.quotationDetail}>
                        <h2 className={PopupStyle.quotationTitle}>quotation details</h2>
                        <div className={PopupStyle.indicate}><span>*</span>indicates a required filed</div>
                        <table className={PopupStyle.quotationTable}>
                            <tr>
                                <td>Sum insured&nbsp;<span className={PopupStyle.quotationFlag}>*</span></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>Frequency&nbsp;<span className={PopupStyle.quotationFlag}>*</span></td>
                                <td>&nbsp;</td>
                            </tr>
                             <tr>
                                <td>
                                    {/*<Dropdown theme={PopupStyle} id="SumInsuredDropdown" name="SumInsuredDropdown" option={this.props.getQuoteData.currencyCodeList==undefined?currencyCodeList:this.props.getQuoteData.currencyCodeList}  onChange={this.sumInsuredOnchange}  initialValue={this.props.getQuoteData.selectCurrencyCode==undefined? selectCurrencyCode:this.props.getQuoteData.selectCurrencyCode}/>*/}
                                </td>
                                <td>
                                    <Input name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value="100,000.00" theme={PopupStyle} onChange = { (event) => { this.setState( {inputValue: event.target.value} ); } } />
                                </td>
                                <td>&nbsp;</td>
                                <td>
                                    {/*<Dropdown theme={PopupStyle} id="FrequencyDropdown" name="FrequencyDropdown" option={dropdownList} onChange={this.sumInsuredOnchange} />*/}
                                    </td>
                                <td><FontIcon icon="circle-help-solid" className={PopupStyle.iconHelp} /></td>
                            </tr>
                             <tr>
                                <td>Premium &nbsp;<span className={PopupStyle.quotationFlag}>*</span></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>Payment term &nbsp;<span className={PopupStyle.quotationFlag}>*</span></td>
                                <td>&nbsp;</td>
                            </tr>
                             <tr>
                                <td>
                                    {/*<Dropdown theme={PopupStyle} id="PremiumDropdown" name="PremiumDropdown" option={dropdownList} initialValue={this.state.singleDropdownValue} onChange={(selectedObj, index) => { this.setState( {singleDropdownValue : selectedObj.value} ); }} />*/}
                                </td>
                                <td>
                                    <Input name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value="100,000.00" theme={PopupStyle} onChange = { (event) => { this.setState( {inputValue: event.target.value} ); } } />
                                </td>
                                <td>&nbsp;</td>
                                <td className={PopupStyle.yearInput}><Input name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value="30" theme={PopupStyle} onChange = { (event) => { this.setState( {inputValue: event.target.value} ); } } />&nbsp;&nbsp;Year</td>
                                <td><FontIcon icon="circle-help-solid" className={PopupStyle.iconHelp} /></td>
                            </tr>
                            <tr>
                                <td colSpan="5">Policy effective date &nbsp;<span className={PopupStyle.quotationFlag}>*</span></td>
            
                            </tr>
                            <tr>
                                <td colSpan="5">
                                    <Input name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value="100,000.00" theme={PopupStyle} onChange = { (event) => { this.setState( {inputValue: event.target.value} ); } } />
                                    <FontIcon icon="circle-help-solid" className={PopupStyle.iconHelp} />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className={PopupStyle.riders}>
                        <h2 className={PopupStyle.ridersTitle}>Add riders</h2>
                        <table className={PopupStyle.ridersTable}>
                            <tr>
                                <td>
                                    <label htmlFor="checkboxes-1">
                                        <Checkbox name="URGENT" value={this.state.checkboxValue == 'URGENT' ? 1 : 0 } id="checkboxes-1" theme={PopupStyle} onChange= { (event, isChecked, index) => { this.setState( {checkboxValue: isChecked ? 'URGENT' : null }); } }  />
                                        <span className={PopupStyle.ridersCnt}>Female benefit</span>
                                    </label>
                                </td>
                                <td>&nbsp;</td>
                                <td>
                                    <label htmlFor="checkboxes-1">
                                        <Checkbox name="URGENT" value={this.state.checkboxValue == 'URGENT' ? 1 : 0 } id="checkboxes-1" theme={PopupStyle} onChange= { (event, isChecked, index) => { this.setState( {checkboxValue: isChecked ? 'URGENT' : null }); } }  />
                                        <span className={PopupStyle.ridersCnt}>Female benefit</span>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="checkboxes-1">
                                        <Checkbox name="URGENT" value={this.state.checkboxValue == 'URGENT' ? 1 : 0 } id="checkboxes-1" theme={PopupStyle} onChange= { (event, isChecked, index) => { this.setState( {checkboxValue: isChecked ? 'URGENT' : null }); } }  />
                                        <span className={PopupStyle.ridersCnt}>Hospital cash benefit</span>
                                    </label>
                                </td>
                                <td>&nbsp;</td>
                                <td>
                                    <label htmlFor="checkboxes-1">
                                        <Checkbox name="URGENT" value={this.state.checkboxValue == 'URGENT' ? 1 : 0 } id="checkboxes-1" theme={PopupStyle} onChange= { (event, isChecked, index) => { this.setState( {checkboxValue: isChecked ? 'URGENT' : null }); } }  />
                                        <span className={PopupStyle.ridersCnt}>Hospital cash benefit</span>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="checkboxes-1">
                                        <Checkbox name="URGENT" value={this.state.checkboxValue == 'URGENT' ? 1 : 0 } id="checkboxes-1" theme={PopupStyle} onChange= { (event, isChecked, index) => { this.setState( {checkboxValue: isChecked ? 'URGENT' : null }); } }  />
                                        <span className={PopupStyle.ridersCnt}>Major illness benefit</span>
                                    </label>
                                </td>
                                <td>&nbsp;</td>
                                <td>
                                    <label htmlFor="checkboxes-1">
                                        <Checkbox name="URGENT" value={this.state.checkboxValue == 'URGENT' ? 1 : 0 } id="checkboxes-1" theme={PopupStyle} onChange= { (event, isChecked, index) => { this.setState( {checkboxValue: isChecked ? 'URGENT' : null }); } }  />
                                        <span className={PopupStyle.ridersCnt}>Major illness benefit</span>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="checkboxes-1">
                                        <Checkbox name="URGENT" value={this.state.checkboxValue == 'URGENT' ? 1 : 0 } id="checkboxes-1" theme={PopupStyle} onChange= { (event, isChecked, index) => { this.setState( {checkboxValue: isChecked ? 'URGENT' : null }); } }  />
                                        <span className={PopupStyle.ridersCnt}>Major illness benefit</span>
                                    </label>
                                </td>
                                <td>&nbsp;</td>
                                <td>
                                    <label htmlFor="checkboxes-1">
                                        <Checkbox name="URGENT" value={this.state.checkboxValue == 'URGENT' ? 1 : 0 } id="checkboxes-1" theme={PopupStyle} onChange= { (event, isChecked, index) => { this.setState( {checkboxValue: isChecked ? 'URGENT' : null }); } }  />
                                        <span className={PopupStyle.ridersCnt}>Major illness benefit</span>
                                    </label>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <hr className={PopupStyle.line}/>
                    <div className={PopupStyle.footer}>
                        <div className={PopupStyle.btnConfirmSubmit}>
                            <a href="javascript:;" onClick={this.cancelSIJOvleray}>Clear all</a>
                            <a href="javascript:;"className={PopupStyle.submit} onClick={this.confirmSIJOverlay} >Confirm</a>
                        </div>
                    </div>
                </div>
        );
    }
}
