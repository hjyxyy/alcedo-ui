import React, {Component, PropTypes} from 'react';

import './WidgetHeader.css';

export default class WidgetHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {children, className, style, title} = this.props;

        return (
            <div className={`widget-header ${className}`}
                 style={style}>

                {title}

                <div className="right">
                    {children}
                </div>

            </div>
        );

    }
};

WidgetHeader.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,

    title: PropTypes.any

};

WidgetHeader.defaultProps = {

    className: '',
    style: null,

    title: ''

};