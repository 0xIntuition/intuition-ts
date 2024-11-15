import { FormContainer } from '@components/atom-forms/form-container'
import {
  OrganizationForm,
  PersonForm,
  ThingForm,
} from '@components/atom-forms/forms'
import { registerAtomForm } from '@components/atom-forms/registry'
import {
  Atom,
  organizationAtomSchema,
  personAtomSchema,
  thingAtomSchema,
} from '@components/atom-forms/types'

// Register all form types
registerAtomForm('Person', {
  schema: personAtomSchema,
  component: PersonForm,
})

registerAtomForm('Thing', {
  schema: thingAtomSchema,
  component: ThingForm,
})

registerAtomForm('Organization', {
  schema: organizationAtomSchema,
  component: OrganizationForm,
})

export default function FormsPage() {
  const handleSubmit = async (data: Atom) => {
    console.log('Form submitted:', data)
    // Handle form submission
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Atom</h1>
      <FormContainer onSubmit={handleSubmit} />
    </div>
  )
}
