import { Button } from "@heroui/react";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-96 justify-between">
      entries list
      <div className="absolute z-20 bottom-12 right-12">
        <Button onPress={() => navigate("/entry")} isIconOnly className={""}>
          <FaPlus color="current" size={48} />
        </Button>
      </div>
      {/* <ConsumeEntry /> */}
    </div>
  );
}
