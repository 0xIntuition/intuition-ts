import { useParams } from '@remix-run/react'

export default function TagOverview() {
  const { tagId } = useParams()

  return (
    <div>
      <h1>Tag Overview: {tagId}</h1>
    </div>
  )
}
