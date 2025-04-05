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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import axios from '../../axios/axiosConfig'; // Import the axios instance
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

const ResidentList = ({ residents, fetchResidents }) => {

  const handleDelete = async (rowId) => {
    console.log(`Attempting to delete resident with row ID: ${rowId}`);
    try {
      const response = await axios.delete(`/delete_resident/${rowId}`);
      console.log('Delete response:', response);
      fetchResidents(); // Refresh the resident list after deletion
    } catch (error) {
      console.error('Error deleting resident:', error);
    }
  };

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
              <StyledTableCell>Children (Under 16)</StyledTableCell>
              <StyledTableCell>Elderly (60+)</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Skills</StyledTableCell>
              <StyledTableCell>Newsletter</StyledTableCell>
              <StyledTableCell>WhatsApp Alerts</StyledTableCell>
              <StyledTableCell>Volunteer</StyledTableCell>
              <StyledTableCell align="right">Profile Link</StyledTableCell>
              <StyledTableCell align="right">Delete Resident</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {residents.map((resident, index) => {
              const email = resident["Preferred Email address if not Google"] || resident["Email Address"];
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {resident["Name of main point of contact (ex. John Smith)"] || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>{email || "N/A"}</StyledTableCell>
                  <StyledTableCell>{resident["Address"] || "N/A"}</StyledTableCell>
                  <StyledTableCell>{resident["Number of Residents in Household"] || "N/A"}</StyledTableCell>
                  <StyledTableCell>{resident["How many said residents are children (Under 16 years of age)"] || "0"}</StyledTableCell>
                  <StyledTableCell>{resident["How many said residents are elderly (60 years +)?"] || "0"}</StyledTableCell>
                  <StyledTableCell>+{resident["Phone Number"] || "N/A"}</StyledTableCell>
                  <StyledTableCell>{resident["Skills"] || "N/A"}</StyledTableCell>
                  <StyledTableCell>{resident["Want to be added to the Monthly Newsletter email chain?"] || "N/A"}</StyledTableCell>
                  <StyledTableCell>{resident["Would you like to receive important WhatsApp alerts?"] || "N/A"}</StyledTableCell>
                  <StyledTableCell>{resident["Would you like to volunteer?"] || "N/A"}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Link to={`/profile/${index}`}>
                      View Profile
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton onClick={() => handleDelete(index + 2)} aria-label="delete" style={{ color: red[500] }}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ResidentList;
