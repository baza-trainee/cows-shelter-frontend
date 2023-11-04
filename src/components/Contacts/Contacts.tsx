import icon_privat from '@/assets/icons/icon_privat.svg';
import icon_mono from '@/assets/icons/icon_mono.svg';
import icon_paypal from '@/assets/icons/icon_paypal.svg';
import icon_western_union from '@/assets/icons/icon_western_union.svg';
import icon_swift from '@/assets/icons/icon_swift.svg';
import Map from './Map';

const Contacts = () => {
  return (
    <div className="container mx-auto max-w-[1440px]">
      <div className="flex flex-row md:gap-6 md:p-12 lg:px-56 lg:py-20">
      <div
        className={`relative h-[80vh] bg-[url('@/assets/imgs/img_cow_contacts.png')] bg-cover bg-fixed bg-center bg-no-repeat`}
      />
        <div className="basis-1/2">
          <h3 className="mb-5 text-2xl font-bold">Контакти</h3>
          <ul className="mb-6 flex flex-col gap-2">
            <li>
              <a
                href="mailto:zdravejutta@gmail.com"
                rel="noopener noreferrer"
                className="text-graphite"
              >
                zdravejutta@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+380987675765"
                rel="noopener noreferrer"
                className="text-graphite"
              >
                +380 987 675 765
              </a>
            </li>
          </ul>
          <h4 className="mb-5 text-2xl font-bold">Режим роботи</h4>
          <ul className="mb-6 flex flex-col gap-2">
            <li>
              <p className="text-graphite">Понеділок - П&#39;ятниця</p>
            </li>
            <li>
              <p className="text-graphite">10:00 - 20:00</p>
            </li>
          </ul>
          <h4 className="mb-5 text-2xl font-bold">Локація</h4>
          <p className="mb-2 text-graphite">Україна, Вінницька область,</p>
          <p className="text-graphite">с. Буша, вул. Виноградна, 11</p>
        </div>
        <div className="basis-1/2">
          <h4 className="mb-5 text-2xl font-bold">
            Реквізити для підтримки притулку:
          </h4>
          <ul>
            <li className="mb-3 flex gap-4 border-b border-disabled py-2">
              <img src={icon_privat} alt="privat bank" />
              <p>Приватбанк: 4149 6293 8909 9391</p>
            </li>
            <li className="mb-3 flex gap-4 border-b border-disabled py-2">
              <img src={icon_mono} alt="mono bank" />
              <p className="text-graphite">Монобанк: 4441 1144 6464 4952</p>
            </li>
            <li className="mb-3 flex gap-4 border-b border-disabled py-2">
              <img src={icon_paypal} alt="paypal" />
              <p className="text-graphite">PayPal: Irrazdravaja@ukr.net</p>
            </li>
            <li className="mb-3 flex gap-4 border-b border-disabled py-2">
              <img src={icon_western_union} alt="western union" />
              <p className="text-graphite">
                Western Union: Зезюкова Ірина Михайлівна
              </p>
            </li>
            <li className="mb-3 flex gap-4 border-b border-disabled py-2">
              <img src={icon_swift} alt="swift" />
              <p className="text-graphite">Swift /BIC код - PBANUA2X</p>
            </li>
          </ul>
        </div>
      </div>
      <Map />
    </div>
  );
};

export default Contacts;
