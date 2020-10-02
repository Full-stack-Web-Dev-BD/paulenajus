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

export default function Home() {
  const [schedule, setschedule] = useState([])
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [allSchedule, setAllSchedule] = useState([])

  const data = [
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
    {
      model_name: 'New Charger',
      type: '22kW',
      information: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      status: 'Avilable'
    },
  ]

  useEffect(() => {
    Axios.get('/get-all')
      .then(res => {
        setAllSchedule(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }, [])




  return (
    <>
      <Navbar title=" Dashboard " />
      <div className="container">
        <div className="row mt-5">
          {
            data.map(single => {
              return (
                <div className="col-md-4 mb-4">
                  <ChargerCard/>
                </div>
              )
            })
          }
        </div>
      </div>
    </>


  );
}
