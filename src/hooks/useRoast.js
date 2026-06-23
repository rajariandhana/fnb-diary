import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../libs/axios/instance";
import { toast } from "@heroui/react";
import { useNavigate } from "react-router";
import { delay } from "../utils/util";

const createRoast = async (payload) => {
  const response = await instance.post("/fnb/roast", payload);
  if (payload.period === "SAMPLE") {
    await delay(1000);
  }
  return response.data.data;
};

export function useCreateRoast() {
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();

  return useMutation({
		mutationKey: ["createRoast"],
    mutationFn: createRoast,

    onSuccess: (newRoast) => {
      // console.log("useRoast",newRoast);
    },

    onError: (error) => {
      console.error(error);
      toast.danger(error.response.data.meta.message);
    },
  });
}
