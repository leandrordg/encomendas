import Image from "next/image";
import Link from "next/link";

import { formatPrice, formatReviews } from "@/lib/utils";
import { Product, Restaurant, Review } from "@prisma/client";
import { StarIcon } from "lucide-react";

import { ProductDropdown } from "@/components/dropdowns/product-dropdown";

interface Props {
  product: Product;
  restaurant: Restaurant;
  reviews?: Review[];
  type?: "default" | "manage" | "admin";
}

export function ProductCard({
  product,
  restaurant,
  reviews,
  type = "default",
}: Props) {
  const path = {
    default: `/restaurantes/${restaurant.slug}/produtos/${product.slug}`,
    manage: `/gerenciar/restaurantes/${restaurant.slug}/produtos/${product.slug}`,
    admin: `/admin/restaurantes/${restaurant.slug}/produtos/${product.slug}`,
  }[type];

  return (
    <Link href={path}>
      <div className="flex flex-col hover:shadow-md transition-all rounded-md overflow-clip border relative">
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrl ?? "/images/placeholder.jpeg"}
            alt={product.name}
            className="w-full h-full object-cover bg-muted"
            fill
          />
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

        {(type === "manage" || type === "admin") && (
          <div className="absolute top-2 right-2">
            <ProductDropdown
              restaurant={restaurant}
              product={product}
              isAdmin={type === "admin"}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
