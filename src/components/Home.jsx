import { Button } from "@heroui/react";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import { EntriesList } from "./EntriesList";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-96 items-center gap-4 h-full">
      <h2 className="text-left w-full text-lg">This Week's Roast Materials</h2>
      <EntriesList />
      <div className="absolute z-20 bottom-12">
        <Button
          onPress={() => navigate("/entry")}
          isIconOnly
          className={"rounded-full"}
          size="lg"
        >
          <FaPlus color="current" size={48} />
        </Button>
      </div>
      {/* <ConsumeEntry /> */}
    </div>
  );
}
