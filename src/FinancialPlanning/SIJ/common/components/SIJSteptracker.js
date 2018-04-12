import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Accordion,{AccordionTab} from "wealth/lib/web/components/widgets/Accordion";
import {Details,Summary}  from "wealth/lib/web/components/ui/detailsSummary";
import styles from './style.scss';
import { browserHistory } from 'react-router';

class SIJSteptracker extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
        
    }
    render () {
        return (
            <div className={styles.stepTracker}>
                  <ul>
                    <li className={styles.doneStatus}>1.Simplified Insurance : </li>
                    <li className={styles.currentStatus}>2.Product selection</li>
                    <li className={styles.undoneStatus}> </li>
                </ul>
            </div>
        );
    }
}
export default SIJSteptracker;