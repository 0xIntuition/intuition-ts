import { z } from "zod"

// Person atom schema
export const personAtomSchema = z.object({
  type: z.literal("Person"),
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
})

// Thing atom schema
export const thingAtomSchema = z.object({
  type: z.literal("Thing"),
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
})

// Organization atom schema
export const organizationAtomSchema = z.object({
  type: z.literal("Organization"),
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
})

// Union of all atom schemas
export const atomSchema = z.discriminatedUnion("type", [
  personAtomSchema,
  thingAtomSchema,
  organizationAtomSchema,
])

// TypeScript types inferred from schemas
export type PersonAtom = z.infer<typeof personAtomSchema>
export type ThingAtom = z.infer<typeof thingAtomSchema>
export type OrganizationAtom = z.infer<typeof organizationAtomSchema>
export type Atom = z.infer<typeof atomSchema> 