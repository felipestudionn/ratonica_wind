"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (base64Image: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Read the file as base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onImageSelected(base64);
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5242880, // 5MB
  });

  const clearImage = () => {
    setPreview(null);
    onImageSelected('');
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag & drop an image here, or click to select
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: JPEG, PNG, WebP (max 5MB)
          </p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 transition-opacity"
            aria-label="Remove image"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
