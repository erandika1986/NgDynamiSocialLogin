import { SocialUserModel } from "./social.user.model";
import { LoginProvider } from "./login.provider";
import { LoginProviderClassModel } from "./login.provider.class.model";


export abstract class BaseLoginProvider implements LoginProvider {
  constructor() {}

  abstract initialize(): Promise<SocialUserModel>;
  abstract signIn(): Promise<SocialUserModel>;
  abstract signOut(): Promise<any>;

  loadScript(obj: LoginProviderClassModel, onload: any): void {
    if (document.getElementById(obj.name)) { return; }
    let signInJS = document.createElement('script');
    signInJS.async = true;
    signInJS.src = obj.url;
    signInJS.onload = onload;
    if (obj.name === 'LINKEDIN') {
      signInJS.async = false;
      signInJS.text = ('api_key: ' + obj.id).replace('\'', '');
    }
    document.head.appendChild(signInJS);
  }
}