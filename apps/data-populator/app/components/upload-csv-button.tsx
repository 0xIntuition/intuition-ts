import { useCallback, useRef, useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@0xintuition/1ui'

import { File as FileIcon, Upload, X } from 'lucide-react'

interface UploadCsvButtonProps {
  onFileUpload: (file: File) => void
}

export default function UploadCsvButton({
  onFileUpload,
}: UploadCsvButtonProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0]
      if (selectedFile && selectedFile.type === 'text/csv') {
        setFile(selectedFile)
        setError(null)
        onFileUpload(selectedFile)
      } else {
        setFile(null)
        setError('Please select a valid CSV file.')
      }
    },
    [onFileUpload],
  )

  const handleRemoveFile = useCallback(() => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  return (
    <div className="mx-auto">
      <div className="flex items-center gap-2">
        {file ? (
          <div className="flex-1 flex items-center gap-2 p-2 pl-4 bg-foreground/10 rounded-md">
            <FileIcon className="h-5 w-5 text-gray-400" />
            <span className="flex-1 truncate text-sm">{file.name}</span>
            <span className="text-sm text-gray-400">
              {(file.size / 1024).toFixed(2)} KB
            </span>
            <Button
              variant={ButtonVariant.secondary}
              size={ButtonSize.iconLg}
              onClick={handleRemoveFile}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        ) : (
          <Button
            variant={ButtonVariant.secondary}
            size={ButtonSize.lg}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1"
          >
            <Upload className="mr-2 h-4 w-4" /> Load CSV
          </Button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".csv"
        />
      </div>
      {error && <div className="text-destructive">{error}</div>}
    </div>
  )
}
