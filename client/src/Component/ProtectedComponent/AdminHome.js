import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navbar from './Navbar'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import ChargerCard from '../ChargerCard'
import { Alert, AlertTitle } from '@material-ui/lab';
import { CardHeader } from '@material-ui/core';
import { useRecoilState } from 'recoil'
import { userState } from '../../recoilState'
import jwtDecoder from 'jwt-decode'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "5px"
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

export default function AdminHome() {
  const classes = useStyles();
  const [isShowAlert, setIsShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (window.localStorage.getItem('car-app')) {
      let decoded = jwtDecoder(window.localStorage.getItem('car-app'))
      setUser(decoded)
    }
  }, [])


  return (
    <>
      <Navbar title=" Admin Panel " />
      <div className="container">
        {
          isShowAlert ?
            <div className="mt-3">
              <Alert severity="success">
                <AlertTitle>{'Hi , '}</AlertTitle>
                {alertText}
              </Alert>
            </div> : ''
        }
        <div className="row mt-5">
          <div className="col-md-8 offset-md-2">
            <div className="row">
              <div className="col-md-6">
                <Card>
                  <CardContent>
                    <h3 className=" text-secondary">Manage Users (Client)</h3>
                    <p className="text-secondary">(View and manage  all client )</p>
                    <Link to='/users'>View List </Link>
                  </CardContent>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <CardContent>
                    <h3 className=" text-secondary">View Charge History (all)</h3>
                    <p className="text-secondary">(Check history of all client )</p>
                    <Link to='/chistoryall'>Go To table </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-6">
                <Card>
                  <CardContent>
                    <h3 className=" text-secondary">Manage Location</h3>
                    <p className="text-secondary">(Add , Edit , Delete location and charger point )</p>
                    <Link to='/addlocation'>Add a  location </Link>
                  </CardContent>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <CardContent>
                      <h3 className=" text-secondary">View Location</h3>
                      <p className="text-secondary">(Manage all about  location and charger point )</p>

                      <Link to='/viewalllocation'>Go to Location Page </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
