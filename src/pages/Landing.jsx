import React from 'react';
import { Navigate } from 'react-router-dom';

const Landing = () => {
    // For now, redirect to the Providers search as the landing experience
    return <Navigate to="/providers" replace />;
};

export default Landing;
