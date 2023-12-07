import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import AdminPage from './pages/admin';
import News from './pages/admin/news';
import AddNews from './pages/admin/news/add';
import EditNews from './pages/admin/news/edit';
import Excursions from './pages/admin/excursions';
import AddExcursion from './pages/admin/excursions/add';
import EditExcursion from './pages/admin/excursions/edit';
import Gallery from './pages/admin/gallery';
import Partners from './pages/admin/partners';
import AddPartner from './pages/admin/partners/add';
import EditPartner from './pages/admin/partners/edit';
import Contacts from './pages/admin/contacts';
import SignIn from './pages/admin/login/signIn';
import Reviews from './pages/admin/reviews';
import AddReviews from './pages/admin/reviews/add';
import EditReviews from './pages/admin/reviews/edit';
import NewPassword from './pages/admin/login/newPassword';
import ResetPassword from './pages/admin/login/resetPassword';
import Pdf from './pages/admin/pdf';
import PdfDisplay from './pages/PdfDisplay';
import AddContacts from './pages/admin/contacts/add';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<SignIn />} />
      <Route path="reset/:token" element={<ResetPassword />} />
      <Route path="pdf/:id" element={<PdfDisplay />} />
      <Route element={<ProtectedRoute />}>
        <Route path="admin/*" element={<AdminPage />}>
          <Route index element={<News />} />
          <Route path="news/add" element={<AddNews />} />
          <Route path="news/edit/:id" element={<EditNews />} />
          <Route path="excursions" element={<Excursions />} />
          <Route path="excursions/add" element={<AddExcursion />} />
          <Route path="excursions/edit/:id" element={<EditExcursion />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="reviews/add" element={<AddReviews />} />
          <Route path="reviews/edit/:id" element={<EditReviews />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="partners" element={<Partners />} />
          <Route path="partners/add" element={<AddPartner />} />
          <Route path="partners/edit/:id" element={<EditPartner />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="contacts/add" element={<AddContacts />} />
          <Route path="newpaswword" element={<NewPassword />} />
          <Route path="pdf" element={<Pdf />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
