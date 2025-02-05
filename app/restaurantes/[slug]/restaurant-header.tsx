import Image from "next/image";

import { Category, Product, Restaurant } from "@prisma/client";
import { MapPinIcon, PhoneIcon, TruckIcon } from "lucide-react";

interface Props {
  restaurant: Restaurant | null;
  categories?: Category[];
  products?: Product[];
}

export function RestaurantHeader({ restaurant, categories }: Props) {
  if (!restaurant) return null;

  return (
    <section className="max-w-5xl mx-auto p-4 space-y-4">
      <p className="text-sm uppercase font-semibold tracking-wider">
        Restaurantes
      </p>

      <div className="relative w-full h-36 sm:h-44 md:h-52 bg-gray-200 rounded-lg overflow-hidden">
        {restaurant.imageUrl ? (
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover bg-muted"
            fill
          />
        ) : (
          <Image
            src="https://placehold.co/200x200/png"
            alt={restaurant.name}
            className="w-full h-full object-cover bg-muted"
            fill
          />
        )}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance capitalize">
        {restaurant.name}
      </h1>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-2">
          {categories?.map((category) => (
            <span
              key={category.id}
              className="text-xs text-muted-foreground border rounded-md px-2 py-1"
            >
              {category.name}
            </span>
          ))}
        </div>

        {/* <div className="flex items-center gap-2">
      {restaurant.rating} <StarIcon className="size-4 shrink-0" />(
      {restaurant.reviews} avaliações)
    </div> */}

        <div className="flex items-center gap-1">
          <TruckIcon className="size-4 shrink-0" />
          {/* {restaurant.deliveryTime} min aprox. */}
        </div>

        <p className="text-emerald-600">
          {/* {formatAveragePrice(restaurant.averagePrice)} */}
        </p>

        <div className="flex items-center gap-1">
          <span>Taxa de entrega:</span>
          {/* {formatPrice(restaurant.deliveryFee)} */}
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed mt-6 line-clamp-2">
        {restaurant.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 rounded-md border px-2 py-1">
          <MapPinIcon className="size-4 shrink-0" />
          {/* {restaurant.address} */}
        </div>
        <div className="flex items-center gap-2 rounded-md border px-2 py-1">
          <PhoneIcon className="size-4 shrink-0" />
          {/* {restaurant.phone} */}
        </div>
      </div>
    </section>
  );
}
