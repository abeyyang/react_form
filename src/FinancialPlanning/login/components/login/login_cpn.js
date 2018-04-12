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
        this.state = {
            app:{testLanding:"default data"}
        };
        this.goToIndexPageHandle = this.goToIndexPageHandle.bind(this);
    }

    componentWillMount(){
        console.log("landing will amount...")
        
    }

    componentDidMount(){
        console.log("landing did amount...")
    }

    componentWillUnMount(){
        console.log("landing will  unamount...")
    }

    goToIndexPageHandle() {
        console.log('test');
        const target = `/group-sfp-war/main/en-gb/index`;
        this.props.router.push(target);
    }

    render () {
        return (
           <div>
                <span>staffId:<input id="staffId" type="text"/></span>
                <span>countryISOCode:<input id="countryISOCode" type="text" value="HK"/></span>
                <span>groupMemberCode:<input id="groupMemberCode" type="text" value="HBAP"/></span>
                <span>customerId:<input id="customerId" type="text"/></span>
                <span>sourceSystemRolePlayerCode:<input id="sourceSystemRolePlayerCode" type="text" value="CDM"/></span>
                <span>channelId:<input id="channelId" type="text" value="OHB"/></span>
                <span>lineOfBusinessCode:<input id="lineOfBusinessCode" type="text" value="PFS"/></span>
                <Button value="Login" onClick={this.goToIndexPageHandle}/>
           </div>
        );
    }
};


export default injectIntl(login)