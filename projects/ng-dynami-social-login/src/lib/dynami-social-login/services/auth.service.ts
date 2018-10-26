import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginProvider } from "../models/login.provider";
import { SocialUserModel } from "../models/social.user.model";
import { AuthServiceConfig } from "./auth.service.config";


@Injectable()
export class AuthService {

  private static readonly LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';

  private providers: Map<string, LoginProvider>;

  private _user: SocialUserModel = null;
  private _authState: BehaviorSubject<SocialUserModel> = new BehaviorSubject(null);

  get authState(): Observable<SocialUserModel> {
    return this._authState.asObservable();
  }

  constructor(config: AuthServiceConfig) {
    this.providers = config.providers;
    this.providers.forEach((provider: LoginProvider, key: string) => {
      provider.initialize().then((user: SocialUserModel) => {
        user.provider = key;
        this._user = user;
        this._authState.next(user);
      }).catch((err) => {
        // this._authState.next(null);
      });
    });
  }

  signIn(providerId: string): Promise<SocialUserModel> {
    return new Promise((resolve, reject) => {
      let providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.signIn().then((user: SocialUserModel) => {
          user.provider = providerId;
          resolve(user);
          this._user = user;
          this._authState.next(user);
        });
      } else {
        reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._user && this._user.provider) {
        let providerId = this._user.provider;
        let providerObject = this.providers.get(providerId);
        providerObject.signOut().then(() => {
          this._user = null;
          this._authState.next(null);
          resolve();
        }).catch((err) => {
          this._authState.next(null);
        });
      } else {
        reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }

}