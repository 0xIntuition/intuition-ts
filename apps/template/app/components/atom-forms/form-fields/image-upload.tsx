import { useCallback, useState } from 'react'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  IconName,
} from '@0xintuition/1ui'

import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

interface ImageUploadProps {
  name: string
  label: string
}

export function FormImageUpload({ name, label }: ImageUploadProps) {
  const { control, setValue } = useFormContext()
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        // Create preview URL
        const previewUrl = URL.createObjectURL(file)
        setPreview(previewUrl)

        // Here you would typically upload to IPFS/storage
        // For now, we'll just use the preview URL
        setValue(name, previewUrl, { shouldValidate: true })
      }
    },
    [setValue, name],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxFiles: 1,
  })

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation() // Prevent triggering dropzone click
      setValue(name, '', { shouldValidate: true })
      setPreview(null)
    },
    [setValue, name],
  )

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              {...getRootProps()}
              className="theme-border border-dashed rounded-lg p-6 text-center transition-colors min-h-[200px] flex flex-col items-center justify-center relative cursor-pointer bg-primary/10
                    hover:border-primary/50"
            >
              <input {...getInputProps()} />
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-contain p-2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">Click to change image</p>
                  </div>
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      <Icon name={IconName.trashCan} className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <Icon
                    name={IconName.avatarSparkle}
                    className="mx-auto h-12 w-12 text-muted-foreground"
                  />
                  <div className="text-sm text-muted-foreground space-y-2">
                    {isDragActive ? (
                      <p>Drop the image here</p>
                    ) : (
                      <>
                        <p>Drag and drop an image here</p>
                        <p className="text-primary">or click to select</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
