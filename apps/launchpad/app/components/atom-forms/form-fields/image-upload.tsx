import { useCallback, useState } from 'react'

import { cn, Icon, IconName } from '@0xintuition/1ui'

import { useDropzone } from 'react-dropzone'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

interface ImageUploadProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
}

interface CloudinaryResponse {
  url: string
  public_id: string
}

export function FormImageUpload<T extends FieldValues>({
  name,
  control,
  label,
}: ImageUploadProps<T>) {
  const [isUploading, setIsUploading] = useState(false)
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`/actions/upload-image`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = (await response.json()) as CloudinaryResponse
    return data.url
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const file = acceptedFiles[0]
        if (!file) {
          return
        }

        setIsUploading(true)

        // Upload to Cloudinary
        const imageUrl = await uploadToCloudinary(file)
        onChange(imageUrl)
      } catch (error) {
        console.error('Failed to upload image:', error)
      } finally {
        setIsUploading(false)
      }
    },
    [onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxFiles: 1,
    disabled: isUploading,
  })

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground/70">
          {label}
        </label>
      )}
      <div
        {...getRootProps()}
        className={cn(
          'relative h-[160px] cursor-pointer overflow-hidden rounded-lg border-2 border-dashed transition-colors bg-primary/10',
          isDragActive
            ? 'border-primary bg-primary/5'
            : error
              ? 'border-destructive/50 bg-destructive/5'
              : 'border-muted-foreground/25 hover:bg-muted/25',
          isUploading && 'pointer-events-none opacity-60',
        )}
      >
        <input {...getInputProps()} />

        <div className="flex h-full w-full flex-col items-center justify-center p-1">
          {isUploading ? (
            <>
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="mt-2 text-sm text-muted-foreground">
                Uploading to Cloudinary...
              </p>
            </>
          ) : value ? (
            <div className="h-full w-full">
              <img
                src={value}
                alt="Upload preview"
                className="h-full w-full rounded-lg object-contain relative"
              />
              <div className="absolute inset-0">
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-2 bottom-2 rounded-full bg-primary p-1.5 text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Icon
                    name={IconName.squareArrowTopRight}
                    className="h-4 w-4"
                  />
                </a>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(null)
                  }}
                  className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground hover:bg-destructive/90"
                >
                  <Icon name={IconName.trashCan} className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Icon
                name={IconName.avatarSparkle}
                className="h-8 w-8 text-muted-foreground"
              />
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-primary">
                  Click to upload
                </span>{' '}
                or drag and drop
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                PNG, JPG, GIF up to 10MB
              </p>
            </>
          )}
        </div>
      </div>
      {error?.message && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  )
}
