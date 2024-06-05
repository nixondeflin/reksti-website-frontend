import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utility/AxiosInstances';
import dayjs from 'dayjs';

// Create a context
const AccessListContext = createContext();

// Create a provider component
export const AccessListProvider = ({ children }) => {
  const [accessList, setAccessList] = useState([]);
  const [filteredAccessList, setFilteredAccessList] = useState([]);

  useEffect(() => {
    fetchGuests();
  }, []);

  useEffect(() => {
    filterByDay(dayjs());
  }, [accessList]);

  const addAccessItem = (newItem) => {
    setAccessList((prevList) => [...prevList, { ...newItem, no: prevList.length + 1 }]);
  };

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

  const addGuest = async (newItem) => {
    try {
      await axiosInstance.post('/tamu', { ...newItem });
      fetchGuests();
    } catch (error) {
      console.error('Error adding guest:', error);
      throw error;
    }
  };

  const fetchGuests = async () => {
    try {
      const response = await axiosInstance.get('/tamu');
      setAccessList(response.data);
      setFilteredAccessList(response.data);
    } catch (error) {
      console.error('Error fetching guests:', error);
      throw error;
    }
  };

  const updateGuestStatus = async (no) => {
    try {
      await axiosInstance.patch(`/tamu/${no}/status`);
      fetchGuests();
    } catch (error) {
      console.error('Error updating guest status:', error);
      throw error;
    }
  };

  const deleteGuest = async (no) => {
    try {
      await axiosInstance.delete(`/tamu/${no}`);
      fetchGuests();
    } catch (error) {
      console.error('Error deleting guest:', error);
      throw error;
    }
  };

  const filterByDay = (date) => {
    const selectedDate = dayjs(date).startOf('day');
    const filtered = accessList.filter((item) =>
      dayjs(item.Datetime).startOf('day').isSame(selectedDate.add(1, 'day'), 'day')
    );
    setFilteredAccessList(filtered);
  };
  

  const filterByWeek = (date) => {
    const startOfWeek = dayjs(date).startOf('week');
    const endOfWeek = dayjs(date).endOf('week');
    const filtered = accessList.filter((item) =>
      dayjs(item.Datetime).isAfter(startOfWeek) && dayjs(item.Datetime).isBefore(endOfWeek)
    );
    setFilteredAccessList(filtered);
  };

  const sortAccessList = (field, order = 'asc') => {
    const sorted = [...filteredAccessList].sort((a, b) => {
      if (order === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setFilteredAccessList(sorted);
  };

  return (
    <AccessListContext.Provider value={{
      accessList,
      filteredAccessList,
      addAccessItem,
      deleteAccessItem,
      uploadPhoto,
      addGuest,
      fetchGuests,
      updateGuestStatus,
      deleteGuest,
      filterByDay,
      filterByWeek,
      sortAccessList
    }}>
      {children}
    </AccessListContext.Provider>
  );
};

// Custom hook to use the AccessListContext
export const useAccessList = () => {
  return useContext(AccessListContext);
};
