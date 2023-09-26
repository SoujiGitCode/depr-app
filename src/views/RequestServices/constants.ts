export const primaryColor = "#009999";
export const placeholderColor = "rgba(51, 51, 51, 0.4)";
export const status1 = [
  {
    magicNumber: 0,
    status: "disabled",
  },
  {
    magicNumber: 1,
    status: "available",
  },
  {
    magicNumber: 2,
    status: "sent",
  },
  {
    magicNumber: 3,
    status: "inReview",
  },
];
export const submitStatus = {
  DISABLED: 0,
  AVAILABLE: 1,
  SENT: 2,
  IN_REVIEW: 3,
};

export const optionsService = [
  "Admissions Documents Upload",
  "Credentialing Process",
  "Financial Aid Documents Upload",
  "Transcript Requests",
  "Application for Graduation",
  "Graduation Certification",
  "Reasonable Accommodations Application",
];

export const selectStyles = {
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#009999",
    borderRadius: 0,
    border: "2px solid " + "#009999",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#009999",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#009999",
  },
  "& .MuiInputLabel-outlined": {
    fontSize: "1rem",
    color: "#333333",
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "#009999",
  },
  "& .MuiOutlinedInput-input": {
    padding: "0.7rem",
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: "#009999",
  },
  // minWidth: "120% !important",
};

export const servicesTextTitle = "Services Request";
export const servicesTextDescription = `
Upload all the credentialing documents as requested in the
credentialing notification sent to your institutional email.
Documents will be reviewed by the Health Services Coordinator
and status of processing will be available in your dashboard.
Remember all documents must be submited in PDF format.`;
