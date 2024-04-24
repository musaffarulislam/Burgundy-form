import * as yup from "yup"

const formValidation = yup
  .object({
    name: yup
      .string()
      .required("Username is required.")
      .min(3, "Username must be at least 3 characters.")
      .max(20, "Username must not exceed 20 characters."),
    phoneNumber: yup
      .string()
      .required("Phone number is required.")
      .matches(/^[0-9]{10}$/, "Phone number must be a 10-digit number without any special characters."),
  })
  .required()

export const formValidationWithOtp = yup
  .object({
    name: yup
      .string()
      .required("Username is required.")
      .min(3, "Username must be at least 3 characters.")
      .max(20, "Username must not exceed 20 characters."),
    phoneNumber: yup
      .string()
      .required("Phone number is required.")
      .matches(/^[0-9]{10}$/, "Phone number must be a 10-digit number without any special characters."),
    otp: yup
      .string()
      .required("OTP is required.")
      .length(4, "OTP must be exactly 4 characters.")
      .matches(/^\d+$/, "OTP must consist of only digits."),
  })
  .required()

export default formValidation
