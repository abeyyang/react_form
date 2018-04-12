import React, { Component } from 'react';
import classNames from 'classnames';
// import { Input } from 'wealth/lib/web/components/ui/form';
import Input from './input';
import { AmountInput } from 'CommonUI/Form';
// import Slider  from 'wealth/lib/web/components/widgets/slider';
import Slider  from '../slider';

import styles from './style.scss';

class SliderContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: props.value ? props.value : props.initialValue
        };
        this.onChange = this.onChange.bind(this);
        this.onInput = this.onInput.bind(this);
    }

    onChange (vl) {
        const { onChange } = this.props;
        const value = parseInt(vl, 10);
        this.setState({ value: value});
        typeof onChange === 'function' && onChange(value);
    }

    onInput (event) {
        const { onInput } = this.props;
        const value = isNaN(parseInt(event.target.value, 10)) ? 0 : parseInt(event.target.value, 10);
        this.setState({ value: value });
        typeof onInput === 'function' && onInput(value);
    }

    render() {
        const { value } = this.state;
        const { theme, max, min, disabled } = this.props;
        const disabledStyle = disabled ? `${styles.disabledStyle}` : "";
        return (
            <div className={classNames(styles.sliderBox, `${disabledStyle}`)}>
                <div className={styles.sliderDiv}>
                    <Slider disabled={disabled} onChange={this.onChange} min={min} max={max} theme={styles} initialValue={value} value={value} />
                </div>
                <div className={styles.numericInputDiv}>
                    <Input disabled={disabled} initialValue={value} theme={styles} value={value} onChange={this.onInput} />
                    {/*<AmountInput width="40px" type="number" symbolVisible={false} thousandsGroup={false} value={value} />*/}
                </div>
            </div>
        );
    }
}

export default SliderContainer;
