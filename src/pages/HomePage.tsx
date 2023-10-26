import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer/Footer';
import UnderFooter from '@/components/Footer/UnderFooter';
import Layout from '@/components/Layout';
import Gallery from '@/components/Gallery';
import { ModalProvider } from '@/components/ModalProvider';
import Excursions from '@/components/Excursions/Excursions';

const HomePage = () => {
  return (
    <Layout>
      <Header />
      <Hero />
      <Excursions />
      <Gallery />
      <Footer />
      <UnderFooter />
      <ModalProvider />
    </Layout>
  );
};

export default HomePage;
