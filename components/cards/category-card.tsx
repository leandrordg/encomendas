import Image from "next/image";
import Link from "next/link";

import { Category } from "@prisma/client";

import { CategoryDropdown } from "@/components/dropdowns/category-dropdown";

interface Props {
  type?: "default" | "manage" | "admin";
  category: Category;
}

export function CategoryCard({ type = "default", category }: Props) {
  const path = {
    default: `/categorias/${category.slug}`,
    manage: `/manage/categorias/${category.slug}`,
    admin: `/admin/categorias/${category.slug}`,
  }[type];

  return (
    <Link href={path}>
      <div className="relative w-full h-40 sm:max-h-48 md:max-h-52 group rounded-md overflow-clip">
        <Image
          src={category.imageUrl ?? "/images/placeholder.jpeg"}
          alt={category.name}
          className="w-full h-full object-cover bg-muted group-hover:scale-[1.01] transition-transform duration-300"
          fill
        />

        <span className="absolute inset-0 p-4 flex text-white text-xl font-bold tracking-tight bg-gradient-to-r from-neutral-700 via-transparent to-transparent bg-opacity-30 transition-all">
          {category.name}
        </span>

        {(type === "manage" || type === "admin") && (
          <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-neutral-700 to-transparent bg-opacity-30">
            <CategoryDropdown category={category} isAdmin={type === "admin"} />
          </div>
        )}
      </div>
    </Link>
  );
}
