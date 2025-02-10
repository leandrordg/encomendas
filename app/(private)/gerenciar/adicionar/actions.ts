"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface Props {
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
}

export const createRestaurant = async (data: Props) => {
  const session = await auth();

  if (!session?.user) throw new Error("Usuário não autenticado");

  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        ...data,
        ownerId: session.user.id!,
      },
    });

    revalidatePath("/gerenciar");

    return restaurant;
  } catch {
    throw new Error("Erro ao criar restaurante");
  }
};
