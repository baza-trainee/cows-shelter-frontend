import arrow_icon from '@/assets/icons/arrow_icon.svg';
import ExcursionsReviews from './ExcursionsReviews';

const Excursions = () => {
  return (
    <section className="my-20 px-[7.5rem]">
      <h2 className="mb-10 text-[4rem] font-bold">Екскурсії</h2>
      <ul className="flex gap-6">
        <li className="drop-shadow">
          <div className="group relative">
            <img src="/excursion1.jpg" alt="Арттерапія з коровами"></img>
            <div className="absolute bottom-0 left-0 flex flex-col gap-2 pb-6 pl-6 text-white">
              <p className="subtitle-text">Арттерапія з коровами</p>
              <p className="hidden group-hover:inline-block">
                30 - 60 хвилин / від 2 до 14 людей
              </p>
              <a>
                <button className="flex gap-3 border-solid border-accent py-[0.69rem] pl-6 pr-2.5 focus:border active:border group-hover:border">
                  <span className="text-lg font-medium leading-[1.375rem]">
                    Показати більше
                  </span>
                  <img src={arrow_icon} width={24} height={24} />
                </button>
              </a>
            </div>
          </div>
        </li>
        <li className="drop-shadow">
          <div className="group relative">
            <img src="/excursion2.jpg" alt="Підвищення кваліфікації"></img>
            <div className="absolute bottom-0 left-0 flex flex-col gap-2 pb-6 pl-6 text-white ">
              <p className="subtitle-text">Підвищення кваліфікації</p>
              <p className="hidden group-hover:inline-block">
                30 - 60 хвилин / від 2 до 14 людей
              </p>
              <a>
                <button className="flex gap-3 border-solid border-accent py-[0.69rem] pl-6 pr-2.5 focus:border active:border group-hover:border">
                  <span className="text-lg font-medium leading-[1.375rem]">
                    Показати більше
                  </span>
                  <img src={arrow_icon} width={24} height={24} />
                </button>
              </a>
            </div>
          </div>
        </li>
        <li className="drop-shadow">
          <div className="group relative">
            <img src="/excursion3.jpg" alt="Для дітей"></img>
            <div className="absolute bottom-0 left-0 flex flex-col gap-2 pb-6 pl-6 text-white">
              <p className="subtitle-text">Для дітей</p>
              <p className="hidden group-hover:inline-block">
                30 - 60 хвилин / від 2 до 14 людей
              </p>
              <a>
                <button className="flex gap-3 border-solid border-accent py-[0.69rem] pl-6 pr-2.5 focus:border active:border group-hover:border">
                  <span className="text-lg font-medium leading-[1.375rem]">
                    Показати більше
                  </span>
                  <img src={arrow_icon} width={24} height={24} />
                </button>
              </a>
            </div>
          </div>
        </li>
      </ul>
    <ExcursionsReviews/>
    </section>
  );
};

export default Excursions;
