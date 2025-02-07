import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { LayoutDashboardIcon, LogInIcon, ShieldIcon } from "lucide-react";

import { UserDropdown } from "@/components/dropdowns/user-dropdown";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex items-center gap-4 max-w-7xl mx-auto p-4">
        <Link href="/">
          <div className="relative size-8">
            <Image src="/images/logo.svg" alt="Imagem da logo" fill />
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
            {/* TODO: add verification for role on clerk and database for safety */}
            <Button size="sm" asChild>
              <Link href="/admin">
                <ShieldIcon />
                <span className="hidden md:block">Administrador</span>
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/manage">
                <LayoutDashboardIcon />
                <span className="hidden md:block">Dashboard</span>
              </Link>
            </Button>

            <UserDropdown />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
