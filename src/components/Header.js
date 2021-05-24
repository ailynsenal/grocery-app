import React, { useState, useContext } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { GlobalContext } from '../context/GlobalState';

import { ModalComponent } from './ModalComponent';

export const Header = () => {
  const [ filterStatus, setFilterStatus ] = useState('all');
  const [ filterValue, setFilterValue ] =  useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const { toggleModal, modalState, filterGroceryItems, getGroceryItems, searchGroceryItem } = useContext(GlobalContext);

  const handleFilterStatus = e => {
    let selected = e.target.value;

    setFilterStatus(selected);
    switch(selected) {
      case 'done':
        setFilterValue(true);
        filterGroceryItems(searchTerm, true);
        break;
      case 'pending':
        setFilterValue(false);
        filterGroceryItems(searchTerm, false);
        break;
      default:
        getGroceryItems(searchTerm);
    }
  }

  const handleSearch = (e) => {
    let search = e.target.value;

    setSearchTerm(search)
    searchGroceryItem(search, filterValue);
  }

  return (
    <>
      <div className="inline-flex items-center bg-cyan-500 w-full p-2">
        <h1 className="header-title font-serif font-bold text-cyan-100 text-2xl text-center w-full">My Grocery List</h1>
        <div className="text-cyan-100 hover:text-cyan-700 m-3" onClick={() => toggleModal('ADD')}>
          <MdAdd size="2em" />
        </div>
        { modalState === 'ADD' && 
          <ModalComponent />
        }
      </div>
      <div className="header-controls flex sm:flex-row md:justify-between p-3">
        <div className="inline-flex">
          <label className="font-semibold"> Search:
            <input type="text" 
              onChange={handleSearch} 
              value={searchTerm}
              placeholder="Search"
              className="pl-2 p-1 ml-3 border border-cyan-600 hover:border-cyan-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-cyan-500 rounded text-sm text-gray-700" />
          </label>
        </div>
        <label className="font-semibold"> View:
          <select className="filter-status ml-3 pl-2 p-1 border border-cyan-600 hover:border-cyan-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-cyan-500 rounded text-sm text-gray-700" value={filterStatus} onChange={handleFilterStatus}>
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="pending">Pending</option>
          </select>
        </label>
      </div>
    </>
  )
}
 