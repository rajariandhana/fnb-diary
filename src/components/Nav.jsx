import { Link, useLocation } from "react-router";

import { FaPlus } from "react-icons/fa6";
import { FaList } from "react-icons/fa6";

const Nav = () => {
  const location = useLocation();
  const links = [
    {
      to: "/",
			label: "New Entry",
      icon: <FaPlus size={20} />,
    },
    {
      to: "/entries",
      label: "Entries",
      icon: <FaList size={20} />,
    },
  ];
  return (
    <header className="sticky bottom-0 z-20 w-full h-16 bg-background-tertiary px-6 flex items-center justify-around">
      {links.map((link) => {
        let active = location.pathname === link.to;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`flex gap-1 items-center ${active ? "text-accent" : ""}`}
          >
            {link.icon} {link.label}
          </Link>
        );
      })}
    </header>
  );
};
export default Nav;
