/* eslint-disable no-useless-catch */
import api from "@/utils/services/api";
import { register } from "@/utils";

interface IUserRegisterParams {
  email: string;
  cell_phone: string;
  student_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  birthdate: string;
  address_line1: string;
  address_line2: string;
  address_state: string;
  address_city: string;
  address_zipcode: string;
  password: string;
}

export type Ok = {
  code: number;
  message: string;
};

export const requestRegister = async ({
  email,
  cell_phone,
  student_id,
  first_name,
  middle_name,
  last_name,
  second_last_name,
  birthdate,
  address_line1,
  address_line2,
  address_state,
  address_city,
  address_zipcode,
  password,
}: IUserRegisterParams) => {
  try {
    api.resource = register;

    console.log({
      email,
      cell_phone,
      student_id,
      first_name,
      middle_name,
      last_name,
      second_last_name,
      birthdate,
      address_line1,
      address_line2,
      address_state,
      address_city,
      address_zipcode,
      password,
    })

    const res = await api.post({
      body: {
        email,
        cell_phone,
        student_id,
        first_name,
        middle_name,
        last_name,
        second_last_name,
        birthdate,
        address_line1,
        address_line2,
        address_state,
        address_city,
        address_zipcode,
        password,
      },
    })

    return res
  } catch (error) {
    throw error;
  }
};
