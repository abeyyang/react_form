import React, { Component } from 'react';
import { AmountDisplay, Textarea, YesNoButton } from 'CommonUI/Form';
import { Input, RadioButton, Checkbox, NumericInput, SelectButton, Dropdown, DropdownItem } from 'wealth/lib/web/components/ui/form';

import Notification from 'wealth/lib/web/components/ui/notification';
import Title from 'wealth/lib/web/components/ui/title';
import  Spinner from 'wealth/lib/web/components/widgets/spinner';
import  Tooltip from 'wealth/lib/web/components/widgets/tooltip';
import  Button from 'wealth/lib/web/components/ui/button';
import Slider  from 'wealth/lib/web/components/widgets/slider';
import Pagination from 'wealth/lib/web/components/widgets/pagination';
import  FontIcon from 'wealth/lib/web/components/ui/fontIcon';

import classNames from 'classnames';
import UIStyles from './ui.scss';
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
        return (
            <div className={styles.example}>
                {/*---------------------------button--------------------------------*/}<br /><br /><hr />

                <h2>Styled button:</h2>
                <div className={styles.buttonBox}>
                    <Button value="Save progress" onClick={this.onClick} theme={UIStyles} />
                    <Button value="Review product" onClick={this.onClick} theme={UIStyles} />
                </div>

                {/*---------------------------Notification--------------------------*/}<br /><br /><hr />

                <h2>Notification Component:</h2>
                <div className={styles.notificationBox}>
                    <Notification theme={UIStyles} type="success">
                        <p>This a "type:success" message</p>
                        <p>This a "type:success" message</p>
                        <p>This a "type:success" message</p>
                        <p>This a "type:success" message</p>
                    </Notification>
                    <Notification theme={UIStyles} type="info">
                        <p>This a "type:info" message</p>
                        <p>This a "type:info" message</p>
                        <p>This a "type:info" message</p>
                    </Notification>
                    <Notification theme={UIStyles} type="warning">
                        <p>This a "type:warning" message</p>
                        <p>This a "type:warning" message</p>
                    </Notification>
                    <Notification theme={UIStyles} type="error">
                        <p>This a "type:error" message</p>
                    </Notification>
                </div>

                {/*---------------------------title--------------------------------*/}<br /><br /><hr />

                <h2>Styled title:</h2>
                <div className={styles.titleBox}>
                    <Title title="Red title" theme={UIStyles} />
                </div>

                {/*---------------------------tooltips-----------------------------*/}<br /><br /><hr />

                <h2>Styled tooltips:</h2>
                <a className={styles.tooltipBox} data-tooltipRef="handler-example">
                    <FontIcon icon="circle-help-solid" theme={UIStyles} />
                    <Tooltip show tooltipRef="handler-example" place="bottom" theme={UIStyles}>
                        This is the content of a tooltips
                    </Tooltip>
                </a>

                {/*---------------------------Spinner------------------------------*/}<br /><br /><hr />

                <h2>Styled Spinner:</h2>
                <div className={styles.spinnerBox}>
                    <Spinner value={4} step={1} min={1} max={10} theme={UIStyles} />
                </div>

                {/*---------------------------Slider-------------------------------*/}<br /><br /><hr />

                <h2>Styled Hover Slider:</h2>
                <div className={styles.sliderBox}>
                    <div className={styles.sliderDiv}>
                        <Slider onChange={this.onChange} min={0} max={7} theme={UIStyles} />
                    </div>
                    <div className={styles.numericInputDiv}>
                        <NumericInput initialValue={0} theme={UIStyles} value={parseInt(this.state.value, 10)} />
                    </div>
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
