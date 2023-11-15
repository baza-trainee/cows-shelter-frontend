import { Link, useParams } from 'react-router-dom';

const links = [
  {
    name: 'Новини',
    path: ''
  },
  {
    name: 'Екскурсії',
    path: 'excursions'
  },
  {
    name: 'Галерея',
    path: 'gallery'
  },
  {
    name: 'Партнери',
    path: 'partners'
  },
  {
    name: 'Контакти',
    path: 'contacts'
  }
];

const SideBar = () => {
  const params = useParams();
  const paths = Object.values(params)[0]?.split('/');

  return (
    <div className="relative flex min-h-[100vh] w-[280px] flex-col items-center justify-start bg-black text-white">
      <div className=" flex h-[30vh] w-full items-center justify-center">
        <Link to="/" className="flex items-center justify-center gap-2">
          <img src="/favicon.svg" alt="" className="w-13 h-13" />
          <h1 className="font-namu text-lg">Здраве Життя</h1>
        </Link>
      </div>
      <ul className="flex w-full flex-col items-start justify-center gap-6 p-4">
        {links.map((link, index) => (
          <li
            key={index}
            className="w-[60%] border-b border-white py-1 text-lg "
          >
            <Link
              to={`/admin/${link.path}`}
              className={`hover:text-accent ${
                link.path === paths?.[0] ? 'text-accent' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
