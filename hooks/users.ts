import { prisma } from "@/lib/prisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  const latestUsers = users.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return { latestUsers };
};
