import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';
import Event from 'vendors/Event';

import NavMenu from './navMenu/NavMenu';
import NavBar from './navBar/NavBar';

import 'sass/containers/app/App.scss';

class App extends Component {

    constructor(props) {

        super(props);

        this.contentMousedownHandle = this::this.contentMousedownHandle;

    }

    contentMousedownHandle() {
        if (!this.props.$isDesktop && !this.props.$navMenuCollapsed) {
            this.props.collapseNavMenu();
        }
    }

    componentDidMount() {

        Event.addEvent(this.refs.contentWrap, 'mousedown', this.contentMousedownHandle);

        window.SCROLL_EL = this.refs.contentWrap;

    }

    componentWillUnmount() {
        Event.removeEvent(this.refs.contentWrap, 'mousedown', this.contentMousedownHandle);
    }

    render() {

        const {children, $navMenuCollapsed} = this.props;

        return (
            <div className={'app ' + ($navMenuCollapsed ? 'collapsed' : '')}>

                <NavMenu/>

                <div ref="contentWrap"
                     className="content-wrap">

                    <NavBar/>

                    <div className="content">

                        {children}

                        <div className="copyright">
                            Copyright © 2002-2017 DerbySoft Inc. All rights reserved.
                        </div>

                    </div>

                </div>

            </div>
        );

    }
}

App.propTypes = {
    $isDesktop: PropTypes.bool,
    $navMenuCollapsed: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
    return {
        $isDesktop: state.device.isDesktop,
        $navMenuCollapsed: state.navMenu.navMenuCollapsed
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);