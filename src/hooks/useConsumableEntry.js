import { createContext } from "react";
import instance from "../libs/axios/instance";
import { toast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const DEFAULT_CONSUMABLE_TYPE = "food";
const DEFAULT_SOURCE_TYPE = "homemade";

const ConsumableTypeContext = createContext();

const MINIMUM_ROAST = 3;

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

const createEntry = async (entry) => {
  const response = await instance.post("/fnb/entry", entry);
  return response.data.data;
};

export function useCreateEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEntry,

    onSuccess: (newEntry) => {
      queryClient.setQueryData(["entries", newEntry._id], newEntry);

      queryClient.invalidateQueries({
        queryKey: ["entries"],
      });

      toast.success("FnB entry created successfully");
    },

    onError: (error) => {
      console.error(error);
      toast.danger("Failed to create entry.");
    },
  });
}

export { DEFAULT_CONSUMABLE_TYPE, DEFAULT_SOURCE_TYPE, ConsumableTypeContext, MINIMUM_ROAST };
