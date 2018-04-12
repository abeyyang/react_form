import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './ViewRecordStyle.scss';
import PageButtonGroup from 'wealth/lib/web/components/widgets/pageButtonGroup';
import Pagination from 'wealth/lib/web/components/widgets/pagination';
import Popup from 'wealth/lib/web/components/widgets/popup';
import popupStyle from './popup.scss';
import ViewRecordDetialOverlay from './ViewRecordDetialOverlay';

export default class OnlineRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [5, 10, 'All'],
            currentOption: 5,
            currentPage: 1,
            sortingByDefault: true
        };
        // console.log(typeof(props.finHealthCheckSummaryList),props.finHealthCheckSummaryList);
        this.changeSelection = this.changeSelection.bind(this);
        this.clickCopyAsTemplate = this.clickCopyAsTemplate.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.sortingRecort = this.sortingRecort.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
    }

    closeOverlay() {
        console.log('OnlineRecords.closeOverlay.begin');
        this.setState({
            showOverlayFlag: false
        });
        console.log('OnlineRecords.closeOverlay.end');
    }

   
    clickCopyAsTemplate() {
        console.log('ViewRecordsTab.clickCopyAsTemplate.begin', this.props);
        this.props.switchToCreateTab();
        let record = { id: 999999 };
        this.props.copyAsTemplate(record);
        console.log('ViewRecordsTab.clickCopyAsTemplate.end');
    }

    sortingRecort() {
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

    receiveRecordDetial(recordID,event) {
        console.log('recordID ==============' + recordID);
        let record = { "id": "1" };
        this.props.receiveRecordDetial(record);
        this.setState({
            showOverlayFlag: true
        });
        console.log('receiveRecordDetial.end');
        
    }

    componentWillMount() {
      console.log('OnlineRecords Component WILL MOUNT! state',this.state);
      console.log('OnlineRecords Component WILL MOUNT! props',this.props);
  }
  componentDidMount() {
       console.log('OnlineRecords Component DID MOUNT! state',this.state);
       console.log('OnlineRecords Component DID MOUNT! props',this.props);
  }
  componentWillReceiveProps(newProps) {
        console.log('OnlineRecords Component WILL RECEIVE PROPS! state',this.state);
        console.log('OnlineRecords Component WILL RECEIVE PROPS! props',this.props);
        console.log('OnlineRecords Component WILL RECEIVE PROPS! new props',newProps);
  }
  shouldComponentUpdate(newProps, newState) {
        return true;
  }
  componentWillUpdate(nextProps, nextState) {
        console.log('OnlineRecords Component WILL UPDATE! state',this.state);
        console.log('OnlineRecords Component WILL UPDATE! props',this.props);
  }
  componentDidUpdate(prevProps, prevState) {
        console.log('OnlineRecords Component DID UPDATE! state',this.state);
        console.log('OnlineRecords Component DID UPDATE! props',this.props)
  }
  componentWillUnmount() {
         console.log('OnlineRecords Component WILL UNMOUNT! state',this.state);
         console.log('OnlineRecords Component WILL UNMOUNT! props',this.props)
  }

    render() {

        const {options, currentOption, currentPage, sortingByDefault} = this.state;
        const showOverlayFlag = this.state.showOverlayFlag;
        let totalPages = (currentOption == 'All') ? 1 : Math.ceil(this.props.finHealthCheckSummaryList.length / currentOption);
        let finHealthCheckSummaryRecords = this.calculateViewRecords(currentPage, currentOption);
        
        return (
            <div className={styles.viewRecordsPage}>
                <div className={styles.Online}>
                    <h5><span className={styles.title}>Online records</span></h5>
                    <table>
                        <tr>
                            <th>&nbsp;</th>
                            <th><span className={styles.tbHeader}>Date</span>
                                <div onClick={this.sortingRecort}>{(sortingByDefault)?<FontIcon icon="stock-down" className={styles.icon} />:<FontIcon icon="stock-up" className={styles.icon} />}</div>
                            </th>

                            <th><span className={styles.tbHeader}>&nbsp;</span></th>
                            <th><span className={styles.tbHeader}>Action</span></th>
                        </tr>

                        {
                            finHealthCheckSummaryRecords.map(function (item, index) {

                                return (<tr key={index}>
                                    <td>{(item.showCopyAsTemplateFlag) ? <span className={styles.circle}></span> : ''}</td>
                                    <td>{item.financialHcDate}</td>
                                    <td>{(item.showCopyAsTemplateFlag) ? <a href='javascript:;' onClick={this.clickCopyAsTemplate}><FontIcon icon='articles' className={styles.iconArticles} />Copy as template</a> : ''}</td>
                                    <td><span onClick={this.receiveRecordDetial.bind(this,item.recordID)}  data-popupRef="onlineRecordDetialOverlay" > <FontIcon  icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</span></td>
                                </tr>
                                )
                            }, this)
                        }

                    </table>
                     
                    <div className={styles.pageNation}>
                        <div className={styles.pageGroup}>
                            <h1>Show:&nbsp;</h1>
                            <PageButtonGroup options={options} currentOption={currentOption} onSelect={this.changeSelection} />
                        </div>
                        <div className={styles.pageDetail}>

                            <Pagination currentPage={currentPage} totalPages={totalPages} turnPage={this.changeCurrentPage} />

                        </div>
                    </div>
                </div>
               
                <Popup theme={popupStyle} popupRef="onlineRecordDetialOverlay" hideOnOverlayClick show={showOverlayFlag} onHide={this.closeOverlay}>
                    <ViewRecordDetialOverlay closeOverlay={this.closeOverlay} overlayData={this.props.overlayData}  />
                 </Popup>


            </div>


        );
    }
}

