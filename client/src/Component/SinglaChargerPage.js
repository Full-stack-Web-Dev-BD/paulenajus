import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navbar from '../Component/ProtectedComponent/Navbar'
import { Link } from 'react-router-dom';
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

export default function SinglaChargerPage() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Navbar title=" Dashboard " />

      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <Card className={classes.root} variant="outlined" >
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Model : 28392
        </Typography>
              <Typography variant="h5" component="h2">
                Type:ABCD
        </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Status : Avilable
        </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Location : Bangladesh
        </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Cost : 0.20 e/min
        </Typography>
              <Typography variant="body2" component="p">
                Description:
          <br />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae, ullam corrupti assumenda quos natus harum unde nesciunt tenetur molestias.</p>
              </Typography>
            </CardContent>
            <CardActions>
              <Link to='/cconnect'>
                <Button size="small" variant="contained" color="secondary" >Connect </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}
