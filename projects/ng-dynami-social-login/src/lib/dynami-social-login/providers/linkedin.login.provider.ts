import { BaseLoginProvider } from "../models/base.login.provider";
import { LoginProviderClassModel } from "../models/login.provider.class.model";
import { SocialUserModel } from "../models/social.user.model";
import { LinkedInResponseModel } from "../models/linkedin.response.model";


declare let IN: any;

export class LinkedinLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID = 'linkedin';
  public loginProviderObj: LoginProviderClassModel = new LoginProviderClassModel();

  constructor(private clientId: string) {
    super();
    this.loginProviderObj.id = clientId;
    this.loginProviderObj.name = 'linkedin';
    this.loginProviderObj.url = 'https://platform.linkedin.com/in.js';
  }

  initialize(): Promise<SocialUserModel> {
    return new Promise((resolve, reject) => {
      this.loadScript(this.loginProviderObj, () => {
          IN.init({
            api_key: this.clientId,
            authorize: true,
            onLoad: this.onLinkedInLoad()
          });

          IN.Event.on(IN, 'auth', () => {
            if (IN.User.isAuthorized()) {
              IN.API.Raw(
                '/people/~:(id,first-name,last-name,email-address,picture-url)'
              ).result( (res: LinkedInResponseModel) => {
                resolve(this.drawUser(res));
              });
            }
          });

        });
    });
  }

  onLinkedInLoad() {
    IN.Event.on(IN, 'systemReady', () => {
      IN.User.refresh();
    });
  }

  drawUser(response: LinkedInResponseModel): SocialUserModel {
    let user: SocialUserModel = new SocialUserModel();
    user.id = response.emailAddress;
    user.name = response.firstName + ' ' + response.lastName;
    user.email = response.emailAddress;
    user.image = response.pictureUrl;
    user.token = IN.ENV.auth.oauth_token;
    return user;
  }

  signIn(): Promise<SocialUserModel> {
    return new Promise((resolve, reject) => {
      IN.User.authorize( () => {
        IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result( (res: LinkedInResponseModel) => {
          resolve(this.drawUser(res));
        });
      });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      IN.User.logout((response: any) => {
        resolve();
      }, (err: any) => {
        reject(err);
      });
    });
  }

}
