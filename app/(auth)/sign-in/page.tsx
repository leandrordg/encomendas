import { SignInForm } from "@/components/sign-in-form";

export default function Page() {
  return (
    <main className="py-10 md:py-14 lg:py-20">
      <section className="max-w-5xl mx-auto p-4">
        <SignInForm />
      </section>
    </main>
  );
}
