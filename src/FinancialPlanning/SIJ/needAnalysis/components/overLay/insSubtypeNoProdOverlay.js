import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Button from 'wealth/lib/web/components/ui/button';
import {FormattedMessage, injectIntl} from "react-intl";
import ObjectHelper from '../../../../../common/lib/ObjectHelper';
import lifeOverlayStyles from './lifeOverlay.scss';
class InsSubtypeNoProdOverlay extends Component {
     constructor(props) {
        super(props);
        this.state = {
        };
         this.closeOverlay = this.closeOverlay.bind(this);
         this.confirmOverlay=this.confirmOverlay.bind(this);
     }
     
    closeOverlay(){
        debugger;
        console.log("closeoverlay");
        this.props.closeOverlay();
    }
    confirmOverlay(){
        console.log('confirmOverlay'); 
        debugger;
        this.props.confirmOverlay('insSubtypeNoProdOverlayFlag');
    }
    render() {
        return (
            <div className={lifeOverlayStyles.naconAttached}>
                <div className={lifeOverlayStyles.mt20}>
                        {/*Overlay_old_ins_obj_more*/}
                        <h5>No life insurance product is available for some of the selected insurance product type(s).</h5>
                     
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

export default injectIntl(InsSubtypeNoProdOverlay);