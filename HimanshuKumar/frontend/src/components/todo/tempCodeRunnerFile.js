import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          // console.log('User Data:', data);
          setAuthenticated(true);
        } else {
          const errorData = await response.json();
          console.log('Error Data:', errorData);

          if (errorData.name === 'TokenExpiredError') {
            // Handle token expiration
            console.log('Token Expired');
          } else {
            // Handle other authentication errors
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
  

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateComponent;
