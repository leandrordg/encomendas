import { prisma } from "@/lib/prisma";

export const getReviewsByRestaurant = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) throw new Error("Restaurante não encontrado.");

  const reviews = await prisma.review.findMany({
    where: {
      restaurantId: restaurant.id,
    },
    include: {
      customer: true,
    },
  });

  return {
    restaurant,
    reviews,
  };
};
