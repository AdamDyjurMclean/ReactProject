import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import App from './App';
import axios from 'axios';
//import { response } from 'express';

function toLogin(){
  ReactDOM.render(
    <App />, document.getElementById('root')
  );
}

function closeError(){
  document.getElementById("badLoginEmail").style.display = "none";
  document.getElementById("badLoginPassword").style.display = "none";
  document.getElementById("badLoginRepeat").style.display = "none";
}

export default class CreateUser extends Component{
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
            users: response.data.map(user => user.email),
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
      else if(this.state.users.includes(this.state.email)) 
        document.getElementById("badLoginRepeat").style.display = "block";
      else{
        axios.post('http://localhost:5000/users/add', user).then(
        res => console.log(res.data)
      );
      toLogin();
      }
  }
  render(){
    return (
      <div>
        <div class = "logoutBtn">
            <button onClick = {toLogin}>Back</button>
          </div>
        <h1>Create Account</h1>
        <p class = "center">Createing an account is completly free, why not sign up today?</p>
        <div class = "loginForm">
        <form onSubmit={this.onSubmit}>
          <label for="email"><b>Your Email </b></label><br></br>
          <input type="email" value={this.state.email} onChange={this.onChangeEmail} id="email"></input>
          <br></br><br></br>
          <label for="password"><b>Set Password </b></label><br></br>
          <input type="password" value = {this.state.password} onChange={this.onChangePassword} id= "password"></input>
          <br></br><br></br>
          <button id = "signupSubmit" type="submit">Sign Up</button>
          </form>
        </div>
        <div id = "goodLogin" class="message">
          <div class="gLogin">
            <span onClick = {toLogin} class="close">&times;</span>
            <p>Successfully signed up</p>
         </div>
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
        <div id = "badLoginRepeat" class="message">
          <div class="bLogin">
            <span onClick = {closeError} class="close">&times;</span>
            <p>This email is already in use</p>
         </div>
        </div>
      </div>
    );
  }
}
  