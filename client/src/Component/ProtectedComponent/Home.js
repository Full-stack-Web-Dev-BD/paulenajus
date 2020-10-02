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
        <div className="row">
          {
            allSchedule.map(single => {
              return (
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      {single.title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {single.teacher}
                    </Typography>
                    <Typography variant="p" component="p">
                      <p>ClassRoom :{single.classroom}</p>
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      <strong>Event Time: </strong>{single.time.split('T')[0] + ' at ' + single.time.split('T')[1]}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <br />
                      <p><strong>Post At :</strong> {single.createAt}</p>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div style={{ alignItems: "center" }}>
                      <Button size="small" variant="contained" color="success" className="mt-5 mb-3 ml-2"><Link to={`/edit-schedule?id=${single._id}`}>Edit</Link></Button>
                      <Button size="small" variant="contained" color="secondary" className="mt-5 mb-3 ml-2">Delete</Button>
                    </div>
                  </CardActions>
                </Card>
              )
            })
          }
        </div>
      </div>
    </>


  );
}
