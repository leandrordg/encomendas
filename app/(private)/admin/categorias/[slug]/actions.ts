"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface Props {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
}

export const updateCategory = async (data: Props) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Usuário não autenticado");

  // TODO: verify if user is admin

  // verify if the slug is already in use by another category
  const categoryWithSlug = await prisma.category.findFirst({
    where: {
      slug: data.slug,
      NOT: {
        id: data.id,
      },
    },
  });

  if (categoryWithSlug) throw new Error("Categoria com slug já existente");

  try {
    const category = await prisma.category.update({
      where: {
        id: data.id,
      },
      data,
    });

    revalidatePath("/admin/categorias");

    return category;
  } catch {
    throw new Error("Erro ao atualizar categoria");
  }
};
