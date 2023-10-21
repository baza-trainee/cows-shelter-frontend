import Header from '@/component/Header';
import Hero from '@/component/Hero';
import Footer from '@/components/Footer/Footer';
import UnderFooter from '@/components/Footer/UnderFooter';

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <div className="intro flex h-screen w-full flex-col items-center justify-center font-namu text-5xl text-white">
        <div className="title absolute left-[4rem] top-1/2">
          <h1>Здраве життя</h1>
        </div>
      </div>
      <div>
        <Footer />
        <UnderFooter />
      </div>
    </>
  );
};

export default HomePage;
