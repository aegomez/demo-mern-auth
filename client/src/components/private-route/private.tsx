import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

type OwnProps = RouteProps & {
  component: React.ComponentType;
  auth: {
    isAuthenticated: boolean;
    user: {};
    loading: boolean;
  };
};

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  auth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default connect(mapStateToProps)(PrivateRoute);
