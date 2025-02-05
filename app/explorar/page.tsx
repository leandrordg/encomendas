import { CategoryCard } from "@/components/category-card";
import { RestaurantCard } from "@/components/restaurant-card";

const mockPopularRestaurants = Promise.all([
  {
    id: "1",
    name: "Sabor do Brasil",
    slug: "sabor-do-brasil",
    imageUrl: "https://placehold.co/600x400",
    rating: 4.5,
    deliveryTime: 30,
    averagePrice: 30,
    deliveryFee: 5,
  },
  {
    id: "2",
    name: "Super Sushi",
    slug: "super-sushi",
    imageUrl: "https://placehold.co/600x400",
    rating: 4.8,
    deliveryTime: 25,
    averagePrice: 40,
    deliveryFee: 7,
  },
  {
    id: "3",
    name: "Pizzaria do Cheff",
    slug: "pizzaria-do-cheff",
    imageUrl: "https://placehold.co/600x400",
    rating: 4.7,
    deliveryTime: 35,
    averagePrice: 35,
    deliveryFee: 6,
  },
  {
    id: "4",
    name: "Cantina Italiana",
    slug: "cantina-italiana",
    imageUrl: "https://placehold.co/600x400",
    rating: 4.6,
    deliveryTime: 40,
    averagePrice: 45,
    deliveryFee: 8,
  },
  {
    id: "5",
    name: "Hamburgueria do Rock",
    slug: "hamburgueria-do-rock",
    imageUrl: "https://placehold.co/600x400",
    rating: 4.9,
    deliveryTime: 20,
    averagePrice: 25,
    deliveryFee: 4,
  },
]);

const mockNewsRestaurants = Promise.all([
  {
    id: "6",
    name: "Bistrô Francês",
    slug: "bistro-frances",
    imageUrl: "https://placehold.co/600x400",
    rating: 4.7,
    deliveryTime: 45,
    averagePrice: 50,
    deliveryFee: 10,
  },
  {
    id: "7",
    name: "Casa do Espetinho",
    slug: "casa-do-espetinho",
    imageUrl: "https://placehold.co/600x400",
    rating: 4.6,
    deliveryTime: 30,
    averagePrice: 35,
    deliveryFee: 5,
  },
  {
    id: "8",
    name: "Café do Centro",
    slug: "cafe-do-centro",
    imageUrl: "https://placehold.co/600x400",
    rating: 4.8,
    deliveryTime: 25,
    averagePrice: 20,
    deliveryFee: 3,
  },
  {
    id: "9",
    name: "Sorveteria da Esquina",
    slug: "sorveteria-da-esquina",
    imageUrl: "https://placehold.co/600x400",
    rating: 4.9,
    deliveryTime: 15,
    averagePrice: 10,
    deliveryFee: 2,
  },
  {
    id: "10",
    name: "Padaria do Bairro",
    slug: "padaria-do-bairro",
    imageUrl: "https://placehold.co/600x400",
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
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: "2",
    name: "Hamburguer",
    slug: "hamburguer",
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: "3",
    name: "Japonesa",
    slug: "japonesa",
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: "4",
    name: "Brasileira",
    slug: "brasileira",
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: "5",
    name: "Italiana",
    slug: "italiana",
    imageUrl: "https://placehold.co/600x400",
  },
]);

export default async function Explore() {
  const popularRestaurants = await mockPopularRestaurants;
  const newsRestaurants = await mockNewsRestaurants;
  const popularCategories = await mockPopularCategories;

  return (
    <main className="py-10 md:py-14 lg:py-20">
      <section className="max-w-5xl mx-auto p-4">
        <h1 className="text-5xl font-bold tracking-tighter text-balance">
          Descubra novos restaurantes
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Encontre os melhores restaurantes perto de você. Faça seu pedido
          agora!
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {popularRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        <h2 className="text-3xl font-bold tracking-tighter text-balance mt-14">
          Novos restaurantes
        </h2>

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-4">
          {newsRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        <h2 className="text-3xl font-bold tracking-tighter text-balance mt-14">
          Categorias populares
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {popularCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
