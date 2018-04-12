import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import StickyHeaderItem from './stickyHeaderItem';
import styles from './style.scss';
import { FormattedMessage, injectIntl } from "react-intl";

class StickyHeader extends Component {
    constructor (props) {
        super(props);
        this.handleTableHeaderClick = this.handleTableHeaderClick.bind(this);
    }

    handleTableHeaderClick (sortKey, sortOrder) {
        const { handleTableHeaderClick } = this.props;
        typeof handleTableHeaderClick !== 'undefined' && handleTableHeaderClick(sortKey);
    }

    render () {
        const { sortKey, sortOrder, theme, locale } = this.props;
        const items = [   
            { sortKey: 'Product_Type', title:"Product code & name"},
            { sortKey: 'Suitability check', title: "	Suitability check"},
            { sortKey: 'Risk_level', title: "Risk level" },
            { sortKey: 'Product_currency', title: "Product currency" },
            { sortKey: 'Investment_currency', title: "Investment currency" },
            { sortKey: 'Initial_Amount', title: "Initial Amount" },
            { sortKey: 'Monthly_Amount', title: "Monthly Amount" }
            
        ];
        const headerItems = items.map((item, index) => {
            if (item.title === '') {
                return <div key={item.sortKey} />;
            }

            let sortOrderNode = '';
            if (sortKey === item.sortKey) {
                sortOrderNode = sortOrder;
            }

            const config = {
                sortKey: item.sortKey,
                sortOrder: sortOrderNode,
                title: item.title,
                onClick: this.handleTableHeaderClick
            };

            // remove sorting function for these columns
            if (item.sortKey === 'chart') {
                delete config.onClick;
            }

            return <StickyHeaderItem key={item.sortKey} {...config} />;
        });

        return (
            <div className={classNames(styles.stickyHeader, theme.stickyHeader, theme.minWidth)}>
                { headerItems }
            </div>
        );
    }
};

StickyHeader.defaultProps = {
    theme: {}
};

StickyHeader.propTypes = {
    handleTableHeaderClick: PropTypes.func,
    sortKey: PropTypes.string,
    sortOrder: PropTypes.string,
    theme: PropTypes.object
};

export default StickyHeader;
