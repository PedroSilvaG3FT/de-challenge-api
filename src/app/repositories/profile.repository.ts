import prisma from "@/core/database/prisma";
import { IUserProfile } from "@/shared/schemas/user.schema";

export class ProfileRepository {
  public getById(id: string) {
    return prisma.profile.findUnique({ where: { id } });
  }

  public getByEmail(email: string) {
    return prisma.profile.findUnique({ where: { email } });
  }

  public getByUserId(userId: string) {
    return prisma.profile.findUnique({ where: { userId } });
  }

  public getAll() {
    return prisma.profile.findMany();
  }

  public create(data: IUserProfile) {
    return prisma.profile.create({ data });
  }

  public delete(id: string) {
    return prisma.profile.delete({ where: { id } });
  }
}
