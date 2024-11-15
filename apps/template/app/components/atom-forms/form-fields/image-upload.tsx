import { useCallback, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
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
              className="theme-border border-dashed rounded-lg p-4 text-center transition-colors min-h-[160px] flex flex-col items-center justify-center relative cursor-pointer
                    hover:border-primary/50 bg-primary/10"
            >
              <input {...getInputProps()} />
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-contain p-2"
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <Button
                      type="button"
                      variant={ButtonVariant.destructive}
                      size={ButtonSize.icon}
                      className="rounded-md"
                      onClick={handleRemove}
                    >
                      <Icon name={IconName.trashCan} className="w-4 h-4" />
                    </Button>
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
