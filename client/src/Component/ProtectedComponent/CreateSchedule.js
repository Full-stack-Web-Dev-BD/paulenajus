import React, { useState } from 'react'
import Navbar from './Navbar'
import { Card, CardContent,TextField,CardHeader, CardActionArea } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios'
import {Link} from 'react-router-dom'




const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));


const CreatePost = () => {

    const classes = useStyles();

    
    const [errors, seterrors] = useState({})
    const [time, settime] = useState("")
    const [title, setTitle] = useState("")
    const [teacher, setTeacher] = useState("")
    const [classroom, setClassroom] = useState("")
    const [schoolsubject, setSchoolsubject] = useState("")
    const [successMassage, setSuccessMassage] = useState("")


    const onSubmit=()=>{
        let obj={time,title,teacher,classroom, schoolsubject}
        Axios.post('/create',obj)
        .then(res=>{

            console.log(res.data)
            setSuccessMassage(res.data.massage)
            // window.location.href='/home'
        })
        .catch(err=>{
            console.log(err.response.data)
            seterrors(err.response.data)
        })
    }
    
    // time:String,
    // title:String, 
    // teacher:String, 
    // classroom:String,
    // schoolsubject:String
    return (
        <div >
            <Navbar title=" Create Post " />
            <div className="col-md-6 offset-md-3 mt-5">
                <Card className="p-2">
                        <h3  className="text-center "> Create Schedule.</h3>
                        {
                            successMassage?
                            <div className="ml-5 ">
                                <h4 className="text-success">{successMassage}</h4>
                                <p>
                                    <Link to="/home">Go to View</Link>
                                </p>
                            </div>:''
                        }
                    <CardContent>
                        <form >
                            <div className="row">
                                <div className="col-md-6">
                                    <TextField
                                        id="datetime-local"
                                        label="Next appointment"
                                        // defaultValue="2017-05-24T10:30"
                                        error={errors.time}
                                        type="datetime-local"
                                        className={classes.textField} 
                                        InputLabelProps={{shrink: true}} 
                                        onChange={(e)=>{settime(e.target.value)}}
                                    />
                                    {
                                        errors.time?
                                        <p className="text-danger"> {errors.time} </p>:''
                                    }
                                </div>
                                <div className="col-md-6">
                                    <TextField type="text" onChange={(e)=>{setTitle(e.target.value)}}  error={errors.title} className="from-control" id="standard-basic" label="Title" />
                                    {
                                        errors.title?
                                        <p className="text-danger"> {errors.title} </p>:''
                                    }
                                </div>
                                
                                <div className="col-md-6">
                                    <TextField type="text" onChange={(e)=>{setTeacher(e.target.value)}}  error={errors.teacher} className="from-control" id="standard-basic" label="Teacher Name" />
                                    {
                                        errors.teacher?
                                        <p className="text-danger"> {errors.teacher} </p>:''
                                    }
                                </div>
                                <div className="col-md-6">
                                    <TextField type="text" onChange={(e)=>{setClassroom(e.target.value)}}  error={errors.className} className="from-control" id="standard-basic" label="Class Room" />
                                    {
                                        errors.classroom?
                                        <p className="text-danger"> {errors.classroom} </p>:''
                                    }
                                </div>
                                <div className="col-md-6">
                                    <TextField type="text" onChange={(e)=>{setSchoolsubject(e.target.value)}}  error={errors.schoolsubject} className="from-control" id="standard-basic" label="School Subject" />
                                    {
                                        errors.schoolsubject?
                                        <p className="text-danger"> {errors.schoolsubject} </p>:''
                                    }
                                </div>
                            </div>
                        </form>
                        <div style={{alignItems:"center"}}>
                        
                            <Button onClick={onSubmit} variant="contained" color="secondary" className="mt-5 mb-3">Create</Button>
                            <Link to='/home'>
                                    <Button variant="contained" color="primary" className="mt-5 mb-3 ml-5">Back</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CreatePost