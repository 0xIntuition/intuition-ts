import { cn, Icon } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'

interface ImageChooseProps {
  previewImage: string | null
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>
  onFileChange: (filename: string, filesize: string, file: File) => void
  disabled?: boolean
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export function ImageChooser({
  previewImage,
  setPreviewImage,
  onFileChange,
  disabled,
  setImageFile,
}: ImageChooseProps) {
  return (
    <div className="flex w-full items-center justify-center gap-3">
      <div className="relative w-full">
        <label
          htmlFor="image-input"
          className={cn(
            'group left-0 flex h-[60px] w-[60px] w-full cursor-pointer rounded-lg focus-within:ring-2 focus-within:ring-ring border border-solid border-neutral-700',
            {
              'opacity-40 focus-within:opacity-100 hover:opacity-100':
                !previewImage,
            },
          )}
        >
          <div
            className={cn(
              'relative flex items-center justify-center overflow-hidden',
              {
                'mx-auto w-auto': previewImage,
                'w-full': !previewImage,
              },
            )}
          >
            {previewImage ? (
              <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={previewImage}
                  className="h-full w-full object-cover object-position-center shadow-md"
                  alt="Avatar preview"
                />
              </div>
            ) : (
              <div className="flex flex-row">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md h-[60px] w-[60px]">
                  <div className="pointer-events-pointer inset-0 flex items-center justify-center">
                    <Icon name="folder" className="h-6 w-6 text-neutral-700" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <input
            id="image-input"
            aria-label="Image"
            className="absolute left-0 w-full cursor-pointer opacity-0"
            onChange={(event) => {
              const file = event.target.files?.[0]
              logger('file', file)
              setImageFile(file)

              if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                  setPreviewImage(reader.result as string)
                }
                reader.readAsDataURL(file)
                const filesizeKB = file.size / 1024
                let formattedSize = ''
                if (filesizeKB >= 1024) {
                  const filesizeMB = filesizeKB / 1024
                  formattedSize = `${filesizeMB.toFixed(2)} MB`
                } else {
                  formattedSize = `${Math.round(filesizeKB)} KB`
                }

                onFileChange(file.name, formattedSize, file)
              } else {
                setPreviewImage(null)
              }
            }}
            name="image_url"
            type="file"
            accept="image/*"
            disabled={disabled}
          />
        </label>
      </div>
    </div>
  )
}
