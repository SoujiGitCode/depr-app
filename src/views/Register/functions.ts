/* eslint-disable no-useless-catch */
import api from "@/utils/services/api";
import { register } from "@/utils";

interface IUserRegisterParams {
  email: string;
  identification_type: string;
  identification: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  birthdate: string;
  gender: string;
  depr_first_name: string;
  depr_middle_name: string;
  depr_last_name: string;
  depr_second_last_name: string;
  phone: string;
  social_security: string;
  password: string;
}

export type Ok = {
  code: number;
  message: string;
};

export const requestRegister = async ({
  email,
  identification_type,
  identification,
  first_name,
  middle_name,
  last_name,
  second_last_name,
  birthdate,
  gender,
  depr_first_name,
  depr_middle_name,
  depr_last_name,
  depr_second_last_name,
  phone,
  social_security,
  password,
}: IUserRegisterParams) => {
  try {
    api.resource = register;

    console.log({
      email,
      identification_type,
      identification,
      first_name,
      middle_name,
      last_name,
      second_last_name,
      birthdate,
      gender,
      depr_first_name,
      depr_middle_name,
      depr_last_name,
      depr_second_last_name,
      phone,
      social_security,
      password,
    })

    const res = await api.post({
      body: {
        email,
        identification_type,
        identification,
        first_name,
        middle_name,
        last_name,
        second_last_name,
        birthdate,
        gender,
        depr_first_name,
        depr_middle_name,
        depr_last_name,
        depr_second_last_name,
        phone,
        social_security,
        password,


        depr_birthdate: birthdate,
        depr_gender: gender,
        depr_phone: phone,
        depr_social_security: social_security,
      },
    })

    return res
  } catch (error) {
    throw error;
  }
};
