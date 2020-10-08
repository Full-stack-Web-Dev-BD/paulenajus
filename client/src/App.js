import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import PublicRoute from './Component/util/PublicRoute'
import ProtectedRoute from './Component/util/ProtectedRoute'

import Home from './Component/ProtectedComponent/Home'
import Posts from './Component/PublicComponent/Posts'
import Login from './Component/PublicComponent/Login'
import Register from './Component/PublicComponent/Register'
import Mail from './Component/ProtectedComponent/Mail'
import SinglaChargerPage from './Component/SinglaChargerPage';
import ChargerConnectPage from './Component/ChargerConnectPage'
import Charging from './Component/Charging';
import ChargingStatus from './Component/ChargingStatus';
import decoder from 'jwt-decode'
import AdminHome from './Component/ProtectedComponent/AdminHome';
import AddLocation from './Component/ProtectedComponent/AddLocation';
import ViewAllLocation from './Component/ProtectedComponent/ViewAllLocation';
import ViewChargPointInLocation from './Component/ProtectedComponent/ViewChargPointInLocation';
import AddChargePoint from './Component/ProtectedComponent/AddChargePoint';
import ViewChargPointDetails from './Component/ProtectedComponent/ViewChargPointDetails';
import PublicPage from './Component/ProtectedComponent/PublicPage';
class App extends Component {
    state={
        type:''
    }
    componentDidMount(){
        const token=window.localStorage.getItem('car-app')
        if(token){
            let decoded =decoder(token)
            this.setState({
                type:decoded.type
            })
        }
        
    }
    render() { 
        return (
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute path="/home" component={this.state.type==='admin'?AdminHome:Home} />
                    <ProtectedRoute path="/addlocation" component={AddLocation} />
                    <ProtectedRoute path="/viewalllocation" component={ViewAllLocation} />
                    <ProtectedRoute path="/viewchargepointinlocation" component={ViewChargPointInLocation} />
                    <ProtectedRoute path="/addchargepoint" component={AddChargePoint} />
                    <ProtectedRoute path="/chargepointsdetails" component={ViewChargPointDetails} />
                    
                    <ProtectedRoute path="/cconnect" component={ChargerConnectPage} />
                    <ProtectedRoute path="/charging" component={Charging} />
                    <ProtectedRoute path="/chartStatus" component={ChargingStatus} />
                    {/* <ProtectedRoute path="/create-schedule" component={CreateSchedule} /> */}
                    {/* <ProtectedRoute path="/send-email" component={Mail} /> */}


                    <PublicRoute path="/public" component={PublicPage} />
                    <PublicRoute  path='/posts' component={Posts}/>
                    <PublicRoute  path='/login' component={Login}/>
                    <PublicRoute  path='/register' component={Register}/>
                    <Redirect from="/" to={window.localStorage.getItem('car-app')?"/home":"/public"}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
 
export default App;