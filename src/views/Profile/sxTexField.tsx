const primaryColor = "#009999";
const placeholderColor = "rgba(51, 51, 51, 0.4)";
const customTextField = {
  width: "130px",
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
    height: "0.5rem",
  },
};

export default customTextField;
