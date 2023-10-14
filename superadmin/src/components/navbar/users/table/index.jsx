// Table.js
import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';

const API_URL = "http://localhost:3100"; // Define your API URL here

const TableComponent = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/users/`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }) // Assuming your API endpoint for users is '/users/'
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error, "There was an error.");
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>No. Hp</TableCell>
            <TableCell>Alamat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
