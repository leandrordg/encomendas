import Link from "next/link";

import { getCategories } from "@/hooks/categories";
import { getRestaurants } from "@/hooks/restaurants";
import { SearchIcon } from "lucide-react";

import { CategoryCard } from "@/components/cards/category-card";
import { RestaurantCard } from "@/components/cards/restaurant-card";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { latestRestaurants } = await getRestaurants();
  const { latestCategories } = await getCategories();

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-12">
      <section className="min-h-[60dvh] max-w-5xl mx-auto p-4 content-center md:text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-balance">
          Sua{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#b81414] via-[#da3434] to-[#f5a623]">
            comida favorita
          </span>
          , entregue com rapidez e sabor até a sua casa.
        </h1>

        <p className="text-muted-foreground mt-6 max-w-md mx-auto">
          Encontre os melhores restaurantes da sua região e receba a comida que
          você ama em poucos minutos.
        </p>

        <Button variant="destructive" className="w-full max-w-sm mt-8" asChild>
          <Link href="/explorar">
            <SearchIcon />
            Explorar
          </Link>
        </Button>
      </section>

      <section className="max-w-5xl mx-auto p-4 space-y-14">
        {latestRestaurants.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Novos restaurantes
            </h2>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-6">
              {latestRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  categories={restaurant.categories}
                  products={restaurant.products}
                  reviews={restaurant.reviews}
                />
              ))}
            </div>
          </div>
        )}

        {latestCategories.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Adicionadas recentemente
            </h2>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {latestCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
