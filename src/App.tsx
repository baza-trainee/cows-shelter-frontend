import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import MainPage from './pages/admin/MainPage';
import AddPost from './pages/admin/AddPost';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<MainPage />} />
        <Route path="/add" element={<AddPost />} />
      </Route>
    </Routes>
  );
};

export default App;
