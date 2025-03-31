import React, { useState, useEffect } from 'react';
import axios from '../../axios/axiosConfig';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, TextField, TableSortLabel
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setnewItemQuantity] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingName, setEditingName] = useState('');

    const fetchInventory = async () => {
        try {
            const response = await axios.get('/get_inventory');
            if (response.status === 200) {
                const data = await response.data;
                setItems(data);
                setFilteredItems(data); // Initialize filteredItems with the full inventory
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
        setFilteredItems(updatedItems); // Update filteredItems as well

        try {
            const response = await axios.put(`/update_inventory_item/${rowId}`, {
                "Item name": updatedItems[itemIndex]["Item Name"],
                "Quantity": newQuantity,
            });

            if (response.status !== 200) {
                // Revert the change if the server request fails
                updatedItems[itemIndex]["Quantity"] = originalQuantity;
                setItems(updatedItems);
                setFilteredItems(updatedItems); // Revert filteredItems as well
                console.error("Error updating item:", response.data);
                alert("Failed to update item.");
            }
        } catch (error) {
            // Revert the change if the server request fails
            updatedItems[itemIndex]["Quantity"] = originalQuantity;
            setItems(updatedItems);
            setFilteredItems(updatedItems); // Revert filteredItems as well
            console.error("Error updating item:", error);
        }
    };

    const updateItemName = async (index, newName) => {
        const updatedItems = [...items];
        const originalName = updatedItems[index]["Item Name"];
        updatedItems[index]["Item Name"] = newName;
        setItems(updatedItems);
        setFilteredItems(updatedItems); // Update filteredItems as well

        try {
            const response = await axios.put(`/update_inventory_item/${index + 2}`, {
                "Item name": newName,
                "Quantity": updatedItems[index]["Quantity"],
            });

            if (response.status !== 200) {
                // Revert the change if the server request fails
                updatedItems[index]["Item Name"] = originalName;
                setItems(updatedItems);
                setFilteredItems(updatedItems); // Revert filteredItems as well
                console.error("Error updating item name:", response.data);
                alert("Failed to update item name.");
            }
        } catch (error) {
            // Revert the change if the server request fails
            updatedItems[index]["Item Name"] = originalName;
            setItems(updatedItems);
            setFilteredItems(updatedItems); // Revert filteredItems as well
            console.error("Error updating item name:", error);
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

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === '') {
            // If the search query is empty, reset to the full list
            setFilteredItems(items);
        } else {
            // Filter items based on the search query
            const filtered = items.filter(item =>
                item["Item Name"].toLowerCase().includes(query)
            );
            setFilteredItems(filtered);
        }
    };

    const handleSort = () => {
        setIsAscending(!isAscending);
        const sortedItems = [...filteredItems].sort((a, b) => {
            if (isAscending) {
                return a["Item Name"].localeCompare(b["Item Name"]);
            } else {
                return b["Item Name"].localeCompare(a["Item Name"]);
            }
        });
        setFilteredItems(sortedItems);
    };

    const handleDoubleClick = (index) => {
        setEditingIndex(index);
        setEditingName(filteredItems[index]["Item Name"]);
    };

    const handleBlur = (index) => {
        if (editingName.trim() !== '') {
            updateItemName(index, editingName);
        }
        setEditingIndex(null);
        setEditingName('');
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <div>
            <hr></hr>
            <h1>Inventory:</h1>
            <TextField
                label="Search Items"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginBottom: '20px', width: '100%' }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={true}
                                    direction={isAscending ? 'asc' : 'desc'}
                                    onClick={handleSort}
                                >
                                    <b>Item Name</b>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell><b>Quantity</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell onDoubleClick={() => handleDoubleClick(index)}>
                                    {editingIndex === index ? (
                                        <TextField
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            onBlur={() => handleBlur(index)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleBlur(index);
                                            }}
                                            autoFocus
                                        />
                                    ) : (
                                        item["Item Name"]
                                    )}
                                </TableCell>
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
