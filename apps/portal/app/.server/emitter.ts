import { EventEmitter } from 'events'

import { remember } from '@epic-web/remember'

export const emitter = remember('emitter', () => {
  const eventEmitter = new EventEmitter()
  eventEmitter.setMaxListeners(20)
  return eventEmitter
})
