import { Button, Card, CardContent, FormGroup, FormLabel, Input, Select } from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import queryString from 'query-string'
const AddChargePoint = () => {
  const [status, setStatus] = useState('')
  const [cpname, setCpname] = useState()
  const [kw, setKw] = useState('')
  const [type, setType] = useState('')
  const [cost, setCost] = useState()
  const [error, setError] = useState({})
  const [clname, setClname] = useState('')
  const [clid, setClid] = useState('')
  useEffect(() => {
    let qs=queryString.parse( window.location.search)
    setClid(qs.clid)
    setClname(qs.clname)
  }, [])
  
  const submitInfo=()=>{
    let obj={
      status:status,
      cpname:cpname,
      kw:kw,
      type:type,
      cost:cost,
      clid:clid
    }
    Axios.post('/addchargepoint',obj)
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
                  <h3 className="text-success text-center mb-3">Add A Charge Point at { clname}</h3>
                <form>
                  <FormGroup  className="mb-4">
                    <FormLabel>Charge Point Name</FormLabel>
                    <Input error={error.cpname?true:false} onChange={e=>setCpname(e.target.value)} placeholder="Charge Point Name" />
                  </FormGroup>
                  <FormGroup  className="mb-4">
                    <FormLabel>Indicate KW</FormLabel>
                    <Input error={error.kw?true:false} onChange={e=>setKw(e.target.value)} placeholder="Indicate Charger KW" />
                  </FormGroup>
                  <FormGroup  className="mb-4">
                    <FormLabel>Type of Charger</FormLabel>
                    <Input error={error.type?true:false} onChange={e=>setType(e.target.value)} placeholder="Type of Charger" />
                  </FormGroup>
                  <FormGroup  className="mb-4">
                    <FormLabel>Cost  of Charger</FormLabel>
                    <Input type="number" error={error.cost?true:false} onChange={e=>setCost(e.target.value)} placeholder="Cost of Charger" />
                  </FormGroup>
                  <FormGroup >
                    <FormLabel>Select Status</FormLabel>
                    <Select error={error.status?true:false} onChange={e=>setStatus(e.target.value)} >
                      <option value="Avilable">Avilable</option>
                      <option value="Unavilable">Unavilable</option>
                    </Select>
                  </FormGroup>
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

export default AddChargePoint
