import { getProductsByRestaurant } from "@/hooks/products";
import { Restaurant } from "@prisma/client";

import { ProductCard } from "@/components/cards/product-card";

interface Props {
  restaurant: Restaurant;
}

export async function RestaurantProductList({ restaurant }: Props) {
  const { latestProducts } = await getProductsByRestaurant(restaurant.slug!);

  return (
    <section className="max-w-5xl mx-auto p-4 space-y-4">
      {latestProducts?.length > 0 && (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
            Todos os produtos
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {latestProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                restaurant={restaurant}
                reviews={product.reviews}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
