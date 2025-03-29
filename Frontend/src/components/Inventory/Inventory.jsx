import React, { useState, useEffect } from 'react';
import axios from '../../axios/axiosConfig';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setnewItemQuantity] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [updatedQuantity, setUpdatedQuantity] = useState(0);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('/get_inventory');
            if (response.status === 200) {
                const data = await response.data;
                setItems(data);
            } else {
                console.error("Error fetching inventory:", response.statusText);
                alert("Failed to fetch inventory.");
            }
        } catch (error) {
            console.error("Error fetching inventory:", error);
            alert("Failed to fetch inventory.");
        }
    }

    const addInventoryItem = async () => {
        if (!newItemName || !newItemQuantity) {
            alert("Please provide both item name and quantity.");
            return;
        }

        try {
            const response = await axios.post('/add_inventory_item', {
                "Item name": newItemName,
                "Quantity": newItemQuantity,
            });

            if (response.status === 201) {
                alert("Item added successfully!");
                fetchInventory(); // Refresh the inventory list
                setNewItemName('');
                setnewItemQuantity('');
            } else {
                console.error("Error adding item:", response.data);
                alert("Failed to add item.");
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const updateInventoryItem = async () => {
        if (!updatedQuantity) {
            alert("Please provide a valid quantity.");
            return;
        }

        try {
            const response = await axios.put(`/update_inventory_item/${selectedRowId}`, {
                "Item name": items.find((item, index) => index + 2 === selectedRowId)["Item Name"],
                "Quantity": updatedQuantity,
            });

            if (response.status === 200) {
                alert("Item updated successfully!");
                fetchInventory();
                handleCloseDialog();
            } else {
                console.error("Error updating item:", response.data);
                alert("Failed to update item.");
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const deleteInventoryItem = async (rowId) => {
        try {
            const response = await axios.delete(`/delete_inventory_item/${rowId}`);
            if (response.status === 200) {
                alert("Item deleted successfully!");
                fetchInventory(); // Refresh the inventory list
            } else {
                console.error("Error deleting item:", response.data);
                alert("Failed to delete item.");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleOpenDialog = (rowId, itemName, currentQuantity) => {
        setSelectedRowId(rowId);
        setUpdatedQuantity(currentQuantity);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRowId(null);
        setUpdatedQuantity(0);
    };

    useEffect(() => {
        fetchInventory();
    }
        , []);


    return (
        <div>
            <hr></hr>
            <h1>Inventory:</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Item Name</b></TableCell>
                            <TableCell><b>Quantity</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item["Item Name"]}</TableCell>
                                <TableCell>{item["Quantity"]}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => deleteInventoryItem(index + 2)}
                                    >
                                        Remove
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => handleOpenDialog(index + 2, item["Item Name"], item["Quantity"])}
                                    >
                                        Update Quantity
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ marginTop: '20px' }}>
                <h1>
                    Add New Item:
                </h1>
                <br></br>
                <TextField
                    label="Item Name"
                    variant="outlined"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Quantity"
                    type="number"
                    variant="outlined"
                    value={newItemQuantity}
                    onChange={(e) => setnewItemQuantity(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <Button variant="contained" color="primary" onClick={addInventoryItem}>
                    Add Item
                </Button>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Update Quantity</DialogTitle>
                <DialogContent>
                    <TextField
                        label="New Quantity"
                        type="number"
                        variant="outlined"
                        value={updatedQuantity}
                        onChange={(e) => setUpdatedQuantity(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={updateInventoryItem} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Inventory;
