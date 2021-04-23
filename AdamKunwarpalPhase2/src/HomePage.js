import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import App from './App';
import Music from './Music/Music';
import axios from 'axios';

function logout() {
  localStorage.removeItem("user")
  ReactDOM.render(
    <App />, document.getElementById('root')
  );
}

let songname;

class HomePage extends Component{
  CreateList = () =>{
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    let userlists = JSON.parse(localStorage.getItem('lists'));
    if(userlists){
      for(let i = 0; i < userlists.length; i ++){
        if(userlists[i].userEmail === userEmail){
          this.state.List.push({"key" : "1", "name" : userlists[i].name})
        }
      }
    }
  };

  constructor(){
    super()
    this.state = {
      Music: [
        {"key" : "1", "name": "Blinding Lights", "artist": "The Weeknd", "year": 2019},
        {"key" : "2", "name": "Circles", "artist": "Post Malone", "year": 2019},
        {"key" : "3", "name": "Sabotage", "artist": "Beastie Boys", "year": 1994},
        {"key" : "4", "name": "Welcome to the Jungle", "artist": "Guns N' Roses", "year": 1978},
        {"key" : "5", "name": "Surrender", "artist": "Cheap Trick", "year": 1987},
        {"key" : "6", "name": "Sheena Is a Punk Rocker", "artist": "Ramones", "year": 1977},
        {"key" : "7", "name": "Soul Man", "artist": "Sam and Dave", "year": 1967},
        {"key" : "8", "name": "Hello", "Adele": "AJR", "year": 2016},
        {"key" : "9", "name": "Closer", "artist": "The Chainsmokers Featuring Halsey", "year": 2016},
        {"key" : "10", "name": "Stressed Out", "artist": "twenty one pilots", "year": 2016},
      ],
      List: [
      ]
    }
  }

  addToFav = (music) =>{
    const favorite = {
      userEmail: JSON.parse(localStorage.getItem('user')).email,
      name: music.name,
      artist: music.artist,
      year: music.year.toString()
    }
    axios.get('http://localhost:5000/favorites').then(
      response => {
        for(let i = 0; i < response.data.length; i++){
          if(favorite.userEmail === response.data[i].userEmail & favorite.name === response.data[i].name){
            return;
          }
        }
        axios.post('http://localhost:5000/favorites/add', favorite).then(
        res => console.log(res.data));
        setTimeout(() => {  this.display();; }, 1000);
      }
    );
  }
  wait = () =>{
    setTimeout(this.wait, 10000);
  }

  addToList = (name) =>{
    document.getElementById("lists").style.display = "block";
    songname = name.name;
  }

  newList = () =>{
    const name = document.getElementById("text").value;
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    let userlists = JSON.parse(localStorage.getItem('lists'));
    if(name === ""){
      return;
    }
    else{
      if(userlists){
        for(let i = 0; i < userlists.length; i++){
          if(userlists[i].name === name){
            if(userlists[i].userEmail === userEmail){
              return;
            }
          }
        }
        userlists.push({userEmail, name});
        localStorage.setItem('lists', JSON.stringify(userlists));
      }
      else{
        userlists = [{userEmail, name}];
        localStorage.setItem('lists', JSON.stringify(userlists));
      }
      document.getElementById("text").value = "";
    }
    this.setState({
      List : []
    });
  }

  display = () =>{
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    const div = document.getElementById("listDisplay")
    div.innerHTML ="<h2>Favorites</h2>";
    axios.get('http://localhost:5000/favorites').then(
      response => {
        for(let i = 0; i < response.data.length; i++){
          if(userEmail === response.data[i].userEmail){
            div.innerHTML += response.data[i].name + "<br>";
          }
        }
      }
    );
  }

  displayList = (name) =>{
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    const div = document.getElementById("listDisplay")
    div.innerHTML ="<h2>" + name + "</h2>";
    axios.get('http://localhost:5000/others').then(
      response => {
        for(let i = 0; i < response.data.length; i++){
          if(userEmail === response.data[i].userEmail & name === response.data[i].name){
            div.innerHTML += response.data[i].songName + "<br>";
          }
        }
      }
    );
  }

