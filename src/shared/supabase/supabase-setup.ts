import { enviroments } from "@/core/enviroments";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

class SupabaseSetup {
  #client: SupabaseClient;
  static #instance: SupabaseSetup;

  private constructor() {
    this.#client = createClient(
      enviroments.SUPABASE_URL,
      enviroments.SUPABASE_KEY
    );
  }

  public static getInstance(): SupabaseSetup {
    if (!SupabaseSetup.#instance) SupabaseSetup.#instance = new SupabaseSetup();
    return SupabaseSetup.#instance;
  }

  public get _client(): SupabaseClient {
    return this.#client;
  }
}

export const supabaseSetup = SupabaseSetup.getInstance();
