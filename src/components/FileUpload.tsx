import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(selectedFile);
      
      // Create preview URL for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false
  });

  const removeFile = () => {
    setFile(null);
    setPreview('');
    onFileChange(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-form-300 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-green-500" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}
          </p>
        </div>
      ) : (
        <div className="relative border rounded-lg p-4">
          <div className="flex items-center gap-4">
            {preview ? (
              <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded" />
            ) : (
              <div className="w-16 h-16 bg-form-100 rounded flex items-center justify-center">
                <Upload className="h-8 w-8 text-green-500" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-form-100 rounded-full transition-colors"
              type="button"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;