import { useGetAtomsQuery, useGetTripleQuery } from '@0xintuition/graphql'

export default function Playground() {
  // const { data, isLoading, isError } = useGetTripleQuery(
  //   {
  //     tripleId: 12,
  //   },
  //   {
  //     queryKey: ['12'],
  //   },
  // )
  // const triple = data?.triple
  // console.log('triple from query', triple)

  const { data, isLoading, isError } = useGetAtomsQuery(
    {},
    {
      queryKey: ['getAtomsQuery'],
    },
  )
  const atoms = data?.atoms
  console.log('atoms from query', atoms)

  return <div>Playground</div>
}
