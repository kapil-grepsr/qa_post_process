"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAnyFileSelected } from "@/lib/utils";

// Custom hook to manage compare page logic
export function useCompareService() {
  const [filenames, setFilenames] = useState<string[]>(["", ""]); // Start with two slots
  const [baseFileIndex, setBaseFileIndex] = useState(0);
  const router = useRouter();

  const isProcessing = isAnyFileSelected(filenames);

  useEffect(() => {
    if (!filenames[baseFileIndex]) {
      const firstValidIndex = filenames.findIndex((name) => name !== "");
      setBaseFileIndex(firstValidIndex === -1 ? 0 : firstValidIndex);
    }
  }, [filenames, baseFileIndex]);

  const onFileChange = (index: number, file: File | null) => {
    setFilenames((prev) => {
      const updated = [...prev];
      updated[index] = file ? file.name : "";
      return updated;
    });
  };

  const addFile = () => {
    setFilenames((prev) => [...prev, ""]);
  };

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();

    const validFiles = filenames.filter((f) => f.trim() !== "");
    if (validFiles.length < 2) {
      alert("Please upload at least two CSV files.");
      return;
    }
    if (!filenames[baseFileIndex]) {
      alert("Please select a base file.");
      return;
    }

    const queryFiles = filenames
      .map((f, i) => `file${i}=${encodeURIComponent(f)}`)
      .join("&");
    const query = `${queryFiles}&base=${baseFileIndex}`;

    router.push(`/data-compare/result?${query}`);
  };

  return {
    filenames,
    baseFileIndex,
    setBaseFileIndex,
    isProcessing,
    onFileChange,
    addFile,
    handleCompare,
  };
}
