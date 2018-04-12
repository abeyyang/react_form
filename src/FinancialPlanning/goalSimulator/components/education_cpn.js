import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import {FormattedMessage, injectIntl} from "react-intl";
import styles from './education.scss';

export default class education extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
       
    }



    render () {
        
        
        return (
            
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                
                    education content
                </div>
            </div>
        );
    }
}
