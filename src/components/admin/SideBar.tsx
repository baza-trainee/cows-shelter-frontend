import { Link, useParams } from 'react-router-dom';
import LogoutIcon from '../icons/LogoutIcon';

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
  },
  {
    name: 'Зміна пароля',
    path: 'newpaswword',
    icon: 'password'
  }
];

const SideBar = () => {
  const params = useParams();
  const paths = Object.values(params)[0]?.split('/');

  const logout = () => {
    localStorage.removeItem('user');
    console.log('Storage видалено');
  };

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
            className={`group flex w-full border-b border-t px-[24px] py-1 py-[8px] text-[16px] font-light transition-all hover:border-accent hover:bg-[#1e1e1e] ${
              link.path === paths?.[0]
                ? 'border-accent bg-[#1e1e1e]'
                : 'border-darkgray/50 bg-inherit'
            }`}
          >
            <Link
              to={`/admin/${link.path}`}
              className={`flex items-center justify-center gap-[16px] group-hover:text-accent ${
                link.path === paths?.[0] ? 'text-accent' : 'text-white'
              }`}
            >
              <span
                className={`rounded-full  p-[12px] group-hover:bg-black  ${
                  link.path === paths?.[0] ? 'bg-black' : 'bg-[#1e1e1e]'
                }`}
              >
                <img
                  src={
                    link.path === paths?.[0]
                      ? `/admin/${link.icon}_active.svg`
                      : `/admin/${link.icon}.svg`
                  }
                  alt="news"
                />
              </span>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="my-[64px] w-full px-[24px] py-[8px]">
        <Link
          to={'/'}
          onClick={logout}
          className="flex gap-4 rounded-full border border-transparent bg-[#1e1e1e] px-[16px] py-[12px] hover:border-accent hover:text-accent focus:border-accent focus:text-accent"
        >
          <LogoutIcon />
          <span>Вийти</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
