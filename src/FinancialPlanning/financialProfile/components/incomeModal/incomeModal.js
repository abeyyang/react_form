import React, { Component } from 'react';
import Modal from '../../../../common/components/trading/Modal';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import  Title from 'wealth/lib/web/components/ui/title';
import FormatHelper from 'common/lib/formatHelper'; 


export default class IncomeModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            incomeDetail:{
                personalDetail:{
                },
                contriByFamliyDetial:{
                },
                divideIncomeDetail:{
                },
                rentalIncomeDetail:{
                },
                otherIncomeDetail:{
                }
            },
            innerScroll: false
        };
        this.ClearAllHandle = this.ClearAllHandle.bind(this);
        this.changeAmountValue = this.changeAmountValue.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.handleFormattedNum = this.handleFormattedNum.bind(this);
        this.handleClearFormattedNum = this.handleClearFormattedNum.bind(this);
    }
    //handle clear formatted pattern
    handleClearFormattedNum(event){
        console.log("handle onFocus",event.target.value.replace(/,/g,''));
         let incomeDetail = this.state.incomeDetail;
        incomeDetail[event.target.name].amount =event.target.value.replace(/,/g,'');
        this.setState({
            value:event.target.value.replace(/,/g,'')
        });
    }
    //handle formatted input num 
    handleFormattedNum(event){
        console.log("handle onBlur",event.target.value);
        let incomeDetail = this.state.incomeDetail;
        incomeDetail[event.target.name].amount =FormatHelper.addThousandSeparator(event.target.value);
        this.setState({
            value:FormatHelper.addThousandSeparator(event.target.value)
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            incomeDetail: nextProps.incomeDetail
        });
    }

    //change state amount
    changeAmountValue(event){
        let incomeDetail = this.state.incomeDetail;
        incomeDetail[event.target.name].amount =event.target.value;
        this.setState({
            value:event.target.value
        });
    }
    //clear all input value
    ClearAllHandle(){
        console.log("clear all");
        let incomeDetail = this.state.incomeDetail;
        incomeDetail.personalDetail.amount='';
        incomeDetail.contriByFamliyDetial.amount='';
        incomeDetail.divideIncomeDetail.amount='';
        incomeDetail.otherIncomeDetail.amount='';
        incomeDetail.rentalIncomeDetail.amount='';
        this.setState({
            incomeDetail:incomeDetail
        })
     
    }
    //submit total value
    submitHandle(){
        let incomeDetail = this.state.incomeDetail; 
        let incomeObj ={
            detailList:[],
            total:{}
        };
        var totalIncome = null;
      
        incomeObj.detailList.push(incomeDetail.contriByFamliyDetial);
        incomeObj.detailList.push(incomeDetail.divideIncomeDetail);
        incomeObj.detailList.push(incomeDetail.personalDetail);
        incomeObj.detailList.push(incomeDetail.rentalIncomeDetail);
        incomeObj.detailList.push(incomeDetail.otherIncomeDetail);
        incomeObj.detailList.map((map)=>{
            // (map.amount).replace(/,/g,'')
            map.amount=String(map.amount).replace(/,/g,'');
            if(!isNaN(parseInt(map.amount))){
                totalIncome += parseFloat(map.amount);
            }
        })
        incomeObj.total={
            amount:totalIncome,
            currencyCode:incomeDetail.personalDetail.currencyCode
        }
        this.props.submitForm(incomeObj,"income");
    }
    render () {
        console.log("income details",this.props.incomeDetail);
        return (
                <div className={styles.IncomeModal}>
                    <h1><Title title="Help me Calculate" /></h1>
                    <div className={styles.description}><span>Please enter the details of your last 2 years average monthly income.</span></div>
                    <table>
                        <tr>
                            <td>Person income</td>
                            <td>HSBC record</td>
                            <td>Deviation</td>
                        </tr>
                        <tr>
                            <td>
                                <div className={styles.personalBlock}>
                                <div className={styles.currencyType}>
                                    <span>{this.state.incomeDetail.personalDetail.currencyCode}</span>
                                    <input type="text" ref="personalDetail" name="personalDetail" value={this.state.incomeDetail.personalDetail.amount} onBlur={this.handleFormattedNum} onChange={this.changeAmountValue} onFocus={this.handleClearFormattedNum} placeholder="Please enter"  className={styles.num}/>
                                </div>
                                <span className={styles.personalDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.personanDetailTip}>
                                     Personal income, e.g. the salary that you receive.
                                    <div className={styles.arrowDown}></div>
                                </p>
                                </div>
                            </td>
                            <td> 
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" disabled className={styles.num}/>
                                </div>
                                </td>
                            <td>
                                 <div className={styles.recordStyle}>
                                    <input type="text" name="amount" value="N/A" disabled className={styles.num}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Contribution by family member</td>
                        </tr>
                        <tr>
                            <td>
                             <div className={styles.currencyType}>
                                    <span>{this.state.incomeDetail.contriByFamliyDetial.currencyCode}</span>
                                    <input type="text" ref="contriByFamliyDetial" name="contriByFamliyDetial" value={this.state.incomeDetail.contriByFamliyDetial.amount} onBlur={this.handleFormattedNum} onChange={this.changeAmountValue} onFocus={this.handleClearFormattedNum} placeholder="Please enter"  className={styles.num}/>
                                </div>
                                <span className={styles.contriByFamliyDetialOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                  <p className={styles.contriByFamliyDetialTip}>
                                     Allowances that you receive from your family member.
                                    <div className={styles.arrowDown}></div>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Dividend / Interest income
                            </td>
                        </tr>
                        <tr>
                            <td>
                             <div className={styles.currencyType}>
                                    <span>{this.state.incomeDetail.divideIncomeDetail.currencyCode}</span>
                                    <input type="text" ref="divideIncomeDetail" name="divideIncomeDetail" value={this.state.incomeDetail.divideIncomeDetail.amount} onBlur={this.handleFormattedNum} onChange={this.changeAmountValue} onFocus={this.handleClearFormattedNum} placeholder="Please enter"  className={styles.num}/>
                                </div>
                                <span className={styles.divideIncomeDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.divideIncomeDetailTip}>
                                     Dividends or interests that you receive from investments or savings.
                                    <div className={styles.arrowDown}></div>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Rental income
                            </td>
                        </tr>
                        <tr>
                            <td>
                             <div className={styles.currencyType}>
                                    <span>{this.state.incomeDetail.rentalIncomeDetail.currencyCode}</span>
                                    <input type="text" ref="rentalIncomeDetail" name="rentalIncomeDetail" value={this.state.incomeDetail.rentalIncomeDetail.amount} onBlur={this.handleFormattedNum} onChange={this.changeAmountValue} onFocus={this.handleClearFormattedNum} placeholder="Please enter"  className={styles.num}/>
                                </div>
                                <span className={styles.rentalIncomeDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.rentalIncomeDetailTip}>
                                    Income that you receive from renting out your properties.
                                    <div className={styles.arrowDown}></div>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Other income 
                            </td>
                        </tr>
                        <tr>
                            <td>
                             <div className={styles.currencyType}>
                                    <span>{this.state.incomeDetail.otherIncomeDetail.currencyCode}</span>
                                    <input type="text" ref="otherIncomeDetail" name="otherIncomeDetail" value={this.state.incomeDetail.otherIncomeDetail.amount} onBlur={this.handleFormattedNum} onChange={this.changeAmountValue} onFocus={this.handleClearFormattedNum} placeholder="Please enter"  className={styles.num}/>
                                </div>
                                <span className={styles.otherIncomeDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.otherIncomeDetailTip}>
                                    Any other moneys that you receive on a regular basis, e.g. from pension, insurance, etc.
                                    <div className={styles.arrowDown}></div>
                                </p>
                            </td>
                        </tr>
                    </table>
                    <hr className={styles.line}/>
                    <div className={styles.footer}>
                        <div className={styles.clearAll}><input  onClick={this.ClearAllHandle} type="button" value="Clear all"/></div>
                        <div className={styles.btnCopySubmit}>
                            {/*<input type="button" value="copy" className={styles.copy}/>*/}
                            <input type="button" className={styles.submit} onClick={this.submitHandle} value="submit"/>
                        </div>
                    </div>
                </div>
        );
    }
}
