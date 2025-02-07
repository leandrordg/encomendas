"use client";

import Link from "next/link";

import { Restaurant } from "@prisma/client";
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

interface Props {
  restaurant: Restaurant;
  isAdmin?: boolean;
}

export function RestaurantDropdown({ isAdmin = false, restaurant }: Props) {
  const path = isAdmin
    ? `/admin/restaurantes/${restaurant.slug}`
    : `/manage/restaurantes/${restaurant.slug}`;

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
          <Link href={path} target="_blank">
            <ExternalLinkIcon />
            Ver restaurante
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`${path}/produtos`}>
            <PackageSearchIcon />
            Ver produtos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`${path}/reviews`}>
            <StarIcon />
            Ver reviews
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
