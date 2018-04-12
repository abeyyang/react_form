import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import UIStyles from '../../../../../Sample/components/ui.scss';
import {RadioButton, Checkbox,Textarea } from 'CommonUI/Form';
import {goalSummaryValidation} from 'config/investmentConfig'

export default class CustomerDedaration extends Component {
    constructor (props) {
        super(props);
        this.state = {
        
        };
       
    }
    handleValidation(item){
        goalSummaryValidation.GOAL_SUMMARY_VALIDATIONRATIONS.map((validation)=>{
            if(item.typeCode == validation.key){
                console.log(validation,item,"zhe dou shi sah");
                return (<strong> <h6>{validation.value} {item.value}</h6></strong>);
            }
        })
    }
    render () {
      const radioGroup = [
            {key: 'Y', desc: 'less than 20% of your total net worth (excluding real estate properties).'},
            {key: 'N', desc: 'between 20% and 50% of your total net worth (excluding real estate properties).'},
            {key: 'NA', desc: 'more than 40% of your total net worth (excluding real estate properties).'},
        ];
    const highYeildradioGroup = [
            {key: 'Y', desc: 'less than 20% of your total net worth (excluding real estate properties).'},
            {key: 'N', desc: 'between 20% and 40% of your total net worth (excluding real estate properties).'},
            {key: 'NA', desc: 'more than 40% of your total net worth (excluding real estate properties).'},
        ];
        console.log("valition custcons",this.props.validationDetails);
        const {validationDetails} = this.props;
        return (
                <div className={styles.dedarationMain} >
                   <span >Customer Declarations</span>
                   <p>Total net worth is defined as liquid assets minus liabilities (excluding real estate properties), {validationDetails.totalNetWorth.currency} {validationDetails.totalNetWorth.value==undefined?0:validationDetails.totalNetWorth.value}</p>
                   <div className={styles.naconOne}>
                        <div className={styles.mt20}>
                            {
                                validationDetails.validationList.map((item,key)=>{
                                    {/*this.handleValidation(item)          */}
                                    if(item.typeCode == 'AC_HYB'){
                                        return (<strong> <h6>Asset Concentration (High Yield Bonds) {item.value}%</h6></strong>);
                                    }
                                    if(item.typeCode == 'AC_ELI'){
                                        return (<strong> <h6>Asset Concentration (Equity Linked Investments) {item.value}%</h6></strong>);
                                    }
                                    if(item.typeCode == 'AC_HYB_FUND'){
                                        return (<strong> <h6>Asset Concentration (Funds requiring Derivative Knowledge) {item.value}%</h6></strong>);
                                    }
                                    if(item.typeCode == 'AC_DERI_FUND'){
                                        return (<strong> <h6>Asset Concentration (High Yield Bond Fund) {item.value}%</h6></strong>);
                                    }
                                    if(item.typeCode == 'AC_SOB'){
                                        return (<strong> <h6>Asset Concentration (Subordinated Bonds) {item.value}%</h6></strong>);
                                    }
                                    if(item.typeCode == 'AC_INVST' ){
                                        return (<strong> <h6>Asset Concentration {item.UTValidation.value}{item.UTValidation.value !=null?"%(UT)":""}
                                            {item.BondValidation.value}{item.BondValidation.value!=null?'%(Bond/CD)':''}
                                            {item.STRUValidation.value}{item.STRUValidation.value!=null?'%(Struct)':''}
                                            </h6></strong>);
                                    }
                                })
                            }
                            
                            <div className={styles.clearfix}>
                                <p className={styles.question}>You confirm that your cumulative investment (including this transaction) in high yield bond funds is</p>
                                   <div className={UIStyles.radioButtonList}>
                                        <ul>
                                        {highYeildradioGroup.map((item, index) => {
                                            const radioId = "RadioButtonH-" + index;
                                            return(
                                                    <li key={radioId}>
                                                        <label htmlFor={radioId} className={UIStyles.radioButtonLabel}>
                                                            <RadioButton name="RadioButtonH" id={radioId} value={item.key} theme={UIStyles}  />
                                                            <span className={UIStyles.labelText}>{item.desc}</span>
                                                        </label>
                                                    </li>
                                                        )
                                                })}
                                        </ul>
                                    </div>
                                
                            </div>
                        </div> 
                    </div>
                    <div className={styles.naconTwo}>
                        <div className={styles.mt20}>
                            <strong> <h6>Asset Concentration 6.03%(UT)</h6></strong>
                                <div className={styles.clearfix}>
                                <p className={styles.question}>You confirm that your cumulative investment (including this transaction) in each product category is  </p>
                                    <div className={UIStyles.radioButtonList}>
                                        <ul>
                                        {radioGroup.map((item, index) => {
                                            const radioId = "RadioButton-" + index;
                                            return(
                                                    <li key={radioId}>
                                                        <label htmlFor={radioId} className={UIStyles.radioButtonLabel}>
                                                            <RadioButton name="RadioButtonX"  id={radioId} value={item.key} theme={UIStyles}  />
                                                            <span className={UIStyles.labelText}>{item.desc}</span>
                                                        </label>
                                                    </li>
                                                        )
                                                })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> 

                       <div className={UIStyles.checkboxList}>
                            <ul>
                                <li>
                                    <label htmlFor="checkboxes-1">
                                        <Checkbox name="URGENT"  id="checkboxes-1" theme={UIStyles}  />
                                        <span>You acknowledge that the product(s) / transaction(s) are not recommended by us and may not be suitable for you, but you have decided to go ahead with the transaction(s). We have not solicited the sale or provided any recommendation of, or advice on, this product. This transaction is executed based on your own judgment. We do not have any obligation or duty to assess whether or ensure that the product(s) / transaction(s) are suitable for you. You acknowledge and agree that it is your sole responsibility to assess and to satisfy yourself that the product(s) / transaction(s) are approbate for you.</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    <strong> <h6>Remark</h6></strong>
                    <p className={styles.remarkContext}>
                        [For insurance] if you still have a life protection shortfall after selecting the insurance plan, please document details and the remaining  shortfall below. If customer does not disclose financial situation but declares that s/he has total current assets of HK$50,000 or more AND a regular source of income, please document it below.
                    </p>
                    <div>
                        <textarea  name="Remark" className={styles.textString} placeholder="Type here..." />
                     </div> 
               </div>      
        );
    }
}
