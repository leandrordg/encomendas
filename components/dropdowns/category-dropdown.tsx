"use client";

import Link from "next/link";

import { Category } from "@prisma/client";
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

interface Props {
  category: Category;
  isAdmin?: boolean;
}

export function CategoryDropdown({ isAdmin = false, category }: Props) {
  const path = isAdmin
    ? `/admin/categorias/${category.slug}`
    : `/manage/categorias/${category.slug}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
        <Button variant="secondary" size="icon" className="shrink-0">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" asChild>
        <div>
          <DropdownMenuLabel>Configurações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`${path}/restaurantes`}>
              <WarehouseIcon />
              Ver restaurantes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${path}/produtos`}>
              <PackageSearchIcon />
              Ver produtos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`${path}/avaliacoes`}>
              <StarIcon />
              Ver avaliações
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={path}>
              <PenIcon />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon />
            Excluir
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
