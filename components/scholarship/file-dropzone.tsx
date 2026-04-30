"use client";

import { Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileDropzoneProps {
  label: string;
  description: string;
  onFileContent: (content: string) => void;
  onFileUpload: (file: File | null) => void;
  hasContent: boolean;
}

export function FileDropzone({
  label,
  description,
  onFileContent,
  onFileUpload,
  hasContent,
}: FileDropzoneProps) {
  async function handleFile(file: File) {
    onFileUpload(file);

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".txt")) {
      const text = await file.text();
      onFileContent(text);
      return;
    }

    if (fileName.endsWith(".pdf") || fileName.endsWith(".docx")) {
      onFileContent(
        `File uploaded: ${file.name}\n\nPDF/DOCX text extraction is not enabled yet. Please copy and paste the resume text below for now.`
      );
      return;
    }

    onFileContent("Unsupported file type. Please upload PDF, DOCX, or TXT.");
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/50 p-6 text-center">
      <div className="flex flex-col items-center gap-3">
        {hasContent ? (
          <CheckCircle className="h-10 w-10 text-blue-600" />
        ) : (
          <Upload className="h-10 w-10 text-blue-600" />
        )}

        <div>
          <p className="font-semibold text-foreground">
            {hasContent ? "File uploaded!" : label}
          </p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <input
          id={label}
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById(label)?.click()}
        >
          Choose file
        </Button>
      </div>
    </div>
  );
}