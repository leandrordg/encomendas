import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/hooks/restaurants";

import { Separator } from "@/components/ui/separator";
import { RestaurantHeader } from "./restaurant-header";
import { RestaurantProductList } from "./restaurant-product-list";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function IndividualRestaurant({ params }: Props) {
  const { slug } = await params;

  const { restaurant, categories, products } = await getRestaurantBySlug(slug);

  if (!restaurant) return notFound();

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <RestaurantHeader
        restaurant={restaurant}
        categories={categories}
        products={products}
      />

      <Separator orientation="horizontal" className="h-[2px]" />

      <RestaurantProductList restaurant={restaurant} />
    </main>
  );
}
