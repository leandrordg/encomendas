"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

interface Props {
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
}

export const createRestaurant = async (data: Props) => {
  const user = await currentUser();

  if (!user) throw new Error("Usuário não autenticado");

  const userExists = await prisma.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userExists) {
    await prisma.user.create({
      data: {
        userId: user.id,
        firstName: user.firstName ?? "",
        lastName: user.lastName,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user.imageUrl,
      },
    });
  }

  const restaurant = await prisma.restaurant.create({
    data: {
      ...data,
      owner: {
        connect: {
          userId: user.id,
        },
      },
    },
  });

  revalidatePath("/gerenciar");

  return restaurant;
};
