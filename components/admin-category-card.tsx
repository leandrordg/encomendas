import Image from "next/image";
import Link from "next/link";

import { Category } from "@prisma/client";

import { AdminCategoryDropdown } from "./admin-category-dropdown";

interface Props {
  category: Category;
}

export function AdminCategoryCard({ category }: Props) {
  return (
    <Link href={`/admin/categories/${category.slug}`}>
      <div className="p-4 rounded-md border hover:bg-muted">
        <div className="flex gap-4">
          <div className="size-12 rounded-md relative overflow-clip border shrink-0">
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.name}
                className="bg-muted"
                fill
              />
            ) : (
              <Image
                src="/images/placeholder.svg"
                alt={category.name}
                className="bg-muted"
                fill
              />
            )}
          </div>

          <div>
            <h3 className="text-sm md:text-base font-bold text-balance">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>

          <AdminCategoryDropdown category={category} />
        </div>
      </div>
    </Link>
  );
}
