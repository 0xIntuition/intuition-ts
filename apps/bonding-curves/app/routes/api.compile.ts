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

      // Ensure output directory exists with correct permissions
      const outDir = '/app/out'
      const contractsDir = '/app/contracts'

      try {
        // Create directories if they don't exist and set permissions
        await fs.mkdir(outDir, { recursive: true, mode: 0o777 }) // Full permissions for testing
        await fs.mkdir(contractsDir, { recursive: true, mode: 0o755 })

        // Set permissions on the contract file
        if (isProduction) {
          await fs.writeFile(contractPath, content)
          await fs.chmod(contractPath, 0o644)

          // Ensure the output directory is writable by forge
          await fs.chmod(outDir, 0o777)

          // Log current working directory
          const { stdout: pwdOutput } = await execAsync('pwd')
          console.log('Current working directory:', pwdOutput)

          let compileResult: { stdout: string; stderr: string }
          if (isProduction) {
            // Run forge with explicit output path
            compileResult = await execAsync(`forge build --force --sizes --out ${outDir}`)
          } else {
            await execAsync(`docker exec bonding-curves-anvil-1 bash -c "echo '${escapedContent}' > ${contractPath}"`)
            compileResult = await execAsync(getCommand('forge build --force --sizes'))
          }

          // Log directory contents and permissions for debugging
          const { stdout: lsOutput } = await execAsync(`ls -la ${outDir}`)
          console.log('Output directory permissions:', lsOutput)

          console.log('Compilation output:', compileResult.stdout)
          if (compileResult.stderr) {
            console.error('Compilation errors:', compileResult.stderr)
            return json({ error: 'Compilation failed', details: compileResult.stderr }, { status: 400 })
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
          console.error('Failed to set up directories:', error)
          return json(
            { error: 'Failed to set up directories' },
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
        console.error('Failed to set up directories:', error)
        return json(
          { error: 'Failed to set up directories' },
          { status: 500 }
        )
      }
    } catch (error) {
      console.error('Compilation failed:', error)
      return json(
        { error: error instanceof Error ? error.message : 'Contract compilation failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error:', error)
    return json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 