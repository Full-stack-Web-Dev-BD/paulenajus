import { Button, Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useRecoilState, useRecoilValue } from 'recoil'
import { searchLocationState, userState } from '../../recoilState'


const ViewAllLocation = () => {
  const [getSearchLocationState, setSearchLocationState] = useRecoilState(searchLocationState)
  const getUserState = useRecoilValue(userState)
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
            getUserState.type === 'admin' ?
              <div>
                <Link to='/addlocation'>
                  <Button color="secondary" variant="contained" size="small">Add Charge Location</Button>
                </Link>
              </div>:
              ''
          }
          <h2 className="text-center text-success"> Avilable Charge Point</h2>
          <hr/>

          {
            getSearchLocationState.map(el => {
              return (
                <div className="mt-2 mb-2">
                  <Card>
                    <CardContent>
                      <h4 className="text-success"> {el.chargeLocationtName} </h4>
                      <Button variant="outlined" color="secondary" size="small" > {el.status} </Button>
                      <br />
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
                  <Button variant="outlined" color="secondary" onClick={() => window.location.reload()}>Retry</Button>
                </div> :
                ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAllLocation
