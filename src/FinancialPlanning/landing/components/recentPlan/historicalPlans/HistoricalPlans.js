

import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import FormatHelper from 'common/lib/formatHelper';
import styles from './style.scss';
import PageButtonGroup from 'wealth/lib/web/components/widgets/pageButtonGroup';
import Pagination from 'wealth/lib/web/components/widgets/pagination';
import dateTimeFormat from '../../../../../config/dateTimeFormat';
import DeleteButtonConfirmPop from './DeleteButtonConfirmPop';
import Popup from 'wealth/lib/web/components/widgets/popup';
import popupStyle from './popup.scss';
import Modal from './Modal';
import PopupStyle from './popup.scss';

export default class HistoricalPlans extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            isShow:false,
            options: [5, 10, 'All'],
            currentOption: 'All',
           // detail:''
            retrieve:[],
            goalDetailOverlayisShow:false
            // isRequiredToClose: true
      };
        this.showDetail = this.showDetail.bind(this);
        this.clickCurrentGoalDeleteButton = this.clickCurrentGoalDeleteButton.bind(this);
        this.retrieveGoalDetail = this.retrieveGoalDetail.bind(this);
        this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this);
        this.clickCurrentGoalDeleteCancelButton = this.clickCurrentGoalDeleteCancelButton.bind(this);
        this.clickGoalDetailDeleteButtonShowOverly = this.clickGoalDetailDeleteButtonShowOverly.bind(this);
        
   }
   clickGoalDetailDeleteButtonShowOverly(index){ 
     console.log("clickGoalDetailDeleteButtonShowOverly:"+ index);
       this.state.retrieveGoalSummarylist[index].goalDetailOverlayisShow=true;
           this.setState({
                retrieveGoalSummarylist:this.state.retrieveGoalSummarylist
            });
      console.log("clickGoalDetailDeleteButtonShowOverly:", this.state.retrieveGoalSummarylist[index].goalDetailOverlayisShow);
   }

  clickCurrentGoalDeleteButton(arrId,goalSequenceNumber){
    console.log("clickCurrentGoalDeleteButton12:"+ arrId + ":" +goalSequenceNumber);
    this.props.deleteGoal(arrId,goalSequenceNumber);
   }
   clickCurrentGoalDeleteCancelButton(index){
     this.state.retrieveGoalSummarylist[index].goalDetailOverlayisShow=false;
           this.setState({
                retrieveGoalSummarylist:this.state.retrieveGoalSummarylist
            });
    // console.log("this delete goal popup",this.refs.deleteGoalPopup.Popup.hide;
    // this.refs[goalSequenceNumber].hide();
   }
  
//    showDetail(index,arrId,goalSequenceNumber){
//        if( this.refs[index].style.display == "none"){
//            this.retrieveGoalDetail(index,arrId,goalSequenceNumber); 
//            this.state.retrieveGoalSummarylist[index].isShow=true;
//            this.refs[index].style.display = "";
//            this.setState({
//                 retrieveGoalSummarylist:this.state.retrieveGoalSummarylist
//             });
           
