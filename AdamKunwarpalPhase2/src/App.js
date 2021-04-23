import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import Test from './CreateAccount';
import HomePage from './HomePage';
import axios from 'axios';

window.onload = function(){
  if(localStorage.getItem("user")){
    ReactDOM.render(
      <HomePage />, document.getElementById('root')
    );
  }
}

function sendToCreateAccount(){
  ReactDOM.render(
    <Test />, document.getElementById('root')
  );
};

function closeError(){
  document.getElementById("badLoginEmail").style.display = "none";
  document.getElementById("badLoginPassword").style.display = "none";
  document.getElementById("badLogin").style.display = "none";
};

export default class App extends Component{
  constructor(props){
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state={
        email: '',
        password: '',
        users: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/users').then(
      response => {
        if(response.data.length > 0){
          this.setState({
            users: response.data.map(user => user),
          })
        }
      }
    )
  }

  onChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    const user = {
        email: this.state.email,
        password: this.state.password
    }
    if(this.state.email === "")
        document.getElementById("badLoginEmail").style.display = "block";
    else if(this.state.password === "")
      document.getElementById("badLoginPassword").style.display = "block";
    else{
      for(let i = 0; i < this.state.users.length; i++){
        if(this.state.users[i].email === user.email & this.state.users[i].password === user.password){
          localStorage.setItem('user', JSON.stringify(user));
          ReactDOM.render(
            <HomePage />, document.getElementById('root')
          );
        }
      }
    }
    document.getElementById("badLogin").style.display = "block";
  }

  render(){
    return (
      <div class = "center">
        <h1>Welcome to Super Special Music City</h1>
        <div class = "loginForm">
          <form onSubmit={this.onSubmit}>
            <label for="email"><b>Email </b></label><br></br>
            <input type="email" value={this.state.email} onChange={this.onChangeEmail} id="email" ></input>
            <br></br><br></br>
            <label for="password"><b>Password </b></label><br></br>
            <input type="password" value = {this.state.password} onChange={this.onChangePassword} id="password" ></input>
            <br></br><br></br>
            <button id = "loginSubmit" type="submit">Login</button>
            <br></br>
          </form>
        </div>
        <div class = "centerButton">
          <p>Not Signed up yet?</p>
          <button id = "newAccount" onClick={sendToCreateAccount} >Create New Account</button>
        </div>
        <div id = "badLoginEmail" class="message">
          <div class="bLogin">
            <span onClick = {closeError} class="close">&times;</span>
            <p>Must enter an email</p>
         </div>
        </div>
        <div id = "badLoginPassword" class="message">
          <div class="bLogin">
            <span onClick = {closeError} class="close">&times;</span>
            <p>Must enter a password</p>
         </div>
        </div>
        <div id = "badLogin" class="message">
          <div class="bLogin">
            <span onClick = {closeError} class="close">&times;</span>
            <p>Invalid login</p>
         </div>
        </div>
      </div>
    );
  }
};