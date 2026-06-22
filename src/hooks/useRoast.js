import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../libs/axios/instance";
import { toast } from "@heroui/react";
import { useNavigate } from "react-router";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createRoast = async (payload) => {
	const response = await instance.post("/fnb/roast", payload);
	if (payload.period === "SAMPLE") {
		await delay(1000);
	}
  return response.data.data;
};

export function useCreateRoast() {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoast,

    onSuccess: (newRoast) => {
      // console.log("useRoast",newRoast);
    },

    onError: (error) => {
      // console.error(error.response.data.meta.message);
      toast.danger(error.response.data.meta.message);
    },
  });
}
