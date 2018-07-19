import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import Profile from './components/Profile';
import './App.css'


const { Header, Content, Footer, Sider } = Layout;


class App extends Component {

  state={

    user_data:null
    ,repo_data:[]
    ,events_data:[]
    ,followers_data:[]
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
      <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{marginTop:'50px'}} >
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">Profile</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="code" />
              <span className="nav-text">All repositories</span>
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200,height:'100vh' }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>            
              <Profile
              user_data={this.state.user_data}
              events_data={this.state.events_data}
              repo_data={this.state.repo_data}
              followers_data={this.state.followers_data}
              following_data={this.state.following_data}
              ></Profile>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
