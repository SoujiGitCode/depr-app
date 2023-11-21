import api from "@/utils/services/api";
import { getDocuments } from "@/utils";
import { IGetUsersDocuments } from './types'

export const getUserDocuments = async (token: string) => {
    try {
        api.resource = getDocuments;
        api.token = token;

        const res = await api.get<IGetUsersDocuments>({
            body: {

            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
