import Image from "next/image";
import Link from "next/link";

import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  ChefHatIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  ShieldIcon,
  TelescopeIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export async function MobileMenuSheet() {
  const user = await currentUser();

  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button size="sm" variant="outline">
          <MenuIcon />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>Menu de navegação</SheetTitle>
          <SheetDescription>
            Aqui você encontra todas as opções de navegação do site.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-0.5">
          <SheetClose asChild>
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-muted"
            >
              <HomeIcon className="size-4" />
              Início
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/explorar"
              className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-muted"
            >
              <TelescopeIcon className="size-4" />
              Explorar
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/restaurantes"
              className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-muted"
            >
              <ChefHatIcon className="size-4" />
              Restaurantes
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/categorias"
              className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-muted"
            >
              <LayoutDashboardIcon className="size-4" />
              Categorias
            </Link>
          </SheetClose>
        </div>

        {user && (
          <div className="grid gap-0.5 mt-auto">
            <SheetClose asChild>
              <Link
                href="/perfil"
                className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-muted"
              >
                <div className="relative size-4 rounded-full overflow-clip">
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={
                        user.fullName ??
                        user.primaryEmailAddress?.emailAddress ??
                        "Imagem do perfil"
                      }
                      className="bg-muted object-cover"
                      fill
                    />
                  ) : (
                    <Image
                      src="/images/placeholder.jpeg"
                      alt={
                        user.fullName ??
                        user.primaryEmailAddress?.emailAddress ??
                        "Imagem do perfil"
                      }
                      className="bg-muted object-cover"
                      fill
                    />
                  )}
                </div>
                Meu perfil
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/perfil/preferencias"
                className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-muted"
              >
                <SettingsIcon className="size-4" />
                Preferências
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/gerenciar"
                className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-muted"
              >
                <LayoutDashboardIcon className="size-4" />
                Meus restaurantes
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/admin"
                className="flex items-center gap-2 p-2 rounded-md text-sm hover:bg-muted"
              >
                <ShieldIcon className="size-4" />
                Administrador
              </Link>
            </SheetClose>
          </div>
        )}

        <SheetFooter className={!user ? "mt-auto" : ""}>
          {user ? (
            <SheetClose asChild>
              <SignOutButton>
                <Button>
                  <LogOutIcon />
                  Desconectar
                </Button>
              </SignOutButton>
            </SheetClose>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="font-medium tracking-tighter">Conecte-se</p>
              <p className="text-sm text-muted-foreground">
                Entre ou crie uma conta para ter acesso a todas as
                funcionalidades do site.
              </p>
              <SheetClose asChild>
                <Link
                  href="/sign-in"
                  className="flex items-center justify-center gap-2 p-2 text-xs font-medium hover:bg-muted h-8 rounded-md border"
                >
                  <LogInIcon className="size-4" />
                  Fazer login
                </Link>
              </SheetClose>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
