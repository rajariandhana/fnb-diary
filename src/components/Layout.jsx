import Nav from "./Nav";
import { Outlet } from "react-router";
import { useLocale } from "react-aria/I18nProvider";

const Layout = ({ nav }) => {
  let { locale, direction } = useLocale();
  return (
    <div
      className="flex flex-col items-center min-h-screen"
      lang={locale}
      dir={direction}
    >
      <main className="flex flex-1 flex-col items-center w-full max-w-4xl gap-6 p-6">
        <Outlet />
      </main>
      {nav ?? <Nav />}
      {/* {footer ?? <Footer />} */}
    </div>
  );
};

export default Layout;
