import Image from "next/image";

import { formatAveragePrice, formatPrice } from "@/lib/utils";
import { MapPinIcon, PhoneIcon, StarIcon, TruckIcon } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const mockRestaurant = Promise.resolve({
  id: "1",
  name: "Hamburgueria do Zé",
  description:
    "Venha conhecer o melhor hambúrguer da cidade! Com ingredientes frescos e selecionados, o hambúrguer do Zé é o melhor da região. Venha conhecer e se surpreender com o sabor e qualidade dos nossos produtos.",
  address: "Rua dos Bobos, 0 - Centro, São Paulo - SP",
  phone: "(11) 99999-9999",
  imageUrl: "https://placehold.co/600x400/png",
  categories: ["Hamburgueria", "Fast Food"],
  rating: 4.5,
  reviews: 100,
  deliveryTime: 30,
  averagePrice: 25,
  deliveryFee: 5,
});

export default async function IndividualRestaurant({}: Props) {
  const restaurant = await mockRestaurant;

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <RestaurantHeader restaurant={restaurant} />
    </main>
  );
}

function RestaurantHeader({
  restaurant,
}: {
  restaurant: {
    id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    imageUrl: string;
    categories: string[];
    rating: number;
    reviews: number;
    deliveryTime: number;
    averagePrice: number;
    deliveryFee: number;
  };
}) {
  return (
    <section className="max-w-5xl mx-auto p-4 space-y-4">
      <p className="text-sm uppercase font-semibold tracking-wider">
        Restaurantes
      </p>

      <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover bg-muted"
          fill
        />
      </div>

      <h1 className="text-5xl font-bold tracking-tighter text-balance capitalize">
        {restaurant.name}
      </h1>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {restaurant.rating} <StarIcon className="size-4 shrink-0" />(
          {restaurant.reviews} avaliações)
        </div>

        <div className="flex items-center gap-1">
          <TruckIcon className="size-4 shrink-0" />
          {restaurant.deliveryTime} min aprox.
        </div>

        <p className="text-emerald-600">
          {formatAveragePrice(restaurant.averagePrice)}
        </p>

        <div className="flex items-center gap-1">
          <span>Taxa de entrega:</span>
          {formatPrice(restaurant.deliveryFee)}
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed mt-6 line-clamp-2">
        {restaurant.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 rounded-md border px-2 py-1">
          <MapPinIcon className="size-4 shrink-0" />
          {restaurant.address}
        </div>
        <div className="flex items-center gap-2 rounded-md border px-2 py-1">
          <PhoneIcon className="size-4 shrink-0" />
          {restaurant.phone}
        </div>
      </div>
    </section>
  );
}
