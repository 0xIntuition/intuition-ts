import { useParams } from '@remix-run/react'

export default function AtomView() {
  const { tagId, atomId } = useParams()

  return (
    <div>
      <h1>Atom View</h1>
      <p>Tag ID: {tagId}</p>
      <p>Atom ID: {atomId}</p>
    </div>
  )
}
