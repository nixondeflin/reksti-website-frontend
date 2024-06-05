import React, { createContext, useState, useContext } from 'react';

// Create a context
const AccessListContext = createContext();

// Create a provider component
export const AccessListProvider = ({ children }) => {
  // Sample data for the table
  const [accessList, setAccessList] = useState([
    {
      no: 1,
      tamuID: 'AQ0001',
      cardID: 'ELIJA123',
      name: 'Damian Marvel',
      guestResident: 'Resident',
      tujuan: '45 E',
      dateTime: '4/6/24 23:00',
      fotoKTP: 'link photo',
      status: 'IN',
    },
  ]);

  // Function to add a new access item
  const addAccessItem = (newItem) => {
    setAccessList((prevList) => [...prevList, { ...newItem, no: prevList.length + 1 }]);
  };

  // Function to delete an access item by `no`
  const deleteAccessItem = (no) => {
    setAccessList((prevList) => prevList.filter((item) => item.no !== no));
  };

  return (
    <AccessListContext.Provider value={{ accessList, addAccessItem, deleteAccessItem }}>
      {children}
    </AccessListContext.Provider>
  );
};

// Custom hook to use the AccessListContext
export const useAccessList = () => {
  return useContext(AccessListContext);
};
