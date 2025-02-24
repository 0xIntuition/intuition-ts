import { ClientOnly } from 'remix-utils/client-only'

export default function Social() {
  return (
    <ClientOnly fallback={null}>
      {() => <div id="myClaimrWidget" className="mx-4 mt-4 lg:mx-auto" />}
    </ClientOnly>
  )
}
