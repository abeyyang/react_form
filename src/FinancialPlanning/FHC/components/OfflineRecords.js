import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './OfflineRecordsStyle.scss';
import PageButtonGroup from 'wealth/lib/web/components/widgets/pageButtonGroup';
import Pagination from 'wealth/lib/web/components/widgets/pagination';
import Popup from 'wealth/lib/web/components/widgets/popup';
import popupStyle from './popup.scss';
import ViewRecordDetialOverlay from './ViewRecordDetialOverlay';
import {FormattedMessage, injectIntl} from "react-intl";

 class OfflineRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [5, 10],
            currentOption: 5,
            currentPage: 1,
            sortingByDefault: true
        };
        // console.log(typeof(props.finHealthCheckSummaryList),props.finHealthCheckSummaryList);
        this.changeSelection = this.changeSelection.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.sortingRecord = this.sortingRecord.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
    }

    closeOverlay() {
        console.log('OfflineRecords.closeOverlay.begin');
        this.setState({
            showOverlayFlag: false
        });
        console.log('OfflineRecords.closeOverlay.end');
    }

   
    clickCopyAsTemplate(record,event) {
        console.log('ViewRecordsTab.clickCopyAsTemplate.begin', record);
        this.props.copyAsTemplate(record);
        console.log('ViewRecordsTab.clickCopyAsTemplate.end');
    }

    sortingRecord() {
        let reversefinHealthCheckSummaryList = this.props.finHealthCheckSummaryList.reverse();
        console.log('reverse');
        this.setState({
            sortingByDefault: !this.state.sortingByDefault
        });
    }


    calculateViewRecords(currentPage, currentOption) {
        
        if (currentOption == 'All') {
            return this.props.finHealthCheckSummaryList;
        } else {

            let finHealthCheckSummaryList = this.props.finHealthCheckSummaryList;
            let startIndex = (currentPage - 1) * currentOption;
            let endIndex = startIndex + currentOption - 1;
            endIndex = (endIndex > this.props.finHealthCheckSummaryList.length) ? this.props.finHealthCheckSummaryList.length : endIndex;
            return this.props.finHealthCheckSummaryList.slice(startIndex, endIndex + 1);
        }
    }

    

    changeCurrentPage(value) {
        this.setState({
            currentPage: value
        });
    }

    changeSelection(value) {
        console.log('value ==============' + value);
        this.setState({
            currentPage: 1,
            currentOption: value
        });
    }


    receiveRecordDetial(record,event) {
        this.props.receiveRecordDetial(record);
        this.setState({
            showOverlayFlag: true
        });
        
        console.log('receiveRecordDetial.end');
        
    }

    componentWillMount() {
      console.log('OfflineRecords Component WILL MOUNT! state',this.state);
      console.log('OfflineRecords Component WILL MOUNT! props',this.props);
  }
  componentDidMount() {
       console.log('OfflineRecords Component DID MOUNT! state',this.state);
       console.log('OfflineRecords Component DID MOUNT! props',this.props);
  }
  componentWillReceiveProps(newProps) {
        console.log('OfflineRecords Component WILL RECEIVE PROPS! state',this.state);
        console.log('OfflineRecords Component WILL RECEIVE PROPS! props',this.props);
        console.log('OfflineRecords Component WILL RECEIVE PROPS! new props',newProps);
  }
  shouldComponentUpdate(newProps, newState) {
        return true;
  }
  componentWillUpdate(nextProps, nextState) {
        console.log('OfflineRecords Component WILL UPDATE! state',this.state);
        console.log('OfflineRecords Component WILL UPDATE! props',this.props);
  }
  componentDidUpdate(prevProps, prevState) {
        console.log('OfflineRecords Component DID UPDATE! state',this.state);
        console.log('OfflineRecords Component DID UPDATE! props',this.props)
  }
  componentWillUnmount() {
         console.log('OfflineRecords Component WILL UNMOUNT! state',this.state);
         console.log('OfflineRecords Component WILL UNMOUNT! props',this.props)
  }

    render() {
        if(null==this.props.finHealthCheckSummaryList){
            return '';
        }
        const {options, currentOption, currentPage, sortingByDefault} = this.state;
        const showOverlayFlag = this.state.showOverlayFlag;
        let totalPages = (currentOption == 'All') ? 1 : Math.ceil(this.props.finHealthCheckSummaryList.length / currentOption);
        let finHealthCheckSummaryRecords = this.calculateViewRecords(currentPage, currentOption);

        const  offlineTable = "offlineTable";
        
        return (
            <div className={styles.viewRecordsPage}>
                <div className={styles.Online}>
                    <h5><span className={styles.title}><FormattedMessage id="fhc.offlineRecords"/></span></h5>
                    <table id={offlineTable}>
                        <tr>
                            <th>&nbsp;</th>
                            <th><span className={styles.tbHeader}><FormattedMessage id="fhc.date"/></span>
                                <div onClick={this.sortingRecord}>{(sortingByDefault)?<FontIcon icon="stock-down" className={styles.icon} />:<FontIcon icon="stock-up" className={styles.icon} />}</div>
                            </th>

                            <th><span className={styles.tbHeader}>Staff name(ID)</span></th>
                            <th><span className={styles.tbHeader}>&nbsp;</span></th>
                            <th><span className={styles.tbHeader}><FormattedMessage id="fhc.action"/></span></th>
                        </tr>

                        {
                            finHealthCheckSummaryRecords.map(function (item, index) {
                                  let td1 = index+',1';
                                  let td2 = index+',2';
                                  let td3 = index+',3';
                                  let td4 = index+',4';
                                  let td5 = index+',5';
                                  let tdname = offlineTable+'cell';

                                return (<tr key={index} name={index} data-row={index}>
                                    <td name={tdname} data-index={td1} data-column="latest">{(item.showCopyAsTemplateFlag) ? <span className={styles.circle}></span> : ''}</td>
                                    <td name={tdname} data-index={td2} data-column="financialHcDate">{item.financialHcDate}</td>
                                    <td name={tdname} data-index={td3} data-column="staffid">{item.staffName}({item.staffId})</td>
                                    <td name={tdname} data-index={td4} data-column="copyAsTemplate">{(item.showCopyAsTemplateFlag) ? <a href='javascript:;' onClick={this.clickCopyAsTemplate.bind(this,item)}><FontIcon icon='articles' className={styles.iconArticles} /><FormattedMessage id="fhc.copyAsTemplate"/></a> : ''}</td>

                                    <td name={tdname} data-index={td5} data-column="viewRecord"><span onClick={this.receiveRecordDetial.bind(this,item)}  data-popupRef="offlineRecordDetialOverlay" > <FontIcon  icon="pop-up-window" className={styles.iconWindow} />&nbsp;<FormattedMessage id="fhc.viewRecords"/></span></td>


                                </tr>
                                )
                            }, this)
                        }

                    </table>
                     
                    <div className={styles.pageNation}>
                        <div className={styles.pageGroup} id="fhc_viewRecords_5_10_ALL_PageButtonGroup">
                            <h1><FormattedMessage id="fhc.show"/></h1>
                            <PageButtonGroup options={options} currentOption={currentOption} onSelect={this.changeSelection} />
                        </div>
                        <div className={styles.pageDetail} id="fhc_viewRecords_currentPage_Pagination">

                            <Pagination currentPage={currentPage} totalPages={totalPages} turnPage={this.changeCurrentPage} />

                        </div>
                    </div>
                </div>
               

                <Popup theme={popupStyle} popupRef="offlineRecordDetialOverlay" hideOnOverlayClick show={showOverlayFlag} onHide={this.closeOverlay}>
                    <ViewRecordDetialOverlay closeOverlay={this.closeOverlay} customerInfo={this.props.customerInfo}  overlayData={this.props.overlayData}  copyAsTemplate={this.props.copyAsTemplate}/>
                 </Popup>
            </div>


        );
    }
}

export default injectIntl(OfflineRecords);