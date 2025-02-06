import { getRestaurantsByUser } from "@/hooks/restaurants";
import { auth } from "@clerk/nextjs/server";

import { RestaurantCard } from "@/components/restaurant-card";
import { InfoIcon, MapPinPlusInsideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Manage() {
  const { userId } = await auth();

  const { restaurants } = await getRestaurantsByUser(userId!);

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          Gerenciar
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Visão geral dos seus restaurantes. Adicione, edite ou remova
          restaurantes da sua lista.
        </p>
      </section>

      <section className="max-w-5xl mx-auto p-4 space-y-8">
        {restaurants.length === 0 && (
          <div className="flex sm:items-center gap-4 p-6 border rounded-md text-sm text-muted-foreground">
            <InfoIcon className="size-4 shrink-0" />
            Não encontramos restaurantes nesta categoria.
          </div>
        )}

        {restaurants.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Meus restaurantes
            </h2>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-6">
              {restaurants.map((restaurant) => (
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

        <Button asChild>
          <Link href="/manage/create">
            <MapPinPlusInsideIcon />
            Adicionar restaurante
          </Link>
        </Button>
      </section>
    </main>
  );
}
