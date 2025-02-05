import Link from "next/link";

import { LogsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="py-10 md:py-14 lg:py-20">
      <section className="max-w-4xl mx-auto p-4">
        <h1 className="text-5xl font-bold tracking-tighter text-balance">
          Peça a sua{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b81414] to-[#f5a623]">
            comida favorita
          </span>{" "}
          em casa. Nós entregamos para você.
        </h1>

        <p className="text-muted-foreground mt-6">
          Aproveite a comodidade de pedir sua comida favorita sem sair de casa.
          Nós entregamos para você. Faça seu pedido agora!
        </p>

        <div className="flex flex-col gap-4 mt-8 md:flex-row md:items-center">
          <Button variant="destructive" asChild>
            <Link href="/explorar">
              <LogsIcon />
              Descobrir restaurantes
            </Link>
          </Button>
          <Button variant="link">Fazer pedido</Button>
        </div>
      </section>
    </main>
  );
}
