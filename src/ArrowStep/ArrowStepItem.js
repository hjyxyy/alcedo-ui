import React, {Component, PropTypes} from 'react';

export default class ArrowStepItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {className, style, activatedStep, finishedStep, index, value, isFirst, isLast} = this.props;

        return (
            <div className={`arrow-step-item
                ${activatedStep == index ? ' activated' : (activatedStep > index ? ' success' : '')}
                ${className ? className : ''}`}
                 style={style}>

                <div className="number">
                    {index + 1}
                </div>

                <div className="title">
                    {value.title}
                </div>

                {
                    isFirst
                        ? null
                        : (
                        <div className="triangle left">
                            <div className={`right-top ${activatedStep == index ? ' activated' : ''}
                                    ${activatedStep > index ? ' success' : ''}`}></div>
                            <div className={`right-bottom ${activatedStep == index ? ' activated' : ''}
                                    ${activatedStep > index ? ' success' : ''}`}></div>
                        </div>
                    )
                }

                {
                    isLast
                        ? null
                        : (
                        <div className="triangle right">
                            <div className={`left ${activatedStep == index ? ' activated' : ''}
                                    ${activatedStep > index ? ' success' : ''}`}></div>
                        </div>
                    )
                }

            </div>
        );

    }
};

ArrowStepItem.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,

    index: PropTypes.number,
    activatedStep: PropTypes.number,
    finishedStep: PropTypes.number,
    value: PropTypes.object,

    isFirst: PropTypes.bool,
    isLast: PropTypes.bool

};

ArrowStepItem.defaultProps = {

    className: '',
    style: null,

    index: 0,
    activatedStep: 0,
    finishedStep: 0,
    value: null,

    isFirst: true,
    isLast: true

};