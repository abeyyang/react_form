import React, { Component, PropTypes } from 'react';

import styles from '../components/style.scss';
import UIStyles from '../components/ui.scss';
import { ScrollTab } from 'CommonUI/Form';
import Notification from 'wealth/lib/web/components/ui/notification';

import Sample from '../components/SampleForm';
import SampleLayout from '../components/SampleLayout';

import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';
import Button from 'wealth/lib/web/components/ui/button';

class SampleContainer extends Component {
    constructor (props) {
        super(props);
       
        this.state = {
            tabIndex : 0
        };

        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick (event) {
        console.log("++++Test: buttonClick ", event);
        
        const result = this.props.validateByTag("example",(error)=>{
            console.log("ErrorValidators:", error);
        });
        alert('Is all validator in child component pass ? ' + result);
    }

    render () {
        

        const tabs = [
            { title: 'Form' },
            { title: 'Layout' }
        ];

        return (
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}> 

                <br/><br/>

                <Notification type="error">
                    <p>ERROR: This is a sample page of common UI component.</p> <br/>
                    <p>ERROR: Second Line of This is a sample page of common UI component.</p>
                </Notification>
                <Notification type="warning">
                    <p>WARN: This is a sample page of common UI component.</p>
                </Notification>
                <Notification type="success">
                    <p>SUCCESS: This is a sample page of common UI component.</p>
                </Notification>
                <Notification type="info">
                    <p>INFO: This is a sample page of common UI component.</p>
                </Notification>

                <br/>
                <br/>

                
                
                <ScrollTab tabs={tabs} activeIndex={this.state.tabIndex} onClick={ (selectedTab, index) => { console.log("++++Test: ScrollTab : ", selectedTab, index); this.setState( {tabIndex : index});} } /><br /><br />


                {this.state.tabIndex == 0 ? 
                    <Sample />
                    : 
                    <SampleLayout />
                }

                <br/>
                <br/>
                <h2>Button outside form component.</h2>
                <Button value="ContainerButton" onClick = { (event) =>  { this.buttonClick(event); } }/>
                </div>
            </div>
        );
    }
}

export default ValidationController(SampleContainer);