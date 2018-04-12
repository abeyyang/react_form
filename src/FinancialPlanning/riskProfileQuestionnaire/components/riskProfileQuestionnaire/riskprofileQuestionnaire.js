
import toolStyles from './toolStyle.scss';
import React, { Component } from 'react';
import {RadioButton} from 'CommonUI/Form'
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import Popup from 'wealth/lib/web/components/widgets/popup';
import Tooltip from 'wealth/lib/web/components/widgets/tooltip';
import Disclaimer from 'common/components/Disclaimer';
import Notification from 'wealth/lib/web/components/ui/notification';
export default class RiskprofileQuestionnaire extends Component {
    constructor (props) {
        super(props);
        this.state = {
            rtqResult:{
                ansRecord:[]
            },
            expanded:'Collapase all section',
            arrows: ["chevron-down","chevron-down","chevron-down","chevron-down","chevron-down","chevron-down","chevron-down"],
            sesson:{},
            showStaff:true,
            errorMsg:"",
            errorMsgIndex: false
        };
        this.goCancel = this.goCancel.bind(this);
        this.getResult = this.getResult.bind(this);
        this.expandAll = this.expandAll.bind(this);
  //      this.checkQuestion = this.checkQuestion.bind(this);
        //this.choose = this.choose.bind(this);
    }
    goCancel(){
        
        console.log('go back profile');
        this.props.cleanCulResult();
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
    }
    getResult(){
        let staffIdValida = this.refs.staffIdInput.value  
        if(staffIdValida === ""){
            this.setState({
                    errorMsgIndex:true
            }) 
            // this.state.errorMsgIndex= true;
            this.state.errorMsg = "Please input Staff Id"
        }else{
            this.state.errorMsgIndex = false;
            this.props.getStaffInformation(staffIdValida);
        
        }
        console.log("{this.state.errorMsgIndex,",this.state.errorMsgIndex)
        console.log("staffIdValida",staffIdValida);
        
    }
    expandAll(){
        let allQuestions = this.state.rtqResult.ansRecord.length;
        if(this.state.expanded=='Collapase all section'){
            for (var index = 0; index < allQuestions; index++) {
                let temp=index+1;
                this.refs[temp].style.display = "none";
                  let arrows = ["chevron-up","chevron-up","chevron-up","chevron-up","chevron-up","chevron-up"];
                this.setState({
                    arrows:arrows
                 })            
            }
        // this.state.expanded= 'Expand';
        this.setState({
            expanded:'Expand all',
            showStaff:false
        })
        }else{
             for (var index = 0; index < allQuestions; index++) {
                let temp=index+1; 
                this.refs[temp].style.display = "";       
                let arrows = ["chevron-down","chevron-down","chevron-down","chevron-down","chevron-down","chevron-down"];
                this.setState({
                    arrows:arrows
                })              
            }
        // this.state.expanded= 'Collapse' ;
         this.setState({
            expanded:'Collapase all section',
            showStaff:true
        })
        }
        console.log("this.state.expanded",this.state.expanded)
        
    }
    // componentWillUpdate(){

    // }
    componentWillMount(){
        // let sessionInfo = this.props.session
        // let rpqTextParams ={
        //     messageId:'retrieveQuestionnaire',
        //     questionnaireTypeCode:"RTQ",
        // }; 
        // rpqTextParams ={rpqTextParams,sessionInfo}
        // this.props.getTheRiskDescription(rpqTextParams);
        // //rpqTextParams ={rpqTextParams,sessionInfo}
        // console.log("landing will amount...",rpqTextParams);


        let sessionInfo = this.props.session
        console.log("sessionInfo", sessionInfo);
        let rpqTextParams ={
            messageId:'retrieveQuestionnaire',
            questionnaireTypeCode:"RTQ",
        }; 
        rpqTextParams = {rpqTextParams,sessionInfo}
        this.props.initRiskProfileQuestTextData(rpqTextParams);
        console.log("landing will amount...")
        let params = {
            customers:[],
			detailSearchCriteria:{searchFunctionCode:"L"},
			questionnaireKey:{},
			searchCriteria:[{
		        key:"QUES_TYPE_CDE",
		        value:"SOLE"
	        }],
            messageId:'retrieveQuestionnaireResponseDetail',
            questionnaireTypeCode:"RTQ",
        }; 
        params = {params,sessionInfo};
        this.props.initRiskProfileQuestData(params);

    }

    componentDidMount(){
        console.log("landing did amount...")
    }

