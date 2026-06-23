import { Outlet, useNavigate } from "react-router";
import { Logo } from "./Logo";
import { Button } from "@heroui/react";
import { ImFire } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useIsMutating } from "@tanstack/react-query";

const Layout = ({ is_home }) => {
  const navigate = useNavigate();

  const createEntryMutation = useIsMutating({
    mutationKey: ["createEntry"],
  });
  const createRoastMutation = useIsMutating({
    mutationKey: ["createRoast"],
  });
  const is_submitting = createRoastMutation > 0 || createEntryMutation > 0;

  return (
    <div className="flex flex-col items-center min-h-screen bg-background-secondary">
      <main className="flex flex-1 flex-col items-center w-full md:w-3xl lg:w-4xl gap-6 p-6">
        <Logo />
        <Outlet />
      </main>
      <footer className="absolute z-20 bottom-12 flex gap-x-4 items-center">
        {is_home && (
          <>
            <Button
              onPress={() => navigate("/roast")}
              className={"rounded-full"}
              size="md"
              variant="danger-soft"
            >
              <ImFire color="danger" />
              Roast
            </Button>
            <Button
              onPress={() => navigate("/entry")}
              className={"rounded-full"}
              size="lg"
            >
              <FaPlus color="current" size={48} />
              Add entry
            </Button>
          </>
        )}
        {!is_home && (
          <>
            <Button
              onPress={() => navigate("/")}
              className={"rounded-full"}
              size="lg"
              isDisabled={is_submitting}
            >
              <FaHome color="current" size={48} />
              Home
            </Button>
          </>
        )}
      </footer>
    </div>
  );
};

export default Layout;
