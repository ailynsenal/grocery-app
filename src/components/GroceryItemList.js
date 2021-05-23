import React, { useContext, useEffect } from 'react';
import { ImSpinner } from "react-icons/im";
import { GlobalContext } from '../context/GlobalState';

import { GroceryItem } from './GroceryItem';

export const GroceryItemList = () => {
  const { groceryItems, isLoading, isError, getGroceryItems} = useContext(GlobalContext);

  useEffect(() => {
    getGroceryItems();
  }, []); 

  return (
    <>
      <ul className="item-list w-full p-4">
        { isLoading && !isError && groceryItems.length === 0 && 
          <ImSpinner className="animate-spin w-12 h-12 text-cyan-500 m-auto" />
        }
        { !isLoading && !groceryItems.length && !isError &&
          <span>No Items to display.</span>
        }
        { isLoading && !groceryItems.length && isError &&
          <span>Failed to load the items!</span>
        }
        { groceryItems.length > 0 && 
          groceryItems.map(groceryItem => (<GroceryItem key={groceryItem.id} groceryItem={groceryItem} />))
        }
      </ul>
    </>
  )
}
