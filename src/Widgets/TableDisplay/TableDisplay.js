import React from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";

function TableDisplay(props) {
  const handleEditClick = (id) => {
    props.onEdit(id);
  };

  const handleDeleteClick = (id) => {
    props.onDelete(id);
  };

  const generateRandomColor = (Fname, lname) => {
    const length_of_string = (Fname + " " + lname).length;
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const generateNameInital = (Fname, lname) => {
    const initial = Fname.substring(0, 1) + lname.substring(0, 1);
    return initial.toUpperCase();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Avatar
                    sx={{
                      bgcolor: generateRandomColor(row.Firstname, row.Lastname),
                    }}
                  >
                    {generateNameInital(row.Firstname, row.Lastname)}
                  </Avatar>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.Firstname + " " + row.Lastname}
                </TableCell>
                <TableCell>{row.Email}</TableCell>
                <TableCell>{row.Password}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      handleEditClick(row.id);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      handleDeleteClick(row.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableDisplay;
