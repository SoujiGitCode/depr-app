/* eslint-disable no-useless-catch */
import api from "@/utils/services/api";
import { userDetails, uploadUserAvatar } from "@/utils";
import { UserProfile } from '@/types/user';

type ResponseGetDetails = {
  code: number;
  data: UserProfile;
  message: string;
};

interface IUploadAvatarResponse {
  code: number;
  message: string;
  data: boolean;
}

export const getUserDetails = async (token: string) => {
  try {
    api.resource = userDetails;
    api.token = token;

    const res = await api.get<ResponseGetDetails>();

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const uploadProfilePhoto = async (token: string, avatar: File) => {
  try {
    api.resource = uploadUserAvatar;
    api.token = token;

    const res = await api.post<IUploadAvatarResponse>({ body: { avatar } });

    return res;
  } catch (error) {
    throw error;
  }
};

export const getUploadProfilePhoto = async (token: string) => {
  try {
    api.resource = uploadUserAvatar;
    api.token = token;

    const res = await api.get();
    console.log(res)

    return res;
  } catch (error) {
    throw error;
  }
};