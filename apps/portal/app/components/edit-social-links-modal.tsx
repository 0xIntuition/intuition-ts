import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
          <DialogTitle className="text-primary/60 font-normal text-sm">
            Connect Social Accounts
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['verified-links']}
          >
            <AccordionItem value="verified-links">
              <AccordionTrigger>
                <span className="text-secondary-foreground text-sm font-normal">
                  Verified Links
                </span>
              </AccordionTrigger>
              <AccordionContent className="border-0">
                <PrivyVerifiedLinks privyUser={privyUser} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  )
}
