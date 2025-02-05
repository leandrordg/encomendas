import Link from "next/link";

interface Props {
  category: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
  };
}

export function CategoryCard({ category }: Props) {
  return (
    <Link href={`/categorias/${category.slug}`}>
      <div className="relative group">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full object-cover rounded-md max-h-40 sm:max-h-48 md:max-h-52"
        />
        <span className="text-sm sm:text-base md:text-lg font-medium tracking-tighter absolute inset-0 p-4 rounded-md backdrop-filter group-hover:backdrop-blur transition-all group-hover:bg-muted">
          {category.name}
        </span>
      </div>
    </Link>
  );
}
