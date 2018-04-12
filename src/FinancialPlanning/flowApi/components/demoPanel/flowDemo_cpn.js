import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
// import styles from './style.scss';
import Button from 'wealth/lib/web/components/ui/button';

export default class flowDemoPanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
        this.clickDataFlow = this.clickDataFlow.bind(this);
    }
    //questionnaireService/retrieveQuestionnaire
   clickDataFlow(){
        let params = {
            messageId:'recordBaseGoal',
        };
        this.props.initDemoFlowData(params);
   }
    componentWillMount(){
        this.clickDataFlow();
        console.log("Demo will amount...")
    }
    render () {
        const { 
             rtqResult,
            //  templateNumber,
             errorCodes
            } = this.props;
            // console.log("id",this.props.id);
            console.log("templateNumber",this.props.rtqResult);
            console.log("templateNumber",this.props.errorCodes);
        return (
            <div>
            <Button  value="Demo" onClick={this.clickDataFlow} />
            <p>{rtqResult.expireDate}</p>
            <p>{rtqResult.riskLevel}</p>
            <p>{rtqResult.riskLeverDescription}</p>
            <p>error code : {errorCodes.value}</p>
            </div>
        );
    }
}
