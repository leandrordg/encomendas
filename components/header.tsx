import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LayoutDashboardIcon, ShieldIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex items-center gap-4 max-w-7xl mx-auto p-4">
        <Link href="/">
          <div className="relative size-8">
            <Image src="/images/logo.svg" alt="Imagem da logo" priority fill />
          </div>
        </Link>

        <div className="flex items-center gap-4 ml-auto">
          <SignedOut>
            <Button size="sm" asChild>
              <SignInButton mode="modal">Fazer login</SignInButton>
            </Button>
          </SignedOut>
          <SignedIn>
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
            <div className="size-8 bg-muted rounded-full flex items-center justify-center">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
