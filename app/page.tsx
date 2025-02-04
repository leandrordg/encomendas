import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-muted max-w-7xl mx-auto p-4">
      <Image src="/images/logo.svg" alt="Image" width={200} height={200} />
      <h1 className="text-5xl font-bold tracking-tighter">Heading</h1>
      <p className="text-sm text-gray-300 leading-relaxed">Paragraph</p>
    </main>
  );
}
