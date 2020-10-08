import { Button, Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import queryString from 'query-string'
import './bootstrap.css'
import {useRecoilValue} from 'recoil'
import {userState} from '../../recoilState'
const ViewChargPointInLocation = () => {
  const [chargePoints, setChargePoints] = useState([])
  const [clname, setClname] = useState('')
  const [cl, setCl] = useState([])
  const getUserState=useRecoilValue(userState)

  useEffect(() => {
    let clid = queryString.parse(window.location.search)
    Axios.get(`/getchargepoints/${clid.clid}`)
      .then(res => {
        setCl(res.data.chargelocation)
        setClname(res.data.chargelocation.chargeLocationtName)
        setChargePoints(res.data.chargelocation.chargePoint)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const deletePoint = (id) => {
    let obj = {
      cpid: id,
      clid: cl._id
    }
    let clid = queryString.parse(window.location.search)

    Axios.post('/removechargepoint', obj)
      .then(res => {
        Axios.get(`/getchargepoints/${clid.clid}`)
          .then(res => {
            setCl(res.data.chargelocation)
            setClname(res.data.chargelocation.chargeLocationtName)
            setChargePoints(res.data.chargelocation.chargePoint)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        alert('Try later')
      })
  }
  return (
    <div>
      <Navbar title={`Avilable Charge Point at ${clname} `} />
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          {
            getUserState.type==='admin'?

          <div>
            <Link to={`/addchargepoint?clid=${cl._id}&clname=${cl.chargeLocationtName}`}>
              <Button color="secondary" variant="contained" size="small">Add Charge Point to {cl.chargeLocationtName}</Button>
            </Link>
          </div>:''
          }
          <h2 className="text-center text-success"> Avilable Charge Point</h2>
          <hr/>
          {
            chargePoints.map(el => {
              return (
                <div className="mt-2 mb-2">
                  <Card>
                    <CardContent>
                      <h4 className="text-success"> {el.cpName} </h4>
                      <div className="d-flex">
                        <Button variant="outlined" color="secondary" size="small" > {el.status} </Button>
                        {
                          getUserState.type==='admin'?
                          <Button variant="contained" color="secondary" size="small" onClick={() => { deletePoint(el.id) }} style={{ marginLeft: '20px' }}> Delete </Button>
                          :''
                        }

                      </div>
                      <br />
                      <Link style={{textDecoration:'none'}} to={`/chargepointsdetails/?cpid=${el.id}&clid=${cl._id}`}>View Charge Point Details</Link>
                    </CardContent>
                  </Card>
                </div>
              )
            })
          }
          <div className="mt-5">

            {
              chargePoints.length < 1 ?
                <h3 className="mt-5 text-danger text-center">No  Charge Point Avilable</h3>:
                ''
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewChargPointInLocation
