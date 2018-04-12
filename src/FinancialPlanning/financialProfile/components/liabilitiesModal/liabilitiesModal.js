import React, { Component } from 'react';
import Modal from '../../../../common/components/trading/Modal';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import  Title from 'wealth/lib/web/components/ui/title';
import FormatHelper from 'common/lib/formatHelper';

export default class LiabilitiesModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            liabilityDetail:{
                mortgageLoanDetail:{},
                pernalLoanDetail:{},
                shortNonDetail:{},
                longNonDetail:{}
            }
        };
        this.changeAmountValue = this.changeAmountValue.bind(this);
        this.handleFormattedNum = this.handleFormattedNum.bind(this);
        this.handleClearFormattedNum = this.handleClearFormattedNum.bind(this);
    }
    //handle clear formatted num
    handleClearFormattedNum(event){
        let liabilityDetail = this.state.liabilityDetail;
        liabilityDetail[event.target.name].amount = event.target.value.replace(/,/g,'');
        this.setState({
            value:event.target.value.replace(/,/g,'')
        });
    }
    //handle formatted num
    handleFormattedNum(event){
        let liabilityDetail = this.state.liabilityDetail;
        liabilityDetail[event.target.name].amount = FormatHelper.addThousandSeparator(event.target.value);
        this.setState({
            value:FormatHelper.addThousandSeparator(event.target.value)
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            liabilityDetail: nextProps.liabilityDetail
        });
    }
    ClearAllHandle(){
        let liabilityDetail = this.state.liabilityDetail;
        liabilityDetail.mortgageLoanDetail.amount='';
        liabilityDetail.pernalLoanDetail.amount='';
        liabilityDetail.shortNonDetail.amount='';
        liabilityDetail.longNonDetail.amount='';
        this.setState({
            liabilityDetail:liabilityDetail
        })
    }
    submitHandle(){
        let liabilityDetail = this.state.liabilityDetail; 
        let liabilityObj ={
            detailList:[],
            total:{}
        };
        var totalLiability = null;
        liabilityObj.detailList.push(liabilityDetail.mortgageLoanDetail);
        liabilityObj.detailList.push(liabilityDetail.pernalLoanDetail);
        liabilityObj.detailList.push(liabilityDetail.shortNonDetail);
        liabilityObj.detailList.push(liabilityDetail.longNonDetail);
        liabilityObj.detailList.map((map)=>{
            map.amount=String(map.amount).replace(/,/g,'');
            if(!isNaN(parseInt(map.amount))){
                totalLiability += parseFloat(map.amount);
            }
        })
        liabilityObj.total={
            amount:totalLiability,
            currencyCode:liabilityDetail.mortgageLoanDetail.currencyCode
        }
        this.props.submitForm(liabilityObj,'liability');
    }

    changeAmountValue(event){
        let liabilityDetail = this.state.liabilityDetail;
        liabilityDetail[event.target.name].amount = event.target.value;
        this.setState({
            value:event.target.value
        });
    }
    render () {
        return (
                <div className={styles.LibilityModal}>
                    <h1><Title title="Help me Calculate" /></h1>
                    <div className={styles.description}><span>Please enter the details of your libilities.</span></div>
                 <table>
                     <tr>
                        <td>Mortgage loans<br/><span className={styles.mortgageTip}>(both for self-use and investment properties)</span></td>
                        <td>HSBC record</td>
                        <td>Non HSBC record</td>
                        <td>Deviation</td>
                     </tr>
                     <tr>
                         <td> 
                            <div className={styles.currencyType}>

                                <span>{this.state.liabilityDetail.mortgageLoanDetail.currencyCode}</span>
                                <input type="text" name="mortgageLoanDetail" ref="mortgageLoanDetail" value={this.state.liabilityDetail.mortgageLoanDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue}  placeholder="Please enter"  className={styles.num}/>
                            </div>
                                <span className={styles.mortgageLoanDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.mortgageLoanDetailTip}>
                                   Outstanding loan amount on your mortgage(s).
                                    <div className={styles.arrowDown}></div>
                                </p>
                                </td>
                            <td>
                                <div className={styles.recordStyle}>
                                    <input type="text"  name="amount" className={styles.num}/>
                                </div>
                            </td>
                            <td >
                                <div className={styles.recordStyle}>

                                    <input type="text" name="shortNonDetail" ref="shortNonDetail" value={this.state.liabilityDetail.shortNonDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue} placeholder="Please enter" className={styles.num}/>
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
                            <td colSpan="3">
                                <div className={styles.remarks}>
                                    <input type="text" name="amount" className={styles.remarksNum}/>
                                </div>
                            </td>
                     </tr>
                     <tr>
                            <td>
                                Other personal loans and debts
                            </td>
                            <td>HSBC record</td>
                            <td>Non HSBC record</td>
                            <td>Deviation</td>
                        </tr>
                        <tr>
                             <td> 
                                <div className={styles.currencyType}>
                                    <span>{this.state.liabilityDetail.pernalLoanDetail.currencyCode}</span>
                                    <input type="text" name="pernalLoanDetail" ref="pernalLoanDetail" value={this.state.liabilityDetail.pernalLoanDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue}  placeholder="Please enter"  className={styles.num}/>
                                </div>
                                <span className={styles.pernalLoanDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.pernalLoanDetailTip}>
                                   Outstanding amount of any other personal debts that you are liable to repay.
                                    <div className={styles.arrowDown}></div>
                                </p>
                                </td>
                            <td>
                                <div className={styles.recordStyle}>
                                    <input type="text"  name="amount" className={styles.num}/>
                                </div>
                            </td>
                            <td >
                                <div className={styles.recordStyle}>
                                    <input type="text" name="longNonDetail" ref="longNonDetail" value={this.state.liabilityDetail.longNonDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue} placeholder="Please enter" className={styles.num}/>
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
                            <td colSpan="3">
                                 <div className={styles.remarks}>
                                    <input type="text" name="amount" className={styles.remarksNum}/>
                                </div>
                            </td>
                        </tr>
                 </table>
                <hr className={styles.line}/>
                <div className={styles.footer}>
                        <div className={styles.clearAll}><input type="button" value="Clear all" onClick={this.ClearAllHandle.bind(this)}/></div>
                        <div className={styles.btnCopySubmit}>
                            {/*<input type="button" value="copy" className={styles.copy}/>*/}
                            <input type="button" value="submit"  onClick={this.submitHandle.bind(this)} className={styles.submit}/>
                        </div>
                    </div>
                </div>
        );
    }
}
