import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Folder } from 'lucide-react';
import { Button } from './ui/button';

interface FileUploadProps {
  onFileChange: (files: File[] | null) => void;
}

// Extend the HTMLInputElement interface to include directory-related properties
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles(prev => [...prev, ...acceptedFiles]);
      onFileChange([...files, ...acceptedFiles]);
      
      // Create previews for images
      acceptedFiles.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviews(prev => ({
              ...prev,
              [file.name]: reader.result as string
            }));
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }, [files, onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    noDrag: false,
    noClick: false,
    noKeyboard: false
  });

  const removeFile = (fileToRemove: File) => {
    const updatedFiles = files.filter(f => f !== fileToRemove);
    setFiles(updatedFiles);
    onFileChange(updatedFiles.length > 0 ? updatedFiles : null);
    
    // Remove preview if exists
    if (previews[fileToRemove.name]) {
      const { [fileToRemove.name]: _, ...restPreviews } = previews;
      setPreviews(restPreviews);
    }
  };

  const removeAllFiles = () => {
    setFiles([]);
    setPreviews({});
    onFileChange(null);
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-form-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} directory="" webkitdirectory="" />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-12 w-12 text-green-500" />
          <p className="text-sm text-gray-600">
            {isDragActive ? 'Drop the files here' : 'Drag & drop files or folders here, or click to select'}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={(e) => {
              e.stopPropagation();
              const input = document.createElement('input');
              input.type = 'file';
              input.multiple = true;
              input.setAttribute('webkitdirectory', '');
              input.setAttribute('directory', '');
              input.onchange = (e) => {
                const files = Array.from((e.target as HTMLInputElement).files || []);
                onDrop(files);
              };
              input.click();
            }}
          >
            <Folder className="mr-2 h-4 w-4" />
            Select Folder
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900">
              {files.length} {files.length === 1 ? 'file' : 'files'} selected
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeAllFiles}
              className="text-red-500 hover:text-red-700"
            >
              Remove all
            </Button>
          </div>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded">
                {previews[file.name] ? (
                  <img src={previews[file.name]} alt="Preview" className="w-16 h-16 object-cover rounded" />
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
                  onClick={() => removeFile(file)}
                  className="p-1 hover:bg-form-100 rounded-full transition-colors"
                  type="button"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;