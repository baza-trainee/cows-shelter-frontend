import { Link, useParams } from 'react-router-dom';

const links = [
  {
    name: 'Новини',
    path: '',
    icon: 'news'
  },
  {
    name: 'Галерея',
    path: 'gallery',
    icon: 'gallery'
  },
  {
    name: 'Екскурсії',
    path: 'excursions',
    icon: 'excursions'
  },
  {
    name: 'Відгуки',
    path: 'reviews',
    icon: 'reviews'
  },
  {
    name: 'Партнери',
    path: 'partners',
    icon: 'partners'
  },
  {
    name: 'Контакти',
    path: 'contacts',
    icon: 'contacts'
  },
  {
    name: 'PDF Документи',
    path: 'pdf',
    icon: 'pdf'
  }
];

const SideBar = () => {
  const params = useParams();
  const paths = Object.values(params)[0]?.split('/');

  return (
    <div className="relative flex min-h-[100vh] w-[280px] flex-col items-center justify-start bg-black text-white">
      <div className="flex h-[120px] w-full items-center justify-start gap-[24px]  px-[26px] py-[8px]">
        <Link to="/" className="flex items-center justify-center gap-2">
          <img src="/favicon.svg" alt="" className="h-[40px] w-[40px]" />
          <h1 className="font-namu text-[18px]">Здраве Життя</h1>
        </Link>
      </div>
      <ul className="flex w-full flex-col items-start justify-center">
        {links.map((link, index) => (
          <li
            key={index}
            className="flex w-full border-b border-darkgray/50 px-[24px] py-1 py-[8px] text-[16px] font-light "
          >
            <Link
              to={`/admin/${link.path}`}
              className={`flex items-center justify-center gap-[16px] hover:text-accent ${
                link.path === paths?.[0] ? 'text-accent' : 'text-white'
              }`}
            >
              <span className="rounded-full bg-[#232323] p-[12px]">
                <img src={`/admin/${link.icon}.svg`} alt="news" />
              </span>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="my-[64px] w-full px-[24px] py-[8px]">
        <button className="flex gap-4 rounded-full bg-[#232323] px-[16px] py-[12px]">
          <img src="/admin/exit.svg" alt="exit" />
          <span>Вийти</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
