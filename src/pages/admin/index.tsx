import Layout from '@/components/Layout';
import SideBar from '@/components/admin/SideBar';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <Layout>
      <div className="flex min-h-screen w-full">
        <SideBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
