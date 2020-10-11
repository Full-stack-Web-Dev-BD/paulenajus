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
import Navbar from '../ProtectedComponent/Navbar'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
export default function Users() {

  const classes = useStyles();

  const [users, setUsers] = useState([])
  useEffect(() => {
    Axios.get('/users')
      .then(res => {
        setUsers(res.data.users)
      })
      .catch(err => {
        return console.log(err);
      })
  },[])
  return (
    <div >
      <Navbar title="All Users"/>
      <div className="col-md-8 offset-md-2 mt-5">
        <h3 className="text-info text-center">All Users</h3>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>NAME </TableCell>
                <TableCell align="right">EMAIL</TableCell>
                <TableCell align="right">TYPE</TableCell>
                <TableCell align="right">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                users.length<1?
                <h3 className="text-center text-danger">Empty History</h3>
                :''
              }
              {users.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right"> <Link to={`/chistory/?uid=${row._id}`}>History</Link> </TableCell>
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
