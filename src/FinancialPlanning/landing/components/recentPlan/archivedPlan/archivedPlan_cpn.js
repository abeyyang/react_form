import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import withLoadingScreenBeforeReadyToLeave
    from 'common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import PageButtonGroup from 'wealth/lib/web/components/widgets/pageButtonGroup';
import Pagination from 'wealth/lib/web/components/widgets/pagination';

class archivedPlan extends Component {
    constructor (props) {
        super(props);
        this.state = {
            options: [5, 10, 'All'],
            currentOption: 'All'
        };
        
    }
    changeSelection (value) {
        this.setState({
            currentOption: value
        });
    }

    render () {
        const { options, currentOption } = this.state;
        return (
            <div className={styles.archivedPlanPage}>
                <div className={styles.archivedPlan}>
                   <div className={styles.Online}>
                        <p className={styles.title}>You can retrieve and review previously financial reports here</p>
                        <table>
                            <tr>
                                <th><span className={styles.tbHeader}>Date</span>
                                    <div><FontIcon icon="stock-down" className={styles.icon} /></div>
                                </th>
                                <th><span className={styles.tbHeader}>Report ID</span>
                                    <div><FontIcon icon="stock-down" className={styles.icon} /></div>
                                </th>
                                <th><span className={styles.tbHeader}>Remarks</span></th>
                            </tr>
                            <tr>
                                <td>20 Jul 2017</td>
                                <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View report (210717 - 001923477)</td>
                                <td>-</td></tr>
                            <tr>
                                <td>20 Jul 2017</td>
                                <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View report (210717 - 001923477)</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>20 Jul 2017</td>
                                <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View report (210717 - 001923477)</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>20 Jul 2017</td>
                                <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View report (210717 - 001923477)</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>20 Jul 2017</td>
                                <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View report (210717 - 001923477)</td>
                                <td>-</td>
                            </tr>
                        </table>
                        <div className={styles.pageNation}>
                            <div className={styles.pageGroup}>
                                <h1>Show:&nbsp;</h1>
                                <PageButtonGroup options={options} currentOption={currentOption} onSelect={this.changeSelection} />
                            </div>
                            <div className={styles.pageDetail}>
                                <Pagination currentPage={1} totalPages={10}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default withLoadingScreenBeforeReadyToLeave(injectIntl(archivedPlan))
