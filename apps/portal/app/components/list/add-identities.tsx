import { useState } from 'react'

import { Button, Icon, Separator, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

export function AddIdentities() {
  const [identities, setIdentities] = useState<IdentityPresenter[]>([])

  const addIdentity = () => {
    if (identities.length < MAX_IDENTITIES_TO_ADD) {
      setIdentities([
        ...identities,
        { id: '', displayName: '' } as IdentityPresenter,
      ])
    }
  }

  const MAX_IDENTITIES_TO_ADD = 5

  const removeIdentity = (index: number) => {
    setIdentities(identities.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col min-h-36">
      <div className="mb-3 gap-2">
        <Text variant="body" className="text-primary/70">
          Add identities to list
        </Text>
        <Text variant="caption" className="text-primary/50">
          Select up to 5 identities to add to this list.
        </Text>
      </div>
      <Separator />
      <div className="mt-4 space-y-2">
        {identities.map((identity, index) => (
          <div key={index}>
            <div className="flex items-center space-x-2">
              <Text>{index + 1}.</Text>
              <div className="flex-grow bg-gray-700 rounded-md p-2">
                Identity {index + 1}
              </div>
              <Button onClick={() => removeIdentity(index)}>X</Button>
            </div>
            {index < identities.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
        {identities.length < MAX_IDENTITIES_TO_ADD && (
          <div className="flex flex-row items-center gap-2.5">
            <Text
              variant="body"
              weight="medium"
              className="text-secondary-foreground/30"
            >
              {identities.length + 1}.
            </Text>
            <Button onClick={addIdentity} variant="secondary">
              <Icon name="plus-small" />
              Select Identity
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
