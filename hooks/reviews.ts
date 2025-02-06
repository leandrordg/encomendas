import { prisma } from "@/lib/prisma";

export const getReviewsByRestaurant = async (slug: string) => {
  return await prisma.review.findMany({
    where: {
      restaurant: {
        slug,
      },
    },
    include: {
      customer: true,
      restaurant: true,
    },
  });
};
