import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link,browserHistory } from 'react-router';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import RouteHelper from 'common/lib/routeHelper';
import styles from './style.scss';
import {FormattedMessage, injectIntl} from "react-intl";
import Popup from 'wealth/lib/web/components/widgets/popup';
import poupStyle from './poup.scss';

class PageNav extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            showMenu: false
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleWindowClick = this.handleWindowClick.bind(this);
        this.goToLandingPage = this.goToLandingPage.bind(this);
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

    goToLandingPage(){
        const target = '/group-sfp-war/main/en-gb/index';
        // this.props.router.push(target);
        browserHistory.push(target)
    }

    getNavItems () {
        const home = <FormattedMessage id="pagenav.home"/>;
        return [
            {
                title:home,
                icon: 'home',
                hasNewIcon: false,
                link: 'portfolio',
                section: 'portfolio'
            }
        ];
    }

    getOrderStatusItems () {
        return [
            {
                title: <FormattedMessage id="pagenav.orderstatus"/>,
                icon: 'survey',
                hasNewIcon: false,
                link: 'order-status',
                section: 'order-status'
            }
        ];
    }

    render () {
        const { routing,intl} = this.props;
        const pathname = routing.locationBeforeTransitions.pathname;
        const path = RouteHelper.formatPath(pathname);
        const locale = path.locale;
        const currentSection = path.currentSection;

        const navItemsNode = this.getNavItems().map((item) => {
            const liStyle = {
                [`${styles.active}`]: currentSection === item.section
            };
            //TODO : remove hard code home link
            // let href = "http://localhost:3000/group-sfp-war/main/en-gb/index";
            return (
                <li key={item.title} className={classNames(styles[`sect${item.title}`], liStyle)}>
                    <a title={item.title} href="javascript:void(0);" onClick={this.goToLandingPage}>
                        <span id="landingPageContent" className={styles.sectionName}>{item.title}</span>
                        <FontIcon icon={item.icon} hasNewIcon={item.hasNewIcon} theme={styles} />
                    </a>
                </li>
            );
        });

        /*const orderStatusItemsNode = this.getOrderStatusItems().map((item) => {
            const liStyle = {
                [`${styles.active}`]: currentSection === item.section
            };

            return (
                <li key={item.title} className={classNames(styles[`sect${item.title}`], liStyle)}>
                    <Link title={item.title} to={`/${locale}/${item.link}`}>
                        <FontIcon icon={item.icon} hasNewIcon={item.hasNewIcon} theme={styles} />
                        <span className={styles.sectionName}>{item.title}</span>
                    </Link>
                </li>
            );
        });*/
         const content = (
            <div className={poupStyle.popContent}>
                <div className={poupStyle.popCurrency}>
                   <p>Select a system currency</p>
                   <div className={poupStyle.currencyList}>
                       <ul>
                           <li className={poupStyle.selected}>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/HongKong.png')}  />
                                    <span className={poupStyle.currency}>HKD</span>
                               </div>
                           </li>
                           <li>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/Japan.png')}  />
                                    <span className={poupStyle.currency}>JPY</span>
                               </div>
                           </li>
                           <li>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/China.png')}  />
                                    <span className={poupStyle.currency}>CNY</span>
                               </div>
                           </li>
                           <li  className={poupStyle.noselect}>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/USA.png')}  />
                                    <span className={poupStyle.currency}>USD</span>
                               </div>
                           </li>
                           <li>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/Malaysia.png')}  />
                                    <span className={poupStyle.currency}>MYR</span>
                               </div>
                           </li>
                           <li>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/Singapore.png')}  />
                                    <span className={poupStyle.currency}>SGD</span>
                               </div>
                           </li>
                            <li  className={poupStyle.noselect}>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/Australia.png')}  />
                                    <span className={poupStyle.currency}>AUD</span>
                               </div>
                           </li>
                           <li>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/NewZealand.png')}  />
                                    <span className={poupStyle.currency}>NZD</span>
                               </div>
                           </li>
                           <li>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/Switzerland.png')}  />
                                    <span className={poupStyle.currency}>CHF</span>
                               </div>
                           </li>
                            <li  className={poupStyle.noselect}>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/Canada.png')}  />
                                    <span className={poupStyle.currency}>CAD</span>
                               </div>
                           </li>
                           <li>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/Philippines.png')}  />
                                    <span className={poupStyle.currency}>PHP</span>
                               </div>
                           </li>
                           <li>
                               <div className={poupStyle.clearfix}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/Thailand.png')}  />
                                    <span className={poupStyle.currency}>THB</span>
                               </div>
                           </li>
                            <li  className={poupStyle.noselect}>
                               <div className={classNames(poupStyle.clearfix, poupStyle.nonUnderline)}>
                                    <img className={styles.currencyFlag} src={require('./images/nationFlag/EuropeanUnion.png')}  />
                                    <span className={poupStyle.currency}>EUR</span>
                               </div>
                           </li>
                       </ul>
                    </div>
                </div>
                <div className={poupStyle.popCurrencyConvertor}>
                   <div className={poupStyle.currencyDes}>
                       <p>Currency convertor</p>
                       <div className={poupStyle.convertor}>1 USD = 7.81 HKD</div>
                    </div>
                    <div className={poupStyle.currencyInput}>
                        <select>
                            <option value="HKD">HKD</option>
                            <option value="USD">USD</option>
                        </select>
                        <input type="text" defaultValue="30,000"/>
                        <span><FontIcon icon="transfers"  className={poupStyle.transferIcon}/></span>
                        <select>
                            <option value="USD">USD</option>
                            <option value="HKD">HKD</option>
                        </select>
                        <input type="text" defaultValue="30,000"/>
                    </div>
                </div>
            </div>
        );
         
        return (
            <div className={styles.navWrap}>
                <div className={styles.leftCol}>
                    <ul className={styles.navList}>
                        {navItemsNode}
                    </ul>
                </div>
                <div className={styles.rightCol}>
                    <ul className={styles.navList}>
                        {/*{orderStatusItemsNode}*/}
                        <div className={styles.down}>
                            <a href="javascript:void(0);" data-popupRef="showCurrencyDetail">
                                <img className={styles.accountsIcon} src={require('./images/nationFlag/HongKong.png')}  />
                                <span>HKD</span>
                                <FontIcon icon="chevron-down-small"  className={styles.downIcon}/>
                            </a>
                            {/*<FontIcon icon="renew"  className={styles.renewIcone}/>*/}
                        </div>
                    </ul>
                </div>
                <Popup popupRef="showCurrencyDetail" theme={poupStyle} hideOnOverlayClick>{content}</Popup>
            </div>
        );
    }
}

PageNav.propTypes = {
    routing: PropTypes.object.isRequired,
};

export default injectIntl(PageNav);

