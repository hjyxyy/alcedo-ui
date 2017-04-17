import React, {Component} from 'react';

import FlatButton from 'dist/FlatButton';

import 'sass/containers/app/modules/buttons/FlatButtonExamples.scss';

export default class FlatButtonExamples extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="example flat-button-examples">

                <div className="examples">
                    <div className="examples-title">Button Style</div>
                    <div className="examples-wrapper">

                        <FlatButton value="Default"/>

                        <FlatButton value="Primary"
                                    buttonStyle="primary"/>

                        <FlatButton value="Success"
                                    buttonStyle="success"/>

                        <FlatButton value="Warning"
                                    buttonStyle="warning"/>

                        <FlatButton value="Error"
                                    buttonStyle="error"/>

                        <FlatButton value="Disabled"
                                    disabled={true}/>

                    </div>
                </div>

                <div className="examples">
                    <div className="examples-title">Rounded Button</div>
                    <div className="examples-wrapper">

                        <FlatButton value="Default"
                                    isRounded={true}/>

                        <FlatButton value="Primary"
                                    buttonStyle="primary"
                                    isRounded={true}/>

                        <FlatButton value="Success"
                                    buttonStyle="success"
                                    isRounded={true}/>

                        <FlatButton value="Warning"
                                    buttonStyle="warning"
                                    isRounded={true}/>

                        <FlatButton value="Error"
                                    buttonStyle="error"
                                    isRounded={true}/>

                        <FlatButton value="Disabled"
                                    disabled={true}
                                    isRounded={true}/>

                    </div>
                </div>

                <div className="examples">
                    <div className="examples-title">Button with Icon</div>
                    <div className="examples-wrapper">

                        <FlatButton value="Reset"
                                    iconCls="fa fa-undo"/>

                        <FlatButton value="Add"
                                    buttonStyle="success"
                                    iconCls="fa fa-plus"/>

                        <FlatButton value="Delete"
                                    buttonStyle="error"
                                    iconCls="fa fa-trash"/>

                        <FlatButton value="Next"
                                    buttonStyle="primary"
                                    rightIconCls="fa fa-chevron-right"/>

                    </div>
                </div>

            </div>
        );
    }
};