import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Accordion,{AccordionTab} from "wealth/lib/web/components/widgets/Accordion";
import {Details,Summary}  from "wealth/lib/web/components/ui/detailsSummary";
import styles from './style.scss';
import commonStyles from '../style/commonStyle.scss';
import { browserHistory } from 'react-router';

class SIJGoalDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {
           
        };
       
    }
 componentWillReceiveProps(nextProps) {

        console.log("ps ctn in sij goal detail ctn,",nextProps);
       
        
    }

    render () {
        const riskCapacity =this.props.goalInfo.riskProfile?this.props.goalInfo.riskProfile.riskCapacityLevelNumber:null;
        const goalDescription =this.props.goalInfo.financialGoal?this.props.goalInfo.financialGoal.goalDescription:"";
        return (
            <div className={styles.goalDetail}>
             <ul>

                <li className={styles.goalName} style={{width:'38%'}}>
                    <span className={styles.goalNameInner}>
                        <FontIcon icon="insurance"  className={styles.goalNameIcon}/>
                        {goalDescription ?goalDescription:""}
                    </span>
                </li>
                 {riskCapacity ?
                    <li className={styles.goalRTQ}>
                        <span className={styles.goalRTQIcon}>
                        <label  className={commonStyles["riskLevel"+riskCapacity]}>{riskCapacity}</label>
                        </span>
                        <span>Adventurous(Adjusted)</span>
                    
                    </li>  : 
                    <li className={styles.goalRTQ}>
                        <span className={styles.goalRTQIcon}>
                            <label  className={commonStyles.riskLevelSkip}></label>
                        </span>
                        <span className={commonStyles.floatRight}>Not Specified You have declined Risk Profile assessment</span>

                       
                    </li>
                   }
                {/*<li className={styles.goalOpera}><FontIcon icon="edit" className={styles.goalOperaIcon}/>Edit goal name </li>*/}
             </ul>
            </div>
        );
    }
}
export default SIJGoalDetail;