"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Restaurant } from "@prisma/client";
import { CirclePlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";
import { createProduct } from "./actions";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  restaurantId: z.string().min(1, "Campo obrigatório"),
  name: z.string().min(3, "Campo obrigatório"),
  slug: z.optional(z.string()),
  description: z.string().min(20, "Campo obrigatório"),
  imageUrl: z.optional(z.string()),
  price: z
    .string()
    .min(1, "Campo obrigatório")
    .regex(/^\d+([,.]\d{1,2})?$/, "Preço inválido"),
});

interface Props {
  restaurants: Restaurant[];
}

export function NewProductForm({ restaurants }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantId: "",
      name: "",
      slug: "",
      description: "",
      imageUrl: "",
      price: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = slugify(values.name, { lower: true });

    const create = await createProduct({ ...values, slug });

    if (!create) return toast.error("Erro ao criar restaurante");

    toast.success("Restaurante criado com sucesso");
    return router.back();
  }

  const { isValid, isDirty, isSubmitting } = form.formState;

  // disable form if there no restaurants or if no restaurant selected
  const selectedRestaurant = !!form.watch("restaurantId");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="restaurantId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurante</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o restaurante" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {restaurants.map((restaurant) => (
                    <SelectItem key={restaurant.id} value={restaurant.id}>
                      <div className="flex items-center gap-2">
                        <div className="relative size-4 rounded-full overflow-clip">
                          <Image
                            src={
                              restaurant.imageUrl ?? "/images/placeholder.jpeg"
                            }
                            alt={restaurant.name}
                            className="object-cover bg-muted"
                            fill
                          />
                        </div>
                        {restaurant.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Escolha o restaurante que o produto pertence.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do produto</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting || !selectedRestaurant}
                  placeholder="Digite o nome do produto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do produto</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting || !selectedRestaurant}
                  placeholder="Breve descrição do produto"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isSubmitting || !selectedRestaurant}
                  placeholder="Digite o preço (ex: 10 ou 10.99)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem>
              <FormLabel>Imagem (opcional)</FormLabel>
              <FormControl>
                <UploadButton
                  appearance={{
                    container: {
                      alignItems: "start",
                    },
                  }}
                  disabled={isSubmitting || !selectedRestaurant}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    form.setValue("imageUrl", res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload error: ", error);
                  }}
                />
              </FormControl>
              {form.watch("imageUrl") && (
                <div className="aspect-[4/3] relative max-h-96">
                  <Image
                    src={form.watch("imageUrl")!}
                    alt="Imagem do produto"
                    className="rounded-md bg-muted object-cover"
                    fill
                  />
                </div>
              )}
              <FormDescription>Recomendado 800x600px (4:3)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!isValid || !isDirty || isSubmitting || !selectedRestaurant}
        >
          <CirclePlusIcon />
          Adicionar restaurante
        </Button>
      </form>
    </Form>
  );
}
