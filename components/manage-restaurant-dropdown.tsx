"use client";

import Link from "next/link";

import {
  EllipsisIcon,
  ExternalLinkIcon,
  PackageSearchIcon,
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
import { Restaurant } from "@prisma/client";

interface Props {
  restaurant: Restaurant;
}

export function ManageRestaurantDropdown({ restaurant }: Props) {
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
          <Link href={`/restaurantes/${restaurant.slug}`} target="_blank">
            <ExternalLinkIcon />
            Ver restaurante
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/manage/restaurantes/${restaurant.slug}/produtos`}>
            <PackageSearchIcon />
            Ver produtos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/manage/restaurantes/${restaurant.slug}/reviews`}>
            <StarIcon />
            Ver reviews
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/manage/restaurantes/${restaurant.slug}`}>
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
