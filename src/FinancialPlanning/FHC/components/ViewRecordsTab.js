import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './ViewRecordStyle.scss';
import OfflineRecords from './OfflineRecords';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import {FormattedMessage, injectIntl} from "react-intl";

class ViewRecordsTab extends Component {
      constructor (props) {
        super(props);
        this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this);
    }
    goToDashboardPageHandle() {
        console.log('FhcTabs.goToDashboardPageHandle');
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
    }

componentWillMount() {
      console.log('ViewRecordsTab Component WILL MOUNT! state',this.state);
      console.log('ViewRecordsTab Component WILL MOUNT! props',this.props);
  }
  componentDidMount() {
       console.log('ViewRecordsTab Component DID MOUNT! state',this.state);
       console.log('ViewRecordsTab Component DID MOUNT! props',this.props);
  }
  componentWillReceiveProps(newProps) {
        console.log('ViewRecordsTab Component WILL RECEIVE PROPS! state',this.state);
        console.log('ViewRecordsTab Component WILL RECEIVE PROPS! props',this.props);
        console.log('ViewRecordsTab Component WILL RECEIVE PROPS! new props',newProps);
  }
  shouldComponentUpdate(newProps, newState) {
        return true;
  }
  componentWillUpdate(nextProps, nextState) {
        console.log('ViewRecordsTab Component WILL UPDATE! state',this.state);
        console.log('ViewRecordsTab Component WILL UPDATE! props',this.props);
  }
  componentDidUpdate(prevProps, prevState) {
        console.log('ViewRecordsTab Component DID UPDATE! state',this.state);
        console.log('ViewRecordsTab Component DID UPDATE! props',this.props)
  }
  componentWillUnmount() {
         console.log('ViewRecordsTab Component WILL UNMOUNT! state',this.state);
         console.log('ViewRecordsTab Component WILL UNMOUNT! props',this.props)
  }
   
    render () {

        return (
            <div className={styles.viewRecordsPage}>
                <OfflineRecords finHealthCheckSummaryList={this.props.finHealthCheckSummaryList} copyAsTemplate={this.props.copyAsTemplate}
                   overlayData={this.props.overlayData} customerInfo={this.props.customerInfo} receiveRecordDetial={this.props.receiveRecordDetial}/>
                <div className={styles.back}>
                    <a href="javascript:;" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} /><FormattedMessage id="fhc.backToHome"/></a>
                </div>
            </div>  

        );
    }
}

export default injectIntl(ViewRecordsTab);