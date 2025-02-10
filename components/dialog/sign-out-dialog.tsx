"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SignOutDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
          <DialogDescription>
            Você será redirecionado para a página inicial.
          </DialogDescription>
        </DialogHeader>

        <Button size="lg" variant="outline" onClick={() => signOut()}>
          <LogOutIcon />
          Sair
        </Button>
      </DialogContent>
    </Dialog>
  );
}
