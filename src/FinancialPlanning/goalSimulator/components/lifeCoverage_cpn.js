import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import {FormattedMessage, injectIntl} from "react-intl";
import styles from './lifeCoverage.scss';
import { browserHistory } from 'react-router';
//import Transition from "CommonUI/loading";

export default class lifeCoverage extends Component {
    constructor (props) {
        super(props);
        //console.log("is loading flag: ", this.props.isLoading);
        this.clickCalculateRisk = this.clickCalculateRisk.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log('lifeCoverage Component WILL RECEIVE PROPS! state',this.state);
        console.log('lifeCoverage Component WILL RECEIVE PROPS! props',this.props);
        console.log('lifeCoverage Component WILL RECEIVE PROPS! new props',newProps);
    }

    clickCalculateRisk (event) {
         console.log('calculateRiskCapacityAct ... ');
         this.props.calculateRiskCapacityAct();
    }

    goToGoalSim (event) {
        console.log("goToGoalSim ... ");
        const target = "/group-sfp-war/main/en-gb/goalSimulator/growYourWealth";
        browserHistory.push(target);
    }



    render () {
        //const isLoading = this.props.isLoading;
        //let loadingIcon = isLoading ? <Transition /> : "";

        return (
            
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <a href="#" onClick={this.clickCalculateRisk}>trigger calculate risk</a>
                    <br/>
                    <a href="#" onClick={this.goToGoalSim}>go to goal simulator with parm</a>
                    <div>calculated Risk Number: { this.props.fieldsDetail.riskLevelSelected }</div>
                    lifeCoverage content
                </div>
            </div>
            
        );
    }
}
