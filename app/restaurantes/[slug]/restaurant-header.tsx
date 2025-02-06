import Image from "next/image";

import { formatAveragePrice, formatReviews } from "@/lib/utils";
import { Category, Product, Restaurant, Review } from "@prisma/client";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";

interface Props {
  restaurant: Restaurant;
  categories?: Category[];
  products?: Product[];
  reviews?: Review[];
}

export function RestaurantHeader({
  restaurant,
  categories,
  products,
  reviews,
}: Props) {
  return (
    <section className="max-w-5xl mx-auto p-4 space-y-4">
      <p className="text-sm uppercase font-semibold tracking-wider">
        Restaurantes
      </p>

      <div className="relative w-full h-36 sm:h-44 md:h-52 bg-muted rounded-md overflow-clip shadow-sm">
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

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {categories?.map((category) => (
            <span
              key={category.id}
              className="text-xs text-muted-foreground border rounded-md px-2 py-1"
            >
              {category.name}
            </span>
          ))}
        </div>

        <Separator orientation="vertical" className="h-4" />

        <div className="flex items-center gap-2">
          <StarIcon className="size-4 shrink-0" />
          {formatReviews(reviews)}
        </div>

        <Separator orientation="vertical" className="h-4" />

        <p className="text-emerald-600">{formatAveragePrice(products)}</p>
      </div>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-6">
        {restaurant.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 rounded-md border px-2 py-1">
          <MapPinIcon className="size-4 shrink-0" />
          Sem localização.
        </div>
        <div className="flex items-center gap-2 rounded-md border px-2 py-1">
          <PhoneIcon className="size-4 shrink-0" />
          Sem telefone adicionado.
        </div>
      </div>
    </section>
  );
}
