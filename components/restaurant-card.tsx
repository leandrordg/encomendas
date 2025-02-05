import Image from "next/image";
import Link from "next/link";

import { Category, Product, Restaurant } from "@prisma/client";

interface Props {
  restaurant: Restaurant;
  categories?: Category[];
  products?: Product[];
}

export function RestaurantCard({ restaurant, categories }: Props) {
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
          <h4 className="sm:text-lg font-medium tracking-tighter transition-all">
            {restaurant.name}
          </h4>

          {categories && (
            <p className="text-xs text-muted-foreground">
              {categories.map((category) => category.name).join(", ")}
            </p>
          )}

          {/* <p className="text-sm text-muted-foreground">
            {restaurant.rating} ★ | {restaurant.deliveryTime} min.{" "}
            {formatAveragePrice(restaurant.averagePrice)}
          </p> */}
        </div>
      </div>
    </Link>
  );
}
