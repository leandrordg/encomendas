"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface UpdateProductProps {
  restaurantId: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  price: string;
}

export const updateProduct = async (values: UpdateProductProps) => {
  const session = await auth();

  if (!session?.user) throw new Error("Usuário não autenticado");

  const restaurantOwner = await prisma.restaurant.findFirst({
    where: {
      id: values.restaurantId,
      ownerId: session.user.id,
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
