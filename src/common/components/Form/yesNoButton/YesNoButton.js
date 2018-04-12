import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { RadioButton } from 'CommonUI/form';
import styles from './style.scss';

class YesNoButton extends Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
            yesNo: props.defaultYesNo
        };
    }

    handleClick (event) {
        const yesNo = (event.target.value === '1');
        if (yesNo) {
            this.yesBtn.inputComponent.setAttribute('checked', 'checked');
            window.yesBtn = this.yesBtn.inputComponent;
        } else {
            this.noBtn.inputComponent.setAttribute('checked', 'checked');
            window.noBtn = this.noBtn.inputComponent;
        }
        this.setState({
            yesNo
        });
        (this.props.onChange instanceof Function) && this.props.onChange(yesNo);
    }

    render () {
        const { id, name, labels, theme } = this.props;
        const { yesNo } = this.state;

        return (
            <div className={classNames(styles.yesNoButton, theme.yesNoButton)}>
                <label htmlFor={`${name}_yes`} className={classNames(styles.radioButtonLabel, theme.radioButtonLabel)}>
                    <RadioButton theme={{ ...styles, ...theme }}
                        name={name}
                        value={1}
                        defaultChecked={yesNo === true}
                        onChange={this.handleClick}
                        ref={(yesBtn) => {
                            this.yesBtn = yesBtn;
                        }}
                        id={id?id+"_yes":null}
                    />
                    <span dangerouslySetInnerHTML={{ __html: labels[0] }} className={classNames(styles.labelText, theme.labelText)} />
                </label>
                <label htmlFor={`${name}_no`} className={classNames(styles.radioButtonLabel, theme.radioButtonLabel)}>
                    <RadioButton theme={{ ...styles, ...theme }}
                        name={name}
                        value={0}
                        defaultChecked={yesNo === false}
                        onChange={this.handleClick}
                        ref={(noBtn) => {
                            this.noBtn = noBtn;
                        }}
                        id={id?id+"_no":null}
                    />
                    <span dangerouslySetInnerHTML={{ __html: labels[1] }} className={classNames(styles.labelText, theme.labelText)} />
                </label>
            </div>
        );
    }
};

YesNoButton.propTypes = {
    // intl: PropTypes.object.isRequired,

    /*
     *  true: Yesx
     *  false: No
     *  null: select nothing
     */
    defaultYesNo: PropTypes.oneOf([true, false, null]),

    labels: PropTypes.array,
    name: PropTypes.string,
    theme: PropTypes.object,

    onChange: PropTypes.func
};

YesNoButton.defaultProps = {
    defaultYesNo: null,
    theme: {},
    labels: ['Yes', 'No']
};

export default YesNoButton;
