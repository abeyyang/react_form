import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Button from 'wealth/lib/web/components/ui/button';
import {FormattedMessage, injectIntl} from "react-intl";
import ObjectHelper from '../../../../../common/lib/ObjectHelper';
import lifeOverlayStyles from './lifeOverlay.scss';
class LifeProtectionGapCalOverlay extends Component {
     constructor(props) {
        super(props);
        this.state = {
           mortAndDebetsAmountVal:null, 
           monIncomeAmountVal:null,
           provideYear:null,
           monReplaceAmount:null,
           lumpSumAmount:null,
           lifePortecSum:null
        };
         this.closeOverlay = this.closeOverlay.bind(this);
         this.mortAndDebetsAmountChange= this.mortAndDebetsAmountChange.bind(this);
         this.mortAndDebetsAmountClear= this.mortAndDebetsAmountClear.bind(this);
         this.monIncomeAmountClear= this.monIncomeAmountClear.bind(this); 
         this.monIncomeAmountChange= this.monIncomeAmountChange.bind(this);
         this.lifePortectionSum=this.lifePortectionSum.bind(this);
         this.provideYearClear=this.provideYearClear.bind(this);
         this.provideYearChange=this.provideYearChange.bind(this);
         this.monReplaceAmountClear=this.monReplaceAmountClear.bind(this);
         this.monReplaceAmountChange=this.monReplaceAmountChange.bind(this);
         this.lumpSumAmountClear=this.lumpSumAmountClear.bind(this);
         this.lumpSumAmountChange=this.lumpSumAmountChange.bind(this);
         this.confirmOverlay=this.confirmOverlay.bind(this);
         this.clearAndSubmit=this.clearAndSubmit.bind(this);
     }
     
