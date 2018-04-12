import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Button from 'wealth/lib/web/components/ui/button';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import RouteHelper from 'common/lib/routeHelper';
import { FormattedMessage, injectIntl } from "react-intl";
import { browserHistory } from 'react-router'

class login extends Component {
    constructor (props) {
        super(props);
        // this.state = {
        //     app:{testLanding:"default data"}
        // };

        this.state = {
            staffId : "43367026",
            countryISOCode : "HK",
            groupMemberCode : "HBAP",
            customerId : "IF200106",
            sourceSystemRolePlayerCode : "CDM",
            channelId : "OHB",
            lineOfBusinessCode : "PFS",
            localeCode:'en_US'
        };

       
        this.goToIndexPageHandle = this.goToIndexPageHandle.bind(this);
        this.goToGoalSim = this.goToGoalSim.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount(){
        this.props.sfpLogin(this.state);
        
        console.log("landing will amount...")
        
    }

    componentDidMount(){
        console.log("landing did amount...")
    }

    componentWillUnMount(){
        console.log("landing will  unamount...")
    }

    onChange (event) {
        console.debug("Harness field onChange.");

        let fieldId = event.target.id;
        let fieldValue = event.target.value;

        let fieldUpdate = {};
        fieldUpdate[fieldId] = fieldValue;

        const newState = Object.assign({}, this.state, fieldUpdate);

        this.setState(newState);

        this.props.sfpLogin(newState);
        
    }

    goToIndexPageHandle() {
        console.log('test');
        // const target = `/group-sfp-war/main/en-gb/index`;
        // this.props.router.push(target);

        // let params = [];

		// params.push("serviceMode=" + "online");
        // params.push("ChannelID=" + this.state.channelId);
        // params.push("HSBC_OHD_CHANNEL_COUNTRY_CODE=" + this.state.countryISOCode);
        // params.push("HSBC_OHD_CHANNEL_GROUP_MEMBER_ID=" + this.state.groupMemberCode);
        // params.push("HSBC_OHD_STAFF_ID=" + this.state.staffId);
        // params.push("IPType=" + this.state.lineOfBusinessCode);
        // params.push("IPID=" + this.state.customerId);
        // params.push("PROSPECTID=" + "");
        // params.push("IPCC=" + this.state.countryISOCode);
        // params.push("IPGMC=" + this.state.groupMemberCode);
        // params.push("HSBC_OHD_CUSTOMER_TYPE=" + this.state.sourceSystemRolePlayerCode);
        // params.push("HSBC_OHD_DISPLAY_TIMEZONE=" + "");
        // params.push("launchLocale=" + "en_US");
        // params.push("LEAD_ID=" + "");
        // params.push("HSBC_OHD_USER_LEGACY_ID=" + "WD01");
        // params.push("HSBC_OHD_USER_LEGACY_DEVICE_ID=" + "WD01");
        // params.push("MANUAL_TAGGING_STAFF_ID=" + "00000001");
        // params.push("MANUAL_TAGGING_STAFF_NAME=" + "Jamie Xavier");
        // params.push("planID=" + "");
        // params.push("goalID=" + "");
        // params.push("goalType=" + "");
        // params.push("sourcePage=" + "");
        // params.push("URL_REDIRECT_ACTION=" + "");
        // params.push("backActionURL=" + "");
        // params.push("continueActionURL=" + "");

        const target = `${CONFIG.WEB_ROOT}main/en-gb/index`;
        browserHistory.push(target);
        // window.open(target, "react");
    }

    goToGoalSim() {
        console.log('goToGoalSim');
        const target = `${CONFIG.WEB_ROOT}main/en-gb/goalSimulator`;
        browserHistory.push(target);
    }

    render () {
        return (
           <div>
                <p>staffId:<input id="staffId" type="text" value={this.state.staffId} onChange={this.onChange} /></p><br/>
                <p>countryISOCode:<input id="countryISOCode" type="text" value={this.state.countryISOCode} onChange={this.onChange} /></p><br/>
                <p>groupMemberCode:<input id="groupMemberCode" type="text" value={this.state.groupMemberCode} onChange={this.onChange} /></p><br/>
                <p>customerId:<input id="customerId" type="text" value={this.state.customerId} onChange={this.onChange} /></p><br/>
                <p>sourceSystemRolePlayerCode:<input id="sourceSystemRolePlayerCode" type="text" value={this.state.sourceSystemRolePlayerCode} onChange={this.onChange} /></p><br/>
                <p>channelId:<input id="channelId" type="text" value={this.state.channelId} onChange={this.onChange} /></p><br/>
                <p>lineOfBusinessCode:<input id="lineOfBusinessCode" type="text" value={this.state.lineOfBusinessCode} onChange={this.onChange} /></p><br/>
                <p>localeCode:<input id="localeCode" type="text" value={this.state.localeCode} onChange={this.onChange} /></p><br/>
                <Button value="Login" onClick={this.goToIndexPageHandle}/>
                <Button value="Go to Simulator" onClick={this.goToGoalSim}/>
           </div>
        );
    }
};


export default injectIntl(login)