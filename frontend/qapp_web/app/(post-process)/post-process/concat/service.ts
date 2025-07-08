// service.ts
import { Router } from "next/navigation";

export type FilesState = (File | null)[];

// Initialize files array with n nulls
export function initializeFiles(count: number): FilesState {
  return Array(count).fill(null);
}

// Add one null file to files array and increment count
export function addFile(fileCount: number, files: FilesState): { fileCount: number; files: FilesState } {
  return {
    fileCount: fileCount + 1,
    files: [...files, null],
  };
}

// Update file at a specific index
export function updateFile(files: FilesState, index: number, file: File | null): FilesState {
  const updated = [...files];
  updated[index] = file;
  return updated;
}

// Simulate concatenation, returns a promise with the URL of the concatenated file
export function simulateConcatenate(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("/fake-concatenated-file.csv");
    }, 1000);
  });
}

// Navigate to check duplicates page
export function navigateToDuplicates(router: Router, concatenatedFileUrl: string | null) {
  if (!concatenatedFileUrl) return;
  router.push(`/post-process/duplicates?file=${encodeURIComponent(concatenatedFileUrl)}`);
}
