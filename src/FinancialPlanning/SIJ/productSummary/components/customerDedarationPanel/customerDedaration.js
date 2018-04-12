import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form'
import {updateFormData} from '../../actions/sij_gs_act';
import UIStyles from 'Sample/components/ui.scss'

export default class SIJCustomerDedaration extends Component {
    constructor (props) {
        super(props);
        this.state = {
        
        };
        this.Check = this.Check.bind(this);
    }

    Check(event,isChecked,index){
        debugger;
        this.props.updateFormData();
    }
    render () {
        return (
                <div className={styles.dedarationMain} >
                   <span >Disclaimer & declarations</span>
                   <p>Please refer to insurance remarks and risk disclosure below for details<br/>
                      The icon besides product risk indicate that this product suitability checks failed</p>
                   <strong> <h6>Customer dedaration</h6></strong>
                    <div className={styles.prompt}>
                        <input type="checkbox" className={styles.chkbox} id="chkbox1" />
                        <label htmlFor="chkbox1" />
                        <span className={styles.description}>
                            There is life insurance product which can fulfill the following objective(s) that you selected 
                        </span>
                    </div>
                    <p className={styles.dedarationP}>Preparation for health care needs(e.g. critical illness,gospitalization etc)<br/>
                       Providing regular income in the future(e.g. retirement income etc)<br/>
                       investment</p>
                    <div className={styles.prompt}>
                        <input type="checkbox" className={styles.chkbox} id="chkbox2" />
                        <label htmlFor="chkbox2" />
                        <span className={styles.description}>
                            You acknowledge that there is no alternative life insurance product which matches with your need.
                        </span>
                    </div>
                    <div className={styles.prompt}>
                        <input type="checkbox" className={styles.chkbox} id="chkbox3" />
                        <label htmlFor="chkbox3" />
                        <span className={styles.description}>
                            You consider Proceeding with this insurance policy application because this product is able to
                        </span>
                    </div>
                    <div>
                        <Textarea placeholder="please enter"/>
                     </div>         
                    <div className={styles.prompt}>
                        <input type="checkbox" className={styles.chkbox} id="chkbox4" />
                        <label htmlFor="chkbox4" />
                        <span className={styles.description}>
                            You comnfirm that you have purchased similar life insurance in the past 12 months.The reason of multiple purchase is 
                        </span>
                    </div>
                    <div>
                        <textarea name="insuranceRemark2" className={styles.textString} placeholder="Type here..." />
                     </div> 
                     <div className={styles.prompt}>
                        <input type="checkbox" className={styles.chkbox} id="chkbox5" />
                        <label htmlFor="chkbox5" />
                        <p className={styles.declaration}>
                                You acknowledge that the product(s) /transcaion(s) are not recommended by us and may not be suitable for you.but you have decided go ahead with 
                            <br/>the transcation(s).We have not solicated the sale or provided any recommendation of, or advise on, this product.This transction is executed based on your own 
                            <br/>judgment.We do not have any obligation or duty to assess whether or ensure that the product(s) are suitable for you. You acknowlwdge and agree that it is your 
                            <br/>sole responsibility to assess and to satify yourself that the product(s) /transcation(s) are apporiate for you.
                        </p>
                    </div>
                    <strong> <h6>Remark</h6></strong>
                    <p className={styles.remarkContext}>if you stil have a life protection shortfall after the insurance plan, please document details and the remaining shortfall below.</p>
                    <div>
                        <textarea  name="Remark" className={styles.textString} placeholder="Type here..." />
                     </div> 
               </div>      
        
        );
    }
}
