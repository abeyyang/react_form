import React, { Component } from 'react';
import classNames from 'classnames';
import Modal from '../../../../common/components/trading/Modal';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import  Title from 'wealth/lib/web/components/ui/title';
import FormatHelper from 'common/lib/formatHelper';

export default class ExpenseModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            expenseDetail:{
                personalDetail:{},
                mortgageRentalDetail:{},
                educationDetail:{},
                otherDetail:{},
                monthInsuranceDetail:{},
                rentalPaymentDetial:{}
            }
        };
        this.changeAmountValue = this.changeAmountValue.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.handleFormattedNum = this.handleFormattedNum.bind(this);
        this.handleClearFormattedNum = this.handleClearFormattedNum.bind(this);
    }
    //handle formatted num
    handleFormattedNum(event){
        let expenseDetail = this.state.expenseDetail;
        expenseDetail[event.target.name].amount = FormatHelper.addThousandSeparator(event.target.value);
        this.setState({
            value:FormatHelper.addThousandSeparator(event.target.value)
        });
    }
    //handle clear formatted 
    handleClearFormattedNum(event){
        let expenseDetail = this.state.expenseDetail;
        expenseDetail[event.target.name].amount = event.target.value.replace(/,/g,'');
        this.setState({
            value:event.target.value.replace(/,/g,'')
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log("props is below");
        console.log(nextProps);
        this.setState({
            expenseDetail: nextProps.expenseDetail
        });
    }
    // change amount
    changeAmountValue(event){
        let expenseDetail = this.state.expenseDetail;
        expenseDetail[event.target.name].amount = event.target.value;
        this.setState({
            value:event.target.value
        });
    }
    //clear input value
    ClearAllHandle(){
        let expenseDetail = this.state.expenseDetail;
        expenseDetail.personalDetail.amount='';
        expenseDetail.mortgageRentalDetail.amount='';
        expenseDetail.monthInsuranceDetail.amount='';
        expenseDetail.otherDetail.amount='';
        expenseDetail.educationDetail.amount='';
        expenseDetail.rentalPaymentDetial.amount='';
        this.setState({
            expenseDetail:expenseDetail
        })
    }
    // submit total value
    submitHandle(){
        let expenseDetail = this.state.expenseDetail;
         let expenseObj ={
            detailList:[],
            total:{}
        };
        var totalExpense = null;
        expenseObj.detailList.push(expenseDetail.mortgageRentalDetail);
        expenseObj.detailList.push(expenseDetail.monthInsuranceDetail);
        expenseObj.detailList.push(expenseDetail.personalDetail);
        expenseObj.detailList.push(expenseDetail.otherDetail);
        expenseObj.detailList.push(expenseDetail.educationDetail);
        expenseObj.detailList.push(expenseDetail.rentalPaymentDetial);
        expenseObj.detailList.map((map)=>{
             map.amount=String(map.amount).replace(/,/g,'');
            if(!isNaN(parseInt(map.amount))){
                totalExpense += parseFloat(map.amount);
            }
        })
        expenseObj.total={
            amount:totalExpense,
            currencyCode:expenseDetail.personalDetail.currencyCode
        }
        this.props.submitForm(expenseObj,'expense');
    }
    render () {
        return (
            <div className={styles.modal}>
                <div className={styles.expensePanel}>
                    <h1><Title title="Help me Calculate" /></h1>
                    <div className={styles.description}><span>Please enter the details of your expenses.</span></div>
            
                <table>
                    <tr>
                        <td>Personal and family living expenses</td>
                    </tr>
                    <tr>
                        <td>
                        <div className={styles.currencyType}>
                                    <span>{this.state.expenseDetail.personalDetail.currencyCode}</span>
                                    <input name="personalDetail" ref="personalDetail" value={this.state.expenseDetail.personalDetail.amount} onChange={this.changeAmountValue} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} type="text"  placeholder="Please enter"  className={styles.num}/>
                                </div>
                        <span className={styles.personalDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                        <p className={styles.personalDetailTip}>
                                    Your personal and share of household spendings on a monthly basis, excluding rent.
                                    <div className={styles.arrowDown}></div>
                        </p>
                        
                        </td>
                    </tr>
                    <tr>
                        <td>Mortage / Rental payment</td>
                        <td>HSBC record</td>
                        <td>Deviation</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.currencyType}>
                                <span>{this.state.expenseDetail.mortgageRentalDetail.currencyCode}</span>
                                <input type="text" name="mortgageRentalDetail" ref="mortgageRentalDetail" value={this.state.expenseDetail.mortgageRentalDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue}  placeholder="Please enter"  className={styles.num}/>
                            </div>
                        <span className={styles.mortgageRentalDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                        <p className={styles.mortgageRentalDetailTip}>
                                   Your monthly instalments for mortgages and rental payment.
                            <div className={styles.arrowDown}></div>
                        </p>
                        </td>
                        <td>
                            <div className={styles.recordStyle}>
                                <input type="text" name="amount" className={styles.num}/>
                            </div>
                        </td>
                        <td>
                            <div className={styles.recordStyle}>
                                <input type="text" name="amount" value="N/A" disabled className={styles.num}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colSpan='2'>Remarks</td>
                    </tr>
                    <tr>
                        <td>Education expenses</td>
                        
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.currencyType}>
                                <span>{this.state.expenseDetail.educationDetail.currencyCode}</span>
                                <input name="educationDetail" ref="educationDetail" value={this.state.expenseDetail.educationDetail.amount} type="text" onChange={this.changeAmountValue} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum}  placeholder="Please enter"  className={styles.num}/>
                            </div>
                        <span className={styles.educationDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                        <p className={styles.educationDetailTip}>
                                   Education expenses.
                            <div className={styles.arrowDown}></div>
                        </p>
                        </td>
                    </tr>
                    <tr>
                         <td>Provident Fund/MPF contribution</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.currencyType}>
                                <span>{this.state.expenseDetail.rentalPaymentDetial.currencyCode}</span>
                                <input name="rentalPaymentDetial" onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} ref="rentalPaymentDetial" value={this.state.expenseDetail.rentalPaymentDetial.amount} type="text" onChange={this.changeAmountValue}  placeholder="Please enter"  className={styles.num}/>
                            </div>
                        <span className={styles.rentalPaymentDetialOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                        <p className={styles.rentalPaymentDetialTip}>
                                Your monthly contribution to provident fund and/or MPF.
                            <div className={styles.arrowDown}></div>
                        </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Other expenses</td>
                    </tr>
                    <tr>
                        <td><div className={styles.currencyType}>
                                <span>{this.state.expenseDetail.otherDetail.currencyCode}</span>
                                <input name="otherDetail" ref="otherDetail" value={this.state.expenseDetail.otherDetail.amount} type="text" onChange={this.changeAmountValue} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum}  placeholder="Please enter"  className={styles.num}/>
                            </div>
                        <span className={styles.otherDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                        <p className={styles.otherDetailTip}>
                               Any other regular monthly spendings.
                            <div className={styles.arrowDown}></div>
                        </p>
                        </td>
                    </tr>
                    <tr>
                        <td>Monthly insurance premium</td>
                        <td>HSBC record</td>
                        <td>Deviation</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.currencyType}>
                                <span>{this.state.expenseDetail.monthInsuranceDetail.currencyCode}</span>
                                <input name="monthInsuranceDetail" ref="monthInsuranceDetail" value={this.state.expenseDetail.monthInsuranceDetail.amount} type="text" onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue}  placeholder="Please enter"  className={styles.num}/>
                            </div>
                            <span className={styles.monthInsuranceDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                            <p className={styles.monthInsuranceDetailTip}>
                               Your monthly premiums on insurance policies.
                                <div className={styles.arrowDown}></div>
                            </p>
                        </td>
                        <td> 
                            <div className={styles.recordStyle}>
                                <input type="text" name="amount" className={styles.num}/>
                            </div>
                        </td>
                        <td>
                            <div className={styles.recordStyle}>
                                <input type="text" name="amount" value="N/A" disabled className={styles.num}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Remarks</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colSpan='2'>
                             <div className={styles.recordStyle}>
                                <input type="text" name="amount" className={styles.num}/>
                            </div>
                        </td>
                    </tr>
                    <tr></tr>
                    <tr></tr>
                </table>
                <div className={classNames(styles.choose, styles.clearfix)}>
                              <p>Do you pay your exisiting the insurance premium(s) by lquid assets?</p>
                              <div className={styles.insuranceRadio}>
                                    <input type="radio" id="noinsurance" name="judgment" />
                                    <label  htmlFor="noinsurance">
                                        No
                                    </label>
                                    
                                </div>
                                <div className={styles.insuranceRadio}>
                                    <input type="radio" id="allInsurance" name="judgment"  />
                                    <label htmlFor="allInsurance">
                                            Yes <span >All my exisiting life insurance premiums are paid by liquid assets</span>
                                    </label>
                                    
                                </div>
                                <div className={styles.insuranceRadio}>
                                    <input type="radio" id="partInsurance" name="judgment"  />
                                    <label htmlFor="partInsurance">
                                      Yes <span>Parts of my exisiting life insurance premiumsare paid by liquid assets</span>
                                    </label>
                                    
                                </div>
                                
                </div>
              <div className={styles.premiums}>
                  <p>Premiums of life insurancepolicy(ies) to be paid by liquid assets ( HSBC )</p>
                  <div className={styles.currencyType}>
                                    <span>HKD</span>
                                    <input type="text" name="amount"  placeholder="Please enter"  className={styles.num}/>
                                </div>
                  <span><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                  
                   <div className={styles.otherCompany}>
                       <p >Premiums of life insurancepolicy(ies) to be paid by liquid assets ( other company )</p>
                       <div className={styles.currencyType}>
                                    <span>HKD</span>
                                    <input type="text" name="amount"  placeholder="Please enter"  className={styles.num}/>
                            </div>
                        
                        <span><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                  </div>
              </div>
          
            <hr className={styles.line}/>
            <div className={styles.footer}>
                        <div className={styles.clearAll}><input  onClick={this.ClearAllHandle.bind(this)} type="button" value="Clear all"/></div>
                        <div className={styles.btnCopySubmit}>
                            {/*<input type="button" value="copy" className={styles.copy}/>*/}
                            <input type="button" className={styles.submit} onClick={this.submitHandle} value="submit"/>
                        </div>
                    </div>
            </div>
        </div>
        );
    }
}
