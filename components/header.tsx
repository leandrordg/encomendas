import Image from "next/image";
import Link from "next/link";

import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";

import { UserDropdown } from "@/components/dropdowns/user-dropdown";
import { MobileMenuSheet } from "@/components/sheets/mobile-menu-sheet";
import { Button } from "@/components/ui/button";

export async function Header() {
  const { userId } = await auth();

  const isAdmin = true;

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
          <MobileMenuSheet />

          {userId ? (
            <UserDropdown isAdmin={isAdmin} />
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                <LogInIcon />
                <span className="hidden md:block">Fazer login</span>
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
