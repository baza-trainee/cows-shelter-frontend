import Contacts from '@/components/Contacts/Contacts';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer/Footer';
import UnderFooter from '@/components/Footer/UnderFooter';
import Layout from '@/components/Layout';
import Excursions from '@/components/Excursions/Excursions';
import Gallery from '@/components/Gallery/Gallery';
import Partners from '@/components/Partners';
import FAQ from '@/components/FAQ';
import Support from '@/components/Support/Support';
import { useAppSelector } from '@/store/hook';
import { useEffect } from 'react';
import About from '@/components/About/About';

const HomePage = () => {
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  return (
    <Layout>
      <Header />
      <Hero />
      <About />
      <Excursions />
      <Gallery />
      <Partners />
      <Support />
      <FAQ />
      <Contacts />
      <Footer />
      <UnderFooter />
    </Layout>
  );
};

export default HomePage;
