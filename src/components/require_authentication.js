import React, { Component } from 'react';
import { connect } from 'react-redux';

/* This is creating a higher order function that wraps around another
component.  We will pass in another component. */

export default function(ComposedComponent) {
  class Authentication extends Component {
    /* To redirect a user elsewhere if they are not logged in we need
    access to the router.  We can get access to it through context.
    Context can give us access to elements throughout the render tree. */
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {

      /* The spread operator here is lets us deconstruct objects like we do with arrays.
      Passess all the props that were passed to the wrapped component to the
      wrapped component. */
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.authenticated
  });

  return connect(mapStateToProps)(Authentication);
}

/*
Psuedo code and discussion:
In some other location (not in this file), we want to use this HOC.

import Authentication
import Resources

const ComposedComponent = Authentication(Resources);
This retuns a wrapped version of the Resources component

In some other method, render <ComposedComponent />
*/
