import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navbar from './ProtectedComponent/Navbar'
import PowerIcon from '@material-ui/icons/Power';
import { Link } from 'react-router-dom';
import { Input } from '@material-ui/core';
import { set } from 'mongoose';
import './canim.css'

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
  const [btnString, setBtnString] = useState('Connect')
  const [chargerDigit, setChargerDigit] = useState('')
  const [error, setError] = useState(false)
  const classes = useStyles();
  const [h, setH] = useState()
  const [m, setM] = useState()
  const [s, setS] = useState()
  const bull = <span className={classes.bullet}>•</span>;
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
    function currentTime() {
      var date = new Date(); /* creating object of Date class */
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
      var midday = "AM";
      midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
      hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12) : hour); /* assigning hour in 12-hour format */
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      // document.getElementById("clock").innerText = hour + " : " + min + " : " + sec + " " + midday; /* adding time to the div */
      setH(hour)
      setM(min)
      setS(sec)
      var t = setTimeout(currentTime, 1000); /* setting timer */
    }

    function updateTime(k) { /* appending 0 before time elements if less than 10 */
      if (k < 10) {
        return "0" + k;
      }
      else {
        return k;
      }
    }

    currentTime();
  }, [])
  return (
    <div>
      <Navbar title=" Dashboard " />

      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <Card className={classes.root} variant="outlined" >
            <div className="charging_anim">
              <figure>
                <div className="clock_text">
                  <h2 style={{display:'flex'}}><span> {h} </span>:<span> {m} </span>:<span> {s} </span></h2>
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
              <PowerIcon color="primery" />Charging ...
            </Typography>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
              </Typography>
            </CardContent>
            <CardActions>
              <Link to='/cconnect'>
                <Button size="small" variant="contained" color="secondary" onClick={() => { connectCharger() }} >Stop Charging  </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}
