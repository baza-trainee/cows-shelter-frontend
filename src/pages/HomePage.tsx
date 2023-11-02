import Contacts from '@/components/Contacts/Contacts';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer/Footer';
import UnderFooter from '@/components/Footer/UnderFooter';
import Layout from '@/components/Layout';
import Excursions from '@/components/Excursions/Excursions';
import Gallery from '@/components/Gallery/Gallery';
import Partners from '@/components/Partners';
<<<<<<< HEAD
import News from '@/components/News';
=======
import FAQ from '@/components/FAQ';
import Support from '@/components/Support/Support';
import { useAppSelector } from '@/store/hook';
import { useEffect } from 'react';
>>>>>>> origin/HEAD

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
      <Excursions />
      <Gallery />
      <News />
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
