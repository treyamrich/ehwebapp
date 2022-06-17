import React, { useState, useEffect } from 'react';
import '../../styles/inventory.css';

const i0 = {
    id: 0,
    code: "DCP21013",
    name: "Black 10x13 Plaque",
    category: "Plaque",
    remainQty: 0,
    qtyThresh: 4,
    price: 15.59,
    cost: 5.29,
    maxAddon: 5,
    description: "None"
};
const i1 = {
    id: 2,
    code: "DCP31013",
    name: "Walnut 10x13 Plaque",
    category: "Plaque",
    remainQty: 0,
    qtyThresh: 4,
    price: 15.59,
    cost: 5.29,
    maxAddon: 5,
    description: "None"
};
const i2 = {
    id: 3,
    code: "DCP11013",
    name: "Cherry 10x13 Plaque",
    category: "Plaque",
    remainQty: 0,
    qtyThresh: 4,
    price: 15.59,
    cost: 5.29,
    maxAddon: 5,
    description: "None"
};
const inventory = [i0, i1, i2];

function ManageInventory({isAdmin}) {
    /*
    if(!isAdmin) {
        return <h1 style={{marginTop: "100px"}}>This page is not available.</h1>;
    }*/
    return (
        <div>
            <h1>Inventory Management</h1>
            <div class="main-inventory-wrapper">
                <div class="inventory-tool-bar">
                    <label>Search:</label>
                    <input type="text"/>
                    <button>Find</button>
                    <select>
                        <option>Actions</option>
                        <option>Delete Items</option>
                        <option>Add Item</option>
                        <option>Import from CSV</option>
                        <option>Export to CSV</option>
                    </select>
                </div>
                <table class="inventory-items">
                    <tr>
                        <th>ID</th>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Cost</th>
                        <th>Category</th>
                        <th>Qty.</th>
                        <th>Reorder Threshold</th>
                        <th>Max Add-ons</th>
                        <th>Description</th>
                    </tr>
                    {inventory.length === 0 ? <h2 style={{padding: "10px", textAlign:"center"}}> No items </h2> : null}
                    {
                        inventory.map((item, index) => (
                            <tr key={index}>
                                <td> {item.id} </td>
                                <th> {item.code} </th>
                                <th> {item.name} </th>
                                <th> {item.price} </th>
                                <th> {item.cost} </th>
                                <th> {item.category} </th>
                                <th> {item.remainQty} </th>
                                <th> {item.qtyThresh} </th>
                                <th> {item.maxAddon} </th>
                                <th> {item.description} </th>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    );
}

export default ManageInventory;