import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import PageButtonGroup from 'wealth/lib/web/components/widgets/pageButtonGroup';
import Pagination from 'wealth/lib/web/components/widgets/pagination';

export default class viewRecords extends Component {
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
            <div className={styles.viewRecordsPage}>
                <div className={styles.themeRight}>
                    <div className={styles.tiltleRight}><span className={styles.circle}></span>Latest record</div>
                    <span className={styles.tiltleText}>Records from past 2 years are shown for your reference</span>
                    <div className={styles.themeSearch}>
                        <FontIcon icon="search" className={styles.searchIcon} />
                        <input type="input" defaultValue="Search with report code"/>
                    </div>
               </div>
               <div className={styles.Online}>
                    <h5><span className={styles.title}>Online records</span></h5>
                    <table>
                        <tr>
                            <th>&nbsp;</th>
                            <th><span className={styles.tbHeader}>Date</span>
                                <div><FontIcon icon="stock-down" className={styles.icon} /></div>
                            </th>
                            <th><span className={styles.tbHeader}>Status</span>
                                <div><FontIcon icon="stock-down" className={styles.icon} /></div>
                            </th>
                            <th><span className={styles.tbHeader}>&nbsp;</span></th>
                            <th><span className={styles.tbHeader}>Action</span></th>
                        </tr>
                        <tr>
                            <td><span className={styles.circle}></span></td>
                            <td>20 Jul 2017</td>
                            <td>Completed</td>
                            <td><FontIcon icon="articles" className={styles.iconArticles} />&nbsp;Copy as template</td>
                            <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</td>
                        </tr>
                         <tr>
                            <td><span></span></td>
                            <td>20 Jul 2017</td>
                            <td>Completed</td>
                            <td><FontIcon icon="articles" className={styles.iconArticles} />&nbsp;Copy as template</td>
                            <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td>20 Jul 2017</td>
                            <td>Completed</td>
                            <td><FontIcon icon="articles" className={styles.iconArticles} />&nbsp;Copy as template</td>
                            <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td>20 Jul 2017</td>
                            <td>Completed</td>
                            <td><FontIcon icon="articles" className={styles.iconArticles} />&nbsp;Copy as template</td>
                            <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td>20 Jul 2017</td>
                            <td>Completed</td>
                            <td><FontIcon icon="articles" className={styles.iconArticles} />&nbsp;Copy as template</td>
                            <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</td>
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
               <div className={styles.Online}>
                    <h5><span className={styles.title}>Offline records</span></h5>
                    <table>
                        <tr>
                            <th>&nbsp;</th>
                            <th><span className={styles.tbHeader}>Date</span>
                                <div><FontIcon icon="stock-down" className={styles.icon} /></div>
                            </th>
                            <th><span className={styles.tbHeader}>Status</span>
                                <div><FontIcon icon="stock-down" className={styles.icon} /></div>
                            </th>
                            <th><span className={styles.tbHeader}>&nbsp;</span></th>
                            <th><span className={styles.tbHeader}>Action</span></th>
                        </tr>
                        <tr>
                            <td><span className={styles.circle}></span></td>
                            <td>20 Jul 2017</td>
                            <td>Completed</td>
                            <td><FontIcon icon="articles" className={styles.iconArticles} />&nbsp;Copy as template</td>
                            <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</td>
                        </tr>
                         <tr>
                            <td><span></span></td>
                            <td>20 Jul 2017</td>
                            <td>Completed</td>
                            <td><FontIcon icon="articles" className={styles.iconArticles} />&nbsp;Copy as template</td>
                            <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td>20 Jul 2017</td>
                            <td>Completed</td>
                            <td><FontIcon icon="articles" className={styles.iconArticles} />&nbsp;Copy as template</td>
                            <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td>20 Jul 2017</td>
                            <td>Completed</td>
                            <td><FontIcon icon="articles" className={styles.iconArticles} />&nbsp;Copy as template</td>
                            <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</td>
                        </tr>
                         <tr>
                            <td></td>
                            <td>20 Jul 2017</td>
                            <td>Completed</td>
                            <td><FontIcon icon="articles" className={styles.iconArticles} />&nbsp;Copy as template</td>
                            <td><FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;View records</td>
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
        );
    }
}
