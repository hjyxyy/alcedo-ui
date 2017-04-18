import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-transition-group';

import Ripple from '../_Ripple';

import './TouchRipple.css';

export default class TouchRipple extends Component {

    constructor(props) {

        super(props);

        this.ignoreNextMouseDown = false;
        this.nextKey = 0;
        this.timeoutIds = [];

        this.state = {
            ripples: []
        };

        this.getRippleStyle = this::this.getRippleStyle;
        this.clearRippleTimeout = this::this.clearRippleTimeout;
        this.mouseDownHandle = this::this.mouseDownHandle;
        this.mouseUpHandle = this::this.mouseUpHandle;

    }

    getDiag(a, b) {
        return Math.sqrt((a * a) + (b * b));
    }

    getOffset(el) {
        let rect = el.getBoundingClientRect();
        return {
            offsetTop: rect.top + document.body.scrollTop,
            offsetLeft: rect.left + document.body.scrollLeft
        };
    }

    getRippleStyle(e) {

        const {displayCenter} = this.props;

        // 获取div
        const el = ReactDOM.findDOMNode(this);

        // 获取div 宽度、高度 和 偏移
        const elWidth = el.offsetWidth;
        const elHeight = el.offsetHeight;


        // 获取相对于div的点击位置偏移
        let pointerX, pointerY;
        if (displayCenter) {
            pointerX = elWidth / 2;
            pointerY = elHeight / 2;
        } else {
            const {offsetTop, offsetLeft} = this.getOffset(el);
            pointerX = e.pageX - offsetLeft;
            pointerY = e.pageY - offsetTop;
        }

        // 涟漪半径为4个距离的最大值
        const rippleRadius = Math.max(
            this.getDiag(pointerX, pointerY),
            this.getDiag(elWidth - pointerX, pointerY),
            this.getDiag(elWidth - pointerX, elHeight - pointerY),
            this.getDiag(pointerX, elHeight - pointerY)
        );
        const rippleSize = rippleRadius * 2;

        // 最终偏移量
        const left = pointerX - rippleRadius;
        const top = pointerY - rippleRadius;

        return {
            height: rippleSize,
            width: rippleSize,
            top: top,
            left: left
        };

    }

    addRipple(e) {

        if (this.ignoreNextMouseDown) {
            return;
        }

        this.ignoreNextMouseDown = true;
        let {ripples} = this.state;

        ripples.push(
            <Ripple key={this.nextKey++}
                    style={this.getRippleStyle(e)}/>
        );

        this.setState({
            ripples: ripples
        }, () => {
            this.ignoreNextMouseDown = false;
        });

    }

    removeRipple() {
        this.clearRippleTimeout();
        this.setState({
            ripples: []
        });
    }

    clearRippleTimeout() {

        if (!this.timeoutIds || this.timeoutIds.length < 1) {
            return;
        }

        this.timeoutIds.forEach(item => clearTimeout(item));
        this.timeoutIds = [];

    }

    mouseDownHandle(e) {

        this.timeoutIds[this.nextKey] = setTimeout(() => {
            this.removeRipple();
        }, 1000 / 60);

        this.addRipple(e);

    }

    mouseUpHandle() {
        this.removeRipple();
    }

    componentWillUnmount() {
        this.clearRippleTimeout();
    }

    render() {

        const {className, style} = this.props;
        const {ripples} = this.state;

        return (
            <ReactCSSTransitionGroup component="div"
                                     className={`touch-ripple ${className}`}
                                     style={style}
                                     onMouseDown={this.mouseDownHandle}
                                     onMouseUp={this.mouseUpHandle}>
                {
                    ripples && ripples.length > 0 ?
                        ripples
                        :
                        null
                }
            </ReactCSSTransitionGroup>
        );

    }
};

TouchRipple.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,

    displayCenter: PropTypes.bool

};

TouchRipple.defaultProps = {

    className: '',
    style: null,

    displayCenter: false

};