import React, { useContext } from 'react';
import { MdAdd } from 'react-icons/md';
import { GlobalContext } from '../context/GlobalState';

import { ModalComponent } from './ModalComponent';

export const Header = () => {
  const { toggleModal, modalState } = useContext(GlobalContext);

  return (
    <div className="header-wrapper inline-flex items-center bg-cyan-500 w-full p-2">
      <h1 className="header-title font-serif font-bold text-cyan-100 text-2xl text-center w-full">My Grocery List</h1>
      <div className="text-cyan-100 hover:text-cyan-700 m-3" onClick={() => toggleModal('ADD')}>
        <MdAdd size="2em" />
      </div>
      { modalState === 'ADD' && 
        <ModalComponent />
      }
    </div>
  )
}
