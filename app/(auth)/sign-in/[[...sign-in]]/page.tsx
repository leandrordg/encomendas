import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="py-10 md:py-14 lg:py-20">
      <section className="flex items-center justify-center">
        <SignIn />
      </section>
    </main>
  );
}
