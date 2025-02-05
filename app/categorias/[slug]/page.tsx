import { RestaurantCard } from "@/components/restaurant-card";

interface Props {
  params: Promise<{ slug: string }>;
}

const mockPopularRestaurants = Promise.all([
  {
    id: "1",
    name: "Pizza do Bairro",
    slug: "pizza-do-bairro",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.8,
    deliveryTime: 25,
    averagePrice: 20,
    deliveryFee: 3,
  },
  {
    id: "2",
    name: "Hamburgueria do Centro",
    slug: "hamburgueria-do-centro",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.9,
    deliveryTime: 30,
    averagePrice: 25,
    deliveryFee: 5,
  },
  {
    id: "3",
    name: "Restaurante Japonês",
    slug: "restaurante-japones",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.7,
    deliveryTime: 40,
    averagePrice: 30,
    deliveryFee: 8,
  },
  {
    id: "4",
    name: "Comida Brasileira",
    slug: "comida-brasileira",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.5,
    deliveryTime: 35,
    averagePrice: 25,
    deliveryFee: 7,
  },
  {
    id: "5",
    name: "Pizzaria Italiana",
    slug: "pizzaria-italiana",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.6,
    deliveryTime: 45,
    averagePrice: 30,
    deliveryFee: 10,
  },
]);

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
    name: "Sorveteria do Bairro",
    slug: "sorveteria-do-bairro",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.8,
    deliveryTime: 20,
    averagePrice: 15,
    deliveryFee: 2,
  },
  {
    id: "8",
    name: "Padaria da Esquina",
    slug: "padaria-da-esquina",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.6,
    deliveryTime: 15,
    averagePrice: 10,
    deliveryFee: 1,
  },
  {
    id: "9",
    name: "Cafeteria Central",
    slug: "cafeteria-central",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.9,
    deliveryTime: 10,
    averagePrice: 5,
    deliveryFee: 1,
  },
  {
    id: "10",
    name: "Restaurante Mexicano",
    slug: "restaurante-mexicano",
    imageUrl: "https://placehold.co/600x400/png",
    rating: 4.5,
    deliveryTime: 50,
    averagePrice: 40,
    deliveryFee: 9,
  },
]);

export default async function IndividualCategory({ params }: Props) {
  const { slug } = await params;

  const popularRestaurants = await mockPopularRestaurants;
  const newsRestaurants = await mockNewsRestaurants;

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Categorias
        </p>
        <h1 className="text-5xl font-bold tracking-tighter text-balance capitalize">
          {slug}
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Aqui estão os restaurantes mais populares. Encontre o seu favorito!
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {popularRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        <h2 className="text-3xl font-bold tracking-tighter text-balance mt-12">
          Novos restaurantes
        </h2>

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-4">
          {newsRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </main>
  );
}
