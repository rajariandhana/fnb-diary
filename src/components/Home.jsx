import { Button, Spinner, toast } from "@heroui/react";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import { EntriesList } from "./EntriesList";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import instance from "../libs/axios/instance";

export default function Home() {
  const navigate = useNavigate();
  const [week, set_week] = useState("PERIOD_THIS_WEEK");
  const [entries_size, set_entries_size] = useState(0);
  const [toggle_button, set_toggle_button] = useState(
    <>
      <FaAnglesLeft />
      See last week's
    </>,
  );

  const toggle_week = () => {
    if (week === "PERIOD_THIS_WEEK") {
      set_week("PERIOD_LAST_WEEK");
      set_toggle_button(
        <>
          See this week's
          <FaAnglesRight />
        </>,
      );
    } else if (week === "PERIOD_LAST_WEEK") {
      set_week("PERIOD_THIS_WEEK");
      set_toggle_button(
        <>
          <FaAnglesLeft />
          See last week's
        </>,
      );
    }
  };

  const [roast_loading, set_roast_loading] = useState(false);
  const handle_roast = async () => {
    set_roast_loading(true);
    try {
      const response = await instance.post("/fnb/roast", {
				period: "SAMPLE",
        // period: week,
      });
      console.log(response.data.data);
			navigate("/roast-portion", {
				state: {
					period: "SAMPLE",
					// period: week,
					roast: response.data.data.roast
				}
			})
    } catch (error) {
			console.error(error.response.data.meta);
			toast.danger(error.response.data.meta.message);
    } finally {
      set_roast_loading(false);
    }
  };

  return (
    <>
      <h2 className="text-left w-full text-lg">
        {week === "PERIOD_THIS_WEEK" ? "This" : "Last"} Week's Roast Materials
      </h2>
      <EntriesList week={week} set_size={set_entries_size} />
      <div className={"w-full flex items-center justify-between"}>
        <Button size="sm" variant="outline" onPress={toggle_week}>
          {toggle_button}
        </Button>
        <Button
          size="sm"
          variant="danger-soft"
          onPress={handle_roast}
          isDisabled={entries_size === 0 || roast_loading}
        >
          {roast_loading && <Spinner color="danger" />}
          Roast
        </Button>
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
    </>
  );
}
