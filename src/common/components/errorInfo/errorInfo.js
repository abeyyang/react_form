import React, { Component } from 'react';
import styles from './style.scss';
import Notification from 'wealth/lib/web/components/ui/notification';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import {FormattedMessage,FormattedHTMLMessage, injectIntl} from "react-intl";
import withLoadingScreenBeforeReadyToLeave
    from 'common/components/trading/withLoadingScreenBeforeReadyToLeave';
import objectHelper from '../../lib/objectHelper'
class ErrorInfo extends Component {
    render() {
        const {errors} = this.props;
        let errorHanding = objectHelper.isNullOrEmpty(errors.errorHanding) ? {} :errors.errorHanding
        let successList=objectHelper.isNullOrlengthZore(errorHanding.success) ? []:errorHanding.success;
        let infoList=objectHelper.isNullOrlengthZore(errorHanding.info) ? []:errorHanding.info;
        let errorList=objectHelper.isNullOrlengthZore(errorHanding.error) ? []:errorHanding.error;
        let warningList=objectHelper.isNullOrlengthZore(errorHanding.warning) ? []:errorHanding.warning;
        
        return (
        <div className={styles.errorHandle}> 
            { objectHelper.isNullOrlengthZore(warningList) ? null:
                <Notification  type="warning" >
                {   
                    warningList == undefined ? "" : warningList.map(function(item,index){
                        return (<p className={styles.errorMessage} key={index}>{item.errorCode} : {item.errorMessage}</p>)
                        },this)
                }
             </Notification>
           }
          { objectHelper.isNullOrlengthZore(infoList) ? null:
           <Notification   type="info" >
                {   
                    infoList == undefined ? "" : infoList.map(function(item,index){
                        return (<p className={styles.errorMessage} key={index}>{item.errorCode} : {item.errorMessage}</p>)
                        },this)
                }
           </Notification>
           }
           { objectHelper.isNullOrlengthZore(successList) ? null:
            <Notification  type="success" >
                    {   
                        successList == undefined ? "" : successList.map(function(item,index){
                            return (<p className={styles.errorMessage} key={index}>{item.errorCode} : {item.errorMessage}</p>)
                            },this)
                    }
            </Notification>
           }
           { objectHelper.isNullOrlengthZore(errorList) ? null:
                <Notification  type="error" >
                    {   
                        errorList == undefined ? "" : errorList.map(function(item,index){
                            return (<p className={styles.errorMessage} key={index}>{item.errorCode} : {item.errorMessage}</p>)
                            },this)
                    }
            </Notification>
           }
              {/*return (<Notification key={item.errorCode} theme={styles} type="error"><p className={styles.errorMessage}> <FormattedMessage id={item.errorCode}/></p></Notification>)
                    },this)*/}
            {/*<Notification theme={styles} type="error"><p className={styles.errorMessage}>this is the error text</p></Notification>
            <Notification theme={styles} type="warning"><p className={styles.errorMessage}>this is the warning text</p></Notification>
            <Notification theme={styles} type="info"><p className={styles.errorMessage}>this is the info text</p></Notification>
            <Notification theme={styles} type="success"><p className={styles.errorMessage}>this is the success text</p></Notification>*/}
        </div>
        );
    }
}

export default withLoadingScreenBeforeReadyToLeave(injectIntl(ErrorInfo));