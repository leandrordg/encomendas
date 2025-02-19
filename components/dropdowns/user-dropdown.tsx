"use client";

import Image from "next/image";
import Link from "next/link";

import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  ShieldIcon,
  UserRoundIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserDropdown({ isAdmin }: { isAdmin: boolean }) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="size-8 relative rounded-full border overflow-clip">
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={
                user.fullName ??
                user.primaryEmailAddress?.emailAddress ??
                "Usuário"
              }
              className="object-cover bg-muted"
              fill
            />
          ) : (
            <Image
              src="/images/placeholder.jpeg"
              alt={
                user.fullName ??
                user.primaryEmailAddress?.emailAddress ??
                "Usuário"
              }
              className="object-cover bg-muted"
              fill
            />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48 md:min-w-64" align="end">
        <div className="px-2 py-1.5">
          {user.fullName && (
            <p className="text-sm font-medium">{user.fullName}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/perfil">
            <UserRoundIcon />
            Meu perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/perfil/preferencias">
            <SettingsIcon />
            Preferências
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/gerenciar">
            <LayoutDashboardIcon />
            Meus restaurantes
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <ShieldIcon />
                Administrador
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <SignOutButton>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <LogOutIcon />
            Desconectar
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
