import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
const PrivateComponent = () => {
    const [authenticated, setAuthenticated] = useState(null);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("authToken")}`
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log("Authentication successful");
            setAuthenticated(true);
          } else {
            const errorData = await response.json();
            console.log('Error Data:', errorData);
  
            if (errorData.name === 'TokenExpiredError') {
              console.log('Token Expired');
            } else {
              console.log('Authentication failed');
            }
  
            setAuthenticated(false);
          }
        } catch (error) {
          console.error('Error:', error);
          setAuthenticated(false);
        }
      };
  
      checkAuth();
    }, []);
  
    if (authenticated === null) {
      // Still checking authentication, you can render a loading spinner or component here
      return null;
    }
  
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  
export default PrivateComponent;
