/* eslint-disable no-useless-catch */
import api from "@/utils/services/api";
import { register } from "@/utils";

interface IUserRegisterParams {
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  birthdate: string;
  password: string;
}

export type Ok = {
  code: number;
  message: string;
};

export const requestRegister = async ({
  email,
  first_name,
  middle_name,
  last_name,
  second_last_name,
  birthdate,
  password,
}: IUserRegisterParams) => {
  try {
    api.resource = register;

    console.log({
      email,
      first_name,
      middle_name,
      last_name,
      second_last_name,
      birthdate,
      password,
    })

    const res = await api.post({
      body: {
        email,
        first_name,
        middle_name,
        last_name,
        second_last_name,
        birthdate,
        password,
      },
    })

    return res
  } catch (error) {
    throw error;
  }
};
