import { Outlet, Navigate } from 'react-router-dom';
import { token } from './login/fetchin/fetchin';

const ProtectedRoute = () => {
  const user = localStorage.getItem('user');
  const { access_token } = JSON.parse(user as string) ?? {};

  if (!access_token) {
    return <Navigate to="/login" replace />;
  } else {
    token.set(access_token);
  }

  return <Outlet />;
};

export default ProtectedRoute;
