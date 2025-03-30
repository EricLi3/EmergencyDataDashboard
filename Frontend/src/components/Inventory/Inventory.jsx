import React, { useState, useEffect } from 'react';
import axios from '../../axios/axiosConfig';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, TextField
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setnewItemQuantity] = useState(0);

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
    };

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

    const updateInventoryQuantity = async (rowId, newQuantity) => {
        if (newQuantity < 0) {
            alert("Quantity cannot be negative.");
            return;
        }

        // Optimistically update the UI
        const updatedItems = [...items];
        const itemIndex = rowId - 2; // Adjust index to match the array
        const originalQuantity = updatedItems[itemIndex]["Quantity"];
        updatedItems[itemIndex]["Quantity"] = newQuantity;
        setItems(updatedItems);

        try {
            const response = await axios.put(`/update_inventory_item/${rowId}`, {
                "Item name": updatedItems[itemIndex]["Item Name"],
                "Quantity": newQuantity,
            });

            if (response.status !== 200) {
                // Revert the change if the server request fails
                updatedItems[itemIndex]["Quantity"] = originalQuantity;
                setItems(updatedItems);
                console.error("Error updating item:", response.data);
                alert("Failed to update item.");
            }
        } catch (error) {
            // Revert the change if the server request fails
            updatedItems[itemIndex]["Quantity"] = originalQuantity;
            setItems(updatedItems);
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

    useEffect(() => {
        fetchInventory();
    }, []);

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
                                <TableCell>
                                    <Button
                                        onClick={() => updateInventoryQuantity(index + 2, item["Quantity"] - 1)}
                                        color="secondary"
                                        size="small"
                                    >
                                        <Remove />
                                    </Button>
                                    {item["Quantity"]}
                                    <Button
                                        onClick={() => updateInventoryQuantity(index + 2, item["Quantity"] + 1)}
                                        color="primary"
                                        size="small"
                                    >
                                        <Add />
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => deleteInventoryItem(index + 2)}
                                    >
                                        Remove
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
        </div>
    );
};

export default Inventory;
