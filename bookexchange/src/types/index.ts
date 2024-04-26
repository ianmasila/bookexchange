import { RoleType } from "./enum";

interface RegisterFormData {
  email: string;
  password: string;
  full_name: string;
}

interface LoginFormData {
  username: string;
  password: string;
  role: RoleType;
}

export type { RegisterFormData, LoginFormData };
