"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";
import { createRestaurant } from "./actions";

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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(3, "Campo obrigatório"),
  slug: z.optional(z.string()),
  description: z.string().min(20, "Campo obrigatório"),
  imageUrl: z.optional(z.string()),
});

export function NewRestaurantForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = slugify(values.name, { lower: true });

    const data = await createRestaurant({
      ...values,
      slug,
    });

    if (!data) return toast.error("Erro ao criar restaurante");

    toast.success("Restaurante criado com sucesso");
    return router.push("/gerenciar");
  }

  const { isValid, isDirty, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do restaurante</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Digite o nome aqui."
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
              <FormLabel>Descrição do restaurante</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder="Breve descrição do seu restaurante."
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
                  disabled={isSubmitting}
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
                <div className="aspect-[6/2] relative">
                  <Image
                    src={form.watch("imageUrl")!}
                    alt="Imagem do restaurante"
                    className="rounded-md bg-muted object-cover aspect-video"
                    fill
                  />
                </div>
              )}
              <FormDescription>
                Recomendado 800x600 pixels (16/9).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
          <CirclePlusIcon />
          Adicionar restaurante
        </Button>
      </form>
    </Form>
  );
}
