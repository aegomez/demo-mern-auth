import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'typesafe-actions';
import { RouteComponentProps, withRouter } from 'react-router';

import { logoutUser } from '../../actions/authActions';

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      logoutUser
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

class Dashboard extends React.Component<Props> {
  handleLogoutClick = (event: React.MouseEvent) => {
    event.preventDefault();
    this.props.logoutUser();
    this.props.history.replace('/');
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className='container valign-wrapper' style={{ height: '75vh' }}>
        <div className='row'>
          <div className='col s12 center-align'>
            <h4>
              <strong>Hey there,</strong> {user.name.split(' ')[0]}
              <p className='flow-text grey-text text-darken-1'>
                You are logged into a full-stack{' '}
                <span style={{ fontFamily: 'monospace' }}>MERN</span> app
              </p>
            </h4>
            <button
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem'
              }}
              onClick={this.handleLogoutClick}
              className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
