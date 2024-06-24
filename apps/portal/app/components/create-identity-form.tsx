import React, { useState } from 'react'

import { DialogHeader, Input, Label, Text, Textarea } from '@0xintuition/1ui'

import {
  getFormProps,
  getInputProps,
  // SubmissionResult,
  useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
// import { useImageUploadFetcher } from '@lib/hooks/useImageUploadFetcher'
import { useOffChainFetcher } from '@lib/hooks/useOffChainFetcher'
import { createIdentitySchema } from '@lib/schemas/create-identity-schema'
import { updateProfileSchema } from '@lib/schemas/update-profile-schema'
import logger from '@lib/utils/logger'
import { truncateString } from '@lib/utils/misc'
import { CircleXIcon } from 'lucide-react'

import { ImageChooser } from './image-chooser'

interface CreateIdentityFormProps {
  onSuccess?: () => void
  onClose: () => void
}
export function CreateIdentityForm({
  onSuccess,
  onClose,
}: CreateIdentityFormProps) {
  logger(onClose, onSuccess)

  // const imageUploadFetcher = useImageUploadFetcher()
  const { offChainFetcher, lastOffChainSubmission } = useOffChainFetcher()
  logger('offChainFetcher', offChainFetcher)

  // const [loading, setLoading] = useState(false)
  const [imageFilename, setImageFilename] = useState<string | null>(null)
  const [imageFilesize, setImageFilesize] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const handleFileChange = (filename: string, filesize: string) => {
    setImageFilename(filename)
    setImageFilesize(filesize)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    logger('form submitting')
    event.preventDefault()
  }

  const [form, fields] = useForm({
    id: 'update-profile',
    lastResult: lastOffChainSubmission,
    constraint: getZodConstraint(updateProfileSchema()),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createIdentitySchema,
      })
    },
    shouldValidate: 'onInput',
    onSubmit: async (e) => handleSubmit(e),
  })

  return (
    <>
      <>
        <DialogHeader className="py-4">
          <div className="absolute top-5 flex flex-row items-center gap-2 align-baseline text-primary-400">
            <div className="flex flex-col gap-1">
              <Text variant="headline" className="text-foreground-secondary">
                Create Identity
              </Text>
              <Text variant="footnote" className="text-foreground-secondary">
                Begin the process of establishing a new digital representation
                within the blockchain network.
              </Text>
            </div>
          </div>
        </DialogHeader>

        <offChainFetcher.Form
          method="post"
          {...getFormProps(form)}
          encType="multipart/form-data"
          action="" // to be added
        >
          <div className="w-full py-1 flex-col justify-start items-start inline-flex gap-9">
            <div className="flex flex-col w-full gap-1.5">
              <div className="self-stretch flex-col justify-start items-start flex mt-9">
                <Text
                  variant="caption"
                  className="text-secondary-foreground/90"
                >
                  Identity Display Picture
                </Text>
              </div>
              <div className="self-stretch h-[100px] px-9 py-2.5 bg-neutral-900 rounded-lg border border-solid border-white/10 justify-between items-center inline-flex">
                <div className="justify-start items-center gap-[18px] flex">
                  <div className="w-[60px] h-[60px] rounded-xl justify-center items-center flex">
                    <ImageChooser
                      previewImage={previewImage}
                      setPreviewImage={setPreviewImage}
                      onFileChange={handleFileChange}
                    />
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <div className="text-center text-neutral-200 text-sm font-normal leading-tight">
                      {truncateString(imageFilename ?? '', 36)}
                    </div>
                    <div className="text-center text-neutral-200 text-xs font-normal leading-[18px]">
                      {imageFilesize}
                    </div>
                  </div>
                </div>
                <div className="flex-col justify-end items-end inline-flex">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setPreviewImage(null)
                      setImageFilename(null)
                      setImageFilesize(null)
                    }}
                    className={`${previewImage === null ? 'hidden' : 'block'}`}
                  >
                    <CircleXIcon className="h-6 w-6 relative text-neutral-700 hover:text-neutral-600 transition-colors duration-300" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <Text variant="caption" className="text-secondary-foreground/90">
                Identity Name
              </Text>
              <Label htmlFor={fields.display_name.id} hidden>
                Identity Name
              </Label>
              <Input
                {...getInputProps(fields.display_name, { type: 'text' })}
                placeholder="Enter a display name"
                // value={displayName}
                // onChange={handleDisplayNameChange}
                className="border border-solid border-white/10 bg-neutral-900"
              />
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <Text variant="caption" className="text-secondary-foreground/90">
                Identity Description
              </Text>
              <Label htmlFor={fields.description.id} hidden>
                Identity Description
              </Label>
              <Textarea
                {...getInputProps(fields.description, { type: 'text' })}
                placeholder="Tell us about yourself!"
                // value={description}
                // onChange={handleDescriptionChange}
                className="h-20 border border-solid border-white/10 bg-neutral-900"
              />
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <Text variant="caption" className="text-secondary-foreground/90">
                Add Link
              </Text>
              <Label htmlFor={fields.external_reference.id} hidden>
                Add Link
              </Label>
              <Input
                {...getInputProps(fields.display_name, { type: 'text' })}
                placeholder="Enter a display name"
                // value={displayName}
                // onChange={handleDisplayNameChange}
                className="border border-solid border-white/10 bg-neutral-900"
              />
            </div>
          </div>
        </offChainFetcher.Form>
      </>
    </>
  )
}