  listAdd = (name) =>{
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    const other = {
      userEmail: userEmail,
      name: name,
      songName: songname
    }
    axios.get('http://localhost:5000/others').then(
      response => {
        for(let i = 0; i < response.data.length; i++){
          if(userEmail === response.data[i].userEmail & name === response.data[i].name & songname === response.data[i].songname){
            document.getElementById("lists").style.display = "none";
            return;
          }
        }
        axios.post('http://localhost:5000/others/add', other).then(
        res => console.log(res.data));
      }
    );
    document.getElementById("lists").style.display = "none";
  }

  removeList = () =>{
    document.getElementById("rlists").style.display = "block";
  }

  hide = () =>{
    document.getElementById("rlists").style.display = "none";
  }

  deleteList = (name) =>{
    let others = JSON.parse(localStorage.getItem('others'));
    let userlists = JSON.parse(localStorage.getItem('lists'));
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    if(others){
      for(let i = 0; i < others.length; i++){
        if(userEmail === others[i].userEmail & name === others[i].name){
          others.splice(i, 1);
          i--
        }
      }
      localStorage.setItem('others', JSON.stringify(others));
    }
    for(let i = 0; i < userlists.length; i++){
      if(userEmail === userlists[i].userEmail & name === userlists[i].name){
        userlists.splice(i, 1);
        localStorage.setItem('lists', JSON.stringify(userlists));
        document.getElementById("rlists").style.display = "none";
        this.setState({
          List : []
        });
        return;
      }
    }
    document.getElementById("rlists").style.display = "none";
  }

  resetFavorites = () =>{
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    axios.get('http://localhost:5000/favorites').then(
      response => {
        for(let i = 0; i < response.data.length; i++){
          if(userEmail === response.data[i].userEmail){
            this.deleteFavorite(response.data[i]._id)
          }
        }
        setTimeout(() => {  this.display();; }, 1000);
      }
    )
  }

  deleteFavorite(id){
    axios.delete('http://localhost:5000/favorites/' + id).then(
      res => console.log(res.data)
    )
  }

  render(){
    this.CreateList();
    return (
      <div>
        <div class = "logoutBtn">
          <button onClick = {logout}>Logout</button>
        </div>
        <h1>Home</h1>
        <div class = "leftBtn">
          <button onClick = {() => this.newList()}>New List</button>
          <input type="text" id="text"></input>
        </div>
        <div class = "listButtons">
          <button onClick = {() => this.display()} class = "playlistButton">
            Favorites
          </button>
          {
            this.state.List.map((list) =>{
            return <button onClick = {() => this.displayList(list.name)} class = "playlistButton">{list.name}</button>
            })
          }
        </div>
        <div>
          <button class = "slightSpace" onClick = {() => this.removeList()}>Remove a list</button>
        </div>
        <div>
          <button class = "slightSpace" onClick = {() => this.resetFavorites()}>Reset Favorites</button>
        </div>
        <div id = "listDisplay" class = "center">
        </div>
        <div class = "songlist">
          {
          this.state.Music.map((music) =>{
            return <div class = "song">
              <button class = "newfavdd" onClick = {() => this.addToFav(music)}>Add to favorites</button><br></br>
              <button class = "slightSpace" onClick = {() => this.addToList(music)}>Add to other playlist</button>
              <Music
              name = {music.name}
              artist = {music.artist}
              year ={music.year}
              />
            </div>
          })
        }
        </div>
        <div id = "lists" class="message">
          <div class="plists">
          {
            this.state.List.map((list) =>{
            return <div><button onClick = {() => this.listAdd(list.name)} class = "playlistButton">{list.name}</button></div>
            })
          }
          </div>
        </div>
        <div id = "rlists" class="message">
          <div class="plists">
          {
            this.state.List.map((list) =>{
            return <div><button onClick = {() => this.deleteList(list.name)} class = "playlistButton">{list.name}</button></div>
            })
          }
          <div><button onClick = {() => this.hide()} class = "playlistButton">Back</button></div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;