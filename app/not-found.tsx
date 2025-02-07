import Link from "next/link";

import { HomeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-12">
      <section className="min-h-[60dvh] max-w-5xl mx-auto p-4 content-center md:text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-balance">
          Página não encontrada
        </h1>

        <p className="text-muted-foreground mt-6 max-w-md mx-auto">
          A página que você está procurando não foi encontrada.
        </p>

        <Button variant="destructive" className="w-full max-w-sm mt-8" asChild>
          <Link href="/">
            <HomeIcon />
            Voltar para a página inicial
          </Link>
        </Button>
      </section>
    </main>
  );
}
