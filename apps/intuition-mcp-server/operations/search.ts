import { z } from 'zod'

export const SearchIntuitionSchema = z.object({
  triples: z
    .array(z.array(z.string()))
    .describe('Triples to search in intuition'),
})

export async function searchIntuition(triples: string[][]) {
  return [
    ['foo', 'is', 'bar'],
    ['bar', 'is', 'foo'],
  ]
}
