import Image from "next/image";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex items-center gap-4 max-w-4xl mx-auto p-4">
        <div className="relative size-8">
          <Image src="/images/logo.svg" alt="Imagem da logo" priority fill />
        </div>
      </div>
    </header>
  );
}
