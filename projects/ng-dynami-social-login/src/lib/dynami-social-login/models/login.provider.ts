import { SocialUserModel } from "./social.user.model";

export interface LoginProvider {
  initialize(): Promise<SocialUserModel>;
  signIn(): Promise<SocialUserModel>;
  signOut(): Promise<any>;
}
