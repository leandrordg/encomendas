"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Restaurant } from "@prisma/client";
import { CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateRestaurantCategories } from "./actions";

import { CategoriesToggle } from "@/components/categories-toggle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  categories: z.array(z.string()),
});

interface Props {
  restaurant: Restaurant;
  categories: Category[] | undefined;
  allCategories: Category[];
}

export function EditCategoryRestaurantForm({
  restaurant,
  categories,
  allCategories,
}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: categories?.map((category) => category.id),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const update = await updateRestaurantCategories({
      restaurantId: restaurant.id,
      ...values,
    });

    if (!update)
      return toast.error("Erro ao atualizar as categorias do restaurante.");

    toast.success("Categorias do restaurante atualizadas com sucesso.");
    return router.refresh();
  }

  const { isValid, isDirty, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorias</FormLabel>
              <FormControl>
                <CategoriesToggle
                  allCategories={allCategories}
                  selectedCategories={categories}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Selecione as categorias do seu restaurante. Você pode adicionar
                uma ou mais categorias.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
          <CheckIcon />
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
}
