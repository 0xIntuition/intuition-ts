import { spawn } from 'child_process'

// Schedule periodic garbage collection
const gcInterval = setInterval(() => {
  try {
    if (global.gc) {
      global.gc()
    }
  } catch (e) {
    console.warn('Could not force garbage collection')
  }
}, 100)

// Run Remix dev server
const remixDev = spawn('remix', ['vite:dev'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=512',
  },
})

// Clean up on exit
process.on('SIGINT', () => {
  clearInterval(gcInterval)
  remixDev.kill()
  process.exit()
})

process.on('SIGTERM', () => {
  clearInterval(gcInterval)
  remixDev.kill()
  process.exit()
})

// Forward child process exit
remixDev.on('exit', (code) => {
  clearInterval(gcInterval)
  process.exit(code)
})
