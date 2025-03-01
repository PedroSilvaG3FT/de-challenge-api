import { UserService } from "./user.service";
import { ICreateUser } from "@/shared/schemas/user.schema";
import { ResponseUtil } from "@/shared/utils/response.util";
import { TokenService } from "@/core/services/token.service";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";
import { supabaseAuthService } from "@/shared/supabase/services/supabase-auth.service";

export class AuthService {
  #userService = new UserService();

  public signUp = async (data: ICreateUser) => {
    return this.#userService.create(data);
  };

  public signIn = async (data: SignInWithPasswordCredentials) => {
    const response = await supabaseAuthService.signIn(data);

    if (!response.data.user) {
      const message = response.error?.message || "User not found";
      return ResponseUtil.notFound([message]);
    }

    const profile = await this.#userService.getByUserId(response.data.user.id);
    if (!profile) return ResponseUtil.notFound(["Profile not found"]);

    return ResponseUtil.success({
      user: profile,
      token: TokenService.generate({
        user_id: profile.id,
        user_name: profile.name,
        user_email: profile.email,
        supabase_access_token: response.data.session?.access_token,
        supabase_refresh_token: response.data.session?.refresh_token,
      }),
    });
  };
}
