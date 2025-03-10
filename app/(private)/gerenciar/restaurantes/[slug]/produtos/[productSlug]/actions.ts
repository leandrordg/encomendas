"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface UpdateProductProps {
  restaurantId: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  price: string;
}

export const updateProduct = async (values: UpdateProductProps) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Usuário não autenticado");

  const restaurantOwner = await prisma.restaurant.findFirst({
    where: {
      id: values.restaurantId,
      ownerId: userId,
    },
  });

  if (!restaurantOwner) throw new Error("Sem permissão para editar o produto");

  const price = parseFloat(values.price);

  const data = {
    ...values,
    price,
  };

  try {
    const product = await prisma.product.update({
      where: {
        slug: values.slug,
      },
      data,
    });

    revalidatePath("/gerenciar/restaurantes");

    return product;
  } catch {
    throw new Error("Erro ao editar o produto");
  }
};
