import Image from "next/image";
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
      <div className="relative w-full h-40 sm:max-h-48 md:max-h-52 group">
        <Image
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover rounded-md bg-muted"
          fill
        />
        <span className="text-sm sm:text-base md:text-lg font-medium tracking-tighter absolute inset-0 p-4 rounded-md backdrop-filter group-hover:backdrop-blur transition-all group-hover:bg-muted/30">
          {category.name}
        </span>
      </div>
    </Link>
  );
}
