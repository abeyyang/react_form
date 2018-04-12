import React, { Component } from 'react';

import Notification from 'wealth/lib/web/components/ui/notification';
import Title from 'wealth/lib/web/components/ui/title';
// import Spinner from 'wealth/lib/web/components/widgets/spinner';
import Tooltip from 'wealth/lib/web/components/widgets/tooltip';
import Button from 'wealth/lib/web/components/ui/button';
import Pagination from 'wealth/lib/web/components/widgets/pagination';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';

import SliderContainer from '../../common/components/sliderContainer';
import Spinner from '../../common/components/spinner';
import ProgressCircleChart from '../../common/components/charts/progressCircleChart';
import PieChart from '../../common/components/charts/pieChart';
import FormattedNumber from 'wealth/lib/web/components/ui/formattedNumber';

import classNames from 'classnames';
import UIStyles from '../form/ui.scss';
import styles from './style.scss';

class FormExample extends Component {
    constructor () {
        super();
        this.state = {
            value: 0
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange (value) {
        this.setState({ value });
    }

    render() {
        const data = [
            {
                name: 'Initial results',
                y: 708000,
                color: '#269793'
            },
            {
                name: 'New Projection',
                y: 230000,
                color: '#00716D'
            }
        ];
        return (
            <div className={styles.example}>

                <h2>FormattedNumber:</h2>
                <FormattedNumber value={1000} precision={2} /><br /><br />
                <FormattedNumber value={-1000} precision={2} /><br /><br />
                <FormattedNumber value={1000} precision={0} /><br /><br />
                <FormattedNumber value={1000} precision={3} /><br /><br />
                <FormattedNumber value={1000} precision={1} /><br /><br />

                {/*---------------------------ProgressCircleChart--------------------------------*/}<br/><br/><br/><br/><hr/>
                <h2>PieChart:</h2>
                <PieChart data={data} widthValue={300}/>

                {/*---------------------------ProgressCircleChart--------------------------------*/}<br /><br /><br/><hr/>
                <h2>ProgressCircleChart:</h2>
                <ProgressCircleChart max={100} value={30} theme={UIStyles} />
                <ProgressCircleChart max={100} value={45} theme={UIStyles} />
                <ProgressCircleChart max={100} value={95} theme={UIStyles} />

                {/*---------------------------button--------------------------------*/}<br /><br /><hr/>

                <h2>Styled button:</h2>
                <div className={styles.buttonBox}>
                    <Button value="Save progress" onClick={this.onClick} theme={UIStyles} />
                    <Button value="Review product" onClick={this.onClick} theme={UIStyles} />
                </div>

                {/*---------------------------Notification--------------------------*/}<br /><br /><hr />

                <h2>Notification Component:</h2>
                <div className={styles.notificationBox}>
                    <Notification theme={UIStyles} type="warning" hasClose={false}>
                        <p>Warning message</p>
                    </Notification>
                    <Notification theme={UIStyles} type="info" hasClose={false}>
                        <p>Information message</p>
                    </Notification>
                    <Notification theme={UIStyles} type="success" hasClose={false}>
                        <p>Comfirmation message</p>
                    </Notification>
                    <Notification theme={UIStyles} type="error" hasClose={false}>
                        <p>Error message</p>
                    </Notification>
                </div>

                {/*---------------------------title--------------------------------*/}<br /><br /><hr />

                <h2>Styled title:</h2>
                <div className={styles.titleBox}>
                    <Title title="Red title" theme={UIStyles} />
                </div>

                {/*---------------------------tooltips-----------------------------*/}<br /><br /><hr />

                <h2>Styled tooltips:</h2>
                <br/><br/><br/>
                <h4>bottom:</h4>
                <a className={styles.tooltipBox} data-tooltipRef="handler-example">
                    <FontIcon icon="circle-help-solid" theme={UIStyles} />
                    <Tooltip tooltipRef="handler-example" place="bottom" theme={UIStyles}>
                        This is the content of a tooltips
                    </Tooltip>
                </a>

                <br/><br/><br/>

                <h4>right:</h4>
                <a className={styles.tooltipBox} data-tooltipRef="handler-example2">
                    <FontIcon icon="circle-help-solid" theme={UIStyles} />
                    <Tooltip tooltipRef="handler-example2" place="right" theme={UIStyles}>
                        This is the content of a tooltips
                    </Tooltip>
                </a>


                {/*---------------------------Spinner------------------------------*/}<br /><br /><hr />

                <h2>Styled Spinner:</h2>
                <div className={styles.spinnerBox}>

                    <Spinner
                        value={4}
                        step={1}
                        min={1}
                        max={10}
                        theme={UIStyles}
                        />

                    <br/><br/>

                    <h4>It disabled:</h4>
                    <Spinner
                        value={4}
                        step={1}
                        min={1}
                        max={10}
                        theme={UIStyles}
                        disabled={true}
                        />
                </div>

                {/*---------------------------Slider-------------------------------*/}<br /><br /><hr />

                <h2>Styled Hover Slider:</h2>
                <div className={styles.sliderContainer}>
                    <SliderContainer
                        min={0}
                        max={20}
                        initialValue={0}
                        value={0}
                        onChange={(value) => console.log(value, '******onChange******')}
                        onInput={(value) => console.log(value, '******onInput******')}
                        theme={UIStyles}
                        />
                    <br/><br/>

                    <h4>It disabled:</h4>       
                    <SliderContainer
                        min={0}
                        max={20}
                        initialValue={0}
                        value={0}
                        onChange={(value) => console.log(value, '******onChange******')}
                        onInput={(value) => console.log(value, '******onInput******')}
                        theme={UIStyles}
                        disabled={true}
                        />
                </div>

                {/*---------------------------Pagination--------------------------------*/}<br /><br /><hr />

                <h2>Styled Pagination:</h2>
                <div className={styles.paginationBox}>
                    <Pagination currentPage={1} totalPages={10} theme={styles} />
                </div>

            </div>
        );
    }
}

export default FormExample;
