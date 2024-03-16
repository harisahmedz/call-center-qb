// utils/withAuth.js
import React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter();
      const token = Cookies.get('token');

      // If there's no token (user not logged in) and the pathname is not '/login', redirect to '/login'
      if (!token && Router.pathname !== '/pages/login/') {
        Router.replace('/pages/login/');
        
        return null;
      }

      // If there's a token (user logged in) and the pathname is '/login', redirect to home page or dashboard
      if (token && Router.pathname === '/pages/login/') {
        Router.replace('/'); // Replace with path to the user's home page or dashboard

        return null;
      }

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};
