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
            { sortKey: 'code', title:"ProductName"},
            { sortKey: 'underlyingStockCode_sort', title: "SuitablityCheck"},
            { sortKey: 'structureType', title: "RiskLevel" },
            { sortKey: 'period_sort', title: "ProductCurrency" },
            { sortKey: 'annum_sort', title: "6M"},
            { sortKey: 'riskLevel', title: "1Y"},
            { sortKey: 'tenor', title:  "YTD"},
            { sortKey: 'currency', title: "LastUpdateTime"},
            { sortKey: 'tradeDate_sort', title:"Discussed"},
            { sortKey: 'none_1', title: 'Add' }     
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
