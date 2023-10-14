import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const isAuthenticated = false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
