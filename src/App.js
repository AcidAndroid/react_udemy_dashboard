import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Profile from './components/Profile';
import './App.css'
import Repo from './components/Repo';
import { Switch,Route,BrowserRouter as Router } from "react-router-dom";

import SideMenu from './components/SideMenu';
import SearchBox from './SearchBox';
import Main from './components/Main';



const { Header, Content, Footer, Sider } = Layout;


class App extends Component {

  state={

    user_data:null
    ,repo_data:[]
    ,events_data:[]
    ,followers_data:[]
    ,following_data:[]

  }


  fetchData = (userName)=>{
    axios.get(`https://api.github.com/users/${userName}`)
      .then((res)=>{
        this.setState(
          {user_data:{
              name:res.data.name || res.data.login ||'No NAME'
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
          followers_data: res.data.map(follower=>({
            html_url:follower.html_url
            ,avatar_url:follower.avatar_url
            ,login:follower.login           
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
      <Router>
      <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo" />
          <SideMenu></SideMenu>
        </Sider>
        <Layout style={{ marginLeft: 200,height:'100vh' }}>
          <Header style={{ background: '#fff', padding: 0 }}>
           <SearchBox onSearch={this.fetchData}></SearchBox>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'justify' }}>            
            <Main
              user_data={this.state.user_data}
              events_data={this.state.events_data}
              repo_data={this.state.repo_data}
              followers_data={this.state.followers_data}
              following_data={this.state.following_data}
              repo_data={this.state.repo_data}
            ></Main>
              
            </div>
          </Content>
          <Footer style={{ textAlign: 'justify' }}>
            Ejemplo de uso de API de Github. Creado por Acid Android
          </Footer>
        </Layout>
      </Layout>
      </Router>
    );
  }
}

export default App;
