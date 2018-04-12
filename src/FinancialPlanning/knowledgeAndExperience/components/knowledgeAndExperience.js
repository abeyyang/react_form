import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import toolStyles from './toolStyle.scss';
import ObjectHelper from '../../../common/lib/ObjectHelper';
import keConfig from "../../../config/keConfig";
import Tooltip from 'wealth/lib/web/components/widgets/tooltip';
import FormatHelper from 'common/lib/formatHelper';
import dateTimeFormat from 'config/dateTimeFormat';
export default class KnowledgeExperiencePanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isShow:false,
            keResult:{
            },
            lastDateTime:""
        };
        this.show = this.show.bind(this);
        this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this);
        this.clickButtonForKnowledgeAndExperienceInitData = this.clickButtonForKnowledgeAndExperienceInitData.bind(this);
        this.submitKEResult = this.submitKEResult.bind(this);
    }
    show () {
        this.setState((preState, props) => {
            return { isShow:!preState.isShow };
        });
    }

    checkQuestion(questionNo,result,box){
        let keResult = this.state.keResult;
        if(keResult.length==undefined||keResult.length==0){
            const trArrays=["Unit trusts","Bonds","Structured products","Investment linked insurance plans","Non investment linked insurance plans"];
            let keArr = this.props.keResult;
            for(let i = 0;i<trArrays.length;i++ ){
                if(i==questionNo){
                    keArr.push( {
                        context:trArrays[i],
                        result:result
                    });
                }else{
                    keArr.push( {
                        context:trArrays[i],
                        result:""
                    });
                }
            }

            keResult = keArr;
        }  
        let temp={};
        temp=keResult[questionNo];
        console.log("keResult[questionNo]-----------",keResult[questionNo]);
        temp.result=result;
        keResult[questionNo]=temp
        console.log("checkQuestion :",keResult[questionNo])
        this.setState({
            keResult
        });
    }

    submitKEResult(){
        let keResult = this.state.keResult;
        let lastDateTime =  FormatHelper.dateFormatPattern(new Date(),dateTimeFormat.DATETIME_RANGE_DISPLAY_FORMAT_PATTERNKEY);
        let saveKERequest = {
            customerId : "IF200106",
            keResult,
            lastDateTime:lastDateTime
        }
        console.log(this.props);
        this.props.submitKEResult(saveKERequest);
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
    }
        

    componentWillReceiveProps(nextProps) {
        this.setState({
            keResult: nextProps.keResult
        });
    }

    clickButtonForKnowledgeAndExperienceInitData(){
        const request = {
            customerId : "IF200106"
        };
        this.props.initKnowladgeAndExperienceData(request);
    }

    goToDashboardPageHandle() {
        console.log('test');
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
        //browserHistory.push(target)
    }

    componentWillMount(){
        this.clickButtonForKnowledgeAndExperienceInitData();
        console.log("landing will amount...")
        
    }

    componentDidMount(){
        console.log("landing did amount...")
    }

    componentWillUnMount(){
        console.log("landing will  unamount...")
    }
    
    render () {
        const {
            stickyHeight,
            router,
            intl,
            keResult,
            keQuestionaire,
            success,
            itemMap,
            lastDateTime
       } = this.props;
        let keResultIndex= keResult
        const content = (
            <div className={toolStyles.detail}>
                <p>Please indicate your level of knowledge and experience with the below product categories. This will facilitate us to consider with you suitable investment & insurance products.</p>
            </div>
        );
       
        const isShow = this.state.isShow;
        let contextStyle;
        let contextContent;
        let contextResult;
        let updateTime = "";
        // keResult.forEach(function(content) {
        //     console.log("content...",content);
        // }, this);
       
        console.log("ind null",typeof(keResultIndex));
        let trContent;
        let trContents=[];
        console.log("this props", this.props)
         console.log("ind trContent",trContent);
         console.log("ind trContents",trContents);
         let tr
         let trs=[];
         if(JSON.stringify(keResultIndex)==""|| keResultIndex === undefined){
             const trArrays=["Unit trusts","Bonds","Structured products","Investment linked insurance plans","Non investment linked insurance plans"];
             for(let i = 0;i<trArrays.length;i++ ){
                   keResultIndex.push()
                   tr = (
                        <tr key={i}>
                            <td>{trArrays[i]}</td>
                            <td><a onClick={this.checkQuestion.bind(this,i,'A')}><FontIcon icon="circle-delete-solid" className={classNames(styles.icon, styles.iconDelete)}/></a></td>
                            <td><a onClick={this.checkQuestion.bind(this,i,'B')}><FontIcon icon="circle-delete-solid" className={classNames(styles.icon, styles.iconDelete)}/></a></td>
                            <td><a onClick={this.checkQuestion.bind(this,i,'C')}><FontIcon icon="circle-delete-solid" className={classNames(styles.icon, styles.iconDelete)}/></a></td>
                            <td><a onClick={this.checkQuestion.bind(this,i,'D')}><FontIcon icon="circle-delete-solid" className={classNames(styles.icon, styles.iconDelete)}/></a></td>
                        </tr>
                    );
                    trs[i] = tr;
             }

            
         }
         if(lastDateTime != undefined && lastDateTime !=""){
            updateTime = FormatHelper.dateFormatPattern(lastDateTime,dateTimeFormat.DATETIME_RANGE_DISPLAY_FORMAT_PATTERNKEY);
         }else{
             updateTime = "";
         }
        return (
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.knowledgeExperiencePage}>
                        <h4>

                           {/* <span className={styles.title} >Knowledge experience {success}</span>
                            <span className={styles.detail} data-tooltipref="handler-toolTip">
                                <FontIcon icon="circle-help-solid" className={styles.iconHelp} /> */}

                            <span id="knowledgeAndExperiencePage" className={styles.title} >Knowledge and experience {success}</span>
                            <span className={styles.detail}>
                                <span data-tooltipref="handler-toolTip">
                                    <FontIcon icon="circle-help-solid" className={styles.iconHelp} />
                                </span>
                                <Tooltip place="bottom" event="click" tooltipRef="handler-toolTip" theme={toolStyles} autoHideAfterTimeout="3000">{content}</Tooltip>
                                 
                                {/*<div className={styles.detailHide}>
                                    <div className={styles.detailOverlay}>
                                        <div className={styles.detailText}>
                                            <p>test data</p>
                                            <p>test data</p>
                                            <p>test data</p>
                                        </div>
                                    </div>
                                </div> */} 

                            </span>
                            {/* isShow ? <div className={styles.knowledgeHide}>
                                <p className={styles.link} />
                                <p className={styles.link1} />
                                <div className={styles.knowledgeOverlay}>
                                    <div className={styles.knowledgeText}>
                                        <p>Please indicate your level of knowledge and experience with below product categories.
                                        This will facilitate us to consider with you suitable investment & insurance products.</p>
                                    </div>
                                </div>
                            </div> : null
                            */}
                        </h4>
                        <p className={styles.updateTime}>UpdateTime: {updateTime}</p>                        
                        <div className={styles.knowMain}>
                            <table>
                                <tr>
                                    <th></th>
                                    <th>No knowledge & experience or not specified</th>
                                    <th>Have knowledge no experience</th>
                                    <th>Have knowledge with &lt;= 3years experience</th>
                                    <th>Have knowledge with &gt; 3years experience</th>
                                </tr>
                                 {
                                    keResultIndex.map(function(item,index){
                                        let contextChoose;
                                        let finalChoose; 
                                        if(item.context === 'Unit trusts' ){
                                            finalChoose=itemMap.UT
                                        }
                                         if(item.context === 'Bonds' ){
                                            finalChoose=itemMap.Bonds
                                        }
                                         if(item.context === 'Structured products' ){
                                            finalChoose=itemMap.STRUC
                                        }
                                         if(item.context === 'Investment linked insurance plans' ){
                                           
                                            finalChoose=itemMap.INVLNK
                                        }
                                         if(item.context === 'Non investment linked insurance plans' ){
                                            finalChoose=itemMap.NIVLNK
                                        }
                                        return (                                                                                   
                                        <tr key={index}>
                                            <td>{item.context}</td>                                                                                                                                                       
                                            <td className={finalChoose=='A'?styles.highlight:null}><a id={'A'+index} onClick={this.checkQuestion.bind(this,index,'A')}><FontIcon icon={item.result=='A'?"circle-confirmation-solid":"circle-delete-solid"} className={classNames(styles.icon, item.result=='A'?styles.iconConfirmation:styles.iconDelete)}/></a></td>
                                            <td className={finalChoose=='B'?styles.highlight:null}><a id={'B'+index} onClick={this.checkQuestion.bind(this,index,'B')}><FontIcon icon={item.result=='B'?"circle-confirmation-solid":"circle-delete-solid"} className={classNames(styles.icon, item.result=='B'?styles.iconConfirmation:styles.iconDelete)} /></a></td>
                                            <td className={finalChoose=='C'?styles.highlight:null}><a id={'C'+index} onClick={this.checkQuestion.bind(this,index,'C')}><FontIcon icon={item.result=='C'?"circle-confirmation-solid":"circle-delete-solid"} className={classNames(styles.icon, item.result=='C'?styles.iconConfirmation:styles.iconDelete)} /></a></td>
                                            <td className={finalChoose=='D'?styles.highlight:null}><a id={'D'+index} onClick={this.checkQuestion.bind(this,index,'D')}><FontIcon icon={item.result=='D'?"circle-confirmation-solid":"circle-delete-solid"} className={classNames(styles.icon, item.result=='D'?styles.iconConfirmation:styles.iconDelete)} /></a></td>
                                        </tr>
                                            )    
                                         },this)
                                }  
                                {trs}  
                            </table>
                            <p id="KandE_remarkContent" className={styles.remark}><span />Remarks: Yellow boarder is derived according to customer investment / insurance record in HSBC since 2012.</p>
                            {/*<div className={classNames(styles.choose, styles.clearfix)}>
                                <p>Over the past 5 years,have you held any alternative investments (including Liquid Alternatie)?</p>
                                <div className={classNames(styles.radioCheck, styles.on)}>
                                    <input type="radio" name="judgment" className={styles.formList} />
                                    <label>
                                        <span className={styles.wrapper}>
                                            <span className={styles.checked} />
                                        </span>
                                    </label>
                                    Yes
                                </div>
                                <div className={styles.radioCheck}>
                                    <input type="radio" name="judgment" className={styles.formList} />
                                    <label>
                                        <span className={styles.wrapper}>
                                            <span />
                                        </span>
                                    </label>
                                    No
                                </div>
                            </div>*/}
                            {/*<div className={classNames(styles.choose, styles.clearfix)}>
                                <p>Do you have relevant knowledge on Alterbative Investments (including Liquid Alternatie)?</p>
                                <div className={classNames(styles.radioCheck, styles.on)}>
                                    <input type="radio" name="judgment" className={styles.formList} />
                                    <label>
                                        <span className={styles.wrapper}>
                                            <span className={styles.checked} />
                                        </span>
                                    </label>
                                    Yes
                                </div>
                                <div className={styles.radioCheck}>
                                    <input type="radio" name="judgment" className={styles.formList} />
                                    <label>
                                        <span className={styles.wrapper}>
                                            <span />
                                        </span>
                                    </label>
                                    No
                                </div>
                            </div>*/}
                        </div>
                        <div className={styles.back}><a id="backTohome" href="javascript:;" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} />Back to home</a>
                            <div className={styles.button}>
                                {/*
                                <a href="javascript:void(0)" className={styles.close}>Close</a>*/}
                                <a id="KandE_saveUserAnswer" href="javascript:;" onClick={this.submitKEResult} className={styles.save}>Save</a>
                            </div>
                        </div>
                    </div>
                    {/*<div className={classNames(styles.footer, styles.clearfix)}>
                        <div className={styles.button}>
                            <a href="" className={styles.close}>Close</a>
                            <a href="" className={styles.save}>Save</a>
                        </div>
                    </div>*/}
                </div>
            </div>
        );
    }
}