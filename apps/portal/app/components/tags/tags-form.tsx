import logger from '@lib/utils/logger'

interface TagsFormProps {
  onSuccess?: () => void
  onClose: () => void
}

export function TagsForm({ onClose }: TagsFormProps) {
  logger('onClose', onClose)
  return <div>tags form</div>
}
