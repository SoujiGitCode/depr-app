export interface ICampuses {
  id: number;
  name: string;
}

export interface IAllCampusesData {
  created: string;
  id: string;
  name: string;
  ob_name: string;
  status: string;
  updated: string;
}

export interface IAllCampusesResponse {
  code: string;
  message: string;
  data: IAllCampusesData[];
}

export interface ICampusData {
  academic_year: string;
  created: string;
  id: number;
  service: string;
  status: string;
  status_desc: string;
  term_id: number;
}

export interface IUploadDocument {
  campusId: number;
  documentId: string;
  document: File;
  token: string;
}

export interface IDeleteDocument {
  campusId: number;
  documentId: string;
  token: string;
}


export interface IUserCampusResponse {
  code: string;
  message: string;
  data: ICampusData;
}

export interface ISubmitDocumentResponse {
  code: number;
  data: boolean;
  message: string;
}

export interface ICampusDocumentResponse {
  code: number;
  message: string;
  data: ICampusDocumentsData[];
}

export interface ICampusDocumentsData {
  id: string;
  mandatory: string;
  name: string;
  type: string;
  description: string;
}

export interface IAcademicYearsResponse {
  code: number;
  message: string;
  data: number[]
}

export interface IEntranceTermsData {
  id: string;
  title: string;
  ob_name: string;
}

export interface IEntranceTermsResponse {
  code: number;
  message: string;
  data: IEntranceTermsData[]
}

export interface IUserInfoData {
  id: string;
  student_id: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  birthdate: string;
  email: string;
  cell_phone: string;
  address_state: string;
  address_city: string;
  address_line1: string;
  address_line2: string;
  address_zipcode: string;
  ip_origin: string;
  status: string;
  created: string;
  updated: string;
}

export interface IUserInfoResponse {
  code: number;
  message: string;
  data: IUserInfoData;
}
export interface IUserDocumentsData {
  created: string;
  description: string;
  id: string;
  name: string;
  ob_build: string;
  ob_handler_id: string;
  ob_message: string;
  status: string;
  status_desc: string;
  type: string;
  url: string;
}
export interface IUserDocumentsResponse {
  code: number;
  message: string;
  data: IUserDocumentsData[];
}
