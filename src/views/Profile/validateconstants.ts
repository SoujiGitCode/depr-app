import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters")
    .nullable()
    .min(3, "Minimum of 3 characters")
    .max(20, "Maximum of 20 characters"),
  middle_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters")
    .nullable()
    .min(3, "Minimum of 3 characters")
    .max(20, "Maximum of 20 characters"),
  last_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters")
    .nullable()
    .min(3, "Minimum of 3 characters")
    .max(20, "Maximum of 20 characters"),
  second_last_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters")
    .nullable()
    .min(3, "Minimum of 3 characters")
    .max(20, "Maximum of 20 characters"),
  student_id: Yup.string()
    .matches(/^[0-9]+$/, "Only numbers")
    .nullable()
    .max(15, "Maximum of 15 characters"),
  birthdate: Yup.date().required("Required"),
  cell_phone: Yup.string()
    .matches(/^[0-9]+$/, "Only numbers")
    .nullable()
    .max(30, "Maximum of 30 characters"),
  alternative_phone: Yup.string()
    .matches(/^[0-9-]+$/, "Only numbers and hyphens")
    .nullable()
    .max(15, "Maximum of 15 characters"),
  email: Yup.string().email("Invalid email format").nullable(),
  institucional_email: Yup.string()
    .email("Invalid email format")
    .nullable()
    .max(100, "Maximum of 100 characters"),
  entrance_year: Yup.string()
    .matches(/^[0-9]+$/, "Only numbers")
    .nullable()
    .max(15, "Maximum of 15 characters"),
  campus: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters")
    .nullable()
    .min(3, "Minimum of 3 characters")
    .max(20, "Maximum of 20 characters"),
  entrance_terms: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters")
    .nullable()
    .min(3, "Minimum of 3 characters")
    .max(20, "Maximum of 20 characters"),
  address_line1: Yup.string()
    .matches(/^[A-Za-z0-9\s]+$/, "Only letters, numbers, and spaces")
    .max(15, "Maximum of 15 characters")
    .nullable(),
  address_line2: Yup.string()
    .matches(/^[A-Za-z0-9\s]+$/, "Only letters, numbers, and spaces")
    .max(15, "Maximum of 15 characters")
    .nullable(),
  address_city: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces")
    .nullable()
    .min(3, "Minimum of 3 characters")
    .max(20, "Maximum of 20 characters"),
  address_state: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces")
    .nullable()
    .min(3, "Minimum of 3 characters")
    .max(20, "Maximum of 20 characters"),
  address_zipcode: Yup.string()
    .matches(/^[0-9]+$/, "Only numbers")
    .nullable()
    .max(15, "Maximum of 15 characters"),
  program: Yup.string()
    .matches(/^[A-Za-z-]+$/, "Only letters and hyphens are allowed")
    .nullable()
    .max(15, "Maximum of 15 characters"),
});
