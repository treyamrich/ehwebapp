import React, { useState, useEffect } from 'react';
import '../../styles/inventory.css';

const inventory = [1, 2, 3, 4];

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
                        <th>Category</th>
                        <th>Qty.</th>
                        <th>Reorder Threshold</th>
                        <th>Color</th>
                        <th>Size</th>
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
                                <th> {item.remainQty} </th>
                                <th> {item.price} </th>
                                <th> {item.cost} </th>
                                <th> {item.category} </th>
                                <th> {item.qtyThresh} </th>
                                <th> {item.color} </th>
                                <th> {item.size} </th>
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