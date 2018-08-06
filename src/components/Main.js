import React, { Component } from 'react';
import { Switch,Route,BrowserRouter as Router } from "react-router-dom";
import Profile from './Profile';
import Repo from './Repo';



class Main extends Component {
    render() {
        return (
            <Switch>
              <Route
              exact path='/'
              render={(props)=> 
                <Profile
                  user_data={this.props.user_data}
                  events_data={this.props.events_data}
                  repo_data={this.props.repo_data}
                  followers_data={this.props.followers_data}
                  following_data={this.props.following_data}
                  ></Profile>}
              />
              <Route
              exact path='/repo'
              render={()=> 
                <Repo               
                repo_data={this.props.repo_data}
                />}
              />
            </Switch>
        );
    }
}

export default Main;