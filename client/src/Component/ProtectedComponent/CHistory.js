import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Navbar from './Navbar'
import queryString from 'query-string'
import { Button } from '@material-ui/core';
import { useRecoilValue } from 'recoil'
import { userState } from '../../recoilState'
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function CHistory() {

  const classes = useStyles();
  const getUserInfo = useRecoilValue(userState)

  const [chistory, setChistory] = useState([])
  useEffect(() => {

    let qs = queryString.parse(window.location.search)
    Axios.get(`/chistory/${qs.uid}`)
      .then(res => {
        console.log(res.data);
        setChistory(res.data.history)
      })
      .catch(err => {
        return console.log(err);
      })
  }, [])
  const togglePayment = (id) => {
    Axios.get(`/togglePayment/${id}`)
      .then(updated => {

        let qs = queryString.parse(window.location.search)
        Axios.get(`/chistory/${qs.uid}`)
          .then(res => {
            console.log(res.data);
            setChistory(res.data.history)
          })
          .catch(err => {
            return console.log(err);
          })
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }
  return (
    <div >
      <Navbar title= {getUserInfo.type==='user'?'My History':'User History'} />
      <div className="col-md-8 offset-md-2 mt-5">
        <h3 className="text-info text-center mb-4"> {getUserInfo.type==='user'?'My History':'User History'} </h3>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Charge Point Name </TableCell>
                <TableCell align="right">Charging Time</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Payment Status</TableCell>
                <TableCell align="right">{getUserInfo.type === 'admin' ? "Update Payment Status" : "Charging Status"}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>


              {
                chistory.length < 1 ?
                  <h3 className="text-center text-danger">Empty History</h3>
                  : ''
              }
              {chistory.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.chargerInfo[0].chargerInformation.cpName}</TableCell>
                  <TableCell align="right">{row.chargeTime} (Hours)</TableCell>
                  <TableCell align="right">{row.cost}$</TableCell>
                  <TableCell align="right"> {row.paid ? <Button variant="outlined" color="primary" size="small">Paid</Button> : <Button variant="outlined" color="secondary" size="small">Not Paid</Button>} </TableCell>
                  {
                    getUserInfo.type === 'admin' ?
                      <TableCell align="right"> {row.paid ? <Button onClick={() => { togglePayment(row._id) }} variant="outlined" color="secondary" size="small">Undo</Button> : <Button onClick={() => { togglePayment(row._id) }} variant="outlined" color="primary" size="small">Mark as Paid</Button>} </TableCell>
                      :
                      
                      <TableCell align="right"><Link to={`/charging/?cid=${row._id}`}><Button variant="outlined" color="primary" size="small">Check</Button></Link></TableCell>

                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" className="mt-4" color="secondary" size="small" onClick={() => window.history.back()}>Back</Button>
      </div>
    </div>


  );
}
