import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Button from 'wealth/lib/web/components/ui/button';
import {FormattedMessage, injectIntl} from "react-intl";
import ObjectHelper from '../../../../../common/lib/ObjectHelper';
import lifeOverlayStyles from './lifeOverlay.scss';
class OldInsTypeOverLay extends Component {
     constructor(props) {
        super(props);
        this.state = {
        };
         this.closeOverlay = this.closeOverlay.bind(this);
         this.confirmOverlay=this.confirmOverlay.bind(this);
     }
     
    closeOverlay(){
        
        console.log("closeoverlay");
        this.props.closeOverlay();
    }
    confirmOverlay(){
        console.log('confirmOverlay');
        
        this.props.confirmOverlay('oldInsTypeOverLayFlag');
    }
    render() {
        return (
            <div className={lifeOverlayStyles.naconAttached}>
                <div className={lifeOverlayStyles.mt20}>
                        <h5>Please be reminded to recommend at least one insurance product for each of the insurance product types selected by the customer.</h5>
                        
                </div>
                    <div className={lifeOverlayStyles.footer}>
                        <div className={lifeOverlayStyles.btnCancel}>
                            {/*<input type="button" value="copy" className={styles.copy}/>*/}
                            <input type="button" className={lifeOverlayStyles.cancel} onClick={this.closeOverlay} value="Cancel"/>
                        </div>
                        <div className={lifeOverlayStyles.btnClose}>
                            {/*<input type="button" value="copy" className={styles.copy}/>*/}
                            <input type="button" className={lifeOverlayStyles.submit} onClick={this.confirmOverlay} value="Confirm"/>
                        </div>
                    </div>
            </div>
        );
    }
}

export default injectIntl(OldInsTypeOverLay);