import Link from "next/link";

import { SearchIcon } from "lucide-react";

import { CategoryCard } from "@/components/category-card";
import { RestaurantCard } from "@/components/restaurant-card";
import { Button } from "@/components/ui/button";

const mockNewsRestaurants = Promise.all([
  {
    id: "6",
    name: "Bistrô Francês",
    slug: "bistro-frances",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.7,
    deliveryTime: 45,
    averagePrice: 50,
    deliveryFee: 10,
  },
  {
    id: "7",
    name: "Casa do Espetinho",
    slug: "casa-do-espetinho",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.6,
    deliveryTime: 30,
    averagePrice: 35,
    deliveryFee: 5,
  },
  {
    id: "8",
    name: "Café do Centro",
    slug: "cafe-do-centro",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.8,
    deliveryTime: 25,
    averagePrice: 20,
    deliveryFee: 3,
  },
  {
    id: "9",
    name: "Sorveteria da Esquina",
    slug: "sorveteria-da-esquina",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.9,
    deliveryTime: 15,
    averagePrice: 10,
    deliveryFee: 2,
  },
  {
    id: "10",
    name: "Padaria do Bairro",
    slug: "padaria-do-bairro",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.5,
    deliveryTime: 20,
    averagePrice: 15,
    deliveryFee: 5,
  },
]);

const mockPopularCategories = Promise.all([
  {
    id: "1",
    name: "Pizza",
    slug: "pizza",
    imageUrl: "https://placehold.co/600x400/png",
  },
  {
    id: "2",
    name: "Hamburguer",
    slug: "hamburguer",
    imageUrl: "https://placehold.co/600x400/png",
  },
  {
    id: "3",
    name: "Japonesa",
    slug: "japonesa",
    imageUrl: "https://placehold.co/600x400/png",
  },
  {
    id: "4",
    name: "Brasileira",
    slug: "brasileira",
    imageUrl: "https://placehold.co/600x400/png",
  },
  {
    id: "5",
    name: "Italiana",
    slug: "italiana",
    imageUrl: "https://placehold.co/600x400/png",
  },
]);

export default async function Home() {
  const newsRestaurants = await mockNewsRestaurants;
  const popularCategories = await mockPopularCategories;

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-12">
      <section className="min-h-[60dvh] max-w-5xl mx-auto p-4 content-center md:text-center">
        <h1 className="text-5xl font-bold tracking-tighter text-balance">
          Sua{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#b81414] via-[#da3434] to-[#f5a623]">
            comida favorita
          </span>
          , entregue com rapidez e sabor até a sua casa.
        </h1>

        <p className="text-muted-foreground mt-6">
          Encontre os melhores restaurantes da sua região e receba a comida que
          você ama em poucos minutos.
        </p>

        <Button variant="destructive" className="w-full max-w-sm mt-8" asChild>
          <Link href="/explorar">
            <SearchIcon />
            Explorar
          </Link>
        </Button>
      </section>

      <section className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-balance">Novos restaurantes</h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {newsRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-balance">
          Categorias populares
        </h2>

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-4">
          {popularCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
