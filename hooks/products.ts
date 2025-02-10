import { auth } from "@/auth";
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
  const session = await auth();

  if (!session?.user) throw new Error("Usuário não autenticado");

  const hasRestaurant = await prisma.restaurant.findFirst({
    where: {
      slug,
      ownerId: session.user.id,
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

export const getProductByUserRestaurant = async (
  slug: string,
  productSlug: string
) => {
  const session = await auth();

  if (!session?.user) throw new Error("Usuário não autenticado");

  const hasRestaurant = await prisma.restaurant.findFirst({
    where: {
      slug,
      ownerId: session.user.id,
    },
    include: {
      products: {
        where: {
          slug: productSlug,
        },
        include: {
          reviews: true,
        },
      },
    },
  });

  if (!hasRestaurant) throw new Error("Restaurante não encontrado");

  const product = hasRestaurant.products[0];

  return {
    restaurant: hasRestaurant,
    product,
  };
};
