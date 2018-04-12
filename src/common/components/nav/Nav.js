import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import PageNav from 'common/containers/pageNav';
import styles from './style.scss';
import Notification from 'wealth/lib/web/components/ui/notification';
import ErrorInfo from 'common/components/errorInfo';

// TODO: i18n
class Nav extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            gspHeaderHeight: 0,
            lastScrollY: 0,
            sticky: true
        };
        this.getGspHeaderHeight = this.getGspHeaderHeight.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount () {
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.handleScroll);

        this.setState({
            gspHeaderHeight: this.getGspHeaderHeight(),
            lastScrollY: window.pageYOffset
        });

        this.getNavHeight();
    }

    componentDidUpdate () {
        this.getNavHeight();
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
    }

    getNavHeight () {
        const { updateStickyHeight, stickyHeight } = this.props;

        if (this.nav) {
            setTimeout(() => {
                const navHeight = (this.nav && this.nav.offsetHeight) ? this.nav.offsetHeight : 0;

                if (stickyHeight !== navHeight) {
                    console.log(navHeight);
                    updateStickyHeight(navHeight);
                }
            }, 0);
        }
    }

    getGspHeaderHeight () {
        if (typeof this.gspHeader === 'undefined') {
            this.gspHeader = document.getElementById('hsbcGspHeader');
        }
        return this.gspHeader.clientHeight;
    }

    handleResize () {
        const gspHeaderHeight = this.getGspHeaderHeight();
        const currentGspHeaderHeight = this.state.gspHeaderHeight;
        if (gspHeaderHeight !== currentGspHeaderHeight) {
            this.setState({
                gspHeaderHeight
            });
        }

        this.getNavHeight();
    }

    handleScroll () {
        const { lastScrollY } = this.state;
        const scrollY = window.pageYOffset;
        const { stickySensitivity } = this.props;

        if (lastScrollY < scrollY) {
            /* Down */
            this.setState({
                lastScrollY: scrollY,
                sticky: false
            });
        } else if (lastScrollY > scrollY + stickySensitivity) {
            /* Up */
            // if (scrollY < stickyHeight) {
            //     this.setState({
            //         lastScrollY: scrollY,
            //         sticky: false
            //     });
            // } else {
            //     this.setState({
            //         lastScrollY: scrollY,
            //         sticky: true
            //     });
            // }
            this.setState({
                lastScrollY: scrollY,
                sticky: true
            });
        }
    }

    render () {
        const { children,errors } = this.props;
        const { sticky } = this.state;

        const stylesNav = {
            [`${styles.sticky}`]: sticky,
            [`${styles.nonSticky}`]: !sticky
        };

        return (
            <div className={styles.black}>
                <div id="stbNav" ref={(nav) => { this.nav = nav; }} className={classNames(styles.nav, (stylesNav))} style={{ top: this.state.gspHeaderHeight }}>
                    <PageNav />
                </div>
                <div className={styles.errorDiv}>
                    <ErrorInfo errors={errors}/>
                    { children }
                </div>
            </div>
        );
    }
}

Nav.propTypes = {
    stickyHeight: PropTypes.number.isRequired,
    updateStickyHeight: PropTypes.func.isRequired,
    children: PropTypes.array,
    stickySensitivity: PropTypes.number
};

Nav.defaultProps = {
    stickySensitivity: 80
};

export default Nav;
