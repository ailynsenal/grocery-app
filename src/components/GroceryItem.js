import React, { useState, useContext } from 'react';
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { GlobalContext } from '../context/GlobalState';

import { ModalComponent } from './ModalComponent';

export const GroceryItem = ({ groceryItem }) => {
  const { deleteGroceryItem, updateGroceryItem, toggleModal, modalState } = useContext(GlobalContext);
  const [ isEdit, setEdit ] = useState(false);

  const toggleCheckbox = e => {
    let checked = e.target.checked;
    
    const updatedGroceryItem = {
      id: groceryItem.id,
      text: groceryItem.text,
      done: checked,
    }
    updateGroceryItem(updatedGroceryItem);
  }

  return (

    <>
      <li className="flex justify-between item p-0.5">
        { !isEdit &&
          <div>
            <input className="m-3" type="checkbox" 
              defaultChecked={groceryItem.done} 
              onChange={toggleCheckbox}/>
            <label className={groceryItem.done ? "m-1 line-through text-gray-400" : 'm-1' }>{groceryItem.text}</label>
          </div>
        }

        { isEdit && 
          <input type="text" value={groceryItem.text}/>
        }

        { modalState === groceryItem.id && 
          <ModalComponent groceryItem={groceryItem} />
        }
        
        <div className={groceryItem.done ? "flex disabled" : 'flex' }>
          <div className="text-cyan-500 hover:text-cyan-700 m-3"
            onClick={() => toggleModal(groceryItem.id)}>
            <MdEdit size="1.25em"/>
          </div>
          <div className="text-red-500 hover:text-red-600 m-3"
            onClick={() => deleteGroceryItem(groceryItem.id)}>
            <MdDeleteForever size="1.25em"/>
          </div>
        </div>
      </li>
    </>
  )
}
