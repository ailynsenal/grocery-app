import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const ModalComponent = ({ groceryItem }) => {
  const [ item, setItem ] = useState(groceryItem ? groceryItem.text : '');
  const [ isEmptyField, setEmptyField ] = useState(false);

  const { addGroceryItem, updateGroceryItem, toggleModal } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();
    
    if (item === "") {
      setEmptyField(true);
      return;
    }

    if (groceryItem) {
      const updatedGroceryItem = {
        id: groceryItem.id,
        text: item,
        done: groceryItem.done,
      }
      updateGroceryItem(updatedGroceryItem);
    }
    else {
      const newGroceryItem = {
        id: Math.floor(Math.random()),
        text: item,
        done: false,
      }
      addGroceryItem(newGroceryItem);
    }
    toggleModal('');
  }

  const inputChange = e => {
    setItem(e.target.value);
    setEmptyField(false);
  }

  // this modal was adapted from what is available in tailwindcss component
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            {groceryItem ? 'Edit Item' : 'Add Item'}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              <input type="text" onChange={inputChange} value={item} className="pl-2 p-2 border-2 border-cyan-600 hover:border-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 rounded-lg sm:w-full" />
              {isEmptyField &&
                <div className="text-red-600 font-bold">Required. </div>
              }
            </p>
          </div>
        </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" 
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onSubmit}>
            {groceryItem ? 'Save' : 'Add'}
          </button>
          <button type="button"
            onClick={() => toggleModal('')}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
