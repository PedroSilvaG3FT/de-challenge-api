import { randomUUID } from "crypto";
import { ICreateUser } from "@/shared/schemas/user.schema";
import { ProfileRepository } from "../repositories/profile.repository";
import { supabaseAuthService } from "@/shared/supabase/services/supabase-auth.service";

export class UserService {
  #profileRepository = new ProfileRepository();

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

    const signUpResponse = await supabaseAuthService.signUp({
      email: data.email,
      phone: data.phone || "",
      password: data.password,
    });

    if (!signUpResponse.data?.user?.id) throw new Error(`User not created`);

    const profile = await this.#profileRepository.create({
      id: randomUUID(),

      active: true,
      name: data.name,
      email: data.email,
      birthDate: new Date(data.birthDate),
      userId: signUpResponse.data.user.id,
    });

    return profile;
  };

  public delete = async (id: string) => {
    const user = await this.getById(id);

    if (!user) throw new Error(`User does not exist`);

    await this.#profileRepository.delete(id);
    await supabaseAuthService.delete(user.userId);
  };
}
