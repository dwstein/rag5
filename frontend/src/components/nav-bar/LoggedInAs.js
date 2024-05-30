import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../auth/auth';

const LoggedInAs = () => {
  const [userEmail, setUserEmail] = useState('Not Logged In');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.email) {
          setUserEmail(user.email);
        } else {
          setUserEmail('Not Logged In');
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        setUserEmail('Not Logged In');
      }
    };

    fetchUserEmail();
  }, []);

  return (
    <div className="navbar-item">
      <p className="has-text-weight-bold">Logged in as: <span className="has-text-info">{userEmail}</span></p>
    </div>
  );
};

export default LoggedInAs;
