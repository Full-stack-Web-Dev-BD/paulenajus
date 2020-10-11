import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navbar from './ProtectedComponent/Navbar'
import PowerIcon from '@material-ui/icons/Power';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import Alert from '@material-ui/lab/Alert';
import queryString from 'query-string'
import Axios from 'axios';
import { useRecoilValue } from 'recoil'
import { userState } from '../recoilState'
import decoder from 'jwt-decode'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '40px',
    textAlign: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ChargerConnectPage() {
  const [btnString, setBtnString] = useState('Continue with')
  const [chargingTime, setChargingTime] = useState(0)
  const [error, setError] = useState(false)
  const classes = useStyles();
  const [chargerInformation, setChargerInformation] = useState({})
  const [qs, setQs] = useState({})
  const userInfo = useRecoilValue(userState)

  useEffect(() => {
    let obj = {
      clid: queryString.parse(window.location.search).clid,
      cpid: queryString.parse(window.location.search).cpid
    }
    Axios.post('/findchargepoint', obj)
      .then(res => {
        console.log(res.data)
        setChargerInformation(res.data.chargePoint)
      })
      .catch(err => {
        console.log(err.response)
      })
  }, [])
  const connectCharger = () => {
    const token = window.localStorage.getItem('car-app')
    if (token) {
      let decoded = decoder(token)
      if (chargingTime < 1) {
        return setError(true)
      }
      let sure = window.confirm(`Are you sure to continue for ${chargingTime} Hours with ${chargingTime * chargerInformation.cost}$  ? `)
      if (!sure) {
        return window.history.back()
      }
      setError(false)
      let obj = {
        chargerInfo: [{ chargerInformation }],
        clid: queryString.parse(window.location.search).clid,
        cpid: queryString.parse(window.location.search).cpid,
        uid: decoded._id,
        connectingTime: new Date().toString(),
        chargeTime: chargingTime,
        chargeEndTime: new Date(new Date().setHours(new Date().getHours() + chargingTime)).toString(),
        cost: chargerInformation.cost * chargingTime,
        completed: Date.parse(new Date(new Date().setHours(new Date().getHours() + chargingTime))),
        paid: false
      }
      setBtnString('Connecting ...')
      Axios.post('/startcharge', obj)
        .then(success => {
          window.location.href = `/charging/?cid=${success.data.info._id}`
        })
        .catch(err => {
          alert('Try later')
          window.history.back()
        })
    }
  }
  
  const add = () => {
    setChargingTime(chargingTime+1)
  }
  const sub = () => {
    if (chargingTime < 1) {
      return
    } else {
      setChargingTime(chargingTime - 1)
    }
  }
  return (
    <div>
      <Navbar title=" Dashboard " />
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          {
            error ?
              <div className="mb-3">
                <Alert variant="filled" severity="error">
                  Charging time can't be 0
                </Alert>
              </div> : ''
          }
          <Card className={classes.root} variant="outlined" >

            <div className="col-md-4 offset-md-4">
            </div>
            <div className="text-center mb-4">
              <img src={require('../Component/images/charging.gif')} />
            </div>
            <Typography variant="h5" color="primary" component="h2">
              <PowerIcon color="primery" />Connect Your Charger
            </Typography>
            <CardContent>
              <div>

                <p style={{ color: '#f50057', fontWeight: '600' }}>
                  Selected time:  <span style={{ color: '#FF8B00', fontWeight: '700' }}> {chargingTime} Hours </span> and estimate cost : <span style={{ color: '#FF8B00', fontWeight: '700' }}> {chargingTime * chargerInformation.cost}$ </span>
                </p>
              </div>
              <div className="d-inline-block mb-3">
                <div className="d-flex">
                  <Button variant="contained" onClick={() => { sub() }} color="secondary"><IndeterminateCheckBoxOutlinedIcon /></Button>
                  <Button variant="outlined" color="secondary" style={{ margin: '0 10px' }}> <b style={{ fontSize: '30px !importent' }}>{chargingTime}</b></Button>
                  <Button variant="contained" color="secondary" onClick={()=>add()}><AddCircleOutlineIcon /></Button>
                </div>
              </div>
              <div className="clearfix"></div>
              <Button size="small" variant="contained" color="secondary" onClick={() => { connectCharger() }} >{btnString + ' ' + chargingTime * chargerInformation.cost + '$'} </Button>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
