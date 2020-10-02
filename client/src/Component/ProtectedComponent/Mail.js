import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Navbar from './Navbar'
import { Card ,CardContent} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import DraftsIcon from '@material-ui/icons/Drafts';
import Input from '@material-ui/core/Input';
import Alert from '@material-ui/lab/Alert';

import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import SendIcon from '@material-ui/icons/Send';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import EmailValidator from 'email-validator'
import Axios from 'axios';





const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 50,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));


export default function SpeedDials() {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('up');
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [error, seterror] = useState(true)
  const [sending, setSending] = useState(false)
  const [fromEmail, setFromEmail] = useState('')
  const [toUser, settoUser] = useState([])
  const [subject, setSubject] = useState('')
  const [file, setfile] = useState('')
  const [massage, setMassage] = useState('')

  const [result, setresult] = useState('')  

  const [formError, setFormError] = useState(true)

  const fileChooser=(e)=>{
    setfile(e.target.files[0])
  }
  const submitHandler=()=>{
    let formData=new FormData()
    formData.append('from',fromEmail)
    formData.append('to',toUser)
    formData.append('subject',subject)
    formData.append('file',file)
    formData.append('massage',massage)
    setSending(true)
    Axios.post('/send-email',formData)
    .then(res=>{
      setSending(false)
      setFromEmail('')
      settoUser([])
      setSubject('')
      setfile('')
      setMassage('')
      setresult(res.data.massage)
    })
    .catch(err=>{
      setSending(false)
      setresult(err.response.data.massage)
    })
  }
  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const removeToUser=(email)=>{
    let users= [...toUser]
    let i=users.indexOf(email)
    users.splice(i,1)
    console.log(users)
    settoUser(users)
  } 
  const addToEmail=(e)=>{
    let x=EmailValidator.validate(e.target.value)
    if(e.key==='Enter'){
      seterror(x)
      if(x===true){
        let users=[...toUser]
        users.push(e.target.value)
        settoUser(users)
        e.target.value=""

      }
    }
  }
  const addFormEmail=(e)=>{
    let x=EmailValidator.validate(e.target.value)
    if(e.key==='Enter'){
      setFormError(x)
        if(x===true){
          let users=[...toUser]
          users.push(e.target.value)
          setFromEmail(users)
      }
    }
  }
  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
    {console.log(error)}
      <div >
        <Navbar />
        <div className="col-md-8 offset-md-2 mt-2">
          <Card>
            <h3 style={{textAlign:"center"}}> <span><EmailIcon/></span> Send email to </h3>
            <CardContent>
              <div className={classes.root}>
                <div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <EmailIcon />
                      </Grid>
                      <Grid item>
                        {fromEmail?
                          <Chip
                            style={{margin:'3px 2px'}}
                            icon={<FaceIcon />}
                            label={fromEmail}
                            onClick={()=>{}}
                            onDelete={()=>{setFromEmail('')}}
                          />
                          :<TextField id="input-with-icon-grid" label="From :" error={!formError} onKeyPress={(e)=>{addFormEmail(e)}} />
                        }
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <DraftsIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid"  label={!error?"Email Not Valid":"Press Enter To Add"} error={!error} onKeyPress={(e)=>addToEmail(e)}/>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="mt-3">
                  {
                    toUser.map(single=>{
                      return(
                        <Chip
                          style={{margin:'3px 2px'}}
                          icon={<FaceIcon />}
                          label={single}
                          onClick={()=>{}}
                          onDelete={()=>{removeToUser(single)}}
                        />
                      )
                    })
                  }
                </div>
                <FormLabel className={classes.radioGroup} component="legend">
                  <TextField required id="standard-required" label="Subject" onChange={(e)=>{setSubject(e.target.value)}}/>
                  <TextField required onChange={(e)=>{fileChooser(e)}} type="file" id="standard-required" label="Select File"/>
                  <TextField  onChange={(e)=>{setMassage(e.target.value)}} id="outlined-multiline-static" label="Massage" multiline rows={4} variant="outlined"/>
                </FormLabel>
                <div className={classes.exampleWrapper}>
                  {
                      sending?
                      <LinearProgress color="secondary" />
                      :
                    <SpeedDial
                    ariaLabel="SpeedDial example"
                    className={classes.speedDial}
                    hidden={hidden}
                    icon={<SendIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    onClick={()=>{submitHandler()}}
                    open={open}
                    direction="up"
                  >
                  </SpeedDial>
                  }
                  {
                    result?
                    <Alert severity="info">{result}</Alert>
                    :''
                  }
                </div>
                {
                  !fromEmail|| !toUser || !subject || !massage?
                  <Alert style={{background:'#f44336',color:'white'}} severity="error">Please fill up all required filed <span style={{marginLeft:'20px'}}>Tip : Type gmail and Hit 'Enter' To add !!!</span>  </Alert>:''

                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
