import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import ProtectedRoute from './pages/admin/ProtectedRoute';
import AdminPage from './pages/admin';
import News from './pages/admin/news';
import AddNews from './pages/admin/news/add';
import EditNews from './pages/admin/news/edit';
import Excursions from './pages/admin/excursions';
import AddExcursion from './pages/admin/excursions/add';
import EditExcursion from './pages/admin/excursions/edit';
import Gallery from './pages/gallery';
import Partners from './pages/admin/partners';
import AddPartner from './pages/admin/partners/add';
import EditPartner from './pages/admin/partners/edit';
import Contacts from './pages/admin/contacts';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="admin/*" element={<AdminPage />}>
        <Route index element={<News />} />
        <Route path="news/add" element={<AddNews />} />
        <Route path="news/edit/:id" element={<EditNews />} />
        <Route path="excursions" element={<Excursions />} />
        <Route path="excursions/add" element={<AddExcursion />} />
        <Route path="excursions/edit/:id" element={<EditExcursion />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="partners" element={<Partners />} />
        <Route path="partners/add" element={<AddPartner />} />
        <Route path="partners/edit/:id" element={<EditPartner />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>
      {/* <Route element={<ProtectedRoute />}>
        <Route path="/add" element={<AddPost />} />
      </Route> */}
    </Routes>
  );
};

export default App;
