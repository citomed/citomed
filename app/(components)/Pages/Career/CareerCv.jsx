"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const CareerCv = ({ onFileSelect, onValidationChange, myvalue, setForm }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const imageRef = useRef(null);

  useEffect(() => {
    const currentObjectUrl = previewUrl;
    return () => {
      if (currentObjectUrl && currentObjectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, [previewUrl]);

  const validateFile = (file) => {
    if (!file) return false;

    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    const isValidMimeType = ALLOWED_MIME_TYPES.includes(file.type);
    const isValidExtension = ALLOWED_EXTENSIONS.includes(fileExtension);

    return isValidMimeType && isValidExtension;
  };

  const handleFileChange = (event) => {
     const file = event.target.files[0];
    setForm({
      ...form,
    });

    setFileError("");

    if (!file) {
      setPreviewUrl(null);
      setFileName("");
      onFileSelect(null);
      onValidationChange(false);
      return;
    }

    if (validateFile(file)) {
      setFileName(file.name);
      onFileSelect(file);
      onValidationChange(true);

      if (file.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFileName(file.name + " (Dəstəklənməyən fayl tipi)");
      setFileError(`Sadəcə .pdf, .doc, .docx tipli fayllar qəbul edilir.`);
      onFileSelect(null);
      onValidationChange(false);
      setPreviewUrl(null);
      event.target.value = null;
    }
  };

  return (
    <>
      <div className="border border-[--bg-b4] rounded-[10px] p-[14px]">
        <label htmlFor="file" className="flex justify-between cursor-pointer">
          <h3 className="capitalize text-[--color-blue] text-[16px] font-['SFProText-Medium'] truncate max-w-[calc(100%-30px)]">
            {fileName ? fileName : "CV Yüklə"}
          </h3>
          <Image width={24} height={24} src="/file.svg" alt="Fayl ikon" />
        </label>
        <input
          type="file"
          name="cv"
          id="cv"
          value={myvalue}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {fileError && (
        <p className="text-red-500 text-[14px] mt-2">{fileError}</p>
      )}

      {previewUrl && previewUrl.match(/^blob:/) && (
        <div className="mt-4">
          <img
            ref={imageRef}
            src={previewUrl}
            alt="Önizleme"
            className="max-w-full h-auto rounded"
          />
        </div>
      )}
    </>
  );
};

export default CareerCv;
