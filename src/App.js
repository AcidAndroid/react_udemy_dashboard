import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  state={

    user_data:null
    ,repo_data:[]
    ,events_data:[]
    ,folowers_data:[]
    ,following_data:[]

  }


  fetchData(userName){
    axios.get(`https://api.github.com/users/${userName}`)
      .then((res)=>{
        this.setState(
          {user_data:{
              name:res.data.name||'No NAME'
              ,bio:res.data.bio||'NO BIO'
              ,avatar_url:res.data.avatar_url
              ,login:res.data.login
              ,followers:res.data.followers
              ,following:res.data.following
            }
          })
      })
      .catch((err)=>{
        console.log(err)
      })

      axios.get(`https://api.github.com/users/${userName}/repos`)
      .then(res=>{
        this.setState(
          {
            repo_data: res.data.map(repo=>({
              id:repo.id
              ,name:repo.name
              ,owner:repo.owner
              ,description:repo.description
              ,html_url:repo.html_url
            }))            
          }
        )
      })
      .catch(err=>{
        console.log(err)
      })

      axios.get(`https://api.github.com/users/${userName}/events`)
      .then((res)=>{
        this.setState({
          events_data: res.data.map(event=>({
            type:event.type
            ,repo:event.repo
          }))
        })
      })
      .catch(err=>{
        console.log(err)
      })

      axios.get(`https://api.github.com/users/${userName}/followers`)
      .then((res)=>{
        this.setState({
          folowers_data: res.data.map(follower=>({
            html_url:follower.html_url
            ,avatar_url:follower.avatar_url
          }))
        })
      })
      .catch(err=>{
        console.log(err)
      })


      axios.get(`https://api.github.com/users/${userName}/following`)
      .then((res)=>{
        this.setState({
          following_data: res.data.map(following=>({
            html_url:following.html_url
            ,avatar_url:following.avatar_url
          }))
        })
      })
      .catch(err=>{
        console.log(err)
      })

  }

  




  componentDidMount(){
    this.fetchData('donfour')
    // this.fetchData('acidandroid')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
