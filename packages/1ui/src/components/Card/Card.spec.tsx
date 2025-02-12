import * as React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card'

describe('Card', () => {
  it('renders basic card', () => {
    render(<Card>content</Card>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('applies custom className to card', () => {
    render(<Card className="custom-class">content</Card>)
    expect(screen.getByText('content')).toHaveClass('custom-class')
  })

  it('renders all card components correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('applies custom className to sub-components', () => {
    render(
      <Card>
        <CardHeader className="header-class">
          <CardTitle className="title-class">Title</CardTitle>
          <CardDescription className="desc-class">Description</CardDescription>
        </CardHeader>
        <CardContent className="content-class">Content</CardContent>
        <CardFooter className="footer-class">Footer</CardFooter>
      </Card>,
    )

    expect(screen.getByText('Title').parentElement).toHaveClass('header-class')
    expect(screen.getByText('Title')).toHaveClass('title-class')
    expect(screen.getByText('Description')).toHaveClass('desc-class')
    expect(screen.getByText('Content')).toHaveClass('content-class')
    expect(screen.getByText('Footer')).toHaveClass('footer-class')
  })
})
