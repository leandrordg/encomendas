import Image from "next/image";
import Link from "next/link";

import { formatAveragePrice } from "@/lib/utils";

interface Props {
  restaurant: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    rating: number;
    deliveryTime: number;
    averagePrice: number;
    deliveryFee: number;
  };
}

export function RestaurantCard({ restaurant }: Props) {
  return (
    <Link href={`/restaurantes/${restaurant.slug}`}>
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 hover:shadow-md transition-all rounded-md overflow-clip border">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          width={200}
          height={200}
          className="w-full md:size-24 object-cover bg-muted"
        />
        <div className="flex flex-col flex-1 p-4 md:p-0">
          <h2 className="sm:text-lg font-medium tracking-tighter transition-all">
            {restaurant.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {restaurant.rating} ★ | {restaurant.deliveryTime} min.{" "}
            {formatAveragePrice(restaurant.averagePrice)}
          </p>
        </div>
      </div>
    </Link>
  );
}
