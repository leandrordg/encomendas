import { prisma } from "@/lib/prisma";

export const getAddressesByRestaurant = async (slug: string) => {
  return await prisma.address.findMany({
    where: {
      restaurant: {
        slug,
      },
    },
    include: {
      phoneNumber: true,
      restaurant: true,
    },
  });
};
