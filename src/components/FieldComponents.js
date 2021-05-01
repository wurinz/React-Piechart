import React from 'react';

const FieldComponents = ({
    items, updateItems, 
}) => {
    return (
        <div>
         <div className="field_components">{
            items.map((item) => {
              return <Field updateItems={updateItems} id={item.id} deleteItem={deleteItem} key={items.id} />
            })
         }</div>
             <div className="add_field_container">
               <button onClick={()=>{
                 addField();
               }}>ADD ITEM</button>
             </div>
       </div>
      )
}

export default FieldComponents;