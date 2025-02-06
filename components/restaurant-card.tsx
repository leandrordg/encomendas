import Image from "next/image";
import Link from "next/link";

import { formatAveragePrice, formatReviews } from "@/lib/utils";
import { Category, Product, Restaurant, Review } from "@prisma/client";
import { StarIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";

interface Props {
  restaurant: Restaurant;
  categories?: Category[];
  products?: Product[];
  reviews?: Review[];
}

export function RestaurantCard({
  restaurant,
  categories,
  products,
  reviews,
}: Props) {
  return (
    <Link href={`/restaurantes/${restaurant.slug}`}>
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 hover:shadow-md transition-all rounded-md overflow-clip border">
        {restaurant.imageUrl ? (
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            width={200}
            height={200}
            className="w-full md:size-24 object-cover bg-muted"
          />
        ) : (
          <Image
            src="https://placehold.co/200x200/png"
            alt={restaurant.name}
            width={200}
            height={200}
            className="w-full md:size-24 object-cover bg-muted"
          />
        )}
        <div className="flex flex-col flex-1 p-4 md:p-0">
          {categories && (
            <p className="text-xs text-muted-foreground">
              {categories.map((category) => category.name).join(", ")}
            </p>
          )}

          <h4 className="sm:text-lg font-medium tracking-tighter transition-all">
            {restaurant.name}
          </h4>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <StarIcon className="size-3 shrink-0" />
              {formatReviews(reviews)}
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-1 text-xs text-emerald-600">
              {formatAveragePrice(products)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
