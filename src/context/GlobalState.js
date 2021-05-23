import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

// Initial State
const initialState = {
  groceryItems: [],
  modalState: '',
  isLoading: true,
  isError: false,
}

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const getGroceryItems = () => {
    axios
      .get("http://localhost:8000/groceryItems")
      .then(res => {
        dispatch({
          type: 'GET_GROCERY_ITEMS',
          payload: res.data
        })
      })
      .catch(() => {
        dispatch({
          type: 'ERROR',
          payload: true
        })
      });
  }

  const addGroceryItem = item => {
    axios
      .post("http://localhost:8000/groceryItems", item, config)
      .then(res => {
        dispatch({
          type: 'ADD_GROCERY_ITEM',
          payload: res.data
        })
      })
      .catch(() => {
        dispatch({
          type: 'ERROR',
          payload: true
        })
      });
  }

  const deleteGroceryItem = (id) => {
    axios
      .delete(`http://localhost:8000/groceryItems/${id}`)
      .then(res => {
        dispatch({
          type: 'DELETE_GROCERY_ITEM',
          payload: id
        })
      })
      .catch(() => {
        dispatch({
          type: 'ERROR',
          payload: true
        })
      });
  }

  const updateGroceryItem = (updatedItem) => {
    axios
      .put(`http://localhost:8000/groceryItems/${updatedItem.id}`, updatedItem, config)
      .then(res => {
        dispatch({
          type: 'UPDATE_GROCERY_ITEM',
          payload: updatedItem
        })
      })
      .catch(() => {
        dispatch({
          type: 'ERROR',
          payload: true
        })
      });
  }

  const toggleModal = toggleModalState => {
    dispatch({
      type: 'TOGGLE_MODAL',
      payload: toggleModalState
    });
  }

  return (<GlobalContext.Provider value={{
    groceryItems: state.groceryItems,
    modalState: state.modalState,
    isLoading: state.isLoading,
    isError: state.isError,
    getGroceryItems,
    deleteGroceryItem,
    addGroceryItem,
    updateGroceryItem,
    toggleModal
  }}>
    {children}
  </GlobalContext.Provider>);
}