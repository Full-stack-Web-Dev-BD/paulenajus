import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navbar from './Navbar'
import PowerIcon from '@material-ui/icons/Power';
import { Link } from 'react-router-dom';
import queryString from 'query-string'
import Axios from 'axios';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '40px'
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

export default function Charging() {
  const [status, setStatus] = useState('Charging ...')
  const [isState, setIsState] = useState(false)
  const [btnString, setBtnString] = useState('Connect')
  const [chargerDigit, setChargerDigit] = useState('')
  const [error, setError] = useState(false)
  const classes = useStyles();
  const [h, setH] = useState(0)
  const [m, setM] = useState(0)
  const [s, setS] = useState(0)
  const [chargingState, setChargingState] = useState({})
  const connectCharger = () => {
    if (!chargerDigit) {
      return setError(true)
    }
    setBtnString('Connecting ...')
    setTimeout(() => {
      window.location.href = '/viewCharging'
    }, 2000);
  }
  useState(() => {

    function getTimeRemaining(endtime) {
      let endT = Date.parse(endtime)
      let currentT = Date.parse(new Date());
      const total = endT - currentT
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      return {
        total,
        days,
        hours,
        minutes,
        seconds
      };
    }

    function initializeClock(endtime) {
      updateClock();
      const timeinterval = setInterval(updateClock, 1000);

      function updateClock() {
        const t = getTimeRemaining(endtime);
        setH(('0' + t.hours).slice(-2));
        setM(('0' + t.minutes).slice(-2));
        setS(('0' + t.seconds).slice(-2));
        if (t.total <= 0) {
          window.location.reload()
          clearInterval(timeinterval);
        }
      }
    }
    let cid = queryString.parse(window.location.search).cid
    Axios.get(`/findchargingstate/${cid}`)
      .then(res => {
        setChargingState(res.data.chargingState)
        console.log(res.data);
        if (res.data.chargingState) {
          let ct = Date.parse(new Date());
          let st = res.data.chargingState.completed
          if (st < ct) {
            setStatus('Charged !')
            setIsState(true)
          } else if (st > ct) {
            console.log('remain');
            initializeClock(res.data.chargingState.chargeEndTime)
          }
        }
      })
      .catch(err => {
        console.log('try later', err)
      })
  }, [])
  return (
    <div>
      <Navbar title=" Dashboard " />
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <Card className={classes.root} variant="outlined" >
            <h2 className="text-success text-center  ">My Charging Status</h2>
            <hr className="mb-5"/>
            <div className="charging_anim">
              <figure>
                <div className="clock_text">
                  {
                    isState ?
                      <h2 style={{ display: 'flex' }}>Session Completed</h2> :
                      <h2 style={{ display: 'flex' }}><span> {h} </span>:<span> {m} </span>:<span> {s} </span></h2>
                  }
                </div>
                <div class="c"></div>
                <div class="c2"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <div class="c3"></div>
                <div class="c4"></div>
                <div class="c5"></div>
                <div class="c6"></div>
              </figure>
            </div>
            <Typography variant="h5" color="primary" component="h2">
              <PowerIcon color="primery" />{status}
            </Typography>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
              </Typography>
            </CardContent>
            <CardActions>
              <Link to='/'>
                <Button size="small" variant="contained" color="secondary" onClick={() => { connectCharger() }} >Go Home  </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}
