export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-12 flex items-center justify-center">
      {children}
    </main>
  );
}