//        } else {
//            this.refs[index].style.display = "none";
//            this.state.retrieveGoalSummarylist[index].isShow=false;
//            this.setState({
//                 retrieveGoalSummarylist:this.state.retrieveGoalSummarylist
//             });
//        }
//     }
     showDetail(index,arrId,goalSequenceNumber){
         console.log("showDetail:"+ index);
       if(this.state.retrieveGoalSummarylist[index].isShow==false ){
           this.retrieveGoalDetail(index,arrId,goalSequenceNumber); 
           this.state.retrieveGoalSummarylist[index].isShow=true;
           this.setState({
                retrieveGoalSummarylist:this.state.retrieveGoalSummarylist
            });
           
       } else {
           this.state.retrieveGoalSummarylist[index].isShow=false;
           this.setState({
                retrieveGoalSummarylist:this.state.retrieveGoalSummarylist
            });
       }
    }
    retrieveGoalDetail (index,arrId,goalSequenceNumber){
        
        this.props.retrieveGoalDetail(index,arrId,goalSequenceNumber);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.retrieveGoalSummarylist == undefined){
            this.setState({
                retrieveGoalSummarylist:nextProps.retrieveGoalSummarylist
            })
        } else {
            let retrieveGoalSummarylist = nextProps.retrieveGoalSummarylist;
            retrieveGoalSummarylist[nextProps.index]['retrieveGoalDetailsView'] = nextProps.retrieveGoalDetailsView;
            this.setState({
                retrieveGoalSummarylist:retrieveGoalSummarylist
            })
        }
    }

    goToDashboardPageHandle() {
        console.log('test');
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
        //browserHistory.push(target)
    }
    changeSelection (value) {
        this.setState({
            currentOption: value
        });
    }
    
    render () {
            const {
                retrieveGoalSummarylist
                } = this.props
            const isShow = this.state.isShow; 
            const  _this =this ;
            const { options, currentOption } = this.state;
            const  goalNum =retrieveGoalSummarylist.length; 
            // const isRequiredToClose = this.state.isRequiredToClose;
        return (
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.historicalPlansPage}>
                       {/*  <h4>
                            <span className={styles.title} onClick={this.show}>Your recent priority plans</span>
                        </h4>
                
                        <div className={styles.filterSection}>
                             <div className={styles.filterOneSection}>
                                 <input className={styles.filterOneSectionInput}></input>
                                 <span  className={styles.filterOneSectionArchived}>Archived plans</span>
                                 <span  className={styles.filterPlans}><FontIcon icon="filter" className={styles.filterLog}/> Filter plans</span>
                             </div>
                             <div className={styles.filterTwoSection}>
                                  <div className={styles.filterTwoSectionPriorityType}>
                                        <span className={styles.priorityType}>Priority type</span>
                                        <span className={styles.timeFrame}>Time frame(calender)</span>
                                        <span className={styles.status}>Status</span>

                                  </div>
                                  <div className={styles.filterTwoSectionSelect}>
                                      
                                      <select  className={styles.priorityTypeFilter}>
                                          <option>111</option>
                                          <option>222</option>
                                      </select>
                       
                                      <select className={styles.timeFrameFilter}>
                                          <option>111</option>
                                          <option>222</option>
                                      </select>
                                   
                                      <select className={styles.statusFilter}>
                                          <option>111</option>
                                          <option>222</option>
                                      </select>
                                   
                                  </div>   
                             </div>   
                        </div>
                  let date :  rtqretrieveGoalSummarylist.converGoalView.lastModified;
                   let goalTypeCode :  rtqretrieveGoalSummarylist.converGoalView.goalTypeCode;
                   {rtqretrieveGoalSummarylist.converGoalView[0].goalTypeCode}
                   {rtqretrieveGoalSummarylist.converGoalView[0].lastModified}
                {rtqretrieveGoalSummarylist.converGoalView.map((goal)=>{          
*/}
  { 
    retrieveGoalSummarylist.map(function(goal,index){       
         let goalDescribe,goalProcessStatus,OverviewDetailString,goalRisk,goalRiskStyleMatch,riskMatchContent,isEditButton,isResumeButton,isDeletedButton;
         {/*match goal tyep*/}
         let objGoalTypeMatch = goal.goalTypeMatch;
         let goalImg=objGoalTypeMatch.goalImg;
         let goalContext= objGoalTypeMatch.goalContext;
         {/*goal neme*/}
         let goalDescription = goal.goalDescription;
         {/*match goal status*/}
         let objGoalStatusMatch =goal.goalStfinancialGoalProcessStatusCodeatusMatch;
         let statusImg=objGoalStatusMatch.goalStatusImg;
         let statusContent= objGoalStatusMatch.goalStatusContent;
         {/*get goal key*/}
         let goalKey= goal.goalKey;
         {/*if(goal.retrieveGoalDetailsView != undefined && goal.retrieveGoalDetailsView != undefined && goal.retrieveGoalDetailsView.fundingDetails != undefined){
             fundAmount = goal.retrieveGoalDetailsView.fundingDetails.fundAmount;
         }*/}
         if(goal.retrieveGoalDetailsView && goal.retrieveGoalDetailsView.riskProfile && goal.retrieveGoalDetailsView.goalDetailContentButtonIndicate){
           {/*get current goal detailOverview*/}
          OverviewDetailString = goal.retrieveGoalDetailsView.OverviewDetailString;
           {/*get current goal risk*/}
          goalRisk= goal.retrieveGoalDetailsView.riskProfile.riskCapacityLevelNumber;
          goalRiskStyleMatch='risk'+goalRisk;
          
          riskMatchContent= goal.retrieveGoalDetailsView.riskProfile.riskMatchContent;
           {/*get current goal detail EditDeleteResume button show hide flag */}
          isDeletedButton = goal.retrieveGoalDetailsView.goalDetailContentButtonIndicate.isDeletedButton;
          isEditButton = goal.retrieveGoalDetailsView.goalDetailContentButtonIndicate.isEditButton;
          isResumeButton = goal.retrieveGoalDetailsView.goalDetailContentButtonIndicate.isResumeButton;
          }
         let arrangementIdentifierFinancialPlanning = goalKey.arrangementIdentifierFinancialPlanning;
         let goalSequenceNumber = goalKey.goalSequenceNumber;
         goalDescribe =(<span className={styles.life}><FontIcon icon={goalImg} className={styles.lifeLog}/>{goalDescription}</span>);
         goalProcessStatus = (<span className={styles.status}><span className={styles[statusImg]}></span>Status-{statusContent}</span>);
         let lastModified=FormatHelper.dateFormatPattern(goal.lastModified,dateTimeFormat.DATE_FORMAT);
         let  riskContent = (<span className={styles[goalRiskStyleMatch]}>{goalRisk}</span>);
         return(  
             <div className={styles.lifeCoverageAndOverview} key={index}>
                    <div className={styles.lifeCoverageBox}>
                    <div className={styles.lifeCoverage}>
                            {goalDescribe}
                            {goalProcessStatus}
                            <span className={styles.lastmodified}>Last modified:{lastModified}</span>
                            <a href="javascript:void(0);" onClick={_this.showDetail.bind(this,index,arrangementIdentifierFinancialPlanning,goalSequenceNumber)}>  <FontIcon   icon={goal.isShow?"chevron-up-small":"chevron-down-small"}  className={styles.showAndhide}/></a>
                    </div>
                    <div className={styles.overViewPlan} style={goal.isShow?{display:''}:{display:'none'}}>
                                 <p className={styles.overViewPlanLineFirst}>
                                     <span className={styles.overviewOfThisPlan}>Overview of this plan</span>
                                     <span className={styles.riskLevel}>Risk level</span>
                                     {riskContent}
                                     <span className={styles.advent}>{riskMatchContent}</span>
                                 </p>
                                 {/*<p className={styles.overViewPlanSecondFirst}>*/}
                                    <p className={styles.overViewPlanSecondFirst} dangerouslySetInnerHTML={{__html: OverviewDetailString}}></p>  
                                 {/*</p>*/}
                                 <div  className={styles.button}>
                                     {/*{isDeletedButton? <span className={styles.buttonTotal}> 
                                         <a href="javascript:void(0);" data-popupRef="deleteButtonPopup" className={styles.deletePlanButton}>
                                             <FontIcon icon="bin" className={styles.deleteIcon}/>
                                             Delete Plan
                                         </a>
                                           <input type="button" data-popupRef="deleteButtonPopup"  value=" Delete Plan"/>
                                         </span>:null
                                     }*/}
                                  <FontIcon icon="bin" className={styles.deleteIcon}/>  
                                  <label className={styles.deleteLable}  htmlFor={index}>Delete Plan</label>
                                  <input id={index} type="button" className={styles.deletePlanButton}  value="Delete Plan" onClick={_this.clickGoalDetailDeleteButtonShowOverly.bind(this,index)}/>
                                  {/*
                                  <Popup hideOnOverlayClick theme={popupStyle} popupRef="deleteButtonPopup" ref={goalSequenceNumber} >
                                      
                                        <DeleteButtonConfirmPop recordSIJgoal={this.recordSIJgoal.bind(this)}/>  
                                         <DeleteButtonConfirmPop onClick={_this.clickCurrentGoalDeleteButton.bind(this,arrangementIdentifierFinancialPlanning,goalSequenceNumber)}/>*/}
                                       {/*<DeleteButtonConfirmPop clickCurrentGoalDeleteButton={_this.clickCurrentGoalDeleteButton.bind(this,arrangementIdentifierFinancialPlanning,goalSequenceNumber)}
                                                               clickCurrentGoalDeleteCancelButton={_this.clickCurrentGoalDeleteCancelButton.bind(this,goalSequenceNumber)}
                                       /> 
                                  </Popup>*/}

                                  {goal.goalDetailOverlayisShow?  <Modal clickCurrentGoalDeleteCancelButton={_this.clickCurrentGoalDeleteCancelButton.bind(this,index)}>
                                        <div className={styles.modalBoday}>
                                            <p className={styles.content}>Are you sure you want to remove this plan?</p>
                                        </div>
                                        <div className={styles.btnArea}>
                                            <a  className={styles.cancelBtn} onClick={_this.clickCurrentGoalDeleteCancelButton.bind(this,index)}>Cancel</a> 
                                            <a  className={styles.subBtn} onClick={_this.clickCurrentGoalDeleteButton.bind(this,arrangementIdentifierFinancialPlanning,goalSequenceNumber)}>confirm</a> 
                                        </div> 
                                  </Modal>:null
                                 }
                                     {isEditButton? <span className={styles.buttonTotal}> 
                                         <a href="javascript:"  className={styles.editPlanButton}>Edit Plan</a>
                                        </span>:null
                                     }
                                     {isResumeButton? <span className={styles.buttonTotal}> 
                                          <a href="javascript:"  className={styles.resumeButton}>Resume</a>
                                       </span>:null
                                     }
                                 </div>
                         </div>
                    </div>
                </div>
                );
       })}                            
                    {/*<span>goal total{goalTotal}</span>*/}
                    {/*<div className={styles.back}><a href="javascript:javascript(0);" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} />Back</a></div>*/}
                    {goalNum?null:<div className={styles.warning}>
                                    <FontIcon icon="circle-error" className={styles.erroIcon} /> 
                                    <p className={styles.warningMsg}>You do not have any recent plan</p>
                                </div>}
                    {/*
                    <div className={styles.pageNation}>
                        <div className={styles.pageGroup}>
                            <h1>Show:&nbsp;</h1>
                            <PageButtonGroup options={options} currentOption={currentOption} onSelect={this.changeSelection} />
                        </div>
                        <div className={styles.pageDetail}>
                            <Pagination currentPage={1} totalPages={10}/>
                        </div>
                    </div>
                    */}
                    </div>
                </div>
            </div>
        );
    }
}
