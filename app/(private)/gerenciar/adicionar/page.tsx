import { NewRestaurantForm } from "./new-restaurant-form";

export default function NewRestaurant() {
  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Gerenciar
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          Adicionar restaurante
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Adicione um novo restaurante à sua lista. Preencha os campos abaixo.
        </p>
      </section>

      <section className="max-w-5xl mx-auto p-4">
        <NewRestaurantForm />
      </section>
    </main>
  );
}
