import React, {Component, PropTypes} from "react"
import {FormattedMessage, injectIntl} from "react-intl"

import Nav from "SFP/common/containers/Nav"
import Doormate from "SFP/common/components/nav/Doormate"
import { LAUNCH_PARAM_STR } from 'SFP/constant'

import styles from './style.scss'

class App extends Component {
    constructor(props) {
        super(props)
        this.goToLogin = this.goToLogin.bind(this)
        this.goToPath = this.goToPath.bind(this)
    }

    componentWillMount() {
        const {session} = this.props
        if (!(session && session.loaded)) {
            const launchParamStr = sessionStorage.getItem(LAUNCH_PARAM_STR)
	        if (launchParamStr) {
                console.log("++++Test: new approach;");
                this.props.gatewayLogin(launchParamStr)
	        }
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log("++++Test: old approach;");
        const {sessionA} = this.props
        if (prevProps.sessionA === null && sessionA !== null) {
            persistStore(this.context.store, {
                keyPrefix: sessionA.account,
                whitelist: ["persist"],
                storage: localForage
            })
        }
    }

    componentWillUnmount() {
        // TODO: remove this when integrate with HSBC Login
        document
            .getElementById("hsbcGspHeader")
            .removeEventListener("click", this.goToLogin)
    }

    goToLogin() {
        this.props.router.push(`/${this.props.params.locale}/index`)
    }

    goToPath(pathname, state = null) {
        const to = {
            pathname
        }
        if (state) {
            to.state = state
        }
        this.props.router.push(to)
    }

    render() {
        const {
            stickyHeight,
            isApiError,
            fatalErrorHide,
            showApiCallingError,
            errorInfo,
            router,
            params={},
            intl,
            session,
            sfpLogout,
            children,
        } = this.props
        const {loaded} = session

        // if (null==loaded) {
        //     return (<div>loading</div>)
        // }
        const hasLaunchParamStr = ("launchParamStr" in session)
        if (!hasLaunchParamStr) {
            //return null // loading
        }
        //let warningMsg='';
        //const errorList = (errorInfo && errorInfo.ERROR) || [];
        // if(errorList){
        //     warningMsg =  <ErrorHolder  errorList={errorList}/>   
        // }else{
        //     warningMsg = "Error occurs, " + errorInfo;
        // }
        return (
            <div className={styles.black}>
                {fatalErrorHide && 
                <Doormate router={router} locale={params.locale} sfpLogout={sfpLogout} />
                }
                
                {fatalErrorHide &&
                <Nav locale={params.locale} />
                }

                <div className={styles.black}>
                    {true && children? React.cloneElement(children, {
                        accounts: this.props.accounts
                    }): null}
                </div>
                
                 <div className={styles.footerWrapper}>
                    <div className={styles.footerInner}>
                        <p>
                            &copy;
                            Copyright. The Hongkong and Shanghai Banking Corporation Limited
                            2002-2017. All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

App.contextTypes = {
    store: React.PropTypes.object.isRequired
}

App.propTypes = {
    // children: PropTypes.oneOfType([
    //     PropTypes.element,
    //     PropTypes.arrayOf(PropTypes.element)
    // ]).isRequired,
    isApiError: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    stickyHeight: PropTypes.number.isRequired,
    session: PropTypes.object
}

export default injectIntl(App)
