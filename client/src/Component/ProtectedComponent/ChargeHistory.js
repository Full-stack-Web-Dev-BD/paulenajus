import Axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    Axios.get('/getUsers')
    .then(res=>{
      setUsers(res.data.users)
    })
  },[])
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1">

        </div>
      </div>
    </div>
  )
}

export default Users
