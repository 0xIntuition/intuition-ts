import { remember } from '@epic-web/remember'
import { EventEmitter } from 'events'

export const emitter = remember('emitter', () => {
  const eventEmitter = new EventEmitter()
  eventEmitter.setMaxListeners(20)
  return eventEmitter
})
