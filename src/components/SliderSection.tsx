import { useRef, Dispatch, SetStateAction } from 'react';

import Slider from './Slider';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';

import '@/styles/gallery.css';

type SliderSectionProps = {
  title: string;
  pagesLength?: number;
  children: React.ReactNode;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const SliderSection = ({
  title,
  children,
  setCurrentPage,
  pagesLength
}: SliderSectionProps) => {
  const sliderRef = useRef(null);

  const handlePrev = () => {
    if (sliderRef && sliderRef.current) {
      (sliderRef.current as any).slidePrev();
    }
  };
  const handleNext = () => {
    if (sliderRef != undefined) {
      (sliderRef.current as any).slideNext();
    }
  };
  return (
    <section className="py-4">
      <div className="sectionHeader mx-auto flex w-[83vw] items-center justify-between">
        <h2 className=" text-6xl">{title}</h2>
        <div className="flex gap-4">
          <div onClick={handlePrev} className="cursor-pointer ">
            <ArrowLeft />
          </div>
          <div className="cursor-pointer" onClick={handleNext}>
            <ArrowRight />
          </div>
        </div>
      </div>
      <div className="my-8 flex h-screen w-full  items-center justify-center">
        <Slider
          setCurrentPage={setCurrentPage}
          pagesLength={pagesLength}
          ref={sliderRef}
        >
          {children}
        </Slider>
      </div>
    </section>
  );
};

export default SliderSection;
