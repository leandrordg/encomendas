import { notFound } from "next/navigation";

import { getRestaurantsByCategory } from "@/hooks/restaurants";
import { InfoIcon } from "lucide-react";

import { RestaurantCard } from "@/components/cards/restaurant-card";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function IndividualCategory({ params }: Props) {
  const { slug } = await params;

  const { category, latestRestaurants } = await getRestaurantsByCategory(slug);

  if (!category) return notFound();

  const emptyCategory = latestRestaurants.length === 0;

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Categorias
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          {category.name}
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          {category.description ||
            "Encontre os melhores restaurantes perto de você."}
        </p>

        {emptyCategory && (
          <div className="flex sm:items-center gap-4 p-6 border rounded-md mt-14 text-sm text-muted-foreground">
            <InfoIcon className="size-4 shrink-0" />
            Não encontramos restaurantes nesta categoria.
          </div>
        )}

        {latestRestaurants.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Restaurantes mais recentes
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {latestRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  categories={restaurant.categories}
                  products={restaurant.products}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
