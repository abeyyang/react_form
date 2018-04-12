import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Accordion,{AccordionTab} from "wealth/lib/web/components/widgets/Accordion";
import {Details,Summary}  from "wealth/lib/web/components/ui/detailsSummary";
import styles from './style.scss';
import { browserHistory } from 'react-router';

class FinancialProfile extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
        this.goToInsProdSelection = this.goToInsProdSelection.bind(this);
    }

    goToInsProdSelection(){
        const target = '/group-sfp-war/main/en-gb/insJourney';
        browserHistory.push(target);
    }

    render () {
        return (
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.financialProfile}>
                        <h4>
                            <span className={styles.title}>Financial profile</span>
                        </h4>
                        <div className={classNames(styles.showAll, styles.clearfix)}>
                            <span className={styles.expand}><FontIcon icon="chevron-down" className={styles.icon} />&nbsp;Expand all</span>
                            <span className={styles.indicate}>
                                <span className={styles.symbol}>*&nbsp;</span>Indicates a required field
                            </span>
                        </div>
                        <div className={styles.salesMain}>

                            <Accordion>
                                {/*Income panel start*/} 
                                <AccordionTab title="Income">
                                    <div className={styles.question}>
                                        <div className={styles.questionCon}>
                                            <div className={styles.incomeConent}>
                                                <table>
                                                    <tr>
                                                        <th>Income sources </th>
                                                        <th>Amount</th>
                                                    </tr>
                                                <tr>
                                                        <td>Personal income&nbsp;<FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                        <td><input type="text" name="personalIncome" className={styles.formList} defaultValue="HKD 50,000"/></td>
                                                    </tr>
                                                <tr>
                                                        <td>Contribution by family member&nbsp;<FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                        <td><input type="text" name="personalIncome" className={styles.formList} defaultValue="HKD 50,000"/></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dividend / Interest income&nbsp;<FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                        <td><input type="text" name="personalIncome" className={styles.formList} defaultValue="HKD 50,000"/></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Rental income&nbsp;<FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                        <td><input type="text" name="personalIncome" className={styles.formList} defaultValue="HKD 50,000"/></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Other income&nbsp;<FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                        <td><input type="text" name="personalIncome" className={styles.formList} defaultValue="HKD 50,000"/></td>
                                                    </tr>
                                                    <tr>
                                                        <td className={styles.lastTd}>Average monthly income form all sources in the past 2 years&nbsp;<FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                        <td className={styles.lastTd}>HKD 115,000</td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div className={classNames(styles.next, styles.clearfix)}><a href="javascript:;">Next</a></div>
                                        </div>
                                   </div> 
                                </AccordionTab>
                                {/*Income panel end*/} 

                                {/*expenses panel start*/}
                                <AccordionTab title="Expenses">
                                    <div className={styles.question}>
                                    <div className={styles.questionCon}>
                                     <div className={styles.LiabConent}>
                                        <table>
                                            <tr>
                                                <th>Amount</th>
                                                <th>&nbsp; </th>
                                                <th>&nbsp; </th>
                                                <th>HSBC<br/> records as of</th>
                                                <th>Deviation</th>
                                                <th>Remarks<FontIcon icon="circle-help-solid" className={styles.icon} /></th>
                                            </tr>
                                            <tr>
                                                <td>Personal and family living expenses&nbsp;</td>
                                                <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/><FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                <td className={styles.inputTd}>&nbsp;</td>
                                                <td className={styles.textTd}>N/A</td>
                                                <td className={styles.textTd}>N/A</td>
                                                <td className={styles.remarkTd}>Type remarks...<FontIcon icon="edit" className={styles.icon} /></td>
                                            </tr>  
                                            <tr>
                                                <td>Mortgage / Rental payment&nbsp;</td>
                                                <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/><FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                <td className={styles.inputTd}>&nbsp;</td>
                                                <td className={styles.textTd}>N/A</td>
                                                <td className={styles.textTd}>N/A</td>
                                                <td className={styles.remarkTd}>Type remarks...<FontIcon icon="edit" className={styles.icon} /></td>
                                            </tr> 
                                            <tr>
                                                <td>Education expenses&nbsp;</td>
                                                <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/><FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                <td className={styles.inputTd}>&nbsp;</td>
                                                <td className={styles.textTd}>N/A</td>
                                                <td className={styles.textTd}>N/A</td>
                                                <td className={styles.remarkTd}>Type remarks...<FontIcon icon="edit" className={styles.icon} /></td>
                                            </tr> 
                                            <tr>
                                                <td>Other expenses&nbsp;</td>
                                                <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/><FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                <td className={styles.inputTd}>&nbsp;</td>
                                                <td className={styles.textTd}>N/A</td>
                                                <td className={styles.textTd}>N/A</td>
                                                <td className={styles.remarkTd}>Type remarks...<FontIcon icon="edit" className={styles.icon} /></td>
                                            </tr> 
                                            <tr>
                                                <td>Monthly insurance premium&nbsp;</td>
                                                <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/><FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                <td className={styles.inputTd}>&nbsp;</td>
                                                <td className={styles.textTd}>N/A</td>
                                                <td className={styles.textTd}>N/A</td>
                                                <td className={styles.remarkTd}>Type remarks...<FontIcon icon="edit" className={styles.icon} /></td>
                                            </tr>    
                                            <tr>
                                                <td className={styles.lastTr}>total&nbsp;</td>
                                                <td className={classNames(styles.inputTd,styles.lastTr)}>HKD 50,000.00</td>
                                                <td className={classNames(styles.inputTd,styles.lastTr)}>HKD 50,000.00</td>
                                                <td className={classNames(styles.textTd,styles.lastTr)}>&nbsp;</td>
                                                <td className={classNames(styles.textTd,styles.lastTr)}>&nbsp;</td>
                                                <td className={classNames(styles.remarkTd,styles.lastTr)}>=&nbsp;HKD 50,000.00</td>
                                            </tr>   
                                        </table>
                                        <div className={styles.tableBottom}>if existing insurance policy(ies) premium is/are to be paid by liquid asset. It should not be countered as monthly expenses.</div>
                                       {/*question start*/}
                                        <div>
                                            <p className={styles.summary}>Do you pay your exiting the insurance premium(s) by liquid assets?</p>
                                            {/*option 1*/}
                                            <div>
                                                <div className={classNames(styles.radioCheck, styles.on)}>
                                                    <input type="radio" name="judgment" className={styles.formList} />
                                                    <label>
                                                        <span className={styles.wrapper}>
                                                            <span className={styles.checked} />
                                                        </span>
                                                    </label>
                                                    No
                                                </div>
                                             </div>
                                             {/*option 2*/}
                                             <div>
                                                <div className={styles.radioCheck}>
                                                    <input type="radio" name="judgment" className={styles.formList} />
                                                    <label>
                                                        <span className={styles.wrapper}>
                                                            <span />
                                                        </span>
                                                    </label>
                                                   <span className={styles.por}>Yes</span><br />
                                                   <span className={styles.percent}>All my existing life insurance premiumsare paid by liquid assets</span>
                                                </div>
                                            </div>
                                            {/*option 3*/}
                                            <div>
                                                <div className={styles.radioCheck}>
                                                    <input type="radio" name="judgment" className={styles.formList} />
                                                    <label>
                                                        <span className={styles.wrapper}>
                                                            <span />
                                                        </span>
                                                    </label>
                                                   <span className={styles.por}>Yes</span><br />
                                                   <span className={styles.percent}>Part of my existing life insurance premiumsare are paid by liquid assets</span>
                                                </div>
                                            </div>
                                        
                                        
                                        </div>
                                        
                                        <div>
                                          <p className={styles.summary}>Premiums of life insurance policy(ies) to be paid by liquid assets (HSBC)</p>  
                                          <span>
                                              <input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/>
                                              <FontIcon icon="circle-help-solid" className={styles.icon} />
                                          </span>
                                          <p className={styles.summary}>Premiums of life insurance policy(ies) to be paid by liquid assets other company</p>  
                                          <span>
                                              <input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/>
                                              <FontIcon icon="circle-help-solid" className={styles.icon} />
                                          </span>
                                        </div>
                                        {/*question end*/}
                                    </div>
                                    <div className={classNames(styles.next, styles.clearfix)}><a href="javascript:;">Next</a></div>
                                </div>
                                </div> 
                                </AccordionTab>
                                {/*expenses panel end*/}

                                {/*Assets panel start*/} 
                                <AccordionTab title="Assets">
                                    <div className={styles.question}>
                                        <div className={styles.questionCon}>
                                        <div className={styles.LiabConent}>
                                            <table>
                                                <tr>
                                                    <th>&nbsp; </th>
                                                    <th>HSBC</th>
                                                    <th>Non HSBC</th>
                                                    <th>HSBC<br/> records as of</th>
                                                    <th>Deviation</th>
                                                    <th>Remarks<FontIcon icon="circle-help-solid" className={styles.icon} /></th>
                                                </tr>
                                                <tr>
                                                    <td>Personal and family living expenses&nbsp;</td>
                                                    <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia}  defaultValue="HKD 50,000"/></td>
                                                    <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/><FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                    <td className={styles.textTd}>N/A</td>
                                                    <td className={styles.textTd}>N/A</td>
                                                    <td className={styles.remarkTd}>Type remarks...<FontIcon icon="edit" className={styles.icon} /></td>
                                                </tr>  
                                                <tr>
                                                    <td>Invesment&nbsp;</td>
                                                    <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia}  defaultValue="HKD 50,000"/></td>
                                                    <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/></td>
                                                    <td className={styles.textTd}>N/A</td>
                                                    <td className={styles.textTd}>N/A</td>
                                                    <td className={styles.remarkTd}>Type remarks...<FontIcon icon="edit" className={styles.icon} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Other liquid assets&nbsp;</td>
                                                    <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia}  defaultValue="HKD 50,000"/></td>
                                                    <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/></td>
                                                    <td className={styles.textTd}>N/A</td>
                                                    <td className={styles.textTd}>N/A</td>
                                                    <td className={styles.remarkTd}>Type remarks...<FontIcon icon="edit" className={styles.icon} /></td>
                                                </tr>    
                                                <tr>
                                                    <td className={styles.lastTr}>total&nbsp;</td>
                                                    <td className={classNames(styles.inputTd,styles.lastTr)}>HKD 50,000.00</td>
                                                    <td className={classNames(styles.inputTd,styles.lastTr)}>HKD 50,000.00</td>
                                                    <td className={classNames(styles.textTd,styles.lastTr)}>&nbsp;</td>
                                                    <td className={classNames(styles.textTd,styles.lastTr)}>&nbsp;</td>
                                                    <td className={classNames(styles.remarkTd,styles.lastTr)}>=&nbsp;HKD 50,000.00</td>
                                                </tr>   
                                            </table>
                                        </div>
                                            <div className={classNames(styles.next, styles.clearfix)}><a href="javascript:;">Next</a></div>
                                        </div>
                                    </div>
                                </AccordionTab>
                                {/*Assets panel end*/}

                                {/*Liabilities panel start*/} 
                                <AccordionTab title="Liabilities">
                                    <div className={styles.question}>
                                        <div className={styles.questionCon}>
                                            <div className={styles.LiabConent}>
                                                <table>
                                                    <tr>
                                                        <th>&nbsp; </th>
                                                        <th>HSBC</th>
                                                        <th>Non HSBC</th>
                                                        <th>HSBC<br/> records as of</th>
                                                        <th>Deviation</th>
                                                        <th>Remarks<FontIcon icon="circle-help-solid" className={styles.icon} /></th>
                                                    </tr>
                                                    <tr>
                                                        <td>Mortgage loans&nbsp;</td>
                                                        <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia}  defaultValue="HKD 50,000"/></td>
                                                        <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/><FontIcon icon="circle-help-solid" className={styles.icon} /></td>
                                                        <td className={styles.textTd}>N/A</td>
                                                        <td className={styles.textTd}>N/A</td>
                                                        <td className={styles.remarkTd}>Type remarks...<FontIcon icon="edit" className={styles.icon} /></td>
                                                    </tr>  
                                                    <tr>
                                                        <td>Other personal loans and debts&nbsp;</td>
                                                        <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia}  defaultValue="HKD 50,000"/></td>
                                                        <td className={styles.inputTd}><input type="text" name="personalIncome" className={styles.formListLia} defaultValue="HKD 50,000"/></td>
                                                        <td className={styles.textTd}>N/A</td>
                                                        <td className={styles.textTd}>N/A</td>
                                                        <td className={styles.remarkTd}>Type remarks...<FontIcon icon="edit" className={styles.icon} /></td>
                                                    </tr>   
                                                    <tr>
                                                        <td className={styles.lastTr}>total&nbsp;</td>
                                                        <td className={classNames(styles.inputTd,styles.lastTr)}>HKD 50,000.00</td>
                                                        <td className={classNames(styles.inputTd,styles.lastTr)}>HKD 50,000.00</td>
                                                        <td className={classNames(styles.textTd,styles.lastTr)}>&nbsp;</td>
                                                        <td className={classNames(styles.textTd,styles.lastTr)}>&nbsp;</td>
                                                        <td className={classNames(styles.remarkTd,styles.lastTr)}>=&nbsp;HKD 50,000.00</td>
                                                    </tr>   
                                                </table>
                                            </div>
                                            <div className={classNames(styles.next, styles.clearfix)}><a href="javascript:;">Next</a></div>
                                        </div>
                                    </div>
                                </AccordionTab>
                                {/*Liabilities panel end*/}
                            </Accordion> 

                            <div className={styles.financial}>
                                 <h3>
                                    <span className={styles.title}>Financial profile summary</span>
                                    <a href="javascript:;" className={styles.up}><FontIcon icon="chevron-up-small" className={styles.icon} /></a>
                                </h3>
                                <div className={classNames(styles.results, styles.clearfix)}>
                                    <div className={styles.showLeft}>
                                        <ul>
                                            <li>Average monthly savings (Monthly disposable income)</li>
                                            <li>Income<span>280,977</span></li>
                                            <li>expenses<span>-145,000.00</span></li>
                                            <li>Average monthly savings<br />(Monthly disposable income)<span>HKD 435,000.00</span></li>
                                        </ul>
                                    </div>
                                    <div className={styles.showRight}>
                                        <ul>
                                            <li>Net worth</li>
                                            <li>Assets<span>280,977</span></li>
                                            <li>Liabilities<span>-145,000.00</span></li>
                                            <li>Net worth<br />(Monthly disposable income)<span>HKD 435,000.00</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.back}><a href="javascript:;"><FontIcon icon="chevron-left" className={styles.icon} />Back</a></div>
                    </div>
                    <div className={classNames(styles.footer, styles.clearfix)}>
                        <div className={styles.button}>
                            <a href="javascript:;" className={styles.save} onClick={this.goToInsProdSelection}>Continue</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FinancialProfile;