import Image from "next/image";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/hooks/products";
import { formatPrice, formatReviews } from "@/lib/utils";
import { ShoppingBasketIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ productSlug: string }>;
}

export default async function IndividualProduct({ params }: Props) {
  const { productSlug } = await params;

  const { product, restaurant, reviews } = await getProductBySlug(productSlug);

  if (!product) return notFound();

  return (
    <main className="py-10 md:py-14 lg:py-20">
      <section className="max-w-5xl mx-auto p-4 space-y-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Produto
        </p>

        <div className="relative w-full h-36 sm:h-44 md:h-52 bg-muted rounded-md overflow-clip shadow-sm">
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

        {restaurant && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {restaurant.imageUrl ? (
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                width={50}
                height={50}
                className="size-4 rounded-full border bg-muted object-cover"
              />
            ) : (
              <Image
                src="/images/placeholder.jpeg"
                alt={restaurant.name}
                width={50}
                height={50}
                className="size-4 rounded-full border bg-muted object-cover"
              />
            )}

            {restaurant.name}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          {product.name}
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          {product.description}
        </p>

        {reviews && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <StarIcon className="size-4 shrink-0" />
            {formatReviews(reviews)}
          </div>
        )}

        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
          {formatPrice(product.price)}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button className="w-full md:w-auto">
            <ShoppingBasketIcon />
            Adicionar ao carrinho
          </Button>
          <Button variant="link">Preciso de ajuda</Button>
        </div>
      </section>
    </main>
  );
}
