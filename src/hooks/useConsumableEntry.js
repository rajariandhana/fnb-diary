import { useState, useContext, createContext } from "react";
import instance from "../libs/axios/instance";
import { toast } from "@heroui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const DEFAULT_CONSUMABLE_TYPE = "food";
const DEFAULT_SOURCE_TYPE = "homemade";

const ConsumableTypeContext = createContext();

// function useConsumableEntryForm() {
//   const [consumableType, setConsumableType] = useState(DEFAULT_CONSUMABLE_TYPE);

//   return {
//     consumableType,
//     setConsumableType,
//   };
// }

const fetchEntries = async ({ queryKey }) => {
  const [, period] = queryKey;
  const response = await instance.post("/fnb/entry/period", {
    period,
  });
  return response.data.data;
};

export function useEntries(period) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["entries", period],
    queryFn: fetchEntries,

    select: (entries) => {
      entries.forEach((entry) => {
        queryClient.setQueryData(["entries", entry._id], entry);
      });

      return entries;
    },

    staleTime: 1000 * 60 * 10,
  });
}
export { DEFAULT_CONSUMABLE_TYPE, DEFAULT_SOURCE_TYPE, ConsumableTypeContext };
