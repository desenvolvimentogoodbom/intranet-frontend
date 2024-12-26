import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href={'./'}>
        <Button>
          Sair
        </Button>
      </Link>
    </>
  );
}