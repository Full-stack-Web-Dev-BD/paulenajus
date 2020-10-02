import React, { Component } from 'react'
import EditHolder from './EditHolder'
import Axios from 'axios'
import querystring from 'query-string'


export class EditSchedule extends Component {
    
    state={
        schedule:{}
    }   
    componentDidMount(){
        let id= querystring.parse(window.location.search).id
        Axios.get('/get-single/'+id)
        .then(res=>{
            console.log(res.data)
            this.setState({
                schedule:res.data
            })
        })
    }
    
    
    
    render() {
        return (
            <EditHolder schedule={this.state.schedule}/>
        )
    }
}

export default EditSchedule
