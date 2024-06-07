import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utility/AxiosInstances';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [users,setUsers] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUserID(JSON.parse(userData).userId);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []); 

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/login', { Email:email, Password:password });
      if (response.status === 200) {
        const user = response.data;
        setUserID(user.userId);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Login failed. Please check your email and password.' };
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axiosInstance.post('/signup', { Email:email, Password:password });
      if (response.status === 201) {
        const user = response.data;
        return { success: true };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  const logout = () => {
    setUserID(null);
    localStorage.removeItem('user');
  };




  return (
    <AuthContext.Provider value={{ users,userID, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
