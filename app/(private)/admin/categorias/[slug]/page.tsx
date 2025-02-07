import { notFound } from "next/navigation";

import { getCategoryBySlug } from "@/hooks/categories";
import { EditCategoryForm } from "./edit-category-form";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminCategories({ params }: Props) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) return notFound();

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Categoria
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          {category.name}
        </h1>
      </section>

      <section className="max-w-5xl mx-auto p-4">
        <EditCategoryForm category={category} />
      </section>
    </main>
  );
}
