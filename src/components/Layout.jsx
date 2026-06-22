import Nav from "./Nav";
import { Outlet } from "react-router";
import { Logo } from "./Logo";

const Layout = ({ nav }) => {
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-background-secondary"
    >
      <main className="flex flex-1 flex-col items-center w-full md:w-3xl lg:w-4xl gap-6 p-6">
        <Logo />
        <Outlet />
      </main>
      {/* {nav ?? <Nav />} */}
      {/* {footer ?? <Footer />} */}
    </div>
  );
};

export default Layout;
