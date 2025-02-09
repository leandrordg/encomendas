import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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

  if (!hasRestaurant) throw new Error("Restaurante não encontrado");

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
    restaurant: hasRestaurant,
    latestProducts: products,
  };
};

export const getProductsByUserRestaurant = async (slug: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Usuário não autenticado");

  const hasRestaurant = await prisma.restaurant.findFirst({
    where: {
      slug,
      ownerId: userId,
    },
    include: {
      products: {
        include: {
          reviews: true,
        },
      },
    },
  });

  if (!hasRestaurant) throw new Error("Restaurante não encontrado");

  return {
    restaurant: hasRestaurant,
    products: hasRestaurant.products,
  };
};
