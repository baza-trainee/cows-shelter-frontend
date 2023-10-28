import Contacts from '@/components/Contacts/Contacts';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer/Footer';
import UnderFooter from '@/components/Footer/UnderFooter';
import Layout from '@/components/Layout';
import Gallery from '@/components/Gallery/Gallery';
import { ModalProvider } from '@/components/ModalProvider';
import Partners from '@/components/Partners';
import News from '@/components/News';

const HomePage = () => {
  return (
    <Layout>
      <Header />
      <Hero />
      <Gallery />
      <News />
      <Partners />
      <Contacts />
      <Footer />
      <UnderFooter />
      <ModalProvider />
    </Layout>
  );
};

export default HomePage;
