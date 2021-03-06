import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { RootAction, RootState } from 'typesafe-actions';

import { registerUser } from '../../actions/authActions';

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      registerUser: registerUser
    },
    dispatch
  );

type OwnProps = RouteComponentProps;

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps;

type State = {
  name: string;
  email: string;
  password: string;
  password2: string;
  errors: any;
};

type FormValues = Omit<State, 'errors'>;

class Register extends React.Component<Props, State> {
  readonly state: State = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If a logged in user navigates to Register page,
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
    const newUser: FormValues = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s8 offset-s2'>
            <Link to='/' className='btn-flat waves-effect'>
              <em className='material-icons left'>keyboard_backspace</em> Back
              to home
            </Link>
            <div className='col s12' style={{ paddingLeft: '11.25px' }}>
              <h4>
                <strong>Register</strong> below
              </h4>
              <p className='grey-text text-darken-1'>
                Already have an account? <Link to='/login'>Login</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.handleSubmit}>
              <div className='input-field col s12'>
                <input
                  type='text'
                  id='name'
                  onChange={this.handleChange}
                  value={this.state.name}
                  // error='errors.name'
                  className={classnames('', { invalid: errors.name })}
                />
                <label htmlFor='name'>Name</label>
                <span className='red-text'>{errors.name}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  type='email'
                  id='email'
                  onChange={this.handleChange}
                  value={this.state.email}
                  // error='errors.email'
                  className={classnames('', { invalid: errors.email })}
                />
                <label htmlFor='email'>Email</label>
                <span className='red-text'>{errors.email}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  type='password'
                  id='password'
                  onChange={this.handleChange}
                  value={this.state.password}
                  // error='errors.password'
                  className={classnames('', { invalid: errors.password })}
                />
                <label htmlFor='password'>Password</label>
                <span className='red-text'>{errors.password}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  type='password'
                  id='password2'
                  onChange={this.handleChange}
                  value={this.state.password2}
                  // error='errors.password2'
                  className={classnames('', { invalid: errors.password })}
                />
                <label htmlFor='password2'>Confirm Password</label>
                <span className='red-text'>{errors.password2}</span>
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
                  {'Sign Up'}
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
)(withRouter(Register));
