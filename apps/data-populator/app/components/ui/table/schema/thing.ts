import { z } from "zod"

export const thingSchema = z.object({
  '@context': z.string(),
  '@type': z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  url: z.string(),
})

export type Thing = z.infer<typeof thingSchema>