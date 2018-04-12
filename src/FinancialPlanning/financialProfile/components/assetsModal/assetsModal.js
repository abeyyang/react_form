import React, { Component } from 'react';
import Modal from '../../../../common/components/trading/Modal';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import  Title from 'wealth/lib/web/components/ui/title';
import FormatHelper from 'common/lib/formatHelper';

export default class AssetsModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            assetsDetail:{
                otherLiquidDetail:{},
                savingCashDepositDetail:{},
                investmentDetail:{},
                investmentPropertyDetail:{},
		        oridinaryCPFDetail:{},
		        nonliquidTrustsDetail:{}
            }
        };
        this.submitHandle = this.submitHandle.bind(this);
        this.changeAmountValue = this.changeAmountValue.bind(this);
        this.handleFormattedNum = this.handleFormattedNum.bind(this);
        this.handleClearFormattedNum = this.handleClearFormattedNum.bind(this);
    }
      //handle formatted num
    handleFormattedNum(event){
        let assetsDetail = this.state.assetsDetail;
        assetsDetail[event.target.name].amount = FormatHelper.addThousandSeparator(event.target.value);
        this.setState({
            value:FormatHelper.addThousandSeparator(event.target.value)
        });
    }
    //handle clear formatted 
    handleClearFormattedNum(event){
        let assetsDetail = this.state.assetsDetail;
        assetsDetail[event.target.name].amount = event.target.value.replace(/,/g,'');
        this.setState({
            value:event.target.value.replace(/,/g,'')
        });
    }
    //clear input value
    ClearAllHandle(){
        let assetsDetail = this.state.assetsDetail;
        assetsDetail.savingCashDepositDetail.amount='';
        assetsDetail.otherLiquidDetail.amount='';
        assetsDetail.investmentDetail.amount='';
        assetsDetail.investmentPropertyDetail.amount='';
        assetsDetail.oridinaryCPFDetail.amount='';
        assetsDetail.nonliquidTrustsDetail.amount='';
        this.setState({
            assetsDetail:assetsDetail
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            assetsDetail: nextProps.assetsDetail
        });
    }
    //change handle amount 
    changeAmountValue(event){
        let assetsDetail = this.state.assetsDetail;
        assetsDetail[event.target.name].amount = event.target.value;
        this.setState({
            value:event.target.value
        });
    }
    //submit handle total value
    submitHandle(){
        let assetsDetail = this.state.assetsDetail; 
         let assetsObj ={
            detailList:[],
            total:{}
        };
        var totalAssets = null;
        assetsObj.detailList.push(assetsDetail.savingCashDepositDetail);
        assetsObj.detailList.push(assetsDetail.otherLiquidDetail);
        assetsObj.detailList.push(assetsDetail.investmentDetail);
        assetsObj.detailList.push(assetsDetail.investmentPropertyDetail);
        assetsObj.detailList.push(assetsDetail.oridinaryCPFDetail);
        assetsObj.detailList.push(assetsDetail.nonliquidTrustsDetail);
        assetsObj.detailList.map((map)=>{
            map.amount=String(map.amount).replace(/,/g,'');
            if(!isNaN(parseInt(map.amount))){
                totalAssets += parseFloat(map.amount);
            }
        })
        assetsObj.total={
            amount:totalAssets,
            currencyCode:assetsDetail.savingCashDepositDetail.currencyCode
        }
        this.props.submitForm(assetsObj,'assets');
    }
    render () {
        return (
                <div className={styles.AssetsModal}>
                    <h1><Title title="Help me Calculate" /></h1>
                    <div className={styles.description}><span>Please enter the details of your assets.</span></div>
                    <table>
                        <tr>
                            <td>Saving including cash and deposit</td>
                            <td>HSBC record</td>
                            <td>Non HSBC record</td>
                            <td>Deviation</td>
                        </tr>
                        <tr>
                            <td> 
                                <div className={styles.currencyType}>
                                    <span>{this.state.assetsDetail.savingCashDepositDetail.currencyCode}</span>
                                    <input type="text" name="savingCashDepositDetail" ref="savingCashDepositDetail" value={this.state.assetsDetail.savingCashDepositDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue}  placeholder="Please enter"  className={styles.num}/>
                                </div>
                                <span className={styles.savingCashDepositDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.savingCashDepositDetailTip}>
                                   Value of your cash deposits, e.g. savings accounts, current accounts, fixed deposits.
                                    <div className={styles.arrowDown}></div>
                                </p>
                                
                                </td>
                            <td>
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" className={styles.num}/>
                                </div>
                            </td>
                            <td >
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
                            <td colSpan="3">
                                 <div className={styles.remarks}>
                                    <input type="text" name="amount" className={styles.remarksNum}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Investments including stock / securities / bonds / certificate of deposit / unit trusts / currency-linked / structured notes
                            </td>
                            <td>HSBC record</td>
                            <td>Non HSBC record</td>
                            <td>Deviation</td>
                        </tr>
                        <tr>
                             <td> 
                                <div className={styles.currencyType}>
                                    <span>{this.state.assetsDetail.investmentDetail.currencyCode}</span>
                                    <input type="text" name="investmentDetail" ref="investmentDetail" value={this.state.assetsDetail.investmentDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue}  placeholder="Please enter"  className={styles.num}/>
                                </div>
                                <span className={styles.investmentDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.investmentDetailTip}>
                                    Value of your holdings in investments, e.g. stock, securities, bonds, UT, currency-linked and structured notes.
                                    <div className={styles.arrowDown}></div>
                                </p>
                                
                                </td>
                            <td>
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" className={styles.num}/>
                                </div>
                            </td>
                            <td >
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
                            <td colSpan="3">
                                 <div className={styles.remarks}>
                                    <input type="text" name="amount" className={styles.remarksNum}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Other liquid assets</td>
                            <td>HSBC record</td>
                            <td>Non HSBC record</td>
                        </tr>
                        <tr>
                            <td> 
                                <div className={styles.currencyType}>
                                    <span>{this.state.assetsDetail.otherLiquidDetail.currencyCode}</span>
                                    <input type="text" name="otherLiquidDetail" ref="otherLiquidDetail" value={this.state.assetsDetail.otherLiquidDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue} placeholder="Please enter" className={styles.num}/>
                                </div>
                                <span className={styles.otherLiquidDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.otherLiquidDetailTip}>
                                    Value of any other liquid assets that you own.
                                    <div className={styles.arrowDown}></div>
                                </p>
                                
                                </td>
                            <td>
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" className={styles.num}/>
                                </div>
                            </td>
                            <td >
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" className={styles.num}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Investment property (excluding self-use property)</td>
                            <td>HSBC record</td>
                            <td>Non HSBC record</td>
                        </tr>
                        <tr>
                            <td> 
                                <div className={styles.currencyType}>
                                    <span>{this.state.assetsDetail.investmentPropertyDetail.currencyCode}</span>
                                    <input type="text" name="investmentPropertyDetail" ref="investmentPropertyDetail" value={this.state.assetsDetail.investmentPropertyDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue} placeholder="Please enter" className={styles.num}/>
                                </div>
                                <span className={styles.investmentPropertyDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.investmentPropertyDetailTip}>
                                    Value of any investment property that you own, excluding self-use property.
                                    <div className={styles.arrowDown}></div>
                                </p>
                                
                                </td>
                            <td>
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" className={styles.num}/>
                                </div>
                            </td>
                            <td >
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" className={styles.num}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Provident fund/MPF accumulation</td>
                            <td>HSBC record</td>
                            <td>Non HSBC record</td>
                        </tr>
                        <tr>
                            <td> 
                                <div className={styles.currencyType}>
                                    <span>{this.state.assetsDetail.oridinaryCPFDetail.currencyCode}</span>
                                    <input type="text" name="oridinaryCPFDetail" ref="oridinaryCPFDetail" value={this.state.assetsDetail.oridinaryCPFDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue} placeholder="Please enter" className={styles.num}/>
                                </div>
                                <span className={styles.oridinaryCPFDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.oridinaryCPFDetailTip}>
                                   Value of your Provident fund/MPF.
                                    <div className={styles.arrowDown}></div>
                                </p>
                                
                                </td>
                            <td>
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" className={styles.num}/>
                                </div>
                            </td>
                            <td >
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" className={styles.num}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Other non-liquid Assets (excluding cash value of life insurance)</td>
                            <td>HSBC record</td>
                            <td>Non HSBC record</td>
                        </tr>
                        <tr>
                            <td> 
                                <div className={styles.currencyType}>
                                    <span>{this.state.assetsDetail.nonliquidTrustsDetail.currencyCode}</span>
                                    <input type="text" name="nonliquidTrustsDetail" ref="nonliquidTrustsDetail" value={this.state.assetsDetail.nonliquidTrustsDetail.amount} onBlur={this.handleFormattedNum} onFocus={this.handleClearFormattedNum} onChange={this.changeAmountValue} placeholder="Please enter" className={styles.num}/>
                                </div>
                                <span className={styles.nonliquidTrustsDetailOverlay}><FontIcon icon="circle-help-solid" className={styles.iconEdit}/></span>
                                <p className={styles.nonliquidTrustsDetailTip}>
                                   Value of any other non-liquid assets that you own.
                                   <div className={styles.arrowDown}></div>
                                </p>
                                 
                                </td>
                            <td>
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" className={styles.num}/>
                                </div>
                            </td>
                            <td >
                                <div className={styles.recordStyle}>
                                    <input type="text" name="amount" className={styles.num}/>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <hr className={styles.line}/>
                    <div className={styles.footer}>
                        <div className={styles.clearAll}><input type="button" onClick={this.ClearAllHandle.bind(this)} value="Clear all"/></div>
                        <div className={styles.btnCopySubmit}>
                            {/*<input type='button' className={styles.copy} value='coby'/>*/}
                            <input type='button'  onClick={this.submitHandle} className={styles.submit} value='submit'/>
                        </div>
                    </div>
                </div>
        );
    }
}
