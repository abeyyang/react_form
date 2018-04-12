import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import withLoadingScreenBeforeReadyToLeave
    from 'common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import styles from './style.scss';
import SelectionBox  from 'wealth/lib/web/components/widgets/selectionBox';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import ArchivedPlan from '../archivedPlan/archivedPlan_cpn';
import HistoricalPlans from '../historicalPlans';
import RiskProfilePanel from '../../../containers/riskProfile_ctn';

class recentPlanMain extends Component {
    constructor (props) {
        super(props);
        this.state = {
             value: 1,
             showRecent:true,
             showArchived:false
        };
        this.changeBox = this.changeBox.bind(this);
        this.retrieveGoalSummaryList = this.retrieveGoalSummaryList.bind(this);
    }
    componentWillMount(){
        console.log("componentWillMount");
        this.retrieveGoalSummaryList ();
    }
    changeBox(event){
        const value = Number(event.target.value);
        this.setState({ value });
        if(event.target.value==1){
            this.setState({
                showRecent:true,
                showArchived:false
            });
        }else if(event.target.value==2){
           this.setState({
                showRecent:false,
                showArchived:true
            }); 
        }
    }
     retrieveGoalSummaryList (){
          console.log(this.props);
          console.log('test');
        const request = {
            customers: [],
        	filteringCriteria: [{
    		filteringKey: "PLANTYPE",
    		filteringValue: "S",
    		operation: "AND",
    		sequence: "0"
         	}],
    	   localeCode: {
    		localeCode: "en_US"
         	}
        }
        
        this.props.retrieveGoalList(request);
    }

    retrieveGoalDetail(index,arrId,goalSequenceNumber){
        console.log("call back Main :" + arrId + ":" + goalSequenceNumber);
        //console.log(this.event);
        //console.log(arrId+":"+goalSequenceNumber);
        const request = {
         customers: [],
          localeCode : {
                localeCode: "en_US"
            },
            goalKey: {
                arrangementIdentifierFinancialPlanning : arrId,
                goalSequenceNumber: goalSequenceNumber
            },
            subserviceId: [{
                    functionOutputCode : "SUMMARY"
                }, {
                    functionOutputCode : "SPRODLIST"
                }, {
                    functionOutputCode : "ALTPROD"
                }, {
                    functionOutputCode : "INVIND"
                }, {
                    functionOutputCode : "STATUS"
                }
            ],
            requestInvestorIndicator : [{
                    indicatorKey: "INV"
                }, {
                    indicatorKey : "AIPI"
                }
            ]
        }
        this.setState({
            currentIndex:index
        });
        this.props.retrieveGoalDetail(request);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
           retrieveGoalDetailsView : nextProps.retrieveGoalDetailsView,
           retrieveGoalSummarylist : nextProps.retrieveGoalSummarylist
        });
    }

//  recordGoalDetail(arrId,goalSequenceNumber){
//    console.log("recordGoalDetail call back Main :" + arrId + ":" + goalSequenceNumber);
//    console.log("recordGoalDetail call back Main :",this.props);
//    const  request = {
//       "customers" : [{
//                 "countryISOCode" : "HK",
//                 "groupMemberCode" : "HBAP",
//                 "sourceSystemRolePlayerCode" : "CDM",
//                 "rolePlayerIdentificationNumber" : "HKHBAP506035781",
//                 "customerAttribute" : [{
//                         "attributeKey" : "",
//                         "attributeValue" : ""
//                     }
//                 ]
//             }
//             ],
//         "localFieldsArea": [{
//             "localFieldsArea": "en_US"
//         }],
//         "subserviceId": [{
//             "functionOutputCode": "SAVABANDON"
//         }],
//         "goalKey": {
//             "arrangementIdentifierFinancialPlanning": arrId,
//             "goalSequenceNumber": goalSequenceNumber
//         },
//         "leadId": {
//             "leadSourceSystemNumber": ""
//         },
//         "goalAttribute": [{
//             "goalAttributeKey": "GOAL_STATUS_CHANGE_REASON_TEXT",
//             "goalAttributeValue": "DDDDDDD"
//         }],
//         "comment": [{
//             "commentType": "GOAL_STAT_CHNG",
//             "commentKey": "GOAL_ABG_REASON",
//             "commentText": "DDDDDDD"
//         }],
//         "commentAction": [{
//             "commentType": "GOAL_STAT_CHNG",
//             "action": "U"
//         }]
//       }
//        this.props.recordGoalDetail(request);
//     } 

 deleteGoal(arrId,goalSequenceNumber){
     const request =  {
                   customers: [],
                    goalMaintenance: {
                        "maintenanceCode" : "DELETE"
                    },
                    goalKey: {
                        "arrangementIdentifierFinancialPlanning" : arrId,
                        "goalSequenceNumber" : goalSequenceNumber
                    }
                }
         this.props.deleteGoalInformation(request); 
  }

    render () {
         const boxes = [
            { title: 'Recent plans', value: 1 },
            { title: 'Archived plans', value: 2 }
        ];
        const showRecent = this.state.showRecent;
        let showArchived = this.state.showArchived;
        {/*
        const goalNum = this.props.retrieveGoalSummarylist.length;
        if(goalNum==0){
            showArchived = !this.state.showArchived;
        }*/}
        return (
            <div className={styles.recentPlanMainPage}>
                <div className={styles.recentPlanMain}>
                    <div className={styles.theme}>
                        <SelectionBox boxes={boxes} value={this.state.value} onClick={this.changeBox} />
                    </div>
                    {/*
                    <div className={styles.themeRight}>
                        <div className={styles.themeSearch}>
                            <FontIcon icon="search" className={styles.searchIcon} />
                            <input type="input" defaultValue="Search with report code"/>
                        </div>
                        <div className={styles.themeFilter}>
                            <FontIcon icon="filter" className={styles.filterIcon} />
                            <span>filter plans</span>
                        </div>
                    </div>
                    */}
                    {showRecent?<HistoricalPlans index={this.state.currentIndex} retrieveGoalSummarylist={this.props.retrieveGoalSummarylist} retrieveGoalDetailsView={this.state.retrieveGoalDetailsView} retrieveGoalDetail={this.retrieveGoalDetail.bind(this)}
                     deleteGoal={this.deleteGoal.bind(this)}/>:null}
                    {showArchived?<ArchivedPlan/>:null}
                </div>
            </div>
        );
    }
};

export default withLoadingScreenBeforeReadyToLeave(injectIntl(recentPlanMain))
