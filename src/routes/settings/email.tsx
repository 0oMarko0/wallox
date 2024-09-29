import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/email')({
  component: () => <div>Hello /settings/email!</div>,
})
