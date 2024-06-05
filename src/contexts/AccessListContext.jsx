import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utility/AxiosInstances';
// Create a context
const AccessListContext = createContext();

// Create a provider component
export const AccessListProvider = ({ children }) => {
  // Sample data for the table
  const [accessList, setAccessList] = useState([]);

  // Fetch guests when the provider mounts
  useEffect(() => {
      fetchGuests();
    }, []);

  // Function to add a new access item
  const addAccessItem = (newItem) => {
    setAccessList((prevList) => [...prevList, { ...newItem, no: prevList.length + 1 }]);
  };

  // Function to delete an access item by `no`
  const deleteAccessItem = (no) => {
    setAccessList((prevList) => prevList.filter((item) => item.no !== no));
  };

  const uploadPhoto = async (photoFile) => {
    try {
        const formData = new FormData();
        formData.append('photo', photoFile);

        const response = await axiosInstance.post('/upload-photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.url; // Return the public URL of the uploaded photo
    } catch (error) {
        console.error('Error uploading photo:', error);
        throw error;
    }
  };

    // Function to add a new guest item
    const addGuest = async (newItem) => {
      try {
        // Post the new item to the backend
        const response = await axiosInstance.post('/tamu', {...newItem});
        // Add the new item to the local state
        fetchGuests()
      } catch (error) {
        console.error('Error adding guest:', error);
        throw error;
      }
    };


  // Function to fetch guests from the backend
  const fetchGuests = async () => {
    try {
      const response = await axiosInstance.get('/tamu');
      setAccessList(response.data);
    } catch (error) {
      console.error('Error fetching guests:', error);
      throw error;
    }
  };



  return (
    <AccessListContext.Provider value={{ accessList, addAccessItem, deleteAccessItem, uploadPhoto, addGuest, fetchGuests }}>
      {children}
    </AccessListContext.Provider>
  );
};

// Custom hook to use the AccessListContext
export const useAccessList = () => {
  return useContext(AccessListContext);
};
