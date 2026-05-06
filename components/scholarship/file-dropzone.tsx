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
  async function readPdf(file: File) {
    const pdfjsLib = await import("pdfjs-dist");

    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");

      fullText += pageText + "\n\n";
    }

    return fullText.trim();
  }

  async function readDocx(file: File) {
    const mammoth = await import("mammoth/mammoth.browser");
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({ arrayBuffer });

    return result.value.trim();
  }

  async function handleFile(file: File) {
  onFileUpload(file);
  onFileContent(`Reading file: ${file.name}...`);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/extract-file", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data.text) {
      throw new Error(data.error || "Could not extract text");
    }

    onFileContent(data.text);
  } catch (error) {
    console.error(error);
    onFileContent(
      `File uploaded: ${file.name}\n\nCould not extract text from this file. Please paste the text manually.`
    );
  }
}

      if (fileName.endsWith(".pdf")) {
        const text = await readPdf(file);

        if (!text) {
          onFileContent(
            `File uploaded: ${file.name}\n\nCould not extract text from this PDF. Please paste the text manually.`
          );
          return;
        }

        onFileContent(text);
        return;
      }

      if (fileName.endsWith(".docx")) {
        const text = await readDocx(file);

        if (!text) {
          onFileContent(
            `File uploaded: ${file.name}\n\nCould not extract text from this DOCX. Please paste the text manually.`
          );
          return;
        }

        onFileContent(text);
        return;
      }

      onFileContent("Unsupported file type. Please upload PDF, DOCX, or TXT.");
    } catch (error) {
      console.error("File reading error:", error);
      onFileContent(
        `File uploaded: ${file.name}\n\nCould not read this file. Please paste the text manually.`
      );
    }
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