import React from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./ResidentList.css"; // Add some styling

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ResidentList = ({ residents }) => {
  return (
    <div className="resident-list">
      <h1>Enrolled Residents</h1>
      <TableContainer component={Paper}>
        <Table>
        <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Number of Residents</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Skills</StyledTableCell>
              <StyledTableCell>Newsletter</StyledTableCell>
              <StyledTableCell>WhatsApp Alerts</StyledTableCell>
              <StyledTableCell>Volunteer</StyledTableCell>
              <StyledTableCell align="right">Profile Link</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {residents.map((resident, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {resident["Name of main point of contact (First, Last)"]}
                </StyledTableCell>
                <StyledTableCell>{resident["Email Address"]}</StyledTableCell>
                <StyledTableCell>{resident["Location (Address/Coordinates) of Home"]}</StyledTableCell>
                <StyledTableCell>{resident["Number of Residents"]}</StyledTableCell>
                <StyledTableCell>{resident["Phone Number for WhatsApp Communication (Include Area Code e.g \"1\" for U.S. Numbers)"]}</StyledTableCell>
                <StyledTableCell>{resident["Skills"]}</StyledTableCell>
                <StyledTableCell>{resident["Want to be added to the Monthly Newsletter email chain?"]}</StyledTableCell>
                <StyledTableCell>{resident["Would you like to receive important WhatsApp alerts?"]}</StyledTableCell>
                <StyledTableCell>{resident["Would you like to volunteer?"]}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/profile/${index}`}>
                    View Profile
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ResidentList;
