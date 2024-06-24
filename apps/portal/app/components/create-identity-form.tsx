import logger from '@lib/utils/logger'

interface CreateIdentityFormProps {
  onSuccess?: () => void
  onClose: () => void
}
export function CreateIdentityForm({
  onSuccess,
  onClose,
}: CreateIdentityFormProps) {
  logger(onClose, onSuccess)
  return <div>form</div>
}
