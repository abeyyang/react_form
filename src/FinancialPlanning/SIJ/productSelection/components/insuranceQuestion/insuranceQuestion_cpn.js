import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Button from 'wealth/lib/web/components/ui/button';
import Accordion,{AccordionTab} from "wealth/lib/web/components/widgets/Accordion";
import Tab from "wealth/lib/web/components/widgets/tab";
import TabBlock from "wealth/lib/web/components/widgets/tab";
import ScrollTab from "wealth/lib/web/components/widgets/scrollTab";
import TabNode from "wealth/lib/web/components/widgets/scrollTab";
import styles from './style.scss';

class FinancialProfile extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    render () {
          const tabs = [
            { title: 'Unit trust (406)' },
            { title: 'Bonds / CDs / SP / FX / Others (68)' },
            { title: 'Insurance(40)' }
            ];
            const tabs1 = [
                { title: 'Clear all fiters' }
            ];
            const tabs2 = [
                { title: 'PAS' }
            ];
            const tabs3 = [
                { title: 'On' },
                { title: 'Off' }
            ];

        return (
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.financialProfile}>
                        <h4>
                            <span className={styles.title}>Product selection</span>
                        </h4>
                        <div className={styles.salesMain}>
                            <div>
                                <h5><span className={styles.title}>Screener</span></h5>
                            </div> 
                            <Accordion>
                                {/*Insurance questions start*/} 
                                <AccordionTab title="Insurance questions">
                                    <div className={styles.question}>
                                        <div className={styles.needAnalysisMain}>
                                        <div className={styles.nacon}>
                                            <div className={styles.naconTwo}>
                                                <div className={styles.mt20}>
                                                    <h5>1.What are your objectives of considering buying our products?<span className={styles.small}> (Tick one or more)</span></h5>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} id="chkbox" />
                                                        <label htmlFor="chkbox" className={styles.boxlabel} />Financial protection against adversities
                                                        <span className={styles.small}>(e.g. death,accident, disability etc)</span>
                                                    </p>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} id="chkbox1" />
                                                        <label htmlFor="chkbox1" className={styles.boxlabel} />Preparation for health care needs
                                                        <span className={styles.small}>(e.g. death,accident, disability etc)</span>
                                                    </p>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} />
                                                        <label htmlFor="chkbox" className={styles.boxlabel} />Providing regular income in the future
                                                        <span className={styles.small}>(e.g. death,accident etc)</span>
                                                    </p>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} />
                                                        <label htmlFor="chkbox" className={styles.boxlabel} />Saving up for the future
                                                        <span className={styles.small}>(e.g. child education, retirement etc)</span>
                                                    </p>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} />
                                                        <label htmlFor="chkbox" className={styles.boxlabel} />Investment
                                                    </p>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} />
                                                        <label htmlFor="chkbox" className={styles.boxlabel} />Others, please specify &nbsp;&nbsp;
                                                        <input type="text" className={classNames(styles.input, styles.input1)} />
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={styles.naconThree}>
                                                <div className={styles.mt20}>
                                                    <h5>2.What type(s) of insurance products you are looking for to meet your objectives?
                                                        <span className={styles.small}> (Tick one or more)</span>
                                                    </h5>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} />
                                                        <label htmlFor="chkbox" className={styles.boxlabel} />Insurance product with investment element
                                                        (Investment decisions and risks borne by insurer)
                                                        <span className={styles.small}>(e.g.participating policy, universal life insurance)</span>
                                                    </p>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} />
                                                        <label htmlFor="chkbox" className={styles.boxlabel} />Insurance product with investment element
                                                        (Investment decisions and risks borne by policyholder)
                                                        <span className={styles.small}>(e.g.participating policy, universal life insurance)</span>
                                                    </p>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} />
                                                        <label htmlFor="chkbox" className={styles.boxlabel} />Pure insurance product
                                                        (without any savings or investment element)
                                                        <span className={styles.small}>(e.g.participating policy, universal life insurance)</span>
                                                    </p>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} />
                                                        <label htmlFor="chkbox" className={styles.boxlabel} />Insurance product with saving element
                                                        (with savings but without investment element)
                                                        <span className={styles.small}>(e.g.participating policy, universal life insurance)</span>
                                                    </p>
                                                    <p className={styles.mt20}>
                                                        <input type="checkbox" className={styles.chkbox} />
                                                        <label htmlFor="chkbox" className={styles.boxlabel} />Others, please specify &nbsp;&nbsp;
                                                        <input type="text" className={classNames(styles.input, styles.input1)} />
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={styles.naconFour}>
                                                <div className={styles.mt20}>
                                                    <h5>3.What is your target saving amount to be addressed by life insurance plan(s)?</h5>
                                                    <div className={styles.clearfix}>
                                                        <div className={classNames(styles.radioCheck, styles.on)}>
                                                            <input type="radio" name="judgment" className={styles.formList} />
                                                            <label className={styles.radiolabel}>
                                                                <span className={styles.wrapper}>
                                                                    <span className={styles.checked} />
                                                                </span>
                                                            </label>
                                                            My target saving amount to be addressed by life insurance plan(s) is
                                                            <input type="text" className={classNames(styles.input, styles.input1)} />
                                                        </div>
                                                        <div className={classNames(styles.radioCheck, styles.mt20)}>
                                                            <input type="radio" name="judgment" className={styles.formList} />
                                                            <label className={styles.radiolabel}>
                                                                <span className={styles.wrapper}>
                                                                    <span />
                                                                </span>
                                                            </label>
                                                            I do not have a specific target saving amount but would like to set aside a budget
                                                            to be used for accumulating savings by life insurance plan(s).
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.naconFive}>
                                                <div className={styles.mt20}>
                                                    <h5>4.Do you intend to access cash value of your life insurance plan(s) before the end of the target benefit protection period?</h5>
                                                    <div className={styles.clearfix}>
                                                        <div className={classNames(styles.radioCheck, styles.on)}>
                                                            <input type="radio" name="judgment" className={styles.formList} />
                                                            <label className={styles.radiolabel}>
                                                                <span className={styles.wrapper}>
                                                                    <span className={styles.checked} />
                                                                </span>
                                                            </label>
                                                            No - I do not intend to access the cash value of my life insurance plan(s) before the end of the target benefit protection period.
                                                        </div>
                                                        <div className={classNames(styles.radioCheck, styles.mt20)}>
                                                            <input type="radio" name="judgment" className={styles.formList} />
                                                            <label className={styles.radiolabel}>
                                                                <span className={styles.wrapper}>
                                                                    <span />
                                                                </span>
                                                            </label>
                                                            Yes - I intend to access the cash value of my life insurance plan(s) before the end of the target benefit protection period and
                                                            the expected timeframe for accessing the cash value would be
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.naconSix}>
                                                <div className={styles.mt20}>
                                                    <h5>6.What is your target benefit / protection period for insurance policy?</h5>
                                                    <select>
                                                        <option value="HKD">> 10 and &lt; 20 years</option>
                                                        <option value="CNY">10 years</option>
                                                    </select>
                                                    <FontIcon icon="circle-confirmation-solid" className={styles.icon} />
                                                </div>
                                            </div>
                                            <div className={styles.naconSeven}>
                                                <div className={styles.mt20}>
                                                    <h5>7. For how long are you able and willing to contribute to an insurance policy and / or investment plan ?</h5>
                                                    <select>
                                                        <option value="HKD">11 - 20 years</option>
                                                        <option value="CNY">20 years</option>
                                                    </select>
                                                    <FontIcon icon="circle-confirmation-solid" className={styles.icon} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.naconAttached}>
                                            <div className={styles.mt20}>
                                                <div className={styles.total}>Your Total Life Protection Needs</div>
                                                <div className={classNames(styles.fill, styles.clearfix)}>
                                                    <div className={styles.left}>
                                                        <h5>Exisiting life insurance coverage</h5>
                                                        <input type="text" placeholder="10,000" className={styles.input} />
                                                        <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                                        <span><FontIcon icon="circle-confirmation-solid" className={styles.icon} /></span>
                                                    </div>
                                                    <div className={styles.middle}>
                                                        <h5>Exisiting life insurance coverage</h5>
                                                        <input type="text" placeholder="10,000" className={styles.input} />
                                                        <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                                        <span><FontIcon icon="circle-confirmation-solid" className={styles.icon} /></span>
                                                    </div>
                                                    <div className={styles.right}>
                                                        <h5>Exisiting life insurance coverage</h5>
                                                        <input type="text" placeholder="10,000" className={styles.input} />
                                                        <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                                        <span><FontIcon icon="circle-confirmation-solid" className={styles.icon} /></span>
                                                        <span><FontIcon icon="secure-key-passcode" className={styles.iconEdit} /></span>
                                                    </div>
                                                </div>
                                                <h5>Other addtional life protection needs to be addressed using insurance plan(s)</h5>
                                                <p>"Other addtional life protection needs" is ONLY applicable to the life protection needs that you consider
                                                to be addressed using insurance plan(s). If the amount needed has already been included in above sections,
                                                please do not include it here to avoid double-counting.</p>
                                                <input type="text" placeholder="10,000" className={classNames(styles.input, styles.inputwidth)} />
                                                <h5>Others,please specific</h5>
                                                <div className={styles.textarea}>
                                                    <textarea rows="5" cols="100" defaultValue="Type here..."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className={classNames(styles.next, styles.clearfix)}><a href="javascript:;">Next</a></div>
                                    </div>
                                </AccordionTab>
                                {/*Insurance questions end*/}
                                
                                {/*search criterias start*/}
                                <AccordionTab title="Search criterias">
                                    <div className={styles.question}>
                                        <div className={styles.favorite}>
                                            <h3>Favorite criterias</h3> 
                                            <ul>
                                                <li>
                                                    <span>Product code</span><br/>
                                                    <input type="text" placeholder="10,000" className={styles.input} />
                                                    <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                                    <span><FontIcon icon="delete" className={styles.iconDelete} /></span>
                                                </li>
                                                <li>
                                                    <span>Time to manturity</span><br/>
                                                    <select className={styles.select}>
                                                        <option className={styles.option}>Please select</option>
                                                    </select>
                                                    <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                                    <span><FontIcon icon="delete" className={styles.iconDelete} /></span>
                                                </li>
                                                <li>
                                                    <span>Risk tolerance</span><br/>
                                                    <select className={styles.select}>
                                                        <option className={styles.option}>Please select</option>
                                                    </select>
                                                    <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                                    <span><FontIcon icon="delete" className={styles.iconDelete} /></span>
                                                </li>
                                                <li>
                                                    <span>Currency</span><br/>
                                                    <select className={styles.select}>
                                                        <option className={styles.option}>Please select</option>
                                                    </select>
                                                    <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                                    <span><FontIcon icon="delete" className={styles.iconDelete} /></span>
                                                </li>
                                            </ul>
                                            <div className={styles.searchBottom}><span>Show all criterias</span><FontIcon icon="chevron-down-small" className={styles.icon} /></div>
                                        </div>
                                        <div className={classNames(styles.next, styles.clearfix)}><a href="javascript:;">Next</a></div>
                                </div> 
                                </AccordionTab>
                                {/*search criterias start*/}
                            </Accordion>    
                        </div>
                        <div className={styles.searchResult}>
                            <div>
                               <span><span className={styles.productNo}>0 <span className={styles.product}>products found</span></span></span>
                                <span className={classNames(styles.rightContext,styles.mt20)}>
                                    <input type="checkbox" className={styles.chkbox} id="chkbox" />
                                    <label htmlFor="chkbox" className={styles.boxlabel} />Showing products that meet your input criteria only
                                </span>&nbsp;&nbsp;
                                <span className={classNames(styles.rightContext,styles.mt20)}>
                                    <input type="checkbox" className={styles.chkbox} id="chkbox" />
                                    <label htmlFor="chkbox" className={styles.boxlabel} />Display shortlisted products only
                                </span>
                            </div>
                            
                            <div className={styles.resultTitle}>
                                <div className={styles.prodTabs}><ScrollTab tabs={tabs} ></ScrollTab></div>
                                <div className={styles.tabs}>
                                   <div className={styles.onOff}> 
                                       <span><Tab tabs={tabs1}></Tab></span>
                                       <span><Tab tabs={tabs2}></Tab></span>
                                       <span className={styles.salesHints}>Sales hints</span>
                                    </div>
                                    <div className={styles.onOffTabs}><ScrollTab tabs={tabs3}></ScrollTab></div>
                                </div>
                            </div>
                            <div className={styles.resultContext}>
                                <span><FontIcon icon="circle-error" className={styles.icon} /></span>
                                <p>You do not have any product result,<br/>please answer above question and start search</p>
                               
                            </div>
                        </div>
                        <div className={styles.back}><a href="javascript:;"><FontIcon icon="chevron-left" className={styles.icon} />Back</a></div>
                    </div>
                    <div className={classNames(styles.footer, styles.clearfix)}>
                        <div className={styles.button}>
                            <a href="" className={styles.save}>Save</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default FinancialProfile;