import React from "react";
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
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import axios from '../../axios/axiosConfig'; // Import the axios instance

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

const Groups = ({ groups, fetchContactGroups }) => {

  const handleDelete = async (rowId) => {
    console.log(`Attempting to delete resident with row ID: ${rowId}`);
    try {
      const response = await axios.delete(`/delete_contact_group/${rowId}`);
      console.log('Delete response:', response);
      fetchContactGroups(); // Refresh the group list after deletion
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const saveToFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDownloadAll = () => {
    // Generate the content for all groups
    const txtContent = groups
      .map(group => {
        const formattedNumbers = group.Phone_Numbers.split(",").map(num => `+${num.trim()}`).join("\n");
        return `${formattedNumbers}`;
      })
      .join("\n\n");

    saveToFile(txtContent, "all_groups.txt");
  };

  const handleDownloadIndividual = (group) => {
    // Generate the content for a single group
    const formattedNumbers = group.Phone_Numbers.split(",").map(num => `+${num.trim()}`).join("\n");
    const txtContent = `${formattedNumbers}`;

    saveToFile(txtContent, `${group.Group_Name.replace(/\s+/g, "_")}.txt`);
  };

  return (
    <div className="group-list">
      <h1>Groups</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadAll}
        style={{ marginBottom: "20px" }}
      >
        Download All Groups as .txt
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Group Name</StyledTableCell>
              <StyledTableCell>Phone Numbers</StyledTableCell>
              <StyledTableCell align="right">Download</StyledTableCell>
              <StyledTableCell align="right">Delete Group</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {group.Group_Name}
                </StyledTableCell>
                <StyledTableCell>
                  {group.Phone_Numbers.split(",").map(num => `+${num.trim()}`).join(", ")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDownloadIndividual(group)}
                  >
                    Download
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => handleDelete(group.id)}
                    aria-label="delete"
                    style={{ color: red[500] }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Groups;
