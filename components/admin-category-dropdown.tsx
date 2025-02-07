"use client";

import Link from "next/link";

import {
  EllipsisIcon,
  PackageSearchIcon,
  PenIcon,
  StarIcon,
  TrashIcon,
  WarehouseIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@prisma/client";

interface Props {
  category: Category;
}

export function AdminCategoryDropdown({ category }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/admin/categorias/${category.slug}/restaurantes`}>
            <WarehouseIcon />
            Ver restaurantes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/categorias/${category.slug}/produtos`}>
            <PackageSearchIcon />
            Ver produtos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/categorias/${category.slug}/reviews`}>
            <StarIcon />
            Ver reviews
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/admin/categorias/${category.slug}`}>
            <PenIcon />
            Editar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TrashIcon />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
