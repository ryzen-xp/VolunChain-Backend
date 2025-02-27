import { PrismaClient, users } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const newUser: users = await prisma.users.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      password_hash: 'hashed_password',
      role: 'user'
    },
  });
  console.log('New user created:', newUser);

  const allUsers: users[] = await prisma.users.findMany();
  console.log('All users:', allUsers);

  const userByEmail: users | null = await prisma.users.findUnique({
    where: {
      email: 'john@example.com'
    },
  });
  console.log('User found by email:', userByEmail);

  const updatedUser: users = await prisma.users.update({
    where: {
      id: newUser.id,
    },
    data: {
      email: 'john_updated@example.com'
    },
  });
  console.log('User updated:', updatedUser);

  const deletedUser: users = await prisma.users.delete({
    where: {
      id: newUser.id,
    },
  });
  console.log('User deleted:', deletedUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
