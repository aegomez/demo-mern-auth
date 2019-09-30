import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

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
  };

  render() {
    // const { errors } = this.state;
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
                />
                <label htmlFor='nameOrEmail'>Username or Email</label>
              </div>
              <div className='input-field col s12'>
                <input
                  type='password'
                  id='password'
                  onChange={this.handleChange}
                  value={this.state.password}
                  // error='errors.password'
                />
                <label htmlFor='password'>Password</label>
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

export default Login;
