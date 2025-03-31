import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
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
  const [newGroupName, setNewGroupName] = useState('');
  const [newNumbers, setNewNumbers] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingNumbers, setEditingNumbers] = useState('');


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

  const addGroup = async () => {
    if (!newGroupName || !newNumbers) {
      alert('Please provide both group name and phone numbers.');
      return;
    }

    try {
      await axios.post('/add_contact_group', {
        Group_Name: newGroupName,
        Phone_Numbers: newNumbers,
      });
      fetchContactGroups(); // Refresh the group list after adding
      setNewGroupName('');
      setNewNumbers('');
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  const updateGroupName = async (index, newName) => {
    const updatedGroups = [...groups];
    const originalName = updatedGroups[index].Group_Name;
    updatedGroups[index].Group_Name = newName;

    try {
      await axios.put(`/update_contact_group/${index + 2}`, {
        Group_Name: newName,
        Phone_Numbers: updatedGroups[index].Phone_Numbers,
      });
      fetchContactGroups(); // Refresh the group list after updating
    } catch (error) {
      console.error('Error updating group name:', error);
      updatedGroups[index].Group_Name = originalName; // Revert on failure
    }
  };

  const updateGroupNumbers = async (index, newNumbers) => {
    const updatedGroups = [...groups];
    const originalNumbers = updatedGroups[index].Phone_Numbers;
    updatedGroups[index].Phone_Numbers = newNumbers;

    try {
      await axios.put(`/update_contact_group/${index + 2}`, {
        Group_Name: updatedGroups[index].Group_Name,
        Phone_Numbers: newNumbers,
      });
      fetchContactGroups(); // Refresh the group list after updating
    } catch (error) {
      console.error('Error updating phone numbers:', error);
      updatedGroups[index].Phone_Numbers = originalNumbers; // Revert on failure
    }
  };

  const handleDoubleClickName = (index) => {
    setEditingIndex(index);
    setEditingName(groups[index].Group_Name);
  };

  const handleDoubleClickNumbers = (index) => {
    setEditingIndex(index);
    setEditingNumbers(groups[index].Phone_Numbers.toString()); // Convert to string for editing
  };

  const handleBlurName = (index) => {
    if (editingName.trim() !== '') {
      updateGroupName(index, editingName);
    }
    setEditingIndex(null);
    setEditingName('');
  };

  const handleBlurNumbers = (index) => {
    if (editingNumbers.trim() !== '') {
      updateGroupNumbers(index, editingNumbers);
    }
    setEditingIndex(null);
    setEditingNumbers('');
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

                <StyledTableCell onDoubleClick={() => handleDoubleClickName(index)}>
                  {editingIndex === index ? (
                    <TextField
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={() => handleBlurName(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleBlurName(index);
                      }}
                      autoFocus
                    />
                  ) : (
                    group.Group_Name
                  )}
                </StyledTableCell>

                <StyledTableCell onDoubleClick={() => handleDoubleClickNumbers(index)}>
                  {editingIndex === index ? (
                    <TextField
                      value={editingNumbers}
                      onChange={(e) => setEditingNumbers(e.target.value)}
                      onBlur={() => handleBlurNumbers(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleBlurNumbers(index);
                      }}
                      autoFocus
                    />
                  ) : (
                    group.Phone_Numbers.split(",").map(num => `+${num.trim()}`).join(", ")
                  )}
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
      <div style={{ marginTop: '20px' }}>
        <h2>Add New Group</h2>
        <TextField
          label="Group Name"
          variant="outlined"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Phone Numbers (comma-separated)"
          variant="outlined"
          value={newNumbers}
          onChange={(e) => setNewNumbers(e.target.value.toString())}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={addGroup}>
          Add Group
        </Button>
      </div>
    </div>
  );
};

export default Groups;
