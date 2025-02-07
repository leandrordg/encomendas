import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { LayoutDashboardIcon, LogInIcon, ShieldIcon } from "lucide-react";

import { UserDropdown } from "@/components/dropdowns/user-dropdown";
import { Button } from "@/components/ui/button";

export function Header() {
  const isAdmin = true; // TODO: add verification for role on clerk and database for safety

  return (
    <header className="border-b">
      <div className="flex items-center gap-4 max-w-7xl mx-auto p-4">
        <Link href="/">
          <div className="relative size-8 group">
            <Image
              src="/images/logo.svg"
              alt="Imagem da logo"
              className="w-full h-full group-hover:scale-105 transition-transform duration-300"
              fill
            />
          </div>
        </Link>

        <div className="flex items-center gap-4 ml-auto">
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm">
                <LogInIcon />
                <span className="hidden md:block">Fazer login</span>
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {isAdmin && (
              <Button size="sm" className="hidden md:inline-flex" asChild>
                <Link href="/admin">
                  <ShieldIcon />
                  <span className="hidden md:block">Administrador</span>
                </Link>
              </Button>
            )}

            <Button size="sm" className="hidden md:inline-flex" asChild>
              <Link href="/gerenciar">
                <LayoutDashboardIcon />
                <span className="hidden md:block">Meus restaurantes</span>
              </Link>
            </Button>

            <UserDropdown isAdmin={isAdmin} />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
