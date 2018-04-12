import Popup from 'wealth/lib/web/components/widgets/popup';
import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import FormatHelper from 'common/lib/formatHelper';
import dateTimeFormat from '../../../../config/dateTimeFormat';
import styles from './style.scss';
import withLoadingScreenBeforeReadyToLeave
    from 'common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import { browserHistory } from 'react-router';
import apiConfig from "../../../../config/apiConfig"

class riskProfileCpn extends Component {
    constructor (props) {
        super(props);
        this.state = {
            //isShow:false,
            showOverridenIndicator: false,
            calCode:"",
            overrideCode:"",
            overrideText:[],
            ansRecordFromQues:[],
            goOrNot: true,
            calResult:{},
            isPopupByMountingShown: false,
        };
        this.saveNprint = this.saveNprint.bind(this);
        this.saveNcontinue = this.saveNcontinue.bind(this);
        this.goToDashboard = this.goToDashboard.bind(this);
        this.goToRiskQuestionnaire = this.goToRiskQuestionnaire.bind(this);
        this.showTheChoose = this.showTheChoose.bind(this);
        this.togglePopupByMounting = this.togglePopupByMounting.bind(this);
        this.reasonSub = this.reasonSub.bind(this);
        this.goHistroy = this.goHistroy.bind(this);
        this.print = this.print.bind(this);
       // this.showOverriden = this.showOverriden.bind(this);

    }
    print(){
        let sessionInfo = this.props.session;
        console.log("session infor for print",sessionInfo);
        let printRequest = sessionInfo;
        this.props.riskSinglePrint(printRequest);
    }
    componentWillMount(){
        let sessionInfo = this.props.session
        let rpqTextParams ={
            messageId:'retrieveQuestionnaire',
            questionnaireTypeCode:"RTQ",
        }; 
        rpqTextParams ={rpqTextParams,sessionInfo}
        this.props.getTheRiskDescription(rpqTextParams);
        //rpqTextParams ={rpqTextParams,sessionInfo}
        console.log("landing will amount...",rpqTextParams);
    }
    goHistroy(){
        console.log('go back Dashboard');
        const target = '/group-sfp-war/main/en-gb/rtq/history';
        browserHistory.push(target);
    }
    componentDidMount(){
        console.log("landing did amount...")
    }
    componentWillReceiveProps(nextProps){
        //let ind = calResult !== null && JSON.stringify(calResult) !== "{}"
        console.log("nextProps", nextProps);
        let mainResult = nextProps.mainResult;
        let calResult = nextProps.calResult;
        let msgName = nextProps.msgName;
        console.log("msgName",msgName);
        if(msgName === "submit"){
            //debugger;
            this.state.goOrNot = mainResult; 
            if((mainResult !== undefined && mainResult !== null) ){
                console.log("mainResult", nextProps.mainResult);
                console.log("4");
                if(this.state.goOrNot){
                    
                // this.refs.showCont.style.display = "none";
                    if(this.refs.popUpRef !== undefined){
                        this.refs.popUpRef.hide()
                        console.log("popup instance",this.refs.popUpRef);
                    }else{
                        console.log("popup instance",this.refs.popUpRef);
                    }
                    this.state.showOverridenIndicator= true;
                    this.state.isPopupByMountingShown= false;
                    this.state.goOrNot= true;
                    this.props.clearUp();
                    this.props.clearUpCalResult();
                    const target = '/group-sfp-war/main/en-gb/index';
                    this.props.router.push(target);    
                    console.log("this ....isPopupByMountingShown", this.state.isPopupByMountingShown);
                    console.log("this ....goOrNot ", this.state.goOrNot);                
                }
            }else{
                this.state.goOrNot =false;
                console.log("holy yes..");
            }
            
        }
        if(calResult !== null && JSON.stringify(calResult) !== "{}"){
          
            this.state.calResult = calResult;
           // this.refs.showCont.style.display = "";
           // this.state.goOrNot = true;
            // this.state.isPopupByMountingShown= false;
            // this.state.showOverridenIndicator= false;
            console.log("calResult in next", calResult);
        }
    }
    componentWillUnMount(){
        console.log("profile will  unamount...")
    }
    goToDashboard(){
        console.log('go back Dashboard');
        const target = '/group-sfp-war/main/en-gb/index';
        browserHistory.push(target);
    }
    goToRiskQuestionnaire(){
        console.log('go back Questionnaire');
        this.props.clearUpCalResult();
        const target = '/group-sfp-war/main/en-gb/rtq/riskProfileQuestionnaire006';
        browserHistory.push(target);
    }
    showTheChoose(){
        
        console.log("show choose");
        if(this.refs.showCont.style.display === ""){
            this.refs.showCont.style.display = "none";
        }else
        {
            this.refs.showCont.style.display = "";
        }
        
        //  this.setState({
        //         isShow:true
        // });
        
    }
    reasonSub(){
        let sessionInfo = this.props.session;
        let reqParams={};
        let ansToBE=[];
        let staffInfo = this.props.staffInfo;
        ansToBE= this.state.ansRecordFromQues;
        reqParams = {
                ansToBE: ansToBE,
                overrideCode:this.state.overrideCode,
                calCode:this.state.calCode,
                cusReason:this.refs.customerInputReason.value 
        }
        reqParams = {reqParams,sessionInfo,staffInfo};
        this.props.submitRTQressult(reqParams);
        console.log("reqParams in profile",reqParams)
    
    }
    saveNcontinue(){
        console.log("calResult in save", );
        const target = '/group-sfp-war/main/en-gb/index';
        let reqParams={};
        let staffInfo = this.props.staffInfo;
        let ansToBE=[];
        let go;
        let sessionInfo = this.props.session;
        ansToBE= this.state.ansRecordFromQues;
        reqParams = {
                ansToBE: ansToBE,
                overrideCode:this.state.overrideCode
        }
        // if(this.state.goOrNot){
        //     browserHistory.push(target);
        // }
        reqParams = {reqParams,sessionInfo,staffInfo};
        this.props.submitRTQressult(reqParams);
        console.log("reqParams",reqParams);
        console.log("3");
         this.setState({
            isPopupByMountingShown: !this.state.isPopupByMountingShown
        });
    }
    saveNprint(){
        console.log("print", );
        let reqParams={};
        let msgName = "print"
        let staffInfo = this.props.staffInfo;
        let ansToBE=[];
        let go;
        let sessionInfo = this.props.session;
        ansToBE= this.state.ansRecordFromQues;
        reqParams = {
                ansToBE: ansToBE,
                overrideCode:this.state.overrideCode
        }
        reqParams = {reqParams,sessionInfo,staffInfo,msgName};
        this.props.submitRTQressult(reqParams);
        console.log("reqParams",reqParams);
        console.log("3");
         this.setState({
            isPopupByMountingShown: !this.state.isPopupByMountingShown
        });
    }
    togglePopupByMounting (event) {
        console.log("1");

        this.saveNcontinue();
  
    } 
    showOverriden(riskLevel,index,item){
        this.refs.showCont.style.display = "none";
        //this.refs.overriddenContext.style.display="";
        let showHide = true;
        let tempCode = this.state.calResult.finalCode;
        console.log(tempCode)
        console.log(riskLevel)
        if(JSON.stringify(riskLevel) === tempCode ){
            showHide= false;
             console.log("showHide",showHide)
        }
        this.setState({
            showOverridenIndicator:showHide
        });
        // let tempIndex ='R';
        // tempIndex = tempIndex + index;
        let overrideText = [];
        let overrideCode = riskLevel;
        this.state.overrideCode = riskLevel;
        // this.setState({
        //     overrideCode:overrideCode
        // });
        console.log("risklevel in profile", riskLevel);
        // console.log("tempIndex", tempIndex);
        //  console.log("index", index);
        overrideText.push(index.firstLine);           
        overrideText.push(index.secondLine);
        overrideText.push(index.thridLine);
        overrideText.push(riskLevel);
        let resultContentOverridden = 'riskLevel'+riskLevel;
        overrideText.push(resultContentOverridden);
        overrideText.push(index.des);
        this.setState({
            overrideText:overrideText
        });
      

      //  console.log("isShow",this.state.isShow);
        console.log("overrideText",this.state.overrideText);
        console.log("overrideCode",this.state.overrideCode);
    }
    render () {
        const {
            stickyHeight,
            router,
            intl,
            rtqResult,
            calResult,
            ansRecordFromQues,
            mainResult,
            session,
            qasConfig
       } = this.props;
       const latestVersion = apiConfig.RTQ_CURRENT_VERSION
       const toolTipContent = (
            <div >
                <p>This questionnaire is designed to help you consider your risk tolerance.</p>
                <p>It asks questions that provide some indication of the risk tolerance for a typical investor displaying your personal investment characteristics (concerning investment and/ or insurance products). It may not match your actual attitude toward investment risk, but it indicates the profile you fit into.</p>
                
            </div>
        );
       console.log("session",session);
       console.log("qasConfig",qasConfig);
       let overrideText=[]
       let calResultTemp =this.state.calResult;
       let showOverridenIndicator = this.state.showOverridenIndicator;
       if(rtqResult !== undefined && JSON.stringify(calResultTemp) === "{}"){
            let overrideCode =rtqResult.overrideCode;
            let calculateCode =rtqResult.calculateCode;
            if(overrideCode !== "" && overrideCode !== undefined && overrideCode !== null){
                showOverridenIndicator = true;
                if(overrideCode === calculateCode ){
                    showOverridenIndicator = false;
                }
                let temp ='R';
                let tempArr =[];
                let descriptionItem = qasConfig[temp+overrideCode];
                let resultContentOverridden = 'riskLevel'+overrideCode;
                console.log("descriptionItem",descriptionItem);
                tempArr.push(descriptionItem.firstLine);
                tempArr.push(descriptionItem.secondLine);
                tempArr.push(descriptionItem.thridLine);
                tempArr.push(overrideCode);
                tempArr.push(resultContentOverridden);
                tempArr.push(descriptionItem.des);
                overrideText = tempArr
            }else{
                showOverridenIndicator = false; 
            }
        }else{
            overrideText=this.state.overrideText;
        }
        const popContent = (
            <div className={styles.popaContent}>
                <h2>You have chosen to record a risk tolerance that is higher than your existing recorded(Based on Risk Profiling Questionnaire completed on 10 Oct 2017,Risk Tolerance of Speculative) risk tolerance. Please specify the cause of this change:</h2>
                
                <div className={styles.detail}>
                    The reason:<FontIcon icon="circle-help-solid" className={styles.iconHelp} />
                    <div className={styles.detailHide}>
                        <p>Examples of reasons for increase of RPQ level within 3 months : </p>
                        <p>- My financial situation has recently improved</p>
                        <p>- I can now invest over a longer time horizon</p>
                        <p>- I have a more bullish view on the investment market now and willing to increase my investment portfolio</p>
                        <p>- I would like to take a higher risk for higher potential return opportunities</p>
                    </div>
                </div>
                <textarea name="customerInputReason" ref="customerInputReason"></textarea>
                <div className={styles.confirm}><a onClick={this.reasonSub}>Confirm and Print</a></div>
            </div>
        ); 

       this.state.ansRecordFromQues = ansRecordFromQues;
       let overrideCode;
       let content;
       let riskNameContnt;
       let expireContnt;
       let tempTextIndex;
       let riksTitile;
       let firstLine;
       let secondLine;
       let thridLine;
       let riskLevel;
       if(rtqResult !== undefined && JSON.stringify(rtqResult) !== "{}" && rtqResult.expireDateIndicator !== true){
        if(rtqResult.calculateCode !== "" && rtqResult.calculateCode !== undefined){
            tempTextIndex = 'R'+rtqResult.calculateCode
            riskLevel =rtqResult.calculateCode;
        }else{
            tempTextIndex = 'R'+rtqResult.finalCode
        }
        console.log("tempTextIndex",tempTextIndex)
         firstLine = qasConfig[tempTextIndex].firstLine;
         secondLine =qasConfig[tempTextIndex].secondLine;
         thridLine = qasConfig[tempTextIndex].thridLine;
         riksTitile =qasConfig[tempTextIndex].des;}

        
       let displayCal = false;
       let buttonSwitch = false;
       let chooseDes=[];
       console.log("rtq result in profile",rtqResult);

       if(calResultTemp !== null && JSON.stringify(calResultTemp) !== "{}"){   
            buttonSwitch = true; 
            let rankRange = calResultTemp.rankRange;
            riskLevel = calResultTemp.finalCode;
            this.state.calCode = calResultTemp.finalCode;
            let tempRiskTitleIndex = 'R';
            tempRiskTitleIndex = tempRiskTitleIndex + riskLevel;
            firstLine = qasConfig[tempRiskTitleIndex].firstLine;
            secondLine =qasConfig[tempRiskTitleIndex].secondLine;
            thridLine = qasConfig[tempRiskTitleIndex].thridLine;
            console.log("tempRiskTitleIndex",tempRiskTitleIndex)
                riksTitile =qasConfig[tempRiskTitleIndex].des;
        
            if(riskLevel !== "0"){
                 displayCal = true ;
            }

            for (var index = 0; index < rankRange.length; index++) {
                 let tempIndex ='R';
                 let tempMap ={}
                 tempIndex = tempIndex + rankRange[index];
                 tempMap = qasConfig[tempIndex];
                 chooseDes.push(tempMap);
            }
            
            console.log("chooseDes....",chooseDes);
       }
       console.log("rtqResult ",rtqResult)
       console.log("calResult in profile",calResultTemp)
       let resultContent = 'riskLevel'+riskLevel;
       content = (<p className={styles[resultContent]}>{riskLevel}</p>);       
       riskNameContnt =  <p className={styles.adventurous}>{riksTitile}</p>
       const expireDate=FormatHelper.dateFormatPattern(rtqResult.expireDate,dateTimeFormat.DATE_FORMAT);
       console.log("expire day..." + expireDate);
       const completeDate=FormatHelper.dateFormatPattern(rtqResult.completeDate,dateTimeFormat.DATE_FORMAT);
       let displayRiskContnt;
       let titleContnt = 'Your tolerance to investment risk has been assessed as';
       let dateContnt;
       let disagreeNotes = "-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
       let disagreeContnt = "If you disagree with this conclusion,please indicate your risk tolerance that you believe is more accurate. This can only be lower than the risk tolerance calculated above,and will be the risk tolerance captured in the Bank's record."
       let continueButton = (<a id="continueToLandingPage" href="javascript:void(0);" onClick={this.goToDashboard}><FontIcon icon="chevron-left" className={styles.icon} />Continue</a>);
       let prinntButton =(<a href="javascript:void(0);"  onClick={this.print} className={styles.print}>Print</a>);
       let assessButton = ( <a href="javascript:void(0);" onClick={this.goToRiskQuestionnaire} className={styles.assesse}>Re-assess</a>);
       let pfsbutton = ( <a href="javascript:void(0);" onClick={this.goHistroy} className={styles.assesse}>Previous Record</a>);
       let reaccessBtn =   (<a href="javascript:void(0);" onClick={this.goToRiskQuestionnaire}><FontIcon icon="chevron-left" className={styles.icon} />Re-assesse</a>);
       
       let confirmNContinueBtn = (<div className={styles.continueElement}>
                                    <div className={styles.continue} onClick={this.togglePopupByMounting}>
                                        Confirm & Continue
                                    </div>
                               
                                    <p>
                                        {(!this.state.goOrNot&&this.state.isPopupByMountingShown) ? 
                                            <Popup theme={styles} ref="popUpRef" hideOnOverlayClick show onHide={() => {
                                                this.setState({
                                                    isPopupByMountingShown: false
                                                });
                                                //this.refs.popUpRef.hide()
                                            }}
                                            >
                                                {popContent}
                                            </Popup> :null
                                        }
                                    </p>
                                
                                </div>); 
       //let triggerLayer = (<input type="button" data-popupRef="reason"  value="Simplified Insurance" className={styles.hiddeButton} data-popupRef="reason"/>); 
       let confirmNPrintBtn =(<a href="javascript:void(0);"  onClick={this.saveNprint} className={styles.conAndPrint} >Confirm and Print</a>);
       if(rtqResult.expireDateIndicator === true && JSON.stringify(calResultTemp) === "{}"){
            displayRiskContnt =  (<div className={styles.riskExpireTxt}>
                                    <p className={styles.specailTxt}>When answering Question 1-6, please note that: </p>
                                    <p className={styles.specailTxt}>- The terms "investment/ investing" refer to all Wealth products, including investment and /or insurance products # [# Such products could include one or more of the following: stocks, unit trusts, foreign currencies, commodities, structured investment products, warrants, options, futures, long term life insurance plans with savings elements, such as annuity insurance plans, whole of life insurance plans and investment-linked insurance plans.]</p>
                                    <p className={styles.specailTxt}>- In general, investing involves a trade-off between risk and return. Investments carrying a higher risk come with the potential of achieving more gains, but also a higher possibility of incurring considerable losses. It has been historically shown that investors who achieve high returns have experienced correspondingly high fluctuations and losses. </p>
                                  </div>) 
            let expireDes = '';
            let completedDes = '';
            let exprefix = '';
            let verisonCompare = "";
            let showRtqCompare = false;
            if(completeDate == 'Invalid date' || expireDate == 'Invalid date'){
                console.log("Not Vaild...in page")
                exprefix ="Expiry date"
                expireDes = 'N/A';
                completedDes ='N/A';
            }else{
                showRtqCompare = true
                exprefix ="Curren Expiry date"
                expireDes = expireDate;
                completedDes = completeDate;
                if(rtqResult.versionNum === latestVersion)
                    verisonCompare = "Y"
                else{
                    verisonCompare ="N"
                }
            }
            dateContnt = (<div className={styles.dateExpire}>
                                    {/*<span><FontIcon icon="circle-help-solid" className={styles.icon} />Risk level details</span>*/}
                                    <span id="riskProfileExpireDate"> {exprefix}: {expireDes}</span>
                                    <span id="riskProfileCopmletedDate">Completed date :{completedDes}  </span>
                                  {showRtqCompare? <span class={styles.expireVersion}>RPQ Version Expired? {verisonCompare} </span>: null}  
                                </div>);  
            content =(<p className={styles.riskLevelExpire}>{rtqResult.riskLevel}</p>);
            riskNameContnt =  <p className={styles.riskLevelExpire}>{rtqResult.riskLeverDescription}</p>
            titleContnt ='';
       }else{
            displayRiskContnt = ( <div className={styles.riskTxt}>
                                    <p>{firstLine}</p>
                                    <p>{secondLine}</p>
                                    <p>{thridLine}</p>
                                    <p className={styles.specailTxt}>Before executing a transaction, you should consider your own circumstances, including not only the product risk level of your selected investment and your risk tolerance, but also your financial situation, investment knowledge and/or experience, investment objectives and preferred investment period. You should take extra care in assessing products with product risk level higher than your risk tolerance as they may be unsuitable for you. Even products with product risk level which matches or is lower than your risk tolerance may not necessarily be suitable. Factors other than your risk tolerance are relevant to suitability.</p>
                                    <p className={styles.notes}>{(displayCal||showOverridenIndicator)?disagreeNotes:null}</p>
                                    <p className={styles.specailDisTxt}>{displayCal?disagreeContnt:null}</p>
                                    
                                 </div>);
            dateContnt = (<div className={styles.date}>
                                    {/*<span><FontIcon icon="circle-help-solid" className={styles.icon} />Risk level details</span>*/}
                                    <span id="riskProfileExpireDate">Expiry date : {expireDate}</span>
                                    <span id="riskProfileCopmletedDate">Completed date :{completeDate}  </span>
                        </div>);  
       }
       
    let chooseContnt = (  
<div className={styles.selectPart}>
        <a href="javascript:void(0);"  onClick={this.showTheChoose} title="select" className={styles.select} >
            <span className={styles.selectBtn}>select</span>
            <FontIcon icon="chevron-down-small" className={styles.iconDown} />
        </a>
    
    <div ref="showCont" className={styles.dropDown} style={{display:'none'}}>
        <div className={styles.dropDownInner}>
            {
                                                
                chooseDes.map(function(item,index){
                    let textOne = item.firstLine;
                    let textTwo = item.secondLine;
                    let textThree = item.thridLine;
                    let riskDes = item.des;
                    let riskStyle = 'riskLevel'+index;
                    console.log("riskStyle",riskStyle);
                    return (
                        <div className={styles.dropDownLevel} key={index}>
                            <a onClick={this.showOverriden.bind(this,index,item)}>
                                <p className={styles[riskStyle]}>{index}</p>
                                <div ref={index} className={styles.detail}>
                                    <strong>{riskDes}</strong><br/>
                                </div>
                                <div className={styles.showDetail}>
                                    <p>{textOne}</p>
                                    <p>{textTwo}</p>
                                    <p>{textThree}</p>
                                </div>
                            </a>   
                        </div>    
                    );
                },this)
                }
        </div>
    </div>
</div>);
        return (
            <div className={styles.bodyBackground} >
                <div className={styles.mainBackground}>
                    <div className={styles.rationalTeamConcertPage}>
                        <h4><span className={styles.title}>Risk profiling</span></h4>
                        <div className={styles.rtcMain}>
                            <div className={classNames(styles.rtcTitle, styles.clearfix)}>
                                <div className={styles.title}>
                                    {titleContnt}
                                </div>
                                {dateContnt}
                            </div>
                            <div className={classNames(styles.rtcCont, styles.clearfix)}>
                                <div className={styles.rtcNum}>
                                    {content}
                                    {riskNameContnt}
                                </div>
                                {displayRiskContnt}
                                {showOverridenIndicator?
                                    <div className={styles.overridenRiskTxt}>
                                        <div className={styles.rtcNum}>
                                            <p className={styles.notes}>Your adjusted risk tolerance Level is</p>
                                            <p className={styles[overrideText[4]]}>{overrideText[3]}</p>
                                            <p className={styles.overrideTitle}>{overrideText[5]}</p>
                                            <div className={styles.texts}>
                                                <p className={styles.specailTxt}>{overrideText[0]}</p>
                                                <p className={styles.specailTxt}>{overrideText[1]}</p>
                                                <p className={styles.specailTxt}>{overrideText[2]}</p>
                                            </div>
                                        </div>
                                    </div>
                                :null
                                }
                                
                                {displayCal ?chooseContnt:null}
                     
                            </div>
                            <div className={styles.staff}>
                                <p>Staff No: {session.staffId} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Staff Name: {session.staffName === undefined ? "Deng,Hui,Figo":session.staffName}</p>
                            </div>
                        </div>
                        
                        <div className={styles.button}>
                            
                            {buttonSwitch?reaccessBtn:continueButton}
                            {buttonSwitch?confirmNPrintBtn:prinntButton}
                            {buttonSwitch?confirmNContinueBtn:assessButton}
                            {buttonSwitch?null:pfsbutton}
                        
                                                  
                        </div>

                    </div> 
                </div>
                
            </div>
        );
    }
}

export default withLoadingScreenBeforeReadyToLeave(injectIntl(riskProfileCpn))