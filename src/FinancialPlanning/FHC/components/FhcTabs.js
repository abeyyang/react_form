import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './FhcTabsStyle.scss';
import CreateTabCtn from '../containers/CreateTab_ctn';
import ViewRecordsTab from './ViewRecordsTab';
import SelectionBox  from 'wealth/lib/web/components/widgets/selectionBox'; 
import {FormattedMessage, injectIntl} from "react-intl";

 class FhcTabs extends Component {
    constructor (props) {
        super(props);
        this.clickTab = this.clickTab.bind(this);
    }
    disableButton (tab) {
        return tab === this.props.selectedTab;
    }

    clickTab (event) {
         console.log('FhcTabs.clickTab');
         if('create' === this.props.selectedTab){
            this.props.fhcInitViewRecordTab();
         }
         else{
            this.props.fhcInitCreateTab();
         }
    }

  componentWillMount() {
      console.log('FhcTabs Component WILL MOUNT! state',this.state);
      console.log('FhcTabs Component WILL MOUNT! props',this.props);
  }
  componentDidMount() {
       console.log('FhcTabs Component DID MOUNT! state',this.state);
       console.log('FhcTabs Component DID MOUNT! props',this.props);
  }
  componentWillReceiveProps(newProps) {
        console.log('FhcTabs Component WILL RECEIVE PROPS! state',this.state);
        console.log('FhcTabs Component WILL RECEIVE PROPS! props',this.props);
        console.log('FhcTabs Component WILL RECEIVE PROPS! new props',newProps);
  }
  shouldComponentUpdate(newProps, newState) {
        return true;
  }
  componentWillUpdate(nextProps, nextState) {
        console.log('FhcTabs Component WILL UPDATE! state',this.state);
        console.log('FhcTabs Component WILL UPDATE! props',this.props);
  }
  componentDidUpdate(prevProps, prevState) {
        console.log('FhcTabs Component DID UPDATE! state',this.state);
        console.log('FhcTabs Component DID UPDATE! props',this.props)
  }
  componentWillUnmount() {
         console.log('FhcTabs Component WILL UNMOUNT! state',this.state);
         console.log('FhcTabs Component WILL UNMOUNT! props',this.props)
  }

    render () {
        const {
            stickyHeight,
            router,
            intl,
            keResult,
            keQuestionaire
       } = this.props
       
       

        const selectedTab = this.props.selectedTab;
        const boxes = [
            { title: 'Create', value: 'create', disabled: this.disableButton('create') },
            { title: 'View records', value: 'view', disabled: this.disableButton('view') }
        ];
        return (
            <div className={styles.financialhealthPage}>
                <div className={styles.financialhealthMain}>
                    <div className={styles.header}>
                        <div className={styles.MainTiltle}>
                            <h5 className={styles.tiltle}><FormattedMessage id="fhc.header.mainTiltle.financialHealthCheck"/></h5>
                            {selectedTab=='create'?'':
                                <p className={styles.subTitle}><FormattedMessage id="fhc.header.mainTiltle.past2YearsRecords"/></p>
                            }
                        </div>
                       
                        <div className={styles.theme} id="FHC_tabs_button_div">
                            <SelectionBox boxes={boxes} value={selectedTab} onClick={this.clickTab} />
                        </div>
                    </div>
                    
                    {
                        selectedTab=='create'?
                        <CreateTabCtn />
                        :
                        <ViewRecordsTab  receiveRecordDetial={this.props.receiveRecordDetial}
                            customerInfo={this.props.customerInfo} overlayData={this.props.overlayData}
                            finHealthCheckSummaryList={this.props.finHealthCheckSummaryList} 
                            copyAsTemplate={this.props.copyAsTemplate}
                            router={this.props.router}/>
                    }
               </div>
            </div>
        );
    }
}

export default injectIntl(FhcTabs);