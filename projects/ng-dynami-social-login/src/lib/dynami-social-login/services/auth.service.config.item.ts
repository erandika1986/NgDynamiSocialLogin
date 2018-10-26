import { LoginProvider } from "../models/login.provider";


export interface AuthServiceConfigItem {
    id: string;
    provider: LoginProvider;
  }