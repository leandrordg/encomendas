"use client";

import Link from "next/link";

import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SignInDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seja bem vindo!</DialogTitle>
          <DialogDescription>Faça login para continuar.</DialogDescription>
        </DialogHeader>

        <Button
          size="lg"
          variant="outline"
          onClick={() => signIn("github", { redirect: false })}
        >
          <GithubIcon />
          Continuar com GitHub
        </Button>

        <DialogFooter>
          <p className="text-sm text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Link
              href="/sign-up"
              className="text-foreground font-medium hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
