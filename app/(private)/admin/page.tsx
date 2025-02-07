import { getCategories } from "@/hooks/categories";
import { getRestaurants } from "@/hooks/restaurants";
import { getUsers } from "@/hooks/users";
import { InfoIcon } from "lucide-react";

import { CategoryCard } from "@/components/cards/category-card";
import { RestaurantCard } from "@/components/cards/restaurant-card";
import { UserCard } from "@/components/cards/user-card";

export default async function Admin() {
  const { latestCategories } = await getCategories();
  const { latestRestaurants } = await getRestaurants();
  const { latestUsers } = await getUsers();

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Painél de controle
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          Administração
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Visão geral de todas as funcionalidades administrativas. Adicione,
          edite ou remova usuários, produtos, categorias e restaurantes.
        </p>
      </section>

      <section className="max-w-5xl mx-auto p-4 space-y-8">
        {latestCategories.length > 0 ? (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Todas as categorias
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {latestCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  type="admin"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex sm:items-center gap-4 p-6 border rounded-md mt-14 text-sm text-muted-foreground">
            <InfoIcon className="size-4 shrink-0" />
            Não encontramos restaurantes nesta categoria.
          </div>
        )}

        {latestRestaurants.length > 0 ? (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Todos os restaurantes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {latestRestaurants.map((restaurant) => (
                <RestaurantCard
                  type="admin"
                  key={restaurant.id}
                  restaurant={restaurant}
                  categories={restaurant.categories}
                  products={restaurant.products}
                  reviews={restaurant.reviews}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex sm:items-center gap-4 p-6 border rounded-md mt-14 text-sm text-muted-foreground">
            <InfoIcon className="size-4 shrink-0" />
            Não encontramos restaurantes nesta categoria.
          </div>
        )}

        {latestUsers.length > 0 ? (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Usuários
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {latestUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex sm:items-center gap-4 p-6 border rounded-md mt-14 text-sm text-muted-foreground">
            <InfoIcon className="size-4 shrink-0" />
            Não encontramos restaurantes nesta categoria.
          </div>
        )}
      </section>
    </main>
  );
}
