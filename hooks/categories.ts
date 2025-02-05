import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
  const categories = await prisma.category.findMany({
    include: {
      restaurants: {
        include: {
          products: true,
        },
      },
    },
  });

  const latestCategories = categories.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return { latestCategories };
};

export const getPopularCategories = async () => {
  return await prisma.category.findMany({
    include: {
      restaurants: {
        include: {
          products: true,
        },
      },
    },
  });
};
