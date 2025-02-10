"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface CreateProductProps {
  restaurantId: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  price: string;
}

export const createProduct = async (values: CreateProductProps) => {
  const session = await auth();

  if (!session?.user) throw new Error("Usuário não encontrado.");

  const restaurantOwner = await prisma.restaurant.findFirst({
    where: {
      id: values.restaurantId,
      ownerId: session.user.id,
    },
  });

  if (!restaurantOwner)
    throw new Error("Sem permissão para adicionar produto.");

  const price = parseFloat(values.price);

  const data = {
    ...values,
    price,
  };

  try {
    const product = await prisma.product.create({ data });

    revalidatePath("/gerenciar/adicionar");

    return product;
  } catch {
    throw new Error("Erro ao adicionar produto.");
  }
};
