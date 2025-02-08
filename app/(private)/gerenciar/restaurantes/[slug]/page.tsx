import { notFound } from "next/navigation";

import { getCategories } from "@/hooks/categories";
import { getUserRestaurantBySlug } from "@/hooks/restaurants";

import { Separator } from "@/components/ui/separator";
import { EditCategoryRestaurantForm } from "./edit-category-restaurant-form";
import { EditRestaurantForm } from "./edit-restaurant-form";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditRestaurant({ params }: Props) {
  const { slug } = await params;

  const { restaurant, categories } = await getUserRestaurantBySlug(slug);
  const { latestCategories } = await getCategories();

  if (!restaurant) return notFound();

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Restaurante
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          {restaurant.name}
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Edite as informações do seu restaurante. Preencha os campos abaixo.
        </p>
      </section>

      <Separator className="h-1" />

      <section className="max-w-5xl mx-auto p-4 space-y-6">
        <p className="text-muted-foreground uppercase font-semibold tracking-wider">
          Informações básicas
        </p>

        <EditRestaurantForm restaurant={restaurant} />
      </section>

      <Separator className="h-1" />

      <section className="max-w-5xl mx-auto p-4 space-y-6">
        <p className="text-muted-foreground uppercase font-semibold tracking-wider">
          Categorias do restaurante
        </p>

        <EditCategoryRestaurantForm
          restaurant={restaurant}
          categories={categories}
          allCategories={latestCategories}
        />
      </section>
    </main>
  );
}
