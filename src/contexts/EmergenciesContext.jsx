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

  const deleteEmergency = async (id) => {
    try {
      await axiosInstance.delete(`/emergencies/${id}`);
      setEmergencies((prev) => prev.filter((emergency) => emergency.EmergencyID !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <EmergenciesContext.Provider value={{ emergencies, loading, error, deleteEmergency }}>
      {children}
    </EmergenciesContext.Provider>
  );
};

export const useEmergencies = () => useContext(EmergenciesContext);
