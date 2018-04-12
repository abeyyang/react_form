import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import RouteHelper from 'common/lib/routeHelper';
import styles from './style.scss';
import arrowStyles from './arrow.scss';
import {FormattedMessage, injectIntl} from "react-intl"

class ContextualMenu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            overflow: false,
            showLeftArrow: false,
            showRightArrow: false
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount () {
        const width = this.actions.offsetWidth;
        const scrollWidth = this.actions.scrollWidth;

        if (width < scrollWidth) {
            this.setState({
                overflow: true,
                showLeftArrow: false,
                showRightArrow: true
            });

            this.actions.addEventListener('scroll', this.handleScroll);
        }
    }

    componentWillUnmount () {
        if (this.state.overflow) {
            this.actions.removeEventListener('scroll', this.handleScroll);
        }
    }

    handleScroll () {
        const width = this.actions.offsetWidth;
        const scrollWidth = this.actions.scrollWidth;
        const showLeftArrow = this.actions.scrollLeft !== 0;
        const showRightArrow = this.actions.scrollLeft + width !== scrollWidth;

        if (showLeftArrow !== this.state.showLeftArrow) {
            this.setState({ showLeftArrow });
        } else if (showRightArrow !== this.state.showRightArrow) {
            this.setState({ showRightArrow });
        }
    }

    render () {
        const { row, theme,intl} = this.props;
        const orderId = "";
        const orderStatus = "";
        const leftArrow = this.state.showLeftArrow ? styles.active : styles.inactive;
        const rightArrow = this.state.showRightArrow ? styles.active : styles.inactive;
        //const displayCancelButton = order.allowOrderCancellationIndicator === 'true' ? true : false;
        return (
            <div className={classNames(styles.contextualMenu, theme.contextualMenu)}>
                <FontIcon icon="chevron-left-small" className={leftArrow} theme={arrowStyles} />
                <ul className={classNames(styles.actions, theme.actions)} ref={(actions) => { this.actions = actions; }}>                 
                    <li className={styles.orderDetailsTab} onClick={this.props.open.bind(this,row)}>
                        <Link title="Order Details">
                            <FontIcon icon="document" theme={styles} />
                            <span className={styles.title}>Product brochure</span>
                        </Link>
                    </li>
                    <li className={styles.orderDetailsTab}>
                        <Link title="Order Details">
                            <FontIcon icon="report" theme={styles} />
                            <span className={styles.title}>Fund express</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

ContextualMenu.defaultProps = {
    theme: {}
};

ContextualMenu.propTypes = {
    theme: PropTypes.object
};

export default injectIntl(ContextualMenu);
