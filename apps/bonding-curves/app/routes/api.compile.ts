import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'

const execAsync = promisify(exec)

// Helper to determine if we're running in production (Render)
const isProduction = process.env.NODE_ENV === 'production'

// Helper to get the correct command for the environment
const getCommand = (cmd: string) => {
  if (isProduction) {
    // In production, run commands directly
    return cmd
  }
  // In development, run commands through Docker
  return `docker exec bonding-curves-anvil-1 ${cmd}`
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData()
    const fileName = (formData.get('file') as File).name
    let content = formData.get('content') as string

    if (!fileName || !content) {
      return json(
        { error: 'File name and content are required' },
        { status: 400 }
      )
    }

    try {
      // Remove immutable keywords from contract code
      content = content
        // Remove IMMUTABLE while preserving immutable keyword
        .replace(/\bIMMUTABLE\b(?!\s+[a-zA-Z_])/g, '')
        // Remove console.sol import
        .replace(/import\s*{?\s*console\s*}?\s*from\s*["']forge-std\/console\.sol["'];?\s*/g, '')
        // Remove console.log lines
        .replace(/console\.log\s*\([^;]*\);?\s*/g, '')
        // Remove imports from test files
        .replace(/import\s*{[^}]*}\s*from\s*["'][^"']*\/test\/[^"']*["'];?\s*/g, '')
        // Remove StringUtils using statements
        .replace(/using\s+StringUtils\s+for\s+(?:u?int256);?\s*/g, '')

      // Save contract content
      const contractPath = `/app/contracts/${fileName}`
      const escapedContent = content
        .replace(/"/g, '\\"')
        .replace(
          /import\s*{BaseCurve}\s*from\s*([^"']\S+);/g,
          'import {BaseCurve} from \\"./BaseCurve.sol\\";'
        )

      // Ensure output directory exists
      const outDir = '/app/out'
      await fs.mkdir(outDir, { recursive: true })

      if (isProduction) {
        // In production, write file directly
        await fs.writeFile(contractPath, content)
      } else {
        // In development, use Docker
        await execAsync(`docker exec bonding-curves-anvil-1 bash -c "echo '${escapedContent}' > ${contractPath}"`)
      }

      // Compile using forge
      let { stdout, stderr } = await execAsync(getCommand('forge build --force --sizes'))
      console.log('Compilation output:', stdout)
      if (stderr) {
        console.error('Compilation errors:', stderr)
        return json({ error: 'Compilation failed', details: stderr }, { status: 400 })
      }

      // Get artifact - note the path structure matches Forge's output
      const contractName = path.parse(fileName).name
      const artifactPath = `/app/out/${contractName}.sol/${contractName}.json`

      let artifactContent: string
      if (isProduction) {
        // In production, read file directly
        artifactContent = await fs.readFile(artifactPath, 'utf-8')
      } else {
        // In development, use Docker
        const { stdout } = await execAsync(getCommand(`cat ${artifactPath}`))
        artifactContent = stdout
      }

      let artifact
      try {
        artifact = JSON.parse(artifactContent)
      } catch (error) {
        console.error('Failed to parse artifact:', error)
        return json({ error: 'Failed to read contract artifact' }, { status: 500 })
      }

      const constructor = artifact.abi.find((item: any) => item.type === 'constructor')
      const constructorInputs = constructor?.inputs || []
      const needsConstructorArgs = constructorInputs.length > 0

      return json({
        abi: artifact.abi,
        bytecode: artifact.bytecode.object,
        constructorInputs,
        needsConstructorArgs
      })

    } catch (error) {
      console.error('Compilation failed:', error)
      return json(
        { error: error instanceof Error ? error.message : 'Contract compilation failed' },
        { status: 500 }
      )
    } finally {
      // Clean up
      try {
        if (isProduction) {
          await fs.unlink(`/app/contracts/${fileName}`).catch(() => { })
        } else {
          await execAsync(getCommand(`rm /app/contracts/${fileName}`)).catch(() => { })
        }
      } catch (cleanupError) {
        console.error('Failed to clean up temporary file:', cleanupError)
      }
    }
  } catch (error) {
    console.error('Error:', error)
    return json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 