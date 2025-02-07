import Image from "next/image";
import Link from "next/link";

import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
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

export async function UserDropdown() {
  const user = await currentUser();

  if (!user) return null;

  // TODO: verify user role on clerk and database for safety
  const isAdmin = true;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="size-8 relative rounded-md border overflow-clip">
          <Image
            src={user.imageUrl}
            alt={user.fullName ?? user.id}
            className="object-cover bg-muted"
            fill
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{user.fullName}</p>
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
          <Link href="/manage">
            <LayoutDashboardIcon />
            Meus restaurantes
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <ShieldIcon />
              Administrador
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <SignOutButton>
          <DropdownMenuItem>
            <LogOutIcon />
            Desconectar
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
