import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import SelectionBox  from 'wealth/lib/web/components/widgets/selectionBox'; 
import ViewRecords from '../viewRecords';
import CreateRecords from '../createRecords';
import {FormattedMessage, injectIntl} from "react-intl";

 class financialHealthCheck extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: 2
        };
       this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this);
    }

     onClick (event) {
         console.log("panel test...");
    }

    disableButton (value) {
        return value === this.state.value;
    }

    goToDashboardPageHandle(){
        console.log('test');
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
        //browserHistory.push(target)
    }
    render () {
        const boxes = [
            { title: 'Create', value: 1, disabled: this.disableButton(1) },
            { title: 'View records', value: 2, disabled: this.disableButton(2) }
        ];

        return (
            <div className={styles.financialhealthPage}>
                <div className={styles.financialhealthMain}>
                    <div className={styles.header}>
                        <div className={styles.MainTiltle}>
                            <h5 className={styles.tiltle}><FormattedMessage id="fhc.financialHealthCheck"/></h5>
                        </div>
                       
                        <div className={styles.theme}>
                            <SelectionBox boxes={boxes} value={this.state.value} onClick={this.onClick} />
                        </div>
                    </div>
                    
                    {/*<ViewRecords/>*/}
                    <CreateRecords/>
                    
                    <div className={styles.back}><a href="javascript:;" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} /><FormattedMessage id="fhc.backToHome"/></a></div>
               </div>
            </div>
        );
    }
}

export default injectIntl(financialHealthCheck);