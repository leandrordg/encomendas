import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/hooks/restaurants";

import { RestaurantHeader } from "./restaurant-header";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function IndividualRestaurant({ params }: Props) {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) return notFound();

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <RestaurantHeader
        restaurant={restaurant}
        categories={restaurant.categories}
        products={restaurant.products}
      />
    </main>
  );
}
