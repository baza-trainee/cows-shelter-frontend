import Contacts from '@/components/Contacts/Contacts';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer/Footer';
import UnderFooter from '@/components/Footer/UnderFooter';
import Layout from '@/components/Layout';
import Gallery from '@/components/Gallery';
import { ModalProvider } from '@/components/ModalProvider';

const HomePage = () => {
  return (
    <Layout>
      <Header />
      <Hero />
      <Gallery />
       <Contacts />
      <Footer />
      <UnderFooter />
      <ModalProvider />
    </Layout>
  );
};

export default HomePage;
