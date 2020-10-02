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

export default function ChargerConnectPage() {
  const [btnString, setBtnString] = useState('Connect')
  const [chargerDigit, setChargerDigit] = useState('')
  const [error, setError] = useState(false)
  const classes = useStyles();
  
  const bull = <span className={classes.bullet}>•</span>;
  const connectCharger=()=>{
    if(!chargerDigit){
      return setError(true)
    }
    setBtnString('Connecting ...')
    setTimeout(() => {
      window.location.href='/charging'
    }, 2000);
  }
  return (
    <div>
      <Navbar title=" Dashboard " />

      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <Card className={classes.root} variant="outlined" >
            
        <div className="col-md-4 offset-md-4">
        </div>
            <div className="text-center">
              <img  src={require('../Component/images/charging.gif')}/>
            </div>
            <Typography variant="h5" color="primary" component="h2">
              <PowerIcon  color="primery" />Connect Your Charger
            </Typography>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                <Input error={error} fullWidth={true} type="text" onChange={(e)=>{setChargerDigit(e.target.value)}} placeholder="Enter 4 digit code of your choosen charger " />
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="secondary"  onClick={()=>{connectCharger()}} >Connect </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}
