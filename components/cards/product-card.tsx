import Image from "next/image";
import Link from "next/link";

import { formatPrice, formatReviews } from "@/lib/utils";
import { Category, Product, Restaurant, Review } from "@prisma/client";
import { StarIcon } from "lucide-react";

interface Props {
  product: Product;
  restaurant: Restaurant;
  categories?: Category[];
  reviews?: Review[];
}

export function ProductCard({ product, restaurant, reviews }: Props) {
  return (
    <Link href={`/restaurantes/${restaurant.slug}/produtos/${product.slug}`}>
      <div className="flex flex-col hover:shadow-md transition-all rounded-md overflow-clip border">
        <div className="relative w-full h-48">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover bg-muted"
              fill
            />
          ) : (
            <Image
              src="/images/placeholder.jpeg"
              alt={product.name}
              className="w-full h-full object-cover bg-muted"
              fill
            />
          )}
        </div>

        <div className="flex flex-col p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <StarIcon className="size-3 shrink-0" />
            {formatReviews(reviews)}
          </div>

          <h4 className="font-medium tracking-tighter">{product.name}</h4>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <p className="text-lg font-semibold tracking-tighter">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
