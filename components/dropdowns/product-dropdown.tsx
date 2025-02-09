"use client";

import Link from "next/link";

import { Product, Restaurant } from "@prisma/client";
import {
  EllipsisIcon,
  ExternalLinkIcon,
  PenIcon,
  StarIcon,
  TrashIcon,
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
  restaurant: Restaurant;
  product: Product;
  isAdmin?: boolean;
}

export function ProductDropdown({
  isAdmin = false,
  restaurant,
  product,
}: Props) {
  const basePath = isAdmin ? "/admin" : "/gerenciar";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
        <Button variant="outline" size="icon">
          <EllipsisIcon />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`/restaurantes/${restaurant.slug}/produtos/${product.slug}`}
          >
            <ExternalLinkIcon />
            Ver produto
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/restaurantes/${restaurant.slug}/produtos/${product.slug}/avaliacoes`}
          >
            <StarIcon />
            Ver avaliações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`${basePath}/restaurantes/${restaurant.slug}/produtos/${product.slug}`}
          >
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
