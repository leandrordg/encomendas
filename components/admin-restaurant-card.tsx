import Image from "next/image";
import Link from "next/link";

import { Restaurant } from "@prisma/client";

interface Props {
  restaurant: Restaurant;
}

export function AdminRestaurantCard({ restaurant }: Props) {
  return (
    <Link href={`/admin/restaurantes/${restaurant.slug}`}>
      <div className="p-4 rounded-md border hover:bg-muted">
        <div className="flex gap-4">
          <div className="size-12 rounded-md relative overflow-clip border shrink-0">
            {restaurant.imageUrl ? (
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-full bg-muted object-cover"
                fill
              />
            ) : (
              <Image
                src="/images/placeholder.JPEG"
                alt={restaurant.name}
                className="w-full h-full bg-muted object-cover"
                fill
              />
            )}
          </div>

          <div>
            <h3 className="text-sm md:text-base font-bold text-balance">
              {restaurant.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {restaurant.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
