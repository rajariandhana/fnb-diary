import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../libs/axios/instance";
import { toast } from "@heroui/react";
import { delay } from "../utils/util";

const fetchRoasts = async () => {
  const response = await instance.get("/fnb/roast");
  return response.data.data;
};

export function useEntryRoasts() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["entryRoasts"],
    queryFn: fetchRoasts,

    select: (entryRoasts) => {
      entryRoasts.forEach((entry) => {
        queryClient.setQueryData(["entryRoasts", entry._id], entry);
      });

      return entryRoasts;
    },

    staleTime: 1000 * 60 * 10,
  });
}

export const fetchRoast = async ({ queryKey }) => {
  const [, roast_id] = queryKey;

  const response = await instance.get(`/fnb/roast/${roast_id}`);
  return response.data.data;
};

export function useRoast(roast_id) {
  return useQuery({
    queryKey: ["entryRoasts", roast_id],
    queryFn: fetchRoast,
    enabled: !!roast_id,
    staleTime: 1000 * 60 * 10,
  });
}

const createRoast = async (payload) => {
  const response = await instance.post("/fnb/roast", payload);
  if (payload.period === "SAMPLE") {
    await delay(1000);
  }
  return response.data.data;
};

export function useCreateRoast() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createRoast"],
    mutationFn: createRoast,

    onSuccess: (newRoast) => {
			// console.log(newRoast);
      if (newRoast._id) {
        queryClient.setQueryData(["entryRoasts", newRoast._id], newRoast);
        queryClient.invalidateQueries({
          queryKey: ["entryRoasts"],
        });
      }
      // console.log("useRoast",newRoast);
    },

    onError: (error) => {
      console.error(error);
      toast.danger(error.response.data.meta.message);
    },
  });
}
