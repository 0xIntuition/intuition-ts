/**
 * Logs only in development mode
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const logger = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return console.log(...args)
  }
}

export default logger
