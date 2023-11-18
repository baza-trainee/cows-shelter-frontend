import Contacts from '@/components/Contacts/Contacts';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer/Footer';
import UnderFooter from '@/components/Footer/UnderFooter';
import Layout from '@/components/Layout';
import Excursions from '@/components/Excursions/Excursions';
import Gallery from '@/components/Gallery/Gallery';
import Partners from '@/components/Partners';
import News from '@/components/News/News';
import FAQ from '@/components/FAQ';
import Support from '@/components/Support/Support';
import About from '@/components/About/About';

const HomePage = () => {
  return (
    <Layout>
      <Header />
      <Hero />
      <About />
      <Excursions />
      <Gallery />
      <Partners />
      <News />
      <Support />
      <FAQ />
      <Contacts />
      <Footer />
      <UnderFooter />
    </Layout>
  );
};

export default HomePage;
