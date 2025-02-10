"use client";

import Image from "next/image";
import Link from "next/link";

import {
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  ShieldIcon,
  UserRoundIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";

import { SignOutDialog } from "@/components/dialog/sign-out-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserDropdown({ isAdmin }: { isAdmin: boolean }) {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="size-8 relative rounded-full border overflow-clip">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name ?? session.user.email ?? "Usuário"}
              className="object-cover bg-muted"
              fill
            />
          ) : (
            <Image
              src="/images/placeholder.jpeg"
              alt={session.user.name ?? session.user.email ?? "Usuário"}
              className="object-cover bg-muted"
              fill
            />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48 md:min-w-64" align="end">
        <div className="px-2 py-1.5">
          {session.user.name && (
            <p className="text-sm font-medium">{session.user.name}</p>
          )}
          <p className="text-xs text-muted-foreground">{session.user.email}</p>
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

        <SignOutDialog>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <LogOutIcon />
            Desconectar
          </DropdownMenuItem>
        </SignOutDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
