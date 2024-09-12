import { Outlet } from '@remix-run/react'

// This is the parent loader and layout for the /readonly routes
// We can add any loader logic we need to here

export default function ReadOnlyLayout() {
  return <Outlet />
}
