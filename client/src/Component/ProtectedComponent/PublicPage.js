import { Button, Card, CardContent } from '@material-ui/core'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {useRecoilState} from 'recoil'
import {searchLocationState} from '../../recoilState'

const PublicPage = () => {
  const [getSearchLocationState,setSearchLocationState] =useRecoilState(searchLocationState)
  useEffect(() => {
    Axios.get('/getalllocation')
      .then(res => {
        setSearchLocationState(res.data.location)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <Navbar title="View Location " />
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          {
            getSearchLocationState.map(el => {
              return (
                <div className="mt-2 mb-2">
                  <Card>
                    <CardContent>
                      <h4 className="text-success"> {el.chargeLocationtName} </h4>
                      <Button variant="outlined" color="secondary" size="small" > {el.status} </Button>
                      <br/>
                      <Link to={`/viewchargepointinlocation/?clid=${el._id}`}>View Charg Point</Link>
                    </CardContent>
                  </Card>
                </div>
              )
            })
          }
          
          <div className="mt-5">

            {
              getSearchLocationState.length < 1 ?
              <div className="text-center">
                <h3 className="mt-5 mb-3 text-danger text-center">No  Charge Point Avilable</h3>
                <Button variant="outlined" color="secondary" onClick={()=>window.location.reload()}>Retry</Button>
              </div>:
                ''
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicPage
