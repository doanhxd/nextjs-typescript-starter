import { RegisterInput } from "../types/RegisterInput";

export const validateRegisterInput = (registerInput: RegisterInput) => {
  if (!registerInput.email.includes("@"))
    return {
      message: "Invalid email",
      errors: [{ field: "email", message: "Email must include @ symbol" }],
    };

  if (registerInput.username.length <= 2)
    return {
      message: "Invalid username",
      errors: [{ field: "username", message: "Length must me greater than 2" }],
    };

  if (registerInput.username.includes("@"))
    return {
      message: "Invalid username",
      errors: [
        { field: "username", message: "Username cannot include @ symbol" },
      ],
    };

  if (registerInput.password.length <= 6)
    return {
      message: "Invalid password",
      errors: [
        {
          field: "password",
          message: "Password length must me greater than 6",
        },
      ],
    };

  return null;
};
