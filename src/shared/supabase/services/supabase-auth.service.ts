import {
  SupabaseClient,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import SupabaseSetup from "../supabase-setup";

export default class SupabaseAuthService {
  #setup = SupabaseSetup.getInstance();

  static #instance: SupabaseAuthService;
  public _client!: SupabaseClient;

  public accessToken: string = "";
  public refreshToken: string = "";

  private constructor() {
    this._client = this.#setup._client;
  }

  public static getInstance(): SupabaseAuthService {
    if (!SupabaseAuthService.#instance)
      SupabaseAuthService.#instance = new SupabaseAuthService();
    return SupabaseAuthService.#instance;
  }

  public signUp(data: SignUpWithPasswordCredentials) {
    return this.#setup._client.auth.signUp(data);
  }

  public signIn(data: SignInWithPasswordCredentials) {
    return this.#setup._client.auth.signInWithPassword(data);
  }

  public signOut() {
    return this.#setup._client.auth.signOut();
  }

  public delete(id: string) {
    return this.#setup._client.auth.admin.deleteUser(id);
  }

  public async updateUser(data: {
    displayName?: string;
    phoneNumber?: string;
  }) {
    const { data: userData, error } = await this.#setup._client.auth.updateUser(
      {
        data: {
          phone: data.phoneNumber,
          display_name: data.displayName,
        },
      }
    );

    if (error) throw error;
    return userData;
  }

  public checkSession() {
    this._client.auth
      .setSession({
        access_token: this.accessToken,
        refresh_token: this.refreshToken,
      })
      .then(() => {})
      .catch(() => {});
  }
}
