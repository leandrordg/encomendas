import Image from "next/image";

import { formatAveragePrice } from "@/lib/utils";
import { Category, Product, Restaurant } from "@prisma/client";

import { AddressDialog } from "@/components/dialog/address-dialog";
import { ReviewsDialog } from "@/components/dialog/rating-dialog";

interface Props {
  restaurant: Restaurant;
  categories?: Category[];
  products?: Product[];
}

export function RestaurantHeader({ restaurant, categories, products }: Props) {
  return (
    <section className="max-w-5xl mx-auto p-4 space-y-4">
      <p className="text-sm uppercase font-semibold tracking-wider">
        Restaurantes
      </p>

      <div className="relative aspect-[6/2] bg-muted rounded-md overflow-clip shadow-sm">
        <Image
          src={restaurant.imageUrl ?? "/images/placeholder.jpeg"}
          alt={restaurant.name}
          className="w-full h-full object-cover bg-muted"
          fill
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance capitalize">
        {restaurant.name}
      </h1>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {categories && categories.length > 0 && (
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <span
                key={category.id}
                className="text-xs text-muted-foreground border rounded-md px-2 py-1"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        <ReviewsDialog slug={restaurant.slug} />

        <p className="text-emerald-600">{formatAveragePrice(products)}</p>
      </div>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-6">
        {restaurant.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <AddressDialog slug={restaurant.slug} />
      </div>
    </section>
  );
}
