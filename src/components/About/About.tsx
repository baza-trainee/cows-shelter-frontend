// import { useWidth } from '@/hooks/useWidth';
import image1 from './about-img1.jpg';
import image2 from './about-img2.jpg';
import image3 from './about-img3.jpg';

const About = () => {
  return (
    <section className="bg-[#FDFDFF] px-[7.5rem] pt-20">
      <h2 className="mb-10 text-[4rem] font-medium leading-normal">Про нас</h2>
      <div className=" max-w-[1098px] text-[1.375rem] font-normal leading-normal">
        <p>
          Здраве Життя — це притулок захисту корів, діяльність якого спрямована
          на підтримання та відновлення популяції корів на основі заповідних,
          духовних і моральних принципів, на заміну сільськогосподарським
          споживчим.
        </p>
      </div>
      {/* ------- 1 SECTION */}
      <div className="mt-20 flex gap-6 divide-solid border-b border-[#A9A9A9] pb-20">
        <div className="max-w-[690px]">
          <h3 className="mb-6 text-[1.5rem] font-bold leading-normal">
            Наша місія
          </h3>
          <p className="mb-6">
            Захист корів від усіх видів насильства має величезну важливість.
            Коли корови перебувають в умовах любові й турботи, вони максимально
            реалізують свою закладену Всевишнім природну функцію впорядковувати
            навколишній простір на енергетичному рівні.
          </p>
          <p>
            З вірою у світле майбутнє і не дивлячись на складні умови в країні,
            прихисток корів та биків Здраве Життя продовжує прагнути наповнювати
            світ благістю, позитивними емоціями та давати людям можливість
            відвідавши притулок отримати таке необхідне сьогодні психоемоційне
            розвантаження від взаємодії з мешканцями притулку!
          </p>
        </div>
        <div className="w-[30.375rem]">
          <img src={image1} alt="about" className="w-full" />
        </div>
      </div>
      {/* ------- 2 SECTION */}
      <div className="mt-20 flex gap-6 divide-solid border-b border-[#A9A9A9] pb-20">
        <div className="w-[30.375rem]">
          <img src={image2} alt="about" className="w-full" />
        </div>
        <div className="max-w-[690px]">
          <h3 className="mb-6 text-[1.5rem] font-bold leading-normal">
            Природні властивості корів
          </h3>

          <p>
            Властивості корів, биків і телят, які живуть ненасильницьким життям,
            чинять потужну позитивну дію на психоемоційний стан людей. У зв'язку
            з воєнними діями в наш притулок стали приїжджати люди з-під
            обстрілів; люди у важких емоційних станах, які були змушені покинути
            свої будинки і міста. Дорослі привозять діток. Після
            30–60 хвилинного контакту з нашими підопічними у людей кардинально
            змінюється моральний стан, спадає психологічна напруга і
            поліпшується загальний стан. Рогаті «психологи» важливі і потрібні
            в усі часи, а зараз, в такий нелегкий для України час, вони вкрай
            необхідні. Наша здрава команда завжди рада новим однодумцям
            у творенні та розвитку такої важливої справи для блага світу.
          </p>
        </div>
      </div>
      {/* ------- 3 SECTION */}
      <div className="mt-20 flex gap-6 pb-20">
        <div className="max-w-[690px]">
          <h3 className="mb-6 text-[1.5rem] font-bold leading-normal">
            Про допомогу
          </h3>
          <p className="mb-6">
            Притулок має благодійну основу, а не товарно-економічну і від самого
            початку створювався та існував на кошти суто сім'ї та кількох
            однодумців.
          </p>
          <p className="mb-6">
            Ми дуже цінуємо підтримку наших партнерів та помічників, які
            не дивлячись на важкі часи надають підтримку притулку.
          </p>
          <p>
            Притулок має благодійну основу, а не товарно-економічну і від самого
            початку створювався та існував на кошти суто сім'ї та кількох
            однодумців.
          </p>
        </div>
        <div className="w-[30.375rem]">
          <img src={image3} alt="about" className="w-full" />
        </div>
      </div>
    </section>
  );
};
export default About;
