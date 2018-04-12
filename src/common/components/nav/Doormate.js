import React, {Component, PropTypes} from "react"
import {FormattedMessage, injectIntl} from "react-intl"
import styles from "./style.scss"
import FontIcon from "wealth/lib/web/components/ui/fonticon"
import DropDownPicker from "wealth/lib/web/components/widgets/dropDownPicker"
import hsbcLogo from '../../images/header/hsbc-logo.png';
import { LONG_LOCALES, NLS } from "../../../locale/constant";
import classNames from 'classnames';
import { browserHistory } from 'react-router'

class Doormate extends Component {
    constructor(props) {
        super(props)
        this.goToLogin = this.goToLogin.bind(this)
        this.handleLocaleClick = this.handleLocaleClick.bind(this)
        this.rewriteCookies = this.rewriteCookies.bind(this)
        this.getLocaleOptions = this.getLocaleOptions.bind(this)
        this.getDefaultLocaleOption = this.getDefaultLocaleOption.bind(this)
        this.goToLandingPage = this.goToLandingPage.bind(this);
        this.goToHarness = this.goToHarness.bind(this);
        this.state = {
            localeOptions: this.getLocaleOptions(),
            currentLocale: this.getDefaultLocaleOption()
        }
    }
    getDefaultLocaleOption() {
        const {locale} = this.props
        return this.getLocaleOptions().find(item => {
            return item.value === locale
        })
    }
    getLocaleOptions() {
        let locale_arr = [];
        LONG_LOCALES.forEach((long_locale) => {
            locale_arr.push({
                title: NLS[long_locale].title,
                value: long_locale
            })
        });
        return locale_arr;
    }

    goToLogin(newLocale) {
        const locale = newLocale || this.props.locale;
        console.log(this.props.router.location.pathname);
        let newPath = "";
        if(newLocale != undefined){
            let oldPath = this.props.router.location.pathname;
            newPath = oldPath.replace(this.props.locale,newLocale);
        } else {
            newPath = "/group-sfp-war/";
        }
        this.props.router.push(newPath);
    }
    goToHarness(){
        if(window.confirm("TODO: to logoff and close this window?")) {
            this.props.sfpLogout()
            window.close()
        }
    }
    handleLocaleClick(selected) {
        this.setState({
            currentLocale: selected
        })
        this.rewriteCookies()
        const locale = selected.value
        this.goToLogin(locale)
    }
    rewriteCookies() {
        console.log(document.cookie)
    }

    goToLandingPage() {
        const target = '/group-sfp-war/main/en-gb/index';
        // this.props.router.push(target);
        browserHistory.push(target)
    }
    render() {
        const {intl, locale} = this.props
        const {localeOptions, currentLocale} = this.state
        //localeOptions.map(v=>v.title = v.title.replace(/\(/,'（').replace(/\)/,'）'))
        return (
            <div id="hsbcGspHeader" className={styles.doormate}>
                <div className={styles.topNavigation}>
                    <div className={styles.navContent}>
                        <div className={styles.left}>
                            <img className={styles.brandLogo} src={hsbcLogo} />
                        </div>
                        <ul className={styles.right}>
                            <li className={styles.languageList}>
                                <DropDownPicker
                                    onChange={this.handleLocaleClick}
                                    options={localeOptions}
                                    selected={currentLocale}
                                    label=""
                                    theme={styles}
                                />
                            </li>
                            <li>
                                <div                                 
                                    onClick={this.goToHarness}
                                    className={styles.logOn}>
                                    <a href="javascript:void(0)">
                                        {intl.formatMessage({id: "doormate.logoff"})}
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/*<div className={classNames(styles.footerPage, styles.clearfix)}>
                    <div className={styles.pirorities}>
                        <span className={styles.item}>Your pirorities</span>
                        <span className={styles.image}><img src={require('./images/footer.png')} /></span>
                        <a href="javascript:;" className={styles.viewEdit}>View and edit <FontIcon icon="chevron-right" className={styles.icon} /></a>
                    </div>
                    <div className={styles.button}>
                        <a>Buy insurance</a>
                        <a>Buy investment</a>
                    </div>
                </div>*/}
            </div>
            
        )
    }
}
Doormate.propTypes = {
    router: PropTypes.object.isRequired,
    intl: PropTypes.object
}
export default injectIntl(Doormate)
