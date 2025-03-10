import Image from "next/image";
import Link from "next/link";

import { formatAveragePrice, formatReviews } from "@/lib/utils";
import { Category, Product, Restaurant, Review } from "@prisma/client";
import { StarIcon } from "lucide-react";

import { RestaurantDropdown } from "@/components/dropdowns/restaurant-dropdown";
import { Separator } from "@/components/ui/separator";

interface Props {
  type?: "default" | "manage" | "admin";
  restaurant: Restaurant;
  categories?: Category[];
  products?: Product[];
  reviews?: Review[];
}

export function RestaurantCard({
  type = "default",
  restaurant,
  categories,
  products,
  reviews,
}: Props) {
  const path = {
    default: `/restaurantes/${restaurant.slug}`,
    manage: `/gerenciar/restaurantes/${restaurant.slug}`,
    admin: `/admin/restaurantes/${restaurant.slug}`,
  }[type];

  return (
    <Link href={path}>
      <div className="flex flex-col md:flex-row md:items-center hover:shadow-md transition-all rounded-md overflow-clip border">
        <div className="relative w-full h-48 md:size-24">
          {restaurant.imageUrl ? (
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="w-full h-full object-cover bg-muted"
              fill
            />
          ) : (
            <Image
              src="/images/placeholder.jpeg"
              alt={restaurant.name}
              className="w-full h-full object-cover bg-muted"
              fill
            />
          )}
        </div>
        <div className="flex flex-col flex-1 p-4">
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

        {(type === "manage" || type === "admin") && (
          <div className="flex items-center justify-center px-4 pb-4 md:pb-0">
            <RestaurantDropdown
              restaurant={restaurant}
              isAdmin={type === "admin"}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
