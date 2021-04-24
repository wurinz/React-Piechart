import React, { useEffect } from 'react';
import { useState } from 'react'

const Field = (
    {updateItems, id}
) => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [deleteId, setDeleteId] = useState(null)

   

    const handleChange = (event, type) => {
        if(type === 'name'){
            setName(event.target.value);
        } else if (type === 'quantity'){
            Number.isNaN(parseInt(event.target.value)) === false || event.target.value === '' ? setQuantity(event.target.value) : alert("Enter a number");
            setQuantity(event.target.value);
        }
    }
    const handleRemove = (id) => {
        setDeleteId(id);
    }

    useEffect(() => {     //compoentDidUpdate
        updateItems({name, quantity, id, deleteId});
        setDeleteId(null);
    }, [name, quantity, deleteId])

    return(
        <div>
            <form className="add_item_form">
                <div className="field">
                    <label>Name</label>
                    <input
                        className="input" 
                        type="text"
                        name="name"
                        placeholder="Enter a name"
                        value={name} //NEEDS TO BE CHECKED
                        onChange={(e) => handleChange(e, "name")}
                    />
                </div>
                <div className="field">
                    <label>Quantity</label>
                    <input
                        className="input"
                        type="number"
                        name="quantity"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => handleChange(e, "quantity")}
                    />
                </div>
                <button onClick={(event) => {
                        event.preventDefault();
                        handleRemove(id);
                }}>Delete item</button>
            </form>
        </div>
    )
}

export default Field;