import { FormEvent, useState } from 'react'

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@0xintuition/1ui'

import { categories } from 'app/data/mock-preferences'

interface AddPreferenceFormProps {
  onAddPreference: (preference: {
    name: string
    app: string
    price: number
    description: string
    category: string
    icon: string
  }) => void
}

export function AddPreferenceForm({ onAddPreference }: AddPreferenceFormProps) {
  const [name, setName] = useState('')
  const [app, setApp] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAddPreference({
      name,
      app,
      price: parseFloat(price),
      description,
      category,
      icon: 'Settings', // Default icon
    })
    // Reset form
    setName('')
    setApp('')
    setPrice('')
    setDescription('')
    setCategory('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Preference Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="app">App</Label>
        <Input
          id="app"
          value={app}
          onChange={(e) => setApp(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Preference</Button>
    </form>
  )
}
