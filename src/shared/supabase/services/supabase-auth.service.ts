import {
  SupabaseClient,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { supabaseSetup } from "../supabase-setup";

class SupabaseAuthService {
  static #instance: SupabaseAuthService;
  public _client!: SupabaseClient;

  public accessToken: string = "";
  public refreshToken: string = "";

  private constructor() {
    this._client = supabaseSetup._client;
  }

  public static getInstance(): SupabaseAuthService {
    if (!SupabaseAuthService.#instance)
      SupabaseAuthService.#instance = new SupabaseAuthService();
    return SupabaseAuthService.#instance;
  }

  public signUp(data: SignUpWithPasswordCredentials) {
    return supabaseSetup._client.auth.signUp(data);
  }

  public signIn(data: SignInWithPasswordCredentials) {
    return supabaseSetup._client.auth.signInWithPassword(data);
  }

  public signOut() {
    return supabaseSetup._client.auth.signOut();
  }

  public delete(id: string) {
    return supabaseSetup._client.auth.admin.deleteUser(id);
  }

  public async updateUser(data: {
    displayName?: string;
    phoneNumber?: string;
  }) {
    const { data: userData, error } =
      await supabaseSetup._client.auth.updateUser({
        data: {
          phone: data.phoneNumber,
          display_name: data.displayName,
        },
      });

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

export const supabaseAuthService = SupabaseAuthService.getInstance();
