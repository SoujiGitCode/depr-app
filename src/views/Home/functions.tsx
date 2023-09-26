import api from "@/utils/services/api";
import { userService } from "@/utils";
import { IUserServicesResponse } from './types'

export const getUserServices = async (campusId: string, token: string) => {
    try {
        api.resource = userService;
        api.token = token;

        const res = await api.post<IUserServicesResponse>({
            body: {
              campus_id: parseInt(campusId)
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
