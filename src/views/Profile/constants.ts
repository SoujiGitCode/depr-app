export const initialValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  second_last_name: "",
  student_id: "",
  birthdate: "",
  cell_phone: "",
  alternative_phone: "",
  email: "",
  institucional_email: "",
  entrance_year: "",
  campus: "",
  entrance_terms: "",
  address_line1: "",
  address_line2: "",
  address_city: "",
  address_state: "",
  address_zipcode: "",
  program: "",
}

const primaryColor = "#009999";
const placeholderColor = "rgba(51, 51, 51, 0.4)";

export const CustomTextField = {
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: primaryColor,
    borderRadius: 0,
    border: "2px solid " + primaryColor,
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: primaryColor,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: primaryColor,
  },
  "& .MuiInputLabel-outlined": {
    fontSize: "1rem",
    color: placeholderColor,
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: primaryColor,
  },
  "& .MuiOutlinedInput-input": {
    padding: "0.7rem",
  },
};