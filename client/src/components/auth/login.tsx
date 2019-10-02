import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'typesafe-actions';

import { loginUser } from '../../actions/authActions';

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      loginUser
    },
    dispatch
  );

type OwnProps = RouteComponentProps;

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

type State = {
  nameOrEmail: string;
  password: string;
  errors: any;
};

type FormValues = Omit<State, 'errors'>;

class Login extends React.Component<Props, State> {
  readonly state: State = {
    nameOrEmail: '',
    password: '',
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.auth.isAuthenticated) {
      // push user to dashboard when they login
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If a logged in user navigates to Login page,
    // should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.id]: event.target.value
    } as FormValues);
    // ^^^ a workaround for a TS bug? (@v3.6.3)
    // 'id' can't be declared as union type to be a
    // valid computed key name, so it's a string
    // Omit includes all 'State' keys except 'errors'
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userData: FormValues = {
      nameOrEmail: this.state.nameOrEmail,
      password: this.state.password
    };
    console.log(userData);

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='container'>
        <div className='row' style={{ marginTop: '4rem' }}>
          <div className='col s8 offset-s2'>
            <Link to='/' className='btn-flat waves-effect'>
              <em className='material-icons left'>keyboard_backspace</em> Back
              to home
            </Link>
            <div className='col s12' style={{ paddingLeft: '11.25px' }}>
              <h4>
                <strong>Login</strong> below
              </h4>
              <p className='grey-text text-darken-1'>
                Don't have an account? <Link to='/register'>Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.handleSubmit}>
              <div className='input-field col s12'>
                <input
                  type='email'
                  id='nameOrEmail'
                  onChange={this.handleChange}
                  value={this.state.nameOrEmail}
                  // error='errors.nameOrEmail'
                  className={classnames('', {
                    invalid: errors.nameOrEmail || errors.usernotfound
                  })}
                />
                <label htmlFor='nameOrEmail'>Username or Email</label>
                <span className='red-text'>
                  {errors.email}
                  {errors.usernotfound}
                </span>
              </div>
              <div className='input-field col s12'>
                <input
                  type='password'
                  id='password'
                  onChange={this.handleChange}
                  value={this.state.password}
                  // error='errors.password'
                  className={classnames('', {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor='password'>Password</label>
                <span className='red-text'>
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className='col s12' style={{ paddingLeft: '11.25px' }}>
                <button
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem'
                  }}>
                  {'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
