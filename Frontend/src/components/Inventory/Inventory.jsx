import React, { useState } from 'react';

// Use sheets API to provide adding new rows to the inventory and deleting from counts. 

const Inventory = () => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems([...items, item]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h1>Inventory</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item} <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addItem(`Item ${items.length + 1}`)}>Add Item</button>
        </div>
    );
};

export default Inventory;
