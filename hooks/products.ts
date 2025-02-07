import { prisma } from "@/lib/prisma";

export const getProducts = async () => {
  return await prisma.product.findMany({
    include: {
      restaurant: true,
    },
  });
};

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      restaurant: true,
      reviews: {
        include: {
          customer: true,
        },
      },
    },
  });

  return {
    product,
    restaurant: product?.restaurant,
    reviews: product?.reviews,
  };
};

export const getProductsByRestaurant = async (slug: string) => {
  const hasRestaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!hasRestaurant) return { latestProducts: [] };

  const products = await prisma.product.findMany({
    where: {
      restaurant: {
        slug,
      },
    },
    include: {
      reviews: {
        include: {
          customer: true,
        },
      },
    },
  });

  return {
    latestProducts: products,
  };
};
