import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utility/AxiosInstances';

const EmergenciesContext = createContext();

export const EmergenciesProvider = ({ children }) => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await axiosInstance.get('/emergencies');
        setEmergencies(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmergencies();
  }, []);

  return (
    <EmergenciesContext.Provider value={{ emergencies, loading, error }}>
      {children}
    </EmergenciesContext.Provider>
  );
};

export const useEmergencies = () => useContext(EmergenciesContext);
