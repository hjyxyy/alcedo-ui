import React, {Component, PropTypes} from 'react';

import BaseButton from '../_BaseButton';

import './RaisedButton.css';

export default class RaisedButton extends Component {

    constructor(props) {

        super(props);

        this.startRipple = this::this.startRipple;
        this.endRipple = this::this.endRipple;

    }

    startRipple(e) {
        this.refs.baseButton.startRipple(e);
    }

    endRipple() {
        this.refs.baseButton.endRipple();
    }

    render() {

        const {children, className, onTouchTap} = this.props;

        return (
            <BaseButton {...this.props}
                        ref="baseButton"
                        className={`raised-button ${className}`}
                        onTouchTap={onTouchTap}>
                {children}
            </BaseButton>
        );

    }
};

RaisedButton.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,

    buttonStyle: PropTypes.string,
    isRounded: PropTypes.bool,
    isCircular: PropTypes.bool,

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    disableTouchRipple: PropTypes.bool,

    iconCls: PropTypes.string,
    rightIconCls: PropTypes.string,

    rippleDisplayCenter: PropTypes.bool,

    onTouchTap: PropTypes.func

};

RaisedButton.defaultProps = {

    className: '',
    style: null,

    buttonStyle: '',
    isRounded: false,
    isCircular: false,

    value: '',
    disabled: false,
    type: 'button',
    isLoading: false,
    disableTouchRipple: false,

    rippleDisplayCenter: false,

    iconCls: '',
    rightIconCls: ''

};