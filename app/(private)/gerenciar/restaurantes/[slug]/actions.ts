"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

interface UpdateRestaurantProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
}

export const updateRestaurant = async (data: UpdateRestaurantProps) => {
  const user = await currentUser();

  if (!user) throw new Error("Usuário não autenticado.");

  // verify if user is restaurant owner
  const restaurantOwner = await prisma.restaurant.findFirst({
    where: {
      id: data.id,
      ownerId: user.id,
    },
  });

  if (!restaurantOwner)
    throw new Error("Você não tem permissão para editar este restaurante.");

  // verify if the slug is already in use by another restaurant
  const restaurantWithSlug = await prisma.restaurant.findFirst({
    where: {
      slug: data.slug,
      NOT: {
        id: data.id,
      },
    },
  });

  if (restaurantWithSlug) throw new Error("Restaurante com slug já existente.");

  try {
    const restaurant = await prisma.restaurant.update({
      where: { id: data.id },
      data,
    });

    revalidatePath("/gerenciar/restaurantes");

    return restaurant;
  } catch {
    throw new Error("Erro ao atualizar restaurante.");
  }
};

interface UpdateRestaurantCategoriesProps {
  restaurantId: string;
  categories: string[];
}

export const updateRestaurantCategories = async (
  data: UpdateRestaurantCategoriesProps
) => {
  const user = await currentUser();

  if (!user) throw new Error("Usuário não autenticado.");

  // verify if user is restaurant owner
  const restaurantOwner = await prisma.restaurant.findFirst({
    where: {
      id: data.restaurantId,
      ownerId: user.id,
    },
  });

  if (!restaurantOwner)
    throw new Error(
      "Você não tem permissão para editar as categorias deste restaurante."
    );

  try {
    const restaurant = await prisma.restaurant.update({
      where: { id: data.restaurantId },
      data: {
        categories: {
          set: data.categories.map((categoryId) => ({ id: categoryId })),
        },
      },
    });

    revalidatePath("/gerenciar/restaurantes");

    return restaurant;
  } catch {
    throw new Error("Erro ao atualizar categorias do restaurante.");
  }
};
