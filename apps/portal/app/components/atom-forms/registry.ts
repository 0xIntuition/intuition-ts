import { z } from 'zod'

import { Atom } from './types'

export type FormConfig = {
  schema: z.ZodType<Atom>
  component: React.ComponentType<{
    onSubmit: (data: Atom) => Promise<void>
    defaultValues?: Partial<Atom>
  }>
}

const formRegistry = new Map<Atom['type'], FormConfig>()

export function registerAtomForm(type: Atom['type'], config: FormConfig) {
  formRegistry.set(type, config)
}

export function getAtomForm(type: Atom['type']): FormConfig | undefined {
  return formRegistry.get(type)
}
