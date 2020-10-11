import { Button, Card, CardContent, FormGroup, FormLabel, Input, Select } from '@material-ui/core'
import Axios from 'axios'
import React, { useState } from 'react'
import Navbar from './Navbar'

const AddLocation = () => {
  const [status, setStatus] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState({})

  
  const submitInfo=()=>{
    Axios.post('/addchargelocation',{chargeLocationtName:location,status:"Public"})
    .then(res=>{
     window.history.back()
    })
    .catch(err=>{
      console.log(err.response.data)
      setError(err.response.data)
    })
  }
  return (
    <div>
      <Navbar title='Add  Location' />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <Card>
              <CardContent className="m-3">
                <h3 className="text-success text-center mb-3">Add A Location</h3>
                <form>
                  <FormGroup  className="mb-4">
                    <FormLabel>Enter Location Name</FormLabel>
                    <Input error={error.chargeLocationtName?true:false} onChange={e=>setLocation(e.target.value)} placeholder="Location Name" />
                  </FormGroup>
                  {/* <FormGroup >
                    <FormLabel>Select Status</FormLabel>
                    <Select error={error.status?true:false} onChange={e=>setStatus(e.target.value)} >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </Select>
                  </FormGroup> */}
                </form>
                <Button onClick={()=>submitInfo()} size="small" color="primary" variant="outlined" className="ml-auto mt-5"> Create</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddLocation
