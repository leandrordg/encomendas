import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex items-center gap-4 max-w-7xl mx-auto p-4">
        <Link href="/">
          <div className="relative size-8">
            <Image src="/images/logo.svg" alt="Imagem da logo" priority fill />
          </div>
        </Link>
      </div>
    </header>
  );
}
