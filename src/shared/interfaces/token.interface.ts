export interface ITokenData {
  user_name: string;
  user_email: string;
  user_profile_id: string;
  supabase_access_token: string;
  supabase_refresh_token: string;
}

export interface ITokenDecodeResult {
  iat: number;
  payload: ITokenData;
}
