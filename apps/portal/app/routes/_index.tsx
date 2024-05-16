import { Button, Label, Input } from '@0xintuition/1ui'
import { useEffect } from 'react'
import { IdentitiesService } from '../../../../packages/api/src'

export default function Index() {
  // TODO: Only for test - remove before merging
  useEffect(() => {
    console.log('Hello world')
    const fetchIdentities = async () => {
      try {
        const test = await IdentitiesService.getIdentities({
          paging: {
            limit: 1,
            offset: 0,
            page: 1,
          },
          sort: {
            direction: 'desc',
          },
        })
        console.log(test)
      } catch (error) {
        console.error('Error fetching identities:', error)
      }
    }

    fetchIdentities()
  }, [])

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="ghost">Outline Button</Button>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="textTest">Test Text Input</Label>
        <Input type="text" id="fileTest" placeholder="Test text input" />
      </div>
    </div>
  )
}
