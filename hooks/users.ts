import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const createOrReturnUser = async () => {
  const authUser = await currentUser();

  if (!authUser) throw new Error("Usuário não autenticado");

  const user = await prisma.user.findUnique({
    where: {
      userId: authUser.id,
    },
  });

  if (!user) {
    return prisma.user.create({
      data: {
        userId: authUser.id,
        name: authUser.fullName,
        email: authUser.primaryEmailAddress?.emailAddress ?? "",
        image: authUser.imageUrl,
      },
    });
  }
};

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  const latestUsers = users.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return { latestUsers };
};
