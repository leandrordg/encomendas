import { getCategories } from "@/hooks/categories";
import { getRestaurants } from "@/hooks/restaurants";

import { CategoryCard } from "@/components/category-card";
import { RestaurantCard } from "@/components/restaurant-card";

export default async function Explore() {
  const { latestRestaurants } = await getRestaurants();
  const { latestCategories } = await getCategories();

  return (
    <main className="py-10 md:py-14 lg:py-20">
      <section className="max-w-5xl mx-auto p-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          Explore todos os restaurantes e categorias
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Encontre os melhores restaurantes perto de você. Faça seu pedido
          agora!
        </p>

        {latestRestaurants.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Últimos restaurantes
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
          <div className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Adicionadas recentemente
            </h2>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {latestCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  restaurants={category.restaurants}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
