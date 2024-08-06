import {
  // Accordion,
  // AccordionContent,
  // AccordionItem,
  // AccordionTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
  Text,
} from '@0xintuition/1ui'

import { PrivyVerifiedLinks } from '@client/privy-verified-links'
import { ExtendedPrivyUser } from 'types/user'

export interface EditSocialLinksModalProps {
  privyUser: ExtendedPrivyUser
  open?: boolean
  onClose: () => void
}

export default function EditSocialLinksModal({
  privyUser,
  open,
  onClose,
}: EditSocialLinksModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose?.()
      }}
    >
      <DialogContent className="w-[600px] bg-neutral-950 rounded-xl shadow border border-solid border-black/10">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Icon name="avatar-sparkle" />
              <Text variant="headline">Connect Social Accounts</Text>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {/* TODO: Uncomment when accordion is necessary */}
          {/* <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['verified-links']}
          >
            <AccordionItem value="verified-links">
              <AccordionTrigger> */}
          <Text variant="caption" className="text-secondary-foreground">
            Verified Links
          </Text>
          {/* </AccordionTrigger>
              <AccordionContent className="border-0"> */}
          <PrivyVerifiedLinks privyUser={privyUser} />
          {/* </AccordionContent>
            </AccordionItem>
          </Accordion> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
