import React, { useEffect } from 'react';
import { useState } from 'react'

const Field = (
    {updateItems, id, deleteItem}
) => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleChange = (event, type) => {
        if(type === 'name'){
            setName(event.target.value);
        } else if (type === 'quantity'){
            Number.isNaN(parseInt(event.target.value)) === false || event.target.value === '' ? setQuantity(event.target.value) : alert("Enter a number");
            setQuantity(event.target.value);
        }
    }   

    useEffect(() => {     //compoentDidUpdate
        updateItems({name, quantity, id});
    }, [name, quantity])

    return(
            <div className="item">
                <div className="form">
                    <form>
                        <div className="input name"> 
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
                        <div className="input">
                            <label>Quantity</label>
                            <input
                                className="input"
                                type="number"
                                name="quantity"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) => handleChange(e, "quantity")}
                            />
                            <button className="delete_button button" onClick={(event) => {
                                event.preventDefault();
                                deleteItem(id);
                            }}>X</button>
                        </div>
                    </form>
                    
                </div>
            </div>
    )
}

export default Field;