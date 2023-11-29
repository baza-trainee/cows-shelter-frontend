import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { token } from './login/fetchin/fetchin';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const { access_token } = JSON.parse(user as string) ?? {};

  useEffect(() => {
    if (!access_token) {
      navigate('/');
    } else {
      token.set(access_token);
    }
  }, [navigate, access_token]);

  return <Outlet />;
};

export default ProtectedRoute;
