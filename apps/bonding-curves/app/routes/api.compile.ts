import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const content = formData.get('content') as string

    if (!file || !content) {
      return json(
        { error: 'File name and content are required' },
        { status: 400 }
      )
    }

    const fileName = file.name

    try {
      // Remove immutable keywords from contract code
      const processedContent = content
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

      console.log('Processed content:', processedContent.substring(0, 200) + '...')

      // Save to container and compile
      const escapedContent = processedContent
        .replace(/"/g, '\\"')
        .replace(
          /import\s*{BaseCurve}\s*from\s*([^"']\S+);/g,
          'import {BaseCurve} from \\"./BaseCurve.sol\\";'
        )

      console.log('Checking if Docker container exists...')
      try {
        await execAsync('docker ps | grep bonding-curves-anvil-1')
        console.log('Docker container found')
      } catch (error) {
        console.error('Docker container not found:', error)
        return json({ error: 'Compilation environment not available' }, { status: 500 })
      }

      console.log('Writing file to container...')
      try {
        await execAsync(`docker exec bonding-curves-anvil-1 bash -c "echo '${escapedContent}' > /app/contracts/${fileName}"`)
        console.log('File written successfully')
      } catch (error) {
        console.error('Failed to write file to container:', error)
        return json({ error: 'Failed to prepare compilation environment' }, { status: 500 })
      }

      // Compile using the remappings from the container's remappings.txt
      console.log('Starting compilation...')
      let { stdout, stderr } = await execAsync('docker exec bonding-curves-anvil-1 forge build --force --sizes')
      console.log('Compilation output:', stdout)
      if (stderr) {
        console.error('Compilation errors:', stderr)
        return json({ error: 'Compilation failed', details: stderr }, { status: 400 })
      }
      console.log('Compilation successful')

      // Get artifact
      console.log('Reading artifact...')
      const contractName = path.parse(fileName).name
      const { stdout: artifactContent } = await execAsync(
        `docker exec bonding-curves-anvil-1 cat /app/out/${fileName}/${contractName}.json`
      )
      console.log('Artifact read successfully')

      let artifact
      try {
        artifact = JSON.parse(artifactContent)
        console.log('Artifact parsed successfully')
      } catch (error) {
        console.error('Failed to parse artifact:', error)
        return json({ error: 'Failed to read contract artifact' }, { status: 500 })
      }

      // Find constructor and log for debugging
      const constructor = artifact.abi.find((item: any) => item.type === 'constructor')
      console.log('Found constructor:', constructor)

      // If no constructor found, return empty inputs array
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
      // Always clean up
      try {
        await execAsync(`docker exec bonding-curves-anvil-1 rm /app/contracts/${fileName}`)
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