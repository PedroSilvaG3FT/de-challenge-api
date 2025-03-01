export interface ITokenData {
  user_id: string;
  user_name: string;
  user_email: string;
  supabase_access_token: string;
  supabase_refresh_token: string;
}

export interface ITokenDecodeResult {
  iat: number;
  payload: ITokenData;
}