    componentWillUnMount(){
        console.log("landing will  unamount...")
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps in nextProps",nextProps)
        let versionQuestion = nextProps.rtqTextResult.versionNum;
        let versionRecord =nextProps.rtqResult.versionNum
        let MAX_QUE_NUM;
        let msgName = nextProps.messageName;
        if(msgName === "calculate"){
            if(nextProps.calResult !== undefined && nextProps.calResult.finalCode !== undefined){
                console.log("nextProps in nextProps",nextProps);
                const target = '/group-sfp-war/main/en-gb/rtq';
                this.props.setBack();
                this.props.router.push(target);
                return;
            }
        }
        if(msgName === "staff"){
            if(nextProps.staffValid !== undefined  ){
                let vaildResult =nextProps.staffValid;
                if(vaildResult === true && this.state.errorMsgIndex === false){
                    let sessionInfo = this.props.session;
                    let rtqResult = this.state.rtqResult;
                    rtqResult = {rtqResult,sessionInfo}
                    console.log('get Result rtqResult',rtqResult);
                    console.log('get Result');
                    this.props.getRiskProfileResult(rtqResult);  
                    console.log("target nextProps",nextProps)             
                    return;
                }if(vaildResult === false)
                {
                    this.setState({
                        errorMsgIndex:true
                    }) 
                    this.state.errorMsg = "Please input Vaild Staff Id"
                }  
            }
        }
         //console.log("nextProps.sourceName",nextProps.sourceName);     
        // if(nextProps.sourceName === undefined){
        if(msgName === undefined &&nextProps.calResult.finalCode === undefined){
            if(nextProps.rtqResult.expireDateIndicator === true ){
                    MAX_QUE_NUM = 6;
                    let ansTemp=[]
                    for(var i=0;i<MAX_QUE_NUM;i++){
                            ansTemp.push("");     
                    }
                    let rtqResult = this.state.rtqResult;
                    rtqResult.ansRecord = ansTemp;
                    this.state.rtqResult =rtqResult
                    console.log("rtqResult in receive",this.state.rtqResult )

                }else{
                    MAX_QUE_NUM= nextProps.rtqResult.ansRecord.length;
                    if(versionRecord !== undefined && versionQuestion !== undefined ){
                        if(versionRecord === versionQuestion ||( versionRecord === 4 && versionQuestion === 6)){
                            this.state.rtqResult= nextProps.rtqResult
                            console.log("this.state.rtqResult in A",this.state.rtqResult);
                        }else{
                            let rtqResult = this.state.rtqResult;
                            let ansTemp=[]
                            console.log("rtqResult in receive",rtqResult )
                            for(var i=0;i<MAX_QUE_NUM;i++){
                                ansTemp.push("");     
                            }
                            rtqResult.ansRecord = ansTemp;
                            this.state.rtqResult =rtqResult

                        }

                        console.log("this.state.rtqResult",this.state.rtqResult);
                    }
                }
            // }

        }  
        
         

    }
    showHideQuesContent(index){
        let showCont = "questionContent"+index;
        let arrows;
        if(this.refs[index].style.display === ""){
            if(index!="Number"){
                arrows = this.state.arrows;
            }
            this.refs[index].style.display = "none";
        }else{   
            this.refs[index].style.display = "";
            if(index!="Number"){
                arrows = this.state.arrows;
            }
        }
        if(index!="Number"){
            if( arrows[index-1] === 'chevron-down'){
                arrows[index-1] = 'chevron-up'
            }else{
                arrows[index-1] = 'chevron-down'
            }
            this.setState({
                    arrows:arrows
            }) 
        }   
        this.setState({
            showStaff:!this.props.showStaff
        })  
        console.log("this.state.arrows",this.state.arrows);

    }
    checkQuestion(questionNo,result,box){
       // let rtqAnsResult = this.state.rtqAnsResult;
        // rtqAnsResult[questionNo].result=box
     //   let temp={};
        // temp=rtqAnsResult[questionNo];
        // temp.result=result;
        // rtqAnsResult[questionNo]=temp
        // console.log("checkQuestion :",rtqAnsResult[questionNo])
       

            let rtqResult = this.state.rtqResult;
            //let ans =;
            rtqResult.ansRecord[questionNo]= result
            this.setState({
                rtqResult
             });
            console.log("this state rtqResult",this.state.rtqResult);
             
      
        // this.setState({
        //     rtqAnsResult
        // });
    }
    render () {
     const {
        rtqResult,
        rtqTextResult,
        rtqAnsResult,
        calResult
       } = this.props;
       const toolTipContent = (
            <div className={toolStyles.detail}>
                <p className={toolStyles.boldFont}>This questionnaire is designed to help you consider your risk tolerance.</p>
                <p>It asks questions that provide some indication of the risk tolerance for a typical investor displaying your personal investment characteristics (concerning investment and/ or insurance products). It may not match your actual attitude toward investment risk, but it indicates the profile you fit into.</p>
                <p className={toolStyles.boldFont}>When answering Question 1-6, please note that:</p>
                <p>The terms "investment/ investing" refer to all Wealth products, including investment and /or insurance products # [# Such products could include one or more of the following: stocks, unit trusts, foreign currencies, commodities, structured investment products, warrants, options, futures, long term life insurance plans with savings elements, such as annuity insurance plans, whole of life insurance plans and investment-linked insurance plans.]</p>
                <p>In general, investing involves a trade-off between risk and return. Investments carrying a higher risk come with the potential of achieving more gains, but also a higher possibility of incurring considerable losses. It has been historically shown that investors who achieve high returns have experienced correspondingly high fluctuations and losses.</p>
            </div>
        );
        let collsap = "Collapase all section"
        let expand = "Expand all" 
        let arrow = this.state.arrow;
        let expanded=this.state.expanded;
       //console.log(rtqTextResult.questionText);
        let questionText=[];
        let questionNote = [];
        let answerText={};
        // let versionRecord = rtqTextResult.versionNum;
        // let versionQuestion =rtqResult.versionNum
        let ansRecord =[];
        console.log("this.state.rtqResult ...",this.props.rtqResult)
        console.log("this.state.rtqResult.ansRecord",this.state.rtqResult)
        ansRecord = this.state.rtqResult.ansRecord;
        questionText= rtqTextResult.questionText;
        questionNote = rtqTextResult.questionNote;
        answerText= rtqTextResult.answerText;
        let showStaff = this.state.showStaff;
        // if(versionRecord === versionQuestion || (versionRecord === 4 && versionQuestion === 6) ){
        //    
        // }else{
        //     ansRecord = [];
        // }
        //console.log("calResult.. in CP",calResult);
        // let RanswerText=[]
        // for (var key in answerText) {
        //      var element = answerText[key];
        //      if(element.length>0){
        //          let tempMap={}
        //         for (var x = 0; x < element.length; x++) {
        //             var valueText = element[x];
        //                 if(x % 2===1){
        //                     console.log('x ji:',x);
                            
        //                 }else{
        //                     console.log('x ou:',x);
        //                 }
                    
        //         }
        //     }
        // }
        
       //console.log("rtqTextResult..... ",rtqTextResult.questionText[0] );
      //  let q1Text =rtqTextResult.questionText[1];
         return (
             
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.riskprofileQuestionnairePage}>
                        {/*
                        <h4>
                            <span className={styles.title}>Risk profile questionnaire</span>
                        </h4>
                        <div className={classNames(styles.showAll, styles.clearfix)}>
                            <a onClick={this.expandAll}><span className={styles.expand}><FontIcon icon="chevron-down" className={styles.icon} />&nbsp;Expand all</span></a>
                            <span className={styles.clock}><FontIcon icon="clock" className={classNames(styles.icon, styles.icon1)} />
                                10 min to finish the risk profile questionnaire
                            </span>
                        </div>*/}
                        <div className={classNames(styles.header, styles.clearfix)}>
                            <h4>
                                <span id="rpq_questionnairePageContent" className={styles.title}>Risk profile questionnaire</span>
                                                                <span data-tooltipref="handler-toolTip">
                                    <FontIcon icon="circle-help-solid" className={styles.iconHelp} />
                                </span>
                            </h4>
                              <Tooltip place="bottom" event="click" tooltipRef="handler-toolTip" theme={toolStyles} autoHideAfterTimeout="3000">{toolTipContent}</Tooltip>
                            <span className={styles.clock}><FontIcon icon="clock" className={classNames(styles.icon, styles.icon1)} />
                                10 min to finish the risk profile questionnaire
                            </span>
                        </div>
                        <div className={styles.expandAll}>
                            <a onClick={this.expandAll}><span className={styles.expand}><FontIcon icon={this.state.expanded == "Collapase all section" ? "minimize":"add"} className={styles.icon} />&nbsp;{this.state.expanded}</span></a>
                        </div>
                        
            
                        <div className={styles.salesMain}>
                            <div className={styles.question} key="Number">
                                 <h5><span className={styles.questionTitle}>Staff No.</span><a onClick={this.showHideQuesContent.bind(this,"Number")}><FontIcon icon={showStaff?"chevron-down":"chevron-up"} className={styles.icon}/></a></h5>
                                  <div className={styles.questionCon} ref="Number"style={showStaff?{display:''}:{display:'none'}}>
                                      <p className={styles.summary}>
                                        Staff No.
                                      </p> 
                                      <div className={styles.staffInput}>
                                          <input id="rpq_staffId" type="text" ref='staffIdInput'/>
                                          <p>Please check and ensure the correct Staff No. is entered.</p>
                                      </div>
                                  </div>
                                  {this.state.errorMsgIndex ?
                                    <Notification type="error">
                                            <p>{this.state.errorMsg}</p> 
                                    </Notification>:null
                                  }
                                  
                            </div>
                                {   
                                    questionText.map(function(item,index){
                                        let lableA;
                                        let lableIndex;
                                        let indexs=index+1;
                                        let tempText="a"+indexs;
                                        let questionFourContentFront=(<p>*  {questionNote[1]}</p>);
                                        let questionFourContentEnd=(<div className={questionFourContentEnd} ><p className={styles.questionFourEnd}>{questionNote[0]}</p></div>);
                                        let questionFourPic = (<div className ={styles.questionImg}><img src={require('./images/pic.png')}  /> </div>);
                                        let questionSixPic= (<div><img src={require('./images/chart.png')}  /></div>);
                                    return (
                                         <div className={styles.question} key={index}>
                                                <h5><span className={styles.questionTitle}>Question {indexs}</span><a onClick={this.showHideQuesContent.bind(this,indexs)}><FontIcon icon={this.state.arrows[index]} className={styles.icon}/></a></h5>
                                                <div className={styles.questionCon} ref={indexs} style={{display:''}}>
                                                    <p className={styles.summary}>
                                                        {item}
                                                    </p>  
                                                    {index === 3 ? questionFourContentFront:null}
                                                    {index === 3 ? questionFourPic:null} 
                                                    <div className={index === 3?styles.quesTionFourContent:null}>
                                                        {   
                                                                answerText[tempText].map(function(element,indexss){
                                                                    let showLabel;
                                                                    
                                                                    switch (indexss) {
                                                                                case 0:
                                                                                  lableA="A";
                                                                                  lableIndex="a.";
                                                                                  break;
                                                                                case 2:
                                                                                  lableA="B";
                                                                                  lableIndex="b.";
                                                                                  break;
                                                                                case 4:
                                                                                  lableA="C";
                                                                                  lableIndex="c.";
                                                                                  break;
                                                                                case 6:
                                                                                  lableA="D";
                                                                                  lableIndex="d.";
                                                                                  break;
                                                                                case 8:
                                                                                  lableA="E";
                                                                                  lableIndex="e.";
                                                                                  break;   
                                                                                default:
                                                                                    break;
                                                                            }
                                                                               
                                                                    if(indexss % 2===1){
                                                       
                                                                            return (
                                                                                <div className={classNames(styles.radioCheck, styles.on)} key={indexss}>
                                                                                    <div className={index === 5?styles.specialQuestion:null}>
                                                                                    <a onClick={this.checkQuestion.bind(this,index,lableA)}>
                                                                                    <input type="radio" name="judgment" className={styles.formList} />    
                                                                                        <label>
                                                                                            <span className={styles.wrapper}>
                                                                                                <span className={(styles.icon, ansRecord[index]==lableA ? styles.checked:null)} />
                                                                                            </span>
                                                                                        </label>
                                                                                        {lableIndex} {element}  
                                                                                       
                                                                                                                                                                                                                   
                                                                                    </a>
                                                                                    </div>
                                                                                    {index === 5 ? questionSixPic:null} 
                                                                                </div> 
                                                                            )
                                                                    }else{
                                                                       return; 
                                                                    }
                                                                   
                                                                },this)
                                                        }
                                                    </div>
                                                    
                                                    {index === 3 ? questionFourContentEnd:null}    
                                                </div>
                                           </div> 
                                          )   
                                    
                                    },this)
                                }
                               
							
					   </div>
                        <div className={styles.back}><a id="rpq_RiskprofilequestionnaireCancel" href="javascript:;" onClick={this.goCancel}><FontIcon icon="chevron-left" className={styles.icon}/>Cancel</a></div>
                         <a id="rpq_RiskprofilequestionnaireGetResult" href="javascript:void(0);" onClick={this.getResult} className={styles.getResult}>Get Result</a>
                         <Disclaimer /> 
                    </div>
                </div>
           
            </div>
       
          );
    }
}