    closeOverlay(){
        console.log("closeoverlay");
        this.props.closeOverlay();
    }
    confirmOverlay(){
        console.log('confirmOverlay');
        let LifeParams;
        LifeParams=this.state;
        this.props.LifeconfirmOverlay(LifeParams);
    }
    clearAndSubmit(){

    }
    mortAndDebetsAmountChange(event){
        this.setState({
             mortAndDebetsAmountVal:event.target.value
        })
        console.log('mortAndDebetsAmountChange...',this.state);
    }
    mortAndDebetsAmountClear(event){
        this.setState({
            mortAndDebetsAmountVal:''
        })
        console.log('mortAndDebetsAmountClear...',this.state);
    }
    monIncomeAmountClear(event){
        this.setState({
            monIncomeAmountVal:''
        })
        console.log('monIncomeAmountClear...',this.state);
    }
    monIncomeAmountChange(event){
        this.setState({
             monIncomeAmountVal:event.target.value
        })
        console.log('monIncomeAmountChange...',this.state);
    }
    provideYearClear(event){
         this.setState({
            provideYear:''
        })
        console.log('provideYearClear...',this.state);
    }
    provideYearChange(event){
         this.setState({
             provideYear:event.target.value
        })
        console.log('provideYearChange...',this.state);
    }
    lifePortectionSum(){
      
    }
    monReplaceAmountClear(event){
         this.setState({ 
            monReplaceAmount:''
        })
        console.log('monReplaceAmountClear...',this.state);
    }
    monReplaceAmountChange(event){
         this.setState({
             monReplaceAmount:event.target.value
        })
        console.log('monReplaceAmountChange...',this.state);
    }
    lumpSumAmountClear(event){
         this.setState({
            lumpSumAmount:''
        })
        console.log('lumpSumAmountClear...',this.state);
    }
    lumpSumAmountChange(event){
         this.setState({
             lumpSumAmount:event.target.value
        })
        console.log('lumpSumAmountChange...',this.state);
    }
    subYear(stateProvideYear,provideYear){ 
        let temptYear=0;
        if(ObjectHelper.isNullOrEmpty(stateProvideYear)){
            temptYear=0;
            if(ObjectHelper.isNullOrEmpty(provideYear)){
                temptYear=0;
            }else{
                temptYear=parseInt(provideYear)-1;
            }
        }else{
            temptYear=parseInt(stateProvideYear)-1;
        }
        if(temptYear<=0){
            temptYear=0;
        }
         this.setState({
             provideYear:temptYear
        })
    }
    addYear(stateProvideYear,provideYear){ 
        let temptYear=0;
       if(ObjectHelper.isNullOrEmpty(stateProvideYear)){
            temptYear=1;
            if(ObjectHelper.isNullOrEmpty(provideYear)){
                temptYear=1;
            }else{
                temptYear=parseInt(provideYear)+1;
            }
        }else{
            temptYear=parseInt(stateProvideYear)+1;
        }
         this.setState({
             provideYear:temptYear
        })
    }
    render() {
       const {needEvaluationList} = this.props;
       console.log('lifeOverlay....',needEvaluationList);
       let mortAndDebetsAmount={},monIncomeAmount={},provideYear={},lumpSumAmount={},monReplaceAmount={};
        mortAndDebetsAmount=needEvaluationList.mortAndDebetsAmount;
        monIncomeAmount=needEvaluationList.monIncomeAmount;
        provideYear=needEvaluationList.provideYear;
        lumpSumAmount=needEvaluationList.lumpSumAmount;
        monReplaceAmount=needEvaluationList.monReplaceAmount;
        return (
            <div className={lifeOverlayStyles.naconAttached}>
                <div className={lifeOverlayStyles.mt20}>
                    <h5><span className={lifeOverlayStyles.title}>Life protection gap calculator</span></h5>
                        <div className={classNames(lifeOverlayStyles.fill, lifeOverlayStyles.clearfix)}>
                            <div className={lifeOverlayStyles.spanleft}>
                                <p>Prefill from FHC 
                                <span className={lifeOverlayStyles.buttonbackground}>Prefill</span>
                                </p>
                                
                            </div>
                        </div>
                        <h5>1.Amount of mortgage add debts you would like to pay off so your family members can remain where they live now ?</h5>
                        <div className={lifeOverlayStyles.currencyType}>
                            <span> HKD</span> &nbsp; 
                            <input type="text" className={lifeOverlayStyles.num}
                            value={this.state.mortAndDebetsAmountVal==undefined?mortAndDebetsAmount.insuranceNeedAmount:this.state.mortAndDebetsAmountVal} ref='mortAndDebetsAmountVal' 
                                                 name='mortAndDebetsAmountVal' id='mortAndDebetsAmountVal' onBlur={this.lifePortectionSum} onFocus={this.mortAndDebetsAmountClear} onChange={this.mortAndDebetsAmountChange}
                                />
                        </div> 
                        <h5>2.Amount of monthly income you would like to replace so that your family can maintain their current lifestyle ?</h5>
                        <div className={lifeOverlayStyles.currencyType}>
                            <span>HKD</span>&nbsp; 
                            <input type="text" className={lifeOverlayStyles.num}  
                            value={this.state.monIncomeAmountVal==undefined?monIncomeAmount.insuranceNeedAmount:this.state.monIncomeAmountVal} ref='monIncomeAmountVal'  
                                                 name='monIncomeAmountVal' id='monIncomeAmountVal' onBlur={this.lifePortectionSum} onFocus={this.monIncomeAmountClear} onChange={this.monIncomeAmountChange}
                                />
                        </div>    
                        <h5>3.Number of years you want to provide support for your family until they are able to support themselves financially.</h5>
                         <div className={lifeOverlayStyles.yearNum}>
                            <span className={lifeOverlayStyles.clearspan} onClick={this.subYear.bind(this,this.state.provideYear,provideYear.insuranceNeedAmount)}>-</span>
                                <input type="text" className={lifeOverlayStyles.num} 
                                 value={this.state.provideYear==undefined?provideYear.insuranceNeedAmount:this.state.provideYear} ref='provideYear'   disabled
                                                 name='provideYear' id='provideYear' onBlur={this.provideYearChange} onFocus={this.provideYearClear} onChange={this.provideYearChange}   
                                />
                            <span className={lifeOverlayStyles.addspan} onClick={this.addYear.bind(this,this.state.provideYear,provideYear.insuranceNeedAmount)}>+</span>    
                        </div> 
                        <h5>4.Lump sum amount to cover others costs<br/><span className={lifeOverlayStyles.small}>(eg.education fund for your children)</span></h5>
                        
                        <div className={lifeOverlayStyles.currencyType}>
                            <span> HKD</span>&nbsp; 
                            <input type="text" className={lifeOverlayStyles.num} 
                                value={this.state.lumpSumAmount==undefined?lumpSumAmount.insuranceNeedAmount:this.state.lumpSumAmount} ref='lumpSumAmount'   
                                                 name='lumpSumAmount' id='lumpSumAmount' onBlur={this.lifePortectionSum} onFocus={this.lumpSumAmountClear} onChange={this.lumpSumAmountChange}   
                                />
                        </div> 
                        <h5>5.How much do you have in savings and investments for this goal?</h5>
                        <div className={lifeOverlayStyles.currencyType}>
                            <span>HKD</span>&nbsp; 
                            <input type="text" className={lifeOverlayStyles.num}  
                               value={this.state.monReplaceAmount==undefined?monReplaceAmount.insuranceNeedAmount:this.state.monReplaceAmount} ref='monReplaceAmount'   
                                                 name='monReplaceAmount' id='monReplaceAmount' onBlur={this.lifePortectionSum} onFocus={this.monReplaceAmountClear} onChange={this.monReplaceAmountChange}   
                                />
                        </div> 
                </div>

                    <div className={lifeOverlayStyles.footer}>
                        <div className={lifeOverlayStyles.btnCancel}>
                            {/*<input type="button" value="copy" className={styles.copy}/>*/}
                            <input type="button" className={lifeOverlayStyles.cancel} onClick={this.closeOverlay} value="Cancel"/>
                            <input type="button" className={lifeOverlayStyles.clear} onClick={this.clearAndSubmit} value="Clear & submit"/>
                        </div>
                        <div className={lifeOverlayStyles.btnClose}>
                            {/*<input type="button" value="copy" className={styles.copy}/>*/}
                            <input type="button" className={lifeOverlayStyles.submit} onClick={this.confirmOverlay} value="Confirm"/>
                        </div>
                    </div>
            </div>
        );
    }
}

export default injectIntl(LifeProtectionGapCalOverlay);