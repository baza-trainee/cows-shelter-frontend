import Contacts from '@/components/Contacts/Contacts';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer/Footer';
import UnderFooter from '@/components/Footer/UnderFooter';
import Layout from '@/components/Layout';
import Gallery from '@/components/Gallery/Gallery';
import Partners from '@/components/Partners';

const HomePage = () => {
  return (
    <Layout>
      <Header />
      <Hero />
      <Gallery />
      <Partners />
      <Contacts />
      <Footer />
      <UnderFooter />
    </Layout>
  );
};

export default HomePage;
