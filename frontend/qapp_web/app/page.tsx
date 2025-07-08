"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800">Welcome Data Post Processing Tool</h1>

      <Button onClick={() => router.push("/post-process")} className="px-6 py-3" variant="default">
        Post Process
      </Button>

      <Button onClick={() => router.push("/data-compare")} className="px-6 py-3" variant="default">
        Data Compare
      </Button>
    </div>
  );
}
