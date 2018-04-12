import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link,browserHistory } from 'react-router';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import RouteHelper from 'common/lib/routeHelper';
import styles from './style.scss';
import {FormattedMessage, injectIntl} from "react-intl";
import Popup from 'wealth/lib/web/components/widgets/popup';
import PopupStyle from './popup.scss';
import fpConfig from "../../../../config/financialProfileConfig";

class CurrencySelect extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            showMenu: false
        };
    }

    componentWillMount () {
        //this.props.fetchRiskLevel();
        //this.props.fetchCustomerEligibility();
        
    }

    componentDidMount () {
        window.addEventListener('click', this.handleWindowClick);
    }

    componentWillUnmount () {
        window.removeEventListener('click', this.handleWindowClick);
    }

    handleWindowClick (event) {
        // const area = ReactDOM.findDOMNode(this.menuButton);

        // if (!area.contains(event.target) && this.state.showMenu) {
        //     this.setState({ showMenu: false });
        // }
    }

    handleMenuClick () {
        this.setState({ showMenu: !this.state.showMenu });
    }

    retrieveFxrateByCurrency(targetCurrency){
        console.log('targetCurrency ==============' + targetCurrency);
        let request = {
        targetCurrency: targetCurrency,
        messageId:'retrieveByCurrency'
        }
        console.log('request ==============' + request);
        this.props.retrieveFxrateByCurrency(request);
        console.log('retrieveFxrateDetail.end');      
    }

    render () {
        const { routing,intl} = this.props;
        const pathname = routing.locationBeforeTransitions.pathname;
        const path = RouteHelper.formatPath(pathname);
        const locale = path.locale;
        const currentSection = path.currentSection;
        let ccyObj={
            targetCurrency:""
        };
        console.log('this.props.ccyObj',this.props.ccyObj);
        if(!this.props.ccyObj){
            console.log('undefined?',ccyObj);
             ccyObj.targetCurrency="HKD";
        }else{
            ccyObj=this.props.ccyObj;
        }


         const content = (
            <div className={PopupStyle.popContent}>
                <div className={PopupStyle.popCurrency}>
                   <p>Select a system currency</p>
                   <div className={PopupStyle.currencyList}>
                       <ul>                       
                           {
                               fpConfig.ccyList.map(
                                   item=>{
                                       let seleID = "financialProfilePanel_showCurrencySelect_"+item.key;
                                       return (
                                       <li>         
                                          <div className={classNames(PopupStyle.clearfix)}>
                                          <a id={seleID} href="javascript:void(0);" onClick={this.retrieveFxrateByCurrency.bind(this,item.key)}>
                                          <img className={styles.currencyFlag} src={require(item.imagePath)}  />
                                          <span style={{color:"black"}} className={PopupStyle.currency}>{item.key}</span>
                                          </a>
                                          </div>
                                       </li>
                                       );
                                   }
                               )
                           
                           }
                       </ul>
                    </div>
                </div>       
            </div>
        );
         
        return (
            <div className={styles.navWrap}>
                <div className={styles.leftCol}>
                </div>
                <div className={styles.rightCol}>
                    <ul className={styles.navList}>
                        <div className={styles.down}>
                        {fpConfig.ccyList.map(
                                   item=>{
                                    if (item.key == ccyObj.targetCurrency){
                                return (                   
                            <a id="financialProfilePanel_showCurrencySelect" href="javascript:void(0);" data-popupRef="showCurrencySelect">
                                <img className={styles.accountsIcon} src={require(item.imagePath)}  />
                                <span style={{color:"black"}}>{item.key}</span>
                                <Popup popupRef="showCurrencySelect" theme={PopupStyle} hideOnOverlayClick>{content}</Popup>
                            </a>
                                    );
                                    }   
                                }
                            )
                        }   
                        </div>                      
                    </ul>
                </div>
                
            </div>
        );
    }
}

CurrencySelect.propTypes = {
    routing: PropTypes.object.isRequired,
};

export default injectIntl(CurrencySelect);

