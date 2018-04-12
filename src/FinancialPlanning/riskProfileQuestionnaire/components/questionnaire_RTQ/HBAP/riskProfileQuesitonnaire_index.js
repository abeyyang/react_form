import React, { Component } from 'react';
import classNames from 'classnames';
import config from '../../../../../config/apiConfig';
import { browserHistory } from 'react-router';

export default class riskProfileQuesitonnaire_index extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        console.log('go back profile');
        let verisonNum = config.HKHBAP.RTQ_CURRENT_VERSION;
        console.log("v.....",verisonNum);
        const target = 'riskProfileQuestionnaire00' + verisonNum;
        browserHistory.push(target);
     //   this.props.router.push(target);
    }

    componentDidMount(){
        console.log("landing did amount...")
    }

    componentWillUnMount(){
        console.log("landing will  unamount...")
    }
    render () {
       
         return (
             <div></div>
         )
    }
}