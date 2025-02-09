import { ProductCard } from "@/components/cards/product-card";
import { InfoBanner } from "@/components/info-banner";
import { Button } from "@/components/ui/button";
import { getProductsByUserRestaurant } from "@/hooks/products";
import { MapPinPlusInsideIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantProducts({ params }: Props) {
  const { slug } = await params;

  const { restaurant, products } = await getProductsByUserRestaurant(slug);

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Produtos
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          {restaurant.name}
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Veja todos os produtos disponíveis no seu restaurante. Adicione, edite
          e remova produtos a qualquer momento.
        </p>
      </section>

      <section className="max-w-5xl mx-auto p-4 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
            Todos os produtos
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {products.map((product) => (
                <ProductCard
                  type="manage"
                  key={product.id}
                  product={product}
                  restaurant={restaurant}
                  reviews={product.reviews}
                />
              ))}
            </div>
          ) : (
            <InfoBanner>
              Não há produtos cadastrados no seu restaurante.
            </InfoBanner>
          )}
        </div>

        <Button asChild>
          <Link href="/gerenciar/adicionar/produto">
            <MapPinPlusInsideIcon />
            Adicionar produto
          </Link>
        </Button>
      </section>
    </main>
  );
}
