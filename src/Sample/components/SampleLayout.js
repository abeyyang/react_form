import React, { Component, PropTypes } from 'react';
// import exampleStyles from 'wealth/examples/web/styles/example.scss';

import classNames from 'classnames';
import styles from './style.scss';
import UIStyles from './ui.scss';

// --------
// form
// --------
import Title from 'wealth/lib/web/components/ui/title';



export default class SampleLayout extends Component {
    constructor (props) {
        super(props);
        
    }

    render () {
        
        
        return (
            <div>

                <Title title="Hehe" />
                
            </div>
        );
    }
}