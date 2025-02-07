import Link from "next/link";

import { getRestaurantsByUser } from "@/hooks/restaurants";
import { MapPinPlusInsideIcon } from "lucide-react";

import { RestaurantCard } from "@/components/cards/restaurant-card";
import { InfoBanner } from "@/components/info-banner";
import { Button } from "@/components/ui/button";

export default async function Manage() {
  const { restaurants } = await getRestaurantsByUser();

  // TODO: get orders by user
  const { orders } = { orders: [] };

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Painél de controle
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
        {restaurants.length === 0 && (
          <InfoBanner>Não encontramos restaurantes nesta categoria.</InfoBanner>
        )}

        {restaurants.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Meus restaurantes
            </h2>

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
          </div>
        )}

        <Button asChild>
          <Link href="/manage/create">
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

          {orders.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-6">
              {orders.map((order, index) => (
                <div key={index}>
                  <div className="p-4 border rounded-md">
                    <p className="font-medium">Pedido #{index + 1}</p>
                    <p className="text-sm text-muted-foreground">
                      Envie o seu pedido o quanto antes. O cliente está
                      esperando por você.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <InfoBanner>Não encontramos nenhum pedido para você.</InfoBanner>
          )}
        </div>
      </section>
    </main>
  );
}
