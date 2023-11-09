// import { useWidth } from '@/hooks/useWidth';
import image1 from '../../assets/images/about-img1.jpg';
import image2 from '../../assets/images/about-img2.jpg';
import image3 from '../../assets/images/about-img3.jpg';
import arrorIcon from '../../assets/icons/arrow-right.svg';

import { useState } from 'react';

const About = () => {
  const [isOpened1, setIsOpened1] = useState(false);
  const [isOpened2, setIsOpened2] = useState(false);
  const [isOpened3, setIsOpened3] = useState(false);

  return (
    <>
      <section className="bg-[#FDFDFF] px-[3rem] pt-20 min-[1280px]:px-[7.5rem] ">
        <h2 className="mb-10 text-[4rem] font-medium leading-normal">
          Про нас
        </h2>
        <div className=" max-w-[1098px] text-[1.375rem] font-normal leading-normal">
          <p>
            Здраве Життя — це притулок захисту корів, діяльність якого
            спрямована на підтримання та відновлення популяції корів на основі
            заповідних, духовних і моральних принципів, на заміну
            сільськогосподарським споживчим.
          </p>
        </div>
        {/* ------- 1 SECTION */}
        <div className="mt-20 flex gap-6 divide-solid border-b border-[#A9A9A9] pb-6 lg:pb-20">
          <div className="max-w-[690px]">
            <h3 className="mb-5 text-[1.5rem] font-bold leading-normal lg:mb-6 ">
              Наша місія
            </h3>
            {/* ------- FOR DESKTOP */}
            <div className="mb-6 hidden lg:block">
              <p className="mb-6">
                Захист корів від усіх видів насильства має величезну важливість.
                Коли корови перебувають в умовах любові й турботи, вони
                максимально реалізують свою закладену Всевишнім природну функцію
                впорядковувати навколишній простір на енергетичному рівні.
              </p>
              <p>
                З вірою у світле майбутнє і не дивлячись на складні умови
                в країні, прихисток корів та биків Здраве Життя продовжує
                прагнути наповнювати світ благістю, позитивними емоціями
                та давати людям можливість відвідавши притулок отримати таке
                необхідне сьогодні психоемоційне розвантаження від взаємодії
                з мешканцями притулку!
              </p>
            </div>
            {/* ------- FOR TABLET */}
            <div className="lock flex min-h-[243px]  flex-col justify-between lg:hidden">
              <div className="flex flex-col">
                <p className="text-base leading-normal">
                  Захист корів від усіх видів насильства має величезну
                  важливість. Коли корови перебувають в умовах любові й турботи,
                  вони максимально реалізують свою надану Всевишнім природну
                  функцію впорядковувати навколишній простір на енергетичному
                  рівні.
                </p>
                <p
                  className={` transition-[max-height, opacity] duration-[1s] ${
                    isOpened1 ? 'max-h-[170px] opacity-100 ' : ''
                  }  inline-block max-h-0 overflow-hidden opacity-0`}
                >
                  З вірою у світле майбутнє і не дивлячись на складні умови
                  в країні, прихисток корів та биків Здраве Життя продовжує
                  прагнути наповнювати світ благістю, позитивними емоціями
                  та давати людям можливість відвідавши притулок отримати таке
                  необхідне сьогодні психоемоційне розвантаження від взаємодії
                  з мешканцями притулку!
                </p>
              </div>
              <button
                className="mt-4 flex w-[236px] justify-center border border-neutral-950 py-[0.75rem] pl-5 pr-4 transition-all duration-500 hover:border-accent active:border-accent"
                onClick={() => setIsOpened1((prevState) => !prevState)}
              >
                {isOpened1 ? (
                  <div className="flex gap-3">
                    <span>
                      <img
                        src={arrorIcon}
                        alt="arror"
                        className="scale-x-[-1]"
                      />
                    </span>
                    <span className="text-lg font-medium leading-[1.2]">
                      <p>Згорнути</p>
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <span>
                      <p className="text-lg font-medium leading-[1.2]">
                        Показати більше
                      </p>
                    </span>
                    <span>
                      <img src={arrorIcon} alt="arror" />
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="mt-14 h-[243px] min-w-[208px] max-w-[486px] lg:mt-0 lg:h-[320px] lg:min-w-[486px] ">
            <img
              src={image1}
              alt="about"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {/* ------- 2 SECTION */}
        <div className="mt-20 flex gap-6 divide-solid border-b border-[#A9A9A9] pb-20">
          <div className="mt-14 h-[243px] min-w-[208px] max-w-[486px] lg:mt-0 lg:h-[320px] lg:min-w-[486px] ">
            <img
              src={image2}
              alt="about"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="max-w-[690px]">
            <h3 className="mb-6 text-[1.5rem] font-bold leading-normal">
              Природні властивості корів
            </h3>
            {/* ------- FOR DESKTOP */}
            <p className="mb-6 hidden lg:block">
              Властивості корів, биків і телят, які живуть ненасильницьким
              життям, чинять потужну позитивну дію на психоемоційний стан людей.
              У зв'язку з воєнними діями в наш притулок стали приїжджати люди
              з-під обстрілів; люди у важких емоційних станах, які були змушені
              покинути свої будинки і міста. Дорослі привозять діток. Після
              30–60 хвилинного контакту з нашими підопічними у людей кардинально
              змінюється моральний стан, спадає психологічна напруга і
              поліпшується загальний стан. Рогаті «психологи» важливі і потрібні
              в усі часи, а зараз, в такий нелегкий для України час, вони вкрай
              необхідні. Наша здрава команда завжди рада новим однодумцям
              у творенні та розвитку такої важливої справи для блага світу.
            </p>
            {/* ------- FOR TABLET */}
            <div className="lock flex min-h-[243px]  flex-col justify-between lg:hidden">
              <div className="flex flex-col">
                <p className="text-base leading-normal">
                  Властивості корів, биків і телят, які живуть ненасильницьким
                  життям, чинять потужну позитивну дію на психоемоційний стан
                  людей. Після 30-60 хвилинного контакту з нашими підопічними
                  у людей кардинально змінюється моральний стан, спадає
                  психологічна напруга і поліпшується загальний стан.
                </p>
                <p
                  className={` transition-[max-height, opacity] duration-[1s] ${
                    isOpened2 ? 'max-h-[170px] opacity-100 ' : ''
                  }  inline-block max-h-0 overflow-hidden opacity-0`}
                >
                  Рогаті «психологи» важливі і потрібні в усі часи, а зараз,
                  в такий нелегкий для України час, вони вкрай необхідні. Наша
                  здрава команда завжди рада новим однодумцям у творенні
                  та розвитку такої важливої справи для блага світу.
                </p>
              </div>
              <button
                className="mt-4 flex w-[236px] justify-center border border-neutral-950 py-[0.75rem] pl-5 pr-4 transition-all duration-500 hover:border-accent active:border-accent"
                onClick={() => setIsOpened2((prevState) => !prevState)}
              >
                {isOpened2 ? (
                  <div className="flex gap-3">
                    <span>
                      <img
                        src={arrorIcon}
                        alt="arror"
                        className="scale-x-[-1]"
                      />
                    </span>
                    <span className="text-lg font-medium leading-[1.2]">
                      <p>Згорнути</p>
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <span>
                      <p className="text-lg font-medium leading-[1.2]">
                        Показати більше
                      </p>
                    </span>
                    <span>
                      <img src={arrorIcon} alt="arror" />
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* ------- 3 SECTION */}
        <div className="mt-20 flex gap-6 pb-20">
          <div className="max-w-[690px]">
            <h3 className="mb-6 text-[1.5rem] font-bold leading-normal">
              Про допомогу
            </h3>
            {/* ------- FOR DESKTOP */}
            <div className="mb-6 hidden lg:block">
              <p className="mb-6 ">
                Притулок має благодійну основу, а не товарно-економічну і від
                самого початку створювався та існував на кошти суто сім'ї
                та кількох однодумців.
              </p>
              <p className="mb-6">
                Ми дуже цінуємо підтримку наших партнерів та помічників, які
                не дивлячись на важкі часи надають підтримку притулку.
              </p>
              <p>
                Притулок має благодійну основу, а не товарно-економічну і від
                самого початку створювався та існував на кошти суто сім'ї
                та кількох однодумців.
              </p>
            </div>
            {/* ------- FOR TABLET */}
            <div className="lock flex min-h-[243px]  flex-col justify-between lg:hidden">
              <div className="flex flex-col">
                <p className="text-base leading-normal">
                  Притулок має благодійну основу, а не товарно-економічну і від
                  самого початку створювався та існував на кошти суто сім'ї
                  та кількох однодумців. Кожна усвідомлена людина може
                  долучитися до закупівлі кормів для притулку, щоб забезпечити
                  коровам та бикам комфортні умови життя до глибокої щасливої
                  старості.
                </p>
                <p
                  className={` transition-[max-height, opacity] duration-[1s] ${
                    isOpened3 ? 'max-h-[170px] opacity-100 ' : ''
                  }  inline-block max-h-0 overflow-hidden opacity-0`}
                >
                  Ми вдячні нашим партнерам та однодумцям за кожну гривню
                  допомоги та віримо у сили добра і любові, які мотивують
                  розумних людей не дати загинути подопічним притулку від
                  голоду.
                </p>
              </div>
              <button
                className="mt-4 flex w-[236px] justify-center border border-neutral-950 py-[0.75rem] pl-5 pr-4 transition-all duration-500 hover:border-accent active:border-accent"
                onClick={() => setIsOpened3((prevState) => !prevState)}
              >
                {isOpened3 ? (
                  <div className="flex gap-3">
                    <span>
                      <img
                        src={arrorIcon}
                        alt="arror"
                        className="scale-x-[-1]"
                      />
                    </span>
                    <span className="text-lg font-medium leading-[1.2]">
                      <p>Згорнути</p>
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <span>
                      <p className="text-lg font-medium leading-[1.2]">
                        Показати більше
                      </p>
                    </span>
                    <span>
                      <img src={arrorIcon} alt="arror" />
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="mt-14 h-[243px] min-w-[208px] max-w-[486px] lg:mt-0 lg:h-[320px] lg:min-w-[486px] ">
            <img
              src={image3}
              alt="about"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <div
        className={`relative h-[80vh] bg-[url('@/assets/imgs/img_cow_about.jpg')] bg-cover bg-fixed bg-center bg-no-repeat`}
      ></div>
    </>
  );
};
export default About;
