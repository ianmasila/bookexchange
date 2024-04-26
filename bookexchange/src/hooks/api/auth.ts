import { useMutation } from "@tanstack/react-query";
import client from "../../utils/axios.config";
import { AxiosError } from "axios";
// import {
//   LoginFormData,
//   RegisterFormData,
// } from '@types/';
import { LoginFormData, RegisterFormData } from "../../types";

const useLogin = () => {
  return useMutation<any, AxiosError, any>({
    mutationFn: async (data: LoginFormData) => {
      const response = await client.post("/auth/login/", data);
      return response.data;
    },
  });
};

const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await client.post("/auth/register/", data);
      return response.data;
    },
  });
};

export { useLogin, useRegister };
