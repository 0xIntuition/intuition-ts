import { z } from 'zod'

import { Atom } from './types'

export interface AtomFormProps<T extends z.ZodSchema> {
  onSubmit: (data: z.infer<T>) => Promise<void>
  defaultValues?: Partial<z.infer<T>>
}

export interface AtomFormConfig<T extends z.ZodSchema> {
  schema: T
  component: React.ComponentType<AtomFormProps<T>>
}

export type AtomFormRegistry = {
  [K in Atom['type']]: AtomFormConfig<z.ZodSchema>
}

const registry: AtomFormRegistry = {} as AtomFormRegistry

export function registerAtomForm<T extends Atom['type']>(
  type: T,
  config: AtomFormConfig<z.ZodTypeAny>,
) {
  registry[type] = config
}

export function getAtomForm(type: Atom['type']) {
  return registry[type]
}
