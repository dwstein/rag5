import React from 'react';
import { useAuth } from '../../auth/AuthProvider';

const LoggedInAs = () => {
  const { user } = useAuth();


  return (
    <div className="navbar-item">
      <p className="has-text-weight-bold">
        Logged in as: <span className="has-text-info">{user ? user.email : 'Not Logged In'}</span>
      </p>
    </div>
  );
};

export default LoggedInAs;
