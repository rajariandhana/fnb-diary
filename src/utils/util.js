import instance from "../libs/axios/instance";

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const ping = async () => {
  const response = await instance.get("/ping");
  console.log(response);
};
