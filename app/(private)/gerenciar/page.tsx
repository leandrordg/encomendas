import Link from "next/link";

import { getRestaurantsByUser } from "@/hooks/restaurants";
import { MapPinPlusInsideIcon } from "lucide-react";

import { RestaurantCard } from "@/components/cards/restaurant-card";
import { InfoBanner } from "@/components/info-banner";
import { Button } from "@/components/ui/button";

export default async function Manage() {
  const { restaurants } = await getRestaurantsByUser();

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Painel de controle
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          Gerenciar
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Visão geral dos seus restaurantes. Adicione, edite ou remova
          restaurantes da sua lista.
        </p>
      </section>

      <section className="max-w-5xl mx-auto p-4 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
            Meus restaurantes
          </h2>

          {restaurants.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  type="manage"
                  key={restaurant.id}
                  restaurant={restaurant}
                  categories={restaurant.categories}
                  products={restaurant.products}
                  reviews={restaurant.reviews}
                />
              ))}
            </div>
          ) : (
            <InfoBanner>
              Não encontramos restaurantes cadastrados para você.
            </InfoBanner>
          )}
        </div>

        <Button asChild>
          <Link href="/gerenciar/adicionar">
            <MapPinPlusInsideIcon />
            Adicionar restaurante
          </Link>
        </Button>
      </section>

      <section className="max-w-5xl mx-auto p-4 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
            Todos os pedidos
          </h2>

          <InfoBanner>
            Você não possui pedidos para gerenciar no momento.
          </InfoBanner>
        </div>
      </section>
    </main>
  );
}
