/* eslint-disable react/no-unescaped-entities */
import people_icon from '@/assets/icons/people_icon.svg';
import time_icon from '@/assets/icons/time_icon.svg';
import close_icon from '@/assets/icons/close_icon.svg';

const ExcursionModal = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-full bg-black/[.60]">
      <div className="absolute left-1/2 top-1/2 w-[71rem] translate-x-[-50%] translate-y-[-50%] border-2 border-solid border-white bg-darkgray px-[3.75rem] pb-[3.75rem] pt-10">
        <div className="flex gap-10 ">
          <div className="flex flex-col gap-4">
            <div className="flex gap-9">
              <div className="flex gap-3">
                <img src={time_icon} width={24} height={24}></img>
                <span className="default-text text-accent">
                  {' '}
                  30 - 60 хвилин{' '}
                </span>
              </div>
              <div className="flex gap-3">
                <img src={people_icon} width={22} height={25}></img>
                <span className="default-text text-accent"> 2 - 14 людей </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              <img src="/public/excursion_modal_1_1.jpg"></img>
              <img src="/public/excursion_modal_1_2.jpg"></img>
              <img
                className="col-start-1 col-end-3"
                src="/public/excursion_modal_1_3.jpg"
              ></img>
            </div>
          </div>
          <div className="flex w-[30.4rem] flex-col justify-between">
            <h3 className="subtitle-text mt-10 font-bold text-white">
              Арттерапія з коровами
            </h3>
            <p className="default-text text-white">
              Це неповторний досвід, що відкриває перед учасниками світ
              творчості та природи. Ця захоплююча подорож починається у
              мальовничому селі, оточеному зеленими лугами та гірськими
              хребтами. Після 30-60 хвилинного контакту з нашими підопічними у
              людей кардинально змінюється моральний стан, спадає психологічна
              напруга і поліпшується загальний стан. Ця екскурсія не лише надає
              можливість відчути взаємодію з природою та мистецтвом, але й
              залишає незабутні спогади про спокій і натхнення, отримані від
              корів та природи навколо.Такі рогаті "психологи" важливі і
              потрібні в усі часи, а в такий нелегкий для нашої країни час, вони
              вкрай необхідні. Наша здрава команда завжди рада новим однодумцям
              у творенні та розвитку такої важливої справи для блага світу.
            </p>
            <div className="flex gap-6">
              <button className="h-11 w-[14.44rem] bg-accent text-lg font-medium leading-[1.375rem]">
                Замовити екскурсію
              </button>
              <button className="h-11 w-[14.44rem] border border-solid border-accent text-lg font-medium leading-[1.375rem] text-white">
                Допомогти
              </button>
            </div>
          </div>
        </div>
        <button className="absolute right-6 top-6">
          <img src={close_icon} width={44} height={44}></img>
        </button>
      </div>
    </div>
  );
};

export default ExcursionModal;
