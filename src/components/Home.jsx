import { Button } from "@heroui/react";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import { EntriesList } from "./EntriesList";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import clsx from "clsx";

export default function Home() {
  const navigate = useNavigate();
  const [week, set_week] = useState("PERIOD_THIS_WEEK");
  return (
    <div className="flex flex-col w-96 items-center gap-4 h-full">
      <h2 className="text-left w-full text-lg">
        {week === "PERIOD_THIS_WEEK" ? "This" : "Last"} Week's Roast Materials
      </h2>
      <EntriesList week={week} />
      <div
        className={clsx({
          "w-full flex items-center": true,
          "justify-end": week === "PERIOD_LAST_WEEK",
        })}
      >
        {week === "PERIOD_THIS_WEEK" ? (
          <Button
            size="sm"
            variant="outline"
            onPress={() => set_week("PERIOD_LAST_WEEK")}
          >
            <FaAnglesLeft />
            See last week's
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onPress={() => set_week("PERIOD_THIS_WEEK")}
          >
            See this week's
            <FaAnglesRight />
          </Button>
        )}
      </div>
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
