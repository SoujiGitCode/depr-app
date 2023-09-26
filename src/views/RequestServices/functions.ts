/* eslint-disable no-useless-catch */
import api from "@/utils/services/api";
import {
  campuses,
  campusDocuments,
  uploadDocuments,
  userCampus,
  submitDocumentOnbase,
  academicYears,
  campusTerms,
  userAcademicInformation,
  userInfo,
  userDocuments,
  deleteDocuments,
} from "@/utils";
import {
  IUserCampusResponse,
  IAllCampusesResponse,
  ISubmitDocumentResponse,
  IUploadDocument,
  ICampusDocumentResponse,
  IAcademicYearsResponse,
  IEntranceTermsResponse,
  IUserInfoResponse,
  IUserDocumentsResponse,
  IDeleteDocument,
} from "./types";

export const getCampuses = async () => {
  try {
    api.resource = campuses;

    const res = await api.get<IAllCampusesResponse>();

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserCampus = async (campusId: string, token: string) => {
  try {
    api.resource = userCampus;
    api.token = token;

    const res = await api.post<IUserCampusResponse>({
      body: {
        campus_id: parseInt(campusId),
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCampusDocuments = async (id: number) => {
  try {
    api.resource = campusDocuments;

    const res = await api.post({ body: { id } });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const uploadDocument = async ({
  campusId,
  documentId,
  document,
  token,
}: IUploadDocument) => {
  try {
    api.resource = uploadDocuments;
    api.token = token;

    const res = await api.post<ICampusDocumentResponse>({
      body: {
        campus_id: campusId,
        document_id: parseInt(documentId),
        document,
        force: 1,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDocument = async ({
  campusId,
  documentId,
  token,
}: IDeleteDocument) => {
  try {
    api.resource = deleteDocuments;
    api.token = token;

    const res = await api.post<ICampusDocumentResponse>({
      body: {
        campus_id: campusId,
        document_id: parseInt(documentId)
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const submitDocument = async (campusId: number, token: string) => {
  try {
    api.resource = submitDocumentOnbase;
    api.token = token;

    const res = await api.post<ISubmitDocumentResponse>({
      body: {
        campus_id: campusId,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAcademicYears = async () => {
  try {
    api.resource = academicYears;

    const res = await api.get<IAcademicYearsResponse>();

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getEntranceTerms = async (campusId: string) => {
  try {
    api.resource = campusTerms;

    const res = await api.post<IEntranceTermsResponse>({
      body: {
        id: campusId,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateAcademicInformation = async (
  campusId: number,
  termId: number,
  academicYear: number,
  token: string
) => {
  try {
    api.resource = userAcademicInformation;
    api.token = token;

    const res = await api.post<ISubmitDocumentResponse>({
      body: {
        campus_id: campusId,
        term_id: termId,
        academic_year: academicYear,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInformation = async (token: string) => {
  try {
    api.resource = userInfo;
    api.token = token;

    const res = await api.get<IUserInfoResponse>();

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUserDocuments = async (campusId: string, token: string) => {
  try {
    api.resource = userDocuments;
    api.token = token;

    const res = await api.post<IUserDocumentsResponse>({
      body: {
        campus_id: campusId,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
