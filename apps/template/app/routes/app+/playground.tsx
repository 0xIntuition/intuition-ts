import { useGetAtomsQuery, useGetTriplesQuery } from '@0xintuition/graphql'

export default function Playground() {
  const { data: atomsData } = useGetAtomsQuery(
    {},
    {
      queryKey: ['get-atoms-query'],
    },
  )
  const atoms = atomsData?.atoms

  const { data: triplesData } = useGetTriplesQuery(
    {},
    {
      queryKey: ['get-triples-query'],
    },
  )
  const triples = triplesData?.triples
  console.log('atoms from query', atoms)
  console.log('triples from query', triples)

  return <div>Playground</div>
}
