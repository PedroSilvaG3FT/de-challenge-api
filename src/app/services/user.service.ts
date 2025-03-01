import { randomUUID } from "crypto";
import { ICreateUser } from "@/shared/schemas/user.schema";
import { ProfileRepository } from "../repositories/profile.repository";
import SupabaseAuthService from "@/shared/supabase/services/supabase-auth.service";

export class UserService {
  #profileRepository = new ProfileRepository();
  #supabaseAuthService = SupabaseAuthService.getInstance();

  public getAll = () => {
    return this.#profileRepository.getAll();
  };

  public getById = (data: string) => {
    return this.#profileRepository.getById(data);
  };

  public getByEmail = (data: string) => {
    return this.#profileRepository.getByEmail(data);
  };

  public getByUserId = (data: string) => {
    return this.#profileRepository.getByUserId(data);
  };

  public create = async (data: ICreateUser) => {
    const user = await this.getByEmail(data.email);
    if (user) throw new Error(`User exists`);

    const signUpResponse = await this.#supabaseAuthService.signUp({
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    const userId = signUpResponse.data?.user?.id || "";

    const profile = await this.#profileRepository.create({
      id: randomUUID(),

      userId,
      active: true,
      name: data.name,
      email: data.email,
      birthDate: new Date(),
    });

    return profile;
  };

  public delete = async (id: string) => {
    const user = await this.getById(id);

    if (!user) throw new Error(`User does not exist`);

    await this.#profileRepository.delete(id);
    await this.#supabaseAuthService.delete(user.userId);
  };
}
