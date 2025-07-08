"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InputFile } from "@/components/ui/custom-ui/InputFile";
import { Button } from "@/components/ui/button";
import { GoHome } from "@/components/ui/custom-ui/GoHome";

import {
  initializeFiles,
  addFile,
  updateFile,
  simulateConcatenate,
  navigateToDuplicates,
} from "./service";

export default function ConcatPage() {
  const [fileCount, setFileCount] = useState(2);
  const [files, setFiles] = useState(initializeFiles(2));
  const [concatenatedFileUrl, setConcatenatedFileUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleAddFile = () => {
    const result = addFile(fileCount, files);
    setFileCount(result.fileCount);
    setFiles(result.files);
  };

  const handleFileChange = (index: number, file: File | null) => {
    setFiles((prev) => updateFile(prev, index, file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = await simulateConcatenate();
    setConcatenatedFileUrl(url);
  };

  const goToCheckDuplicates = () => {
    navigateToDuplicates(router, concatenatedFileUrl);
  };

  const isProcessing = files.some((f) => f !== null);

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-semibold">Concatenate CSV Files</h1>

        <div className="space-y-4">
          {Array.from({ length: fileCount }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <InputFile
                label={`CSV File ${i + 1}`}
                onChange={(file) => handleFileChange(i, file)}
              />
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handleAddFile}
            type="button"
            variant="outline"
            className="hover:bg-gray-100 transition-colors"
          >
            + Upload More
          </Button>

          <Button type="submit" className="hover:bg-primary/90 transition-colors">
            Concatenate
          </Button>
        </div>

        {concatenatedFileUrl && (
          <div className="pt-4 space-y-2">
            <a href={concatenatedFileUrl} download className="inline-block">
              <Button className="hover:bg-green-600 transition-colors">
                Download Concatenated File
              </Button>
            </a>

            <Button
              type="button"
              onClick={goToCheckDuplicates}
              variant="secondary"
              className="hover:bg-yellow-100 transition-colors"
            >
              Do you want to check duplicates?
            </Button>
          </div>
        )}
      </form>

      <GoHome isProcessing={isProcessing} position="footer" />
    </>
  );
}
