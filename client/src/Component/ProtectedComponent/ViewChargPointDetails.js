import { Button, Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import queryString from 'query-string'
import FlashAutoIcon from '@material-ui/icons/FlashAuto';
import './bootstrap.css'
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { Alert, AlertTitle } from '@material-ui/lab';

const ViewChargPointDetails = () => {
  const [chargePoints, setChargePoints] = useState({})
  const [qs, setQs] = useState({})
  useEffect(() => {
    let qs = queryString.parse(window.location.search)
    setQs(qs)
    let obj = {
      cpid: qs.cpid,
      clid: qs.clid
    }

    Axios.post(`/findchargepoint`, obj)
      .then(res => {
        console.log(res.data)
        setChargePoints(res.data.chargePoint)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }, [])

  // "cpName" : "dssfsadf",
  // "status" : "Unavilable",
  // "kw" : "sdf sfds",
  // "type" : "fdsaf dsf",
  // "cost" : "4636534",
  return (
    <div>
      <Navbar title={`Details about  ${chargePoints.cpName} `} />
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <div>
            <Card >
              <Alert severity="success" className="pl-5">
                <AlertTitle>Lets Start Charging</AlertTitle>
                    To start charging with this charger  — <strong>Just click on Continue!</strong>
              </Alert>
              <CardContent className="p-5 text-center">

                <h3 className="text-center text-info "> <LocalGasStationIcon />  Charge Point Name :{chargePoints.cpName} </h3>
                <br />
                {
                  chargePoints.status === 'Unavilable' ?
                    <Button color="secondary" variant="outlined" size="small"  > {chargePoints.status} </Button> :
                    <Button color="primary" variant="outlined" size="small"  > {chargePoints.status} </Button>
                }
                <div>
                  <p>
                    <FlashAutoIcon color="action" /> <b style={{ color: 'rgba(0, 0, 0, 0.54)' }}>{chargePoints.kw}</b> KW
                  </p>
                  <p>
                    <LocalAtmIcon color="action" /> <b style={{ color: 'rgba(0, 0, 0, 0.54)' }}>{chargePoints.cost}</b> $$ Per Hour
                  </p>
                  <Link to={`/cconnect/?clid=${qs.clid}&cpid=${qs.cpid}`} style={{textDecoration:'none'}}>
                    <Button variant="outlined" color="secondary" >Continue to charge</Button>
                  </Link>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewChargPointDetails
