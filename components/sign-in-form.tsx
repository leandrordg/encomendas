import Link from "next/link";

import { signIn } from "@/auth";
import { GithubIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SignInForm() {
  return (
    <div className="flex flex-col md:items-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
        Junte-se a nós.
      </h1>

      <p className="text-muted-foreground leading-relaxed">
        Faça login para acessar o conteúdo exclusivo.
      </p>

      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/" });
        }}
        className="flex flex-col gap-4"
      >
        <Button type="submit" size="lg" variant="outline">
          <GithubIcon />
          Continuar com GitHub
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        Ainda não tem uma conta?{" "}
        <Link
          href="/sign-up"
          className="text-foreground font-medium hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
