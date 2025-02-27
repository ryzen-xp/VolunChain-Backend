import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
  async createUser(username: string, email: string, password_hash: string, role: string) {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) throw new Error('Email already exists');

    return await prisma.users.create({
      data: { username, email, password_hash, role },
    });
  }

  async getUserById(id: number) {
    return await prisma.users.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return await prisma.users.findUnique({ where: { email } });
  }
}

export default UserService;
