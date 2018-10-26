import { LoginProvider } from "../models/login.provider";
import { AuthServiceConfigItem } from "./auth.service.config.item";

export class AuthServiceConfig {
    providers: Map<string, LoginProvider> = new Map<string, LoginProvider>();
  
    constructor(providers: AuthServiceConfigItem[]) {
      for (let i = 0; i < providers.length; i++) {
        let element = providers[i];
        this.providers.set(element.id, element.provider);
      }
    }
  }