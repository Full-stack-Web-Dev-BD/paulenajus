import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import PublicRoute from './Component/util/PublicRoute'
import ProtectedRoute from './Component/util/ProtectedRoute'

import Home from './Component/ProtectedComponent/Home'
import CreateSchedule from './Component/ProtectedComponent/CreateSchedule'


import Posts from './Component/PublicComponent/Posts'
import Login from './Component/PublicComponent/Login'
import Register from './Component/PublicComponent/Register'
import Mail from './Component/ProtectedComponent/Mail'
import EditSchedule from './Component/ProtectedComponent/EditSchedule';

class App extends Component {
    render() { 
        return (
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute path="/home" component={Home} />
                    <ProtectedRoute path="/create-schedule" component={CreateSchedule} />
                    <ProtectedRoute path="/send-email" component={Mail} />
                    <ProtectedRoute path="/edit-schedule" component={EditSchedule} schedule />



                    <PublicRoute  path='/posts' component={Posts}/>
                    <PublicRoute  path='/login' component={Login}/>
                    <PublicRoute  path='/register' component={Register}/>
                    <Redirect from="/" to="/home"/>
                </Switch>
            </BrowserRouter>
        );
    }
}
 
export default App;