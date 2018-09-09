import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!){
    login(email: $email, password: $password){
      token
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SingupMutation($email: String!, $password: String!, $name: String!){
    signup(email: $email, password: $password, name: $name){
      token
    }
  }
`;

class Login extends Component{
  state = {
    login: false,
    email: '',
    password: '',
    name: ''
  }

  onChange = e =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _confirm = async (data) =>{
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    this.props.history.push('/');
  }

  _saveUserData = token =>{
    localStorage.setItem(AUTH_TOKEN, token);
  }

  render(){
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4>{login ? 'Login' : 'Sign Up' }</h4>
        <div className="flex flex-column">
          {!login && (
            <input 
              type="text"
              name="name"
              value={name}
              onChange={this.onChange}
              placeholder="Your name"
            />
          )}
          <input 
            type="text"
            name="email"
            value={email}
            onChange={this.onChange}
            placeholder="Your email"
          />
          <input 
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
            placeholder="Your password"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}>
            {mutation =>(
              <button
                onClick={mutation}>
                {login ? 'login' : 'create account'}
              </button>
            )}
          </Mutation>
          <button
            onClick={() => this.setState({ login: !login })}>
            {login
              ?'need to create an account'
              :'already have an account'}
          </button>
        </div>
      </div>      
    );
  }
}

export default Login;