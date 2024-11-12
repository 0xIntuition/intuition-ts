import { useRef } from 'react'

import { FileText, Upload } from 'lucide-react'

export interface CsvUploaderProps {
  file: File | null
  setFile: (file: File | null) => void
  onFileChange: (file: File) => Promise<void>
}

export default function CsvUploader({
  file,
  setFile,
  onFileChange,
}: CsvUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = async (selectedFile: File) => {
    if (selectedFile.type === 'text/csv') {
      try {
        setFile(selectedFile)
        await onFileChange(selectedFile)
      } catch (error) {
        console.error('Error processing CSV:', error)
        alert('Error processing the CSV file.')
      }
    } else {
      alert('Please select a valid CSV file.')
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      await processFile(selectedFile)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      await processFile(droppedFile)
    }
  }

  return (
    <div
      className="border border-dashed border-border/30 rounded-lg p-6 text-center cursor-pointer hover:border-border/80 hover:bg-primary/5 transition-colors"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />
      {file ? (
        <div className="flex flex-col items-center gap-1">
          <FileText className="w-10 h-10 text-primary mb-2" />
          <p className="text-sm font-medium">{file.name}</p>
          <p className="text-xs text-gray-500">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Upload className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-sm font-medium">
            Drag and drop your CSV file here
          </p>
          <p className="text-xs text-gray-500">or click to browse</p>
        </div>
      )}
    </div>
  )
}
