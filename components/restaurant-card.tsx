import Link from "next/link";

interface Props {
  restaurant: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    rating: number;
    deliveryTime: number;
    averagePrice: number;
    deliveryFee: number;
  };
}

export function RestaurantCard({ restaurant }: Props) {
  const formatAveragePrice = (price: number) => {
    if (price < 20) {
      return "$";
    } else if (price >= 20 && price < 40) {
      return "$$";
    } else {
      return "$$$";
    }
  };

  return (
    <Link href={`/restaurantes/${restaurant.slug}`}>
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 hover:shadow-md transition-all rounded-md overflow-clip border">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full md:size-24 object-cover"
        />
        <div className="flex flex-col flex-1 p-4 md:p-0">
          <h2 className="sm:text-lg font-medium tracking-tighter transition-all">
            {restaurant.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {restaurant.rating} ★ | {restaurant.deliveryTime} min.{" "}
            {formatAveragePrice(restaurant.averagePrice)}
          </p>
        </div>
      </div>
    </Link>
  );
}
