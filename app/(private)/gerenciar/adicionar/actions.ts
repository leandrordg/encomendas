"use server";

import { revalidatePath } from "next/cache";

import { createOrReturnUser } from "@/hooks/users";
import { prisma } from "@/lib/prisma";

interface Props {
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
}

export const createRestaurant = async (data: Props) => {
  const user = await createOrReturnUser();

  if (!user) throw new Error("Usuário não encontrado");

  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        ...data,
        ownerId: user.userId,
      },
    });

    revalidatePath("/gerenciar");

    return restaurant;
  } catch {
    throw new Error("Erro ao criar restaurante");
  }
};
